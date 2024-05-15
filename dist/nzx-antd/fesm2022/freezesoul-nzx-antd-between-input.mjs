import * as i0 from '@angular/core';
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i3 from '@freezesoul/nzx-antd/between';
import { NzxBetweenComponent, NzxBetweenModule } from '@freezesoul/nzx-antd/between';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/input';
import { NzInputModule } from 'ng-zorro-antd/input';
import * as i5 from 'ng-zorro-antd/input-number';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

class NzxBetweenInputComponent extends NzxBetweenComponent {
    cdr;
    nzxValue = {};
    /**
     * 控件类型, 输入框 或 数字框
     */
    nzxType = 'input';
    /**
     * 开始字段Placeholder
     */
    nzxStartPlaceholder = '起始值';
    /**
     * 结束字段Placeholder
     */
    nzxEndPlaceholder = '结束值';
    /**
     * 最大值-开始
     */
    nzxStartMax = Infinity;
    /**
     * 最大值-结束
     */
    nzxEndMax = Infinity;
    /**
     * 最小值-开始
     */
    nzxStartMin = -Infinity;
    /**
     * 最小值-结束
     */
    nzxEndMin = -Infinity;
    /**
     * 	数值精度-开始
     */
    nzxStarPrecision;
    /**
     * 	数值精度-结束
     */
    nzxEndPrecision;
    /**
     * 	每次改变步数，可以为小数-开始
     */
    nzxStarStep = 1;
    /**
     * 	每次改变步数，可以为小数-结束
     */
    nzxEndStep = 1;
    /**
     * 组件内部 input 的 id 值-开始
     */
    nzxStarId;
    /**
     * 组件内部 input 的 id 值-结束
     */
    nzxEndId;
    /**
     * 开始字段重命名
     */
    nzxStartReName;
    /**
     * 结束字段重命名
     */
    nzxEndReName;
    /**
     * 指定输入框展示值的格式-开始
     */
    nzxStartFormatter;
    /**
     * 指定输入框展示值的格式-结束
     */
    nzxEndFormatter;
    defaultFormat = (v) => v;
    constructor(cdr) {
        super();
        this.cdr = cdr;
    }
    ngModelChange() {
        this.onChange(this.nzxValue);
    }
    writeValue(value) {
        this.nzxValue = value || {};
        this.cdr.markForCheck();
    }
    setDisabledState(isDisabled) {
        this.nzxDisabled = isDisabled;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onChange = () => null;
    onTouched = () => null;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenInputComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxBetweenInputComponent, selector: "nzx-between-input", inputs: { nzxType: "nzxType", nzxStartPlaceholder: "nzxStartPlaceholder", nzxEndPlaceholder: "nzxEndPlaceholder", nzxStartMax: "nzxStartMax", nzxEndMax: "nzxEndMax", nzxStartMin: "nzxStartMin", nzxEndMin: "nzxEndMin", nzxStarPrecision: "nzxStarPrecision", nzxEndPrecision: "nzxEndPrecision", nzxStarStep: "nzxStarStep", nzxEndStep: "nzxEndStep", nzxStarId: "nzxStarId", nzxEndId: "nzxEndId", nzxStartReName: "nzxStartReName", nzxEndReName: "nzxEndReName", nzxStartFormatter: "nzxStartFormatter", nzxEndFormatter: "nzxEndFormatter" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzxBetweenInputComponent),
                multi: true
            }
        ], usesInheritance: true, ngImport: i0, template: "<nzx-between\r\n  [nzxDisabled]=\"nzxDisabled\"\r\n  [nzxStartDisabled]=\"nzxStartDisabled\"\r\n  [nzxEndDisabled]=\"nzxEndDisabled\"\r\n  [nzxSize]=\"nzxSize\"\r\n>\r\n  <ng-container\r\n    start\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxStartReName || 'start',\r\n          disabled: nzxStartDisabled != null ? nzxStartDisabled : nzxDisabled,\r\n          placeholder: nzxStartPlaceholder,\r\n          step: nzxStarStep,\r\n          id: nzxStarId,\r\n          formatter: nzxStartFormatter,\r\n          max: nzxStartMax,\r\n          min: nzxStartMin\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n  <ng-container\r\n    end\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxEndReName || 'end',\r\n          disabled: nzxEndDisabled != null ? nzxEndDisabled : nzxDisabled,\r\n          placeholder: nzxEndPlaceholder,\r\n          step: nzxEndStep,\r\n          id: nzxEndId,\r\n          formatter: nzxEndFormatter,\r\n          max: nzxEndMax,\r\n          min: nzxEndMin\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n</nzx-between>\r\n\r\n<ng-template #typeTemplate let-data>\r\n  <ng-container [ngSwitch]=\"nzxType\">\r\n    <input\r\n      *ngSwitchCase=\"'input'\"\r\n      nz-input\r\n      [disabled]=\"data.disabled\"\r\n      [nzSize]=\"nzxSize\"\r\n      [(ngModel)]=\"nzxValue[data.dir]\"\r\n      [attr.placeholder]=\"data.placeholder\"\r\n      (ngModelChange)=\"ngModelChange()\"\r\n    />\r\n    <nz-input-number\r\n      *ngSwitchCase=\"'number'\"\r\n      [nzDisabled]=\"data.disabled\"\r\n      [(ngModel)]=\"nzxValue[data.dir]\"\r\n      [nzPlaceHolder]=\"data.placeholder\"\r\n      [nzSize]=\"nzxSize\"\r\n      [nzStep]=\"data.step\"\r\n      [nzPrecision]=\"data.precision\"\r\n      [nzId]=\"data.id\"\r\n      [nzFormatter]=\"data.formatter || defaultFormat\"\r\n      [nzMax]=\"data.max\"\r\n      [nzMin]=\"data.min\"\r\n      (ngModelChange)=\"ngModelChange()\"\r\n    ></nz-input-number>\r\n  </ng-container>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.NzxBetweenComponent, selector: "nzx-between", inputs: ["nzxDisabled", "nzxSize", "nzxStartDisabled", "nzxEndDisabled"], exportAs: ["nzxBetween"] }, { kind: "directive", type: i4.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i5.NzInputNumberComponent, selector: "nz-input-number", inputs: ["nzSize", "nzMin", "nzMax", "nzParser", "nzPrecision", "nzPrecisionMode", "nzPlaceHolder", "nzStatus", "nzStep", "nzInputMode", "nzId", "nzDisabled", "nzReadOnly", "nzAutoFocus", "nzBorderless", "nzFormatter"], outputs: ["nzBlur", "nzFocus"], exportAs: ["nzInputNumber"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-between-input', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzxBetweenInputComponent),
                            multi: true
                        }
                    ], template: "<nzx-between\r\n  [nzxDisabled]=\"nzxDisabled\"\r\n  [nzxStartDisabled]=\"nzxStartDisabled\"\r\n  [nzxEndDisabled]=\"nzxEndDisabled\"\r\n  [nzxSize]=\"nzxSize\"\r\n>\r\n  <ng-container\r\n    start\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxStartReName || 'start',\r\n          disabled: nzxStartDisabled != null ? nzxStartDisabled : nzxDisabled,\r\n          placeholder: nzxStartPlaceholder,\r\n          step: nzxStarStep,\r\n          id: nzxStarId,\r\n          formatter: nzxStartFormatter,\r\n          max: nzxStartMax,\r\n          min: nzxStartMin\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n  <ng-container\r\n    end\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxEndReName || 'end',\r\n          disabled: nzxEndDisabled != null ? nzxEndDisabled : nzxDisabled,\r\n          placeholder: nzxEndPlaceholder,\r\n          step: nzxEndStep,\r\n          id: nzxEndId,\r\n          formatter: nzxEndFormatter,\r\n          max: nzxEndMax,\r\n          min: nzxEndMin\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n</nzx-between>\r\n\r\n<ng-template #typeTemplate let-data>\r\n  <ng-container [ngSwitch]=\"nzxType\">\r\n    <input\r\n      *ngSwitchCase=\"'input'\"\r\n      nz-input\r\n      [disabled]=\"data.disabled\"\r\n      [nzSize]=\"nzxSize\"\r\n      [(ngModel)]=\"nzxValue[data.dir]\"\r\n      [attr.placeholder]=\"data.placeholder\"\r\n      (ngModelChange)=\"ngModelChange()\"\r\n    />\r\n    <nz-input-number\r\n      *ngSwitchCase=\"'number'\"\r\n      [nzDisabled]=\"data.disabled\"\r\n      [(ngModel)]=\"nzxValue[data.dir]\"\r\n      [nzPlaceHolder]=\"data.placeholder\"\r\n      [nzSize]=\"nzxSize\"\r\n      [nzStep]=\"data.step\"\r\n      [nzPrecision]=\"data.precision\"\r\n      [nzId]=\"data.id\"\r\n      [nzFormatter]=\"data.formatter || defaultFormat\"\r\n      [nzMax]=\"data.max\"\r\n      [nzMin]=\"data.min\"\r\n      (ngModelChange)=\"ngModelChange()\"\r\n    ></nz-input-number>\r\n  </ng-container>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzxType: [{
                type: Input
            }], nzxStartPlaceholder: [{
                type: Input
            }], nzxEndPlaceholder: [{
                type: Input
            }], nzxStartMax: [{
                type: Input
            }], nzxEndMax: [{
                type: Input
            }], nzxStartMin: [{
                type: Input
            }], nzxEndMin: [{
                type: Input
            }], nzxStarPrecision: [{
                type: Input
            }], nzxEndPrecision: [{
                type: Input
            }], nzxStarStep: [{
                type: Input
            }], nzxEndStep: [{
                type: Input
            }], nzxStarId: [{
                type: Input
            }], nzxEndId: [{
                type: Input
            }], nzxStartReName: [{
                type: Input
            }], nzxEndReName: [{
                type: Input
            }], nzxStartFormatter: [{
                type: Input
            }], nzxEndFormatter: [{
                type: Input
            }] } });

class NzxBetweenInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenInputModule, declarations: [NzxBetweenInputComponent], imports: [CommonModule, FormsModule, NzxBetweenModule, NzInputModule, NzInputNumberModule], exports: [NzxBetweenInputComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenInputModule, imports: [CommonModule, FormsModule, NzxBetweenModule, NzInputModule, NzInputNumberModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxBetweenInputComponent],
                    imports: [CommonModule, FormsModule, NzxBetweenModule, NzInputModule, NzInputNumberModule],
                    exports: [NzxBetweenInputComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxBetweenInputComponent, NzxBetweenInputModule };
//# sourceMappingURL=freezesoul-nzx-antd-between-input.mjs.map
