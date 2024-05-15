import { Component, HostBinding, Input } from '@angular/core';
import { isContentEmpty } from './is-content-empty';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/observers";
export class NzxHeaderComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9sYXlvdXQtcGFnZS9oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQXVCcEQsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ25COztPQUVHO0lBQ00sU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQjs7T0FFRztJQUNNLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsSUFBZ0Qsa0JBQWtCO1FBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnQkFBZSxDQUFDO0lBRWhCLGNBQWMsQ0FBQyxPQUFvQjtRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7d0dBbEJVLGtCQUFrQjs0RkFBbEIsa0JBQWtCLDZPQW5CbkI7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7OzRGQUtVLGtCQUFrQjtrQkFyQjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0oseUJBQXlCLEVBQUUsTUFBTTtxQkFDbEM7aUJBQ0Y7MEVBTVUsU0FBUztzQkFBakIsS0FBSztnQkFJRyxjQUFjO3NCQUF0QixLQUFLO2dCQUMwQyxrQkFBa0I7c0JBQWpFLFdBQVc7dUJBQUMsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNDb250ZW50RW1wdHkgfSBmcm9tICcuL2lzLWNvbnRlbnQtZW1wdHknO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtaGVhZGVyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyX3Jvd1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXJfY29sXCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgICNkaXZFbGVtZW50XHJcbiAgICAgICAgKGNka09ic2VydmVDb250ZW50KT1cImNvbnRlbnRDaGFuZ2VkKGRpdkVsZW1lbnQpXCJcclxuICAgICAgICBbZGVib3VuY2VdPVwiMjAwXCJcclxuICAgICAgICBbY2xhc3MuaGVhZGVyLWNvbnRlbnQtd3JhcHBlcl09XCJoYXNDb250ZW50XCJcclxuICAgICAgPlxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltidXR0b25zXVwiPjwvbmctY29udGVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3Mubnp4LXBhZ2UtaGVhZGVyXSc6ICd0cnVlJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eEhlYWRlckNvbXBvbmVudCB7XHJcbiAgaGFzQ29udGVudCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOaYvuekuumqjOivgeWNoOS9jeespijmmK/lkKbmmL7npLpmb3JtLWl0ZW3lupXpg6jnmoTnqbrnmb0pXHJcbiAgICovXHJcbiAgQElucHV0KCkgaGFzQm90dG9tID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S65oyJ6ZKu5Yy65Z+fXHJcbiAgICovXHJcbiAgQElucHV0KCkgYnV0dG9uc1Zpc2libGUgPSB0cnVlO1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGlkZS1mb3JtLWl0ZW0tYm90dG9tJykgZ2V0IGhpZGVGb3JtSXRlbUJvdHRvbSgpIHtcclxuICAgIHJldHVybiAhdGhpcy5oYXNCb3R0b207XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGNvbnRlbnRDaGFuZ2VkKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0aGlzLmhhc0NvbnRlbnQgPSAhaXNDb250ZW50RW1wdHkoZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==