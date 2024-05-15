import { Directive, Input } from '@angular/core';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./table-widget.service";
export class TableWidgetDirective {
    widgetService;
    viewContainerRef;
    renderer;
    row = {};
    indexAttr;
    colIndex;
    column;
    nzData = [];
    nzPageData = [];
    widget;
    constructor(widgetService, viewContainerRef, renderer) {
        this.widgetService = widgetService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.viewContainerRef.clear();
        if (!this.widget) {
            return;
        }
        const componentType = this.widgetService.get(this.widget.type);
        if (!componentType) {
            console.warn(`组件类型“${this.widget.type}”未注册`);
            return;
        }
        const params = {
            row: this.row,
            nzData: this.nzData,
            nzPageData: this.nzPageData,
            column: this.column,
            indexAttr: this.indexAttr,
            colIndex: this.colIndex
        };
        const componentRef = this.viewContainerRef.createComponent(componentType);
        const callbackParams = {
            instance: componentRef.instance,
            componentRef,
            ...params
        };
        const result = NzxUtils.isFunction(this.widget.props)
            ? resolveType(this.widget.props(this.row, params))
            : resolveType(this.widget.props);
        result.subscribe((props) => {
            console.log(props);
            const values = Object.assign(params, { props }, props);
            Object.assign(componentRef.instance, values);
            for (const key in values) {
                // eslint-disable-next-line
                // @ts-ignore
                const tNode = componentRef._tNode;
                // 检查属性是否有属于inputs, _tNode是私有属性，不应该直接访问，所以做个检查，对实际运行不影响
                if (tNode && tNode.inputs && tNode.inputs[key]) {
                    componentRef.setInput(key, values[key]);
                }
                else {
                    componentRef.instance[key] = values[key];
                }
            }
            this.widget.onInit?.(callbackParams);
        });
        this.mergeElementProperty(componentRef, params);
        if (this.widget.onDestroy) {
            componentRef.onDestroy(() => this.widget.onDestroy({
                ...callbackParams
            }));
        }
    }
    mergeElementProperty(componentRef, params) {
        const element = componentRef.location.nativeElement;
        if (this.widget.style) {
            Object.assign(element.style, this.widget.style);
        }
        if (this.widget.className) {
            element.className = this.widget.className;
        }
        if (this.widget.click) {
            this.renderer.listen(element, 'click', (event) => this.widget.click(this.row, params, event));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetDirective, deps: [{ token: i1.TableWidgetService }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TableWidgetDirective, selector: "[table-widget]", inputs: { row: "row", indexAttr: "indexAttr", colIndex: "colIndex", column: "column", nzData: "nzData", nzPageData: "nzPageData", widget: "widget" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[table-widget]'
                }]
        }], ctorParameters: function () { return [{ type: i1.TableWidgetService }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }]; }, propDecorators: { row: [{
                type: Input
            }], indexAttr: [{
                type: Input
            }], colIndex: [{
                type: Input
            }], column: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzPageData: [{
                type: Input
            }], widget: [{
                type: Input
            }] } });
