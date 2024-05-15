import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i4 from '@xmagic/nzx-antd/between';
import { NzxBetweenComponent, NzxBetweenModule } from '@xmagic/nzx-antd/between';
import { getRealDateTime } from '@xmagic/nzx-antd/between-datetime';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/time-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

class NzxBetweenTimeComponent extends NzxBetweenComponent {
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

class NzxBetweenTimeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenTimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenTimeModule, declarations: [NzxBetweenTimeComponent], imports: [CommonModule, NzTimePickerModule, FormsModule, NzxBetweenModule], exports: [NzxBetweenTimeComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenTimeModule, imports: [CommonModule, NzTimePickerModule, FormsModule, NzxBetweenModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenTimeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxBetweenTimeComponent],
                    imports: [CommonModule, NzTimePickerModule, FormsModule, NzxBetweenModule],
                    exports: [NzxBetweenTimeComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxBetweenTimeComponent, NzxBetweenTimeModule };
//# sourceMappingURL=xmagic-nzx-antd-between-time.mjs.map
