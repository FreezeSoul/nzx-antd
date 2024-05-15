import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzxBetweenComponent } from '@freezesoul/nzx-antd/between';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@freezesoul/nzx-antd/between";
import * as i4 from "ng-zorro-antd/input";
import * as i5 from "ng-zorro-antd/input-number";
export class NzxBetweenInputComponent extends NzxBetweenComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvYmV0d2Vlbi1pbnB1dC9iZXR3ZWVuLWlucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuLWlucHV0L2JldHdlZW4taW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7O0FBaUJuRSxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsbUJBQW1CO0lBNEV6QztJQTNFdEIsUUFBUSxHQUFtQixFQUFFLENBQUM7SUFFOUI7O09BRUc7SUFDTSxPQUFPLEdBQXVCLE9BQU8sQ0FBQztJQUMvQzs7T0FFRztJQUNNLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNyQzs7T0FFRztJQUNNLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUVuQzs7T0FFRztJQUNNLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDaEM7O09BRUc7SUFDTSxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzlCOztPQUVHO0lBQ00sV0FBVyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ2pDOztPQUVHO0lBQ00sU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQy9COztPQUVHO0lBQ00sZ0JBQWdCLENBQVU7SUFDbkM7O09BRUc7SUFDTSxlQUFlLENBQVU7SUFDbEM7O09BRUc7SUFDTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCOztPQUVHO0lBQ00sVUFBVSxHQUFHLENBQUMsQ0FBQztJQUV4Qjs7T0FFRztJQUNNLFNBQVMsQ0FBVTtJQUM1Qjs7T0FFRztJQUNNLFFBQVEsQ0FBVTtJQUMzQjs7T0FFRztJQUNNLGNBQWMsQ0FBVTtJQUNqQzs7T0FFRztJQUNNLFlBQVksQ0FBVTtJQUUvQjs7T0FFRztJQUNNLGlCQUFpQixDQUF5QztJQUNuRTs7T0FFRztJQUNNLGVBQWUsQ0FBeUM7SUFFakUsYUFBYSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsWUFBc0IsR0FBc0I7UUFDMUMsS0FBSyxFQUFFLENBQUM7UUFEWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUU1QyxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBcUI7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUErQjtRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxHQUFvQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdkQsU0FBUyxHQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzt3R0F0R3hCLHdCQUF3Qjs0RkFBeEIsd0JBQXdCLGtrQkFSeEI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUN2RCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsaURDeEJILHFsRUF1RUE7OzRGRDdDYSx3QkFBd0I7a0JBZHBDLFNBQVM7K0JBQ0UsbUJBQW1CLHVCQUVSLEtBQUssaUJBQ1gsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSx5QkFBeUIsQ0FBQzs0QkFDdkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7d0dBUVEsT0FBTztzQkFBZixLQUFLO2dCQUlHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFJRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFJRyxTQUFTO3NCQUFqQixLQUFLO2dCQUlHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBSUcsU0FBUztzQkFBakIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSUcsZUFBZTtzQkFBdkIsS0FBSztnQkFJRyxXQUFXO3NCQUFuQixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFJRyxRQUFRO3NCQUFoQixLQUFLO2dCQUlHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBSUcsWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBSUcsZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOenhCZXR3ZWVuQ29tcG9uZW50IH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvYmV0d2Vlbic7XHJcbmltcG9ydCB7IE56SW5wdXROdW1iZXJDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0LW51bWJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC1iZXR3ZWVuLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYmV0d2Vlbi1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56eEJldHdlZW5JbnB1dENvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4QmV0d2VlbklucHV0Q29tcG9uZW50IGV4dGVuZHMgTnp4QmV0d2VlbkNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBuenhWYWx1ZTogSW5wdXRWYWx1ZVR5cGUgPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICog5o6n5Lu257G75Z6LLCDovpPlhaXmoYYg5oiWIOaVsOWtl+ahhlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFR5cGU6ICdpbnB1dCcgfCAnbnVtYmVyJyA9ICdpbnB1dCc7XHJcbiAgLyoqXHJcbiAgICog5byA5aeL5a2X5q61UGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFBsYWNlaG9sZGVyID0gJ+i1t+Wni+WAvCc7XHJcbiAgLyoqXHJcbiAgICog57uT5p2f5a2X5q61UGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRQbGFjZWhvbGRlciA9ICfnu5PmnZ/lgLwnO1xyXG5cclxuICAvKipcclxuICAgKiDmnIDlpKflgLwt5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRNYXggPSBJbmZpbml0eTtcclxuICAvKipcclxuICAgKiDmnIDlpKflgLwt57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kTWF4ID0gSW5maW5pdHk7XHJcbiAgLyoqXHJcbiAgICog5pyA5bCP5YC8LeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0TWluID0gLUluZmluaXR5O1xyXG4gIC8qKlxyXG4gICAqIOacgOWwj+WAvC3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRNaW4gPSAtSW5maW5pdHk7XHJcbiAgLyoqXHJcbiAgICogXHTmlbDlgLznsr7luqYt5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhclByZWNpc2lvbj86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBcdOaVsOWAvOeyvuW6pi3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRQcmVjaXNpb24/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogXHTmr4/mrKHmlLnlj5jmraXmlbDvvIzlj6/ku6XkuLrlsI/mlbAt5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhclN0ZXAgPSAxO1xyXG4gIC8qKlxyXG4gICAqIFx05q+P5qyh5pS55Y+Y5q2l5pWw77yM5Y+v5Lul5Li65bCP5pWwLee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFN0ZXAgPSAxO1xyXG5cclxuICAvKipcclxuICAgKiDnu4Tku7blhoXpg6ggaW5wdXQg55qEIGlkIOWAvC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFySWQ/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog57uE5Lu25YaF6YOoIGlucHV0IOeahCBpZCDlgLwt57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kSWQ/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5byA5aeL5a2X5q616YeN5ZG95ZCNXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRSZU5hbWU/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog57uT5p2f5a2X5q616YeN5ZG95ZCNXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUmVOYW1lPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDmjIflrprovpPlhaXmoYblsZXnpLrlgLznmoTmoLzlvI8t5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRGb3JtYXR0ZXI/OiBOeklucHV0TnVtYmVyQ29tcG9uZW50WyduekZvcm1hdHRlciddO1xyXG4gIC8qKlxyXG4gICAqIOaMh+Wumui+k+WFpeahhuWxleekuuWAvOeahOagvOW8jy3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRGb3JtYXR0ZXI/OiBOeklucHV0TnVtYmVyQ29tcG9uZW50WyduekZvcm1hdHRlciddO1xyXG5cclxuICBkZWZhdWx0Rm9ybWF0ID0gKHY6IG51bWJlcikgPT4gdjtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nTW9kZWxDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnp4VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogSW5wdXRWYWx1ZVR5cGUpOiB2b2lkIHtcclxuICAgIHRoaXMubnp4VmFsdWUgPSB2YWx1ZSB8fCB7fTtcclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLm56eERpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBJbnB1dFZhbHVlVHlwZSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZTogKHZhbHVlOiBJbnB1dFZhbHVlVHlwZSkgPT4gdm9pZCA9ICgpID0+IG51bGw7XHJcbiAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSW5wdXRWYWx1ZVR5cGUgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXIgfCBudWxsPiB8IG51bGw7XHJcbiIsIjxuengtYmV0d2VlblxyXG4gIFtuenhEaXNhYmxlZF09XCJuenhEaXNhYmxlZFwiXHJcbiAgW256eFN0YXJ0RGlzYWJsZWRdPVwibnp4U3RhcnREaXNhYmxlZFwiXHJcbiAgW256eEVuZERpc2FibGVkXT1cIm56eEVuZERpc2FibGVkXCJcclxuICBbbnp4U2l6ZV09XCJuenhTaXplXCJcclxuPlxyXG4gIDxuZy1jb250YWluZXJcclxuICAgIHN0YXJ0XHJcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICB0eXBlVGVtcGxhdGU7XHJcbiAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAkaW1wbGljaXQ6IHtcclxuICAgICAgICAgIGRpcjogbnp4U3RhcnRSZU5hbWUgfHwgJ3N0YXJ0JyxcclxuICAgICAgICAgIGRpc2FibGVkOiBuenhTdGFydERpc2FibGVkICE9IG51bGwgPyBuenhTdGFydERpc2FibGVkIDogbnp4RGlzYWJsZWQsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogbnp4U3RhcnRQbGFjZWhvbGRlcixcclxuICAgICAgICAgIHN0ZXA6IG56eFN0YXJTdGVwLFxyXG4gICAgICAgICAgaWQ6IG56eFN0YXJJZCxcclxuICAgICAgICAgIGZvcm1hdHRlcjogbnp4U3RhcnRGb3JtYXR0ZXIsXHJcbiAgICAgICAgICBtYXg6IG56eFN0YXJ0TWF4LFxyXG4gICAgICAgICAgbWluOiBuenhTdGFydE1pblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXCJcclxuICA+PC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgZW5kXHJcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICB0eXBlVGVtcGxhdGU7XHJcbiAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAkaW1wbGljaXQ6IHtcclxuICAgICAgICAgIGRpcjogbnp4RW5kUmVOYW1lIHx8ICdlbmQnLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IG56eEVuZERpc2FibGVkICE9IG51bGwgPyBuenhFbmREaXNhYmxlZCA6IG56eERpc2FibGVkLFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IG56eEVuZFBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgc3RlcDogbnp4RW5kU3RlcCxcclxuICAgICAgICAgIGlkOiBuenhFbmRJZCxcclxuICAgICAgICAgIGZvcm1hdHRlcjogbnp4RW5kRm9ybWF0dGVyLFxyXG4gICAgICAgICAgbWF4OiBuenhFbmRNYXgsXHJcbiAgICAgICAgICBtaW46IG56eEVuZE1pblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXCJcclxuICA+PC9uZy1jb250YWluZXI+XHJcbjwvbnp4LWJldHdlZW4+XHJcblxyXG48bmctdGVtcGxhdGUgI3R5cGVUZW1wbGF0ZSBsZXQtZGF0YT5cclxuICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJuenhUeXBlXCI+XHJcbiAgICA8aW5wdXRcclxuICAgICAgKm5nU3dpdGNoQ2FzZT1cIidpbnB1dCdcIlxyXG4gICAgICBuei1pbnB1dFxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGF0YS5kaXNhYmxlZFwiXHJcbiAgICAgIFtuelNpemVdPVwibnp4U2l6ZVwiXHJcbiAgICAgIFsobmdNb2RlbCldPVwibnp4VmFsdWVbZGF0YS5kaXJdXCJcclxuICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiZGF0YS5wbGFjZWhvbGRlclwiXHJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm5nTW9kZWxDaGFuZ2UoKVwiXHJcbiAgICAvPlxyXG4gICAgPG56LWlucHV0LW51bWJlclxyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIlxyXG4gICAgICBbbnpEaXNhYmxlZF09XCJkYXRhLmRpc2FibGVkXCJcclxuICAgICAgWyhuZ01vZGVsKV09XCJuenhWYWx1ZVtkYXRhLmRpcl1cIlxyXG4gICAgICBbbnpQbGFjZUhvbGRlcl09XCJkYXRhLnBsYWNlaG9sZGVyXCJcclxuICAgICAgW256U2l6ZV09XCJuenhTaXplXCJcclxuICAgICAgW256U3RlcF09XCJkYXRhLnN0ZXBcIlxyXG4gICAgICBbbnpQcmVjaXNpb25dPVwiZGF0YS5wcmVjaXNpb25cIlxyXG4gICAgICBbbnpJZF09XCJkYXRhLmlkXCJcclxuICAgICAgW256Rm9ybWF0dGVyXT1cImRhdGEuZm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXRcIlxyXG4gICAgICBbbnpNYXhdPVwiZGF0YS5tYXhcIlxyXG4gICAgICBbbnpNaW5dPVwiZGF0YS5taW5cIlxyXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJuZ01vZGVsQ2hhbmdlKClcIlxyXG4gICAgPjwvbnotaW5wdXQtbnVtYmVyPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=