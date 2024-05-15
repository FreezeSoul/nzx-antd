import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NzxUtils } from './utils';
/**
 * 表单工具
 */
export class FormUtilsClass {
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
export const NzxFormUtils = new FormUtilsClass();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlsL2Zvcm0tdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBaUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4SSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRW5DOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7T0FJRztJQUNILGtCQUFrQixDQUFDLElBQXFCLEVBQUUsUUFBeUM7UUFDakYsSUFBSSxJQUFJLFlBQVksZ0JBQWdCLEVBQUU7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLElBQUksWUFBWSxrQkFBa0IsRUFBRTtvQkFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUN6QzthQUNGO1lBQ0QsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLFlBQVksZ0JBQWdCLEVBQUU7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxZQUFZLGtCQUFrQixFQUFFO29CQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFD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QU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUU7b0JBQ25CLFNBQVM7aUJBQ1Y7Z0JBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUU7b0JBQ2hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO2lCQUN6QzthQUNGO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1BcnJheSwgVW50eXBlZEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbi8qKlxyXG4gKiDooajljZXlt6XlhbdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtVXRpbHNDbGFzcyB7XHJcbiAgLyoqXHJcbiAgICog6YGN5Y6G6KGo5Y2V5o6n5Lu2XHJcbiAgICogQHBhcmFtIGZvcm0g6KGo5Y2V5oiW6ICF6KGo5Y2V5YWD57SgXHJcbiAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAqL1xyXG4gIGZvckVhY2hGb3JtQ29udHJvbChmb3JtOiBBYnN0cmFjdENvbnRyb2wsIGNhbGxiYWNrOiAoY3RybDogQWJzdHJhY3RDb250cm9sKSA9PiB2b2lkKSB7XHJcbiAgICBpZiAoZm9ybSBpbnN0YW5jZW9mIFVudHlwZWRGb3JtR3JvdXApIHtcclxuICAgICAgY2FsbGJhY2soZm9ybSk7XHJcbiAgICAgIGZvciAoY29uc3QgaSBpbiBmb3JtLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgY29uc3QgY3RybCA9IGZvcm0uY29udHJvbHNbaV07XHJcbiAgICAgICAgaWYgKGN0cmwgaW5zdGFuY2VvZiBVbnR5cGVkRm9ybUNvbnRyb2wpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGN0cmwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmZvckVhY2hGb3JtQ29udHJvbChjdHJsLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9ybSBpbnN0YW5jZW9mIFVudHlwZWRGb3JtQXJyYXkpIHtcclxuICAgICAgY2FsbGJhY2soZm9ybSk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN0cmwgPSBmb3JtLmF0KGkpO1xyXG4gICAgICAgIGlmIChjdHJsIGluc3RhbmNlb2YgVW50eXBlZEZvcm1Db250cm9sKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhjdHJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5mb3JFYWNoRm9ybUNvbnRyb2woY3RybCwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZvcm0gaW5zdGFuY2VvZiBVbnR5cGVkRm9ybUNvbnRyb2wpIHtcclxuICAgICAgY2FsbGJhY2soZm9ybSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaJp+ihjOmqjOivgVxyXG4gICAqIEBwYXJhbSBmb3JtIOihqOWNlVxyXG4gICAqIEBwYXJhbSBvcHRzIOmFjee9rlxyXG4gICAqL1xyXG4gIHZhbGlkYXRlKFxyXG4gICAgZm9ybTogQWJzdHJhY3RDb250cm9sLFxyXG4gICAgb3B0czoge1xyXG4gICAgICBvbmx5U2VsZj86IGJvb2xlYW47XHJcbiAgICAgIGVtaXRFdmVudD86IGJvb2xlYW47XHJcbiAgICAgIHVwZGF0ZVZhbHVlQW5kVmFsaWRpdHk/OiBib29sZWFuO1xyXG4gICAgfSA9IHsgdXBkYXRlVmFsdWVBbmRWYWxpZGl0eTogZmFsc2UgfVxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgdGhpcy5mb3JFYWNoRm9ybUNvbnRyb2woZm9ybSwgY3RybCA9PiB7XHJcbiAgICAgIGN0cmwubWFya0FzRGlydHkob3B0cyk7XHJcbiAgICAgIG9wdHMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSAmJiBjdHJsLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkob3B0cyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtLnZhbGlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5riF56m66ZSZ6K+v5L+h5oGvXHJcbiAgICovXHJcbiAgY2xlYXJFcnJvcihmb3JtOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9yRWFjaEZvcm1Db250cm9sKGZvcm0sIGN0cmwgPT4gY3RybC5zZXRFcnJvcnMobnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W6ZSZ6K+v5L+h5oGvXHJcbiAgICogQHBhcmFtIGNvbnRyb2xcclxuICAgKi9cclxuICBnZXRNZXNzYWdlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgaWYgKCFjb250cm9sLmVycm9ycykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250cm9sLmVycm9ycykge1xyXG4gICAgICByZXR1cm4gY29udHJvbC5lcnJvcnNba2V5XT8ubWVzc2FnZSB8fCAn6L6T5YWl5LiN5q2j56GuJztcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5b+F5aGr6aqM6K+BXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug6ZSZ6K+v5L+h5oGvXHJcbiAgICogQHBhcmFtIGhhc1ZhbHVlIOaYr+WQpuacieWAvOWHveaVsOWIpOaWrVxyXG4gICAqL1xyXG4gIHJlcXVpcmVkPFQgPSBOelNhZmVBbnk+KG1lc3NhZ2U6IHN0cmluZyA9ICfkuI3og73kuLrnqbonLCBoYXNWYWx1ZTogKHZhbHVlOiBUKSA9PiBib29sZWFuID0gdmFsdWUgPT4gISF2YWx1ZSk6IFZhbGlkYXRvckZuIHtcclxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XHJcbiAgICAgIHJldHVybiBoYXNWYWx1ZShjb250cm9sLnZhbHVlKSA/IG51bGwgOiB7IHJlcXVpcmVkOiB7IG1lc3NhZ2UsIHZhbHVlOiBjb250cm9sLnZhbHVlIH0gfTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmoLnmja7mjIflrprlh73mlbDpqozor4FcclxuICAgKiBAcGFyYW0gb3BlcmF0b3Ig5pON5L2c5Ye95pWwXHJcbiAgICogQHBhcmFtIGVyck1lc3NhZ2Ug6ZSZ6K+v5L+h5oGvXHJcbiAgICovXHJcbiAgc2luZ2xlVmFsaWRhdG9yPFQ+KG9wZXJhdG9yOiAodmFsdWU6IFQpID0+IGJvb2xlYW4sIGVyck1lc3NhZ2U6IFZhbGlkYXRpb25FcnJvcnMpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xyXG4gICAgICBpZiAoY29udHJvbC52YWx1ZSA9PSBudWxsIHx8IGNvbnRyb2wudmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9wZXJhdG9yKGNvbnRyb2wudmFsdWUpID8gbnVsbCA6IGVyck1lc3NhZ2U7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qC55o2u5q2j5YiZ6KGo6L6+5byP6aqM6K+BXHJcbiAgICogQHBhcmFtIGV4cCDmraPliJnooajovr7lvI9cclxuICAgKiBAcGFyYW0gbWVzc2FnZSDplJnor6/kv6Hmga9cclxuICAgKi9cclxuICBwYXR0ZXJuKGV4cDogUmVnRXhwIHwgc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICBjb25zdCByZWcgPSBOenhVdGlscy5pc1N0cmluZyhleHApID8gbmV3IFJlZ0V4cChleHAsICdtaWcnKSA6IGV4cDtcclxuICAgIHJldHVybiB0aGlzLnNpbmdsZVZhbGlkYXRvcjxzdHJpbmc+KHYgPT4gcmVnLnRlc3QodiksIHsgcGF0dGVybjogeyBtZXNzYWdlIH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsI/kuo7pqozor4FcclxuICAgKiBAcGFyYW0gbnVtIOaVsOWtl1xyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOmUmeivr+S/oeaBr1xyXG4gICAqL1xyXG4gIGx0KG51bTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPih2ID0+IE51bWJlcih2KSA8IG51bSwgeyBsdDogeyBtZXNzYWdlIH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsI/kuo7nrYnkuo7pqozor4FcclxuICAgKiBAcGFyYW0gbnVtIOaVsOWtl1xyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOmUmeivr+S/oeaBr1xyXG4gICAqL1xyXG4gIGx0ZShudW06IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlVmFsaWRhdG9yPHN0cmluZz4odiA9PiBOdW1iZXIodikgPD0gbnVtLCB7IGx0ZTogeyBtZXNzYWdlIH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpKfkuo7pqozor4FcclxuICAgKiBAcGFyYW0gbnVtIOaVsOWtl1xyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOmUmeivr+S/oeaBr1xyXG4gICAqL1xyXG4gIGd0KG51bTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPih2ID0+IE51bWJlcih2KSA+IG51bSwgeyBndDogeyBtZXNzYWdlIH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpKfkuo7nrYnkuo7pqozor4FcclxuICAgKiBAcGFyYW0gbnVtIOaVsOWtl1xyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOmUmeivr+S/oeaBr1xyXG4gICAqL1xyXG4gIGd0ZShudW06IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlVmFsaWRhdG9yPHN0cmluZz4odiA9PiBOdW1iZXIodikgPj0gbnVtLCB7IGd0ZTogeyBtZXNzYWdlIH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDljIXlkKvmjIflrprlrZfnrKbkuLLpqozor4FcclxuICAgKiBAcGFyYW0gc3RyIOWtl+espuS4slxyXG4gICAqIEBwYXJhbSBpZ25vcmUg5b+955Wl5aSn5bCP5YaZXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug6ZSZ6K+v5L+h5oGvXHJcbiAgICovXHJcbiAgY29udGFpbnMoc3RyOiBzdHJpbmcsIGlnbm9yZTogYm9vbGVhbiwgbWVzc2FnZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgY29uc3QgbmV3U3RyID0gaWdub3JlID8gc3RyLnRvTG93ZXJDYXNlKCkgOiBzdHI7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPih2ID0+IChpZ25vcmUgPyB2LnRvTG93ZXJDYXNlKCkgOiB2KS5pbmRleE9mKG5ld1N0cikgIT09IC0xLCB7XHJcbiAgICAgIGNvbnRhaW5zOiB7IG1lc3NhZ2UgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBtaW4gPD0geCA8PSBtYXgg6aqM6K+BXHJcbiAgICogQHBhcmFtIG1pbiDmnIDlsI/lgLxcclxuICAgKiBAcGFyYW0gbWF4IOacgOWkp+WAvFxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOmUmeivr+S/oeaBr1xyXG4gICAqL1xyXG4gIGJldHdlZW4obWluOiBudW1iZXIsIG1heDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPihcclxuICAgICAgdmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHYgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB2ID49IG1pbiAmJiB2IDw9IG1heDtcclxuICAgICAgfSxcclxuICAgICAgeyBiZXR3ZWVuOiB7IG1lc3NhZ2UgfSB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pWw5a2X5qCh6aqMXHJcbiAgICogQHBhcmFtIG1pbnVzIOaYr+WQpuWFgeiuuOi0n+aVsFxyXG4gICAqIEBwYXJhbSBmcmFjdGlvbiDkv53nlZnlsI/mlbDmnInmlYjmlbDlrZfkvY3mlbBcclxuICAgKiBAcGFyYW0gbWVzc2FnZSDplJnor6/mj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICBudW1iZXIobWludXM/OiBib29sZWFuLCBmcmFjdGlvbj86IG51bWJlciwgbWVzc2FnZTogc3RyaW5nID0gJ+aVsOWtl+agvOW8j+mUmeivrycpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPih2YWx1ZSA9PiBOenhVdGlscy5pc051bSh2YWx1ZSwgbWludXMsIGZyYWN0aW9uKSwgeyBudW1iZXI6IHsgbWVzc2FnZSB9IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qCh6aqM5omL5py65Y+377yI5Lit5Zu977yJXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug6ZSZ6K+v5o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgbW9iaWxlKG1lc3NhZ2U6IHN0cmluZyA9ICfmiYvmnLrlj7fmoLzlvI/plJnor68nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlVmFsaWRhdG9yPHN0cmluZz4odmFsdWUgPT4gTnp4VXRpbHMuaXNNb2JpbGUodmFsdWUpLCB7IG1vYmlsZTogeyBtZXNzYWdlIH0gfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmoKHpqozpgq7nrrFcclxuICAgKiBAcGFyYW0gbWVzc2FnZSDplJnor6/mj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICBlbWFpbChtZXNzYWdlOiBzdHJpbmcgPSAn6YKu566x5qC85byP6ZSZ6K+vJyk6IFZhbGlkYXRvckZuIHtcclxuICAgIHJldHVybiB0aGlzLnNpbmdsZVZhbGlkYXRvcjxzdHJpbmc+KHZhbHVlID0+IE56eFV0aWxzLmlzRW1haWwodmFsdWUpLCB7IGVtYWlsOiB7IG1lc3NhZ2UgfSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOagoemqjGlwXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug6ZSZ6K+v5o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgaXAobWVzc2FnZTogc3RyaW5nID0gJ0lQ5qC85byP6ZSZ6K+vJyk6IFZhbGlkYXRvckZuIHtcclxuICAgIHJldHVybiB0aGlzLnNpbmdsZVZhbGlkYXRvcjxzdHJpbmc+KHZhbHVlID0+IE56eFV0aWxzLmlzSXAodmFsdWUpLCB7IGlwOiB7IG1lc3NhZ2UgfSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOagoemqjHVybCzmlK/mjIFpcCB2NCwgaXAgdjZcclxuICAgKiBAcGFyYW0gbWVzc2FnZSDplJnor6/mj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICB1cmwobWVzc2FnZTogc3RyaW5nID0gJ1VSTOagvOW8j+mUmeivrycpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPih2YWx1ZSA9PiBOenhVdGlscy5pc1VybCh2YWx1ZSksIHsgdXJsOiB7IG1lc3NhZ2UgfSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOagoemqjOS4reaWh1xyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOmUmeivr+aPkOekuuS/oeaBr1xyXG4gICAqL1xyXG4gIGNoaW5lc2UobWVzc2FnZTogc3RyaW5nID0gJ+WPquWFgeiuuOi+k+WFpeS4reaWh+Wtl+espicpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaW5nbGVWYWxpZGF0b3I8c3RyaW5nPih2YWx1ZSA9PiBOenhVdGlscy5pc0NoaW5lc2UodmFsdWUpLCB7IGNoaW5lc2U6IHsgbWVzc2FnZSB9IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6aqM6K+B5Lik5Liq5a2X5q61XHJcbiAgICogQHBhcmFtIGZvcm0g6KGo5Y2VXHJcbiAgICogQHBhcmFtIG90aGVyRmllbGQg5Y+m5LiA5Liq6KKr6aqM6K+B55qE5a2X5q615ZCN56ewXHJcbiAgICogQHBhcmFtIGNvbXBhcmUg5q+U6L6D5ZmoXHJcbiAgICogQHBhcmFtIGVyck1lc3NhZ2UgIOmUmeivr+aPkOekulxyXG4gICAqL1xyXG4gIHR3b0NvbnRyb2woXHJcbiAgICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSB8ICgoKSA9PiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSksXHJcbiAgICBvdGhlckZpZWxkOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHwgc3RyaW5nLFxyXG4gICAgY29tcGFyZTogKHYxOiBOelNhZmVBbnksIHYyOiBOelNhZmVBbnkpID0+IGJvb2xlYW4sXHJcbiAgICBlcnJNZXNzYWdlOiBWYWxpZGF0aW9uRXJyb3JzXHJcbiAgKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgY29uc3QgZm4gPSBOenhVdGlscy5pc0Z1bmN0aW9uKGZvcm0pID8gZm9ybSA6ICgpID0+IGZvcm07XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgICAgaWYgKCFjb250cm9sPy52YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBvdGhlciA9IGZuKCkuZ2V0KG90aGVyRmllbGQpO1xyXG4gICAgICBpZiAoIW90aGVyPy52YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29tcGFyZShvdGhlcj8udmFsdWUsIGNvbnRyb2w/LnZhbHVlKSkge1xyXG4gICAgICAgIGlmICghb3RoZXIudmFsaWQpIHtcclxuICAgICAgICAgIG90aGVyLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVyck1lc3NhZ2U7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Lik5Liq5a2X5q6155u4562J6aqM6K+BXHJcbiAgICogQHBhcmFtIGZvcm0g6KGo5Y2VXHJcbiAgICogQHBhcmFtIG90aGVyRmllbGQg5Y+m5LiA5Liq6KKr6aqM6K+B55qE5a2X5q615ZCNXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug5o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgZXF1YWxDb250cm9sKFxyXG4gICAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCB8IFVudHlwZWRGb3JtQXJyYXkgfCAoKCkgPT4gVW50eXBlZEZvcm1Hcm91cCB8IFVudHlwZWRGb3JtQXJyYXkpLFxyXG4gICAgb3RoZXJGaWVsZDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiB8IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZ1xyXG4gICk6IFZhbGlkYXRvckZuIHtcclxuICAgIGNvbnN0IGVyck1lc3NhZ2UgPSB7IGVxdWFsVmFsaWRhdG9yOiB7IG1lc3NhZ2UgfSB9O1xyXG4gICAgcmV0dXJuIHRoaXMudHdvQ29udHJvbChmb3JtLCBvdGhlckZpZWxkLCAodjEsIHYyKSA9PiB2MSA9PT0gdjIsIGVyck1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aSn5LqO5Y+m5LiA5Liq5a2X5q616aqM6K+BXHJcbiAgICogQHBhcmFtIGZvcm0g6KGo5Y2VXHJcbiAgICogQHBhcmFtIG90aGVyRmllbGQg5Y+m5LiA5Liq6KKr6aqM6K+B55qE5a2X5q615ZCNXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug5o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgZ3RDb250cm9sKGZvcm06IFVudHlwZWRGb3JtR3JvdXAgfCBVbnR5cGVkRm9ybUFycmF5LCBvdGhlckZpZWxkOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHwgc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICBjb25zdCBlcnJNZXNzYWdlID0geyBndFZhbGlkYXRvcjogeyBtZXNzYWdlIH0gfTtcclxuICAgIHJldHVybiB0aGlzLnR3b0NvbnRyb2woZm9ybSwgb3RoZXJGaWVsZCwgKHYxLCB2MikgPT4gTnVtYmVyKHYxKSA+IE51bWJlcih2MiksIGVyck1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aSn5LqO562J5LqO5Y+m5LiA5Liq5a2X5q616aqM6K+BXHJcbiAgICogQHBhcmFtIGZvcm0g6KGo5Y2VXHJcbiAgICogQHBhcmFtIG90aGVyRmllbGQg5Y+m5LiA5Liq6KKr6aqM6K+B55qE5a2X5q615ZCNXHJcbiAgICogQHBhcmFtIG1lc3NhZ2Ug5o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgZ3RlQ29udHJvbChcclxuICAgIGZvcm06IFVudHlwZWRGb3JtR3JvdXAgfCBVbnR5cGVkRm9ybUFycmF5IHwgKCgpID0+IFVudHlwZWRGb3JtR3JvdXAgfCBVbnR5cGVkRm9ybUFycmF5KSxcclxuICAgIG90aGVyRmllbGQ6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gfCBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmdcclxuICApOiBWYWxpZGF0b3JGbiB7XHJcbiAgICBjb25zdCBlcnJNZXNzYWdlID0geyBndGVWYWxpZGF0b3I6IHsgbWVzc2FnZSB9IH07XHJcbiAgICByZXR1cm4gdGhpcy50d29Db250cm9sKGZvcm0sIG90aGVyRmllbGQsICh2MSwgdjIpID0+IE51bWJlcih2MSkgPj0gTnVtYmVyKHYyKSwgZXJyTWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsI/kuo7kuo7lj6bkuIDkuKrlrZfmrrXpqozor4FcclxuICAgKiBAcGFyYW0gZm9ybSDooajljZVcclxuICAgKiBAcGFyYW0gb3RoZXJGaWVsZCDlj6bkuIDkuKrooqvpqozor4HnmoTlrZfmrrXlkI1cclxuICAgKiBAcGFyYW0gbWVzc2FnZSDmj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICBsdENvbnRyb2woXHJcbiAgICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSB8ICgoKSA9PiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSksXHJcbiAgICBvdGhlckZpZWxkOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHwgc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nXHJcbiAgKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgY29uc3QgZXJyTWVzc2FnZSA9IHsgbHRWYWxpZGF0b3I6IHsgbWVzc2FnZSB9IH07XHJcbiAgICByZXR1cm4gdGhpcy50d29Db250cm9sKGZvcm0sIG90aGVyRmllbGQsICh2MSwgdjIpID0+IE51bWJlcih2MSkgPCBOdW1iZXIodjIpLCBlcnJNZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWwj+S6juetieS6juWPpuS4gOS4quWtl+autemqjOivgVxyXG4gICAqIEBwYXJhbSBmb3JtIOihqOWNlVxyXG4gICAqIEBwYXJhbSBvdGhlckZpZWxkIOWPpuS4gOS4quiiq+mqjOivgeeahOWtl+auteWQjVxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOaPkOekuuS/oeaBr1xyXG4gICAqL1xyXG4gIGx0ZUNvbnRyb2woXHJcbiAgICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSB8ICgoKSA9PiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSksXHJcbiAgICBvdGhlckZpZWxkOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+IHwgc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nXHJcbiAgKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgY29uc3QgZXJyTWVzc2FnZSA9IHsgbHRlVmFsaWRhdG9yOiB7IG1lc3NhZ2UgfSB9O1xyXG4gICAgcmV0dXJuIHRoaXMudHdvQ29udHJvbChmb3JtLCBvdGhlckZpZWxkLCAodjEsIHYyKSA9PiBOdW1iZXIodjEpIDw9IE51bWJlcih2MiksIGVyck1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZSv5LiA6aqM6K+BXHJcbiAgICogQHBhcmFtIGZvcm1cclxuICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAqL1xyXG4gIHVuaXF1ZShmb3JtOiBVbnR5cGVkRm9ybUdyb3VwIHwgVW50eXBlZEZvcm1BcnJheSwgbWVzc2FnZTogc3RyaW5nID0gJ+S4jeWFgeiuuOmHjeWkjScpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgICAgaWYgKCFjb250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChjb25zdCBjIGluIGZvcm0uY29udHJvbHMpIHtcclxuICAgICAgICBjb25zdCBjdGwgPSBmb3JtLmdldChjKTtcclxuICAgICAgICBpZiAoY29udHJvbCA9PT0gY3RsKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT09IGN0bD8udmFsdWUpIHtcclxuICAgICAgICAgIHJldHVybiB7IHVuaXF1ZVZhbGlkYXRvcjogeyBtZXNzYWdlIH0gfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE56eEZvcm1VdGlscyA9IG5ldyBGb3JtVXRpbHNDbGFzcygpO1xyXG4iXX0=