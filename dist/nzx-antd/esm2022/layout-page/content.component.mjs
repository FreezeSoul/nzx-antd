import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NzxContentComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbGF5b3V0LXBhZ2UvY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDOztBQVN0RSxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOztPQUVHO0lBQ00scUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQ3RDOztPQUVHO0lBQ00sTUFBTSxDQUFVO0lBQ3pCOztPQUVHO0lBQ00sU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUU1QixJQUFnRCxrQkFBa0I7UUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsSUFBaUMsYUFBYTtRQUM1QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQXFDLGdCQUFnQjtRQUNuRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELGdCQUFlLENBQUM7d0dBdkJMLG1CQUFtQjs0RkFBbkIsbUJBQW1CLGtXQUxwQiwyQkFBMkI7OzRGQUsxQixtQkFBbUI7a0JBUC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLElBQUksRUFBRTt3QkFDSiwwQkFBMEIsRUFBRSxNQUFNO3FCQUNuQztpQkFDRjswRUFLVSxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBSUcsTUFBTTtzQkFBZCxLQUFLO2dCQUlHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRTBDLGtCQUFrQjtzQkFBakUsV0FBVzt1QkFBQyw2QkFBNkI7Z0JBR1QsYUFBYTtzQkFBN0MsV0FBVzt1QkFBQyxjQUFjO2dCQUdVLGdCQUFnQjtzQkFBcEQsV0FBVzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC1jb250ZW50JyxcclxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3Mubnp4LXBhZ2UtY29udGVudF0nOiAndHJ1ZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhDb250ZW50Q29tcG9uZW50IHtcclxuICAvKipcclxuICAgKiDmmL7npLrpqozor4HljaDkvY3nrKYo5piv5ZCm5pi+56S6Zm9ybS1pdGVt5bqV6YOo55qE56m655m9KVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvcm1JdGVtQm90dG9tVmlzaWJsZSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICogbWFyZ2luXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFyZ2luPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIG1hcmdpbiB0b3BcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXJnaW5Ub3AgPSAnMTBweCc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGlkZS1mb3JtLWl0ZW0tYm90dG9tJykgZ2V0IGhpZGVGb3JtSXRlbUJvdHRvbSgpIHtcclxuICAgIHJldHVybiAhdGhpcy5mb3JtSXRlbUJvdHRvbVZpc2libGU7XHJcbiAgfVxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luJykgZ2V0IGNvbnRlbnRNYXJnaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXJnaW47XHJcbiAgfVxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luLXRvcCcpIGdldCBjb250ZW50TWFyZ2luVG9wKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWFyZ2luVG9wO1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19