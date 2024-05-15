import { Injectable, Optional } from '@angular/core';
import * as i0 from "@angular/core";
export class NzxStorageService {
    storage;
    /**
     * 获取长度
     */
    get length() {
        return this.storage.length;
    }
    constructor(storage) {
        this.storage = storage;
        if (!storage) {
            this.storage = localStorage;
        }
    }
    /**
     * 清除所有数据
     */
    clear() {
        this.storage.clear();
    }
    /**
     * 获取值
     * @param key key
     */
    getItem(key) {
        const value = this.storage.getItem(key);
        return value == null ? null : JSON.parse(value);
    }
    /**
     * 获取key
     * @param index 索引
     */
    key(index) {
        return this.storage.key(index);
    }
    /**
     * 移除值
     * @param key key
     */
    removeItem(key) {
        this.storage.removeItem(key);
    }
    /**
     * 设置值
     * @param key
     * @param value
     */
    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxStorageService, deps: [{ token: Storage, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxStorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: Storage, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NlcnZpY2Uvc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU1yRCxNQUFNLE9BQU8saUJBQWlCO0lBUUc7SUFQL0I7O09BRUc7SUFDSCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxZQUErQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQzdDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPLENBQWdCLEdBQVc7UUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFPLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUcsQ0FBQyxLQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLEdBQVc7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxPQUFPLENBQWdCLEdBQVcsRUFBRSxLQUFRO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQzt3R0FyRFUsaUJBQWlCOzRHQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7NEZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBU2MsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhTdG9yYWdlU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICog6I635Y+W6ZW/5bqmXHJcbiAgICovXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHVibGljIHN0b3JhZ2U6IFN0b3JhZ2UpIHtcclxuICAgIGlmICghc3RvcmFnZSkge1xyXG4gICAgICB0aGlzLnN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmuIXpmaTmiYDmnInmlbDmja5cclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5YC8XHJcbiAgICogQHBhcmFtIGtleSBrZXlcclxuICAgKi9cclxuICBnZXRJdGVtPFQgPSBOelNhZmVBbnk+KGtleTogc3RyaW5nKTogVCB8IG51bGwge1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBudWxsIDogKEpTT04ucGFyc2UodmFsdWUpIGFzIFQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+Wa2V5XHJcbiAgICogQHBhcmFtIGluZGV4IOe0ouW8lVxyXG4gICAqL1xyXG4gIGtleShpbmRleDogbnVtYmVyKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmtleShpbmRleCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnp7vpmaTlgLxcclxuICAgKiBAcGFyYW0ga2V5IGtleVxyXG4gICAqL1xyXG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7lgLxcclxuICAgKiBAcGFyYW0ga2V5XHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgc2V0SXRlbTxUID0gTnpTYWZlQW55PihrZXk6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICB9XHJcbn1cclxuIl19