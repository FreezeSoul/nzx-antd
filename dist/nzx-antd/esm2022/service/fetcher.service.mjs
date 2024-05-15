import { Injectable } from '@angular/core';
import { HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzxUtils } from '@xmagic/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NlcnZpY2UvZmV0Y2hlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQUdqRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsTUFBTSxDQUFDLEdBQXlCLEVBQUUsR0FBRyxJQUFjO0lBQ2pFLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUMzRSxD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Q2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBSSxPQUFPLENBQUMsQ0FBQztZQUMxQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztZQUVELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDaEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUUsRUFBRSxDQUFDO2FBQzFFO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO3dHQXpIVSxjQUFjOzRHQUFkLGNBQWM7OzRGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDb250ZXh0LCBIdHRwQ29udGV4dFRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8qKlxyXG4gKiDmqKHmnb/lrZfnrKbkuLLlh73mlbAsIOaehOmAoOWQjOatpeivt+axglVSTFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBsZXQgdmFsdWUhOiBzdHJpbmc7XHJcbiAqIHRoaXMuaHR0cC5nZXQ8c3RyaW5nPigndXJsJywgeyBjb250ZXh0OiBuZXcgSHR0cENvbnRleHQoKS5zZXQoU1lOQ0VEX0VOQUJMRUQsIHRydWUpfSkuc3Vic2NyaWJlKHJlcyA9PiAodmFsdWUgPSByZXMpKTtcclxuICogY29uc29sZS5sb2codmFsdWUpO1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN5bmNlZCh1cmw6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5rZXlzOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcbiAgY29uc3Qgc3RyaW5ncyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBzdHJpbmdzLnB1c2godXJsLnJhd1tpXSwga2V5c1tpXSA9PSBudWxsID8gJycgOiBrZXlzW2ldKTtcclxuICB9XHJcbiAgY29uc3QgcmVzdWx0ID0gc3RyaW5ncy5qb2luKCcnKTtcclxuICByZXR1cm4gcmVzdWx0ICsgKHJlc3VsdC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArICdzeW5jZWQ9dHJ1ZSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlkK/nlKjlkIzmraXor7fmsYJcclxuICogQGV4YW1wbGVcclxuICogbGV0IHZhbHVlITogc3RyaW5nO1xyXG4gKiB0aGlzLmh0dHAuZ2V0PHN0cmluZz4oJ3VybCcsIHsgY29udGV4dDogbmV3IEh0dHBDb250ZXh0KCkuc2V0KFNZTkNFRF9FTkFCTEVELCB0cnVlKX0pLnN1YnNjcmliZShyZXMgPT4gKHZhbHVlID0gcmVzKSk7XHJcbiAqIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICovXHJcbmV4cG9ydCBjb25zdCBTWU5DRURfRU5BQkxFRCA9IG5ldyBIdHRwQ29udGV4dFRva2VuPGJvb2xlYW4+KCgpID0+IGZhbHNlKTtcclxuXHJcbi8qKlxyXG4gKiDmmK/lkKblkK/nlKhsb2FkaW5nXHJcbiAqIEBleGFtcGxlXHJcbiAqIHRoaXMuaHR0cC5nZXQ8c3RyaW5nPigndXJsJywgeyBjb250ZXh0OiBuZXcgSHR0cENvbnRleHQoKS5zZXQoTE9BRElOR19FTkFCTEVELCBmYWxzZSkuc2V0KC4uLil9KTtcclxuICovXHJcbmV4cG9ydCBjb25zdCBMT0FESU5HX0VOQUJMRUQgPSBuZXcgSHR0cENvbnRleHRUb2tlbjxib29sZWFuPigoKSA9PiB0cnVlKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZldGNoZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgLyoqXHJcbiAgICog5aSE55CG5byC5q2l5Y+C5pWwXHJcbiAgICogQHBhcmFtIGRhdGEg5Y+C5pWwXHJcbiAgICovXHJcbiAgc3RhdGljIHJlc29sdmVQYXJhbXM8VD4oZGF0YT86IEZldGNoUGFyYW1zPFQ+KTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBpZiAoTnp4VXRpbHMuaXNGdW5jdGlvbihkYXRhKSkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBkYXRhKCk7XHJcbiAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2YocmVzdWx0IGFzIFQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZihkYXRhIGFzIFQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Y+R6LW36K+35rGCLCDlj4LmlbDlj6/ku6XmmK/lvILmraXlr7nosaHmiJblh73mlbBcclxuICAgKiBAcGFyYW0gb3B0aW9uIOivt+axgumFjee9rlxyXG4gICAqL1xyXG4gIGZldGNoPFQ+KG9wdGlvbjogRmV0Y2hPcHRpb25zKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gRmV0Y2hlclNlcnZpY2UucmVzb2x2ZVBhcmFtcyhvcHRpb24uZGF0YSkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKHZhbHVlID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gb3B0aW9uLmJlZm9yZVNlbmQgPyBvcHRpb24uYmVmb3JlU2VuZCh2YWx1ZSB8fCB7fSkgOiB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZldGNoPFQ+KHsgLi4ub3B0aW9uLCBkYXRhIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWQjOatpeivt+axgiwg5Y+C5pWw5Y+v5Lul5piv5byC5q2l5a+56LGh5oiW5Ye95pWwXHJcbiAgICogQHBhcmFtIG9wdGlvbiDor7fmsYLphY3nva5cclxuICAgKi9cclxuICBmZXRjaFN5bmM8VD4ob3B0aW9uOiBPbWl0PEZldGNoT3B0aW9ucywgJ2FzeW5jJz4pOiBUIHtcclxuICAgIHJldHVybiBOenhVdGlscy5nZXRBamF4VmFsdWU8VD4odGhpcy5mZXRjaCh7IC4uLm9wdGlvbiwgYXN5bmM6IGZhbHNlIH0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmAgeivt+axglxyXG4gICAqIEBwYXJhbSBvcHRpb25zIOWPguaVsOS4jeWMheWQq+WHveaVsOS4jei/m+ihjOS6jOasoeWkhOeQhlxyXG4gICAqL1xyXG4gIHB1YmxpYyBkb0ZldGNoPFQ+KG9wdGlvbnM6IEZldGNoT3B0aW9ucyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3Qgb3B0aW9uOiBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+ID0ge307XHJcbiAgICBpZiAob3B0aW9ucy5yZXNwb25zZVR5cGUpIHtcclxuICAgICAgb3B0aW9uLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMub2JzZXJ2ZSkge1xyXG4gICAgICBvcHRpb24ub2JzZXJ2ZSA9IG9wdGlvbnMub2JzZXJ2ZTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb24uY29udGV4dCB8fD0gbmV3IEh0dHBDb250ZXh0KCk7XHJcbiAgICBpZiAob3B0aW9ucy5hc3luYyA9PT0gZmFsc2UpIHtcclxuICAgICAgb3B0aW9uLmNvbnRleHQuc2V0KFNZTkNFRF9FTkFCTEVELCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5sb2FkaW5nID09PSBmYWxzZSkge1xyXG4gICAgICBvcHRpb24uY29udGV4dC5zZXQoTE9BRElOR19FTkFCTEVELCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IE56eFV0aWxzLmlzRnVuY3Rpb24ob3B0aW9ucy5kYXRhKSA/IG9wdGlvbnMuZGF0YSgpIDogb3B0aW9ucy5kYXRhO1xyXG4gICAgaWYgKC9ecG9zdHxwdXQkL2kudGVzdChvcHRpb25zLm1ldGhvZCEpKSB7XHJcbiAgICAgIG9wdGlvbi5ib2R5ID0gZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbi5wYXJhbXMgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihvcHRpb25zLm1ldGhvZCB8fCAnZ2V0Jywgb3B0aW9ucy51cmwsIG9wdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkIzmraXor7fmsYIsIOWPguaVsOS4jeWMheWQq+WHveaVsOS4jei/m+ihjOS6jOasoeWkhOeQhlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICovXHJcbiAgZG9GZXRjaFN5bmM8VD4ob3B0aW9uczogT21pdDxGZXRjaE9wdGlvbnMsICdhc3luYyc+KTogVCB7XHJcbiAgICByZXR1cm4gTnp4VXRpbHMuZ2V0QWpheFZhbHVlPFQ+KHRoaXMuZG9GZXRjaCh7IC4uLm9wdGlvbnMsIGFzeW5jOiBmYWxzZSB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDkvb/nlKjlkIzmraXmlrnlvI/ov5vooYzov5znqIvmoKHpqoxcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHJlbW90ZVZhbGlkYXRlPFQgPSBOelNhZmVBbnk+KG9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbjxUPik6IFZhbGlkYXRvckZuIHtcclxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSA9PSBudWxsIHx8ICFjb250cm9sLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLmJlZm9yZVNlbmQpIHtcclxuICAgICAgICBjb25zdCBiZWZvcmVTZW5kID0gb3B0aW9ucy5iZWZvcmVTZW5kO1xyXG4gICAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCA9IGRhdGEgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGJlZm9yZVNlbmQoZGF0YSwgY29udHJvbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBOenhVdGlscy5pc0Z1bmN0aW9uKG9wdGlvbnMuZGF0YSkpIHtcclxuICAgICAgICBjb25zdCBkYXRhRm4gPSBvcHRpb25zLmRhdGE7XHJcbiAgICAgICAgb3B0aW9ucy5kYXRhID0gKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGFGbihjb250cm9sKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRvRmV0Y2hTeW5jPFQ+KG9wdGlvbnMpO1xyXG4gICAgICBpZiAob3B0aW9ucy5hZnRlckZldGNoKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuYWZ0ZXJGZXRjaChkYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoTnp4VXRpbHMuaXNCb29sZWFuKGRhdGEpKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEgPyBudWxsIDogeyByZW1vdGU6IHsgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlIHx8ICfmoLzlvI/kuI3mraPnoa4nIH0gfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBGZXRjaFBhcmFtczxUID0gTnpTYWZlQW55PiA9ICgoKSA9PiBQcm9taXNlPFQ+IHwgVCkgfCBQcm9taXNlPFQ+IHwgVDtcclxuXHJcbi8qKlxyXG4gKiDor7fmsYLphY3nva5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hPcHRpb25zIHtcclxuICB1cmw6IHN0cmluZztcclxuICAvKipcclxuICAgKiDor7fmsYLmlrnlvI9cclxuICAgKi9cclxuICBtZXRob2Q/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5Y+C5pWwXHJcbiAgICovXHJcbiAgZGF0YT86IEZldGNoUGFyYW1zO1xyXG4gIC8qKlxyXG4gICAqIOWPkemAgeS5i+WJjeeahOWbnuiwg+WHveaVsCzku4VVUkwg5pe25pyJ5pWIXHJcbiAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAqL1xyXG4gIGJlZm9yZVNlbmQ/OiAocGFyYW1zOiBOelNhZmVBbnkpID0+IE56U2FmZUFueTtcclxuICAvKipcclxuICAgKiDlk43lupTnsbvlnotcclxuICAgKi9cclxuICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInIHwgJ2Jsb2InIHwgJ2pzb24nIHwgJ3RleHQnO1xyXG4gIC8qKlxyXG4gICAqIOiuoumYheWTjeW6lOaVsOaNruexu+Wei1xyXG4gICAqL1xyXG4gIG9ic2VydmU/OiAnYm9keScgfCAnZXZlbnRzJyB8ICdyZXNwb25zZSc7XHJcbiAgLyoqXHJcbiAgICogaHR0cOS4iuS4i+aWh1xyXG4gICAqL1xyXG4gIGNvbnRleHQ/OiBIdHRwQ29udGV4dDtcclxuICAvKipcclxuICAgKiDmmK/lkKblvILmraUsIOm7mOiupHRydWVcclxuICAgKi9cclxuICBhc3luYz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S6bG9hZGluZ1xyXG4gICAqL1xyXG4gIGxvYWRpbmc/OiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICog6aqM6K+B5Zmo6K+35rGC5Y+C5pWwXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBGZXRjaFZhbGlkYXRvclBhcmFtczxUID0gTnpTYWZlQW55PiA9ICgoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiBQcm9taXNlPFQ+IHwgVCkgfCBQcm9taXNlPFQ+IHwgVDtcclxuLyoqXHJcbiAqIOi/nOeoi+mqjOivgeWZqOmFjee9rlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgVmFsaWRhdG9yT3B0aW9uPFQgPSBOelNhZmVBbnk+ID0gT21pdDxGZXRjaE9wdGlvbnMsICdiZWZvcmVTZW5kJyB8ICdhc3luYycgfCAnZGF0YSc+ICYge1xyXG4gIC8qKlxyXG4gICAqIOmUmeivr+S/oeaBr+aPj+i/sFxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICAvKipcclxuICAgKiDor7fmsYLlj4LmlbBcclxuICAgKi9cclxuICBkYXRhPzogRmV0Y2hWYWxpZGF0b3JQYXJhbXM7XHJcbiAgLyoqXHJcbiAgICog5ZON5bqU5pWw5o2u5ZCO55qE5Zue6LCDXHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKi9cclxuICBhZnRlckZldGNoPyhkYXRhOiBUKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGw7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5LmL5YmN55qE5Zue6LCDXHJcbiAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgYmVmb3JlU2VuZD8ocGFyYW1zOiBOelNhZmVBbnksIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE56U2FmZUFueTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNZXRob2QgPVxyXG4gIHwgJ2dldCdcclxuICB8ICdHRVQnXHJcbiAgfCAnZGVsZXRlJ1xyXG4gIHwgJ0RFTEVURSdcclxuICB8ICdoZWFkJ1xyXG4gIHwgJ0hFQUQnXHJcbiAgfCAnb3B0aW9ucydcclxuICB8ICdPUFRJT05TJ1xyXG4gIHwgJ3Bvc3QnXHJcbiAgfCAnUE9TVCdcclxuICB8ICdwdXQnXHJcbiAgfCAnUFVUJ1xyXG4gIHwgJ3BhdGNoJ1xyXG4gIHwgJ1BBVENIJ1xyXG4gIHwgJ3B1cmdlJ1xyXG4gIHwgJ1BVUkdFJ1xyXG4gIHwgJ2xpbmsnXHJcbiAgfCAnTElOSydcclxuICB8ICd1bmxpbmsnXHJcbiAgfCAnVU5MSU5LJztcclxuIl19