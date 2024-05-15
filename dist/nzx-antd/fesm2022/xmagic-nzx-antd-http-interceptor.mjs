import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { Subject, catchError, throwError, Observable } from 'rxjs';
import * as i1 from '@xmagic/nzx-antd';
import { DEFAULT_RESPONSE_SETTING } from '@xmagic/nzx-antd';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import { throttleTime, catchError as catchError$1, filter, finalize, switchMap } from 'rxjs/operators';
import { LOADING_ENABLED, SYNCED_ENABLED } from '@xmagic/nzx-antd/service';
import { HttpParams, HttpEventType, HTTP_INTERCEPTORS, HttpHeaders, HttpHeaderResponse, HttpResponse, HttpErrorResponse, HttpClientModule, HttpBackend } from '@angular/common/http';
import * as i1$1 from '@angular/common';

/**
 * http 请求出错后，在中间件中封闭为统一的格式。
 */
class HttpError {
    httpError;
    code;
    message;
    body;
    /**
     *
     * @param httpError 是否是HTTP原始异常
     * @param code 错误码, 如果是HTTP原始异常,则为status code
     * @param message 错误消息
     * @param body 返回数据
     */
    constructor(httpError, code, message, body) {
        this.httpError = httpError;
        this.code = code;
        this.message = message;
        this.body = body;
    }
}

/**
 * 退出通知
 */
class LogoutService {
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

/**
 * 在 http-error-interceptor 后，进行自定义错误处理。
 */
class HttpCustomServerErrorInterceptor {
    logoutNotify;
    antdService;
    settings;
    constructor(logoutNotify, antdService) {
        this.logoutNotify = logoutNotify;
        this.antdService = antdService;
        this.settings = NzxUtils.extend({}, DEFAULT_RESPONSE_SETTING, this.antdService.response);
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((error, caught) => this.handleError(req, error, caught)));
    }
    /**
     * 只抛出自定义异常, 对于http内部异常由拦截器统一处理
     * @param req
     * @param error
     * @param caught 原始异常
     */
    handleError(req, error, caught) {
        if (error.httpError) {
            return this.settings.handleError(req, error);
            // 登录超时  强制下线
        }
        else if (this.settings.timeout(error) || this.settings.forceLogout(error)) {
            this.logoutNotify.notifyLogin(error);
            return throwError(() => error);
        }
        return this.settings.handleError(req, error);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpCustomServerErrorInterceptor, deps: [{ token: LogoutService }, { token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpCustomServerErrorInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpCustomServerErrorInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: LogoutService }, { type: i1.NzxAntdService }]; } });

/**
 * http 请求发生错误后进行处理
 */
class HttpErrorInterceptor {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError$1(error => this.handleError(req, error)));
    }
    /**
     * 将错误响应包装为统一格式
     * @param req
     * @param errorResponse
     */
    handleError(req, errorResponse) {
        if (this.antdService.handleHttpError) {
            return this.antdService.handleHttpError(req, errorResponse);
        }
        const { status: code, error, message } = errorResponse;
        return throwError(() => new HttpError(true, code, message, error));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpErrorInterceptor, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpErrorInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpErrorInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });

