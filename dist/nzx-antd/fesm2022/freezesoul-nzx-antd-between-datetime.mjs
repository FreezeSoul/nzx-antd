import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i3 from '@freezesoul/nzx-antd/between';
import { NzxBetweenComponent, NzxBetweenModule } from '@freezesoul/nzx-antd/between';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/date-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

function getStartDate(date) {
    const time = new Date(date.getTime());
    time.setHours(0, 0, 0, 0);
    return time.getTime();
}
function getEndDate(date) {
    const time = new Date(date.getTime());
    time.setHours(23, 59, 59, 999);
    return time.getTime();
}
function getStartWeekDate(date) {
    const time = new Date(date.getTime());
    const day = time.getDay();
    time.setDate(time.getDate() - (day === 0 ? 7 : day));
    time.setHours(0, 0, 0, 0);
    return time.getTime();
}
function getEndWeekDate(date) {
    const time = new Date(date.getTime());
    const day = time.getDay();
    time.setDate(time.getDate() + 7 - (day === 0 ? 7 : day));
    time.setHours(23, 59, 59, 999);
    return time.getTime();
}
function getStartMonthDate(date) {
    const time = new Date(date.getTime());
    time.setDate(1);
    time.setHours(0, 0, 0, 0);
    return time.getTime();
}
function getEndMonthDate(date) {
    const time = new Date(date.getTime());
    time.setDate(0);
    time.setHours(23, 59, 59, 999);
    return time.getTime();
}
function getStartYearDate(date) {
    const time = new Date(date.getTime());
    time.setMonth(1, 1);
    time.setHours(0, 0, 0, 0);
    return time.getTime();
}
function getEndYearDate(date) {
    const time = new Date(date.getTime());
    time.setMonth(12, 0);
    time.setHours(23, 59, 59, 999);
    return time.getTime();
}
function getTimeValue(date, value) {
    // 检查是否在同一天, 不在同一天不禁用时间
    if (!value || getStartDate(value) !== getStartDate(date)) {
        return null;
    }
    return { hour: value.getHours(), minute: value.getMinutes(), second: value.getSeconds() };
}
/**
 * 获取Datetime 真实值
 * @param date,
 * @param disabledDateType
 */
function getRealDateTime(date, disabledDateType) {
    if (!disabledDateType) {
        return null;
    }
    if (NzxUtils.isFunction(disabledDateType)) {
        return disabledDateType(date);
    }
    if (NzxUtils.isDate(disabledDateType)) {
        return disabledDateType;
    }
    return new Date(disabledDateType);
}

/**
 * 包含开始日期和结束日期两个日期控件，默认实现开始时间小于结束日期，也可以设置日期的最大值和最小值。
 *
 * 绑定的表单数据为 `{ start: Date, end: Date }`，修改属`start`和`end`属性名称可以使用`nzxStartReName`和`nzxEndReName`。
 */
class NzxBetweenDatetimeComponent extends NzxBetweenComponent {
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

class NzxBetweenDatetimeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, declarations: [NzxBetweenDatetimeComponent], imports: [CommonModule, FormsModule, NzxBetweenModule, NzDatePickerModule], exports: [NzxBetweenDatetimeComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, imports: [CommonModule, FormsModule, NzxBetweenModule, NzDatePickerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxBetweenDatetimeComponent],
                    imports: [CommonModule, FormsModule, NzxBetweenModule, NzDatePickerModule],
                    exports: [NzxBetweenDatetimeComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxBetweenDatetimeComponent, NzxBetweenDatetimeModule, getEndDate, getEndMonthDate, getEndWeekDate, getEndYearDate, getRealDateTime, getStartDate, getStartMonthDate, getStartWeekDate, getStartYearDate, getTimeValue };
//# sourceMappingURL=freezesoul-nzx-antd-between-datetime.mjs.map
