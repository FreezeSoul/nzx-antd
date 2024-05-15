import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzxBetweenComponent } from '@freezesoul/nzx-antd/between';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import * as i0 from "@angular/core";
export declare class NzxBetweenInputComponent extends NzxBetweenComponent implements ControlValueAccessor {
    protected cdr: ChangeDetectorRef;
    nzxValue: InputValueType;
    /**
     * 控件类型, 输入框 或 数字框
     */
    nzxType: 'input' | 'number';
    /**
     * 开始字段Placeholder
     */
    nzxStartPlaceholder: string;
    /**
     * 结束字段Placeholder
     */
    nzxEndPlaceholder: string;
    /**
     * 最大值-开始
     */
    nzxStartMax: number;
    /**
     * 最大值-结束
     */
    nzxEndMax: number;
    /**
     * 最小值-开始
     */
    nzxStartMin: number;
    /**
     * 最小值-结束
     */
    nzxEndMin: number;
    /**
     * 	数值精度-开始
     */
    nzxStarPrecision?: number;
    /**
     * 	数值精度-结束
     */
    nzxEndPrecision?: number;
    /**
     * 	每次改变步数，可以为小数-开始
     */
    nzxStarStep: number;
    /**
     * 	每次改变步数，可以为小数-结束
     */
    nzxEndStep: number;
    /**
     * 组件内部 input 的 id 值-开始
     */
    nzxStarId?: string;
    /**
     * 组件内部 input 的 id 值-结束
     */
    nzxEndId?: string;
    /**
     * 开始字段重命名
     */
    nzxStartReName?: string;
    /**
     * 结束字段重命名
     */
    nzxEndReName?: string;
    /**
     * 指定输入框展示值的格式-开始
     */
    nzxStartFormatter?: NzInputNumberComponent['nzFormatter'];
    /**
     * 指定输入框展示值的格式-结束
     */
    nzxEndFormatter?: NzInputNumberComponent['nzFormatter'];
    defaultFormat: (v: number) => number;
    constructor(cdr: ChangeDetectorRef);
    ngModelChange(): void;
    writeValue(value: InputValueType): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (_: InputValueType) => void): void;
    registerOnTouched(fn: () => void): void;
    onChange: (value: InputValueType) => void;
    onTouched: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxBetweenInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxBetweenInputComponent, "nzx-between-input", never, { "nzxType": { "alias": "nzxType"; "required": false; }; "nzxStartPlaceholder": { "alias": "nzxStartPlaceholder"; "required": false; }; "nzxEndPlaceholder": { "alias": "nzxEndPlaceholder"; "required": false; }; "nzxStartMax": { "alias": "nzxStartMax"; "required": false; }; "nzxEndMax": { "alias": "nzxEndMax"; "required": false; }; "nzxStartMin": { "alias": "nzxStartMin"; "required": false; }; "nzxEndMin": { "alias": "nzxEndMin"; "required": false; }; "nzxStarPrecision": { "alias": "nzxStarPrecision"; "required": false; }; "nzxEndPrecision": { "alias": "nzxEndPrecision"; "required": false; }; "nzxStarStep": { "alias": "nzxStarStep"; "required": false; }; "nzxEndStep": { "alias": "nzxEndStep"; "required": false; }; "nzxStarId": { "alias": "nzxStarId"; "required": false; }; "nzxEndId": { "alias": "nzxEndId"; "required": false; }; "nzxStartReName": { "alias": "nzxStartReName"; "required": false; }; "nzxEndReName": { "alias": "nzxEndReName"; "required": false; }; "nzxStartFormatter": { "alias": "nzxStartFormatter"; "required": false; }; "nzxEndFormatter": { "alias": "nzxEndFormatter"; "required": false; }; }, {}, never, never, false, never>;
}
export type InputValueType = Record<string, string | number | null> | null;
