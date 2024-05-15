import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
/**
 * 处理 URL
 */
export class HttpUrlInterceptor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC11cmwuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLXVybC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ1A7SUFBdEIsWUFBc0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBMkI7UUFDcEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDakI7WUFDRCxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDL0M7UUFFRCxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtZQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSyxNQUFpQyxDQUFDLEtBQUssRUFBRTtvQkFDNUMsT0FBTyxNQUFnQyxDQUFDO2lCQUN6QztnQkFDRCxNQUFNLE1BQU0sR0FBRyxNQUE0QixDQUFDO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtvQkFDZixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7d0dBL0JVLGtCQUFrQjs0R0FBbEIsa0JBQWtCOzs0RkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucywgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkJztcclxuXHJcbi8qKlxyXG4gKiDlpITnkIYgVVJMXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwVXJsSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2UpIHt9XHJcblxyXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8TnpTYWZlQW55Pj4ge1xyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHRoaXMucHJvY2Vzc1VybChyZXEpKTtcclxuICB9XHJcblxyXG4gIHByb2Nlc3NVcmwocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+KTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55PiB7XHJcbiAgICBsZXQgdXJsID0gcmVxLnVybDtcclxuICAgIGlmICghL15odHRwL2kudGVzdCh1cmwpKSB7XHJcbiAgICAgIGlmICghL15cXC8vLnRlc3QodXJsKSkge1xyXG4gICAgICAgIHVybCA9ICcvJyArIHVybDtcclxuICAgICAgfVxyXG4gICAgICB1cmwgPSAodGhpcy5hbnRkU2VydmljZS5iYXNlUGF0aCB8fCAnJykgKyB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5L2/55So6Ieq5a6a5LmJ6K+35rGC5aSE55CG5ZmoXHJcbiAgICBpZiAodGhpcy5hbnRkU2VydmljZS5oYW5kbGVSZXF1ZXN0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1JlcSA9IHRoaXMuYW50ZFNlcnZpY2UuaGFuZGxlUmVxdWVzdChyZXEsIHVybCk7XHJcbiAgICAgIGlmIChuZXdSZXEpIHtcclxuICAgICAgICBpZiAoKG5ld1JlcSBhcyBIdHRwUmVxdWVzdDxOelNhZmVBbnk+KS5jbG9uZSkge1xyXG4gICAgICAgICAgcmV0dXJuIG5ld1JlcSBhcyBIdHRwUmVxdWVzdDxOelNhZmVBbnk+O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcHRpb24gPSBuZXdSZXEgYXMgSHR0cFJlcXVlc3RPcHRpb25zO1xyXG4gICAgICAgIGlmICghb3B0aW9uLnVybCkge1xyXG4gICAgICAgICAgb3B0aW9uLnVybCA9IHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcS5jbG9uZShvcHRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVxLmNsb25lKHsgdXJsIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=