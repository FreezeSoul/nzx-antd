import { DownloadOption, NzxDownloadService, FetchOptions } from '@xmagic/nzx-antd/service';
import * as i0 from "@angular/core";
export declare class DownFileDirective {
    private downloadService;
    /**
     * 下载文件的url
     */
    url: string;
    /**
     * 是否禁用点击下载
     */
    disabled: boolean;
    /**
     * 请求方式
     */
    method: FetchOptions['method'];
    /**
     * 请求参数
     */
    data?: FetchOptions['data'];
    /**
     * 发送之前的回调函数
     */
    beforeSend?: FetchOptions['beforeSend'];
    /**
     * 请求完成后的回调
     */
    afterDownload?: DownloadOption['afterDownload'];
    /**
     * 下载并保存完成的回调
     */
    downloadDone?: DownloadOption['downloadDone'];
    /**
     * 下载发生错误回调
     * @param error
     */
    downloadError?: DownloadOption['downloadError'];
    /**
     * 获取下载文件名函数
     */
    getFileName?: DownloadOption['getFileName'];
    constructor(downloadService: NzxDownloadService);
    clickEventHandler(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DownFileDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DownFileDirective, "[down-file]", ["downFile"], { "url": { "alias": "down-file"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "method": { "alias": "method"; "required": false; }; "data": { "alias": "data"; "required": false; }; "beforeSend": { "alias": "beforeSend"; "required": false; }; "afterDownload": { "alias": "afterDownload"; "required": false; }; "downloadDone": { "alias": "downloadDone"; "required": false; }; "downloadError": { "alias": "downloadError"; "required": false; }; "getFileName": { "alias": "getFileName"; "required": false; }; }, {}, never, never, false, never>;
}
