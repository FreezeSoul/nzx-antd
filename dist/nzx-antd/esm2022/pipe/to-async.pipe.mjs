import { Pipe } from '@angular/core';
import { from, map, of } from 'rxjs';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd/service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tYXN5bmMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9waXBlL3RvLWFzeW5jLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBR3JEOztHQUVHO0FBS0gsTUFBTSxPQUFPLFdBQVc7SUFDRjtJQUFwQixZQUFvQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFL0M7Ozs7T0FJRztJQUNILFNBQVMsQ0FDUCxLQUE4QyxFQUM5QyxNQUFvQjtRQUVwQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQWlCLENBQUMsQ0FBQztTQUN0QztRQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSyxFQUFrQixDQUFDO1FBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQU8sRUFBRSxFQUFFLENBQUMsSUFBb0IsQ0FBQztRQUN6RixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN2RCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFDdEQsR0FBRyxDQUFPLEtBQUssQ0FBQyxDQUNqQixDQUFDO1NBQ0g7UUFFRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUN0RCxHQUFHLENBQU8sS0FBSyxDQUFDLENBQ2pCLENBQUM7U0FDSDtRQUVELE9BQU8sRUFBRSxDQUFDLEtBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO3dHQWpDVSxXQUFXO3NHQUFYLFdBQVc7OzRGQUFYLFdBQVc7a0JBSnZCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG1hcCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmV0Y2hlclNlcnZpY2UsIEZldGNoT3B0aW9ucyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3NlcnZpY2UnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIOaKiuivt+axguS/oeaBr+i9rOaNouS4uuW8guatpeWvueixoVxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICd0b0FzeW5jJyxcclxuICBwdXJlOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb0FzeW5jUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmV0Y2hlcjogRmV0Y2hlclNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIOi9rOaNouS4uk9ic2VydmFibGVcclxuICAgKiBAcGFyYW0gdmFsdWUg5Y+v5Lul5pivdXJs5oiW6ICFT2JzZXJ2YWJsZSwgUHJvbWlzZVxyXG4gICAqIEBwYXJhbSBvcHRpb24g6YWN572u6aG5XHJcbiAgICovXHJcbiAgdHJhbnNmb3JtPFQgPSBOelNhZmVBbnksIFUgPSBOelNhZmVBbnk+KFxyXG4gICAgdmFsdWU6IHN0cmluZyB8IE9ic2VydmFibGU8VD4gfCBQcm9taXNlPFQ+IHwgVCxcclxuICAgIG9wdGlvbj86IEFzeW5jT3B0aW9uXHJcbiAgKTogT2JzZXJ2YWJsZTxVPiB8IG51bGwge1xyXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG9mKG9wdGlvbj8uZGVmYXVsdFZhbHVlIGFzIFUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdCA9IG9wdGlvbiB8fCAoe30gYXMgQXN5bmNPcHRpb24pO1xyXG4gICAgY29uc3QgbWFwRm4gPSBOenhVdGlscy5pc0Z1bmN0aW9uKG9wdC5tYXApID8gb3B0Lm1hcCA6IChkYXRhOiBUKSA9PiBkYXRhIGFzIHVua25vd24gYXMgVTtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZldGNoZXIuZmV0Y2g8VD4oeyAuLi5vcHQsIHVybDogdmFsdWUgfSkucGlwZShcclxuICAgICAgICBtYXAodiA9PiBOenhVdGlscy5kZWZhdWx0SWZ5KHYsIG9wdGlvbj8uZGVmYXVsdFZhbHVlKSksXHJcbiAgICAgICAgbWFwPFQsIFU+KG1hcEZuKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOenhVdGlscy5pc1Byb21pc2UodmFsdWUpIHx8IE56eFV0aWxzLmlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIGZyb20odmFsdWUpLnBpcGUoXHJcbiAgICAgICAgbWFwKHYgPT4gTnp4VXRpbHMuZGVmYXVsdElmeSh2LCBvcHRpb24/LmRlZmF1bHRWYWx1ZSkpLFxyXG4gICAgICAgIG1hcDxULCBVPihtYXBGbilcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2YodmFsdWUgYXMgVCkucGlwZShtYXA8VCwgVT4obWFwRm4pKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvILmraXor7fmsYLkv6Hmga9cclxuICovXHJcbmV4cG9ydCB0eXBlIEFzeW5jT3B0aW9uID0gT21pdDxGZXRjaE9wdGlvbnMsICd1cmwnPiAmIHtcclxuICAvKipcclxuICAgKiDmmKDlsITmlbDmja5cclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIG1hcD86IChkYXRhOiBOelNhZmVBbnkpID0+IE56U2FmZUFueTtcclxuICAvKipcclxuICAgKiDpu5jorqTlgLxcclxuICAgKi9cclxuICBkZWZhdWx0VmFsdWU/OiBOelNhZmVBbnk7XHJcbn07XHJcbiJdfQ==