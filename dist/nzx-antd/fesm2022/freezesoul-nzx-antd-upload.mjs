import * as i0 from '@angular/core';
import { EventEmitter, TemplateRef, forwardRef, Component, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseControl, NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i2 from 'ng-zorro-antd/pipes';
import { NzBytesPipe } from 'ng-zorro-antd/pipes';
import * as i1 from 'ng-zorro-antd/message';
import { NzMessageModule } from 'ng-zorro-antd/message';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import * as i5 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i6 from 'ng-zorro-antd/core/transition-patch';
import * as i7 from 'ng-zorro-antd/core/wave';
import * as i8 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i9 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { HttpClientModule } from '@angular/common/http';

var ErrorType;
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
class NzxUploadComponent extends BaseControl {
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

const COMPONENT = [NzxUploadComponent];
class NzxUploadModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxUploadModule, declarations: [NzxUploadComponent], imports: [CommonModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            NzUploadModule,
            NzMessageModule,
            NzButtonModule,
            NzIconModule,
            NzOutletModule], exports: [NzxUploadComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxUploadModule, imports: [CommonModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            NzUploadModule,
            NzMessageModule,
            NzButtonModule,
            NzIconModule,
            NzOutletModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [COMPONENT],
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NzUploadModule,
                        NzMessageModule,
                        NzButtonModule,
                        NzIconModule,
                        NzOutletModule
                    ],
                    exports: [COMPONENT]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ErrorType, NzxUploadComponent, NzxUploadModule };
//# sourceMappingURL=freezesoul-nzx-antd-upload.mjs.map
