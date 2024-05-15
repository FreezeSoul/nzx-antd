import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 允许在模板内复用计算值（包含异步），避免重复重新计算。
 * @example
 *
 * <div *let="value1 as v">
 *   <p>{{ v }}</p>
 * </div>
 * <div *let="time$ | async as time">
 *   <p>{{ time }}</p>
 * </div>
 */
export class LetDirective {
    let;
    constructor(vc, ref) {
        vc.createEmbeddedView(ref, new LetContext(this));
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LetDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: LetDirective, selector: "[let]", inputs: { let: "let" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LetDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[let]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { let: [{
                type: Input
            }] } });
export class LetContext {
    directive;
    constructor(directive) {
        this.directive = directive;
    }
    get $implicit() {
        return this.directive.let;
    }
    get let() {
        return this.directive.let;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9kaXJlY3RpdmUvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUd4Rjs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFDZCxHQUFHLENBQUs7SUFFakIsWUFBc0MsRUFBb0IsRUFBdUIsR0FBK0I7UUFDOUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLFVBQVUsQ0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxNQUFNLENBQUMsc0JBQXNCLENBQUksSUFBcUIsRUFBRSxJQUFlO1FBQ3JFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzt3R0FUVSxZQUFZLGtCQUdILGdCQUFnQixhQUFnQyxXQUFXOzRGQUhwRSxZQUFZOzs0RkFBWixZQUFZO2tCQUR4QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTs7MEJBSWpCLE1BQU07MkJBQUMsZ0JBQWdCOzswQkFBeUIsTUFBTTsyQkFBQyxXQUFXOzRDQUZ0RSxHQUFHO3NCQUFYLEtBQUs7O0FBV1IsTUFBTSxPQUFPLFVBQVU7SUFDUTtJQUE3QixZQUE2QixTQUEwQjtRQUExQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtJQUFHLENBQUM7SUFFM0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG4vKipcclxuICog5YWB6K645Zyo5qih5p2/5YaF5aSN55So6K6h566X5YC877yI5YyF5ZCr5byC5q2l77yJ77yM6YG/5YWN6YeN5aSN6YeN5paw6K6h566X44CCXHJcbiAqIEBleGFtcGxlXHJcbiAqXHJcbiAqIDxkaXYgKmxldD1cInZhbHVlMSBhcyB2XCI+XHJcbiAqICAgPHA+e3sgdiB9fTwvcD5cclxuICogPC9kaXY+XHJcbiAqIDxkaXYgKmxldD1cInRpbWUkIHwgYXN5bmMgYXMgdGltZVwiPlxyXG4gKiAgIDxwPnt7IHRpbWUgfX08L3A+XHJcbiAqIDwvZGl2PlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2xldF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8VD4ge1xyXG4gIEBJbnB1dCgpIGxldCE6IFQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoVmlld0NvbnRhaW5lclJlZikgdmM6IFZpZXdDb250YWluZXJSZWYsIEBJbmplY3QoVGVtcGxhdGVSZWYpIHJlZjogVGVtcGxhdGVSZWY8TGV0Q29udGV4dDxUPj4pIHtcclxuICAgIHZjLmNyZWF0ZUVtYmVkZGVkVmlldyhyZWYsIG5ldyBMZXRDb250ZXh0PFQ+KHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBuZ1RlbXBsYXRlQ29udGV4dEd1YXJkPFQ+KF9kaXI6IExldERpcmVjdGl2ZTxUPiwgX2N0eDogTnpTYWZlQW55KTogX2N0eCBpcyBMZXREaXJlY3RpdmU8VD4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGV0Q29udGV4dDxUPiB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkaXJlY3RpdmU6IExldERpcmVjdGl2ZTxUPikge31cclxuXHJcbiAgZ2V0ICRpbXBsaWNpdCgpOiBUIHtcclxuICAgIHJldHVybiB0aGlzLmRpcmVjdGl2ZS5sZXQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbGV0KCk6IFQge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlLmxldDtcclxuICB9XHJcbn1cclxuIl19