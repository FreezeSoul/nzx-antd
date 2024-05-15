import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/input";
/**
 * 包含开始和结束两个控件，子组件使用`start`和`end`属性来插入到对应的容易内。
 */
export class NzxBetweenComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvYmV0d2Vlbi9iZXR3ZWVuLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuL2JldHdlZW4uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUc3Rjs7R0FFRztBQVNILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7O09BRUc7SUFDTSxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzdCOztPQUVHO0lBQ00sT0FBTyxHQUFrQixTQUFTLENBQUM7SUFDNUM7O09BRUc7SUFDTSxnQkFBZ0IsQ0FBVztJQUNwQzs7T0FFRztJQUNNLGNBQWMsQ0FBVztJQUNsQyxnQkFBZSxDQUFDO3dHQWpCTCxtQkFBbUI7NEZBQW5CLG1CQUFtQixpTkNkaEMsa1pBVUE7OzRGRElhLG1CQUFtQjtrQkFSL0IsU0FBUzsrQkFDRSxhQUFhLFlBQ2IsWUFBWSx1QkFFRCxLQUFLLGlCQUNYLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07MEVBTXRDLFdBQVc7c0JBQW5CLEtBQUs7Z0JBSUcsT0FBTztzQkFBZixLQUFLO2dCQUlHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFJRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2l6ZUxEU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIOWMheWQq+W8gOWni+WSjOe7k+adn+S4pOS4quaOp+S7tu+8jOWtkOe7hOS7tuS9v+eUqGBzdGFydGDlkoxgZW5kYOWxnuaAp+adpeaPkuWFpeWIsOWvueW6lOeahOWuueaYk+WGheOAglxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtYmV0d2VlbicsXHJcbiAgZXhwb3J0QXM6ICduenhCZXR3ZWVuJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYmV0d2Vlbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4QmV0d2VlbkNvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm56aB55SoXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RGlzYWJsZWQgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDmjqfku7blpKflsI9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xyXG4gIC8qKlxyXG4gICAqIOW8gOWni+Wtl+auteemgeeUqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0RGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOe7k+adn+Wtl+auteemgeeUqFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZERpc2FibGVkPzogYm9vbGVhbjtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiPG56LWlucHV0LWdyb3VwXHJcbiAgbnpDb21wYWN0XHJcbiAgY2xhc3M9XCJuengtYmV0d2VlblwiXHJcbiAgW2NsYXNzLm56eC1iZXR3ZWVuLWRpc2FibGVkXT1cIm56eERpc2FibGVkIHx8IChuenhTdGFydERpc2FibGVkICYmIG56eEVuZERpc2FibGVkKVwiXHJcbiAgW256U2l6ZV09XCJuenhTaXplXCJcclxuPlxyXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIltzdGFydF1cIj48L25nLWNvbnRlbnQ+XHJcbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgbnotaW5wdXQgcGxhY2Vob2xkZXI9XCJ+XCIgY2xhc3M9XCJuengtYmV0d2Vlbi1wbGFjZWhvbGRlclwiIC8+XHJcbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2VuZF1cIj48L25nLWNvbnRlbnQ+XHJcbjwvbnotaW5wdXQtZ3JvdXA+XHJcbiJdfQ==