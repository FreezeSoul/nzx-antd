import * as i0 from '@angular/core';
import { Injectable, Optional, NgModule } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpContextToken, HttpContext, HttpClientModule } from '@angular/common/http';
import { Observable, of, tap, shareReplay, map } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i1$1 from '@freezesoul/nzx-antd';
import * as i2 from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * 全局loading
 */
class NzxLoadingService {
    loadingId = '__MESSAGE_LOADING__';
    /**
     * 显示loading
     * @param type loading类型
     * @param message 消息
     */
    show(type = 'message', message = '加载中...') {
        this.showx(this.loadingId, type, () => {
            if (type === 'spin') {
                return `
        <div class="ant-modal-wrap" style="position: fixed; z-index: 999998; background-color: rgba(255, 255, 255, 0.35)"></div>
        <div
          class="ant-spin ant-spin-spinning ant-spin-show-text"
          style="top: 45%; transform: translate(-50%); z-index: 999999; position: fixed; left: 50%"
        >
          <span class="ant-spin-dot ant-spin-dot-spin">
            <i class="ant-spin-dot-item"></i>
            <i class="ant-spin-dot-item"></i>
            <i class="ant-spin-dot-item"></i>
            <i class="ant-spin-dot-item"></i>
          </span>
          <div class="ant-spin-text">${message}</div>
        </div>`;
            }
            return `
      <div class="ant-modal-wrap" style="z-index: 999998;background-color: rgba(255, 255, 255,.35);"></div>
      <div class="ant-message-notice ant-message" style="top: 45%; z-index: 999999;">
        <div class="ant-message-notice-content" style="min-width: 150px;">
          <div class="ant-message-loading">
            <i class="anticon anticon-loading">
              <svg viewBox="0 0 1024 1024" focusable="false" fill="currentColor" width="1em" height="1em"
                   class="anticon-spin">
                <path
                  d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
              </svg>
            </i>
            <span>${message}</span>
          </div>
        </div>
      </div>`;
        });
    }
    showx(id, type, html) {
        const loading = document.getElementById(id);
        if (loading) {
            if (loading.getAttribute('type') !== type) {
                loading.setAttribute('type', type);
                loading.innerHTML = html();
            }
            loading.style.display = 'block';
            return;
        }
        const div = document.createElement('div');
        div.setAttribute('type', type);
        div.setAttribute('id', id);
        div.innerHTML = html();
        document.body.append(div);
    }
    /**
     * 显示或隐藏loading
     * @param show 是否显示
     */
    loading(show = true) {
        show ? this.show() : this.hide();
    }
    /**
     * 隐藏loading
     */
    hide() {
        const loading = document.getElementById(this.loadingId);
        if (loading) {
            loading.style.display = 'none';
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLoadingService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
const loadingService = new NzxLoadingService();

/**
 * 模板字符串函数, 构造同步请求URL
 * @example
 * let value!: string;
 * this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)}).subscribe(res => (value = res));
 * console.log(value);
 */
function synced(url, ...keys) {
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
const SYNCED_ENABLED = new HttpContextToken(() => false);
/**
 * 是否启用loading
 * @example
 * this.http.get<string>('url', { context: new HttpContext().set(LOADING_ENABLED, false).set(...)});
 */
const LOADING_ENABLED = new HttpContextToken(() => true);
class FetcherService {
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

class NzxDownloadService {
    fetcher;
    constructor(fetcher) {
        this.fetcher = fetcher;
    }
    /**
     * 下载文件
     * @param options 下载文件配置信息
     */
    download(options) {
        this.fetcher.fetch({ ...options, responseType: 'blob', observe: 'response' }).subscribe({
            next: resp => {
                const fn = options.getFileName || this.getFilename.bind(this);
                const filename = fn(resp, options.url);
                if (options.afterDownload && options.afterDownload(resp, filename) === false) {
                    return;
                }
                this.saveAs(resp.body, filename);
                if (options.downloadDone) {
                    options.downloadDone(resp, filename);
                }
            },
            error: error => options.downloadError && options.downloadError(error),
            complete: () => options.downloadComplete && options.downloadComplete()
        });
    }
    /**
     * 文件另存为
     * @param body 二进制内容
     * @param filename 文件名
     */
    saveAs(body, filename) {
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(body, filename);
            return;
        }
        const blobURL = window.URL.createObjectURL(body);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
    /**
     * 获取文件名称
     * @param resp
     * @param url
     * @protected
     */
    getFilename(resp, url) {
        const headers = resp.headers;
        const disposition = headers.get('content-disposition');
        const filename = headers.get('filename');
        if (filename) {
            return decodeURIComponent(filename.trim());
        }
        else if (disposition) {
            return disposition
                .split(';')
                .filter(v => v.indexOf('filename=') >= 0)[0]
                .split('=')[1]
                .replace(/(^")|("$)/g, '')
                .trim();
        }
        else {
            const start = url.lastIndexOf('/') + 1;
            const endIndex = url.lastIndexOf('?');
            const end = endIndex === -1 ? url.length : endIndex;
            return url.substring(start, end);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDownloadService, deps: [{ token: FetcherService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDownloadService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDownloadService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: FetcherService }]; } });

class NzxStorageService {
    storage;
    /**
     * 获取长度
     */
    get length() {
        return this.storage.length;
    }
    constructor(storage) {
        this.storage = storage;
        if (!storage) {
            this.storage = localStorage;
        }
    }
    /**
     * 清除所有数据
     */
    clear() {
        this.storage.clear();
    }
    /**
     * 获取值
     * @param key key
     */
    getItem(key) {
        const value = this.storage.getItem(key);
        return value == null ? null : JSON.parse(value);
    }
    /**
     * 获取key
     * @param index 索引
     */
    key(index) {
        return this.storage.key(index);
    }
    /**
     * 移除值
     * @param key key
     */
    removeItem(key) {
        this.storage.removeItem(key);
    }
    /**
     * 设置值
     * @param key
     * @param value
     */
    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxStorageService, deps: [{ token: Storage, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxStorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: Storage, decorators: [{
                    type: Optional
                }] }]; } });

/**
 * 权限路由守卫服务, 具体数据格式,由NzxAntdService.hasAuth决定处理
 * @example
 * const routes: Routes = [
 * {
 *    path: 'xxx',
 *    canActivate: [ NzxAuthGuardService ],
 *    data: { guard: 'user1', noAuthUrl: '/no-permisseion' }
 * },
 * {
 *    path: 'xxx',
 *    canActivate: [ NzxAuthGuardService ],
 *    data: { guard: { auth: ['user1', 'user2'], noAuthUrl: '/no-permisseion'} }}
 * },
 * {
 *    path: 'yyy',
 *    canActivate: [ NzxAuthGuardService ],
 *    data: { guard: ((router, injector, antdService) => of(true)) as AuthGuardType, noAuthUrl: '/no-permisseion' }
 * }
 * ];
 */
class NzxAuthGuardService {
    antdService;
    router;
    injector;
    hasAuth = () => of(true);
    constructor(antdService, router, injector) {
        this.antdService = antdService;
        this.router = router;
        this.injector = injector;
        if (this.antdService.hasAuth) {
            this.hasAuth = this.antdService.hasAuth;
        }
    }
    process(data) {
        const guard = data.guard;
        if (NzxUtils.isFunction(guard)) {
            return guard(this.router, this.injector, this.antdService);
        }
        return this.hasAuth(guard.auth).pipe(tap(auth => {
            const url = guard.noAuthUrl || this.antdService.noAuthUrl;
            if (!auth && url) {
                this.router.navigateByUrl(url);
            }
        }));
    }
    // lazy loading
    canLoad(route) {
        return this.process(route.data);
    }
    // all children route
    canActivateChild(childRoute, state) {
        return this.canActivate(childRoute, state);
    }
    // route
    canActivate(route, _state) {
        return this.process(route.data);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAuthGuardService, deps: [{ token: i1$1.NzxAntdService }, { token: i2.Router }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAuthGuardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAuthGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.NzxAntdService }, { type: i2.Router }, { type: i0.Injector }]; } });

class DicService {
    http;
    antdService;
    /**
     * 字典请求缓存, 请求完成会自动删除
     * @private
     */
    dicMap = new Map();
    /**
     * 字典map缓存数据, 可以通过removeDic删除缓存
     * @private
     */
    dicMapData = new Map();
    /**
     * 字典配置
     * @private
     */
    dicSettings;
    constructor(http, antdService) {
        this.http = http;
        this.antdService = antdService;
        this.dicSettings = Object.assign({
            map: (data) => (data.children || []).map(v => ({ label: v.code, value: v.name, ...v }))
        }, antdService.dic);
    }
    /**
     * 获取字典, 异步请求
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDic(key, isNumber) {
        if (this.dicMapData.has(key)) {
            return of(this.dicMapData.get(key));
        }
        if (this.dicMap.has(key)) {
            return this.dicMap.get(key);
        }
        const dic$ = this.fetchDic(key, false, isNumber).pipe(shareReplay(1), tap(data => this.dicMapData.set(key, data)), finalize(() => this.dicMap.delete(key)));
        this.dicMap.set(key, dic$);
        return dic$;
    }
    /**
     * 获取字典项对应的名称
     * @param key 字典key
     * @param itemKey 字典项的key
     */
    getLabel(key, itemKey) {
        if (itemKey == null) {
            return of(null);
        }
        return this.getDicMap(key, NzxUtils.isNumber(itemKey)).pipe(map(dic => dic[itemKey]));
    }
    /**
     * 同步获取字典项对应的名称
     * @param key 字典key
     * @param itemKey 字典项的key
     */
    getLabelSync(key, itemKey) {
        if (itemKey == null) {
            return of(null);
        }
        return this.getDicMapSync(key, NzxUtils.isNumber(itemKey))[itemKey];
    }
    /**
     * 获取map{value: label}形式的字典数据, 异步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMap(key, isNumber) {
        return this.getDic(key, isNumber).pipe(map(list => NzxUtils.listToMap(list, 'value', 'label')));
    }
    /**
     * 获取字典, 同步请求  请求会被缓存
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicSync(key, isNumber) {
        if (this.dicMapData.has(key)) {
            return this.dicMapData.get(key) || [];
        }
        const data = NzxUtils.getAjaxValue(this.fetchDic(key, true, isNumber));
        this.dicMapData.set(key, data);
        return data;
    }
    /**
     * 获取map形式的字典数据, 同步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapSync(key, isNumber) {
        return NzxUtils.listToMap(this.getDicSync(key, isNumber), 'value', 'label');
    }
    /**
     * 获取map即{value: DicItem}形式的字典数据, 异步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapItem(key, isNumber) {
        return this.getDic(key, isNumber).pipe(map(list => NzxUtils.listToMap(list, 'value')));
    }
    /**
     * 获取map即{value: DicItem}形式的字典数据, 同步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapItemSync(key, isNumber) {
        return NzxUtils.listToMap(this.getDicSync(key, isNumber), 'value');
    }
    /**
     * 删除指定字典key的缓存数据
     * @param key 字典key
     */
    removeDic(key) {
        this.dicMap.delete(key);
        this.dicMapData.delete(key);
    }
    /**
     * 清空所有字典缓存
     */
    clearDic() {
        this.dicMap.clear();
        this.dicMapData.clear();
    }
    /**
     * 请求字典数据
     * @param key 字典key
     * @param synced 是否同步
     * @param isNumber 是否数字
     */
    fetchDic(key, synced, isNumber) {
        if (!this.dicSettings.url) {
            throw new Error('未配置字典接口地址,请在NzxAntdService中配置"dic"属性的"url"值');
        }
        const url = typeof this.dicSettings.url === 'string' ? `${this.dicSettings.url}/${key}` : this.dicSettings.url(key);
        const dicMap = this.dicSettings.map ||
            ((data, isNumber) => {
                return (data?.children || []).map(v => ({ ...v, label: v.name, value: isNumber ? +v.code : v.code }));
            });
        return this.http
            .get(url, {
            context: new HttpContext().set(SYNCED_ENABLED, synced).set(LOADING_ENABLED, false)
        })
            .pipe(map(list => dicMap(list, isNumber)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicService, deps: [{ token: i1.HttpClient }, { token: i1$1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i1$1.NzxAntdService }]; } });

class NzxServiceModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, imports: [CommonModule, HttpClientModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, providers: [FetcherService, NzxDownloadService], imports: [CommonModule, HttpClientModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [CommonModule, HttpClientModule],
                    providers: [FetcherService, NzxDownloadService]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DicService, FetcherService, LOADING_ENABLED, NzxAuthGuardService, NzxDownloadService, NzxLoadingService, NzxServiceModule, NzxStorageService, SYNCED_ENABLED, loadingService, synced };
//# sourceMappingURL=freezesoul-nzx-antd-service.mjs.map
