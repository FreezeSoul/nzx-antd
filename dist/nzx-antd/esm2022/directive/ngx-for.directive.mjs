import { Directive, Input } from '@angular/core';
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
export class NgxFor {
    _viewContainer;
    _template;
    _differs;
    _kvDiffers;
    _ngxForOf = null;
    _ngxForDirty = true;
    _differ = null;
    _trackByFn;
    static ngxTemplateContextGuard(dir, ctx) {
        return true;
    }
    get ngxForTrackBy() {
        return this._trackByFn;
    }
    set ngxForTrackBy(fn) {
        this._trackByFn = fn;
    }
    set ngxForOf(ngxFor) {
        this._ngxForOf = ngxFor;
        this._ngxForDirty = true;
    }
    set ngxFor_2(ngxFor) {
        this._ngxForOf = ngxFor;
        this._ngxForDirty = true;
    }
    set ngxForTrackBy_2(fn) {
        this._trackByFn = fn;
    }
    constructor(_viewContainer, _template, _differs, _kvDiffers) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._kvDiffers = _kvDiffers;
    }
    set ngxForTemplate(value) {
        if (value) {
            this._template = value;
        }
    }
    set ngxForTemplate_2(value) {
        if (value) {
            this._template = value;
        }
    }
    ngDoCheck() {
        if (this._ngxForDirty) {
            this._ngxForDirty = false;
            const value = this._ngxForOf;
            if (!value) {
                this._differ = null;
            }
            else if (!this._differ) {
                const factory = this._differs.find([]);
                if (factory.supports(value)) {
                    this._differ = new IterDiffer(factory.create(this._trackByFn), this._viewContainer, this._template);
                }
                else {
                    const kvFactory = this._kvDiffers.find({});
                    if (kvFactory.supports(value)) {
                        this._differ = new KvDiffer(kvFactory.create(), this._viewContainer, this._template);
                    }
                }
            }
        }
        if (this._differ) {
            const changes = this._differ.diff(this._ngxForOf);
            if (changes) {
                changes.applyChanges(this._ngxForOf);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxFor, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i0.IterableDiffers }, { token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NgxFor, selector: "[ngx-for][ngx-forOf],[ngxFor][ngxForOf]", inputs: { ngxForTrackBy: "ngxForTrackBy", ngxForOf: "ngxForOf", ngxFor_2: ["ngx-forOf", "ngxFor_2"], ngxForTrackBy_2: ["ngx-forTrackBy", "ngxForTrackBy_2"], ngxForTemplate: "ngxForTemplate", ngxForTemplate_2: ["ngx-forTemplate", "ngxForTemplate_2"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxFor, decorators: [{
            type: Directive,
            args: [{ selector: '[ngx-for][ngx-forOf],[ngxFor][ngxForOf]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }]; }, propDecorators: { ngxForTrackBy: [{
                type: Input
            }], ngxForOf: [{
                type: Input
            }], ngxFor_2: [{
                type: Input,
                args: ['ngx-forOf']
            }], ngxForTrackBy_2: [{
                type: Input,
                args: ['ngx-forTrackBy']
            }], ngxForTemplate: [{
                type: Input
            }], ngxForTemplate_2: [{
                type: Input,
                args: ['ngx-forTemplate']
            }] } });
function applyViewChange(view, value) {
    view.context.$implicit = value;
}
function resolveContext(viewContainer, _ngxFor, callback = () => 0) {
    for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
        const viewRef = viewContainer.get(i);
        const context = viewRef.context;
        context.index = i;
        context.count = ilen;
        context.ngxFor = _ngxFor;
        callback(context);
    }
}
export class NgxForContext {
    $implicit;
    ngxFor;
    index;
    key;
    count;
    constructor($implicit, ngxFor, index, key, count) {
        this.$implicit = $implicit;
        this.ngxFor = ngxFor;
        this.index = index;
        this.key = key;
        this.count = count;
    }
    get first() {
        return this.index === 0;
    }
    get last() {
        return this.index === this.count - 1;
    }
    get even() {
        return this.index % 2 === 0;
    }
    get odd() {
        return !this.even;
    }
}
class IterDiffer {
    differ;
    _viewContainer;
    _template;
    constructor(differ, _viewContainer, _template) {
        this.differ = differ;
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    diff(value) {
        const changes = this.differ.diff(value);
        if (!changes) {
            return null;
        }
        return {
            applyChanges: _ngxFor => {
                const viewContainer = this._viewContainer;
                changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
                    if (item.previousIndex == null) {
                        viewContainer.createEmbeddedView(this._template, new NgxForContext(item.item, _ngxFor, -1, '', -1), currentIndex === null ? undefined : currentIndex);
                    }
                    else if (currentIndex == null) {
                        viewContainer.remove(adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex);
                    }
                    else if (adjustedPreviousIndex !== null) {
                        const view = viewContainer.get(adjustedPreviousIndex);
                        viewContainer.move(view, currentIndex);
                        applyViewChange(view, item.item);
                    }
                });
                resolveContext(viewContainer, _ngxFor, context => (context.key = context.index + ''));
                changes.forEachIdentityChange(record => {
                    const viewRef = viewContainer.get(record.currentIndex);
                    applyViewChange(viewRef, record.item);
                });
            }
        };
    }
}
class KvDiffer {
    differ;
    _viewContainer;
    _template;
    keyIndex = {};
    constructor(differ, _viewContainer, _template) {
        this.differ = differ;
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    diff(value) {
        const changes = this.differ.diff(value);
        if (!changes) {
            return null;
        }
        return {
            applyChanges: _ngxFor => {
                const viewContainer = this._viewContainer;
                const removes = [];
                changes.forEachRemovedItem(item => {
                    const index = this.keyIndex[item.key];
                    removes.push(index);
                    delete this.keyIndex[item.key];
                });
                removes.sort();
                for (let i = removes.length - 1; i >= 0; i--) {
                    viewContainer.remove(removes[i]);
                }
                changes.forEachChangedItem(item => {
                    const index = this.keyIndex[item.key];
                    const view = viewContainer.get(index);
                    applyViewChange(view, item.currentValue);
                });
                const keys = value instanceof Map ? Array.from(value.keys()) : Object.keys(value);
                changes.forEachAddedItem(item => {
                    viewContainer.createEmbeddedView(this._template, new NgxForContext(item.currentValue, _ngxFor, -1, item.key, -1), keys.indexOf(item.key));
                });
                resolveContext(viewContainer, _ngxFor, context => (this.keyIndex[context.key] = context.index));
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL25neC1mb3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQVNOLE1BQU0sZUFBZSxDQUFDOztBQUV2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUVILE1BQU0sT0FBTyxNQUFNO0lBcUNQO0lBQ0E7SUFDQTtJQUNBO0lBdkNGLFNBQVMsR0FBeUIsSUFBSSxDQUFDO0lBQ3ZDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDcEIsT0FBTyxHQUFxQixJQUFJLENBQUM7SUFDakMsVUFBVSxDQUFzQjtJQUV4QyxNQUFNLENBQUMsdUJBQXVCLENBQThCLEdBQWlCLEVBQUUsR0FBUTtRQUNyRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQ0ksYUFBYSxDQUFDLEVBQXNCO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxNQUErQztRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFDSSxRQUFRLENBQUMsTUFBK0M7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQ0ksZUFBZSxDQUFDLEVBQXNCO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxZQUNVLGNBQWdDLEVBQ2hDLFNB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LENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUN2QixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUVILGNBQWMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsRyxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIERvQ2hlY2ssXHJcbiAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gIElucHV0LFxyXG4gIEl0ZXJhYmxlRGlmZmVyLFxyXG4gIEl0ZXJhYmxlRGlmZmVycyxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgTmdJdGVyYWJsZSxcclxuICBUZW1wbGF0ZVJlZixcclxuICBUcmFja0J5RnVuY3Rpb24sXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIOWSjG5nRm9y5oyH5Luk55So5rOV57G75Ly8LOWQjOaXtuaUr+aMgeWkmuenjeaVsOaNrue7k+aehCzmr5TlpoI6IE1hcCxrZXkvdmFsdWUsSXRlcmFibGUsXHJcbiAqIOS9v+eUqCBgKm5neC1mb3JgIOWSjCBgKm5neEZvcmDmmK/nrYnmlYjnmoTjgILlpoLmnpzmmK/ov63ku6Plr7nosaHvvIjmlbDnu4TnrYnvvInkuIrkuIvmloflj4LmlbDkuK3nmoRrZXnlkoxpbmRleOaYr+S4gOagt+eahCwga2V55pivYHN0cmluZ2DnsbvlnotcclxuICogQGV4YW1wbGVcclxuICogYGBgdHNcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgc2VsZWN0b3I6ICd0ZXN0JyxcclxuICogICB0ZW1wbGF0ZTogYFxyXG4gKiA8dWw+XHJcbiAqICAgPGxpICpuZ3gtZm9yPVwibGV0IHZhbHVlIG9mIG15T2JqZWN0OyBpbmRleCBhcyBpbmRleDsga2V5IGFzIGtleVwiPlxyXG4gKiAgICAge3sgaW5kZXggfX0uIHt7IGtleSB9fToge3sgdmFsdWUgfX1cclxuICogICA8L2xpPlxyXG4gKlxyXG4gKiAgIDxsaSAqbmd4LWZvcj1cImxldCB2YWx1ZSBvZiBteUxpc3Q7IGluZGV4IGFzIGluZGV4OyBrZXkgYXMga2V5XCI+XHJcbiAqICAgICB7eyBpbmRleCB9fS4ge3sga2V5IH19OiB7eyB2YWx1ZSB9fVxyXG4gKiAgIDwvbGk+XHJcbiAqXHJcbiAqICAgPGxpICpuZ3hGb3I9XCJsZXQgdmFsdWUgb2YgbXlPYmplY3Q7IGluZGV4IGFzIGluZGV4OyBrZXkgYXMga2V5XCI+XHJcbiAqICAgICB7eyBpbmRleCB9fS4ge3sga2V5IH19OiB7eyB2YWx1ZSB9fVxyXG4gKiAgIDwvbGk+XHJcbiAqXHJcbiAqICAgPGxpICpuZ3hGb3I9XCJsZXQgdmFsdWUgb2YgbXlMaXN0OyBpbmRleCBhcyBpbmRleDsga2V5IGFzIGtleVwiPlxyXG4gKiAgICAge3sgaW5kZXggfX0uIHt7IGtleSB9fToge3sgdmFsdWUgfX1cclxuICogICA8L2xpPlxyXG4gKiA8L3VsPlxyXG4gKiAgIGAsXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBUZXN0Q29tcG9uZW50IHtcclxuICogICBteU9iamVjdCA9IHtcclxuICogICAgIG5hbWUxOiAn5byg5LiJJyxcclxuICogICAgIG5hbWUyOiAn5p2O5ZubJyxcclxuICogICAgIG5hbWUzOiAn546L5LqUJ1xyXG4gKiAgIH07XHJcbiAqXHJcbiAqICAgbXlMaXN0ID0gWyflvKDkuIknLCAn5p2O5ZubJywgJ+eOi+S6lCddXHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4LWZvcl1bbmd4LWZvck9mXSxbbmd4Rm9yXVtuZ3hGb3JPZl0nIH0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hGb3I8VCwgVSBleHRlbmRzIE5neEl0ZXJhYmxlPFQ+ID0gTmd4SXRlcmFibGU8VD4+IGltcGxlbWVudHMgRG9DaGVjayB7XHJcbiAgcHJpdmF0ZSBfbmd4Rm9yT2Y6IFUgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9uZ3hGb3JEaXJ0eSA9IHRydWU7XHJcbiAgcHJpdmF0ZSBfZGlmZmVyOiBEaWZmZXI8VD4gfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF90cmFja0J5Rm4hOiBUcmFja0J5RnVuY3Rpb248VD47XHJcblxyXG4gIHN0YXRpYyBuZ3hUZW1wbGF0ZUNvbnRleHRHdWFyZDxULCBVIGV4dGVuZHMgTmd4SXRlcmFibGU8VD4+KGRpcjogTmd4Rm9yPFQsIFU+LCBjdHg6IGFueSk6IGN0eCBpcyBOZ3hGb3JDb250ZXh0PFQsIFU+IHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5neEZvclRyYWNrQnkoKTogVHJhY2tCeUZ1bmN0aW9uPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLl90cmFja0J5Rm47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBuZ3hGb3JUcmFja0J5KGZuOiBUcmFja0J5RnVuY3Rpb248VD4pIHtcclxuICAgIHRoaXMuX3RyYWNrQnlGbiA9IGZuO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbmd4Rm9yT2Yobmd4Rm9yOiAoVSAmIE5neEl0ZXJhYmxlPFQ+KSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcclxuICAgIHRoaXMuX25neEZvck9mID0gbmd4Rm9yO1xyXG4gICAgdGhpcy5fbmd4Rm9yRGlydHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCduZ3gtZm9yT2YnKVxyXG4gIHNldCBuZ3hGb3JfMihuZ3hGb3I6IChVICYgTmd4SXRlcmFibGU8VD4pIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbmd4Rm9yT2YgPSBuZ3hGb3I7XHJcbiAgICB0aGlzLl9uZ3hGb3JEaXJ0eSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoJ25neC1mb3JUcmFja0J5JylcclxuICBzZXQgbmd4Rm9yVHJhY2tCeV8yKGZuOiBUcmFja0J5RnVuY3Rpb248VD4pIHtcclxuICAgIHRoaXMuX3RyYWNrQnlGbiA9IGZuO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPE5neEZvckNvbnRleHQ8VCwgVT4+LFxyXG4gICAgcHJpdmF0ZSBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxyXG4gICAgcHJpdmF0ZSBfa3ZEaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnNcclxuICApIHt9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG5neEZvclRlbXBsYXRlKHZhbHVlOiBUZW1wbGF0ZVJlZjxOZ3hGb3JDb250ZXh0PFQsIFU+Pikge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3RlbXBsYXRlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBJbnB1dCgnbmd4LWZvclRlbXBsYXRlJylcclxuICBzZXQgbmd4Rm9yVGVtcGxhdGVfMih2YWx1ZTogVGVtcGxhdGVSZWY8Tmd4Rm9yQ29udGV4dDxULCBVPj4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl90ZW1wbGF0ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX25neEZvckRpcnR5KSB7XHJcbiAgICAgIHRoaXMuX25neEZvckRpcnR5ID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fbmd4Rm9yT2Y7XHJcbiAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9kaWZmZXIgPSBudWxsO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kaWZmZXIpIHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKTtcclxuICAgICAgICBpZiAoZmFjdG9yeS5zdXBwb3J0cyh2YWx1ZSkpIHtcclxuICAgICAgICAgIHRoaXMuX2RpZmZlciA9IG5ldyBJdGVyRGlmZmVyKGZhY3RvcnkuY3JlYXRlKHRoaXMuX3RyYWNrQnlGbiksIHRoaXMuX3ZpZXdDb250YWluZXIsIHRoaXMuX3RlbXBsYXRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qga3ZGYWN0b3J5ID0gdGhpcy5fa3ZEaWZmZXJzLmZpbmQoe30pO1xyXG4gICAgICAgICAgaWYgKGt2RmFjdG9yeS5zdXBwb3J0cyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlmZmVyID0gbmV3IEt2RGlmZmVyKGt2RmFjdG9yeS5jcmVhdGUoKSwgdGhpcy5fdmlld0NvbnRhaW5lciwgdGhpcy5fdGVtcGxhdGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9kaWZmZXIpIHtcclxuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX25neEZvck9mKTtcclxuICAgICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgICBjaGFuZ2VzLmFwcGx5Q2hhbmdlcyh0aGlzLl9uZ3hGb3JPZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Vmlld0NoYW5nZTxUPih2aWV3OiBFbWJlZGRlZFZpZXdSZWY8Tmd4Rm9yQ29udGV4dDxUPj4sIHZhbHVlOiBUKSB7XHJcbiAgdmlldy5jb250ZXh0LiRpbXBsaWNpdCA9IHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNvbHZlQ29udGV4dDxUPihcclxuICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIF9uZ3hGb3I6IGFueSxcclxuICBjYWxsYmFjazogKGNvbnRleHQ6IE5neEZvckNvbnRleHQ8VCwgTmd4SXRlcmFibGU8VD4+KSA9PiB2b2lkID0gKCkgPT4gMFxyXG4pIHtcclxuICBmb3IgKGxldCBpID0gMCwgaWxlbiA9IHZpZXdDb250YWluZXIubGVuZ3RoOyBpIDwgaWxlbjsgaSsrKSB7XHJcbiAgICBjb25zdCB2aWV3UmVmID0gPEVtYmVkZGVkVmlld1JlZjxOZ3hGb3JDb250ZXh0PFQsIE5neEl0ZXJhYmxlPFQ+Pj4+dmlld0NvbnRhaW5lci5nZXQoaSk7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdmlld1JlZi5jb250ZXh0O1xyXG4gICAgY29udGV4dC5pbmRleCA9IGk7XHJcbiAgICBjb250ZXh0LmNvdW50ID0gaWxlbjtcclxuICAgIGNvbnRleHQubmd4Rm9yID0gX25neEZvciE7XHJcbiAgICBjYWxsYmFjayhjb250ZXh0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hGb3JDb250ZXh0PFQsIFUgZXh0ZW5kcyBOZ3hJdGVyYWJsZTxUPiA9IE5neEl0ZXJhYmxlPFQ+PiB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgJGltcGxpY2l0OiBUIHwgbnVsbCxcclxuICAgIHB1YmxpYyBuZ3hGb3I6IFUsXHJcbiAgICBwdWJsaWMgaW5kZXg6IG51bWJlcixcclxuICAgIHB1YmxpYyBrZXk6IHN0cmluZyxcclxuICAgIHB1YmxpYyBjb3VudDogbnVtYmVyXHJcbiAgKSB7fVxyXG5cclxuICBnZXQgZmlyc3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmRleCA9PT0gMDtcclxuICB9XHJcblxyXG4gIGdldCBsYXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5kZXggPT09IHRoaXMuY291bnQgLSAxO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGV2ZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmRleCAlIDIgPT09IDA7XHJcbiAgfVxyXG5cclxuICBnZXQgb2RkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmV2ZW47XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSB0eXBlIE5neEl0ZXJhYmxlPFQ+ID0gTmdJdGVyYWJsZTxUPiB8IE5neEt2PFQ+O1xyXG5leHBvcnQgZGVjbGFyZSB0eXBlIE5neEt2PFQ+ID0gUmVjb3JkPHN0cmluZywgVD4gfCBNYXA8c3RyaW5nLCBUPjtcclxuXHJcbmludGVyZmFjZSBBcHBseUNoYW5nZXM8VD4ge1xyXG4gIGFwcGx5Q2hhbmdlcyhfbmd4Rm9yPzogYW55KTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIERpZmZlcjxUPiB7XHJcbiAgZGlmZih2YWx1ZT86IGFueSk6IEFwcGx5Q2hhbmdlczxUPiB8IG51bGw7XHJcbn1cclxuXHJcbmNsYXNzIEl0ZXJEaWZmZXI8VD4gaW1wbGVtZW50cyBEaWZmZXI8VD4ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGRpZmZlcjogSXRlcmFibGVEaWZmZXI8VD4sXHJcbiAgICBwdWJsaWMgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwdWJsaWMgX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOZ3hGb3JDb250ZXh0PFQsIE5neEl0ZXJhYmxlPFQ+Pj5cclxuICApIHt9XHJcblxyXG4gIGRpZmYodmFsdWU/OiBOZ0l0ZXJhYmxlPFQ+IHwgbnVsbCk6IEFwcGx5Q2hhbmdlczxUPiB8IG51bGwge1xyXG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodmFsdWUpO1xyXG4gICAgaWYgKCFjaGFuZ2VzKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXBwbHlDaGFuZ2VzOiBfbmd4Rm9yID0+IHtcclxuICAgICAgICBjb25zdCB2aWV3Q29udGFpbmVyID0gdGhpcy5fdmlld0NvbnRhaW5lcjtcclxuICAgICAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKGl0ZW0sIGFkanVzdGVkUHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXHJcbiAgICAgICAgICAgICAgdGhpcy5fdGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgbmV3IE5neEZvckNvbnRleHQoaXRlbS5pdGVtLCBfbmd4Rm9yISwgLTEsICcnLCAtMSksXHJcbiAgICAgICAgICAgICAgY3VycmVudEluZGV4ID09PSBudWxsID8gdW5kZWZpbmVkIDogY3VycmVudEluZGV4XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXIucmVtb3ZlKGFkanVzdGVkUHJldmlvdXNJbmRleCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGFkanVzdGVkUHJldmlvdXNJbmRleCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGFkanVzdGVkUHJldmlvdXNJbmRleCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdmlld0NvbnRhaW5lci5nZXQoYWRqdXN0ZWRQcmV2aW91c0luZGV4KSE7XHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXIubW92ZSh2aWV3LCBjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgICAgICBhcHBseVZpZXdDaGFuZ2UodmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8Tmd4Rm9yQ29udGV4dDxULCBOZ3hJdGVyYWJsZTxUPj4+LCBpdGVtLml0ZW0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXNvbHZlQ29udGV4dCh2aWV3Q29udGFpbmVyLCBfbmd4Rm9yLCBjb250ZXh0ID0+IChjb250ZXh0LmtleSA9IGNvbnRleHQuaW5kZXggKyAnJykpO1xyXG5cclxuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJZGVudGl0eUNoYW5nZShyZWNvcmQgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgdmlld1JlZiA9IDxFbWJlZGRlZFZpZXdSZWY8Tmd4Rm9yQ29udGV4dDxULCBOZ3hJdGVyYWJsZTxUPj4+PnZpZXdDb250YWluZXIuZ2V0KHJlY29yZC5jdXJyZW50SW5kZXghKTtcclxuICAgICAgICAgIGFwcGx5Vmlld0NoYW5nZSh2aWV3UmVmLCByZWNvcmQuaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBLdkRpZmZlcjxUPiBpbXBsZW1lbnRzIERpZmZlcjxUPiB7XHJcbiAgcHJpdmF0ZSBrZXlJbmRleDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGRpZmZlcjogS2V5VmFsdWVEaWZmZXI8YW55LCBUPixcclxuICAgIHB1YmxpYyBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHB1YmxpYyBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPE5neEZvckNvbnRleHQ8VCwgTmd4SXRlcmFibGU8VD4+PlxyXG4gICkge31cclxuXHJcbiAgZGlmZih2YWx1ZT86IFJlY29yZDxzdHJpbmcsIFQ+IHwgTWFwPGFueSwgVD4gfCBudWxsKTogQXBwbHlDaGFuZ2VzPFQ+IHwgbnVsbCB7XHJcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCBUPik7XHJcbiAgICBpZiAoIWNoYW5nZXMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhcHBseUNoYW5nZXM6IF9uZ3hGb3IgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZpZXdDb250YWluZXIgPSB0aGlzLl92aWV3Q29udGFpbmVyO1xyXG5cclxuICAgICAgICBjb25zdCByZW1vdmVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmtleUluZGV4W2l0ZW0ua2V5XTtcclxuICAgICAgICAgIHJlbW92ZXMucHVzaChpbmRleCk7XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5rZXlJbmRleFtpdGVtLmtleV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlbW92ZXMuc29ydCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSByZW1vdmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICB2aWV3Q29udGFpbmVyLnJlbW92ZShyZW1vdmVzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmtleUluZGV4W2l0ZW0ua2V5XTtcclxuICAgICAgICAgIGNvbnN0IHZpZXcgPSB2aWV3Q29udGFpbmVyLmdldChpbmRleCkhO1xyXG4gICAgICAgICAgYXBwbHlWaWV3Q2hhbmdlKHZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPE5neEZvckNvbnRleHQ8VCwgTmd4S3Y8VD4+PiwgaXRlbS5jdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBrZXlzID0gdmFsdWUgaW5zdGFuY2VvZiBNYXAgPyBBcnJheS5mcm9tKHZhbHVlLmtleXMoKSkgOiBPYmplY3Qua2V5cyh2YWx1ZSBhcyB7fSk7XHJcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcoXHJcbiAgICAgICAgICAgIHRoaXMuX3RlbXBsYXRlLFxyXG4gICAgICAgICAgICBuZXcgTmd4Rm9yQ29udGV4dChpdGVtLmN1cnJlbnRWYWx1ZSwgX25neEZvciEsIC0xLCBpdGVtLmtleSwgLTEpLFxyXG4gICAgICAgICAgICBrZXlzLmluZGV4T2YoaXRlbS5rZXkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXNvbHZlQ29udGV4dCh2aWV3Q29udGFpbmVyLCBfbmd4Rm9yLCBjb250ZXh0ID0+ICh0aGlzLmtleUluZGV4W2NvbnRleHQua2V5XSA9IGNvbnRleHQuaW5kZXgpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19