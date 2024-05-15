import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzxBetweenComponent } from '@freezesoul/nzx-antd/between';
import { getRealDateTime } from '@freezesoul/nzx-antd/between-datetime';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/time-picker";
import * as i3 from "@angular/forms";
import * as i4 from "@freezesoul/nzx-antd/between";
export class NzxBetweenTimeComponent extends NzxBetweenComponent {
    cdr;
    nzxValue = {};
    get nzDefaultOpenValue() {
        return new Date();
    }
    /**
     * 开始字段重命名
     */
    nzxStartReName = 'start';
    /**
     * 结束字段重命名
     */
    nzxEndReName = 'end';
    /**
     * 控件id-开始
     */
    nzxStartId = null;
    /**
     * 设置校验状态-开始
     */
    nzxStartStatus = '';
    /**
     * 小时选项间隔-开始
     */
    nzxStartHourStep = 1;
    /**
     * 分钟选项间隔-开始
     */
    nzxStartMinuteStep = 1;
    /**
     * 秒选项间隔-开始
     */
    nzxStartSecondStep = 1;
    /**
     * 清除按钮的提示文案-开始
     */
    nzxStartClearText;
    /**
     *  此刻按钮文本
     */
    nzxStartNowText;
    /**
     * 确认按钮文本
     */
    nzxStartOkText;
    /**
     * 弹出层类名
     */
    nzxStartPopupClassName;
    /**
     * 没有值的时候显示的内容
     */
    nzxStartPlaceholder = '起始值';
    /**
     * 选择框底部显示自定义的内容
     */
    nzxStartAddOn;
    /**
     * 当 [ngModel] 不存在时，可以设置面板打开时默认选中的值
     */
    nzxStartDefaultOpenValue;
    /**
     * 展示的时间格式
     */
    nzFormat = 'HH:mm:ss';
    /**
     * 使用12小时制，为true时format默认为h:mm:ss a
     */
    nzxStartUse12Hours = false;
    /**
     * 自定义的后缀图标
     */
    nzxStartSuffixIcon;
    /**
     * 隐藏禁止选择的选项
     */
    nzxStartHideDisabledOptions;
    /**
     * 是否展示清除按钮
     */
    nzxStartAllowEmpty;
    /**
     * 自动获取焦点
     */
    nzxStartAutoFocus;
    /**
     *  浮层是否应带有背景板
     */
    nzxStartBackdrop;
    /**
     * 面板打开/关闭事件
     */
    nzxStartOpenChange = new EventEmitter();
    /**
     * 控件id-结束
     */
    nzxEndId = null;
    /**
     * 设置校验状态-结束
     */
    nzxEndStatus = '';
    /**
     * 小时选项间隔-结束
     */
    nzxEndHourStep = 1;
    /**
     * 分钟选项间隔-结束
     */
    nzxEndMinuteStep = 1;
    /**
     * 秒选项间隔-结束
     */
    nzxEndSecondStep = 1;
    /**
     * 清除按钮的提示文案-结束
     */
    nzxEndClearText;
    /**
     *  此刻按钮文本
     */
    nzxEndNowText;
    /**
     * 确认按钮文本
     */
    nzxEndOkText;
    /**
     * 弹出层类名
     */
    nzxEndPopupClassName;
    /**
     * 没有值的时候显示的内容
     */
    nzxEndPlaceholder = '结束值';
    /**
     * 选择框底部显示自定义的内容
     */
    nzxEndAddOn;
    /**
     * 当 [ngModel] 不存在时，可以设置面板打开时默认选中的值
     */
    nzxEndDefaultOpenValue;
    /**
     * 使用12小时制，为true时format默认为h:mm:ss a
     */
    nzxEndUse12Hours = false;
    /**
     * 自定义的后缀图标
     */
    nzxEndSuffixIcon;
    /**
     * 隐藏禁止选择的选项
     */
    nzxEndHideDisabledOptions;
    /**
     * 是否展示清除按钮
     */
    nzxEndAllowEmpty;
    /**
     * 自动获取焦点
     */
    nzxEndAutoFocus;
    /**
     *  浮层是否应带有背景板
     */
    nzxEndBackdrop;
    /**
     * 面板打开/关闭事件
     */
    nzxEndOpenChange = new EventEmitter();
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
    nzxStartDisabledHours = () => this.getDisabledHour(this.startMinDateTime, this.getDefaultMaxValue(this.startMaxDateTime));
    nzxStartDisabledMinutes = (hour) => this.getDisabledMinutes(hour, this.startMinDateTime, this.getDefaultMaxValue(this.startMaxDateTime));
    nzxStartDisabledSeconds = (hour, minute) => this.getDisabledSeconds(hour, minute, this.startMinDateTime, this.getDefaultMaxValue(this.startMaxDateTime));
    nzxEndDisabledHours = () => this.getDisabledHour(this.getDefaultMinValue(this.endMinDateTime), this.endMaxDateTime);
    nzxEndDisabledMinutes = (hour) => this.getDisabledMinutes(hour, this.getDefaultMinValue(this.endMinDateTime), this.endMaxDateTime);
    nzxEndDisabledSeconds = (hour, minute) => this.getDisabledSeconds(hour, minute, this.endMinDateTime, this.endMaxDateTime);
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
    getDefaultMinValue(date) {
        return date === undefined ? this.nzxValue[this.nzxStartReName] : date;
    }
    getDefaultMaxValue(date) {
        return date === undefined ? this.nzxValue[this.nzxEndReName] : date;
    }
    /**
     * 获取禁用的小时
     * @param minDateTime 最小时间值
     * @param maxDateTime 最大时间值
     * @private
     */
    getDisabledHour(minDateTime, maxDateTime) {
        const minValue = getRealDateTime(new Date(), minDateTime);
        const maxValue = getRealDateTime(new Date(), maxDateTime);
        if (!maxValue && !minValue) {
            return [];
        }
        let hours = [];
        if (minValue) {
            hours = NzxUtils.range(0, minValue.getHours());
        }
        if (maxValue) {
            hours = hours.concat(NzxUtils.range(maxValue.getHours() + 1, 24));
        }
        return hours;
    }
    /**
     * 获取禁用的分钟
     * @param hour 当前小时
     * @param minDateTime 最小时间值
     * @param maxDateTime 最大时间值
     * @private
     */
    getDisabledMinutes(hour, minDateTime, maxDateTime) {
        const minValue = getRealDateTime(new Date(), minDateTime);
        const maxValue = getRealDateTime(new Date(), maxDateTime);
        if (!maxValue && !minValue) {
            return [];
        }
        let minutes = [];
        if (minValue && minValue.getHours() === hour) {
            minutes = NzxUtils.range(0, minValue.getMinutes());
        }
        if (maxValue && maxValue.getHours() === hour) {
            minutes = minutes.concat(NzxUtils.range(maxValue.getMinutes() + 1, 60));
        }
        return minutes;
    }
    /**
     * 获取禁用的秒数
     * @param hour 当前小时
     * @param minute 当前分钟
     * @param minDateTime 最小时间值
     * @param maxDateTime 最大时间值
     * @private
     */
    getDisabledSeconds(hour, minute, minDateTime, maxDateTime) {
        const minValue = getRealDateTime(new Date(), minDateTime);
        const maxValue = getRealDateTime(new Date(), maxDateTime);
        if (!maxValue && !minValue) {
            return [];
        }
        let seconds = [];
        if (minValue && minValue.getHours() === hour && minValue.getMinutes() === minute) {
            seconds = NzxUtils.range(0, minValue.getSeconds());
        }
        if (maxValue && maxValue.getHours() === hour && maxValue.getMinutes() === minute) {
            seconds = seconds.concat(NzxUtils.range(maxValue.getSeconds() + 1, 60));
        }
        return seconds;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenTimeComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxBetweenTimeComponent, selector: "nzx-between-time", inputs: { nzxStartReName: "nzxStartReName", nzxEndReName: "nzxEndReName", nzxStartId: "nzxStartId", nzxStartStatus: "nzxStartStatus", nzxStartHourStep: "nzxStartHourStep", nzxStartMinuteStep: "nzxStartMinuteStep", nzxStartSecondStep: "nzxStartSecondStep", nzxStartClearText: "nzxStartClearText", nzxStartNowText: "nzxStartNowText", nzxStartOkText: "nzxStartOkText", nzxStartPopupClassName: "nzxStartPopupClassName", nzxStartPlaceholder: "nzxStartPlaceholder", nzxStartAddOn: "nzxStartAddOn", nzxStartDefaultOpenValue: "nzxStartDefaultOpenValue", nzFormat: "nzFormat", nzxStartUse12Hours: "nzxStartUse12Hours", nzxStartSuffixIcon: "nzxStartSuffixIcon", nzxStartHideDisabledOptions: "nzxStartHideDisabledOptions", nzxStartAllowEmpty: "nzxStartAllowEmpty", nzxStartAutoFocus: "nzxStartAutoFocus", nzxStartBackdrop: "nzxStartBackdrop", nzxEndId: "nzxEndId", nzxEndStatus: "nzxEndStatus", nzxEndHourStep: "nzxEndHourStep", nzxEndMinuteStep: "nzxEndMinuteStep", nzxEndSecondStep: "nzxEndSecondStep", nzxEndClearText: "nzxEndClearText", nzxEndNowText: "nzxEndNowText", nzxEndOkText: "nzxEndOkText", nzxEndPopupClassName: "nzxEndPopupClassName", nzxEndPlaceholder: "nzxEndPlaceholder", nzxEndAddOn: "nzxEndAddOn", nzxEndDefaultOpenValue: "nzxEndDefaultOpenValue", nzxEndUse12Hours: "nzxEndUse12Hours", nzxEndSuffixIcon: "nzxEndSuffixIcon", nzxEndHideDisabledOptions: "nzxEndHideDisabledOptions", nzxEndAllowEmpty: "nzxEndAllowEmpty", nzxEndAutoFocus: "nzxEndAutoFocus", nzxEndBackdrop: "nzxEndBackdrop", startMinDateTime: "startMinDateTime", endMaxDateTime: "endMaxDateTime", startMaxDateTime: "startMaxDateTime", endMinDateTime: "endMinDateTime" }, outputs: { nzxStartOpenChange: "nzxStartOpenChange", nzxEndOpenChange: "nzxEndOpenChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzxBetweenTimeComponent),
                multi: true
            }
        ], usesInheritance: true, ngImport: i0, template: "<nzx-between\r\n  [nzxDisabled]=\"nzxDisabled\"\r\n  [nzxStartDisabled]=\"nzxStartDisabled\"\r\n  [nzxEndDisabled]=\"nzxEndDisabled\"\r\n  [nzxSize]=\"nzxSize\"\r\n>\r\n  <ng-container\r\n    start\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxStartReName,\r\n          disabled: nzxStartDisabled != null ? nzxStartDisabled : nzxDisabled,\r\n          placeholder: nzxStartPlaceholder,\r\n          nzSuffixIcon: nzxStartSuffixIcon,\r\n          nzBackdrop: nzxStartBackdrop,\r\n          nzAutoFocus: nzxStartAutoFocus,\r\n          nzId: nzxStartId,\r\n          nzAddOn: nzxStartAddOn,\r\n          nzAllowEmpty: nzxStartAllowEmpty,\r\n          nzClearText: nzxStartClearText,\r\n          nzDefaultOpenValue: nzxStartDefaultOpenValue,\r\n          nzDisabledHours: nzxStartDisabledHours,\r\n          nzDisabledMinutes: nzxStartDisabledMinutes,\r\n          nzDisabledSeconds: nzxStartDisabledSeconds,\r\n          nzHideDisabledOptions: nzxStartHideDisabledOptions,\r\n          nzHourStep: nzxStartHourStep,\r\n          nzMinuteStep: nzxStartMinuteStep,\r\n          nzNowText: nzxStartNowText,\r\n          nzOkText: nzxStartOkText,\r\n          nzPopupClassName: nzxStartPopupClassName,\r\n          nzSecondStep: nzxStartSecondStep,\r\n          nzUse12Hours: nzxStartUse12Hours,\r\n          nzOpenChange: nzxStartOpenChange,\r\n          nzStatus: nzxStartStatus\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n  <ng-container\r\n    end\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxEndReName,\r\n          disabled: nzxEndDisabled != null ? nzxEndDisabled : nzxDisabled,\r\n          placeholder: nzxEndPlaceholder,\r\n          nzSuffixIcon: nzxEndSuffixIcon,\r\n          nzBackdrop: nzxEndBackdrop,\r\n          nzAutoFocus: nzxEndAutoFocus,\r\n          nzId: nzxEndId,\r\n          nzAddOn: nzxEndAddOn,\r\n          nzAllowEmpty: nzxEndAllowEmpty,\r\n          nzClearText: nzxEndClearText,\r\n          nzDefaultOpenValue: nzxEndDefaultOpenValue,\r\n          nzDisabledHours: nzxEndDisabledHours,\r\n          nzDisabledMinutes: nzxEndDisabledMinutes,\r\n          nzDisabledSeconds: nzxEndDisabledSeconds,\r\n          nzHideDisabledOptions: nzxEndHideDisabledOptions,\r\n          nzHourStep: nzxEndHourStep,\r\n          nzMinuteStep: nzxEndMinuteStep,\r\n          nzNowText: nzxEndNowText,\r\n          nzOkText: nzxEndOkText,\r\n          nzPopupClassName: nzxEndPopupClassName,\r\n          nzSecondStep: nzxEndSecondStep,\r\n          nzUse12Hours: nzxEndUse12Hours,\r\n          nzOpenChange: nzxEndOpenChange,\r\n          nzStatus: nzxEndStatus\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n</nzx-between>\r\n\r\n<ng-template #typeTemplate let-data>\r\n  <nz-time-picker\r\n    [(ngModel)]=\"nzxValue[data.dir]\"\r\n    (ngModelChange)=\"ngModelChange()\"\r\n    [nzDisabled]=\"data.disabled\"\r\n    [nzPlaceHolder]=\"data.placeholder\"\r\n    [nzSize]=\"nzxSize\"\r\n    [nzSuffixIcon]=\"data.nzSuffixIcon || 'clock-circle'\"\r\n    [nzBackdrop]=\"data.nzBackdrop\"\r\n    [nzAutoFocus]=\"data.nzAutoFocus\"\r\n    [nzFormat]=\"nzFormat == null ? 'HH:mm:ss' : nzFormat\"\r\n    [nzId]=\"data.nzId\"\r\n    [nzAddOn]=\"data.nzAddOn\"\r\n    [nzAllowEmpty]=\"data.nzAllowEmpty == null ? true : data.nzAllowEmpty\"\r\n    [nzClearText]=\"data.nzClearText == null ? '\u6E05\u7A7A' : data.nzClearText\"\r\n    [nzDefaultOpenValue]=\"data.nzDefaultOpenValue || nzDefaultOpenValue\"\r\n    [nzDisabledHours]=\"data.nzDisabledHours\"\r\n    [nzDisabledMinutes]=\"data.nzDisabledMinutes\"\r\n    [nzDisabledSeconds]=\"data.nzDisabledSeconds\"\r\n    [nzHideDisabledOptions]=\"data.nzHideDisabledOptions\"\r\n    [nzHourStep]=\"data.nzHourStep == null ? 1 : data.nzHourStep\"\r\n    [nzMinuteStep]=\"data.nzMinuteStep == null ? 1 : data.nzMinuteStep\"\r\n    [nzNowText]=\"data.nzNowText\"\r\n    [nzOkText]=\"data.nzOkText\"\r\n    [nzPopupClassName]=\"data.nzPopupClassName\"\r\n    [nzSecondStep]=\"data.nzSecondStep == null ? 1 : data.nzSecondStep\"\r\n    [nzUse12Hours]=\"data.nzUse12Hours\"\r\n    (nzOpenChange)=\"data.nzOpenChange.emit($event)\"\r\n    [nzStatus]=\"data.nzStatus\"\r\n  ></nz-time-picker>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.NzTimePickerComponent, selector: "nz-time-picker", inputs: ["nzId", "nzSize", "nzStatus", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzClearText", "nzNowText", "nzOkText", "nzPopupClassName", "nzPlaceHolder", "nzAddOn", "nzDefaultOpenValue", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzFormat", "nzOpen", "nzUse12Hours", "nzSuffixIcon", "nzHideDisabledOptions", "nzAllowEmpty", "nzDisabled", "nzAutoFocus", "nzBackdrop", "nzBorderless", "nzInputReadOnly"], outputs: ["nzOpenChange"], exportAs: ["nzTimePicker"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NzxBetweenComponent, selector: "nzx-between", inputs: ["nzxDisabled", "nzxSize", "nzxStartDisabled", "nzxEndDisabled"], exportAs: ["nzxBetween"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxStartUse12Hours", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxStartHideDisabledOptions", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxStartAllowEmpty", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxStartAutoFocus", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxEndUse12Hours", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxEndHideDisabledOptions", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxEndAllowEmpty", void 0);
