import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from './http.model';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
/**
 * http 请求发生错误后进行处理
 */
export class HttpErrorInterceptor {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError(error => this.handleError(req, error)));
    }
    /**
     * 将错误响应包装为统一格式
     * @param req
     * @param errorResponse
     */
    handleError(req, errorResponse) {
        if (this.antdService.handleHttpError) {
            return this.antdService.handleHttpError(req, errorResponse);
        }
        const { status: code, error, message } = errorResponse;
        return throwError(() => new HttpError(true, code, message, error));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpErrorInterceptor, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpErrorInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpErrorInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9odHRwLWludGVyY2VwdG9yL2h0dHAtZXJyb3IuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFJekM7O0dBRUc7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBQ1Q7SUFBdEIsWUFBc0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxHQUEyQixFQUFFLGFBQWdDO1FBQ3ZFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFzQixDQUFDO1NBQ2xGO1FBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLGFBQWEsQ0FBQztRQUN2RCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7d0dBbkJVLG9CQUFvQjs0R0FBcEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3IgfSBmcm9tICcuL2h0dHAubW9kZWwnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBOenhBbnRkU2VydmljZSB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkJztcclxuXHJcbi8qKlxyXG4gKiBodHRwIOivt+axguWPkeeUn+mUmeivr+WQjui/m+ihjOWkhOeQhlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEVycm9ySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2UpIHt9XHJcblxyXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8TnpTYWZlQW55Pj4ge1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShjYXRjaEVycm9yKGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IocmVxLCBlcnJvcikpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWwhumUmeivr+WTjeW6lOWMheijheS4uue7n+S4gOagvOW8j1xyXG4gICAqIEBwYXJhbSByZXFcclxuICAgKiBAcGFyYW0gZXJyb3JSZXNwb25zZVxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yKHJlcTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55PiwgZXJyb3JSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIGlmICh0aGlzLmFudGRTZXJ2aWNlLmhhbmRsZUh0dHBFcnJvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5hbnRkU2VydmljZS5oYW5kbGVIdHRwRXJyb3IocmVxLCBlcnJvclJlc3BvbnNlKSBhcyBPYnNlcnZhYmxlPG5ldmVyPjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHN0YXR1czogY29kZSwgZXJyb3IsIG1lc3NhZ2UgfSA9IGVycm9yUmVzcG9uc2U7XHJcbiAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgSHR0cEVycm9yKHRydWUsIGNvZGUsIG1lc3NhZ2UsIGVycm9yKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==