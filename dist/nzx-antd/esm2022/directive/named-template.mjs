import { Directive, Input } from '@angular/core';
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
export class NamedTemplate {
    template;
    /**
     * 模板名称
     */
    named;
    constructor(template) {
        this.template = template;
    }
    ngOnInit() {
        this.resolveName();
    }
    resolveName() {
        if (!this.named && this.template) {
            const tplRef = this.template;
            // localNames为数组, 如果没有name则为null
            this.named = tplRef._declarationTContainer.localNames?.[0];
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NamedTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NamedTemplate, selector: "ng-template[named]", inputs: { named: "named" }, exportAs: ["namedTemplate"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NamedTemplate, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[named]',
                    exportAs: 'namedTemplate'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { named: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWQtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL25hbWVkLXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7QUFHdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUtILE1BQU0sT0FBTyxhQUFhO0lBS0w7SUFKbkI7O09BRUc7SUFDTSxLQUFLLENBQVU7SUFDeEIsWUFBbUIsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFBRyxDQUFDO0lBRS9DLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFxQixDQUFDO1lBQzFDLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7d0dBakJVLGFBQWE7NEZBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFKekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsZUFBZTtpQkFDMUI7a0dBS1UsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaooeadv+WQjeensFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgYGAgaHRtbFxyXG4gKiA8bmctdGVtcGxhdGUgbmFtZWQ9XCJ0ZXN0XCI+PC9uZy10ZW1wbGF0ZT5cclxuICogPG5nLXRlbXBsYXRlICN0ZXN0IG5hbWVkPjwvbmctdGVtcGxhdGU+XHJcbiAqXHJcbiAqIGBgYFxyXG4gKiBgYGAgamF2YXNjcmlwdFxyXG4gKiBAQ29tcG9uZW50KC4uLilcclxuICogZXhwb3J0IGNsYXNzIFRlc3RDb21wb25lbnQge1xyXG4gKiAgIEBWaWV3Q2hpbGRyZW4oTmFtZWRUZW1wbGF0ZSkgbGlzdCE6IFF1ZXJ5TGlzdDxOYW1lZFRlbXBsYXRlPjtcclxuICpcclxuICogICB0cmFjZSgpIHtcclxuICogICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ID0+IHtcclxuICogICAgICAgY29uc29sZS5sb2coaXQubmFtZWQpO1xyXG4gKiAgICAgICBjb25zb2xlLmxvZyhpdC50ZW1wbGF0ZSk7XHJcbiAqICAgICB9KTtcclxuICogICB9XHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25hbWVkXScsXHJcbiAgZXhwb3J0QXM6ICduYW1lZFRlbXBsYXRlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmFtZWRUZW1wbGF0ZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLyoqXHJcbiAgICog5qih5p2/5ZCN56ewXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmFtZWQhOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxUPikge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc29sdmVOYW1lKCk7XHJcbiAgfVxyXG5cclxuICByZXNvbHZlTmFtZSgpIHtcclxuICAgIGlmICghdGhpcy5uYW1lZCAmJiB0aGlzLnRlbXBsYXRlKSB7XHJcbiAgICAgIGNvbnN0IHRwbFJlZiA9IHRoaXMudGVtcGxhdGUgYXMgTnpTYWZlQW55O1xyXG4gICAgICAvLyBsb2NhbE5hbWVz5Li65pWw57uELCDlpoLmnpzmsqHmnIluYW1l5YiZ5Li6bnVsbFxyXG4gICAgICB0aGlzLm5hbWVkID0gdHBsUmVmLl9kZWNsYXJhdGlvblRDb250YWluZXIubG9jYWxOYW1lcz8uWzBdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=