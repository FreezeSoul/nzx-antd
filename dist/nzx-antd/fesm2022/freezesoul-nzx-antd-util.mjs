import { isNil } from 'ng-zorro-antd/core/util';
import { Observable } from 'rxjs';
import { UntypedFormGroup, UntypedFormControl, UntypedFormArray } from '@angular/forms';

const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const reEscapeChar = /\\(\\)?/g;
const INFINITY = 1 / 0;
const reIsUint = /^(?:0|[1-9]\d*)$/;
const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const toStr = objectProto.toString;
const funcToString = Function.prototype.toString;
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reIsHostCtor = /^\[object .+?Constructor\]$/;
const reIsNative = RegExp('^' +
    funcToString
        .call(hasOwnProperty)
        .replace(reRegExpChar, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
    '$');
/**
 * 根据属性路径获取对象的属性值
 * @param obj 原始对象
 * @param path 属性路径
 * @param defaultValue 当属性不存在或为undefined返回defaultValue
 */
function get(obj, path, defaultValue) {
    const segments = stringToPath(path);
    let index = 0;
    const length = segments.length;
    while (obj != null && index < length) {
        obj = obj[toKey(segments[index++])];
    }
    return index && index === length ? (obj === undefined ? defaultValue : obj) : defaultValue;
}
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
function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
}
function is(val, type) {
    return toStr.call(val) === `[object ${type}]`;
}
function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}
function assignValue(object, key, value) {
    const objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
    }
}
function toKey(value) {
    if (typeof value === 'string') {
        return value;
    }
    const result = value + '';
    return result === '0' && 1 / value === -INFINITY ? '-0' : result;
}
function stringToPath(string) {
    const result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
    }
    string.replace(rePropName, (match, number, quote, subString) => {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
        return '';
    });
    return result;
}
function baseSet(object, _path, value, customizer = obj => obj) {
    if (!isObject(object)) {
        return object;
    }
    const path = stringToPath(_path);
    let index = -1;
    const length = path.length;
    const lastIndex = length - 1;
    let nested = object;
    while (nested != null && ++index < length) {
        const key = toKey(path[index]);
        let newValue = value;
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return object;
        }
        if (index !== lastIndex) {
            const objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined;
            if (newValue === undefined) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
    }
    return object;
}
function isIndex(value, length) {
    const type = typeof value;
    length = length == null ? Number.MAX_SAFE_INTEGER : length;
    return (!!length &&
        (type === 'number' || (type !== 'symbol' && reIsUint.test(value))) &&
        value > -1 &&
        value % 1 === 0 &&
        value < length);
}
function eq(value, other) {
    return value === other || (value !== value && other !== other);
}
const defineProperty = (() => {
    try {
        const func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
    }
    catch (e) { }
})();
function getValue(object, key) {
    return object == null ? undefined : object[key];
}
function getNative(object, key) {
    const value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}
function baseIsNative(value) {
    if (!isObject(value)) {
        return false;
    }
    const pattern = is(value, 'Function') ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}
