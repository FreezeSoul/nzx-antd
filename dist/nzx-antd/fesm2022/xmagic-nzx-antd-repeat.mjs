import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class RepeatComponent {
    constructor() { }
    ngOnInit() {
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RepeatComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: RepeatComponent, selector: "nzx-repeat", ngImport: i0, template: "<p>repeat works!</p>\r\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RepeatComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-repeat', template: "<p>repeat works!</p>\r\n" }]
        }], ctorParameters: function () { return []; } });

class NzxRepeatModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxRepeatModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxRepeatModule, declarations: [RepeatComponent], imports: [CommonModule], exports: [RepeatComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxRepeatModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxRepeatModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [RepeatComponent],
                    imports: [CommonModule],
                    exports: [RepeatComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxRepeatModule, RepeatComponent };
//# sourceMappingURL=xmagic-nzx-antd-repeat.mjs.map
