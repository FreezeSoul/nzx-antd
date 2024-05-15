import { Injectable } from '@angular/core';
import { HttpError } from './http.model';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import { DEFAULT_RESPONSE_SETTING } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
/**
 * 退出通知
 */
export class LogoutService {
    antdService;
    timeoutFn;
    loginNotify$ = new Subject();
    constructor(antdService) {
        this.antdService = antdService;
        this.timeoutFn = NzxUtils.extend({}, DEFAULT_RESPONSE_SETTING, this.antdService.response).timeout;
    }
    notifyLogin(error) {
        this.loginNotify$.next({
            message: error.message,
            url: error.body?.url,
            timeout: this.timeoutFn(error)
        });
    }
    /**
     * 静默通知退出
     * @param message 提示消息
     * @param code 错误码 -1 不显示提示信息
     */
    notifyLogout(message = '', code = 0) {
        this.notifyLogin(new HttpError(false, code, message, {}));
    }
    /**
     * 执行退出登录Observable
     * @param logoutType
     */
    logout(logoutType) {
        this.loginNotify$.next(logoutType);
    }
    onLogout(fn) {
        return this.loginNotify$.asObservable().pipe(throttleTime(2000)).subscribe(fn);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LogoutService, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LogoutService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LogoutService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9sb2dvdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQWlCLE1BQU0sY0FBYyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLHdCQUF3QixFQUFtQyxNQUFNLHNCQUFzQixDQUFBOzs7QUFFaEc7O0dBRUc7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUlGO0lBSEgsU0FBUyxDQUFnQztJQUNwRCxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQWMsQ0FBQztJQUVqRCxZQUFzQixXQUEyQjtRQUEzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFrQixFQUFFLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFRLENBQUM7SUFDdEgsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUErQjtRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsR0FBRyxFQUFHLEtBQUssQ0FBQyxJQUF5QixFQUFFLEdBQUc7WUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLFVBQWtCLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxVQUFzQjtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQW9DO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7d0dBbkNVLGFBQWE7NEdBQWIsYUFBYSxjQURBLE1BQU07OzRGQUNuQixhQUFhO2tCQUR6QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEVycm9yLCBSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi9odHRwLm1vZGVsJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgREVGQVVMVF9SRVNQT05TRV9TRVRUSU5HLCBOenhBbnRkU2VydmljZSwgUmVzcG9uc2VTZXR0aW5nIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQnXHJcblxyXG4vKipcclxuICog6YCA5Ye66YCa55+lXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgTG9nb3V0U2VydmljZSB7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRpbWVvdXRGbjogKGVycm9yOiBIdHRwRXJyb3IpID0+IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBsb2dpbk5vdGlmeSQgPSBuZXcgU3ViamVjdDxMb2dvdXRUeXBlPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnRpbWVvdXRGbiA9IE56eFV0aWxzLmV4dGVuZDxSZXNwb25zZVNldHRpbmc+KHt9LCBERUZBVUxUX1JFU1BPTlNFX1NFVFRJTkcsIHRoaXMuYW50ZFNlcnZpY2UucmVzcG9uc2UpLnRpbWVvdXQhO1xyXG4gIH1cclxuXHJcbiAgbm90aWZ5TG9naW4oZXJyb3I6IEh0dHBFcnJvcjxSZXNwb25zZU1vZGVsPik6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dpbk5vdGlmeSQubmV4dCh7XHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICAgIHVybDogKGVycm9yLmJvZHkgYXMgeyB1cmw/OiBzdHJpbmcgfSk/LnVybCxcclxuICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0Rm4oZXJyb3IpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmdmem7mOmAmuefpemAgOWHulxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOaPkOekuua2iOaBr1xyXG4gICAqIEBwYXJhbSBjb2RlIOmUmeivr+eggSAtMSDkuI3mmL7npLrmj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICBub3RpZnlMb2dvdXQobWVzc2FnZTogc3RyaW5nID0gJycsIGNvZGUgPSAwKTogdm9pZCB7XHJcbiAgICB0aGlzLm5vdGlmeUxvZ2luKG5ldyBIdHRwRXJyb3IoZmFsc2UsIGNvZGUsIG1lc3NhZ2UsIHt9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmiafooYzpgIDlh7rnmbvlvZVPYnNlcnZhYmxlXHJcbiAgICogQHBhcmFtIGxvZ291dFR5cGVcclxuICAgKi9cclxuICBsb2dvdXQobG9nb3V0VHlwZTogTG9nb3V0VHlwZSk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dpbk5vdGlmeSQubmV4dChsb2dvdXRUeXBlKTtcclxuICB9XHJcblxyXG4gIG9uTG9nb3V0KGZuOiAobG9nb3V0VHlwZTogTG9nb3V0VHlwZSkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2dpbk5vdGlmeSQuYXNPYnNlcnZhYmxlKCkucGlwZSh0aHJvdHRsZVRpbWUoMjAwMCkpLnN1YnNjcmliZShmbik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ291dFR5cGUge1xyXG4gIC8qKlxyXG4gICAqIHVybFxyXG4gICAqL1xyXG4gIHVybD86IHN0cmluZztcclxuICAvKipcclxuICAgKiDmmK/lkKbotoXml7ZcclxuICAgKi9cclxuICB0aW1lb3V0PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDplJnor6/kv6Hmga9cclxuICAgKi9cclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG59XHJcbiJdfQ==