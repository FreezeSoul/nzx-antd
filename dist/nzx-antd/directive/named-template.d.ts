import { OnInit, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 获取模板名称
 * @example
 * ``` html
 * <ng-template named="test"></ng-template>
 * <ng-template #test named></ng-template>
 *
 * ```
 * ``` javascript
 * @Component(...)
 * export class TestComponent {
 *   @ViewChildren(NamedTemplate) list!: QueryList<NamedTemplate>;
 *
 *   trace() {
 *     this.list.forEach(it => {
 *       console.log(it.named);
 *       console.log(it.template);
 *     });
 *   }
 * }
 * ```
 */
export declare class NamedTemplate<T> implements OnInit {
    template: TemplateRef<T>;
    /**
     * 模板名称
     */
    named: string;
    constructor(template: TemplateRef<T>);
    ngOnInit(): void;
    resolveName(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NamedTemplate<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NamedTemplate<any>, "ng-template[named]", ["namedTemplate"], { "named": { "alias": "named"; "required": false; }; }, {}, never, never, false, never>;
}
