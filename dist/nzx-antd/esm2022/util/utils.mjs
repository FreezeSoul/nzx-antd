import { isNil } from 'ng-zorro-antd/core/util';
import { Observable } from 'rxjs';
import { get as _get, set as _set, is as _is, isPlainObject as _isPlainObject, merge } from './utils-fn';
class UtilsClass {
    /**
     * 根据属性路径获取对象的属性值
     * @param obj 原始对象
     * @param path 属性路径
     * @param defaultValue 当属性不存在或为undefined返回defaultValue
     */
    get = _get;
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
    set = _set;
    is = _is;
    isObject(val) {
        return val != null && _is(val, 'Object');
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
    isPlainObject = _isPlainObject;
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
export const NzxUtils = new UtilsClass();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxHQUFHLEVBQUUsYUFBYSxJQUFJLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFekcsTUFBTSxVQUFVO0lBQ2Q7Ozs7O09BS0c7SUFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQztJQUVYLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFVCxRQUFRLENBQUMsR0FBYztRQUNyQixPQUFPLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsVUFBVSxDQUFnQixHQUFNLEVBQUUsWUFBdUI7UUFDdkQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJLENBQUMsTUFBYztRQUNqQixPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJ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d0JBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjtnQkFDRCxTQUFTO2FBQ1Y7WUFDRCxJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7Z0JBQzNCLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ2hELFNBQVM7aUJBQ1Y7Z0JBRUQsS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbEMsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDZCxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxTQUFTO2FBQ1Y7WUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNqQztTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IGdldCBhcyBfZ2V0LCBzZXQgYXMgX3NldCwgaXMgYXMgX2lzLCBpc1BsYWluT2JqZWN0IGFzIF9pc1BsYWluT2JqZWN0LCBtZXJnZSB9IGZyb20gJy4vdXRpbHMtZm4nO1xyXG5cclxuY2xhc3MgVXRpbHNDbGFzcyB7XHJcbiAgLyoqXHJcbiAgICog5qC55o2u5bGe5oCn6Lev5b6E6I635Y+W5a+56LGh55qE5bGe5oCn5YC8XHJcbiAgICogQHBhcmFtIG9iaiDljp/lp4vlr7nosaFcclxuICAgKiBAcGFyYW0gcGF0aCDlsZ7mgKfot6/lvoRcclxuICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIOW9k+WxnuaAp+S4jeWtmOWcqOaIluS4unVuZGVmaW5lZOi/lOWbnmRlZmF1bHRWYWx1ZVxyXG4gICAqL1xyXG4gIGdldCA9IF9nZXQ7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiDmoLnmja7lsZ7mgKfot6/lvoTorr7nva7lgLxcclxuICAgKiBAcGFyYW0gb2JqZWN0IOW+heS/ruaUueWvueixoVxyXG4gICAqIEBwYXJhbSBwYXRoIOWxnuaAp+i3r+W+hFxyXG4gICAqIEBwYXJhbSB2YWx1ZSDorr7nva7nmoTlgLxcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqXHJcbiAgICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcclxuICAgKlxyXG4gICAqIE56eFV0aWxzLnNldChvYmplY3QsICdhWzBdLmIuYycsIDQpO1xyXG4gICAqIGNvbnNvbGUubG9nKG9iamVjdC5hWzBdLmIuYyk7XHJcbiAgICogLy8gPT4gNFxyXG4gICAqXHJcbiAgICogTnp4VXRpbHMuc2V0KG9iamVjdCwgWyd4JywgJzAnLCAneScsICd6J10sIDUpO1xyXG4gICAqIGNvbnNvbGUubG9nKG9iamVjdC54WzBdLnkueik7XHJcbiAgICogLy8gPT4gNVxyXG4gICAqL1xyXG4gIHNldCA9IF9zZXQ7XHJcblxyXG4gIGlzID0gX2lzO1xyXG5cclxuICBpc09iamVjdCh2YWw6IE56U2FmZUFueSkge1xyXG4gICAgcmV0dXJuIHZhbCAhPSBudWxsICYmIF9pcyh2YWwsICdPYmplY3QnKTtcclxuICB9XHJcblxyXG4gIGRlZmF1bHRJZnk8VCA9IE56U2FmZUFueT4ob2JqOiBULCBkZWZhdWx0VmFsdWU6IE56U2FmZUFueSkge1xyXG4gICAgcmV0dXJuIGlzTmlsKG9iaikgPyBkZWZhdWx0VmFsdWUgOiBvYmo7XHJcbiAgfVxyXG5cclxuICB0cmltKHN0cmluZzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gKHN0cmluZyB8fCAnJykudG9TdHJpbmcoKS5yZXBsYWNlKC9eW1xcc1xcdUZFRkZdK3xbXFxzXFx1RkVGRl0rJC9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bllK/kuIBJZOWPt1xyXG4gICAqL1xyXG4gIGdldFVVSUQoKSB7XHJcbiAgICByZXR1cm4gRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOa3seW6pmNsb25lXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIGNsb25lPFQgPSBOelNhZmVBbnk+KHRhcmdldDogVCk6IFQge1xyXG4gICAgY29uc3QgX3RhcmdldCA9IHRoaXMuaXNBcnJheSh0YXJnZXQpID8gW10gOiB7fTtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuZChfdGFyZ2V0IGFzIFQsIHRhcmdldCk7XHJcbiAgfVxyXG5cclxuICBhc3NpZ24gPSBtZXJnZTtcclxuXHJcbiAgLyoqXHJcbiAgICog57un5om/XHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwYXJhbSBhcmdzXHJcbiAgICovXHJcbiAgZXh0ZW5kID0gbWVyZ2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIOagueaNruW8gOWni+WSjOe7k+adn+aVsOWtl+i/lOWbnuS4gOS4quaVsOe7hFxyXG4gICAqIEBwYXJhbSBzdGFydCDotbflp4vmlbDlrZdcclxuICAgKiBAcGFyYW0gZW5kIOe7k+adn+aVsOWtl1xyXG4gICAqIEBwYXJhbSBmaWxsIOWhq+WFheWGheWuuSzpu5jorqRcclxuICAgKi9cclxuICByYW5nZTxUID0gTnpTYWZlQW55PihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgZmlsbD86ICgobnVtOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IFQpIHwgVCk6IFRbXSB7XHJcbiAgICBjb25zdCBsaXN0OiBUW10gPSBbXTtcclxuICAgIGNvbnN0IGZuID0gZmlsbCA9PSBudWxsID8gKGk6IG51bWJlcikgPT4gaSBhcyB1bmtub3duIGFzIFQgOiB0aGlzLmlzRnVuY3Rpb24oZmlsbCkgPyBmaWxsIDogKCkgPT4gZmlsbDtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICBsaXN0LnB1c2goZm4oaSwgaW5kZXgrKykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDpgY3ljobmoJHnu5PmnoRcclxuICAgKiBAcGFyYW0gdHJlZU5vZGVzIFRyZWVOb2RlW11cclxuICAgKiBAcGFyYW0gYWNjZXB0IOWHveaVsOi/lOWbnmZhbHNl5Y2z57uT5p2f6YGN5Y6GLCB0cnVl5oiW6ICFdW5kZWZpbmVk5bCG57un57ut6YGN5Y6GXHJcbiAgICogQHBhcmFtIGNoaWxkcmVuTmFtZSDlrZDoioLngrnlrZfmrrXlkI3np7BcclxuICAgKi9cclxuICBmb3JFYWNoVHJlZTxUIGV4dGVuZHMgVHJlZU5vZGU+KFxyXG4gICAgdHJlZU5vZGVzOiBUW10gfCB1bmRlZmluZWQgfCBudWxsLFxyXG4gICAgYWNjZXB0OiAobm9kZTogVCwgcGFyZW50Tm9kZTogVCB8IHVuZGVmaW5lZCwgbGV2ZWw6IG51bWJlcikgPT4gYm9vbGVhbiB8IHZvaWQsXHJcbiAgICBjaGlsZHJlbk5hbWU6IGtleW9mIFQgfCBUcmVlQ2hpbGRyZW48VD4gPSAnY2hpbGRyZW4nXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIXRyZWVOb2RlcyB8fCAhdHJlZU5vZGVzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Q2hpbGRyZW4gPVxyXG4gICAgICB0eXBlb2YgY2hpbGRyZW5OYW1lID09PSAnc3RyaW5nJyA/IChub2RlOiBUKSA9PiBub2RlW2NoaWxkcmVuTmFtZV0gOiAoY2hpbGRyZW5OYW1lIGFzIFRyZWVDaGlsZHJlbjxUPik7XHJcblxyXG4gICAgbGV0IHN0YWNrOiBUW10gPSBbLi4udHJlZU5vZGVzXTtcclxuICAgIGNvbnN0IHBhcmVudHM6IHsgY291bnQ6IG51bWJlcjsgcGFyZW50PzogVDsgbGV2ZWw6IG51bWJlciB9W10gPSBbeyBjb3VudDogdHJlZU5vZGVzLmxlbmd0aCwgbGV2ZWw6IDAgfV07XHJcbiAgICBsZXQgY291bnRlciA9IDA7XHJcblxyXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBpdGVtID0gc3RhY2suc2hpZnQoKSE7XHJcbiAgICAgIGNvbnN0IHBhcmVudCA9IHBhcmVudHNbMF07XHJcbiAgICAgIGlmICgrK2NvdW50ZXIgPT09IHBhcmVudC5jb3VudCkge1xyXG4gICAgICAgIHBhcmVudHMuc2hpZnQoKTtcclxuICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYWNjZXB0KGl0ZW0sIHBhcmVudC5wYXJlbnQsIHBhcmVudC5sZXZlbCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGdldENoaWxkcmVuKGl0ZW0sIHBhcmVudC5wYXJlbnQsIHBhcmVudC5sZXZlbCk7XHJcbiAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICBzdGFjayA9IHN0YWNrLmNvbmNhdChjaGlsZHJlbik7XHJcbiAgICAgICAgcGFyZW50cy5wdXNoKHsgY291bnQ6IGNoaWxkcmVuLmxlbmd0aCwgcGFyZW50OiBpdGVtLCBsZXZlbDogcGFyZW50LmxldmVsICsgMSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6L+H5ruk5qCRLCDnlJ/miJDmlrDnmoTmoJHnu5PmnoRcclxuICAgKiBAcGFyYW0gdHJlZU5vZGVzIOagkee7k+aehFxyXG4gICAqIEBwYXJhbSBwcmVkaWNhdGUg6L+H5ruk5Ye95pWwXHJcbiAgICogQHBhcmFtIGNoaWxkcmVuTmFtZSDlrZDoioLngrnlkI3np7As6buY6K6kICdjaGlsZHJlbidcclxuICAgKi9cclxuICBmaWx0ZXJUcmVlPFQgZXh0ZW5kcyBUcmVlTm9kZT4oXHJcbiAgICB0cmVlTm9kZXM6IFRbXSxcclxuICAgIHByZWRpY2F0ZTogKG5vZGU6IFQpID0+IGJvb2xlYW4sXHJcbiAgICBjaGlsZHJlbk5hbWU6IGtleW9mIFQgPSAnY2hpbGRyZW4nXHJcbiAgKTogVFtdIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IChsaXN0OiBUW10sIGNoaWxkcmVuOiBUW10pID0+IHtcclxuICAgICAgZm9yIChjb25zdCBub2RlIG9mIGxpc3QpIHtcclxuICAgICAgICBjb25zdCBuZXdOb2RlOiBUID0geyAuLi5ub2RlLCBbY2hpbGRyZW5OYW1lXTogW10gfTtcclxuICAgICAgICBpZiAobm9kZVtjaGlsZHJlbk5hbWVdPy5sZW5ndGgpIHtcclxuICAgICAgICAgIGZpbHRlcihub2RlW2NoaWxkcmVuTmFtZV0sIG5ld05vZGVbY2hpbGRyZW5OYW1lXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJlZGljYXRlKG5ld05vZGUpKSB7XHJcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5ld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlc3VsdDogVFtdID0gW107XHJcbiAgICBmaWx0ZXIodHJlZU5vZGVzLCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIl+ihqOi9rOagkee7k+aehFxyXG4gICAqIEBwYXJhbSBsaXN0IOWIl+ihqOaVsOaNrlxyXG4gICAqIEBwYXJhbSBpZE5hbWUgaWTnmoTlsZ7mgKflkI1cclxuICAgKiBAcGFyYW0gcGlkTmFtZSBwYXJlbnRJZOWxnuaAp+WQjVxyXG4gICAqIEBwYXJhbSBjaGlsZHJlbk5hbWUgY2hpbGRyZW7lsZ7mgKflkI1cclxuICAgKi9cclxuICBsaXN0VG9UcmVlPFQgZXh0ZW5kcyB7IHBpZD86IHN0cmluZzsgaWQ/OiBzdHJpbmc7IFtrZXk6IHN0cmluZ106IE56U2FmZUFueSB9PihcclxuICAgIGxpc3Q6IFRbXSxcclxuICAgIGlkTmFtZToga2V5b2YgVCA9ICdpZCcsXHJcbiAgICBwaWROYW1lOiBrZXlvZiBUID0gJ3BpZCcsXHJcbiAgICBjaGlsZHJlbk5hbWU6IHN0cmluZyA9ICdjaGlsZHJlbidcclxuICApOiBUW10ge1xyXG4gICAgaWYgKCFsaXN0IHx8ICFsaXN0Lmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBjb25zdCBub2RlTWFwOiB7IFtrZXk6IHN0cmluZ106IE56U2FmZUFueSB9ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbGlzdCkge1xyXG4gICAgICBub2RlTWFwW25vZGVbaWROYW1lXV0gPSBub2RlO1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIG5vZGVbY2hpbGRyZW5OYW1lXSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRyZWVOb2RlczogVFtdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgbGlzdCkge1xyXG4gICAgICBjb25zdCBwaWQgPSBub2RlW3BpZE5hbWVdO1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSBub2RlTWFwW25vZGVbcGlkTmFtZV1dO1xyXG4gICAgICBpZiAocGlkICYmIHBhcmVudCkge1xyXG4gICAgICAgIHBhcmVudFtjaGlsZHJlbk5hbWVdLnB1c2gobm9kZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHJlZU5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cmVlTm9kZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmiZPlubPmoJHnu5PmnoRcclxuICAgKiBAcGFyYW0gdHJlZU5vZGVzIOagkee7k+aehFxyXG4gICAqIEBwYXJhbSBhY2NlcHQg5Ye95pWw6L+U5ZueZmFsc2XljbPnu5PmnZ/pgY3ljoYsIHRydWXmiJbogIV1bmRlZmluZWTlsIbnu6fnu63pgY3ljoZcclxuICAgKiBAcGFyYW0gY2hpbGRyZW5OYW1lIOWtkOiKgueCueWtl+auteWQjeensFxyXG4gICAqL1xyXG4gIGZsYXRUcmVlPFQgZXh0ZW5kcyBUcmVlTm9kZT4oXHJcbiAgICB0cmVlTm9kZXM6IFRbXSxcclxuICAgIGFjY2VwdDogKG5vZGU6IFQsIHBhcmVudE5vZGU6IFQgfCB1bmRlZmluZWQsIGxldmVsOiBudW1iZXIpID0+IGJvb2xlYW4gfCB2b2lkID0gKCkgPT4gdHJ1ZSxcclxuICAgIGNoaWxkcmVuTmFtZToga2V5b2YgVCB8IFRyZWVDaGlsZHJlbjxUPiA9ICdjaGlsZHJlbidcclxuICApOiBUW10ge1xyXG4gICAgY29uc3QgbGlzdDogVFtdID0gW107XHJcbiAgICB0aGlzLmZvckVhY2hUcmVlKFxyXG4gICAgICB0cmVlTm9kZXMsXHJcbiAgICAgIChub2RlLCBwYXJlbnROb2RlLCBsZXZlbCkgPT4ge1xyXG4gICAgICAgIGlmIChhY2NlcHQobm9kZSwgcGFyZW50Tm9kZSwgbGV2ZWwpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkcmVuTmFtZVxyXG4gICAgKTtcclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5ZCM5q2l6K+35rGC55qE5ZON5bqU57uT5p6cXHJcbiAgICogQHBhcmFtIG9ic2VydmFibGVcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGNvbnN0IG15T2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8c3RyaW5nPigndXJsJywgeyBjb250ZXh0OiBuZXcgSHR0cENvbnRleHQoKS5zZXQoU1lOQ0VEX0VOQUJMRUQsIHRydWUpfSk7XHJcbiAgICogY29uc3QgdmFsdWUgPSBnZXRBamF4VmFsdWUobXlPYnNlcnZhYmxlKTsgLy8gdmFsdWXkuLpzdHJpbmfnsbvlnotcclxuICAgKi9cclxuICBnZXRBamF4VmFsdWU8VCA9IE56U2FmZUFueT4ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxUPikge1xyXG4gICAgbGV0IHZhbHVlITogVDtcclxuICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHJlc3VsdCA9PiAodmFsdWUgPSByZXN1bHQpKS51bnN1YnNjcmliZSgpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qC55o2u5LiN5ZCM55qE5Y+C5pWw57G75Z6LIOiOt+WPlmRvbeWFg+e0oFxyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKi9cclxuICBnZXRFbGVtZW50KHRhcmdldDogRWxlbWVudFJlZiB8IEhUTUxFbGVtZW50IHwgc3RyaW5nKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsZVJlZiA9IHRhcmdldCBhcyBFbGVtZW50UmVmO1xyXG4gICAgaWYgKGVsZVJlZi5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBlbGVSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5YiX6KGo6L2sTWFw57uT5p6EIOWNsyB7dmFsdWU6IGxhYmVsfVxyXG4gICAqIEBwYXJhbSBsaXN0IOaVsOe7hFxyXG4gICAqIEBwYXJhbSBrZXlOYW1lIGtleeWAvOeahOWxnuaAp+WQjSwg5aaC5p6c5Li656m65YiZ5L2/55So5b2T5YmN5YC85L2c5Li6a2V5XHJcbiAgICogQHBhcmFtIHZhbHVlTmFtZSB2YWx1ZeeahOWxnuaAp+WQjeaIluWHveaVsOWkhOeQhlxyXG4gICAqL1xyXG4gIGxpc3RUb01hcDxULCBWPihcclxuICAgIGxpc3Q6IFRbXSB8IHVuZGVmaW5lZCB8IG51bGwsXHJcbiAgICBrZXlOYW1lPzoga2V5b2YgVCB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICB2YWx1ZU5hbWU/OiBrZXlvZiBUIHwgKChpdGVtOiBUKSA9PiBWKVxyXG4gICk6IFJlY29yZDxzdHJpbmcsIFY+IHtcclxuICAgIGNvbnN0IHJlY29yZDogUmVjb3JkPHN0cmluZywgVj4gPSB7fTtcclxuICAgIGlmICghbGlzdCB8fCAhbGlzdC5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgIH1cclxuICAgIGxldCBmbjogRnVuY3Rpb24gPSAoaXRlbTogVCkgPT4gaXRlbTtcclxuICAgIGlmICh2YWx1ZU5hbWUpIHtcclxuICAgICAgZm4gPSBOenhVdGlscy5pc0Z1bmN0aW9uKHZhbHVlTmFtZSkgPyB2YWx1ZU5hbWUgOiAoaXRlbTogVCkgPT4gaXRlbVt2YWx1ZU5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgdiBvZiBsaXN0KSB7XHJcbiAgICAgIHJlY29yZFsoa2V5TmFtZSA/IHZba2V5TmFtZV0gOiB2KSBhcyBzdHJpbmddID0gZm4odikgYXMgVjtcclxuICAgIH1cclxuICAgIHJldHVybiByZWNvcmQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlrZfnrKbkuLLmqKHniYjlh73mlbBcclxuICAgKiBAcGFyYW0gdGVtcGxhdGUg5qih54mIXHJcbiAgICogQHBhcmFtIGRhdGEg5pWw5o2uXHJcbiAgICogQHJldHVybiDov5Tlm57muLLmn5PlkI7nmoRIdG1sXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBVdGlscy5mb3JtYXQoJ3tzLjAubmFtZX0nLCB7IHM6IFt7bmFtZTogMTExfV0gfSkgPT4gMTExXHJcbiAgICovXHJcbiAgZm9ybWF0KHRlbXBsYXRlOiBzdHJpbmcgfCBudWxsLCBkYXRhPzogUmVjb3JkPHN0cmluZywgTnpTYWZlQW55Pik6IHN0cmluZyB7XHJcbiAgICBpZiAodGVtcGxhdGUgPT0gbnVsbCB8fCAhZGF0YSkge1xyXG4gICAgICByZXR1cm4gdGVtcGxhdGUgfHwgJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvXFx7KFtcXHdcXC5dKilcXH0vZywgKHN0ciwga2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBrZXkuc3BsaXQoJy4nKTtcclxuICAgICAgbGV0IHYgPSBkYXRhW3BhdGguc2hpZnQoKV07XHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBzaXplID0gcGF0aC5sZW5ndGg7IGkgPCBzaXplICYmIHYgIT09IG51bGw7IGkrKykge1xyXG4gICAgICAgIHYgPSB2W3BhdGhbaV1dO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2ID09IG51bGwgPyAnJyA6IHYudG9TdHJpbmcoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5a+5RGF0ZeeahOaJqeWxle+8jOWwhiBEYXRlIOi9rOWMluS4uuaMh+WumuagvOW8j+eahFN0cmluZ1xyXG4gICAqIOaciChNKeOAgeaXpShkKeOAgTEy5bCP5pe2KGgp44CBMjTlsI/ml7YoSCnjgIHliIYobSnjgIHnp5IocynjgIHlkagoRSnjgIHlraPluqYocSkg5Y+v5Lul55SoIDEtMiDkuKrljaDkvY3nrKZcclxuICAgKiDlubQoeSnlj6/ku6XnlKggMS00IOS4quWNoOS9jeespu+8jOavq+enkihTKeWPquiDveeUqCAxIOS4quWNoOS9jeespijmmK8gMS0zIOS9jeeahOaVsOWtlylcclxuICAgKiBlZzpcclxuICAgKiBOZUtpdC5mb3JtYXREYXRlKG5ldyBEYXRlKCksICd5eXl5LU1NLWRkIGhoOm1tOnNzLlMnKSA9PT4gMjAwNi0wNy0wMiAwODowOTowNC40MjNcclxuICAgKiBOZUtpdC5mb3JtYXREYXRlKG5ldyBEYXRlKCksICd5eXl5LU1NLWRkIOaYn+acn0UgSEg6bW06c3MnKSA9PT4gMjAwOS0wMy0xMCDmmJ/mnJ/kuowgMjA6MDk6MDRcclxuICAgKiBOZUtpdC5mb3JtYXREYXRlKG5ldyBEYXRlKCksICd5eXl5LU1NLWRkIOaYn+acn2UgaGg6bW06c3MnKSA9PT4gMjAwOS0wMy0xMCDmmJ/mnJ8yIDA4OjA5OjA0XHJcbiAgICogTmVLaXQuZm9ybWF0RGF0ZShuZXcgRGF0ZSgpLCAneXl5eS1NTS1kZCDnrKx35ZGoIGhoOm1tOnNzJykgPT0+IDIwMDktMDMtMTAg56ysMuWRqCAwODowOTowNFxyXG4gICAqIE5lS2l0LmZvcm1hdERhdGUobmV3IERhdGUoKSwgJ3l5eXktTS1kIGg6bTpzLlMnKSA9PT4gMjAwNi03LTIgODo5OjQuMThcclxuICAgKi9cclxuICBmb3JtYXREYXRlKHNyY0RhdGU6IERhdGUsIGZtdDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXNyY0RhdGUpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2VlayA9IHtcclxuICAgICAgMDogJ1xcdTY1ZTUnLFxyXG4gICAgICAxOiAnXFx1NGUwMCcsXHJcbiAgICAgIDI6ICdcXHU0ZThjJyxcclxuICAgICAgMzogJ1xcdTRlMDknLFxyXG4gICAgICA0OiAnXFx1NTZkYicsXHJcbiAgICAgIDU6ICdcXHU0ZTk0JyxcclxuICAgICAgNjogJ1xcdTUxNmQnXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG8gPSB7XHJcbiAgICAgICdNKyc6IHNyY0RhdGUuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICdkKyc6IHNyY0RhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAnaCsnOiBzcmNEYXRlLmdldEhvdXJzKCkgJSAxMiA9PT0gMCA/IDEyIDogc3JjRGF0ZS5nZXRIb3VycygpICUgMTIsXHJcbiAgICAgICdIKyc6IHNyY0RhdGUuZ2V0SG91cnMoKSxcclxuICAgICAgJ20rJzogc3JjRGF0ZS5nZXRNaW51dGVzKCksXHJcbiAgICAgICdzKyc6IHNyY0RhdGUuZ2V0U2Vjb25kcygpLFxyXG4gICAgICAncSsnOiBNYXRoLmZsb29yKChzcmNEYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLFxyXG4gICAgICAnUysnOiBzcmNEYXRlLmdldE1pbGxpc2Vjb25kcygpLFxyXG4gICAgICAnZSsnOiBzcmNEYXRlLmdldERheSgpLFxyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIEU6IHdlZWtbc3JjRGF0ZS5nZXREYXkoKV0sXHJcbiAgICAgICd3Kyc6IChkYXRlID0+IHtcclxuICAgICAgICBjb25zdCBkYXRlMiA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gKGRhdGUyLmdldERheSgpID8gZGF0ZTIuZ2V0RGF5KCkgOiA3KSAtIChkYXRlLmdldERheSgpID8gZGF0ZS5nZXREYXkoKSA6IDcpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoTWF0aC5yb3VuZCgoZGF0ZS5nZXRUaW1lKCkgLSBkYXRlMi5nZXRUaW1lKCkgKyBkYXkgKiAoMjQgKiAzNjAwMDAwKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XHJcbiAgICAgIH0pKHNyY0RhdGUpXHJcbiAgICB9O1xyXG4gICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIHtcclxuICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoc3JjRGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrIGluIG8pIHtcclxuICAgICAgaWYgKG5ldyBSZWdFeHAoJygnICsgayArICcpJykudGVzdChmbXQpKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgUmVnRXhwLiQxLmxlbmd0aCA9PT0gMSA/IG9ba10gOiAoJzAwJyArIG9ba10pLnN1YnN0cigoJycgKyBvW2tdKS5sZW5ndGgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZtdDtcclxuICB9XHJcblxyXG4gIGlzRW1wdHk8VCA9IHVua25vd24+KHZhbDogVCk6IHZhbCBpcyBUIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJldHVybiB2YWwgPT0gbnVsbCB8fCB2YWwubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgaXNEYXRlKHZhbDogdW5rbm93bik6IHZhbCBpcyBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLmlzKHZhbCwgJ0RhdGUnKTtcclxuICB9XHJcblxyXG4gIGlzTnVtYmVyKHZhbDogdW5rbm93bik6IHZhbCBpcyBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaXModmFsLCAnTnVtYmVyJyk7XHJcbiAgfVxyXG5cclxuICBpc1Byb21pc2U8VCA9IE56U2FmZUFueT4odmFsOiBOelNhZmVBbnkpOiB2YWwgaXMgUHJvbWlzZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5pcyh2YWwsICdQcm9taXNlJykgfHwgKHRoaXMuaXNPYmplY3QodmFsKSAmJiB0aGlzLmlzRnVuY3Rpb24odmFsLnRoZW4pICYmIHRoaXMuaXNGdW5jdGlvbih2YWwuY2F0Y2gpKTtcclxuICB9XHJcblxyXG4gIGlzT2JzZXJ2YWJsZShvYmo6IE56U2FmZUFueSk6IG9iaiBpcyBPYnNlcnZhYmxlPE56U2FmZUFueT4ge1xyXG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGUgfHwgKG9iaiAmJiB0eXBlb2Ygb2JqLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJyk7XHJcbiAgfVxyXG5cclxuICBpc1N0cmluZyh2YWw6IHVua25vd24pOiB2YWwgaXMgc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmlzKHZhbCwgJ1N0cmluZycpO1xyXG4gIH1cclxuXHJcbiAgaXNGdW5jdGlvbih2YWw6IHVua25vd24pOiB2YWwgaXMgRnVuY3Rpb24ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XHJcbiAgfVxyXG5cclxuICBpc0Jvb2xlYW4odmFsOiB1bmtub3duKTogdmFsIGlzIGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXModmFsLCAnQm9vbGVhbicpO1xyXG4gIH1cclxuXHJcbiAgaXNSZWdFeHAodmFsOiB1bmtub3duKTogdmFsIGlzIFJlZ0V4cCB7XHJcbiAgICByZXR1cm4gdGhpcy5pcyh2YWwsICdSZWdFeHAnKTtcclxuICB9XHJcblxyXG4gIGlzQXJyYXkodmFsOiBOelNhZmVBbnkpOiB2YWwgaXMgQXJyYXk8TnpTYWZlQW55PiB7XHJcbiAgICBpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmlzKHZhbCwgJ0FycmF5Jyk7XHJcbiAgfVxyXG5cclxuICBpc1dpbmRvdyh2YWw6IE56U2FmZUFueSk6IHZhbCBpcyBXaW5kb3cge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuaXModmFsLCAnV2luZG93Jyk7XHJcbiAgfVxyXG5cclxuICBpc0VsZW1lbnQodmFsOiBOelNhZmVBbnkpOiB2YWwgaXMgRWxlbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5pc09iamVjdCh2YWwpICYmICEhdmFsLnRhZ05hbWU7XHJcbiAgfVxyXG5cclxuICBpc01hcCh2YWw6IHVua25vd24pOiB2YWwgaXMgTWFwPE56U2FmZUFueSwgTnpTYWZlQW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5pcyh2YWwsICdNYXAnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuS4uuaJi+acuuWPt++8iOS4reWbve+8iVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIGlzTW9iaWxlKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAvXigwfFxcXFwrPzg2fDE3OTUxKT8xWzAtOV17MTB9JC8udGVzdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKZJUDTlnLDlnYDvvIjmlK/mjIF2NOOAgXY277yJXHJcbiAgICogQHBhcmFtIGlwXHJcbiAgICovXHJcbiAgaXNJcChpcDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gL14oPzpeKD86MjVbMC01XXwyWzAtNF1cXFxcZHwxXFxcXGRcXFxcZHxbMS05XVxcXFxkfFxcXFxkKSg/OlxcXFwuKD86MjVbMC01XXwyWzAtNF1cXFxcZHwxXFxcXGRcXFxcZHxbMS05XVxcXFxkfFxcXFxkKSl7M30kKXwoPzpeKD86KD86W2EtZkEtRlxcXFxkXXsxLDR9Oil7N30oPzpbYS1mQS1GXFxcXGRdezEsNH18Oil8KD86W2EtZkEtRlxcXFxkXXsxLDR9Oil7Nn0oPzooPzoyNVswLTVdfDJbMC00XVxcXFxkfDFcXFxcZFxcXFxkfFsxLTldXFxcXGR8XFxcXGQpKD86XFxcXC4oPzoyNVswLTVdfDJbMC00XVxcXFxkfDFcXFxcZFxcXFxkfFsxLTldXFxcXGR8XFxcXGQpKXszfXw6W2EtZkEtRlxcXFxkXXsxLDR9fDopfCg/OlthLWZBLUZcXFxcZF17MSw0fTopezV9KD86Oig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9fCg/OjpbYS1mQS1GXFxcXGRdezEsNH0pezEsMn18Oil8KD86W2EtZkEtRlxcXFxkXXsxLDR9Oil7NH0oPzooPzo6W2EtZkEtRlxcXFxkXXsxLDR9KXswLDF9Oig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9fCg/OjpbYS1mQS1GXFxcXGRdezEsNH0pezEsM318Oil8KD86W2EtZkEtRlxcXFxkXXsxLDR9Oil7M30oPzooPzo6W2EtZkEtRlxcXFxkXXsxLDR9KXswLDJ9Oig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9fCg/OjpbYS1mQS1GXFxcXGRdezEsNH0pezEsNH18Oil8KD86W2EtZkEtRlxcXFxkXXsxLDR9Oil7Mn0oPzooPzo6W2EtZkEtRlxcXFxkXXsxLDR9KXswLDN9Oig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9fCg/OjpbYS1mQS1GXFxcXGRdezEsNH0pezEsNX18Oil8KD86W2EtZkEtRlxcXFxkXXsxLDR9Oil7MX0oPzooPzo6W2EtZkEtRlxcXFxkXXsxLDR9KXswLDR9Oig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkoPzpcXFxcLig/OjI1WzAtNV18MlswLTRdXFxcXGR8MVxcXFxkXFxcXGR8WzEtOV1cXFxcZHxcXFxcZCkpezN9fCg/OjpbYS1mQS1GXFxcXGRdezEsNH0pezEsNn18Oil8KD86Oig/Oig/OjpbYS1mQS1GXFxcXGRdezEsNH0pezAsNX06KD86MjVbMC01XXwyWzAtNF1cXFxcZHwxXFxcXGRcXFxcZHxbMS05XVxcXFxkfFxcXFxkKSg/OlxcXFwuKD86MjVbMC01XXwyWzAtNF1cXFxcZHwxXFxcXGRcXFxcZHxbMS05XVxcXFxkfFxcXFxkKSl7M318KD86OlthLWZBLUZcXFxcZF17MSw0fSl7MSw3fXw6KSkpKD86JVswLTlhLXpBLVpdezEsfSk/JCkkLy50ZXN0KFxyXG4gICAgICBpcFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYr3VybFxyXG4gICAqIEBwYXJhbSBwYXRoXHJcbiAgICovXHJcbiAgaXNVcmwocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gLygoKF5odHRwcz86KD86XFwvXFwvKT8pKD86Wy07OiY9XFwrXFwkLFxcd10rQCk/W0EtWmEtejAtOS4tXSsoPzo6XFxkKyk/fCg/Ond3dy58Wy07OiY9XFwrXFwkLFxcd10rQClbQS1aYS16MC05Li1dKykoKD86XFwvW1xcK34lXFwvLlxcdy1fXSopP1xcPz8oPzpbLVxcKz0mOyVALlxcd19dKikjPyg/OltcXHddKikpPykkLy50ZXN0KFxyXG4gICAgICBwYXRoXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5Lit5paHXHJcbiAgICogQHBhcmFtIHZhbHVlIOa1i+ivleWtl+espuS4slxyXG4gICAqL1xyXG4gIGlzQ2hpbmVzZSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gL15bXFx1NGUwMC1cXHU5ZmE1XSskLy50ZXN0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuS4uuaVsOWAvFxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqIEBwYXJhbSBtaW51cyDmmK/lkKblhYHorrjotJ/mlbBcclxuICAgKiBAcGFyYW0gZnJhY3Rpb24g5pyA5aSn5L+d55WZ5bCP5pWw5L2N5pWwXHJcbiAgICovXHJcbiAgaXNOdW0odmFsdWU6IHN0cmluZywgbWludXM/OiBib29sZWFuLCBmcmFjdGlvbj86IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmVnZXggPVxyXG4gICAgICAobWludXMgPyAnXi0/JyA6ICdeJykgK1xyXG4gICAgICBgKChbMS05XXsxfVxcXFxkKil8KDB7MX0pKWAgK1xyXG4gICAgICAoZnJhY3Rpb24gJiYgZnJhY3Rpb24gPiAwID8gYChcXFxcLlxcXFxkezEsJHtmcmFjdGlvbn19KT8kYCA6ICckJyk7XHJcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCkudGVzdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKbkuLrpgq7nrrFcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBpc0VtYWlsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC8udGVzdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKbmmK/nuq/lr7nosaHlgLxcclxuICAgKiBAcGFyYW0gb2JqXHJcbiAgICovXHJcbiAgaXNQbGFpbk9iamVjdCA9IF9pc1BsYWluT2JqZWN0O1xyXG5cclxuICAvKipcclxuICAgKiDovazmjaLkuLrml6XmnJ9cclxuICAgKiBAcGFyYW0gZGF0ZSDlvoXovazmjaLnmoTlgLxcclxuICAgKi9cclxuICB0b0RhdGUoZGF0ZT86IERhdGUgfCBzdHJpbmcgfCBudW1iZXIpOiBEYXRlIHwgbnVsbCB7XHJcbiAgICBpZiAoZGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNEYXRlKGRhdGUpKSB7XHJcbiAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNOdW1iZXIoZGF0ZSkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTdHJpbmcoZGF0ZSkpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBEYXRlLnBhcnNlKGRhdGUpO1xyXG4gICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBkYXRlLm1hdGNoKC9cXGQrL2cpO1xyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKC4uLm1hdGNoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCI5bm25a+56LGh5YiwRm9ybURhdGFcclxuICAgKiBAcGFyYW0gb2JqIOimgeWQiOW5tueahOWvueixoVxyXG4gICAqIEBwYXJhbSB7Rm9ybURhdGF9IGZvcm0g6KGo5Y2VXHJcbiAgICovXHJcbiAgbWVyZ2VGb3JtRGF0YTxUPihmb3JtOiBGb3JtRGF0YSwgb2JqOiBUKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zZXJpYWxpemVQYXJhbXMob2JqKTtcclxuICAgIGZvciAoY29uc3QgaXQgb2YgbGlzdCkge1xyXG4gICAgICBmb3JtLmFwcGVuZChpdC5rZXksIGl0LnZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaKimpz5a+56LGh5bqP5YiX5YyW5a+56K+35rGC5pWw5o2uLOagvOW8j+S4uiBhPWF2JmI9YnYuLi4mbj1udlxyXG4gICAqIEBwYXJhbSBvYmpcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHNlcmlhbGl6ZTxUPihvYmo6IFQpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc2VyaWFsaXplUGFyYW1zPFQ+KG9iaik7XHJcbiAgICBsZXQgcXVlcnkgPSAnJztcclxuICAgIGZvciAoY29uc3QgaXQgb2YgbGlzdCkge1xyXG4gICAgICBxdWVyeSArPSBlbmNvZGVVUklDb21wb25lbnQoaXQua2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChpdC52YWx1ZSkgKyAnJic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcXVlcnkgPT09ICcnID8gcXVlcnkgOiBxdWVyeS5zdWJzdHIoMCwgcXVlcnkubGVuZ3RoIC0gMSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmiopqc+WvueixoeW6j+WIl+WMluWvueivt+axguaVsOaNrlxyXG4gICAqIEBwYXJhbSBvYmpcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHNlcmlhbGl6ZVBhcmFtczxUPihvYmo6IFQpOiBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+W10ge1xyXG4gICAgaWYgKCFvYmopIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+W10gPSBbXTtcclxuICAgIHRoaXMuYnVpbGRQYXJhbShvYmosIHF1ZXJ5KTtcclxuICAgIHJldHVybiBxdWVyeTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRQYXJhbTxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgTnpTYWZlQW55Pj4oaW5PYmo6IFQsIGxpc3Q6IFJlY29yZDxzdHJpbmcsIE56U2FmZUFueT5bXSkge1xyXG4gICAgbGV0IHZhbHVlOiBOelNhZmVBbnk7XHJcbiAgICBsZXQgc3ViTmFtZTogc3RyaW5nO1xyXG4gICAgbGV0IGlubmVyT2JqOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGluT2JqKSB7XHJcbiAgICAgIHZhbHVlID0gaW5PYmpbbmFtZV07XHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlW2ldIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWVbaV0gaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlW2ldLnRvSlNPTikge1xyXG4gICAgICAgICAgICAgIGxpc3QucHVzaCh7IGtleTogbmFtZSwgdmFsdWU6IHZhbHVlW2ldLnRvSlNPTigpIH0pO1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlubmVyT2JqID0ge307XHJcbiAgICAgICAgICAgIGlubmVyT2JqW25hbWUgKyAnWycgKyBpICsgJ10nXSA9IHZhbHVlW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkUGFyYW0oaW5uZXJPYmosIGxpc3QpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVtpXSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlW2ldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh7IGtleTogbmFtZSwgdmFsdWU6IHZhbHVlW2ldIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICBpZiAodmFsdWUudG9KU09OKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2goeyBrZXk6IG5hbWUsIHZhbHVlOiB2YWx1ZS50b0pTT04oKSB9KTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChzdWJOYW1lIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xyXG4gICAgICAgICAgaW5uZXJPYmogPSB7fTtcclxuICAgICAgICAgIGlubmVyT2JqW25hbWUgKyAnLicgKyBzdWJOYW1lXSA9IHZhbHVlW3N1Yk5hbWVdO1xyXG4gICAgICAgICAgdGhpcy5idWlsZFBhcmFtKGlubmVyT2JqLCBsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICBsaXN0LnB1c2goeyBrZXk6IG5hbWUsIHZhbHVlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTnp4VXRpbHMgPSBuZXcgVXRpbHNDbGFzcygpO1xyXG5cclxuLyoqXHJcbiAqIOagkeiKgueCuVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUcmVlTm9kZSB7XHJcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xyXG5cclxuICAvKipcclxuICAgKiDlrZDoioLngrlcclxuICAgKi9cclxuICBjaGlsZHJlbj86IFRyZWVOb2RlW107XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRyZWVDaGlsZHJlbjxUID0gTnpTYWZlQW55PiA9IChub2RlOiBULCBwYXJlbnROb2RlOiBUIHwgdW5kZWZpbmVkLCBsZXZlbDogbnVtYmVyKSA9PiBUW10gfCBudWxsO1xyXG4iXX0=