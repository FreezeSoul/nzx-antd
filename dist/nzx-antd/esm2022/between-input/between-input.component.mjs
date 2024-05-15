import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzxBetweenComponent } from '@xmagic/nzx-antd/between';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@xmagic/nzx-antd/between";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvYmV0d2Vlbi1pbnB1dC9iZXR3ZWVuLWlucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuLWlucHV0L2JldHdlZW4taW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7O0FBaUIvRCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsbUJBQW1CO0lBNEV6QztJQTNFdEIsUUFBUSxHQUFtQixFQUFFLENBQUM7SUFFOUI7O09BRUc7SUFDTSxPQUFPLEdBQXVCLE9BQU8sQ0FBQztJQUMvQzs7T0FFRztJQUNNLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNyQzs7T0FFRztJQUNNLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUVuQzs7T0FFRztJQUNNLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDaEM7O09BRUc7SUFDTSxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzlCOztPQUVHO0lBQ00sV0FBVyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ2pDOztPQUVHO0lBQ00sU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQy9COztPQUVHO0lBQ00sZ0JBQWdCLENBQVU7SUFDbkM7O09BRUc7SUFDTSxlQUFlLENBQVU7SUFDbEM7O09BRUc7SUFDTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCOztPQUVHO0lBQ00sVUFBVSxHQUFHLENBQUMsQ0FBQztJQUV4Qjs7T0FFRztJQUNNLFNBQVMsQ0FBVTtJQUM1Qjs7T0FFRztJQUNNLFFBQVEsQ0FBVTtJQUMzQjs7T0FFRztJQUNNLGNBQWMsQ0FBVTtJQUNqQzs7T0FFRztJQUNNLFlBQVksQ0FBVTtJQUUvQjs7T0FFRztJQUNNLGlCQUFpQixDQUF5QztJQUNuRTs7T0FFRztJQUNNLGVBQWUsQ0FBeUM7SUFFakUsYUFBYSxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsWUFBc0IsR0FBc0I7UUFDMUMsS0FBSyxFQUFFLENBQUM7UUFEWSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUU1QyxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBcUI7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUErQjtRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxHQUFvQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdkQsU0FBUyxHQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzt3R0F0R3hCLHdCQUF3Qjs0RkFBeEIsd0JBQXdCLGtrQkFSeEI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUN2RCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsaURDeEJILHFsRUF1RUE7OzRGRDdDYSx3QkFBd0I7a0JBZHBDLFNBQVM7K0JBQ0UsbUJBQW1CLHVCQUVSLEtBQUssaUJBQ1gsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSx5QkFBeUIsQ0FBQzs0QkFDdkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7d0dBUVEsT0FBTztzQkFBZixLQUFLO2dCQUlHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFJRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFJRyxTQUFTO3NCQUFqQixLQUFLO2dCQUlHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBSUcsU0FBUztzQkFBakIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSUcsZUFBZTtzQkFBdkIsS0FBSztnQkFJRyxXQUFXO3NCQUFuQixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFJRyxRQUFRO3NCQUFoQixLQUFLO2dCQUlHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBSUcsWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBSUcsZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOenhCZXR3ZWVuQ29tcG9uZW50IH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC9iZXR3ZWVuJztcclxuaW1wb3J0IHsgTnpJbnB1dE51bWJlckNvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvaW5wdXQtbnVtYmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnp4LWJldHdlZW4taW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iZXR3ZWVuLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnp4QmV0d2VlbklucHV0Q29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhCZXR3ZWVuSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBOenhCZXR3ZWVuQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIG56eFZhbHVlOiBJbnB1dFZhbHVlVHlwZSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiDmjqfku7bnsbvlnossIOi+k+WFpeahhiDmiJYg5pWw5a2X5qGGXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VHlwZTogJ2lucHV0JyB8ICdudW1iZXInID0gJ2lucHV0JztcclxuICAvKipcclxuICAgKiDlvIDlp4vlrZfmrrVQbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0UGxhY2Vob2xkZXIgPSAn6LW35aeL5YC8JztcclxuICAvKipcclxuICAgKiDnu5PmnZ/lrZfmrrVQbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFBsYWNlaG9sZGVyID0gJ+e7k+adn+WAvCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOacgOWkp+WAvC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydE1heCA9IEluZmluaXR5O1xyXG4gIC8qKlxyXG4gICAqIOacgOWkp+WAvC3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRNYXggPSBJbmZpbml0eTtcclxuICAvKipcclxuICAgKiDmnIDlsI/lgLwt5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRNaW4gPSAtSW5maW5pdHk7XHJcbiAgLyoqXHJcbiAgICog5pyA5bCP5YC8Lee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZE1pbiA9IC1JbmZpbml0eTtcclxuICAvKipcclxuICAgKiBcdOaVsOWAvOeyvuW6pi3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFyUHJlY2lzaW9uPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFx05pWw5YC857K+5bqmLee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFByZWNpc2lvbj86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBcdOavj+asoeaUueWPmOatpeaVsO+8jOWPr+S7peS4uuWwj+aVsC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFyU3RlcCA9IDE7XHJcbiAgLyoqXHJcbiAgICogXHTmr4/mrKHmlLnlj5jmraXmlbDvvIzlj6/ku6XkuLrlsI/mlbAt57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kU3RlcCA9IDE7XHJcblxyXG4gIC8qKlxyXG4gICAqIOe7hOS7tuWGhemDqCBpbnB1dCDnmoQgaWQg5YC8LeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJJZD86IHN0cmluZztcclxuICAvKipcclxuICAgKiDnu4Tku7blhoXpg6ggaW5wdXQg55qEIGlkIOWAvC3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRJZD86IHN0cmluZztcclxuICAvKipcclxuICAgKiDlvIDlp4vlrZfmrrXph43lkb3lkI1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFJlTmFtZT86IHN0cmluZztcclxuICAvKipcclxuICAgKiDnu5PmnZ/lrZfmrrXph43lkb3lkI1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRSZU5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaMh+Wumui+k+WFpeahhuWxleekuuWAvOeahOagvOW8jy3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydEZvcm1hdHRlcj86IE56SW5wdXROdW1iZXJDb21wb25lbnRbJ256Rm9ybWF0dGVyJ107XHJcbiAgLyoqXHJcbiAgICog5oyH5a6a6L6T5YWl5qGG5bGV56S65YC855qE5qC85byPLee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZEZvcm1hdHRlcj86IE56SW5wdXROdW1iZXJDb21wb25lbnRbJ256Rm9ybWF0dGVyJ107XHJcblxyXG4gIGRlZmF1bHRGb3JtYXQgPSAodjogbnVtYmVyKSA9PiB2O1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdNb2RlbENoYW5nZSgpIHtcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5uenhWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBJbnB1dFZhbHVlVHlwZSk6IHZvaWQge1xyXG4gICAgdGhpcy5uenhWYWx1ZSA9IHZhbHVlIHx8IHt9O1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMubnp4RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IElucHV0VmFsdWVUeXBlKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IElucHV0VmFsdWVUeXBlKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcclxuICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJbnB1dFZhbHVlVHlwZSA9IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IG51bWJlciB8IG51bGw+IHwgbnVsbDtcclxuIiwiPG56eC1iZXR3ZWVuXHJcbiAgW256eERpc2FibGVkXT1cIm56eERpc2FibGVkXCJcclxuICBbbnp4U3RhcnREaXNhYmxlZF09XCJuenhTdGFydERpc2FibGVkXCJcclxuICBbbnp4RW5kRGlzYWJsZWRdPVwibnp4RW5kRGlzYWJsZWRcIlxyXG4gIFtuenhTaXplXT1cIm56eFNpemVcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgc3RhcnRcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgIHR5cGVUZW1wbGF0ZTtcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICRpbXBsaWNpdDoge1xyXG4gICAgICAgICAgZGlyOiBuenhTdGFydFJlTmFtZSB8fCAnc3RhcnQnLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IG56eFN0YXJ0RGlzYWJsZWQgIT0gbnVsbCA/IG56eFN0YXJ0RGlzYWJsZWQgOiBuenhEaXNhYmxlZCxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBuenhTdGFydFBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgc3RlcDogbnp4U3RhclN0ZXAsXHJcbiAgICAgICAgICBpZDogbnp4U3RhcklkLFxyXG4gICAgICAgICAgZm9ybWF0dGVyOiBuenhTdGFydEZvcm1hdHRlcixcclxuICAgICAgICAgIG1heDogbnp4U3RhcnRNYXgsXHJcbiAgICAgICAgICBtaW46IG56eFN0YXJ0TWluXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBcIlxyXG4gID48L25nLWNvbnRhaW5lcj5cclxuICA8bmctY29udGFpbmVyXHJcbiAgICBlbmRcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgIHR5cGVUZW1wbGF0ZTtcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICRpbXBsaWNpdDoge1xyXG4gICAgICAgICAgZGlyOiBuenhFbmRSZU5hbWUgfHwgJ2VuZCcsXHJcbiAgICAgICAgICBkaXNhYmxlZDogbnp4RW5kRGlzYWJsZWQgIT0gbnVsbCA/IG56eEVuZERpc2FibGVkIDogbnp4RGlzYWJsZWQsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogbnp4RW5kUGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICBzdGVwOiBuenhFbmRTdGVwLFxyXG4gICAgICAgICAgaWQ6IG56eEVuZElkLFxyXG4gICAgICAgICAgZm9ybWF0dGVyOiBuenhFbmRGb3JtYXR0ZXIsXHJcbiAgICAgICAgICBtYXg6IG56eEVuZE1heCxcclxuICAgICAgICAgIG1pbjogbnp4RW5kTWluXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBcIlxyXG4gID48L25nLWNvbnRhaW5lcj5cclxuPC9uengtYmV0d2Vlbj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdHlwZVRlbXBsYXRlIGxldC1kYXRhPlxyXG4gIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm56eFR5cGVcIj5cclxuICAgIDxpbnB1dFxyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2lucHV0J1wiXHJcbiAgICAgIG56LWlucHV0XHJcbiAgICAgIFtkaXNhYmxlZF09XCJkYXRhLmRpc2FibGVkXCJcclxuICAgICAgW256U2l6ZV09XCJuenhTaXplXCJcclxuICAgICAgWyhuZ01vZGVsKV09XCJuenhWYWx1ZVtkYXRhLmRpcl1cIlxyXG4gICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJkYXRhLnBsYWNlaG9sZGVyXCJcclxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwibmdNb2RlbENoYW5nZSgpXCJcclxuICAgIC8+XHJcbiAgICA8bnotaW5wdXQtbnVtYmVyXHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiXHJcbiAgICAgIFtuekRpc2FibGVkXT1cImRhdGEuZGlzYWJsZWRcIlxyXG4gICAgICBbKG5nTW9kZWwpXT1cIm56eFZhbHVlW2RhdGEuZGlyXVwiXHJcbiAgICAgIFtuelBsYWNlSG9sZGVyXT1cImRhdGEucGxhY2Vob2xkZXJcIlxyXG4gICAgICBbbnpTaXplXT1cIm56eFNpemVcIlxyXG4gICAgICBbbnpTdGVwXT1cImRhdGEuc3RlcFwiXHJcbiAgICAgIFtuelByZWNpc2lvbl09XCJkYXRhLnByZWNpc2lvblwiXHJcbiAgICAgIFtueklkXT1cImRhdGEuaWRcIlxyXG4gICAgICBbbnpGb3JtYXR0ZXJdPVwiZGF0YS5mb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdFwiXHJcbiAgICAgIFtuek1heF09XCJkYXRhLm1heFwiXHJcbiAgICAgIFtuek1pbl09XCJkYXRhLm1pblwiXHJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm5nTW9kZWxDaGFuZ2UoKVwiXHJcbiAgICA+PC9uei1pbnB1dC1udW1iZXI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==