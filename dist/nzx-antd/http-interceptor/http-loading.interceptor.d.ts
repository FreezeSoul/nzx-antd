import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpLoadingService } from './http-loading.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * http 请求发送时，调用 loading service 显示加载中图标或者做一些其它处理。
 */
export declare class HttpLoadingInterceptor implements HttpInterceptor {
    private loadingService;
    private showStatusChange;
    private requestCount;
    constructor(loadingService: HttpLoadingService);
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>>;
    /**
     * 显示loading
     */
    show(): void;
    /**
     * 隐藏loading
     */
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpLoadingInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpLoadingInterceptor>;
}
