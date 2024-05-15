import { Injectable } from '@angular/core';
import { HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * 模板字符串函数, 构造同步请求URL
 * @example
 * let value!: string;
 * this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)}).subscribe(res => (value = res));
 * console.log(value);
 */
export function synced(url, ...keys) {
    const strings = [];
    for (let i = 0; i < url.length; i++) {
        strings.push(url.raw[i], keys[i] == null ? '' : keys[i]);
    }
    const result = strings.join('');
    return result + (result.indexOf('?') === -1 ? '?' : '&') + 'synced=true';
}
/**
 * 启用同步请求
 * @example
 * let value!: string;
 * this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)}).subscribe(res => (value = res));
 * console.log(value);
 */
export const SYNCED_ENABLED = new HttpContextToken(() => false);
/**
 * 是否启用loading
 * @example
 * this.http.get<string>('url', { context: new HttpContext().set(LOADING_ENABLED, false).set(...)});
 */
export const LOADING_ENABLED = new HttpContextToken(() => true);
export class FetcherService {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * 处理异步参数
     * @param data 参数
     */
    static resolveParams(data) {
        if (NzxUtils.isFunction(data)) {
            const result = data();
            if (result instanceof Observable) {
                return result;
            }
            return of(result);
        }
        if (data instanceof Observable) {
            return data;
        }
        return of(data);
    }
    /**
     * 发起请求, 参数可以是异步对象或函数
     * @param option 请求配置
     */
    fetch(option) {
        return FetcherService.resolveParams(option.data).pipe(switchMap(value => {
            const data = option.beforeSend ? option.beforeSend(value || {}) : value;
            return this.doFetch({ ...option, data });
        }));
    }
    /**
     * 同步请求, 参数可以是异步对象或函数
     * @param option 请求配置
     */
    fetchSync(option) {
        return NzxUtils.getAjaxValue(this.fetch({ ...option, async: false }));
    }
    /**
     * 送请求
     * @param options 参数不包含函数不进行二次处理
     */
    doFetch(options) {
        const option = {};
        if (options.responseType) {
            option.responseType = options.responseType;
        }
        if (options.observe) {
            option.observe = options.observe;
        }
        option.context ||= new HttpContext();
        if (options.async === false) {
            option.context.set(SYNCED_ENABLED, true);
        }
        if (options.loading === false) {
            option.context.set(LOADING_ENABLED, false);
        }
        const data = NzxUtils.isFunction(options.data) ? options.data() : options.data;
        if (/^post|put$/i.test(options.method)) {
            option.body = data;
        }
        else {
            option.params = data;
        }
        return this.http.request(options.method || 'get', options.url, option);
    }
    /**
     * 同步请求, 参数不包含函数不进行二次处理
     * @param options
     */
    doFetchSync(options) {
        return NzxUtils.getAjaxValue(this.doFetch({ ...options, async: false }));
    }
    /**
     * 使用同步方式进行远程校验
     * @param options
     */
    remoteValidate(options) {
        return (control) => {
            if (control.value == null || !control.value.length) {
                return null;
            }
            if (options.beforeSend) {
                const beforeSend = options.beforeSend;
                options.beforeSend = data => {
                    return beforeSend(data, control);
                };
            }
            if (options.data && NzxUtils.isFunction(options.data)) {
                const dataFn = options.data;
                options.data = () => {
                    return dataFn(control);
                };
            }
            // @ts-ignore
            const data = this.doFetchSync(options);
            if (options.afterFetch) {
                return options.afterFetch(data);
            }
            if (data == null) {
                return null;
            }
            if (NzxUtils.isBoolean(data)) {
                return data ? null : { remote: { message: options.message || '格式不正确' } };
            }
            return data;
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FetcherService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FetcherService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FetcherService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NlcnZpY2UvZmV0Y2hlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQUdyRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsTUFBTSxDQUFDLEdBQXlCLEVBQUUsR0FBRyxJQUFjO0lBQ2pFLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUMzRSxD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Q2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBSSxPQUFPLENBQUMsQ0FBQztZQUMxQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztZQUVELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDaEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUUsRUFBRSxDQUFDO2FBQzFFO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO3dHQXpIVSxjQUFjOzRHQUFkLGNBQWM7OzRGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDb250ZXh0LCBIdHRwQ29udGV4dFRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vKipcclxuICog5qih5p2/5a2X56ym5Liy5Ye95pWwLCDmnoTpgKDlkIzmraXor7fmsYJVUkxcclxuICogQGV4YW1wbGVcclxuICogbGV0IHZhbHVlITogc3RyaW5nO1xyXG4gKiB0aGlzLmh0dHAuZ2V0PHN0cmluZz4oJ3VybCcsIHsgY29udGV4dDogbmV3IEh0dHBDb250ZXh0KCkuc2V0KFNZTkNFRF9FTkFCTEVELCB0cnVlKX0pLnN1YnNjcmliZShyZXMgPT4gKHZhbHVlID0gcmVzKSk7XHJcbiAqIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzeW5jZWQodXJsOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4ua2V5czogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gIGNvbnN0IHN0cmluZ3MgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgc3RyaW5ncy5wdXNoKHVybC5yYXdbaV0sIGtleXNbaV0gPT0gbnVsbCA/ICcnIDoga2V5c1tpXSk7XHJcbiAgfVxyXG4gIGNvbnN0IHJlc3VsdCA9IHN0cmluZ3Muam9pbignJyk7XHJcbiAgcmV0dXJuIHJlc3VsdCArIChyZXN1bHQuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAnc3luY2VkPXRydWUnO1xyXG59XHJcblxyXG4vKipcclxuICog5ZCv55So5ZCM5q2l6K+35rGCXHJcbiAqIEBleGFtcGxlXHJcbiAqIGxldCB2YWx1ZSE6IHN0cmluZztcclxuICogdGhpcy5odHRwLmdldDxzdHJpbmc+KCd1cmwnLCB7IGNvbnRleHQ6IG5ldyBIdHRwQ29udGV4dCgpLnNldChTWU5DRURfRU5BQkxFRCwgdHJ1ZSl9KS5zdWJzY3JpYmUocmVzID0+ICh2YWx1ZSA9IHJlcykpO1xyXG4gKiBjb25zb2xlLmxvZyh2YWx1ZSk7XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU1lOQ0VEX0VOQUJMRUQgPSBuZXcgSHR0cENvbnRleHRUb2tlbjxib29sZWFuPigoKSA9PiBmYWxzZSk7XHJcblxyXG4vKipcclxuICog5piv5ZCm5ZCv55SobG9hZGluZ1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB0aGlzLmh0dHAuZ2V0PHN0cmluZz4oJ3VybCcsIHsgY29udGV4dDogbmV3IEh0dHBDb250ZXh0KCkuc2V0KExPQURJTkdfRU5BQkxFRCwgZmFsc2UpLnNldCguLi4pfSk7XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTE9BRElOR19FTkFCTEVEID0gbmV3IEh0dHBDb250ZXh0VG9rZW48Ym9vbGVhbj4oKCkgPT4gdHJ1ZSk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGZXRjaGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWkhOeQhuW8guatpeWPguaVsFxyXG4gICAqIEBwYXJhbSBkYXRhIOWPguaVsFxyXG4gICAqL1xyXG4gIHN0YXRpYyByZXNvbHZlUGFyYW1zPFQ+KGRhdGE/OiBGZXRjaFBhcmFtczxUPik6IE9ic2VydmFibGU8VCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgaWYgKE56eFV0aWxzLmlzRnVuY3Rpb24oZGF0YSkpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gZGF0YSgpO1xyXG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2YoZGF0YSBhcyBUKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWPkei1t+ivt+axgiwg5Y+C5pWw5Y+v5Lul5piv5byC5q2l5a+56LGh5oiW5Ye95pWwXHJcbiAgICogQHBhcmFtIG9wdGlvbiDor7fmsYLphY3nva5cclxuICAgKi9cclxuICBmZXRjaDxUPihvcHRpb246IEZldGNoT3B0aW9ucyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIEZldGNoZXJTZXJ2aWNlLnJlc29sdmVQYXJhbXMob3B0aW9uLmRhdGEpLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IG9wdGlvbi5iZWZvcmVTZW5kID8gb3B0aW9uLmJlZm9yZVNlbmQodmFsdWUgfHwge30pIDogdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9GZXRjaDxUPih7IC4uLm9wdGlvbiwgZGF0YSB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkIzmraXor7fmsYIsIOWPguaVsOWPr+S7peaYr+W8guatpeWvueixoeaIluWHveaVsFxyXG4gICAqIEBwYXJhbSBvcHRpb24g6K+35rGC6YWN572uXHJcbiAgICovXHJcbiAgZmV0Y2hTeW5jPFQ+KG9wdGlvbjogT21pdDxGZXRjaE9wdGlvbnMsICdhc3luYyc+KTogVCB7XHJcbiAgICByZXR1cm4gTnp4VXRpbHMuZ2V0QWpheFZhbHVlPFQ+KHRoaXMuZmV0Y2goeyAuLi5vcHRpb24sIGFzeW5jOiBmYWxzZSB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgIHor7fmsYJcclxuICAgKiBAcGFyYW0gb3B0aW9ucyDlj4LmlbDkuI3ljIXlkKvlh73mlbDkuI3ov5vooYzkuozmrKHlpITnkIZcclxuICAgKi9cclxuICBwdWJsaWMgZG9GZXRjaDxUPihvcHRpb25zOiBGZXRjaE9wdGlvbnMpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IG9wdGlvbjogUmVjb3JkPHN0cmluZywgTnpTYWZlQW55PiA9IHt9O1xyXG4gICAgaWYgKG9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgIG9wdGlvbi5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLm9ic2VydmUpIHtcclxuICAgICAgb3B0aW9uLm9ic2VydmUgPSBvcHRpb25zLm9ic2VydmU7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9uLmNvbnRleHQgfHw9IG5ldyBIdHRwQ29udGV4dCgpO1xyXG4gICAgaWYgKG9wdGlvbnMuYXN5bmMgPT09IGZhbHNlKSB7XHJcbiAgICAgIG9wdGlvbi5jb250ZXh0LnNldChTWU5DRURfRU5BQkxFRCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMubG9hZGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgb3B0aW9uLmNvbnRleHQuc2V0KExPQURJTkdfRU5BQkxFRCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBOenhVdGlscy5pc0Z1bmN0aW9uKG9wdGlvbnMuZGF0YSkgPyBvcHRpb25zLmRhdGEoKSA6IG9wdGlvbnMuZGF0YTtcclxuICAgIGlmICgvXnBvc3R8cHV0JC9pLnRlc3Qob3B0aW9ucy5tZXRob2QhKSkge1xyXG4gICAgICBvcHRpb24uYm9keSA9IGRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb24ucGFyYW1zID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4ob3B0aW9ucy5tZXRob2QgfHwgJ2dldCcsIG9wdGlvbnMudXJsLCBvcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCM5q2l6K+35rGCLCDlj4LmlbDkuI3ljIXlkKvlh73mlbDkuI3ov5vooYzkuozmrKHlpITnkIZcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIGRvRmV0Y2hTeW5jPFQ+KG9wdGlvbnM6IE9taXQ8RmV0Y2hPcHRpb25zLCAnYXN5bmMnPik6IFQge1xyXG4gICAgcmV0dXJuIE56eFV0aWxzLmdldEFqYXhWYWx1ZTxUPih0aGlzLmRvRmV0Y2goeyAuLi5vcHRpb25zLCBhc3luYzogZmFsc2UgfSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5L2/55So5ZCM5q2l5pa55byP6L+b6KGM6L+c56iL5qCh6aqMXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICByZW1vdGVWYWxpZGF0ZTxUID0gTnpTYWZlQW55PihvcHRpb25zOiBWYWxpZGF0b3JPcHRpb248VD4pOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT0gbnVsbCB8fCAhY29udHJvbC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAob3B0aW9ucy5iZWZvcmVTZW5kKSB7XHJcbiAgICAgICAgY29uc3QgYmVmb3JlU2VuZCA9IG9wdGlvbnMuYmVmb3JlU2VuZDtcclxuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQgPSBkYXRhID0+IHtcclxuICAgICAgICAgIHJldHVybiBiZWZvcmVTZW5kKGRhdGEsIGNvbnRyb2wpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgTnp4VXRpbHMuaXNGdW5jdGlvbihvcHRpb25zLmRhdGEpKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YUZuID0gb3B0aW9ucy5kYXRhO1xyXG4gICAgICAgIG9wdGlvbnMuZGF0YSA9ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBkYXRhRm4oY29udHJvbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5kb0ZldGNoU3luYzxUPihvcHRpb25zKTtcclxuICAgICAgaWYgKG9wdGlvbnMuYWZ0ZXJGZXRjaCkge1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmFmdGVyRmV0Y2goZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKE56eFV0aWxzLmlzQm9vbGVhbihkYXRhKSkge1xyXG4gICAgICAgIHJldHVybiBkYXRhID8gbnVsbCA6IHsgcmVtb3RlOiB7IG1lc3NhZ2U6IG9wdGlvbnMubWVzc2FnZSB8fCAn5qC85byP5LiN5q2j56GuJyB9IH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRmV0Y2hQYXJhbXM8VCA9IE56U2FmZUFueT4gPSAoKCkgPT4gUHJvbWlzZTxUPiB8IFQpIHwgUHJvbWlzZTxUPiB8IFQ7XHJcblxyXG4vKipcclxuICog6K+35rGC6YWN572uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoT3B0aW9ucyB7XHJcbiAgdXJsOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5pa55byPXHJcbiAgICovXHJcbiAgbWV0aG9kPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOivt+axguWPguaVsFxyXG4gICAqL1xyXG4gIGRhdGE/OiBGZXRjaFBhcmFtcztcclxuICAvKipcclxuICAgKiDlj5HpgIHkuYvliY3nmoTlm57osIPlh73mlbAs5LuFVVJMIOaXtuacieaViFxyXG4gICAqIEBwYXJhbSBwYXJhbXNcclxuICAgKi9cclxuICBiZWZvcmVTZW5kPzogKHBhcmFtczogTnpTYWZlQW55KSA9PiBOelNhZmVBbnk7XHJcbiAgLyoqXHJcbiAgICog5ZON5bqU57G75Z6LXHJcbiAgICovXHJcbiAgcmVzcG9uc2VUeXBlPzogJ2FycmF5YnVmZmVyJyB8ICdibG9iJyB8ICdqc29uJyB8ICd0ZXh0JztcclxuICAvKipcclxuICAgKiDorqLpmIXlk43lupTmlbDmja7nsbvlnotcclxuICAgKi9cclxuICBvYnNlcnZlPzogJ2JvZHknIHwgJ2V2ZW50cycgfCAncmVzcG9uc2UnO1xyXG4gIC8qKlxyXG4gICAqIGh0dHDkuIrkuIvmlodcclxuICAgKi9cclxuICBjb250ZXh0PzogSHR0cENvbnRleHQ7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5byC5q2lLCDpu5jorqR0cnVlXHJcbiAgICovXHJcbiAgYXN5bmM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekumxvYWRpbmdcclxuICAgKi9cclxuICBsb2FkaW5nPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOmqjOivgeWZqOivt+axguWPguaVsFxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRmV0Y2hWYWxpZGF0b3JQYXJhbXM8VCA9IE56U2FmZUFueT4gPSAoKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4gUHJvbWlzZTxUPiB8IFQpIHwgUHJvbWlzZTxUPiB8IFQ7XHJcbi8qKlxyXG4gKiDov5znqIvpqozor4HlmajphY3nva5cclxuICovXHJcbmV4cG9ydCB0eXBlIFZhbGlkYXRvck9wdGlvbjxUID0gTnpTYWZlQW55PiA9IE9taXQ8RmV0Y2hPcHRpb25zLCAnYmVmb3JlU2VuZCcgfCAnYXN5bmMnIHwgJ2RhdGEnPiAmIHtcclxuICAvKipcclxuICAgKiDplJnor6/kv6Hmga/mj4/ov7BcclxuICAgKi9cclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5Y+C5pWwXHJcbiAgICovXHJcbiAgZGF0YT86IEZldGNoVmFsaWRhdG9yUGFyYW1zO1xyXG4gIC8qKlxyXG4gICAqIOWTjeW6lOaVsOaNruWQjueahOWbnuiwg1xyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICovXHJcbiAgYWZ0ZXJGZXRjaD8oZGF0YTogVCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsO1xyXG4gIC8qKlxyXG4gICAqIOivt+axguS5i+WJjeeahOWbnuiwg1xyXG4gICAqIEBwYXJhbSBwYXJhbXNcclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqL1xyXG4gIGJlZm9yZVNlbmQ/KHBhcmFtczogTnpTYWZlQW55LCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBOelNhZmVBbnk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTWV0aG9kID1cclxuICB8ICdnZXQnXHJcbiAgfCAnR0VUJ1xyXG4gIHwgJ2RlbGV0ZSdcclxuICB8ICdERUxFVEUnXHJcbiAgfCAnaGVhZCdcclxuICB8ICdIRUFEJ1xyXG4gIHwgJ29wdGlvbnMnXHJcbiAgfCAnT1BUSU9OUydcclxuICB8ICdwb3N0J1xyXG4gIHwgJ1BPU1QnXHJcbiAgfCAncHV0J1xyXG4gIHwgJ1BVVCdcclxuICB8ICdwYXRjaCdcclxuICB8ICdQQVRDSCdcclxuICB8ICdwdXJnZSdcclxuICB8ICdQVVJHRSdcclxuICB8ICdsaW5rJ1xyXG4gIHwgJ0xJTksnXHJcbiAgfCAndW5saW5rJ1xyXG4gIHwgJ1VOTElOSyc7XHJcbiJdfQ==