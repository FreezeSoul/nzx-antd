import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DEFAULT_RESPONSE_SETTING } from '@freezesoul/nzx-antd';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "./logout.service";
import * as i2 from "@freezesoul/nzx-antd";
/**
 * 在 http-error-interceptor 后，进行自定义错误处理。
 */
export class HttpCustomServerErrorInterceptor {
    logoutNotify;
    antdService;
    settings;
    constructor(logoutNotify, antdService) {
        this.logoutNotify = logoutNotify;
        this.antdService = antdService;
        this.settings = NzxUtils.extend({}, DEFAULT_RESPONSE_SETTING, this.antdService.response);
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((error, caught) => this.handleError(req, error, caught)));
    }
    /**
     * 只抛出自定义异常, 对于http内部异常由拦截器统一处理
     * @param req
     * @param error
     * @param caught 原始异常
     */
    handleError(req, error, caught) {
        if (error.httpError) {
            return this.settings.handleError(req, error);
            // 登录超时  强制下线
        }
        else if (this.settings.timeout(error) || this.settings.forceLogout(error)) {
            this.logoutNotify.notifyLogin(error);
            return throwError(() => error);
        }
        return this.settings.handleError(req, error);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpCustomServerErrorInterceptor, deps: [{ token: i1.LogoutService }, { token: i2.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpCustomServerErrorInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpCustomServerErrorInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.LogoutService }, { type: i2.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jdXN0b20tc2VydmVyLWVycm9yLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1jdXN0b20tc2VydmVyLWVycm9yLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFtQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQUVyRDs7R0FFRztBQUVILE1BQU0sT0FBTyxnQ0FBZ0M7SUFJL0I7SUFDQTtJQUpPLFFBQVEsQ0FBNEI7SUFFdkQsWUFDWSxZQUEyQixFQUMzQixXQUEyQjtRQUQzQixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUMzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFFckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUM3QixFQUFFLEVBQ0Ysd0JBQXdCLEVBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUNHLENBQUM7SUFDakMsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUEyQixFQUFFLElBQWlCO1FBQ3RELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxXQUFXLENBQUMsR0FBMkIsRUFBRSxLQUFnQixFQUFFLE1BQXdDO1FBQ2pHLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxhQUFhO1NBQ2Q7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQzt3R0FqQ1UsZ0NBQWdDOzRHQUFoQyxnQ0FBZ0M7OzRGQUFoQyxnQ0FBZ0M7a0JBRDVDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGNhdGNoRXJyb3IsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEVycm9yIH0gZnJvbSAnLi9odHRwLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nb3V0U2VydmljZSB9IGZyb20gJy4vbG9nb3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBERUZBVUxUX1JFU1BPTlNFX1NFVFRJTkcsIE56eEFudGRTZXJ2aWNlLCBSZXNwb25zZVNldHRpbmcgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZCc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcblxyXG4vKipcclxuICog5ZyoIGh0dHAtZXJyb3ItaW50ZXJjZXB0b3Ig5ZCO77yM6L+b6KGM6Ieq5a6a5LmJ6ZSZ6K+v5aSE55CG44CCXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwQ3VzdG9tU2VydmVyRXJyb3JJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNldHRpbmdzOiBSZXF1aXJlZDxSZXNwb25zZVNldHRpbmc+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBsb2dvdXROb3RpZnk6IExvZ291dFNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gTnp4VXRpbHMuZXh0ZW5kKFxyXG4gICAgICB7fSxcclxuICAgICAgREVGQVVMVF9SRVNQT05TRV9TRVRUSU5HLFxyXG4gICAgICB0aGlzLmFudGRTZXJ2aWNlLnJlc3BvbnNlXHJcbiAgICApIGFzIFJlcXVpcmVkPFJlc3BvbnNlU2V0dGluZz47XHJcbiAgfVxyXG5cclxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxIdHRwRXJyb3I+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PEh0dHBFcnJvcj4+IHtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3IsIGNhdWdodCkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXEsIGVycm9yLCBjYXVnaHQpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlj6rmipvlh7roh6rlrprkuYnlvILluLgsIOWvueS6jmh0dHDlhoXpg6jlvILluLjnlLHmi6bmiKrlmajnu5/kuIDlpITnkIZcclxuICAgKiBAcGFyYW0gcmVxXHJcbiAgICogQHBhcmFtIGVycm9yXHJcbiAgICogQHBhcmFtIGNhdWdodCDljp/lp4vlvILluLhcclxuICAgKi9cclxuICBoYW5kbGVFcnJvcihyZXE6IEh0dHBSZXF1ZXN0PEh0dHBFcnJvcj4sIGVycm9yOiBIdHRwRXJyb3IsIGNhdWdodDogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8SHR0cEVycm9yPj4pIHtcclxuICAgIGlmIChlcnJvci5odHRwRXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuaGFuZGxlRXJyb3IocmVxLCBlcnJvcik7XHJcbiAgICAgIC8vIOeZu+W9lei2heaXtiAg5by65Yi25LiL57q/XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MudGltZW91dChlcnJvcikgfHwgdGhpcy5zZXR0aW5ncy5mb3JjZUxvZ291dChlcnJvcikpIHtcclxuICAgICAgdGhpcy5sb2dvdXROb3RpZnkubm90aWZ5TG9naW4oZXJyb3IpO1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5oYW5kbGVFcnJvcihyZXEsIGVycm9yKTtcclxuICB9XHJcbn1cclxuIl19