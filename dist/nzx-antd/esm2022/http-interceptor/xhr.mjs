import { HttpErrorResponse, HttpEventType, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SYNCED_ENABLED } from '@xmagic/nzx-antd/service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2h0dHAtaW50ZXJjZXB0b3IveGhyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxpQkFBaUIsRUFFakIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixXQUFXLEVBRVgsWUFBWSxFQUdiLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRzFELE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQztBQUVqQzs7O0dBR0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxHQUFjO0lBQ3BDLElBQUksYUFBYSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFO1FBQzNDLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN4QjtJQUNELElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUU7UUFDeEQsT0FBTyxHQUFHLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDL0M7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLG1CQUFtQjtJQUNWO0lBQXBCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRTlDOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsR0FBMkI7UUFDaEMseUVBQXlFO1FBQ3pFLGtFQUFrRTtRQUNsRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQztTQUNsRztRQUVELGlEQUFp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d0M7Z0JBQ3hDLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFO29CQUMvQixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2I7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBaFNVLG1CQUFtQjs0R0FBbkIsbUJBQW1COzs0RkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBIdHRwQmFja2VuZCxcclxuICBIdHRwRG93bmxvYWRQcm9ncmVzc0V2ZW50LFxyXG4gIEh0dHBFcnJvclJlc3BvbnNlLFxyXG4gIEh0dHBFdmVudCxcclxuICBIdHRwRXZlbnRUeXBlLFxyXG4gIEh0dHBIZWFkZXJSZXNwb25zZSxcclxuICBIdHRwSGVhZGVycyxcclxuICBIdHRwUmVxdWVzdCxcclxuICBIdHRwUmVzcG9uc2UsXHJcbiAgSHR0cFN0YXR1c0NvZGUsXHJcbiAgSHR0cFVwbG9hZFByb2dyZXNzRXZlbnRcclxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgWGhyRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNZTkNFRF9FTkFCTEVEIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC9zZXJ2aWNlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJ1xyXG5cclxuY29uc3QgWFNTSV9QUkVGSVggPSAvXlxcKV19Jyw/XFxuLztcclxuXHJcbi8qKlxyXG4gKiBEZXRlcm1pbmUgYW4gYXBwcm9wcmlhdGUgVVJMIGZvciB0aGUgcmVzcG9uc2UsIGJ5IGNoZWNraW5nIGVpdGhlclxyXG4gKiBYTUxIdHRwUmVxdWVzdC5yZXNwb25zZVVSTCBvciB0aGUgWC1SZXF1ZXN0LVVSTCBoZWFkZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSZXNwb25zZVVybCh4aHI6IE56U2FmZUFueSk6IHN0cmluZyB8IG51bGwge1xyXG4gIGlmICgncmVzcG9uc2VVUkwnIGluIHhociAmJiB4aHIucmVzcG9uc2VVUkwpIHtcclxuICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkw7XHJcbiAgfVxyXG4gIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XHJcbiAgICByZXR1cm4geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJyk7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICog5L2/55SoIGBYTUxIdHRwUmVxdWVzdGAg5Y+R6YCB6K+35rGC5ZKM5o6l5pS25ZON5bqULOaUr+aMgeWQjOatpS/lvILmraVcclxuICogQHNlZSBgSHR0cEhhbmRsZXJgXHJcbiAqIEBzZWUgYEpzb25wQ2xpZW50QmFja2VuZGBcclxuICogQHNlZSBzeW5jZWRcclxuICogQHNlZSBTWU5DRURfRU5BQkxFRFxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBc3luY0h0dHBYaHJCYWNrZW5kIGltcGxlbWVudHMgSHR0cEJhY2tlbmQge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgeGhyRmFjdG9yeTogWGhyRmFjdG9yeSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvY2Vzc2VzIGEgcmVxdWVzdCBhbmQgcmV0dXJucyBhIHN0cmVhbSBvZiByZXNwb25zZSBldmVudHMuXHJcbiAgICogQHBhcmFtIHJlcSBUaGUgcmVxdWVzdCBvYmplY3QuXHJcbiAgICogQHJldHVybnMgQW4gb2JzZXJ2YWJsZSBvZiB0aGUgcmVzcG9uc2UgZXZlbnRzLlxyXG4gICAqL1xyXG4gIGhhbmRsZShyZXE6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxOelNhZmVBbnk+PiB7XHJcbiAgICAvLyBRdWljayBjaGVjayB0byBnaXZlIGEgYmV0dGVyIGVycm9yIG1lc3NhZ2Ugd2hlbiBhIHVzZXIgYXR0ZW1wdHMgdG8gdXNlXHJcbiAgICAvLyBIdHRwQ2xpZW50Lmpzb25wKCkgd2l0aG91dCBpbnN0YWxsaW5nIHRoZSBIdHRwQ2xpZW50SnNvbnBNb2R1bGVcclxuICAgIGlmIChyZXEubWV0aG9kID09PSAnSlNPTlAnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQXR0ZW1wdGVkIHRvIGNvbnN0cnVjdCBKc29ucCByZXF1ZXN0IHdpdGhvdXQgSHR0cENsaWVudEpzb25wTW9kdWxlIGluc3RhbGxlZC5gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFdmVyeXRoaW5nIGhhcHBlbnMgb24gT2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24uXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxIdHRwRXZlbnQ8TnpTYWZlQW55Pj4pID0+IHtcclxuICAgICAgLy8gU3RhcnQgYnkgc2V0dGluZyB1cCB0aGUgWEhSIG9iamVjdCB3aXRoIHJlcXVlc3QgbWV0aG9kLCBVUkwsIGFuZCB3aXRoQ3JlZGVudGlhbHMgZmxhZy5cclxuICAgICAgY29uc3QgeGhyID0gdGhpcy54aHJGYWN0b3J5LmJ1aWxkKCk7XHJcbiAgICAgIC8vIOaYr+WQpuWQjOatpSDmt7vliqDlkIzmraUv5byC5q2l6K+35rGC5pSv5oyBXHJcbiAgICAgIGxldCBzeW5jZWQgPSByZXEuY29udGV4dC5nZXQoU1lOQ0VEX0VOQUJMRUQpO1xyXG4gICAgICBpZiAoIXN5bmNlZCkge1xyXG4gICAgICAgIHN5bmNlZCA9IHJlcS51cmxXaXRoUGFyYW1zLmluZGV4T2YoJ3N5bmNlZD10cnVlJykgIT09IC0xO1xyXG4gICAgICB9XHJcbiAgICAgIHhoci5vcGVuKHJlcS5tZXRob2QsIHJlcS51cmxXaXRoUGFyYW1zLCAhc3luY2VkKTtcclxuICAgICAgaWYgKHJlcS53aXRoQ3JlZGVudGlhbHMpIHtcclxuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWRkIGFsbCB0aGUgcmVxdWVzdGVkIGhlYWRlcnMuXHJcbiAgICAgIHJlcS5oZWFkZXJzLmtleXMoKS5mb3JFYWNoKG5hbWUgPT4geGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgPHN0cmluZz5yZXEuaGVhZGVycy5nZXRBbGwobmFtZSk/LmpvaW4/LignLCcpKSk7XHJcblxyXG4gICAgICAvLyBBZGQgYW4gQWNjZXB0IGhlYWRlciBpZiBvbmUgaXNuJ3QgcHJlc2VudCBhbHJlYWR5LlxyXG4gICAgICBpZiAoIXJlcS5oZWFkZXJzLmhhcygnQWNjZXB0JykpIHtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBdXRvLWRldGVjdCB0aGUgQ29udGVudC1UeXBlIGhlYWRlciBpZiBvbmUgaXNuJ3QgcHJlc2VudCBhbHJlYWR5LlxyXG4gICAgICBpZiAoIXJlcS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcclxuICAgICAgICBjb25zdCBkZXRlY3RlZFR5cGUgPSByZXEuZGV0ZWN0Q29udGVudFR5cGVIZWFkZXIoKTtcclxuICAgICAgICAvLyBTb21ldGltZXMgQ29udGVudC1UeXBlIGRldGVjdGlvbiBmYWlscy5cclxuICAgICAgICBpZiAoZGV0ZWN0ZWRUeXBlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgZGV0ZWN0ZWRUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNldCB0aGUgcmVzcG9uc2VUeXBlIGlmIG9uZSB3YXMgcmVxdWVzdGVkLlxyXG4gICAgICBpZiAocmVxLnJlc3BvbnNlVHlwZSAmJiAhc3luY2VkKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUeXBlID0gcmVxLnJlc3BvbnNlVHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBKU09OIHJlc3BvbnNlcyBuZWVkIHRvIGJlIHByb2Nlc3NlZCBhcyB0ZXh0LiBUaGlzIGlzIGJlY2F1c2UgaWYgdGhlIHNlcnZlclxyXG4gICAgICAgIC8vIHJldHVybnMgYW4gWFNTSS1wcmVmaXhlZCBKU09OIHJlc3BvbnNlLCB0aGUgYnJvd3NlciB3aWxsIGZhaWwgdG8gcGFyc2UgaXQsXHJcbiAgICAgICAgLy8geGhyLnJlc3BvbnNlIHdpbGwgYmUgbnVsbCwgYW5kIHhoci5yZXNwb25zZVRleHQgY2Fubm90IGJlIGFjY2Vzc2VkIHRvXHJcbiAgICAgICAgLy8gcmV0cmlldmUgdGhlIHByZWZpeGVkIEpTT04gZGF0YSBpbiBvcmRlciB0byBzdHJpcCB0aGUgcHJlZml4LiBUaHVzLCBhbGwgSlNPTlxyXG4gICAgICAgIC8vIGlzIHBhcnNlZCBieSBmaXJzdCByZXF1ZXN0aW5nIHRleHQgYW5kIHRoZW4gYXBwbHlpbmcgSlNPTi5wYXJzZS5cclxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gKHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nID8gcmVzcG9uc2VUeXBlIDogJ3RleHQnKSBhcyBOelNhZmVBbnk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNlcmlhbGl6ZSB0aGUgcmVxdWVzdCBib2R5IGlmIG9uZSBpcyBwcmVzZW50LiBJZiBub3QsIHRoaXMgd2lsbCBiZSBzZXQgdG8gbnVsbC5cclxuICAgICAgY29uc3QgcmVxQm9keSA9IHJlcS5zZXJpYWxpemVCb2R5KCk7XHJcblxyXG4gICAgICAvLyBJZiBwcm9ncmVzcyBldmVudHMgYXJlIGVuYWJsZWQsIHJlc3BvbnNlIGhlYWRlcnMgd2lsbCBiZSBkZWxpdmVyZWRcclxuICAgICAgLy8gaW4gdHdvIGV2ZW50cyAtIHRoZSBIdHRwSGVhZGVyUmVzcG9uc2UgZXZlbnQgYW5kIHRoZSBmdWxsIEh0dHBSZXNwb25zZVxyXG4gICAgICAvLyBldmVudC4gSG93ZXZlciwgc2luY2UgcmVzcG9uc2UgaGVhZGVycyBkb24ndCBjaGFuZ2UgaW4gYmV0d2VlbiB0aGVzZVxyXG4gICAgICAvLyB0d28gZXZlbnRzLCBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gcGFyc2UgdGhlbSB0d2ljZS4gU28gaGVhZGVyUmVzcG9uc2VcclxuICAgICAgLy8gY2FjaGVzIHRoZSBkYXRhIGV4dHJhY3RlZCBmcm9tIHRoZSByZXNwb25zZSB3aGVuZXZlciBpdCdzIGZpcnN0IHBhcnNlZCxcclxuICAgICAgLy8gdG8gZW5zdXJlIHBhcnNpbmcgaXNuJ3QgZHVwbGljYXRlZC5cclxuICAgICAgbGV0IGhlYWRlclJlc3BvbnNlOiBIdHRwSGVhZGVyUmVzcG9uc2UgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIHBhcnRpYWxGcm9tWGhyIGV4dHJhY3RzIHRoZSBIdHRwSGVhZGVyUmVzcG9uc2UgZnJvbSB0aGUgY3VycmVudCBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICAvLyBzdGF0ZSwgYW5kIG1lbW9pemVzIGl0IGludG8gaGVhZGVyUmVzcG9uc2UuXHJcbiAgICAgIGNvbnN0IHBhcnRpYWxGcm9tWGhyID0gKCk6IEh0dHBIZWFkZXJSZXNwb25zZSA9PiB7XHJcbiAgICAgICAgaWYgKGhlYWRlclJlc3BvbnNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gaGVhZGVyUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQgfHwgJ09LJztcclxuXHJcbiAgICAgICAgLy8gUGFyc2UgaGVhZGVycyBmcm9tIFhNTEh0dHBSZXF1ZXN0IC0gdGhpcyBzdGVwIGlzIGxhenkuXHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xyXG5cclxuICAgICAgICAvLyBSZWFkIHRoZSByZXNwb25zZSBVUkwgZnJvbSB0aGUgWE1MSHR0cFJlc3BvbnNlIGluc3RhbmNlIGFuZCBmYWxsIGJhY2sgb24gdGhlXHJcbiAgICAgICAgLy8gcmVxdWVzdCBVUkwuXHJcbiAgICAgICAgY29uc3QgdXJsID0gZ2V0UmVzcG9uc2VVcmwoeGhyKSB8fCByZXEudXJsO1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIEh0dHBIZWFkZXJSZXNwb25zZSBhbmQgbWVtb2l6ZSBpdC5cclxuICAgICAgICBoZWFkZXJSZXNwb25zZSA9IG5ldyBIdHRwSGVhZGVyUmVzcG9uc2UoeyBoZWFkZXJzLCBzdGF0dXM6IHhoci5zdGF0dXMsIHN0YXR1c1RleHQsIHVybCB9KTtcclxuICAgICAgICByZXR1cm4gaGVhZGVyUmVzcG9uc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBOZXh0LCBhIGZldyBjbG9zdXJlcyBhcmUgZGVmaW5lZCBmb3IgdGhlIHZhcmlvdXMgZXZlbnRzIHdoaWNoIFhNTEh0dHBSZXF1ZXN0IGNhblxyXG4gICAgICAvLyBlbWl0LiBUaGlzIGFsbG93cyB0aGVtIHRvIGJlIHVucmVnaXN0ZXJlZCBhcyBldmVudCBsaXN0ZW5lcnMgbGF0ZXIuXHJcblxyXG4gICAgICAvLyBGaXJzdCB1cCBpcyB0aGUgbG9hZCBldmVudCwgd2hpY2ggcmVwcmVzZW50cyBhIHJlc3BvbnNlIGJlaW5nIGZ1bGx5IGF2YWlsYWJsZS5cclxuICAgICAgY29uc3Qgb25Mb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIFJlYWQgcmVzcG9uc2Ugc3RhdGUgZnJvbSB0aGUgbWVtb2l6ZWQgcGFydGlhbCBkYXRhLlxyXG4gICAgICAgIGNvbnN0IHBhcnRYaHIgPSBwYXJ0aWFsRnJvbVhocigpO1xyXG4gICAgICAgIGNvbnN0IHsgaGVhZGVycywgc3RhdHVzVGV4dCwgdXJsIH0gPSBwYXJ0WGhyO1xyXG4gICAgICAgIGxldCBzdGF0dXMgPSBwYXJ0WGhyLnN0YXR1cztcclxuXHJcbiAgICAgICAgLy8gVGhlIGJvZHkgd2lsbCBiZSByZWFkIG91dCBpZiBwcmVzZW50LlxyXG4gICAgICAgIGxldCBib2R5OiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gSHR0cFN0YXR1c0NvZGUuTm9Db250ZW50KSB7XHJcbiAgICAgICAgICAvLyBVc2UgWE1MSHR0cFJlcXVlc3QucmVzcG9uc2UgaWYgc2V0LCByZXNwb25zZVRleHQgb3RoZXJ3aXNlLlxyXG4gICAgICAgICAgYm9keSA9IHR5cGVvZiB4aHIucmVzcG9uc2UgPT09ICd1bmRlZmluZWQnID8geGhyLnJlc3BvbnNlVGV4dCA6IHhoci5yZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5vcm1hbGl6ZSBhbm90aGVyIHBvdGVudGlhbCBidWcgKHRoaXMgb25lIGNvbWVzIGZyb20gQ09SUykuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgICAgc3RhdHVzID0gISFib2R5ID8gSHR0cFN0YXR1c0NvZGUuT2sgOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb2sgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSByZXNwb25zZSB3aWxsIGJlIHRyYW5zbWl0dGVkIG9uIHRoZSBldmVudCBvclxyXG4gICAgICAgIC8vIGVycm9yIGNoYW5uZWwuIFVuc3VjY2Vzc2Z1bCBzdGF0dXMgY29kZXMgKG5vdCAyeHgpIHdpbGwgYWx3YXlzIGJlIGVycm9ycyxcclxuICAgICAgICAvLyBidXQgYSBzdWNjZXNzZnVsIHN0YXR1cyBjb2RlIGNhbiBzdGlsbCByZXN1bHQgaW4gYW4gZXJyb3IgaWYgdGhlIHVzZXJcclxuICAgICAgICAvLyBhc2tlZCBmb3IgSlNPTiBkYXRhIGFuZCB0aGUgYm9keSBjYW5ub3QgYmUgcGFyc2VkIGFzIHN1Y2guXHJcbiAgICAgICAgbGV0IG9rID0gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGJvZHkgbmVlZHMgdG8gYmUgcGFyc2VkIGFzIEpTT04gKGluIG1hbnkgY2FzZXMgdGhlIGJyb3dzZXJcclxuICAgICAgICAvLyB3aWxsIGhhdmUgZG9uZSB0aGF0IGFscmVhZHkpLlxyXG4gICAgICAgIGlmIChyZXEucmVzcG9uc2VUeXBlID09PSAnanNvbicgJiYgdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAvLyBTYXZlIHRoZSBvcmlnaW5hbCBib2R5LCBiZWZvcmUgYXR0ZW1wdGluZyBYU1NJIHByZWZpeCBzdHJpcHBpbmcuXHJcbiAgICAgICAgICBjb25zdCBvcmlnaW5hbEJvZHkgPSBib2R5O1xyXG4gICAgICAgICAgYm9keSA9IGJvZHkucmVwbGFjZShYU1NJX1BSRUZJWCwgJycpO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gQXR0ZW1wdCB0aGUgcGFyc2UuIElmIGl0IGZhaWxzLCBhIHBhcnNlIGVycm9yIHNob3VsZCBiZSBkZWxpdmVyZWQgdG8gdGhlIHVzZXIuXHJcbiAgICAgICAgICAgIGJvZHkgPSBib2R5ICE9PSAnJyA/IEpTT04ucGFyc2UoYm9keSkgOiBudWxsO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gU2luY2UgdGhlIEpTT04ucGFyc2UgZmFpbGVkLCBpdCdzIHJlYXNvbmFibGUgdG8gYXNzdW1lIHRoaXMgbWlnaHQgbm90IGhhdmUgYmVlbiBhXHJcbiAgICAgICAgICAgIC8vIEpTT04gcmVzcG9uc2UuIFJlc3RvcmUgdGhlIG9yaWdpbmFsIGJvZHkgKGluY2x1ZGluZyBhbnkgWFNTSSBwcmVmaXgpIHRvIGRlbGl2ZXJcclxuICAgICAgICAgICAgLy8gYSBiZXR0ZXIgZXJyb3IgcmVzcG9uc2UuXHJcbiAgICAgICAgICAgIGJvZHkgPSBvcmlnaW5hbEJvZHk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGlzIHdhcyBhbiBlcnJvciByZXF1ZXN0IHRvIGJlZ2luIHdpdGgsIGxlYXZlIGl0IGFzIGEgc3RyaW5nLCBpdCBwcm9iYWJseVxyXG4gICAgICAgICAgICAvLyBqdXN0IGlzbid0IEpTT04uIE90aGVyd2lzZSwgZGVsaXZlciB0aGUgcGFyc2luZyBlcnJvciB0byB0aGUgdXNlci5cclxuICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgLy8gRXZlbiB0aG91Z2ggdGhlIHJlc3BvbnNlIHN0YXR1cyB3YXMgMnh4LCB0aGlzIGlzIHN0aWxsIGFuIGVycm9yLlxyXG4gICAgICAgICAgICAgIG9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgLy8gVGhlIHBhcnNlIGVycm9yIGNvbnRhaW5zIHRoZSB0ZXh0IG9mIHRoZSBib2R5IHRoYXQgZmFpbGVkIHRvIHBhcnNlLlxyXG4gICAgICAgICAgICAgIGJvZHkgPSB7IGVycm9yLCB0ZXh0OiBib2R5IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgLy8gQSBzdWNjZXNzZnVsIHJlc3BvbnNlIGlzIGRlbGl2ZXJlZCBvbiB0aGUgZXZlbnQgc3RyZWFtLlxyXG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChcclxuICAgICAgICAgICAgbmV3IEh0dHBSZXNwb25zZSh7XHJcbiAgICAgICAgICAgICAgYm9keSxcclxuICAgICAgICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgICAgICBzdGF0dXNUZXh0LFxyXG4gICAgICAgICAgICAgIHVybDogdXJsIHx8IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIC8vIFRoZSBmdWxsIGJvZHkgaGFzIGJlZW4gcmVjZWl2ZWQgYW5kIGRlbGl2ZXJlZCwgbm8gZnVydGhlciBldmVudHNcclxuICAgICAgICAgIC8vIGFyZSBwb3NzaWJsZS4gVGhpcyByZXF1ZXN0IGlzIGNvbXBsZXRlLlxyXG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQW4gdW5zdWNjZXNzZnVsIHJlcXVlc3QgaXMgZGVsaXZlcmVkIG9uIHRoZSBlcnJvciBjaGFubmVsLlxyXG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoXHJcbiAgICAgICAgICAgIG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XHJcbiAgICAgICAgICAgICAgLy8gVGhlIGVycm9yIGluIHRoaXMgY2FzZSBpcyB0aGUgcmVzcG9uc2UgYm9keSAoZXJyb3IgZnJvbSB0aGUgc2VydmVyKS5cclxuICAgICAgICAgICAgICBlcnJvcjogYm9keSxcclxuICAgICAgICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgICAgICBzdGF0dXNUZXh0LFxyXG4gICAgICAgICAgICAgIHVybDogdXJsIHx8IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBUaGUgb25FcnJvciBjYWxsYmFjayBpcyBjYWxsZWQgd2hlbiBzb21ldGhpbmcgZ29lcyB3cm9uZyBhdCB0aGUgbmV0d29yayBsZXZlbC5cclxuICAgICAgLy8gQ29ubmVjdGlvbiB0aW1lb3V0LCBETlMgZXJyb3IsIG9mZmxpbmUsIGV0Yy4gVGhlc2UgYXJlIGFjdHVhbCBlcnJvcnMsIGFuZCBhcmVcclxuICAgICAgLy8gdHJhbnNtaXR0ZWQgb24gdGhlIGVycm9yIGNoYW5uZWwuXHJcbiAgICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyb3I6IFByb2dyZXNzRXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCB7IHVybCB9ID0gcGFydGlhbEZyb21YaHIoKTtcclxuICAgICAgICBjb25zdCByZXMgPSBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMgfHwgMCxcclxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0IHx8ICdVbmtub3duIEVycm9yJyxcclxuICAgICAgICAgIHVybDogdXJsIHx8IHVuZGVmaW5lZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9ic2VydmVyLmVycm9yKHJlcyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBUaGUgc2VudEhlYWRlcnMgZmxhZyB0cmFja3Mgd2hldGhlciB0aGUgSHR0cFJlc3BvbnNlSGVhZGVycyBldmVudFxyXG4gICAgICAvLyBoYXMgYmVlbiBzZW50IG9uIHRoZSBzdHJlYW0uIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHRyYWNrIGlmIHByb2dyZXNzXHJcbiAgICAgIC8vIGlzIGVuYWJsZWQgc2luY2UgdGhlIGV2ZW50IHdpbGwgYmUgc2VudCBvbiBvbmx5IHRoZSBmaXJzdCBkb3dubG9hZFxyXG4gICAgICAvLyBwcm9nZXJzcyBldmVudC5cclxuICAgICAgbGV0IHNlbnRIZWFkZXJzID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBUaGUgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnQgaGFuZGxlciwgd2hpY2ggaXMgb25seSByZWdpc3RlcmVkIGlmXHJcbiAgICAgIC8vIHByb2dyZXNzIGV2ZW50cyBhcmUgZW5hYmxlZC5cclxuICAgICAgY29uc3Qgb25Eb3duUHJvZ3Jlc3MgPSAoZXZlbnQ6IFByb2dyZXNzRXZlbnQpID0+IHtcclxuICAgICAgICAvLyBTZW5kIHRoZSBIdHRwUmVzcG9uc2VIZWFkZXJzIGV2ZW50IGlmIGl0IGhhc24ndCBiZWVuIHNlbnQgYWxyZWFkeS5cclxuICAgICAgICBpZiAoIXNlbnRIZWFkZXJzKSB7XHJcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHBhcnRpYWxGcm9tWGhyKCkpO1xyXG4gICAgICAgICAgc2VudEhlYWRlcnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3RhcnQgYnVpbGRpbmcgdGhlIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50IHRvIGRlbGl2ZXIgb24gdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgLy8gZXZlbnQgc3RyZWFtLlxyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzRXZlbnQ6IEh0dHBEb3dubG9hZFByb2dyZXNzRXZlbnQgPSB7XHJcbiAgICAgICAgICB0eXBlOiBIdHRwRXZlbnRUeXBlLkRvd25sb2FkUHJvZ3Jlc3MsXHJcbiAgICAgICAgICBsb2FkZWQ6IGV2ZW50LmxvYWRlZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIGluIHRoZSBldmVudCBpZiBpdCdzIGF2YWlsYWJsZS5cclxuICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudC50b3RhbCA9IGV2ZW50LnRvdGFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHJlcXVlc3Qgd2FzIGZvciB0ZXh0IGNvbnRlbnQgYW5kIGEgcGFydGlhbCByZXNwb25zZSBpc1xyXG4gICAgICAgIC8vIGF2YWlsYWJsZSBvbiBYTUxIdHRwUmVxdWVzdCwgaW5jbHVkZSBpdCBpbiB0aGUgcHJvZ3Jlc3MgZXZlbnRcclxuICAgICAgICAvLyB0byBhbGxvdyBmb3Igc3RyZWFtaW5nIHJlYWRzLlxyXG4gICAgICAgIGlmIChyZXEucmVzcG9uc2VUeXBlID09PSAndGV4dCcgJiYgISF4aHIucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50LnBhcnRpYWxUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsbHksIGZpcmUgdGhlIGV2ZW50LlxyXG4gICAgICAgIG9ic2VydmVyLm5leHQocHJvZ3Jlc3NFdmVudCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBUaGUgdXBsb2FkIHByb2dyZXNzIGV2ZW50IGhhbmRsZXIsIHdoaWNoIGlzIG9ubHkgcmVnaXN0ZXJlZCBpZlxyXG4gICAgICAvLyBwcm9ncmVzcyBldmVudHMgYXJlIGVuYWJsZWQuXHJcbiAgICAgIGNvbnN0IG9uVXBQcm9ncmVzcyA9IChldmVudDogUHJvZ3Jlc3NFdmVudCkgPT4ge1xyXG4gICAgICAgIC8vIFVwbG9hZCBwcm9ncmVzcyBldmVudHMgYXJlIHNpbXBsZXIuIEJlZ2luIGJ1aWxkaW5nIHRoZSBwcm9ncmVzc1xyXG4gICAgICAgIC8vIGV2ZW50LlxyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzOiBIdHRwVXBsb2FkUHJvZ3Jlc3NFdmVudCA9IHtcclxuICAgICAgICAgIHR5cGU6IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MsXHJcbiAgICAgICAgICBsb2FkZWQ6IGV2ZW50LmxvYWRlZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgYmVpbmcgdXBsb2FkZWQgaXMgYXZhaWxhYmxlLCBpbmNsdWRlXHJcbiAgICAgICAgLy8gaXQuXHJcbiAgICAgICAgaWYgKGV2ZW50Lmxlbmd0aENvbXB1dGFibGUpIHtcclxuICAgICAgICAgIHByb2dyZXNzLnRvdGFsID0gZXZlbnQudG90YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZW5kIHRoZSBldmVudC5cclxuICAgICAgICBvYnNlcnZlci5uZXh0KHByb2dyZXNzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEJ5IGRlZmF1bHQsIHJlZ2lzdGVyIGZvciBsb2FkIGFuZCBlcnJvciBldmVudHMuXHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcclxuICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCd0aW1lb3V0Jywgb25FcnJvcik7XHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uRXJyb3IpO1xyXG5cclxuICAgICAgLy8gUHJvZ3Jlc3MgZXZlbnRzIGFyZSBvbmx5IGVuYWJsZWQgaWYgcmVxdWVzdGVkLlxyXG4gICAgICBpZiAocmVxLnJlcG9ydFByb2dyZXNzKSB7XHJcbiAgICAgICAgLy8gRG93bmxvYWQgcHJvZ3Jlc3MgaXMgYWx3YXlzIGVuYWJsZWQgaWYgcmVxdWVzdGVkLlxyXG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uRG93blByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgLy8gVXBsb2FkIHByb2dyZXNzIGRlcGVuZHMgb24gd2hldGhlciB0aGVyZSBpcyBhIGJvZHkgdG8gdXBsb2FkLlxyXG4gICAgICAgIGlmIChyZXFCb2R5ICE9PSBudWxsICYmIHhoci51cGxvYWQpIHtcclxuICAgICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvblVwUHJvZ3Jlc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRmlyZSB0aGUgcmVxdWVzdCwgYW5kIG5vdGlmeSB0aGUgZXZlbnQgc3RyZWFtIHRoYXQgaXQgd2FzIGZpcmVkLlxyXG4gICAgICB4aHIuc2VuZChyZXFCb2R5ISk7XHJcbiAgICAgIG9ic2VydmVyLm5leHQoeyB0eXBlOiBIdHRwRXZlbnRUeXBlLlNlbnQgfSk7XHJcblxyXG4gICAgICAvLyBUaGlzIGlzIHRoZSByZXR1cm4gZnJvbSB0aGUgT2JzZXJ2YWJsZSBmdW5jdGlvbiwgd2hpY2ggaXMgdGhlXHJcbiAgICAgIC8vIHJlcXVlc3QgY2FuY2VsbGF0aW9uIGhhbmRsZXIuXHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgLy8gT24gYSBjYW5jZWxsYXRpb24sIHJlbW92ZSBhbGwgcmVnaXN0ZXJlZCBldmVudCBsaXN0ZW5lcnMuXHJcbiAgICAgICAgeGhyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XHJcbiAgICAgICAgeGhyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25FcnJvcik7XHJcbiAgICAgICAgeGhyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xyXG4gICAgICAgIHhoci5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1lb3V0Jywgb25FcnJvcik7XHJcbiAgICAgICAgaWYgKHJlcS5yZXBvcnRQcm9ncmVzcykge1xyXG4gICAgICAgICAgeGhyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgb25Eb3duUHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgaWYgKHJlcUJvZHkgIT09IG51bGwgJiYgeGhyLnVwbG9hZCkge1xyXG4gICAgICAgICAgICB4aHIudXBsb2FkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgb25VcFByb2dyZXNzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsbHksIGFib3J0IHRoZSBpbi1mbGlnaHQgcmVxdWVzdC5cclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IHhoci5ET05FKSB7XHJcbiAgICAgICAgICB4aHIuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19