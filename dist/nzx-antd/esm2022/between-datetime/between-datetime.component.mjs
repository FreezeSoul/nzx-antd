import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzxBetweenComponent } from '@xmagic/nzx-antd/between';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import { getEndDate, getEndMonthDate, getEndWeekDate, getEndYearDate, getRealDateTime, getStartDate, getStartMonthDate, getStartWeekDate, getStartYearDate, getTimeValue } from './datetime-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@xmagic/nzx-antd/between";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi1kYXRldGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvYmV0d2Vlbi1kYXRldGltZS9iZXR3ZWVuLWRhdGV0aW1lLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuLWRhdGV0aW1lL2JldHdlZW4tZGF0ZXRpbWUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFHTCxVQUFVLEVBQ1YsZUFBZSxFQUNmLGNBQWMsRUFDZCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFlBQVksRUFDWixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixZQUFZLEVBQ2IsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBRTFCOzs7O0dBSUc7QUFnQkgsTUFBTSxPQUFPLDJCQUE0QixTQUFRLG1CQUFtQjtJQW1iNUM7SUFsYnRCLFFBQVEsR0FBc0IsRUFBRSxDQUFDO0lBQ2pDOztPQUVHO0lBQ00sbUJBQW1CLEdBQXVCO1FBQ2pELGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1FBQ3pCLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7UUFDM0IsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtLQUM1QixDQUFDO0lBRU8sTUFBTSxHQUFnQixNQUFNLENBQUM7SUFDdEM7O09BRUc7SUFD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Z0JBSUcseUJBQXlCO3NCQUFqQyxLQUFLO2dCQUtHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFJRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBS0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBS0ksb0JBQW9CO3NCQUE3QixNQUFNO2dCQUtHLGtCQUFrQjtzQkFBM0IsTUFBTTtnQkFLRyxZQUFZO3NCQUFyQixNQUFNO2dCQUtHLFVBQVU7c0JBQW5CLE1BQU07Z0JBS0csd0JBQXdCO3NCQUFqQyxNQUFNO2dCQUtHLHNCQUFzQjtzQkFBL0IsTUFBTTtnQkFLRyxxQkFBcUI7c0JBQTlCLE1BQU07Z0JBS0csbUJBQW1CO3NCQUE1QixNQUFNO2dCQUtFLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBEaXNhYmxlZFRpbWVGbixcclxuICBDb21wYXRpYmxlRGF0ZSxcclxuICBTdXBwb3J0VGltZU9wdGlvbnMsXHJcbiAgTnpEYXRlTW9kZSxcclxuICBEaXNhYmxlZFRpbWVDb25maWdcclxufSBmcm9tICduZy16b3Jyby1hbnRkL2RhdGUtcGlja2VyJztcclxuaW1wb3J0IHsgRnVuY3Rpb25Qcm9wLCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBOekRhdGVQaWNrZXJJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcclxuaW1wb3J0IHsgTnp4QmV0d2VlbkNvbXBvbmVudCB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvYmV0d2Vlbic7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHtcclxuICBEYXRldGltZVZhbHVlVHlwZSxcclxuICBEaXNhYmxlZERhdGVUeXBlLFxyXG4gIGdldEVuZERhdGUsXHJcbiAgZ2V0RW5kTW9udGhEYXRlLFxyXG4gIGdldEVuZFdlZWtEYXRlLFxyXG4gIGdldEVuZFllYXJEYXRlLFxyXG4gIGdldFJlYWxEYXRlVGltZSxcclxuICBnZXRTdGFydERhdGUsXHJcbiAgZ2V0U3RhcnRNb250aERhdGUsXHJcbiAgZ2V0U3RhcnRXZWVrRGF0ZSxcclxuICBnZXRTdGFydFllYXJEYXRlLFxyXG4gIGdldFRpbWVWYWx1ZVxyXG59IGZyb20gJy4vZGF0ZXRpbWUtdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIOWMheWQq+W8gOWni+aXpeacn+WSjOe7k+adn+aXpeacn+S4pOS4quaXpeacn+aOp+S7tu+8jOm7mOiupOWunueOsOW8gOWni+aXtumXtOWwj+S6jue7k+adn+aXpeacn++8jOS5n+WPr+S7peiuvue9ruaXpeacn+eahOacgOWkp+WAvOWSjOacgOWwj+WAvOOAglxyXG4gKlxyXG4gKiDnu5HlrprnmoTooajljZXmlbDmja7kuLogYHsgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSB9YO+8jOS/ruaUueWxnmBzdGFydGDlkoxgZW5kYOWxnuaAp+WQjeensOWPr+S7peS9v+eUqGBuenhTdGFydFJlTmFtZWDlkoxgbnp4RW5kUmVOYW1lYOOAglxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtYmV0d2Vlbi1kYXRldGltZScsXHJcbiAgZXhwb3J0QXM6ICduenhCZXR3ZWVuRGF0ZXRpbWUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iZXR3ZWVuLWRhdGV0aW1lLmNvbXBvbmVudC5odG1sJyxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnp4QmV0d2VlbkRhdGV0aW1lQ29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhCZXR3ZWVuRGF0ZXRpbWVDb21wb25lbnQgZXh0ZW5kcyBOenhCZXR3ZWVuQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIG56eFZhbHVlOiBEYXRldGltZVZhbHVlVHlwZSA9IHt9O1xyXG4gIC8qKlxyXG4gICAqIOm7mOiupOmFjee9rlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGRlZmF1bHREaXNhYmxlZFRpbWU6IERpc2FibGVkVGltZUNvbmZpZyA9IHtcclxuICAgIG56RGlzYWJsZWRIb3VyczogKCkgPT4gW10sXHJcbiAgICBuekRpc2FibGVkTWludXRlczogKCkgPT4gW10sXHJcbiAgICBuekRpc2FibGVkU2Vjb25kczogKCkgPT4gW11cclxuICB9O1xyXG5cclxuICBASW5wdXQoKSBuek1vZGU/OiBOekRhdGVNb2RlID0gJ2RhdGUnO1xyXG4gIC8qKlxyXG4gICAqIOW8gOWni+Wtl+autVBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRQbGFjZWhvbGRlcjogc3RyaW5nIHwgc3RyaW5nW10gPSAn6LW35aeL5YC8JztcclxuICAvKipcclxuICAgKiDnu5PmnZ/lrZfmrrVQbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFBsYWNlaG9sZGVyOiBzdHJpbmcgfCBzdHJpbmdbXSA9ICfnu5PmnZ/lgLwnO1xyXG5cclxuICAvKipcclxuICAgKiDlvIDlp4vlrZfmrrXph43lkb3lkI1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFJlTmFtZSA9ICdzdGFydCc7XHJcbiAgLyoqXHJcbiAgICog57uT5p2f5a2X5q616YeN5ZG95ZCNXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUmVOYW1lID0gJ2VuZCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOe7hOS7tuWGhemDqCBpbnB1dCDnmoQgaWQg5YC8XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRJZD86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICog57uE5Lu25YaF6YOoIGlucHV0IOeahCBpZCDlgLxcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRJZD86IHN0cmluZztcclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrmuIXpmaTmjInpkq5cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydEFsbG93Q2xlYXI/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrmuIXpmaTmjInpkq5cclxuICAgKi9cclxuICBASW5wdXQoKSBuekFsbG93Q2xlYXIgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuue7k+adn+a4hemZpOaMiemSrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZEFsbG93Q2xlYXI/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOiHquWKqOiOt+WPlueEpueCuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0QXV0b0ZvY3VzPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICog6Ieq5Yqo6I635Y+W54Sm54K5XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kQXV0b0ZvY3VzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmta7lsYLmmK/lkKblupTluKbmnInog4zmma/mnb9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydEJhY2tkcm9wPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICog5rWu5bGC5piv5ZCm5bqU5bim5pyJ6IOM5pmv5p2/XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kQmFja2Ryb3A/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOm7mOiupOmdouadv+aXpeacn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0RGVmYXVsdFBpY2tlclZhbHVlPzogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICog6buY6K6k6Z2i5p2/5pel5pyfXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kRGVmYXVsdFBpY2tlclZhbHVlPzogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pi+56S65q2k5Yi7LeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0U2hvd05vdyA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5pi+56S65q2k5Yi7Lee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFNob3dOb3cgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiDmmL7npLrku4rlpKkt5byA5aeL5ZKM57uT5p2f5ZCM5pe255Sf5pWIXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpTaG93VG9kYXkgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIOaYvuekuuS7iuWkqS3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFNob3dUb2RheT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5pi+56S65LuK5aSpLee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFNob3dUb2RheT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYvuekuuaXtumXtOmAieaLqeWZqC3lvIDlp4vlkoznu5PmnZ/lkIzml7bnlJ/mlYhcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNob3dUaW1lOiBTdXBwb3J0VGltZU9wdGlvbnMgfCBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog5pi+56S65pe26Ze06YCJ5oup5ZmoLeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0U2hvd1RpbWU/OiBTdXBwb3J0VGltZU9wdGlvbnMgfCBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaYvuekuuaXtumXtOmAieaLqeWZqC3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRTaG93VGltZT86IFN1cHBvcnRUaW1lT3B0aW9ucyB8IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIOmineWklueahOW8ueWHuuaXpeWOhiBjbGFzc05hbWVcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydERyb3Bkb3duQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDpop3lpJbnmoTlvLnlh7rml6XljoYgY2xhc3NOYW1lXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kRHJvcGRvd25DbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5bGV56S655qE5pel5pyf5qC85byP77yM6KeBbnpGb3JtYXTnibnliKvor7TmmI5cclxuICAgKi9cclxuICBASW5wdXQoKSBuekZvcm1hdD86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICog5Li6IGlucHV0IOagh+etvuiuvue9ruWPquivu+WxnuaAp++8iOmBv+WFjeWcqOenu+WKqOiuvuWkh+S4iuinpuWPkeWwj+mUruebmO+8iVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0SW5wdXRSZWFkT25seT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4uiBpbnB1dCDmoIfnrb7orr7nva7lj6ror7vlsZ7mgKfvvIjpgb/lhY3lnKjnp7vliqjorr7lpIfkuIrop6blj5HlsI/plK7nm5jvvIlcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRJbnB1dFJlYWRPbmx5PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDlm73pmYXljJbphY3nva5cclxuICAgKi9cclxuICBASW5wdXQoKSBuekxvY2FsZT86IE56RGF0ZVBpY2tlckkxOG5JbnRlcmZhY2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIOmineWklueahOW8ueWHuuaXpeWOhuagt+W8j1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0UG9wdXBTdHlsZT86IG9iamVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICog6aKd5aSW55qE5by55Ye65pel5Y6G5qC35byPXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUG9wdXBTdHlsZT86IG9iamVjdDtcclxuICAvKipcclxuICAgKiDlnKjpnaLmnb/kuK3mt7vliqDpop3lpJbnmoTpobXohJpcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFJlbmRlckV4dHJhRm9vdGVyPzogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZyB8IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nPjtcclxuXHJcbiAgLyoqXHJcbiAgICog5Zyo6Z2i5p2/5Lit5re75Yqg6aKd5aSW55qE6aG16ISaXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUmVuZGVyRXh0cmFGb290ZXI/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmc+O1xyXG4gIC8qKlxyXG4gICAqIOiHquWumuS5ieeahOWQjue8gOWbvuagh1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0U3VmZml4SWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIOiHquWumuS5ieeahOWQjue8gOWbvuagh1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFN1ZmZpeEljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xyXG4gIC8qKlxyXG4gICAqIOiHquWumuS5iea4suafk+aXpeacny3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydERhdGVSZW5kZXI/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgRnVuY3Rpb25Qcm9wPFRlbXBsYXRlUmVmPERhdGU+IHwgc3RyaW5nPjtcclxuICAvKipcclxuICAgKiDoh6rlrprkuYnmuLLmn5Pml6XmnJ8t57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kRGF0ZVJlbmRlcj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmcgfCBGdW5jdGlvblByb3A8VGVtcGxhdGVSZWY8RGF0ZT4gfCBzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiDlvLnlh7rml6XljoblkozlhbPpl63ml6XljobnmoTlm57osINcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbnp4U3RhcnRPbk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIOW8ueWHuuaXpeWOhuWSjOWFs+mXreaXpeWOhueahOWbnuiwg1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuenhFbmRPbk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9L5oyJ6ZKu54K55Ye7XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eFN0YXJ0T25PayA9IG5ldyBFdmVudEVtaXR0ZXI8Q29tcGF0aWJsZURhdGUgfCBudWxsPigpO1xyXG5cclxuICAvKipcclxuICAgKiBPS+aMiemSrueCueWHu1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuenhFbmRPbk9rID0gbmV3IEV2ZW50RW1pdHRlcjxDb21wYXRpYmxlRGF0ZSB8IG51bGw+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIOW+hemAieaXpeacn+WPkeeUn+WPmOWMlueahOWbnuiwg1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuenhTdGFydE9uQ2FsZW5kYXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPChEYXRlIHwgbnVsbClbXT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5b6F6YCJ5pel5pyf5Y+R55Sf5Y+Y5YyW55qE5Zue6LCDXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eEVuZE9uQ2FsZW5kYXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPChEYXRlIHwgbnVsbClbXT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5b6F6YCJ5pel5pyf5Y+R55Sf5Y+Y5YyW55qE5Zue6LCDXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG56eFN0YXJ0T25QYW5lbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgTnpEYXRlTW9kZVtdIHwgc3RyaW5nW10+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIOW+hemAieaXpeacn+WPkeeUn+WPmOWMlueahOWbnuiwg1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuenhFbmRPblBhbmVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBOekRhdGVNb2RlW10gfCBzdHJpbmdbXT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pyA5bCP5pe26Ze0XHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhcnRNaW5EYXRlVGltZT86IERpc2FibGVkRGF0ZVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIOacgOWkp+aXtumXtFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVuZE1heERhdGVUaW1lPzogRGlzYWJsZWREYXRlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pyA5aSn5pe26Ze0XHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhcnRNYXhEYXRlVGltZT86IERpc2FibGVkRGF0ZVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIOacgOWwj+aXtumXtFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVuZE1pbkRhdGVUaW1lPzogRGlzYWJsZWREYXRlVHlwZTtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgX2RlZmF1bHRTdGFydE1heERhdGVUaW1lKCk6IERhdGUgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLm56eFZhbHVlW3RoaXMubnp4RW5kUmVOYW1lXTtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXQgX2RlZmF1bHRFbmRNaW5EYXRlVGltZSgpOiBEYXRlIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5uenhWYWx1ZVt0aGlzLm56eFN0YXJ0UmVOYW1lXTtcclxuICB9XHJcblxyXG4gIGdldCBzdGFydERpc2FibGVkVGltZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm56eFN0YXJ0U2hvd1RpbWUgPT0gbnVsbCA/IHRoaXMubnpTaG93VGltZSA6IHRoaXMubnp4U3RhcnRTaG93VGltZTtcclxuICB9XHJcblxyXG4gIGdldCBlbmREaXNhYmxlZFRpbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uenhFbmRTaG93VGltZSA9PSBudWxsID8gdGhpcy5uelNob3dUaW1lIDogdGhpcy5uenhFbmRTaG93VGltZTtcclxuICB9XHJcblxyXG4gIG56eFN0YXJ0RGlzYWJsZWRUaW1lOiBEaXNhYmxlZFRpbWVGbiA9IGN1cnJlbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLnN0YXJ0RGlzYWJsZWRUaW1lIHx8ICFjdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHREaXNhYmxlZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGN1cnJlbnQgYXMgRGF0ZTtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKGRhdGUsIHRoaXMuc3RhcnRNaW5EYXRlVGltZSk7XHJcbiAgICBjb25zdCBtYXhWYWx1ZSA9IGdldFJlYWxEYXRlVGltZShcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGhpcy5zdGFydE1heERhdGVUaW1lID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0U3RhcnRNYXhEYXRlVGltZSA6IHRoaXMuc3RhcnRNYXhEYXRlVGltZVxyXG4gICAgKTtcclxuICAgIGlmICghbWluVmFsdWUgJiYgIW1heFZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHREaXNhYmxlZFRpbWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFRpbWUoZGF0ZSwgbWluVmFsdWUsIG1heFZhbHVlKTtcclxuICB9O1xyXG5cclxuICBuenhFbmREaXNhYmxlZFRpbWU/OiBEaXNhYmxlZFRpbWVGbiA9IGN1cnJlbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmVuZERpc2FibGVkVGltZSB8fCAhY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0RGlzYWJsZWRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBjdXJyZW50IGFzIERhdGU7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IGdldFJlYWxEYXRlVGltZShcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGhpcy5lbmRNaW5EYXRlVGltZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdEVuZE1pbkRhdGVUaW1lIDogdGhpcy5lbmRNaW5EYXRlVGltZVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKGRhdGUsIHRoaXMuZW5kTWF4RGF0ZVRpbWUpO1xyXG4gICAgaWYgKCFtaW5WYWx1ZSAmJiAhbWF4VmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdERpc2FibGVkVGltZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVGltZShkYXRlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluemgeeUqOeahOaXtumXtOmDqOWIhlxyXG4gICAqIEBwYXJhbSBkYXRlIOW9k+WJjeaXpeacn1xyXG4gICAqIEBwYXJhbSBtaW5WYWx1ZSDmnIDlsI/ml6XmnJ/lgLxcclxuICAgKiBAcGFyYW0gbWF4VmFsdWUg5pyA5aSn5pel5pyf5YC8XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGdldERpc2FibGVkVGltZShcclxuICAgIGRhdGU6IERhdGUsXHJcbiAgICBtaW5WYWx1ZTogRGF0ZSB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICBtYXhWYWx1ZTogRGF0ZSB8IG51bGwgfCB1bmRlZmluZWRcclxuICApOiBEaXNhYmxlZFRpbWVDb25maWcge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBnZXRUaW1lVmFsdWUoZGF0ZSwgbWluVmFsdWUpO1xyXG5cclxuICAgIGxldCBob3VyczogbnVtYmVyW10gPSBbXTtcclxuICAgIGxldCBtaW51dGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgbGV0IHNlY29uZHM6IG51bWJlcltdID0gW107XHJcbiAgICBpZiAoc3RhcnQpIHtcclxuICAgICAgY29uc3QgZXF1YWxzSG91ciA9IHN0YXJ0LmhvdXIgPT09IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgaG91cnMgPSBOenhVdGlscy5yYW5nZSgwLCBzdGFydC5ob3VyKTtcclxuICAgICAgbWludXRlcyA9IGVxdWFsc0hvdXIgPyBOenhVdGlscy5yYW5nZSgwLCBzdGFydC5taW51dGUpIDogW107XHJcbiAgICAgIHNlY29uZHMgPSBlcXVhbHNIb3VyICYmIHN0YXJ0Lm1pbnV0ZSA9PT0gZGF0ZS5nZXRNaW51dGVzKCkgPyBOenhVdGlscy5yYW5nZSgwLCBzdGFydC5zZWNvbmQpIDogW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW5kID0gZ2V0VGltZVZhbHVlKGRhdGUsIG1heFZhbHVlKTtcclxuICAgIGlmIChlbmQpIHtcclxuICAgICAgY29uc3QgZXF1YWxzSG91ciA9IGVuZC5ob3VyID09PSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgIGhvdXJzID0gaG91cnMuY29uY2F0KE56eFV0aWxzLnJhbmdlKGVuZC5ob3VyICsgMSwgMjQpKTtcclxuICAgICAgbWludXRlcyA9IGVxdWFsc0hvdXIgPyBtaW51dGVzLmNvbmNhdChOenhVdGlscy5yYW5nZShlbmQubWludXRlICsgMSwgNjApKSA6IG1pbnV0ZXM7XHJcbiAgICAgIHNlY29uZHMgPVxyXG4gICAgICAgIGVxdWFsc0hvdXIgJiYgZW5kLm1pbnV0ZSA9PT0gZGF0ZS5nZXRNaW51dGVzKCkgPyBzZWNvbmRzLmNvbmNhdChOenhVdGlscy5yYW5nZShlbmQuc2Vjb25kICsgMSwgNjApKSA6IHNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbnpEaXNhYmxlZEhvdXJzOiAoKSA9PiBob3VycyxcclxuICAgICAgbnpEaXNhYmxlZE1pbnV0ZXM6IGhvdXIgPT4gKGhvdXIgPT09IHN0YXJ0Py5ob3VyIHx8IGhvdXIgPT09IGVuZD8uaG91ciA/IG1pbnV0ZXMgOiBbXSksXHJcbiAgICAgIG56RGlzYWJsZWRTZWNvbmRzOiAoaG91ciwgbWludXRlKSA9PlxyXG4gICAgICAgIChob3VyID09PSBzdGFydD8uaG91ciAmJiBtaW51dGUgPT09IHN0YXJ0Py5taW51dGUpIHx8IChob3VyID09PSBlbmQ/LmhvdXIgJiYgbWludXRlID09PSBlbmQ/Lm1pbnV0ZSlcclxuICAgICAgICAgID8gc2Vjb25kc1xyXG4gICAgICAgICAgOiBbXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4jeWPr+mAieaLqeeahOaXpeacn1xyXG4gICAqL1xyXG4gIG56eFN0YXJ0RGlzYWJsZWREYXRlOiAoY3VycmVudDogRGF0ZSkgPT4gYm9vbGVhbiA9IGRhdGUgPT4ge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IGdldFJlYWxEYXRlVGltZShkYXRlLCB0aGlzLnN0YXJ0TWluRGF0ZVRpbWUpO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSBnZXRSZWFsRGF0ZVRpbWUoXHJcbiAgICAgIGRhdGUsXHJcbiAgICAgIHRoaXMuc3RhcnRNYXhEYXRlVGltZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdFN0YXJ0TWF4RGF0ZVRpbWUgOiB0aGlzLnN0YXJ0TWF4RGF0ZVRpbWVcclxuICAgICk7XHJcbiAgICBpZiAoIW1heFZhbHVlICYmICFtaW5WYWx1ZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBkYXRlIDwgbWluXHJcbiAgICBpZiAobWluVmFsdWUgJiYgdGhpcy5nZXREaXNhYmxlZE1pbkRhdGUoZGF0ZSwgbWluVmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRhdGUgPiBtYXhcclxuICAgIGlmIChtYXhWYWx1ZSAmJiB0aGlzLmdldERpc2FibGVkTWF4RGF0ZShkYXRlLCBtYXhWYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog5LiN5Y+v6YCJ5oup55qE5pel5pyfXHJcbiAgICovXHJcbiAgbnp4RW5kRGlzYWJsZWREYXRlOiAoY3VycmVudDogRGF0ZSkgPT4gYm9vbGVhbiA9IGRhdGUgPT4ge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IGdldFJlYWxEYXRlVGltZShcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGhpcy5lbmRNaW5EYXRlVGltZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdEVuZE1pbkRhdGVUaW1lIDogdGhpcy5lbmRNaW5EYXRlVGltZVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKGRhdGUsIHRoaXMuZW5kTWF4RGF0ZVRpbWUpO1xyXG4gICAgaWYgKCFtYXhWYWx1ZSAmJiAhbWluVmFsdWUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRhdGUgPiBtYXhcclxuICAgIGlmIChtYXhWYWx1ZSAmJiB0aGlzLmdldERpc2FibGVkTWF4RGF0ZShkYXRlLCBtYXhWYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGF0ZSA8IG1pblxyXG4gICAgaWYgKG1pblZhbHVlICYmIHRoaXMuZ2V0RGlzYWJsZWRNaW5EYXRlKGRhdGUsIG1pblZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBnZXREaXNhYmxlZE1heERhdGUoZGF0ZTogRGF0ZSwgbWF4VmFsdWU6IERhdGUpIHtcclxuICAgIGlmICh0aGlzLm56TW9kZSA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgIGlmIChnZXRTdGFydERhdGUoZGF0ZSkgPiBtYXhWYWx1ZS5nZXRUaW1lKCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm56TW9kZSA9PT0gJ3dlZWsnKSB7XHJcbiAgICAgIGlmIChnZXRTdGFydFdlZWtEYXRlKGRhdGUpID4gbWF4VmFsdWUuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5uek1vZGUgPT09ICdtb250aCcpIHtcclxuICAgICAgaWYgKGdldFN0YXJ0TW9udGhEYXRlKGRhdGUpID4gbWF4VmFsdWUuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5uek1vZGUgPT09ICd5ZWFyJykge1xyXG4gICAgICBpZiAoZ2V0U3RhcnRZZWFyRGF0ZShkYXRlKSA+IG1heFZhbHVlLmdldFRpbWUoKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGF0ZSA+IG1heFZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREaXNhYmxlZE1pbkRhdGUoZGF0ZTogRGF0ZSwgbWluVmFsdWU6IERhdGUpIHtcclxuICAgIGlmICh0aGlzLm56TW9kZSA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgIGlmIChtaW5WYWx1ZS5nZXRUaW1lKCkgPiBnZXRFbmREYXRlKGRhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5uek1vZGUgPT09ICd3ZWVrJykge1xyXG4gICAgICBpZiAobWluVmFsdWUuZ2V0VGltZSgpID4gZ2V0RW5kV2Vla0RhdGUoZGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLm56TW9kZSA9PT0gJ21vbnRoJykge1xyXG4gICAgICBpZiAobWluVmFsdWUuZ2V0VGltZSgpID4gZ2V0RW5kTW9udGhEYXRlKGRhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5uek1vZGUgPT09ICd5ZWFyJykge1xyXG4gICAgICBpZiAobWluVmFsdWUuZ2V0VGltZSgpID4gZ2V0RW5kWWVhckRhdGUoZGF0ZSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG1pblZhbHVlID4gZGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdNb2RlbENoYW5nZSgpIHtcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5uenhWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRldGltZVZhbHVlVHlwZSk6IHZvaWQge1xyXG4gICAgdGhpcy5uenhWYWx1ZSA9IHZhbHVlIHx8IHt9O1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMubnp4RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IERhdGV0aW1lVmFsdWVUeXBlKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IERhdGV0aW1lVmFsdWVUeXBlKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcclxuICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xyXG59XHJcbiIsIjxuengtYmV0d2VlblxyXG4gIFtuenhEaXNhYmxlZF09XCJuenhEaXNhYmxlZFwiXHJcbiAgW256eFN0YXJ0RGlzYWJsZWRdPVwibnp4U3RhcnREaXNhYmxlZFwiXHJcbiAgW256eEVuZERpc2FibGVkXT1cIm56eEVuZERpc2FibGVkXCJcclxuICBbbnp4U2l6ZV09XCJuenhTaXplXCJcclxuPlxyXG4gIDxuZy1jb250YWluZXJcclxuICAgIHN0YXJ0XHJcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICB0eXBlVGVtcGxhdGU7XHJcbiAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAkaW1wbGljaXQ6IHtcclxuICAgICAgICAgIGRpcjogbnp4U3RhcnRSZU5hbWUsXHJcbiAgICAgICAgICBkaXNhYmxlZDogbnp4U3RhcnREaXNhYmxlZCAhPSBudWxsID8gbnp4U3RhcnREaXNhYmxlZCA6IG56eERpc2FibGVkLFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IG56eFN0YXJ0UGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICBuelN1ZmZpeEljb246IG56eFN0YXJ0U3VmZml4SWNvbixcclxuICAgICAgICAgIG56QWxsb3dDbGVhcjogbnp4U3RhcnRBbGxvd0NsZWFyLFxyXG4gICAgICAgICAgbnpSZW5kZXJFeHRyYUZvb3Rlcjogbnp4U3RhcnRSZW5kZXJFeHRyYUZvb3RlcixcclxuICAgICAgICAgIG56QmFja2Ryb3A6IG56eFN0YXJ0QmFja2Ryb3AsXHJcbiAgICAgICAgICBuekF1dG9Gb2N1czogbnp4U3RhcnRBdXRvRm9jdXMsXHJcbiAgICAgICAgICBuekRhdGVSZW5kZXI6IG56eFN0YXJ0RGF0ZVJlbmRlcixcclxuICAgICAgICAgIG56RGVmYXVsdFBpY2tlclZhbHVlOiBuenhTdGFydERlZmF1bHRQaWNrZXJWYWx1ZSxcclxuICAgICAgICAgIG56RGlzYWJsZWREYXRlOiBuenhTdGFydERpc2FibGVkRGF0ZSxcclxuICAgICAgICAgIG56RGlzYWJsZWRUaW1lOiBuenhTdGFydERpc2FibGVkVGltZSxcclxuICAgICAgICAgIG56RHJvcGRvd25DbGFzc05hbWU6IG56eFN0YXJ0RHJvcGRvd25DbGFzc05hbWUsXHJcbiAgICAgICAgICBueklkOiBuenhTdGFydElkLFxyXG4gICAgICAgICAgbnpJbnB1dFJlYWRPbmx5OiBuenhTdGFydElucHV0UmVhZE9ubHksXHJcbiAgICAgICAgICBuekxvY2FsZTogbnpMb2NhbGUsXHJcbiAgICAgICAgICBuelBvcHVwU3R5bGU6IG56eFN0YXJ0UG9wdXBTdHlsZSxcclxuICAgICAgICAgIG56U2hvd05vdzogbnp4U3RhcnRTaG93Tm93LFxyXG4gICAgICAgICAgbnpTaG93VGltZTogbnp4U3RhcnRTaG93VGltZSxcclxuICAgICAgICAgIG56U2hvd1RvZGF5OiBuenhTdGFydFNob3dUb2RheSxcclxuICAgICAgICAgIG56T25PcGVuQ2hhbmdlOiBuenhTdGFydE9uT3BlbkNoYW5nZSxcclxuICAgICAgICAgIG56T25Pazogbnp4U3RhcnRPbk9rLFxyXG4gICAgICAgICAgbnpPbkNhbGVuZGFyQ2hhbmdlOiBuenhTdGFydE9uQ2FsZW5kYXJDaGFuZ2UsXHJcbiAgICAgICAgICBuek9uUGFuZWxDaGFuZ2U6IG56eFN0YXJ0T25QYW5lbENoYW5nZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXCJcclxuICA+PC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgZW5kXHJcbiAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICB0eXBlVGVtcGxhdGU7XHJcbiAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAkaW1wbGljaXQ6IHtcclxuICAgICAgICAgIGRpcjogbnp4RW5kUmVOYW1lLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IG56eEVuZERpc2FibGVkICE9IG51bGwgPyBuenhFbmREaXNhYmxlZCA6IG56eERpc2FibGVkLFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IG56eEVuZFBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgbnpTdWZmaXhJY29uOiBuenhFbmRTdWZmaXhJY29uLFxyXG4gICAgICAgICAgbnpBbGxvd0NsZWFyOiBuenhFbmRBbGxvd0NsZWFyLFxyXG4gICAgICAgICAgbnpSZW5kZXJFeHRyYUZvb3Rlcjogbnp4RW5kUmVuZGVyRXh0cmFGb290ZXIsXHJcbiAgICAgICAgICBuekJhY2tkcm9wOiBuenhFbmRCYWNrZHJvcCxcclxuICAgICAgICAgIG56QXV0b0ZvY3VzOiBuenhFbmRBdXRvRm9jdXMsXHJcbiAgICAgICAgICBuekRhdGVSZW5kZXI6IG56eEVuZERhdGVSZW5kZXIsXHJcbiAgICAgICAgICBuekRlZmF1bHRQaWNrZXJWYWx1ZTogbnp4RW5kRGVmYXVsdFBpY2tlclZhbHVlLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZERhdGU6IG56eEVuZERpc2FibGVkRGF0ZSxcclxuICAgICAgICAgIG56RGlzYWJsZWRUaW1lOiBuenhFbmREaXNhYmxlZFRpbWUsXHJcbiAgICAgICAgICBuekRyb3Bkb3duQ2xhc3NOYW1lOiBuenhFbmREcm9wZG93bkNsYXNzTmFtZSxcclxuICAgICAgICAgIG56SWQ6IG56eEVuZElkLFxyXG4gICAgICAgICAgbnpJbnB1dFJlYWRPbmx5OiBuenhFbmRJbnB1dFJlYWRPbmx5LFxyXG4gICAgICAgICAgbnpMb2NhbGU6IG56TG9jYWxlLFxyXG4gICAgICAgICAgbnpQb3B1cFN0eWxlOiBuenhFbmRQb3B1cFN0eWxlLFxyXG4gICAgICAgICAgbnpTaG93Tm93OiBuenhFbmRTaG93Tm93LFxyXG4gICAgICAgICAgbnpTaG93VGltZTogbnp4RW5kU2hvd1RpbWUsXHJcbiAgICAgICAgICBuelNob3dUb2RheTogbnp4RW5kU2hvd1RvZGF5LFxyXG4gICAgICAgICAgbnpPbk9wZW5DaGFuZ2U6IG56eEVuZE9uT3BlbkNoYW5nZSxcclxuICAgICAgICAgIG56T25Pazogbnp4RW5kT25PayxcclxuICAgICAgICAgIG56T25DYWxlbmRhckNoYW5nZTogbnp4RW5kT25DYWxlbmRhckNoYW5nZSxcclxuICAgICAgICAgIG56T25QYW5lbENoYW5nZTogbnp4RW5kT25QYW5lbENoYW5nZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXCJcclxuICA+PC9uZy1jb250YWluZXI+XHJcbjwvbnp4LWJldHdlZW4+XHJcblxyXG48bmctdGVtcGxhdGUgI3R5cGVUZW1wbGF0ZSBsZXQtZGF0YT5cclxuICA8bnotZGF0ZS1waWNrZXJcclxuICAgIFsobmdNb2RlbCldPVwibnp4VmFsdWVbZGF0YS5kaXJdXCJcclxuICAgIChuZ01vZGVsQ2hhbmdlKT1cIm5nTW9kZWxDaGFuZ2UoKVwiXHJcbiAgICBbbnpEaXNhYmxlZF09XCJkYXRhLmRpc2FibGVkXCJcclxuICAgIFtuelBsYWNlSG9sZGVyXT1cImRhdGEucGxhY2Vob2xkZXJcIlxyXG4gICAgW256U2l6ZV09XCJuenhTaXplXCJcclxuICAgIFtuek1vZGVdPVwibnpNb2RlXCJcclxuICAgIFtuelN1ZmZpeEljb25dPVwiZGF0YS5uelN1ZmZpeEljb24gfHwgJ2NhbGVuZGFyJ1wiXHJcbiAgICBbbnpBbGxvd0NsZWFyXT1cIm56QWxsb3dDbGVhciB8fCBkYXRhLm56QWxsb3dDbGVhclwiXHJcbiAgICBbbnpSZW5kZXJFeHRyYUZvb3Rlcl09XCJkYXRhLm56UmVuZGVyRXh0cmFGb290ZXJcIlxyXG4gICAgW256QmFja2Ryb3BdPVwiZGF0YS5uekJhY2tkcm9wXCJcclxuICAgIFtuekF1dG9Gb2N1c109XCJkYXRhLm56QXV0b0ZvY3VzXCJcclxuICAgIFtuekRhdGVSZW5kZXJdPVwiZGF0YS5uekRhdGVSZW5kZXJcIlxyXG4gICAgW256RGVmYXVsdFBpY2tlclZhbHVlXT1cImRhdGEubnpEZWZhdWx0UGlja2VyVmFsdWVcIlxyXG4gICAgW256RGlzYWJsZWREYXRlXT1cImRhdGEubnpEaXNhYmxlZERhdGVcIlxyXG4gICAgW256RGlzYWJsZWRUaW1lXT1cImRhdGEubnpEaXNhYmxlZFRpbWVcIlxyXG4gICAgW256RHJvcGRvd25DbGFzc05hbWVdPVwiZGF0YS5uekRyb3Bkb3duQ2xhc3NOYW1lXCJcclxuICAgIFtuekZvcm1hdF09XCJuekZvcm1hdFwiXHJcbiAgICBbbnpJZF09XCJkYXRhLm56SWRcIlxyXG4gICAgW256SW5wdXRSZWFkT25seV09XCJkYXRhLm56SW5wdXRSZWFkT25seVwiXHJcbiAgICBbbnpMb2NhbGVdPVwibnpMb2NhbGVcIlxyXG4gICAgW256UG9wdXBTdHlsZV09XCJkYXRhLm56UG9wdXBTdHlsZVwiXHJcbiAgICBbbnpTaG93Tm93XT1cImRhdGEubnpTaG93Tm93XCJcclxuICAgIFtuelNob3dUaW1lXT1cImRhdGEubnpTaG93VGltZSB8fCBuelNob3dUaW1lXCJcclxuICAgIFtuelNob3dUb2RheV09XCJuelNob3dUb2RheSB8fCBkYXRhLm56U2hvd1RvZGF5XCJcclxuICAgIChuek9uT3BlbkNoYW5nZSk9XCJkYXRhLm56T25PcGVuQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAobnpPbk9rKT1cImRhdGEubnpPbk9rLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAobnpPbkNhbGVuZGFyQ2hhbmdlKT1cImRhdGEubnpPbkNhbGVuZGFyQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAobnpPblBhbmVsQ2hhbmdlKT1cImRhdGEubnpPblBhbmVsQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgPjwvbnotZGF0ZS1waWNrZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==