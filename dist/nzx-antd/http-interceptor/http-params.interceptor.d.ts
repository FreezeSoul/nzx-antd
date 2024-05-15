import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 请求参数处理
 */
export declare class HttpParamsInterceptor implements HttpInterceptor {
    constructor();
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
    processParameters(req: HttpRequest<NzSafeAny>): HttpRequest<any>;
    processGetParams(params: HttpParams): HttpParams;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpParamsInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpParamsInterceptor>;
}
