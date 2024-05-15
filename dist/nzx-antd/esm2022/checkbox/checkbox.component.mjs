import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "ng-zorro-antd/checkbox";
import * as i4 from "ng-zorro-antd/core/outlet";
/**
 * 增强`nz-checkbox`组件, 把数据和值分离
 */
export class NzxCheckboxComponent extends BaseControl {
    cdr;
    lastCheckbox;
    /**
     * checkbox数据源, 根据数据生成 checkbox
     */
    nzxOptions = [];
    /**
     * 禁用所有复选框
     */
    nzxDisabled = false;
    /**
     * 布局方式, 水平/垂直
     */
    nzxLayout = 'horizontal';
    /**
     * 是否可以多选,默认true
     * 单选状态下(nzxMultiple = false), 值是单个而非数组, 即 <nzx-checkbox [(ngModel)]="test"></nzx-checkbox> // test = 1
     * 多选状态下(nzxMultiple = true),值是数组, 即 <nzx-checkbox [(ngModel)]="test"></nzx-checkbox> // test = [1]
     */
    nzxMultiple = true;
    /**
     * 是否必填,在单选状态下(即nzxMultiple = false),是否必须要选一个
     *
     */
    nzxRequired = true;
    /**
     * 所有label的模板
     */
    nzxLabelTemplate;
    /**
     * 获取焦点事件
     */
    nzxFocus = new EventEmitter();
    /**
     * 失去焦点事件
     */
    nzxBlur = new EventEmitter();
    /**
     * 单个点击事件
     */
    nzxItemChange = new EventEmitter();
    nzxValue = [];
    canValueChange = true;
    constructor(cdr) {
        super();
        this.cdr = cdr;
    }
    ngOnInit() {
        this.nzxValue = (this.nzxOptions || []).filter(v => v.checked).map(v => v.value);
    }
    ngOnChanges(changes) {
        if (changes.nzxOptions && !changes.nzxOptions.isFirstChange()) {
            this.writeValue(this.nzxValue);
        }
    }
    ngModelChange(values) {
        if (!this.canValueChange) {
            return;
        }
        if (!this.nzxMultiple && this.lastCheckbox && values.length > 1) {
            values = values.filter(v => v === this.lastCheckbox.value);
        }
        this.nzxValue = values;
        this.onTouched();
        this.onChange(!this.nzxMultiple ? this.nzxValue[0] : this.nzxValue);
    }
    onItemChange(checked, item) {
        item.indeterminate = false;
        this.canValueChange = true;
        if (!this.nzxMultiple) {
            // 取消上一次选中
            if (checked && this.lastCheckbox && this.lastCheckbox !== item) {
                this.lastCheckbox.checked = false;
                // 单选模式必须选中一个
            }
            else if (!checked && this.lastCheckbox === item && this.nzxRequired) {
                this.canValueChange = false;
                // 改为选中状态, 同时禁止触发ngModelChange
                setTimeout(() => {
                    item.checked = true;
                    this.canValueChange = true;
                    this.cdr.markForCheck();
                });
                return;
            }
            this.lastCheckbox = item;
        }
        if (item?.ngModelChange) {
            item.ngModelChange(checked, item);
        }
        this.nzxItemChange.emit(item);
    }
    writeValue(value) {
        this.nzxValue = value == null ? [] : Array.isArray(value) ? value : [value];
        if (this.nzxOptions && this.nzxOptions.length) {
            if (!this.nzxMultiple && this.nzxValue.length > 1) {
                this.nzxValue.splice(1, this.nzxValue.length - 1);
            }
            this.nzxOptions.forEach(v => {
                v.checked = this.nzxValue.indexOf(v.value) !== -1;
                if (!this.nzxMultiple && v.checked) {
                    this.lastCheckbox = v;
                }
            });
        }
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxCheckboxComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxCheckboxComponent, selector: "nzx-checkbox", inputs: { nzxOptions: "nzxOptions", nzxDisabled: "nzxDisabled", nzxLayout: "nzxLayout", nzxMultiple: "nzxMultiple", nzxRequired: "nzxRequired", nzxLabelTemplate: "nzxLabelTemplate" }, outputs: { nzxFocus: "nzxFocus", nzxBlur: "nzxBlur", nzxItemChange: "nzxItemChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzxCheckboxComponent),
                multi: true
            }
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<nz-checkbox-wrapper (nzOnChange)=\"ngModelChange($event)\">\r\n  <ng-container *ngIf=\"nzxLayout === 'vertical'; else horizontalTpl\">\r\n    <div *ngFor=\"let item of nzxOptions\" [ngStyle]=\"item.wrapperNStyle\" [ngClass]=\"item.wrapperNgClass\">\r\n      <ng-container *ngTemplateOutlet=\"labelTpl; context: { $implicit: item }\"></ng-container>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-template #horizontalTpl>\r\n    <ng-container *ngFor=\"let item of nzxOptions\">\r\n      <ng-container *ngTemplateOutlet=\"labelTpl; context: { $implicit: item }\"></ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #labelTpl let-item>\r\n    <label\r\n      *ngIf=\"item.hide !== true\"\r\n      nz-checkbox\r\n      [ngStyle]=\"item.ngStyle\"\r\n      [ngClass]=\"item.ngClass\"\r\n      (focus)=\"nzxFocus.emit(item)\"\r\n      (blur)=\"nzxBlur.emit(item)\"\r\n      [nzValue]=\"item.value\"\r\n      [(ngModel)]=\"item.checked\"\r\n      [nzDisabled]=\"$any(nzxDisabled || item.disabled)\"\r\n      [nzIndeterminate]=\"item.indeterminate\"\r\n      (ngModelChange)=\"onItemChange($event, item)\"\r\n    >\r\n      <ng-container\r\n        *nzStringTemplateOutlet=\"nzxLabelTemplate || item.label; context: { $implicit: item, options: nzxOptions }\"\r\n      >\r\n        {{ nzxLabelTemplate || item.label }}\r\n      </ng-container>\r\n    </label>\r\n  </ng-template>\r\n</nz-checkbox-wrapper>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "component", type: i3.NzCheckboxWrapperComponent, selector: "nz-checkbox-wrapper", outputs: ["nzOnChange"], exportAs: ["nzCheckboxWrapper"] }, { kind: "directive", type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-checkbox', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzxCheckboxComponent),
                            multi: true
                        }
                    ], template: "<nz-checkbox-wrapper (nzOnChange)=\"ngModelChange($event)\">\r\n  <ng-container *ngIf=\"nzxLayout === 'vertical'; else horizontalTpl\">\r\n    <div *ngFor=\"let item of nzxOptions\" [ngStyle]=\"item.wrapperNStyle\" [ngClass]=\"item.wrapperNgClass\">\r\n      <ng-container *ngTemplateOutlet=\"labelTpl; context: { $implicit: item }\"></ng-container>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-template #horizontalTpl>\r\n    <ng-container *ngFor=\"let item of nzxOptions\">\r\n      <ng-container *ngTemplateOutlet=\"labelTpl; context: { $implicit: item }\"></ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #labelTpl let-item>\r\n    <label\r\n      *ngIf=\"item.hide !== true\"\r\n      nz-checkbox\r\n      [ngStyle]=\"item.ngStyle\"\r\n      [ngClass]=\"item.ngClass\"\r\n      (focus)=\"nzxFocus.emit(item)\"\r\n      (blur)=\"nzxBlur.emit(item)\"\r\n      [nzValue]=\"item.value\"\r\n      [(ngModel)]=\"item.checked\"\r\n      [nzDisabled]=\"$any(nzxDisabled || item.disabled)\"\r\n      [nzIndeterminate]=\"item.indeterminate\"\r\n      (ngModelChange)=\"onItemChange($event, item)\"\r\n    >\r\n      <ng-container\r\n        *nzStringTemplateOutlet=\"nzxLabelTemplate || item.label; context: { $implicit: item, options: nzxOptions }\"\r\n      >\r\n        {{ nzxLabelTemplate || item.label }}\r\n      </ng-container>\r\n    </label>\r\n  </ng-template>\r\n</nz-checkbox-wrapper>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzxOptions: [{
                type: Input
            }], nzxDisabled: [{
                type: Input
            }], nzxLayout: [{
                type: Input
            }], nzxMultiple: [{
                type: Input
            }], nzxRequired: [{
                type: Input
            }], nzxLabelTemplate: [{
                type: Input
            }], nzxFocus: [{
                type: Output
            }], nzxBlur: [{
                type: Output
            }], nzxItemChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEVBSU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQUd4RDs7R0FFRztBQWVILE1BQU0sT0FBTyxvQkFDWCxTQUFRLFdBQW9CO0lBNkNOO0lBMUNkLFlBQVksQ0FBd0I7SUFDNUM7O09BRUc7SUFDTSxVQUFVLEdBQTJCLEVBQUUsQ0FBQztJQUNqRDs7T0FFRztJQUNlLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEM7O09BRUc7SUFDTSxTQUFTLEdBQThCLFlBQVksQ0FBQztJQUM3RDs7OztPQUlHO0lBQ00sV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1Qjs7O09BR0c7SUFDTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCOztPQUVHO0lBQ00sZ0JBQWdCLENBQXFGO0lBQzlHOztPQUVHO0lBQ08sUUFBUSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO0lBQzlEOztPQUVHO0lBQ08sT0FBTyxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO0lBQzdEOztPQUVHO0lBQ08sYUFBYSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO0lBQ25FLFFBQVEsR0FBUSxFQUFFLENBQUM7SUFDWCxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzlCLFlBQXNCLEdBQXNCO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBRFksUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFFNUMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBNkQ7UUFDdkUsSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxhQUFhLENBQUMsTUFBVztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxZQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQWdCLEVBQUUsSUFBMEI7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsVUFBVTtZQUNWLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFFbEMsYUFBYTthQUNkO2lCQUFNLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckUsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLDhCQUE4QjtnQkFDOUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFxQjtRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVFLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRDtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxQixDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7aUJBQ3ZCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzt3R0FsSFUsb0JBQW9COzRGQUFwQixvQkFBb0Isc1RBUnBCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDbkQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLHNFQ2xDSCx3NUNBbUNBOzs0RkRDYSxvQkFBb0I7a0JBZGhDLFNBQVM7K0JBQ0UsY0FBYyx1QkFFSCxLQUFLLGlCQUNYLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sYUFDcEM7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO3dHQVVRLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSVksV0FBVztzQkFBNUIsS0FBSztnQkFJRyxTQUFTO3NCQUFqQixLQUFLO2dCQU1HLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSUksUUFBUTtzQkFBakIsTUFBTTtnQkFJRyxPQUFPO3NCQUFoQixNQUFNO2dCQUlHLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2UsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcbmltcG9ydCB7IE5nU3R5bGVJbnRlcmZhY2UsIE56U2FmZUFueSwgTmdDbGFzc1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIOWinuW8umBuei1jaGVja2JveGDnu4Tku7YsIOaKiuaVsOaNruWSjOWAvOWIhuemu1xyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtY2hlY2tib3gnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56eENoZWNrYm94Q29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhDaGVja2JveENvbXBvbmVudDxUID0gTnpTYWZlQW55PlxyXG4gIGV4dGVuZHMgQmFzZUNvbnRyb2w8VFtdIHwgVD5cclxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlc1xyXG57XHJcbiAgcHJpdmF0ZSBsYXN0Q2hlY2tib3g/OiBOenhDaGVja2JveE9wdGlvbjxUPjtcclxuICAvKipcclxuICAgKiBjaGVja2JveOaVsOaNrua6kCwg5qC55o2u5pWw5o2u55Sf5oiQIGNoZWNrYm94XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4T3B0aW9uczogTnp4Q2hlY2tib3hPcHRpb248VD5bXSA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIOemgeeUqOaJgOacieWkjemAieahhlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG92ZXJyaWRlIG56eERpc2FibGVkID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5biD5bGA5pa55byPLCDmsLTlubMv5Z6C55u0XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4TGF5b3V0OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWPr+S7peWkmumAiSzpu5jorqR0cnVlXHJcbiAgICog5Y2V6YCJ54q25oCB5LiLKG56eE11bHRpcGxlID0gZmFsc2UpLCDlgLzmmK/ljZXkuKrogIzpnZ7mlbDnu4QsIOWNsyA8bnp4LWNoZWNrYm94IFsobmdNb2RlbCldPVwidGVzdFwiPjwvbnp4LWNoZWNrYm94PiAvLyB0ZXN0ID0gMVxyXG4gICAqIOWkmumAieeKtuaAgeS4iyhuenhNdWx0aXBsZSA9IHRydWUpLOWAvOaYr+aVsOe7hCwg5Y2zIDxuengtY2hlY2tib3ggWyhuZ01vZGVsKV09XCJ0ZXN0XCI+PC9uengtY2hlY2tib3g+IC8vIHRlc3QgPSBbMV1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhNdWx0aXBsZSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5b+F5aGrLOWcqOWNlemAieeKtuaAgeS4iyjljbNuenhNdWx0aXBsZSA9IGZhbHNlKSzmmK/lkKblv4XpobvopoHpgInkuIDkuKpcclxuICAgKlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFJlcXVpcmVkID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDmiYDmnIlsYWJlbOeahOaooeadv1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eExhYmVsVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnp4Q2hlY2tib3hPcHRpb248VD47IG9wdGlvbnM6IE56eENoZWNrYm94T3B0aW9uPFQ+W10gfT47XHJcbiAgLyoqXHJcbiAgICog6I635Y+W54Sm54K55LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eEZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxOenhDaGVja2JveE9wdGlvbjxUPj4oKTtcclxuICAvKipcclxuICAgKiDlpLHljrvnhKbngrnkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4Qmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8Tnp4Q2hlY2tib3hPcHRpb248VD4+KCk7XHJcbiAgLyoqXHJcbiAgICog5Y2V5Liq54K55Ye75LqL5Lu2XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eEl0ZW1DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56eENoZWNrYm94T3B0aW9uPFQ+PigpO1xyXG4gIG56eFZhbHVlOiBUW10gPSBbXTtcclxuICBwcml2YXRlIGNhblZhbHVlQ2hhbmdlID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uenhWYWx1ZSA9ICh0aGlzLm56eE9wdGlvbnMgfHwgW10pLmZpbHRlcih2ID0+IHYuY2hlY2tlZCkubWFwKHYgPT4gdi52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtLIGluIGtleW9mIHRoaXNdPzogU2ltcGxlQ2hhbmdlIH0gJiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5uenhPcHRpb25zICYmICFjaGFuZ2VzLm56eE9wdGlvbnMuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLm56eFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nTW9kZWxDaGFuZ2UodmFsdWVzOiBUW10pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jYW5WYWx1ZUNoYW5nZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMubnp4TXVsdGlwbGUgJiYgdGhpcy5sYXN0Q2hlY2tib3ggJiYgdmFsdWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdmFsdWVzID0gdmFsdWVzLmZpbHRlcih2ID0+IHYgPT09IHRoaXMubGFzdENoZWNrYm94IS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm56eFZhbHVlID0gdmFsdWVzO1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIHRoaXMub25DaGFuZ2UoIXRoaXMubnp4TXVsdGlwbGUgPyB0aGlzLm56eFZhbHVlWzBdIDogdGhpcy5uenhWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1DaGFuZ2UoY2hlY2tlZDogYm9vbGVhbiwgaXRlbTogTnp4Q2hlY2tib3hPcHRpb248VD4pIHtcclxuICAgIGl0ZW0uaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jYW5WYWx1ZUNoYW5nZSA9IHRydWU7XHJcbiAgICBpZiAoIXRoaXMubnp4TXVsdGlwbGUpIHtcclxuICAgICAgLy8g5Y+W5raI5LiK5LiA5qyh6YCJ5LitXHJcbiAgICAgIGlmIChjaGVja2VkICYmIHRoaXMubGFzdENoZWNrYm94ICYmIHRoaXMubGFzdENoZWNrYm94ICE9PSBpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0Q2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDljZXpgInmqKHlvI/lv4XpobvpgInkuK3kuIDkuKpcclxuICAgICAgfSBlbHNlIGlmICghY2hlY2tlZCAmJiB0aGlzLmxhc3RDaGVja2JveCA9PT0gaXRlbSAmJiB0aGlzLm56eFJlcXVpcmVkKSB7XHJcbiAgICAgICAgdGhpcy5jYW5WYWx1ZUNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIOaUueS4uumAieS4reeKtuaAgSwg5ZCM5pe256aB5q2i6Kem5Y+RbmdNb2RlbENoYW5nZVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuY2FuVmFsdWVDaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGFzdENoZWNrYm94ID0gaXRlbTtcclxuICAgIH1cclxuICAgIGlmIChpdGVtPy5uZ01vZGVsQ2hhbmdlKSB7XHJcbiAgICAgIGl0ZW0ubmdNb2RlbENoYW5nZShjaGVja2VkLCBpdGVtKTtcclxuICAgIH1cclxuICAgIHRoaXMubnp4SXRlbUNoYW5nZS5lbWl0KGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogVFtdIHwgVCB8IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMubnp4VmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gW10gOiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcclxuICAgIGlmICh0aGlzLm56eE9wdGlvbnMgJiYgdGhpcy5uenhPcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICBpZiAoIXRoaXMubnp4TXVsdGlwbGUgJiYgdGhpcy5uenhWYWx1ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhpcy5uenhWYWx1ZS5zcGxpY2UoMSwgdGhpcy5uenhWYWx1ZS5sZW5ndGggLSAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5uenhPcHRpb25zLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgdi5jaGVja2VkID0gdGhpcy5uenhWYWx1ZS5pbmRleE9mKHYudmFsdWUpICE9PSAtMTtcclxuICAgICAgICBpZiAoIXRoaXMubnp4TXVsdGlwbGUgJiYgdi5jaGVja2VkKSB7XHJcbiAgICAgICAgICB0aGlzLmxhc3RDaGVja2JveCA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOaVsOaNrumFjee9rumhuVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOenhDaGVja2JveE9wdGlvbjxUID0gTnpTYWZlQW55PiB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBsYWJlbDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8Tnp4Q2hlY2tib3hPcHRpb24+O1xyXG4gIC8qKlxyXG4gICAqIOWAvFxyXG4gICAqL1xyXG4gIHZhbHVlOiBUO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuemgeeUqFxyXG4gICAqL1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmmK/lkKbpmpDol49cclxuICAgKi9cclxuICBoaWRlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmmK/lkKbljYrpgIlcclxuICAgKi9cclxuICBpbmRldGVybWluYXRlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDlgLzlj5jljJbnmoTlm57osIPlh73mlbBcclxuICAgKiBAcGFyYW0gY2hlY2tlZFxyXG4gICAqL1xyXG4gIG5nTW9kZWxDaGFuZ2U/OiAoY2hlY2tlZDogYm9vbGVhbiwgaXRlbTogTnp4Q2hlY2tib3hPcHRpb24pID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICog5qC35byPXHJcbiAgICovXHJcbiAgbmdTdHlsZT86IE5nU3R5bGVJbnRlcmZhY2U7XHJcbiAgLyoqXHJcbiAgICogY2xhc3Mg5qC35byPXHJcbiAgICovXHJcbiAgbmdDbGFzcz86IE5nQ2xhc3NUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiDljIXoo7lDaGVja0JveOagt+W8jywg5Z6C55u05biD5bGA5pyJ5pWIXHJcbiAgICovXHJcbiAgd3JhcHBlck5TdHlsZT86IE5nU3R5bGVJbnRlcmZhY2U7XHJcbiAgLyoqXHJcbiAgICogY2xhc3Mg5YyF6KO5Q2hlY2tCb3jmoLflvI8sIOWeguebtOW4g+WxgOacieaViFxyXG4gICAqL1xyXG4gIHdyYXBwZXJOZ0NsYXNzPzogTmdDbGFzc1R5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmineWklumZhOWKoOaVsOaNrlxyXG4gICAqL1xyXG4gIFtrZXk6IHN0cmluZ106IE56U2FmZUFueTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgT3B0aW9uSXRlbSA9IE9taXQ8Tnp4Q2hlY2tib3hPcHRpb24sICdpbmRldGVybWluYXRlJyB8ICduZ01vZGVsQ2hhbmdlJz47XHJcbiIsIjxuei1jaGVja2JveC13cmFwcGVyIChuek9uQ2hhbmdlKT1cIm5nTW9kZWxDaGFuZ2UoJGV2ZW50KVwiPlxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJuenhMYXlvdXQgPT09ICd2ZXJ0aWNhbCc7IGVsc2UgaG9yaXpvbnRhbFRwbFwiPlxyXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBuenhPcHRpb25zXCIgW25nU3R5bGVdPVwiaXRlbS53cmFwcGVyTlN0eWxlXCIgW25nQ2xhc3NdPVwiaXRlbS53cmFwcGVyTmdDbGFzc1wiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibGFiZWxUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8bmctdGVtcGxhdGUgI2hvcml6b250YWxUcGw+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIG56eE9wdGlvbnNcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxhYmVsVHBsOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICA8bmctdGVtcGxhdGUgI2xhYmVsVHBsIGxldC1pdGVtPlxyXG4gICAgPGxhYmVsXHJcbiAgICAgICpuZ0lmPVwiaXRlbS5oaWRlICE9PSB0cnVlXCJcclxuICAgICAgbnotY2hlY2tib3hcclxuICAgICAgW25nU3R5bGVdPVwiaXRlbS5uZ1N0eWxlXCJcclxuICAgICAgW25nQ2xhc3NdPVwiaXRlbS5uZ0NsYXNzXCJcclxuICAgICAgKGZvY3VzKT1cIm56eEZvY3VzLmVtaXQoaXRlbSlcIlxyXG4gICAgICAoYmx1cik9XCJuenhCbHVyLmVtaXQoaXRlbSlcIlxyXG4gICAgICBbbnpWYWx1ZV09XCJpdGVtLnZhbHVlXCJcclxuICAgICAgWyhuZ01vZGVsKV09XCJpdGVtLmNoZWNrZWRcIlxyXG4gICAgICBbbnpEaXNhYmxlZF09XCIkYW55KG56eERpc2FibGVkIHx8IGl0ZW0uZGlzYWJsZWQpXCJcclxuICAgICAgW256SW5kZXRlcm1pbmF0ZV09XCJpdGVtLmluZGV0ZXJtaW5hdGVcIlxyXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJvbkl0ZW1DaGFuZ2UoJGV2ZW50LCBpdGVtKVwiXHJcbiAgICA+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56eExhYmVsVGVtcGxhdGUgfHwgaXRlbS5sYWJlbDsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0sIG9wdGlvbnM6IG56eE9wdGlvbnMgfVwiXHJcbiAgICAgID5cclxuICAgICAgICB7eyBuenhMYWJlbFRlbXBsYXRlIHx8IGl0ZW0ubGFiZWwgfX1cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2xhYmVsPlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcbjwvbnotY2hlY2tib3gtd3JhcHBlcj5cclxuIl19