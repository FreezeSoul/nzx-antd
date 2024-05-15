import { HttpErrorResponse, HttpEventType, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SYNCED_ENABLED } from '@freezesoul/nzx-antd/service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
export class AsyncHttpXhrBackend {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AsyncHttpXhrBackend, deps: [{ token: i1.XhrFactory }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AsyncHttpXhrBackend });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AsyncHttpXhrBackend, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.XhrFactory }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2h0dHAtaW50ZXJjZXB0b3IveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxpQkFBaUIsRUFFakIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixXQUFXLEVBRVgsWUFBWSxFQUdiLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBRzlELE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQztBQUVqQzs7O0dBR0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxHQUFjO0lBQ3BDLElBQUksYUFBYSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFO1FBQzNDLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN4QjtJQUNELElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUU7UUFDeEQsT0FBTyxHQUFHLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDL0M7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLG1CQUFtQjtJQUNWO0lBQXBCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRTlDOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsR0FBMkI7UUFDaEMseUVBQXlFO1FBQ3pFLGtFQUFrRTtRQUNsRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQztTQUNsRztRQUVELGlEQUFp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d0M7Z0JBQ3hDLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFO29CQUMvQixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2I7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBaFNVLG1CQUFtQjs0R0FBbkIsbUJBQW1COzs0RkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBIdHRwQmFja2VuZCxcclxuICBIdHRwRG93bmxvYWRQcm9ncmVzc0V2ZW50LFxyXG4gIEh0dHBFcnJvclJlc3BvbnNlLFxyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwRXZlbnRUeXBlLFxyXG4gIEh0dHBIZWFkZXJSZXNwb25zZSxcclxuICBIdHRwSGVhZGVycyxcclxuICBIdHRwUmVxdWVzdCxcclxuICBIdHRwUmVzcG9uc2UsXHJcbiAgSHR0cFN0YXR1c0NvZGUsXHJcbiAgSHR0cFVwbG9hZFByb2dyZXNzRXZlbnRcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgWGhyRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNZTkNFRF9FTkFCTEVEIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvc2VydmljZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcydcclxuXHJcbmNvbnN0IFhTU0lfUFJFRklYID0gL15cXCldfScsP1xcbi87XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIFVSTCBmb3IgdGhlIHJlc3BvbnNlLCBieSBjaGVja2luZyBlaXRoZXJcclxuICogWE1MSHR0cFJlcXVlc3QucmVzcG9uc2VVUkwgb3IgdGhlIFgtUmVxdWVzdC1VUkwgaGVhZGVyLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmVzcG9uc2VVcmwoeGhyOiBOelNhZmVBbnkpOiBzdHJpbmcgfCBudWxsIHtcclxuICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgJiYgeGhyLnJlc3BvbnNlVVJMKSB7XHJcbiAgICByZXR1cm4geGhyLnJlc3BvbnNlVVJMO1xyXG4gIH1cclxuICBpZiAoL15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSkge1xyXG4gICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOS9v+eUqCBgWE1MSHR0cFJlcXVlc3RgIOWPkemAgeivt+axguWSjOaOpeaUtuWTjeW6lCzmlK/mjIHlkIzmraUv5byC5q2lXHJcbiAqIEBzZWUgYEh0dHBIYW5kbGVyYFxyXG4gKiBAc2VlIGBKc29ucENsaWVudEJhY2tlbmRgXHJcbiAqIEBzZWUgc3luY2VkXHJcbiAqIEBzZWUgU1lOQ0VEX0VOQUJMRURcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXN5bmNIdHRwWGhyQmFja2VuZCBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHhockZhY3Rvcnk6IFhockZhY3RvcnkpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3NlcyBhIHJlcXVlc3QgYW5kIHJldHVybnMgYSBzdHJlYW0gb2YgcmVzcG9uc2UgZXZlbnRzLlxyXG4gICAqIEBwYXJhbSByZXEgVGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gICAqIEByZXR1cm5zIEFuIG9ic2VydmFibGUgb2YgdGhlIHJlc3BvbnNlIGV2ZW50cy5cclxuICAgKi9cclxuICBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8TnpTYWZlQW55Pj4ge1xyXG4gICAgLy8gUXVpY2sgY2hlY2sgdG8gZ2l2ZSBhIGJldHRlciBlcnJvciBtZXNzYWdlIHdoZW4gYSB1c2VyIGF0dGVtcHRzIHRvIHVzZVxyXG4gICAgLy8gSHR0cENsaWVudC5qc29ucCgpIHdpdGhvdXQgaW5zdGFsbGluZyB0aGUgSHR0cENsaWVudEpzb25wTW9kdWxlXHJcbiAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0pTT05QJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRlZCB0byBjb25zdHJ1Y3QgSnNvbnAgcmVxdWVzdCB3aXRob3V0IEh0dHBDbGllbnRKc29ucE1vZHVsZSBpbnN0YWxsZWQuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZlcnl0aGluZyBoYXBwZW5zIG9uIE9ic2VydmFibGUgc3Vic2NyaXB0aW9uLlxyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PE56U2FmZUFueT4+KSA9PiB7XHJcbiAgICAgIC8vIFN0YXJ0IGJ5IHNldHRpbmcgdXAgdGhlIFhIUiBvYmplY3Qgd2l0aCByZXF1ZXN0IG1ldGhvZCwgVVJMLCBhbmQgd2l0aENyZWRlbnRpYWxzIGZsYWcuXHJcbiAgICAgIGNvbnN0IHhociA9IHRoaXMueGhyRmFjdG9yeS5idWlsZCgpO1xyXG4gICAgICAvLyDmmK/lkKblkIzmraUg5re75Yqg5ZCM5q2lL+W8guatpeivt+axguaUr+aMgVxyXG4gICAgICBsZXQgc3luY2VkID0gcmVxLmNvbnRleHQuZ2V0KFNZTkNFRF9FTkFCTEVEKTtcclxuICAgICAgaWYgKCFzeW5jZWQpIHtcclxuICAgICAgICBzeW5jZWQgPSByZXEudXJsV2l0aFBhcmFtcy5pbmRleE9mKCdzeW5jZWQ9dHJ1ZScpICE9PSAtMTtcclxuICAgICAgfVxyXG4gICAgICB4aHIub3BlbihyZXEubWV0aG9kLCByZXEudXJsV2l0aFBhcmFtcywgIXN5bmNlZCk7XHJcbiAgICAgIGlmIChyZXEud2l0aENyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkZCBhbGwgdGhlIHJlcXVlc3RlZCBoZWFkZXJzLlxyXG4gICAgICByZXEuaGVhZGVycy5rZXlzKCkuZm9yRWFjaChuYW1lID0+IHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIDxzdHJpbmc+cmVxLmhlYWRlcnMuZ2V0QWxsKG5hbWUpPy5qb2luPy4oJywnKSkpO1xyXG5cclxuICAgICAgLy8gQWRkIGFuIEFjY2VwdCBoZWFkZXIgaWYgb25lIGlzbid0IHByZXNlbnQgYWxyZWFkeS5cclxuICAgICAgaWYgKCFyZXEuaGVhZGVycy5oYXMoJ0FjY2VwdCcpKSB7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXV0by1kZXRlY3QgdGhlIENvbnRlbnQtVHlwZSBoZWFkZXIgaWYgb25lIGlzbid0IHByZXNlbnQgYWxyZWFkeS5cclxuICAgICAgaWYgKCFyZXEuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XHJcbiAgICAgICAgY29uc3QgZGV0ZWN0ZWRUeXBlID0gcmVxLmRldGVjdENvbnRlbnRUeXBlSGVhZGVyKCk7XHJcbiAgICAgICAgLy8gU29tZXRpbWVzIENvbnRlbnQtVHlwZSBkZXRlY3Rpb24gZmFpbHMuXHJcbiAgICAgICAgaWYgKGRldGVjdGVkVHlwZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGRldGVjdGVkVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgdGhlIHJlc3BvbnNlVHlwZSBpZiBvbmUgd2FzIHJlcXVlc3RlZC5cclxuICAgICAgaWYgKHJlcS5yZXNwb25zZVR5cGUgJiYgIXN5bmNlZCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IHJlcS5yZXNwb25zZVR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gSlNPTiByZXNwb25zZXMgbmVlZCB0byBiZSBwcm9jZXNzZWQgYXMgdGV4dC4gVGhpcyBpcyBiZWNhdXNlIGlmIHRoZSBzZXJ2ZXJcclxuICAgICAgICAvLyByZXR1cm5zIGFuIFhTU0ktcHJlZml4ZWQgSlNPTiByZXNwb25zZSwgdGhlIGJyb3dzZXIgd2lsbCBmYWlsIHRvIHBhcnNlIGl0LFxyXG4gICAgICAgIC8vIHhoci5yZXNwb25zZSB3aWxsIGJlIG51bGwsIGFuZCB4aHIucmVzcG9uc2VUZXh0IGNhbm5vdCBiZSBhY2Nlc3NlZCB0b1xyXG4gICAgICAgIC8vIHJldHJpZXZlIHRoZSBwcmVmaXhlZCBKU09OIGRhdGEgaW4gb3JkZXIgdG8gc3RyaXAgdGhlIHByZWZpeC4gVGh1cywgYWxsIEpTT05cclxuICAgICAgICAvLyBpcyBwYXJzZWQgYnkgZmlyc3QgcmVxdWVzdGluZyB0ZXh0IGFuZCB0aGVuIGFwcGx5aW5nIEpTT04ucGFyc2UuXHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IChyZXNwb25zZVR5cGUgIT09ICdqc29uJyA/IHJlc3BvbnNlVHlwZSA6ICd0ZXh0JykgYXMgTnpTYWZlQW55O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXJpYWxpemUgdGhlIHJlcXVlc3QgYm9keSBpZiBvbmUgaXMgcHJlc2VudC4gSWYgbm90LCB0aGlzIHdpbGwgYmUgc2V0IHRvIG51bGwuXHJcbiAgICAgIGNvbnN0IHJlcUJvZHkgPSByZXEuc2VyaWFsaXplQm9keSgpO1xyXG5cclxuICAgICAgLy8gSWYgcHJvZ3Jlc3MgZXZlbnRzIGFyZSBlbmFibGVkLCByZXNwb25zZSBoZWFkZXJzIHdpbGwgYmUgZGVsaXZlcmVkXHJcbiAgICAgIC8vIGluIHR3byBldmVudHMgLSB0aGUgSHR0cEhlYWRlclJlc3BvbnNlIGV2ZW50IGFuZCB0aGUgZnVsbCBIdHRwUmVzcG9uc2VcclxuICAgICAgLy8gZXZlbnQuIEhvd2V2ZXIsIHNpbmNlIHJlc3BvbnNlIGhlYWRlcnMgZG9uJ3QgY2hhbmdlIGluIGJldHdlZW4gdGhlc2VcclxuICAgICAgLy8gdHdvIGV2ZW50cywgaXQgZG9lc24ndCBtYWtlIHNlbnNlIHRvIHBhcnNlIHRoZW0gdHdpY2UuIFNvIGhlYWRlclJlc3BvbnNlXHJcbiAgICAgIC8vIGNhY2hlcyB0aGUgZGF0YSBleHRyYWN0ZWQgZnJvbSB0aGUgcmVzcG9uc2Ugd2hlbmV2ZXIgaXQncyBmaXJzdCBwYXJzZWQsXHJcbiAgICAgIC8vIHRvIGVuc3VyZSBwYXJzaW5nIGlzbid0IGR1cGxpY2F0ZWQuXHJcbiAgICAgIGxldCBoZWFkZXJSZXNwb25zZTogSHR0cEhlYWRlclJlc3BvbnNlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAvLyBwYXJ0aWFsRnJvbVhociBleHRyYWN0cyB0aGUgSHR0cEhlYWRlclJlc3BvbnNlIGZyb20gdGhlIGN1cnJlbnQgWE1MSHR0cFJlcXVlc3RcclxuICAgICAgLy8gc3RhdGUsIGFuZCBtZW1vaXplcyBpdCBpbnRvIGhlYWRlclJlc3BvbnNlLlxyXG4gICAgICBjb25zdCBwYXJ0aWFsRnJvbVhociA9ICgpOiBIdHRwSGVhZGVyUmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGlmIChoZWFkZXJSZXNwb25zZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGhlYWRlclJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dCA9IHhoci5zdGF0dXNUZXh0IHx8ICdPSyc7XHJcblxyXG4gICAgICAgIC8vIFBhcnNlIGhlYWRlcnMgZnJvbSBYTUxIdHRwUmVxdWVzdCAtIHRoaXMgc3RlcCBpcyBsYXp5LlxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcclxuXHJcbiAgICAgICAgLy8gUmVhZCB0aGUgcmVzcG9uc2UgVVJMIGZyb20gdGhlIFhNTEh0dHBSZXNwb25zZSBpbnN0YW5jZSBhbmQgZmFsbCBiYWNrIG9uIHRoZVxyXG4gICAgICAgIC8vIHJlcXVlc3QgVVJMLlxyXG4gICAgICAgIGNvbnN0IHVybCA9IGdldFJlc3BvbnNlVXJsKHhocikgfHwgcmVxLnVybDtcclxuXHJcbiAgICAgICAgLy8gQ29uc3RydWN0IHRoZSBIdHRwSGVhZGVyUmVzcG9uc2UgYW5kIG1lbW9pemUgaXQuXHJcbiAgICAgICAgaGVhZGVyUmVzcG9uc2UgPSBuZXcgSHR0cEhlYWRlclJlc3BvbnNlKHsgaGVhZGVycywgc3RhdHVzOiB4aHIuc3RhdHVzLCBzdGF0dXNUZXh0LCB1cmwgfSk7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlclJlc3BvbnNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gTmV4dCwgYSBmZXcgY2xvc3VyZXMgYXJlIGRlZmluZWQgZm9yIHRoZSB2YXJpb3VzIGV2ZW50cyB3aGljaCBYTUxIdHRwUmVxdWVzdCBjYW5cclxuICAgICAgLy8gZW1pdC4gVGhpcyBhbGxvd3MgdGhlbSB0byBiZSB1bnJlZ2lzdGVyZWQgYXMgZXZlbnQgbGlzdGVuZXJzIGxhdGVyLlxyXG5cclxuICAgICAgLy8gRmlyc3QgdXAgaXMgdGhlIGxvYWQgZXZlbnQsIHdoaWNoIHJlcHJlc2VudHMgYSByZXNwb25zZSBiZWluZyBmdWxseSBhdmFpbGFibGUuXHJcbiAgICAgIGNvbnN0IG9uTG9hZCA9ICgpID0+IHtcclxuICAgICAgICAvLyBSZWFkIHJlc3BvbnNlIHN0YXRlIGZyb20gdGhlIG1lbW9pemVkIHBhcnRpYWwgZGF0YS5cclxuICAgICAgICBjb25zdCBwYXJ0WGhyID0gcGFydGlhbEZyb21YaHIoKTtcclxuICAgICAgICBjb25zdCB7IGhlYWRlcnMsIHN0YXR1c1RleHQsIHVybCB9ID0gcGFydFhocjtcclxuICAgICAgICBsZXQgc3RhdHVzID0gcGFydFhoci5zdGF0dXM7XHJcblxyXG4gICAgICAgIC8vIFRoZSBib2R5IHdpbGwgYmUgcmVhZCBvdXQgaWYgcHJlc2VudC5cclxuICAgICAgICBsZXQgYm9keTogTnpTYWZlQW55IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgIT09IEh0dHBTdGF0dXNDb2RlLk5vQ29udGVudCkge1xyXG4gICAgICAgICAgLy8gVXNlIFhNTEh0dHBSZXF1ZXN0LnJlc3BvbnNlIGlmIHNldCwgcmVzcG9uc2VUZXh0IG90aGVyd2lzZS5cclxuICAgICAgICAgIGJvZHkgPSB0eXBlb2YgeGhyLnJlc3BvbnNlID09PSAndW5kZWZpbmVkJyA/IHhoci5yZXNwb25zZVRleHQgOiB4aHIucmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOb3JtYWxpemUgYW5vdGhlciBwb3RlbnRpYWwgYnVnICh0aGlzIG9uZSBjb21lcyBmcm9tIENPUlMpLlxyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgIHN0YXR1cyA9ICEhYm9keSA/IEh0dHBTdGF0dXNDb2RlLk9rIDogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG9rIGRldGVybWluZXMgd2hldGhlciB0aGUgcmVzcG9uc2Ugd2lsbCBiZSB0cmFuc21pdHRlZCBvbiB0aGUgZXZlbnQgb3JcclxuICAgICAgICAvLyBlcnJvciBjaGFubmVsLiBVbnN1Y2Nlc3NmdWwgc3RhdHVzIGNvZGVzIChub3QgMnh4KSB3aWxsIGFsd2F5cyBiZSBlcnJvcnMsXHJcbiAgICAgICAgLy8gYnV0IGEgc3VjY2Vzc2Z1bCBzdGF0dXMgY29kZSBjYW4gc3RpbGwgcmVzdWx0IGluIGFuIGVycm9yIGlmIHRoZSB1c2VyXHJcbiAgICAgICAgLy8gYXNrZWQgZm9yIEpTT04gZGF0YSBhbmQgdGhlIGJvZHkgY2Fubm90IGJlIHBhcnNlZCBhcyBzdWNoLlxyXG4gICAgICAgIGxldCBvayA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xyXG5cclxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBib2R5IG5lZWRzIHRvIGJlIHBhcnNlZCBhcyBKU09OIChpbiBtYW55IGNhc2VzIHRoZSBicm93c2VyXHJcbiAgICAgICAgLy8gd2lsbCBoYXZlIGRvbmUgdGhhdCBhbHJlYWR5KS5cclxuICAgICAgICBpZiAocmVxLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nICYmIHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgLy8gU2F2ZSB0aGUgb3JpZ2luYWwgYm9keSwgYmVmb3JlIGF0dGVtcHRpbmcgWFNTSSBwcmVmaXggc3RyaXBwaW5nLlxyXG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxCb2R5ID0gYm9keTtcclxuICAgICAgICAgIGJvZHkgPSBib2R5LnJlcGxhY2UoWFNTSV9QUkVGSVgsICcnKTtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEF0dGVtcHQgdGhlIHBhcnNlLiBJZiBpdCBmYWlscywgYSBwYXJzZSBlcnJvciBzaG91bGQgYmUgZGVsaXZlcmVkIHRvIHRoZSB1c2VyLlxyXG4gICAgICAgICAgICBib2R5ID0gYm9keSAhPT0gJycgPyBKU09OLnBhcnNlKGJvZHkpIDogbnVsbDtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBKU09OLnBhcnNlIGZhaWxlZCwgaXQncyByZWFzb25hYmxlIHRvIGFzc3VtZSB0aGlzIG1pZ2h0IG5vdCBoYXZlIGJlZW4gYVxyXG4gICAgICAgICAgICAvLyBKU09OIHJlc3BvbnNlLiBSZXN0b3JlIHRoZSBvcmlnaW5hbCBib2R5IChpbmNsdWRpbmcgYW55IFhTU0kgcHJlZml4KSB0byBkZWxpdmVyXHJcbiAgICAgICAgICAgIC8vIGEgYmV0dGVyIGVycm9yIHJlc3BvbnNlLlxyXG4gICAgICAgICAgICBib2R5ID0gb3JpZ2luYWxCb2R5O1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhpcyB3YXMgYW4gZXJyb3IgcmVxdWVzdCB0byBiZWdpbiB3aXRoLCBsZWF2ZSBpdCBhcyBhIHN0cmluZywgaXQgcHJvYmFibHlcclxuICAgICAgICAgICAgLy8ganVzdCBpc24ndCBKU09OLiBPdGhlcndpc2UsIGRlbGl2ZXIgdGhlIHBhcnNpbmcgZXJyb3IgdG8gdGhlIHVzZXIuXHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSByZXNwb25zZSBzdGF0dXMgd2FzIDJ4eCwgdGhpcyBpcyBzdGlsbCBhbiBlcnJvci5cclxuICAgICAgICAgICAgICBvayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIC8vIFRoZSBwYXJzZSBlcnJvciBjb250YWlucyB0aGUgdGV4dCBvZiB0aGUgYm9keSB0aGF0IGZhaWxlZCB0byBwYXJzZS5cclxuICAgICAgICAgICAgICBib2R5ID0geyBlcnJvciwgdGV4dDogYm9keSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgIC8vIEEgc3VjY2Vzc2Z1bCByZXNwb25zZSBpcyBkZWxpdmVyZWQgb24gdGhlIGV2ZW50IHN0cmVhbS5cclxuICAgICAgICAgIG9ic2VydmVyLm5leHQoXHJcbiAgICAgICAgICAgIG5ldyBIdHRwUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICAgIGJvZHksXHJcbiAgICAgICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgICAgICAgc3RhdHVzVGV4dCxcclxuICAgICAgICAgICAgICB1cmw6IHVybCB8fCB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBUaGUgZnVsbCBib2R5IGhhcyBiZWVuIHJlY2VpdmVkIGFuZCBkZWxpdmVyZWQsIG5vIGZ1cnRoZXIgZXZlbnRzXHJcbiAgICAgICAgICAvLyBhcmUgcG9zc2libGUuIFRoaXMgcmVxdWVzdCBpcyBjb21wbGV0ZS5cclxuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEFuIHVuc3VjY2Vzc2Z1bCByZXF1ZXN0IGlzIGRlbGl2ZXJlZCBvbiB0aGUgZXJyb3IgY2hhbm5lbC5cclxuICAgICAgICAgIG9ic2VydmVyLmVycm9yKFxyXG4gICAgICAgICAgICBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICAgIC8vIFRoZSBlcnJvciBpbiB0aGlzIGNhc2UgaXMgdGhlIHJlc3BvbnNlIGJvZHkgKGVycm9yIGZyb20gdGhlIHNlcnZlcikuXHJcbiAgICAgICAgICAgICAgZXJyb3I6IGJvZHksXHJcbiAgICAgICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgICAgICAgc3RhdHVzVGV4dCxcclxuICAgICAgICAgICAgICB1cmw6IHVybCB8fCB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gVGhlIG9uRXJyb3IgY2FsbGJhY2sgaXMgY2FsbGVkIHdoZW4gc29tZXRoaW5nIGdvZXMgd3JvbmcgYXQgdGhlIG5ldHdvcmsgbGV2ZWwuXHJcbiAgICAgIC8vIENvbm5lY3Rpb24gdGltZW91dCwgRE5TIGVycm9yLCBvZmZsaW5lLCBldGMuIFRoZXNlIGFyZSBhY3R1YWwgZXJyb3JzLCBhbmQgYXJlXHJcbiAgICAgIC8vIHRyYW5zbWl0dGVkIG9uIHRoZSBlcnJvciBjaGFubmVsLlxyXG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycm9yOiBQcm9ncmVzc0V2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB1cmwgfSA9IHBhcnRpYWxGcm9tWGhyKCk7XHJcbiAgICAgICAgY29uc3QgcmVzID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcclxuICAgICAgICAgIGVycm9yLFxyXG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzIHx8IDAsXHJcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCB8fCAnVW5rbm93biBFcnJvcicsXHJcbiAgICAgICAgICB1cmw6IHVybCB8fCB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihyZXMpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gVGhlIHNlbnRIZWFkZXJzIGZsYWcgdHJhY2tzIHdoZXRoZXIgdGhlIEh0dHBSZXNwb25zZUhlYWRlcnMgZXZlbnRcclxuICAgICAgLy8gaGFzIGJlZW4gc2VudCBvbiB0aGUgc3RyZWFtLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byB0cmFjayBpZiBwcm9ncmVzc1xyXG4gICAgICAvLyBpcyBlbmFibGVkIHNpbmNlIHRoZSBldmVudCB3aWxsIGJlIHNlbnQgb24gb25seSB0aGUgZmlyc3QgZG93bmxvYWRcclxuICAgICAgLy8gcHJvZ2Vyc3MgZXZlbnQuXHJcbiAgICAgIGxldCBzZW50SGVhZGVycyA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gVGhlIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50IGhhbmRsZXIsIHdoaWNoIGlzIG9ubHkgcmVnaXN0ZXJlZCBpZlxyXG4gICAgICAvLyBwcm9ncmVzcyBldmVudHMgYXJlIGVuYWJsZWQuXHJcbiAgICAgIGNvbnN0IG9uRG93blByb2dyZXNzID0gKGV2ZW50OiBQcm9ncmVzc0V2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gU2VuZCB0aGUgSHR0cFJlc3BvbnNlSGVhZGVycyBldmVudCBpZiBpdCBoYXNuJ3QgYmVlbiBzZW50IGFscmVhZHkuXHJcbiAgICAgICAgaWYgKCFzZW50SGVhZGVycykge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChwYXJ0aWFsRnJvbVhocigpKTtcclxuICAgICAgICAgIHNlbnRIZWFkZXJzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IGJ1aWxkaW5nIHRoZSBkb3dubG9hZCBwcm9ncmVzcyBldmVudCB0byBkZWxpdmVyIG9uIHRoZSByZXNwb25zZVxyXG4gICAgICAgIC8vIGV2ZW50IHN0cmVhbS5cclxuICAgICAgICBjb25zdCBwcm9ncmVzc0V2ZW50OiBIdHRwRG93bmxvYWRQcm9ncmVzc0V2ZW50ID0ge1xyXG4gICAgICAgICAgdHlwZTogSHR0cEV2ZW50VHlwZS5Eb3dubG9hZFByb2dyZXNzLFxyXG4gICAgICAgICAgbG9hZGVkOiBldmVudC5sb2FkZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyBpbiB0aGUgZXZlbnQgaWYgaXQncyBhdmFpbGFibGUuXHJcbiAgICAgICAgaWYgKGV2ZW50Lmxlbmd0aENvbXB1dGFibGUpIHtcclxuICAgICAgICAgIHByb2dyZXNzRXZlbnQudG90YWwgPSBldmVudC50b3RhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IHdhcyBmb3IgdGV4dCBjb250ZW50IGFuZCBhIHBhcnRpYWwgcmVzcG9uc2UgaXNcclxuICAgICAgICAvLyBhdmFpbGFibGUgb24gWE1MSHR0cFJlcXVlc3QsIGluY2x1ZGUgaXQgaW4gdGhlIHByb2dyZXNzIGV2ZW50XHJcbiAgICAgICAgLy8gdG8gYWxsb3cgZm9yIHN0cmVhbWluZyByZWFkcy5cclxuICAgICAgICBpZiAocmVxLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnICYmICEheGhyLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudC5wYXJ0aWFsVGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGx5LCBmaXJlIHRoZSBldmVudC5cclxuICAgICAgICBvYnNlcnZlci5uZXh0KHByb2dyZXNzRXZlbnQpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gVGhlIHVwbG9hZCBwcm9ncmVzcyBldmVudCBoYW5kbGVyLCB3aGljaCBpcyBvbmx5IHJlZ2lzdGVyZWQgaWZcclxuICAgICAgLy8gcHJvZ3Jlc3MgZXZlbnRzIGFyZSBlbmFibGVkLlxyXG4gICAgICBjb25zdCBvblVwUHJvZ3Jlc3MgPSAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHtcclxuICAgICAgICAvLyBVcGxvYWQgcHJvZ3Jlc3MgZXZlbnRzIGFyZSBzaW1wbGVyLiBCZWdpbiBidWlsZGluZyB0aGUgcHJvZ3Jlc3NcclxuICAgICAgICAvLyBldmVudC5cclxuICAgICAgICBjb25zdCBwcm9ncmVzczogSHR0cFVwbG9hZFByb2dyZXNzRXZlbnQgPSB7XHJcbiAgICAgICAgICB0eXBlOiBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzLFxyXG4gICAgICAgICAgbG9hZGVkOiBldmVudC5sb2FkZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIGJlaW5nIHVwbG9hZGVkIGlzIGF2YWlsYWJsZSwgaW5jbHVkZVxyXG4gICAgICAgIC8vIGl0LlxyXG4gICAgICAgIGlmIChldmVudC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgICBwcm9ncmVzcy50b3RhbCA9IGV2ZW50LnRvdGFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2VuZCB0aGUgZXZlbnQuXHJcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChwcm9ncmVzcyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBCeSBkZWZhdWx0LCByZWdpc3RlciBmb3IgbG9hZCBhbmQgZXJyb3IgZXZlbnRzLlxyXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xyXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigndGltZW91dCcsIG9uRXJyb3IpO1xyXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkVycm9yKTtcclxuXHJcbiAgICAgIC8vIFByb2dyZXNzIGV2ZW50cyBhcmUgb25seSBlbmFibGVkIGlmIHJlcXVlc3RlZC5cclxuICAgICAgaWYgKHJlcS5yZXBvcnRQcm9ncmVzcykge1xyXG4gICAgICAgIC8vIERvd25sb2FkIHByb2dyZXNzIGlzIGFsd2F5cyBlbmFibGVkIGlmIHJlcXVlc3RlZC5cclxuICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvbkRvd25Qcm9ncmVzcyk7XHJcblxyXG4gICAgICAgIC8vIFVwbG9hZCBwcm9ncmVzcyBkZXBlbmRzIG9uIHdoZXRoZXIgdGhlcmUgaXMgYSBib2R5IHRvIHVwbG9hZC5cclxuICAgICAgICBpZiAocmVxQm9keSAhPT0gbnVsbCAmJiB4aHIudXBsb2FkKSB7XHJcbiAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgb25VcFByb2dyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZpcmUgdGhlIHJlcXVlc3QsIGFuZCBub3RpZnkgdGhlIGV2ZW50IHN0cmVhbSB0aGF0IGl0IHdhcyBmaXJlZC5cclxuICAgICAgeGhyLnNlbmQocmVxQm9keSEpO1xyXG4gICAgICBvYnNlcnZlci5uZXh0KHsgdHlwZTogSHR0cEV2ZW50VHlwZS5TZW50IH0pO1xyXG5cclxuICAgICAgLy8gVGhpcyBpcyB0aGUgcmV0dXJuIGZyb20gdGhlIE9ic2VydmFibGUgZnVuY3Rpb24sIHdoaWNoIGlzIHRoZVxyXG4gICAgICAvLyByZXF1ZXN0IGNhbmNlbGxhdGlvbiBoYW5kbGVyLlxyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIC8vIE9uIGEgY2FuY2VsbGF0aW9uLCByZW1vdmUgYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxyXG4gICAgICAgIHhoci5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xyXG4gICAgICAgIHhoci5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uRXJyb3IpO1xyXG4gICAgICAgIHhoci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcclxuICAgICAgICB4aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZW91dCcsIG9uRXJyb3IpO1xyXG4gICAgICAgIGlmIChyZXEucmVwb3J0UHJvZ3Jlc3MpIHtcclxuICAgICAgICAgIHhoci5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uRG93blByb2dyZXNzKTtcclxuICAgICAgICAgIGlmIChyZXFCb2R5ICE9PSBudWxsICYmIHhoci51cGxvYWQpIHtcclxuICAgICAgICAgICAgeGhyLnVwbG9hZC5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uVXBQcm9ncmVzcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGx5LCBhYm9ydCB0aGUgaW4tZmxpZ2h0IHJlcXVlc3QuXHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSB4aHIuRE9ORSkge1xyXG4gICAgICAgICAgeGhyLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==