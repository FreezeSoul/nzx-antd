import { Pipe } from '@angular/core';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
export class FilterPipe {
    /**
     * Filter array
     *
     * 过滤数组
     */
    transform(array, matcher, searchText) {
        if (typeof matcher === 'string') {
            if (NzxUtils.isEmpty(searchText)) {
                return array;
            }
            // @ts-ignore
            const text = searchText.toLowerCase();
            return (array || []).filter(v => NzxUtils.get(v, matcher, '').toLowerCase().indexOf(text) !== -1);
        }
        return (array || []).filter(v => matcher(v));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, name: "filter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filter',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvcGlwZS9maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBTXJELE1BQU0sT0FBTyxVQUFVO0lBSXJCOzs7O09BSUc7SUFDSCxTQUFTLENBQWdCLEtBQVUsRUFBRSxPQUFvQyxFQUFFLFVBQW1CO1FBQzVGLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUVELGFBQWE7WUFDYixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkc7UUFDRCxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7d0dBcEJVLFVBQVU7c0dBQVYsVUFBVTs7NEZBQVYsVUFBVTtrQkFKdEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsSUFBSTtpQkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC91dGlsJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZmlsdGVyJyxcclxuICBwdXJlOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtPFQgPSBOelNhZmVBbnk+KGFycmF5OiBUW10sIG1hdGNoZXI6IHN0cmluZywgc2VhcmNoVGV4dD86IHN0cmluZyk6IFRbXTtcclxuICB0cmFuc2Zvcm08VCA9IE56U2FmZUFueT4oYXJyYXk6IFRbXSwgbWF0Y2hlcjogRmlsdGVyTWF0Y2hlckZuPFQ+KTogVFtdO1xyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYXJyYXlcclxuICAgKlxyXG4gICAqIOi/h+a7pOaVsOe7hFxyXG4gICAqL1xyXG4gIHRyYW5zZm9ybTxUID0gTnpTYWZlQW55PihhcnJheTogVFtdLCBtYXRjaGVyOiBGaWx0ZXJNYXRjaGVyRm48VD4gfCBzdHJpbmcsIHNlYXJjaFRleHQ/OiBzdHJpbmcpOiBUW10ge1xyXG4gICAgaWYgKHR5cGVvZiBtYXRjaGVyID09PSAnc3RyaW5nJykge1xyXG4gICAgICBpZiAoTnp4VXRpbHMuaXNFbXB0eShzZWFyY2hUZXh0KSkge1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBjb25zdCB0ZXh0ID0gc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICByZXR1cm4gKGFycmF5IHx8IFtdKS5maWx0ZXIodiA9PiBOenhVdGlscy5nZXQodiwgbWF0Y2hlciwgJycpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXh0KSAhPT0gLTEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChhcnJheSB8fCBbXSkuZmlsdGVyKHYgPT4gbWF0Y2hlcih2KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBGaWx0ZXJNYXRjaGVyRm48VD4gPSAoaXRlbTogVCkgPT4gYm9vbGVhbjtcclxuIl19