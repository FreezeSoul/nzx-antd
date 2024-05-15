import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@freezesoul/nzx-antd/util';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import { NzBytesPipe } from 'ng-zorro-antd/pipes';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/message";
import * as i2 from "ng-zorro-antd/pipes";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/upload";
import * as i5 from "ng-zorro-antd/button";
import * as i6 from "ng-zorro-antd/core/transition-patch";
import * as i7 from "ng-zorro-antd/core/wave";
import * as i8 from "ng-zorro-antd/icon";
import * as i9 from "ng-zorro-antd/core/outlet";
export var ErrorType;
(function (ErrorType) {
    /**
     * 单文件大小限制,单位KB
     */
    ErrorType["FILE_SIZE"] = "FILE_SIZE";
    /**
     * 总文件大小限制
     */
    ErrorType["FILE_TOTAL_SIZE"] = "FILE_TOTAL_SIZE";
    ErrorType["FILE_TYPE"] = "FILE_TYPE";
    ErrorType["FILE_LIMIT"] = "FILE_LIMIT";
    ErrorType["FILE_NAME_LENGTH"] = "FILE_NAME_LENGTH";
    ErrorType["FILE_NAME_DUPLICATE"] = "FILE_NAME_DUPLICATE";
})(ErrorType || (ErrorType = {}));
export class NzxUploadComponent extends BaseControl {
    messageService;
    bytesPipe;
    nzFileList = [];
    /**
     * 自定义按钮或显示内容
     */
    nzxUploadButton;
    /**
     * 上传的提示信息
     */
    nzxHint;
    /**
     * 拖拽上传文件显示文本
     */
    nzxUploadText = '点击或拖拽上传文件';
    /**
     * 是否显示上传按钮
     */
    nzxShowUploadButtonIcon;
    /**
     * 上传按钮的图标
     */
    nzxUploadButtonIcon = 'cloud-upload';
    /**
     * 错误信息映射
     */
    nzxValidateMessage;
    nzType = 'select';
    /**
     * 上传的文件个数限制
     */
    nzLimit = 0;
    /**
     * 文件名重复验证
     */
    nzxFileNameDuplicate;
    /**
     * 文件名长度
     */
    nzxFileNameLength;
    /**
     * 文件大小,单位kb
     */
    nzSize = 0;
    /**
     * 总文件大小,单位kb
     */
    nzTotalSize;
    nzFileType;
    nzAccept;
    nzAction;
    nzDirectory = false;
    nzOpenFileDialogOnClick = true;
    /**
     * 是否显示验证错误提示信息
     */
    nzxShowValidateMessage;
    nzBeforeUpload;
    _nzBeforeUpload;
    nzCustomRequest;
    nzData;
    nzFilter = [];
    nzDisabled;
    nzHeaders;
    nzListType = 'text';
    nzMultiple;
    nzName = 'file';
    nzShowUploadList = true;
    nzShowButton = true;
    nzWithCredentials;
    nzRemove;
    nzPreview;
    nzPreviewFile;
    nzPreviewIsImage;
    nzTransformFile;
    nzDownload;
    nzIconRender;
    nzFileListRender;
    nzChange = new EventEmitter();
    nzFileListChange = new EventEmitter();
    defaultValidateMessage = {
        FILE_SIZE: '文件 "{fileName}" 大小不能超过{fileSize}',
        FILE_TOTAL_SIZE: '总上传文件大小不能超过{totalSize}',
        FILE_TYPE: '上传的文件格式只能是 "{fileType}"',
        FILE_LIMIT: '最多允许上传{fileLimit}个文件',
        FILE_NAME_LENGTH: '文件 "{fileName}" 名称长度不能大于{fileNameLength}个字符',
        FILE_NAME_DUPLICATE: '已上传名称 "{fileName}" 相同的文件，不能重复上传'
    };
    get isTemplateUploadButton() {
        return this.nzxUploadButton instanceof TemplateRef;
    }
    constructor(messageService, bytesPipe) {
        super();
        this.messageService = messageService;
        this.bytesPipe = bytesPipe;
    }
    ngOnInit() {
        this.setDefaultFileFilter();
        this.setNzBeforeUpload();
    }
    setDefaultFileFilter() {
        const defaultFilter = {
            name: 'defaultFilter',
            fn: (fileList) => {
                let error = null;
                const allFiles = (this.nzFileList || []).concat(fileList);
                const list = [];
                for (const file of fileList) {
                    const err = this.beforeUploadValidator(file, allFiles);
                    if (!err) {
                        list.push(file);
                    }
                    else if (!error || err.errorType === ErrorType.FILE_TOTAL_SIZE) {
                        error = err;
                    }
                }
                if (error && this.nzxShowValidateMessage !== false) {
                    this.messageService.error(error.message || '文件不合法，请重新选择');
                }
                return list;
            }
        };
        if (!this.nzFilter) {
            this.nzFilter = [defaultFilter];
        }
        if (!this.nzFilter.find(f => f.name === 'defaultFilter')) {
            this.nzFilter.push(defaultFilter);
        }
    }
    setNzBeforeUpload() {
        this._nzBeforeUpload = this.getNzBeforeUpload();
    }
    onNzChange(evt) {
        this.onTouched();
        if (evt.type === 'success' || evt.type === 'removed') {
            this.onChange(evt.fileList);
        }
        this.nzChange.emit(evt);
    }
    writeValue(value) {
        this.nzFileList = value || [];
    }
    ngOnChanges(changes) {
        if (changes.nzFilter && !changes.nzFilter.isFirstChange()) {
            this.setDefaultFileFilter();
        }
        if (changes.nzBeforeUpload && !changes.nzBeforeUpload.isFirstChange()) {
            this.setNzBeforeUpload();
        }
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
    }
    /**
     * 重新包装zBeforeUpload
     */
    getNzBeforeUpload() {
        if (this.nzBeforeUpload) {
            return (file, fileList) => this.nzBeforeUpload(file, fileList, this.beforeUploadValidator(file, fileList));
        }
        return undefined;
    }
    /**
     * 文件验证
     * @param file 当前文件
     * @param fileList 文件列表
     * @protected
     */
    beforeUploadValidator(file, fileList) {
        const messages = Object.assign({}, this.defaultValidateMessage, this.nzxValidateMessage);
        // 文件类型
        if (this.nzFileType != null) {
            const nzFileTypes = typeof this.nzFileType === 'string' ? [this.nzFileType] : this.nzFileType;
            if (nzFileTypes.length > 0) {
                const index = file.name.lastIndexOf('.');
                const ext = index > 0 ? file.name.substring(index + 1).toLowerCase() : null;
                if (!ext || (!nzFileTypes.includes(file.type) && !nzFileTypes.includes(ext))) {
                    return this.getError(ErrorType.FILE_TYPE, file, messages, { fileType: this.nzFileType });
                }
            }
        }
        // 单个文件大小
        if (this.nzSize != null && this.nzSize > 0 && (file.size || 0) / 1024 > this.nzSize) {
            return this.getError(ErrorType.FILE_SIZE, file, messages, {
                fileSize: this.bytesPipe.transform(this.nzSize, 2, 'kB'),
                fileName: file.name
            });
        }
        // 文件名长度
        if (this.nzxFileNameLength && file.name.length > this.nzxFileNameLength) {
            return this.getError(ErrorType.FILE_NAME_LENGTH, file, messages, {
                fileNameLength: this.nzxFileNameLength,
                fileName: file.name
            });
        }
        // 文件名重复
        if (this.nzxFileNameDuplicate === false && fileList.filter(f => f !== file).find(it => it.name === file.name)) {
            return this.getError(ErrorType.FILE_NAME_DUPLICATE, file, messages, { fileName: file.name });
        }
        // 最大上传个数
        if (this.nzLimit && fileList.length > this.nzLimit) {
            return this.getError(ErrorType.FILE_LIMIT, file, messages, { fileLimit: this.nzLimit });
        }
        // 总文件大小
        if (this.nzTotalSize && fileList.reduce((prev, curr) => (prev += curr.size || 0), 0) / 1024 > this.nzTotalSize) {
            return this.getError(ErrorType.FILE_TOTAL_SIZE, file, messages, {
                totalSize: this.bytesPipe.transform(this.nzTotalSize, 2, 'kB')
            });
        }
        return null;
    }
    /**
     * 显示文件验证错误
     * @param file 当前文件
     * @param fileList 文件列表
     * @param showValidateMessage 是否显示
     * @private
     */
    showFileErrorMessage(file, fileList, showValidateMessage) {
        const error = this.beforeUploadValidator(file, fileList);
        if (error && showValidateMessage !== false) {
            this.messageService.error(error.message || '文件不合法');
        }
        return error;
    }
    getError(errorType, file, messages, fmtData) {
        return {
            errorType,
            file,
            message: NzxUtils.format(messages[errorType], fmtData)
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxUploadComponent, deps: [{ token: i1.NzMessageService }, { token: i2.NzBytesPipe }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxUploadComponent, selector: "nzx-upload", inputs: { nzFileList: "nzFileList", nzxUploadButton: "nzxUploadButton", nzxHint: "nzxHint", nzxUploadText: "nzxUploadText", nzxShowUploadButtonIcon: "nzxShowUploadButtonIcon", nzxUploadButtonIcon: "nzxUploadButtonIcon", nzxValidateMessage: "nzxValidateMessage", nzType: "nzType", nzLimit: "nzLimit", nzxFileNameDuplicate: "nzxFileNameDuplicate", nzxFileNameLength: "nzxFileNameLength", nzSize: "nzSize", nzTotalSize: "nzTotalSize", nzFileType: "nzFileType", nzAccept: "nzAccept", nzAction: "nzAction", nzDirectory: "nzDirectory", nzOpenFileDialogOnClick: "nzOpenFileDialogOnClick", nzxShowValidateMessage: "nzxShowValidateMessage", nzBeforeUpload: "nzBeforeUpload", nzCustomRequest: "nzCustomRequest", nzData: "nzData", nzFilter: "nzFilter", nzDisabled: "nzDisabled", nzHeaders: "nzHeaders", nzListType: "nzListType", nzMultiple: "nzMultiple", nzName: "nzName", nzShowUploadList: "nzShowUploadList", nzShowButton: "nzShowButton", nzWithCredentials: "nzWithCredentials", nzRemove: "nzRemove", nzPreview: "nzPreview", nzPreviewFile: "nzPreviewFile", nzPreviewIsImage: "nzPreviewIsImage", nzTransformFile: "nzTransformFile", nzDownload: "nzDownload", nzIconRender: "nzIconRender", nzFileListRender: "nzFileListRender" }, outputs: { nzChange: "nzChange", nzFileListChange: "nzFileListChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzxUploadComponent),
                multi: true
            },
            NzBytesPipe
        ], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<nz-upload\r\n  [nzType]=\"nzType\"\r\n  [nzAccept]=\"nzAccept\"\r\n  [nzAction]=\"nzAction\"\r\n  [nzDirectory]=\"nzDirectory\"\r\n  [nzOpenFileDialogOnClick]=\"nzOpenFileDialogOnClick\"\r\n  [nzBeforeUpload]=\"_nzBeforeUpload\"\r\n  [nzCustomRequest]=\"nzCustomRequest\"\r\n  [nzData]=\"nzData\"\r\n  [nzFilter]=\"nzFilter\"\r\n  [(nzFileList)]=\"nzFileList\"\r\n  [nzDisabled]=\"nzDisabled\"\r\n  [nzHeaders]=\"nzHeaders\"\r\n  [nzListType]=\"nzListType\"\r\n  [nzMultiple]=\"nzMultiple\"\r\n  [nzName]=\"nzName\"\r\n  [nzShowUploadList]=\"nzShowUploadList\"\r\n  [nzShowButton]=\"nzShowButton\"\r\n  [nzWithCredentials]=\"nzWithCredentials\"\r\n  [nzRemove]=\"nzRemove\"\r\n  [nzPreview]=\"nzPreview\"\r\n  [nzPreviewFile]=\"nzPreviewFile\"\r\n  [nzPreviewIsImage]=\"nzPreviewIsImage\"\r\n  [nzTransformFile]=\"nzTransformFile\"\r\n  [nzDownload]=\"nzDownload\"\r\n  [nzIconRender]=\"nzIconRender\"\r\n  [nzFileListRender]=\"nzFileListRender\"\r\n  (nzChange)=\"onNzChange($event)\"\r\n  (nzFileListChange)=\"nzFileListChange.emit($event)\"\r\n>\r\n  <ng-container *nzStringTemplateOutlet=\"nzxUploadButton; context: { $implicit: this, nzFileList: nzFileList }\">\r\n    <button\r\n      nz-button\r\n      [disabled]=\"nzDisabled\"\r\n      type=\"button\"\r\n      *ngIf=\"nzType === 'select' && nzxShowUploadButtonIcon !== false\"\r\n    >\r\n      <i *ngIf=\"nzxUploadButtonIcon\" nz-icon [nzType]=\"nzxUploadButtonIcon\"></i>\r\n      {{ nzxUploadButton || '\u4E0A\u4F20' }}\r\n    </button>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"nzxShowUploadButtonIcon !== false && nzType === 'drag'\">\r\n    <p class=\"ant-upload-drag-icon\">\r\n      <i *ngIf=\"nzxUploadButtonIcon\" nz-icon [nzType]=\"nzxUploadButtonIcon\"></i>\r\n    </p>\r\n    <p class=\"ant-upload-text\">{{nzxUploadText}}</p>\r\n    <p class=\"ant-upload-hint\">{{ nzxHint }}</p>\r\n  </ng-container>\r\n</nz-upload>\r\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.NzUploadComponent, selector: "nz-upload", inputs: ["nzType", "nzLimit", "nzSize", "nzFileType", "nzAccept", "nzAction", "nzDirectory", "nzOpenFileDialogOnClick", "nzBeforeUpload", "nzCustomRequest", "nzData", "nzFilter", "nzFileList", "nzDisabled", "nzHeaders", "nzListType", "nzMultiple", "nzName", "nzShowUploadList", "nzShowButton", "nzWithCredentials", "nzRemove", "nzPreview", "nzPreviewFile", "nzPreviewIsImage", "nzTransformFile", "nzDownload", "nzIconRender", "nzFileListRender"], outputs: ["nzChange", "nzFileListChange"], exportAs: ["nzUpload"] }, { kind: "component", type: i5.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i6.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i7.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "directive", type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: i9.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-upload', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzxUploadComponent),
                            multi: true
                        },
                        NzBytesPipe
                    ], template: "<nz-upload\r\n  [nzType]=\"nzType\"\r\n  [nzAccept]=\"nzAccept\"\r\n  [nzAction]=\"nzAction\"\r\n  [nzDirectory]=\"nzDirectory\"\r\n  [nzOpenFileDialogOnClick]=\"nzOpenFileDialogOnClick\"\r\n  [nzBeforeUpload]=\"_nzBeforeUpload\"\r\n  [nzCustomRequest]=\"nzCustomRequest\"\r\n  [nzData]=\"nzData\"\r\n  [nzFilter]=\"nzFilter\"\r\n  [(nzFileList)]=\"nzFileList\"\r\n  [nzDisabled]=\"nzDisabled\"\r\n  [nzHeaders]=\"nzHeaders\"\r\n  [nzListType]=\"nzListType\"\r\n  [nzMultiple]=\"nzMultiple\"\r\n  [nzName]=\"nzName\"\r\n  [nzShowUploadList]=\"nzShowUploadList\"\r\n  [nzShowButton]=\"nzShowButton\"\r\n  [nzWithCredentials]=\"nzWithCredentials\"\r\n  [nzRemove]=\"nzRemove\"\r\n  [nzPreview]=\"nzPreview\"\r\n  [nzPreviewFile]=\"nzPreviewFile\"\r\n  [nzPreviewIsImage]=\"nzPreviewIsImage\"\r\n  [nzTransformFile]=\"nzTransformFile\"\r\n  [nzDownload]=\"nzDownload\"\r\n  [nzIconRender]=\"nzIconRender\"\r\n  [nzFileListRender]=\"nzFileListRender\"\r\n  (nzChange)=\"onNzChange($event)\"\r\n  (nzFileListChange)=\"nzFileListChange.emit($event)\"\r\n>\r\n  <ng-container *nzStringTemplateOutlet=\"nzxUploadButton; context: { $implicit: this, nzFileList: nzFileList }\">\r\n    <button\r\n      nz-button\r\n      [disabled]=\"nzDisabled\"\r\n      type=\"button\"\r\n      *ngIf=\"nzType === 'select' && nzxShowUploadButtonIcon !== false\"\r\n    >\r\n      <i *ngIf=\"nzxUploadButtonIcon\" nz-icon [nzType]=\"nzxUploadButtonIcon\"></i>\r\n      {{ nzxUploadButton || '\u4E0A\u4F20' }}\r\n    </button>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"nzxShowUploadButtonIcon !== false && nzType === 'drag'\">\r\n    <p class=\"ant-upload-drag-icon\">\r\n      <i *ngIf=\"nzxUploadButtonIcon\" nz-icon [nzType]=\"nzxUploadButtonIcon\"></i>\r\n    </p>\r\n    <p class=\"ant-upload-text\">{{nzxUploadText}}</p>\r\n    <p class=\"ant-upload-hint\">{{ nzxHint }}</p>\r\n  </ng-container>\r\n</nz-upload>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.NzMessageService }, { type: i2.NzBytesPipe }]; }, propDecorators: { nzFileList: [{
                type: Input
            }], nzxUploadButton: [{
                type: Input
            }], nzxHint: [{
                type: Input
            }], nzxUploadText: [{
                type: Input
            }], nzxShowUploadButtonIcon: [{
                type: Input
            }], nzxUploadButtonIcon: [{
                type: Input
            }], nzxValidateMessage: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzLimit: [{
                type: Input
            }], nzxFileNameDuplicate: [{
                type: Input
            }], nzxFileNameLength: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzTotalSize: [{
                type: Input
            }], nzFileType: [{
                type: Input
            }], nzAccept: [{
                type: Input
            }], nzAction: [{
                type: Input
            }], nzDirectory: [{
                type: Input
            }], nzOpenFileDialogOnClick: [{
                type: Input
            }], nzxShowValidateMessage: [{
                type: Input
            }], nzBeforeUpload: [{
                type: Input
            }], nzCustomRequest: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzFilter: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzHeaders: [{
                type: Input
            }], nzListType: [{
                type: Input
            }], nzMultiple: [{
                type: Input
            }], nzName: [{
                type: Input
            }], nzShowUploadList: [{
                type: Input
            }], nzShowButton: [{
                type: Input
            }], nzWithCredentials: [{
                type: Input
            }], nzRemove: [{
                type: Input
            }], nzPreview: [{
                type: Input
            }], nzPreviewFile: [{
                type: Input
            }], nzPreviewIsImage: [{
                type: Input
            }], nzTransformFile: [{
                type: Input
            }], nzDownload: [{
                type: Input
            }], nzIconRender: [{
                type: Input
            }], nzFileListRender: [{
                type: Input
            }], nzChange: [{
                type: Output
            }], nzFileListChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFHTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFhdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7OztBQUdsRCxNQUFNLENBQU4sSUFBWSxTQWFYO0FBYkQsV0FBWSxTQUFTO0lBQ25COztPQUVHO0lBQ0gsb0NBQXVCLENBQUE7SUFDdkI7O09BRUc7SUFDSCxnREFBbUMsQ0FBQTtJQUNuQyxvQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBeUIsQ0FBQTtJQUN6QixrREFBcUMsQ0FBQTtJQUNyQyx3REFBMkMsQ0FBQTtBQUM3QyxDQUFDLEVBYlcsU0FBUyxLQUFULFNBQVMsUUFhcEI7QUFlRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBMkI7SUFrRzNDO0lBQTRDO0lBakd6RCxVQUFVLEdBQW1CLEVBQUUsQ0FBQztJQUN6Qzs7T0FFRztJQUNNLGVBQWUsQ0FBbUM7SUFDM0Q7O09BRUc7SUFDTSxPQUFPLENBQVU7SUFDMUI7O09BRUc7SUFDTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0lBQ3JDOztPQUVHO0lBQ00sdUJBQXVCLENBQVc7SUFDM0M7O09BRUc7SUFDTSxtQkFBbUIs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O2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFFYSxRQUFRO3NCQUExQixNQUFNO2dCQUNZLGdCQUFnQjtzQkFBbEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZSxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTnpJY29uUmVuZGVyVGVtcGxhdGUsXHJcbiAgTnpVcGxvYWRDaGFuZ2VQYXJhbSxcclxuICBOelVwbG9hZEZpbGUsXHJcbiAgTnpVcGxvYWRMaXN0VHlwZSxcclxuICBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlLFxyXG4gIE56VXBsb2FkVHlwZSxcclxuICBOelVwbG9hZFhIUkFyZ3MsXHJcbiAgVXBsb2FkRmlsdGVyLFxyXG4gIE56U2hvd1VwbG9hZExpc3RcclxufSBmcm9tICduZy16b3Jyby1hbnRkL3VwbG9hZCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcbmltcG9ydCB7IE56TWVzc2FnZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL21lc3NhZ2UnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBOekJ5dGVzUGlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvcGlwZXMnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuZXhwb3J0IGVudW0gRXJyb3JUeXBlIHtcclxuICAvKipcclxuICAgKiDljZXmlofku7blpKflsI/pmZDliLYs5Y2V5L2NS0JcclxuICAgKi9cclxuICBGSUxFX1NJWkUgPSAnRklMRV9TSVpFJyxcclxuICAvKipcclxuICAgKiDmgLvmlofku7blpKflsI/pmZDliLZcclxuICAgKi9cclxuICBGSUxFX1RPVEFMX1NJWkUgPSAnRklMRV9UT1RBTF9TSVpFJyxcclxuICBGSUxFX1RZUEUgPSAnRklMRV9UWVBFJyxcclxuICBGSUxFX0xJTUlUID0gJ0ZJTEVfTElNSVQnLFxyXG4gIEZJTEVfTkFNRV9MRU5HVEggPSAnRklMRV9OQU1FX0xFTkdUSCcsXHJcbiAgRklMRV9OQU1FX0RVUExJQ0FURSA9ICdGSUxFX05BTUVfRFVQTElDQVRFJ1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC11cGxvYWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnp4VXBsb2FkQ29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICBOekJ5dGVzUGlwZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eFVwbG9hZENvbXBvbmVudCBleHRlbmRzIEJhc2VDb250cm9sPE56VXBsb2FkRmlsZVtdPiBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbnpGaWxlTGlzdDogTnpVcGxvYWRGaWxlW10gPSBbXTtcclxuICAvKipcclxuICAgKiDoh6rlrprkuYnmjInpkq7miJbmmL7npLrlhoXlrrlcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhVcGxvYWRCdXR0b24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xyXG4gIC8qKlxyXG4gICAqIOS4iuS8oOeahOaPkOekuuS/oeaBr1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEhpbnQ/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog5ouW5ou95LiK5Lyg5paH5Lu25pi+56S65paH5pysXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VXBsb2FkVGV4dCA9ICfngrnlh7vmiJbmi5bmi73kuIrkvKDmlofku7YnO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuaYvuekuuS4iuS8oOaMiemSrlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFNob3dVcGxvYWRCdXR0b25JY29uPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDkuIrkvKDmjInpkq7nmoTlm77moIdcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhVcGxvYWRCdXR0b25JY29uID0gJ2Nsb3VkLXVwbG9hZCc7XHJcbiAgLyoqXHJcbiAgICog6ZSZ6K+v5L+h5oGv5pig5bCEXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VmFsaWRhdGVNZXNzYWdlPzogeyBbdmFsaWRhdGVLZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIEBJbnB1dCgpIG56VHlwZTogTnpVcGxvYWRUeXBlID0gJ3NlbGVjdCc7XHJcbiAgLyoqXHJcbiAgICog5LiK5Lyg55qE5paH5Lu25Liq5pWw6ZmQ5Yi2XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpMaW1pdCA9IDA7XHJcbiAgLyoqXHJcbiAgICog5paH5Lu25ZCN6YeN5aSN6aqM6K+BXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4RmlsZU5hbWVEdXBsaWNhdGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOaWh+S7tuWQjemVv+W6plxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEZpbGVOYW1lTGVuZ3RoPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIOaWh+S7tuWkp+WwjyzljZXkvY1rYlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56U2l6ZSA9IDA7XHJcbiAgLyoqXHJcbiAgICog5oC75paH5Lu25aSn5bCPLOWNleS9jWtiXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnpUb3RhbFNpemU/OiBudW1iZXI7XHJcbiAgQElucHV0KCkgbnpGaWxlVHlwZT86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIG56QWNjZXB0Pzogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgQElucHV0KCkgbnpBY3Rpb24/OiBzdHJpbmcgfCAoKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gc3RyaW5nIHwgT2JzZXJ2YWJsZTxzdHJpbmc+KTtcclxuICBASW5wdXQoKSBuekRpcmVjdG9yeSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIG56T3BlbkZpbGVEaWFsb2dPbkNsaWNrID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrpqozor4HplJnor6/mj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTaG93VmFsaWRhdGVNZXNzYWdlPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuekJlZm9yZVVwbG9hZD86IChcclxuICAgIGZpbGU6IE56VXBsb2FkRmlsZSxcclxuICAgIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSxcclxuICAgIGVycm9yOiBGaWxlVmFsaWRhdGVFcnJvciB8IG51bGxcclxuICApID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIF9uekJlZm9yZVVwbG9hZD86IChmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4gYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcbiAgQElucHV0KCkgbnpDdXN0b21SZXF1ZXN0PzogKGl0ZW06IE56VXBsb2FkWEhSQXJncykgPT4gU3Vic2NyaXB0aW9uO1xyXG4gIEBJbnB1dCgpIG56RGF0YT86IHt9IHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pO1xyXG4gIEBJbnB1dCgpIG56RmlsdGVyOiBVcGxvYWRGaWx0ZXJbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIG56RGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG56SGVhZGVycz86IHt9IHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHt9IHwgT2JzZXJ2YWJsZTx7fT4pO1xyXG4gIEBJbnB1dCgpIG56TGlzdFR5cGU6IE56VXBsb2FkTGlzdFR5cGUgPSAndGV4dCc7XHJcbiAgQElucHV0KCkgbnpNdWx0aXBsZT86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbnpOYW1lID0gJ2ZpbGUnO1xyXG4gIEBJbnB1dCgpIG56U2hvd1VwbG9hZExpc3Q6IGJvb2xlYW4gfCBOelNob3dVcGxvYWRMaXN0ID0gdHJ1ZTtcclxuICBASW5wdXQoKSBuelNob3dCdXR0b24gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG56V2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuelJlbW92ZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIEBJbnB1dCgpIG56UHJldmlldz86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHZvaWQ7XHJcbiAgQElucHV0KCkgbnpQcmV2aWV3RmlsZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IE9ic2VydmFibGU8c3RyaW5nPjtcclxuICBASW5wdXQoKSBuelByZXZpZXdJc0ltYWdlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gYm9vbGVhbjtcclxuICBASW5wdXQoKSBuelRyYW5zZm9ybUZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlO1xyXG4gIEBJbnB1dCgpIG56RG93bmxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB2b2lkO1xyXG4gIEBJbnB1dCgpIG56SWNvblJlbmRlciE6IE56SWNvblJlbmRlclRlbXBsYXRlIHwgbnVsbDtcclxuICBASW5wdXQoKSBuekZpbGVMaXN0UmVuZGVyPzogVGVtcGxhdGVSZWY8dm9pZD47XHJcblxyXG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpVcGxvYWRDaGFuZ2VQYXJhbT4oKTtcclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpGaWxlTGlzdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpVcGxvYWRGaWxlW10+KCk7XHJcblxyXG4gIHJlYWRvbmx5IGRlZmF1bHRWYWxpZGF0ZU1lc3NhZ2U6IHsgW0s6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgRklMRV9TSVpFOiAn5paH5Lu2IFwie2ZpbGVOYW1lfVwiIOWkp+Wwj+S4jeiDvei2hei/h3tmaWxlU2l6ZX0nLFxyXG4gICAgRklMRV9UT1RBTF9TSVpFOiAn5oC75LiK5Lyg5paH5Lu25aSn5bCP5LiN6IO96LaF6L+He3RvdGFsU2l6ZX0nLFxyXG4gICAgRklMRV9UWVBFOiAn5LiK5Lyg55qE5paH5Lu25qC85byP5Y+q6IO95pivIFwie2ZpbGVUeXBlfVwiJyxcclxuICAgIEZJTEVfTElNSVQ6ICfmnIDlpJrlhYHorrjkuIrkvKB7ZmlsZUxpbWl0feS4quaWh+S7ticsXHJcbiAgICBGSUxFX05BTUVfTEVOR1RIOiAn5paH5Lu2IFwie2ZpbGVOYW1lfVwiIOWQjeensOmVv+W6puS4jeiDveWkp+S6jntmaWxlTmFtZUxlbmd0aH3kuKrlrZfnrKYnLFxyXG4gICAgRklMRV9OQU1FX0RVUExJQ0FURTogJ+W3suS4iuS8oOWQjeensCBcIntmaWxlTmFtZX1cIiDnm7jlkIznmoTmlofku7bvvIzkuI3og73ph43lpI3kuIrkvKAnXHJcbiAgfTtcclxuXHJcbiAgZ2V0IGlzVGVtcGxhdGVVcGxvYWRCdXR0b24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uenhVcGxvYWRCdXR0b24gaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtZXNzYWdlU2VydmljZTogTnpNZXNzYWdlU2VydmljZSwgcHJvdGVjdGVkIGJ5dGVzUGlwZTogTnpCeXRlc1BpcGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2V0RGVmYXVsdEZpbGVGaWx0ZXIoKTtcclxuICAgIHRoaXMuc2V0TnpCZWZvcmVVcGxvYWQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXREZWZhdWx0RmlsZUZpbHRlcigpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRGaWx0ZXI6IFVwbG9hZEZpbHRlciA9IHtcclxuICAgICAgbmFtZTogJ2RlZmF1bHRGaWx0ZXInLFxyXG4gICAgICBmbjogKGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSkgPT4ge1xyXG4gICAgICAgIGxldCBlcnJvcjogRmlsZVZhbGlkYXRlRXJyb3IgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBjb25zdCBhbGxGaWxlcyA9ICh0aGlzLm56RmlsZUxpc3QgfHwgW10pLmNvbmNhdChmaWxlTGlzdCk7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZUxpc3QpIHtcclxuICAgICAgICAgIGNvbnN0IGVyciA9IHRoaXMuYmVmb3JlVXBsb2FkVmFsaWRhdG9yKGZpbGUsIGFsbEZpbGVzKTtcclxuICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChmaWxlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoIWVycm9yIHx8IGVyci5lcnJvclR5cGUgPT09IEVycm9yVHlwZS5GSUxFX1RPVEFMX1NJWkUpIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyb3IgJiYgdGhpcy5uenhTaG93VmFsaWRhdGVNZXNzYWdlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8ICfmlofku7bkuI3lkIjms5XvvIzor7fph43mlrDpgInmi6knKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCF0aGlzLm56RmlsdGVyKSB7XHJcbiAgICAgIHRoaXMubnpGaWx0ZXIgPSBbZGVmYXVsdEZpbHRlcl07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm56RmlsdGVyLmZpbmQoZiA9PiBmLm5hbWUgPT09ICdkZWZhdWx0RmlsdGVyJykpIHtcclxuICAgICAgdGhpcy5uekZpbHRlci5wdXNoKGRlZmF1bHRGaWx0ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0TnpCZWZvcmVVcGxvYWQoKSB7XHJcbiAgICB0aGlzLl9uekJlZm9yZVVwbG9hZCA9IHRoaXMuZ2V0TnpCZWZvcmVVcGxvYWQoKTtcclxuICB9XHJcblxyXG4gIG9uTnpDaGFuZ2UoZXZ0OiBOelVwbG9hZENoYW5nZVBhcmFtKSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG5cclxuICAgIGlmIChldnQudHlwZSA9PT0gJ3N1Y2Nlc3MnIHx8IGV2dC50eXBlID09PSAncmVtb3ZlZCcpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZShldnQuZmlsZUxpc3QpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5uekNoYW5nZS5lbWl0KGV2dCk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBOelVwbG9hZEZpbGVbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5uekZpbGVMaXN0ID0gdmFsdWUgfHwgW107XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtLIGluIGtleW9mIHRoaXNdPzogU2ltcGxlQ2hhbmdlIH0gJiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5uekZpbHRlciAmJiAhY2hhbmdlcy5uekZpbHRlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5zZXREZWZhdWx0RmlsZUZpbHRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLm56QmVmb3JlVXBsb2FkICYmICFjaGFuZ2VzLm56QmVmb3JlVXBsb2FkLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLnNldE56QmVmb3JlVXBsb2FkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubnpEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDph43mlrDljIXoo4V6QmVmb3JlVXBsb2FkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldE56QmVmb3JlVXBsb2FkKCk6XHJcbiAgICB8ICgoZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+KVxyXG4gICAgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKHRoaXMubnpCZWZvcmVVcGxvYWQpIHtcclxuICAgICAgcmV0dXJuIChmaWxlLCBmaWxlTGlzdCkgPT4gdGhpcy5uekJlZm9yZVVwbG9hZCEoZmlsZSwgZmlsZUxpc3QsIHRoaXMuYmVmb3JlVXBsb2FkVmFsaWRhdG9yKGZpbGUsIGZpbGVMaXN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaWh+S7tumqjOivgVxyXG4gICAqIEBwYXJhbSBmaWxlIOW9k+WJjeaWh+S7tlxyXG4gICAqIEBwYXJhbSBmaWxlTGlzdCDmlofku7bliJfooahcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGJlZm9yZVVwbG9hZFZhbGlkYXRvcihmaWxlOiBOelVwbG9hZEZpbGUsIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSk6IEZpbGVWYWxpZGF0ZUVycm9yIHwgbnVsbCB7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdFZhbGlkYXRlTWVzc2FnZSwgdGhpcy5uenhWYWxpZGF0ZU1lc3NhZ2UpO1xyXG5cclxuICAgIC8vIOaWh+S7tuexu+Wei1xyXG4gICAgaWYgKHRoaXMubnpGaWxlVHlwZSAhPSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG56RmlsZVR5cGVzID0gdHlwZW9mIHRoaXMubnpGaWxlVHlwZSA9PT0gJ3N0cmluZycgPyBbdGhpcy5uekZpbGVUeXBlXSA6IHRoaXMubnpGaWxlVHlwZTtcclxuXHJcbiAgICAgIGlmIChuekZpbGVUeXBlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBmaWxlLm5hbWUubGFzdEluZGV4T2YoJy4nKTtcclxuICAgICAgICBjb25zdCBleHQgPSBpbmRleCA+IDAgPyBmaWxlLm5hbWUuc3Vic3RyaW5nKGluZGV4ICsgMSkudG9Mb3dlckNhc2UoKSA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghZXh0IHx8ICghbnpGaWxlVHlwZXMuaW5jbHVkZXMoZmlsZS50eXBlISkgJiYgIW56RmlsZVR5cGVzLmluY2x1ZGVzKGV4dCkpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFcnJvcihFcnJvclR5cGUuRklMRV9UWVBFLCBmaWxlLCBtZXNzYWdlcywgeyBmaWxlVHlwZTogdGhpcy5uekZpbGVUeXBlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWNleS4quaWh+S7tuWkp+Wwj1xyXG4gICAgaWYgKHRoaXMubnpTaXplICE9IG51bGwgJiYgdGhpcy5uelNpemUgPiAwICYmIChmaWxlLnNpemUgfHwgMCkgLyAxMDI0ID4gdGhpcy5uelNpemUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3IoRXJyb3JUeXBlLkZJTEVfU0laRSwgZmlsZSwgbWVzc2FnZXMsIHtcclxuICAgICAgICBmaWxlU2l6ZTogdGhpcy5ieXRlc1BpcGUudHJhbnNmb3JtKHRoaXMubnpTaXplLCAyLCAna0InKSxcclxuICAgICAgICBmaWxlTmFtZTogZmlsZS5uYW1lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaWh+S7tuWQjemVv+W6plxyXG4gICAgaWYgKHRoaXMubnp4RmlsZU5hbWVMZW5ndGggJiYgZmlsZS5uYW1lLmxlbmd0aCA+IHRoaXMubnp4RmlsZU5hbWVMZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3IoRXJyb3JUeXBlLkZJTEVfTkFNRV9MRU5HVEgsIGZpbGUsIG1lc3NhZ2VzLCB7XHJcbiAgICAgICAgZmlsZU5hbWVMZW5ndGg6IHRoaXMubnp4RmlsZU5hbWVMZW5ndGgsXHJcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlofku7blkI3ph43lpI1cclxuICAgIGlmICh0aGlzLm56eEZpbGVOYW1lRHVwbGljYXRlID09PSBmYWxzZSAmJiBmaWxlTGlzdC5maWx0ZXIoZiA9PiBmICE9PSBmaWxlKS5maW5kKGl0ID0+IGl0Lm5hbWUgPT09IGZpbGUubmFtZSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3IoRXJyb3JUeXBlLkZJTEVfTkFNRV9EVVBMSUNBVEUsIGZpbGUsIG1lc3NhZ2VzLCB7IGZpbGVOYW1lOiBmaWxlLm5hbWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pyA5aSn5LiK5Lyg5Liq5pWwXHJcbiAgICBpZiAodGhpcy5uekxpbWl0ICYmIGZpbGVMaXN0Lmxlbmd0aCA+IHRoaXMubnpMaW1pdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRFcnJvcihFcnJvclR5cGUuRklMRV9MSU1JVCwgZmlsZSwgbWVzc2FnZXMsIHsgZmlsZUxpbWl0OiB0aGlzLm56TGltaXQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5oC75paH5Lu25aSn5bCPXHJcbiAgICBpZiAodGhpcy5uelRvdGFsU2l6ZSAmJiBmaWxlTGlzdC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IChwcmV2ICs9IGN1cnIuc2l6ZSB8fCAwKSwgMCkgLyAxMDI0ID4gdGhpcy5uelRvdGFsU2l6ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRFcnJvcihFcnJvclR5cGUuRklMRV9UT1RBTF9TSVpFLCBmaWxlLCBtZXNzYWdlcywge1xyXG4gICAgICAgIHRvdGFsU2l6ZTogdGhpcy5ieXRlc1BpcGUudHJhbnNmb3JtKHRoaXMubnpUb3RhbFNpemUsIDIsICdrQicpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmL7npLrmlofku7bpqozor4HplJnor69cclxuICAgKiBAcGFyYW0gZmlsZSDlvZPliY3mlofku7ZcclxuICAgKiBAcGFyYW0gZmlsZUxpc3Qg5paH5Lu25YiX6KGoXHJcbiAgICogQHBhcmFtIHNob3dWYWxpZGF0ZU1lc3NhZ2Ug5piv5ZCm5pi+56S6XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNob3dGaWxlRXJyb3JNZXNzYWdlKFxyXG4gICAgZmlsZTogTnpVcGxvYWRGaWxlLFxyXG4gICAgZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdLFxyXG4gICAgc2hvd1ZhbGlkYXRlTWVzc2FnZT86IGJvb2xlYW5cclxuICApOiBGaWxlVmFsaWRhdGVFcnJvciB8IG51bGwge1xyXG4gICAgY29uc3QgZXJyb3IgPSB0aGlzLmJlZm9yZVVwbG9hZFZhbGlkYXRvcihmaWxlLCBmaWxlTGlzdCk7XHJcbiAgICBpZiAoZXJyb3IgJiYgc2hvd1ZhbGlkYXRlTWVzc2FnZSAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8ICfmlofku7bkuI3lkIjms5UnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBlcnJvcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXJyb3IoXHJcbiAgICBlcnJvclR5cGU6IEVycm9yVHlwZSxcclxuICAgIGZpbGU6IE56VXBsb2FkRmlsZSxcclxuICAgIG1lc3NhZ2VzOiB7IFtLOiBzdHJpbmddOiBzdHJpbmcgfSxcclxuICAgIGZtdERhdGE/OiBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+XHJcbiAgKTogRmlsZVZhbGlkYXRlRXJyb3Ige1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXJyb3JUeXBlLFxyXG4gICAgICBmaWxlLFxyXG4gICAgICBtZXNzYWdlOiBOenhVdGlscy5mb3JtYXQobWVzc2FnZXNbZXJyb3JUeXBlXSwgZm10RGF0YSlcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVWYWxpZGF0ZUVycm9yIHtcclxuICAvKipcclxuICAgKiDpqozor4HplJnor6/nsbvlnotcclxuICAgKi9cclxuICBlcnJvclR5cGU6IEVycm9yVHlwZTtcclxuICAvKipcclxuICAgKiDplJnor6/kv6Hmga9cclxuICAgKi9cclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICog6ZSZ6K+v55qE5paH5Lu2XHJcbiAgICovXHJcbiAgZmlsZTogTnpVcGxvYWRGaWxlO1xyXG59XHJcbiIsIjxuei11cGxvYWRcclxuICBbbnpUeXBlXT1cIm56VHlwZVwiXHJcbiAgW256QWNjZXB0XT1cIm56QWNjZXB0XCJcclxuICBbbnpBY3Rpb25dPVwibnpBY3Rpb25cIlxyXG4gIFtuekRpcmVjdG9yeV09XCJuekRpcmVjdG9yeVwiXHJcbiAgW256T3BlbkZpbGVEaWFsb2dPbkNsaWNrXT1cIm56T3BlbkZpbGVEaWFsb2dPbkNsaWNrXCJcclxuICBbbnpCZWZvcmVVcGxvYWRdPVwiX256QmVmb3JlVXBsb2FkXCJcclxuICBbbnpDdXN0b21SZXF1ZXN0XT1cIm56Q3VzdG9tUmVxdWVzdFwiXHJcbiAgW256RGF0YV09XCJuekRhdGFcIlxyXG4gIFtuekZpbHRlcl09XCJuekZpbHRlclwiXHJcbiAgWyhuekZpbGVMaXN0KV09XCJuekZpbGVMaXN0XCJcclxuICBbbnpEaXNhYmxlZF09XCJuekRpc2FibGVkXCJcclxuICBbbnpIZWFkZXJzXT1cIm56SGVhZGVyc1wiXHJcbiAgW256TGlzdFR5cGVdPVwibnpMaXN0VHlwZVwiXHJcbiAgW256TXVsdGlwbGVdPVwibnpNdWx0aXBsZVwiXHJcbiAgW256TmFtZV09XCJuek5hbWVcIlxyXG4gIFtuelNob3dVcGxvYWRMaXN0XT1cIm56U2hvd1VwbG9hZExpc3RcIlxyXG4gIFtuelNob3dCdXR0b25dPVwibnpTaG93QnV0dG9uXCJcclxuICBbbnpXaXRoQ3JlZGVudGlhbHNdPVwibnpXaXRoQ3JlZGVudGlhbHNcIlxyXG4gIFtuelJlbW92ZV09XCJuelJlbW92ZVwiXHJcbiAgW256UHJldmlld109XCJuelByZXZpZXdcIlxyXG4gIFtuelByZXZpZXdGaWxlXT1cIm56UHJldmlld0ZpbGVcIlxyXG4gIFtuelByZXZpZXdJc0ltYWdlXT1cIm56UHJldmlld0lzSW1hZ2VcIlxyXG4gIFtuelRyYW5zZm9ybUZpbGVdPVwibnpUcmFuc2Zvcm1GaWxlXCJcclxuICBbbnpEb3dubG9hZF09XCJuekRvd25sb2FkXCJcclxuICBbbnpJY29uUmVuZGVyXT1cIm56SWNvblJlbmRlclwiXHJcbiAgW256RmlsZUxpc3RSZW5kZXJdPVwibnpGaWxlTGlzdFJlbmRlclwiXHJcbiAgKG56Q2hhbmdlKT1cIm9uTnpDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgKG56RmlsZUxpc3RDaGFuZ2UpPVwibnpGaWxlTGlzdENoYW5nZS5lbWl0KCRldmVudClcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56eFVwbG9hZEJ1dHRvbjsgY29udGV4dDogeyAkaW1wbGljaXQ6IHRoaXMsIG56RmlsZUxpc3Q6IG56RmlsZUxpc3QgfVwiPlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBuei1idXR0b25cclxuICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgKm5nSWY9XCJuelR5cGUgPT09ICdzZWxlY3QnICYmIG56eFNob3dVcGxvYWRCdXR0b25JY29uICE9PSBmYWxzZVwiXHJcbiAgICA+XHJcbiAgICAgIDxpICpuZ0lmPVwibnp4VXBsb2FkQnV0dG9uSWNvblwiIG56LWljb24gW256VHlwZV09XCJuenhVcGxvYWRCdXR0b25JY29uXCI+PC9pPlxyXG4gICAgICB7eyBuenhVcGxvYWRCdXR0b24gfHwgJ+S4iuS8oCcgfX1cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwibnp4U2hvd1VwbG9hZEJ1dHRvbkljb24gIT09IGZhbHNlICYmIG56VHlwZSA9PT0gJ2RyYWcnXCI+XHJcbiAgICA8cCBjbGFzcz1cImFudC11cGxvYWQtZHJhZy1pY29uXCI+XHJcbiAgICAgIDxpICpuZ0lmPVwibnp4VXBsb2FkQnV0dG9uSWNvblwiIG56LWljb24gW256VHlwZV09XCJuenhVcGxvYWRCdXR0b25JY29uXCI+PC9pPlxyXG4gICAgPC9wPlxyXG4gICAgPHAgY2xhc3M9XCJhbnQtdXBsb2FkLXRleHRcIj57e256eFVwbG9hZFRleHR9fTwvcD5cclxuICAgIDxwIGNsYXNzPVwiYW50LXVwbG9hZC1oaW50XCI+e3sgbnp4SGludCB9fTwvcD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uei11cGxvYWQ+XHJcbiJdfQ==