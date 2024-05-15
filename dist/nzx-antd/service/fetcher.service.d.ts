import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * 模板字符串函数, 构造同步请求URL
 * @example
 * let value!: string;
 * this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)}).subscribe(res => (value = res));
 * console.log(value);
 */
export declare function synced(url: TemplateStringsArray, ...keys: string[]): string;
/**
 * 启用同步请求
 * @example
 * let value!: string;
 * this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)}).subscribe(res => (value = res));
 * console.log(value);
 */
export declare const SYNCED_ENABLED: HttpContextToken<boolean>;
/**
 * 是否启用loading
 * @example
 * this.http.get<string>('url', { context: new HttpContext().set(LOADING_ENABLED, false).set(...)});
 */
export declare const LOADING_ENABLED: HttpContextToken<boolean>;
export declare class FetcherService {
    protected http: HttpClient;
    constructor(http: HttpClient);
    /**
     * 处理异步参数
     * @param data 参数
     */
    static resolveParams<T>(data?: FetchParams<T>): Observable<T | undefined>;
    /**
     * 发起请求, 参数可以是异步对象或函数
     * @param option 请求配置
     */
    fetch<T>(option: FetchOptions): Observable<T>;
    /**
     * 同步请求, 参数可以是异步对象或函数
     * @param option 请求配置
     */
    fetchSync<T>(option: Omit<FetchOptions, 'async'>): T;
    /**
     * 送请求
     * @param options 参数不包含函数不进行二次处理
     */
    doFetch<T>(options: FetchOptions): Observable<T>;
    /**
     * 同步请求, 参数不包含函数不进行二次处理
     * @param options
     */
    doFetchSync<T>(options: Omit<FetchOptions, 'async'>): T;
    /**
     * 使用同步方式进行远程校验
     * @param options
     */
    remoteValidate<T = NzSafeAny>(options: ValidatorOption<T>): ValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<FetcherService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FetcherService>;
}
/**
 * 请求参数
 */
export type FetchParams<T = NzSafeAny> = (() => Promise<T> | T) | Promise<T> | T;
/**
 * 请求配置
 */
export interface FetchOptions {
    url: string;
    /**
     * 请求方式
     */
    method?: string;
    /**
     * 请求参数
     */
    data?: FetchParams;
    /**
     * 发送之前的回调函数,仅URL 时有效
     * @param params
     */
    beforeSend?: (params: NzSafeAny) => NzSafeAny;
    /**
     * 响应类型
     */
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    /**
     * 订阅响应数据类型
     */
    observe?: 'body' | 'events' | 'response';
    /**
     * http上下文
     */
    context?: HttpContext;
    /**
     * 是否异步, 默认true
     */
    async?: boolean;
    /**
     * 是否显示loading
     */
    loading?: boolean;
}
/**
 * 验证器请求参数
 */
export type FetchValidatorParams<T = NzSafeAny> = ((control: AbstractControl) => Promise<T> | T) | Promise<T> | T;
/**
 * 远程验证器配置
 */
export type ValidatorOption<T = NzSafeAny> = Omit<FetchOptions, 'beforeSend' | 'async' | 'data'> & {
    /**
     * 错误信息描述
     */
    message: string;
    /**
     * 请求参数
     */
    data?: FetchValidatorParams;
    /**
     * 响应数据后的回调
     * @param data
     */
    afterFetch?(data: T): ValidationErrors | null;
    /**
     * 请求之前的回调
     * @param params
     * @param control
     */
    beforeSend?(params: NzSafeAny, control: AbstractControl): NzSafeAny;
};
export type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