function baseAssignValue(object, key, value) {
    if (key === '__proto__' && defineProperty) {
        defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
        });
    }
    else {
        object[key] = value;
    }
}
function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        }
        catch (e) { }
        try {
            return func + '';
        }
        catch (e) { }
    }
    return '';
}
const merge = createAssigner((object, source, srcIndex, customizer) => {
    baseMerge(object, source, srcIndex, customizer);
});
/**
 * Creates a function like `assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
    return (object, ...sources) => {
        let index = -1;
        let length = sources.length;
        let customizer = length > 1 ? sources[length - 1] : undefined;
        const guard = length > 2 ? sources[2] : undefined;
        customizer = assigner.length > 3 && typeof customizer === 'function' ? (length--, customizer) : undefined;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
        }
        object = Object(object);
        while (++index < length) {
            const source = sources[index];
            if (source) {
                assigner(object, source, index, customizer);
            }
        }
        return object;
    };
}
function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    const type = typeof index;
    if (type === 'number' ? isArrayLike(object) && isIndex(index, object.length) : type === 'string' && index in object) {
        return eq(object[index], value);
    }
    return false;
}
/**
 * The base implementation of `merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
        return;
    }
    for (const key in source) {
        // @ts-ignore
        const srcValue = source[key];
        if (isObject(srcValue)) {
            stack || (stack = new Map());
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
            // @ts-ignore
            let newValue = customizer ? customizer(object[key], srcValue, `${key}`, object, source, stack) : undefined;
            if (newValue === undefined) {
                newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
        }
    }
}
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    // @ts-ignore
    const objValue = object[key];
    // @ts-ignore
    const srcValue = source[key];
    if (stack.has(srcValue)) {
        assignMergeValue(object, key, stack.get(srcValue));
        return;
    }
    let newValue = customizer ? customizer(objValue, srcValue, `${key}`, object, source, stack) : undefined;
    let isCommon = newValue === undefined;
    if (isCommon) {
        newValue = srcValue;
        if (Array.isArray(srcValue)) {
            if (Array.isArray(objValue)) {
                newValue = objValue;
            }
            else {
                newValue = [];
            }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
            }
            else if (typeof objValue === 'function' || !isObject(objValue)) {
                newValue = initCloneObject(srcValue);
            }
        }
        else {
            isCommon = false;
        }
    }
    if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
}
function isArguments(value) {
    return value != null && is(value, 'Arguments');
}
function toPlainObject(value) {
    value = Object(value);
    const result = {};
    for (const key in value) {
        // @ts-ignore
        result[key] = value[key];
    }
    return result;
}
function initCloneObject(object) {
    return typeof object.constructor === 'function' && !isPrototype(object)
        ? Object.create(Object.getPrototypeOf(object))
        : {};
}
function isPrototype(value) {
    const Ctor = value && value.constructor;
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
    return value === proto;
}
/**
 * 是否是纯对象值
 * @param obj
 */
