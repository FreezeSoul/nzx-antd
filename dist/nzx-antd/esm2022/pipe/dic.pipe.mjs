import { Pipe } from '@angular/core';
import { map, of } from 'rxjs';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd/service";
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
export class DicPipe {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicPipe, deps: [{ token: i1.DicService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DicPipe, name: "dic" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dic',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.DicService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvcGlwZS9kaWMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFLSCxNQUFNLE9BQU8sT0FBTztJQUNJO0lBQXRCLFlBQXNCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBb0NoRDs7Ozs7T0FLRztJQUNILFNBQVMsQ0FDUCxHQUEyQixFQUMzQixhQUFnRSxFQUNoRSxTQUFtQjtRQUVuQixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDZixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDdEcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO3dHQXJEVSxPQUFPO3NHQUFQLE9BQU87OzRGQUFQLE9BQU87a0JBSm5CLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpY0l0ZW0sIERpY1NlcnZpY2UgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC9zZXJ2aWNlJztcclxuaW1wb3J0IHsgbWFwLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIOWtl+WFuOeuoemBk1xyXG4gKiBAZXhhbXBsZVxyXG4gKlxyXG4gKiBgYGAgaHRtbFxyXG4gKiB7ezEgfCBkaWM6ICdzdGF0dXMnIHwgYXN5bmN9fSAvLyAnbGFiZWwnXHJcbiAqXHJcbiAqIHt7J0EnIHwgZGljOiAnc3RhdHVzJyB8IGFzeW5jfX0gLy8gJ2xhYmVsJ1xyXG4gKlxyXG4gKiB7eydBJyB8IGRpYzogc3RhdHVzT2JzZXJ2YWJsZSQgfCBhc3luY319IC8vICdsYWJlbCdcclxuICpcclxuICoge3snQScgfCBkaWM6IHN0YXR1c09ic2VydmFibGUkIDogdHJ1ZSB8IGFzeW5jfX0gLy8gZGljIGl0ZW1cclxuICpcclxuICpcclxuICogYGBgXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2RpYycsXHJcbiAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGljUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkaWNTZXJ2aWNlOiBEaWNTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiDlrZflhbjnrqHpgZMsIOiOt+WPluWtl+WFuOmhuWxhYmVsXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbjpoblrZXlcclxuICAgKiBAcGFyYW0gZGljSXRlbXNPcktleSDlrZflhbjlkI3np7BcclxuICAgKi9cclxuICB0cmFuc2Zvcm0oXHJcbiAgICBrZXk6IHN0cmluZyB8IG51bWJlciB8IG51bGwsXHJcbiAgICBkaWNJdGVtc09yS2V5OiBPYnNlcnZhYmxlPERpY0l0ZW1bXSB8IHVuZGVmaW5lZCB8IG51bGw+IHwgc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiDlrZflhbjnrqHpgZMsIOiOt+WPluWtl+WFuOmhuWxhYmVsXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbjpoblrZXlcclxuICAgKiBAcGFyYW0gZGljSXRlbXNPcktleSDlrZflhbjlkI3np7BcclxuICAgKiBAcGFyYW0gaXNHZXRJdGVtIOiOt+WPluWtl+WFuOmhuWxhYmVsXHJcbiAgICovXHJcbiAgdHJhbnNmb3JtKFxyXG4gICAga2V5OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsLFxyXG4gICAgZGljSXRlbXNPcktleTogT2JzZXJ2YWJsZTxEaWNJdGVtW10gfCB1bmRlZmluZWQgfCBudWxsPiB8IHN0cmluZyxcclxuICAgIGlzR2V0SXRlbTogZmFsc2VcclxuICApOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIOWtl+WFuOeuoemBkywg6I635Y+W5a2X5YW46aG5XHJcbiAgICogQHBhcmFtIGtleSDlrZflhbjpoblrZXlcclxuICAgKiBAcGFyYW0gZGljSXRlbXNPcktleSDlrZflhbjlkI3np7BcclxuICAgKiBAcGFyYW0gaXNHZXRJdGVtIOiOt+WPluWtl+WFuOmhuVxyXG4gICAqL1xyXG4gIHRyYW5zZm9ybShcclxuICAgIGtleTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCxcclxuICAgIGRpY0l0ZW1zT3JLZXk6IE9ic2VydmFibGU8RGljSXRlbVtdIHwgdW5kZWZpbmVkIHwgbnVsbD4gfCBzdHJpbmcsXHJcbiAgICBpc0dldEl0ZW06IHRydWVcclxuICApOiBPYnNlcnZhYmxlPERpY0l0ZW0+O1xyXG5cclxuICAvKipcclxuICAgKiDlrZflhbjnrqHpgZNcclxuICAgKiBAcGFyYW0ga2V5IOWtl+WFuOmhuWtleVxyXG4gICAqIEBwYXJhbSBkaWNJdGVtc09yS2V5IOWtl+WFuOWQjeensFxyXG4gICAqIEBwYXJhbSBpc0dldEl0ZW0g5piv5ZCm6I635Y+W5a2X5YW46aG5XHJcbiAgICovXHJcbiAgdHJhbnNmb3JtKFxyXG4gICAga2V5OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsLFxyXG4gICAgZGljSXRlbXNPcktleTogT2JzZXJ2YWJsZTxEaWNJdGVtW10gfCB1bmRlZmluZWQgfCBudWxsPiB8IHN0cmluZyxcclxuICAgIGlzR2V0SXRlbT86IGJvb2xlYW5cclxuICApOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGwgfCBEaWNJdGVtPiB7XHJcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG9mKG51bGwpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGljJCA9IE56eFV0aWxzLmlzU3RyaW5nKGRpY0l0ZW1zT3JLZXkpID8gdGhpcy5kaWNTZXJ2aWNlLmdldERpYyhkaWNJdGVtc09yS2V5KSA6IGRpY0l0ZW1zT3JLZXk7XHJcbiAgICByZXR1cm4gZGljJC5waXBlKG1hcChsaXN0ID0+IE56eFV0aWxzLmxpc3RUb01hcChsaXN0LCAndmFsdWUnLCBpc0dldEl0ZW0gPyAodjogRGljSXRlbSkgPT4gdiA6ICdsYWJlbCcpW2tleV0pKTtcclxuICB9XHJcbn1cclxuIl19