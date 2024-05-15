import { AfterViewInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzSafeAny, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { BaseControl } from '@xmagic/nzx-antd/util';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import * as i0 from "@angular/core";
export declare class NzxSwitchComponent extends BaseControl<NzSafeAny> implements ControlValueAccessor, AfterViewInit {
    private cdr;
    nzSwitch: NzSwitchComponent;
    nzxValue: boolean;
    /**
     * 选中时的值
     */
    nzxCheckedValue: NzSafeAny;
    /**
     * 非选中时的值
     */
    nzxUnCheckedValue: NzSafeAny;
    /**
     * 	disable 状态
     */
    nzDisabled?: boolean;
    /**
     * 	加载中的开关
     */
    nzLoading?: boolean;
    /**
     * 	是否完全由用户控制状态, Switch 的状态完全由用户接管，不再自动根据点击事件改变数据。
     */
    nzControl: boolean;
    /**
     * 选中时的内容
     */
    nzCheckedChildren?: string | TemplateRef<void>;
    /**
     * 非选中时的内容
     */
    nzUnCheckedChildren?: string | TemplateRef<void>;
    /**
     * 开关大小
     */
    nzSize?: NzSizeDSType;
    constructor(cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngModelChange(val: boolean): void;
    writeValue(value: NzSafeAny | null): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxSwitchComponent, "nzx-switch", never, { "nzxCheckedValue": { "alias": "nzxCheckedValue"; "required": false; }; "nzxUnCheckedValue": { "alias": "nzxUnCheckedValue"; "required": false; }; "nzDisabled": { "alias": "nzDisabled"; "required": false; }; "nzLoading": { "alias": "nzLoading"; "required": false; }; "nzControl": { "alias": "nzControl"; "required": false; }; "nzCheckedChildren": { "alias": "nzCheckedChildren"; "required": false; }; "nzUnCheckedChildren": { "alias": "nzUnCheckedChildren"; "required": false; }; "nzSize": { "alias": "nzSize"; "required": false; }; }, {}, never, never, false, never>;
}
