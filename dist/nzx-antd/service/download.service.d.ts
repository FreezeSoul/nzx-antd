import { HttpResponse } from '@angular/common/http';
import { FetcherService, FetchOptions } from './fetcher.service';
import { HttpErrorBean } from '@xmagic/nzx-antd';
import * as i0 from "@angular/core";
export declare class NzxDownloadService {
    protected fetcher: FetcherService;
    constructor(fetcher: FetcherService);
    /**
     * 下载文件
     * @param options 下载文件配置信息
     */
    download(options: DownloadOption): void;
    /**
     * 文件另存为
     * @param body 二进制内容
     * @param filename 文件名
     */
    saveAs(body: Blob, filename: string): void;
    /**
     * 获取文件名称
     * @param resp
     * @param url
     * @protected
     */
    getFilename(resp: HttpResponse<Blob>, url: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxDownloadService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzxDownloadService>;
}
/**
 * 下载文件配置信息
 */
export type DownloadOption = Omit<FetchOptions, 'observe'> & {
    /**
     * 请求完成后的回调
     * @param resp
     * @param filename
     */
    afterDownload?: (resp: HttpResponse<Blob>, filename: string) => boolean | void;
    /**
     * 下载并保存完成的回调
     * @param resp
     * @param filename
     */
    downloadDone?: (resp: HttpResponse<Blob>, filename: string) => void;
    /**
     * 下载发生错误回调
     * @param error
     */
    downloadError?: (error: HttpErrorBean) => void;
    /**
     * 下载结束回调, 不管成功还是失败
     */
    downloadComplete?: () => void;
    /**
     * 获取文件名
     * @param resp 响应对象
     * @param url 请求的url
     */
    getFileName?: (resp: HttpResponse<Blob>, url: string) => string;
};
