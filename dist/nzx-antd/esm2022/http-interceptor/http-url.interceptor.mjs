import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC11cmwuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLXVybC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ1A7SUFBdEIsWUFBc0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBMkI7UUFDcEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDakI7WUFDRCxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDL0M7UUFFRCxhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtZQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSyxNQUFpQyxDQUFDLEtBQUssRUFBRTtvQkFDNUMsT0FBTyxNQUFnQyxDQUFDO2lCQUN6QztnQkFDRCxNQUFNLE1BQU0sR0FBRyxNQUE0QixDQUFDO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtvQkFDZixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7d0dBL0JVLGtCQUFrQjs0R0FBbEIsa0JBQWtCOzs0RkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0T3B0aW9ucywgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZCc7XHJcblxyXG4vKipcclxuICog5aSE55CGIFVSTFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cFVybEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlKSB7fVxyXG5cclxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PE56U2FmZUFueT4+IHtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLnByb2Nlc3NVcmwocmVxKSk7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzVXJsKHJlcTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55Pik6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4ge1xyXG4gICAgbGV0IHVybCA9IHJlcS51cmw7XHJcbiAgICBpZiAoIS9eaHR0cC9pLnRlc3QodXJsKSkge1xyXG4gICAgICBpZiAoIS9eXFwvLy50ZXN0KHVybCkpIHtcclxuICAgICAgICB1cmwgPSAnLycgKyB1cmw7XHJcbiAgICAgIH1cclxuICAgICAgdXJsID0gKHRoaXMuYW50ZFNlcnZpY2UuYmFzZVBhdGggfHwgJycpICsgdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS9v+eUqOiHquWumuS5ieivt+axguWkhOeQhuWZqFxyXG4gICAgaWYgKHRoaXMuYW50ZFNlcnZpY2UuaGFuZGxlUmVxdWVzdCkge1xyXG4gICAgICBjb25zdCBuZXdSZXEgPSB0aGlzLmFudGRTZXJ2aWNlLmhhbmRsZVJlcXVlc3QocmVxLCB1cmwpO1xyXG4gICAgICBpZiAobmV3UmVxKSB7XHJcbiAgICAgICAgaWYgKChuZXdSZXEgYXMgSHR0cFJlcXVlc3Q8TnpTYWZlQW55PikuY2xvbmUpIHtcclxuICAgICAgICAgIHJldHVybiBuZXdSZXEgYXMgSHR0cFJlcXVlc3Q8TnpTYWZlQW55PjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gbmV3UmVxIGFzIEh0dHBSZXF1ZXN0T3B0aW9ucztcclxuICAgICAgICBpZiAoIW9wdGlvbi51cmwpIHtcclxuICAgICAgICAgIG9wdGlvbi51cmwgPSB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXEuY2xvbmUob3B0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcS5jbG9uZSh7IHVybCB9KTtcclxuICB9XHJcbn1cclxuIl19