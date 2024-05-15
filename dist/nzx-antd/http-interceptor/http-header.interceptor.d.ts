import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzxAntdService } from '@xmagic/nzx-antd';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 对请求头进行处理
 */
export declare class HttpHeaderInterceptor implements HttpInterceptor {
    protected antdService: NzxAntdService;
    constructor(antdService: NzxAntdService);
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpHeaderInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpHeaderInterceptor>;
}
