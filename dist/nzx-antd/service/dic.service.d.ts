import { OptionItem } from '@freezesoul/nzx-antd/checkbox';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Any, NzxAntdService } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
export declare class DicService {
    protected http: HttpClient;
    protected antdService: NzxAntdService;
    /**
     * 字典请求缓存, 请求完成会自动删除
     * @private
     */
    private dicMap;
    /**
     * 字典map缓存数据, 可以通过removeDic删除缓存
     * @private
     */
    private dicMapData;
    /**
     * 字典配置
     * @private
     */
    private dicSettings;
    constructor(http: HttpClient, antdService: NzxAntdService);
    /**
     * 获取字典, 异步请求
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDic(key: string, isNumber?: boolean): Observable<DicItem[]>;
    /**
     * 获取字典项对应的名称
     * @param key 字典key
     * @param itemKey 字典项的key
     */
    getLabel(key: string, itemKey?: string | number): Observable<null> | Observable<string>;
    /**
     * 同步获取字典项对应的名称
     * @param key 字典key
     * @param itemKey 字典项的key
     */
    getLabelSync(key: string, itemKey?: string | number): string | Observable<null>;
    /**
     * 获取map{value: label}形式的字典数据, 异步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMap(key: string, isNumber?: boolean): Observable<Record<string, string>>;
    /**
     * 获取字典, 同步请求  请求会被缓存
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicSync(key: string, isNumber?: boolean): DicItem[];
    /**
     * 获取map形式的字典数据, 同步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapSync(key: string, isNumber?: boolean): Record<string, string>;
    /**
     * 获取map即{value: DicItem}形式的字典数据, 异步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapItem(key: string, isNumber?: boolean): Observable<Record<string, DicItem>>;
    /**
     * 获取map即{value: DicItem}形式的字典数据, 同步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapItemSync(key: string, isNumber?: boolean): Record<string, DicItem>;
    /**
     * 删除指定字典key的缓存数据
     * @param key 字典key
     */
    removeDic(key: string): void;
    /**
     * 清空所有字典缓存
     */
    clearDic(): void;
    /**
     * 请求字典数据
     * @param key 字典key
     * @param synced 是否同步
     * @param isNumber 是否数字
     */
    fetchDic(key: string, synced: boolean, isNumber?: boolean): Observable<{
        [prop: string]: any;
        label: string;
        value: any;
    }[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DicService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DicService>;
}
/**
 * 字典项定义, {label: string; value: any}
 */
export type DicItem = Pick<OptionItem, 'label' | 'value'> & {
    [prop: string]: Any;
};
