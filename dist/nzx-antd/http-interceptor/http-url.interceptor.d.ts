import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
/**
 * 处理 URL
 */
export declare class HttpUrlInterceptor implements HttpInterceptor {
    protected antdService: NzxAntdService;
    constructor(antdService: NzxAntdService);
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
    processUrl(req: HttpRequest<NzSafeAny>): HttpRequest<NzSafeAny>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpUrlInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpUrlInterceptor>;
}