function resolveType(type) {
    if (!type) {
        return of({});
    }
    if (NzxUtils.isObservable(type) || NzxUtils.isPromise(type)) {
        return type;
    }
    return of(type);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd2lkZ2V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS13aWRnZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFHcEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUsxQixNQUFNLE9BQU8sb0JBQW9CO0lBV3JCO0lBQ0E7SUFDQTtJQVpELEdBQUcsR0FBTSxFQUFPLENBQUM7SUFDakIsU0FBUyxDQUFhO0lBQ3RCLFFBQVEsQ0FBYTtJQUNyQixNQUFNLENBQWdCO0lBQ3RCLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDakIsVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUVyQixNQUFNLENBQWdCO0lBRS9CLFlBQ1UsYUFBaUMsRUFDakMsZ0JBQWtDLEVBQ2xDLFFBQW1CO1FBRm5CLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDMUIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7WUFDN0Ms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Q0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RztJQUNILENBQUM7d0dBaEdVLG9CQUFvQjs0RkFBcEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUhoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2dLQUVVLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSzs7QUEyRlIsU0FBUyxXQUFXLENBQUksSUFBTztJQUM3QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZjtJQUNELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmRleEF0dHIsIE56eENvbHVtbiwgTnp4V2lkZ2V0IH0gZnJvbSAnLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgVGFibGVXaWRnZXRTZXJ2aWNlIH0gZnJvbSAnLi90YWJsZS13aWRnZXQuc2VydmljZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3RhYmxlLXdpZGdldF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZVdpZGdldERpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcm93OiBUID0ge30gYXMgVDtcclxuICBASW5wdXQoKSBpbmRleEF0dHIhOiBJbmRleEF0dHI7XHJcbiAgQElucHV0KCkgY29sSW5kZXghOiBJbmRleEF0dHI7XHJcbiAgQElucHV0KCkgY29sdW1uITogTnp4Q29sdW1uPFQ+O1xyXG4gIEBJbnB1dCgpIG56RGF0YTogVFtdID0gW107XHJcbiAgQElucHV0KCkgbnpQYWdlRGF0YTogVFtdID0gW107XHJcblxyXG4gIEBJbnB1dCgpIHdpZGdldCE6IE56eFdpZGdldDxUPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHdpZGdldFNlcnZpY2U6IFRhYmxlV2lkZ2V0U2VydmljZSxcclxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuICAgIGlmICghdGhpcy53aWRnZXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29tcG9uZW50VHlwZSA9IHRoaXMud2lkZ2V0U2VydmljZS5nZXQodGhpcy53aWRnZXQudHlwZSk7XHJcbiAgICBpZiAoIWNvbXBvbmVudFR5cGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKGDnu4Tku7bnsbvlnovigJwke3RoaXMud2lkZ2V0LnR5cGV94oCd5pyq5rOo5YaMYCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgIG56RGF0YTogdGhpcy5uekRhdGEsXHJcbiAgICAgIG56UGFnZURhdGE6IHRoaXMubnpQYWdlRGF0YSxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgaW5kZXhBdHRyOiB0aGlzLmluZGV4QXR0cixcclxuICAgICAgY29sSW5kZXg6IHRoaXMuY29sSW5kZXhcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRUeXBlKTtcclxuICAgIGNvbnN0IGNhbGxiYWNrUGFyYW1zID0ge1xyXG4gICAgICBpbnN0YW5jZTogY29tcG9uZW50UmVmLmluc3RhbmNlLFxyXG4gICAgICBjb21wb25lbnRSZWYsXHJcbiAgICAgIC4uLnBhcmFtc1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBOenhVdGlscy5pc0Z1bmN0aW9uKHRoaXMud2lkZ2V0LnByb3BzKVxyXG4gICAgICA/IHJlc29sdmVUeXBlKHRoaXMud2lkZ2V0LnByb3BzKHRoaXMucm93LCBwYXJhbXMpKVxyXG4gICAgICA6IHJlc29sdmVUeXBlKHRoaXMud2lkZ2V0LnByb3BzKTtcclxuICAgIHJlc3VsdC5zdWJzY3JpYmUoKHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHByb3BzKTtcclxuICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHsgcHJvcHMgfSwgcHJvcHMpO1xyXG4gICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdmFsdWVzKTtcclxuXHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbHVlcykge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBjb25zdCB0Tm9kZSA9IGNvbXBvbmVudFJlZi5fdE5vZGU7XHJcbiAgICAgICAgLy8g5qOA5p+l5bGe5oCn5piv5ZCm5pyJ5bGe5LqOaW5wdXRzLCBfdE5vZGXmmK/np4HmnInlsZ7mgKfvvIzkuI3lupTor6Xnm7TmjqXorr/pl67vvIzmiYDku6XlgZrkuKrmo4Dmn6XvvIzlr7nlrp7pmYXov5DooYzkuI3lvbHlk41cclxuICAgICAgICBpZiAodE5vZGUgJiYgdE5vZGUuaW5wdXRzICYmIHROb2RlLmlucHV0c1trZXldKSB7XHJcbiAgICAgICAgICBjb21wb25lbnRSZWYuc2V0SW5wdXQoa2V5LCB2YWx1ZXNba2V5XSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtrZXldID0gdmFsdWVzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMud2lkZ2V0Lm9uSW5pdD8uKGNhbGxiYWNrUGFyYW1zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWVyZ2VFbGVtZW50UHJvcGVydHkoY29tcG9uZW50UmVmLCBwYXJhbXMpO1xyXG4gICAgaWYgKHRoaXMud2lkZ2V0Lm9uRGVzdHJveSkge1xyXG4gICAgICBjb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+XHJcbiAgICAgICAgdGhpcy53aWRnZXQub25EZXN0cm95ISh7XHJcbiAgICAgICAgICAuLi5jYWxsYmFja1BhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1lcmdlRWxlbWVudFByb3BlcnR5KFxyXG4gICAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PixcclxuICAgIHBhcmFtczoge1xyXG4gICAgICBpbmRleEF0dHI6IEluZGV4QXR0cjtcclxuICAgICAgY29sdW1uOiBOenhDb2x1bW48VD47XHJcbiAgICAgIGNvbEluZGV4OiBJbmRleEF0dHI7XHJcbiAgICAgIG56RGF0YTogVFtdO1xyXG4gICAgICByb3c6IFQ7XHJcbiAgICAgIG56UGFnZURhdGE6IFRbXTtcclxuICAgIH1cclxuICApIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcclxuICAgIGlmICh0aGlzLndpZGdldC5zdHlsZSkge1xyXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHRoaXMud2lkZ2V0LnN0eWxlKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLndpZGdldC5jbGFzc05hbWUpIHtcclxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLndpZGdldC5jbGFzc05hbWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy53aWRnZXQuY2xpY2spIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB0aGlzLndpZGdldC5jbGljayEodGhpcy5yb3csIHBhcmFtcywgZXZlbnQpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVUeXBlPFQ+KHR5cGU6IFQpIHtcclxuICBpZiAoIXR5cGUpIHtcclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG4gIGlmIChOenhVdGlscy5pc09ic2VydmFibGUodHlwZSkgfHwgTnp4VXRpbHMuaXNQcm9taXNlKHR5cGUpKSB7XHJcbiAgICByZXR1cm4gdHlwZTtcclxuICB9XHJcbiAgcmV0dXJuIG9mKHR5cGUpO1xyXG59XHJcbiJdfQ==