__decorate([
    InputBoolean()
], NzxBetweenTimeComponent.prototype, "nzxEndAutoFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenTimeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-between-time', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzxBetweenTimeComponent),
                            multi: true
                        }
                    ], template: "<nzx-between\r\n  [nzxDisabled]=\"nzxDisabled\"\r\n  [nzxStartDisabled]=\"nzxStartDisabled\"\r\n  [nzxEndDisabled]=\"nzxEndDisabled\"\r\n  [nzxSize]=\"nzxSize\"\r\n>\r\n  <ng-container\r\n    start\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxStartReName,\r\n          disabled: nzxStartDisabled != null ? nzxStartDisabled : nzxDisabled,\r\n          placeholder: nzxStartPlaceholder,\r\n          nzSuffixIcon: nzxStartSuffixIcon,\r\n          nzBackdrop: nzxStartBackdrop,\r\n          nzAutoFocus: nzxStartAutoFocus,\r\n          nzId: nzxStartId,\r\n          nzAddOn: nzxStartAddOn,\r\n          nzAllowEmpty: nzxStartAllowEmpty,\r\n          nzClearText: nzxStartClearText,\r\n          nzDefaultOpenValue: nzxStartDefaultOpenValue,\r\n          nzDisabledHours: nzxStartDisabledHours,\r\n          nzDisabledMinutes: nzxStartDisabledMinutes,\r\n          nzDisabledSeconds: nzxStartDisabledSeconds,\r\n          nzHideDisabledOptions: nzxStartHideDisabledOptions,\r\n          nzHourStep: nzxStartHourStep,\r\n          nzMinuteStep: nzxStartMinuteStep,\r\n          nzNowText: nzxStartNowText,\r\n          nzOkText: nzxStartOkText,\r\n          nzPopupClassName: nzxStartPopupClassName,\r\n          nzSecondStep: nzxStartSecondStep,\r\n          nzUse12Hours: nzxStartUse12Hours,\r\n          nzOpenChange: nzxStartOpenChange,\r\n          nzStatus: nzxStartStatus\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n  <ng-container\r\n    end\r\n    *ngTemplateOutlet=\"\r\n      typeTemplate;\r\n      context: {\r\n        $implicit: {\r\n          dir: nzxEndReName,\r\n          disabled: nzxEndDisabled != null ? nzxEndDisabled : nzxDisabled,\r\n          placeholder: nzxEndPlaceholder,\r\n          nzSuffixIcon: nzxEndSuffixIcon,\r\n          nzBackdrop: nzxEndBackdrop,\r\n          nzAutoFocus: nzxEndAutoFocus,\r\n          nzId: nzxEndId,\r\n          nzAddOn: nzxEndAddOn,\r\n          nzAllowEmpty: nzxEndAllowEmpty,\r\n          nzClearText: nzxEndClearText,\r\n          nzDefaultOpenValue: nzxEndDefaultOpenValue,\r\n          nzDisabledHours: nzxEndDisabledHours,\r\n          nzDisabledMinutes: nzxEndDisabledMinutes,\r\n          nzDisabledSeconds: nzxEndDisabledSeconds,\r\n          nzHideDisabledOptions: nzxEndHideDisabledOptions,\r\n          nzHourStep: nzxEndHourStep,\r\n          nzMinuteStep: nzxEndMinuteStep,\r\n          nzNowText: nzxEndNowText,\r\n          nzOkText: nzxEndOkText,\r\n          nzPopupClassName: nzxEndPopupClassName,\r\n          nzSecondStep: nzxEndSecondStep,\r\n          nzUse12Hours: nzxEndUse12Hours,\r\n          nzOpenChange: nzxEndOpenChange,\r\n          nzStatus: nzxEndStatus\r\n        }\r\n      }\r\n    \"\r\n  ></ng-container>\r\n</nzx-between>\r\n\r\n<ng-template #typeTemplate let-data>\r\n  <nz-time-picker\r\n    [(ngModel)]=\"nzxValue[data.dir]\"\r\n    (ngModelChange)=\"ngModelChange()\"\r\n    [nzDisabled]=\"data.disabled\"\r\n    [nzPlaceHolder]=\"data.placeholder\"\r\n    [nzSize]=\"nzxSize\"\r\n    [nzSuffixIcon]=\"data.nzSuffixIcon || 'clock-circle'\"\r\n    [nzBackdrop]=\"data.nzBackdrop\"\r\n    [nzAutoFocus]=\"data.nzAutoFocus\"\r\n    [nzFormat]=\"nzFormat == null ? 'HH:mm:ss' : nzFormat\"\r\n    [nzId]=\"data.nzId\"\r\n    [nzAddOn]=\"data.nzAddOn\"\r\n    [nzAllowEmpty]=\"data.nzAllowEmpty == null ? true : data.nzAllowEmpty\"\r\n    [nzClearText]=\"data.nzClearText == null ? '\u6E05\u7A7A' : data.nzClearText\"\r\n    [nzDefaultOpenValue]=\"data.nzDefaultOpenValue || nzDefaultOpenValue\"\r\n    [nzDisabledHours]=\"data.nzDisabledHours\"\r\n    [nzDisabledMinutes]=\"data.nzDisabledMinutes\"\r\n    [nzDisabledSeconds]=\"data.nzDisabledSeconds\"\r\n    [nzHideDisabledOptions]=\"data.nzHideDisabledOptions\"\r\n    [nzHourStep]=\"data.nzHourStep == null ? 1 : data.nzHourStep\"\r\n    [nzMinuteStep]=\"data.nzMinuteStep == null ? 1 : data.nzMinuteStep\"\r\n    [nzNowText]=\"data.nzNowText\"\r\n    [nzOkText]=\"data.nzOkText\"\r\n    [nzPopupClassName]=\"data.nzPopupClassName\"\r\n    [nzSecondStep]=\"data.nzSecondStep == null ? 1 : data.nzSecondStep\"\r\n    [nzUse12Hours]=\"data.nzUse12Hours\"\r\n    (nzOpenChange)=\"data.nzOpenChange.emit($event)\"\r\n    [nzStatus]=\"data.nzStatus\"\r\n  ></nz-time-picker>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzxStartReName: [{
                type: Input
            }], nzxEndReName: [{
                type: Input
            }], nzxStartId: [{
                type: Input
            }], nzxStartStatus: [{
                type: Input
            }], nzxStartHourStep: [{
                type: Input
            }], nzxStartMinuteStep: [{
                type: Input
            }], nzxStartSecondStep: [{
                type: Input
            }], nzxStartClearText: [{
                type: Input
            }], nzxStartNowText: [{
                type: Input
            }], nzxStartOkText: [{
                type: Input
            }], nzxStartPopupClassName: [{
                type: Input
            }], nzxStartPlaceholder: [{
                type: Input
            }], nzxStartAddOn: [{
                type: Input
            }], nzxStartDefaultOpenValue: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzxStartUse12Hours: [{
                type: Input
            }], nzxStartSuffixIcon: [{
                type: Input
            }], nzxStartHideDisabledOptions: [{
                type: Input
            }], nzxStartAllowEmpty: [{
                type: Input
            }], nzxStartAutoFocus: [{
                type: Input
            }], nzxStartBackdrop: [{
                type: Input
            }], nzxStartOpenChange: [{
                type: Output
            }], nzxEndId: [{
                type: Input
            }], nzxEndStatus: [{
                type: Input
            }], nzxEndHourStep: [{
                type: Input
            }], nzxEndMinuteStep: [{
                type: Input
            }], nzxEndSecondStep: [{
                type: Input
            }], nzxEndClearText: [{
                type: Input
            }], nzxEndNowText: [{
                type: Input
            }], nzxEndOkText: [{
                type: Input
            }], nzxEndPopupClassName: [{
                type: Input
            }], nzxEndPlaceholder: [{
                type: Input
            }], nzxEndAddOn: [{
                type: Input
            }], nzxEndDefaultOpenValue: [{
                type: Input
            }], nzxEndUse12Hours: [{
                type: Input
            }], nzxEndSuffixIcon: [{
                type: Input
            }], nzxEndHideDisabledOptions: [{
                type: Input
            }], nzxEndAllowEmpty: [{
                type: Input
            }], nzxEndAutoFocus: [{
                type: Input
            }], nzxEndBackdrop: [{
                type: Input
            }], nzxEndOpenChange: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi10aW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuLXRpbWUvYmV0d2Vlbi10aW1lLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi9iZXR3ZWVuLXRpbWUvYmV0d2Vlbi10aW1lLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUF1QyxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQWdCckQsTUFBTSxPQUFPLHVCQUF3QixTQUFRLG1CQUFtQjtJQW1OeEM7SUFsTnRCLFFBQVEsR0FBc0IsRUFBRSxDQUFDO0lBQ2pDLElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDTSxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2xDOztPQUVHO0lBQ00sWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5Qjs7T0FFRztJQUNNLFVBQVUsR0FBa0IsSUFBSSxDQUFDO0lBQzFDOztPQUVHO0lBQ00sY0FBYyxHQUFhLEVBQUUsQ0FBQztJQUN2Qzs7T0FFRztJQUNNLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUM5Qjs7T0FFRztJQUNNLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUNoQzs7T0FFRztJQUNNLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUNoQzs7T0FFRztJQUNNLGlCQUFpQixDQUFVO0lBQ3BDOztPQUVHO0lBQ00sZUFBZSxDQUFVO0lBQ2xDOztPQUVHO0lBQ00sY0FBYyxDQUFVO0lBQ2pDOztPQUVHO0lBQ00sc0JBQXNCLENBQVU7SUFDekM7O09BRUc7SUFDTSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDckM7O09BRUc7SUFDTSxhQUFhLENBQXFCO0lBQzNDOztPQUVHO0lBQ00sd0JBQXdCLENBQVE7SUFDekM7O09BRUc7SUFDTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9COztPQUVHO0lBQ3NCLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwRDs7T0FFRztJQUNNLGtCQUFrQixDQUFtQztJQUM5RDs7T0FFRztJQUNzQiwyQkFBMkIsQ0FBVztJQUMvRDs7T0FFRztJQUNzQixrQkFBa0IsQ0FBVztJQUN0RDs7T0FFRztJQUNzQixpQkFBaUIsQ0FBVztJQUNyRDs7T0FFRztJQUNNLGdCQUFnQixDQUFXO0lBQ3BDOztPQUVHO0lBQ2dCLGtCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFcEU7O09BRUc7SUFDTSxRQUFRLEdBQWtCLElBQUksQ0FBQztJQUN4Qzs7T0FFRztJQUNNLFlBQVksR0FBYSxFQUFFLENBQUM7SUFDckM7O09BRUc7SUFDTSxjQUFjLEdBQVksQ0FBQyxDQUFDO0lBQ3JDOztPQUVHO0lBQ00sZ0JBQWdCLEdBQVksQ0FBQyxDQUFDO0lBQ3ZDOztPQUVHO0lBQ00sZ0JBQWdCLEdBQVksQ0FBQyxDQUFDO0lBQ3ZDOztPQUVHO0lBQ00sZUFBZSxDQUFVO0lBQ2xDOztPQUVHO0lBQ00sYUFBYSxDQUFVO0lBQ2hDOztPQUVHO0lBQ00sWUFBWSxDQUFVO0lBQy9COztPQUVHO0lBQ00sb0JBQW9CLENBQVU7SUFDdkM7O09BRUc7SUFDTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkM7O09BRUc7SUFDTSxXQUFXLENBQXFCO0lBQ3pDOztPQUVHO0lBQ00sc0JBQXNCLENBQVE7SUFDdkM7O09BRUc7SUFDc0IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2xEOztPQUVHO0lBQ00sZ0JBQWdCLENBQW1DO0lBQzVEOztPQUVHO0lBQ3NCLHlCQUF5QixDQUFXO0lBQzdEOztPQUVHO0lBQ3NCLGdCQUFnQixDQUFXO0lBQ3BEOztPQUVHO0lBQ3NCLGVBQWUsQ0FBVztJQUNuRDs7T0FFRztJQUNNLGNBQWMsQ0FBVztJQUNsQzs7T0FFRztJQUNnQixnQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRWxFOztPQUVHO0lBQ00sZ0JBQWdCLENBQW9CO0lBRTdDOztPQUVHO0lBQ00sY0FBYyxDQUFvQjtJQUUzQzs7T0FFRztJQUNNLGdCQUFnQixDQUFvQjtJQUU3Qzs7T0FFRztJQUNNLGNBQWMsQ0FBb0I7SUFFM0MscUJBQXFCLEdBQUcsR0FBRyxFQUFFLENBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQXdCLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLHVCQUF1QixHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxnQkFBd0IsQ0FBQyxDQUFDLENBQUM7SUFDL0csdUJBQXVCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsTUFBYyxFQUFFLEVBQUUsQ0FDekQsSUFBSSxDQUFDLGtCQUFrQixDQUNyQixJQUFJLEVBQ0osTUFBTSxFQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxnQkFBd0IsQ0FBQyxDQUN2RCxDQUFDO0lBRUosbUJBQW1CLEdBQW1CLEdBQUcsRUFBRSxDQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsY0FBc0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNsRyxxQkFBcUIsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLENBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxjQUFzQixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNHLHFCQUFxQixHQUFHLENBQUMsSUFBWSxFQUFFLE1BQWMsRUFBRSxFQUFFLENBQ3ZELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWxGLFlBQXNCLEdBQXNCO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBRFksUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFFNUMsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQXdCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBa0M7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVEsR0FBdUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzFELFNBQVMsR0FBZSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFFM0Isa0JBQWtCLENBQUMsSUFBVztRQUNwQyxPQUFPLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDeEUsQ0FBQztJQUVPLGtCQUFrQixDQUFDLElBQVc7UUFDcEMsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGVBQWUsQ0FBQyxXQUE4QixFQUFFLFdBQThCO1FBQ3BGLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFELE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDMUIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztRQUN6QixJQUFJLFFBQVEsRUFBRTtZQUNaLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsV0FBOEIsRUFBRSxXQUE4QjtRQUNyRyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDM0IsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM1QyxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxrQkFBa0IsQ0FDeEIsSUFBWSxFQUNaLE1BQWMsRUFDZCxXQUE4QixFQUM5QixXQUE4QjtRQUU5QixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDM0IsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ2hGLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUNoRixPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RTtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7d0dBalVVLHVCQUF1Qjs0RkFBdkIsdUJBQXVCLGt2REFSdkI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUN0RCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsaURDOUJILHd1SUEyR0E7O0FETjJCO0lBQWYsWUFBWSxFQUFFO21FQUE0QjtBQVEzQjtJQUFmLFlBQVksRUFBRTs0RUFBdUM7QUFJdEM7SUFBZixZQUFZLEVBQUU7bUVBQThCO0FBSTdCO0lBQWYsWUFBWSxFQUFFO2tFQUE2QjtBQTZENUI7SUFBZixZQUFZLEVBQUU7aUVBQTBCO0FBUXpCO0lBQWYsWUFBWSxFQUFFOzBFQUFxQztBQUlwQztJQUFmLFlBQVksRUFBRTtpRUFBNEI7QUFJM0I7SUFBZixZQUFZLEVBQUU7Z0VBQTJCOzRGQWxLeEMsdUJBQXVCO2tCQWRuQyxTQUFTOytCQUNFLGtCQUFrQix1QkFFUCxLQUFLLGlCQUNYLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sYUFDcEM7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUM7NEJBQ3RELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO3dHQVdRLGNBQWM7c0JBQXRCLEtBQUs7Z0JBSUcsWUFBWTtzQkFBcEIsS0FBSztnQkFJRyxVQUFVO3NCQUFsQixLQUFLO2dCQUlHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBSUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFJRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBSUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUlHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBSUcsY0FBYztzQkFBdEIsS0FBSztnQkFJRyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBSUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUlHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBSUcsd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUlHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBSW1CLGtCQUFrQjtzQkFBMUMsS0FBSztnQkFJRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBSW1CLDJCQUEyQjtzQkFBbkQsS0FBSztnQkFJbUIsa0JBQWtCO3NCQUExQyxLQUFLO2dCQUltQixpQkFBaUI7c0JBQXpDLEtBQUs7Z0JBSUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlhLGtCQUFrQjtzQkFBcEMsTUFBTTtnQkFLRSxRQUFRO3NCQUFoQixLQUFLO2dCQUlHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBSUcsY0FBYztzQkFBdEIsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBSUcsYUFBYTtzQkFBckIsS0FBSztnQkFJRyxZQUFZO3NCQUFwQixLQUFLO2dCQUlHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFJRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBSUcsV0FBVztzQkFBbkIsS0FBSztnQkFJRyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBSW1CLGdCQUFnQjtzQkFBeEMsS0FBSztnQkFJRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSW1CLHlCQUF5QjtzQkFBakQsS0FBSztnQkFJbUIsZ0JBQWdCO3NCQUF4QyxLQUFLO2dCQUltQixlQUFlO3NCQUF2QyxLQUFLO2dCQUlHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBSWEsZ0JBQWdCO3NCQUFsQyxNQUFNO2dCQUtFLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSwgTnpTdGF0dXMgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTnp4QmV0d2VlbkNvbXBvbmVudCB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL2JldHdlZW4nO1xyXG5pbXBvcnQgeyBEYXRldGltZVZhbHVlVHlwZSwgRGlzYWJsZWREYXRlVHlwZSwgZ2V0UmVhbERhdGVUaW1lIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvYmV0d2Vlbi1kYXRldGltZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC1iZXR3ZWVuLXRpbWUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iZXR3ZWVuLXRpbWUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOenhCZXR3ZWVuVGltZUNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4QmV0d2VlblRpbWVDb21wb25lbnQgZXh0ZW5kcyBOenhCZXR3ZWVuQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIG56eFZhbHVlOiBEYXRldGltZVZhbHVlVHlwZSA9IHt9O1xyXG4gIGdldCBuekRlZmF1bHRPcGVuVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOW8gOWni+Wtl+autemHjeWRveWQjVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0UmVOYW1lID0gJ3N0YXJ0JztcclxuICAvKipcclxuICAgKiDnu5PmnZ/lrZfmrrXph43lkb3lkI1cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRSZU5hbWUgPSAnZW5kJztcclxuICAvKipcclxuICAgKiDmjqfku7ZpZC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydElkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAvKipcclxuICAgKiDorr7nva7moKHpqoznirbmgIEt5byA5aeLXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRTdGF0dXM6IE56U3RhdHVzID0gJyc7XHJcbiAgLyoqXHJcbiAgICog5bCP5pe26YCJ6aG56Ze06ZqULeW8gOWni1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0SG91clN0ZXAgPSAxO1xyXG4gIC8qKlxyXG4gICAqIOWIhumSn+mAiemhuemXtOmalC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydE1pbnV0ZVN0ZXAgPSAxO1xyXG4gIC8qKlxyXG4gICAqIOenkumAiemhuemXtOmalC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFNlY29uZFN0ZXAgPSAxO1xyXG4gIC8qKlxyXG4gICAqIOa4hemZpOaMiemSrueahOaPkOekuuaWh+ahiC3lvIDlp4tcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydENsZWFyVGV4dD86IHN0cmluZztcclxuICAvKipcclxuICAgKiAg5q2k5Yi75oyJ6ZKu5paH5pysXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnROb3dUZXh0Pzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOehruiupOaMiemSruaWh+acrFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0T2tUZXh0Pzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOW8ueWHuuWxguexu+WQjVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0UG9wdXBDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5rKh5pyJ5YC855qE5pe25YCZ5pi+56S655qE5YaF5a65XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U3RhcnRQbGFjZWhvbGRlciA9ICfotbflp4vlgLwnO1xyXG4gIC8qKlxyXG4gICAqIOmAieaLqeahhuW6lemDqOaYvuekuuiHquWumuS5ieeahOWGheWuuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0QWRkT24/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcclxuICAvKipcclxuICAgKiDlvZMgW25nTW9kZWxdIOS4jeWtmOWcqOaXtu+8jOWPr+S7peiuvue9rumdouadv+aJk+W8gOaXtum7mOiupOmAieS4reeahOWAvFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0RGVmYXVsdE9wZW5WYWx1ZT86IERhdGU7XHJcbiAgLyoqXHJcbiAgICog5bGV56S655qE5pe26Ze05qC85byPXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpGb3JtYXQgPSAnSEg6bW06c3MnO1xyXG4gIC8qKlxyXG4gICAqIOS9v+eUqDEy5bCP5pe25Yi277yM5Li6dHJ1ZeaXtmZvcm1hdOm7mOiupOS4umg6bW06c3MgYVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuenhTdGFydFVzZTEySG91cnMgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDoh6rlrprkuYnnmoTlkI7nvIDlm77moIdcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTdGFydFN1ZmZpeEljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xyXG4gIC8qKlxyXG4gICAqIOmakOiXj+emgeatoumAieaLqeeahOmAiemhuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuenhTdGFydEhpZGVEaXNhYmxlZE9wdGlvbnM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWxleekuua4hemZpOaMiemSrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuenhTdGFydEFsbG93RW1wdHk/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOiHquWKqOiOt+WPlueEpueCuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuenhTdGFydEF1dG9Gb2N1cz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogIOa1ruWxguaYr+WQpuW6lOW4puacieiDjOaZr+adv1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFN0YXJ0QmFja2Ryb3A/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOmdouadv+aJk+W8gC/lhbPpl63kuovku7ZcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnp4U3RhcnRPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiDmjqfku7ZpZC3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgLyoqXHJcbiAgICog6K6+572u5qCh6aqM54q25oCBLee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZFN0YXR1czogTnpTdGF0dXMgPSAnJztcclxuICAvKipcclxuICAgKiDlsI/ml7bpgInpobnpl7TpmpQt57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kSG91clN0ZXA/OiBudW1iZXIgPSAxO1xyXG4gIC8qKlxyXG4gICAqIOWIhumSn+mAiemhuemXtOmalC3nu5PmnZ9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRNaW51dGVTdGVwPzogbnVtYmVyID0gMTtcclxuICAvKipcclxuICAgKiDnp5LpgInpobnpl7TpmpQt57uT5p2fXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kU2Vjb25kU3RlcD86IG51bWJlciA9IDE7XHJcbiAgLyoqXHJcbiAgICog5riF6Zmk5oyJ6ZKu55qE5o+Q56S65paH5qGILee7k+adn1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEVuZENsZWFyVGV4dD86IHN0cmluZztcclxuICAvKipcclxuICAgKiAg5q2k5Yi75oyJ6ZKu5paH5pysXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kTm93VGV4dD86IHN0cmluZztcclxuICAvKipcclxuICAgKiDnoa7orqTmjInpkq7mlofmnKxcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRPa1RleHQ/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5by55Ye65bGC57G75ZCNXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUG9wdXBDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5rKh5pyJ5YC855qE5pe25YCZ5pi+56S655qE5YaF5a65XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kUGxhY2Vob2xkZXIgPSAn57uT5p2f5YC8JztcclxuICAvKipcclxuICAgKiDpgInmi6nmoYblupXpg6jmmL7npLroh6rlrprkuYnnmoTlhoXlrrlcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRBZGRPbj86IFRlbXBsYXRlUmVmPHZvaWQ+O1xyXG4gIC8qKlxyXG4gICAqIOW9kyBbbmdNb2RlbF0g5LiN5a2Y5Zyo5pe277yM5Y+v5Lul6K6+572u6Z2i5p2/5omT5byA5pe26buY6K6k6YCJ5Lit55qE5YC8XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RW5kRGVmYXVsdE9wZW5WYWx1ZT86IERhdGU7XHJcbiAgLyoqXHJcbiAgICog5L2/55SoMTLlsI/ml7bliLbvvIzkuLp0cnVl5pe2Zm9ybWF06buY6K6k5Li6aDptbTpzcyBhXHJcbiAgICovXHJcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56eEVuZFVzZTEySG91cnMgPSBmYWxzZTtcclxuICAvKipcclxuICAgKiDoh6rlrprkuYnnmoTlkI7nvIDlm77moIdcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRTdWZmaXhJY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcclxuICAvKipcclxuICAgKiDpmpDol4/npoHmraLpgInmi6nnmoTpgInpoblcclxuICAgKi9cclxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnp4RW5kSGlkZURpc2FibGVkT3B0aW9ucz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5bGV56S65riF6Zmk5oyJ6ZKuXHJcbiAgICovXHJcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56eEVuZEFsbG93RW1wdHk/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOiHquWKqOiOt+WPlueEpueCuVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuenhFbmRBdXRvRm9jdXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqICDmta7lsYLmmK/lkKblupTluKbmnInog4zmma/mnb9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhFbmRCYWNrZHJvcD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog6Z2i5p2/5omT5byAL+WFs+mXreS6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBuenhFbmRPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiDmnIDlsI/ml7bpl7RcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydE1pbkRhdGVUaW1lPzogRGlzYWJsZWREYXRlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pyA5aSn5pe26Ze0XHJcbiAgICovXHJcbiAgQElucHV0KCkgZW5kTWF4RGF0ZVRpbWU/OiBEaXNhYmxlZERhdGVUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiDmnIDlpKfml7bpl7RcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydE1heERhdGVUaW1lPzogRGlzYWJsZWREYXRlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5pyA5bCP5pe26Ze0XHJcbiAgICovXHJcbiAgQElucHV0KCkgZW5kTWluRGF0ZVRpbWU/OiBEaXNhYmxlZERhdGVUeXBlO1xyXG5cclxuICBuenhTdGFydERpc2FibGVkSG91cnMgPSAoKSA9PlxyXG4gICAgdGhpcy5nZXREaXNhYmxlZEhvdXIodGhpcy5zdGFydE1pbkRhdGVUaW1lLCB0aGlzLmdldERlZmF1bHRNYXhWYWx1ZSh0aGlzLnN0YXJ0TWF4RGF0ZVRpbWUgYXMgRGF0ZSkpO1xyXG4gIG56eFN0YXJ0RGlzYWJsZWRNaW51dGVzID0gKGhvdXI6IG51bWJlcikgPT5cclxuICAgIHRoaXMuZ2V0RGlzYWJsZWRNaW51dGVzKGhvdXIsIHRoaXMuc3RhcnRNaW5EYXRlVGltZSwgdGhpcy5nZXREZWZhdWx0TWF4VmFsdWUodGhpcy5zdGFydE1heERhdGVUaW1lIGFzIERhdGUpKTtcclxuICBuenhTdGFydERpc2FibGVkU2Vjb25kcyA9IChob3VyOiBudW1iZXIsIG1pbnV0ZTogbnVtYmVyKSA9PlxyXG4gICAgdGhpcy5nZXREaXNhYmxlZFNlY29uZHMoXHJcbiAgICAgIGhvdXIsXHJcbiAgICAgIG1pbnV0ZSxcclxuICAgICAgdGhpcy5zdGFydE1pbkRhdGVUaW1lLFxyXG4gICAgICB0aGlzLmdldERlZmF1bHRNYXhWYWx1ZSh0aGlzLnN0YXJ0TWF4RGF0ZVRpbWUgYXMgRGF0ZSlcclxuICAgICk7XHJcblxyXG4gIG56eEVuZERpc2FibGVkSG91cnM6ICgpID0+IG51bWJlcltdID0gKCkgPT5cclxuICAgIHRoaXMuZ2V0RGlzYWJsZWRIb3VyKHRoaXMuZ2V0RGVmYXVsdE1pblZhbHVlKHRoaXMuZW5kTWluRGF0ZVRpbWUgYXMgRGF0ZSksIHRoaXMuZW5kTWF4RGF0ZVRpbWUpO1xyXG4gIG56eEVuZERpc2FibGVkTWludXRlcyA9IChob3VyOiBudW1iZXIpID0+XHJcbiAgICB0aGlzLmdldERpc2FibGVkTWludXRlcyhob3VyLCB0aGlzLmdldERlZmF1bHRNaW5WYWx1ZSh0aGlzLmVuZE1pbkRhdGVUaW1lIGFzIERhdGUpLCB0aGlzLmVuZE1heERhdGVUaW1lKTtcclxuICBuenhFbmREaXNhYmxlZFNlY29uZHMgPSAoaG91cjogbnVtYmVyLCBtaW51dGU6IG51bWJlcikgPT5cclxuICAgIHRoaXMuZ2V0RGlzYWJsZWRTZWNvbmRzKGhvdXIsIG1pbnV0ZSwgdGhpcy5lbmRNaW5EYXRlVGltZSwgdGhpcy5lbmRNYXhEYXRlVGltZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdNb2RlbENoYW5nZSgpIHtcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5uenhWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRldGltZVZhbHVlVHlwZSk6IHZvaWQge1xyXG4gICAgdGhpcy5uenhWYWx1ZSA9IHZhbHVlIHx8IHt9O1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMubnp4RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IERhdGV0aW1lVmFsdWVUeXBlKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlOiAodmFsdWU6IERhdGV0aW1lVmFsdWVUeXBlKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcclxuICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xyXG5cclxuICBwcml2YXRlIGdldERlZmF1bHRNaW5WYWx1ZShkYXRlPzogRGF0ZSkge1xyXG4gICAgcmV0dXJuIGRhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMubnp4VmFsdWVbdGhpcy5uenhTdGFydFJlTmFtZV0gOiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREZWZhdWx0TWF4VmFsdWUoZGF0ZT86IERhdGUpIHtcclxuICAgIHJldHVybiBkYXRlID09PSB1bmRlZmluZWQgPyB0aGlzLm56eFZhbHVlW3RoaXMubnp4RW5kUmVOYW1lXSA6IGRhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bnpoHnlKjnmoTlsI/ml7ZcclxuICAgKiBAcGFyYW0gbWluRGF0ZVRpbWUg5pyA5bCP5pe26Ze05YC8XHJcbiAgICogQHBhcmFtIG1heERhdGVUaW1lIOacgOWkp+aXtumXtOWAvFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREaXNhYmxlZEhvdXIobWluRGF0ZVRpbWU/OiBEaXNhYmxlZERhdGVUeXBlLCBtYXhEYXRlVGltZT86IERpc2FibGVkRGF0ZVR5cGUpIHtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKG5ldyBEYXRlKCksIG1pbkRhdGVUaW1lKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKG5ldyBEYXRlKCksIG1heERhdGVUaW1lKTtcclxuICAgIGlmICghbWF4VmFsdWUgJiYgIW1pblZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGxldCBob3VyczogbnVtYmVyW10gPSBbXTtcclxuICAgIGlmIChtaW5WYWx1ZSkge1xyXG4gICAgICBob3VycyA9IE56eFV0aWxzLnJhbmdlKDAsIG1pblZhbHVlLmdldEhvdXJzKCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1heFZhbHVlKSB7XHJcbiAgICAgIGhvdXJzID0gaG91cnMuY29uY2F0KE56eFV0aWxzLnJhbmdlKG1heFZhbHVlLmdldEhvdXJzKCkgKyAxLCAyNCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhvdXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W56aB55So55qE5YiG6ZKfXHJcbiAgICogQHBhcmFtIGhvdXIg5b2T5YmN5bCP5pe2XHJcbiAgICogQHBhcmFtIG1pbkRhdGVUaW1lIOacgOWwj+aXtumXtOWAvFxyXG4gICAqIEBwYXJhbSBtYXhEYXRlVGltZSDmnIDlpKfml7bpl7TlgLxcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0RGlzYWJsZWRNaW51dGVzKGhvdXI6IG51bWJlciwgbWluRGF0ZVRpbWU/OiBEaXNhYmxlZERhdGVUeXBlLCBtYXhEYXRlVGltZT86IERpc2FibGVkRGF0ZVR5cGUpIHtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKG5ldyBEYXRlKCksIG1pbkRhdGVUaW1lKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKG5ldyBEYXRlKCksIG1heERhdGVUaW1lKTtcclxuICAgIGlmICghbWF4VmFsdWUgJiYgIW1pblZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWludXRlczogbnVtYmVyW10gPSBbXTtcclxuICAgIGlmIChtaW5WYWx1ZSAmJiBtaW5WYWx1ZS5nZXRIb3VycygpID09PSBob3VyKSB7XHJcbiAgICAgIG1pbnV0ZXMgPSBOenhVdGlscy5yYW5nZSgwLCBtaW5WYWx1ZS5nZXRNaW51dGVzKCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1heFZhbHVlICYmIG1heFZhbHVlLmdldEhvdXJzKCkgPT09IGhvdXIpIHtcclxuICAgICAgbWludXRlcyA9IG1pbnV0ZXMuY29uY2F0KE56eFV0aWxzLnJhbmdlKG1heFZhbHVlLmdldE1pbnV0ZXMoKSArIDEsIDYwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWludXRlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluemgeeUqOeahOenkuaVsFxyXG4gICAqIEBwYXJhbSBob3VyIOW9k+WJjeWwj+aXtlxyXG4gICAqIEBwYXJhbSBtaW51dGUg5b2T5YmN5YiG6ZKfXHJcbiAgICogQHBhcmFtIG1pbkRhdGVUaW1lIOacgOWwj+aXtumXtOWAvFxyXG4gICAqIEBwYXJhbSBtYXhEYXRlVGltZSDmnIDlpKfml7bpl7TlgLxcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0RGlzYWJsZWRTZWNvbmRzKFxyXG4gICAgaG91cjogbnVtYmVyLFxyXG4gICAgbWludXRlOiBudW1iZXIsXHJcbiAgICBtaW5EYXRlVGltZT86IERpc2FibGVkRGF0ZVR5cGUsXHJcbiAgICBtYXhEYXRlVGltZT86IERpc2FibGVkRGF0ZVR5cGVcclxuICApIHtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKG5ldyBEYXRlKCksIG1pbkRhdGVUaW1lKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gZ2V0UmVhbERhdGVUaW1lKG5ldyBEYXRlKCksIG1heERhdGVUaW1lKTtcclxuICAgIGlmICghbWF4VmFsdWUgJiYgIW1pblZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2Vjb25kczogbnVtYmVyW10gPSBbXTtcclxuICAgIGlmIChtaW5WYWx1ZSAmJiBtaW5WYWx1ZS5nZXRIb3VycygpID09PSBob3VyICYmIG1pblZhbHVlLmdldE1pbnV0ZXMoKSA9PT0gbWludXRlKSB7XHJcbiAgICAgIHNlY29uZHMgPSBOenhVdGlscy5yYW5nZSgwLCBtaW5WYWx1ZS5nZXRTZWNvbmRzKCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1heFZhbHVlICYmIG1heFZhbHVlLmdldEhvdXJzKCkgPT09IGhvdXIgJiYgbWF4VmFsdWUuZ2V0TWludXRlcygpID09PSBtaW51dGUpIHtcclxuICAgICAgc2Vjb25kcyA9IHNlY29uZHMuY29uY2F0KE56eFV0aWxzLnJhbmdlKG1heFZhbHVlLmdldFNlY29uZHMoKSArIDEsIDYwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2Vjb25kcztcclxuICB9XHJcbn1cclxuIiwiPG56eC1iZXR3ZWVuXHJcbiAgW256eERpc2FibGVkXT1cIm56eERpc2FibGVkXCJcclxuICBbbnp4U3RhcnREaXNhYmxlZF09XCJuenhTdGFydERpc2FibGVkXCJcclxuICBbbnp4RW5kRGlzYWJsZWRdPVwibnp4RW5kRGlzYWJsZWRcIlxyXG4gIFtuenhTaXplXT1cIm56eFNpemVcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgc3RhcnRcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXHJcbiAgICAgIHR5cGVUZW1wbGF0ZTtcclxuICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICRpbXBsaWNpdDoge1xyXG4gICAgICAgICAgZGlyOiBuenhTdGFydFJlTmFtZSxcclxuICAgICAgICAgIGRpc2FibGVkOiBuenhTdGFydERpc2FibGVkICE9IG51bGwgPyBuenhTdGFydERpc2FibGVkIDogbnp4RGlzYWJsZWQsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogbnp4U3RhcnRQbGFjZWhvbGRlcixcclxuICAgICAgICAgIG56U3VmZml4SWNvbjogbnp4U3RhcnRTdWZmaXhJY29uLFxyXG4gICAgICAgICAgbnpCYWNrZHJvcDogbnp4U3RhcnRCYWNrZHJvcCxcclxuICAgICAgICAgIG56QXV0b0ZvY3VzOiBuenhTdGFydEF1dG9Gb2N1cyxcclxuICAgICAgICAgIG56SWQ6IG56eFN0YXJ0SWQsXHJcbiAgICAgICAgICBuekFkZE9uOiBuenhTdGFydEFkZE9uLFxyXG4gICAgICAgICAgbnpBbGxvd0VtcHR5OiBuenhTdGFydEFsbG93RW1wdHksXHJcbiAgICAgICAgICBuekNsZWFyVGV4dDogbnp4U3RhcnRDbGVhclRleHQsXHJcbiAgICAgICAgICBuekRlZmF1bHRPcGVuVmFsdWU6IG56eFN0YXJ0RGVmYXVsdE9wZW5WYWx1ZSxcclxuICAgICAgICAgIG56RGlzYWJsZWRIb3Vyczogbnp4U3RhcnREaXNhYmxlZEhvdXJzLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZE1pbnV0ZXM6IG56eFN0YXJ0RGlzYWJsZWRNaW51dGVzLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZFNlY29uZHM6IG56eFN0YXJ0RGlzYWJsZWRTZWNvbmRzLFxyXG4gICAgICAgICAgbnpIaWRlRGlzYWJsZWRPcHRpb25zOiBuenhTdGFydEhpZGVEaXNhYmxlZE9wdGlvbnMsXHJcbiAgICAgICAgICBuekhvdXJTdGVwOiBuenhTdGFydEhvdXJTdGVwLFxyXG4gICAgICAgICAgbnpNaW51dGVTdGVwOiBuenhTdGFydE1pbnV0ZVN0ZXAsXHJcbiAgICAgICAgICBuek5vd1RleHQ6IG56eFN0YXJ0Tm93VGV4dCxcclxuICAgICAgICAgIG56T2tUZXh0OiBuenhTdGFydE9rVGV4dCxcclxuICAgICAgICAgIG56UG9wdXBDbGFzc05hbWU6IG56eFN0YXJ0UG9wdXBDbGFzc05hbWUsXHJcbiAgICAgICAgICBuelNlY29uZFN0ZXA6IG56eFN0YXJ0U2Vjb25kU3RlcCxcclxuICAgICAgICAgIG56VXNlMTJIb3Vyczogbnp4U3RhcnRVc2UxMkhvdXJzLFxyXG4gICAgICAgICAgbnpPcGVuQ2hhbmdlOiBuenhTdGFydE9wZW5DaGFuZ2UsXHJcbiAgICAgICAgICBuelN0YXR1czogbnp4U3RhcnRTdGF0dXNcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIFwiXHJcbiAgPjwvbmctY29udGFpbmVyPlxyXG4gIDxuZy1jb250YWluZXJcclxuICAgIGVuZFxyXG4gICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgdHlwZVRlbXBsYXRlO1xyXG4gICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgJGltcGxpY2l0OiB7XHJcbiAgICAgICAgICBkaXI6IG56eEVuZFJlTmFtZSxcclxuICAgICAgICAgIGRpc2FibGVkOiBuenhFbmREaXNhYmxlZCAhPSBudWxsID8gbnp4RW5kRGlzYWJsZWQgOiBuenhEaXNhYmxlZCxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBuenhFbmRQbGFjZWhvbGRlcixcclxuICAgICAgICAgIG56U3VmZml4SWNvbjogbnp4RW5kU3VmZml4SWNvbixcclxuICAgICAgICAgIG56QmFja2Ryb3A6IG56eEVuZEJhY2tkcm9wLFxyXG4gICAgICAgICAgbnpBdXRvRm9jdXM6IG56eEVuZEF1dG9Gb2N1cyxcclxuICAgICAgICAgIG56SWQ6IG56eEVuZElkLFxyXG4gICAgICAgICAgbnpBZGRPbjogbnp4RW5kQWRkT24sXHJcbiAgICAgICAgICBuekFsbG93RW1wdHk6IG56eEVuZEFsbG93RW1wdHksXHJcbiAgICAgICAgICBuekNsZWFyVGV4dDogbnp4RW5kQ2xlYXJUZXh0LFxyXG4gICAgICAgICAgbnpEZWZhdWx0T3BlblZhbHVlOiBuenhFbmREZWZhdWx0T3BlblZhbHVlLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZEhvdXJzOiBuenhFbmREaXNhYmxlZEhvdXJzLFxyXG4gICAgICAgICAgbnpEaXNhYmxlZE1pbnV0ZXM6IG56eEVuZERpc2FibGVkTWludXRlcyxcclxuICAgICAgICAgIG56RGlzYWJsZWRTZWNvbmRzOiBuenhFbmREaXNhYmxlZFNlY29uZHMsXHJcbiAgICAgICAgICBuekhpZGVEaXNhYmxlZE9wdGlvbnM6IG56eEVuZEhpZGVEaXNhYmxlZE9wdGlvbnMsXHJcbiAgICAgICAgICBuekhvdXJTdGVwOiBuenhFbmRIb3VyU3RlcCxcclxuICAgICAgICAgIG56TWludXRlU3RlcDogbnp4RW5kTWludXRlU3RlcCxcclxuICAgICAgICAgIG56Tm93VGV4dDogbnp4RW5kTm93VGV4dCxcclxuICAgICAgICAgIG56T2tUZXh0OiBuenhFbmRPa1RleHQsXHJcbiAgICAgICAgICBuelBvcHVwQ2xhc3NOYW1lOiBuenhFbmRQb3B1cENsYXNzTmFtZSxcclxuICAgICAgICAgIG56U2Vjb25kU3RlcDogbnp4RW5kU2Vjb25kU3RlcCxcclxuICAgICAgICAgIG56VXNlMTJIb3Vyczogbnp4RW5kVXNlMTJIb3VycyxcclxuICAgICAgICAgIG56T3BlbkNoYW5nZTogbnp4RW5kT3BlbkNoYW5nZSxcclxuICAgICAgICAgIG56U3RhdHVzOiBuenhFbmRTdGF0dXNcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIFwiXHJcbiAgPjwvbmctY29udGFpbmVyPlxyXG48L256eC1iZXR3ZWVuPlxyXG5cclxuPG5nLXRlbXBsYXRlICN0eXBlVGVtcGxhdGUgbGV0LWRhdGE+XHJcbiAgPG56LXRpbWUtcGlja2VyXHJcbiAgICBbKG5nTW9kZWwpXT1cIm56eFZhbHVlW2RhdGEuZGlyXVwiXHJcbiAgICAobmdNb2RlbENoYW5nZSk9XCJuZ01vZGVsQ2hhbmdlKClcIlxyXG4gICAgW256RGlzYWJsZWRdPVwiZGF0YS5kaXNhYmxlZFwiXHJcbiAgICBbbnpQbGFjZUhvbGRlcl09XCJkYXRhLnBsYWNlaG9sZGVyXCJcclxuICAgIFtuelNpemVdPVwibnp4U2l6ZVwiXHJcbiAgICBbbnpTdWZmaXhJY29uXT1cImRhdGEubnpTdWZmaXhJY29uIHx8ICdjbG9jay1jaXJjbGUnXCJcclxuICAgIFtuekJhY2tkcm9wXT1cImRhdGEubnpCYWNrZHJvcFwiXHJcbiAgICBbbnpBdXRvRm9jdXNdPVwiZGF0YS5uekF1dG9Gb2N1c1wiXHJcbiAgICBbbnpGb3JtYXRdPVwibnpGb3JtYXQgPT0gbnVsbCA/ICdISDptbTpzcycgOiBuekZvcm1hdFwiXHJcbiAgICBbbnpJZF09XCJkYXRhLm56SWRcIlxyXG4gICAgW256QWRkT25dPVwiZGF0YS5uekFkZE9uXCJcclxuICAgIFtuekFsbG93RW1wdHldPVwiZGF0YS5uekFsbG93RW1wdHkgPT0gbnVsbCA/IHRydWUgOiBkYXRhLm56QWxsb3dFbXB0eVwiXHJcbiAgICBbbnpDbGVhclRleHRdPVwiZGF0YS5uekNsZWFyVGV4dCA9PSBudWxsID8gJ+a4heepuicgOiBkYXRhLm56Q2xlYXJUZXh0XCJcclxuICAgIFtuekRlZmF1bHRPcGVuVmFsdWVdPVwiZGF0YS5uekRlZmF1bHRPcGVuVmFsdWUgfHwgbnpEZWZhdWx0T3BlblZhbHVlXCJcclxuICAgIFtuekRpc2FibGVkSG91cnNdPVwiZGF0YS5uekRpc2FibGVkSG91cnNcIlxyXG4gICAgW256RGlzYWJsZWRNaW51dGVzXT1cImRhdGEubnpEaXNhYmxlZE1pbnV0ZXNcIlxyXG4gICAgW256RGlzYWJsZWRTZWNvbmRzXT1cImRhdGEubnpEaXNhYmxlZFNlY29uZHNcIlxyXG4gICAgW256SGlkZURpc2FibGVkT3B0aW9uc109XCJkYXRhLm56SGlkZURpc2FibGVkT3B0aW9uc1wiXHJcbiAgICBbbnpIb3VyU3RlcF09XCJkYXRhLm56SG91clN0ZXAgPT0gbnVsbCA/IDEgOiBkYXRhLm56SG91clN0ZXBcIlxyXG4gICAgW256TWludXRlU3RlcF09XCJkYXRhLm56TWludXRlU3RlcCA9PSBudWxsID8gMSA6IGRhdGEubnpNaW51dGVTdGVwXCJcclxuICAgIFtuek5vd1RleHRdPVwiZGF0YS5uek5vd1RleHRcIlxyXG4gICAgW256T2tUZXh0XT1cImRhdGEubnpPa1RleHRcIlxyXG4gICAgW256UG9wdXBDbGFzc05hbWVdPVwiZGF0YS5uelBvcHVwQ2xhc3NOYW1lXCJcclxuICAgIFtuelNlY29uZFN0ZXBdPVwiZGF0YS5uelNlY29uZFN0ZXAgPT0gbnVsbCA/IDEgOiBkYXRhLm56U2Vjb25kU3RlcFwiXHJcbiAgICBbbnpVc2UxMkhvdXJzXT1cImRhdGEubnpVc2UxMkhvdXJzXCJcclxuICAgIChuek9wZW5DaGFuZ2UpPVwiZGF0YS5uek9wZW5DaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAgIFtuelN0YXR1c109XCJkYXRhLm56U3RhdHVzXCJcclxuICA+PC9uei10aW1lLXBpY2tlcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19