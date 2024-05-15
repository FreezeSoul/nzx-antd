import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpDefaultCodec } from './http-default-encoder';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
/**
 * 请求参数处理
 */
export class HttpParamsInterceptor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wYXJhbXMuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLXBhcmFtcy5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBMkMsVUFBVSxFQUFlLE1BQU0sc0JBQXNCLENBQUM7QUFFeEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVyRDs7R0FFRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsZ0JBQWUsQ0FBQztJQUVoQixTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQTJCO1FBQzNDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztTQUMxQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBa0I7UUFDakMsTUFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBRS9ELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLE1BQU0sRUFBRTtnQkFDVixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEdBQUcsQ0FBQzthQUNaO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFWCxPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO3dHQTdCVSxxQkFBcUI7NEdBQXJCLHFCQUFxQjs7NEZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwRGVmYXVsdENvZGVjIH0gZnJvbSAnLi9odHRwLWRlZmF1bHQtZW5jb2Rlcic7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcblxyXG4vKipcclxuICog6K+35rGC5Y+C5pWw5aSE55CGXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwUGFyYW1zSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxOelNhZmVBbnk+PiB7XHJcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUodGhpcy5wcm9jZXNzUGFyYW1ldGVycyhyZXEpKTtcclxuICB9XHJcblxyXG4gIHByb2Nlc3NQYXJhbWV0ZXJzKHJlcTogSHR0cFJlcXVlc3Q8TnpTYWZlQW55Pikge1xyXG4gICAgaWYgKHJlcS5wYXJhbXMgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcS5jbG9uZSh7XHJcbiAgICAgIHBhcmFtczogdGhpcy5wcm9jZXNzR2V0UGFyYW1zKHJlcS5wYXJhbXMpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb2Nlc3NHZXRQYXJhbXMocGFyYW1zOiBIdHRwUGFyYW1zKSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIE56U2FmZUFueT4gPSB7IHI6IE1hdGgucmFuZG9tKCkgfTtcclxuXHJcbiAgICBwYXJhbXMua2V5cygpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWVzID0gcGFyYW1zLmdldEFsbChrZXkpO1xyXG4gICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgYWNjW2tleV0gPSB2YWx1ZXMubGVuZ3RoID4gMSA/IHZhbHVlcyA6IHZhbHVlc1swXTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCByZXN1bHQpO1xyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcyh7IGZyb21TdHJpbmc6IE56eFV0aWxzLnNlcmlhbGl6ZShyZXN1bHQpLCBlbmNvZGVyOiBIdHRwRGVmYXVsdENvZGVjIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=