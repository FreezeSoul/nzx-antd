import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpError } from './http.model';
import { LogoutService } from './logout.service';
import { NzxAntdService, ResponseSetting } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
/**
 * 在 http-error-interceptor 后，进行自定义错误处理。
 */
export declare class HttpCustomServerErrorInterceptor implements HttpInterceptor {
    protected logoutNotify: LogoutService;
    protected antdService: NzxAntdService;
    protected readonly settings: Required<ResponseSetting>;
    constructor(logoutNotify: LogoutService, antdService: NzxAntdService);
    intercept(req: HttpRequest<HttpError>, next: HttpHandler): Observable<HttpEvent<HttpError>>;
    /**
     * 只抛出自定义异常, 对于http内部异常由拦截器统一处理
     * @param req
     * @param error
     * @param caught 原始异常
     */
    handleError(req: HttpRequest<HttpError>, error: HttpError, caught: Observable<HttpEvent<HttpError>>): Observable<HttpEvent<import("@freezesoul/nzx-antd").HttpErrorBean<any>>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpCustomServerErrorInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpCustomServerErrorInterceptor>;
}
