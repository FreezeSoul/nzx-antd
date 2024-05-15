import * as i0 from '@angular/core';
import { forwardRef, Component, ChangeDetectionStrategy, ViewChild, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BaseControl } from '@xmagic/nzx-antd/util';
import * as i2 from 'ng-zorro-antd/switch';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';

class NzxSwitchComponent extends BaseControl {
    cdr;
    nzSwitch;
    nzxValue;
    /**
     * 选中时的值
     */
    nzxCheckedValue = true;
    /**
     * 非选中时的值
     */
    nzxUnCheckedValue = false;
    /**
     * 	disable 状态
     */
    nzDisabled;
    /**
     * 	加载中的开关
     */
    nzLoading;
    /**
     * 	是否完全由用户控制状态, Switch 的状态完全由用户接管，不再自动根据点击事件改变数据。
     */
    nzControl = false;
    /**
     * 选中时的内容
     */
    nzCheckedChildren;
    /**
     * 非选中时的内容
     */
    nzUnCheckedChildren;
    /**
     * 开关大小
     */
    nzSize;
    constructor(cdr) {
        super();
        this.cdr = cdr;
    }
    ngAfterViewInit() {
        const touched = this.nzSwitch.onTouched;
        this.nzSwitch.onTouched = () => {
            touched.call(this.nzSwitch);
            this.onTouched();
        };
    }
    ngModelChange(val) {
        this.onChange(val ? this.nzxCheckedValue : this.nzxUnCheckedValue);
    }
    writeValue(value) {
        this.nzxValue = value === this.nzxCheckedValue;
        this.cdr.markForCheck();
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxSwitchComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxSwitchComponent, selector: "nzx-switch", inputs: { nzxCheckedValue: "nzxCheckedValue", nzxUnCheckedValue: "nzxUnCheckedValue", nzDisabled: "nzDisabled", nzLoading: "nzLoading", nzControl: "nzControl", nzCheckedChildren: "nzCheckedChildren", nzUnCheckedChildren: "nzUnCheckedChildren", nzSize: "nzSize" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzxSwitchComponent),
                multi: true
            }
        ], viewQueries: [{ propertyName: "nzSwitch", first: true, predicate: ["nzSwitch"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: `
    <nz-switch
      #nzSwitch
      [(ngModel)]="nzxValue"
      [nzCheckedChildren]="nzCheckedChildren"
      [nzUnCheckedChildren]="nzUnCheckedChildren"
      [nzDisabled]="nzDisabled"
      [nzSize]="nzSize"
      [nzLoading]="nzLoading"
      [nzControl]="nzControl"
      (ngModelChange)="ngModelChange($event)"
    ></nz-switch>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i2.NzSwitchComponent, selector: "nz-switch", inputs: ["nzLoading", "nzDisabled", "nzControl", "nzCheckedChildren", "nzUnCheckedChildren", "nzSize", "nzId"], exportAs: ["nzSwitch"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxSwitchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-switch',
                    template: `
    <nz-switch
      #nzSwitch
      [(ngModel)]="nzxValue"
      [nzCheckedChildren]="nzCheckedChildren"
      [nzUnCheckedChildren]="nzUnCheckedChildren"
      [nzDisabled]="nzDisabled"
      [nzSize]="nzSize"
      [nzLoading]="nzLoading"
      [nzControl]="nzControl"
      (ngModelChange)="ngModelChange($event)"
    ></nz-switch>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzxSwitchComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzSwitch: [{
                type: ViewChild,
                args: ['nzSwitch', { static: true }]
            }], nzxCheckedValue: [{
                type: Input
            }], nzxUnCheckedValue: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzControl: [{
                type: Input
            }], nzCheckedChildren: [{
                type: Input
            }], nzUnCheckedChildren: [{
                type: Input
            }], nzSize: [{
                type: Input
            }] } });

class NzxSwitchModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxSwitchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxSwitchModule, declarations: [NzxSwitchComponent], imports: [CommonModule, FormsModule, NzSwitchModule], exports: [NzxSwitchComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxSwitchModule, imports: [CommonModule, FormsModule, NzSwitchModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxSwitchModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxSwitchComponent],
                    imports: [CommonModule, FormsModule, NzSwitchModule],
                    exports: [NzxSwitchComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxSwitchComponent, NzxSwitchModule };
//# sourceMappingURL=xmagic-nzx-antd-switch.mjs.map
