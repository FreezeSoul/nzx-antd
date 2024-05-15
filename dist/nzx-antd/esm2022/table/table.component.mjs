import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import { FETCH_SETTING } from './const';
import { debounceTime, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FetcherService } from '@xmagic/nzx-antd/service';
import { NamedTemplate } from '@xmagic/nzx-antd/directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@xmagic/nzx-antd";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/table";
import * as i5 from "ng-zorro-antd/resizable";
import * as i6 from "ng-zorro-antd/divider";
import * as i7 from "ng-zorro-antd/core/outlet";
import * as i8 from "@xmagic/nzx-antd/directive";
import * as i9 from "./table-widget/table-button/table-button.component";
import * as i10 from "./table-widget/table-link/table-link.component";
import * as i11 from "./header/table-header/table-header.component";
import * as i12 from "./header/column-setting/column-setting.component";
import * as i13 from "./table-widget.directive";
import * as i14 from "@xmagic/nzx-antd/pipe";
import * as i15 from "./transform/col-format.pipe";
import * as i16 from "./transform/col-span.pipe";
import * as i17 from "./transform/col-button-visible.pipe";
import * as i18 from "./transform/has-auth.pipe";
import * as i19 from "./transform/col-buttons.pipe";
/**
 * 基于nz-table二次封装的表格组件
 * ## 特性
 * - 配置加载数据: `api: string | Promise<T[]> | Observable<T[]>`
 * - 支持列的配置: `nzxColumns: NzxColumn<T>[]`
 * - 列支持排序配置
 * - 默认支持显示拖动列, 调整列顺序
 * - 支持配置显示序号、复选框
 * - 自定义渲染内容， template使用名称即可引用成功
 * - 支持请求/响应信息配置, `fetchSetting?: FetchSetting`
 * - 支持异步格式化列数据
 */
