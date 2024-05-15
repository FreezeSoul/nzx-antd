import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, QueryList, Renderer2, SimpleChange, SimpleChanges, TemplateRef, TrackByFunction } from '@angular/core';
import { NzTableComponent, NzTableLayout, NzTablePaginationPosition, NzTablePaginationType, NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { PaginationItemRenderContext } from 'ng-zorro-antd/pagination';
import { Any } from '@freezesoul/nzx-antd';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { CellEventArg, FetchSetting, HeaderEventArg, IndexAttr, NzxColumn, NzxTableSize, PageInfo, RowEventArg, SorterResult, SpanFunc, TrTemplateArgs } from './table.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import { FetchParams } from '@freezesoul/nzx-antd/service';
import { NamedTemplate } from '@freezesoul/nzx-antd/directive';
import * as i0 from "@angular/core";
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
export declare class NzxTableComponent<T extends Record<string, Any> = Any> implements OnInit, AfterContentInit, AfterViewInit, OnChanges {
    protected cdr: ChangeDetectorRef;
    protected render: Renderer2;
    protected http: HttpClient;
    protected elementRef: ElementRef<HTMLDivElement>;
    private antdService;
    /**
     * 当前选中的行
     */
    _selectRow?: T;
    /**
     * 当前页数据
     */
    _currentPageData: T[];
    _headerColumns: NzxColumn<T>[][];
    _bodyColumns: NzxColumn<T>[];
    _allColumns: NzxColumn<T>[];
    private _nzTotal;
    private _nzShowPagination;
    sortInfo?: SorterResult;
    defaultPageSizeOptions: number[];
    /**
     * 请求处理
     */
    api: string | Promise<T[]> | Observable<T[]>;
    /**
     * 请求参数
     */
    params?: FetchParams;
    /**
     * 是否显示刷新按钮
     */
    nzxRefreshVisible: boolean;
    /**
     * 是否显示调整表格大小按钮
     */
    nzxResizeVisible: boolean;
    /**
     * 显示配置列, 只在非合并表头时可用
     */
    nzxSettingVisible: boolean;
    /**
     * 是否显示斑马线
     */
    nzxStripe: boolean;
    /**
     * 请求之前处理函数
     */
    beforeFetch?: (params: Record<string, Any>) => Record<string, Any> | Promise<Any>;
    /**
     * 请求之后处理函数
     */
    afterFetch?: (res: Any, pageIndex: number, reset: boolean) => Partial<PageInfo<T>> | Promise<Partial<PageInfo<T>>>;
    /**
     * 请求配置
     */
    fetchSetting?: FetchSetting;
    /**
     * 排序函数
     */
    sortFn: (data: SorterResult) => SorterResult;
    /**
     * 配置列
     */
    nzxColumns: NzxColumn<T>[];
    /**
     * 默认渲染表头
     */
    nzxDefaultRenderHeader: boolean;
    /**
     * 标题
     */
    title?: string | TemplateRef<void>;
    /**
     * 是否显示表头
     */
    nzxShowHeader?: boolean;
    /**
     * 工具栏-在工具栏之前
     */
    toolbarBefore?: string | TemplateRef<void>;
    /**
     * 工具栏
     */
    toolbar?: string | TemplateRef<void>;
    /**
     * 是否能调整列大小
     */
    nzxResizable: boolean;
    /**
     * 表格布局
     */
    nzTableLayout: NzTableLayout;
    /**
     * 用于显示数据总量和当前数据范围，用法参照 Pagination 组件
     */
    nzShowTotal?: TemplateRef<{
        $implicit: number;
        range: [number, number];
    }>;
    /**
     * 用于自定义页码的结构，用法参照 Pagination 组件
     */
    nzItemRender?: TemplateRef<PaginationItemRenderContext>;
    /**
     * 表格标题
     */
    nzTitle?: string | TemplateRef<Any>;
    /**
     * 表格尾部
     */
    nzFooter?: string | TemplateRef<Any>;
    /**
     * 无数据时显示内容
     */
    nzNoResult?: string | TemplateRef<Any>;
    /**
     * 	页数选择器可选值
     */
    nzPageSizeOptions?: number[];
    /**
     * 虚拟滚动时每一列的高度，与 cdk itemSize 相同
     */
    nzVirtualItemSize: number;
    /**
     * 	缓冲区最大像素高度，与 cdk maxBufferPx 相同
     */
    nzVirtualMaxBufferPx: number;
    /**
     * 缓冲区最小像素高度，低于该值时将加载新结构，与 cdk minBufferPx 相同
     */
    nzVirtualMinBufferPx: number;
    /**
     * 延迟显示加载效果的时间（防止闪烁）
     */
    nzLoadingDelay: number;
    /**
     * 	当前页码，可双向绑定
     */
    nzPageIndex: number;
    /**
     * 每页展示多少数据，可双向绑定
     */
    nzPageSize?: number;
    /**
     * 当前总数据，在服务器渲染时需要传入
     */
    set nzTotal(value: number);
    get nzTotal(): number;
    /**
     * 表头分组时指定每列宽度，与 th 的 [nzWidth] 不可混用
     */
    nzWidthConfig: ReadonlyArray<string | null>;
    /**
     * 表格数据
     */
    nzData: T[];
    /**
     * 指定分页显示的位置
     */
    nzPaginationPosition: NzTablePaginationPosition;
    /**
     * 横向支持滚动
     */
    set scrollX(value: string | null);
    /**
     * 纵向支持滚动
     */
    set scrollY(value: string | null);
    nzScroll: {
        x?: string | null;
        y?: string | null;
    };
    /**
     * 表格是否自动撑满
     */
    nzxFit?: boolean;
    /**
     * 指定分页显示的尺寸
     */
    nzPaginationType: NzTablePaginationType;
    /**
     * 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
     */
    nzFrontPagination: boolean;
    /**
     * 模板模式，无需将数据传递给 nzData
     */
    nzTemplateMode: boolean;
    /**
     * 	是否显示分页器
     */
    set nzShowPagination(value: boolean);
    get nzShowPagination(): boolean;
    /**
     * 页面是否加载中
     */
    nzLoading: boolean;
    /**
     * 是否自动显示loading
     */
    nzxAutoLoading: boolean;
    /**
     * 是否显示外边框
     */
    nzOuterBordered: boolean;
    /**
     * 加载指示符
     */
    nzLoadingIndicator?: TemplateRef<Any>;
    /**
     * 是否展示外边框和列边框
     */
    nzBordered: boolean;
    /**
     * 表格大小, 正常或迷你类型
     */
    nzSize: NzxTableSize;
    /**
     * 是否可以改变 nzPageSize
     */
    nzShowSizeChanger: boolean;
    /**
     * 只有一页时是否隐藏分页器
     */
    nzHideOnSinglePage: boolean;
    /**
     * 是否可以快速跳转至某页
     */
    nzShowQuickJumper: boolean;
    /**
     * 当添加该属性时，显示为简单分页
     */
    nzSimple: boolean;
    /**
     * 是否显示操作按钮小图标
     */
    actionVisible?: boolean;
    /**
     * 是否显示顶部标题
     */
    toolbarVisible?: boolean;
    /**
     * 点击行是否选中
     */
    nzxClickSelectedRow?: boolean;
    /**
     * 当数据为null显示的默认文本
     */
    defaultText?: string;
    /**
     * 由外部传入模板列表
     */
    tplMap?: Map<string, TemplateRef<Any>>;
    /**
     * 虚拟滚动数据 TrackByFunction 函数
     */
    nzVirtualForTrackBy?: TrackByFunction<T>;
    /**
     * 合并单元格
     */
    nzxSpanFunc?: SpanFunc<T>;
    /**
     * 自定义tr
     */
    nzxTr?: TemplateRef<TrTemplateArgs<T>>;
    /**
     * 如果是树结构, 设置缩进大小
     */
    nzIndentSize: number;
    /**
     * 树表的checkable状态下节点选择完全受控（父子节点选中状态不再关联）, 默认false
     */
    nzCheckStrictly?: boolean;
    /**
     * 页数改变时的回调函数
     */
    readonly nzPageSizeChange: EventEmitter<number>;
    /**
     * 当前页码改变时的回调函数
     */
    readonly nzPageIndexChange: EventEmitter<number>;
    /**
     * 	当服务端分页、筛选、排序时，用于获得参数
     */
    readonly nzQueryParams: EventEmitter<NzTableQueryParams>;
    /**
     * 当前页面展示数据改变的回调函数
     */
    readonly nzCurrentPageDataChange: EventEmitter<readonly T[]>;
    /**
     * 数据行点击事件
     */
    readonly rowClick: EventEmitter<RowEventArg<T>>;
    /**
     * 数据行双击事件
     */
    readonly rowDblclick: EventEmitter<RowEventArg<T>>;
    /**
     * 数据行右键菜单事件
     */
    readonly rowContextmenu: EventEmitter<RowEventArg<T>>;
    /**
     * 单元格点击事件
     */
    readonly cellClick: EventEmitter<CellEventArg<T>>;
    /**
     * 单元格双击事件
     */
    readonly cellDblclick: EventEmitter<CellEventArg<T>>;
    /**
     * 单元格右键菜单事件
     */
    readonly cellContextmenu: EventEmitter<CellEventArg<T>>;
    /**
     * 表头单元格事件
     */
    readonly headerClick: EventEmitter<HeaderEventArg>;
    /**
     * 表头单元格双击事件
     */
    readonly headerDblclick: EventEmitter<HeaderEventArg>;
    /**
     * 表头单元格右键菜单事件
     */
    readonly headerContextmenu: EventEmitter<HeaderEventArg>;
    /**
     * 刷新按钮点击事件
     */
    readonly refreshClick: EventEmitter<NzxTableComponent<any>>;
    /**
     * 排序列触发
     */
    sortedColumn: EventEmitter<CdkDragDrop<NzxColumn<T>, any, any>>;
    children: QueryList<NamedTemplate<Any>>;
    nzTable: NzTableComponent<T>;
    nzTableElementRef: ElementRef<HTMLDivElement>;
    constructor(cdr: ChangeDetectorRef, render: Renderer2, http: HttpClient, elementRef: ElementRef<HTMLDivElement>, antdService: NzxAntdService);
    ngOnInit(): void;
    onResize({ width }: NzResizeEvent, col: NzxColumn): void;
    /**
     * 切换表格大小, 增加mini 类型
     * @param size 表格大小
     * @param table nz表格组件
     */
    tableSizeChange(size: NzxTableSize, table: NzTableComponent<Any>): void;
    /**
     * 点击刷新按钮
     */
    onRefreshClick(): void;
    /**
     * 刷新
     * @param reset
     */
    refresh(reset?: boolean): Promise<PageInfo<T>> | null;
    /**
     * 固定列
     * @param column
     */
    fixedClick(column: NzxColumn<T>): void;
    /**
     * 排序
     * @param value
     * @param col
     */
    sortOrderChange(value: NzTableSortOrder, col: NzxColumn): void;
    /**
     * 发起请求
     * @param reset 是否重置
     */
    fetch<T>(reset?: boolean): Promise<PageInfo<T>> | null;
    /**
     * 行点击事件
     * @param info
     */
    onRowClick(info: RowEventArg<T>): void;
    /**
     * 执行请求
     * @param url
     * @param method
     * @param params
     * @param data
     * @protected
     */
    protected doFetch(url: string, method?: string, params?: Any, data?: Any): Observable<PageInfo<T>>;
    /**
     * 处理请求结果
     * @param res
     * @param fetchSetting
     * @param reset
     * @private
     */
    private setFetchResult;
    /**
     * 设置分页信息
     * @param res 响应对象
     * @param pageInfo 原pageInfo
     * @param fetchSetting 配置
     * @param reset 是否重置
     * @private
     */
    private setPageInfo;
    /**
     * 合并请求参数
     * @param reset
     * @param fetchSetting
     * @private
     */
    private mergeParams;
    /**
     * 是否是异步数据
     * @param obj
     * @protected
     */
    protected isAsync(obj: Any): boolean;
    /**
     * 处理表头合并单元格和 body的列
     * @protected
     */
    protected resolveColumns(): void;
    /**
     * 处理参数为模板的参数, 从字符串中找到真正的模板对象
     * @protected
     */
    protected resolveTemplateColumn(): void;
    /**
     * 字符串查找对应的模版
     * @param col
     * @param key
     * @param nameTemplateMap
     * @protected
     */
    protected stringToTemplate(col: NzxColumn<T>, key: keyof NzxColumn, nameTemplateMap: Record<string, TemplateRef<Any>>): void;
    /**
     * 表头触发CheckBox change
     * @param evt
     * @param col
     */
    thCheckedChange(evt: boolean, col: NzxColumn<T>): void;
    /**
     * td触发CheckBox change
     * @param evt
     * @param col
     * @param row
     * @param pathTrace 父节点路径
     * @param indexAttr
     */
    tdCheckedChange(evt: boolean, col: NzxColumn<T>, row: T, pathTrace: [T, T], indexAttr: IndexAttr): void;
    onCurrentPageDataChange(list: T[]): void;
    refreshCheckedStatus(col: NzxColumn<T>): void;
    private _refreshCheckedStatus;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    onWindowResize(): void;
    ngOnChanges(changes: {
        [P in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    /**
     * 拖拽排序
     * @param event
     */
    onSortedColumn(event: CdkDragDrop<NzxColumn<T>, Any>): void;
    /**
     * 折叠子节点
     * @param row
     * @param $event
     */
    defaultCollapse(row: T, $event: boolean): void;
    /**
     * 获取合并表头
     * @param originColumns 原始列配置
     * @protected
     */
    protected getRowColumns(originColumns: NzxColumn<T>[]): {
        headerRows: NzxColumn<T>[][];
        bodyRows: NzxColumn<T>[];
        allColumns: NzxColumn<T>[];
    };
    /**
     * 规范化属性
     * @param col 列
     * @protected
     */
    protected normalProps(col: NzxColumn<T>): void;
    /**
     * 计算撑满父容器
     * @private
     */
    protected fixedFit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxTableComponent<any>, "nzx-table", never, { "api": { "alias": "api"; "required": false; }; "params": { "alias": "params"; "required": false; }; "nzxRefreshVisible": { "alias": "nzxRefreshVisible"; "required": false; }; "nzxResizeVisible": { "alias": "nzxResizeVisible"; "required": false; }; "nzxSettingVisible": { "alias": "nzxSettingVisible"; "required": false; }; "nzxStripe": { "alias": "nzxStripe"; "required": false; }; "beforeFetch": { "alias": "beforeFetch"; "required": false; }; "afterFetch": { "alias": "afterFetch"; "required": false; }; "fetchSetting": { "alias": "fetchSetting"; "required": false; }; "sortFn": { "alias": "sortFn"; "required": false; }; "nzxColumns": { "alias": "nzxColumns"; "required": false; }; "nzxDefaultRenderHeader": { "alias": "nzxDefaultRenderHeader"; "required": false; }; "title": { "alias": "title"; "required": false; }; "nzxShowHeader": { "alias": "nzxShowHeader"; "required": false; }; "toolbarBefore": { "alias": "toolbarBefore"; "required": false; }; "toolbar": { "alias": "toolbar"; "required": false; }; "nzxResizable": { "alias": "nzxResizable"; "required": false; }; "nzTableLayout": { "alias": "nzTableLayout"; "required": false; }; "nzShowTotal": { "alias": "nzShowTotal"; "required": false; }; "nzItemRender": { "alias": "nzItemRender"; "required": false; }; "nzTitle": { "alias": "nzTitle"; "required": false; }; "nzFooter": { "alias": "nzFooter"; "required": false; }; "nzNoResult": { "alias": "nzNoResult"; "required": false; }; "nzPageSizeOptions": { "alias": "nzPageSizeOptions"; "required": false; }; "nzVirtualItemSize": { "alias": "nzVirtualItemSize"; "required": false; }; "nzVirtualMaxBufferPx": { "alias": "nzVirtualMaxBufferPx"; "required": false; }; "nzVirtualMinBufferPx": { "alias": "nzVirtualMinBufferPx"; "required": false; }; "nzLoadingDelay": { "alias": "nzLoadingDelay"; "required": false; }; "nzPageIndex": { "alias": "nzPageIndex"; "required": false; }; "nzPageSize": { "alias": "nzPageSize"; "required": false; }; "nzTotal": { "alias": "nzTotal"; "required": false; }; "nzWidthConfig": { "alias": "nzWidthConfig"; "required": false; }; "nzData": { "alias": "nzData"; "required": false; }; "nzPaginationPosition": { "alias": "nzPaginationPosition"; "required": false; }; "scrollX": { "alias": "scrollX"; "required": false; }; "scrollY": { "alias": "scrollY"; "required": false; }; "nzxFit": { "alias": "nzxFit"; "required": false; }; "nzPaginationType": { "alias": "nzPaginationType"; "required": false; }; "nzFrontPagination": { "alias": "nzFrontPagination"; "required": false; }; "nzTemplateMode": { "alias": "nzTemplateMode"; "required": false; }; "nzShowPagination": { "alias": "nzShowPagination"; "required": false; }; "nzLoading": { "alias": "nzLoading"; "required": false; }; "nzxAutoLoading": { "alias": "nzxAutoLoading"; "required": false; }; "nzOuterBordered": { "alias": "nzOuterBordered"; "required": false; }; "nzLoadingIndicator": { "alias": "nzLoadingIndicator"; "required": false; }; "nzBordered": { "alias": "nzBordered"; "required": false; }; "nzSize": { "alias": "nzSize"; "required": false; }; "nzShowSizeChanger": { "alias": "nzShowSizeChanger"; "required": false; }; "nzHideOnSinglePage": { "alias": "nzHideOnSinglePage"; "required": false; }; "nzShowQuickJumper": { "alias": "nzShowQuickJumper"; "required": false; }; "nzSimple": { "alias": "nzSimple"; "required": false; }; "actionVisible": { "alias": "actionVisible"; "required": false; }; "toolbarVisible": { "alias": "toolbarVisible"; "required": false; }; "nzxClickSelectedRow": { "alias": "nzxClickSelectedRow"; "required": false; }; "defaultText": { "alias": "defaultText"; "required": false; }; "tplMap": { "alias": "tplMap"; "required": false; }; "nzVirtualForTrackBy": { "alias": "nzVirtualForTrackBy"; "required": false; }; "nzxSpanFunc": { "alias": "nzxSpanFunc"; "required": false; }; "nzxTr": { "alias": "nzxTr"; "required": false; }; "nzIndentSize": { "alias": "nzIndentSize"; "required": false; }; "nzCheckStrictly": { "alias": "nzCheckStrictly"; "required": false; }; }, { "nzPageSizeChange": "nzPageSizeChange"; "nzPageIndexChange": "nzPageIndexChange"; "nzQueryParams": "nzQueryParams"; "nzCurrentPageDataChange": "nzCurrentPageDataChange"; "rowClick": "rowClick"; "rowDblclick": "rowDblclick"; "rowContextmenu": "rowContextmenu"; "cellClick": "cellClick"; "cellDblclick": "cellDblclick"; "cellContextmenu": "cellContextmenu"; "headerClick": "headerClick"; "headerDblclick": "headerDblclick"; "headerContextmenu": "headerContextmenu"; "refreshClick": "refreshClick"; "sortedColumn": "sortedColumn"; }, ["children"], ["[title]", "[toolbarBefore]", "[toolbar]"], false, never>;
}
