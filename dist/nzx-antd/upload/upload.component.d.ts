import { EventEmitter, OnChanges, OnInit, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { NzIconRenderTemplate, NzUploadChangeParam, NzUploadFile, NzUploadListType, NzUploadTransformFileType, NzUploadType, NzUploadXHRArgs, UploadFilter, NzShowUploadList } from 'ng-zorro-antd/upload';
import { Observable, Subscription } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';
import { BaseControl } from '@freezesoul/nzx-antd/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBytesPipe } from 'ng-zorro-antd/pipes';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare enum ErrorType {
    /**
     * 单文件大小限制,单位KB
     */
    FILE_SIZE = "FILE_SIZE",
    /**
     * 总文件大小限制
     */
    FILE_TOTAL_SIZE = "FILE_TOTAL_SIZE",
    FILE_TYPE = "FILE_TYPE",
    FILE_LIMIT = "FILE_LIMIT",
    FILE_NAME_LENGTH = "FILE_NAME_LENGTH",
    FILE_NAME_DUPLICATE = "FILE_NAME_DUPLICATE"
}
export declare class NzxUploadComponent extends BaseControl<NzUploadFile[]> implements ControlValueAccessor, OnInit, OnChanges {
    protected messageService: NzMessageService;
    protected bytesPipe: NzBytesPipe;
    nzFileList: NzUploadFile[];
    /**
     * 自定义按钮或显示内容
     */
    nzxUploadButton?: string | TemplateRef<NzSafeAny>;
    /**
     * 上传的提示信息
     */
    nzxHint?: string;
    /**
     * 拖拽上传文件显示文本
     */
    nzxUploadText: string;
    /**
     * 是否显示上传按钮
     */
    nzxShowUploadButtonIcon?: boolean;
    /**
     * 上传按钮的图标
     */
    nzxUploadButtonIcon: string;
    /**
     * 错误信息映射
     */
    nzxValidateMessage?: {
        [validateKey: string]: string;
    };
    nzType: NzUploadType;
    /**
     * 上传的文件个数限制
     */
    nzLimit: number;
    /**
     * 文件名重复验证
     */
    nzxFileNameDuplicate?: boolean;
    /**
     * 文件名长度
     */
    nzxFileNameLength?: number;
    /**
     * 文件大小,单位kb
     */
    nzSize: number;
    /**
     * 总文件大小,单位kb
     */
    nzTotalSize?: number;
    nzFileType?: string | string[];
    nzAccept?: string | string[];
    nzAction?: string | ((file: NzUploadFile) => string | Observable<string>);
    nzDirectory: boolean;
    nzOpenFileDialogOnClick: boolean;
    /**
     * 是否显示验证错误提示信息
     */
    nzxShowValidateMessage?: boolean;
    nzBeforeUpload?: (file: NzUploadFile, fileList: NzUploadFile[], error: FileValidateError | null) => boolean | Observable<boolean>;
    _nzBeforeUpload?: (file: NzUploadFile, fileList: NzUploadFile[]) => boolean | Observable<boolean>;
    nzCustomRequest?: (item: NzUploadXHRArgs) => Subscription;
    nzData?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
    nzFilter: UploadFilter[];
    nzDisabled?: boolean;
    nzHeaders?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
    nzListType: NzUploadListType;
    nzMultiple?: boolean;
    nzName: string;
    nzShowUploadList: boolean | NzShowUploadList;
    nzShowButton: boolean;
    nzWithCredentials?: boolean;
    nzRemove?: (file: NzUploadFile) => boolean | Observable<boolean>;
    nzPreview?: (file: NzUploadFile) => void;
    nzPreviewFile?: (file: NzUploadFile) => Observable<string>;
    nzPreviewIsImage?: (file: NzUploadFile) => boolean;
    nzTransformFile?: (file: NzUploadFile) => NzUploadTransformFileType;
    nzDownload?: (file: NzUploadFile) => void;
    nzIconRender: NzIconRenderTemplate | null;
    nzFileListRender?: TemplateRef<void>;
    readonly nzChange: EventEmitter<NzUploadChangeParam>;
    readonly nzFileListChange: EventEmitter<NzUploadFile[]>;
    readonly defaultValidateMessage: {
        [K: string]: string;
    };
    get isTemplateUploadButton(): boolean;
    constructor(messageService: NzMessageService, bytesPipe: NzBytesPipe);
    ngOnInit(): void;
    protected setDefaultFileFilter(): void;
    setNzBeforeUpload(): void;
    onNzChange(evt: NzUploadChangeParam): void;
    writeValue(value: NzUploadFile[]): void;
    ngOnChanges(changes: {
        [K in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * 重新包装zBeforeUpload
     */
    protected getNzBeforeUpload(): ((file: NzUploadFile, fileList: NzUploadFile[]) => boolean | Observable<boolean>) | undefined;
    /**
     * 文件验证
     * @param file 当前文件
     * @param fileList 文件列表
     * @protected
     */
    protected beforeUploadValidator(file: NzUploadFile, fileList: NzUploadFile[]): FileValidateError | null;
    /**
     * 显示文件验证错误
     * @param file 当前文件
     * @param fileList 文件列表
     * @param showValidateMessage 是否显示
     * @private
     */
    private showFileErrorMessage;
    private getError;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxUploadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxUploadComponent, "nzx-upload", never, { "nzFileList": { "alias": "nzFileList"; "required": false; }; "nzxUploadButton": { "alias": "nzxUploadButton"; "required": false; }; "nzxHint": { "alias": "nzxHint"; "required": false; }; "nzxUploadText": { "alias": "nzxUploadText"; "required": false; }; "nzxShowUploadButtonIcon": { "alias": "nzxShowUploadButtonIcon"; "required": false; }; "nzxUploadButtonIcon": { "alias": "nzxUploadButtonIcon"; "required": false; }; "nzxValidateMessage": { "alias": "nzxValidateMessage"; "required": false; }; "nzType": { "alias": "nzType"; "required": false; }; "nzLimit": { "alias": "nzLimit"; "required": false; }; "nzxFileNameDuplicate": { "alias": "nzxFileNameDuplicate"; "required": false; }; "nzxFileNameLength": { "alias": "nzxFileNameLength"; "required": false; }; "nzSize": { "alias": "nzSize"; "required": false; }; "nzTotalSize": { "alias": "nzTotalSize"; "required": false; }; "nzFileType": { "alias": "nzFileType"; "required": false; }; "nzAccept": { "alias": "nzAccept"; "required": false; }; "nzAction": { "alias": "nzAction"; "required": false; }; "nzDirectory": { "alias": "nzDirectory"; "required": false; }; "nzOpenFileDialogOnClick": { "alias": "nzOpenFileDialogOnClick"; "required": false; }; "nzxShowValidateMessage": { "alias": "nzxShowValidateMessage"; "required": false; }; "nzBeforeUpload": { "alias": "nzBeforeUpload"; "required": false; }; "nzCustomRequest": { "alias": "nzCustomRequest"; "required": false; }; "nzData": { "alias": "nzData"; "required": false; }; "nzFilter": { "alias": "nzFilter"; "required": false; }; "nzDisabled": { "alias": "nzDisabled"; "required": false; }; "nzHeaders": { "alias": "nzHeaders"; "required": false; }; "nzListType": { "alias": "nzListType"; "required": false; }; "nzMultiple": { "alias": "nzMultiple"; "required": false; }; "nzName": { "alias": "nzName"; "required": false; }; "nzShowUploadList": { "alias": "nzShowUploadList"; "required": false; }; "nzShowButton": { "alias": "nzShowButton"; "required": false; }; "nzWithCredentials": { "alias": "nzWithCredentials"; "required": false; }; "nzRemove": { "alias": "nzRemove"; "required": false; }; "nzPreview": { "alias": "nzPreview"; "required": false; }; "nzPreviewFile": { "alias": "nzPreviewFile"; "required": false; }; "nzPreviewIsImage": { "alias": "nzPreviewIsImage"; "required": false; }; "nzTransformFile": { "alias": "nzTransformFile"; "required": false; }; "nzDownload": { "alias": "nzDownload"; "required": false; }; "nzIconRender": { "alias": "nzIconRender"; "required": false; }; "nzFileListRender": { "alias": "nzFileListRender"; "required": false; }; }, { "nzChange": "nzChange"; "nzFileListChange": "nzFileListChange"; }, never, never, false, never>;
}
export interface FileValidateError {
    /**
     * 验证错误类型
     */
    errorType: ErrorType;
    /**
     * 错误信息
     */
    message: string;
    /**
     * 错误的文件
     */
    file: NzUploadFile;
}
