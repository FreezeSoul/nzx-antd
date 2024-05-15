import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@xmagic/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFHTCxNQUFNLEVBSU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQUdwRDs7R0FFRztBQWVILE1BQU0sT0FBTyxvQkFDWCxTQUFRLFdBQW9CO0lBNkNOO0lBMUNkLFlBQVksQ0FBd0I7SUFDNUM7O09BRUc7SUFDTSxVQUFVLEdBQTJCLEVBQUUsQ0FBQztJQUNqRDs7T0FFRztJQUNlLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEM7O09BRUc7SUFDTSxTQUFTLEdBQThCLFlBQVksQ0FBQztJQUM3RDs7OztPQUlHO0lBQ00sV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1Qjs7O09BR0c7SUFDTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCOztPQUVHO0lBQ00sZ0JBQWdCLENBQXFGO0lBQzlHOztPQUVHO0lBQ08sUUFBUSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO0lBQzlEOztPQUVHO0lBQ08sT0FBTyxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO0lBQzdEOztPQUVHO0lBQ08sYUFBYSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO0lBQ25FLFFBQVEsR0FBUSxFQUFFLENBQUM7SUFDWCxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzlCLFlBQXNCLEdBQXNCO1FBQzFD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MUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO3dHQVVRLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSVksV0FBVztzQkFBNUIsS0FBSztnQkFJRyxTQUFTO3NCQUFqQixLQUFLO2dCQU1HLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSUksUUFBUTtzQkFBakIsTUFBTTtnQkFJRyxPQUFPO3NCQUFoQixNQUFNO2dCQUlHLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2UsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTmdTdHlsZUludGVyZmFjZSwgTnpTYWZlQW55LCBOZ0NsYXNzVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG4vKipcclxuICog5aKe5by6YG56LWNoZWNrYm94YOe7hOS7tiwg5oqK5pWw5o2u5ZKM5YC85YiG56a7XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC1jaGVja2JveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnp4Q2hlY2tib3hDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eENoZWNrYm94Q29tcG9uZW50PFQgPSBOelNhZmVBbnk+XHJcbiAgZXh0ZW5kcyBCYXNlQ29udHJvbDxUW10gfCBUPlxyXG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzXHJcbntcclxuICBwcml2YXRlIGxhc3RDaGVja2JveD86IE56eENoZWNrYm94T3B0aW9uPFQ+O1xyXG4gIC8qKlxyXG4gICAqIGNoZWNrYm945pWw5o2u5rqQLCDmoLnmja7mlbDmja7nlJ/miJAgY2hlY2tib3hcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhPcHRpb25zOiBOenhDaGVja2JveE9wdGlvbjxUPltdID0gW107XHJcbiAgLyoqXHJcbiAgICog56aB55So5omA5pyJ5aSN6YCJ5qGGXHJcbiAgICovXHJcbiAgQElucHV0KCkgb3ZlcnJpZGUgbnp4RGlzYWJsZWQgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDluIPlsYDmlrnlvI8sIOawtOW5sy/lnoLnm7RcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhMYXlvdXQ6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5Y+v5Lul5aSa6YCJLOm7mOiupHRydWVcclxuICAgKiDljZXpgInnirbmgIHkuIsobnp4TXVsdGlwbGUgPSBmYWxzZSksIOWAvOaYr+WNleS4quiAjOmdnuaVsOe7hCwg5Y2zIDxuengtY2hlY2tib3ggWyhuZ01vZGVsKV09XCJ0ZXN0XCI+PC9uengtY2hlY2tib3g+IC8vIHRlc3QgPSAxXHJcbiAgICog5aSa6YCJ54q25oCB5LiLKG56eE11bHRpcGxlID0gdHJ1ZSks5YC85piv5pWw57uELCDljbMgPG56eC1jaGVja2JveCBbKG5nTW9kZWwpXT1cInRlc3RcIj48L256eC1jaGVja2JveD4gLy8gdGVzdCA9IFsxXVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eE11bHRpcGxlID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDmmK/lkKblv4Xloass5Zyo5Y2V6YCJ54q25oCB5LiLKOWNs256eE11bHRpcGxlID0gZmFsc2UpLOaYr+WQpuW/hemhu+imgemAieS4gOS4qlxyXG4gICAqXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4UmVxdWlyZWQgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOaJgOaciWxhYmVs55qE5qih5p2/XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4TGFiZWxUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOenhDaGVja2JveE9wdGlvbjxUPjsgb3B0aW9uczogTnp4Q2hlY2tib3hPcHRpb248VD5bXSB9PjtcclxuICAvKipcclxuICAgKiDojrflj5bnhKbngrnkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4Rm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPE56eENoZWNrYm94T3B0aW9uPFQ+PigpO1xyXG4gIC8qKlxyXG4gICAqIOWkseWOu+eEpueCueS6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuenhCbHVyID0gbmV3IEV2ZW50RW1pdHRlcjxOenhDaGVja2JveE9wdGlvbjxUPj4oKTtcclxuICAvKipcclxuICAgKiDljZXkuKrngrnlh7vkuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4SXRlbUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Tnp4Q2hlY2tib3hPcHRpb248VD4+KCk7XHJcbiAgbnp4VmFsdWU6IFRbXSA9IFtdO1xyXG4gIHByaXZhdGUgY2FuVmFsdWVDaGFuZ2UgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm56eFZhbHVlID0gKHRoaXMubnp4T3B0aW9ucyB8fCBbXSkuZmlsdGVyKHYgPT4gdi5jaGVja2VkKS5tYXAodiA9PiB2LnZhbHVlKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW0sgaW4ga2V5b2YgdGhpc10/OiBTaW1wbGVDaGFuZ2UgfSAmIFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLm56eE9wdGlvbnMgJiYgIWNoYW5nZXMubnp4T3B0aW9ucy5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMubnp4VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdNb2RlbENoYW5nZSh2YWx1ZXM6IFRbXSk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmNhblZhbHVlQ2hhbmdlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5uenhNdWx0aXBsZSAmJiB0aGlzLmxhc3RDaGVja2JveCAmJiB2YWx1ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKHYgPT4gdiA9PT0gdGhpcy5sYXN0Q2hlY2tib3ghLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHRoaXMubnp4VmFsdWUgPSB2YWx1ZXM7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgdGhpcy5vbkNoYW5nZSghdGhpcy5uenhNdWx0aXBsZSA/IHRoaXMubnp4VmFsdWVbMF0gOiB0aGlzLm56eFZhbHVlKTtcclxuICB9XHJcblxyXG4gIG9uSXRlbUNoYW5nZShjaGVja2VkOiBib29sZWFuLCBpdGVtOiBOenhDaGVja2JveE9wdGlvbjxUPikge1xyXG4gICAgaXRlbS5pbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhblZhbHVlQ2hhbmdlID0gdHJ1ZTtcclxuICAgIGlmICghdGhpcy5uenhNdWx0aXBsZSkge1xyXG4gICAgICAvLyDlj5bmtojkuIrkuIDmrKHpgInkuK1cclxuICAgICAgaWYgKGNoZWNrZWQgJiYgdGhpcy5sYXN0Q2hlY2tib3ggJiYgdGhpcy5sYXN0Q2hlY2tib3ggIT09IGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmxhc3RDaGVja2JveC5jaGVja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIOWNlemAieaooeW8j+W/hemhu+mAieS4reS4gOS4qlxyXG4gICAgICB9IGVsc2UgaWYgKCFjaGVja2VkICYmIHRoaXMubGFzdENoZWNrYm94ID09PSBpdGVtICYmIHRoaXMubnp4UmVxdWlyZWQpIHtcclxuICAgICAgICB0aGlzLmNhblZhbHVlQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgLy8g5pS55Li66YCJ5Lit54q25oCBLCDlkIzml7bnpoHmraLop6blj5FuZ01vZGVsQ2hhbmdlXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5jYW5WYWx1ZUNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sYXN0Q2hlY2tib3ggPSBpdGVtO1xyXG4gICAgfVxyXG4gICAgaWYgKGl0ZW0/Lm5nTW9kZWxDaGFuZ2UpIHtcclxuICAgICAgaXRlbS5uZ01vZGVsQ2hhbmdlKGNoZWNrZWQsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5uenhJdGVtQ2hhbmdlLmVtaXQoaXRlbSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBUW10gfCBUIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgdGhpcy5uenhWYWx1ZSA9IHZhbHVlID09IG51bGwgPyBbXSA6IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgaWYgKHRoaXMubnp4T3B0aW9ucyAmJiB0aGlzLm56eE9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgIGlmICghdGhpcy5uenhNdWx0aXBsZSAmJiB0aGlzLm56eFZhbHVlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aGlzLm56eFZhbHVlLnNwbGljZSgxLCB0aGlzLm56eFZhbHVlLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm56eE9wdGlvbnMuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgICB2LmNoZWNrZWQgPSB0aGlzLm56eFZhbHVlLmluZGV4T2Yodi52YWx1ZSkgIT09IC0xO1xyXG4gICAgICAgIGlmICghdGhpcy5uenhNdWx0aXBsZSAmJiB2LmNoZWNrZWQpIHtcclxuICAgICAgICAgIHRoaXMubGFzdENoZWNrYm94ID0gdjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog5pWw5o2u6YWN572u6aG5XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE56eENoZWNrYm94T3B0aW9uPFQgPSBOelNhZmVBbnk+IHtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIGxhYmVsOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOenhDaGVja2JveE9wdGlvbj47XHJcbiAgLyoqXHJcbiAgICog5YC8XHJcbiAgICovXHJcbiAgdmFsdWU6IFQ7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm56aB55SoXHJcbiAgICovXHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpumakOiXj1xyXG4gICAqL1xyXG4gIGhpZGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWNiumAiVxyXG4gICAqL1xyXG4gIGluZGV0ZXJtaW5hdGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOWAvOWPmOWMlueahOWbnuiwg+WHveaVsFxyXG4gICAqIEBwYXJhbSBjaGVja2VkXHJcbiAgICovXHJcbiAgbmdNb2RlbENoYW5nZT86IChjaGVja2VkOiBib29sZWFuLCBpdGVtOiBOenhDaGVja2JveE9wdGlvbikgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiDmoLflvI9cclxuICAgKi9cclxuICBuZ1N0eWxlPzogTmdTdHlsZUludGVyZmFjZTtcclxuICAvKipcclxuICAgKiBjbGFzcyDmoLflvI9cclxuICAgKi9cclxuICBuZ0NsYXNzPzogTmdDbGFzc1R5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIOWMheijuUNoZWNrQm945qC35byPLCDlnoLnm7TluIPlsYDmnInmlYhcclxuICAgKi9cclxuICB3cmFwcGVyTlN0eWxlPzogTmdTdHlsZUludGVyZmFjZTtcclxuICAvKipcclxuICAgKiBjbGFzcyDljIXoo7lDaGVja0JveOagt+W8jywg5Z6C55u05biD5bGA5pyJ5pWIXHJcbiAgICovXHJcbiAgd3JhcHBlck5nQ2xhc3M/OiBOZ0NsYXNzVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICog6aKd5aSW6ZmE5Yqg5pWw5o2uXHJcbiAgICovXHJcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBPcHRpb25JdGVtID0gT21pdDxOenhDaGVja2JveE9wdGlvbiwgJ2luZGV0ZXJtaW5hdGUnIHwgJ25nTW9kZWxDaGFuZ2UnPjtcclxuIiwiPG56LWNoZWNrYm94LXdyYXBwZXIgKG56T25DaGFuZ2UpPVwibmdNb2RlbENoYW5nZSgkZXZlbnQpXCI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56eExheW91dCA9PT0gJ3ZlcnRpY2FsJzsgZWxzZSBob3Jpem9udGFsVHBsXCI+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIG56eE9wdGlvbnNcIiBbbmdTdHlsZV09XCJpdGVtLndyYXBwZXJOU3R5bGVcIiBbbmdDbGFzc109XCJpdGVtLndyYXBwZXJOZ0NsYXNzXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsYWJlbFRwbDsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gIDxuZy10ZW1wbGF0ZSAjaG9yaXpvbnRhbFRwbD5cclxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygbnp4T3B0aW9uc1wiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibGFiZWxUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDxuZy10ZW1wbGF0ZSAjbGFiZWxUcGwgbGV0LWl0ZW0+XHJcbiAgICA8bGFiZWxcclxuICAgICAgKm5nSWY9XCJpdGVtLmhpZGUgIT09IHRydWVcIlxyXG4gICAgICBuei1jaGVja2JveFxyXG4gICAgICBbbmdTdHlsZV09XCJpdGVtLm5nU3R5bGVcIlxyXG4gICAgICBbbmdDbGFzc109XCJpdGVtLm5nQ2xhc3NcIlxyXG4gICAgICAoZm9jdXMpPVwibnp4Rm9jdXMuZW1pdChpdGVtKVwiXHJcbiAgICAgIChibHVyKT1cIm56eEJsdXIuZW1pdChpdGVtKVwiXHJcbiAgICAgIFtuelZhbHVlXT1cIml0ZW0udmFsdWVcIlxyXG4gICAgICBbKG5nTW9kZWwpXT1cIml0ZW0uY2hlY2tlZFwiXHJcbiAgICAgIFtuekRpc2FibGVkXT1cIiRhbnkobnp4RGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZClcIlxyXG4gICAgICBbbnpJbmRldGVybWluYXRlXT1cIml0ZW0uaW5kZXRlcm1pbmF0ZVwiXHJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uSXRlbUNoYW5nZSgkZXZlbnQsIGl0ZW0pXCJcclxuICAgID5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnp4TGFiZWxUZW1wbGF0ZSB8fCBpdGVtLmxhYmVsOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSwgb3B0aW9uczogbnp4T3B0aW9ucyB9XCJcclxuICAgICAgPlxyXG4gICAgICAgIHt7IG56eExhYmVsVGVtcGxhdGUgfHwgaXRlbS5sYWJlbCB9fVxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbGFiZWw+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uei1jaGVja2JveC13cmFwcGVyPlxyXG4iXX0=