import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 允许在模板内复用计算值（包含异步），避免重复重新计算。
 * @example
 *
 * <div *let="value1 as v">
 *   <p>{{ v }}</p>
 * </div>
 * <div *let="time$ | async as time">
 *   <p>{{ time }}</p>
 * </div>
 */
export declare class LetDirective<T> {
    let: T;
    constructor(vc: ViewContainerRef, ref: TemplateRef<LetContext<T>>);
    static ngTemplateContextGuard<T>(_dir: LetDirective<T>, _ctx: NzSafeAny): _ctx is LetDirective<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LetDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LetDirective<any>, "[let]", never, { "let": { "alias": "let"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class LetContext<T> {
    private readonly directive;
    constructor(directive: LetDirective<T>);
    get $implicit(): T;
    get let(): T;
}
