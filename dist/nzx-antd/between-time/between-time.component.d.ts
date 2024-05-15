import { ChangeDetectorRef, EventEmitter, TemplateRef } from '@angular/core';
import { NzSafeAny, NzStatus } from 'ng-zorro-antd/core/types';
import { ControlValueAccessor } from '@angular/forms';
import { NzxBetweenComponent } from '@freezesoul/nzx-antd/between';
import { DatetimeValueType, DisabledDateType } from '@freezesoul/nzx-antd/between-datetime';
import * as i0 from "@angular/core";
export declare class NzxBetweenTimeComponent extends NzxBetweenComponent implements ControlValueAccessor {
    protected cdr: ChangeDetectorRef;
    nzxValue: DatetimeValueType;
    get nzDefaultOpenValue(): Date;
    /**
     * 开始字段重命名
     */
    nzxStartReName: string;
    /**
     * 结束字段重命名
     */
    nzxEndReName: string;
    /**
     * 控件id-开始
     */
    nzxStartId: string | null;
    /**
     * 设置校验状态-开始
     */
    nzxStartStatus: NzStatus;
    /**
     * 小时选项间隔-开始
     */
    nzxStartHourStep: number;
    /**
     * 分钟选项间隔-开始
     */
    nzxStartMinuteStep: number;
    /**
     * 秒选项间隔-开始
     */
    nzxStartSecondStep: number;
    /**
     * 清除按钮的提示文案-开始
     */
    nzxStartClearText?: string;
    /**
     *  此刻按钮文本
     */
    nzxStartNowText?: string;
    /**
     * 确认按钮文本
     */
    nzxStartOkText?: string;
    /**
     * 弹出层类名
     */
    nzxStartPopupClassName?: string;
    /**
     * 没有值的时候显示的内容
     */
    nzxStartPlaceholder: string;
    /**
     * 选择框底部显示自定义的内容
     */
    nzxStartAddOn?: TemplateRef<void>;
    /**
     * 当 [ngModel] 不存在时，可以设置面板打开时默认选中的值
     */
    nzxStartDefaultOpenValue?: Date;
    /**
     * 展示的时间格式
     */
    nzFormat: string;
    /**
     * 使用12小时制，为true时format默认为h:mm:ss a
     */
    nzxStartUse12Hours: boolean;
    /**
     * 自定义的后缀图标
     */
    nzxStartSuffixIcon?: string | TemplateRef<NzSafeAny>;
    /**
     * 隐藏禁止选择的选项
     */
    nzxStartHideDisabledOptions?: boolean;
    /**
     * 是否展示清除按钮
     */
    nzxStartAllowEmpty?: boolean;
    /**
     * 自动获取焦点
     */
    nzxStartAutoFocus?: boolean;
    /**
     *  浮层是否应带有背景板
     */
    nzxStartBackdrop?: boolean;
    /**
     * 面板打开/关闭事件
     */
    readonly nzxStartOpenChange: EventEmitter<boolean>;
    /**
     * 控件id-结束
     */
    nzxEndId: string | null;
    /**
     * 设置校验状态-结束
     */
    nzxEndStatus: NzStatus;
    /**
     * 小时选项间隔-结束
     */
    nzxEndHourStep?: number;
    /**
     * 分钟选项间隔-结束
     */
    nzxEndMinuteStep?: number;
    /**
     * 秒选项间隔-结束
     */
    nzxEndSecondStep?: number;
    /**
     * 清除按钮的提示文案-结束
     */
    nzxEndClearText?: string;
    /**
     *  此刻按钮文本
     */
    nzxEndNowText?: string;
    /**
     * 确认按钮文本
     */
    nzxEndOkText?: string;
    /**
     * 弹出层类名
     */
    nzxEndPopupClassName?: string;
    /**
     * 没有值的时候显示的内容
     */
    nzxEndPlaceholder: string;
    /**
     * 选择框底部显示自定义的内容
     */
    nzxEndAddOn?: TemplateRef<void>;
    /**
     * 当 [ngModel] 不存在时，可以设置面板打开时默认选中的值
     */
    nzxEndDefaultOpenValue?: Date;
    /**
     * 使用12小时制，为true时format默认为h:mm:ss a
     */
    nzxEndUse12Hours: boolean;
    /**
     * 自定义的后缀图标
     */
    nzxEndSuffixIcon?: string | TemplateRef<NzSafeAny>;
    /**
     * 隐藏禁止选择的选项
     */
    nzxEndHideDisabledOptions?: boolean;
    /**
     * 是否展示清除按钮
     */
    nzxEndAllowEmpty?: boolean;
    /**
     * 自动获取焦点
     */
    nzxEndAutoFocus?: boolean;
    /**
     *  浮层是否应带有背景板
     */
    nzxEndBackdrop?: boolean;
    /**
     * 面板打开/关闭事件
     */
    readonly nzxEndOpenChange: EventEmitter<boolean>;
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
    nzxStartDisabledHours: () => number[];
    nzxStartDisabledMinutes: (hour: number) => number[];
    nzxStartDisabledSeconds: (hour: number, minute: number) => number[];
    nzxEndDisabledHours: () => number[];
    nzxEndDisabledMinutes: (hour: number) => number[];
    nzxEndDisabledSeconds: (hour: number, minute: number) => number[];
    constructor(cdr: ChangeDetectorRef);
    ngModelChange(): void;
    writeValue(value: DatetimeValueType): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (_: DatetimeValueType) => void): void;
    registerOnTouched(fn: () => void): void;
    onChange: (value: DatetimeValueType) => void;
    onTouched: () => void;
    private getDefaultMinValue;
    private getDefaultMaxValue;
    /**
     * 获取禁用的小时
     * @param minDateTime 最小时间值
     * @param maxDateTime 最大时间值
     * @private
     */
    private getDisabledHour;
    /**
     * 获取禁用的分钟
     * @param hour 当前小时
     * @param minDateTime 最小时间值
     * @param maxDateTime 最大时间值
     * @private
     */
    private getDisabledMinutes;
    /**
     * 获取禁用的秒数
     * @param hour 当前小时
     * @param minute 当前分钟
     * @param minDateTime 最小时间值
     * @param maxDateTime 最大时间值
     * @private
     */
    private getDisabledSeconds;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxBetweenTimeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxBetweenTimeComponent, "nzx-between-time", never, { "nzxStartReName": { "alias": "nzxStartReName"; "required": false; }; "nzxEndReName": { "alias": "nzxEndReName"; "required": false; }; "nzxStartId": { "alias": "nzxStartId"; "required": false; }; "nzxStartStatus": { "alias": "nzxStartStatus"; "required": false; }; "nzxStartHourStep": { "alias": "nzxStartHourStep"; "required": false; }; "nzxStartMinuteStep": { "alias": "nzxStartMinuteStep"; "required": false; }; "nzxStartSecondStep": { "alias": "nzxStartSecondStep"; "required": false; }; "nzxStartClearText": { "alias": "nzxStartClearText"; "required": false; }; "nzxStartNowText": { "alias": "nzxStartNowText"; "required": false; }; "nzxStartOkText": { "alias": "nzxStartOkText"; "required": false; }; "nzxStartPopupClassName": { "alias": "nzxStartPopupClassName"; "required": false; }; "nzxStartPlaceholder": { "alias": "nzxStartPlaceholder"; "required": false; }; "nzxStartAddOn": { "alias": "nzxStartAddOn"; "required": false; }; "nzxStartDefaultOpenValue": { "alias": "nzxStartDefaultOpenValue"; "required": false; }; "nzFormat": { "alias": "nzFormat"; "required": false; }; "nzxStartUse12Hours": { "alias": "nzxStartUse12Hours"; "required": false; }; "nzxStartSuffixIcon": { "alias": "nzxStartSuffixIcon"; "required": false; }; "nzxStartHideDisabledOptions": { "alias": "nzxStartHideDisabledOptions"; "required": false; }; "nzxStartAllowEmpty": { "alias": "nzxStartAllowEmpty"; "required": false; }; "nzxStartAutoFocus": { "alias": "nzxStartAutoFocus"; "required": false; }; "nzxStartBackdrop": { "alias": "nzxStartBackdrop"; "required": false; }; "nzxEndId": { "alias": "nzxEndId"; "required": false; }; "nzxEndStatus": { "alias": "nzxEndStatus"; "required": false; }; "nzxEndHourStep": { "alias": "nzxEndHourStep"; "required": false; }; "nzxEndMinuteStep": { "alias": "nzxEndMinuteStep"; "required": false; }; "nzxEndSecondStep": { "alias": "nzxEndSecondStep"; "required": false; }; "nzxEndClearText": { "alias": "nzxEndClearText"; "required": false; }; "nzxEndNowText": { "alias": "nzxEndNowText"; "required": false; }; "nzxEndOkText": { "alias": "nzxEndOkText"; "required": false; }; "nzxEndPopupClassName": { "alias": "nzxEndPopupClassName"; "required": false; }; "nzxEndPlaceholder": { "alias": "nzxEndPlaceholder"; "required": false; }; "nzxEndAddOn": { "alias": "nzxEndAddOn"; "required": false; }; "nzxEndDefaultOpenValue": { "alias": "nzxEndDefaultOpenValue"; "required": false; }; "nzxEndUse12Hours": { "alias": "nzxEndUse12Hours"; "required": false; }; "nzxEndSuffixIcon": { "alias": "nzxEndSuffixIcon"; "required": false; }; "nzxEndHideDisabledOptions": { "alias": "nzxEndHideDisabledOptions"; "required": false; }; "nzxEndAllowEmpty": { "alias": "nzxEndAllowEmpty"; "required": false; }; "nzxEndAutoFocus": { "alias": "nzxEndAutoFocus"; "required": false; }; "nzxEndBackdrop": { "alias": "nzxEndBackdrop"; "required": false; }; "startMinDateTime": { "alias": "startMinDateTime"; "required": false; }; "endMaxDateTime": { "alias": "endMaxDateTime"; "required": false; }; "startMaxDateTime": { "alias": "startMaxDateTime"; "required": false; }; "endMinDateTime": { "alias": "endMinDateTime"; "required": false; }; }, { "nzxStartOpenChange": "nzxStartOpenChange"; "nzxEndOpenChange": "nzxEndOpenChange"; }, never, never, false, never>;
}