function isPlainObject(obj) {
    if (!obj || !is(obj, 'Object')) {
        return false;
    }
    const hasOwnConstructor = hasOwnProperty.call(obj, 'constructor');
    const hasIsPrototypeOf = 
    // @ts-ignore
    obj.constructor && obj.constructor.prototype && hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf');
    // @ts-ignore
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
    }
    let key;
    for (key in obj) {
        /**/
    }
    return typeof key === 'undefined' || hasOwnProperty.call(obj, key);
}
function assignMergeValue(object, key, value) {
    // @ts-ignore
    if ((value !== undefined && !eq(object[key], value)) || (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
    }
}
const isArrayLike = (x) => x && typeof x.length === 'number' && typeof x !== 'function';

class UtilsClass {
    /**
     * 根据属性路径获取对象的属性值
     * @param obj 原始对象
     * @param path 属性路径
     * @param defaultValue 当属性不存在或为undefined返回defaultValue
     */
    get = get;
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
    set = set;
    is = is;
    isObject(val) {
        return val != null && is(val, 'Object');
    }
    defaultIfy(obj, defaultValue) {
        return isNil(obj) ? defaultValue : obj;
    }
    trim(string) {
        return (string || '').toString().replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    }
    /**
     * 获取唯一Id号
     */
    getUUID() {
        return Date.now() + Math.random().toString().replace('0.', '');
    }
    /**
     * 深度clone
     * @param target
     */
    clone(target) {
        const _target = this.isArray(target) ? [] : {};
        return this.extend(_target, target);
    }
    assign = merge;
    /**
     * 继承
     * @param target
     * @param args
     */
    extend = merge;
    /**
     * 根据开始和结束数字返回一个数组
     * @param start 起始数字
     * @param end 结束数字
     * @param fill 填充内容,默认
     */
    range(start, end, fill) {
        const list = [];
        const fn = fill == null ? (i) => i : this.isFunction(fill) ? fill : () => fill;
        let index = 0;
        for (let i = start; i < end; i++) {
            list.push(fn(i, index++));
        }
        return list;
    }
    /**
     * 遍历树结构
     * @param treeNodes TreeNode[]
     * @param accept 函数返回false即结束遍历, true或者undefined将继续遍历
     * @param childrenName 子节点字段名称
     */
    forEachTree(treeNodes, accept, childrenName = 'children') {
        if (!treeNodes || !treeNodes.length) {
            return;
        }
        const getChildren = typeof childrenName === 'string' ? (node) => node[childrenName] : childrenName;
        let stack = [...treeNodes];
        const parents = [{ count: treeNodes.length, level: 0 }];
        let counter = 0;
        while (stack.length) {
            const item = stack.shift();
            const parent = parents[0];
            if (++counter === parent.count) {
                parents.shift();
                counter = 0;
            }
            if (accept(item, parent.parent, parent.level) === false) {
                return;
            }
            const children = getChildren(item, parent.parent, parent.level);
            if (children && children.length) {
                stack = stack.concat(children);
                parents.push({ count: children.length, parent: item, level: parent.level + 1 });
            }
        }
    }
    /**
     * 过滤树, 生成新的树结构
     * @param treeNodes 树结构
     * @param predicate 过滤函数
     * @param childrenName 子节点名称,默认 'children'
     */
    filterTree(treeNodes, predicate, childrenName = 'children') {
        const filter = (list, children) => {
            for (const node of list) {
                const newNode = { ...node, [childrenName]: [] };
                if (node[childrenName]?.length) {
                    filter(node[childrenName], newNode[childrenName]);
                }
                if (predicate(newNode)) {
                    children.push(newNode);
                }
            }
        };
        const result = [];
        filter(treeNodes, result);
        return result;
    }
    /**
     * 列表转树结构
     * @param list 列表数据
     * @param idName id的属性名
     * @param pidName parentId属性名
     * @param childrenName children属性名
     */
    listToTree(list, idName = 'id', pidName = 'pid', childrenName = 'children') {
        if (!list || !list.length) {
            return [];
        }
        const nodeMap = {};
        for (const node of list) {
            nodeMap[node[idName]] = node;
            // @ts-ignore
            node[childrenName] = [];
        }
        const treeNodes = [];
        for (const node of list) {
            const pid = node[pidName];
            const parent = nodeMap[node[pidName]];
            if (pid && parent) {
                parent[childrenName].push(node);
            }
            else {
                treeNodes.push(node);
            }
        }
        return treeNodes;
    }
    /**
     * 打平树结构
     * @param treeNodes 树结构
     * @param accept 函数返回false即结束遍历, true或者undefined将继续遍历
     * @param childrenName 子节点字段名称
     */
    flatTree(treeNodes, accept = () => true, childrenName = 'children') {
        const list = [];
        this.forEachTree(treeNodes, (node, parentNode, level) => {
            if (accept(node, parentNode, level) === false) {
                return;
            }
            list.push(node);
        }, childrenName);
        return list;
    }
    /**
     * 获取同步请求的响应结果
     * @param observable
     * @example
     * const myObservable = this.http.get<string>('url', { context: new HttpContext().set(SYNCED_ENABLED, true)});
     * const value = getAjaxValue(myObservable); // value为string类型
     */
    getAjaxValue(observable) {
        let value;
        observable.subscribe(result => (value = result)).unsubscribe();
        return value;
    }
    /**
     * 根据不同的参数类型 获取dom元素
     * @param target
     */
    getElement(target) {
        if (!target) {
            return null;
        }
        if (target instanceof HTMLElement) {
            return target;
        }
        const eleRef = target;
        if (eleRef.nativeElement) {
            return eleRef.nativeElement;
        }
        if (typeof target === 'string') {
            return document.querySelector(target);
        }
        return null;
    }
    /**
     * 列表转Map结构 即 {value: label}
     * @param list 数组
     * @param keyName key值的属性名, 如果为空则使用当前值作为key
     * @param valueName value的属性名或函数处理
     */
    listToMap(list, keyName, valueName) {
        const record = {};
        if (!list || !list.length) {
            return record;
        }
        let fn = (item) => item;
        if (valueName) {
            fn = NzxUtils.isFunction(valueName) ? valueName : (item) => item[valueName];
        }
        for (const v of list) {
            record[(keyName ? v[keyName] : v)] = fn(v);
        }
        return record;
    }
    /**
     * 字符串模版函数
     * @param template 模版
     * @param data 数据
     * @return 返回渲染后的Html
     * @example
     * Utils.format('{s.0.name}', { s: [{name: 111}] }) => 111
     */
    format(template, data) {
        if (template == null || !data) {
            return template || '';
        }
        return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
            const path = key.split('.');
            let v = data[path.shift()];
            for (let i = 0, size = path.length; i < size && v !== null; i++) {
                v = v[path[i]];
            }
            return v == null ? '' : v.toString();
        });
    }
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
    formatDate(srcDate, fmt) {
        if (!srcDate) {
            return '';
        }
        const week = {
            0: '\u65e5',
            1: '\u4e00',
            2: '\u4e8c',
            3: '\u4e09',
            4: '\u56db',
            5: '\u4e94',
            6: '\u516d'
        };
        const o = {
            'M+': srcDate.getMonth() + 1,
            'd+': srcDate.getDate(),
            'h+': srcDate.getHours() % 12 === 0 ? 12 : srcDate.getHours() % 12,
            'H+': srcDate.getHours(),
            'm+': srcDate.getMinutes(),
            's+': srcDate.getSeconds(),
            'q+': Math.floor((srcDate.getMonth() + 3) / 3),
            'S+': srcDate.getMilliseconds(),
            'e+': srcDate.getDay(),
            // @ts-ignore
            E: week[srcDate.getDay()],
            'w+': (date => {
                const date2 = new Date(date.getFullYear(), 0, 1);
                const day = (date2.getDay() ? date2.getDay() : 7) - (date.getDay() ? date.getDay() : 7);
                return Math.ceil(Math.round((date.getTime() - date2.getTime() + day * (24 * 3600000)) / 86400000) / 7) + 1;
            })(srcDate)
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (srcDate.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                // @ts-ignore
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    }
    isEmpty(val) {
        // @ts-ignore
        return val == null || val.length === 0;
    }
    isDate(val) {
        return this.is(val, 'Date');
    }
    isNumber(val) {
        return this.is(val, 'Number');
    }
    isPromise(val) {
        return this.is(val, 'Promise') || (this.isObject(val) && this.isFunction(val.then) && this.isFunction(val.catch));
    }
    isObservable(obj) {
        return obj instanceof Observable || (obj && typeof obj.subscribe === 'function');
    }
    isString(val) {
        return this.is(val, 'String');
    }
    isFunction(val) {
        return typeof val === 'function';
    }
    isBoolean(val) {
        return this.is(val, 'Boolean');
    }
    isRegExp(val) {
        return this.is(val, 'RegExp');
    }
    isArray(val) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(val);
        }
        return this.is(val, 'Array');
    }
    isWindow(val) {
        return typeof window !== 'undefined' && this.is(val, 'Window');
    }
    isElement(val) {
        return this.isObject(val) && !!val.tagName;
    }
    isMap(val) {
        return this.is(val, 'Map');
    }
    /**
     * 是否为手机号（中国）
     * @param value
     */
    isMobile(value) {
        return /^(0|\\+?86|17951)?1[0-9]{10}$/.test(value);
    }
    /**
     * 是否IP4地址（支持v4、v6）
     * @param ip
     */
    isIp(ip) {
        return /^(?:^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$)|(?:^(?:(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)$/.test(ip);
    }
    /**
     * 是否是url
     * @param path
     */
    isUrl(path) {
        return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(path);
    }
    /**
     * 是否中文
     * @param value 测试字符串
     */
    isChinese(value) {
        return /^[\u4e00-\u9fa5]+$/.test(value);
    }
    /**
     * 是否为数值
     * @param value
     * @param minus 是否允许负数
     * @param fraction 最大保留小数位数
     */
    isNum(value, minus, fraction) {
        const regex = (minus ? '^-?' : '^') +
            `(([1-9]{1}\\d*)|(0{1}))` +
            (fraction && fraction > 0 ? `(\\.\\d{1,${fraction}})?$` : '$');
        return new RegExp(regex).test(value);
    }
    /**
     * 是否为邮箱
     * @param value
     */
    isEmail(value) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
    }
    /**
     * 是否是纯对象值
     * @param obj
     */
    isPlainObject = isPlainObject;
    /**
     * 转换为日期
     * @param date 待转换的值
     */
    toDate(date) {
        if (date == null) {
            return null;
        }
        if (this.isDate(date)) {
            return date;
        }
        if (this.isNumber(date)) {
            return new Date(date);
        }
        if (this.isString(date)) {
            const value = Date.parse(date);
            if (isNaN(value)) {
                const match = date.match(/\d+/g);
                if (match) {
                    // @ts-ignore
                    return new Date(...match);
                }
            }
        }
        return null;
    }
    /**
     * 合并对象到FormData
     * @param obj 要合并的对象
     * @param {FormData} form 表单
     */
    mergeFormData(form, obj) {
        const list = this.serializeParams(obj);
        for (const it of list) {
            form.append(it.key, it.value);
        }
    }
    /**
     * 把js对象序列化对请求数据,格式为 a=av&b=bv...&n=nv
     * @param obj
     * @returns
     */
    serialize(obj) {
        const list = this.serializeParams(obj);
        let query = '';
        for (const it of list) {
            query += encodeURIComponent(it.key) + '=' + encodeURIComponent(it.value) + '&';
        }
        return query === '' ? query : query.substr(0, query.length - 1);
    }
    /**
     * 把js对象序列化对请求数据
     * @param obj
     * @returns
     */
    serializeParams(obj) {
        if (!obj) {
            return [];
        }
        const query = [];
        this.buildParam(obj, query);
        return query;
    }
    buildParam(inObj, list) {
        let value;
        let subName;
        let innerObj;
        for (const name in inObj) {
            value = inObj[name];
            if (value instanceof Array) {
                for (let i = 0; i < value.length; ++i) {
                    if (value[i] instanceof Array || value[i] instanceof Object) {
                        if (value[i].toJSON) {
                            list.push({ key: name, value: value[i].toJSON() });
                            continue;
                        }
                        innerObj = {};
                        innerObj[name + '[' + i + ']'] = value[i];
                        this.buildParam(innerObj, list);
                    }
                    else if (value[i] !== undefined && value[i] !== null) {
                        list.push({ key: name, value: value[i] });
                    }
                }
                continue;
            }
            if (value instanceof Object) {
                if (value.toJSON) {
                    list.push({ key: name, value: value.toJSON() });
                    continue;
                }
                for (subName of Object.keys(value)) {
                    innerObj = {};
                    innerObj[name + '.' + subName] = value[subName];
                    this.buildParam(innerObj, list);
                }
                continue;
            }
            if (value !== undefined && value !== null) {
                list.push({ key: name, value });
            }
        }
    }
}
const NzxUtils = new UtilsClass();

