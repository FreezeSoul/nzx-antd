import { HttpBackend, HttpEvent, HttpRequest } from '@angular/common/http';
import { XhrFactory } from '@angular/common';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 使用 `XMLHttpRequest` 发送请求和接收响应,支持同步/异步
 * @see `HttpHandler`
 * @see `JsonpClientBackend`
 * @see synced
 * @see SYNCED_ENABLED
 * @publicApi
 */
export declare class AsyncHttpXhrBackend implements HttpBackend {
    private xhrFactory;
    constructor(xhrFactory: XhrFactory);
    /**
     * Processes a request and returns a stream of response events.
     * @param req The request object.
     * @returns An observable of the response events.
     */
    handle(req: HttpRequest<NzSafeAny>): Observable<HttpEvent<NzSafeAny>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsyncHttpXhrBackend, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsyncHttpXhrBackend>;
}
