import { AbstractControl, UntypedFormArray, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
/**
 * 表单工具
 */
export declare class FormUtilsClass {
    /**
     * 遍历表单控件
     * @param form 表单或者表单元素
     * @param callback 回调函数
     */
    forEachFormControl(form: AbstractControl, callback: (ctrl: AbstractControl) => void): void;
    /**
     * 执行验证
     * @param form 表单
     * @param opts 配置
     */
    validate(form: AbstractControl, opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        updateValueAndValidity?: boolean;
    }): boolean;
    /**
     * 清空错误信息
     */
    clearError(form: AbstractControl): void;
    /**
     * 获取错误信息
     * @param control
     */
    getMessage(control: AbstractControl): string | null;
    /**
     * 必填验证
     * @param message 错误信息
     * @param hasValue 是否有值函数判断
     */
    required<T = NzSafeAny>(message?: string, hasValue?: (value: T) => boolean): ValidatorFn;
    /**
     * 根据指定函数验证
     * @param operator 操作函数
     * @param errMessage 错误信息
     */
    singleValidator<T>(operator: (value: T) => boolean, errMessage: ValidationErrors): ValidatorFn;
    /**
     * 根据正则表达式验证
     * @param exp 正则表达式
     * @param message 错误信息
     */
    pattern(exp: RegExp | string, message: string): ValidatorFn;
    /**
     * 小于验证
     * @param num 数字
     * @param message 错误信息
     */
    lt(num: number, message: string): ValidatorFn;
    /**
     * 小于等于验证
     * @param num 数字
     * @param message 错误信息
     */
    lte(num: number, message: string): ValidatorFn;
    /**
     * 大于验证
     * @param num 数字
     * @param message 错误信息
     */
    gt(num: number, message: string): ValidatorFn;
    /**
     * 大于等于验证
     * @param num 数字
     * @param message 错误信息
     */
    gte(num: number, message: string): ValidatorFn;
    /**
     * 包含指定字符串验证
     * @param str 字符串
     * @param ignore 忽略大小写
     * @param message 错误信息
     */
    contains(str: string, ignore: boolean, message: string): ValidatorFn;
    /**
     * min <= x <= max 验证
     * @param min 最小值
     * @param max 最大值
     * @param message 错误信息
     */
    between(min: number, max: number, message: string): ValidatorFn;
    /**
     * 数字校验
     * @param minus 是否允许负数
     * @param fraction 保留小数有效数字位数
     * @param message 错误提示信息
     */
    number(minus?: boolean, fraction?: number, message?: string): ValidatorFn;
    /**
     * 校验手机号（中国）
     * @param message 错误提示信息
     */
    mobile(message?: string): ValidatorFn;
    /**
     * 校验邮箱
     * @param message 错误提示信息
     */
    email(message?: string): ValidatorFn;
    /**
     * 校验ip
     * @param message 错误提示信息
     */
    ip(message?: string): ValidatorFn;
    /**
     * 校验url,支持ip v4, ip v6
     * @param message 错误提示信息
     */
    url(message?: string): ValidatorFn;
    /**
     * 校验中文
     * @param message 错误提示信息
     */
    chinese(message?: string): ValidatorFn;
    /**
     * 验证两个字段
     * @param form 表单
     * @param otherField 另一个被验证的字段名称
     * @param compare 比较器
     * @param errMessage  错误提示
     */
    twoControl(form: UntypedFormGroup | UntypedFormArray | (() => UntypedFormGroup | UntypedFormArray), otherField: Array<string | number> | string, compare: (v1: NzSafeAny, v2: NzSafeAny) => boolean, errMessage: ValidationErrors): ValidatorFn;
    /**
     * 两个字段相等验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    equalControl(form: UntypedFormGroup | UntypedFormArray | (() => UntypedFormGroup | UntypedFormArray), otherField: Array<string | number> | string, message: string): ValidatorFn;
    /**
     * 大于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    gtControl(form: UntypedFormGroup | UntypedFormArray, otherField: Array<string | number> | string, message: string): ValidatorFn;
    /**
     * 大于等于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    gteControl(form: UntypedFormGroup | UntypedFormArray | (() => UntypedFormGroup | UntypedFormArray), otherField: Array<string | number> | string, message: string): ValidatorFn;
    /**
     * 小于于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    ltControl(form: UntypedFormGroup | UntypedFormArray | (() => UntypedFormGroup | UntypedFormArray), otherField: Array<string | number> | string, message: string): ValidatorFn;
    /**
     * 小于等于另一个字段验证
     * @param form 表单
     * @param otherField 另一个被验证的字段名
     * @param message 提示信息
     */
    lteControl(form: UntypedFormGroup | UntypedFormArray | (() => UntypedFormGroup | UntypedFormArray), otherField: Array<string | number> | string, message: string): ValidatorFn;
    /**
     * 唯一验证
     * @param form
     * @param message
     */
    unique(form: UntypedFormGroup | UntypedFormArray, message?: string): ValidatorFn;
}
export declare const NzxFormUtils: FormUtilsClass;
