import { PipeTransform } from '@angular/core';
import { DicItem, DicService } from '@xmagic/nzx-antd/service';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
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
export declare class DicPipe implements PipeTransform {
    protected dicService: DicService;
    constructor(dicService: DicService);
    /**
     * 字典管道, 获取字典项label
     * @param key 字典项key
     * @param dicItemsOrKey 字典名称
     */
    transform(key: string | number | null, dicItemsOrKey: Observable<DicItem[] | undefined | null> | string): Observable<string>;
    /**
     * 字典管道, 获取字典项label
     * @param key 字典项key
     * @param dicItemsOrKey 字典名称
     * @param isGetItem 获取字典项label
     */
    transform(key: string | number | null, dicItemsOrKey: Observable<DicItem[] | undefined | null> | string, isGetItem: false): Observable<string>;
    /**
     * 字典管道, 获取字典项
     * @param key 字典项key
     * @param dicItemsOrKey 字典名称
     * @param isGetItem 获取字典项
     */
    transform(key: string | number | null, dicItemsOrKey: Observable<DicItem[] | undefined | null> | string, isGetItem: true): Observable<DicItem>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DicPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DicPipe, "dic", false>;
}
