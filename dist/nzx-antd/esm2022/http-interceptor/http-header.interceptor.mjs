import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
/**
 * 对请求头进行处理
 */
export class HttpHeaderInterceptor {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    intercept(req, next) {
        const headers = { 'X-Requested-With': 'XMLHttpRequest' };
        if (!req.headers.has('Content-Type') &&
            !(req.body instanceof FormData || req.body instanceof ArrayBuffer || req.body instanceof Blob)) {
            headers['Content-Type'] =
                this.antdService.contentType === 'form'
                    ? 'application/x-www-form-urlencoded'
                    : 'application/json;charset=utf-8';
        }
        const clone = req.clone({
            setHeaders: headers
        });
        return next.handle(clone);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpHeaderInterceptor, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpHeaderInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpHeaderInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1oZWFkZXIuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLWhlYWRlci5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ1Y7SUFBdEIsWUFBc0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxNQUFNLE9BQU8sR0FBMkIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pGLElBQ0UsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksV0FBVyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQzlGO1lBQ0EsT0FBTyxDQUFDLGNBQWMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEtBQUssTUFBTTtvQkFDckMsQ0FBQyxDQUFDLG1DQUFtQztvQkFDckMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDO1NBQ3hDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN0QixVQUFVLEVBQUUsT0FBTztTQUNwQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzt3R0FsQlUscUJBQXFCOzRHQUFyQixxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiDlr7nor7fmsYLlpLTov5vooYzlpITnkIZcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBIZWFkZXJJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZSkge31cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxOelNhZmVBbnk+PiB7XHJcbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfTtcclxuICAgIGlmIChcclxuICAgICAgIXJlcS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykgJiZcclxuICAgICAgIShyZXEuYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhIHx8IHJlcS5ib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgcmVxLmJvZHkgaW5zdGFuY2VvZiBCbG9iKVxyXG4gICAgKSB7XHJcbiAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID1cclxuICAgICAgICB0aGlzLmFudGRTZXJ2aWNlLmNvbnRlbnRUeXBlID09PSAnZm9ybSdcclxuICAgICAgICAgID8gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuICAgICAgICAgIDogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjbG9uZSA9IHJlcS5jbG9uZSh7XHJcbiAgICAgIHNldEhlYWRlcnM6IGhlYWRlcnNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKGNsb25lKTtcclxuICB9XHJcbn1cclxuIl19