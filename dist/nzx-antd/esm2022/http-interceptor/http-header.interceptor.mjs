import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1oZWFkZXIuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLWhlYWRlci5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ1Y7SUFBdEIsWUFBc0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxNQUFNLE9BQU8sR0FBMkIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pGLElBQ0UsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksV0FBVyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQzlGO1lBQ0EsT0FBTyxDQUFDLGNBQWMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEtBQUssTUFBTTtvQkFDckMsQ0FBQyxDQUFDLG1DQUFtQztvQkFDckMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDO1NBQ3hDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN0QixVQUFVLEVBQUUsT0FBTztTQUNwQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzt3R0FsQlUscUJBQXFCOzRHQUFyQixxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZCc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG4vKipcclxuICog5a+56K+35rGC5aS06L+b6KGM5aSE55CGXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwSGVhZGVySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2UpIHt9XHJcblxyXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8TnpTYWZlQW55Pj4ge1xyXG4gICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH07XHJcbiAgICBpZiAoXHJcbiAgICAgICFyZXEuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpICYmXHJcbiAgICAgICEocmVxLmJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSB8fCByZXEuYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IHJlcS5ib2R5IGluc3RhbmNlb2YgQmxvYilcclxuICAgICkge1xyXG4gICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9XHJcbiAgICAgICAgdGhpcy5hbnRkU2VydmljZS5jb250ZW50VHlwZSA9PT0gJ2Zvcm0nXHJcbiAgICAgICAgICA/ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgICA6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2xvbmUgPSByZXEuY2xvbmUoe1xyXG4gICAgICBzZXRIZWFkZXJzOiBoZWFkZXJzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShjbG9uZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==