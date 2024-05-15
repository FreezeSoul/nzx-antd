import { Pipe } from '@angular/core';
import { from, map, of } from 'rxjs';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd/service";
/**
 * 把请求信息转换为异步对象
 */
export class ToAsyncPipe {
    fetcher;
    constructor(fetcher) {
        this.fetcher = fetcher;
    }
    /**
     * 转换为Observable
     * @param value 可以是url或者Observable, Promise
     * @param option 配置项
     */
    transform(value, option) {
        if (value == null) {
            return of(option?.defaultValue);
        }
        const opt = option || {};
        const mapFn = NzxUtils.isFunction(opt.map) ? opt.map : (data) => data;
        if (typeof value === 'string') {
            return this.fetcher.fetch({ ...opt, url: value }).pipe(map(v => NzxUtils.defaultIfy(v, option?.defaultValue)), map(mapFn));
        }
        if (NzxUtils.isPromise(value) || NzxUtils.isObservable(value)) {
            return from(value).pipe(map(v => NzxUtils.defaultIfy(v, option?.defaultValue)), map(mapFn));
        }
        return of(value).pipe(map(mapFn));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToAsyncPipe, deps: [{ token: i1.FetcherService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToAsyncPipe, name: "toAsync" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToAsyncPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toAsync',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.FetcherService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tYXN5bmMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9waXBlL3RvLWFzeW5jLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBR2pEOztHQUVHO0FBS0gsTUFBTSxPQUFPLFdBQVc7SUFDRjtJQUFwQixZQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFL0M7Ozs7T0FJRztJQUNILFNBQVMsQ0FDUCxLQUE4QyxFQUM5QyxNQUFvQjtRQUVwQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQWlCLENBQUMsQ0FBQztTQUN0QztRQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSyxFQUFrQixDQUFDO1FBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQU8sRUFBRSxFQUFFLENBQUMsSUFBb0IsQ0FBQztRQUN6RixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN2RCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFDdEQsR0FBRyxDQUFPLEtBQUssQ0FBQyxDQUNqQixDQUFDO1NBQ0g7UUFFRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUN0RCxHQUFHLENBQU8sS0FBSyxDQUFDLENBQ2pCLENBQUM7U0FDSDtRQUVELE9BQU8sRUFBRSxDQUFDLEtBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO3dHQWpDVSxXQUFXO3NHQUFYLFdBQVc7OzRGQUFYLFdBQVc7a0JBSnZCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG1hcCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmV0Y2hlclNlcnZpY2UsIEZldGNoT3B0aW9ucyB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvc2VydmljZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiDmioror7fmsYLkv6Hmga/ovazmjaLkuLrlvILmraXlr7nosaFcclxuICovXHJcbkBQaXBlKHtcclxuICBuYW1lOiAndG9Bc3luYycsXHJcbiAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9Bc3luY1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZldGNoZXI6IEZldGNoZXJTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiDovazmjaLkuLpPYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIHZhbHVlIOWPr+S7peaYr3VybOaIluiAhU9ic2VydmFibGUsIFByb21pc2VcclxuICAgKiBAcGFyYW0gb3B0aW9uIOmFjee9rumhuVxyXG4gICAqL1xyXG4gIHRyYW5zZm9ybTxUID0gTnpTYWZlQW55LCBVID0gTnpTYWZlQW55PihcclxuICAgIHZhbHVlOiBzdHJpbmcgfCBPYnNlcnZhYmxlPFQ+IHwgUHJvbWlzZTxUPiB8IFQsXHJcbiAgICBvcHRpb24/OiBBc3luY09wdGlvblxyXG4gICk6IE9ic2VydmFibGU8VT4gfCBudWxsIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBvZihvcHRpb24/LmRlZmF1bHRWYWx1ZSBhcyBVKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHQgPSBvcHRpb24gfHwgKHt9IGFzIEFzeW5jT3B0aW9uKTtcclxuICAgIGNvbnN0IG1hcEZuID0gTnp4VXRpbHMuaXNGdW5jdGlvbihvcHQubWFwKSA/IG9wdC5tYXAgOiAoZGF0YTogVCkgPT4gZGF0YSBhcyB1bmtub3duIGFzIFU7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5mZXRjaGVyLmZldGNoPFQ+KHsgLi4ub3B0LCB1cmw6IHZhbHVlIH0pLnBpcGUoXHJcbiAgICAgICAgbWFwKHYgPT4gTnp4VXRpbHMuZGVmYXVsdElmeSh2LCBvcHRpb24/LmRlZmF1bHRWYWx1ZSkpLFxyXG4gICAgICAgIG1hcDxULCBVPihtYXBGbilcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnp4VXRpbHMuaXNQcm9taXNlKHZhbHVlKSB8fCBOenhVdGlscy5pc09ic2VydmFibGUodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBmcm9tKHZhbHVlKS5waXBlKFxyXG4gICAgICAgIG1hcCh2ID0+IE56eFV0aWxzLmRlZmF1bHRJZnkodiwgb3B0aW9uPy5kZWZhdWx0VmFsdWUpKSxcclxuICAgICAgICBtYXA8VCwgVT4obWFwRm4pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9mKHZhbHVlIGFzIFQpLnBpcGUobWFwPFQsIFU+KG1hcEZuKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog5byC5q2l6K+35rGC5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBBc3luY09wdGlvbiA9IE9taXQ8RmV0Y2hPcHRpb25zLCAndXJsJz4gJiB7XHJcbiAgLyoqXHJcbiAgICog5pig5bCE5pWw5o2uXHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKi9cclxuICBtYXA/OiAoZGF0YTogTnpTYWZlQW55KSA9PiBOelNhZmVBbnk7XHJcbiAgLyoqXHJcbiAgICog6buY6K6k5YC8XHJcbiAgICovXHJcbiAgZGVmYXVsdFZhbHVlPzogTnpTYWZlQW55O1xyXG59O1xyXG4iXX0=