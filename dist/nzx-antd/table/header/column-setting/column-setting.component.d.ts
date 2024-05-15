import { EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { CdkDragDrop, CdkDragRelease, CdkDragStart } from '@angular/cdk/drag-drop';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxColumn } from '../../table.type';
import * as i0 from "@angular/core";
/**
 * 列设置
 * 注意: 只在表头不分组的情况下有效
 */
export declare class NzxColumnSettingComponent<T> implements OnInit {
    protected renderer: Renderer2;
    _nzxColumns: NzxColumn<T>[];
    _columnNameChecked: boolean | null;
    _indeterminate: boolean | null;
    /**
     * 拖拽预览样式
     */
    dragPreviewClass: string;
    /**
     * 显示列名
     */
    columnNameVisible: boolean | null;
    set nzxColumns(value: NzxColumn<T>[]);
    get nzxColumns(): NzxColumn<T>[];
    /**
     * 当个列选中事件
     */
    columnCheckedChange: EventEmitter<NzxColumn<T>>;
    /**
     * 排序列触发
     */
    sortedColumn: EventEmitter<CdkDragDrop<NzxColumn<T>, any, any>>;
    /**
     * 列名选择Change
     */
    columnNameCheckedChange: EventEmitter<boolean>;
    /**
     * 固定列
     */
    fixedClick: EventEmitter<NzxColumn<T>>;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    columnVisible(item: NzxColumn<T>, checked: boolean): void;
    /**
     * 固定列
     * @param column
     * @param fixed
     */
    fixedColumn(column: NzxColumn<T>, fixed?: 'left' | 'right'): void;
    /**
     * 拖动列排序
     * @param event
     * @param list 排序数组
     */
    dropColumn(event: CdkDragDrop<NzxColumn<T>, NzSafeAny>, list: NzxColumn<T>[]): void;
    /**
     * 开始拖动
     * @param event
     */
    cdkDragStarted(event: CdkDragStart): void;
    /**
     * 结束拖动
     * @param event
     */
    cdkDragReleased(event: CdkDragRelease): void;
    /**
     * 展示列复选框 checked
     * @param checked
     */
    columnNameChange(checked: boolean): void;
    /**
     * 更新展示列状态
     */
    refreshNameCheckedStatus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxColumnSettingComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxColumnSettingComponent<any>, "nzx-column-setting", never, { "dragPreviewClass": { "alias": "dragPreviewClass"; "required": false; }; "columnNameVisible": { "alias": "columnNameVisible"; "required": false; }; "nzxColumns": { "alias": "nzxColumns"; "required": false; }; }, { "columnCheckedChange": "columnCheckedChange"; "sortedColumn": "sortedColumn"; "columnNameCheckedChange": "columnNameCheckedChange"; "fixedClick": "fixedClick"; }, never, never, false, never>;
}
