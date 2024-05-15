import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@freezesoul/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zd2l0Y2gvc3dpdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBMkJ4RCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBc0I7SUFvQ3hDO0lBbkNxQixRQUFRLENBQXFCO0lBQ3RFLFFBQVEsQ0FBVztJQUNuQjs7T0FFRztJQUNNLGVBQWUsR0FBYyxJQUFJLENBQUM7SUFDM0M7O09BRUc7SUFDTSxpQkFBaUIsR0FBYyxLQUFLLENBQUM7SUFDOUM7O09BRUc7SUFDTSxVQUFVLENBQVc7SUFDOUI7O09BRUc7SUFDTSxTQUFTLENBQVc7SUFDN0I7O09BRUc7SUFDTSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCOztPQUVHO0lBQ00saUJBQWlCLENBQThCO0lBQ3hEOztPQUVHO0lBQ00sbUJBQW1CLENBQThCO0lBQzFEOztPQUVHO0lBQ00sTUFBTSxDQUFnQjtJQUUvQixZQUFvQixHQUFzQjtRQUN4QyxLQUFLLEVBQUUsQ0FBQztRQURVLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBRTFDLENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVk7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBdUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFUSxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7d0dBNURVLGtCQUFrQjs0RkFBbEIsa0JBQWtCLDZTQVJsQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixxS0FwQlM7Ozs7Ozs7Ozs7OztHQVlUOzs0RkFVVSxrQkFBa0I7a0JBeEI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7NEJBQ2pELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGO3dHQUUwQyxRQUFRO3NCQUFoRCxTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBSzlCLGVBQWU7c0JBQXZCLEtBQUs7Z0JBSUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSUcsU0FBUztzQkFBakIsS0FBSztnQkFJRyxTQUFTO3NCQUFqQixLQUFLO2dCQUlHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFJRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBSUcsTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSwgTnpTaXplRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpTd2l0Y2hDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL3N3aXRjaCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC1zd2l0Y2gnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bnotc3dpdGNoXHJcbiAgICAgICNuelN3aXRjaFxyXG4gICAgICBbKG5nTW9kZWwpXT1cIm56eFZhbHVlXCJcclxuICAgICAgW256Q2hlY2tlZENoaWxkcmVuXT1cIm56Q2hlY2tlZENoaWxkcmVuXCJcclxuICAgICAgW256VW5DaGVja2VkQ2hpbGRyZW5dPVwibnpVbkNoZWNrZWRDaGlsZHJlblwiXHJcbiAgICAgIFtuekRpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxyXG4gICAgICBbbnpTaXplXT1cIm56U2l6ZVwiXHJcbiAgICAgIFtuekxvYWRpbmddPVwibnpMb2FkaW5nXCJcclxuICAgICAgW256Q29udHJvbF09XCJuekNvbnRyb2xcIlxyXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJuZ01vZGVsQ2hhbmdlKCRldmVudClcIlxyXG4gICAgPjwvbnotc3dpdGNoPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOenhTd2l0Y2hDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eFN3aXRjaENvbXBvbmVudCBleHRlbmRzIEJhc2VDb250cm9sPE56U2FmZUFueT4gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnbnpTd2l0Y2gnLCB7IHN0YXRpYzogdHJ1ZSB9KSBuelN3aXRjaCE6IE56U3dpdGNoQ29tcG9uZW50O1xyXG4gIG56eFZhbHVlITogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDpgInkuK3ml7bnmoTlgLxcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhDaGVja2VkVmFsdWU6IE56U2FmZUFueSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog6Z2e6YCJ5Lit5pe255qE5YC8XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VW5DaGVja2VkVmFsdWU6IE56U2FmZUFueSA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIFx0ZGlzYWJsZSDnirbmgIFcclxuICAgKi9cclxuICBASW5wdXQoKSBuekRpc2FibGVkPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBcdOWKoOi9veS4reeahOW8gOWFs1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56TG9hZGluZz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogXHTmmK/lkKblrozlhajnlLHnlKjmiLfmjqfliLbnirbmgIEsIFN3aXRjaCDnmoTnirbmgIHlrozlhajnlLHnlKjmiLfmjqXnrqHvvIzkuI3lho3oh6rliqjmoLnmja7ngrnlh7vkuovku7bmlLnlj5jmlbDmja7jgIJcclxuICAgKi9cclxuICBASW5wdXQoKSBuekNvbnRyb2wgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDpgInkuK3ml7bnmoTlhoXlrrlcclxuICAgKi9cclxuICBASW5wdXQoKSBuekNoZWNrZWRDaGlsZHJlbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xyXG4gIC8qKlxyXG4gICAqIOmdnumAieS4reaXtueahOWGheWuuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56VW5DaGVja2VkQ2hpbGRyZW4/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcclxuICAvKipcclxuICAgKiDlvIDlhbPlpKflsI9cclxuICAgKi9cclxuICBASW5wdXQoKSBuelNpemU/OiBOelNpemVEU1R5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRvdWNoZWQgPSB0aGlzLm56U3dpdGNoLm9uVG91Y2hlZDtcclxuICAgIHRoaXMubnpTd2l0Y2gub25Ub3VjaGVkID0gKCkgPT4ge1xyXG4gICAgICB0b3VjaGVkLmNhbGwodGhpcy5uelN3aXRjaCk7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdNb2RlbENoYW5nZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub25DaGFuZ2UodmFsID8gdGhpcy5uenhDaGVja2VkVmFsdWUgOiB0aGlzLm56eFVuQ2hlY2tlZFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IE56U2FmZUFueSB8IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMubnp4VmFsdWUgPSB2YWx1ZSA9PT0gdGhpcy5uenhDaGVja2VkVmFsdWU7XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5uekRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=