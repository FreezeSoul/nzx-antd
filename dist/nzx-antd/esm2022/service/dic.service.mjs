import { Injectable } from '@angular/core';
import { map, of, shareReplay, tap } from 'rxjs';
import { HttpContext } from '@angular/common/http';
import { LOADING_ENABLED, SYNCED_ENABLED } from './fetcher.service';
import { finalize } from 'rxjs/operators';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@xmagic/nzx-antd";
export class DicService {
    http;
    antdService;
    /**
     * 字典请求缓存, 请求完成会自动删除
     * @private
     */
    dicMap = new Map();
    /**
     * 字典map缓存数据, 可以通过removeDic删除缓存
     * @private
     */
    dicMapData = new Map();
    /**
     * 字典配置
     * @private
     */
    dicSettings;
    constructor(http, antdService) {
        this.http = http;
        this.antdService = antdService;
        this.dicSettings = Object.assign({
            map: (data) => (data.children || []).map(v => ({ label: v.code, value: v.name, ...v }))
        }, antdService.dic);
    }
    /**
     * 获取字典, 异步请求
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDic(key, isNumber) {
        if (this.dicMapData.has(key)) {
            return of(this.dicMapData.get(key));
        }
        if (this.dicMap.has(key)) {
            return this.dicMap.get(key);
        }
        const dic$ = this.fetchDic(key, false, isNumber).pipe(shareReplay(1), tap(data => this.dicMapData.set(key, data)), finalize(() => this.dicMap.delete(key)));
        this.dicMap.set(key, dic$);
        return dic$;
    }
    /**
     * 获取字典项对应的名称
     * @param key 字典key
     * @param itemKey 字典项的key
     */
    getLabel(key, itemKey) {
        if (itemKey == null) {
            return of(null);
        }
        return this.getDicMap(key, NzxUtils.isNumber(itemKey)).pipe(map(dic => dic[itemKey]));
    }
    /**
     * 同步获取字典项对应的名称
     * @param key 字典key
     * @param itemKey 字典项的key
     */
    getLabelSync(key, itemKey) {
        if (itemKey == null) {
            return of(null);
        }
        return this.getDicMapSync(key, NzxUtils.isNumber(itemKey))[itemKey];
    }
    /**
     * 获取map{value: label}形式的字典数据, 异步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMap(key, isNumber) {
        return this.getDic(key, isNumber).pipe(map(list => NzxUtils.listToMap(list, 'value', 'label')));
    }
    /**
     * 获取字典, 同步请求  请求会被缓存
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicSync(key, isNumber) {
        if (this.dicMapData.has(key)) {
            return this.dicMapData.get(key) || [];
        }
        const data = NzxUtils.getAjaxValue(this.fetchDic(key, true, isNumber));
        this.dicMapData.set(key, data);
        return data;
    }
    /**
     * 获取map形式的字典数据, 同步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapSync(key, isNumber) {
        return NzxUtils.listToMap(this.getDicSync(key, isNumber), 'value', 'label');
    }
    /**
     * 获取map即{value: DicItem}形式的字典数据, 异步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapItem(key, isNumber) {
        return this.getDic(key, isNumber).pipe(map(list => NzxUtils.listToMap(list, 'value')));
    }
    /**
     * 获取map即{value: DicItem}形式的字典数据, 同步请求, 请求会被缓存 可以多次调用
     * @param key 字典key
     * @param isNumber 是否是数字
     */
    getDicMapItemSync(key, isNumber) {
        return NzxUtils.listToMap(this.getDicSync(key, isNumber), 'value');
    }
    /**
     * 删除指定字典key的缓存数据
     * @param key 字典key
     */
    removeDic(key) {
        this.dicMap.delete(key);
        this.dicMapData.delete(key);
    }
    /**
     * 清空所有字典缓存
     */
    clearDic() {
        this.dicMap.clear();
        this.dicMapData.clear();
    }
    /**
     * 请求字典数据
     * @param key 字典key
     * @param synced 是否同步
     * @param isNumber 是否数字
     */
    fetchDic(key, synced, isNumber) {
        if (!this.dicSettings.url) {
            throw new Error('未配置字典接口地址,请在NzxAntdService中配置"dic"属性的"url"值');
        }
        const url = typeof this.dicSettings.url === 'string' ? `${this.dicSettings.url}/${key}` : this.dicSettings.url(key);
        const dicMap = this.dicSettings.map ||
            ((data, isNumber) => {
                return (data?.children || []).map(v => ({ ...v, label: v.name, value: isNumber ? +v.code : v.code }));
            });
        return this.http
            .get(url, {
            context: new HttpContext().set(SYNCED_ENABLED, synced).set(LOADING_ENABLED, false)
        })
            .pipe(map(list => dicMap(list, isNumber)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicService, deps: [{ token: i1.HttpClient }, { token: i2.NzxAntdService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DicService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvc2VydmljZS9kaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQWMsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFjLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUtqRCxNQUFNLE9BQU8sVUFBVTtJQWlCVDtJQUNBO0lBakJaOzs7T0FHRztJQUNLLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztJQUMxRDs7O09BR0c7SUFDSyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7SUFDbEQ7OztPQUdHO0lBQ0ssV0FBVyxDQUFhO0lBQ2hDLFlBQ1ksSUFBZ0IsRUFDaEIsV0FBMkI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFFckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUM5QjtZQUNFLEdBQUcsRUFBRSxDQUFDLElBQW9ELEVBQUUsRUFBRSxDQUM1RCxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcs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VUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPcHRpb25JdGVtIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC9jaGVja2JveCc7XHJcbmltcG9ydCB7IG1hcCwgT2JzZXJ2YWJsZSwgb2YsIHNoYXJlUmVwbGF5LCB0YXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEFueSwgRGljU2V0dGluZywgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkJztcclxuaW1wb3J0IHsgTE9BRElOR19FTkFCTEVELCBTWU5DRURfRU5BQkxFRCB9IGZyb20gJy4vZmV0Y2hlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERpY1NlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIOWtl+WFuOivt+axgue8k+WtmCwg6K+35rGC5a6M5oiQ5Lya6Ieq5Yqo5Yig6ZmkXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpY01hcCA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZhYmxlPERpY0l0ZW1bXT4+KCk7XHJcbiAgLyoqXHJcbiAgICog5a2X5YW4bWFw57yT5a2Y5pWw5o2uLCDlj6/ku6XpgJrov4dyZW1vdmVEaWPliKDpmaTnvJPlrZhcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGljTWFwRGF0YSA9IG5ldyBNYXA8c3RyaW5nLCBEaWNJdGVtW10+KCk7XHJcbiAgLyoqXHJcbiAgICog5a2X5YW46YWN572uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpY1NldHRpbmdzOiBEaWNTZXR0aW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwcm90ZWN0ZWQgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpY1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge1xyXG4gICAgICAgIG1hcDogKGRhdGE6IHsgY2hpbGRyZW46IHsgY29kZTogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfVtdIH0pID0+XHJcbiAgICAgICAgICAoZGF0YS5jaGlsZHJlbiB8fCBbXSkubWFwKHYgPT4gKHsgbGFiZWw6IHYuY29kZSwgdmFsdWU6IHYubmFtZSwgLi4udiB9KSlcclxuICAgICAgfSxcclxuICAgICAgYW50ZFNlcnZpY2UuZGljXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5a2X5YW4LCDlvILmraXor7fmsYJcclxuICAgKiBAcGFyYW0ga2V5IOWtl+WFuGtleVxyXG4gICAqIEBwYXJhbSBpc051bWJlciDmmK/lkKbmmK/mlbDlrZdcclxuICAgKi9cclxuICBnZXREaWMoa2V5OiBzdHJpbmcsIGlzTnVtYmVyPzogYm9vbGVhbik6IE9ic2VydmFibGU8RGljSXRlbVtdPiB7XHJcbiAgICBpZiAodGhpcy5kaWNNYXBEYXRhLmhhcyhrZXkpKSB7XHJcbiAgICAgIHJldHVybiBvZih0aGlzLmRpY01hcERhdGEuZ2V0KGtleSkhKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRpY01hcC5oYXMoa2V5KSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWNNYXAuZ2V0KGtleSkhO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGljJCA9IHRoaXMuZmV0Y2hEaWMoa2V5LCBmYWxzZSwgaXNOdW1iZXIpLnBpcGUoXHJcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxyXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLmRpY01hcERhdGEuc2V0KGtleSwgZGF0YSkpLFxyXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLmRpY01hcC5kZWxldGUoa2V5KSlcclxuICAgICk7XHJcbiAgICB0aGlzLmRpY01hcC5zZXQoa2V5LCBkaWMkKTtcclxuICAgIHJldHVybiBkaWMkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5a2X5YW46aG55a+55bqU55qE5ZCN56ewXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbhrZXlcclxuICAgKiBAcGFyYW0gaXRlbUtleSDlrZflhbjpobnnmoRrZXlcclxuICAgKi9cclxuICBnZXRMYWJlbChrZXk6IHN0cmluZywgaXRlbUtleT86IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgaWYgKGl0ZW1LZXkgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gb2YobnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5nZXREaWNNYXAoa2V5LCBOenhVdGlscy5pc051bWJlcihpdGVtS2V5KSkucGlwZShtYXAoZGljID0+IGRpY1tpdGVtS2V5XSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCM5q2l6I635Y+W5a2X5YW46aG55a+55bqU55qE5ZCN56ewXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbhrZXlcclxuICAgKiBAcGFyYW0gaXRlbUtleSDlrZflhbjpobnnmoRrZXlcclxuICAgKi9cclxuICBnZXRMYWJlbFN5bmMoa2V5OiBzdHJpbmcsIGl0ZW1LZXk/OiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgIGlmIChpdGVtS2V5ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG9mKG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGljTWFwU3luYyhrZXksIE56eFV0aWxzLmlzTnVtYmVyKGl0ZW1LZXkpKVtpdGVtS2V5XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlm1hcHt2YWx1ZTogbGFiZWx95b2i5byP55qE5a2X5YW45pWw5o2uLCDlvILmraXor7fmsYIsIOivt+axguS8muiiq+e8k+WtmCDlj6/ku6XlpJrmrKHosIPnlKhcclxuICAgKiBAcGFyYW0ga2V5IOWtl+WFuGtleVxyXG4gICAqIEBwYXJhbSBpc051bWJlciDmmK/lkKbmmK/mlbDlrZdcclxuICAgKi9cclxuICBnZXREaWNNYXAoa2V5OiBzdHJpbmcsIGlzTnVtYmVyPzogYm9vbGVhbik6IE9ic2VydmFibGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGljKGtleSwgaXNOdW1iZXIpLnBpcGUobWFwKGxpc3QgPT4gTnp4VXRpbHMubGlzdFRvTWFwKGxpc3QsICd2YWx1ZScsICdsYWJlbCcpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blrZflhbgsIOWQjOatpeivt+axgiAg6K+35rGC5Lya6KKr57yT5a2YXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbhrZXlcclxuICAgKiBAcGFyYW0gaXNOdW1iZXIg5piv5ZCm5piv5pWw5a2XXHJcbiAgICovXHJcbiAgZ2V0RGljU3luYyhrZXk6IHN0cmluZywgaXNOdW1iZXI/OiBib29sZWFuKTogRGljSXRlbVtdIHtcclxuICAgIGlmICh0aGlzLmRpY01hcERhdGEuaGFzKGtleSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGljTWFwRGF0YS5nZXQoa2V5KSB8fCBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRhdGEgPSBOenhVdGlscy5nZXRBamF4VmFsdWUodGhpcy5mZXRjaERpYyhrZXksIHRydWUsIGlzTnVtYmVyKSk7XHJcbiAgICB0aGlzLmRpY01hcERhdGEuc2V0KGtleSwgZGF0YSk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlm1hcOW9ouW8j+eahOWtl+WFuOaVsOaNriwg5ZCM5q2l6K+35rGCLCDor7fmsYLkvJrooqvnvJPlrZgg5Y+v5Lul5aSa5qyh6LCD55SoXHJcbiAgICogQHBhcmFtIGtleSDlrZflhbhrZXlcclxuICAgKiBAcGFyYW0gaXNOdW1iZXIg5piv5ZCm5piv5pWw5a2XXHJcbiAgICovXHJcbiAgZ2V0RGljTWFwU3luYyhrZXk6IHN0cmluZywgaXNOdW1iZXI/OiBib29sZWFuKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XHJcbiAgICByZXR1cm4gTnp4VXRpbHMubGlzdFRvTWFwKHRoaXMuZ2V0RGljU3luYyhrZXksIGlzTnVtYmVyKSwgJ3ZhbHVlJywgJ2xhYmVsJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5ZtYXDljbN7dmFsdWU6IERpY0l0ZW195b2i5byP55qE5a2X5YW45pWw5o2uLCDlvILmraXor7fmsYIsIOivt+axguS8muiiq+e8k+WtmCDlj6/ku6XlpJrmrKHosIPnlKhcclxuICAgKiBAcGFyYW0ga2V5IOWtl+WFuGtleVxyXG4gICAqIEBwYXJhbSBpc051bWJlciDmmK/lkKbmmK/mlbDlrZdcclxuICAgKi9cclxuICBnZXREaWNNYXBJdGVtKGtleTogc3RyaW5nLCBpc051bWJlcj86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFJlY29yZDxzdHJpbmcsIERpY0l0ZW0+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREaWMoa2V5LCBpc051bWJlcikucGlwZShtYXAobGlzdCA9PiBOenhVdGlscy5saXN0VG9NYXAobGlzdCwgJ3ZhbHVlJykpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPlm1hcOWNs3t2YWx1ZTogRGljSXRlbX3lvaLlvI/nmoTlrZflhbjmlbDmja4sIOWQjOatpeivt+axgiwg6K+35rGC5Lya6KKr57yT5a2YIOWPr+S7peWkmuasoeiwg+eUqFxyXG4gICAqIEBwYXJhbSBrZXkg5a2X5YW4a2V5XHJcbiAgICogQHBhcmFtIGlzTnVtYmVyIOaYr+WQpuaYr+aVsOWtl1xyXG4gICAqL1xyXG4gIGdldERpY01hcEl0ZW1TeW5jKGtleTogc3RyaW5nLCBpc051bWJlcj86IGJvb2xlYW4pOiBSZWNvcmQ8c3RyaW5nLCBEaWNJdGVtPiB7XHJcbiAgICByZXR1cm4gTnp4VXRpbHMubGlzdFRvTWFwKHRoaXMuZ2V0RGljU3luYyhrZXksIGlzTnVtYmVyKSwgJ3ZhbHVlJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliKDpmaTmjIflrprlrZflhbhrZXnnmoTnvJPlrZjmlbDmja5cclxuICAgKiBAcGFyYW0ga2V5IOWtl+WFuGtleVxyXG4gICAqL1xyXG4gIHJlbW92ZURpYyhrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5kaWNNYXAuZGVsZXRlKGtleSk7XHJcbiAgICB0aGlzLmRpY01hcERhdGEuZGVsZXRlKGtleSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmuIXnqbrmiYDmnInlrZflhbjnvJPlrZhcclxuICAgKi9cclxuICBjbGVhckRpYygpOiB2b2lkIHtcclxuICAgIHRoaXMuZGljTWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLmRpY01hcERhdGEuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOivt+axguWtl+WFuOaVsOaNrlxyXG4gICAqIEBwYXJhbSBrZXkg5a2X5YW4a2V5XHJcbiAgICogQHBhcmFtIHN5bmNlZCDmmK/lkKblkIzmraVcclxuICAgKiBAcGFyYW0gaXNOdW1iZXIg5piv5ZCm5pWw5a2XXHJcbiAgICovXHJcbiAgZmV0Y2hEaWMoa2V5OiBzdHJpbmcsIHN5bmNlZDogYm9vbGVhbiwgaXNOdW1iZXI/OiBib29sZWFuKSB7XHJcbiAgICBpZiAoIXRoaXMuZGljU2V0dGluZ3MudXJsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcign5pyq6YWN572u5a2X5YW45o6l5Y+j5Zyw5Z2ALOivt+WcqE56eEFudGRTZXJ2aWNl5Lit6YWN572uXCJkaWNcIuWxnuaAp+eahFwidXJsXCLlgLwnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHVybCA9IHR5cGVvZiB0aGlzLmRpY1NldHRpbmdzLnVybCA9PT0gJ3N0cmluZycgPyBgJHt0aGlzLmRpY1NldHRpbmdzLnVybH0vJHtrZXl9YCA6IHRoaXMuZGljU2V0dGluZ3MudXJsKGtleSk7XHJcbiAgICBjb25zdCBkaWNNYXAgPVxyXG4gICAgICB0aGlzLmRpY1NldHRpbmdzLm1hcCB8fFxyXG4gICAgICAoKGRhdGE/OiB7IGNoaWxkcmVuPzogeyBjb2RlOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9W10gfSwgaXNOdW1iZXI/OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChkYXRhPy5jaGlsZHJlbiB8fCBbXSkubWFwKFxyXG4gICAgICAgICAgdiA9PiAoeyAuLi52LCBsYWJlbDogdi5uYW1lLCB2YWx1ZTogaXNOdW1iZXIgPyArdi5jb2RlIDogdi5jb2RlIH0pIGFzIERpY0l0ZW1cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldDxSZWNvcmQ8c3RyaW5nLCBBbnk+Pih1cmwsIHtcclxuICAgICAgICBjb250ZXh0OiBuZXcgSHR0cENvbnRleHQoKS5zZXQoU1lOQ0VEX0VOQUJMRUQsIHN5bmNlZCkuc2V0KExPQURJTkdfRU5BQkxFRCwgZmFsc2UpXHJcbiAgICAgIH0pXHJcbiAgICAgIC5waXBlKG1hcChsaXN0ID0+IGRpY01hcChsaXN0LCBpc051bWJlcikpKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlrZflhbjpobnlrprkuYksIHtsYWJlbDogc3RyaW5nOyB2YWx1ZTogYW55fVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRGljSXRlbSA9IFBpY2s8T3B0aW9uSXRlbSwgJ2xhYmVsJyB8ICd2YWx1ZSc+ICYgeyBbcHJvcDogc3RyaW5nXTogQW55IH07XHJcbiJdfQ==