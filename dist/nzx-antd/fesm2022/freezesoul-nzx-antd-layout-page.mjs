import * as i0 from '@angular/core';
import { Component, Input, HostBinding, NgModule } from '@angular/core';
import * as i1 from '@angular/cdk/observers';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';

class NzxContentComponent {
    /**
     * 显示验证占位符(是否显示form-item底部的空白)
     */
    formItemBottomVisible = true;
    /**
     * margin
     */
    margin;
    /**
     * margin top
     */
    marginTop = '10px';
    get hideFormItemBottom() {
        return !this.formItemBottomVisible;
    }
    get contentMargin() {
        return this.margin;
    }
    get contentMarginTop() {
        return this.marginTop;
    }
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxContentComponent, selector: "nzx-content", inputs: { formItemBottomVisible: "formItemBottomVisible", margin: "margin", marginTop: "marginTop" }, host: { properties: { "class.nzx-page-content": "true", "class.hide-form-item-bottom": "this.hideFormItemBottom", "style.margin": "this.contentMargin", "style.margin-top": "this.contentMarginTop" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[class.nzx-page-content]': 'true'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { formItemBottomVisible: [{
                type: Input
            }], margin: [{
                type: Input
            }], marginTop: [{
                type: Input
            }], hideFormItemBottom: [{
                type: HostBinding,
                args: ['class.hide-form-item-bottom']
            }], contentMargin: [{
                type: HostBinding,
                args: ['style.margin']
            }], contentMarginTop: [{
                type: HostBinding,
                args: ['style.margin-top']
            }] } });

class NzxPageComponent {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxPageComponent, selector: "nzx-page", host: { properties: { "class.nzx-page": "true" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-page',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[class.nzx-page]': 'true'
                    }
                }]
        }], ctorParameters: function () { return []; } });

/**
 *
 * 用于校验 `<ng-content></ng-content>` 是否为空，自定义组件时蛮有用。
 */
function isContentEmpty(element) {
    const nodes = element.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes.item(i);
        if (node.nodeType === Node.ELEMENT_NODE && node.outerHTML.trim().length !== 0) {
            return false;
        }
        else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length !== 0) {
            return false;
        }
    }
    return true;
}

class NzxHeaderComponent {
    hasContent = false;
    /**
     * 显示验证占位符(是否显示form-item底部的空白)
     */
    hasBottom = false;
    /**
     * 是否显示按钮区域
     */
    buttonsVisible = true;
    get hideFormItemBottom() {
        return !this.hasBottom;
    }
    constructor() { }
    contentChanged(element) {
        this.hasContent = !isContentEmpty(element);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxHeaderComponent, selector: "nzx-header", inputs: { hasBottom: "hasBottom", buttonsVisible: "buttonsVisible" }, host: { properties: { "class.nzx-page-header": "true", "class.hide-form-item-bottom": "this.hideFormItemBottom" } }, ngImport: i0, template: `
    <div class="page-header_row">
      <div class="page-header_col">
        <ng-content></ng-content>
      </div>
      <div
        #divElement
        (cdkObserveContent)="contentChanged(divElement)"
        [debounce]="200"
        [class.header-content-wrapper]="hasContent"
      >
        <ng-content select="[buttons]"></ng-content>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-header',
                    template: `
    <div class="page-header_row">
      <div class="page-header_col">
        <ng-content></ng-content>
      </div>
      <div
        #divElement
        (cdkObserveContent)="contentChanged(divElement)"
        [debounce]="200"
        [class.header-content-wrapper]="hasContent"
      >
        <ng-content select="[buttons]"></ng-content>
      </div>
    </div>
  `,
                    host: {
                        '[class.nzx-page-header]': 'true'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { hasBottom: [{
                type: Input
            }], buttonsVisible: [{
                type: Input
            }], hideFormItemBottom: [{
                type: HostBinding,
                args: ['class.hide-form-item-bottom']
            }] } });

const COMPONENTS = [NzxContentComponent, NzxPageComponent, NzxHeaderComponent];
class NzxLayoutPageModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, declarations: [NzxContentComponent, NzxPageComponent, NzxHeaderComponent], imports: [CommonModule, ObserversModule], exports: [NzxContentComponent, NzxPageComponent, NzxHeaderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, imports: [CommonModule, ObserversModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [COMPONENTS],
                    imports: [CommonModule, ObserversModule],
                    exports: [COMPONENTS]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxContentComponent, NzxHeaderComponent, NzxLayoutPageModule, NzxPageComponent, isContentEmpty };
//# sourceMappingURL=freezesoul-nzx-antd-layout-page.mjs.map