export class NzxTableComponent {
    cdr;
    render;
    http;
    elementRef;
    antdService;
    /**
     * 当前选中的行
     */
    _selectRow;
    /**
     * 当前页数据
     */
    _currentPageData = [];
    _headerColumns = [];
    _bodyColumns = [];
    _allColumns = [];
    _nzTotal = 0;
    _nzShowPagination = true;
    sortInfo;
    defaultPageSizeOptions = [10, 15, 20, 30, 40, 50, 100];
    /**
     * 请求处理
     */
    api;
    /**
     * 请求参数
     */
    params;
    /**
     * 是否显示刷新按钮
     */
    nzxRefreshVisible = true;
    /**
     * 是否显示调整表格大小按钮
     */
    nzxResizeVisible = true;
    /**
     * 显示配置列, 只在非合并表头时可用
     */
    nzxSettingVisible = true;
    /**
     * 是否显示斑马线
     */
    nzxStripe = false;
    /**
     * 请求之前处理函数
     */
    beforeFetch;
    /**
     * 请求之后处理函数
     */
    afterFetch;
    /**
     * 请求配置
     */
    fetchSetting;
    /**
     * 排序函数
     */
    sortFn;
    /**
     * 配置列
     */
    nzxColumns = [];
    /**
     * 默认渲染表头
     */
    nzxDefaultRenderHeader = true;
    /**
     * 标题
     */
    title;
    /**
     * 是否显示表头
     */
    nzxShowHeader;
    /**
     * 工具栏-在工具栏之前
     */
    toolbarBefore;
    /**
     * 工具栏
     */
    toolbar;
    /**
     * 是否能调整列大小
     */
    nzxResizable = true;
    /**
     * 表格布局
     */
    nzTableLayout = 'auto';
    /**
     * 用于显示数据总量和当前数据范围，用法参照 Pagination 组件
     */
    nzShowTotal;
    /**
     * 用于自定义页码的结构，用法参照 Pagination 组件
     */
    nzItemRender;
    /**
     * 表格标题
     */
    nzTitle;
    /**
     * 表格尾部
     */
    nzFooter;
    /**
     * 无数据时显示内容
     */
    nzNoResult;
    /**
     * 	页数选择器可选值
     */
    nzPageSizeOptions;
    /**
     * 虚拟滚动时每一列的高度，与 cdk itemSize 相同
     */
    nzVirtualItemSize = 0;
    /**
     * 	缓冲区最大像素高度，与 cdk maxBufferPx 相同
     */
    nzVirtualMaxBufferPx = 200;
    /**
     * 缓冲区最小像素高度，低于该值时将加载新结构，与 cdk minBufferPx 相同
     */
    nzVirtualMinBufferPx = 100;
    /**
     * 延迟显示加载效果的时间（防止闪烁）
     */
    nzLoadingDelay = 0;
    /**
     * 	当前页码，可双向绑定
     */
    nzPageIndex = 1;
    /**
     * 每页展示多少数据，可双向绑定
     */
    nzPageSize;
    /**
     * 当前总数据，在服务器渲染时需要传入
     */
    set nzTotal(value) {
        this._nzTotal = value;
        setTimeout(() => this.fixedFit());
    }
    get nzTotal() {
        return this._nzTotal;
    }
    /**
     * 表头分组时指定每列宽度，与 th 的 [nzWidth] 不可混用
     */
    nzWidthConfig = [];
    /**
     * 表格数据
     */
    nzData = [];
    /**
     * 指定分页显示的位置
     */
    nzPaginationPosition = 'bottom';
    /**
     * 横向支持滚动
     */
    set scrollX(value) {
        this.nzScroll = { ...this.nzScroll, x: value };
    }
    /**
     * 纵向支持滚动
     */
    set scrollY(value) {
        this.nzScroll = { ...this.nzScroll, y: value };
    }
    nzScroll = { x: this.scrollX, y: this.scrollY };
    /**
     * 表格是否自动撑满
     */
    nzxFit;
    /**
     * 指定分页显示的尺寸
     */
    nzPaginationType = 'default';
    /**
     * 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
     */
    nzFrontPagination = false;
    /**
     * 模板模式，无需将数据传递给 nzData
     */
    nzTemplateMode = false;
    /**
     * 	是否显示分页器
     */
    set nzShowPagination(value) {
        this._nzShowPagination = value;
        setTimeout(() => this.fixedFit());
    }
    get nzShowPagination() {
        return this._nzShowPagination;
    }
    /**
     * 页面是否加载中
     */
    nzLoading = false;
    /**
     * 是否自动显示loading
     */
    nzxAutoLoading = false;
    /**
     * 是否显示外边框
     */
    nzOuterBordered = false;
    /**
     * 加载指示符
     */
    nzLoadingIndicator;
    /**
     * 是否展示外边框和列边框
     */
    nzBordered = false;
    /**
     * 表格大小, 正常或迷你类型
     */
    nzSize = 'small';
    /**
     * 是否可以改变 nzPageSize
     */
    nzShowSizeChanger = true;
    /**
     * 只有一页时是否隐藏分页器
     */
    nzHideOnSinglePage = false;
    /**
     * 是否可以快速跳转至某页
     */
    nzShowQuickJumper = true;
    /**
     * 当添加该属性时，显示为简单分页
     */
    nzSimple = false;
    /**
     * 是否显示操作按钮小图标
     */
    actionVisible;
    /**
     * 是否显示顶部标题
     */
    toolbarVisible;
    /**
     * 点击行是否选中
     */
    nzxClickSelectedRow;
    /**
     * 当数据为null显示的默认文本
     */
    defaultText;
    /**
     * 由外部传入模板列表
     */
    tplMap;
    /**
     * 虚拟滚动数据 TrackByFunction 函数
     */
    nzVirtualForTrackBy;
    /**
     * 合并单元格
     */
    nzxSpanFunc;
    /**
     * 自定义tr
     */
    nzxTr;
    /**
     * 如果是树结构, 设置缩进大小
     */
    nzIndentSize = 20;
    /**
     * 树表的checkable状态下节点选择完全受控（父子节点选中状态不再关联）, 默认false
     */
    nzCheckStrictly;
    /**
     * 页数改变时的回调函数
     */
    nzPageSizeChange = new EventEmitter();
    /**
     * 当前页码改变时的回调函数
     */
    nzPageIndexChange = new EventEmitter();
    /**
     * 	当服务端分页、筛选、排序时，用于获得参数
     */
    nzQueryParams = new EventEmitter();
    /**
     * 当前页面展示数据改变的回调函数
     */
    nzCurrentPageDataChange = new EventEmitter();
    /**
     * 数据行点击事件
     */
    rowClick = new EventEmitter();
    /**
     * 数据行双击事件
     */
    rowDblclick = new EventEmitter();
    /**
     * 数据行右键菜单事件
     */
    rowContextmenu = new EventEmitter();
    /**
     * 单元格点击事件
     */
    cellClick = new EventEmitter();
    /**
     * 单元格双击事件
     */
    cellDblclick = new EventEmitter();
    /**
     * 单元格右键菜单事件
     */
    cellContextmenu = new EventEmitter();
    /**
     * 表头单元格事件
     */
    headerClick = new EventEmitter();
    /**
     * 表头单元格双击事件
     */
    headerDblclick = new EventEmitter();
    /**
     * 表头单元格右键菜单事件
     */
    headerContextmenu = new EventEmitter();
    /**
     * 刷新按钮点击事件
     */
    refreshClick = new EventEmitter();
    /**
     * 排序列触发
     */
    sortedColumn = new EventEmitter();
    children;
    nzTable;
    nzTableElementRef;
    constructor(cdr, render, http, elementRef, antdService) {
        this.cdr = cdr;
        this.render = render;
        this.http = http;
        this.elementRef = elementRef;
        this.antdService = antdService;
    }
    ngOnInit() {
        merge(this.nzPageIndexChange, this.nzPageSizeChange)
            .pipe(debounceTime(50))
            .subscribe(() => this.fetch(false));
        this.nzPageSize = this.nzPageSize || this.antdService.table?.nzPageSize || 10;
        this.resolveColumns();
        this.fetch();
    }
    onResize({ width }, col) {
        col.nzWidth = width + 'px';
    }
    /**
     * 切换表格大小, 增加mini 类型
     * @param size 表格大小
     * @param table nz表格组件
     */
    tableSizeChange(size, table) {
        this.nzSize = size;
        // @ts-ignore
        const tableMainElement = table.elementRef.nativeElement.querySelector('.ant-table');
        if (!tableMainElement) {
            return;
        }
        if (size === 'mini') {
            this.render.addClass(tableMainElement, 'ant-table-mini');
        }
        else {
            this.render.removeClass(tableMainElement, 'ant-table-mini');
        }
    }
    /**
     * 点击刷新按钮
     */
    onRefreshClick() {
        if (this.refreshClick.observed) {
            this.refreshClick.emit(this);
        }
        else {
            this.fetch(false);
        }
    }
    /**
     * 刷新
     * @param reset
     */
    refresh(reset = true) {
        return this.fetch(reset);
    }
    /**
     * 固定列
     * @param column
     */
    fixedClick(column) {
        const hasFixed = this._allColumns.filter(value => value.fixed).length;
        this.scrollX = hasFixed ? '100vw' : null;
    }
    /**
     * 排序
     * @param value
     * @param col
     */
    sortOrderChange(value, col) {
        if (col.nzSortOrderChange) {
            col.nzSortOrderChange(value, col);
        }
        const key = col.nzColumnKey || col.name;
        this.sortInfo = {
            column: col,
            order: value,
            field: key
        };
        this.fetch(false);
    }
    /**
     * 发起请求
     * @param reset 是否重置
     */
    fetch(reset = true) {
        if (!this.api) {
            return null;
        }
        if (this.nzxAutoLoading) {
            this.nzLoading = true;
            this.cdr.markForCheck();
        }
        return new Promise((resolve, reject) => {
            const fetchSetting = Object.assign({}, FETCH_SETTING, this.antdService.table, this.fetchSetting);
            const setResult = res => {
                this.setFetchResult(res, fetchSetting, reset).then(v => resolve(v), reject);
            };
            if (NzxUtils.isString(this.api)) {
                FetcherService.resolveParams(this.params)
                    .pipe(switchMap(_params => {
                    const commonParams = this.mergeParams(reset, fetchSetting);
                    const data = Object.assign({}, _params, commonParams);
                    const beforeFetch = this.beforeFetch || this.antdService.table?.beforeFetch;
                    if (!beforeFetch) {
                        return this.doFetch(this.api, fetchSetting.method, commonParams, data);
                    }
                    return FetcherService.resolveParams(beforeFetch(data)).pipe(_data => this.doFetch(this.api, fetchSetting.method, commonParams, _data));
                }))
                    .subscribe({
                    next: res => this.setFetchResult(res, fetchSetting, reset).then(v => resolve(v), reject),
                    error: err => reject(err)
                });
                return;
            }
            if (NzxUtils.isObservable(this.api)) {
                this.api.subscribe({ next: setResult, error: err => reject(err) });
                return;
            }
            if (NzxUtils.isPromise(this.api)) {
                this.api.then(setResult, reject);
                return;
            }
            setResult([]);
        }).finally(() => {
            if (this.nzxAutoLoading) {
                this.nzLoading = false;
            }
            this.cdr.markForCheck();
        });
    }
    /**
     * 行点击事件
     * @param info
     */
    onRowClick(info) {
        this.rowClick.emit(info);
        if (this.nzxClickSelectedRow !== false) {
            this._selectRow = this._selectRow === info.row ? undefined : info.row;
        }
    }
    /**
     * 执行请求
     * @param url
     * @param method
     * @param params
     * @param data
     * @protected
     */
    doFetch(url, method, params, data) {
        const option = {};
        method ||= 'post';
        if (/^post|put$/i.test(method)) {
            option.params = params;
            option.body = data;
        }
        else {
            option.params = Object.assign({}, data, params);
        }
        return this.http.request(method, url, option);
    }
    /**
     * 处理请求结果
     * @param res
     * @param fetchSetting
     * @param reset
     * @private
     */
    setFetchResult(res, fetchSetting, reset) {
        let result = {};
        const afterFetch = this.afterFetch || this.antdService.table?.afterFetch;
        if (afterFetch && NzxUtils.isFunction(afterFetch)) {
            const data = afterFetch(res, this.nzPageIndex, reset);
            if (NzxUtils.isPromise(data)) {
                return data.then(v => this.setPageInfo(res, v, fetchSetting, reset));
            }
            result = data || {};
        }
        else {
            if (Array.isArray(res)) {
                result.list = res;
                result.total = res.length;
            }
        }
        return Promise.resolve(this.setPageInfo(res, result, fetchSetting, reset));
    }
    /**
     * 设置分页信息
     * @param res 响应对象
     * @param pageInfo 原pageInfo
     * @param fetchSetting 配置
     * @param reset 是否重置
     * @private
     */
    setPageInfo(res, pageInfo, fetchSetting, reset) {
        const total = pageInfo.total != null ? pageInfo.total : NzxUtils.get(res, fetchSetting.totalField);
        const pageIndex = reset
            ? 1
            : pageInfo.pageIndex != null
                ? pageInfo.pageIndex
                : NzxUtils.get(res, fetchSetting.pageIndexField);
        this.nzData = pageInfo.list || NzxUtils.get(res, fetchSetting.listField);
        this.nzTotal = total || 0;
        if (pageIndex != null) {
            this.nzPageIndex = pageIndex;
        }
        this.cdr.markForCheck();
        return pageInfo;
    }
    /**
     * 合并请求参数
     * @param reset
     * @param fetchSetting
     * @private
     */
    mergeParams(reset = true, fetchSetting) {
        const nzPageIndex = reset ? 1 : this.nzPageIndex;
        const params = {};
        NzxUtils.set(params, fetchSetting.pageIndexField, nzPageIndex);
        NzxUtils.set(params, fetchSetting.pageSizeField, this.nzPageSize);
        if (this.sortInfo) {
            const sortInfo = NzxUtils.isFunction(this.sortFn) ? this.sortFn(this.sortInfo) : this.sortInfo;
            delete sortInfo.column;
            Object.assign(params, sortInfo);
        }
        return params;
    }
    /**
     * 是否是异步数据
     * @param obj
     * @protected
     */
    isAsync(obj) {
        return NzxUtils.isObservable(obj) || NzxUtils.isPromise(obj);
    }
    /**
     * 处理表头合并单元格和 body的列
     * @protected
     */
    resolveColumns() {
        const { headerRows, bodyRows, allColumns } = this.getRowColumns(this.nzxColumns);
        this._headerColumns = headerRows;
        this._allColumns = allColumns;
        // 没有合并表头, 使用同一对象
        this._bodyColumns = headerRows.length ? bodyRows : headerRows[0];
    }
    /**
     * 处理参数为模板的参数, 从字符串中找到真正的模板对象
     * @protected
     */
    resolveTemplateColumn() {
        const nameTemplateMap = {};
        for (const tpl of this.children) {
            nameTemplateMap[tpl.named] = tpl.template;
        }
        if (this.tplMap) {
            this.tplMap.forEach((value, key) => (nameTemplateMap[key] = value));
        }
        this._allColumns.forEach(col => Object.keys(col)
            .filter(v => /Template$/.test(v))
            .forEach(tplName => this.stringToTemplate(col, tplName, nameTemplateMap)));
        setTimeout(() => this.cdr.markForCheck());
    }
    /**
     * 字符串查找对应的模版
     * @param col
     * @param key
     * @param nameTemplateMap
     * @protected
     */
    stringToTemplate(col, key, nameTemplateMap) {
        const newKey = '_' + key;
        if (typeof col[key] === 'string') {
            const tpl = nameTemplateMap[col[key]];
            if (tpl) {
                col[newKey] = tpl;
            }
        }
        else if (col[key] instanceof TemplateRef) {
            col[newKey] = col[key];
        }
    }
    /**
     * 表头触发CheckBox change
     * @param evt
     * @param col
     */
    thCheckedChange(evt, col) {
        if (col.enableCheckAll !== false) {
            col.checked = evt;
            col.nzIndeterminate = false;
            NzxUtils.forEachTree(this._currentPageData, v => {
                if (!v.disabled) {
                    // @ts-ignore
                    v.checked = evt;
                    // @ts-ignore
                    v.nzIndeterminate = false;
                }
            });
        }
        if (col.thCheckedChange) {
            col.thCheckedChange(evt, col);
        }
        this.cdr.markForCheck();
    }
    /**
     * td触发CheckBox change
     * @param evt
     * @param col
     * @param row
     * @param pathTrace 父节点路径
     * @param indexAttr
     */
    tdCheckedChange(evt, col, row, pathTrace, indexAttr) {
        if (col.enableCheckAll !== false) {
            // 非受控的checkbox
            if (this.nzCheckStrictly !== true) {
                // @ts-ignore
                row.nzIndeterminate = false;
                NzxUtils.forEachTree(row.children, node => {
                    if (!node.disabled) {
                        node.checked = evt;
                    }
                });
                let [parents, parent] = pathTrace;
                while (parent) {
                    if (parent.children) {
                        this._refreshCheckedStatus(parent, parent.children);
                    }
                    if (!parents) {
                        break;
                    }
                    parent = parents[1];
                    parents = parents[0];
                }
            }
            this.refreshCheckedStatus(col);
        }
        if (col.tdCheckedChange) {
            col.tdCheckedChange(evt, col, row, indexAttr);
        }
        this.cdr.markForCheck();
    }
    onCurrentPageDataChange(list) {
        this._currentPageData = list;
        const col = this._bodyColumns.filter(v => v.nzShowCheckbox)[0];
        if (col) {
            this.refreshCheckedStatus(col);
        }
        this.nzCurrentPageDataChange.emit(list);
        this.cdr.markForCheck();
    }
    refreshCheckedStatus(col) {
        this._refreshCheckedStatus(col, this._currentPageData);
    }
    _refreshCheckedStatus(parent, listData) {
        const list = listData.filter(v => !v.disabled);
        if (list.length) {
            parent.checked = list.every(v => v.checked);
            parent.nzIndeterminate = !parent.checked && list.some(v => v.checked);
        }
        else {
            parent.checked = false;
            parent.nzIndeterminate = false;
        }
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.resolveTemplateColumn());
        this.resolveTemplateColumn();
    }
    ngAfterViewInit() {
        if (this.nzSize === 'mini') {
            this.tableSizeChange(this.nzSize, this.nzTable);
        }
        setTimeout(() => this.fixedFit());
    }
    onWindowResize() {
        this.fixedFit();
    }
    ngOnChanges(changes) {
        if ((changes.nzxColumns && !changes.nzxColumns.isFirstChange()) ||
            (changes.tplMap && !changes.tplMap.isFirstChange())) {
            this.resolveColumns();
            this.resolveTemplateColumn();
        }
        if (changes.api && !changes.api.isFirstChange()) {
            this.fetch(true);
        }
    }
    /**
     * 拖拽排序
     * @param event
     */
    onSortedColumn(event) {
        moveItemInArray(this._headerColumns[0], event.previousIndex, event.currentIndex);
        this.sortedColumn.emit(event);
    }
    /**
     * 折叠子节点
     * @param row
     * @param $event
     */
    defaultCollapse(row, $event) {
        const { children } = row || {};
        if (!$event && children && children.length) {
            children.forEach((c) => {
                if (c && c.children && c.children.length) {
                    // @ts-ignore
                    c.expand = false;
                    this.defaultCollapse(c, false);
                }
            });
        }
    }
    /**
     * 获取合并表头
     * @param originColumns 原始列配置
     * @protected
     */
    getRowColumns(originColumns) {
        let maxLevel = 0;
        const allColumns = [];
        NzxUtils.forEachTree(originColumns, (node, parent, level) => {
            this.normalProps(node);
            allColumns.push(node);
            node.colspan = node.children && node.children.length ? 0 : 1;
            node.level = level;
            if (level > maxLevel) {
                maxLevel = level;
            }
            node.parent = parent;
            if (parent && !node.children) {
                let p = parent;
                while (p) {
                    p.colspan++;
                    p = p.parent;
                }
            }
        });
        const headerRows = Array.from({ length: maxLevel + 1 })
            .fill(0)
            .map(() => []);
        const bodyRows = [];
        allColumns.forEach(col => {
            if (!col.children) {
                col.rowspan = maxLevel - col.level + 1;
                bodyRows.push(col);
            }
            else {
                col.rowspan = 1;
            }
            headerRows[col.level].push(col);
        });
        return { headerRows, bodyRows, allColumns };
    }
    /**
     * 规范化属性
     * @param col 列
     * @protected
     */
    normalProps(col) {
        if (col.visible == null) {
            col.visible = true;
        }
        if (col.thText == null && col.isIndex) {
            col.thText = '序号';
        }
    }
    /**
     * 计算撑满父容器
     * @private
     */
    fixedFit() {
        if (!this.nzxFit) {
            return;
        }
        const element = this.nzTableElementRef.nativeElement;
        const table = element.querySelector('.ant-table');
        const container = element.querySelector('.ant-table-container');
        if (!table || !container) {
            return;
        }
        container.style.position = 'absolute';
        const headers = table.querySelectorAll('.ant-table-thead');
        let height = 0;
        headers.forEach(v => (height += v.getBoundingClientRect().height));
        const scrollY = table.getBoundingClientRect().height - height;
        container.style.position = '';
        this.scrollY = `${scrollY}px`;
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1.HttpClient }, { token: i0.ElementRef }, { token: i2.NzxAntdService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxTableComponent, selector: "nzx-table", inputs: { api: "api", params: "params", nzxRefreshVisible: "nzxRefreshVisible", nzxResizeVisible: "nzxResizeVisible", nzxSettingVisible: "nzxSettingVisible", nzxStripe: "nzxStripe", beforeFetch: "beforeFetch", afterFetch: "afterFetch", fetchSetting: "fetchSetting", sortFn: "sortFn", nzxColumns: "nzxColumns", nzxDefaultRenderHeader: "nzxDefaultRenderHeader", title: "title", nzxShowHeader: "nzxShowHeader", toolbarBefore: "toolbarBefore", toolbar: "toolbar", nzxResizable: "nzxResizable", nzTableLayout: "nzTableLayout", nzShowTotal: "nzShowTotal", nzItemRender: "nzItemRender", nzTitle: "nzTitle", nzFooter: "nzFooter", nzNoResult: "nzNoResult", nzPageSizeOptions: "nzPageSizeOptions", nzVirtualItemSize: "nzVirtualItemSize", nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx", nzVirtualMinBufferPx: "nzVirtualMinBufferPx", nzLoadingDelay: "nzLoadingDelay", nzPageIndex: "nzPageIndex", nzPageSize: "nzPageSize", nzTotal: "nzTotal", nzWidthConfig: "nzWidthConfig", nzData: "nzData", nzPaginationPosition: "nzPaginationPosition", scrollX: "scrollX", scrollY: "scrollY", nzxFit: "nzxFit", nzPaginationType: "nzPaginationType", nzFrontPagination: "nzFrontPagination", nzTemplateMode: "nzTemplateMode", nzShowPagination: "nzShowPagination", nzLoading: "nzLoading", nzxAutoLoading: "nzxAutoLoading", nzOuterBordered: "nzOuterBordered", nzLoadingIndicator: "nzLoadingIndicator", nzBordered: "nzBordered", nzSize: "nzSize", nzShowSizeChanger: "nzShowSizeChanger", nzHideOnSinglePage: "nzHideOnSinglePage", nzShowQuickJumper: "nzShowQuickJumper", nzSimple: "nzSimple", actionVisible: "actionVisible", toolbarVisible: "toolbarVisible", nzxClickSelectedRow: "nzxClickSelectedRow", defaultText: "defaultText", tplMap: "tplMap", nzVirtualForTrackBy: "nzVirtualForTrackBy", nzxSpanFunc: "nzxSpanFunc", nzxTr: "nzxTr", nzIndentSize: "nzIndentSize", nzCheckStrictly: "nzCheckStrictly" }, outputs: { nzPageSizeChange: "nzPageSizeChange", nzPageIndexChange: "nzPageIndexChange", nzQueryParams: "nzQueryParams", nzCurrentPageDataChange: "nzCurrentPageDataChange", rowClick: "rowClick", rowDblclick: "rowDblclick", rowContextmenu: "rowContextmenu", cellClick: "cellClick", cellDblclick: "cellDblclick", cellContextmenu: "cellContextmenu", headerClick: "headerClick", headerDblclick: "headerDblclick", headerContextmenu: "headerContextmenu", refreshClick: "refreshClick", sortedColumn: "sortedColumn" }, host: { listeners: { "window:resize": "onWindowResize($event)" }, properties: { "class.nzx-table": "true", "class.nzx-table-fit": "nzxFit" } }, queries: [{ propertyName: "children", predicate: NamedTemplate }], viewQueries: [{ propertyName: "nzTable", first: true, predicate: ["basicTable"], descendants: true, static: true }, { propertyName: "nzTableElementRef", first: true, predicate: ["basicTable"], descendants: true, read: (ElementRef), static: true }], usesOnChanges: true, ngImport: i0, template: "<nzx-table-header\r\n  *ngIf=\"toolbarVisible !== false\"\r\n  [actionVisible]=\"actionVisible\"\r\n  [tableSize]=\"nzSize\"\r\n  [refreshVisible]=\"nzxRefreshVisible\"\r\n  [resizeVisible]=\"nzxResizeVisible\"\r\n  (tableSizeChange)=\"tableSizeChange($event, basicTable)\"\r\n  (refreshClick)=\"onRefreshClick()\"\r\n>\r\n  <ng-container *nzStringTemplateOutlet=\"title; context: { $implicit: { context: this } }\">\r\n    {{ title }}\r\n  </ng-container>\r\n  <ng-content select=\"[title]\"></ng-content>\r\n\r\n  <ng-container setting-before>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbarBefore; context: { $implicit: { context: this } }\">\r\n      {{ toolbarBefore }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbarBefore]\"></ng-content>\r\n  </ng-container>\r\n\r\n  <nzx-column-setting\r\n    setting\r\n    *ngIf=\"nzxSettingVisible\"\r\n    [nzxColumns]=\"_bodyColumns\"\r\n    (sortedColumn)=\"onSortedColumn($event)\"\r\n    (fixedClick)=\"fixedClick($event)\"\r\n  ></nzx-column-setting>\r\n\r\n  <ng-container toolbar>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbar; context: { $implicit: { context: this } }\">\r\n      {{ toolbar }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbar]\"></ng-content>\r\n  </ng-container>\r\n</nzx-table-header>\r\n\r\n<nz-table\r\n  #basicTable\r\n  class=\"nzx-inner-table\"\r\n  [nzData]=\"nzData\"\r\n  [nzTableLayout]=\"nzTableLayout\"\r\n  [nzFrontPagination]=\"nzFrontPagination\"\r\n  [nzTotal]=\"nzTotal\"\r\n  [(nzPageIndex)]=\"nzPageIndex\"\r\n  [(nzPageSize)]=\"nzPageSize\"\r\n  [nzShowPagination]=\"nzShowPagination\"\r\n  [nzPaginationPosition]=\"nzPaginationPosition\"\r\n  [nzPaginationType]=\"nzPaginationType\"\r\n  [nzBordered]=\"nzBordered\"\r\n  [nzOuterBordered]=\"nzOuterBordered\"\r\n  [nzWidthConfig]=\"nzWidthConfig\"\r\n  [nzSize]=\"$any(nzSize)\"\r\n  [nzLoading]=\"nzLoading\"\r\n  [nzLoadingIndicator]=\"nzLoadingIndicator\"\r\n  [nzLoadingDelay]=\"nzLoadingDelay\"\r\n  [nzScroll]=\"nzScroll\"\r\n  [nzTitle]=\"nzTitle\"\r\n  [nzFooter]=\"nzFooter\"\r\n  [nzNoResult]=\"nzNoResult\"\r\n  [nzPageSizeOptions]=\"nzPageSizeOptions || defaultPageSizeOptions\"\r\n  [nzShowQuickJumper]=\"nzShowQuickJumper\"\r\n  [nzShowSizeChanger]=\"nzShowSizeChanger\"\r\n  [nzShowTotal]=\"nzShowTotal == null ? totalTemplate : nzShowTotal\"\r\n  [nzItemRender]=\"nzItemRender\"\r\n  [nzHideOnSinglePage]=\"nzHideOnSinglePage\"\r\n  [nzSimple]=\"nzSimple\"\r\n  [nzTemplateMode]=\"nzTemplateMode\"\r\n  [nzVirtualItemSize]=\"nzVirtualItemSize\"\r\n  [nzVirtualMaxBufferPx]=\"nzVirtualMaxBufferPx\"\r\n  [nzVirtualMinBufferPx]=\"nzVirtualMinBufferPx\"\r\n  [nzVirtualForTrackBy]=\"nzVirtualForTrackBy\"\r\n  (nzPageIndexChange)=\"nzPageIndexChange.emit($event)\"\r\n  (nzPageSizeChange)=\"nzPageSizeChange.emit($event)\"\r\n  (nzCurrentPageDataChange)=\"onCurrentPageDataChange($event)\"\r\n  (nzQueryParams)=\"nzQueryParams.emit($event)\"\r\n>\r\n  <thead *ngIf=\"nzxShowHeader !== false\">\r\n    <ng-container *ngIf=\"nzxDefaultRenderHeader !== false\">\r\n      <tr *ngFor=\"let row of _headerColumns\">\r\n        <ng-container *ngFor=\"let col of row\">\r\n          <th\r\n            *ngIf=\"(!col.nzShowCheckbox || col.nzShowCheckAll === false) && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowSort]=\"col.nzShowSort\"\r\n            [nzCustomFilter]=\"col.nzCustomFilter\"\r\n            [nzSortFn]=\"col.nzSortFn == null ? true : col.nzSortFn\"\r\n            [nzSortDirections]=\"col.nzSortDirections\"\r\n            [(nzSortOrder)]=\"col.nzSortOrder\"\r\n            (nzSortOrderChange)=\"sortOrderChange($event, col)\"\r\n            [nzColumnKey]=\"col.nzColumnKey || col.name\"\r\n            [nzShowFilter]=\"col.nzShowFilter\"\r\n            [nzSortPriority]=\"col.nzSortPriority === true\"\r\n            [nzFilterFn]=\"col.nzShowFilter && col.nzFilterFn == null ? true : col.nzFilterFn\"\r\n            (nzFilterChange)=\"col.nzFilterChange?.($event, nzData)\"\r\n            [nzFilters]=\"col.nzFilters\"\r\n            [nzFilterMultiple]=\"col.nzFilterMultiple !== false\"\r\n            [nzWidth]=\"col.nzWidth == null && col.isIndex ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n\r\n          <th\r\n            *ngIf=\"col.nzShowCheckbox && col.nzShowCheckAll !== false && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox\"\r\n            [nzIndeterminate]=\"col.nzIndeterminate\"\r\n            [(nzChecked)]=\"col.checked\"\r\n            (nzCheckedChange)=\"thCheckedChange($event, col)\"\r\n            [nzShowRowSelection]=\"col.nzShowRowSelection\"\r\n            [nzSelections]=\"col.nzSelections\"\r\n            [nzWidth]=\"col.nzWidth == null && col.nzShowCheckbox ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n  </thead>\r\n\r\n  <tbody *ngIf=\"nzVirtualForTrackBy || nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-template nz-virtual-scroll let-row let-index=\"index\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: index === 0,\r\n            last: nzData.length === index + 1,\r\n            even: index % 2 === 0,\r\n            odd: index % 2 !== 0,\r\n            level: 0,\r\n            parent: null\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-template>\r\n  </tbody>\r\n\r\n  <tbody *ngIf=\"!nzVirtualForTrackBy && !nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-container\r\n      *ngFor=\"let row of basicTable.data; index as index; first as first; last as last; even as even; odd as odd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: first,\r\n            last: last,\r\n            even: even,\r\n            odd: odd,\r\n            level: 0,\r\n            parent: null,\r\n            pathTrace: []\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </tbody>\r\n\r\n  <ng-template\r\n    #trTemplate\r\n    let-row\r\n    let-index=\"index\"\r\n    let-first=\"first\"\r\n    let-last=\"last\"\r\n    let-even=\"even\"\r\n    let-odd=\"odd\"\r\n    let-level=\"level\"\r\n    let-parent=\"parent\"\r\n    let-pathTrace=\"pathTrace\"\r\n  >\r\n    <tr\r\n      *ngIf=\"!parent || parent.expand\"\r\n      (click)=\"\r\n        onRowClick({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (dblclick)=\"\r\n        rowDblclick.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (contextmenu)=\"\r\n        rowContextmenu.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      [ngClass]=\"row.className\"\r\n      [ngStyle]=\"row.style\"\r\n      [class.ant-table-row-selected]=\"row.checked || _selectRow === row\"\r\n    >\r\n      <ng-container\r\n        *ngFor=\"let col of _bodyColumns; index as _index; first as _first; last as _last; even as _even; odd as _odd\"\r\n      >\r\n        <ng-container\r\n          *let=\"\r\n            row\r\n              | colSpan\r\n                : nzxSpanFunc\r\n                : nzData\r\n                : basicTable.data\r\n                : col\r\n                : { index: index, first: first, last: last, even: even, odd: odd }\r\n                : {\r\n                    index: _index,\r\n                    first: _first,\r\n                    last: _last,\r\n                    even: _even,\r\n                    odd: _odd\r\n                  } as span\r\n          \"\r\n        >\r\n          <td\r\n            *ngIf=\"col.visible !== false && span.rowspan && span.colspan\"\r\n            (click)=\"\r\n              cellClick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (dblclick)=\"\r\n              cellDblclick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (contextmenu)=\"\r\n              cellContextmenu.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox || row.showCheckbox\"\r\n            [nzDisabled]=\"row.disabled\"\r\n            [nzIndeterminate]=\"row.nzIndeterminate\"\r\n            [(nzChecked)]=\"row.checked\"\r\n            (nzCheckedChange)=\"tdCheckedChange($event, col, row, pathTrace, { index, first, last, even, odd })\"\r\n            [nzShowExpand]=\"col.showExpand && row.children && row.children.length > 0\"\r\n            [(nzExpand)]=\"row.expand\"\r\n            (nzExpandChange)=\"\r\n              defaultCollapse(row, $event);\r\n              col.nzExpandChange && col.nzExpandChange($event, col, row, { index, first, last, even, odd })\r\n            \"\r\n            [nzIndentSize]=\"col.showExpand ? level * nzIndentSize : null\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.tdAlign || col.nzAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [attr.colspan]=\"span.colspan\"\r\n            [attr.rowspan]=\"span.rowspan\"\r\n            [ngClass]=\"col.tdNgClass\"\r\n            [ngStyle]=\"col.tdNgStyle\"\r\n          >\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                tdDataRender;\r\n                context: {\r\n                  $implicit: {\r\n                    col: col,\r\n                    column: col,\r\n                    row: row,\r\n                    context: this,\r\n                    nzData: nzData,\r\n                    nzPageData: basicTable.data,\r\n                    indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                    colIndex: { index: _index, first: _first, last: _last, even: _even, odd: _odd },\r\n                    parent: parent\r\n                  },\r\n                  row: row\r\n                }\r\n              \"\r\n            ></ng-container>\r\n          </td>\r\n        </ng-container>\r\n      </ng-container>\r\n    </tr>\r\n\r\n    <ng-container\r\n      *ngFor=\"let child of row.children; index as cIndex; first as cFirst; last as cLast; even as cEven; odd as cOdd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: child,\r\n            level: level + 1,\r\n            parentIndex: index,\r\n            row: child,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: cIndex,\r\n            first: cFirst,\r\n            last: cLast,\r\n            even: cEven,\r\n            odd: cOdd,\r\n            parent: row,\r\n            pathTrace: [pathTrace, row]\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</nz-table>\r\n\r\n<ng-template #thRenderTemplate let-data>\r\n  <ng-container *ngIf=\"data.col._thTemplate; else textThTemplate\">\r\n    <ng-container\r\n      *ngTemplateOutlet=\"data.col._thTemplate; context: { $implicit: data, data: data, col: data.col }\"\r\n    ></ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #textThTemplate>\r\n    {{ data.col.thText == null && data.col.isIndex ? '\u5E8F\u53F7' : data.col.thText }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #tdDataRender let-data let-row=\"row\">\r\n  <ng-container *ngIf=\"!data.col.isIndex; else tdTemplateTemplate\">\r\n    <ng-container *ngIf=\"data.col._tdTemplate; else buttonControlTemplate\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          data.col._tdTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            data: data,\r\n            col: data.col,\r\n            indexAttr: data.indexAttr,\r\n            parent: data.parent\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #tdTemplateTemplate>\r\n    {{ nzPageSize * (nzPageIndex - 1) + data.indexAttr.index + 1 }}\r\n  </ng-template>\r\n\r\n  <!-- \u6309\u94AE\u5217-->\r\n  <ng-template #buttonControlTemplate>\r\n    <ng-container *ngIf=\"data.col.buttons; else widgetControlTemplate\">\r\n      <ng-container\r\n        *ngFor=\"\r\n          let btn of data.col.buttons | colButtons: row : data : data.parent | async;\r\n          index as index;\r\n          count as count;\r\n          last as last\r\n        \"\r\n      >\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <nzx-table-button\r\n            *ngIf=\"btn.link === false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-button>\r\n          <nzx-table-link\r\n            *ngIf=\"btn.link !== false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-link>\r\n          <nz-divider *ngIf=\"btn.showDivider !== false && count > 1 && !last\" nzType=\"vertical\"></nz-divider>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <!--\u81EA\u5B9A\u4E49\u90E8\u4EF6-->\r\n  <ng-template #widgetControlTemplate>\r\n    <ng-container *ngIf=\"data.col.widgets; else textValueTemplate\">\r\n      <ng-container *ngFor=\"let btn of data.col.widgets | colButtons: row : data : data.parent | async\">\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <ng-template\r\n            table-widget\r\n            [widget]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></ng-template>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #textValueTemplate>\r\n    {{\r\n      row\r\n        | colFormat: data.col : data\r\n        | async\r\n        | defaultify: (data.col.nzShowCheckbox ? '' : data.col.defaultify || defaultText)\r\n    }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #totalTemplate let-range=\"range\" let-total>\r\n  \u7B2C {{ range[0] / nzPageSize | math: 'ceil' }}/{{ total / nzPageSize | math: 'ceil' }} \u9875 \u5171 {{ total }} \u6761\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i4.NzTableComponent, selector: "nz-table", inputs: ["nzTableLayout", "nzShowTotal", "nzItemRender", "nzTitle", "nzFooter", "nzNoResult", "nzPageSizeOptions", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualForTrackBy", "nzLoadingDelay", "nzPageIndex", "nzPageSize", "nzTotal", "nzWidthConfig", "nzData", "nzCustomColumn", "nzPaginationPosition", "nzScroll", "nzPaginationType", "nzFrontPagination", "nzTemplateMode", "nzShowPagination", "nzLoading", "nzOuterBordered", "nzLoadingIndicator", "nzBordered", "nzSize", "nzShowSizeChanger", "nzHideOnSinglePage", "nzShowQuickJumper", "nzSimple"], outputs: ["nzPageSizeChange", "nzPageIndexChange", "nzQueryParams", "nzCurrentPageDataChange", "nzCustomColumnChange"], exportAs: ["nzTable"] }, { kind: "component", type: i4.NzThAddOnComponent, selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", inputs: ["nzColumnKey", "nzFilterMultiple", "nzSortOrder", "nzSortPriority", "nzSortDirections", "nzFilters", "nzSortFn", "nzFilterFn", "nzShowSort", "nzShowFilter", "nzCustomFilter"], outputs: ["nzCheckedChange", "nzSortOrderChange", "nzFilterChange"] }, { kind: "directive", type: i4.NzTableCellDirective, selector: "th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])" }, { kind: "directive", type: i4.NzThMeasureDirective, selector: "th", inputs: ["nzWidth", "colspan", "colSpan", "rowspan", "rowSpan"] }, { kind: "component", type: i4.NzTdAddOnComponent, selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]", inputs: ["nzChecked", "nzDisabled", "nzIndeterminate", "nzIndentSize", "nzShowExpand", "nzShowCheckbox", "nzExpand"], outputs: ["nzCheckedChange", "nzExpandChange"] }, { kind: "component", type: i4.NzTheadComponent, selector: "thead:not(.ant-table-thead)", outputs: ["nzSortOrderChange"] }, { kind: "component", type: i4.NzTbodyComponent, selector: "tbody" }, { kind: "directive", type: i4.NzTrDirective, selector: "tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])" }, { kind: "directive", type: i4.NzTableVirtualScrollDirective, selector: "[nz-virtual-scroll]", exportAs: ["nzVirtualScroll"] }, { kind: "directive", type: i4.NzCellFixedDirective, selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]", inputs: ["nzRight", "nzLeft", "colspan", "colSpan"] }, { kind: "directive", type: i4.NzCellBreakWordDirective, selector: "th[nzBreakWord],td[nzBreakWord]", inputs: ["nzBreakWord"] }, { kind: "directive", type: i4.NzCellAlignDirective, selector: "th[nzAlign],td[nzAlign]", inputs: ["nzAlign"] }, { kind: "directive", type: i4.NzCellEllipsisDirective, selector: "th[nzEllipsis],td[nzEllipsis]", inputs: ["nzEllipsis"] }, { kind: "component", type: i4.NzThSelectionComponent, selector: "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]", inputs: ["nzSelections", "nzChecked", "nzDisabled", "nzIndeterminate", "nzShowCheckbox", "nzShowRowSelection"], outputs: ["nzCheckedChange"] }, { kind: "directive", type: i5.NzResizableDirective, selector: "[nz-resizable]", inputs: ["nzBounds", "nzMaxHeight", "nzMaxWidth", "nzMinHeight", "nzMinWidth", "nzGridColumnCount", "nzMaxColumn", "nzMinColumn", "nzLockAspectRatio", "nzPreview", "nzDisabled"], outputs: ["nzResize", "nzResizeEnd", "nzResizeStart"], exportAs: ["nzResizable"] }, { kind: "component", type: i5.NzResizeHandlesComponent, selector: "nz-resize-handles", inputs: ["nzDirections"], exportAs: ["nzResizeHandles"] }, { kind: "component", type: i6.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "directive", type: i7.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: i8.LetDirective, selector: "[let]", inputs: ["let"] }, { kind: "component", type: i9.TableButtonComponent, selector: "nzx-table-button", inputs: ["props", "row", "indexAttr", "colIndex", "column", "nzData", "nzPageData"] }, { kind: "component", type: i10.TableLinkComponent, selector: "nzx-table-link", inputs: ["props", "nzData", "nzPageData", "row", "indexAttr", "colIndex", "column"] }, { kind: "component", type: i11.NzxTableHeaderComponent, selector: "nzx-table-header", inputs: ["tableSize", "actionVisible", "refreshVisible", "resizeVisible"], outputs: ["tableSizeChange", "refreshClick"] }, { kind: "component", type: i12.NzxColumnSettingComponent, selector: "nzx-column-setting", inputs: ["dragPreviewClass", "columnNameVisible", "nzxColumns"], outputs: ["columnCheckedChange", "sortedColumn", "columnNameCheckedChange", "fixedClick"] }, { kind: "directive", type: i13.TableWidgetDirective, selector: "[table-widget]", inputs: ["row", "indexAttr", "colIndex", "column", "nzData", "nzPageData", "widget"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i14.MathPipe, name: "math" }, { kind: "pipe", type: i14.DefaultifyPipe, name: "defaultify" }, { kind: "pipe", type: i15.ColFormatPipe, name: "colFormat" }, { kind: "pipe", type: i16.ColSpanPipe, name: "colSpan" }, { kind: "pipe", type: i17.ColButtonVisiblePipe, name: "colButtonVisible" }, { kind: "pipe", type: i18.HasAuthPipe, name: "hasAuth" }, { kind: "pipe", type: i19.ColButtonsPipe, name: "colButtons" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-table', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class.nzx-table]': 'true', '[class.nzx-table-fit]': 'nzxFit' }, template: "<nzx-table-header\r\n  *ngIf=\"toolbarVisible !== false\"\r\n  [actionVisible]=\"actionVisible\"\r\n  [tableSize]=\"nzSize\"\r\n  [refreshVisible]=\"nzxRefreshVisible\"\r\n  [resizeVisible]=\"nzxResizeVisible\"\r\n  (tableSizeChange)=\"tableSizeChange($event, basicTable)\"\r\n  (refreshClick)=\"onRefreshClick()\"\r\n>\r\n  <ng-container *nzStringTemplateOutlet=\"title; context: { $implicit: { context: this } }\">\r\n    {{ title }}\r\n  </ng-container>\r\n  <ng-content select=\"[title]\"></ng-content>\r\n\r\n  <ng-container setting-before>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbarBefore; context: { $implicit: { context: this } }\">\r\n      {{ toolbarBefore }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbarBefore]\"></ng-content>\r\n  </ng-container>\r\n\r\n  <nzx-column-setting\r\n    setting\r\n    *ngIf=\"nzxSettingVisible\"\r\n    [nzxColumns]=\"_bodyColumns\"\r\n    (sortedColumn)=\"onSortedColumn($event)\"\r\n    (fixedClick)=\"fixedClick($event)\"\r\n  ></nzx-column-setting>\r\n\r\n  <ng-container toolbar>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbar; context: { $implicit: { context: this } }\">\r\n      {{ toolbar }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbar]\"></ng-content>\r\n  </ng-container>\r\n</nzx-table-header>\r\n\r\n<nz-table\r\n  #basicTable\r\n  class=\"nzx-inner-table\"\r\n  [nzData]=\"nzData\"\r\n  [nzTableLayout]=\"nzTableLayout\"\r\n  [nzFrontPagination]=\"nzFrontPagination\"\r\n  [nzTotal]=\"nzTotal\"\r\n  [(nzPageIndex)]=\"nzPageIndex\"\r\n  [(nzPageSize)]=\"nzPageSize\"\r\n  [nzShowPagination]=\"nzShowPagination\"\r\n  [nzPaginationPosition]=\"nzPaginationPosition\"\r\n  [nzPaginationType]=\"nzPaginationType\"\r\n  [nzBordered]=\"nzBordered\"\r\n  [nzOuterBordered]=\"nzOuterBordered\"\r\n  [nzWidthConfig]=\"nzWidthConfig\"\r\n  [nzSize]=\"$any(nzSize)\"\r\n  [nzLoading]=\"nzLoading\"\r\n  [nzLoadingIndicator]=\"nzLoadingIndicator\"\r\n  [nzLoadingDelay]=\"nzLoadingDelay\"\r\n  [nzScroll]=\"nzScroll\"\r\n  [nzTitle]=\"nzTitle\"\r\n  [nzFooter]=\"nzFooter\"\r\n  [nzNoResult]=\"nzNoResult\"\r\n  [nzPageSizeOptions]=\"nzPageSizeOptions || defaultPageSizeOptions\"\r\n  [nzShowQuickJumper]=\"nzShowQuickJumper\"\r\n  [nzShowSizeChanger]=\"nzShowSizeChanger\"\r\n  [nzShowTotal]=\"nzShowTotal == null ? totalTemplate : nzShowTotal\"\r\n  [nzItemRender]=\"nzItemRender\"\r\n  [nzHideOnSinglePage]=\"nzHideOnSinglePage\"\r\n  [nzSimple]=\"nzSimple\"\r\n  [nzTemplateMode]=\"nzTemplateMode\"\r\n  [nzVirtualItemSize]=\"nzVirtualItemSize\"\r\n  [nzVirtualMaxBufferPx]=\"nzVirtualMaxBufferPx\"\r\n  [nzVirtualMinBufferPx]=\"nzVirtualMinBufferPx\"\r\n  [nzVirtualForTrackBy]=\"nzVirtualForTrackBy\"\r\n  (nzPageIndexChange)=\"nzPageIndexChange.emit($event)\"\r\n  (nzPageSizeChange)=\"nzPageSizeChange.emit($event)\"\r\n  (nzCurrentPageDataChange)=\"onCurrentPageDataChange($event)\"\r\n  (nzQueryParams)=\"nzQueryParams.emit($event)\"\r\n>\r\n  <thead *ngIf=\"nzxShowHeader !== false\">\r\n    <ng-container *ngIf=\"nzxDefaultRenderHeader !== false\">\r\n      <tr *ngFor=\"let row of _headerColumns\">\r\n        <ng-container *ngFor=\"let col of row\">\r\n          <th\r\n            *ngIf=\"(!col.nzShowCheckbox || col.nzShowCheckAll === false) && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowSort]=\"col.nzShowSort\"\r\n            [nzCustomFilter]=\"col.nzCustomFilter\"\r\n            [nzSortFn]=\"col.nzSortFn == null ? true : col.nzSortFn\"\r\n            [nzSortDirections]=\"col.nzSortDirections\"\r\n            [(nzSortOrder)]=\"col.nzSortOrder\"\r\n            (nzSortOrderChange)=\"sortOrderChange($event, col)\"\r\n            [nzColumnKey]=\"col.nzColumnKey || col.name\"\r\n            [nzShowFilter]=\"col.nzShowFilter\"\r\n            [nzSortPriority]=\"col.nzSortPriority === true\"\r\n            [nzFilterFn]=\"col.nzShowFilter && col.nzFilterFn == null ? true : col.nzFilterFn\"\r\n            (nzFilterChange)=\"col.nzFilterChange?.($event, nzData)\"\r\n            [nzFilters]=\"col.nzFilters\"\r\n            [nzFilterMultiple]=\"col.nzFilterMultiple !== false\"\r\n            [nzWidth]=\"col.nzWidth == null && col.isIndex ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n\r\n          <th\r\n            *ngIf=\"col.nzShowCheckbox && col.nzShowCheckAll !== false && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox\"\r\n            [nzIndeterminate]=\"col.nzIndeterminate\"\r\n            [(nzChecked)]=\"col.checked\"\r\n            (nzCheckedChange)=\"thCheckedChange($event, col)\"\r\n            [nzShowRowSelection]=\"col.nzShowRowSelection\"\r\n            [nzSelections]=\"col.nzSelections\"\r\n            [nzWidth]=\"col.nzWidth == null && col.nzShowCheckbox ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n  </thead>\r\n\r\n  <tbody *ngIf=\"nzVirtualForTrackBy || nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-template nz-virtual-scroll let-row let-index=\"index\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: index === 0,\r\n            last: nzData.length === index + 1,\r\n            even: index % 2 === 0,\r\n            odd: index % 2 !== 0,\r\n            level: 0,\r\n            parent: null\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-template>\r\n  </tbody>\r\n\r\n  <tbody *ngIf=\"!nzVirtualForTrackBy && !nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-container\r\n      *ngFor=\"let row of basicTable.data; index as index; first as first; last as last; even as even; odd as odd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: first,\r\n            last: last,\r\n            even: even,\r\n            odd: odd,\r\n            level: 0,\r\n            parent: null,\r\n            pathTrace: []\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </tbody>\r\n\r\n  <ng-template\r\n    #trTemplate\r\n    let-row\r\n    let-index=\"index\"\r\n    let-first=\"first\"\r\n    let-last=\"last\"\r\n    let-even=\"even\"\r\n    let-odd=\"odd\"\r\n    let-level=\"level\"\r\n    let-parent=\"parent\"\r\n    let-pathTrace=\"pathTrace\"\r\n  >\r\n    <tr\r\n      *ngIf=\"!parent || parent.expand\"\r\n      (click)=\"\r\n        onRowClick({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (dblclick)=\"\r\n        rowDblclick.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (contextmenu)=\"\r\n        rowContextmenu.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      [ngClass]=\"row.className\"\r\n      [ngStyle]=\"row.style\"\r\n      [class.ant-table-row-selected]=\"row.checked || _selectRow === row\"\r\n    >\r\n      <ng-container\r\n        *ngFor=\"let col of _bodyColumns; index as _index; first as _first; last as _last; even as _even; odd as _odd\"\r\n      >\r\n        <ng-container\r\n          *let=\"\r\n            row\r\n              | colSpan\r\n                : nzxSpanFunc\r\n                : nzData\r\n                : basicTable.data\r\n                : col\r\n                : { index: index, first: first, last: last, even: even, odd: odd }\r\n                : {\r\n                    index: _index,\r\n                    first: _first,\r\n                    last: _last,\r\n                    even: _even,\r\n                    odd: _odd\r\n                  } as span\r\n          \"\r\n        >\r\n          <td\r\n            *ngIf=\"col.visible !== false && span.rowspan && span.colspan\"\r\n            (click)=\"\r\n              cellClick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (dblclick)=\"\r\n              cellDblclick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (contextmenu)=\"\r\n              cellContextmenu.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox || row.showCheckbox\"\r\n            [nzDisabled]=\"row.disabled\"\r\n            [nzIndeterminate]=\"row.nzIndeterminate\"\r\n            [(nzChecked)]=\"row.checked\"\r\n            (nzCheckedChange)=\"tdCheckedChange($event, col, row, pathTrace, { index, first, last, even, odd })\"\r\n            [nzShowExpand]=\"col.showExpand && row.children && row.children.length > 0\"\r\n            [(nzExpand)]=\"row.expand\"\r\n            (nzExpandChange)=\"\r\n              defaultCollapse(row, $event);\r\n              col.nzExpandChange && col.nzExpandChange($event, col, row, { index, first, last, even, odd })\r\n            \"\r\n            [nzIndentSize]=\"col.showExpand ? level * nzIndentSize : null\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.tdAlign || col.nzAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [attr.colspan]=\"span.colspan\"\r\n            [attr.rowspan]=\"span.rowspan\"\r\n            [ngClass]=\"col.tdNgClass\"\r\n            [ngStyle]=\"col.tdNgStyle\"\r\n          >\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                tdDataRender;\r\n                context: {\r\n                  $implicit: {\r\n                    col: col,\r\n                    column: col,\r\n                    row: row,\r\n                    context: this,\r\n                    nzData: nzData,\r\n                    nzPageData: basicTable.data,\r\n                    indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                    colIndex: { index: _index, first: _first, last: _last, even: _even, odd: _odd },\r\n                    parent: parent\r\n                  },\r\n                  row: row\r\n                }\r\n              \"\r\n            ></ng-container>\r\n          </td>\r\n        </ng-container>\r\n      </ng-container>\r\n    </tr>\r\n\r\n    <ng-container\r\n      *ngFor=\"let child of row.children; index as cIndex; first as cFirst; last as cLast; even as cEven; odd as cOdd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: child,\r\n            level: level + 1,\r\n            parentIndex: index,\r\n            row: child,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: cIndex,\r\n            first: cFirst,\r\n            last: cLast,\r\n            even: cEven,\r\n            odd: cOdd,\r\n            parent: row,\r\n            pathTrace: [pathTrace, row]\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</nz-table>\r\n\r\n<ng-template #thRenderTemplate let-data>\r\n  <ng-container *ngIf=\"data.col._thTemplate; else textThTemplate\">\r\n    <ng-container\r\n      *ngTemplateOutlet=\"data.col._thTemplate; context: { $implicit: data, data: data, col: data.col }\"\r\n    ></ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #textThTemplate>\r\n    {{ data.col.thText == null && data.col.isIndex ? '\u5E8F\u53F7' : data.col.thText }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #tdDataRender let-data let-row=\"row\">\r\n  <ng-container *ngIf=\"!data.col.isIndex; else tdTemplateTemplate\">\r\n    <ng-container *ngIf=\"data.col._tdTemplate; else buttonControlTemplate\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          data.col._tdTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            data: data,\r\n            col: data.col,\r\n            indexAttr: data.indexAttr,\r\n            parent: data.parent\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #tdTemplateTemplate>\r\n    {{ nzPageSize * (nzPageIndex - 1) + data.indexAttr.index + 1 }}\r\n  </ng-template>\r\n\r\n  <!-- \u6309\u94AE\u5217-->\r\n  <ng-template #buttonControlTemplate>\r\n    <ng-container *ngIf=\"data.col.buttons; else widgetControlTemplate\">\r\n      <ng-container\r\n        *ngFor=\"\r\n          let btn of data.col.buttons | colButtons: row : data : data.parent | async;\r\n          index as index;\r\n          count as count;\r\n          last as last\r\n        \"\r\n      >\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <nzx-table-button\r\n            *ngIf=\"btn.link === false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-button>\r\n          <nzx-table-link\r\n            *ngIf=\"btn.link !== false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-link>\r\n          <nz-divider *ngIf=\"btn.showDivider !== false && count > 1 && !last\" nzType=\"vertical\"></nz-divider>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <!--\u81EA\u5B9A\u4E49\u90E8\u4EF6-->\r\n  <ng-template #widgetControlTemplate>\r\n    <ng-container *ngIf=\"data.col.widgets; else textValueTemplate\">\r\n      <ng-container *ngFor=\"let btn of data.col.widgets | colButtons: row : data : data.parent | async\">\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <ng-template\r\n            table-widget\r\n            [widget]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></ng-template>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #textValueTemplate>\r\n    {{\r\n      row\r\n        | colFormat: data.col : data\r\n        | async\r\n        | defaultify: (data.col.nzShowCheckbox ? '' : data.col.defaultify || defaultText)\r\n    }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #totalTemplate let-range=\"range\" let-total>\r\n  \u7B2C {{ range[0] / nzPageSize | math: 'ceil' }}/{{ total / nzPageSize | math: 'ceil' }} \u9875 \u5171 {{ total }} \u6761\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1.HttpClient }, { type: i0.ElementRef }, { type: i2.NzxAntdService }]; }, propDecorators: { api: [{
                type: Input
            }], params: [{
                type: Input
            }], nzxRefreshVisible: [{
                type: Input
            }], nzxResizeVisible: [{
                type: Input
            }], nzxSettingVisible: [{
                type: Input
            }], nzxStripe: [{
                type: Input
            }], beforeFetch: [{
                type: Input
            }], afterFetch: [{
                type: Input
            }], fetchSetting: [{
                type: Input
            }], sortFn: [{
                type: Input
            }], nzxColumns: [{
                type: Input
            }], nzxDefaultRenderHeader: [{
                type: Input
            }], title: [{
                type: Input
            }], nzxShowHeader: [{
                type: Input
            }], toolbarBefore: [{
                type: Input
            }], toolbar: [{
                type: Input
            }], nzxResizable: [{
                type: Input
            }], nzTableLayout: [{
                type: Input
            }], nzShowTotal: [{
                type: Input
            }], nzItemRender: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzNoResult: [{
                type: Input
            }], nzPageSizeOptions: [{
                type: Input
            }], nzVirtualItemSize: [{
                type: Input
            }], nzVirtualMaxBufferPx: [{
                type: Input
            }], nzVirtualMinBufferPx: [{
                type: Input
            }], nzLoadingDelay: [{
                type: Input
            }], nzPageIndex: [{
                type: Input
            }], nzPageSize: [{
                type: Input
            }], nzTotal: [{
                type: Input
            }], nzWidthConfig: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzPaginationPosition: [{
                type: Input
            }], scrollX: [{
                type: Input
            }], scrollY: [{
                type: Input
            }], nzxFit: [{
                type: Input
            }], nzPaginationType: [{
                type: Input
            }], nzFrontPagination: [{
                type: Input
            }], nzTemplateMode: [{
                type: Input
            }], nzShowPagination: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzxAutoLoading: [{
                type: Input
            }], nzOuterBordered: [{
                type: Input
            }], nzLoadingIndicator: [{
                type: Input
            }], nzBordered: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzShowSizeChanger: [{
                type: Input
            }], nzHideOnSinglePage: [{
                type: Input
            }], nzShowQuickJumper: [{
                type: Input
            }], nzSimple: [{
                type: Input
            }], actionVisible: [{
                type: Input
            }], toolbarVisible: [{
                type: Input
            }], nzxClickSelectedRow: [{
                type: Input
            }], defaultText: [{
                type: Input
            }], tplMap: [{
                type: Input
            }], nzVirtualForTrackBy: [{
                type: Input
            }], nzxSpanFunc: [{
                type: Input
            }], nzxTr: [{
                type: Input
            }], nzIndentSize: [{
                type: Input
            }], nzCheckStrictly: [{
                type: Input
            }], nzPageSizeChange: [{
                type: Output
            }], nzPageIndexChange: [{
                type: Output
            }], nzQueryParams: [{
                type: Output
            }], nzCurrentPageDataChange: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], rowDblclick: [{
                type: Output
            }], rowContextmenu: [{
                type: Output
            }], cellClick: [{
                type: Output
            }], cellDblclick: [{
                type: Output
            }], cellContextmenu: [{
                type: Output
            }], headerClick: [{
                type: Output
            }], headerDblclick: [{
                type: Output
            }], headerContextmenu: [{
                type: Output
            }], refreshClick: [{
                type: Output
            }], sortedColumn: [{
                type: Output
            }], children: [{
                type: ContentChildren,
                args: [NamedTemplate]
            }], nzTable: [{
                type: ViewChild,
                args: ['basicTable', { static: true }]
            }], nzTableElementRef: [{
                type: ViewChild,
                args: ['basicTable', { static: true, read: (ElementRef) }]
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFLTixXQUFXLEVBRVgsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQVd2QixPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBZWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxjQUFjLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUczRDs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyxpQkFBaUI7SUFrWGhCO0lBQ0E7SUFDQTtJQUNBO0lBQ0Y7SUFuWFY7O09BRUc7SUFDSCxVQUFVLENBQUs7SUFDZjs7T0FFRztJQUNILGdCQUFnQixHQUFRLEVBQUUsQ0FBQztJQUMzQixjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUN0QyxZQUFZLEdBQW1CLEVBQUUsQ0FBQztJQUNsQyxXQUFXLEdBQW1CLEVBQUUsQ0FBQztJQUV6QixRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2Is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RyxZQUFZO3NCQUFyQixNQUFNO2dCQUV5QixRQUFRO3NCQUF2QyxlQUFlO3VCQUFDLGFBQWE7Z0JBQ2EsT0FBTztzQkFBakQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUV6QyxpQkFBaUI7c0JBRGhCLFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQSxVQUEwQixDQUFBLEVBQUU7Z0JBOGEzRSxjQUFjO3NCQURiLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2UsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBUcmFja0J5RnVuY3Rpb24sXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTnpUYWJsZUNvbXBvbmVudCxcclxuICBOelRhYmxlTGF5b3V0LFxyXG4gIE56VGFibGVQYWdpbmF0aW9uUG9zaXRpb24sXHJcbiAgTnpUYWJsZVBhZ2luYXRpb25UeXBlLFxyXG4gIE56VGFibGVRdWVyeVBhcmFtcyxcclxuICBOelRhYmxlU29ydE9yZGVyXHJcbn0gZnJvbSAnbmctem9ycm8tYW50ZC90YWJsZSc7XHJcbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvcGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IEFueSB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQnO1xyXG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpSZXNpemVFdmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvcmVzaXphYmxlJztcclxuaW1wb3J0IHtcclxuICBDZWxsRXZlbnRBcmcsXHJcbiAgRmV0Y2hTZXR0aW5nLFxyXG4gIEhlYWRlckV2ZW50QXJnLFxyXG4gIEluZGV4QXR0cixcclxuICBOenhDb2x1bW4sXHJcbiAgTnp4VGFibGVTaXplLFxyXG4gIFBhZ2VJbmZvLFxyXG4gIFJvd0V2ZW50QXJnLFxyXG4gIFNvcnRlclJlc3VsdCxcclxuICBTcGFuRnVuYyxcclxuICBUclRlbXBsYXRlQXJnc1xyXG59IGZyb20gJy4vdGFibGUudHlwZSc7XHJcbmltcG9ydCB7IEZFVENIX1NFVFRJTkcgfSBmcm9tICcuL2NvbnN0JztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZCc7XHJcbmltcG9ydCB7IEZldGNoZXJTZXJ2aWNlLCBGZXRjaFBhcmFtcyB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvc2VydmljZSc7XHJcbmltcG9ydCB7IE5hbWVkVGVtcGxhdGUgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL2RpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG4vKipcclxuICog5Z+65LqObnotdGFibGXkuozmrKHlsIHoo4XnmoTooajmoLznu4Tku7ZcclxuICogIyMg54m55oCnXHJcbiAqIC0g6YWN572u5Yqg6L295pWw5o2uOiBgYXBpOiBzdHJpbmcgfCBQcm9taXNlPFRbXT4gfCBPYnNlcnZhYmxlPFRbXT5gXHJcbiAqIC0g5pSv5oyB5YiX55qE6YWN572uOiBgbnp4Q29sdW1uczogTnp4Q29sdW1uPFQ+W11gXHJcbiAqIC0g5YiX5pSv5oyB5o6S5bqP6YWN572uXHJcbiAqIC0g6buY6K6k5pSv5oyB5pi+56S65ouW5Yqo5YiXLCDosIPmlbTliJfpobrluo9cclxuICogLSDmlK/mjIHphY3nva7mmL7npLrluo/lj7fjgIHlpI3pgInmoYZcclxuICogLSDoh6rlrprkuYnmuLLmn5PlhoXlrrnvvIwgdGVtcGxhdGXkvb/nlKjlkI3np7DljbPlj6/lvJXnlKjmiJDlip9cclxuICogLSDmlK/mjIHor7fmsYIv5ZON5bqU5L+h5oGv6YWN572uLCBgZmV0Y2hTZXR0aW5nPzogRmV0Y2hTZXR0aW5nYFxyXG4gKiAtIOaUr+aMgeW8guatpeagvOW8j+WMluWIl+aVsOaNrlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtdGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7ICdbY2xhc3Mubnp4LXRhYmxlXSc6ICd0cnVlJywgJ1tjbGFzcy5uengtdGFibGUtZml0XSc6ICduenhGaXQnIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eFRhYmxlQ29tcG9uZW50PFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBBbnk+ID0gQW55PlxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXNcclxue1xyXG4gIC8qKlxyXG4gICAqIOW9k+WJjemAieS4reeahOihjFxyXG4gICAqL1xyXG4gIF9zZWxlY3RSb3c/OiBUO1xyXG4gIC8qKlxyXG4gICAqIOW9k+WJjemhteaVsOaNrlxyXG4gICAqL1xyXG4gIF9jdXJyZW50UGFnZURhdGE6IFRbXSA9IFtdO1xyXG4gIF9oZWFkZXJDb2x1bW5zOiBOenhDb2x1bW48VD5bXVtdID0gW107XHJcbiAgX2JvZHlDb2x1bW5zOiBOenhDb2x1bW48VD5bXSA9IFtdO1xyXG4gIF9hbGxDb2x1bW5zOiBOenhDb2x1bW48VD5bXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIF9uelRvdGFsID0gMDtcclxuICBwcml2YXRlIF9uelNob3dQYWdpbmF0aW9uID0gdHJ1ZTtcclxuICBzb3J0SW5mbz86IFNvcnRlclJlc3VsdDtcclxuICBkZWZhdWx0UGFnZVNpemVPcHRpb25zID0gWzEwLCAxNSwgMjAsIDMwLCA0MCwgNTAsIDEwMF07XHJcblxyXG4gIC8qKlxyXG4gICAqIOivt+axguWkhOeQhlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFwaSE6IHN0cmluZyB8IFByb21pc2U8VFtdPiB8IE9ic2VydmFibGU8VFtdPjtcclxuXHJcbiAgLyoqXHJcbiAgICog6K+35rGC5Y+C5pWwXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFyYW1zPzogRmV0Y2hQYXJhbXM7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S65Yi35paw5oyJ6ZKuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4UmVmcmVzaFZpc2libGUgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuuiwg+aVtOihqOagvOWkp+Wwj+aMiemSrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFJlc2l6ZVZpc2libGUgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOaYvuekuumFjee9ruWIlywg5Y+q5Zyo6Z2e5ZCI5bm26KGo5aS05pe25Y+v55SoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U2V0dGluZ1Zpc2libGUgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuuaWkemprOe6v1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0cmlwZSA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOivt+axguS5i+WJjeWkhOeQhuWHveaVsFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJlZm9yZUZldGNoPzogKHBhcmFtczogUmVjb3JkPHN0cmluZywgQW55PikgPT4gUmVjb3JkPHN0cmluZywgQW55PiB8IFByb21pc2U8QW55PjtcclxuICAvKipcclxuICAgKiDor7fmsYLkuYvlkI7lpITnkIblh73mlbBcclxuICAgKi9cclxuICBASW5wdXQoKSBhZnRlckZldGNoPzogKFxyXG4gICAgcmVzOiBBbnksXHJcbiAgICBwYWdlSW5kZXg6IG51bWJlcixcclxuICAgIHJlc2V0OiBib29sZWFuXHJcbiAgKSA9PiBQYXJ0aWFsPFBhZ2VJbmZvPFQ+PiB8IFByb21pc2U8UGFydGlhbDxQYWdlSW5mbzxUPj4+O1xyXG5cclxuICAvKipcclxuICAgKiDor7fmsYLphY3nva5cclxuICAgKi9cclxuICBASW5wdXQoKSBmZXRjaFNldHRpbmc/OiBGZXRjaFNldHRpbmc7XHJcbiAgLyoqXHJcbiAgICog5o6S5bqP5Ye95pWwXHJcbiAgICovXHJcbiAgQElucHV0KCkgc29ydEZuITogKGRhdGE6IFNvcnRlclJlc3VsdCkgPT4gU29ydGVyUmVzdWx0O1xyXG5cclxuICAvKipcclxuICAgKiDphY3nva7liJdcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhDb2x1bW5zOiBOenhDb2x1bW48VD5bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiDpu5jorqTmuLLmn5PooajlpLRcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhEZWZhdWx0UmVuZGVySGVhZGVyID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDmoIfpophcclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuuihqOWktFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFNob3dIZWFkZXI/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOW3peWFt+agjy3lnKjlt6XlhbfmoI/kuYvliY1cclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sYmFyQmVmb3JlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XHJcbiAgLyoqXHJcbiAgICog5bel5YW35qCPXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbGJhcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuiDveiwg+aVtOWIl+Wkp+Wwj1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFJlc2l6YWJsZSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog6KGo5qC85biD5bGAXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpUYWJsZUxheW91dDogTnpUYWJsZUxheW91dCA9ICdhdXRvJztcclxuICAvKipcclxuICAgKiDnlKjkuo7mmL7npLrmlbDmja7mgLvph4/lkozlvZPliY3mlbDmja7ojIPlm7TvvIznlKjms5Xlj4LnhacgUGFnaW5hdGlvbiDnu4Tku7ZcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNob3dUb3RhbD86IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBudW1iZXI7IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIH0+O1xyXG4gIC8qKlxyXG4gICAqIOeUqOS6juiHquWumuS5iemhteeggeeahOe7k+aehO+8jOeUqOazleWPgueFpyBQYWdpbmF0aW9uIOe7hOS7tlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56SXRlbVJlbmRlcj86IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD47XHJcbiAgLyoqXHJcbiAgICog6KGo5qC85qCH6aKYXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPEFueT47XHJcbiAgLyoqXHJcbiAgICog6KGo5qC85bC+6YOoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpGb290ZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxBbnk+O1xyXG4gIC8qKlxyXG4gICAqIOaXoOaVsOaNruaXtuaYvuekuuWGheWuuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56Tm9SZXN1bHQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxBbnk+O1xyXG4gIC8qKlxyXG4gICAqIFx06aG15pWw6YCJ5oup5Zmo5Y+v6YCJ5YC8XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpQYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcclxuICAvKipcclxuICAgKiDomZrmi5/mu5rliqjml7bmr4/kuIDliJfnmoTpq5jluqbvvIzkuI4gY2RrIGl0ZW1TaXplIOebuOWQjFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56VmlydHVhbEl0ZW1TaXplID0gMDtcclxuICAvKipcclxuICAgKiBcdOe8k+WGsuWMuuacgOWkp+WDj+e0oOmrmOW6pu+8jOS4jiBjZGsgbWF4QnVmZmVyUHgg55u45ZCMXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpWaXJ0dWFsTWF4QnVmZmVyUHggPSAyMDA7XHJcbiAgLyoqXHJcbiAgICog57yT5Yay5Yy65pyA5bCP5YOP57Sg6auY5bqm77yM5L2O5LqO6K+l5YC85pe25bCG5Yqg6L295paw57uT5p6E77yM5LiOIGNkayBtaW5CdWZmZXJQeCDnm7jlkIxcclxuICAgKi9cclxuICBASW5wdXQoKSBuelZpcnR1YWxNaW5CdWZmZXJQeCA9IDEwMDtcclxuICAvKipcclxuICAgKiDlu7bov5/mmL7npLrliqDovb3mlYjmnpznmoTml7bpl7TvvIjpmLLmraLpl6rng4HvvIlcclxuICAgKi9cclxuICBASW5wdXQoKSBuekxvYWRpbmdEZWxheSA9IDA7XHJcbiAgLyoqXHJcbiAgICogXHTlvZPliY3pobXnoIHvvIzlj6/lj4zlkJHnu5HlrppcclxuICAgKi9cclxuICBASW5wdXQoKSBuelBhZ2VJbmRleCA9IDE7XHJcbiAgLyoqXHJcbiAgICog5q+P6aG15bGV56S65aSa5bCR5pWw5o2u77yM5Y+v5Y+M5ZCR57uR5a6aXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpQYWdlU2l6ZT86IG51bWJlcjtcclxuICAvKipcclxuICAgKiDlvZPliY3mgLvmlbDmja7vvIzlnKjmnI3liqHlmajmuLLmn5Pml7bpnIDopoHkvKDlhaVcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgbnpUb3RhbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9uelRvdGFsID0gdmFsdWU7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZml4ZWRGaXQoKSk7XHJcbiAgfVxyXG4gIGdldCBuelRvdGFsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX256VG90YWw7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOihqOWktOWIhue7hOaXtuaMh+Wumuavj+WIl+WuveW6pu+8jOS4jiB0aCDnmoQgW256V2lkdGhdIOS4jeWPr+a3t+eUqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56V2lkdGhDb25maWc6IFJlYWRvbmx5QXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBbXTtcclxuICAvKipcclxuICAgKiDooajmoLzmlbDmja5cclxuICAgKi9cclxuICBASW5wdXQoKSBuekRhdGE6IFRbXSA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIOaMh+WumuWIhumhteaYvuekuueahOS9jee9rlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56UGFnaW5hdGlvblBvc2l0aW9uOiBOelRhYmxlUGFnaW5hdGlvblBvc2l0aW9uID0gJ2JvdHRvbSc7XHJcbiAgLyoqXHJcbiAgICog5qiq5ZCR5pSv5oyB5rua5YqoXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IHNjcm9sbFgodmFsdWU6IHN0cmluZyB8IG51bGwpIHtcclxuICAgIHRoaXMubnpTY3JvbGwgPSB7IC4uLnRoaXMubnpTY3JvbGwsIHg6IHZhbHVlIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnurXlkJHmlK/mjIHmu5rliqhcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgc2Nyb2xsWSh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xyXG4gICAgdGhpcy5uelNjcm9sbCA9IHsgLi4udGhpcy5uelNjcm9sbCwgeTogdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIG56U2Nyb2xsOiB7XHJcbiAgICB4Pzogc3RyaW5nIHwgbnVsbDtcclxuICAgIHk/OiBzdHJpbmcgfCBudWxsO1xyXG4gIH0gPSB7IHg6IHRoaXMuc2Nyb2xsWCwgeTogdGhpcy5zY3JvbGxZIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOihqOagvOaYr+WQpuiHquWKqOaSkea7oVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEZpdD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5oyH5a6a5YiG6aG15pi+56S655qE5bC65a+4XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpQYWdpbmF0aW9uVHlwZTogTnpUYWJsZVBhZ2luYXRpb25UeXBlID0gJ2RlZmF1bHQnO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWcqOWJjeerr+WvueaVsOaNrui/m+ihjOWIhumhte+8jOWmguaenOWcqOacjeWKoeWZqOWIhumhteaVsOaNruaIluiAhemcgOimgeWcqOWJjeerr+aYvuekuuWFqOmDqOaVsOaNruaXtuS8oOWFpSBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56RnJvbnRQYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5qih5p2/5qih5byP77yM5peg6ZyA5bCG5pWw5o2u5Lyg6YCS57uZIG56RGF0YVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56VGVtcGxhdGVNb2RlID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICogXHTmmK/lkKbmmL7npLrliIbpobXlmahcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgbnpTaG93UGFnaW5hdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fbnpTaG93UGFnaW5hdGlvbiA9IHZhbHVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZpeGVkRml0KCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG56U2hvd1BhZ2luYXRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbnpTaG93UGFnaW5hdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouaYr+WQpuWKoOi9veS4rVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56TG9hZGluZyA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuiHquWKqOaYvuekumxvYWRpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhBdXRvTG9hZGluZyA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuuWklui+ueahhlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56T3V0ZXJCb3JkZXJlZCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOWKoOi9veaMh+ekuuesplxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56TG9hZGluZ0luZGljYXRvcj86IFRlbXBsYXRlUmVmPEFueT47XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5bGV56S65aSW6L655qGG5ZKM5YiX6L655qGGXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpCb3JkZXJlZCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOihqOagvOWkp+Wwjywg5q2j5bi45oiW6L+35L2g57G75Z6LXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpTaXplOiBOenhUYWJsZVNpemUgPSAnc21hbGwnO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWPr+S7peaUueWPmCBuelBhZ2VTaXplXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpTaG93U2l6ZUNoYW5nZXIgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOWPquacieS4gOmhteaXtuaYr+WQpumakOiXj+WIhumhteWZqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56SGlkZU9uU2luZ2xlUGFnZSA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWPr+S7peW/q+mAn+i3s+i9rOiHs+afkOmhtVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56U2hvd1F1aWNrSnVtcGVyID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDlvZPmt7vliqDor6XlsZ7mgKfml7bvvIzmmL7npLrkuLrnroDljZXliIbpobVcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNpbXBsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrmk43kvZzmjInpkq7lsI/lm77moIdcclxuICAgKi9cclxuICBASW5wdXQoKSBhY3Rpb25WaXNpYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrpobbpg6jmoIfpophcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sYmFyVmlzaWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog54K55Ye76KGM5piv5ZCm6YCJ5LitXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4Q2xpY2tTZWxlY3RlZFJvdz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5b2T5pWw5o2u5Li6bnVsbOaYvuekuueahOm7mOiupOaWh+acrFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlZmF1bHRUZXh0Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDnlLHlpJbpg6jkvKDlhaXmqKHmnb/liJfooahcclxuICAgKi9cclxuICBASW5wdXQoKSB0cGxNYXA/OiBNYXA8c3RyaW5nLCBUZW1wbGF0ZVJlZjxBbnk+PjtcclxuICAvKipcclxuICAgKiDomZrmi5/mu5rliqjmlbDmja4gVHJhY2tCeUZ1bmN0aW9uIOWHveaVsFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56VmlydHVhbEZvclRyYWNrQnk/OiBUcmFja0J5RnVuY3Rpb248VD47XHJcbiAgLyoqXHJcbiAgICog5ZCI5bm25Y2V5YWD5qC8XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3BhbkZ1bmM/OiBTcGFuRnVuYzxUPjtcclxuICAvKipcclxuICAgKiDoh6rlrprkuYl0clxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFRyPzogVGVtcGxhdGVSZWY8VHJUZW1wbGF0ZUFyZ3M8VD4+O1xyXG4gIC8qKlxyXG4gICAqIOWmguaenOaYr+agkee7k+aehCwg6K6+572u57yp6L+b5aSn5bCPXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpJbmRlbnRTaXplID0gMjA7XHJcblxyXG4gIC8qKlxyXG4gICAqIOagkeihqOeahGNoZWNrYWJsZeeKtuaAgeS4i+iKgueCuemAieaLqeWujOWFqOWPl+aOp++8iOeItuWtkOiKgueCuemAieS4reeKtuaAgeS4jeWGjeWFs+iBlO+8iSwg6buY6K6kZmFsc2VcclxuICAgKi9cclxuICBASW5wdXQoKSBuekNoZWNrU3RyaWN0bHk/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOmhteaVsOaUueWPmOaXtueahOWbnuiwg+WHveaVsFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBuelBhZ2VTaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcbiAgLyoqXHJcbiAgICog5b2T5YmN6aG156CB5pS55Y+Y5pe255qE5Zue6LCD5Ye95pWwXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UGFnZUluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcbiAgLyoqXHJcbiAgICogXHTlvZPmnI3liqHnq6/liIbpobXjgIHnrZvpgInjgIHmjpLluo/ml7bvvIznlKjkuo7ojrflvpflj4LmlbBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpRdWVyeVBhcmFtcyA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJsZVF1ZXJ5UGFyYW1zPigpO1xyXG4gIC8qKlxyXG4gICAqIOW9k+WJjemhtemdouWxleekuuaVsOaNruaUueWPmOeahOWbnuiwg+WHveaVsFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBuekN1cnJlbnRQYWdlRGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8cmVhZG9ubHkgVFtdPigpO1xyXG5cclxuICAvKipcclxuICAgKiDmlbDmja7ooYzngrnlh7vkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgcm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0V2ZW50QXJnPFQ+PigpO1xyXG4gIC8qKlxyXG4gICAqIOaVsOaNruihjOWPjOWHu+S6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSByb3dEYmxjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Um93RXZlbnRBcmc8VD4+KCk7XHJcbiAgLyoqXHJcbiAgICog5pWw5o2u6KGM5Y+z6ZSu6I+c5Y2V5LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJvd0NvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dFdmVudEFyZzxUPj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5Y2V5YWD5qC854K55Ye75LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNlbGxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Q2VsbEV2ZW50QXJnPFQ+PigpO1xyXG4gIC8qKlxyXG4gICAqIOWNleWFg+agvOWPjOWHu+S6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBjZWxsRGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPENlbGxFdmVudEFyZzxUPj4oKTtcclxuICAvKipcclxuICAgKiDljZXlhYPmoLzlj7PplK7oj5zljZXkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2VsbENvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjxDZWxsRXZlbnRBcmc8VD4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIOihqOWktOWNleWFg+agvOS6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBoZWFkZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8SGVhZGVyRXZlbnRBcmc+KCk7XHJcbiAgLyoqXHJcbiAgICog6KGo5aS05Y2V5YWD5qC85Y+M5Ye75LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGhlYWRlckRibGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxIZWFkZXJFdmVudEFyZz4oKTtcclxuICAvKipcclxuICAgKiDooajlpLTljZXlhYPmoLzlj7PplK7oj5zljZXkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgaGVhZGVyQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPEhlYWRlckV2ZW50QXJnPigpO1xyXG4gIC8qKlxyXG4gICAqIOWIt+aWsOaMiemSrueCueWHu+S6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSByZWZyZXNoQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE56eFRhYmxlQ29tcG9uZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIOaOkuW6j+WIl+inpuWPkVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzb3J0ZWRDb2x1bW4gPSBuZXcgRXZlbnRFbWl0dGVyPENka0RyYWdEcm9wPE56eENvbHVtbjxUPiwgQW55Pj4oKTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOYW1lZFRlbXBsYXRlKSBjaGlsZHJlbiE6IFF1ZXJ5TGlzdDxOYW1lZFRlbXBsYXRlPEFueT4+O1xyXG4gIEBWaWV3Q2hpbGQoJ2Jhc2ljVGFibGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBuelRhYmxlITogTnpUYWJsZUNvbXBvbmVudDxUPjtcclxuICBAVmlld0NoaWxkKCdiYXNpY1RhYmxlJywgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+IH0pXHJcbiAgbnpUYWJsZUVsZW1lbnRSZWYhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByb3RlY3RlZCByZW5kZXI6IFJlbmRlcmVyMixcclxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+LFxyXG4gICAgcHJpdmF0ZSBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgbWVyZ2UodGhpcy5uelBhZ2VJbmRleENoYW5nZSwgdGhpcy5uelBhZ2VTaXplQ2hhbmdlKVxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZmV0Y2goZmFsc2UpKTtcclxuICAgIHRoaXMubnpQYWdlU2l6ZSA9IHRoaXMubnpQYWdlU2l6ZSB8fCB0aGlzLmFudGRTZXJ2aWNlLnRhYmxlPy5uelBhZ2VTaXplIHx8IDEwO1xyXG4gICAgdGhpcy5yZXNvbHZlQ29sdW1ucygpO1xyXG4gICAgdGhpcy5mZXRjaCgpO1xyXG4gIH1cclxuXHJcbiAgb25SZXNpemUoeyB3aWR0aCB9OiBOelJlc2l6ZUV2ZW50LCBjb2w6IE56eENvbHVtbikge1xyXG4gICAgY29sLm56V2lkdGggPSB3aWR0aCArICdweCc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliIfmjaLooajmoLzlpKflsI8sIOWinuWKoG1pbmkg57G75Z6LXHJcbiAgICogQHBhcmFtIHNpemUg6KGo5qC85aSn5bCPXHJcbiAgICogQHBhcmFtIHRhYmxlIG566KGo5qC857uE5Lu2XHJcbiAgICovXHJcbiAgdGFibGVTaXplQ2hhbmdlKHNpemU6IE56eFRhYmxlU2l6ZSwgdGFibGU6IE56VGFibGVDb21wb25lbnQ8QW55Pikge1xyXG4gICAgdGhpcy5uelNpemUgPSBzaXplO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgdGFibGVNYWluRWxlbWVudCA9IHRhYmxlLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYW50LXRhYmxlJyk7XHJcbiAgICBpZiAoIXRhYmxlTWFpbkVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHNpemUgPT09ICdtaW5pJykge1xyXG4gICAgICB0aGlzLnJlbmRlci5hZGRDbGFzcyh0YWJsZU1haW5FbGVtZW50LCAnYW50LXRhYmxlLW1pbmknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnJlbW92ZUNsYXNzKHRhYmxlTWFpbkVsZW1lbnQsICdhbnQtdGFibGUtbWluaScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog54K55Ye75Yi35paw5oyJ6ZKuXHJcbiAgICovXHJcbiAgb25SZWZyZXNoQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoQ2xpY2sub2JzZXJ2ZWQpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoQ2xpY2suZW1pdCh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yi35pawXHJcbiAgICogQHBhcmFtIHJlc2V0XHJcbiAgICovXHJcbiAgcmVmcmVzaChyZXNldCA9IHRydWUpIHtcclxuICAgIHJldHVybiB0aGlzLmZldGNoPFQ+KHJlc2V0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWbuuWumuWIl1xyXG4gICAqIEBwYXJhbSBjb2x1bW5cclxuICAgKi9cclxuICBmaXhlZENsaWNrKGNvbHVtbjogTnp4Q29sdW1uPFQ+KSB7XHJcbiAgICBjb25zdCBoYXNGaXhlZCA9IHRoaXMuX2FsbENvbHVtbnMuZmlsdGVyKHZhbHVlID0+IHZhbHVlLmZpeGVkKS5sZW5ndGg7XHJcbiAgICB0aGlzLnNjcm9sbFggPSBoYXNGaXhlZCA/ICcxMDB2dycgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5o6S5bqPXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHBhcmFtIGNvbFxyXG4gICAqL1xyXG4gIHNvcnRPcmRlckNoYW5nZSh2YWx1ZTogTnpUYWJsZVNvcnRPcmRlciwgY29sOiBOenhDb2x1bW4pIHtcclxuICAgIGlmIChjb2wubnpTb3J0T3JkZXJDaGFuZ2UpIHtcclxuICAgICAgY29sLm56U29ydE9yZGVyQ2hhbmdlKHZhbHVlLCBjb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtleSA9IGNvbC5uekNvbHVtbktleSEgfHwgY29sLm5hbWUhO1xyXG4gICAgdGhpcy5zb3J0SW5mbyA9IHtcclxuICAgICAgY29sdW1uOiBjb2wsXHJcbiAgICAgIG9yZGVyOiB2YWx1ZSxcclxuICAgICAgZmllbGQ6IGtleVxyXG4gICAgfTtcclxuICAgIHRoaXMuZmV0Y2goZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Y+R6LW36K+35rGCXHJcbiAgICogQHBhcmFtIHJlc2V0IOaYr+WQpumHjee9rlxyXG4gICAqL1xyXG4gIGZldGNoPFQ+KHJlc2V0ID0gdHJ1ZSk6IFByb21pc2U8UGFnZUluZm88VD4+IHwgbnVsbCB7XHJcbiAgICBpZiAoIXRoaXMuYXBpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm56eEF1dG9Mb2FkaW5nKSB7XHJcbiAgICAgIHRoaXMubnpMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFBhZ2VJbmZvPFQ+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZldGNoU2V0dGluZyA9IE9iamVjdC5hc3NpZ24oe30sIEZFVENIX1NFVFRJTkcsIHRoaXMuYW50ZFNlcnZpY2UudGFibGUsIHRoaXMuZmV0Y2hTZXR0aW5nKTtcclxuICAgICAgY29uc3Qgc2V0UmVzdWx0OiAocmVzOiBSZWNvcmQ8c3RyaW5nLCBBbnk+IHwgVCkgPT4gdm9pZCA9IHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRGZXRjaFJlc3VsdChyZXMsIGZldGNoU2V0dGluZywgcmVzZXQpLnRoZW4odiA9PiByZXNvbHZlKHYgYXMgdW5rbm93biBhcyBQYWdlSW5mbzxUPiksIHJlamVjdCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoTnp4VXRpbHMuaXNTdHJpbmcodGhpcy5hcGkpKSB7XHJcbiAgICAgICAgRmV0Y2hlclNlcnZpY2UucmVzb2x2ZVBhcmFtcyh0aGlzLnBhcmFtcylcclxuICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICBzd2l0Y2hNYXAoX3BhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgY29tbW9uUGFyYW1zID0gdGhpcy5tZXJnZVBhcmFtcyhyZXNldCwgZmV0Y2hTZXR0aW5nKTtcclxuICAgICAgICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgX3BhcmFtcywgY29tbW9uUGFyYW1zKTtcclxuICAgICAgICAgICAgICBjb25zdCBiZWZvcmVGZXRjaCA9IHRoaXMuYmVmb3JlRmV0Y2ggfHwgdGhpcy5hbnRkU2VydmljZS50YWJsZT8uYmVmb3JlRmV0Y2g7XHJcbiAgICAgICAgICAgICAgaWYgKCFiZWZvcmVGZXRjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9GZXRjaCh0aGlzLmFwaSBhcyBzdHJpbmcsIGZldGNoU2V0dGluZy5tZXRob2QsIGNvbW1vblBhcmFtcywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm4gRmV0Y2hlclNlcnZpY2UucmVzb2x2ZVBhcmFtcyhiZWZvcmVGZXRjaChkYXRhKSkucGlwZShfZGF0YSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb0ZldGNoKHRoaXMuYXBpIGFzIHN0cmluZywgZmV0Y2hTZXR0aW5nLm1ldGhvZCwgY29tbW9uUGFyYW1zLCBfZGF0YSlcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgIG5leHQ6IHJlcyA9PlxyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hSZXN1bHQocmVzLCBmZXRjaFNldHRpbmcsIHJlc2V0KS50aGVuKHYgPT4gcmVzb2x2ZSh2IGFzIHVua25vd24gYXMgUGFnZUluZm88VD4pLCByZWplY3QpLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyID0+IHJlamVjdChlcnIpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChOenhVdGlscy5pc09ic2VydmFibGUodGhpcy5hcGkpKSB7XHJcbiAgICAgICAgKHRoaXMuYXBpIGFzIHVua25vd24gYXMgT2JzZXJ2YWJsZTxUW10+KS5zdWJzY3JpYmUoeyBuZXh0OiBzZXRSZXN1bHQsIGVycm9yOiBlcnIgPT4gcmVqZWN0KGVycikgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChOenhVdGlscy5pc1Byb21pc2UodGhpcy5hcGkpKSB7XHJcbiAgICAgICAgKHRoaXMuYXBpIGFzIHVua25vd24gYXMgUHJvbWlzZTxUW10+KS50aGVuKHNldFJlc3VsdCwgcmVqZWN0KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFJlc3VsdChbXSk7XHJcbiAgICB9KS5maW5hbGx5KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubnp4QXV0b0xvYWRpbmcpIHtcclxuICAgICAgICB0aGlzLm56TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDooYzngrnlh7vkuovku7ZcclxuICAgKiBAcGFyYW0gaW5mb1xyXG4gICAqL1xyXG4gIG9uUm93Q2xpY2soaW5mbzogUm93RXZlbnRBcmc8VD4pIHtcclxuICAgIHRoaXMucm93Q2xpY2suZW1pdChpbmZvKTtcclxuICAgIGlmICh0aGlzLm56eENsaWNrU2VsZWN0ZWRSb3cgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdFJvdyA9IHRoaXMuX3NlbGVjdFJvdyA9PT0gaW5mby5yb3cgPyB1bmRlZmluZWQgOiBpbmZvLnJvdztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaJp+ihjOivt+axglxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gbWV0aG9kXHJcbiAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBkb0ZldGNoKHVybDogc3RyaW5nLCBtZXRob2Q/OiBzdHJpbmcsIHBhcmFtcz86IEFueSwgZGF0YT86IEFueSk6IE9ic2VydmFibGU8UGFnZUluZm88VD4+IHtcclxuICAgIGNvbnN0IG9wdGlvbjogeyBwYXJhbXM/OiBBbnk7IGJvZHk/OiBBbnkgfSA9IHt9O1xyXG4gICAgbWV0aG9kIHx8PSAncG9zdCc7XHJcbiAgICBpZiAoL15wb3N0fHB1dCQvaS50ZXN0KG1ldGhvZCkpIHtcclxuICAgICAgb3B0aW9uLnBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgb3B0aW9uLmJvZHkgPSBkYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0aW9uLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8UGFnZUluZm88VD4+KG1ldGhvZCwgdXJsLCBvcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aSE55CG6K+35rGC57uT5p6cXHJcbiAgICogQHBhcmFtIHJlc1xyXG4gICAqIEBwYXJhbSBmZXRjaFNldHRpbmdcclxuICAgKiBAcGFyYW0gcmVzZXRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0RmV0Y2hSZXN1bHQ8Sz4ocmVzOiBLLCBmZXRjaFNldHRpbmc6IEZldGNoU2V0dGluZywgcmVzZXQ6IGJvb2xlYW4pOiBQcm9taXNlPFBhZ2VJbmZvPFQ+PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBQYXJ0aWFsPFBhZ2VJbmZvPFQ+PiA9IHt9O1xyXG4gICAgY29uc3QgYWZ0ZXJGZXRjaCA9IHRoaXMuYWZ0ZXJGZXRjaCB8fCB0aGlzLmFudGRTZXJ2aWNlLnRhYmxlPy5hZnRlckZldGNoO1xyXG4gICAgaWYgKGFmdGVyRmV0Y2ggJiYgTnp4VXRpbHMuaXNGdW5jdGlvbihhZnRlckZldGNoKSkge1xyXG4gICAgICBjb25zdCBkYXRhID0gYWZ0ZXJGZXRjaChyZXMsIHRoaXMubnpQYWdlSW5kZXgsIHJlc2V0KTtcclxuICAgICAgaWYgKE56eFV0aWxzLmlzUHJvbWlzZShkYXRhKSkge1xyXG4gICAgICAgIHJldHVybiBkYXRhLnRoZW4odiA9PiB0aGlzLnNldFBhZ2VJbmZvKHJlcywgdiwgZmV0Y2hTZXR0aW5nLCByZXNldCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCA9IGRhdGEgfHwge307XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XHJcbiAgICAgICAgcmVzdWx0Lmxpc3QgPSByZXM7XHJcbiAgICAgICAgcmVzdWx0LnRvdGFsID0gcmVzLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5zZXRQYWdlSW5mbyhyZXMsIHJlc3VsdCwgZmV0Y2hTZXR0aW5nLCByZXNldCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u5YiG6aG15L+h5oGvXHJcbiAgICogQHBhcmFtIHJlcyDlk43lupTlr7nosaFcclxuICAgKiBAcGFyYW0gcGFnZUluZm8g5Y6fcGFnZUluZm9cclxuICAgKiBAcGFyYW0gZmV0Y2hTZXR0aW5nIOmFjee9rlxyXG4gICAqIEBwYXJhbSByZXNldCDmmK/lkKbph43nva5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0UGFnZUluZm88Sz4oXHJcbiAgICByZXM6IEssXHJcbiAgICBwYWdlSW5mbzogUGFydGlhbDxQYWdlSW5mbzxUPj4sXHJcbiAgICBmZXRjaFNldHRpbmc6IEZldGNoU2V0dGluZyxcclxuICAgIHJlc2V0OiBib29sZWFuXHJcbiAgKTogUGFnZUluZm88VD4ge1xyXG4gICAgY29uc3QgdG90YWwgPSBwYWdlSW5mby50b3RhbCAhPSBudWxsID8gcGFnZUluZm8udG90YWwgOiBOenhVdGlscy5nZXQocmVzLCBmZXRjaFNldHRpbmcudG90YWxGaWVsZCEpO1xyXG4gICAgY29uc3QgcGFnZUluZGV4ID0gcmVzZXRcclxuICAgICAgPyAxXHJcbiAgICAgIDogcGFnZUluZm8ucGFnZUluZGV4ICE9IG51bGxcclxuICAgICAgPyBwYWdlSW5mby5wYWdlSW5kZXhcclxuICAgICAgOiBOenhVdGlscy5nZXQocmVzLCBmZXRjaFNldHRpbmcucGFnZUluZGV4RmllbGQhKTtcclxuXHJcbiAgICB0aGlzLm56RGF0YSA9IHBhZ2VJbmZvLmxpc3QgfHwgTnp4VXRpbHMuZ2V0KHJlcywgZmV0Y2hTZXR0aW5nLmxpc3RGaWVsZCEpO1xyXG4gICAgdGhpcy5uelRvdGFsID0gdG90YWwgfHwgMDtcclxuXHJcbiAgICBpZiAocGFnZUluZGV4ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5uelBhZ2VJbmRleCA9IHBhZ2VJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHJldHVybiBwYWdlSW5mbyBhcyBQYWdlSW5mbzxUPjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWQiOW5tuivt+axguWPguaVsFxyXG4gICAqIEBwYXJhbSByZXNldFxyXG4gICAqIEBwYXJhbSBmZXRjaFNldHRpbmdcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWVyZ2VQYXJhbXMocmVzZXQgPSB0cnVlLCBmZXRjaFNldHRpbmc6IEZldGNoU2V0dGluZykge1xyXG4gICAgY29uc3QgbnpQYWdlSW5kZXggPSByZXNldCA/IDEgOiB0aGlzLm56UGFnZUluZGV4O1xyXG4gICAgY29uc3QgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBBbnk+ID0ge307XHJcbiAgICBOenhVdGlscy5zZXQocGFyYW1zLCBmZXRjaFNldHRpbmcucGFnZUluZGV4RmllbGQhLCBuelBhZ2VJbmRleCk7XHJcbiAgICBOenhVdGlscy5zZXQocGFyYW1zLCBmZXRjaFNldHRpbmcucGFnZVNpemVGaWVsZCEsIHRoaXMubnpQYWdlU2l6ZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuc29ydEluZm8pIHtcclxuICAgICAgY29uc3Qgc29ydEluZm8gPSBOenhVdGlscy5pc0Z1bmN0aW9uKHRoaXMuc29ydEZuKSA/IHRoaXMuc29ydEZuKHRoaXMuc29ydEluZm8pIDogdGhpcy5zb3J0SW5mbztcclxuICAgICAgZGVsZXRlIHNvcnRJbmZvLmNvbHVtbjtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIHNvcnRJbmZvKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJhbXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKbmmK/lvILmraXmlbDmja5cclxuICAgKiBAcGFyYW0gb2JqXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBpc0FzeW5jKG9iajogQW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gTnp4VXRpbHMuaXNPYnNlcnZhYmxlKG9iaikgfHwgTnp4VXRpbHMuaXNQcm9taXNlKG9iaik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpITnkIbooajlpLTlkIjlubbljZXlhYPmoLzlkowgYm9keeeahOWIl1xyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcmVzb2x2ZUNvbHVtbnMoKSB7XHJcbiAgICBjb25zdCB7IGhlYWRlclJvd3MsIGJvZHlSb3dzLCBhbGxDb2x1bW5zIH0gPSB0aGlzLmdldFJvd0NvbHVtbnModGhpcy5uenhDb2x1bW5zKTtcclxuICAgIHRoaXMuX2hlYWRlckNvbHVtbnMgPSBoZWFkZXJSb3dzO1xyXG4gICAgdGhpcy5fYWxsQ29sdW1ucyA9IGFsbENvbHVtbnM7XHJcbiAgICAvLyDmsqHmnInlkIjlubbooajlpLQsIOS9v+eUqOWQjOS4gOWvueixoVxyXG4gICAgdGhpcy5fYm9keUNvbHVtbnMgPSBoZWFkZXJSb3dzLmxlbmd0aCA/IGJvZHlSb3dzIDogaGVhZGVyUm93c1swXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWkhOeQhuWPguaVsOS4uuaooeadv+eahOWPguaVsCwg5LuO5a2X56ym5Liy5Lit5om+5Yiw55yf5q2j55qE5qih5p2/5a+56LGhXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCByZXNvbHZlVGVtcGxhdGVDb2x1bW4oKSB7XHJcbiAgICBjb25zdCBuYW1lVGVtcGxhdGVNYXA6IFJlY29yZDxzdHJpbmcsIFRlbXBsYXRlUmVmPEFueT4+ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IHRwbCBvZiB0aGlzLmNoaWxkcmVuKSB7XHJcbiAgICAgIG5hbWVUZW1wbGF0ZU1hcFt0cGwubmFtZWRdID0gdHBsLnRlbXBsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRwbE1hcCkge1xyXG4gICAgICB0aGlzLnRwbE1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiAobmFtZVRlbXBsYXRlTWFwW2tleV0gPSB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FsbENvbHVtbnMuZm9yRWFjaChjb2wgPT5cclxuICAgICAgT2JqZWN0LmtleXMoY29sKVxyXG4gICAgICAgIC5maWx0ZXIodiA9PiAvVGVtcGxhdGUkLy50ZXN0KHYpKVxyXG4gICAgICAgIC5mb3JFYWNoKHRwbE5hbWUgPT4gdGhpcy5zdHJpbmdUb1RlbXBsYXRlKGNvbCwgdHBsTmFtZSwgbmFtZVRlbXBsYXRlTWFwKSlcclxuICAgICk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWtl+espuS4suafpeaJvuWvueW6lOeahOaooeeJiFxyXG4gICAqIEBwYXJhbSBjb2xcclxuICAgKiBAcGFyYW0ga2V5XHJcbiAgICogQHBhcmFtIG5hbWVUZW1wbGF0ZU1hcFxyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc3RyaW5nVG9UZW1wbGF0ZShcclxuICAgIGNvbDogTnp4Q29sdW1uPFQ+LFxyXG4gICAga2V5OiBrZXlvZiBOenhDb2x1bW4sXHJcbiAgICBuYW1lVGVtcGxhdGVNYXA6IFJlY29yZDxzdHJpbmcsIFRlbXBsYXRlUmVmPEFueT4+XHJcbiAgKSB7XHJcbiAgICBjb25zdCBuZXdLZXkgPSAnXycgKyBrZXk7XHJcbiAgICBpZiAodHlwZW9mIGNvbFtrZXldID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCB0cGwgPSBuYW1lVGVtcGxhdGVNYXBbY29sW2tleV1dO1xyXG4gICAgICBpZiAodHBsKSB7XHJcbiAgICAgICAgY29sW25ld0tleV0gPSB0cGw7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY29sW2tleV0gaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xyXG4gICAgICBjb2xbbmV3S2V5XSA9IGNvbFtrZXldO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6KGo5aS06Kem5Y+RQ2hlY2tCb3ggY2hhbmdlXHJcbiAgICogQHBhcmFtIGV2dFxyXG4gICAqIEBwYXJhbSBjb2xcclxuICAgKi9cclxuICB0aENoZWNrZWRDaGFuZ2UoZXZ0OiBib29sZWFuLCBjb2w6IE56eENvbHVtbjxUPik6IHZvaWQge1xyXG4gICAgaWYgKGNvbC5lbmFibGVDaGVja0FsbCAhPT0gZmFsc2UpIHtcclxuICAgICAgY29sLmNoZWNrZWQgPSBldnQ7XHJcbiAgICAgIGNvbC5uekluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgICAgTnp4VXRpbHMuZm9yRWFjaFRyZWUodGhpcy5fY3VycmVudFBhZ2VEYXRhLCB2ID0+IHtcclxuICAgICAgICBpZiAoIXYuZGlzYWJsZWQpIHtcclxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgIHYuY2hlY2tlZCA9IGV2dDtcclxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgIHYubnpJbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChjb2wudGhDaGVja2VkQ2hhbmdlKSB7XHJcbiAgICAgIGNvbC50aENoZWNrZWRDaGFuZ2UoZXZ0LCBjb2wpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB0ZOinpuWPkUNoZWNrQm94IGNoYW5nZVxyXG4gICAqIEBwYXJhbSBldnRcclxuICAgKiBAcGFyYW0gY29sXHJcbiAgICogQHBhcmFtIHJvd1xyXG4gICAqIEBwYXJhbSBwYXRoVHJhY2Ug54i26IqC54K56Lev5b6EXHJcbiAgICogQHBhcmFtIGluZGV4QXR0clxyXG4gICAqL1xyXG4gIHRkQ2hlY2tlZENoYW5nZShldnQ6IGJvb2xlYW4sIGNvbDogTnp4Q29sdW1uPFQ+LCByb3c6IFQsIHBhdGhUcmFjZTogW1QsIFRdLCBpbmRleEF0dHI6IEluZGV4QXR0cikge1xyXG4gICAgaWYgKGNvbC5lbmFibGVDaGVja0FsbCAhPT0gZmFsc2UpIHtcclxuICAgICAgLy8g6Z2e5Y+X5o6n55qEY2hlY2tib3hcclxuICAgICAgaWYgKHRoaXMubnpDaGVja1N0cmljdGx5ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHJvdy5uekluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgICAgICBOenhVdGlscy5mb3JFYWNoVHJlZShyb3cuY2hpbGRyZW4sIG5vZGUgPT4ge1xyXG4gICAgICAgICAgaWYgKCFub2RlLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2hlY2tlZCA9IGV2dDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IFtwYXJlbnRzLCBwYXJlbnRdID0gcGF0aFRyYWNlO1xyXG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcclxuICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaENoZWNrZWRTdGF0dXMocGFyZW50LCBwYXJlbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFwYXJlbnRzKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcGFyZW50ID0gcGFyZW50c1sxXTtcclxuICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlZnJlc2hDaGVja2VkU3RhdHVzKGNvbCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29sLnRkQ2hlY2tlZENoYW5nZSkge1xyXG4gICAgICBjb2wudGRDaGVja2VkQ2hhbmdlKGV2dCwgY29sLCByb3csIGluZGV4QXR0cik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIG9uQ3VycmVudFBhZ2VEYXRhQ2hhbmdlKGxpc3Q6IFRbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5fY3VycmVudFBhZ2VEYXRhID0gbGlzdDtcclxuICAgIGNvbnN0IGNvbCA9IHRoaXMuX2JvZHlDb2x1bW5zLmZpbHRlcih2ID0+IHYubnpTaG93Q2hlY2tib3gpWzBdO1xyXG4gICAgaWYgKGNvbCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hDaGVja2VkU3RhdHVzKGNvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5uekN1cnJlbnRQYWdlRGF0YUNoYW5nZS5lbWl0KGxpc3QpO1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoQ2hlY2tlZFN0YXR1cyhjb2w6IE56eENvbHVtbjxUPik6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVmcmVzaENoZWNrZWRTdGF0dXMoY29sLCB0aGlzLl9jdXJyZW50UGFnZURhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVmcmVzaENoZWNrZWRTdGF0dXMocGFyZW50OiBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+LCBsaXN0RGF0YTogUmVjb3JkPHN0cmluZywgTnpTYWZlQW55PltdKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaXN0ID0gbGlzdERhdGEuZmlsdGVyKHYgPT4gIXYuZGlzYWJsZWQpO1xyXG4gICAgaWYgKGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgIHBhcmVudC5jaGVja2VkID0gbGlzdC5ldmVyeSh2ID0+IHYuY2hlY2tlZCk7XHJcbiAgICAgIHBhcmVudC5uekluZGV0ZXJtaW5hdGUgPSAhcGFyZW50LmNoZWNrZWQgJiYgbGlzdC5zb21lKHYgPT4gdi5jaGVja2VkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhcmVudC5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgIHBhcmVudC5uekluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNvbHZlVGVtcGxhdGVDb2x1bW4oKSk7XHJcbiAgICB0aGlzLnJlc29sdmVUZW1wbGF0ZUNvbHVtbigpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubnpTaXplID09PSAnbWluaScpIHtcclxuICAgICAgdGhpcy50YWJsZVNpemVDaGFuZ2UodGhpcy5uelNpemUsIHRoaXMubnpUYWJsZSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZml4ZWRGaXQoKSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgIHRoaXMuZml4ZWRGaXQoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW1AgaW4ga2V5b2YgdGhpc10/OiBTaW1wbGVDaGFuZ2UgfSAmIFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgKGNoYW5nZXMubnp4Q29sdW1ucyAmJiAhY2hhbmdlcy5uenhDb2x1bW5zLmlzRmlyc3RDaGFuZ2UoKSkgfHxcclxuICAgICAgKGNoYW5nZXMudHBsTWFwICYmICFjaGFuZ2VzLnRwbE1hcC5pc0ZpcnN0Q2hhbmdlKCkpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZXNvbHZlQ29sdW1ucygpO1xyXG4gICAgICB0aGlzLnJlc29sdmVUZW1wbGF0ZUNvbHVtbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLmFwaSAmJiAhY2hhbmdlcy5hcGkuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2godHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmi5bmi73mjpLluo9cclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvblNvcnRlZENvbHVtbihldmVudDogQ2RrRHJhZ0Ryb3A8Tnp4Q29sdW1uPFQ+LCBBbnk+KSB7XHJcbiAgICBtb3ZlSXRlbUluQXJyYXkodGhpcy5faGVhZGVyQ29sdW1uc1swXSwgZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4KTtcclxuICAgIHRoaXMuc29ydGVkQ29sdW1uLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oqY5Y+g5a2Q6IqC54K5XHJcbiAgICogQHBhcmFtIHJvd1xyXG4gICAqIEBwYXJhbSAkZXZlbnRcclxuICAgKi9cclxuICBkZWZhdWx0Q29sbGFwc2Uocm93OiBULCAkZXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHJvdyB8fCB7fTtcclxuICAgIGlmICghJGV2ZW50ICYmIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKChjOiBUKSA9PiB7XHJcbiAgICAgICAgaWYgKGMgJiYgYy5jaGlsZHJlbiAmJiBjLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgYy5leHBhbmQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZGVmYXVsdENvbGxhcHNlKGMsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5ZCI5bm26KGo5aS0XHJcbiAgICogQHBhcmFtIG9yaWdpbkNvbHVtbnMg5Y6f5aeL5YiX6YWN572uXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXRSb3dDb2x1bW5zKG9yaWdpbkNvbHVtbnM6IE56eENvbHVtbjxUPltdKToge1xyXG4gICAgaGVhZGVyUm93czogTnp4Q29sdW1uPFQ+W11bXTtcclxuICAgIGJvZHlSb3dzOiBOenhDb2x1bW48VD5bXTtcclxuICAgIGFsbENvbHVtbnM6IE56eENvbHVtbjxUPltdO1xyXG4gIH0ge1xyXG4gICAgbGV0IG1heExldmVsID0gMDtcclxuICAgIGNvbnN0IGFsbENvbHVtbnM6IE56eENvbHVtbjxUPltdID0gW107XHJcbiAgICBOenhVdGlscy5mb3JFYWNoVHJlZShvcmlnaW5Db2x1bW5zLCAobm9kZSwgcGFyZW50LCBsZXZlbCkgPT4ge1xyXG4gICAgICB0aGlzLm5vcm1hbFByb3BzKG5vZGUpO1xyXG5cclxuICAgICAgYWxsQ29sdW1ucy5wdXNoKG5vZGUpO1xyXG4gICAgICBub2RlLmNvbHNwYW4gPSBub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID8gMCA6IDE7XHJcbiAgICAgIG5vZGUubGV2ZWwgPSBsZXZlbDtcclxuXHJcbiAgICAgIGlmIChsZXZlbCA+IG1heExldmVsKSB7XHJcbiAgICAgICAgbWF4TGV2ZWwgPSBsZXZlbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgIGlmIChwYXJlbnQgJiYgIW5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICBsZXQgcCA9IHBhcmVudDtcclxuICAgICAgICB3aGlsZSAocCkge1xyXG4gICAgICAgICAgcC5jb2xzcGFuKys7XHJcbiAgICAgICAgICBwID0gcC5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBoZWFkZXJSb3dzOiBOenhDb2x1bW48VD5bXVtdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4TGV2ZWwgKyAxIH0pXHJcbiAgICAgIC5maWxsKDApXHJcbiAgICAgIC5tYXAoKCkgPT4gW10pIGFzIEFueTtcclxuXHJcbiAgICBjb25zdCBib2R5Um93czogTnp4Q29sdW1uPFQ+W10gPSBbXTtcclxuICAgIGFsbENvbHVtbnMuZm9yRWFjaChjb2wgPT4ge1xyXG4gICAgICBpZiAoIWNvbC5jaGlsZHJlbikge1xyXG4gICAgICAgIGNvbC5yb3dzcGFuID0gbWF4TGV2ZWwgLSBjb2wubGV2ZWwgKyAxO1xyXG4gICAgICAgIGJvZHlSb3dzLnB1c2goY29sKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb2wucm93c3BhbiA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgaGVhZGVyUm93c1tjb2wubGV2ZWxdLnB1c2goY29sKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7IGhlYWRlclJvd3MsIGJvZHlSb3dzLCBhbGxDb2x1bW5zIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDop4TojIPljJblsZ7mgKdcclxuICAgKiBAcGFyYW0gY29sIOWIl1xyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgbm9ybWFsUHJvcHMoY29sOiBOenhDb2x1bW48VD4pIHtcclxuICAgIGlmIChjb2wudmlzaWJsZSA9PSBudWxsKSB7XHJcbiAgICAgIGNvbC52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChjb2wudGhUZXh0ID09IG51bGwgJiYgY29sLmlzSW5kZXgpIHtcclxuICAgICAgY29sLnRoVGV4dCA9ICfluo/lj7cnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6h566X5pKR5ruh54i25a655ZmoXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZml4ZWRGaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMubnp4Rml0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm56VGFibGVFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCB0YWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5hbnQtdGFibGUnKSE7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcuYW50LXRhYmxlLWNvbnRhaW5lcicpITtcclxuICAgIGlmICghdGFibGUgfHwgIWNvbnRhaW5lcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbnQtdGFibGUtdGhlYWQnKTtcclxuICAgIGxldCBoZWlnaHQgPSAwO1xyXG4gICAgaGVhZGVycy5mb3JFYWNoKHYgPT4gKGhlaWdodCArPSB2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCkpO1xyXG4gICAgY29uc3Qgc2Nyb2xsWSA9IHRhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAtIGhlaWdodDtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICcnO1xyXG4gICAgdGhpcy5zY3JvbGxZID0gYCR7c2Nyb2xsWX1weGA7XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcbn1cclxuIiwiPG56eC10YWJsZS1oZWFkZXJcclxuICAqbmdJZj1cInRvb2xiYXJWaXNpYmxlICE9PSBmYWxzZVwiXHJcbiAgW2FjdGlvblZpc2libGVdPVwiYWN0aW9uVmlzaWJsZVwiXHJcbiAgW3RhYmxlU2l6ZV09XCJuelNpemVcIlxyXG4gIFtyZWZyZXNoVmlzaWJsZV09XCJuenhSZWZyZXNoVmlzaWJsZVwiXHJcbiAgW3Jlc2l6ZVZpc2libGVdPVwibnp4UmVzaXplVmlzaWJsZVwiXHJcbiAgKHRhYmxlU2l6ZUNoYW5nZSk9XCJ0YWJsZVNpemVDaGFuZ2UoJGV2ZW50LCBiYXNpY1RhYmxlKVwiXHJcbiAgKHJlZnJlc2hDbGljayk9XCJvblJlZnJlc2hDbGljaygpXCJcclxuPlxyXG4gIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0aXRsZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHsgY29udGV4dDogdGhpcyB9IH1cIj5cclxuICAgIHt7IHRpdGxlIH19XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RpdGxlXVwiPjwvbmctY29udGVudD5cclxuXHJcbiAgPG5nLWNvbnRhaW5lciBzZXR0aW5nLWJlZm9yZT5cclxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0b29sYmFyQmVmb3JlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogeyBjb250ZXh0OiB0aGlzIH0gfVwiPlxyXG4gICAgICB7eyB0b29sYmFyQmVmb3JlIH19XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt0b29sYmFyQmVmb3JlXVwiPjwvbmctY29udGVudD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPG56eC1jb2x1bW4tc2V0dGluZ1xyXG4gICAgc2V0dGluZ1xyXG4gICAgKm5nSWY9XCJuenhTZXR0aW5nVmlzaWJsZVwiXHJcbiAgICBbbnp4Q29sdW1uc109XCJfYm9keUNvbHVtbnNcIlxyXG4gICAgKHNvcnRlZENvbHVtbik9XCJvblNvcnRlZENvbHVtbigkZXZlbnQpXCJcclxuICAgIChmaXhlZENsaWNrKT1cImZpeGVkQ2xpY2soJGV2ZW50KVwiXHJcbiAgPjwvbnp4LWNvbHVtbi1zZXR0aW5nPlxyXG5cclxuICA8bmctY29udGFpbmVyIHRvb2xiYXI+XHJcbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwidG9vbGJhcjsgY29udGV4dDogeyAkaW1wbGljaXQ6IHsgY29udGV4dDogdGhpcyB9IH1cIj5cclxuICAgICAge3sgdG9vbGJhciB9fVxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdG9vbGJhcl1cIj48L25nLWNvbnRlbnQ+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbnp4LXRhYmxlLWhlYWRlcj5cclxuXHJcbjxuei10YWJsZVxyXG4gICNiYXNpY1RhYmxlXHJcbiAgY2xhc3M9XCJuengtaW5uZXItdGFibGVcIlxyXG4gIFtuekRhdGFdPVwibnpEYXRhXCJcclxuICBbbnpUYWJsZUxheW91dF09XCJuelRhYmxlTGF5b3V0XCJcclxuICBbbnpGcm9udFBhZ2luYXRpb25dPVwibnpGcm9udFBhZ2luYXRpb25cIlxyXG4gIFtuelRvdGFsXT1cIm56VG90YWxcIlxyXG4gIFsobnpQYWdlSW5kZXgpXT1cIm56UGFnZUluZGV4XCJcclxuICBbKG56UGFnZVNpemUpXT1cIm56UGFnZVNpemVcIlxyXG4gIFtuelNob3dQYWdpbmF0aW9uXT1cIm56U2hvd1BhZ2luYXRpb25cIlxyXG4gIFtuelBhZ2luYXRpb25Qb3NpdGlvbl09XCJuelBhZ2luYXRpb25Qb3NpdGlvblwiXHJcbiAgW256UGFnaW5hdGlvblR5cGVdPVwibnpQYWdpbmF0aW9uVHlwZVwiXHJcbiAgW256Qm9yZGVyZWRdPVwibnpCb3JkZXJlZFwiXHJcbiAgW256T3V0ZXJCb3JkZXJlZF09XCJuek91dGVyQm9yZGVyZWRcIlxyXG4gIFtueldpZHRoQ29uZmlnXT1cIm56V2lkdGhDb25maWdcIlxyXG4gIFtuelNpemVdPVwiJGFueShuelNpemUpXCJcclxuICBbbnpMb2FkaW5nXT1cIm56TG9hZGluZ1wiXHJcbiAgW256TG9hZGluZ0luZGljYXRvcl09XCJuekxvYWRpbmdJbmRpY2F0b3JcIlxyXG4gIFtuekxvYWRpbmdEZWxheV09XCJuekxvYWRpbmdEZWxheVwiXHJcbiAgW256U2Nyb2xsXT1cIm56U2Nyb2xsXCJcclxuICBbbnpUaXRsZV09XCJuelRpdGxlXCJcclxuICBbbnpGb290ZXJdPVwibnpGb290ZXJcIlxyXG4gIFtuek5vUmVzdWx0XT1cIm56Tm9SZXN1bHRcIlxyXG4gIFtuelBhZ2VTaXplT3B0aW9uc109XCJuelBhZ2VTaXplT3B0aW9ucyB8fCBkZWZhdWx0UGFnZVNpemVPcHRpb25zXCJcclxuICBbbnpTaG93UXVpY2tKdW1wZXJdPVwibnpTaG93UXVpY2tKdW1wZXJcIlxyXG4gIFtuelNob3dTaXplQ2hhbmdlcl09XCJuelNob3dTaXplQ2hhbmdlclwiXHJcbiAgW256U2hvd1RvdGFsXT1cIm56U2hvd1RvdGFsID09IG51bGwgPyB0b3RhbFRlbXBsYXRlIDogbnpTaG93VG90YWxcIlxyXG4gIFtuekl0ZW1SZW5kZXJdPVwibnpJdGVtUmVuZGVyXCJcclxuICBbbnpIaWRlT25TaW5nbGVQYWdlXT1cIm56SGlkZU9uU2luZ2xlUGFnZVwiXHJcbiAgW256U2ltcGxlXT1cIm56U2ltcGxlXCJcclxuICBbbnpUZW1wbGF0ZU1vZGVdPVwibnpUZW1wbGF0ZU1vZGVcIlxyXG4gIFtuelZpcnR1YWxJdGVtU2l6ZV09XCJuelZpcnR1YWxJdGVtU2l6ZVwiXHJcbiAgW256VmlydHVhbE1heEJ1ZmZlclB4XT1cIm56VmlydHVhbE1heEJ1ZmZlclB4XCJcclxuICBbbnpWaXJ0dWFsTWluQnVmZmVyUHhdPVwibnpWaXJ0dWFsTWluQnVmZmVyUHhcIlxyXG4gIFtuelZpcnR1YWxGb3JUcmFja0J5XT1cIm56VmlydHVhbEZvclRyYWNrQnlcIlxyXG4gIChuelBhZ2VJbmRleENoYW5nZSk9XCJuelBhZ2VJbmRleENoYW5nZS5lbWl0KCRldmVudClcIlxyXG4gIChuelBhZ2VTaXplQ2hhbmdlKT1cIm56UGFnZVNpemVDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAobnpDdXJyZW50UGFnZURhdGFDaGFuZ2UpPVwib25DdXJyZW50UGFnZURhdGFDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgKG56UXVlcnlQYXJhbXMpPVwibnpRdWVyeVBhcmFtcy5lbWl0KCRldmVudClcIlxyXG4+XHJcbiAgPHRoZWFkICpuZ0lmPVwibnp4U2hvd0hlYWRlciAhPT0gZmFsc2VcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuenhEZWZhdWx0UmVuZGVySGVhZGVyICE9PSBmYWxzZVwiPlxyXG4gICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBfaGVhZGVyQ29sdW1uc1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbCBvZiByb3dcIj5cclxuICAgICAgICAgIDx0aFxyXG4gICAgICAgICAgICAqbmdJZj1cIighY29sLm56U2hvd0NoZWNrYm94IHx8IGNvbC5uelNob3dDaGVja0FsbCA9PT0gZmFsc2UpICYmIGNvbC52aXNpYmxlICE9PSBmYWxzZVwiXHJcbiAgICAgICAgICAgIG56LXJlc2l6YWJsZVxyXG4gICAgICAgICAgICBbbnpEaXNhYmxlZF09XCJuenhSZXNpemFibGUgPT09IGZhbHNlXCJcclxuICAgICAgICAgICAgbnpCb3VuZHM9XCJ3aW5kb3dcIlxyXG4gICAgICAgICAgICAobnpSZXNpemUpPVwib25SZXNpemUoJGV2ZW50LCBjb2wpXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cImhlYWRlckNsaWNrLmVtaXQoeyBjb2x1bW46IGNvbCwgZXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgICAgIChkYmxjbGljayk9XCJoZWFkZXJEYmxjbGljay5lbWl0KHsgY29sdW1uOiBjb2wsIGV2ZW50OiAkZXZlbnQgfSlcIlxyXG4gICAgICAgICAgICAoY29udGV4dG1lbnUpPVwiaGVhZGVyQ29udGV4dG1lbnUuZW1pdCh7IGNvbHVtbjogY29sLCBldmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgICAgW256U2hvd1NvcnRdPVwiY29sLm56U2hvd1NvcnRcIlxyXG4gICAgICAgICAgICBbbnpDdXN0b21GaWx0ZXJdPVwiY29sLm56Q3VzdG9tRmlsdGVyXCJcclxuICAgICAgICAgICAgW256U29ydEZuXT1cImNvbC5uelNvcnRGbiA9PSBudWxsID8gdHJ1ZSA6IGNvbC5uelNvcnRGblwiXHJcbiAgICAgICAgICAgIFtuelNvcnREaXJlY3Rpb25zXT1cImNvbC5uelNvcnREaXJlY3Rpb25zXCJcclxuICAgICAgICAgICAgWyhuelNvcnRPcmRlcildPVwiY29sLm56U29ydE9yZGVyXCJcclxuICAgICAgICAgICAgKG56U29ydE9yZGVyQ2hhbmdlKT1cInNvcnRPcmRlckNoYW5nZSgkZXZlbnQsIGNvbClcIlxyXG4gICAgICAgICAgICBbbnpDb2x1bW5LZXldPVwiY29sLm56Q29sdW1uS2V5IHx8IGNvbC5uYW1lXCJcclxuICAgICAgICAgICAgW256U2hvd0ZpbHRlcl09XCJjb2wubnpTaG93RmlsdGVyXCJcclxuICAgICAgICAgICAgW256U29ydFByaW9yaXR5XT1cImNvbC5uelNvcnRQcmlvcml0eSA9PT0gdHJ1ZVwiXHJcbiAgICAgICAgICAgIFtuekZpbHRlckZuXT1cImNvbC5uelNob3dGaWx0ZXIgJiYgY29sLm56RmlsdGVyRm4gPT0gbnVsbCA/IHRydWUgOiBjb2wubnpGaWx0ZXJGblwiXHJcbiAgICAgICAgICAgIChuekZpbHRlckNoYW5nZSk9XCJjb2wubnpGaWx0ZXJDaGFuZ2U/LigkZXZlbnQsIG56RGF0YSlcIlxyXG4gICAgICAgICAgICBbbnpGaWx0ZXJzXT1cImNvbC5uekZpbHRlcnNcIlxyXG4gICAgICAgICAgICBbbnpGaWx0ZXJNdWx0aXBsZV09XCJjb2wubnpGaWx0ZXJNdWx0aXBsZSAhPT0gZmFsc2VcIlxyXG4gICAgICAgICAgICBbbnpXaWR0aF09XCJjb2wubnpXaWR0aCA9PSBudWxsICYmIGNvbC5pc0luZGV4ID8gJzYwcHgnIDogY29sLm56V2lkdGhcIlxyXG4gICAgICAgICAgICBbbnpMZWZ0XT1cImNvbC5maXhlZCA9PT0gJ2xlZnQnXCJcclxuICAgICAgICAgICAgW256UmlnaHRdPVwiY29sLmZpeGVkID09PSAncmlnaHQnXCJcclxuICAgICAgICAgICAgW256QWxpZ25dPVwiY29sLnRoQWxpZ25cIlxyXG4gICAgICAgICAgICBbbnpCcmVha1dvcmRdPVwiY29sLm56QnJlYWtXb3JkXCJcclxuICAgICAgICAgICAgW256RWxsaXBzaXNdPVwiY29sLm56RWxsaXBzaXNcIlxyXG4gICAgICAgICAgICBbY29sc3Bhbl09XCJjb2wuY29sc3BhblwiXHJcbiAgICAgICAgICAgIFtyb3dzcGFuXT1cImNvbC5yb3dzcGFuXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sLnRoTmdDbGFzc1wiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImNvbC50aE5nU3R5bGVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bnotcmVzaXplLWhhbmRsZXMgW256RGlyZWN0aW9uc109XCJbJ3JpZ2h0J11cIj48L256LXJlc2l6ZS1oYW5kbGVzPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgICAgICAgIHRoUmVuZGVyVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7ICRpbXBsaWNpdDogeyBjb2w6IGNvbCwgcm93OiByb3csIGNvbnRleHQ6IHRoaXMgfSwgcm93OiByb3cgfVxyXG4gICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgIDwvdGg+XHJcblxyXG4gICAgICAgICAgPHRoXHJcbiAgICAgICAgICAgICpuZ0lmPVwiY29sLm56U2hvd0NoZWNrYm94ICYmIGNvbC5uelNob3dDaGVja0FsbCAhPT0gZmFsc2UgJiYgY29sLnZpc2libGUgIT09IGZhbHNlXCJcclxuICAgICAgICAgICAgbnotcmVzaXphYmxlXHJcbiAgICAgICAgICAgIFtuekRpc2FibGVkXT1cIm56eFJlc2l6YWJsZSA9PT0gZmFsc2VcIlxyXG4gICAgICAgICAgICBuekJvdW5kcz1cIndpbmRvd1wiXHJcbiAgICAgICAgICAgIChuelJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQsIGNvbClcIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwiaGVhZGVyQ2xpY2suZW1pdCh7IGNvbHVtbjogY29sLCBldmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgICAgKGRibGNsaWNrKT1cImhlYWRlckRibGNsaWNrLmVtaXQoeyBjb2x1bW46IGNvbCwgZXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgICAgIChjb250ZXh0bWVudSk9XCJoZWFkZXJDb250ZXh0bWVudS5lbWl0KHsgY29sdW1uOiBjb2wsIGV2ZW50OiAkZXZlbnQgfSlcIlxyXG4gICAgICAgICAgICBbbnpTaG93Q2hlY2tib3hdPVwiY29sLm56U2hvd0NoZWNrYm94XCJcclxuICAgICAgICAgICAgW256SW5kZXRlcm1pbmF0ZV09XCJjb2wubnpJbmRldGVybWluYXRlXCJcclxuICAgICAgICAgICAgWyhuekNoZWNrZWQpXT1cImNvbC5jaGVja2VkXCJcclxuICAgICAgICAgICAgKG56Q2hlY2tlZENoYW5nZSk9XCJ0aENoZWNrZWRDaGFuZ2UoJGV2ZW50LCBjb2wpXCJcclxuICAgICAgICAgICAgW256U2hvd1Jvd1NlbGVjdGlvbl09XCJjb2wubnpTaG93Um93U2VsZWN0aW9uXCJcclxuICAgICAgICAgICAgW256U2VsZWN0aW9uc109XCJjb2wubnpTZWxlY3Rpb25zXCJcclxuICAgICAgICAgICAgW256V2lkdGhdPVwiY29sLm56V2lkdGggPT0gbnVsbCAmJiBjb2wubnpTaG93Q2hlY2tib3ggPyAnNjBweCcgOiBjb2wubnpXaWR0aFwiXHJcbiAgICAgICAgICAgIFtuekxlZnRdPVwiY29sLmZpeGVkID09PSAnbGVmdCdcIlxyXG4gICAgICAgICAgICBbbnpSaWdodF09XCJjb2wuZml4ZWQgPT09ICdyaWdodCdcIlxyXG4gICAgICAgICAgICBbbnpBbGlnbl09XCJjb2wudGhBbGlnblwiXHJcbiAgICAgICAgICAgIFtuekJyZWFrV29yZF09XCJjb2wubnpCcmVha1dvcmRcIlxyXG4gICAgICAgICAgICBbbnpFbGxpcHNpc109XCJjb2wubnpFbGxpcHNpc1wiXHJcbiAgICAgICAgICAgIFtjb2xzcGFuXT1cImNvbC5jb2xzcGFuXCJcclxuICAgICAgICAgICAgW3Jvd3NwYW5dPVwiY29sLnJvd3NwYW5cIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjb2wudGhOZ0NsYXNzXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiY29sLnRoTmdTdHlsZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxuei1yZXNpemUtaGFuZGxlcyBbbnpEaXJlY3Rpb25zXT1cIlsncmlnaHQnXVwiPjwvbnotcmVzaXplLWhhbmRsZXM+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgICAgICAgdGhSZW5kZXJUZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IGNvbDogY29sLCByb3c6IHJvdywgY29udGV4dDogdGhpcyB9LCByb3c6IHJvdyB9XHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC90aD5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC90cj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvdGhlYWQ+XHJcblxyXG4gIDx0Ym9keSAqbmdJZj1cIm56VmlydHVhbEZvclRyYWNrQnkgfHwgbnpWaXJ0dWFsSXRlbVNpemVcIiBbY2xhc3Mubnp4LXRhYmxlLXN0cmlwZWQtdGJvZHldPVwibnp4U3RyaXBlXCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbnotdmlydHVhbC1zY3JvbGwgbGV0LXJvdyBsZXQtaW5kZXg9XCJpbmRleFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgIG56eFRyIHx8IHRyVGVtcGxhdGU7XHJcbiAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICRpbXBsaWNpdDogcm93LFxyXG4gICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgbnpEYXRhOiBuekRhdGEsXHJcbiAgICAgICAgICAgIG56UGFnZURhdGE6IGJhc2ljVGFibGUuZGF0YSxcclxuICAgICAgICAgICAgY29sdW1uczogX2JvZHlDb2x1bW5zLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIGZpcnN0OiBpbmRleCA9PT0gMCxcclxuICAgICAgICAgICAgbGFzdDogbnpEYXRhLmxlbmd0aCA9PT0gaW5kZXggKyAxLFxyXG4gICAgICAgICAgICBldmVuOiBpbmRleCAlIDIgPT09IDAsXHJcbiAgICAgICAgICAgIG9kZDogaW5kZXggJSAyICE9PSAwLFxyXG4gICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgcGFyZW50OiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXCJcclxuICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L3Rib2R5PlxyXG5cclxuICA8dGJvZHkgKm5nSWY9XCIhbnpWaXJ0dWFsRm9yVHJhY2tCeSAmJiAhbnpWaXJ0dWFsSXRlbVNpemVcIiBbY2xhc3Mubnp4LXRhYmxlLXN0cmlwZWQtdGJvZHldPVwibnp4U3RyaXBlXCI+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICpuZ0Zvcj1cImxldCByb3cgb2YgYmFzaWNUYWJsZS5kYXRhOyBpbmRleCBhcyBpbmRleDsgZmlyc3QgYXMgZmlyc3Q7IGxhc3QgYXMgbGFzdDsgZXZlbiBhcyBldmVuOyBvZGQgYXMgb2RkXCJcclxuICAgID5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgICAgICBuenhUciB8fCB0clRlbXBsYXRlO1xyXG4gICAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgICAkaW1wbGljaXQ6IHJvdyxcclxuICAgICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICAgIG56RGF0YTogbnpEYXRhLFxyXG4gICAgICAgICAgICBuelBhZ2VEYXRhOiBiYXNpY1RhYmxlLmRhdGEsXHJcbiAgICAgICAgICAgIGNvbHVtbnM6IF9ib2R5Q29sdW1ucyxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBmaXJzdDogZmlyc3QsXHJcbiAgICAgICAgICAgIGxhc3Q6IGxhc3QsXHJcbiAgICAgICAgICAgIGV2ZW46IGV2ZW4sXHJcbiAgICAgICAgICAgIG9kZDogb2RkLFxyXG4gICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgcGFyZW50OiBudWxsLFxyXG4gICAgICAgICAgICBwYXRoVHJhY2U6IFtdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXCJcclxuICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC90Ym9keT5cclxuXHJcbiAgPG5nLXRlbXBsYXRlXHJcbiAgICAjdHJUZW1wbGF0ZVxyXG4gICAgbGV0LXJvd1xyXG4gICAgbGV0LWluZGV4PVwiaW5kZXhcIlxyXG4gICAgbGV0LWZpcnN0PVwiZmlyc3RcIlxyXG4gICAgbGV0LWxhc3Q9XCJsYXN0XCJcclxuICAgIGxldC1ldmVuPVwiZXZlblwiXHJcbiAgICBsZXQtb2RkPVwib2RkXCJcclxuICAgIGxldC1sZXZlbD1cImxldmVsXCJcclxuICAgIGxldC1wYXJlbnQ9XCJwYXJlbnRcIlxyXG4gICAgbGV0LXBhdGhUcmFjZT1cInBhdGhUcmFjZVwiXHJcbiAgPlxyXG4gICAgPHRyXHJcbiAgICAgICpuZ0lmPVwiIXBhcmVudCB8fCBwYXJlbnQuZXhwYW5kXCJcclxuICAgICAgKGNsaWNrKT1cIlxyXG4gICAgICAgIG9uUm93Q2xpY2soe1xyXG4gICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICBpbmRleEF0dHI6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH0sXHJcbiAgICAgICAgICBldmVudDogJGV2ZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgXCJcclxuICAgICAgKGRibGNsaWNrKT1cIlxyXG4gICAgICAgIHJvd0RibGNsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICBpbmRleEF0dHI6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH0sXHJcbiAgICAgICAgICBldmVudDogJGV2ZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgXCJcclxuICAgICAgKGNvbnRleHRtZW51KT1cIlxyXG4gICAgICAgIHJvd0NvbnRleHRtZW51LmVtaXQoe1xyXG4gICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICBpbmRleEF0dHI6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH0sXHJcbiAgICAgICAgICBldmVudDogJGV2ZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgXCJcclxuICAgICAgW25nQ2xhc3NdPVwicm93LmNsYXNzTmFtZVwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cInJvdy5zdHlsZVwiXHJcbiAgICAgIFtjbGFzcy5hbnQtdGFibGUtcm93LXNlbGVjdGVkXT1cInJvdy5jaGVja2VkIHx8IF9zZWxlY3RSb3cgPT09IHJvd1wiXHJcbiAgICA+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgY29sIG9mIF9ib2R5Q29sdW1uczsgaW5kZXggYXMgX2luZGV4OyBmaXJzdCBhcyBfZmlyc3Q7IGxhc3QgYXMgX2xhc3Q7IGV2ZW4gYXMgX2V2ZW47IG9kZCBhcyBfb2RkXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICpsZXQ9XCJcclxuICAgICAgICAgICAgcm93XHJcbiAgICAgICAgICAgICAgfCBjb2xTcGFuXHJcbiAgICAgICAgICAgICAgICA6IG56eFNwYW5GdW5jXHJcbiAgICAgICAgICAgICAgICA6IG56RGF0YVxyXG4gICAgICAgICAgICAgICAgOiBiYXNpY1RhYmxlLmRhdGFcclxuICAgICAgICAgICAgICAgIDogY29sXHJcbiAgICAgICAgICAgICAgICA6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH1cclxuICAgICAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IF9maXJzdCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0OiBfbGFzdCxcclxuICAgICAgICAgICAgICAgICAgICBldmVuOiBfZXZlbixcclxuICAgICAgICAgICAgICAgICAgICBvZGQ6IF9vZGRcclxuICAgICAgICAgICAgICAgICAgfSBhcyBzcGFuXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDx0ZFxyXG4gICAgICAgICAgICAqbmdJZj1cImNvbC52aXNpYmxlICE9PSBmYWxzZSAmJiBzcGFuLnJvd3NwYW4gJiYgc3Bhbi5jb2xzcGFuXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cIlxyXG4gICAgICAgICAgICAgIGNlbGxDbGljay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uOiBjb2wsXHJcbiAgICAgICAgICAgICAgICBpbmRleEF0dHI6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH0sXHJcbiAgICAgICAgICAgICAgICBjb2xJbmRleDoge1xyXG4gICAgICAgICAgICAgICAgICBpbmRleDogX2luZGV4LFxyXG4gICAgICAgICAgICAgICAgICBmaXJzdDogX2ZpcnN0LFxyXG4gICAgICAgICAgICAgICAgICBsYXN0OiBfbGFzdCxcclxuICAgICAgICAgICAgICAgICAgZXZlbjogX2V2ZW4sXHJcbiAgICAgICAgICAgICAgICAgIG9kZDogX29kZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV2ZW50OiAkZXZlbnRcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAoZGJsY2xpY2spPVwiXHJcbiAgICAgICAgICAgICAgY2VsbERibGNsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IGNvbCxcclxuICAgICAgICAgICAgICAgIGluZGV4QXR0cjogeyBpbmRleDogaW5kZXgsIGZpcnN0OiBmaXJzdCwgbGFzdDogbGFzdCwgZXZlbjogZXZlbiwgb2RkOiBvZGQgfSxcclxuICAgICAgICAgICAgICAgIGNvbEluZGV4OiB7XHJcbiAgICAgICAgICAgICAgICAgIGluZGV4OiBfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgIGZpcnN0OiBfZmlyc3QsXHJcbiAgICAgICAgICAgICAgICAgIGxhc3Q6IF9sYXN0LFxyXG4gICAgICAgICAgICAgICAgICBldmVuOiBfZXZlbixcclxuICAgICAgICAgICAgICAgICAgb2RkOiBfb2RkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICRldmVudFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIChjb250ZXh0bWVudSk9XCJcclxuICAgICAgICAgICAgICBjZWxsQ29udGV4dG1lbnUuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogY29sLFxyXG4gICAgICAgICAgICAgICAgaW5kZXhBdHRyOiB7IGluZGV4OiBpbmRleCwgZmlyc3Q6IGZpcnN0LCBsYXN0OiBsYXN0LCBldmVuOiBldmVuLCBvZGQ6IG9kZCB9LFxyXG4gICAgICAgICAgICAgICAgY29sSW5kZXg6IHtcclxuICAgICAgICAgICAgICAgICAgaW5kZXg6IF9pbmRleCxcclxuICAgICAgICAgICAgICAgICAgZmlyc3Q6IF9maXJzdCxcclxuICAgICAgICAgICAgICAgICAgbGFzdDogX2xhc3QsXHJcbiAgICAgICAgICAgICAgICAgIGV2ZW46IF9ldmVuLFxyXG4gICAgICAgICAgICAgICAgICBvZGQ6IF9vZGRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBldmVudDogJGV2ZW50XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgW256U2hvd0NoZWNrYm94XT1cImNvbC5uelNob3dDaGVja2JveCB8fCByb3cuc2hvd0NoZWNrYm94XCJcclxuICAgICAgICAgICAgW256RGlzYWJsZWRdPVwicm93LmRpc2FibGVkXCJcclxuICAgICAgICAgICAgW256SW5kZXRlcm1pbmF0ZV09XCJyb3cubnpJbmRldGVybWluYXRlXCJcclxuICAgICAgICAgICAgWyhuekNoZWNrZWQpXT1cInJvdy5jaGVja2VkXCJcclxuICAgICAgICAgICAgKG56Q2hlY2tlZENoYW5nZSk9XCJ0ZENoZWNrZWRDaGFuZ2UoJGV2ZW50LCBjb2wsIHJvdywgcGF0aFRyYWNlLCB7IGluZGV4LCBmaXJzdCwgbGFzdCwgZXZlbiwgb2RkIH0pXCJcclxuICAgICAgICAgICAgW256U2hvd0V4cGFuZF09XCJjb2wuc2hvd0V4cGFuZCAmJiByb3cuY2hpbGRyZW4gJiYgcm93LmNoaWxkcmVuLmxlbmd0aCA+IDBcIlxyXG4gICAgICAgICAgICBbKG56RXhwYW5kKV09XCJyb3cuZXhwYW5kXCJcclxuICAgICAgICAgICAgKG56RXhwYW5kQ2hhbmdlKT1cIlxyXG4gICAgICAgICAgICAgIGRlZmF1bHRDb2xsYXBzZShyb3csICRldmVudCk7XHJcbiAgICAgICAgICAgICAgY29sLm56RXhwYW5kQ2hhbmdlICYmIGNvbC5uekV4cGFuZENoYW5nZSgkZXZlbnQsIGNvbCwgcm93LCB7IGluZGV4LCBmaXJzdCwgbGFzdCwgZXZlbiwgb2RkIH0pXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIFtuekluZGVudFNpemVdPVwiY29sLnNob3dFeHBhbmQgPyBsZXZlbCAqIG56SW5kZW50U2l6ZSA6IG51bGxcIlxyXG4gICAgICAgICAgICBbbnpMZWZ0XT1cImNvbC5maXhlZCA9PT0gJ2xlZnQnXCJcclxuICAgICAgICAgICAgW256UmlnaHRdPVwiY29sLmZpeGVkID09PSAncmlnaHQnXCJcclxuICAgICAgICAgICAgW256QWxpZ25dPVwiY29sLnRkQWxpZ24gfHwgY29sLm56QWxpZ25cIlxyXG4gICAgICAgICAgICBbbnpCcmVha1dvcmRdPVwiY29sLm56QnJlYWtXb3JkXCJcclxuICAgICAgICAgICAgW256RWxsaXBzaXNdPVwiY29sLm56RWxsaXBzaXNcIlxyXG4gICAgICAgICAgICBbYXR0ci5jb2xzcGFuXT1cInNwYW4uY29sc3BhblwiXHJcbiAgICAgICAgICAgIFthdHRyLnJvd3NwYW5dPVwic3Bhbi5yb3dzcGFuXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sLnRkTmdDbGFzc1wiXHJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImNvbC50ZE5nU3R5bGVcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgICAgICAgIHRkRGF0YVJlbmRlcjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgJGltcGxpY2l0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sOiBjb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBuekRhdGE6IG56RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBuelBhZ2VEYXRhOiBiYXNpY1RhYmxlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhBdHRyOiB7IGluZGV4OiBpbmRleCwgZmlyc3Q6IGZpcnN0LCBsYXN0OiBsYXN0LCBldmVuOiBldmVuLCBvZGQ6IG9kZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbEluZGV4OiB7IGluZGV4OiBfaW5kZXgsIGZpcnN0OiBfZmlyc3QsIGxhc3Q6IF9sYXN0LCBldmVuOiBfZXZlbiwgb2RkOiBfb2RkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgcm93OiByb3dcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvdHI+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygcm93LmNoaWxkcmVuOyBpbmRleCBhcyBjSW5kZXg7IGZpcnN0IGFzIGNGaXJzdDsgbGFzdCBhcyBjTGFzdDsgZXZlbiBhcyBjRXZlbjsgb2RkIGFzIGNPZGRcIlxyXG4gICAgPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgIG56eFRyIHx8IHRyVGVtcGxhdGU7XHJcbiAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICRpbXBsaWNpdDogY2hpbGQsXHJcbiAgICAgICAgICAgIGxldmVsOiBsZXZlbCArIDEsXHJcbiAgICAgICAgICAgIHBhcmVudEluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgcm93OiBjaGlsZCxcclxuICAgICAgICAgICAgbnpEYXRhOiBuekRhdGEsXHJcbiAgICAgICAgICAgIG56UGFnZURhdGE6IGJhc2ljVGFibGUuZGF0YSxcclxuICAgICAgICAgICAgY29sdW1uczogX2JvZHlDb2x1bW5zLFxyXG4gICAgICAgICAgICBpbmRleDogY0luZGV4LFxyXG4gICAgICAgICAgICBmaXJzdDogY0ZpcnN0LFxyXG4gICAgICAgICAgICBsYXN0OiBjTGFzdCxcclxuICAgICAgICAgICAgZXZlbjogY0V2ZW4sXHJcbiAgICAgICAgICAgIG9kZDogY09kZCxcclxuICAgICAgICAgICAgcGFyZW50OiByb3csXHJcbiAgICAgICAgICAgIHBhdGhUcmFjZTogW3BhdGhUcmFjZSwgcm93XVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFwiXHJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcbjwvbnotdGFibGU+XHJcblxyXG48bmctdGVtcGxhdGUgI3RoUmVuZGVyVGVtcGxhdGUgbGV0LWRhdGE+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEuY29sLl90aFRlbXBsYXRlOyBlbHNlIHRleHRUaFRlbXBsYXRlXCI+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF0YS5jb2wuX3RoVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBkYXRhLCBkYXRhOiBkYXRhLCBjb2w6IGRhdGEuY29sIH1cIlxyXG4gICAgPjwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8bmctdGVtcGxhdGUgI3RleHRUaFRlbXBsYXRlPlxyXG4gICAge3sgZGF0YS5jb2wudGhUZXh0ID09IG51bGwgJiYgZGF0YS5jb2wuaXNJbmRleCA/ICfluo/lj7cnIDogZGF0YS5jb2wudGhUZXh0IH19XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdGREYXRhUmVuZGVyIGxldC1kYXRhIGxldC1yb3c9XCJyb3dcIj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRhdGEuY29sLmlzSW5kZXg7IGVsc2UgdGRUZW1wbGF0ZVRlbXBsYXRlXCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YS5jb2wuX3RkVGVtcGxhdGU7IGVsc2UgYnV0dG9uQ29udHJvbFRlbXBsYXRlXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgZGF0YS5jb2wuX3RkVGVtcGxhdGU7XHJcbiAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICRpbXBsaWNpdDogcm93LFxyXG4gICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgY29sOiBkYXRhLmNvbCxcclxuICAgICAgICAgICAgaW5kZXhBdHRyOiBkYXRhLmluZGV4QXR0cixcclxuICAgICAgICAgICAgcGFyZW50OiBkYXRhLnBhcmVudFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIFwiXHJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8bmctdGVtcGxhdGUgI3RkVGVtcGxhdGVUZW1wbGF0ZT5cclxuICAgIHt7IG56UGFnZVNpemUgKiAobnpQYWdlSW5kZXggLSAxKSArIGRhdGEuaW5kZXhBdHRyLmluZGV4ICsgMSB9fVxyXG4gIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDwhLS0g5oyJ6ZKu5YiXLS0+XHJcbiAgPG5nLXRlbXBsYXRlICNidXR0b25Db250cm9sVGVtcGxhdGU+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YS5jb2wuYnV0dG9uczsgZWxzZSB3aWRnZXRDb250cm9sVGVtcGxhdGVcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICpuZ0Zvcj1cIlxyXG4gICAgICAgICAgbGV0IGJ0biBvZiBkYXRhLmNvbC5idXR0b25zIHwgY29sQnV0dG9uczogcm93IDogZGF0YSA6IGRhdGEucGFyZW50IHwgYXN5bmM7XHJcbiAgICAgICAgICBpbmRleCBhcyBpbmRleDtcclxuICAgICAgICAgIGNvdW50IGFzIGNvdW50O1xyXG4gICAgICAgICAgbGFzdCBhcyBsYXN0XHJcbiAgICAgICAgXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICpuZ0lmPVwiYnRuICYmIChidG4udmlzaWJsZSB8IGNvbEJ1dHRvblZpc2libGUpKHJvdywgZGF0YSkgIT09IGZhbHNlICYmIChidG4ucGVybWlzc2lvbiB8IGhhc0F1dGggfCBhc3luYylcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxuengtdGFibGUtYnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYnRuLmxpbmsgPT09IGZhbHNlXCJcclxuICAgICAgICAgICAgW3Byb3BzXT1cImJ0blwiXHJcbiAgICAgICAgICAgIFtyb3ddPVwicm93XCJcclxuICAgICAgICAgICAgW2luZGV4QXR0cl09XCJkYXRhLmluZGV4QXR0clwiXHJcbiAgICAgICAgICAgIFtjb2xJbmRleF09XCJkYXRhLmNvbEluZGV4XCJcclxuICAgICAgICAgICAgW256RGF0YV09XCJkYXRhLm56RGF0YVwiXHJcbiAgICAgICAgICAgIFtuelBhZ2VEYXRhXT1cImRhdGEubnpQYWdlRGF0YVwiXHJcbiAgICAgICAgICAgIFtjb2x1bW5dPVwiZGF0YS5jb2xcIlxyXG4gICAgICAgICAgPjwvbnp4LXRhYmxlLWJ1dHRvbj5cclxuICAgICAgICAgIDxuengtdGFibGUtbGlua1xyXG4gICAgICAgICAgICAqbmdJZj1cImJ0bi5saW5rICE9PSBmYWxzZVwiXHJcbiAgICAgICAgICAgIFtwcm9wc109XCJidG5cIlxyXG4gICAgICAgICAgICBbcm93XT1cInJvd1wiXHJcbiAgICAgICAgICAgIFtpbmRleEF0dHJdPVwiZGF0YS5pbmRleEF0dHJcIlxyXG4gICAgICAgICAgICBbY29sSW5kZXhdPVwiZGF0YS5jb2xJbmRleFwiXHJcbiAgICAgICAgICAgIFtuekRhdGFdPVwiZGF0YS5uekRhdGFcIlxyXG4gICAgICAgICAgICBbbnpQYWdlRGF0YV09XCJkYXRhLm56UGFnZURhdGFcIlxyXG4gICAgICAgICAgICBbY29sdW1uXT1cImRhdGEuY29sXCJcclxuICAgICAgICAgID48L256eC10YWJsZS1saW5rPlxyXG4gICAgICAgICAgPG56LWRpdmlkZXIgKm5nSWY9XCJidG4uc2hvd0RpdmlkZXIgIT09IGZhbHNlICYmIGNvdW50ID4gMSAmJiAhbGFzdFwiIG56VHlwZT1cInZlcnRpY2FsXCI+PC9uei1kaXZpZGVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDwhLS3oh6rlrprkuYnpg6jku7YtLT5cclxuICA8bmctdGVtcGxhdGUgI3dpZGdldENvbnRyb2xUZW1wbGF0ZT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLmNvbC53aWRnZXRzOyBlbHNlIHRleHRWYWx1ZVRlbXBsYXRlXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGJ0biBvZiBkYXRhLmNvbC53aWRnZXRzIHwgY29sQnV0dG9uczogcm93IDogZGF0YSA6IGRhdGEucGFyZW50IHwgYXN5bmNcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAqbmdJZj1cImJ0biAmJiAoYnRuLnZpc2libGUgfCBjb2xCdXR0b25WaXNpYmxlKShyb3csIGRhdGEpICE9PSBmYWxzZSAmJiAoYnRuLnBlcm1pc3Npb24gfCBoYXNBdXRoIHwgYXN5bmMpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAgICAgdGFibGUtd2lkZ2V0XHJcbiAgICAgICAgICAgIFt3aWRnZXRdPVwiYnRuXCJcclxuICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxyXG4gICAgICAgICAgICBbaW5kZXhBdHRyXT1cImRhdGEuaW5kZXhBdHRyXCJcclxuICAgICAgICAgICAgW2NvbEluZGV4XT1cImRhdGEuY29sSW5kZXhcIlxyXG4gICAgICAgICAgICBbbnpEYXRhXT1cImRhdGEubnpEYXRhXCJcclxuICAgICAgICAgICAgW256UGFnZURhdGFdPVwiZGF0YS5uelBhZ2VEYXRhXCJcclxuICAgICAgICAgICAgW2NvbHVtbl09XCJkYXRhLmNvbFwiXHJcbiAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICA8bmctdGVtcGxhdGUgI3RleHRWYWx1ZVRlbXBsYXRlPlxyXG4gICAge3tcclxuICAgICAgcm93XHJcbiAgICAgICAgfCBjb2xGb3JtYXQ6IGRhdGEuY29sIDogZGF0YVxyXG4gICAgICAgIHwgYXN5bmNcclxuICAgICAgICB8IGRlZmF1bHRpZnk6IChkYXRhLmNvbC5uelNob3dDaGVja2JveCA/ICcnIDogZGF0YS5jb2wuZGVmYXVsdGlmeSB8fCBkZWZhdWx0VGV4dClcclxuICAgIH19XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdG90YWxUZW1wbGF0ZSBsZXQtcmFuZ2U9XCJyYW5nZVwiIGxldC10b3RhbD5cclxuICDnrKwge3sgcmFuZ2VbMF0gLyBuelBhZ2VTaXplIHwgbWF0aDogJ2NlaWwnIH19L3t7IHRvdGFsIC8gbnpQYWdlU2l6ZSB8IG1hdGg6ICdjZWlsJyB9fSDpobUg5YWxIHt7IHRvdGFsIH19IOadoVxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=