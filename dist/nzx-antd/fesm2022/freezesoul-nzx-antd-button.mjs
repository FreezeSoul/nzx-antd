import * as i0 from '@angular/core';
import { Directive, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

/**
 * 按钮指令，增强ng-zorro-antd按钮颜色, 和nz-button组件配合使用, 只增加`nzxColor`属性
 *
 * 颜色值取自 https://ant.design/docs/spec/colors-cn
 */
class NzxButtonDirective {
    renderer;
    elementRef;
    /**
     * 按钮颜色名称
     */
    nzxColor;
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.addButtonClass(this.nzxColor);
    }
    /**
     * 添加按钮class 名称
     * @param className class 名称
     * @protected
     */
    addButtonClass(className) {
        const element = this.elementRef.nativeElement;
        const classList = element.classList;
        classList.forEach(cls => {
            if (cls.indexOf('nzx-button') === 0) {
                classList.remove(cls);
            }
        });
        if (className) {
            this.renderer.addClass(element, `nzx-button-${className}`);
        }
    }
    ngOnChanges(changes) {
        if (changes.nzxColor && !changes.nzxColor.isFirstChange()) {
            this.addButtonClass(this.nzxColor);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NzxButtonDirective, selector: "[nz-button]", inputs: { nzxColor: "nzxColor" }, exportAs: ["nzxButton"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-button]',
                    exportAs: 'nzxButton'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzxColor: [{
                type: Input
            }] } });

class NzxButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonModule, declarations: [NzxButtonDirective], imports: [CommonModule, NzButtonModule], exports: [NzxButtonDirective, NzButtonModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonModule, imports: [CommonModule, NzButtonModule, NzButtonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxButtonDirective],
                    imports: [CommonModule, NzButtonModule],
                    exports: [NzxButtonDirective, NzButtonModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxButtonDirective, NzxButtonModule };
//# sourceMappingURL=freezesoul-nzx-antd-button.mjs.map
