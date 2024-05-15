import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from './http.model';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9odHRwLWludGVyY2VwdG9yL2h0dHAtZXJyb3IuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFJekM7O0dBRUc7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBQ1Q7SUFBdEIsWUFBc0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxHQUEyQixFQUFFLGFBQWdDO1FBQ3ZFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFzQixDQUFDO1NBQ2xGO1FBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLGFBQWEsQ0FBQztRQUN2RCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7d0dBbkJVLG9CQUFvQjs0R0FBcEIsb0JBQW9COzs0RkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3IgfSBmcm9tICcuL2h0dHAubW9kZWwnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBOenhBbnRkU2VydmljZSB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQnO1xyXG5cclxuLyoqXHJcbiAqIGh0dHAg6K+35rGC5Y+R55Sf6ZSZ6K+v5ZCO6L+b6KGM5aSE55CGXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZSkge31cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxOelNhZmVBbnk+PiB7XHJcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKGNhdGNoRXJyb3IoZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXEsIGVycm9yKSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5bCG6ZSZ6K+v5ZON5bqU5YyF6KOF5Li657uf5LiA5qC85byPXHJcbiAgICogQHBhcmFtIHJlcVxyXG4gICAqIEBwYXJhbSBlcnJvclJlc3BvbnNlXHJcbiAgICovXHJcbiAgaGFuZGxlRXJyb3IocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+LCBlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSkge1xyXG4gICAgaWYgKHRoaXMuYW50ZFNlcnZpY2UuaGFuZGxlSHR0cEVycm9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFudGRTZXJ2aWNlLmhhbmRsZUh0dHBFcnJvcihyZXEsIGVycm9yUmVzcG9uc2UpIGFzIE9ic2VydmFibGU8bmV2ZXI+O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgc3RhdHVzOiBjb2RlLCBlcnJvciwgbWVzc2FnZSB9ID0gZXJyb3JSZXNwb25zZTtcclxuICAgIHJldHVybiB0aHJvd0Vycm9yKCgpID0+IG5ldyBIdHRwRXJyb3IodHJ1ZSwgY29kZSwgbWVzc2FnZSwgZXJyb3IpKTtcclxuICB9XHJcbn1cclxuIl19