import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpDefaultCodec } from './http-default-encoder';
import { NzxUtils } from '@xmagic/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wYXJhbXMuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLXBhcmFtcy5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBMkMsVUFBVSxFQUFlLE1BQU0sc0JBQXNCLENBQUM7QUFFeEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUVqRDs7R0FFRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsZ0JBQWUsQ0FBQztJQUVoQixTQUFTLENBQUMsR0FBMkIsRUFBRSxJQUFpQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQTJCO1FBQzNDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztTQUMxQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsTUFBa0I7UUFDakMsTUFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBRS9ELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLE1BQU0sRUFBRTtnQkFDVixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEdBQUcsQ0FBQzthQUNaO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFWCxPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO3dHQTdCVSxxQkFBcUI7NEdBQXJCLHFCQUFxQjs7NEZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBIdHRwRGVmYXVsdENvZGVjIH0gZnJvbSAnLi9odHRwLWRlZmF1bHQtZW5jb2Rlcic7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiDor7fmsYLlj4LmlbDlpITnkIZcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBQYXJhbXNJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PE56U2FmZUFueT4+IHtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLnByb2Nlc3NQYXJhbWV0ZXJzKHJlcSkpO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc1BhcmFtZXRlcnMocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+KSB7XHJcbiAgICBpZiAocmVxLnBhcmFtcyA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiByZXE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVxLmNsb25lKHtcclxuICAgICAgcGFyYW1zOiB0aGlzLnByb2Nlc3NHZXRQYXJhbXMocmVxLnBhcmFtcylcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0dldFBhcmFtcyhwYXJhbXM6IEh0dHBQYXJhbXMpIHtcclxuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgTnpTYWZlQW55PiA9IHsgcjogTWF0aC5yYW5kb20oKSB9O1xyXG5cclxuICAgIHBhcmFtcy5rZXlzKCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSBwYXJhbXMuZ2V0QWxsKGtleSk7XHJcbiAgICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgICBhY2Nba2V5XSA9IHZhbHVlcy5sZW5ndGggPiAxID8gdmFsdWVzIDogdmFsdWVzWzBdO1xyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHJlc3VsdCk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKHsgZnJvbVN0cmluZzogTnp4VXRpbHMuc2VyaWFsaXplKHJlc3VsdCksIGVuY29kZXI6IEh0dHBEZWZhdWx0Q29kZWMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==