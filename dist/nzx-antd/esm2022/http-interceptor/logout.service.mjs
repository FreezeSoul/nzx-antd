import { Injectable } from '@angular/core';
import { HttpError } from './http.model';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import { DEFAULT_RESPONSE_SETTING } from '@xmagic/nzx-antd';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9sb2dvdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQWlCLE1BQU0sY0FBYyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFtQyxNQUFNLGtCQUFrQixDQUFBOzs7QUFFNUY7O0dBRUc7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUlGO0lBSEgsU0FBUyxDQUFnQztJQUNwRCxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQWMsQ0FBQztJQUVqRCxZQUFzQixXQUEyQjtRQUEzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFrQixFQUFFLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFRLENBQUM7SUFDdEgsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUErQjtRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsR0FBRyxFQUFHLEtBQUssQ0FBQyxJQUF5QixFQUFFLEdBQUc7WUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLFVBQWtCLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxVQUFzQjtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQW9DO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7d0dBbkNVLGFBQWE7NEdBQWIsYUFBYSxjQURBLE1BQU07OzRGQUNuQixhQUFhO2tCQUR6QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEVycm9yLCBSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi9odHRwLm1vZGVsJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBERUZBVUxUX1JFU1BPTlNFX1NFVFRJTkcsIE56eEFudGRTZXJ2aWNlLCBSZXNwb25zZVNldHRpbmcgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkJ1xyXG5cclxuLyoqXHJcbiAqIOmAgOWHuumAmuefpVxyXG4gKi9cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIExvZ291dFNlcnZpY2Uge1xyXG4gIHByb3RlY3RlZCByZWFkb25seSB0aW1lb3V0Rm46IChlcnJvcjogSHR0cEVycm9yKSA9PiBib29sZWFuO1xyXG4gIHByaXZhdGUgbG9naW5Ob3RpZnkkID0gbmV3IFN1YmplY3Q8TG9nb3V0VHlwZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZSkge1xyXG4gICAgdGhpcy50aW1lb3V0Rm4gPSBOenhVdGlscy5leHRlbmQ8UmVzcG9uc2VTZXR0aW5nPih7fSwgREVGQVVMVF9SRVNQT05TRV9TRVRUSU5HLCB0aGlzLmFudGRTZXJ2aWNlLnJlc3BvbnNlKS50aW1lb3V0ITtcclxuICB9XHJcblxyXG4gIG5vdGlmeUxvZ2luKGVycm9yOiBIdHRwRXJyb3I8UmVzcG9uc2VNb2RlbD4pOiB2b2lkIHtcclxuICAgIHRoaXMubG9naW5Ob3RpZnkkLm5leHQoe1xyXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgICB1cmw6IChlcnJvci5ib2R5IGFzIHsgdXJsPzogc3RyaW5nIH0pPy51cmwsXHJcbiAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dEZuKGVycm9yKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpnZnpu5jpgJrnn6XpgIDlh7pcclxuICAgKiBAcGFyYW0gbWVzc2FnZSDmj5DnpLrmtojmga9cclxuICAgKiBAcGFyYW0gY29kZSDplJnor6/noIEgLTEg5LiN5pi+56S65o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgbm90aWZ5TG9nb3V0KG1lc3NhZ2U6IHN0cmluZyA9ICcnLCBjb2RlID0gMCk6IHZvaWQge1xyXG4gICAgdGhpcy5ub3RpZnlMb2dpbihuZXcgSHR0cEVycm9yKGZhbHNlLCBjb2RlLCBtZXNzYWdlLCB7fSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5omn6KGM6YCA5Ye655m75b2VT2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSBsb2dvdXRUeXBlXHJcbiAgICovXHJcbiAgbG9nb3V0KGxvZ291dFR5cGU6IExvZ291dFR5cGUpOiB2b2lkIHtcclxuICAgIHRoaXMubG9naW5Ob3RpZnkkLm5leHQobG9nb3V0VHlwZSk7XHJcbiAgfVxyXG5cclxuICBvbkxvZ291dChmbjogKGxvZ291dFR5cGU6IExvZ291dFR5cGUpID0+IHZvaWQpOiBTdWJzY3JpcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9naW5Ob3RpZnkkLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGhyb3R0bGVUaW1lKDIwMDApKS5zdWJzY3JpYmUoZm4pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dvdXRUeXBlIHtcclxuICAvKipcclxuICAgKiB1cmxcclxuICAgKi9cclxuICB1cmw/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm6LaF5pe2XHJcbiAgICovXHJcbiAgdGltZW91dD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog6ZSZ6K+v5L+h5oGvXHJcbiAgICovXHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxufVxyXG4iXX0=