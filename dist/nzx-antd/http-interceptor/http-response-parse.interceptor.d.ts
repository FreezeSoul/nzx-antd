import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { ResponseModel } from './http.model';
import { NzxAntdService, ResponseSetting } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
/**
 * 处理服务器返回的数据，改变其结构。
 */
export declare class HttpResponseParseInterceptor implements HttpInterceptor {
    protected antdService: NzxAntdService;
    protected readonly settings: Required<ResponseSetting>;
    constructor(antdService: NzxAntdService);
    intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>>;
    protected processData<T>(subscriber: Subscriber<HttpEvent<T>>, req: HttpRequest<T>, response: HttpResponse<ResponseModel>): void;
    private getBodyAttr;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpResponseParseInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpResponseParseInterceptor>;
}
