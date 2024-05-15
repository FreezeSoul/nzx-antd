import { ChangeDetectorRef, EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DisabledTimeFn, CompatibleDate, SupportTimeOptions, NzDateMode, DisabledTimeConfig } from 'ng-zorro-antd/date-picker';
import { FunctionProp, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerI18nInterface } from 'ng-zorro-antd/i18n';
import { NzxBetweenComponent } from '@xmagic/nzx-antd/between';
import { DatetimeValueType, DisabledDateType } from './datetime-utils';
import * as i0 from "@angular/core";
/**
 * 包含开始日期和结束日期两个日期控件，默认实现开始时间小于结束日期，也可以设置日期的最大值和最小值。
 *
 * 绑定的表单数据为 `{ start: Date, end: Date }`，修改属`start`和`end`属性名称可以使用`nzxStartReName`和`nzxEndReName`。
 */
export declare class NzxBetweenDatetimeComponent extends NzxBetweenComponent implements ControlValueAccessor {
    protected cdr: ChangeDetectorRef;
    nzxValue: DatetimeValueType;
    /**
     * 默认配置
     */
    readonly defaultDisabledTime: DisabledTimeConfig;
    nzMode?: NzDateMode;
    /**
     * 开始字段Placeholder
     */
    nzxStartPlaceholder: string | string[];
    /**
     * 结束字段Placeholder
     */
    nzxEndPlaceholder: string | string[];
    /**
     * 开始字段重命名
     */
    nzxStartReName: string;
    /**
     * 结束字段重命名
     */
    nzxEndReName: string;
    /**
     * 组件内部 input 的 id 值
     */
    nzxStartId?: string;
    /**
     * 组件内部 input 的 id 值
     */
    nzxEndId?: string;
    /**
     * 是否显示清除按钮
     */
    nzxStartAllowClear?: boolean;
    /**
     * 是否显示清除按钮
     */
    nzAllowClear: boolean;
    /**
     * 是否显示结束清除按钮
     */
    nzxEndAllowClear?: boolean;
    /**
     * 自动获取焦点
     */
    nzxStartAutoFocus?: boolean;
    /**
     * 自动获取焦点
     */
    nzxEndAutoFocus?: boolean;
    /**
     * 浮层是否应带有背景板
     */
    nzxStartBackdrop?: boolean;
    /**
     * 浮层是否应带有背景板
     */
    nzxEndBackdrop?: boolean;
    /**
     * 默认面板日期
     */
    nzxStartDefaultPickerValue?: Date;
    /**
     * 默认面板日期
     */
    nzxEndDefaultPickerValue?: Date;
    /**
     * 显示此刻-开始
     */
    nzxStartShowNow: boolean;
    /**
     * 显示此刻-结束
     */
    nzxEndShowNow: boolean;
    /**
     * 显示今天-开始和结束同时生效
     */
    nzShowToday: boolean;
    /**
     * 显示今天-开始
     */
    nzxStartShowToday?: boolean;
    /**
     * 显示今天-结束
     */
    nzxEndShowToday?: boolean;
    /**
     * 显示时间选择器-开始和结束同时生效
     */
    nzShowTime: SupportTimeOptions | boolean;
    /**
     * 显示时间选择器-开始
     */
    nzxStartShowTime?: SupportTimeOptions | boolean;
    /**
     * 显示时间选择器-结束
     */
    nzxEndShowTime?: SupportTimeOptions | boolean;
    /**
     * 额外的弹出日历 className
     */
    nzxStartDropdownClassName?: string;
    /**
     * 额外的弹出日历 className
     */
    nzxEndDropdownClassName?: string;
    /**
     * 展示的日期格式，见nzFormat特别说明
     */
    nzFormat?: string;
    /**
     * 为 input 标签设置只读属性（避免在移动设备上触发小键盘）
     */
    nzxStartInputReadOnly?: boolean;
    /**
     * 为 input 标签设置只读属性（避免在移动设备上触发小键盘）
     */
    nzxEndInputReadOnly?: boolean;
    /**
     * 国际化配置
     */
    nzLocale?: NzDatePickerI18nInterface;
    /**
     * 额外的弹出日历样式
     */
    nzxStartPopupStyle?: object;
    /**
     * 额外的弹出日历样式
     */
    nzxEndPopupStyle?: object;
    /**
     * 在面板中添加额外的页脚
     */
    nzxStartRenderExtraFooter?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<NzSafeAny> | string>;
    /**
     * 在面板中添加额外的页脚
     */
    nzxEndRenderExtraFooter?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<NzSafeAny> | string>;
    /**
     * 自定义的后缀图标
     */
    nzxStartSuffixIcon?: string | TemplateRef<NzSafeAny>;
    /**
     * 自定义的后缀图标
     */
    nzxEndSuffixIcon?: string | TemplateRef<NzSafeAny>;
    /**
     * 自定义渲染日期-开始
     */
    nzxStartDateRender?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<Date> | string>;
    /**
     * 自定义渲染日期-结束
     */
    nzxEndDateRender?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<Date> | string>;
    /**
     * 弹出日历和关闭日历的回调
     */
    nzxStartOnOpenChange: EventEmitter<boolean>;
    /**
     * 弹出日历和关闭日历的回调
     */
    nzxEndOnOpenChange: EventEmitter<boolean>;
    /**
     * OK按钮点击
     */
    nzxStartOnOk: EventEmitter<CompatibleDate | null>;
    /**
     * OK按钮点击
     */
    nzxEndOnOk: EventEmitter<CompatibleDate | null>;
    /**
     * 待选日期发生变化的回调
     */
    nzxStartOnCalendarChange: EventEmitter<(Date | null)[]>;
    /**
     * 待选日期发生变化的回调
     */
    nzxEndOnCalendarChange: EventEmitter<(Date | null)[]>;
    /**
     * 待选日期发生变化的回调
     */
    nzxStartOnPanelChange: EventEmitter<string | string[] | NzDateMode[]>;
    /**
     * 待选日期发生变化的回调
     */
    nzxEndOnPanelChange: EventEmitter<string | string[] | NzDateMode[]>;
    /**
     * 最小时间
     */
    startMinDateTime?: DisabledDateType;
    /**
     * 最大时间
     */
    endMaxDateTime?: DisabledDateType;
    /**
     * 最大时间
     */
    startMaxDateTime?: DisabledDateType;
    /**
     * 最小时间
     */
    endMinDateTime?: DisabledDateType;
    private get _defaultStartMaxDateTime();
    private get _defaultEndMinDateTime();
    get startDisabledTime(): boolean | SupportTimeOptions;
    get endDisabledTime(): boolean | SupportTimeOptions;
    nzxStartDisabledTime: DisabledTimeFn;
    nzxEndDisabledTime?: DisabledTimeFn;
    /**
     * 获取禁用的时间部分
     * @param date 当前日期
     * @param minValue 最小日期值
     * @param maxValue 最大日期值
     * @private
     */
    private getDisabledTime;
    /**
     * 不可选择的日期
     */
    nzxStartDisabledDate: (current: Date) => boolean;
    /**
     * 不可选择的日期
     */
    nzxEndDisabledDate: (current: Date) => boolean;
    private getDisabledMaxDate;
    private getDisabledMinDate;
    constructor(cdr: ChangeDetectorRef);
    ngModelChange(): void;
    writeValue(value: DatetimeValueType): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (_: DatetimeValueType) => void): void;
    registerOnTouched(fn: () => void): void;
    onChange: (value: DatetimeValueType) => void;
    onTouched: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxBetweenDatetimeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxBetweenDatetimeComponent, "nzx-between-datetime", ["nzxBetweenDatetime"], { "nzMode": { "alias": "nzMode"; "required": false; }; "nzxStartPlaceholder": { "alias": "nzxStartPlaceholder"; "required": false; }; "nzxEndPlaceholder": { "alias": "nzxEndPlaceholder"; "required": false; }; "nzxStartReName": { "alias": "nzxStartReName"; "required": false; }; "nzxEndReName": { "alias": "nzxEndReName"; "required": false; }; "nzxStartId": { "alias": "nzxStartId"; "required": false; }; "nzxEndId": { "alias": "nzxEndId"; "required": false; }; "nzxStartAllowClear": { "alias": "nzxStartAllowClear"; "required": false; }; "nzAllowClear": { "alias": "nzAllowClear"; "required": false; }; "nzxEndAllowClear": { "alias": "nzxEndAllowClear"; "required": false; }; "nzxStartAutoFocus": { "alias": "nzxStartAutoFocus"; "required": false; }; "nzxEndAutoFocus": { "alias": "nzxEndAutoFocus"; "required": false; }; "nzxStartBackdrop": { "alias": "nzxStartBackdrop"; "required": false; }; "nzxEndBackdrop": { "alias": "nzxEndBackdrop"; "required": false; }; "nzxStartDefaultPickerValue": { "alias": "nzxStartDefaultPickerValue"; "required": false; }; "nzxEndDefaultPickerValue": { "alias": "nzxEndDefaultPickerValue"; "required": false; }; "nzxStartShowNow": { "alias": "nzxStartShowNow"; "required": false; }; "nzxEndShowNow": { "alias": "nzxEndShowNow"; "required": false; }; "nzShowToday": { "alias": "nzShowToday"; "required": false; }; "nzxStartShowToday": { "alias": "nzxStartShowToday"; "required": false; }; "nzxEndShowToday": { "alias": "nzxEndShowToday"; "required": false; }; "nzShowTime": { "alias": "nzShowTime"; "required": false; }; "nzxStartShowTime": { "alias": "nzxStartShowTime"; "required": false; }; "nzxEndShowTime": { "alias": "nzxEndShowTime"; "required": false; }; "nzxStartDropdownClassName": { "alias": "nzxStartDropdownClassName"; "required": false; }; "nzxEndDropdownClassName": { "alias": "nzxEndDropdownClassName"; "required": false; }; "nzFormat": { "alias": "nzFormat"; "required": false; }; "nzxStartInputReadOnly": { "alias": "nzxStartInputReadOnly"; "required": false; }; "nzxEndInputReadOnly": { "alias": "nzxEndInputReadOnly"; "required": false; }; "nzLocale": { "alias": "nzLocale"; "required": false; }; "nzxStartPopupStyle": { "alias": "nzxStartPopupStyle"; "required": false; }; "nzxEndPopupStyle": { "alias": "nzxEndPopupStyle"; "required": false; }; "nzxStartRenderExtraFooter": { "alias": "nzxStartRenderExtraFooter"; "required": false; }; "nzxEndRenderExtraFooter": { "alias": "nzxEndRenderExtraFooter"; "required": false; }; "nzxStartSuffixIcon": { "alias": "nzxStartSuffixIcon"; "required": false; }; "nzxEndSuffixIcon": { "alias": "nzxEndSuffixIcon"; "required": false; }; "nzxStartDateRender": { "alias": "nzxStartDateRender"; "required": false; }; "nzxEndDateRender": { "alias": "nzxEndDateRender"; "required": false; }; "startMinDateTime": { "alias": "startMinDateTime"; "required": false; }; "endMaxDateTime": { "alias": "endMaxDateTime"; "required": false; }; "startMaxDateTime": { "alias": "startMaxDateTime"; "required": false; }; "endMinDateTime": { "alias": "endMinDateTime"; "required": false; }; }, { "nzxStartOnOpenChange": "nzxStartOnOpenChange"; "nzxEndOnOpenChange": "nzxEndOnOpenChange"; "nzxStartOnOk": "nzxStartOnOk"; "nzxEndOnOk": "nzxEndOnOk"; "nzxStartOnCalendarChange": "nzxStartOnCalendarChange"; "nzxEndOnCalendarChange": "nzxEndOnCalendarChange"; "nzxStartOnPanelChange": "nzxStartOnPanelChange"; "nzxEndOnPanelChange": "nzxEndOnPanelChange"; }, never, never, false, never>;
}
