import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxAntdService } from '@xmagic/nzx-antd';
import * as i0 from "@angular/core";
/**
 * http 请求发生错误后进行处理
 */
export declare class HttpErrorInterceptor implements HttpInterceptor {
    protected antdService: NzxAntdService;
    constructor(antdService: NzxAntdService);
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
    /**
     * 将错误响应包装为统一格式
     * @param req
     * @param errorResponse
     */
    handleError(req: HttpRequest<NzSafeAny>, errorResponse: HttpErrorResponse): Observable<never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpErrorInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpErrorInterceptor>;
}
