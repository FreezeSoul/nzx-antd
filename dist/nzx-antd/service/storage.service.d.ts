import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzxStorageService {
    storage: Storage;
    /**
     * 获取长度
     */
    get length(): number;
    constructor(storage: Storage);
    /**
     * 清除所有数据
     */
    clear(): void;
    /**
     * 获取值
     * @param key key
     */
    getItem<T = NzSafeAny>(key: string): T | null;
    /**
     * 获取key
     * @param index 索引
     */
    key(index: number): string | null;
    /**
     * 移除值
     * @param key key
     */
    removeItem(key: string): void;
    /**
     * 设置值
     * @param key
     * @param value
     */
    setItem<T = NzSafeAny>(key: string, value: T): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxStorageService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzxStorageService>;
}