/**
 * 表单工具
 */
class FormUtilsClass {
    /**
     * 遍历表单控件
     * @param form 表单或者表单元素
     * @param callback 回调函数
     */
    forEachFormControl(form, callback) {
        if (form instanceof UntypedFormGroup) {
            callback(form);
            for (const i in form.controls) {
                const ctrl = form.controls[i];
                if (ctrl instanceof UntypedFormControl) {
                    callback(ctrl);
                }
                else {
                    this.forEachFormControl(ctrl, callback);
                }
            }
            return;
        }
        if (form instanceof UntypedFormArray) {
            callback(form);
            for (let i = 0; i < form.length; i++) {
                const ctrl = form.at(i);
                if (ctrl instanceof UntypedFormControl) {
                    callback(ctrl);
                }
                else {
                    this.forEachFormControl(ctrl, callback);
                }
            }
            return;
        }
        if (form instanceof UntypedFormControl) {
            callback(form);
            return;
        }
    }
    /**
     * 执行验证
     * @param form 表单
     * @param opts 配置
     */
    validate(form, opts = { updateValueAndValidity: false }) {
        this.forEachFormControl(form, ctrl => {
            ctrl.markAsDirty(opts);
            opts.updateValueAndValidity && ctrl.updateValueAndValidity(opts);
        });
        return form.valid;
    }
    /**
     * 清空错误信息
     */
    clearError(form) {
        this.forEachFormControl(form, ctrl => ctrl.setErrors(null));
    }
    /**
     * 获取错误信息
     * @param control
     */
    getMessage(control) {
        if (!control.errors) {
            return null;
        }
        for (const key in control.errors) {
            return control.errors[key]?.message || '输入不正确';
        }
        return null;
    }
    /**
     * 必填验证
     * @param message 错误信息
     * @param hasValue 是否有值函数判断
     */
    required(message = '不能为空', hasValue = value => !!value) {
        return (control) => {
            return hasValue(control.value) ? null : { required: { message, value: control.value } };
        };
    }
    /**
     * 根据指定函数验证
     * @param operator 操作函数
     * @param errMessage 错误信息
     */
    singleValidator(operator, errMessage) {
        return (control) => {
            if (control.value == null || control.value.length === 0) {
                return null;
            }
            return operator(control.value) ? null : errMessage;
        };
    }
    /**
     * 根据正则表达式验证
     * @param exp 正则表达式
     * @param message 错误信息
     */
    pattern(exp, message) {
        const reg = NzxUtils.isString(exp) ? new RegExp(exp, 'mig') : exp;
        return this.singleValidator(v => reg.test(v), { pattern: { message } });
    }
    /**
     * 小于验证
     * @param num 数字
     * @param message 错误信息
     */
    lt(num, message) {
        return this.singleValidator(v => Number(v) < num, { lt: { message } });
    }
    /**
     * 小于等于验证
     * @param num 数字
     * @param message 错误信息
     */
    lte(num, message) {
        return this.singleValidator(v => Number(v) <= num, { lte: { message } });
    }
    /**
     * 大于验证
     * @param num 数字
     * @param message 错误信息
     */
    gt(num, message) {
        return this.singleValidator(v => Number(v) > num, { gt: { message } });
    }
    /**
     * 大于等于验证
     * @param num 数字
     * @param message 错误信息
     */
    gte(num, message) {
        return this.singleValidator(v => Number(v) >= num, { gte: { message } });
    }
    /**
     * 包含指定字符串验证
     * @param str 字符串
     * @param ignore 忽略大小写
     * @param message 错误信息
     */
    contains(str, ignore, message) {
        const newStr = ignore ? str.toLowerCase() : str;
        return this.singleValidator(v => (ignore ? v.toLowerCase() : v).indexOf(newStr) !== -1, {
            contains: { message }
        });
    }
    /**
     * min <= x <= max 验证
     * @param min 最小值
     * @param max 最大值
     * @param message 错误信息
     */
    between(min, max, message) {
        return this.singleValidator(value => {
            const v = Number(value);
            return v >= min && v <= max;
        }, { between: { message } });
    }
    /**
     * 数字校验
     * @param minus 是否允许负数
     * @param fraction 保留小数有效数字位数
     * @param message 错误提示信息
     */
    number(minus, fraction, message = '数字格式错误') {
        return this.singleValidator(value => NzxUtils.isNum(value, minus, fraction), { number: { message } });
    }
    /**
     * 校验手机号（中国）
     * @param message 错误提示信息
     */
    mobile(message = '手机号格式错误') {
        return this.singleValidator(value => NzxUtils.isMobile(value), { mobile: { message } });
    }
    /**
     * 校验邮箱
     * @param message 错误提示信息
     */
    email(message = '邮箱格式错误') {
        return this.singleValidator(value => NzxUtils.isEmail(value), { email: { message } });
    }
    /**
     * 校验ip
     * @param message 错误提示信息
     */
    ip(message = 'IP格式错误') {
        return this.singleValidator(value => NzxUtils.isIp(value), { ip: { message } });
    }
    /**
     * 校验url,支持ip v4, ip v6
     * @param message 错误提示信息
     */
    url(message = 'URL格式错误') {
        return this.singleValidator(value => NzxUtils.isUrl(value), { url: { message } });
    }
    /**
     * 校验中文
     * @param message 错误提示信息
     */
    chinese(message = '只允许输入中文字符') {
        return this.singleValidator(value => NzxUtils.isChinese(value), { chinese: { message } });
    }
    /**
     * 验证两个字段
     * @param form 表单
     * @param otherField 另一个被验证的字段名称
     * @param compare 比较器
     * @param errMessage  错误提示
     */
    twoControl(form, otherField, compare, errMessage) {
        const fn = NzxUtils.isFunction(form) ? form : () => form;
        return (control) => {
            if (!control?.value) {
                return null;
            }
            const other = fn().get(otherField);
            if (!other?.value) {
                return null;
            }
            if (compare(other?.value, control?.value)) {
                if (!other.valid) {
                    other.updateValueAndValidity();
                }
                return null;
            }
            return errMessage;
        };
    }
    /**
     * 两个字段相等验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    equalControl(form, otherField, message) {
        const errMessage = { equalValidator: { message } };
        return this.twoControl(form, otherField, (v1, v2) => v1 === v2, errMessage);
    }
    /**
     * 大于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    gtControl(form, otherField, message) {
        const errMessage = { gtValidator: { message } };
        return this.twoControl(form, otherField, (v1, v2) => Number(v1) > Number(v2), errMessage);
    }
    /**
     * 大于等于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    gteControl(form, otherField, message) {
        const errMessage = { gteValidator: { message } };
        return this.twoControl(form, otherField, (v1, v2) => Number(v1) >= Number(v2), errMessage);
    }
    /**
     * 小于于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    ltControl(form, otherField, message) {
        const errMessage = { ltValidator: { message } };
        return this.twoControl(form, otherField, (v1, v2) => Number(v1) < Number(v2), errMessage);
    }
    /**
     * 小于等于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    lteControl(form, otherField, message) {
        const errMessage = { lteValidator: { message } };
        return this.twoControl(form, otherField, (v1, v2) => Number(v1) <= Number(v2), errMessage);
    }
    /**
     * 唯一验证
     * @param form
     * @param message
     */
    unique(form, message = '不允许重复') {
        return (control) => {
            if (!control.value) {
                return null;
            }
            for (const c in form.controls) {
                const ctl = form.get(c);
                if (control === ctl) {
                    continue;
                }
                if (control.value === ctl?.value) {
                    return { uniqueValidator: { message } };
                }
            }
            return null;
        };
    }
}
const NzxFormUtils = new FormUtilsClass();

class BaseControl {
    nzxDisabled;
    onChange = () => null;
    onTouched = () => null;
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.nzxDisabled = isDisabled;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { BaseControl, FormUtilsClass, NzxFormUtils, NzxUtils, assignValue, get, is, isArguments, isArrayLike, isPlainObject, merge, set };
//# sourceMappingURL=freezesoul-nzx-antd-util.mjs.map
