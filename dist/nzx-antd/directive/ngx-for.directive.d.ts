import { DoCheck, IterableDiffers, KeyValueDiffers, NgIterable, TemplateRef, TrackByFunction, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 和ngFor指令用法类似,同时支持多种数据结构,比如: Map,key/value,Iterable,
 * 使用 `*ngx-for` 和 `*ngxFor`是等效的。如果是迭代对象（数组等）上下文参数中的key和index是一样的, key是`string`类型
 * @example
 * ```ts
 * @Component({
 *   selector: 'test',
 *   template: `
 * <ul>
 *   <li *ngx-for="let value of myObject; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 *
 *   <li *ngx-for="let value of myList; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 *
 *   <li *ngxFor="let value of myObject; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 *
 *   <li *ngxFor="let value of myList; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 * </ul>
 *   `,
 * })
 * export class TestComponent {
 *   myObject = {
 *     name1: '张三',
 *     name2: '李四',
 *     name3: '王五'
 *   };
 *
 *   myList = ['张三', '李四', '王五']
 * }
 * ```
 */
export declare class NgxFor<T, U extends NgxIterable<T> = NgxIterable<T>> implements DoCheck {
    private _viewContainer;
    private _template;
    private _differs;
    private _kvDiffers;
    private _ngxForOf;
    private _ngxForDirty;
    private _differ;
    private _trackByFn;
    static ngxTemplateContextGuard<T, U extends NgxIterable<T>>(dir: NgxFor<T, U>, ctx: any): ctx is NgxForContext<T, U>;
    get ngxForTrackBy(): TrackByFunction<T>;
    set ngxForTrackBy(fn: TrackByFunction<T>);
    set ngxForOf(ngxFor: (U & NgxIterable<T>) | undefined | null);
    set ngxFor_2(ngxFor: (U & NgxIterable<T>) | undefined | null);
    set ngxForTrackBy_2(fn: TrackByFunction<T>);
    constructor(_viewContainer: ViewContainerRef, _template: TemplateRef<NgxForContext<T, U>>, _differs: IterableDiffers, _kvDiffers: KeyValueDiffers);
    set ngxForTemplate(value: TemplateRef<NgxForContext<T, U>>);
    set ngxForTemplate_2(value: TemplateRef<NgxForContext<T, U>>);
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxFor<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxFor<any, any>, "[ngx-for][ngx-forOf],[ngxFor][ngxForOf]", never, { "ngxForTrackBy": { "alias": "ngxForTrackBy"; "required": false; }; "ngxForOf": { "alias": "ngxForOf"; "required": false; }; "ngxFor_2": { "alias": "ngx-forOf"; "required": false; }; "ngxForTrackBy_2": { "alias": "ngx-forTrackBy"; "required": false; }; "ngxForTemplate": { "alias": "ngxForTemplate"; "required": false; }; "ngxForTemplate_2": { "alias": "ngx-forTemplate"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class NgxForContext<T, U extends NgxIterable<T> = NgxIterable<T>> {
    $implicit: T | null;
    ngxFor: U;
    index: number;
    key: string;
    count: number;
    constructor($implicit: T | null, ngxFor: U, index: number, key: string, count: number);
    get first(): boolean;
    get last(): boolean;
    get even(): boolean;
    get odd(): boolean;
}
export declare type NgxIterable<T> = NgIterable<T> | NgxKv<T>;
export declare type NgxKv<T> = Record<string, T> | Map<string, T>;
