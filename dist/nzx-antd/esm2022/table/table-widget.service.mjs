import { Injectable, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const TABLE_WIDGET = new InjectionToken('TABLE_WIDGET');
export class TableWidgetService {
    widgetMap = {};
    get widgets() {
        return this.widgetMap;
    }
    register(widgets) {
        if (!widgets?.length) {
            return;
        }
        for (const widget of widgets) {
            this.widgetMap[widget.name] = widget.component;
        }
    }
    has(type) {
        return Object.hasOwn(this.widgetMap, type);
    }
    get(type) {
        return this.widgetMap[type];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd2lkZ2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdGFibGUvdGFibGUtd2lkZ2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQVEsTUFBTSxlQUFlLENBQUM7O0FBRWpFLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsY0FBYyxDQUFDLENBQUM7QUFZOUUsTUFBTSxPQUFPLGtCQUFrQjtJQUNyQixTQUFTLEdBQW1CLEVBQUUsQ0FBQztJQUV2QyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUF1QjtRQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZO1FBQ2QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7d0dBdkJVLGtCQUFrQjs0R0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzRGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRBQkxFX1dJREdFVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxUYWJsZVdpZGdldFtdPignVEFCTEVfV0lER0VUJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlV2lkZ2V0IHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgY29tcG9uZW50OiBUeXBlPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRhYmxlV2lkZ2V0TWFwID0gUmVjb3JkPHN0cmluZywgVHlwZTxhbnk+PjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlV2lkZ2V0U2VydmljZSB7XHJcbiAgcHJpdmF0ZSB3aWRnZXRNYXA6IFRhYmxlV2lkZ2V0TWFwID0ge307XHJcblxyXG4gIGdldCB3aWRnZXRzKCk6IFRhYmxlV2lkZ2V0TWFwIHtcclxuICAgIHJldHVybiB0aGlzLndpZGdldE1hcDtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyKHdpZGdldHM/OiBUYWJsZVdpZGdldFtdKTogdm9pZCB7XHJcbiAgICBpZiAoIXdpZGdldHM/Lmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCB3aWRnZXQgb2Ygd2lkZ2V0cykge1xyXG4gICAgICB0aGlzLndpZGdldE1hcFt3aWRnZXQubmFtZV0gPSB3aWRnZXQuY29tcG9uZW50O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIE9iamVjdC5oYXNPd24odGhpcy53aWRnZXRNYXAsIHR5cGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KHR5cGU6IHN0cmluZyk6IFR5cGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy53aWRnZXRNYXBbdHlwZV07XHJcbiAgfVxyXG59XHJcbiJdfQ==