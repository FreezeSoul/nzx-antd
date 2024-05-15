import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DEFAULT_RESPONSE_SETTING } from '@xmagic/nzx-antd';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "./logout.service";
import * as i2 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jdXN0b20tc2VydmVyLWVycm9yLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1jdXN0b20tc2VydmVyLWVycm9yLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHMUQsT0FBTyxFQUFFLHdCQUF3QixFQUFtQyxNQUFNLGtCQUFrQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUVqRDs7R0FFRztBQUVILE1BQU0sT0FBTyxnQ0FBZ0M7SUFJL0I7SUFDQTtJQUpPLFFBQVEsQ0FBNEI7SUFFdkQsWUFDWSxZQUEyQixFQUMzQixXQUEyQjtRQUQzQixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUMzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFFckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUM3QixFQUFFLEVBQ0Ysd0JBQXdCLEVBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUNHLENBQUM7SUFDakMsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUEyQixFQUFFLElBQWlCO1FBQ3RELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxXQUFXLENBQUMsR0FBMkIsRUFBRSxLQUFnQixFQUFFLE1BQXdDO1FBQ2pHLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxhQUFhO1NBQ2Q7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQzt3R0FqQ1UsZ0NBQWdDOzRHQUFoQyxnQ0FBZ0M7OzRGQUFoQyxnQ0FBZ0M7a0JBRDVDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGNhdGNoRXJyb3IsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cEVycm9yIH0gZnJvbSAnLi9odHRwLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nb3V0U2VydmljZSB9IGZyb20gJy4vbG9nb3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBERUZBVUxUX1JFU1BPTlNFX1NFVFRJTkcsIE56eEFudGRTZXJ2aWNlLCBSZXNwb25zZVNldHRpbmcgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIOWcqCBodHRwLWVycm9yLWludGVyY2VwdG9yIOWQju+8jOi/m+ihjOiHquWumuS5iemUmeivr+WkhOeQhuOAglxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEN1c3RvbVNlcnZlckVycm9ySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBzZXR0aW5nczogUmVxdWlyZWQ8UmVzcG9uc2VTZXR0aW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgbG9nb3V0Tm90aWZ5OiBMb2dvdXRTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IE56eFV0aWxzLmV4dGVuZChcclxuICAgICAge30sXHJcbiAgICAgIERFRkFVTFRfUkVTUE9OU0VfU0VUVElORyxcclxuICAgICAgdGhpcy5hbnRkU2VydmljZS5yZXNwb25zZVxyXG4gICAgKSBhcyBSZXF1aXJlZDxSZXNwb25zZVNldHRpbmc+O1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8SHR0cEVycm9yPiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxIdHRwRXJyb3I+PiB7XHJcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKGNhdGNoRXJyb3IoKGVycm9yLCBjYXVnaHQpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVxLCBlcnJvciwgY2F1Z2h0KSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Y+q5oqb5Ye66Ieq5a6a5LmJ5byC5bi4LCDlr7nkuo5odHRw5YaF6YOo5byC5bi455Sx5oum5oiq5Zmo57uf5LiA5aSE55CGXHJcbiAgICogQHBhcmFtIHJlcVxyXG4gICAqIEBwYXJhbSBlcnJvclxyXG4gICAqIEBwYXJhbSBjYXVnaHQg5Y6f5aeL5byC5bi4XHJcbiAgICovXHJcbiAgaGFuZGxlRXJyb3IocmVxOiBIdHRwUmVxdWVzdDxIdHRwRXJyb3I+LCBlcnJvcjogSHR0cEVycm9yLCBjYXVnaHQ6IE9ic2VydmFibGU8SHR0cEV2ZW50PEh0dHBFcnJvcj4+KSB7XHJcbiAgICBpZiAoZXJyb3IuaHR0cEVycm9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmhhbmRsZUVycm9yKHJlcSwgZXJyb3IpO1xyXG4gICAgICAvLyDnmbvlvZXotoXml7YgIOW8uuWItuS4i+e6v1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnRpbWVvdXQoZXJyb3IpIHx8IHRoaXMuc2V0dGluZ3MuZm9yY2VMb2dvdXQoZXJyb3IpKSB7XHJcbiAgICAgIHRoaXMubG9nb3V0Tm90aWZ5Lm5vdGlmeUxvZ2luKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuaGFuZGxlRXJyb3IocmVxLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==