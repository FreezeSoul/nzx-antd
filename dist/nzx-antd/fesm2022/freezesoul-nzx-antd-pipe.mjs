import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';
import * as i1 from '@freezesoul/nzx-antd';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i1$1 from '@angular/platform-browser';
import { of, map, from } from 'rxjs';
import * as i1$2 from '@freezesoul/nzx-antd/service';
import { CommonModule } from '@angular/common';

class DefaultifyPipe {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    transform(value, defaultValue) {
        return value == null ? (defaultValue == null ? this.antdService.defaultify || '--' : defaultValue) : value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DefaultifyPipe, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DefaultifyPipe, name: "defaultify" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DefaultifyPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'defaultify',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });

class FilterPipe {
    /**
     * Filter array
     *
     * 过滤数组
     */
    transform(array, matcher, searchText) {
        if (typeof matcher === 'string') {
            if (NzxUtils.isEmpty(searchText)) {
                return array;
            }
            // @ts-ignore
            const text = searchText.toLowerCase();
            return (array || []).filter(v => NzxUtils.get(v, matcher, '').toLowerCase().indexOf(text) !== -1);
        }
        return (array || []).filter(v => matcher(v));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, name: "filter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filter',
                    pure: true
                }]
        }] });

/**
 * 非安全加载URL,比如加载iframe url
 */
class TrustUrlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustUrlPipe, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustUrlPipe, name: "trustUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustUrl',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DomSanitizer }]; } });
/**
 * 非安全加载HTML
 */
class TrustHtmlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(html, enabled = true) {
        return enabled ? this.sanitizer.bypassSecurityTrustHtml(html) : html;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustHtmlPipe, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustHtmlPipe, name: "trustHtml" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustHtmlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustHtml',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DomSanitizer }]; } });
/**
 * 非安全调用Script
 */
class TrustScriptPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(script, enabled = true) {
        return enabled ? this.sanitizer.bypassSecurityTrustScript(script) : script;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustScriptPipe, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustScriptPipe, name: "trustScript" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustScriptPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustScript',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DomSanitizer }]; } });
/**
 * 非安全调用Style
 */
class TrustStylePipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(style, enabled = true) {
        return enabled ? this.sanitizer.bypassSecurityTrustStyle(style) : style;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustStylePipe, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustStylePipe, name: "trustStyle" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustStylePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustStyle',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DomSanitizer }]; } });

/**
 * 调用数学函数 如{{ 5.1 | math: 'ceil' }} => 6
 */
class MathPipe {
    transform(value, fnName, fixed) {
        if (value == null) {
            return null;
        }
        const n = typeof value === 'string' ? Number(value) : value;
        // @ts-ignore
        const result = Math[fnName](n);
        return fixed == null ? result : n.toFixed(fixed);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MathPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: MathPipe, name: "math" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MathPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'math',
                    pure: true
                }]
        }] });

class TimeUnitPipe {
    transform(value, unit) {
        if (value == null) {
            return null;
        }
        const second = unit === 's' ? value : Math.floor(value / 1000);
        const days = Math.floor(second / 86400);
        const hours = Math.floor((second % 86400) / 3600);
        const minutes = Math.floor(((second % 86400) % 3600) / 60);
        const seconds = Math.floor(((second % 86400) % 3600) % 60);
        const units = ['天', '小时', '分', '秒'];
        const format = [days, hours, minutes, seconds].reduce((str, v, i) => (v ? str + v + units[i] : str), '');
        return format || '0秒';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TimeUnitPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TimeUnitPipe, name: "timeUnit" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TimeUnitPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'timeUnit',
                    pure: true
                }]
        }] });

/**
 * 把请求信息转换为异步对象
 */
