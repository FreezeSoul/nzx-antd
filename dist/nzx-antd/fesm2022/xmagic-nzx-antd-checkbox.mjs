import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseControl } from '@xmagic/nzx-antd/util';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/checkbox';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import * as i4 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

/**
 * 增强`nz-checkbox`组件, 把数据和值分离
 */
class NzxCheckboxComponent extends BaseControl {
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

class NzxCheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxCheckboxModule, declarations: [NzxCheckboxComponent], imports: [CommonModule, FormsModule, ReactiveFormsModule, NzCheckboxModule, NzOutletModule], exports: [NzxCheckboxComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxCheckboxModule, imports: [CommonModule, FormsModule, ReactiveFormsModule, NzCheckboxModule, NzOutletModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxCheckboxComponent],
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzCheckboxModule, NzOutletModule],
                    exports: [NzxCheckboxComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxCheckboxComponent, NzxCheckboxModule };
//# sourceMappingURL=xmagic-nzx-antd-checkbox.mjs.map
