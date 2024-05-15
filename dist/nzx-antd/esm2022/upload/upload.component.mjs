import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@xmagic/nzx-antd/util';
import { NzxUtils } from '@xmagic/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL2xpYi91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFHTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFhdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7OztBQUdsRCxNQUFNLENBQU4sSUFBWSxTQWFYO0FBYkQsV0FBWSxTQUFTO0lBQ25COztPQUVHO0lBQ0gsb0NBQXVCLENBQUE7SUFDdkI7O09BRUc7SUFDSCxnREFBbUMsQ0FBQTtJQUNuQyxvQ0FBdUIsQ0FBQTtJQUN2QixzQ0FBeUIsQ0FBQTtJQUN6QixrREFBcUMsQ0FBQTtJQUNyQyx3REFBMkMsQ0FBQTtBQUM3QyxDQUFDLEVBYlcsU0FBUyxLQUFULFNBQVMsUUFhcEI7QUFlRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBMkI7SUFrRzNDO0lBQTRDO0lBakd6RCxVQUFVLEdBQW1CLEVBQUUsQ0FBQztJQUN6Qzs7T0FFRztJQUNNLGVBQWUsQ0FBbUM7SUFDM0Q7O09BRUc7SUFDTSxPQUFPLENBQVU7SUFDMUI7O09BRUc7SUFDTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0lBQ3JDOztPQUVHO0lBQ00sdUJBQXVCLENBQVc7SUFDM0M7O09BRUc7SUFDTSxtQkFBbUIs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O2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFFYSxRQUFRO3NCQUExQixNQUFNO2dCQUNZLGdCQUFnQjtzQkFBbEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZSxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTnpJY29uUmVuZGVyVGVtcGxhdGUsXHJcbiAgTnpVcGxvYWRDaGFuZ2VQYXJhbSxcclxuICBOelVwbG9hZEZpbGUsXHJcbiAgTnpVcGxvYWRMaXN0VHlwZSxcclxuICBOelVwbG9hZFRyYW5zZm9ybUZpbGVUeXBlLFxyXG4gIE56VXBsb2FkVHlwZSxcclxuICBOelVwbG9hZFhIUkFyZ3MsXHJcbiAgVXBsb2FkRmlsdGVyLFxyXG4gIE56U2hvd1VwbG9hZExpc3RcclxufSBmcm9tICduZy16b3Jyby1hbnRkL3VwbG9hZCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpNZXNzYWdlU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVzc2FnZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpCeXRlc1BpcGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3BpcGVzJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuXHJcbmV4cG9ydCBlbnVtIEVycm9yVHlwZSB7XHJcbiAgLyoqXHJcbiAgICog5Y2V5paH5Lu25aSn5bCP6ZmQ5Yi2LOWNleS9jUtCXHJcbiAgICovXHJcbiAgRklMRV9TSVpFID0gJ0ZJTEVfU0laRScsXHJcbiAgLyoqXHJcbiAgICog5oC75paH5Lu25aSn5bCP6ZmQ5Yi2XHJcbiAgICovXHJcbiAgRklMRV9UT1RBTF9TSVpFID0gJ0ZJTEVfVE9UQUxfU0laRScsXHJcbiAgRklMRV9UWVBFID0gJ0ZJTEVfVFlQRScsXHJcbiAgRklMRV9MSU1JVCA9ICdGSUxFX0xJTUlUJyxcclxuICBGSUxFX05BTUVfTEVOR1RIID0gJ0ZJTEVfTkFNRV9MRU5HVEgnLFxyXG4gIEZJTEVfTkFNRV9EVVBMSUNBVEUgPSAnRklMRV9OQU1FX0RVUExJQ0FURSdcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtdXBsb2FkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56eFVwbG9hZENvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgTnpCeXRlc1BpcGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhVcGxvYWRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29udHJvbDxOelVwbG9hZEZpbGVbXT4gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG56RmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdID0gW107XHJcbiAgLyoqXHJcbiAgICog6Ieq5a6a5LmJ5oyJ6ZKu5oiW5pi+56S65YaF5a65XHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VXBsb2FkQnV0dG9uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcclxuICAvKipcclxuICAgKiDkuIrkvKDnmoTmj5DnpLrkv6Hmga9cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhIaW50Pzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOaLluaLveS4iuS8oOaWh+S7tuaYvuekuuaWh+acrFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFVwbG9hZFRleHQgPSAn54K55Ye75oiW5ouW5ou95LiK5Lyg5paH5Lu2JztcclxuICAvKipcclxuICAgKiDmmK/lkKbmmL7npLrkuIrkvKDmjInpkq5cclxuICAgKi9cclxuICBASW5wdXQoKSBuenhTaG93VXBsb2FkQnV0dG9uSWNvbj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICog5LiK5Lyg5oyJ6ZKu55qE5Zu+5qCHXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4VXBsb2FkQnV0dG9uSWNvbiA9ICdjbG91ZC11cGxvYWQnO1xyXG4gIC8qKlxyXG4gICAqIOmUmeivr+S/oeaBr+aYoOWwhFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eFZhbGlkYXRlTWVzc2FnZT86IHsgW3ZhbGlkYXRlS2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICBASW5wdXQoKSBuelR5cGU6IE56VXBsb2FkVHlwZSA9ICdzZWxlY3QnO1xyXG4gIC8qKlxyXG4gICAqIOS4iuS8oOeahOaWh+S7tuS4quaVsOmZkOWItlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56TGltaXQgPSAwO1xyXG4gIC8qKlxyXG4gICAqIOaWh+S7tuWQjemHjeWkjemqjOivgVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eEZpbGVOYW1lRHVwbGljYXRlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDmlofku7blkI3plb/luqZcclxuICAgKi9cclxuICBASW5wdXQoKSBuenhGaWxlTmFtZUxlbmd0aD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiDmlofku7blpKflsI8s5Y2V5L2Na2JcclxuICAgKi9cclxuICBASW5wdXQoKSBuelNpemUgPSAwO1xyXG4gIC8qKlxyXG4gICAqIOaAu+aWh+S7tuWkp+WwjyzljZXkvY1rYlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56VG90YWxTaXplPzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG56RmlsZVR5cGU/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBASW5wdXQoKSBuekFjY2VwdD86IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIG56QWN0aW9uPzogc3RyaW5nIHwgKChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHN0cmluZyB8IE9ic2VydmFibGU8c3RyaW5nPik7XHJcbiAgQElucHV0KCkgbnpEaXJlY3RvcnkgPSBmYWxzZTtcclxuICBASW5wdXQoKSBuek9wZW5GaWxlRGlhbG9nT25DbGljayA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5pi+56S66aqM6K+B6ZSZ6K+v5o+Q56S65L+h5oGvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbnp4U2hvd1ZhbGlkYXRlTWVzc2FnZT86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbnpCZWZvcmVVcGxvYWQ/OiAoXHJcbiAgICBmaWxlOiBOelVwbG9hZEZpbGUsXHJcbiAgICBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10sXHJcbiAgICBlcnJvcjogRmlsZVZhbGlkYXRlRXJyb3IgfCBudWxsXHJcbiAgKSA9PiBib29sZWFuIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuICBfbnpCZWZvcmVVcGxvYWQ/OiAoZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIEBJbnB1dCgpIG56Q3VzdG9tUmVxdWVzdD86IChpdGVtOiBOelVwbG9hZFhIUkFyZ3MpID0+IFN1YnNjcmlwdGlvbjtcclxuICBASW5wdXQoKSBuekRhdGE/OiB7fSB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7fSB8IE9ic2VydmFibGU8e30+KTtcclxuICBASW5wdXQoKSBuekZpbHRlcjogVXBsb2FkRmlsdGVyW10gPSBbXTtcclxuICBASW5wdXQoKSBuekRpc2FibGVkPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuekhlYWRlcnM/OiB7fSB8ICgoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB7fSB8IE9ic2VydmFibGU8e30+KTtcclxuICBASW5wdXQoKSBuekxpc3RUeXBlOiBOelVwbG9hZExpc3RUeXBlID0gJ3RleHQnO1xyXG4gIEBJbnB1dCgpIG56TXVsdGlwbGU/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG56TmFtZSA9ICdmaWxlJztcclxuICBASW5wdXQoKSBuelNob3dVcGxvYWRMaXN0OiBib29sZWFuIHwgTnpTaG93VXBsb2FkTGlzdCA9IHRydWU7XHJcbiAgQElucHV0KCkgbnpTaG93QnV0dG9uID0gdHJ1ZTtcclxuICBASW5wdXQoKSBueldpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbnpSZW1vdmU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBib29sZWFuIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuICBASW5wdXQoKSBuelByZXZpZXc/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiB2b2lkO1xyXG4gIEBJbnB1dCgpIG56UHJldmlld0ZpbGU/OiAoZmlsZTogTnpVcGxvYWRGaWxlKSA9PiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgQElucHV0KCkgbnpQcmV2aWV3SXNJbWFnZT86IChmaWxlOiBOelVwbG9hZEZpbGUpID0+IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbnpUcmFuc2Zvcm1GaWxlPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gTnpVcGxvYWRUcmFuc2Zvcm1GaWxlVHlwZTtcclxuICBASW5wdXQoKSBuekRvd25sb2FkPzogKGZpbGU6IE56VXBsb2FkRmlsZSkgPT4gdm9pZDtcclxuICBASW5wdXQoKSBuekljb25SZW5kZXIhOiBOekljb25SZW5kZXJUZW1wbGF0ZSB8IG51bGw7XHJcbiAgQElucHV0KCkgbnpGaWxlTGlzdFJlbmRlcj86IFRlbXBsYXRlUmVmPHZvaWQ+O1xyXG5cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkQ2hhbmdlUGFyYW0+KCk7XHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RmlsZUxpc3RDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56VXBsb2FkRmlsZVtdPigpO1xyXG5cclxuICByZWFkb25seSBkZWZhdWx0VmFsaWRhdGVNZXNzYWdlOiB7IFtLOiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgIEZJTEVfU0laRTogJ+aWh+S7tiBcIntmaWxlTmFtZX1cIiDlpKflsI/kuI3og73otoXov4d7ZmlsZVNpemV9JyxcclxuICAgIEZJTEVfVE9UQUxfU0laRTogJ+aAu+S4iuS8oOaWh+S7tuWkp+Wwj+S4jeiDvei2hei/h3t0b3RhbFNpemV9JyxcclxuICAgIEZJTEVfVFlQRTogJ+S4iuS8oOeahOaWh+S7tuagvOW8j+WPquiDveaYryBcIntmaWxlVHlwZX1cIicsXHJcbiAgICBGSUxFX0xJTUlUOiAn5pyA5aSa5YWB6K645LiK5Lyge2ZpbGVMaW1pdH3kuKrmlofku7YnLFxyXG4gICAgRklMRV9OQU1FX0xFTkdUSDogJ+aWh+S7tiBcIntmaWxlTmFtZX1cIiDlkI3np7Dplb/luqbkuI3og73lpKfkuo57ZmlsZU5hbWVMZW5ndGh95Liq5a2X56ymJyxcclxuICAgIEZJTEVfTkFNRV9EVVBMSUNBVEU6ICflt7LkuIrkvKDlkI3np7AgXCJ7ZmlsZU5hbWV9XCIg55u45ZCM55qE5paH5Lu277yM5LiN6IO96YeN5aSN5LiK5LygJ1xyXG4gIH07XHJcblxyXG4gIGdldCBpc1RlbXBsYXRlVXBsb2FkQnV0dG9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnp4VXBsb2FkQnV0dG9uIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbWVzc2FnZVNlcnZpY2U6IE56TWVzc2FnZVNlcnZpY2UsIHByb3RlY3RlZCBieXRlc1BpcGU6IE56Qnl0ZXNQaXBlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNldERlZmF1bHRGaWxlRmlsdGVyKCk7XHJcbiAgICB0aGlzLnNldE56QmVmb3JlVXBsb2FkKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0RGVmYXVsdEZpbGVGaWx0ZXIoKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0RmlsdGVyOiBVcGxvYWRGaWx0ZXIgPSB7XHJcbiAgICAgIG5hbWU6ICdkZWZhdWx0RmlsdGVyJyxcclxuICAgICAgZm46IChmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pID0+IHtcclxuICAgICAgICBsZXQgZXJyb3I6IEZpbGVWYWxpZGF0ZUVycm9yIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgYWxsRmlsZXMgPSAodGhpcy5uekZpbGVMaXN0IHx8IFtdKS5jb25jYXQoZmlsZUxpc3QpO1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVMaXN0KSB7XHJcbiAgICAgICAgICBjb25zdCBlcnIgPSB0aGlzLmJlZm9yZVVwbG9hZFZhbGlkYXRvcihmaWxlLCBhbGxGaWxlcyk7XHJcbiAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goZmlsZSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKCFlcnJvciB8fCBlcnIuZXJyb3JUeXBlID09PSBFcnJvclR5cGUuRklMRV9UT1RBTF9TSVpFKSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gZXJyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVycm9yICYmIHRoaXMubnp4U2hvd1ZhbGlkYXRlTWVzc2FnZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCAn5paH5Lu25LiN5ZCI5rOV77yM6K+36YeN5paw6YCJ5oupJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghdGhpcy5uekZpbHRlcikge1xyXG4gICAgICB0aGlzLm56RmlsdGVyID0gW2RlZmF1bHRGaWx0ZXJdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5uekZpbHRlci5maW5kKGYgPT4gZi5uYW1lID09PSAnZGVmYXVsdEZpbHRlcicpKSB7XHJcbiAgICAgIHRoaXMubnpGaWx0ZXIucHVzaChkZWZhdWx0RmlsdGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldE56QmVmb3JlVXBsb2FkKCkge1xyXG4gICAgdGhpcy5fbnpCZWZvcmVVcGxvYWQgPSB0aGlzLmdldE56QmVmb3JlVXBsb2FkKCk7XHJcbiAgfVxyXG5cclxuICBvbk56Q2hhbmdlKGV2dDogTnpVcGxvYWRDaGFuZ2VQYXJhbSkge1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuXHJcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdzdWNjZXNzJyB8fCBldnQudHlwZSA9PT0gJ3JlbW92ZWQnKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UoZXZ0LmZpbGVMaXN0KTtcclxuICAgIH1cclxuICAgIHRoaXMubnpDaGFuZ2UuZW1pdChldnQpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogTnpVcGxvYWRGaWxlW10pOiB2b2lkIHtcclxuICAgIHRoaXMubnpGaWxlTGlzdCA9IHZhbHVlIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbSyBpbiBrZXlvZiB0aGlzXT86IFNpbXBsZUNoYW5nZSB9ICYgU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMubnpGaWx0ZXIgJiYgIWNoYW5nZXMubnpGaWx0ZXIuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMuc2V0RGVmYXVsdEZpbGVGaWx0ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5uekJlZm9yZVVwbG9hZCAmJiAhY2hhbmdlcy5uekJlZm9yZVVwbG9hZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5zZXROekJlZm9yZVVwbG9hZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3ZlcnJpZGUgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeN5paw5YyF6KOFekJlZm9yZVVwbG9hZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXROekJlZm9yZVVwbG9hZCgpOlxyXG4gICAgfCAoKGZpbGU6IE56VXBsb2FkRmlsZSwgZmlsZUxpc3Q6IE56VXBsb2FkRmlsZVtdKSA9PiBib29sZWFuIHwgT2JzZXJ2YWJsZTxib29sZWFuPilcclxuICAgIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLm56QmVmb3JlVXBsb2FkKSB7XHJcbiAgICAgIHJldHVybiAoZmlsZSwgZmlsZUxpc3QpID0+IHRoaXMubnpCZWZvcmVVcGxvYWQhKGZpbGUsIGZpbGVMaXN0LCB0aGlzLmJlZm9yZVVwbG9hZFZhbGlkYXRvcihmaWxlLCBmaWxlTGlzdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmlofku7bpqozor4FcclxuICAgKiBAcGFyYW0gZmlsZSDlvZPliY3mlofku7ZcclxuICAgKiBAcGFyYW0gZmlsZUxpc3Qg5paH5Lu25YiX6KGoXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBiZWZvcmVVcGxvYWRWYWxpZGF0b3IoZmlsZTogTnpVcGxvYWRGaWxlLCBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10pOiBGaWxlVmFsaWRhdGVFcnJvciB8IG51bGwge1xyXG4gICAgY29uc3QgbWVzc2FnZXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRWYWxpZGF0ZU1lc3NhZ2UsIHRoaXMubnp4VmFsaWRhdGVNZXNzYWdlKTtcclxuXHJcbiAgICAvLyDmlofku7bnsbvlnotcclxuICAgIGlmICh0aGlzLm56RmlsZVR5cGUgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBuekZpbGVUeXBlcyA9IHR5cGVvZiB0aGlzLm56RmlsZVR5cGUgPT09ICdzdHJpbmcnID8gW3RoaXMubnpGaWxlVHlwZV0gOiB0aGlzLm56RmlsZVR5cGU7XHJcblxyXG4gICAgICBpZiAobnpGaWxlVHlwZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmlsZS5uYW1lLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICAgICAgY29uc3QgZXh0ID0gaW5kZXggPiAwID8gZmlsZS5uYW1lLnN1YnN0cmluZyhpbmRleCArIDEpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIWV4dCB8fCAoIW56RmlsZVR5cGVzLmluY2x1ZGVzKGZpbGUudHlwZSEpICYmICFuekZpbGVUeXBlcy5pbmNsdWRlcyhleHQpKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3IoRXJyb3JUeXBlLkZJTEVfVFlQRSwgZmlsZSwgbWVzc2FnZXMsIHsgZmlsZVR5cGU6IHRoaXMubnpGaWxlVHlwZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDljZXkuKrmlofku7blpKflsI9cclxuICAgIGlmICh0aGlzLm56U2l6ZSAhPSBudWxsICYmIHRoaXMubnpTaXplID4gMCAmJiAoZmlsZS5zaXplIHx8IDApIC8gMTAyNCA+IHRoaXMubnpTaXplKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEVycm9yKEVycm9yVHlwZS5GSUxFX1NJWkUsIGZpbGUsIG1lc3NhZ2VzLCB7XHJcbiAgICAgICAgZmlsZVNpemU6IHRoaXMuYnl0ZXNQaXBlLnRyYW5zZm9ybSh0aGlzLm56U2l6ZSwgMiwgJ2tCJyksXHJcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlofku7blkI3plb/luqZcclxuICAgIGlmICh0aGlzLm56eEZpbGVOYW1lTGVuZ3RoICYmIGZpbGUubmFtZS5sZW5ndGggPiB0aGlzLm56eEZpbGVOYW1lTGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEVycm9yKEVycm9yVHlwZS5GSUxFX05BTUVfTEVOR1RILCBmaWxlLCBtZXNzYWdlcywge1xyXG4gICAgICAgIGZpbGVOYW1lTGVuZ3RoOiB0aGlzLm56eEZpbGVOYW1lTGVuZ3RoLFxyXG4gICAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5paH5Lu25ZCN6YeN5aSNXHJcbiAgICBpZiAodGhpcy5uenhGaWxlTmFtZUR1cGxpY2F0ZSA9PT0gZmFsc2UgJiYgZmlsZUxpc3QuZmlsdGVyKGYgPT4gZiAhPT0gZmlsZSkuZmluZChpdCA9PiBpdC5uYW1lID09PSBmaWxlLm5hbWUpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEVycm9yKEVycm9yVHlwZS5GSUxFX05BTUVfRFVQTElDQVRFLCBmaWxlLCBtZXNzYWdlcywgeyBmaWxlTmFtZTogZmlsZS5uYW1lIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOacgOWkp+S4iuS8oOS4quaVsFxyXG4gICAgaWYgKHRoaXMubnpMaW1pdCAmJiBmaWxlTGlzdC5sZW5ndGggPiB0aGlzLm56TGltaXQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3IoRXJyb3JUeXBlLkZJTEVfTElNSVQsIGZpbGUsIG1lc3NhZ2VzLCB7IGZpbGVMaW1pdDogdGhpcy5uekxpbWl0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaAu+aWh+S7tuWkp+Wwj1xyXG4gICAgaWYgKHRoaXMubnpUb3RhbFNpemUgJiYgZmlsZUxpc3QucmVkdWNlKChwcmV2LCBjdXJyKSA9PiAocHJldiArPSBjdXJyLnNpemUgfHwgMCksIDApIC8gMTAyNCA+IHRoaXMubnpUb3RhbFNpemUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3IoRXJyb3JUeXBlLkZJTEVfVE9UQUxfU0laRSwgZmlsZSwgbWVzc2FnZXMsIHtcclxuICAgICAgICB0b3RhbFNpemU6IHRoaXMuYnl0ZXNQaXBlLnRyYW5zZm9ybSh0aGlzLm56VG90YWxTaXplLCAyLCAna0InKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pi+56S65paH5Lu26aqM6K+B6ZSZ6K+vXHJcbiAgICogQHBhcmFtIGZpbGUg5b2T5YmN5paH5Lu2XHJcbiAgICogQHBhcmFtIGZpbGVMaXN0IOaWh+S7tuWIl+ihqFxyXG4gICAqIEBwYXJhbSBzaG93VmFsaWRhdGVNZXNzYWdlIOaYr+WQpuaYvuekulxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93RmlsZUVycm9yTWVzc2FnZShcclxuICAgIGZpbGU6IE56VXBsb2FkRmlsZSxcclxuICAgIGZpbGVMaXN0OiBOelVwbG9hZEZpbGVbXSxcclxuICAgIHNob3dWYWxpZGF0ZU1lc3NhZ2U/OiBib29sZWFuXHJcbiAgKTogRmlsZVZhbGlkYXRlRXJyb3IgfCBudWxsIHtcclxuICAgIGNvbnN0IGVycm9yID0gdGhpcy5iZWZvcmVVcGxvYWRWYWxpZGF0b3IoZmlsZSwgZmlsZUxpc3QpO1xyXG4gICAgaWYgKGVycm9yICYmIHNob3dWYWxpZGF0ZU1lc3NhZ2UgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCAn5paH5Lu25LiN5ZCI5rOVJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3I7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEVycm9yKFxyXG4gICAgZXJyb3JUeXBlOiBFcnJvclR5cGUsXHJcbiAgICBmaWxlOiBOelVwbG9hZEZpbGUsXHJcbiAgICBtZXNzYWdlczogeyBbSzogc3RyaW5nXTogc3RyaW5nIH0sXHJcbiAgICBmbXREYXRhPzogUmVjb3JkPHN0cmluZywgTnpTYWZlQW55PlxyXG4gICk6IEZpbGVWYWxpZGF0ZUVycm9yIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVycm9yVHlwZSxcclxuICAgICAgZmlsZSxcclxuICAgICAgbWVzc2FnZTogTnp4VXRpbHMuZm9ybWF0KG1lc3NhZ2VzW2Vycm9yVHlwZV0sIGZtdERhdGEpXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWxlVmFsaWRhdGVFcnJvciB7XHJcbiAgLyoqXHJcbiAgICog6aqM6K+B6ZSZ6K+v57G75Z6LXHJcbiAgICovXHJcbiAgZXJyb3JUeXBlOiBFcnJvclR5cGU7XHJcbiAgLyoqXHJcbiAgICog6ZSZ6K+v5L+h5oGvXHJcbiAgICovXHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOmUmeivr+eahOaWh+S7tlxyXG4gICAqL1xyXG4gIGZpbGU6IE56VXBsb2FkRmlsZTtcclxufVxyXG4iLCI8bnotdXBsb2FkXHJcbiAgW256VHlwZV09XCJuelR5cGVcIlxyXG4gIFtuekFjY2VwdF09XCJuekFjY2VwdFwiXHJcbiAgW256QWN0aW9uXT1cIm56QWN0aW9uXCJcclxuICBbbnpEaXJlY3RvcnldPVwibnpEaXJlY3RvcnlcIlxyXG4gIFtuek9wZW5GaWxlRGlhbG9nT25DbGlja109XCJuek9wZW5GaWxlRGlhbG9nT25DbGlja1wiXHJcbiAgW256QmVmb3JlVXBsb2FkXT1cIl9uekJlZm9yZVVwbG9hZFwiXHJcbiAgW256Q3VzdG9tUmVxdWVzdF09XCJuekN1c3RvbVJlcXVlc3RcIlxyXG4gIFtuekRhdGFdPVwibnpEYXRhXCJcclxuICBbbnpGaWx0ZXJdPVwibnpGaWx0ZXJcIlxyXG4gIFsobnpGaWxlTGlzdCldPVwibnpGaWxlTGlzdFwiXHJcbiAgW256RGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXHJcbiAgW256SGVhZGVyc109XCJuekhlYWRlcnNcIlxyXG4gIFtuekxpc3RUeXBlXT1cIm56TGlzdFR5cGVcIlxyXG4gIFtuek11bHRpcGxlXT1cIm56TXVsdGlwbGVcIlxyXG4gIFtuek5hbWVdPVwibnpOYW1lXCJcclxuICBbbnpTaG93VXBsb2FkTGlzdF09XCJuelNob3dVcGxvYWRMaXN0XCJcclxuICBbbnpTaG93QnV0dG9uXT1cIm56U2hvd0J1dHRvblwiXHJcbiAgW256V2l0aENyZWRlbnRpYWxzXT1cIm56V2l0aENyZWRlbnRpYWxzXCJcclxuICBbbnpSZW1vdmVdPVwibnpSZW1vdmVcIlxyXG4gIFtuelByZXZpZXddPVwibnpQcmV2aWV3XCJcclxuICBbbnpQcmV2aWV3RmlsZV09XCJuelByZXZpZXdGaWxlXCJcclxuICBbbnpQcmV2aWV3SXNJbWFnZV09XCJuelByZXZpZXdJc0ltYWdlXCJcclxuICBbbnpUcmFuc2Zvcm1GaWxlXT1cIm56VHJhbnNmb3JtRmlsZVwiXHJcbiAgW256RG93bmxvYWRdPVwibnpEb3dubG9hZFwiXHJcbiAgW256SWNvblJlbmRlcl09XCJuekljb25SZW5kZXJcIlxyXG4gIFtuekZpbGVMaXN0UmVuZGVyXT1cIm56RmlsZUxpc3RSZW5kZXJcIlxyXG4gIChuekNoYW5nZSk9XCJvbk56Q2hhbmdlKCRldmVudClcIlxyXG4gIChuekZpbGVMaXN0Q2hhbmdlKT1cIm56RmlsZUxpc3RDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcclxuPlxyXG4gIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuenhVcGxvYWRCdXR0b247IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB0aGlzLCBuekZpbGVMaXN0OiBuekZpbGVMaXN0IH1cIj5cclxuICAgIDxidXR0b25cclxuICAgICAgbnotYnV0dG9uXHJcbiAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkXCJcclxuICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICpuZ0lmPVwibnpUeXBlID09PSAnc2VsZWN0JyAmJiBuenhTaG93VXBsb2FkQnV0dG9uSWNvbiAhPT0gZmFsc2VcIlxyXG4gICAgPlxyXG4gICAgICA8aSAqbmdJZj1cIm56eFVwbG9hZEJ1dHRvbkljb25cIiBuei1pY29uIFtuelR5cGVdPVwibnp4VXBsb2FkQnV0dG9uSWNvblwiPjwvaT5cclxuICAgICAge3sgbnp4VXBsb2FkQnV0dG9uIHx8ICfkuIrkvKAnIH19XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56eFNob3dVcGxvYWRCdXR0b25JY29uICE9PSBmYWxzZSAmJiBuelR5cGUgPT09ICdkcmFnJ1wiPlxyXG4gICAgPHAgY2xhc3M9XCJhbnQtdXBsb2FkLWRyYWctaWNvblwiPlxyXG4gICAgICA8aSAqbmdJZj1cIm56eFVwbG9hZEJ1dHRvbkljb25cIiBuei1pY29uIFtuelR5cGVdPVwibnp4VXBsb2FkQnV0dG9uSWNvblwiPjwvaT5cclxuICAgIDwvcD5cclxuICAgIDxwIGNsYXNzPVwiYW50LXVwbG9hZC10ZXh0XCI+e3tuenhVcGxvYWRUZXh0fX08L3A+XHJcbiAgICA8cCBjbGFzcz1cImFudC11cGxvYWQtaGludFwiPnt7IG56eEhpbnQgfX08L3A+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbnotdXBsb2FkPlxyXG4iXX0=