import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzxBetweenComponent } from '@freezesoul/nzx-antd/between';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import { getEndDate, getEndMonthDate, getEndWeekDate, getEndYearDate, getRealDateTime, getStartDate, getStartMonthDate, getStartWeekDate, getStartYearDate, getTimeValue } from './datetime-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@freezesoul/nzx-antd/between";
import * as i4 from "ng-zorro-antd/date-picker";
/**
 * 包含开始日期和结束日期两个日期控件，默认实现开始时间小于结束日期，也可以设置日期的最大值和最小值。
 *
 * 绑定的表单数据为 `{ start: Date, end: Date }`，修改属`start`和`end`属性名称可以使用`nzxStartReName`和`nzxEndReName`。
 */
export class NzxBetweenDatetimeComponent extends NzxBetweenComponent {
    cdr;
    nzxValue = {};
    /**
     * 默认配置
     */
    defaultDisabledTime = {
        nzDisabledHours: () => [],
        nzDisabledMinutes: () => [],
        nzDisabledSeconds: () => []
    };
    nzMode = 'date';
    /**
     * 开始字段Placeholder
     */
    nzxStartPlaceholder = '起始值';
    /**
     * 结束字段Placeholder
     */
    nzxEndPlaceholder = '结束值';
    /**
     * 开始字段重命名
     */
    nzxStartReName = 'start';
    /**
     * 结束字段重命名
     */
    nzxEndReName = 'end';
    /**
     * 组件内部 input 的 id 值
     */
    nzxStartId;
    /**
     * 组件内部 input 的 id 值
     */
    nzxEndId;
    /**
     * 是否显示清除按钮
     */
    nzxStartAllowClear;
    /**
     * 是否显示清除按钮
     */
    nzAllowClear = true;
    /**
     * 是否显示结束清除按钮
     */
    nzxEndAllowClear;
    /**
     * 自动获取焦点
     */
    nzxStartAutoFocus;
    /**
     * 自动获取焦点
     */
    nzxEndAutoFocus;
    /**
     * 浮层是否应带有背景板
     */
    nzxStartBackdrop;
    /**
     * 浮层是否应带有背景板
     */
    nzxEndBackdrop;
    /**
     * 默认面板日期
     */
    nzxStartDefaultPickerValue;
    /**
     * 默认面板日期
     */
    nzxEndDefaultPickerValue;
    /**
     * 显示此刻-开始
     */
    nzxStartShowNow = true;
    /**
     * 显示此刻-结束
     */
    nzxEndShowNow = true;
    /**
     * 显示今天-开始和结束同时生效
     */
    nzShowToday = true;
    /**
     * 显示今天-开始
     */
    nzxStartShowToday;
    /**
     * 显示今天-结束
     */
    nzxEndShowToday;
    /**
     * 显示时间选择器-开始和结束同时生效
     */
    nzShowTime = false;
    /**
     * 显示时间选择器-开始
     */
    nzxStartShowTime;
    /**
     * 显示时间选择器-结束
     */
    nzxEndShowTime;
    /**
     * 额外的弹出日历 className
     */
    nzxStartDropdownClassName;
    /**
     * 额外的弹出日历 className
     */
    nzxEndDropdownClassName;
    /**
     * 展示的日期格式，见nzFormat特别说明
     */
    nzFormat;
    /**
     * 为 input 标签设置只读属性（避免在移动设备上触发小键盘）
     */
    nzxStartInputReadOnly;
    /**
     * 为 input 标签设置只读属性（避免在移动设备上触发小键盘）
     */
    nzxEndInputReadOnly;
    /**
     * 国际化配置
     */
    nzLocale;
    /**
     * 额外的弹出日历样式
     */
    nzxStartPopupStyle;
    /**
     * 额外的弹出日历样式
     */
    nzxEndPopupStyle;
    /**
     * 在面板中添加额外的页脚
     */
    nzxStartRenderExtraFooter;
    /**
     * 在面板中添加额外的页脚
     */
    nzxEndRenderExtraFooter;
    /**
     * 自定义的后缀图标
     */
    nzxStartSuffixIcon;
    /**
     * 自定义的后缀图标
     */
    nzxEndSuffixIcon;
    /**
     * 自定义渲染日期-开始
     */
    nzxStartDateRender;
    /**
     * 自定义渲染日期-结束
     */
    nzxEndDateRender;
    /**
     * 弹出日历和关闭日历的回调
     */
    nzxStartOnOpenChange = new EventEmitter();
    /**
     * 弹出日历和关闭日历的回调
     */
    nzxEndOnOpenChange = new EventEmitter();
    /**
     * OK按钮点击
     */
    nzxStartOnOk = new EventEmitter();
    /**
     * OK按钮点击
     */
    nzxEndOnOk = new EventEmitter();
    /**
     * 待选日期发生变化的回调
     */
    nzxStartOnCalendarChange = new EventEmitter();
    /**
     * 待选日期发生变化的回调
     */
    nzxEndOnCalendarChange = new EventEmitter();
    /**
     * 待选日期发生变化的回调
     */
    nzxStartOnPanelChange = new EventEmitter();
    /**
     * 待选日期发生变化的回调
     */
    nzxEndOnPanelChange = new EventEmitter();
    /**
     * 最小时间
     */
    startMinDateTime;
    /**
     * 最大时间
     */
    endMaxDateTime;
    /**
     * 最大时间
     */
    startMaxDateTime;
    /**
     * 最小时间
     */
    endMinDateTime;
    get _defaultStartMaxDateTime() {
        return this.nzxValue[this.nzxEndReName];
    }
    get _defaultEndMinDateTime() {
        return this.nzxValue[this.nzxStartReName];
    }
    get startDisabledTime() {
        return this.nzxStartShowTime == null ? this.nzShowTime : this.nzxStartShowTime;
    }
    get endDisabledTime() {
        return this.nzxEndShowTime == null ? this.nzShowTime : this.nzxEndShowTime;
    }
    nzxStartDisabledTime = current => {
        if (!this.startDisabledTime || !current) {
            return this.defaultDisabledTime;
        }
        const date = current;
        const minValue = getRealDateTime(date, this.startMinDateTime);
        const maxValue = getRealDateTime(date, this.startMaxDateTime === undefined ? this._defaultStartMaxDateTime : this.startMaxDateTime);
        if (!minValue && !maxValue) {
            return this.defaultDisabledTime;
        }
        return this.getDisabledTime(date, minValue, maxValue);
    };
    nzxEndDisabledTime = current => {
        if (!this.endDisabledTime || !current) {
            return this.defaultDisabledTime;
        }
        const date = current;
        const minValue = getRealDateTime(date, this.endMinDateTime === undefined ? this._defaultEndMinDateTime : this.endMinDateTime);
        const maxValue = getRealDateTime(date, this.endMaxDateTime);
        if (!minValue && !maxValue) {
            return this.defaultDisabledTime;
        }
        return this.getDisabledTime(date, minValue, maxValue);
    };
    /**
     * 获取禁用的时间部分
     * @param date 当前日期
     * @param minValue 最小日期值
     * @param maxValue 最大日期值
     * @private
     */
    getDisabledTime(date, minValue, maxValue) {
        const start = getTimeValue(date, minValue);
        let hours = [];
        let minutes = [];
        let seconds = [];
        if (start) {
            const equalsHour = start.hour === date.getHours();
            hours = NzxUtils.range(0, start.hour);
            minutes = equalsHour ? NzxUtils.range(0, start.minute) : [];
            seconds = equalsHour && start.minute === date.getMinutes() ? NzxUtils.range(0, start.second) : [];
        }
        const end = getTimeValue(date, maxValue);
        if (end) {
            const equalsHour = end.hour === date.getHours();
            hours = hours.concat(NzxUtils.range(end.hour + 1, 24));
            minutes = equalsHour ? minutes.concat(NzxUtils.range(end.minute + 1, 60)) : minutes;
            seconds =
                equalsHour && end.minute === date.getMinutes() ? seconds.concat(NzxUtils.range(end.second + 1, 60)) : seconds;
        }
        return {
            nzDisabledHours: () => hours,
            nzDisabledMinutes: hour => (hour === start?.hour || hour === end?.hour ? minutes : []),
            nzDisabledSeconds: (hour, minute) => (hour === start?.hour && minute === start?.minute) || (hour === end?.hour && minute === end?.minute)
                ? seconds
                : []
        };
    }
    /**
     * 不可选择的日期
     */
    nzxStartDisabledDate = date => {
        if (!date) {
            return false;
        }
        const minValue = getRealDateTime(date, this.startMinDateTime);
        const maxValue = getRealDateTime(date, this.startMaxDateTime === undefined ? this._defaultStartMaxDateTime : this.startMaxDateTime);
        if (!maxValue && !minValue) {
            return false;
        }
        // date < min
        if (minValue && this.getDisabledMinDate(date, minValue)) {
            return true;
        }
        // date > max
        if (maxValue && this.getDisabledMaxDate(date, maxValue)) {
            return true;
        }
        return false;
    };
    /**
     * 不可选择的日期
     */
    nzxEndDisabledDate = date => {
        if (!date) {
            return false;
        }
        const minValue = getRealDateTime(date, this.endMinDateTime === undefined ? this._defaultEndMinDateTime : this.endMinDateTime);
        const maxValue = getRealDateTime(date, this.endMaxDateTime);
        if (!maxValue && !minValue) {
            return false;
        }
        // date > max
        if (maxValue && this.getDisabledMaxDate(date, maxValue)) {
            return true;
        }
        // date < min
        if (minValue && this.getDisabledMinDate(date, minValue)) {
            return true;
        }
        return false;
    };
    getDisabledMaxDate(date, maxValue) {
        if (this.nzMode === 'date') {
            if (getStartDate(date) > maxValue.getTime()) {
                return true;
            }
        }
        else if (this.nzMode === 'week') {
            if (getStartWeekDate(date) > maxValue.getTime()) {
                return true;
            }
        }
        else if (this.nzMode === 'month') {
            if (getStartMonthDate(date) > maxValue.getTime()) {
                return true;
            }
        }
        else if (this.nzMode === 'year') {
            if (getStartYearDate(date) > maxValue.getTime()) {
                return true;
            }
        }
        else {
            return date > maxValue;
        }
        return false;
    }
    getDisabledMinDate(date, minValue) {
        if (this.nzMode === 'date') {
            if (minValue.getTime() > getEndDate(date)) {
                return true;
            }
        }
        else if (this.nzMode === 'week') {
            if (minValue.getTime() > getEndWeekDate(date)) {
                return true;
            }
        }
        else if (this.nzMode === 'month') {
            if (minValue.getTime() > getEndMonthDate(date)) {
                return true;
            }
        }
        else if (this.nzMode === 'year') {
            if (minValue.getTime() > getEndYearDate(date)) {
                return true;
            }
        }
        else {
            return minValue > date;
        }
        return false;
    }
    constructor(cdr) {
        super();
        this.cdr = cdr;
    }
    ngModelChange() {
        this.onChange(this.nzxValue);
    }
    writeValue(value) {
        this.nzxValue = value || {};
        this.cdr.markForCheck();
    }
    setDisabledState(isDisabled) {
        this.nzxDisabled = isDisabled;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onChange = () => null;
    onTouched = () => null;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxBetweenDatetimeComponent, selector: "nzx-between-datetime", inputs: { nzMode: "nzMode", nzxStartPlaceholder: "nzxStartPlaceholder", nzxEndPlaceholder: "nzxEndPlaceholder", nzxStartReName: "nzxStartReName", nzxEndReName: "nzxEndReName", nzxStartId: "nzxStartId", nzxEndId: "nzxEndId", nzxStartAllowClear: "nzxStartAllowClear", nzAllowClear: "nzAllowClear", nzxEndAllowClear: "nzxEndAllowClear", nzxStartAutoFocus: "nzxStartAutoFocus", nzxEndAutoFocus: "nzxEndAutoFocus", nzxStartBackdrop: "nzxStartBackdrop", nzxEndBackdrop: "nzxEndBackdrop", nzxStartDefaultPickerValue: "nzxStartDefaultPickerValue", nzxEndDefaultPickerValue: "nzxEndDefaultPickerValue", nzxStartShowNow: "nzxStartShowNow", nzxEndShowNow: "nzxEndShowNow", nzShowToday: "nzShowToday", nzxStartShowToday: "nzxStartShowToday", nzxEndShowToday: "nzxEndShowToday", nzShowTime: "nzShowTime", nzxStartShowTime: "nzxStartShowTime", nzxEndShowTime: "nzxEndShowTime", nzxStartDropdownClassName: "nzxStartDropdownClassName", nzxEndDropdownClassName: "nzxEndDropdownClassName", nzFormat: "nzFormat", nzxStartInputReadOnly: "nzxStartInputReadOnly", nzxEndInputReadOnly: "nzxEndInputReadOnly", nzLocale: "nzLocale", nzxStartPopupStyle: "nzxStartPopupStyle", nzxEndPopupStyle: "nzxEndPopupStyle", nzxStartRenderExtraFooter: "nzxStartRenderExtraFooter", nzxEndRenderExtraFooter: "nzxEndRenderExtraFooter", nzxStartSuffixIcon: "nzxStartSuffixIcon", nzxEndSuffixIcon: "nzxEndSuffixIcon", nzxStartDateRender: "nzxStartDateRender", nzxEndDateRender: "nzxEndDateRender", startMinDateTime: "startMinDateTime", endMaxDateTime: "endMaxDateTime", startMaxDateTime: "startMaxDateTime", endMinDateTime: "endMinDateTime" }, outputs: { nzxStartOnOpenChange: "nzxStartOnOpenChange", nzxEndOnOpenChange: "nzxEndOnOpenChange", nzxStartOnOk: "nzxStartOnOk", nzxEndOnOk: "nzxEndOnOk", nzxStartOnCalendarChange: "nzxStartOnCalendarChange", nzxEndOnCalendarChange: "nzxEndOnCalendarChange", nzxStartOnPanelChange: "nzxStartOnPanelChange", nzxEndOnPanelChange: "nzxEndOnPanelChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzxBetweenDatetimeComponent),
                multi: true
            }
        ], exportAs: ["nzxBetweenDatetime"], usesInheritance: true, ngImport: i0, template: "<nzx-between\r\n  [nzxDisabled]=\"nzxDisabled\"\r\n  [nzxStartDisabled]=\"nzxStartDisabled\"\r\n  [nzxEndDisabled]=\"nzxEndDisabled\"\r\n  [nzxSize]=\"nzxSize\"\r\n>\r\n  <ng-container\r\n    start\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxStartReName,\r\n          disabled: nzxStartDisabled != null ? nzxStartDisabled : nzxDisabled,\r\n          placeholder: nzxStartPlaceholder,\r\n          nzSuffixIcon: nzxStartSuffixIcon,\r\n          nzAllowClear: nzxStartAllowClear,\r\n          nzRenderExtraFooter: nzxStartRenderExtraFooter,\r\n          nzBackdrop: nzxStartBackdrop,\r\n          nzAutoFocus: nzxStartAutoFocus,\r\n          nzDateRender: nzxStartDateRender,\r\n          nzDefaultPickerValue: nzxStartDefaultPickerValue,\r\n          nzDisabledDate: nzxStartDisabledDate,\r\n          nzDisabledTime: nzxStartDisabledTime,\r\n          nzDropdownClassName: nzxStartDropdownClassName,\r\n          nzId: nzxStartId,\r\n          nzInputReadOnly: nzxStartInputReadOnly,\r\n          nzLocale: nzLocale,\r\n          nzPopupStyle: nzxStartPopupStyle,\r\n          nzShowNow: nzxStartShowNow,\r\n          nzShowTime: nzxStartShowTime,\r\n          nzShowToday: nzxStartShowToday,\r\n          nzOnOpenChange: nzxStartOnOpenChange,\r\n          nzOnOk: nzxStartOnOk,\r\n          nzOnCalendarChange: nzxStartOnCalendarChange,\r\n          nzOnPanelChange: nzxStartOnPanelChange\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n  <ng-container\r\n    end\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxEndReName,\r\n          disabled: nzxEndDisabled != null ? nzxEndDisabled : nzxDisabled,\r\n          placeholder: nzxEndPlaceholder,\r\n          nzSuffixIcon: nzxEndSuffixIcon,\r\n          nzAllowClear: nzxEndAllowClear,\r\n          nzRenderExtraFooter: nzxEndRenderExtraFooter,\r\n          nzBackdrop: nzxEndBackdrop,\r\n          nzAutoFocus: nzxEndAutoFocus,\r\n          nzDateRender: nzxEndDateRender,\r\n          nzDefaultPickerValue: nzxEndDefaultPickerValue,\r\n          nzDisabledDate: nzxEndDisabledDate,\r\n          nzDisabledTime: nzxEndDisabledTime,\r\n          nzDropdownClassName: nzxEndDropdownClassName,\r\n          nzId: nzxEndId,\r\n          nzInputReadOnly: nzxEndInputReadOnly,\r\n          nzLocale: nzLocale,\r\n          nzPopupStyle: nzxEndPopupStyle,\r\n          nzShowNow: nzxEndShowNow,\r\n          nzShowTime: nzxEndShowTime,\r\n          nzShowToday: nzxEndShowToday,\r\n          nzOnOpenChange: nzxEndOnOpenChange,\r\n          nzOnOk: nzxEndOnOk,\r\n          nzOnCalendarChange: nzxEndOnCalendarChange,\r\n          nzOnPanelChange: nzxEndOnPanelChange\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n</nzx-between>\r\n\r\n<ng-template #typeTemplate let-data>\r\n  <nz-date-picker\r\n    [(ngModel)]=\"nzxValue[data.dir]\"\r\n    (ngModelChange)=\"ngModelChange()\"\r\n    [nzDisabled]=\"data.disabled\"\r\n    [nzPlaceHolder]=\"data.placeholder\"\r\n    [nzSize]=\"nzxSize\"\r\n    [nzMode]=\"nzMode\"\r\n    [nzSuffixIcon]=\"data.nzSuffixIcon || 'calendar'\"\r\n    [nzAllowClear]=\"nzAllowClear || data.nzAllowClear\"\r\n    [nzRenderExtraFooter]=\"data.nzRenderExtraFooter\"\r\n    [nzBackdrop]=\"data.nzBackdrop\"\r\n    [nzAutoFocus]=\"data.nzAutoFocus\"\r\n    [nzDateRender]=\"data.nzDateRender\"\r\n    [nzDefaultPickerValue]=\"data.nzDefaultPickerValue\"\r\n    [nzDisabledDate]=\"data.nzDisabledDate\"\r\n    [nzDisabledTime]=\"data.nzDisabledTime\"\r\n    [nzDropdownClassName]=\"data.nzDropdownClassName\"\r\n    [nzFormat]=\"nzFormat\"\r\n    [nzId]=\"data.nzId\"\r\n    [nzInputReadOnly]=\"data.nzInputReadOnly\"\r\n    [nzLocale]=\"nzLocale\"\r\n    [nzPopupStyle]=\"data.nzPopupStyle\"\r\n    [nzShowNow]=\"data.nzShowNow\"\r\n    [nzShowTime]=\"data.nzShowTime || nzShowTime\"\r\n    [nzShowToday]=\"nzShowToday || data.nzShowToday\"\r\n    (nzOnOpenChange)=\"data.nzOnOpenChange.emit($event)\"\r\n    (nzOnOk)=\"data.nzOnOk.emit($event)\"\r\n    (nzOnCalendarChange)=\"data.nzOnCalendarChange.emit($event)\"\r\n    (nzOnPanelChange)=\"data.nzOnPanelChange.emit($event)\"\r\n  ></nz-date-picker>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.NzxBetweenComponent, selector: "nzx-between", inputs: ["nzxDisabled", "nzxSize", "nzxStartDisabled", "nzxEndDisabled"], exportAs: ["nzxBetween"] }, { kind: "component", type: i4.NzDatePickerComponent, selector: "nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker", inputs: ["nzAllowClear", "nzAutoFocus", "nzDisabled", "nzBorderless", "nzInputReadOnly", "nzInline", "nzOpen", "nzDisabledDate", "nzLocale", "nzPlaceHolder", "nzPopupStyle", "nzDropdownClassName", "nzSize", "nzStatus", "nzFormat", "nzDateRender", "nzDisabledTime", "nzRenderExtraFooter", "nzShowToday", "nzMode", "nzShowNow", "nzRanges", "nzDefaultPickerValue", "nzSeparator", "nzSuffixIcon", "nzBackdrop", "nzId", "nzPlacement", "nzShowWeekNumber", "nzShowTime"], outputs: ["nzOnPanelChange", "nzOnCalendarChange", "nzOnOk", "nzOnOpenChange"], exportAs: ["nzDatePicker"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-between-datetime', exportAs: 'nzxBetweenDatetime', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzxBetweenDatetimeComponent),
                            multi: true
                        }
                    ], template: "<nzx-between\r\n  [nzxDisabled]=\"nzxDisabled\"\r\n  [nzxStartDisabled]=\"nzxStartDisabled\"\r\n  [nzxEndDisabled]=\"nzxEndDisabled\"\r\n  [nzxSize]=\"nzxSize\"\r\n>\r\n  <ng-container\r\n    start\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxStartReName,\r\n          disabled: nzxStartDisabled != null ? nzxStartDisabled : nzxDisabled,\r\n          placeholder: nzxStartPlaceholder,\r\n          nzSuffixIcon: nzxStartSuffixIcon,\r\n          nzAllowClear: nzxStartAllowClear,\r\n          nzRenderExtraFooter: nzxStartRenderExtraFooter,\r\n          nzBackdrop: nzxStartBackdrop,\r\n          nzAutoFocus: nzxStartAutoFocus,\r\n          nzDateRender: nzxStartDateRender,\r\n          nzDefaultPickerValue: nzxStartDefaultPickerValue,\r\n          nzDisabledDate: nzxStartDisabledDate,\r\n          nzDisabledTime: nzxStartDisabledTime,\r\n          nzDropdownClassName: nzxStartDropdownClassName,\r\n          nzId: nzxStartId,\r\n          nzInputReadOnly: nzxStartInputReadOnly,\r\n          nzLocale: nzLocale,\r\n          nzPopupStyle: nzxStartPopupStyle,\r\n          nzShowNow: nzxStartShowNow,\r\n          nzShowTime: nzxStartShowTime,\r\n          nzShowToday: nzxStartShowToday,\r\n          nzOnOpenChange: nzxStartOnOpenChange,\r\n          nzOnOk: nzxStartOnOk,\r\n          nzOnCalendarChange: nzxStartOnCalendarChange,\r\n          nzOnPanelChange: nzxStartOnPanelChange\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n  <ng-container\r\n    end\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxEndReName,\r\n          disabled: nzxEndDisabled != null ? nzxEndDisabled : nzxDisabled,\r\n          placeholder: nzxEndPlaceholder,\r\n          nzSuffixIcon: nzxEndSuffixIcon,\r\n          nzAllowClear: nzxEndAllowClear,\r\n          nzRenderExtraFooter: nzxEndRenderExtraFooter,\r\n          nzBackdrop: nzxEndBackdrop,\r\n          nzAutoFocus: nzxEndAutoFocus,\r\n          nzDateRender: nzxEndDateRender,\r\n          nzDefaultPickerValue: nzxEndDefaultPickerValue,\r\n          nzDisabledDate: nzxEndDisabledDate,\r\n          nzDisabledTime: nzxEndDisabledTime,\r\n          nzDropdownClassName: nzxEndDropdownClassName,\r\n          nzId: nzxEndId,\r\n          nzInputReadOnly: nzxEndInputReadOnly,\r\n          nzLocale: nzLocale,\r\n          nzPopupStyle: nzxEndPopupStyle,\r\n          nzShowNow: nzxEndShowNow,\r\n          nzShowTime: nzxEndShowTime,\r\n          nzShowToday: nzxEndShowToday,\r\n          nzOnOpenChange: nzxEndOnOpenChange,\r\n          nzOnOk: nzxEndOnOk,\r\n          nzOnCalendarChange: nzxEndOnCalendarChange,\r\n          nzOnPanelChange: nzxEndOnPanelChange\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n</nzx-between>\r\n\r\n<ng-template #typeTemplate let-data>\r\n  <nz-date-picker\r\n    [(ngModel)]=\"nzxValue[data.dir]\"\r\n    (ngModelChange)=\"ngModelChange()\"\r\n    [nzDisabled]=\"data.disabled\"\r\n    [nzPlaceHolder]=\"data.placeholder\"\r\n    [nzSize]=\"nzxSize\"\r\n    [nzMode]=\"nzMode\"\r\n    [nzSuffixIcon]=\"data.nzSuffixIcon || 'calendar'\"\r\n    [nzAllowClear]=\"nzAllowClear || data.nzAllowClear\"\r\n    [nzRenderExtraFooter]=\"data.nzRenderExtraFooter\"\r\n    [nzBackdrop]=\"data.nzBackdrop\"\r\n    [nzAutoFocus]=\"data.nzAutoFocus\"\r\n    [nzDateRender]=\"data.nzDateRender\"\r\n    [nzDefaultPickerValue]=\"data.nzDefaultPickerValue\"\r\n    [nzDisabledDate]=\"data.nzDisabledDate\"\r\n    [nzDisabledTime]=\"data.nzDisabledTime\"\r\n    [nzDropdownClassName]=\"data.nzDropdownClassName\"\r\n    [nzFormat]=\"nzFormat\"\r\n    [nzId]=\"data.nzId\"\r\n    [nzInputReadOnly]=\"data.nzInputReadOnly\"\r\n    [nzLocale]=\"nzLocale\"\r\n    [nzPopupStyle]=\"data.nzPopupStyle\"\r\n    [nzShowNow]=\"data.nzShowNow\"\r\n    [nzShowTime]=\"data.nzShowTime || nzShowTime\"\r\n    [nzShowToday]=\"nzShowToday || data.nzShowToday\"\r\n    (nzOnOpenChange)=\"data.nzOnOpenChange.emit($event)\"\r\n    (nzOnOk)=\"data.nzOnOk.emit($event)\"\r\n    (nzOnCalendarChange)=\"data.nzOnCalendarChange.emit($event)\"\r\n    (nzOnPanelChange)=\"data.nzOnPanelChange.emit($event)\"\r\n  ></nz-date-picker>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzMode: [{
                type: Input
            }], nzxStartPlaceholder: [{
                type: Input
            }], nzxEndPlaceholder: [{
                type: Input
            }], nzxStartReName: [{
                type: Input
            }], nzxEndReName: [{
                type: Input
            }], nzxStartId: [{
                type: Input
            }], nzxEndId: [{
                type: Input
            }], nzxStartAllowClear: [{
                type: Input
            }], nzAllowClear: [{
                type: Input
            }], nzxEndAllowClear: [{
                type: Input
            }], nzxStartAutoFocus: [{
                type: Input
            }], nzxEndAutoFocus: [{
                type: Input
            }], nzxStartBackdrop: [{
                type: Input
            }], nzxEndBackdrop: [{
                type: Input
            }], nzxStartDefaultPickerValue: [{
                type: Input
            }], nzxEndDefaultPickerValue: [{
                type: Input
            }], nzxStartShowNow: [{
                type: Input
            }], nzxEndShowNow: [{
                type: Input
            }], nzShowToday: [{
                type: Input
            }], nzxStartShowToday: [{
                type: Input
            }], nzxEndShowToday: [{
                type: Input
            }], nzShowTime: [{
                type: Input
            }], nzxStartShowTime: [{
                type: Input
            }], nzxEndShowTime: [{
                type: Input
            }], nzxStartDropdownClassName: [{
                type: Input
            }], nzxEndDropdownClassName: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzxStartInputReadOnly: [{
                type: Input
            }], nzxEndInputReadOnly: [{
                type: Input
            }], nzLocale: [{
                type: Input
            }], nzxStartPopupStyle: [{
                type: Input
            }], nzxEndPopupStyle: [{
                type: Input
            }], nzxStartRenderExtraFooter: [{
                type: Input
            }], nzxEndRenderExtraFooter: [{
                type: Input
            }], nzxStartSuffixIcon: [{
                type: Input
            }], nzxEndSuffixIcon: [{
                type: Input
            }], nzxStartDateRender: [{
                type: Input
            }], nzxEndDateRender: [{
                type: Input
            }], nzxStartOnOpenChange: [{
                type: Output
            }], nzxEndOnOpenChange: [{
                type: Output
            }], nzxStartOnOk: [{
                type: Output
            }], nzxEndOnOk: [{
                type: Output
            }], nzxStartOnCalendarChange: [{
                type: Output
            }], nzxEndOnCalendarChange: [{
                type: Output
            }], nzxStartOnPanelChange: [{
                type: Output
            }], nzxEndOnPanelChange: [{
                type: Output
            }], startMinDateTime: [{
                type: Input
            }], endMaxDateTime: [{
                type: Input
            }], startMaxDateTime: [{
                type: Input
            }], endMinDateTime: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi1kYXRldGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvYmV0d2Vlbi1kYXRldGltZS9iZXR3ZWVuLWRhdGV0aW1lLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuLWRhdGV0aW1lL2JldHdlZW4tZGF0ZXRpbWUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFHTCxVQUFVLEVBQ1YsZUFBZSxFQUNmLGNBQWMsRUFDZCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFlBQVksRUFDWixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixZQUFZLEVBQ2IsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBRTFCOzs7O0dBSUc7QUFnQkgsTUFBTSxPQUFPLDJCQUE0QixTQUFRLG1CQUFtQjtJQW1iNUM7SUFsYnRCLFFBQVEsR0FBc0IsRUFBRSxDQUFDO0lBQ2pDOztPQUVHO0lBQ00sbUJBQW1CLEdBQXVCO1FBQ2pELGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1FBQ3pCLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7UUFDM0IsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtLQUM1QixDQUFDO0lBRU8sTUFBTSxHQUFnQixNQUFNLENBQUM7SUFDdEM7O09BRUc7SUFD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Z0JBSUcseUJBQXlCO3NCQUFqQyxLQUFLO2dCQUtHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFJRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBS0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBS0ksb0JBQW9CO3NCQUE3QixNQUFNO2dCQUtHLGtCQUFrQjtzQkFBM0IsTUFBTTtnQkFLRyxZQUFZO3NCQUFyQixNQUFNO2dCQUtHLFVBQVU7c0JBQW5CLE1BQU07Z0JBS0csd0JBQXdCO3NCQUFqQyxNQUFNO2dCQUtHLHNCQUFzQjtzQkFBL0IsTUFBTTtnQkFLRyxxQkFBcUI7c0JBQTlCLE1BQU07Z0JBS0csbUJBQW1CO3NCQUE1QixNQUFNO2dCQUtFLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBEaXNhYmxlZFRpbWVGbixcclxuICBDb21wYXRpYmxlRGF0ZSxcclxuICBTdXBwb3J0VGltZU9wdGlvbnMsXHJcbiAgTnpEYXRlTW9kZSxcclxuICBEaXNhYmxlZFRpbWVDb25maWdcclxufSBmcm9tICduZy16b3Jyby1hbnRkL2RhdGUtcGlja2VyJztcclxuaW1wb3J0IHsgRnVuY3Rpb25Qcm9wLCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBOekRhdGVQaWNrZXJJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcclxuaW1wb3J0IHsgTnp4QmV0d2VlbkNvbXBvbmVudCB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL2JldHdlZW4nO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQge1xyXG4gIERhdGV0aW1lVmFsdWVUeXBlLFxyXG4gIERpc2FibGVkRGF0ZVR5cGUsXHJcbiAgZ2V0RW5kRGF0ZSxcclxuICBnZXRFbmRNb250aERhdGUsXHJcbiAgZ2V0RW5kV2Vla0RhdGUsXHJcbiAgZ2V0RW5kWWVhckRhdGUsXHJcbiAgZ2V0UmVhbERhdGVUaW1lLFxyXG4gIGdldFN0YXJ0RGF0ZSxcclxuICBnZXRTdGFydE1vbnRoRGF0ZSxcclxuICBnZXRTdGFydFdlZWtEYXRlLFxyXG4gIGdldFN0YXJ0WWVhckRhdGUsXHJcbiAgZ2V0VGltZVZhbHVlXHJcbn0gZnJvbSAnLi9kYXRldGltZS11dGlscyc7XHJcblxyXG4vKipcclxuICog5YyF5ZCr5byA5aeL5pel5pyf5ZKM57uT5p2f5pel5pyf5Lik5Liq5pel5pyf5o6n5Lu277yM6buY6K6k5a6e546w5byA5aeL5pe26Ze05bCP5LqO57uT5p2f5pel5pyf77yM5Lmf5Y+v5Lul6K6+572u5pel5pyf55qE5pyA5aSn5YC85ZKM5pyA5bCP5YC844CCXHJcbiAqXHJcbiAqIOe7keWumueahOihqOWNleaVsOaNruS4uiBgeyBzdGFydDogRGF0ZSwgZW5kOiBEYXRlIH1g77yM5L+u5pS55bGeYHN0YXJ0YOWSjGBlbmRg5bGe5oCn5ZCN56ew5Y+v5Lul5L2/55SoYG56eFN0YXJ0UmVOYW1lYOWSjGBuenhFbmRSZU5hbWVg44CCXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC1iZXR3ZWVuLWRhdGV0aW1lJyxcclxuICBleHBvcnRBczogJ256eEJldHdlZW5EYXRldGltZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2JldHdlZW4tZGF0ZXRpbWUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOenhCZXR3ZWVuRGF0ZXRpbWVDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eEJldHdlZW5EYXRldGltZUNvbXBvbmVudCBleHRlbmRzIE56eEJldHdlZW5Db21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgbnp4VmFsdWU6IERhdGV0aW1lVmFsdWVUeXBlID0ge307XHJcbiAgLyoqXHJcbiAgICog6buY6K6k6YWN572uXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZGVmYXVsdERpc2FibGVkVGltZTogRGlzYWJsZWRUaW1lQ29uZmlnID0ge1xyXG4gICAgbnpEaXNhYmxlZEhvdXJzOiAoKSA9PiBbXSxcclxuICAgIG56RGlzYWJsZWRNaW51dGVzOiAoKSA9PiBbXSxcclxuICAgIG56RGlzYWJsZWRTZWNvbmRzOiAoKSA9PiBbXVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dCgpIG56TW9kZT86IE56RGF0ZU1vZGUgPSAnZGF0ZSc7XHJcbiAgLyoqXHJcbiAgICog5byA5aeL5a2X5q61UGxhY2Vob2xkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFBsYWNlaG9sZGVyOiBzdHJpbmcgfCBzdHJpbmdbXSA9ICfotbflp4vlgLwnO1xyXG4gIC8qKlxyXG4gICAqIOe7k+adn+Wtl+autVBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUGxhY2Vob2xkZXI6IHN0cmluZyB8IHN0cmluZ1tdID0gJ+e7k+adn+WAvCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOW8gOWni+Wtl+autemHjeWRveWQjVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0UmVOYW1lID0gJ3N0YXJ0JztcclxuICAvKipcclxuICAgKiDnu5PmnZ/lrZfmrrXph43lkb3lkI1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRSZU5hbWUgPSAnZW5kJztcclxuXHJcbiAgLyoqXHJcbiAgICog57uE5Lu25YaF6YOoIGlucHV0IOeahCBpZCDlgLxcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydElkPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDnu4Tku7blhoXpg6ggaW5wdXQg55qEIGlkIOWAvFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZElkPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuua4hemZpOaMiemSrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0QWxsb3dDbGVhcj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuua4hemZpOaMiemSrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56QWxsb3dDbGVhciA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S657uT5p2f5riF6Zmk5oyJ6ZKuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kQWxsb3dDbGVhcj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog6Ieq5Yqo6I635Y+W54Sm54K5XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRBdXRvRm9jdXM/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiDoh6rliqjojrflj5bnhKbngrlcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRBdXRvRm9jdXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOa1ruWxguaYr+WQpuW6lOW4puacieiDjOaZr+adv1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0QmFja2Ryb3A/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiDmta7lsYLmmK/lkKblupTluKbmnInog4zmma/mnb9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRCYWNrZHJvcD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog6buY6K6k6Z2i5p2/5pel5pyfXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnREZWZhdWx0UGlja2VyVmFsdWU/OiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiDpu5jorqTpnaLmnb/ml6XmnJ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmREZWZhdWx0UGlja2VyVmFsdWU/OiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiDmmL7npLrmraTliLst5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRTaG93Tm93ID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDmmL7npLrmraTliLst57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kU2hvd05vdyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYvuekuuS7iuWkqS3lvIDlp4vlkoznu5PmnZ/lkIzml7bnlJ/mlYhcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNob3dUb2RheSA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5pi+56S65LuK5aSpLeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0U2hvd1RvZGF5PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmmL7npLrku4rlpKkt57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kU2hvd1RvZGF5PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICog5pi+56S65pe26Ze06YCJ5oup5ZmoLeW8gOWni+WSjOe7k+adn+WQjOaXtueUn+aViFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56U2hvd1RpbWU6IFN1cHBvcnRUaW1lT3B0aW9ucyB8IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDmmL7npLrml7bpl7TpgInmi6nlmagt5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRTaG93VGltZT86IFN1cHBvcnRUaW1lT3B0aW9ucyB8IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5pi+56S65pe26Ze06YCJ5oup5ZmoLee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFNob3dUaW1lPzogU3VwcG9ydFRpbWVPcHRpb25zIHwgYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICog6aKd5aSW55qE5by55Ye65pel5Y6GIGNsYXNzTmFtZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0RHJvcGRvd25DbGFzc05hbWU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmineWklueahOW8ueWHuuaXpeWOhiBjbGFzc05hbWVcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmREcm9wZG93bkNsYXNzTmFtZT86IHN0cmluZztcclxuICAvKipcclxuICAgKiDlsZXnpLrnmoTml6XmnJ/moLzlvI/vvIzop4FuekZvcm1hdOeJueWIq+ivtOaYjlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56Rm9ybWF0Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDkuLogaW5wdXQg5qCH562+6K6+572u5Y+q6K+75bGe5oCn77yI6YG/5YWN5Zyo56e75Yqo6K6+5aSH5LiK6Kem5Y+R5bCP6ZSu55uY77yJXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRJbnB1dFJlYWRPbmx5PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICog5Li6IGlucHV0IOagh+etvuiuvue9ruWPquivu+WxnuaAp++8iOmBv+WFjeWcqOenu+WKqOiuvuWkh+S4iuinpuWPkeWwj+mUruebmO+8iVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZElucHV0UmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOWbvemZheWMlumFjee9rlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56TG9jYWxlPzogTnpEYXRlUGlja2VySTE4bkludGVyZmFjZTtcclxuXHJcbiAgLyoqXHJcbiAgICog6aKd5aSW55qE5by55Ye65pel5Y6G5qC35byPXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRQb3B1cFN0eWxlPzogb2JqZWN0O1xyXG5cclxuICAvKipcclxuICAgKiDpop3lpJbnmoTlvLnlh7rml6XljobmoLflvI9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRQb3B1cFN0eWxlPzogb2JqZWN0O1xyXG4gIC8qKlxyXG4gICAqIOWcqOmdouadv+S4rea3u+WKoOmineWklueahOmhteiEmlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0UmVuZGVyRXh0cmFGb290ZXI/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiDlnKjpnaLmnb/kuK3mt7vliqDpop3lpJbnmoTpobXohJpcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRSZW5kZXJFeHRyYUZvb3Rlcj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmcgfCBGdW5jdGlvblByb3A8VGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZz47XHJcbiAgLyoqXHJcbiAgICog6Ieq5a6a5LmJ55qE5ZCO57yA5Zu+5qCHXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRTdWZmaXhJY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICog6Ieq5a6a5LmJ55qE5ZCO57yA5Zu+5qCHXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kU3VmZml4SWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XHJcbiAgLyoqXHJcbiAgICog6Ieq5a6a5LmJ5riy5p+T5pel5pyfLeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0RGF0ZVJlbmRlcj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmcgfCBGdW5jdGlvblByb3A8VGVtcGxhdGVSZWY8RGF0ZT4gfCBzdHJpbmc+O1xyXG4gIC8qKlxyXG4gICAqIOiHquWumuS5iea4suafk+aXpeacny3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmREYXRlUmVuZGVyPzogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZyB8IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIOW8ueWHuuaXpeWOhuWSjOWFs+mXreaXpeWOhueahOWbnuiwg1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuenhTdGFydE9uT3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5by55Ye65pel5Y6G5ZKM5YWz6Zet5pel5Y6G55qE5Zue6LCDXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eEVuZE9uT3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT0vmjInpkq7ngrnlh7tcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4U3RhcnRPbk9rID0gbmV3IEV2ZW50RW1pdHRlcjxDb21wYXRpYmxlRGF0ZSB8IG51bGw+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9L5oyJ6ZKu54K55Ye7XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eEVuZE9uT2sgPSBuZXcgRXZlbnRFbWl0dGVyPENvbXBhdGlibGVEYXRlIHwgbnVsbD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5b6F6YCJ5pel5pyf5Y+R55Sf5Y+Y5YyW55qE5Zue6LCDXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eFN0YXJ0T25DYWxlbmRhckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8KERhdGUgfCBudWxsKVtdPigpO1xyXG5cclxuICAvKipcclxuICAgKiDlvoXpgInml6XmnJ/lj5HnlJ/lj5jljJbnmoTlm57osINcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4RW5kT25DYWxlbmRhckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8KERhdGUgfCBudWxsKVtdPigpO1xyXG5cclxuICAvKipcclxuICAgKiDlvoXpgInml6XmnJ/lj5HnlJ/lj5jljJbnmoTlm57osINcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4U3RhcnRPblBhbmVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBOekRhdGVNb2RlW10gfCBzdHJpbmdbXT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5b6F6YCJ5pel5pyf5Y+R55Sf5Y+Y5YyW55qE5Zue6LCDXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eEVuZE9uUGFuZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IE56RGF0ZU1vZGVbXSB8IHN0cmluZ1tdPigpO1xyXG5cclxuICAvKipcclxuICAgKiDmnIDlsI/ml7bpl7RcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydE1pbkRhdGVUaW1lPzogRGlzYWJsZWREYXRlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pyA5aSn5pe26Ze0XHJcbiAgICovXHJcbiAgQElucHV0KCkgZW5kTWF4RGF0ZVRpbWU/OiBEaXNhYmxlZERhdGVUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiDmnIDlpKfml7bpl7RcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydE1heERhdGVUaW1lPzogRGlzYWJsZWREYXRlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pyA5bCP5pe26Ze0XHJcbiAgICovXHJcbiAgQElucHV0KCkgZW5kTWluRGF0ZVRpbWU/OiBEaXNhYmxlZERhdGVUeXBlO1xyXG5cclxuICBwcml2YXRlIGdldCBfZGVmYXVsdFN0YXJ0TWF4RGF0ZVRpbWUoKTogRGF0ZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMubnp4VmFsdWVbdGhpcy5uenhFbmRSZU5hbWVdO1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBfZGVmYXVsdEVuZE1pbkRhdGVUaW1lKCk6IERhdGUgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLm56eFZhbHVlW3RoaXMubnp4U3RhcnRSZU5hbWVdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN0YXJ0RGlzYWJsZWRUaW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnp4U3RhcnRTaG93VGltZSA9PSBudWxsID8gdGhpcy5uelNob3dUaW1lIDogdGhpcy5uenhTdGFydFNob3dUaW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVuZERpc2FibGVkVGltZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm56eEVuZFNob3dUaW1lID09IG51bGwgPyB0aGlzLm56U2hvd1RpbWUgOiB0aGlzLm56eEVuZFNob3dUaW1lO1xyXG4gIH1cclxuXHJcbiAgbnp4U3RhcnREaXNhYmxlZFRpbWU6IERpc2FibGVkVGltZUZuID0gY3VycmVudCA9PiB7XHJcbiAgICBpZiAoIXRoaXMuc3RhcnREaXNhYmxlZFRpbWUgfHwgIWN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdERpc2FibGVkVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRlID0gY3VycmVudCBhcyBEYXRlO1xyXG4gICAgY29uc3QgbWluVmFsdWUgPSBnZXRSZWFsRGF0ZVRpbWUoZGF0ZSwgdGhpcy5zdGFydE1pbkRhdGVUaW1lKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKFxyXG4gICAgICBkYXRlLFxyXG4gICAgICB0aGlzLnN0YXJ0TWF4RGF0ZVRpbWUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHRTdGFydE1heERhdGVUaW1lIDogdGhpcy5zdGFydE1heERhdGVUaW1lXHJcbiAgICApO1xyXG4gICAgaWYgKCFtaW5WYWx1ZSAmJiAhbWF4VmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdERpc2FibGVkVGltZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVGltZShkYXRlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIG56eEVuZERpc2FibGVkVGltZT86IERpc2FibGVkVGltZUZuID0gY3VycmVudCA9PiB7XHJcbiAgICBpZiAoIXRoaXMuZW5kRGlzYWJsZWRUaW1lIHx8ICFjdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHREaXNhYmxlZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGN1cnJlbnQgYXMgRGF0ZTtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKFxyXG4gICAgICBkYXRlLFxyXG4gICAgICB0aGlzLmVuZE1pbkRhdGVUaW1lID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0RW5kTWluRGF0ZVRpbWUgOiB0aGlzLmVuZE1pbkRhdGVUaW1lXHJcbiAgICApO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSBnZXRSZWFsRGF0ZVRpbWUoZGF0ZSwgdGhpcy5lbmRNYXhEYXRlVGltZSk7XHJcbiAgICBpZiAoIW1pblZhbHVlICYmICFtYXhWYWx1ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0RGlzYWJsZWRUaW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRUaW1lKGRhdGUsIG1pblZhbHVlLCBtYXhWYWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W56aB55So55qE5pe26Ze06YOo5YiGXHJcbiAgICogQHBhcmFtIGRhdGUg5b2T5YmN5pel5pyfXHJcbiAgICogQHBhcmFtIG1pblZhbHVlIOacgOWwj+aXpeacn+WAvFxyXG4gICAqIEBwYXJhbSBtYXhWYWx1ZSDmnIDlpKfml6XmnJ/lgLxcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0RGlzYWJsZWRUaW1lKFxyXG4gICAgZGF0ZTogRGF0ZSxcclxuICAgIG1pblZhbHVlOiBEYXRlIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgIG1heFZhbHVlOiBEYXRlIHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4gICk6IERpc2FibGVkVGltZUNvbmZpZyB7XHJcbiAgICBjb25zdCBzdGFydCA9IGdldFRpbWVWYWx1ZShkYXRlLCBtaW5WYWx1ZSk7XHJcblxyXG4gICAgbGV0IGhvdXJzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgbGV0IG1pbnV0ZXM6IG51bWJlcltdID0gW107XHJcbiAgICBsZXQgc2Vjb25kczogbnVtYmVyW10gPSBbXTtcclxuICAgIGlmIChzdGFydCkge1xyXG4gICAgICBjb25zdCBlcXVhbHNIb3VyID0gc3RhcnQuaG91ciA9PT0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICBob3VycyA9IE56eFV0aWxzLnJhbmdlKDAsIHN0YXJ0LmhvdXIpO1xyXG4gICAgICBtaW51dGVzID0gZXF1YWxzSG91ciA/IE56eFV0aWxzLnJhbmdlKDAsIHN0YXJ0Lm1pbnV0ZSkgOiBbXTtcclxuICAgICAgc2Vjb25kcyA9IGVxdWFsc0hvdXIgJiYgc3RhcnQubWludXRlID09PSBkYXRlLmdldE1pbnV0ZXMoKSA/IE56eFV0aWxzLnJhbmdlKDAsIHN0YXJ0LnNlY29uZCkgOiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbmQgPSBnZXRUaW1lVmFsdWUoZGF0ZSwgbWF4VmFsdWUpO1xyXG4gICAgaWYgKGVuZCkge1xyXG4gICAgICBjb25zdCBlcXVhbHNIb3VyID0gZW5kLmhvdXIgPT09IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgaG91cnMgPSBob3Vycy5jb25jYXQoTnp4VXRpbHMucmFuZ2UoZW5kLmhvdXIgKyAxLCAyNCkpO1xyXG4gICAgICBtaW51dGVzID0gZXF1YWxzSG91ciA/IG1pbnV0ZXMuY29uY2F0KE56eFV0aWxzLnJhbmdlKGVuZC5taW51dGUgKyAxLCA2MCkpIDogbWludXRlcztcclxuICAgICAgc2Vjb25kcyA9XHJcbiAgICAgICAgZXF1YWxzSG91ciAmJiBlbmQubWludXRlID09PSBkYXRlLmdldE1pbnV0ZXMoKSA/IHNlY29uZHMuY29uY2F0KE56eFV0aWxzLnJhbmdlKGVuZC5zZWNvbmQgKyAxLCA2MCkpIDogc2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuekRpc2FibGVkSG91cnM6ICgpID0+IGhvdXJzLFxyXG4gICAgICBuekRpc2FibGVkTWludXRlczogaG91ciA9PiAoaG91ciA9PT0gc3RhcnQ/LmhvdXIgfHwgaG91ciA9PT0gZW5kPy5ob3VyID8gbWludXRlcyA6IFtdKSxcclxuICAgICAgbnpEaXNhYmxlZFNlY29uZHM6IChob3VyLCBtaW51dGUpID0+XHJcbiAgICAgICAgKGhvdXIgPT09IHN0YXJ0Py5ob3VyICYmIG1pbnV0ZSA9PT0gc3RhcnQ/Lm1pbnV0ZSkgfHwgKGhvdXIgPT09IGVuZD8uaG91ciAmJiBtaW51dGUgPT09IGVuZD8ubWludXRlKVxyXG4gICAgICAgICAgPyBzZWNvbmRzXHJcbiAgICAgICAgICA6IFtdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5LiN5Y+v6YCJ5oup55qE5pel5pyfXHJcbiAgICovXHJcbiAgbnp4U3RhcnREaXNhYmxlZERhdGU6IChjdXJyZW50OiBEYXRlKSA9PiBib29sZWFuID0gZGF0ZSA9PiB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKGRhdGUsIHRoaXMuc3RhcnRNaW5EYXRlVGltZSk7XHJcbiAgICBjb25zdCBtYXhWYWx1ZSA9IGdldFJlYWxEYXRlVGltZShcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGhpcy5zdGFydE1heERhdGVUaW1lID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0U3RhcnRNYXhEYXRlVGltZSA6IHRoaXMuc3RhcnRNYXhEYXRlVGltZVxyXG4gICAgKTtcclxuICAgIGlmICghbWF4VmFsdWUgJiYgIW1pblZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIGRhdGUgPCBtaW5cclxuICAgIGlmIChtaW5WYWx1ZSAmJiB0aGlzLmdldERpc2FibGVkTWluRGF0ZShkYXRlLCBtaW5WYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGF0ZSA+IG1heFxyXG4gICAgaWYgKG1heFZhbHVlICYmIHRoaXMuZ2V0RGlzYWJsZWRNYXhEYXRlKGRhdGUsIG1heFZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiDkuI3lj6/pgInmi6nnmoTml6XmnJ9cclxuICAgKi9cclxuICBuenhFbmREaXNhYmxlZERhdGU6IChjdXJyZW50OiBEYXRlKSA9PiBib29sZWFuID0gZGF0ZSA9PiB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKFxyXG4gICAgICBkYXRlLFxyXG4gICAgICB0aGlzLmVuZE1pbkRhdGVUaW1lID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0RW5kTWluRGF0ZVRpbWUgOiB0aGlzLmVuZE1pbkRhdGVUaW1lXHJcbiAgICApO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSBnZXRSZWFsRGF0ZVRpbWUoZGF0ZSwgdGhpcy5lbmRNYXhEYXRlVGltZSk7XHJcbiAgICBpZiAoIW1heFZhbHVlICYmICFtaW5WYWx1ZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGF0ZSA+IG1heFxyXG4gICAgaWYgKG1heFZhbHVlICYmIHRoaXMuZ2V0RGlzYWJsZWRNYXhEYXRlKGRhdGUsIG1heFZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkYXRlIDwgbWluXHJcbiAgICBpZiAobWluVmFsdWUgJiYgdGhpcy5nZXREaXNhYmxlZE1pbkRhdGUoZGF0ZSwgbWluVmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGdldERpc2FibGVkTWF4RGF0ZShkYXRlOiBEYXRlLCBtYXhWYWx1ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMubnpNb2RlID09PSAnZGF0ZScpIHtcclxuICAgICAgaWYgKGdldFN0YXJ0RGF0ZShkYXRlKSA+IG1heFZhbHVlLmdldFRpbWUoKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubnpNb2RlID09PSAnd2VlaycpIHtcclxuICAgICAgaWYgKGdldFN0YXJ0V2Vla0RhdGUoZGF0ZSkgPiBtYXhWYWx1ZS5nZXRUaW1lKCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm56TW9kZSA9PT0gJ21vbnRoJykge1xyXG4gICAgICBpZiAoZ2V0U3RhcnRNb250aERhdGUoZGF0ZSkgPiBtYXhWYWx1ZS5nZXRUaW1lKCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm56TW9kZSA9PT0gJ3llYXInKSB7XHJcbiAgICAgIGlmIChnZXRTdGFydFllYXJEYXRlKGRhdGUpID4gbWF4VmFsdWUuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRlID4gbWF4VmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldERpc2FibGVkTWluRGF0ZShkYXRlOiBEYXRlLCBtaW5WYWx1ZTogRGF0ZSkge1xyXG4gICAgaWYgKHRoaXMubnpNb2RlID09PSAnZGF0ZScpIHtcclxuICAgICAgaWYgKG1pblZhbHVlLmdldFRpbWUoKSA+IGdldEVuZERhdGUoZGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm56TW9kZSA9PT0gJ3dlZWsnKSB7XHJcbiAgICAgIGlmIChtaW5WYWx1ZS5nZXRUaW1lKCkgPiBnZXRFbmRXZWVrRGF0ZShkYXRlKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubnpNb2RlID09PSAnbW9udGgnKSB7XHJcbiAgICAgIGlmIChtaW5WYWx1ZS5nZXRUaW1lKCkgPiBnZXRFbmRNb250aERhdGUoZGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm56TW9kZSA9PT0gJ3llYXInKSB7XHJcbiAgICAgIGlmIChtaW5WYWx1ZS5nZXRUaW1lKCkgPiBnZXRFbmRZZWFyRGF0ZShkYXRlKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbWluVmFsdWUgPiBkYXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ01vZGVsQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLm56eFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IERhdGV0aW1lVmFsdWVUeXBlKTogdm9pZCB7XHJcbiAgICB0aGlzLm56eFZhbHVlID0gdmFsdWUgfHwge307XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5uenhEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogRGF0ZXRpbWVWYWx1ZVR5cGUpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogRGF0ZXRpbWVWYWx1ZVR5cGUpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xyXG4gIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IG51bGw7XHJcbn1cclxuIiwiPG56eC1iZXR3ZWVuXHJcbiAgW256eERpc2FibGVkXT1cIm56eERpc2FibGVkXCJcclxuICBbbnp4U3RhcnREaXNhYmxlZF09XCJuenhTdGFydERpc2FibGVkXCJcclxuICBbbnp4RW5kRGlzYWJsZWRdPVwibnp4RW5kRGlzYWJsZWRcIlxyXG4gIFtuenhTaXplXT1cIm56eFNpemVcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgc3RhcnRcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgIHR5cGVUZW1wbGF0ZTtcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICRpbXBsaWNpdDoge1xyXG4gICAgICAgICAgZGlyOiBuenhTdGFydFJlTmFtZSxcclxuICAgICAgICAgIGRpc2FibGVkOiBuenhTdGFydERpc2FibGVkICE9IG51bGwgPyBuenhTdGFydERpc2FibGVkIDogbnp4RGlzYWJsZWQsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogbnp4U3RhcnRQbGFjZWhvbGRlcixcclxuICAgICAgICAgIG56U3VmZml4SWNvbjogbnp4U3RhcnRTdWZmaXhJY29uLFxyXG4gICAgICAgICAgbnpBbGxvd0NsZWFyOiBuenhTdGFydEFsbG93Q2xlYXIsXHJcbiAgICAgICAgICBuelJlbmRlckV4dHJhRm9vdGVyOiBuenhTdGFydFJlbmRlckV4dHJhRm9vdGVyLFxyXG4gICAgICAgICAgbnpCYWNrZHJvcDogbnp4U3RhcnRCYWNrZHJvcCxcclxuICAgICAgICAgIG56QXV0b0ZvY3VzOiBuenhTdGFydEF1dG9Gb2N1cyxcclxuICAgICAgICAgIG56RGF0ZVJlbmRlcjogbnp4U3RhcnREYXRlUmVuZGVyLFxyXG4gICAgICAgICAgbnpEZWZhdWx0UGlja2VyVmFsdWU6IG56eFN0YXJ0RGVmYXVsdFBpY2tlclZhbHVlLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZERhdGU6IG56eFN0YXJ0RGlzYWJsZWREYXRlLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZFRpbWU6IG56eFN0YXJ0RGlzYWJsZWRUaW1lLFxyXG4gICAgICAgICAgbnpEcm9wZG93bkNsYXNzTmFtZTogbnp4U3RhcnREcm9wZG93bkNsYXNzTmFtZSxcclxuICAgICAgICAgIG56SWQ6IG56eFN0YXJ0SWQsXHJcbiAgICAgICAgICBueklucHV0UmVhZE9ubHk6IG56eFN0YXJ0SW5wdXRSZWFkT25seSxcclxuICAgICAgICAgIG56TG9jYWxlOiBuekxvY2FsZSxcclxuICAgICAgICAgIG56UG9wdXBTdHlsZTogbnp4U3RhcnRQb3B1cFN0eWxlLFxyXG4gICAgICAgICAgbnpTaG93Tm93OiBuenhTdGFydFNob3dOb3csXHJcbiAgICAgICAgICBuelNob3dUaW1lOiBuenhTdGFydFNob3dUaW1lLFxyXG4gICAgICAgICAgbnpTaG93VG9kYXk6IG56eFN0YXJ0U2hvd1RvZGF5LFxyXG4gICAgICAgICAgbnpPbk9wZW5DaGFuZ2U6IG56eFN0YXJ0T25PcGVuQ2hhbmdlLFxyXG4gICAgICAgICAgbnpPbk9rOiBuenhTdGFydE9uT2ssXHJcbiAgICAgICAgICBuek9uQ2FsZW5kYXJDaGFuZ2U6IG56eFN0YXJ0T25DYWxlbmRhckNoYW5nZSxcclxuICAgICAgICAgIG56T25QYW5lbENoYW5nZTogbnp4U3RhcnRPblBhbmVsQ2hhbmdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBcIlxyXG4gID48L25nLWNvbnRhaW5lcj5cclxuICA8bmctY29udGFpbmVyXHJcbiAgICBlbmRcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgIHR5cGVUZW1wbGF0ZTtcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICRpbXBsaWNpdDoge1xyXG4gICAgICAgICAgZGlyOiBuenhFbmRSZU5hbWUsXHJcbiAgICAgICAgICBkaXNhYmxlZDogbnp4RW5kRGlzYWJsZWQgIT0gbnVsbCA/IG56eEVuZERpc2FibGVkIDogbnp4RGlzYWJsZWQsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogbnp4RW5kUGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICBuelN1ZmZpeEljb246IG56eEVuZFN1ZmZpeEljb24sXHJcbiAgICAgICAgICBuekFsbG93Q2xlYXI6IG56eEVuZEFsbG93Q2xlYXIsXHJcbiAgICAgICAgICBuelJlbmRlckV4dHJhRm9vdGVyOiBuenhFbmRSZW5kZXJFeHRyYUZvb3RlcixcclxuICAgICAgICAgIG56QmFja2Ryb3A6IG56eEVuZEJhY2tkcm9wLFxyXG4gICAgICAgICAgbnpBdXRvRm9jdXM6IG56eEVuZEF1dG9Gb2N1cyxcclxuICAgICAgICAgIG56RGF0ZVJlbmRlcjogbnp4RW5kRGF0ZVJlbmRlcixcclxuICAgICAgICAgIG56RGVmYXVsdFBpY2tlclZhbHVlOiBuenhFbmREZWZhdWx0UGlja2VyVmFsdWUsXHJcbiAgICAgICAgICBuekRpc2FibGVkRGF0ZTogbnp4RW5kRGlzYWJsZWREYXRlLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZFRpbWU6IG56eEVuZERpc2FibGVkVGltZSxcclxuICAgICAgICAgIG56RHJvcGRvd25DbGFzc05hbWU6IG56eEVuZERyb3Bkb3duQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgbnpJZDogbnp4RW5kSWQsXHJcbiAgICAgICAgICBueklucHV0UmVhZE9ubHk6IG56eEVuZElucHV0UmVhZE9ubHksXHJcbiAgICAgICAgICBuekxvY2FsZTogbnpMb2NhbGUsXHJcbiAgICAgICAgICBuelBvcHVwU3R5bGU6IG56eEVuZFBvcHVwU3R5bGUsXHJcbiAgICAgICAgICBuelNob3dOb3c6IG56eEVuZFNob3dOb3csXHJcbiAgICAgICAgICBuelNob3dUaW1lOiBuenhFbmRTaG93VGltZSxcclxuICAgICAgICAgIG56U2hvd1RvZGF5OiBuenhFbmRTaG93VG9kYXksXHJcbiAgICAgICAgICBuek9uT3BlbkNoYW5nZTogbnp4RW5kT25PcGVuQ2hhbmdlLFxyXG4gICAgICAgICAgbnpPbk9rOiBuenhFbmRPbk9rLFxyXG4gICAgICAgICAgbnpPbkNhbGVuZGFyQ2hhbmdlOiBuenhFbmRPbkNhbGVuZGFyQ2hhbmdlLFxyXG4gICAgICAgICAgbnpPblBhbmVsQ2hhbmdlOiBuenhFbmRPblBhbmVsQ2hhbmdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBcIlxyXG4gID48L25nLWNvbnRhaW5lcj5cclxuPC9uengtYmV0d2Vlbj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdHlwZVRlbXBsYXRlIGxldC1kYXRhPlxyXG4gIDxuei1kYXRlLXBpY2tlclxyXG4gICAgWyhuZ01vZGVsKV09XCJuenhWYWx1ZVtkYXRhLmRpcl1cIlxyXG4gICAgKG5nTW9kZWxDaGFuZ2UpPVwibmdNb2RlbENoYW5nZSgpXCJcclxuICAgIFtuekRpc2FibGVkXT1cImRhdGEuZGlzYWJsZWRcIlxyXG4gICAgW256UGxhY2VIb2xkZXJdPVwiZGF0YS5wbGFjZWhvbGRlclwiXHJcbiAgICBbbnpTaXplXT1cIm56eFNpemVcIlxyXG4gICAgW256TW9kZV09XCJuek1vZGVcIlxyXG4gICAgW256U3VmZml4SWNvbl09XCJkYXRhLm56U3VmZml4SWNvbiB8fCAnY2FsZW5kYXInXCJcclxuICAgIFtuekFsbG93Q2xlYXJdPVwibnpBbGxvd0NsZWFyIHx8IGRhdGEubnpBbGxvd0NsZWFyXCJcclxuICAgIFtuelJlbmRlckV4dHJhRm9vdGVyXT1cImRhdGEubnpSZW5kZXJFeHRyYUZvb3RlclwiXHJcbiAgICBbbnpCYWNrZHJvcF09XCJkYXRhLm56QmFja2Ryb3BcIlxyXG4gICAgW256QXV0b0ZvY3VzXT1cImRhdGEubnpBdXRvRm9jdXNcIlxyXG4gICAgW256RGF0ZVJlbmRlcl09XCJkYXRhLm56RGF0ZVJlbmRlclwiXHJcbiAgICBbbnpEZWZhdWx0UGlja2VyVmFsdWVdPVwiZGF0YS5uekRlZmF1bHRQaWNrZXJWYWx1ZVwiXHJcbiAgICBbbnpEaXNhYmxlZERhdGVdPVwiZGF0YS5uekRpc2FibGVkRGF0ZVwiXHJcbiAgICBbbnpEaXNhYmxlZFRpbWVdPVwiZGF0YS5uekRpc2FibGVkVGltZVwiXHJcbiAgICBbbnpEcm9wZG93bkNsYXNzTmFtZV09XCJkYXRhLm56RHJvcGRvd25DbGFzc05hbWVcIlxyXG4gICAgW256Rm9ybWF0XT1cIm56Rm9ybWF0XCJcclxuICAgIFtueklkXT1cImRhdGEubnpJZFwiXHJcbiAgICBbbnpJbnB1dFJlYWRPbmx5XT1cImRhdGEubnpJbnB1dFJlYWRPbmx5XCJcclxuICAgIFtuekxvY2FsZV09XCJuekxvY2FsZVwiXHJcbiAgICBbbnpQb3B1cFN0eWxlXT1cImRhdGEubnpQb3B1cFN0eWxlXCJcclxuICAgIFtuelNob3dOb3ddPVwiZGF0YS5uelNob3dOb3dcIlxyXG4gICAgW256U2hvd1RpbWVdPVwiZGF0YS5uelNob3dUaW1lIHx8IG56U2hvd1RpbWVcIlxyXG4gICAgW256U2hvd1RvZGF5XT1cIm56U2hvd1RvZGF5IHx8IGRhdGEubnpTaG93VG9kYXlcIlxyXG4gICAgKG56T25PcGVuQ2hhbmdlKT1cImRhdGEubnpPbk9wZW5DaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAgIChuek9uT2spPVwiZGF0YS5uek9uT2suZW1pdCgkZXZlbnQpXCJcclxuICAgIChuek9uQ2FsZW5kYXJDaGFuZ2UpPVwiZGF0YS5uek9uQ2FsZW5kYXJDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAgIChuek9uUGFuZWxDaGFuZ2UpPVwiZGF0YS5uek9uUGFuZWxDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICA+PC9uei1kYXRlLXBpY2tlcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19