class HttpLoadingService {
    httpLoadingStatus = new Subject();
    constructor() { }
    /**
     * HttpLoadingService needs a subject to tell the next loading status.
     * @param statusChangeObservable The subject who tells the loading status.
     */
    init(statusChangeObservable) {
        statusChangeObservable.subscribe(this.httpLoadingStatus);
    }
    /**
     * You have to subscribe the httpLoadingStatus$ in application to set custom loading behaviors through the method.
     *
     * @example
     * `app.component.ts`
     * ```ts
     * constructor(private loading: HttpLoadingService){}
     * ngOnInit() {
     *   this.loading.subscribe(status => {
     *     if(status){
     *       this.modal.show('loading...');
     *     }else{
     *       this.modal.hide();
     *     }
     *   })
     * }
     * ```
     * @param next
     * @param error
     * @param complete
     */
    subscribe(next, error, complete) {
        return this.httpLoadingStatus.subscribe({ next, error, complete });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/**
 * http 请求发送时，调用 loading service 显示加载中图标或者做一些其它处理。
 */
class HttpLoadingInterceptor {
    loadingService;
    showStatusChange = new Subject();
    requestCount = 0;
    constructor(loadingService) {
        this.loadingService = loadingService;
        this.loadingService.init(this.showStatusChange.pipe(filter(() => this.requestCount === 0)));
    }
    intercept(req, next) {
        const show = req.context.get(LOADING_ENABLED);
        if (show) {
            this.show();
        }
        return next.handle(req).pipe(finalize(() => show && this.hide()));
    }
    /**
     * 显示loading
     */
    show() {
        this.showStatusChange.next(true);
        this.requestCount++;
    }
    /**
     * 隐藏loading
     */
    hide() {
        this.requestCount--;
        this.showStatusChange.next(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingInterceptor, deps: [{ token: HttpLoadingService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: HttpLoadingService }]; } });

const HttpDefaultCodec = {
    decodeKey: (key) => {
        return key;
    },
    decodeValue(value) {
        return value;
    },
    encodeKey(key) {
        return key;
    },
    encodeValue(value) {
        return value;
    }
};

/**
 * 请求参数处理
 */
class HttpParamsInterceptor {
    constructor() { }
    intercept(req, next) {
        return next.handle(this.processParameters(req));
    }
    processParameters(req) {
        if (req.params == null) {
            return req;
        }
        return req.clone({
            params: this.processGetParams(req.params)
        });
    }
    processGetParams(params) {
        const result = { r: Math.random() };
        params.keys().reduce((acc, key) => {
            const values = params.getAll(key);
            if (values) {
                acc[key] = values.length > 1 ? values : values[0];
                return acc;
            }
            return acc;
        }, result);
        return new HttpParams({ fromString: NzxUtils.serialize(result), encoder: HttpDefaultCodec });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpParamsInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpParamsInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpParamsInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

/**
 * 处理服务器返回的数据，改变其结构。
 */
class HttpResponseParseInterceptor {
    antdService;
    settings;
    constructor(antdService) {
        this.antdService = antdService;
        this.settings = NzxUtils.extend({}, DEFAULT_RESPONSE_SETTING, this.antdService.response);
    }
    intercept(req, next) {
        return next.handle(req).pipe(switchMap(response => {
            return new Observable(observ => {
                if (response.type !== HttpEventType.Response) {
                    observ.next(response);
                    return;
                }
                this.processData(observ, req, response);
            });
        }));
    }
    processData(subscriber, req, response) {
        const contentType = (response.headers.get('content-type') || '').toLowerCase();
        const isJsonResponse = contentType.indexOf('application/json') !== -1;
        if (!isJsonResponse) {
            subscriber.next(response);
            subscriber.complete();
            return;
        }
        const { data: dataProp, code: codeProp, message: messageProp, success: successProp } = this.settings;
        // 处理下载文件错误
        if (isJsonResponse && response.body instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
                const err = JSON.parse(reader.result);
                const httpError = new HttpError(false, NzxUtils.get(err, codeProp, 0), this.getBodyAttr(req, response, err, messageProp), err);
                subscriber.error(httpError);
            };
            reader.readAsText(response.body);
            return;
        }
        const body = response.body || {};
        if (successProp(req, response)) {
            const resp = response.clone({ body: this.getBodyAttr(req, response, body, dataProp) });
            subscriber.next(resp);
            subscriber.complete();
        }
        else {
            const httpError = new HttpError(false, NzxUtils.get(body, codeProp, 0), this.getBodyAttr(req, response, body, messageProp), body);
            subscriber.error(httpError);
        }
    }
    getBodyAttr(req, response, body, attrOrFn) {
        return attrOrFn ? (NzxUtils.isFunction(attrOrFn) ? attrOrFn(req, response) : NzxUtils.get(body, attrOrFn)) : body;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpResponseParseInterceptor, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpResponseParseInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpResponseParseInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });

/**
 * 处理 URL
 */
class HttpUrlInterceptor {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    intercept(req, next) {
        return next.handle(this.processUrl(req));
    }
    processUrl(req) {
        let url = req.url;
        if (!/^http/i.test(url)) {
            if (!/^\//.test(url)) {
                url = '/' + url;
            }
            url = (this.antdService.basePath || '') + url;
        }
        // 使用自定义请求处理器
        if (this.antdService.handleRequest) {
            const newReq = this.antdService.handleRequest(req, url);
            if (newReq) {
                if (newReq.clone) {
                    return newReq;
                }
                const option = newReq;
                if (!option.url) {
                    option.url = url;
                }
                return req.clone(option);
            }
        }
        return req.clone({ url });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpUrlInterceptor, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpUrlInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpUrlInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });

/**
 * 对请求头进行处理
 */
class HttpHeaderInterceptor {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    intercept(req, next) {
        const headers = { 'X-Requested-With': 'XMLHttpRequest' };
        if (!req.headers.has('Content-Type') &&
            !(req.body instanceof FormData || req.body instanceof ArrayBuffer || req.body instanceof Blob)) {
            headers['Content-Type'] =
                this.antdService.contentType === 'form'
                    ? 'application/x-www-form-urlencoded'
                    : 'application/json;charset=utf-8';
        }
        const clone = req.clone({
            setHeaders: headers
        });
        return next.handle(clone);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpHeaderInterceptor, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpHeaderInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpHeaderInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });

/**
 * 注意，中间件是有序的，谨慎调整下列中间件的顺序
 */
const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpParamsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCustomServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseParseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];

const XSSI_PREFIX = /^\)]}',?\n/;
/**
 * Determine an appropriate URL for the response, by checking either
 * XMLHttpRequest.responseURL or the X-Request-URL header.
 */
