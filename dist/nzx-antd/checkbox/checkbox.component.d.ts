import { ChangeDetectorRef, EventEmitter, OnChanges, OnInit, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseControl } from '@xmagic/nzx-antd/util';
import { NgStyleInterface, NzSafeAny, NgClassType } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 增强`nz-checkbox`组件, 把数据和值分离
 */
export declare class NzxCheckboxComponent<T = NzSafeAny> extends BaseControl<T[] | T> implements ControlValueAccessor, OnInit, OnChanges {
    protected cdr: ChangeDetectorRef;
    private lastCheckbox?;
    /**
     * checkbox数据源, 根据数据生成 checkbox
     */
    nzxOptions: NzxCheckboxOption<T>[];
    /**
     * 禁用所有复选框
     */
    nzxDisabled: boolean;
    /**
     * 布局方式, 水平/垂直
     */
    nzxLayout: 'horizontal' | 'vertical';
    /**
     * 是否可以多选,默认true
     * 单选状态下(nzxMultiple = false), 值是单个而非数组, 即 <nzx-checkbox [(ngModel)]="test"></nzx-checkbox> // test = 1
     * 多选状态下(nzxMultiple = true),值是数组, 即 <nzx-checkbox [(ngModel)]="test"></nzx-checkbox> // test = [1]
     */
    nzxMultiple: boolean;
    /**
     * 是否必填,在单选状态下(即nzxMultiple = false),是否必须要选一个
     *
     */
    nzxRequired: boolean;
    /**
     * 所有label的模板
     */
    nzxLabelTemplate?: TemplateRef<{
        $implicit: NzxCheckboxOption<T>;
        options: NzxCheckboxOption<T>[];
    }>;
    /**
     * 获取焦点事件
     */
    nzxFocus: EventEmitter<NzxCheckboxOption<T>>;
    /**
     * 失去焦点事件
     */
    nzxBlur: EventEmitter<NzxCheckboxOption<T>>;
    /**
     * 单个点击事件
     */
    nzxItemChange: EventEmitter<NzxCheckboxOption<T>>;
    nzxValue: T[];
    private canValueChange;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [K in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    ngModelChange(values: T[]): void;
    onItemChange(checked: boolean, item: NzxCheckboxOption<T>): void;
    writeValue(value: T[] | T | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxCheckboxComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxCheckboxComponent<any>, "nzx-checkbox", never, { "nzxOptions": { "alias": "nzxOptions"; "required": false; }; "nzxDisabled": { "alias": "nzxDisabled"; "required": false; }; "nzxLayout": { "alias": "nzxLayout"; "required": false; }; "nzxMultiple": { "alias": "nzxMultiple"; "required": false; }; "nzxRequired": { "alias": "nzxRequired"; "required": false; }; "nzxLabelTemplate": { "alias": "nzxLabelTemplate"; "required": false; }; }, { "nzxFocus": "nzxFocus"; "nzxBlur": "nzxBlur"; "nzxItemChange": "nzxItemChange"; }, never, never, false, never>;
}
/**
 * 数据配置项
 */
export interface NzxCheckboxOption<T = NzSafeAny> {
    /**
     *
     */
    label: string | TemplateRef<NzxCheckboxOption>;
    /**
     * 值
     */
    value: T;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否隐藏
     */
    hide?: boolean;
    /**
     * 是否半选
     */
    indeterminate?: boolean;
    /**
     * 值变化的回调函数
     * @param checked
     */
    ngModelChange?: (checked: boolean, item: NzxCheckboxOption) => void;
    /**
     * 样式
     */
    ngStyle?: NgStyleInterface;
    /**
     * class 样式
     */
    ngClass?: NgClassType;
    /**
     * 包裹CheckBox样式, 垂直布局有效
     */
    wrapperNStyle?: NgStyleInterface;
    /**
     * class 包裹CheckBox样式, 垂直布局有效
     */
    wrapperNgClass?: NgClassType;
    /**
     * 额外附加数据
     */
    [key: string]: NzSafeAny;
}
export type OptionItem = Omit<NzxCheckboxOption, 'indeterminate' | 'ngModelChange'>;
