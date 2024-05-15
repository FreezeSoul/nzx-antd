import { Directive, Input } from '@angular/core';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd2lkZ2V0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS13aWRnZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFHcEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUsxQixNQUFNLE9BQU8sb0JBQW9CO0lBV3JCO0lBQ0E7SUFDQTtJQVpELEdBQUcsR0FBTSxFQUFPLENBQUM7SUFDakIsU0FBUyxDQUFhO0lBQ3RCLFFBQVEsQ0FBYTtJQUNyQixNQUFNLENBQWdCO0lBQ3RCLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDakIsVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUVyQixNQUFNLENBQWdCO0lBRS9CLFlBQ1UsYUFBaUMsRUFDakMsZ0JBQWtDLEVBQ2xDLFFBQW1CO1FBRm5CLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDMUIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7WUFDN0Ms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Q0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RztJQUNILENBQUM7d0dBaEdVLG9CQUFvQjs0RkFBcEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQUhoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2dLQUVVLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSzs7QUEyRlIsU0FBUyxXQUFXLENBQUksSUFBTztJQUM3QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZjtJQUNELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmRleEF0dHIsIE56eENvbHVtbiwgTnp4V2lkZ2V0IH0gZnJvbSAnLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgVGFibGVXaWRnZXRTZXJ2aWNlIH0gZnJvbSAnLi90YWJsZS13aWRnZXQuc2VydmljZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1t0YWJsZS13aWRnZXRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVXaWRnZXREaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJvdzogVCA9IHt9IGFzIFQ7XHJcbiAgQElucHV0KCkgaW5kZXhBdHRyITogSW5kZXhBdHRyO1xyXG4gIEBJbnB1dCgpIGNvbEluZGV4ITogSW5kZXhBdHRyO1xyXG4gIEBJbnB1dCgpIGNvbHVtbiE6IE56eENvbHVtbjxUPjtcclxuICBASW5wdXQoKSBuekRhdGE6IFRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIG56UGFnZURhdGE6IFRbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKSB3aWRnZXQhOiBOenhXaWRnZXQ8VD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB3aWRnZXRTZXJ2aWNlOiBUYWJsZVdpZGdldFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcbiAgICBpZiAoIXRoaXMud2lkZ2V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbXBvbmVudFR5cGUgPSB0aGlzLndpZGdldFNlcnZpY2UuZ2V0KHRoaXMud2lkZ2V0LnR5cGUpO1xyXG4gICAgaWYgKCFjb21wb25lbnRUeXBlKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybihg57uE5Lu257G75Z6L4oCcJHt0aGlzLndpZGdldC50eXBlfeKAneacquazqOWGjGApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBuekRhdGE6IHRoaXMubnpEYXRhLFxyXG4gICAgICBuelBhZ2VEYXRhOiB0aGlzLm56UGFnZURhdGEsXHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIGluZGV4QXR0cjogdGhpcy5pbmRleEF0dHIsXHJcbiAgICAgIGNvbEluZGV4OiB0aGlzLmNvbEluZGV4XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50VHlwZSk7XHJcbiAgICBjb25zdCBjYWxsYmFja1BhcmFtcyA9IHtcclxuICAgICAgaW5zdGFuY2U6IGNvbXBvbmVudFJlZi5pbnN0YW5jZSxcclxuICAgICAgY29tcG9uZW50UmVmLFxyXG4gICAgICAuLi5wYXJhbXNcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gTnp4VXRpbHMuaXNGdW5jdGlvbih0aGlzLndpZGdldC5wcm9wcylcclxuICAgICAgPyByZXNvbHZlVHlwZSh0aGlzLndpZGdldC5wcm9wcyh0aGlzLnJvdywgcGFyYW1zKSlcclxuICAgICAgOiByZXNvbHZlVHlwZSh0aGlzLndpZGdldC5wcm9wcyk7XHJcbiAgICByZXN1bHQuc3Vic2NyaWJlKChwcm9wczogUmVjb3JkPHN0cmluZywgYW55PikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhwcm9wcyk7XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24ocGFyYW1zLCB7IHByb3BzIH0sIHByb3BzKTtcclxuICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnRSZWYuaW5zdGFuY2UsIHZhbHVlcyk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZXMpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgdE5vZGUgPSBjb21wb25lbnRSZWYuX3ROb2RlO1xyXG4gICAgICAgIC8vIOajgOafpeWxnuaAp+aYr+WQpuacieWxnuS6jmlucHV0cywgX3ROb2Rl5piv56eB5pyJ5bGe5oCn77yM5LiN5bqU6K+l55u05o6l6K6/6Zeu77yM5omA5Lul5YGa5Liq5qOA5p+l77yM5a+55a6e6ZmF6L+Q6KGM5LiN5b2x5ZONXHJcbiAgICAgICAgaWYgKHROb2RlICYmIHROb2RlLmlucHV0cyAmJiB0Tm9kZS5pbnB1dHNba2V5XSkge1xyXG4gICAgICAgICAgY29tcG9uZW50UmVmLnNldElucHV0KGtleSwgdmFsdWVzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Vba2V5XSA9IHZhbHVlc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLndpZGdldC5vbkluaXQ/LihjYWxsYmFja1BhcmFtcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1lcmdlRWxlbWVudFByb3BlcnR5KGNvbXBvbmVudFJlZiwgcGFyYW1zKTtcclxuICAgIGlmICh0aGlzLndpZGdldC5vbkRlc3Ryb3kpIHtcclxuICAgICAgY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PlxyXG4gICAgICAgIHRoaXMud2lkZ2V0Lm9uRGVzdHJveSEoe1xyXG4gICAgICAgICAgLi4uY2FsbGJhY2tQYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtZXJnZUVsZW1lbnRQcm9wZXJ0eShcclxuICAgIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4sXHJcbiAgICBwYXJhbXM6IHtcclxuICAgICAgaW5kZXhBdHRyOiBJbmRleEF0dHI7XHJcbiAgICAgIGNvbHVtbjogTnp4Q29sdW1uPFQ+O1xyXG4gICAgICBjb2xJbmRleDogSW5kZXhBdHRyO1xyXG4gICAgICBuekRhdGE6IFRbXTtcclxuICAgICAgcm93OiBUO1xyXG4gICAgICBuelBhZ2VEYXRhOiBUW107XHJcbiAgICB9XHJcbiAgKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAodGhpcy53aWRnZXQuc3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCB0aGlzLndpZGdldC5zdHlsZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy53aWRnZXQuY2xhc3NOYW1lKSB7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy53aWRnZXQuY2xhc3NOYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMud2lkZ2V0LmNsaWNrKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy53aWRnZXQuY2xpY2shKHRoaXMucm93LCBwYXJhbXMsIGV2ZW50KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlVHlwZTxUPih0eXBlOiBUKSB7XHJcbiAgaWYgKCF0eXBlKSB7XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxuICBpZiAoTnp4VXRpbHMuaXNPYnNlcnZhYmxlKHR5cGUpIHx8IE56eFV0aWxzLmlzUHJvbWlzZSh0eXBlKSkge1xyXG4gICAgcmV0dXJuIHR5cGU7XHJcbiAgfVxyXG4gIHJldHVybiBvZih0eXBlKTtcclxufVxyXG4iXX0=