function getResponseUrl(xhr) {
    if ('responseURL' in xhr && xhr.responseURL) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
/**
 * 使用 `XMLHttpRequest` 发送请求和接收响应,支持同步/异步
 * @see `HttpHandler`
 * @see `JsonpClientBackend`
 * @see synced
 * @see SYNCED_ENABLED
 * @publicApi
 */
class AsyncHttpXhrBackend {
    xhrFactory;
    constructor(xhrFactory) {
        this.xhrFactory = xhrFactory;
    }
    /**
     * Processes a request and returns a stream of response events.
     * @param req The request object.
     * @returns An observable of the response events.
     */
    handle(req) {
        // Quick check to give a better error message when a user attempts to use
        // HttpClient.jsonp() without installing the HttpClientJsonpModule
        if (req.method === 'JSONP') {
            throw new Error(`Attempted to construct Jsonp request without HttpClientJsonpModule installed.`);
        }
        // Everything happens on Observable subscription.
        return new Observable((observer) => {
            // Start by setting up the XHR object with request method, URL, and withCredentials flag.
            const xhr = this.xhrFactory.build();
            // 是否同步 添加同步/异步请求支持
            let synced = req.context.get(SYNCED_ENABLED);
            if (!synced) {
                synced = req.urlWithParams.indexOf('synced=true') !== -1;
            }
            xhr.open(req.method, req.urlWithParams, !synced);
            if (req.withCredentials) {
                xhr.withCredentials = true;
            }
            // Add all the requested headers.
            req.headers.keys().forEach(name => xhr.setRequestHeader(name, req.headers.getAll(name)?.join?.(',')));
            // Add an Accept header if one isn't present already.
            if (!req.headers.has('Accept')) {
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            }
            // Auto-detect the Content-Type header if one isn't present already.
            if (!req.headers.has('Content-Type')) {
                const detectedType = req.detectContentTypeHeader();
                // Sometimes Content-Type detection fails.
                if (detectedType !== null) {
                    xhr.setRequestHeader('Content-Type', detectedType);
                }
            }
            // Set the responseType if one was requested.
            if (req.responseType && !synced) {
                const responseType = req.responseType.toLowerCase();
                // JSON responses need to be processed as text. This is because if the server
                // returns an XSSI-prefixed JSON response, the browser will fail to parse it,
                // xhr.response will be null, and xhr.responseText cannot be accessed to
                // retrieve the prefixed JSON data in order to strip the prefix. Thus, all JSON
                // is parsed by first requesting text and then applying JSON.parse.
                xhr.responseType = (responseType !== 'json' ? responseType : 'text');
            }
            // Serialize the request body if one is present. If not, this will be set to null.
            const reqBody = req.serializeBody();
            // If progress events are enabled, response headers will be delivered
            // in two events - the HttpHeaderResponse event and the full HttpResponse
            // event. However, since response headers don't change in between these
            // two events, it doesn't make sense to parse them twice. So headerResponse
            // caches the data extracted from the response whenever it's first parsed,
            // to ensure parsing isn't duplicated.
            let headerResponse = null;
            // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
            // state, and memoizes it into headerResponse.
            const partialFromXhr = () => {
                if (headerResponse !== null) {
                    return headerResponse;
                }
                const statusText = xhr.statusText || 'OK';
                // Parse headers from XMLHttpRequest - this step is lazy.
                const headers = new HttpHeaders(xhr.getAllResponseHeaders());
                // Read the response URL from the XMLHttpResponse instance and fall back on the
                // request URL.
                const url = getResponseUrl(xhr) || req.url;
                // Construct the HttpHeaderResponse and memoize it.
                headerResponse = new HttpHeaderResponse({ headers, status: xhr.status, statusText, url });
                return headerResponse;
            };
            // Next, a few closures are defined for the various events which XMLHttpRequest can
            // emit. This allows them to be unregistered as event listeners later.
            // First up is the load event, which represents a response being fully available.
            const onLoad = () => {
                // Read response state from the memoized partial data.
                const partXhr = partialFromXhr();
                const { headers, statusText, url } = partXhr;
                let status = partXhr.status;
                // The body will be read out if present.
                let body = null;
                if (status !== 204 /* HttpStatusCode.NoContent */) {
                    // Use XMLHttpRequest.response if set, responseText otherwise.
                    body = typeof xhr.response === 'undefined' ? xhr.responseText : xhr.response;
                }
                // Normalize another potential bug (this one comes from CORS).
                if (status === 0) {
                    status = !!body ? 200 /* HttpStatusCode.Ok */ : 0;
                }
                // ok determines whether the response will be transmitted on the event or
                // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                // but a successful status code can still result in an error if the user
                // asked for JSON data and the body cannot be parsed as such.
                let ok = status >= 200 && status < 300;
                // Check whether the body needs to be parsed as JSON (in many cases the browser
                // will have done that already).
                if (req.responseType === 'json' && typeof body === 'string') {
                    // Save the original body, before attempting XSSI prefix stripping.
                    const originalBody = body;
                    body = body.replace(XSSI_PREFIX, '');
                    try {
                        // Attempt the parse. If it fails, a parse error should be delivered to the user.
                        body = body !== '' ? JSON.parse(body) : null;
                    }
                    catch (error) {
                        // Since the JSON.parse failed, it's reasonable to assume this might not have been a
                        // JSON response. Restore the original body (including any XSSI prefix) to deliver
                        // a better error response.
                        body = originalBody;
                        // If this was an error request to begin with, leave it as a string, it probably
                        // just isn't JSON. Otherwise, deliver the parsing error to the user.
                        if (ok) {
                            // Even though the response status was 2xx, this is still an error.
                            ok = false;
                            // The parse error contains the text of the body that failed to parse.
                            body = { error, text: body };
                        }
                    }
                }
                if (ok) {
                    // A successful response is delivered on the event stream.
                    observer.next(new HttpResponse({
                        body,
                        headers,
                        status,
                        statusText,
                        url: url || undefined
                    }));
                    // The full body has been received and delivered, no further events
                    // are possible. This request is complete.
                    observer.complete();
                }
                else {
                    // An unsuccessful request is delivered on the error channel.
                    observer.error(new HttpErrorResponse({
                        // The error in this case is the response body (error from the server).
                        error: body,
                        headers,
                        status,
                        statusText,
                        url: url || undefined
                    }));
                }
            };
            // The onError callback is called when something goes wrong at the network level.
            // Connection timeout, DNS error, offline, etc. These are actual errors, and are
            // transmitted on the error channel.
            const onError = (error) => {
                const { url } = partialFromXhr();
                const res = new HttpErrorResponse({
                    error,
                    status: xhr.status || 0,
                    statusText: xhr.statusText || 'Unknown Error',
                    url: url || undefined
                });
                observer.error(res);
            };
            // The sentHeaders flag tracks whether the HttpResponseHeaders event
            // has been sent on the stream. This is necessary to track if progress
            // is enabled since the event will be sent on only the first download
            // progerss event.
            let sentHeaders = false;
            // The download progress event handler, which is only registered if
            // progress events are enabled.
            const onDownProgress = (event) => {
                // Send the HttpResponseHeaders event if it hasn't been sent already.
                if (!sentHeaders) {
                    observer.next(partialFromXhr());
                    sentHeaders = true;
                }
                // Start building the download progress event to deliver on the response
                // event stream.
                const progressEvent = {
                    type: HttpEventType.DownloadProgress,
                    loaded: event.loaded
                };
                // Set the total number of bytes in the event if it's available.
                if (event.lengthComputable) {
                    progressEvent.total = event.total;
                }
                // If the request was for text content and a partial response is
                // available on XMLHttpRequest, include it in the progress event
                // to allow for streaming reads.
                if (req.responseType === 'text' && !!xhr.responseText) {
                    progressEvent.partialText = xhr.responseText;
                }
                // Finally, fire the event.
                observer.next(progressEvent);
            };
            // The upload progress event handler, which is only registered if
            // progress events are enabled.
            const onUpProgress = (event) => {
                // Upload progress events are simpler. Begin building the progress
                // event.
                const progress = {
                    type: HttpEventType.UploadProgress,
                    loaded: event.loaded
                };
                // If the total number of bytes being uploaded is available, include
                // it.
                if (event.lengthComputable) {
                    progress.total = event.total;
                }
                // Send the event.
                observer.next(progress);
            };
            // By default, register for load and error events.
            xhr.addEventListener('load', onLoad);
            xhr.addEventListener('error', onError);
            xhr.addEventListener('timeout', onError);
            xhr.addEventListener('abort', onError);
            // Progress events are only enabled if requested.
            if (req.reportProgress) {
                // Download progress is always enabled if requested.
                xhr.addEventListener('progress', onDownProgress);
                // Upload progress depends on whether there is a body to upload.
                if (reqBody !== null && xhr.upload) {
                    xhr.upload.addEventListener('progress', onUpProgress);
                }
            }
            // Fire the request, and notify the event stream that it was fired.
            xhr.send(reqBody);
            observer.next({ type: HttpEventType.Sent });
            // This is the return from the Observable function, which is the
            // request cancellation handler.
            return () => {
                // On a cancellation, remove all registered event listeners.
                xhr.removeEventListener('error', onError);
                xhr.removeEventListener('abort', onError);
                xhr.removeEventListener('load', onLoad);
                xhr.removeEventListener('timeout', onError);
                if (req.reportProgress) {
                    xhr.removeEventListener('progress', onDownProgress);
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.removeEventListener('progress', onUpProgress);
                    }
                }
                // Finally, abort the in-flight request.
                if (xhr.readyState !== xhr.DONE) {
                    xhr.abort();
                }
            };
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AsyncHttpXhrBackend, deps: [{ token: i1$1.XhrFactory }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AsyncHttpXhrBackend });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AsyncHttpXhrBackend, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.XhrFactory }]; } });

class NzxHttpInterceptorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, imports: [HttpClientModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, providers: [httpInterceptors, AsyncHttpXhrBackend, { provide: HttpBackend, useExisting: AsyncHttpXhrBackend }], imports: [HttpClientModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [HttpClientModule],
                    providers: [httpInterceptors, AsyncHttpXhrBackend, { provide: HttpBackend, useExisting: AsyncHttpXhrBackend }]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AsyncHttpXhrBackend, HttpCustomServerErrorInterceptor, HttpDefaultCodec, HttpError, HttpErrorInterceptor, HttpLoadingInterceptor, HttpLoadingService, HttpParamsInterceptor, HttpResponseParseInterceptor, HttpUrlInterceptor, LogoutService, NzxHttpInterceptorModule, httpInterceptors };
//# sourceMappingURL=xmagic-nzx-antd-http-interceptor.mjs.map