class ToAsyncPipe {
    fetcher;
    constructor(fetcher) {
        this.fetcher = fetcher;
    }
    /**
     * 转换为Observable
     * @param value 可以是url或者Observable, Promise
     * @param option 配置项
     */
    transform(value, option) {
        if (value == null) {
            return of(option?.defaultValue);
        }
        const opt = option || {};
        const mapFn = NzxUtils.isFunction(opt.map) ? opt.map : (data) => data;
        if (typeof value === 'string') {
            return this.fetcher.fetch({ ...opt, url: value }).pipe(map(v => NzxUtils.defaultIfy(v, option?.defaultValue)), map(mapFn));
        }
        if (NzxUtils.isPromise(value) || NzxUtils.isObservable(value)) {
            return from(value).pipe(map(v => NzxUtils.defaultIfy(v, option?.defaultValue)), map(mapFn));
        }
        return of(value).pipe(map(mapFn));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToAsyncPipe, deps: [{ token: i1$2.FetcherService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToAsyncPipe, name: "toAsync" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToAsyncPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toAsync',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1$2.FetcherService }]; } });

/**
 * 字典管道
 * @example
 *
 * ``` html
 * {{1 | dic: 'status' | async}} // 'label'
 *
 * {{'A' | dic: 'status' | async}} // 'label'
 *
 * {{'A' | dic: statusObservable$ | async}} // 'label'
 *
 * {{'A' | dic: statusObservable$ : true | async}} // dic item
 *
 *
 * ```
 */
class DicPipe {
    dicService;
    constructor(dicService) {
        this.dicService = dicService;
    }
    /**
     * 字典管道
     * @param key 字典项key
     * @param dicItemsOrKey 字典名称
     * @param isGetItem 是否获取字典项
     */
    transform(key, dicItemsOrKey, isGetItem) {
        if (key == null) {
            return of(null);
        }
        const dic$ = NzxUtils.isString(dicItemsOrKey) ? this.dicService.getDic(dicItemsOrKey) : dicItemsOrKey;
        return dic$.pipe(map(list => NzxUtils.listToMap(list, 'value', isGetItem ? (v) => v : 'label')[key]));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicPipe, deps: [{ token: i1$2.DicService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DicPipe, name: "dic" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dic',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1$2.DicService }]; } });

/**
 * 根据路径获取数据
 * @example
 * {{ {a: {b: 1}} | pathValue: 'a.b'}} // 1
 */
class PathValuePipe {
    transform(value, path, defaultValue) {
        return NzxUtils.get(value, path, defaultValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PathValuePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PathValuePipe, name: "pathValue" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PathValuePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'pathValue',
                    pure: true
                }]
        }] });

const PIPE = [
    MathPipe,
    DefaultifyPipe,
    TrustUrlPipe,
    TrustHtmlPipe,
    TrustScriptPipe,
    TrustStylePipe,
    TimeUnitPipe,
    ToAsyncPipe,
    FilterPipe,
    DicPipe,
    PathValuePipe
];
class NzxPipeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, declarations: [MathPipe,
            DefaultifyPipe,
            TrustUrlPipe,
            TrustHtmlPipe,
            TrustScriptPipe,
            TrustStylePipe,
            TimeUnitPipe,
            ToAsyncPipe,
            FilterPipe,
            DicPipe,
            PathValuePipe], imports: [CommonModule], exports: [MathPipe,
            DefaultifyPipe,
            TrustUrlPipe,
            TrustHtmlPipe,
            TrustScriptPipe,
            TrustStylePipe,
            TimeUnitPipe,
            ToAsyncPipe,
            FilterPipe,
            DicPipe,
            PathValuePipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PIPE],
                    imports: [CommonModule],
                    exports: [PIPE]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultifyPipe, DicPipe, FilterPipe, MathPipe, NzxPipeModule, PathValuePipe, TimeUnitPipe, ToAsyncPipe, TrustHtmlPipe, TrustScriptPipe, TrustStylePipe, TrustUrlPipe };
//# sourceMappingURL=freezesoul-nzx-antd-pipe.mjs.map
