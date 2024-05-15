import { NzSafeAny } from 'ng-zorro-antd/core/types';
/**
 * 根据属性路径获取对象的属性值
 * @param obj 原始对象
 * @param path 属性路径
 * @param defaultValue 当属性不存在或为undefined返回defaultValue
 */
export declare function get(obj: NzSafeAny, path: string, defaultValue?: NzSafeAny): any;
/**
 *
 * 根据属性路径设置值
 * @param object 待修改对象
 * @param path 属性路径
 * @param value 设置的值
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * NzxUtils.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * NzxUtils.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
export declare function set(object: NzSafeAny, path: string, value: NzSafeAny): any;
export declare function is(val: NzSafeAny, type: string): boolean;
export declare function assignValue(object: NzSafeAny, key: string, value: NzSafeAny): void;
export declare const merge: <T = any>(object: T, ...source: NzSafeAny[]) => T;
export declare function isArguments(value: NzSafeAny): boolean;
/**
 * 是否是纯对象值
 * @param obj
 */
export declare function isPlainObject<T = NzSafeAny>(obj: T): boolean;
export declare const isArrayLike: <T>(x: any) => x is ArrayLike<T>;
