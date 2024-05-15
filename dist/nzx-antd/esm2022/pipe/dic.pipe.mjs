import { Pipe } from '@angular/core';
import { map, of } from 'rxjs';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd/service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvcGlwZS9kaWMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsR0FBRyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFLSCxNQUFNLE9BQU8sT0FBTztJQUNJO0lBQXRCLFlBQXNCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBb0NoRDs7Ozs7T0FLRztJQUNILFNBQVMsQ0FDUCxHQUEyQixFQUMzQixhQUFnRSxFQUNoRSxTQUFtQjtRQUVuQixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDZixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDdEcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO3dHQXJEVSxPQUFPO3NHQUFQLE9BQU87OzRGQUFQLE9BQU87a0JBSm5CLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpY0l0ZW0sIERpY1NlcnZpY2UgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3NlcnZpY2UnO1xyXG5pbXBvcnQgeyBtYXAsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiDlrZflhbjnrqHpgZNcclxuICogQGV4YW1wbGVcclxuICpcclxuICogYGBgIGh0bWxcclxuICoge3sxIHwgZGljOiAnc3RhdHVzJyB8IGFzeW5jfX0gLy8gJ2xhYmVsJ1xyXG4gKlxyXG4gKiB7eydBJyB8IGRpYzogJ3N0YXR1cycgfCBhc3luY319IC8vICdsYWJlbCdcclxuICpcclxuICoge3snQScgfCBkaWM6IHN0YXR1c09ic2VydmFibGUkIHwgYXN5bmN9fSAvLyAnbGFiZWwnXHJcbiAqXHJcbiAqIHt7J0EnIHwgZGljOiBzdGF0dXNPYnNlcnZhYmxlJCA6IHRydWUgfCBhc3luY319IC8vIGRpYyBpdGVtXHJcbiAqXHJcbiAqXHJcbiAqIGBgYFxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdkaWMnLFxyXG4gIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIERpY1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGljU2VydmljZTogRGljU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICog5a2X5YW4566h6YGTLCDojrflj5blrZflhbjpoblsYWJlbFxyXG4gICAqIEBwYXJhbSBrZXkg5a2X5YW46aG5a2V5XHJcbiAgICogQHBhcmFtIGRpY0l0ZW1zT3JLZXkg5a2X5YW45ZCN56ewXHJcbiAgICovXHJcbiAgdHJhbnNmb3JtKFxyXG4gICAga2V5OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsLFxyXG4gICAgZGljSXRlbXNPcktleTogT2JzZXJ2YWJsZTxEaWNJdGVtW10gfCB1bmRlZmluZWQgfCBudWxsPiB8IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICog5a2X5YW4566h6YGTLCDojrflj5blrZflhbjpoblsYWJlbFxyXG4gICAqIEBwYXJhbSBrZXkg5a2X5YW46aG5a2V5XHJcbiAgICogQHBhcmFtIGRpY0l0ZW1zT3JLZXkg5a2X5YW45ZCN56ewXHJcbiAgICogQHBhcmFtIGlzR2V0SXRlbSDojrflj5blrZflhbjpoblsYWJlbFxyXG4gICAqL1xyXG4gIHRyYW5zZm9ybShcclxuICAgIGtleTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCxcclxuICAgIGRpY0l0ZW1zT3JLZXk6IE9ic2VydmFibGU8RGljSXRlbVtdIHwgdW5kZWZpbmVkIHwgbnVsbD4gfCBzdHJpbmcsXHJcbiAgICBpc0dldEl0ZW06IGZhbHNlXHJcbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiDlrZflhbjnrqHpgZMsIOiOt+WPluWtl+WFuOmhuVxyXG4gICAqIEBwYXJhbSBrZXkg5a2X5YW46aG5a2V5XHJcbiAgICogQHBhcmFtIGRpY0l0ZW1zT3JLZXkg5a2X5YW45ZCN56ewXHJcbiAgICogQHBhcmFtIGlzR2V0SXRlbSDojrflj5blrZflhbjpoblcclxuICAgKi9cclxuICB0cmFuc2Zvcm0oXHJcbiAgICBrZXk6IHN0cmluZyB8IG51bWJlciB8IG51bGwsXHJcbiAgICBkaWNJdGVtc09yS2V5OiBPYnNlcnZhYmxlPERpY0l0ZW1bXSB8IHVuZGVmaW5lZCB8IG51bGw+IHwgc3RyaW5nLFxyXG4gICAgaXNHZXRJdGVtOiB0cnVlXHJcbiAgKTogT2JzZXJ2YWJsZTxEaWNJdGVtPjtcclxuXHJcbiAgLyoqXHJcbiAgICog5a2X5YW4566h6YGTXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbjpoblrZXlcclxuICAgKiBAcGFyYW0gZGljSXRlbXNPcktleSDlrZflhbjlkI3np7BcclxuICAgKiBAcGFyYW0gaXNHZXRJdGVtIOaYr+WQpuiOt+WPluWtl+WFuOmhuVxyXG4gICAqL1xyXG4gIHRyYW5zZm9ybShcclxuICAgIGtleTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCxcclxuICAgIGRpY0l0ZW1zT3JLZXk6IE9ic2VydmFibGU8RGljSXRlbVtdIHwgdW5kZWZpbmVkIHwgbnVsbD4gfCBzdHJpbmcsXHJcbiAgICBpc0dldEl0ZW0/OiBib29sZWFuXHJcbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsIHwgRGljSXRlbT4ge1xyXG4gICAgaWYgKGtleSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBvZihudWxsKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRpYyQgPSBOenhVdGlscy5pc1N0cmluZyhkaWNJdGVtc09yS2V5KSA/IHRoaXMuZGljU2VydmljZS5nZXREaWMoZGljSXRlbXNPcktleSkgOiBkaWNJdGVtc09yS2V5O1xyXG4gICAgcmV0dXJuIGRpYyQucGlwZShtYXAobGlzdCA9PiBOenhVdGlscy5saXN0VG9NYXAobGlzdCwgJ3ZhbHVlJywgaXNHZXRJdGVtID8gKHY6IERpY0l0ZW0pID0+IHYgOiAnbGFiZWwnKVtrZXldKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==