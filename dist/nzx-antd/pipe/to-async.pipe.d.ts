import { PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FetcherService, FetchOptions } from '@xmagic/nzx-antd/service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 把请求信息转换为异步对象
 */
export declare class ToAsyncPipe implements PipeTransform {
    private fetcher;
    constructor(fetcher: FetcherService);
    /**
     * 转换为Observable
     * @param value 可以是url或者Observable, Promise
     * @param option 配置项
     */
    transform<T = NzSafeAny, U = NzSafeAny>(value: string | Observable<T> | Promise<T> | T, option?: AsyncOption): Observable<U> | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToAsyncPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ToAsyncPipe, "toAsync", false>;
}
/**
 * 异步请求信息
 */
export type AsyncOption = Omit<FetchOptions, 'url'> & {
    /**
     * 映射数据
     * @param data
     * @param index
     */
    map?: (data: NzSafeAny) => NzSafeAny;
    /**
     * 默认值
     */
    defaultValue?: NzSafeAny;
};
