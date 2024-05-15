import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "ng-zorro-antd/switch";
export class NzxSwitchComponent extends BaseControl {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBMkJwRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBc0I7SUFvQ3hDO0lBbkNxQixRQUFRLENBQXFCO0lBQ3RFLFFBQVEsQ0FBVztJQUNuQjs7T0FFRztJQUNNLGVBQWUsR0FBYyxJQUFJLENBQUM7SUFDM0M7O09BRUc7SUFDTSxpQkFBaUIsR0FBYyxLQUFLLENBQUM7SUFDOUM7O09BRUc7SUFDTSxVQUFVLENBQVc7SUFDOUI7O09BRUc7SUFDTSxTQUFTLENBQVc7SUFDN0I7O09BRUc7SUFDTSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCOztPQUVHO0lBQ00saUJBQWlCLENBQThCO0lBQ3hEOztPQUVHO0lBQ00sbUJBQW1CLENBQThCO0lBQzFEOztPQUVHO0lBQ00sTUFBTSxDQUFnQjtJQUUvQixZQUFvQixHQUFzQjtRQUN4QyxLQUFLLEVBQUUsQ0FBQztRQURVLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBRTFDLENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVk7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBdUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFUSxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7d0dBNURVLGtCQUFrQjs0RkFBbEIsa0JBQWtCLDZTQVJsQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixxS0FwQlM7Ozs7Ozs7Ozs7OztHQVlUOzs0RkFVVSxrQkFBa0I7a0JBeEI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7NEJBQ2pELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGO3dHQUUwQyxRQUFRO3NCQUFoRCxTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBSzlCLGVBQWU7c0JBQXZCLEtBQUs7Z0JBSUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSUcsU0FBUztzQkFBakIsS0FBSztnQkFJRyxTQUFTO3NCQUFqQixLQUFLO2dCQUlHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFJRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBSUcsTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSwgTnpTaXplRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBOelN3aXRjaENvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3dpdGNoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnp4LXN3aXRjaCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuei1zd2l0Y2hcclxuICAgICAgI256U3dpdGNoXHJcbiAgICAgIFsobmdNb2RlbCldPVwibnp4VmFsdWVcIlxyXG4gICAgICBbbnpDaGVja2VkQ2hpbGRyZW5dPVwibnpDaGVja2VkQ2hpbGRyZW5cIlxyXG4gICAgICBbbnpVbkNoZWNrZWRDaGlsZHJlbl09XCJuelVuQ2hlY2tlZENoaWxkcmVuXCJcclxuICAgICAgW256RGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXHJcbiAgICAgIFtuelNpemVdPVwibnpTaXplXCJcclxuICAgICAgW256TG9hZGluZ109XCJuekxvYWRpbmdcIlxyXG4gICAgICBbbnpDb250cm9sXT1cIm56Q29udHJvbFwiXHJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm5nTW9kZWxDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICA+PC9uei1zd2l0Y2g+XHJcbiAgYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56eFN3aXRjaENvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4U3dpdGNoQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbnRyb2w8TnpTYWZlQW55PiBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcclxuICBAVmlld0NoaWxkKCduelN3aXRjaCcsIHsgc3RhdGljOiB0cnVlIH0pIG56U3dpdGNoITogTnpTd2l0Y2hDb21wb25lbnQ7XHJcbiAgbnp4VmFsdWUhOiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOmAieS4reaXtueahOWAvFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eENoZWNrZWRWYWx1ZTogTnpTYWZlQW55ID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDpnZ7pgInkuK3ml7bnmoTlgLxcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhVbkNoZWNrZWRWYWx1ZTogTnpTYWZlQW55ID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICogXHRkaXNhYmxlIOeKtuaAgVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56RGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFx05Yqg6L295Lit55qE5byA5YWzXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpMb2FkaW5nPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBcdOaYr+WQpuWujOWFqOeUseeUqOaIt+aOp+WItueKtuaAgSwgU3dpdGNoIOeahOeKtuaAgeWujOWFqOeUseeUqOaIt+aOpeeuoe+8jOS4jeWGjeiHquWKqOagueaNrueCueWHu+S6i+S7tuaUueWPmOaVsOaNruOAglxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56Q29udHJvbCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOmAieS4reaXtueahOWGheWuuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56Q2hlY2tlZENoaWxkcmVuPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XHJcbiAgLyoqXHJcbiAgICog6Z2e6YCJ5Lit5pe255qE5YaF5a65XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpVbkNoZWNrZWRDaGlsZHJlbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xyXG4gIC8qKlxyXG4gICAqIOW8gOWFs+Wkp+Wwj1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56U2l6ZT86IE56U2l6ZURTVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdG91Y2hlZCA9IHRoaXMubnpTd2l0Y2gub25Ub3VjaGVkO1xyXG4gICAgdGhpcy5uelN3aXRjaC5vblRvdWNoZWQgPSAoKSA9PiB7XHJcbiAgICAgIHRvdWNoZWQuY2FsbCh0aGlzLm56U3dpdGNoKTtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ01vZGVsQ2hhbmdlKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vbkNoYW5nZSh2YWwgPyB0aGlzLm56eENoZWNrZWRWYWx1ZSA6IHRoaXMubnp4VW5DaGVja2VkVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogTnpTYWZlQW55IHwgbnVsbCk6IHZvaWQge1xyXG4gICAgdGhpcy5uenhWYWx1ZSA9IHZhbHVlID09PSB0aGlzLm56eENoZWNrZWRWYWx1ZTtcclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgb3ZlcnJpZGUgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==