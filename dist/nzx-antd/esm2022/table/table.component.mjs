import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import { FETCH_SETTING } from './const';
import { debounceTime, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FetcherService } from '@freezesoul/nzx-antd/service';
import { NamedTemplate } from '@freezesoul/nzx-antd/directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@freezesoul/nzx-antd";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/table";
import * as i5 from "ng-zorro-antd/resizable";
import * as i6 from "ng-zorro-antd/divider";
import * as i7 from "ng-zorro-antd/core/outlet";
import * as i8 from "@freezesoul/nzx-antd/directive";
import * as i9 from "./table-widget/table-button/table-button.component";
import * as i10 from "./table-widget/table-link/table-link.component";
import * as i11 from "./header/table-header/table-header.component";
import * as i12 from "./header/column-setting/column-setting.component";
import * as i13 from "./table-widget.directive";
import * as i14 from "@freezesoul/nzx-antd/pipe";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFLTixXQUFXLEVBRVgsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQVd2QixPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBZXJELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxjQUFjLEVBQWUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvRDs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyxpQkFBaUI7SUFrWGhCO0lBQ0E7SUFDQTtJQUNBO0lBQ0Y7SUFuWFY7O09BRUc7SUFDSCxVQUFVLENBQUs7SUFDZjs7T0FFRztJQUNILGdCQUFnQixHQUFRLEVBQUUsQ0FBQztJQUMzQixjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUN0QyxZQUFZLEdBQW1CLEVBQUUsQ0FBQztJQUNsQyxXQUFXLEdBQW1CLEVBQUUsQ0FBQztJQUV6QixRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2Is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RyxZQUFZO3NCQUFyQixNQUFNO2dCQUV5QixRQUFRO3NCQUF2QyxlQUFlO3VCQUFDLGFBQWE7Z0JBQ2EsT0FBTztzQkFBakQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUV6QyxpQkFBaUI7c0JBRGhCLFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQSxVQUEwQixDQUFBLEVBQUU7Z0JBOGEzRSxjQUFjO3NCQURiLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2UsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBUcmFja0J5RnVuY3Rpb24sXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTnpUYWJsZUNvbXBvbmVudCxcclxuICBOelRhYmxlTGF5b3V0LFxyXG4gIE56VGFibGVQYWdpbmF0aW9uUG9zaXRpb24sXHJcbiAgTnpUYWJsZVBhZ2luYXRpb25UeXBlLFxyXG4gIE56VGFibGVRdWVyeVBhcmFtcyxcclxuICBOelRhYmxlU29ydE9yZGVyXHJcbn0gZnJvbSAnbmctem9ycm8tYW50ZC90YWJsZSc7XHJcbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvcGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IEFueSB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkJztcclxuaW1wb3J0IHsgQ2RrRHJhZ0Ryb3AsIG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBOelJlc2l6ZUV2ZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9yZXNpemFibGUnO1xyXG5pbXBvcnQge1xyXG4gIENlbGxFdmVudEFyZyxcclxuICBGZXRjaFNldHRpbmcsXHJcbiAgSGVhZGVyRXZlbnRBcmcsXHJcbiAgSW5kZXhBdHRyLFxyXG4gIE56eENvbHVtbixcclxuICBOenhUYWJsZVNpemUsXHJcbiAgUGFnZUluZm8sXHJcbiAgUm93RXZlbnRBcmcsXHJcbiAgU29ydGVyUmVzdWx0LFxyXG4gIFNwYW5GdW5jLFxyXG4gIFRyVGVtcGxhdGVBcmdzXHJcbn0gZnJvbSAnLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgRkVUQ0hfU0VUVElORyB9IGZyb20gJy4vY29uc3QnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZCc7XHJcbmltcG9ydCB7IEZldGNoZXJTZXJ2aWNlLCBGZXRjaFBhcmFtcyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3NlcnZpY2UnO1xyXG5pbXBvcnQgeyBOYW1lZFRlbXBsYXRlIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiDln7rkuo5uei10YWJsZeS6jOasoeWwgeijheeahOihqOagvOe7hOS7tlxyXG4gKiAjIyDnibnmgKdcclxuICogLSDphY3nva7liqDovb3mlbDmja46IGBhcGk6IHN0cmluZyB8IFByb21pc2U8VFtdPiB8IE9ic2VydmFibGU8VFtdPmBcclxuICogLSDmlK/mjIHliJfnmoTphY3nva46IGBuenhDb2x1bW5zOiBOenhDb2x1bW48VD5bXWBcclxuICogLSDliJfmlK/mjIHmjpLluo/phY3nva5cclxuICogLSDpu5jorqTmlK/mjIHmmL7npLrmi5bliqjliJcsIOiwg+aVtOWIl+mhuuW6j1xyXG4gKiAtIOaUr+aMgemFjee9ruaYvuekuuW6j+WPt+OAgeWkjemAieahhlxyXG4gKiAtIOiHquWumuS5iea4suafk+WGheWuue+8jCB0ZW1wbGF0ZeS9v+eUqOWQjeensOWNs+WPr+W8leeUqOaIkOWKn1xyXG4gKiAtIOaUr+aMgeivt+axgi/lk43lupTkv6Hmga/phY3nva4sIGBmZXRjaFNldHRpbmc/OiBGZXRjaFNldHRpbmdgXHJcbiAqIC0g5pSv5oyB5byC5q2l5qC85byP5YyW5YiX5pWw5o2uXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC10YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHsgJ1tjbGFzcy5uengtdGFibGVdJzogJ3RydWUnLCAnW2NsYXNzLm56eC10YWJsZS1maXRdJzogJ256eEZpdCcgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4VGFibGVDb21wb25lbnQ8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIEFueT4gPSBBbnk+XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlc1xyXG57XHJcbiAgLyoqXHJcbiAgICog5b2T5YmN6YCJ5Lit55qE6KGMXHJcbiAgICovXHJcbiAgX3NlbGVjdFJvdz86IFQ7XHJcbiAgLyoqXHJcbiAgICog5b2T5YmN6aG15pWw5o2uXHJcbiAgICovXHJcbiAgX2N1cnJlbnRQYWdlRGF0YTogVFtdID0gW107XHJcbiAgX2hlYWRlckNvbHVtbnM6IE56eENvbHVtbjxUPltdW10gPSBbXTtcclxuICBfYm9keUNvbHVtbnM6IE56eENvbHVtbjxUPltdID0gW107XHJcbiAgX2FsbENvbHVtbnM6IE56eENvbHVtbjxUPltdID0gW107XHJcblxyXG4gIHByaXZhdGUgX256VG90YWwgPSAwO1xyXG4gIHByaXZhdGUgX256U2hvd1BhZ2luYXRpb24gPSB0cnVlO1xyXG4gIHNvcnRJbmZvPzogU29ydGVyUmVzdWx0O1xyXG4gIGRlZmF1bHRQYWdlU2l6ZU9wdGlvbnMgPSBbMTAsIDE1LCAyMCwgMzAsIDQwLCA1MCwgMTAwXTtcclxuXHJcbiAgLyoqXHJcbiAgICog6K+35rGC5aSE55CGXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXBpITogc3RyaW5nIHwgUHJvbWlzZTxUW10+IHwgT2JzZXJ2YWJsZTxUW10+O1xyXG5cclxuICAvKipcclxuICAgKiDor7fmsYLlj4LmlbBcclxuICAgKi9cclxuICBASW5wdXQoKSBwYXJhbXM/OiBGZXRjaFBhcmFtcztcclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrliLfmlrDmjInpkq5cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhSZWZyZXNoVmlzaWJsZSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S66LCD5pW06KGo5qC85aSn5bCP5oyJ6ZKuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4UmVzaXplVmlzaWJsZSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5pi+56S66YWN572u5YiXLCDlj6rlnKjpnZ7lkIjlubbooajlpLTml7blj6/nlKhcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTZXR0aW5nVmlzaWJsZSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S65paR6ams57q/XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RyaXBlID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5LmL5YmN5aSE55CG5Ye95pWwXHJcbiAgICovXHJcbiAgQElucHV0KCkgYmVmb3JlRmV0Y2g/OiAocGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBBbnk+KSA9PiBSZWNvcmQ8c3RyaW5nLCBBbnk+IHwgUHJvbWlzZTxBbnk+O1xyXG4gIC8qKlxyXG4gICAqIOivt+axguS5i+WQjuWkhOeQhuWHveaVsFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFmdGVyRmV0Y2g/OiAoXHJcbiAgICByZXM6IEFueSxcclxuICAgIHBhZ2VJbmRleDogbnVtYmVyLFxyXG4gICAgcmVzZXQ6IGJvb2xlYW5cclxuICApID0+IFBhcnRpYWw8UGFnZUluZm88VD4+IHwgUHJvbWlzZTxQYXJ0aWFsPFBhZ2VJbmZvPFQ+Pj47XHJcblxyXG4gIC8qKlxyXG4gICAqIOivt+axgumFjee9rlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZldGNoU2V0dGluZz86IEZldGNoU2V0dGluZztcclxuICAvKipcclxuICAgKiDmjpLluo/lh73mlbBcclxuICAgKi9cclxuICBASW5wdXQoKSBzb3J0Rm4hOiAoZGF0YTogU29ydGVyUmVzdWx0KSA9PiBTb3J0ZXJSZXN1bHQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmFjee9ruWIl1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eENvbHVtbnM6IE56eENvbHVtbjxUPltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIOm7mOiupOa4suafk+ihqOWktFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eERlZmF1bHRSZW5kZXJIZWFkZXIgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOagh+mimFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S66KGo5aS0XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U2hvd0hlYWRlcj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5bel5YW35qCPLeWcqOW3peWFt+agj+S5i+WJjVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2xiYXJCZWZvcmU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcclxuICAvKipcclxuICAgKiDlt6XlhbfmoI9cclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sYmFyPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm6IO96LCD5pW05YiX5aSn5bCPXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4UmVzaXphYmxlID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDooajmoLzluIPlsYBcclxuICAgKi9cclxuICBASW5wdXQoKSBuelRhYmxlTGF5b3V0OiBOelRhYmxlTGF5b3V0ID0gJ2F1dG8nO1xyXG4gIC8qKlxyXG4gICAqIOeUqOS6juaYvuekuuaVsOaNruaAu+mHj+WSjOW9k+WJjeaVsOaNruiMg+WbtO+8jOeUqOazleWPgueFpyBQYWdpbmF0aW9uIOe7hOS7tlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56U2hvd1RvdGFsPzogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IG51bWJlcjsgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl0gfT47XHJcbiAgLyoqXHJcbiAgICog55So5LqO6Ieq5a6a5LmJ6aG156CB55qE57uT5p6E77yM55So5rOV5Y+C54WnIFBhZ2luYXRpb24g57uE5Lu2XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpJdGVtUmVuZGVyPzogVGVtcGxhdGVSZWY8UGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0PjtcclxuICAvKipcclxuICAgKiDooajmoLzmoIfpophcclxuICAgKi9cclxuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8QW55PjtcclxuICAvKipcclxuICAgKiDooajmoLzlsL7pg6hcclxuICAgKi9cclxuICBASW5wdXQoKSBuekZvb3Rlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPEFueT47XHJcbiAgLyoqXHJcbiAgICog5peg5pWw5o2u5pe25pi+56S65YaF5a65XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpOb1Jlc3VsdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPEFueT47XHJcbiAgLyoqXHJcbiAgICogXHTpobXmlbDpgInmi6nlmajlj6/pgInlgLxcclxuICAgKi9cclxuICBASW5wdXQoKSBuelBhZ2VTaXplT3B0aW9ucz86IG51bWJlcltdO1xyXG4gIC8qKlxyXG4gICAqIOiZmuaLn+a7muWKqOaXtuavj+S4gOWIl+eahOmrmOW6pu+8jOS4jiBjZGsgaXRlbVNpemUg55u45ZCMXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpWaXJ0dWFsSXRlbVNpemUgPSAwO1xyXG4gIC8qKlxyXG4gICAqIFx057yT5Yay5Yy65pyA5aSn5YOP57Sg6auY5bqm77yM5LiOIGNkayBtYXhCdWZmZXJQeCDnm7jlkIxcclxuICAgKi9cclxuICBASW5wdXQoKSBuelZpcnR1YWxNYXhCdWZmZXJQeCA9IDIwMDtcclxuICAvKipcclxuICAgKiDnvJPlhrLljLrmnIDlsI/lg4/ntKDpq5jluqbvvIzkvY7kuo7or6XlgLzml7blsIbliqDovb3mlrDnu5PmnoTvvIzkuI4gY2RrIG1pbkJ1ZmZlclB4IOebuOWQjFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56VmlydHVhbE1pbkJ1ZmZlclB4ID0gMTAwO1xyXG4gIC8qKlxyXG4gICAqIOW7tui/n+aYvuekuuWKoOi9veaViOaenOeahOaXtumXtO+8iOmYsuatoumXqueDge+8iVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56TG9hZGluZ0RlbGF5ID0gMDtcclxuICAvKipcclxuICAgKiBcdOW9k+WJjemhteegge+8jOWPr+WPjOWQkee7keWumlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56UGFnZUluZGV4ID0gMTtcclxuICAvKipcclxuICAgKiDmr4/pobXlsZXnpLrlpJrlsJHmlbDmja7vvIzlj6/lj4zlkJHnu5HlrppcclxuICAgKi9cclxuICBASW5wdXQoKSBuelBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIOW9k+WJjeaAu+aVsOaNru+8jOWcqOacjeWKoeWZqOa4suafk+aXtumcgOimgeS8oOWFpVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBuelRvdGFsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX256VG90YWwgPSB2YWx1ZTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5maXhlZEZpdCgpKTtcclxuICB9XHJcbiAgZ2V0IG56VG90YWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbnpUb3RhbDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6KGo5aS05YiG57uE5pe25oyH5a6a5q+P5YiX5a695bqm77yM5LiOIHRoIOeahCBbbnpXaWR0aF0g5LiN5Y+v5re355SoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpXaWR0aENvbmZpZzogUmVhZG9ubHlBcnJheTxzdHJpbmcgfCBudWxsPiA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIOihqOagvOaVsOaNrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56RGF0YTogVFtdID0gW107XHJcbiAgLyoqXHJcbiAgICog5oyH5a6a5YiG6aG15pi+56S655qE5L2N572uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpQYWdpbmF0aW9uUG9zaXRpb246IE56VGFibGVQYWdpbmF0aW9uUG9zaXRpb24gPSAnYm90dG9tJztcclxuICAvKipcclxuICAgKiDmqKrlkJHmlK/mjIHmu5rliqhcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgc2Nyb2xsWCh2YWx1ZTogc3RyaW5nIHwgbnVsbCkge1xyXG4gICAgdGhpcy5uelNjcm9sbCA9IHsgLi4udGhpcy5uelNjcm9sbCwgeDogdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOe6teWQkeaUr+aMgea7muWKqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBzY3JvbGxZKHZhbHVlOiBzdHJpbmcgfCBudWxsKSB7XHJcbiAgICB0aGlzLm56U2Nyb2xsID0geyAuLi50aGlzLm56U2Nyb2xsLCB5OiB2YWx1ZSB9O1xyXG4gIH1cclxuXHJcbiAgbnpTY3JvbGw6IHtcclxuICAgIHg/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgeT86IHN0cmluZyB8IG51bGw7XHJcbiAgfSA9IHsgeDogdGhpcy5zY3JvbGxYLCB5OiB0aGlzLnNjcm9sbFkgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog6KGo5qC85piv5ZCm6Ieq5Yqo5pKR5ruhXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4Rml0PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmjIflrprliIbpobXmmL7npLrnmoTlsLrlr7hcclxuICAgKi9cclxuICBASW5wdXQoKSBuelBhZ2luYXRpb25UeXBlOiBOelRhYmxlUGFnaW5hdGlvblR5cGUgPSAnZGVmYXVsdCc7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5Zyo5YmN56uv5a+55pWw5o2u6L+b6KGM5YiG6aG177yM5aaC5p6c5Zyo5pyN5Yqh5Zmo5YiG6aG15pWw5o2u5oiW6ICF6ZyA6KaB5Zyo5YmN56uv5pi+56S65YWo6YOo5pWw5o2u5pe25Lyg5YWlIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpGcm9udFBhZ2luYXRpb24gPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDmqKHmnb/mqKHlvI/vvIzml6DpnIDlsIbmlbDmja7kvKDpgJLnu5kgbnpEYXRhXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpUZW1wbGF0ZU1vZGUgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiBcdOaYr+WQpuaYvuekuuWIhumhteWZqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBuelNob3dQYWdpbmF0aW9uKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9uelNob3dQYWdpbmF0aW9uID0gdmFsdWU7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZml4ZWRGaXQoKSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbnpTaG93UGFnaW5hdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9uelNob3dQYWdpbmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i5piv5ZCm5Yqg6L295LitXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpMb2FkaW5nID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm6Ieq5Yqo5pi+56S6bG9hZGluZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEF1dG9Mb2FkaW5nID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S65aSW6L655qGGXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpPdXRlckJvcmRlcmVkID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5Yqg6L295oyH56S656ymXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpMb2FkaW5nSW5kaWNhdG9yPzogVGVtcGxhdGVSZWY8QW55PjtcclxuICAvKipcclxuICAgKiDmmK/lkKblsZXnpLrlpJbovrnmoYblkozliJfovrnmoYZcclxuICAgKi9cclxuICBASW5wdXQoKSBuekJvcmRlcmVkID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog6KGo5qC85aSn5bCPLCDmraPluLjmiJbov7fkvaDnsbvlnotcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNpemU6IE56eFRhYmxlU2l6ZSA9ICdzbWFsbCc7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5Y+v5Lul5pS55Y+YIG56UGFnZVNpemVcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNob3dTaXplQ2hhbmdlciA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5Y+q5pyJ5LiA6aG15pe25piv5ZCm6ZqQ6JeP5YiG6aG15ZmoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpIaWRlT25TaW5nbGVQYWdlID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5Y+v5Lul5b+r6YCf6Lez6L2s6Iez5p+Q6aG1XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpTaG93UXVpY2tKdW1wZXIgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOW9k+a3u+WKoOivpeWxnuaAp+aXtu+8jOaYvuekuuS4uueugOWNleWIhumhtVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56U2ltcGxlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuuaTjeS9nOaMiemSruWwj+Wbvuagh1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFjdGlvblZpc2libGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuumhtumDqOagh+mimFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2xiYXJWaXNpYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDngrnlh7vooYzmmK/lkKbpgInkuK1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhDbGlja1NlbGVjdGVkUm93PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDlvZPmlbDmja7kuLpudWxs5pi+56S655qE6buY6K6k5paH5pysXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVmYXVsdFRleHQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUseWklumDqOS8oOWFpeaooeadv+WIl+ihqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRwbE1hcD86IE1hcDxzdHJpbmcsIFRlbXBsYXRlUmVmPEFueT4+O1xyXG4gIC8qKlxyXG4gICAqIOiZmuaLn+a7muWKqOaVsOaNriBUcmFja0J5RnVuY3Rpb24g5Ye95pWwXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpWaXJ0dWFsRm9yVHJhY2tCeT86IFRyYWNrQnlGdW5jdGlvbjxUPjtcclxuICAvKipcclxuICAgKiDlkIjlubbljZXlhYPmoLxcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTcGFuRnVuYz86IFNwYW5GdW5jPFQ+O1xyXG4gIC8qKlxyXG4gICAqIOiHquWumuS5iXRyXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VHI/OiBUZW1wbGF0ZVJlZjxUclRlbXBsYXRlQXJnczxUPj47XHJcbiAgLyoqXHJcbiAgICog5aaC5p6c5piv5qCR57uT5p6ELCDorr7nva7nvKnov5vlpKflsI9cclxuICAgKi9cclxuICBASW5wdXQoKSBuekluZGVudFNpemUgPSAyMDtcclxuXHJcbiAgLyoqXHJcbiAgICog5qCR6KGo55qEY2hlY2thYmxl54q25oCB5LiL6IqC54K56YCJ5oup5a6M5YWo5Y+X5o6n77yI54i25a2Q6IqC54K56YCJ5Lit54q25oCB5LiN5YaN5YWz6IGU77yJLCDpu5jorqRmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56Q2hlY2tTdHJpY3RseT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog6aG15pWw5pS55Y+Y5pe255qE5Zue6LCD5Ye95pWwXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UGFnZVNpemVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuICAvKipcclxuICAgKiDlvZPliY3pobXnoIHmlLnlj5jml7bnmoTlm57osIPlh73mlbBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpQYWdlSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuICAvKipcclxuICAgKiBcdOW9k+acjeWKoeerr+WIhumhteOAgeetm+mAieOAgeaOkuW6j+aXtu+8jOeUqOS6juiOt+W+l+WPguaVsFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBuelF1ZXJ5UGFyYW1zID0gbmV3IEV2ZW50RW1pdHRlcjxOelRhYmxlUXVlcnlQYXJhbXM+KCk7XHJcbiAgLyoqXHJcbiAgICog5b2T5YmN6aG16Z2i5bGV56S65pWw5o2u5pS55Y+Y55qE5Zue6LCD5Ye95pWwXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q3VycmVudFBhZ2VEYXRhQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxyZWFkb25seSBUW10+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaVsOaNruihjOeCueWHu+S6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Um93RXZlbnRBcmc8VD4+KCk7XHJcbiAgLyoqXHJcbiAgICog5pWw5o2u6KGM5Y+M5Ye75LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJvd0RibGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dFdmVudEFyZzxUPj4oKTtcclxuICAvKipcclxuICAgKiDmlbDmja7ooYzlj7PplK7oj5zljZXkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgcm93Q29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPFJvd0V2ZW50QXJnPFQ+PigpO1xyXG5cclxuICAvKipcclxuICAgKiDljZXlhYPmoLzngrnlh7vkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2VsbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxDZWxsRXZlbnRBcmc8VD4+KCk7XHJcbiAgLyoqXHJcbiAgICog5Y2V5YWD5qC85Y+M5Ye75LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNlbGxEYmxjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Q2VsbEV2ZW50QXJnPFQ+PigpO1xyXG4gIC8qKlxyXG4gICAqIOWNleWFg+agvOWPs+mUruiPnOWNleS6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBjZWxsQ29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPENlbGxFdmVudEFyZzxUPj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog6KGo5aS05Y2V5YWD5qC85LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGhlYWRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxIZWFkZXJFdmVudEFyZz4oKTtcclxuICAvKipcclxuICAgKiDooajlpLTljZXlhYPmoLzlj4zlh7vkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgaGVhZGVyRGJsY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEhlYWRlckV2ZW50QXJnPigpO1xyXG4gIC8qKlxyXG4gICAqIOihqOWktOWNleWFg+agvOWPs+mUruiPnOWNleS6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBoZWFkZXJDb250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8SGVhZGVyRXZlbnRBcmc+KCk7XHJcbiAgLyoqXHJcbiAgICog5Yi35paw5oyJ6ZKu54K55Ye75LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlZnJlc2hDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Tnp4VGFibGVDb21wb25lbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICog5o6S5bqP5YiX6Kem5Y+RXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNvcnRlZENvbHVtbiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2RrRHJhZ0Ryb3A8Tnp4Q29sdW1uPFQ+LCBBbnk+PigpO1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKE5hbWVkVGVtcGxhdGUpIGNoaWxkcmVuITogUXVlcnlMaXN0PE5hbWVkVGVtcGxhdGU8QW55Pj47XHJcbiAgQFZpZXdDaGlsZCgnYmFzaWNUYWJsZScsIHsgc3RhdGljOiB0cnVlIH0pIG56VGFibGUhOiBOelRhYmxlQ29tcG9uZW50PFQ+O1xyXG4gIEBWaWV3Q2hpbGQoJ2Jhc2ljVGFibGUnLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4gfSlcclxuICBuelRhYmxlRWxlbWVudFJlZiE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJvdGVjdGVkIHJlbmRlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4sXHJcbiAgICBwcml2YXRlIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBtZXJnZSh0aGlzLm56UGFnZUluZGV4Q2hhbmdlLCB0aGlzLm56UGFnZVNpemVDaGFuZ2UpXHJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5mZXRjaChmYWxzZSkpO1xyXG4gICAgdGhpcy5uelBhZ2VTaXplID0gdGhpcy5uelBhZ2VTaXplIHx8IHRoaXMuYW50ZFNlcnZpY2UudGFibGU/Lm56UGFnZVNpemUgfHwgMTA7XHJcbiAgICB0aGlzLnJlc29sdmVDb2x1bW5zKCk7XHJcbiAgICB0aGlzLmZldGNoKCk7XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZSh7IHdpZHRoIH06IE56UmVzaXplRXZlbnQsIGNvbDogTnp4Q29sdW1uKSB7XHJcbiAgICBjb2wubnpXaWR0aCA9IHdpZHRoICsgJ3B4JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIh+aNouihqOagvOWkp+Wwjywg5aKe5YqgbWluaSDnsbvlnotcclxuICAgKiBAcGFyYW0gc2l6ZSDooajmoLzlpKflsI9cclxuICAgKiBAcGFyYW0gdGFibGUgbnrooajmoLznu4Tku7ZcclxuICAgKi9cclxuICB0YWJsZVNpemVDaGFuZ2Uoc2l6ZTogTnp4VGFibGVTaXplLCB0YWJsZTogTnpUYWJsZUNvbXBvbmVudDxBbnk+KSB7XHJcbiAgICB0aGlzLm56U2l6ZSA9IHNpemU7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCB0YWJsZU1haW5FbGVtZW50ID0gdGFibGUuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbnQtdGFibGUnKTtcclxuICAgIGlmICghdGFibGVNYWluRWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2l6ZSA9PT0gJ21pbmknKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLmFkZENsYXNzKHRhYmxlTWFpbkVsZW1lbnQsICdhbnQtdGFibGUtbWluaScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXIucmVtb3ZlQ2xhc3ModGFibGVNYWluRWxlbWVudCwgJ2FudC10YWJsZS1taW5pJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDngrnlh7vliLfmlrDmjInpkq5cclxuICAgKi9cclxuICBvblJlZnJlc2hDbGljaygpIHtcclxuICAgIGlmICh0aGlzLnJlZnJlc2hDbGljay5vYnNlcnZlZCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hDbGljay5lbWl0KHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mZXRjaChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliLfmlrBcclxuICAgKiBAcGFyYW0gcmVzZXRcclxuICAgKi9cclxuICByZWZyZXNoKHJlc2V0ID0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmV0Y2g8VD4ocmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Zu65a6a5YiXXHJcbiAgICogQHBhcmFtIGNvbHVtblxyXG4gICAqL1xyXG4gIGZpeGVkQ2xpY2soY29sdW1uOiBOenhDb2x1bW48VD4pIHtcclxuICAgIGNvbnN0IGhhc0ZpeGVkID0gdGhpcy5fYWxsQ29sdW1ucy5maWx0ZXIodmFsdWUgPT4gdmFsdWUuZml4ZWQpLmxlbmd0aDtcclxuICAgIHRoaXMuc2Nyb2xsWCA9IGhhc0ZpeGVkID8gJzEwMHZ3JyA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjpLluo9cclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKiBAcGFyYW0gY29sXHJcbiAgICovXHJcbiAgc29ydE9yZGVyQ2hhbmdlKHZhbHVlOiBOelRhYmxlU29ydE9yZGVyLCBjb2w6IE56eENvbHVtbikge1xyXG4gICAgaWYgKGNvbC5uelNvcnRPcmRlckNoYW5nZSkge1xyXG4gICAgICBjb2wubnpTb3J0T3JkZXJDaGFuZ2UodmFsdWUsIGNvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2V5ID0gY29sLm56Q29sdW1uS2V5ISB8fCBjb2wubmFtZSE7XHJcbiAgICB0aGlzLnNvcnRJbmZvID0ge1xyXG4gICAgICBjb2x1bW46IGNvbCxcclxuICAgICAgb3JkZXI6IHZhbHVlLFxyXG4gICAgICBmaWVsZDoga2V5XHJcbiAgICB9O1xyXG4gICAgdGhpcy5mZXRjaChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlj5Hotbfor7fmsYJcclxuICAgKiBAcGFyYW0gcmVzZXQg5piv5ZCm6YeN572uXHJcbiAgICovXHJcbiAgZmV0Y2g8VD4ocmVzZXQgPSB0cnVlKTogUHJvbWlzZTxQYWdlSW5mbzxUPj4gfCBudWxsIHtcclxuICAgIGlmICghdGhpcy5hcGkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubnp4QXV0b0xvYWRpbmcpIHtcclxuICAgICAgdGhpcy5uekxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UGFnZUluZm88VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZmV0Y2hTZXR0aW5nID0gT2JqZWN0LmFzc2lnbih7fSwgRkVUQ0hfU0VUVElORywgdGhpcy5hbnRkU2VydmljZS50YWJsZSwgdGhpcy5mZXRjaFNldHRpbmcpO1xyXG4gICAgICBjb25zdCBzZXRSZXN1bHQ6IChyZXM6IFJlY29yZDxzdHJpbmcsIEFueT4gfCBUKSA9PiB2b2lkID0gcmVzID0+IHtcclxuICAgICAgICB0aGlzLnNldEZldGNoUmVzdWx0KHJlcywgZmV0Y2hTZXR0aW5nLCByZXNldCkudGhlbih2ID0+IHJlc29sdmUodiBhcyB1bmtub3duIGFzIFBhZ2VJbmZvPFQ+KSwgcmVqZWN0KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChOenhVdGlscy5pc1N0cmluZyh0aGlzLmFwaSkpIHtcclxuICAgICAgICBGZXRjaGVyU2VydmljZS5yZXNvbHZlUGFyYW1zKHRoaXMucGFyYW1zKVxyXG4gICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgIHN3aXRjaE1hcChfcGFyYW1zID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBjb21tb25QYXJhbXMgPSB0aGlzLm1lcmdlUGFyYW1zKHJlc2V0LCBmZXRjaFNldHRpbmcpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBfcGFyYW1zLCBjb21tb25QYXJhbXMpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGJlZm9yZUZldGNoID0gdGhpcy5iZWZvcmVGZXRjaCB8fCB0aGlzLmFudGRTZXJ2aWNlLnRhYmxlPy5iZWZvcmVGZXRjaDtcclxuICAgICAgICAgICAgICBpZiAoIWJlZm9yZUZldGNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb0ZldGNoKHRoaXMuYXBpIGFzIHN0cmluZywgZmV0Y2hTZXR0aW5nLm1ldGhvZCwgY29tbW9uUGFyYW1zLCBkYXRhKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiBGZXRjaGVyU2VydmljZS5yZXNvbHZlUGFyYW1zKGJlZm9yZUZldGNoKGRhdGEpKS5waXBlKF9kYXRhID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvRmV0Y2godGhpcy5hcGkgYXMgc3RyaW5nLCBmZXRjaFNldHRpbmcubWV0aG9kLCBjb21tb25QYXJhbXMsIF9kYXRhKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgbmV4dDogcmVzID0+XHJcbiAgICAgICAgICAgICAgdGhpcy5zZXRGZXRjaFJlc3VsdChyZXMsIGZldGNoU2V0dGluZywgcmVzZXQpLnRoZW4odiA9PiByZXNvbHZlKHYgYXMgdW5rbm93biBhcyBQYWdlSW5mbzxUPiksIHJlamVjdCksXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIgPT4gcmVqZWN0KGVycilcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKE56eFV0aWxzLmlzT2JzZXJ2YWJsZSh0aGlzLmFwaSkpIHtcclxuICAgICAgICAodGhpcy5hcGkgYXMgdW5rbm93biBhcyBPYnNlcnZhYmxlPFRbXT4pLnN1YnNjcmliZSh7IG5leHQ6IHNldFJlc3VsdCwgZXJyb3I6IGVyciA9PiByZWplY3QoZXJyKSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKE56eFV0aWxzLmlzUHJvbWlzZSh0aGlzLmFwaSkpIHtcclxuICAgICAgICAodGhpcy5hcGkgYXMgdW5rbm93biBhcyBQcm9taXNlPFRbXT4pLnRoZW4oc2V0UmVzdWx0LCByZWplY3QpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0UmVzdWx0KFtdKTtcclxuICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5uenhBdXRvTG9hZGluZykge1xyXG4gICAgICAgIHRoaXMubnpMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOihjOeCueWHu+S6i+S7tlxyXG4gICAqIEBwYXJhbSBpbmZvXHJcbiAgICovXHJcbiAgb25Sb3dDbGljayhpbmZvOiBSb3dFdmVudEFyZzxUPikge1xyXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KGluZm8pO1xyXG4gICAgaWYgKHRoaXMubnp4Q2xpY2tTZWxlY3RlZFJvdyAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0Um93ID0gdGhpcy5fc2VsZWN0Um93ID09PSBpbmZvLnJvdyA/IHVuZGVmaW5lZCA6IGluZm8ucm93O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5omn6KGM6K+35rGCXHJcbiAgICogQHBhcmFtIHVybFxyXG4gICAqIEBwYXJhbSBtZXRob2RcclxuICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRvRmV0Y2godXJsOiBzdHJpbmcsIG1ldGhvZD86IHN0cmluZywgcGFyYW1zPzogQW55LCBkYXRhPzogQW55KTogT2JzZXJ2YWJsZTxQYWdlSW5mbzxUPj4ge1xyXG4gICAgY29uc3Qgb3B0aW9uOiB7IHBhcmFtcz86IEFueTsgYm9keT86IEFueSB9ID0ge307XHJcbiAgICBtZXRob2QgfHw9ICdwb3N0JztcclxuICAgIGlmICgvXnBvc3R8cHV0JC9pLnRlc3QobWV0aG9kKSkge1xyXG4gICAgICBvcHRpb24ucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICBvcHRpb24uYm9keSA9IGRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb24ucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgcGFyYW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxQYWdlSW5mbzxUPj4obWV0aG9kLCB1cmwsIG9wdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpITnkIbor7fmsYLnu5PmnpxcclxuICAgKiBAcGFyYW0gcmVzXHJcbiAgICogQHBhcmFtIGZldGNoU2V0dGluZ1xyXG4gICAqIEBwYXJhbSByZXNldFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRGZXRjaFJlc3VsdDxLPihyZXM6IEssIGZldGNoU2V0dGluZzogRmV0Y2hTZXR0aW5nLCByZXNldDogYm9vbGVhbik6IFByb21pc2U8UGFnZUluZm88VD4+IHtcclxuICAgIGxldCByZXN1bHQ6IFBhcnRpYWw8UGFnZUluZm88VD4+ID0ge307XHJcbiAgICBjb25zdCBhZnRlckZldGNoID0gdGhpcy5hZnRlckZldGNoIHx8IHRoaXMuYW50ZFNlcnZpY2UudGFibGU/LmFmdGVyRmV0Y2g7XHJcbiAgICBpZiAoYWZ0ZXJGZXRjaCAmJiBOenhVdGlscy5pc0Z1bmN0aW9uKGFmdGVyRmV0Y2gpKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhZnRlckZldGNoKHJlcywgdGhpcy5uelBhZ2VJbmRleCwgcmVzZXQpO1xyXG4gICAgICBpZiAoTnp4VXRpbHMuaXNQcm9taXNlKGRhdGEpKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEudGhlbih2ID0+IHRoaXMuc2V0UGFnZUluZm8ocmVzLCB2LCBmZXRjaFNldHRpbmcsIHJlc2V0KSk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzdWx0ID0gZGF0YSB8fCB7fTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcclxuICAgICAgICByZXN1bHQubGlzdCA9IHJlcztcclxuICAgICAgICByZXN1bHQudG90YWwgPSByZXMubGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnNldFBhZ2VJbmZvKHJlcywgcmVzdWx0LCBmZXRjaFNldHRpbmcsIHJlc2V0KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7liIbpobXkv6Hmga9cclxuICAgKiBAcGFyYW0gcmVzIOWTjeW6lOWvueixoVxyXG4gICAqIEBwYXJhbSBwYWdlSW5mbyDljp9wYWdlSW5mb1xyXG4gICAqIEBwYXJhbSBmZXRjaFNldHRpbmcg6YWN572uXHJcbiAgICogQHBhcmFtIHJlc2V0IOaYr+WQpumHjee9rlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRQYWdlSW5mbzxLPihcclxuICAgIHJlczogSyxcclxuICAgIHBhZ2VJbmZvOiBQYXJ0aWFsPFBhZ2VJbmZvPFQ+PixcclxuICAgIGZldGNoU2V0dGluZzogRmV0Y2hTZXR0aW5nLFxyXG4gICAgcmVzZXQ6IGJvb2xlYW5cclxuICApOiBQYWdlSW5mbzxUPiB7XHJcbiAgICBjb25zdCB0b3RhbCA9IHBhZ2VJbmZvLnRvdGFsICE9IG51bGwgPyBwYWdlSW5mby50b3RhbCA6IE56eFV0aWxzLmdldChyZXMsIGZldGNoU2V0dGluZy50b3RhbEZpZWxkISk7XHJcbiAgICBjb25zdCBwYWdlSW5kZXggPSByZXNldFxyXG4gICAgICA/IDFcclxuICAgICAgOiBwYWdlSW5mby5wYWdlSW5kZXggIT0gbnVsbFxyXG4gICAgICA/IHBhZ2VJbmZvLnBhZ2VJbmRleFxyXG4gICAgICA6IE56eFV0aWxzLmdldChyZXMsIGZldGNoU2V0dGluZy5wYWdlSW5kZXhGaWVsZCEpO1xyXG5cclxuICAgIHRoaXMubnpEYXRhID0gcGFnZUluZm8ubGlzdCB8fCBOenhVdGlscy5nZXQocmVzLCBmZXRjaFNldHRpbmcubGlzdEZpZWxkISk7XHJcbiAgICB0aGlzLm56VG90YWwgPSB0b3RhbCB8fCAwO1xyXG5cclxuICAgIGlmIChwYWdlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm56UGFnZUluZGV4ID0gcGFnZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgcmV0dXJuIHBhZ2VJbmZvIGFzIFBhZ2VJbmZvPFQ+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCI5bm26K+35rGC5Y+C5pWwXHJcbiAgICogQHBhcmFtIHJlc2V0XHJcbiAgICogQHBhcmFtIGZldGNoU2V0dGluZ1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtZXJnZVBhcmFtcyhyZXNldCA9IHRydWUsIGZldGNoU2V0dGluZzogRmV0Y2hTZXR0aW5nKSB7XHJcbiAgICBjb25zdCBuelBhZ2VJbmRleCA9IHJlc2V0ID8gMSA6IHRoaXMubnpQYWdlSW5kZXg7XHJcbiAgICBjb25zdCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIEFueT4gPSB7fTtcclxuICAgIE56eFV0aWxzLnNldChwYXJhbXMsIGZldGNoU2V0dGluZy5wYWdlSW5kZXhGaWVsZCEsIG56UGFnZUluZGV4KTtcclxuICAgIE56eFV0aWxzLnNldChwYXJhbXMsIGZldGNoU2V0dGluZy5wYWdlU2l6ZUZpZWxkISwgdGhpcy5uelBhZ2VTaXplKTtcclxuXHJcbiAgICBpZiAodGhpcy5zb3J0SW5mbykge1xyXG4gICAgICBjb25zdCBzb3J0SW5mbyA9IE56eFV0aWxzLmlzRnVuY3Rpb24odGhpcy5zb3J0Rm4pID8gdGhpcy5zb3J0Rm4odGhpcy5zb3J0SW5mbykgOiB0aGlzLnNvcnRJbmZvO1xyXG4gICAgICBkZWxldGUgc29ydEluZm8uY29sdW1uO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHBhcmFtcywgc29ydEluZm8pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcmFtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYr+W8guatpeaVsOaNrlxyXG4gICAqIEBwYXJhbSBvYmpcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGlzQXN5bmMob2JqOiBBbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBOenhVdGlscy5pc09ic2VydmFibGUob2JqKSB8fCBOenhVdGlscy5pc1Byb21pc2Uob2JqKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWkhOeQhuihqOWktOWQiOW5tuWNleWFg+agvOWSjCBib2R555qE5YiXXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCByZXNvbHZlQ29sdW1ucygpIHtcclxuICAgIGNvbnN0IHsgaGVhZGVyUm93cywgYm9keVJvd3MsIGFsbENvbHVtbnMgfSA9IHRoaXMuZ2V0Um93Q29sdW1ucyh0aGlzLm56eENvbHVtbnMpO1xyXG4gICAgdGhpcy5faGVhZGVyQ29sdW1ucyA9IGhlYWRlclJvd3M7XHJcbiAgICB0aGlzLl9hbGxDb2x1bW5zID0gYWxsQ29sdW1ucztcclxuICAgIC8vIOayoeacieWQiOW5tuihqOWktCwg5L2/55So5ZCM5LiA5a+56LGhXHJcbiAgICB0aGlzLl9ib2R5Q29sdW1ucyA9IGhlYWRlclJvd3MubGVuZ3RoID8gYm9keVJvd3MgOiBoZWFkZXJSb3dzWzBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aSE55CG5Y+C5pWw5Li65qih5p2/55qE5Y+C5pWwLCDku47lrZfnrKbkuLLkuK3mib7liLDnnJ/mraPnmoTmqKHmnb/lr7nosaFcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHJlc29sdmVUZW1wbGF0ZUNvbHVtbigpIHtcclxuICAgIGNvbnN0IG5hbWVUZW1wbGF0ZU1hcDogUmVjb3JkPHN0cmluZywgVGVtcGxhdGVSZWY8QW55Pj4gPSB7fTtcclxuICAgIGZvciAoY29uc3QgdHBsIG9mIHRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgbmFtZVRlbXBsYXRlTWFwW3RwbC5uYW1lZF0gPSB0cGwudGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHBsTWFwKSB7XHJcbiAgICAgIHRoaXMudHBsTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IChuYW1lVGVtcGxhdGVNYXBba2V5XSA9IHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fYWxsQ29sdW1ucy5mb3JFYWNoKGNvbCA9PlxyXG4gICAgICBPYmplY3Qua2V5cyhjb2wpXHJcbiAgICAgICAgLmZpbHRlcih2ID0+IC9UZW1wbGF0ZSQvLnRlc3QodikpXHJcbiAgICAgICAgLmZvckVhY2godHBsTmFtZSA9PiB0aGlzLnN0cmluZ1RvVGVtcGxhdGUoY29sLCB0cGxOYW1lLCBuYW1lVGVtcGxhdGVNYXApKVxyXG4gICAgKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jZHIubWFya0ZvckNoZWNrKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5a2X56ym5Liy5p+l5om+5a+55bqU55qE5qih54mIXHJcbiAgICogQHBhcmFtIGNvbFxyXG4gICAqIEBwYXJhbSBrZXlcclxuICAgKiBAcGFyYW0gbmFtZVRlbXBsYXRlTWFwXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzdHJpbmdUb1RlbXBsYXRlKFxyXG4gICAgY29sOiBOenhDb2x1bW48VD4sXHJcbiAgICBrZXk6IGtleW9mIE56eENvbHVtbixcclxuICAgIG5hbWVUZW1wbGF0ZU1hcDogUmVjb3JkPHN0cmluZywgVGVtcGxhdGVSZWY8QW55Pj5cclxuICApIHtcclxuICAgIGNvbnN0IG5ld0tleSA9ICdfJyArIGtleTtcclxuICAgIGlmICh0eXBlb2YgY29sW2tleV0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnN0IHRwbCA9IG5hbWVUZW1wbGF0ZU1hcFtjb2xba2V5XV07XHJcbiAgICAgIGlmICh0cGwpIHtcclxuICAgICAgICBjb2xbbmV3S2V5XSA9IHRwbDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjb2xba2V5XSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcbiAgICAgIGNvbFtuZXdLZXldID0gY29sW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDooajlpLTop6blj5FDaGVja0JveCBjaGFuZ2VcclxuICAgKiBAcGFyYW0gZXZ0XHJcbiAgICogQHBhcmFtIGNvbFxyXG4gICAqL1xyXG4gIHRoQ2hlY2tlZENoYW5nZShldnQ6IGJvb2xlYW4sIGNvbDogTnp4Q29sdW1uPFQ+KTogdm9pZCB7XHJcbiAgICBpZiAoY29sLmVuYWJsZUNoZWNrQWxsICE9PSBmYWxzZSkge1xyXG4gICAgICBjb2wuY2hlY2tlZCA9IGV2dDtcclxuICAgICAgY29sLm56SW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgICBOenhVdGlscy5mb3JFYWNoVHJlZSh0aGlzLl9jdXJyZW50UGFnZURhdGEsIHYgPT4ge1xyXG4gICAgICAgIGlmICghdi5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgdi5jaGVja2VkID0gZXZ0O1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgdi5uekluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbC50aENoZWNrZWRDaGFuZ2UpIHtcclxuICAgICAgY29sLnRoQ2hlY2tlZENoYW5nZShldnQsIGNvbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRk6Kem5Y+RQ2hlY2tCb3ggY2hhbmdlXHJcbiAgICogQHBhcmFtIGV2dFxyXG4gICAqIEBwYXJhbSBjb2xcclxuICAgKiBAcGFyYW0gcm93XHJcbiAgICogQHBhcmFtIHBhdGhUcmFjZSDniLboioLngrnot6/lvoRcclxuICAgKiBAcGFyYW0gaW5kZXhBdHRyXHJcbiAgICovXHJcbiAgdGRDaGVja2VkQ2hhbmdlKGV2dDogYm9vbGVhbiwgY29sOiBOenhDb2x1bW48VD4sIHJvdzogVCwgcGF0aFRyYWNlOiBbVCwgVF0sIGluZGV4QXR0cjogSW5kZXhBdHRyKSB7XHJcbiAgICBpZiAoY29sLmVuYWJsZUNoZWNrQWxsICE9PSBmYWxzZSkge1xyXG4gICAgICAvLyDpnZ7lj5fmjqfnmoRjaGVja2JveFxyXG4gICAgICBpZiAodGhpcy5uekNoZWNrU3RyaWN0bHkgIT09IHRydWUpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcm93Lm56SW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIE56eFV0aWxzLmZvckVhY2hUcmVlKHJvdy5jaGlsZHJlbiwgbm9kZSA9PiB7XHJcbiAgICAgICAgICBpZiAoIW5vZGUuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgbm9kZS5jaGVja2VkID0gZXZ0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgW3BhcmVudHMsIHBhcmVudF0gPSBwYXRoVHJhY2U7XHJcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xyXG4gICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoQ2hlY2tlZFN0YXR1cyhwYXJlbnQsIHBhcmVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXBhcmVudHMpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnRzWzFdO1xyXG4gICAgICAgICAgcGFyZW50cyA9IHBhcmVudHNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVmcmVzaENoZWNrZWRTdGF0dXMoY29sKTtcclxuICAgIH1cclxuICAgIGlmIChjb2wudGRDaGVja2VkQ2hhbmdlKSB7XHJcbiAgICAgIGNvbC50ZENoZWNrZWRDaGFuZ2UoZXZ0LCBjb2wsIHJvdywgaW5kZXhBdHRyKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgb25DdXJyZW50UGFnZURhdGFDaGFuZ2UobGlzdDogVFtdKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jdXJyZW50UGFnZURhdGEgPSBsaXN0O1xyXG4gICAgY29uc3QgY29sID0gdGhpcy5fYm9keUNvbHVtbnMuZmlsdGVyKHYgPT4gdi5uelNob3dDaGVja2JveClbMF07XHJcbiAgICBpZiAoY29sKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaENoZWNrZWRTdGF0dXMoY29sKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm56Q3VycmVudFBhZ2VEYXRhQ2hhbmdlLmVtaXQobGlzdCk7XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hDaGVja2VkU3RhdHVzKGNvbDogTnp4Q29sdW1uPFQ+KTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZWZyZXNoQ2hlY2tlZFN0YXR1cyhjb2wsIHRoaXMuX2N1cnJlbnRQYWdlRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWZyZXNoQ2hlY2tlZFN0YXR1cyhwYXJlbnQ6IFJlY29yZDxzdHJpbmcsIE56U2FmZUFueT4sIGxpc3REYXRhOiBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+W10pOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3QgPSBsaXN0RGF0YS5maWx0ZXIodiA9PiAhdi5kaXNhYmxlZCk7XHJcbiAgICBpZiAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgcGFyZW50LmNoZWNrZWQgPSBsaXN0LmV2ZXJ5KHYgPT4gdi5jaGVja2VkKTtcclxuICAgICAgcGFyZW50Lm56SW5kZXRlcm1pbmF0ZSA9ICFwYXJlbnQuY2hlY2tlZCAmJiBsaXN0LnNvbWUodiA9PiB2LmNoZWNrZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFyZW50LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgcGFyZW50Lm56SW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlc29sdmVUZW1wbGF0ZUNvbHVtbigpKTtcclxuICAgIHRoaXMucmVzb2x2ZVRlbXBsYXRlQ29sdW1uKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5uelNpemUgPT09ICdtaW5pJykge1xyXG4gICAgICB0aGlzLnRhYmxlU2l6ZUNoYW5nZSh0aGlzLm56U2l6ZSwgdGhpcy5uelRhYmxlKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5maXhlZEZpdCgpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgdGhpcy5maXhlZEZpdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbUCBpbiBrZXlvZiB0aGlzXT86IFNpbXBsZUNoYW5nZSB9ICYgU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKFxyXG4gICAgICAoY2hhbmdlcy5uenhDb2x1bW5zICYmICFjaGFuZ2VzLm56eENvbHVtbnMuaXNGaXJzdENoYW5nZSgpKSB8fFxyXG4gICAgICAoY2hhbmdlcy50cGxNYXAgJiYgIWNoYW5nZXMudHBsTWFwLmlzRmlyc3RDaGFuZ2UoKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnJlc29sdmVDb2x1bW5zKCk7XHJcbiAgICAgIHRoaXMucmVzb2x2ZVRlbXBsYXRlQ29sdW1uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuYXBpICYmICFjaGFuZ2VzLmFwaS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5mZXRjaCh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaLluaLveaOkuW6j1xyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uU29ydGVkQ29sdW1uKGV2ZW50OiBDZGtEcmFnRHJvcDxOenhDb2x1bW48VD4sIEFueT4pIHtcclxuICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLl9oZWFkZXJDb2x1bW5zWzBdLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xyXG4gICAgdGhpcy5zb3J0ZWRDb2x1bW4uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmipjlj6DlrZDoioLngrlcclxuICAgKiBAcGFyYW0gcm93XHJcbiAgICogQHBhcmFtICRldmVudFxyXG4gICAqL1xyXG4gIGRlZmF1bHRDb2xsYXBzZShyb3c6IFQsICRldmVudDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gcm93IHx8IHt9O1xyXG4gICAgaWYgKCEkZXZlbnQgJiYgY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goKGM6IFQpID0+IHtcclxuICAgICAgICBpZiAoYyAmJiBjLmNoaWxkcmVuICYmIGMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICBjLmV4cGFuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5kZWZhdWx0Q29sbGFwc2UoYywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blkIjlubbooajlpLRcclxuICAgKiBAcGFyYW0gb3JpZ2luQ29sdW1ucyDljp/lp4vliJfphY3nva5cclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldFJvd0NvbHVtbnMob3JpZ2luQ29sdW1uczogTnp4Q29sdW1uPFQ+W10pOiB7XHJcbiAgICBoZWFkZXJSb3dzOiBOenhDb2x1bW48VD5bXVtdO1xyXG4gICAgYm9keVJvd3M6IE56eENvbHVtbjxUPltdO1xyXG4gICAgYWxsQ29sdW1uczogTnp4Q29sdW1uPFQ+W107XHJcbiAgfSB7XHJcbiAgICBsZXQgbWF4TGV2ZWwgPSAwO1xyXG4gICAgY29uc3QgYWxsQ29sdW1uczogTnp4Q29sdW1uPFQ+W10gPSBbXTtcclxuICAgIE56eFV0aWxzLmZvckVhY2hUcmVlKG9yaWdpbkNvbHVtbnMsIChub2RlLCBwYXJlbnQsIGxldmVsKSA9PiB7XHJcbiAgICAgIHRoaXMubm9ybWFsUHJvcHMobm9kZSk7XHJcblxyXG4gICAgICBhbGxDb2x1bW5zLnB1c2gobm9kZSk7XHJcbiAgICAgIG5vZGUuY29sc3BhbiA9IG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPyAwIDogMTtcclxuICAgICAgbm9kZS5sZXZlbCA9IGxldmVsO1xyXG5cclxuICAgICAgaWYgKGxldmVsID4gbWF4TGV2ZWwpIHtcclxuICAgICAgICBtYXhMZXZlbCA9IGxldmVsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgaWYgKHBhcmVudCAmJiAhbm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgIGxldCBwID0gcGFyZW50O1xyXG4gICAgICAgIHdoaWxlIChwKSB7XHJcbiAgICAgICAgICBwLmNvbHNwYW4rKztcclxuICAgICAgICAgIHAgPSBwLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGhlYWRlclJvd3M6IE56eENvbHVtbjxUPltdW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZXZlbCArIDEgfSlcclxuICAgICAgLmZpbGwoMClcclxuICAgICAgLm1hcCgoKSA9PiBbXSkgYXMgQW55O1xyXG5cclxuICAgIGNvbnN0IGJvZHlSb3dzOiBOenhDb2x1bW48VD5bXSA9IFtdO1xyXG4gICAgYWxsQ29sdW1ucy5mb3JFYWNoKGNvbCA9PiB7XHJcbiAgICAgIGlmICghY29sLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgY29sLnJvd3NwYW4gPSBtYXhMZXZlbCAtIGNvbC5sZXZlbCArIDE7XHJcbiAgICAgICAgYm9keVJvd3MucHVzaChjb2wpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbC5yb3dzcGFuID0gMTtcclxuICAgICAgfVxyXG4gICAgICBoZWFkZXJSb3dzW2NvbC5sZXZlbF0ucHVzaChjb2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHsgaGVhZGVyUm93cywgYm9keVJvd3MsIGFsbENvbHVtbnMgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOinhOiMg+WMluWxnuaAp1xyXG4gICAqIEBwYXJhbSBjb2wg5YiXXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBub3JtYWxQcm9wcyhjb2w6IE56eENvbHVtbjxUPikge1xyXG4gICAgaWYgKGNvbC52aXNpYmxlID09IG51bGwpIHtcclxuICAgICAgY29sLnZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbC50aFRleHQgPT0gbnVsbCAmJiBjb2wuaXNJbmRleCkge1xyXG4gICAgICBjb2wudGhUZXh0ID0gJ+W6j+WPtyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorqHnrpfmkpHmu6HniLblrrnlmahcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBmaXhlZEZpdCgpIHtcclxuICAgIGlmICghdGhpcy5uenhGaXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMubnpUYWJsZUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHRhYmxlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignLmFudC10YWJsZScpITtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5hbnQtdGFibGUtY29udGFpbmVyJykhO1xyXG4gICAgaWYgKCF0YWJsZSB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgnLmFudC10YWJsZS10aGVhZCcpO1xyXG4gICAgbGV0IGhlaWdodCA9IDA7XHJcbiAgICBoZWFkZXJzLmZvckVhY2godiA9PiAoaGVpZ2h0ICs9IHYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KSk7XHJcbiAgICBjb25zdCBzY3JvbGxZID0gdGFibGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC0gaGVpZ2h0O1xyXG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJyc7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSBgJHtzY3JvbGxZfXB4YDtcclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxufVxyXG4iLCI8bnp4LXRhYmxlLWhlYWRlclxyXG4gICpuZ0lmPVwidG9vbGJhclZpc2libGUgIT09IGZhbHNlXCJcclxuICBbYWN0aW9uVmlzaWJsZV09XCJhY3Rpb25WaXNpYmxlXCJcclxuICBbdGFibGVTaXplXT1cIm56U2l6ZVwiXHJcbiAgW3JlZnJlc2hWaXNpYmxlXT1cIm56eFJlZnJlc2hWaXNpYmxlXCJcclxuICBbcmVzaXplVmlzaWJsZV09XCJuenhSZXNpemVWaXNpYmxlXCJcclxuICAodGFibGVTaXplQ2hhbmdlKT1cInRhYmxlU2l6ZUNoYW5nZSgkZXZlbnQsIGJhc2ljVGFibGUpXCJcclxuICAocmVmcmVzaENsaWNrKT1cIm9uUmVmcmVzaENsaWNrKClcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cInRpdGxlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogeyBjb250ZXh0OiB0aGlzIH0gfVwiPlxyXG4gICAge3sgdGl0bGUgfX1cclxuICA8L25nLWNvbnRhaW5lcj5cclxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbdGl0bGVdXCI+PC9uZy1jb250ZW50PlxyXG5cclxuICA8bmctY29udGFpbmVyIHNldHRpbmctYmVmb3JlPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cInRvb2xiYXJCZWZvcmU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IGNvbnRleHQ6IHRoaXMgfSB9XCI+XHJcbiAgICAgIHt7IHRvb2xiYXJCZWZvcmUgfX1cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Rvb2xiYXJCZWZvcmVdXCI+PC9uZy1jb250ZW50PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8bnp4LWNvbHVtbi1zZXR0aW5nXHJcbiAgICBzZXR0aW5nXHJcbiAgICAqbmdJZj1cIm56eFNldHRpbmdWaXNpYmxlXCJcclxuICAgIFtuenhDb2x1bW5zXT1cIl9ib2R5Q29sdW1uc1wiXHJcbiAgICAoc29ydGVkQ29sdW1uKT1cIm9uU29ydGVkQ29sdW1uKCRldmVudClcIlxyXG4gICAgKGZpeGVkQ2xpY2spPVwiZml4ZWRDbGljaygkZXZlbnQpXCJcclxuICA+PC9uengtY29sdW1uLXNldHRpbmc+XHJcblxyXG4gIDxuZy1jb250YWluZXIgdG9vbGJhcj5cclxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0b29sYmFyOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogeyBjb250ZXh0OiB0aGlzIH0gfVwiPlxyXG4gICAgICB7eyB0b29sYmFyIH19XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlt0b29sYmFyXVwiPjwvbmctY29udGVudD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uengtdGFibGUtaGVhZGVyPlxyXG5cclxuPG56LXRhYmxlXHJcbiAgI2Jhc2ljVGFibGVcclxuICBjbGFzcz1cIm56eC1pbm5lci10YWJsZVwiXHJcbiAgW256RGF0YV09XCJuekRhdGFcIlxyXG4gIFtuelRhYmxlTGF5b3V0XT1cIm56VGFibGVMYXlvdXRcIlxyXG4gIFtuekZyb250UGFnaW5hdGlvbl09XCJuekZyb250UGFnaW5hdGlvblwiXHJcbiAgW256VG90YWxdPVwibnpUb3RhbFwiXHJcbiAgWyhuelBhZ2VJbmRleCldPVwibnpQYWdlSW5kZXhcIlxyXG4gIFsobnpQYWdlU2l6ZSldPVwibnpQYWdlU2l6ZVwiXHJcbiAgW256U2hvd1BhZ2luYXRpb25dPVwibnpTaG93UGFnaW5hdGlvblwiXHJcbiAgW256UGFnaW5hdGlvblBvc2l0aW9uXT1cIm56UGFnaW5hdGlvblBvc2l0aW9uXCJcclxuICBbbnpQYWdpbmF0aW9uVHlwZV09XCJuelBhZ2luYXRpb25UeXBlXCJcclxuICBbbnpCb3JkZXJlZF09XCJuekJvcmRlcmVkXCJcclxuICBbbnpPdXRlckJvcmRlcmVkXT1cIm56T3V0ZXJCb3JkZXJlZFwiXHJcbiAgW256V2lkdGhDb25maWddPVwibnpXaWR0aENvbmZpZ1wiXHJcbiAgW256U2l6ZV09XCIkYW55KG56U2l6ZSlcIlxyXG4gIFtuekxvYWRpbmddPVwibnpMb2FkaW5nXCJcclxuICBbbnpMb2FkaW5nSW5kaWNhdG9yXT1cIm56TG9hZGluZ0luZGljYXRvclwiXHJcbiAgW256TG9hZGluZ0RlbGF5XT1cIm56TG9hZGluZ0RlbGF5XCJcclxuICBbbnpTY3JvbGxdPVwibnpTY3JvbGxcIlxyXG4gIFtuelRpdGxlXT1cIm56VGl0bGVcIlxyXG4gIFtuekZvb3Rlcl09XCJuekZvb3RlclwiXHJcbiAgW256Tm9SZXN1bHRdPVwibnpOb1Jlc3VsdFwiXHJcbiAgW256UGFnZVNpemVPcHRpb25zXT1cIm56UGFnZVNpemVPcHRpb25zIHx8IGRlZmF1bHRQYWdlU2l6ZU9wdGlvbnNcIlxyXG4gIFtuelNob3dRdWlja0p1bXBlcl09XCJuelNob3dRdWlja0p1bXBlclwiXHJcbiAgW256U2hvd1NpemVDaGFuZ2VyXT1cIm56U2hvd1NpemVDaGFuZ2VyXCJcclxuICBbbnpTaG93VG90YWxdPVwibnpTaG93VG90YWwgPT0gbnVsbCA/IHRvdGFsVGVtcGxhdGUgOiBuelNob3dUb3RhbFwiXHJcbiAgW256SXRlbVJlbmRlcl09XCJuekl0ZW1SZW5kZXJcIlxyXG4gIFtuekhpZGVPblNpbmdsZVBhZ2VdPVwibnpIaWRlT25TaW5nbGVQYWdlXCJcclxuICBbbnpTaW1wbGVdPVwibnpTaW1wbGVcIlxyXG4gIFtuelRlbXBsYXRlTW9kZV09XCJuelRlbXBsYXRlTW9kZVwiXHJcbiAgW256VmlydHVhbEl0ZW1TaXplXT1cIm56VmlydHVhbEl0ZW1TaXplXCJcclxuICBbbnpWaXJ0dWFsTWF4QnVmZmVyUHhdPVwibnpWaXJ0dWFsTWF4QnVmZmVyUHhcIlxyXG4gIFtuelZpcnR1YWxNaW5CdWZmZXJQeF09XCJuelZpcnR1YWxNaW5CdWZmZXJQeFwiXHJcbiAgW256VmlydHVhbEZvclRyYWNrQnldPVwibnpWaXJ0dWFsRm9yVHJhY2tCeVwiXHJcbiAgKG56UGFnZUluZGV4Q2hhbmdlKT1cIm56UGFnZUluZGV4Q2hhbmdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgKG56UGFnZVNpemVDaGFuZ2UpPVwibnpQYWdlU2l6ZUNoYW5nZS5lbWl0KCRldmVudClcIlxyXG4gIChuekN1cnJlbnRQYWdlRGF0YUNoYW5nZSk9XCJvbkN1cnJlbnRQYWdlRGF0YUNoYW5nZSgkZXZlbnQpXCJcclxuICAobnpRdWVyeVBhcmFtcyk9XCJuelF1ZXJ5UGFyYW1zLmVtaXQoJGV2ZW50KVwiXHJcbj5cclxuICA8dGhlYWQgKm5nSWY9XCJuenhTaG93SGVhZGVyICE9PSBmYWxzZVwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56eERlZmF1bHRSZW5kZXJIZWFkZXIgIT09IGZhbHNlXCI+XHJcbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIF9oZWFkZXJDb2x1bW5zXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sIG9mIHJvd1wiPlxyXG4gICAgICAgICAgPHRoXHJcbiAgICAgICAgICAgICpuZ0lmPVwiKCFjb2wubnpTaG93Q2hlY2tib3ggfHwgY29sLm56U2hvd0NoZWNrQWxsID09PSBmYWxzZSkgJiYgY29sLnZpc2libGUgIT09IGZhbHNlXCJcclxuICAgICAgICAgICAgbnotcmVzaXphYmxlXHJcbiAgICAgICAgICAgIFtuekRpc2FibGVkXT1cIm56eFJlc2l6YWJsZSA9PT0gZmFsc2VcIlxyXG4gICAgICAgICAgICBuekJvdW5kcz1cIndpbmRvd1wiXHJcbiAgICAgICAgICAgIChuelJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQsIGNvbClcIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwiaGVhZGVyQ2xpY2suZW1pdCh7IGNvbHVtbjogY29sLCBldmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgICAgKGRibGNsaWNrKT1cImhlYWRlckRibGNsaWNrLmVtaXQoeyBjb2x1bW46IGNvbCwgZXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgICAgIChjb250ZXh0bWVudSk9XCJoZWFkZXJDb250ZXh0bWVudS5lbWl0KHsgY29sdW1uOiBjb2wsIGV2ZW50OiAkZXZlbnQgfSlcIlxyXG4gICAgICAgICAgICBbbnpTaG93U29ydF09XCJjb2wubnpTaG93U29ydFwiXHJcbiAgICAgICAgICAgIFtuekN1c3RvbUZpbHRlcl09XCJjb2wubnpDdXN0b21GaWx0ZXJcIlxyXG4gICAgICAgICAgICBbbnpTb3J0Rm5dPVwiY29sLm56U29ydEZuID09IG51bGwgPyB0cnVlIDogY29sLm56U29ydEZuXCJcclxuICAgICAgICAgICAgW256U29ydERpcmVjdGlvbnNdPVwiY29sLm56U29ydERpcmVjdGlvbnNcIlxyXG4gICAgICAgICAgICBbKG56U29ydE9yZGVyKV09XCJjb2wubnpTb3J0T3JkZXJcIlxyXG4gICAgICAgICAgICAobnpTb3J0T3JkZXJDaGFuZ2UpPVwic29ydE9yZGVyQ2hhbmdlKCRldmVudCwgY29sKVwiXHJcbiAgICAgICAgICAgIFtuekNvbHVtbktleV09XCJjb2wubnpDb2x1bW5LZXkgfHwgY29sLm5hbWVcIlxyXG4gICAgICAgICAgICBbbnpTaG93RmlsdGVyXT1cImNvbC5uelNob3dGaWx0ZXJcIlxyXG4gICAgICAgICAgICBbbnpTb3J0UHJpb3JpdHldPVwiY29sLm56U29ydFByaW9yaXR5ID09PSB0cnVlXCJcclxuICAgICAgICAgICAgW256RmlsdGVyRm5dPVwiY29sLm56U2hvd0ZpbHRlciAmJiBjb2wubnpGaWx0ZXJGbiA9PSBudWxsID8gdHJ1ZSA6IGNvbC5uekZpbHRlckZuXCJcclxuICAgICAgICAgICAgKG56RmlsdGVyQ2hhbmdlKT1cImNvbC5uekZpbHRlckNoYW5nZT8uKCRldmVudCwgbnpEYXRhKVwiXHJcbiAgICAgICAgICAgIFtuekZpbHRlcnNdPVwiY29sLm56RmlsdGVyc1wiXHJcbiAgICAgICAgICAgIFtuekZpbHRlck11bHRpcGxlXT1cImNvbC5uekZpbHRlck11bHRpcGxlICE9PSBmYWxzZVwiXHJcbiAgICAgICAgICAgIFtueldpZHRoXT1cImNvbC5ueldpZHRoID09IG51bGwgJiYgY29sLmlzSW5kZXggPyAnNjBweCcgOiBjb2wubnpXaWR0aFwiXHJcbiAgICAgICAgICAgIFtuekxlZnRdPVwiY29sLmZpeGVkID09PSAnbGVmdCdcIlxyXG4gICAgICAgICAgICBbbnpSaWdodF09XCJjb2wuZml4ZWQgPT09ICdyaWdodCdcIlxyXG4gICAgICAgICAgICBbbnpBbGlnbl09XCJjb2wudGhBbGlnblwiXHJcbiAgICAgICAgICAgIFtuekJyZWFrV29yZF09XCJjb2wubnpCcmVha1dvcmRcIlxyXG4gICAgICAgICAgICBbbnpFbGxpcHNpc109XCJjb2wubnpFbGxpcHNpc1wiXHJcbiAgICAgICAgICAgIFtjb2xzcGFuXT1cImNvbC5jb2xzcGFuXCJcclxuICAgICAgICAgICAgW3Jvd3NwYW5dPVwiY29sLnJvd3NwYW5cIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjb2wudGhOZ0NsYXNzXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiY29sLnRoTmdTdHlsZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxuei1yZXNpemUtaGFuZGxlcyBbbnpEaXJlY3Rpb25zXT1cIlsncmlnaHQnXVwiPjwvbnotcmVzaXplLWhhbmRsZXM+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgICAgICAgdGhSZW5kZXJUZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHsgJGltcGxpY2l0OiB7IGNvbDogY29sLCByb3c6IHJvdywgY29udGV4dDogdGhpcyB9LCByb3c6IHJvdyB9XHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC90aD5cclxuXHJcbiAgICAgICAgICA8dGhcclxuICAgICAgICAgICAgKm5nSWY9XCJjb2wubnpTaG93Q2hlY2tib3ggJiYgY29sLm56U2hvd0NoZWNrQWxsICE9PSBmYWxzZSAmJiBjb2wudmlzaWJsZSAhPT0gZmFsc2VcIlxyXG4gICAgICAgICAgICBuei1yZXNpemFibGVcclxuICAgICAgICAgICAgW256RGlzYWJsZWRdPVwibnp4UmVzaXphYmxlID09PSBmYWxzZVwiXHJcbiAgICAgICAgICAgIG56Qm91bmRzPVwid2luZG93XCJcclxuICAgICAgICAgICAgKG56UmVzaXplKT1cIm9uUmVzaXplKCRldmVudCwgY29sKVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJoZWFkZXJDbGljay5lbWl0KHsgY29sdW1uOiBjb2wsIGV2ZW50OiAkZXZlbnQgfSlcIlxyXG4gICAgICAgICAgICAoZGJsY2xpY2spPVwiaGVhZGVyRGJsY2xpY2suZW1pdCh7IGNvbHVtbjogY29sLCBldmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cImhlYWRlckNvbnRleHRtZW51LmVtaXQoeyBjb2x1bW46IGNvbCwgZXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgICAgIFtuelNob3dDaGVja2JveF09XCJjb2wubnpTaG93Q2hlY2tib3hcIlxyXG4gICAgICAgICAgICBbbnpJbmRldGVybWluYXRlXT1cImNvbC5uekluZGV0ZXJtaW5hdGVcIlxyXG4gICAgICAgICAgICBbKG56Q2hlY2tlZCldPVwiY29sLmNoZWNrZWRcIlxyXG4gICAgICAgICAgICAobnpDaGVja2VkQ2hhbmdlKT1cInRoQ2hlY2tlZENoYW5nZSgkZXZlbnQsIGNvbClcIlxyXG4gICAgICAgICAgICBbbnpTaG93Um93U2VsZWN0aW9uXT1cImNvbC5uelNob3dSb3dTZWxlY3Rpb25cIlxyXG4gICAgICAgICAgICBbbnpTZWxlY3Rpb25zXT1cImNvbC5uelNlbGVjdGlvbnNcIlxyXG4gICAgICAgICAgICBbbnpXaWR0aF09XCJjb2wubnpXaWR0aCA9PSBudWxsICYmIGNvbC5uelNob3dDaGVja2JveCA/ICc2MHB4JyA6IGNvbC5ueldpZHRoXCJcclxuICAgICAgICAgICAgW256TGVmdF09XCJjb2wuZml4ZWQgPT09ICdsZWZ0J1wiXHJcbiAgICAgICAgICAgIFtuelJpZ2h0XT1cImNvbC5maXhlZCA9PT0gJ3JpZ2h0J1wiXHJcbiAgICAgICAgICAgIFtuekFsaWduXT1cImNvbC50aEFsaWduXCJcclxuICAgICAgICAgICAgW256QnJlYWtXb3JkXT1cImNvbC5uekJyZWFrV29yZFwiXHJcbiAgICAgICAgICAgIFtuekVsbGlwc2lzXT1cImNvbC5uekVsbGlwc2lzXCJcclxuICAgICAgICAgICAgW2NvbHNwYW5dPVwiY29sLmNvbHNwYW5cIlxyXG4gICAgICAgICAgICBbcm93c3Bhbl09XCJjb2wucm93c3BhblwiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbC50aE5nQ2xhc3NcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJjb2wudGhOZ1N0eWxlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG56LXJlc2l6ZS1oYW5kbGVzIFtuekRpcmVjdGlvbnNdPVwiWydyaWdodCddXCI+PC9uei1yZXNpemUtaGFuZGxlcz5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgICAgICAgICAgICB0aFJlbmRlclRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDogeyAkaW1wbGljaXQ6IHsgY29sOiBjb2wsIHJvdzogcm93LCBjb250ZXh0OiB0aGlzIH0sIHJvdzogcm93IH1cclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICA8L3RoPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L3RyPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC90aGVhZD5cclxuXHJcbiAgPHRib2R5ICpuZ0lmPVwibnpWaXJ0dWFsRm9yVHJhY2tCeSB8fCBuelZpcnR1YWxJdGVtU2l6ZVwiIFtjbGFzcy5uengtdGFibGUtc3RyaXBlZC10Ym9keV09XCJuenhTdHJpcGVcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuei12aXJ0dWFsLXNjcm9sbCBsZXQtcm93IGxldC1pbmRleD1cImluZGV4XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgbnp4VHIgfHwgdHJUZW1wbGF0ZTtcclxuICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgJGltcGxpY2l0OiByb3csXHJcbiAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICBuekRhdGE6IG56RGF0YSxcclxuICAgICAgICAgICAgbnpQYWdlRGF0YTogYmFzaWNUYWJsZS5kYXRhLFxyXG4gICAgICAgICAgICBjb2x1bW5zOiBfYm9keUNvbHVtbnMsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgZmlyc3Q6IGluZGV4ID09PSAwLFxyXG4gICAgICAgICAgICBsYXN0OiBuekRhdGEubGVuZ3RoID09PSBpbmRleCArIDEsXHJcbiAgICAgICAgICAgIGV2ZW46IGluZGV4ICUgMiA9PT0gMCxcclxuICAgICAgICAgICAgb2RkOiBpbmRleCAlIDIgIT09IDAsXHJcbiAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICBcIlxyXG4gICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvdGJvZHk+XHJcblxyXG4gIDx0Ym9keSAqbmdJZj1cIiFuelZpcnR1YWxGb3JUcmFja0J5ICYmICFuelZpcnR1YWxJdGVtU2l6ZVwiIFtjbGFzcy5uengtdGFibGUtc3RyaXBlZC10Ym9keV09XCJuenhTdHJpcGVcIj5cclxuICAgIDxuZy1jb250YWluZXJcclxuICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiBiYXNpY1RhYmxlLmRhdGE7IGluZGV4IGFzIGluZGV4OyBmaXJzdCBhcyBmaXJzdDsgbGFzdCBhcyBsYXN0OyBldmVuIGFzIGV2ZW47IG9kZCBhcyBvZGRcIlxyXG4gICAgPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgIG56eFRyIHx8IHRyVGVtcGxhdGU7XHJcbiAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICRpbXBsaWNpdDogcm93LFxyXG4gICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgbnpEYXRhOiBuekRhdGEsXHJcbiAgICAgICAgICAgIG56UGFnZURhdGE6IGJhc2ljVGFibGUuZGF0YSxcclxuICAgICAgICAgICAgY29sdW1uczogX2JvZHlDb2x1bW5zLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIGZpcnN0OiBmaXJzdCxcclxuICAgICAgICAgICAgbGFzdDogbGFzdCxcclxuICAgICAgICAgICAgZXZlbjogZXZlbixcclxuICAgICAgICAgICAgb2RkOiBvZGQsXHJcbiAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHBhdGhUcmFjZTogW11cclxuICAgICAgICAgIH1cclxuICAgICAgICBcIlxyXG4gICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L3Rib2R5PlxyXG5cclxuICA8bmctdGVtcGxhdGVcclxuICAgICN0clRlbXBsYXRlXHJcbiAgICBsZXQtcm93XHJcbiAgICBsZXQtaW5kZXg9XCJpbmRleFwiXHJcbiAgICBsZXQtZmlyc3Q9XCJmaXJzdFwiXHJcbiAgICBsZXQtbGFzdD1cImxhc3RcIlxyXG4gICAgbGV0LWV2ZW49XCJldmVuXCJcclxuICAgIGxldC1vZGQ9XCJvZGRcIlxyXG4gICAgbGV0LWxldmVsPVwibGV2ZWxcIlxyXG4gICAgbGV0LXBhcmVudD1cInBhcmVudFwiXHJcbiAgICBsZXQtcGF0aFRyYWNlPVwicGF0aFRyYWNlXCJcclxuICA+XHJcbiAgICA8dHJcclxuICAgICAgKm5nSWY9XCIhcGFyZW50IHx8IHBhcmVudC5leHBhbmRcIlxyXG4gICAgICAoY2xpY2spPVwiXHJcbiAgICAgICAgb25Sb3dDbGljayh7XHJcbiAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgIGluZGV4QXR0cjogeyBpbmRleDogaW5kZXgsIGZpcnN0OiBmaXJzdCwgbGFzdDogbGFzdCwgZXZlbjogZXZlbiwgb2RkOiBvZGQgfSxcclxuICAgICAgICAgIGV2ZW50OiAkZXZlbnRcclxuICAgICAgICB9KVxyXG4gICAgICBcIlxyXG4gICAgICAoZGJsY2xpY2spPVwiXHJcbiAgICAgICAgcm93RGJsY2xpY2suZW1pdCh7XHJcbiAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgIGluZGV4QXR0cjogeyBpbmRleDogaW5kZXgsIGZpcnN0OiBmaXJzdCwgbGFzdDogbGFzdCwgZXZlbjogZXZlbiwgb2RkOiBvZGQgfSxcclxuICAgICAgICAgIGV2ZW50OiAkZXZlbnRcclxuICAgICAgICB9KVxyXG4gICAgICBcIlxyXG4gICAgICAoY29udGV4dG1lbnUpPVwiXHJcbiAgICAgICAgcm93Q29udGV4dG1lbnUuZW1pdCh7XHJcbiAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgIGluZGV4QXR0cjogeyBpbmRleDogaW5kZXgsIGZpcnN0OiBmaXJzdCwgbGFzdDogbGFzdCwgZXZlbjogZXZlbiwgb2RkOiBvZGQgfSxcclxuICAgICAgICAgIGV2ZW50OiAkZXZlbnRcclxuICAgICAgICB9KVxyXG4gICAgICBcIlxyXG4gICAgICBbbmdDbGFzc109XCJyb3cuY2xhc3NOYW1lXCJcclxuICAgICAgW25nU3R5bGVdPVwicm93LnN0eWxlXCJcclxuICAgICAgW2NsYXNzLmFudC10YWJsZS1yb3ctc2VsZWN0ZWRdPVwicm93LmNoZWNrZWQgfHwgX3NlbGVjdFJvdyA9PT0gcm93XCJcclxuICAgID5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2wgb2YgX2JvZHlDb2x1bW5zOyBpbmRleCBhcyBfaW5kZXg7IGZpcnN0IGFzIF9maXJzdDsgbGFzdCBhcyBfbGFzdDsgZXZlbiBhcyBfZXZlbjsgb2RkIGFzIF9vZGRcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgKmxldD1cIlxyXG4gICAgICAgICAgICByb3dcclxuICAgICAgICAgICAgICB8IGNvbFNwYW5cclxuICAgICAgICAgICAgICAgIDogbnp4U3BhbkZ1bmNcclxuICAgICAgICAgICAgICAgIDogbnpEYXRhXHJcbiAgICAgICAgICAgICAgICA6IGJhc2ljVGFibGUuZGF0YVxyXG4gICAgICAgICAgICAgICAgOiBjb2xcclxuICAgICAgICAgICAgICAgIDogeyBpbmRleDogaW5kZXgsIGZpcnN0OiBmaXJzdCwgbGFzdDogbGFzdCwgZXZlbjogZXZlbiwgb2RkOiBvZGQgfVxyXG4gICAgICAgICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IF9pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdDogX2ZpcnN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IF9sYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW46IF9ldmVuLFxyXG4gICAgICAgICAgICAgICAgICAgIG9kZDogX29kZFxyXG4gICAgICAgICAgICAgICAgICB9IGFzIHNwYW5cclxuICAgICAgICAgIFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICpuZ0lmPVwiY29sLnZpc2libGUgIT09IGZhbHNlICYmIHNwYW4ucm93c3BhbiAmJiBzcGFuLmNvbHNwYW5cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwiXHJcbiAgICAgICAgICAgICAgY2VsbENsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IGNvbCxcclxuICAgICAgICAgICAgICAgIGluZGV4QXR0cjogeyBpbmRleDogaW5kZXgsIGZpcnN0OiBmaXJzdCwgbGFzdDogbGFzdCwgZXZlbjogZXZlbiwgb2RkOiBvZGQgfSxcclxuICAgICAgICAgICAgICAgIGNvbEluZGV4OiB7XHJcbiAgICAgICAgICAgICAgICAgIGluZGV4OiBfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgIGZpcnN0OiBfZmlyc3QsXHJcbiAgICAgICAgICAgICAgICAgIGxhc3Q6IF9sYXN0LFxyXG4gICAgICAgICAgICAgICAgICBldmVuOiBfZXZlbixcclxuICAgICAgICAgICAgICAgICAgb2RkOiBfb2RkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICRldmVudFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIChkYmxjbGljayk9XCJcclxuICAgICAgICAgICAgICBjZWxsRGJsY2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogY29sLFxyXG4gICAgICAgICAgICAgICAgaW5kZXhBdHRyOiB7IGluZGV4OiBpbmRleCwgZmlyc3Q6IGZpcnN0LCBsYXN0OiBsYXN0LCBldmVuOiBldmVuLCBvZGQ6IG9kZCB9LFxyXG4gICAgICAgICAgICAgICAgY29sSW5kZXg6IHtcclxuICAgICAgICAgICAgICAgICAgaW5kZXg6IF9pbmRleCxcclxuICAgICAgICAgICAgICAgICAgZmlyc3Q6IF9maXJzdCxcclxuICAgICAgICAgICAgICAgICAgbGFzdDogX2xhc3QsXHJcbiAgICAgICAgICAgICAgICAgIGV2ZW46IF9ldmVuLFxyXG4gICAgICAgICAgICAgICAgICBvZGQ6IF9vZGRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBldmVudDogJGV2ZW50XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIlxyXG4gICAgICAgICAgICAgIGNlbGxDb250ZXh0bWVudS5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uOiBjb2wsXHJcbiAgICAgICAgICAgICAgICBpbmRleEF0dHI6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH0sXHJcbiAgICAgICAgICAgICAgICBjb2xJbmRleDoge1xyXG4gICAgICAgICAgICAgICAgICBpbmRleDogX2luZGV4LFxyXG4gICAgICAgICAgICAgICAgICBmaXJzdDogX2ZpcnN0LFxyXG4gICAgICAgICAgICAgICAgICBsYXN0OiBfbGFzdCxcclxuICAgICAgICAgICAgICAgICAgZXZlbjogX2V2ZW4sXHJcbiAgICAgICAgICAgICAgICAgIG9kZDogX29kZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV2ZW50OiAkZXZlbnRcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICBbbnpTaG93Q2hlY2tib3hdPVwiY29sLm56U2hvd0NoZWNrYm94IHx8IHJvdy5zaG93Q2hlY2tib3hcIlxyXG4gICAgICAgICAgICBbbnpEaXNhYmxlZF09XCJyb3cuZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbbnpJbmRldGVybWluYXRlXT1cInJvdy5uekluZGV0ZXJtaW5hdGVcIlxyXG4gICAgICAgICAgICBbKG56Q2hlY2tlZCldPVwicm93LmNoZWNrZWRcIlxyXG4gICAgICAgICAgICAobnpDaGVja2VkQ2hhbmdlKT1cInRkQ2hlY2tlZENoYW5nZSgkZXZlbnQsIGNvbCwgcm93LCBwYXRoVHJhY2UsIHsgaW5kZXgsIGZpcnN0LCBsYXN0LCBldmVuLCBvZGQgfSlcIlxyXG4gICAgICAgICAgICBbbnpTaG93RXhwYW5kXT1cImNvbC5zaG93RXhwYW5kICYmIHJvdy5jaGlsZHJlbiAmJiByb3cuY2hpbGRyZW4ubGVuZ3RoID4gMFwiXHJcbiAgICAgICAgICAgIFsobnpFeHBhbmQpXT1cInJvdy5leHBhbmRcIlxyXG4gICAgICAgICAgICAobnpFeHBhbmRDaGFuZ2UpPVwiXHJcbiAgICAgICAgICAgICAgZGVmYXVsdENvbGxhcHNlKHJvdywgJGV2ZW50KTtcclxuICAgICAgICAgICAgICBjb2wubnpFeHBhbmRDaGFuZ2UgJiYgY29sLm56RXhwYW5kQ2hhbmdlKCRldmVudCwgY29sLCByb3csIHsgaW5kZXgsIGZpcnN0LCBsYXN0LCBldmVuLCBvZGQgfSlcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgW256SW5kZW50U2l6ZV09XCJjb2wuc2hvd0V4cGFuZCA/IGxldmVsICogbnpJbmRlbnRTaXplIDogbnVsbFwiXHJcbiAgICAgICAgICAgIFtuekxlZnRdPVwiY29sLmZpeGVkID09PSAnbGVmdCdcIlxyXG4gICAgICAgICAgICBbbnpSaWdodF09XCJjb2wuZml4ZWQgPT09ICdyaWdodCdcIlxyXG4gICAgICAgICAgICBbbnpBbGlnbl09XCJjb2wudGRBbGlnbiB8fCBjb2wubnpBbGlnblwiXHJcbiAgICAgICAgICAgIFtuekJyZWFrV29yZF09XCJjb2wubnpCcmVha1dvcmRcIlxyXG4gICAgICAgICAgICBbbnpFbGxpcHNpc109XCJjb2wubnpFbGxpcHNpc1wiXHJcbiAgICAgICAgICAgIFthdHRyLmNvbHNwYW5dPVwic3Bhbi5jb2xzcGFuXCJcclxuICAgICAgICAgICAgW2F0dHIucm93c3Bhbl09XCJzcGFuLnJvd3NwYW5cIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJjb2wudGROZ0NsYXNzXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiY29sLnRkTmdTdHlsZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgICAgICAgdGREYXRhUmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2w6IGNvbCxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbCxcclxuICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIG56RGF0YTogbnpEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG56UGFnZURhdGE6IGJhc2ljVGFibGUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleEF0dHI6IHsgaW5kZXg6IGluZGV4LCBmaXJzdDogZmlyc3QsIGxhc3Q6IGxhc3QsIGV2ZW46IGV2ZW4sIG9kZDogb2RkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sSW5kZXg6IHsgaW5kZXg6IF9pbmRleCwgZmlyc3Q6IF9maXJzdCwgbGFzdDogX2xhc3QsIGV2ZW46IF9ldmVuLCBvZGQ6IF9vZGQgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICByb3c6IHJvd1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC90cj5cclxuXHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICpuZ0Zvcj1cImxldCBjaGlsZCBvZiByb3cuY2hpbGRyZW47IGluZGV4IGFzIGNJbmRleDsgZmlyc3QgYXMgY0ZpcnN0OyBsYXN0IGFzIGNMYXN0OyBldmVuIGFzIGNFdmVuOyBvZGQgYXMgY09kZFwiXHJcbiAgICA+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgbnp4VHIgfHwgdHJUZW1wbGF0ZTtcclxuICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgJGltcGxpY2l0OiBjaGlsZCxcclxuICAgICAgICAgICAgbGV2ZWw6IGxldmVsICsgMSxcclxuICAgICAgICAgICAgcGFyZW50SW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICByb3c6IGNoaWxkLFxyXG4gICAgICAgICAgICBuekRhdGE6IG56RGF0YSxcclxuICAgICAgICAgICAgbnpQYWdlRGF0YTogYmFzaWNUYWJsZS5kYXRhLFxyXG4gICAgICAgICAgICBjb2x1bW5zOiBfYm9keUNvbHVtbnMsXHJcbiAgICAgICAgICAgIGluZGV4OiBjSW5kZXgsXHJcbiAgICAgICAgICAgIGZpcnN0OiBjRmlyc3QsXHJcbiAgICAgICAgICAgIGxhc3Q6IGNMYXN0LFxyXG4gICAgICAgICAgICBldmVuOiBjRXZlbixcclxuICAgICAgICAgICAgb2RkOiBjT2RkLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IHJvdyxcclxuICAgICAgICAgICAgcGF0aFRyYWNlOiBbcGF0aFRyYWNlLCByb3ddXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXCJcclxuICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uei10YWJsZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdGhSZW5kZXJUZW1wbGF0ZSBsZXQtZGF0YT5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YS5jb2wuX3RoVGVtcGxhdGU7IGVsc2UgdGV4dFRoVGVtcGxhdGVcIj5cclxuICAgIDxuZy1jb250YWluZXJcclxuICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkYXRhLmNvbC5fdGhUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGRhdGEsIGRhdGE6IGRhdGEsIGNvbDogZGF0YS5jb2wgfVwiXHJcbiAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gIDxuZy10ZW1wbGF0ZSAjdGV4dFRoVGVtcGxhdGU+XHJcbiAgICB7eyBkYXRhLmNvbC50aFRleHQgPT0gbnVsbCAmJiBkYXRhLmNvbC5pc0luZGV4ID8gJ+W6j+WPtycgOiBkYXRhLmNvbC50aFRleHQgfX1cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPG5nLXRlbXBsYXRlICN0ZERhdGFSZW5kZXIgbGV0LWRhdGEgbGV0LXJvdz1cInJvd1wiPlxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZGF0YS5jb2wuaXNJbmRleDsgZWxzZSB0ZFRlbXBsYXRlVGVtcGxhdGVcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLmNvbC5fdGRUZW1wbGF0ZTsgZWxzZSBidXR0b25Db250cm9sVGVtcGxhdGVcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgICAgICBkYXRhLmNvbC5fdGRUZW1wbGF0ZTtcclxuICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgJGltcGxpY2l0OiByb3csXHJcbiAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBjb2w6IGRhdGEuY29sLFxyXG4gICAgICAgICAgICBpbmRleEF0dHI6IGRhdGEuaW5kZXhBdHRyLFxyXG4gICAgICAgICAgICBwYXJlbnQ6IGRhdGEucGFyZW50XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXCJcclxuICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gIDxuZy10ZW1wbGF0ZSAjdGRUZW1wbGF0ZVRlbXBsYXRlPlxyXG4gICAge3sgbnpQYWdlU2l6ZSAqIChuelBhZ2VJbmRleCAtIDEpICsgZGF0YS5pbmRleEF0dHIuaW5kZXggKyAxIH19XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgPCEtLSDmjInpkq7liJctLT5cclxuICA8bmctdGVtcGxhdGUgI2J1dHRvbkNvbnRyb2xUZW1wbGF0ZT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLmNvbC5idXR0b25zOyBlbHNlIHdpZGdldENvbnRyb2xUZW1wbGF0ZVwiPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgKm5nRm9yPVwiXHJcbiAgICAgICAgICBsZXQgYnRuIG9mIGRhdGEuY29sLmJ1dHRvbnMgfCBjb2xCdXR0b25zOiByb3cgOiBkYXRhIDogZGF0YS5wYXJlbnQgfCBhc3luYztcclxuICAgICAgICAgIGluZGV4IGFzIGluZGV4O1xyXG4gICAgICAgICAgY291bnQgYXMgY291bnQ7XHJcbiAgICAgICAgICBsYXN0IGFzIGxhc3RcclxuICAgICAgICBcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgKm5nSWY9XCJidG4gJiYgKGJ0bi52aXNpYmxlIHwgY29sQnV0dG9uVmlzaWJsZSkocm93LCBkYXRhKSAhPT0gZmFsc2UgJiYgKGJ0bi5wZXJtaXNzaW9uIHwgaGFzQXV0aCB8IGFzeW5jKVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPG56eC10YWJsZS1idXR0b25cclxuICAgICAgICAgICAgKm5nSWY9XCJidG4ubGluayA9PT0gZmFsc2VcIlxyXG4gICAgICAgICAgICBbcHJvcHNdPVwiYnRuXCJcclxuICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxyXG4gICAgICAgICAgICBbaW5kZXhBdHRyXT1cImRhdGEuaW5kZXhBdHRyXCJcclxuICAgICAgICAgICAgW2NvbEluZGV4XT1cImRhdGEuY29sSW5kZXhcIlxyXG4gICAgICAgICAgICBbbnpEYXRhXT1cImRhdGEubnpEYXRhXCJcclxuICAgICAgICAgICAgW256UGFnZURhdGFdPVwiZGF0YS5uelBhZ2VEYXRhXCJcclxuICAgICAgICAgICAgW2NvbHVtbl09XCJkYXRhLmNvbFwiXHJcbiAgICAgICAgICA+PC9uengtdGFibGUtYnV0dG9uPlxyXG4gICAgICAgICAgPG56eC10YWJsZS1saW5rXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYnRuLmxpbmsgIT09IGZhbHNlXCJcclxuICAgICAgICAgICAgW3Byb3BzXT1cImJ0blwiXHJcbiAgICAgICAgICAgIFtyb3ddPVwicm93XCJcclxuICAgICAgICAgICAgW2luZGV4QXR0cl09XCJkYXRhLmluZGV4QXR0clwiXHJcbiAgICAgICAgICAgIFtjb2xJbmRleF09XCJkYXRhLmNvbEluZGV4XCJcclxuICAgICAgICAgICAgW256RGF0YV09XCJkYXRhLm56RGF0YVwiXHJcbiAgICAgICAgICAgIFtuelBhZ2VEYXRhXT1cImRhdGEubnpQYWdlRGF0YVwiXHJcbiAgICAgICAgICAgIFtjb2x1bW5dPVwiZGF0YS5jb2xcIlxyXG4gICAgICAgICAgPjwvbnp4LXRhYmxlLWxpbms+XHJcbiAgICAgICAgICA8bnotZGl2aWRlciAqbmdJZj1cImJ0bi5zaG93RGl2aWRlciAhPT0gZmFsc2UgJiYgY291bnQgPiAxICYmICFsYXN0XCIgbnpUeXBlPVwidmVydGljYWxcIj48L256LWRpdmlkZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgPCEtLeiHquWumuS5iemDqOS7ti0tPlxyXG4gIDxuZy10ZW1wbGF0ZSAjd2lkZ2V0Q29udHJvbFRlbXBsYXRlPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEuY29sLndpZGdldHM7IGVsc2UgdGV4dFZhbHVlVGVtcGxhdGVcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYnRuIG9mIGRhdGEuY29sLndpZGdldHMgfCBjb2xCdXR0b25zOiByb3cgOiBkYXRhIDogZGF0YS5wYXJlbnQgfCBhc3luY1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICpuZ0lmPVwiYnRuICYmIChidG4udmlzaWJsZSB8IGNvbEJ1dHRvblZpc2libGUpKHJvdywgZGF0YSkgIT09IGZhbHNlICYmIChidG4ucGVybWlzc2lvbiB8IGhhc0F1dGggfCBhc3luYylcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgICAgICB0YWJsZS13aWRnZXRcclxuICAgICAgICAgICAgW3dpZGdldF09XCJidG5cIlxyXG4gICAgICAgICAgICBbcm93XT1cInJvd1wiXHJcbiAgICAgICAgICAgIFtpbmRleEF0dHJdPVwiZGF0YS5pbmRleEF0dHJcIlxyXG4gICAgICAgICAgICBbY29sSW5kZXhdPVwiZGF0YS5jb2xJbmRleFwiXHJcbiAgICAgICAgICAgIFtuekRhdGFdPVwiZGF0YS5uekRhdGFcIlxyXG4gICAgICAgICAgICBbbnpQYWdlRGF0YV09XCJkYXRhLm56UGFnZURhdGFcIlxyXG4gICAgICAgICAgICBbY29sdW1uXT1cImRhdGEuY29sXCJcclxuICAgICAgICAgID48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDxuZy10ZW1wbGF0ZSAjdGV4dFZhbHVlVGVtcGxhdGU+XHJcbiAgICB7e1xyXG4gICAgICByb3dcclxuICAgICAgICB8IGNvbEZvcm1hdDogZGF0YS5jb2wgOiBkYXRhXHJcbiAgICAgICAgfCBhc3luY1xyXG4gICAgICAgIHwgZGVmYXVsdGlmeTogKGRhdGEuY29sLm56U2hvd0NoZWNrYm94ID8gJycgOiBkYXRhLmNvbC5kZWZhdWx0aWZ5IHx8IGRlZmF1bHRUZXh0KVxyXG4gICAgfX1cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPG5nLXRlbXBsYXRlICN0b3RhbFRlbXBsYXRlIGxldC1yYW5nZT1cInJhbmdlXCIgbGV0LXRvdGFsPlxyXG4gIOesrCB7eyByYW5nZVswXSAvIG56UGFnZVNpemUgfCBtYXRoOiAnY2VpbCcgfX0ve3sgdG90YWwgLyBuelBhZ2VTaXplIHwgbWF0aDogJ2NlaWwnIH19IOmhtSDlhbEge3sgdG90YWwgfX0g5p2hXHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==