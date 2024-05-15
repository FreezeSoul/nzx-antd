import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/input';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

/**
 * 包含开始和结束两个控件，子组件使用`start`和`end`属性来插入到对应的容易内。
 */
class NzxBetweenComponent {
    /**
     * 是否禁用
     */
    nzxDisabled = false;
    /**
     * 控件大小
     */
    nzxSize = 'default';
    /**
     * 开始字段禁用
     */
    nzxStartDisabled;
    /**
     * 结束字段禁用
     */
    nzxEndDisabled;
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxBetweenComponent, selector: "nzx-between", inputs: { nzxDisabled: "nzxDisabled", nzxSize: "nzxSize", nzxStartDisabled: "nzxStartDisabled", nzxEndDisabled: "nzxEndDisabled" }, exportAs: ["nzxBetween"], ngImport: i0, template: "<nz-input-group\r\n  nzCompact\r\n  class=\"nzx-between\"\r\n  [class.nzx-between-disabled]=\"nzxDisabled || (nzxStartDisabled && nzxEndDisabled)\"\r\n  [nzSize]=\"nzxSize\"\r\n>\r\n  <ng-content select=\"[start]\"></ng-content>\r\n  <input type=\"text\" disabled nz-input placeholder=\"~\" class=\"nzx-between-placeholder\" />\r\n  <ng-content select=\"[end]\"></ng-content>\r\n</nz-input-group>\r\n", dependencies: [{ kind: "directive", type: i1.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "component", type: i1.NzInputGroupComponent, selector: "nz-input-group", inputs: ["nzAddOnBeforeIcon", "nzAddOnAfterIcon", "nzPrefixIcon", "nzSuffixIcon", "nzAddOnBefore", "nzAddOnAfter", "nzPrefix", "nzStatus", "nzSuffix", "nzSize", "nzSearch", "nzCompact"], exportAs: ["nzInputGroup"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-between', exportAs: 'nzxBetween', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<nz-input-group\r\n  nzCompact\r\n  class=\"nzx-between\"\r\n  [class.nzx-between-disabled]=\"nzxDisabled || (nzxStartDisabled && nzxEndDisabled)\"\r\n  [nzSize]=\"nzxSize\"\r\n>\r\n  <ng-content select=\"[start]\"></ng-content>\r\n  <input type=\"text\" disabled nz-input placeholder=\"~\" class=\"nzx-between-placeholder\" />\r\n  <ng-content select=\"[end]\"></ng-content>\r\n</nz-input-group>\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzxDisabled: [{
                type: Input
            }], nzxSize: [{
                type: Input
            }], nzxStartDisabled: [{
                type: Input
            }], nzxEndDisabled: [{
                type: Input
            }] } });

class NzxBetweenModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenModule, declarations: [NzxBetweenComponent], imports: [CommonModule, NzInputModule], exports: [NzxBetweenComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenModule, imports: [CommonModule, NzInputModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxBetweenComponent],
                    imports: [CommonModule, NzInputModule],
                    exports: [NzxBetweenComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxBetweenComponent, NzxBetweenModule };
//# sourceMappingURL=freezesoul-nzx-antd-between.mjs.map
