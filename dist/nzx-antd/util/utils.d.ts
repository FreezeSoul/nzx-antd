import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { get as _get, set as _set, is as _is, isPlainObject as _isPlainObject } from './utils-fn';
declare class UtilsClass {
    /**
     * 根据属性路径获取对象的属性值
     * @param obj 原始对象
     * @param path 属性路径
     * @param defaultValue 当属性不存在或为undefined返回defaultValue
     */
    get: typeof _get;
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
    set: typeof _set;
    is: typeof _is;
    isObject(val: NzSafeAny): boolean;
    defaultIfy<T = NzSafeAny>(obj: T, defaultValue: NzSafeAny): any;
    trim(string: string): string;
    /**
     * 获取唯一Id号
     */
    getUUID(): string;
    /**
     * 深度clone
     * @param target
     */
    clone<T = NzSafeAny>(target: T): T;
    assign: <T = any>(object: T, ...source: any[]) => T;
    /**
     * 继承
     * @param target
     * @param args
     */
    extend: <T = any>(object: T, ...source: any[]) => T;
    /**
     * 根据开始和结束数字返回一个数组
     * @param start 起始数字
     * @param end 结束数字
     * @param fill 填充内容,默认
     */
    range<T = NzSafeAny>(start: number, end: number, fill?: ((num: number, index: number) => T) | T): T[];
    /**
     * 遍历树结构
     * @param treeNodes TreeNode[]
     * @param accept 函数返回false即结束遍历, true或者undefined将继续遍历
     * @param childrenName 子节点字段名称
     */
    forEachTree<T extends TreeNode>(treeNodes: T[] | undefined | null, accept: (node: T, parentNode: T | undefined, level: number) => boolean | void, childrenName?: keyof T | TreeChildren<T>): void;
    /**
     * 过滤树, 生成新的树结构
     * @param treeNodes 树结构
     * @param predicate 过滤函数
     * @param childrenName 子节点名称,默认 'children'
     */
    filterTree<T extends TreeNode>(treeNodes: T[], predicate: (node: T) => boolean, childrenName?: keyof T): T[];
    /**
     * 列表转树结构
     * @param list 列表数据
     * @param idName id的属性名
     * @param pidName parentId属性名
     * @param childrenName children属性名
     */
    listToTree<T extends {
        pid?: string;
        id?: string;
        [key: string]: NzSafeAny;
    }>(list: T[], idName?: keyof T, pidName?: keyof T, childrenName?: string): T[];
    /**
     * 打平树结构
     * @param treeNodes 树结构
     * @param accept 函数返回false即结束遍历, true或者undefined将继续遍历
     * @param childrenName 子节点字段名称
     */
    flatTree<T extends TreeNode>(treeNodes: T[], accept?: (node: T, parentNode: T | undefined, level: number) => boolean | void, childrenName?: keyof T | TreeChildren<T>): T[];
    /**
     * 获取同步请求的响应结果
     * @param observable
     * @example
     * const myObservable = this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)});
     * const value = getAjaxValue(myObservable); // value为string类型
     */
    getAjaxValue<T = NzSafeAny>(observable: Observable<T>): T;
    /**
     * 根据不同的参数类型 获取dom元素
     * @param target
     */
    getElement(target: ElementRef | HTMLElement | string): HTMLElement | null;
    /**
     * 列表转Map结构 即 {value: label}
     * @param list 数组
     * @param keyName key值的属性名, 如果为空则使用当前值作为key
     * @param valueName value的属性名或函数处理
     */
    listToMap<T, V>(list: T[] | undefined | null, keyName?: keyof T | null | undefined, valueName?: keyof T | ((item: T) => V)): Record<string, V>;
    /**
     * 字符串模版函数
     * @param template 模版
     * @param data 数据
     * @return 返回渲染后的Html
     * @example
     * Utils.format('{s.0.name}', { s: [{name: 111}] }) => 111
     */
    format(template: string | null, data?: Record<string, NzSafeAny>): string;
    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * eg:
     * NeKit.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
     * NeKit.formatDate(new Date(), 'yyyy-MM-dd 星期E HH:mm:ss') ==> 2009-03-10 星期二 20:09:04
     * NeKit.formatDate(new Date(), 'yyyy-MM-dd 星期e hh:mm:ss') ==> 2009-03-10 星期2 08:09:04
     * NeKit.formatDate(new Date(), 'yyyy-MM-dd 第w周 hh:mm:ss') ==> 2009-03-10 第2周 08:09:04
     * NeKit.formatDate(new Date(), 'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
     */
    formatDate(srcDate: Date, fmt: string): string;
    isEmpty<T = unknown>(val: T): val is T;
    isDate(val: unknown): val is Date;
    isNumber(val: unknown): val is number;
    isPromise<T = NzSafeAny>(val: NzSafeAny): val is Promise<T>;
    isObservable(obj: NzSafeAny): obj is Observable<NzSafeAny>;
    isString(val: unknown): val is string;
    isFunction(val: unknown): val is Function;
    isBoolean(val: unknown): val is boolean;
    isRegExp(val: unknown): val is RegExp;
    isArray(val: NzSafeAny): val is Array<NzSafeAny>;
    isWindow(val: NzSafeAny): val is Window;
    isElement(val: NzSafeAny): val is Element;
    isMap(val: unknown): val is Map<NzSafeAny, NzSafeAny>;
    /**
     * 是否为手机号（中国）
     * @param value
     */
    isMobile(value: string): boolean;
    /**
     * 是否IP4地址（支持v4、v6）
     * @param ip
     */
    isIp(ip: string): boolean;
    /**
     * 是否是url
     * @param path
     */
    isUrl(path: string): boolean;
    /**
     * 是否中文
     * @param value 测试字符串
     */
    isChinese(value: string): boolean;
    /**
     * 是否为数值
     * @param value
     * @param minus 是否允许负数
     * @param fraction 最大保留小数位数
     */
    isNum(value: string, minus?: boolean, fraction?: number): boolean;
    /**
     * 是否为邮箱
     * @param value
     */
    isEmail(value: string): boolean;
    /**
     * 是否是纯对象值
     * @param obj
     */
    isPlainObject: typeof _isPlainObject;
    /**
     * 转换为日期
     * @param date 待转换的值
     */
    toDate(date?: Date | string | number): Date | null;
    /**
     * 合并对象到FormData
     * @param obj 要合并的对象
     * @param {FormData} form 表单
     */
    mergeFormData<T>(form: FormData, obj: T): void;
    /**
     * 把js对象序列化对请求数据,格式为 a=av&b=bv...&n=nv
     * @param obj
     * @returns
     */
    serialize<T>(obj: T): string;
    /**
     * 把js对象序列化对请求数据
     * @param obj
     * @returns
     */
    serializeParams<T>(obj: T): Record<string, NzSafeAny>[];
    private buildParam;
}
export declare const NzxUtils: UtilsClass;
/**
 * 树节点
 */
export interface TreeNode {
    [key: string]: NzSafeAny;
    /**
     * 子节点
     */
    children?: TreeNode[];
}
export type TreeChildren<T = NzSafeAny> = (node: T, parentNode: T | undefined, level: number) => T[] | null;
export {};
