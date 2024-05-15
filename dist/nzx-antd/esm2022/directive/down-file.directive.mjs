import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd/service";
export class DownFileDirective {
    downloadService;
    /**
     * 下载文件的url
     */
    url;
    /**
     * 是否禁用点击下载
     */
    disabled = false;
    /**
     * 请求方式
     */
    method = 'get';
    /**
     * 请求参数
     */
    data;
    /**
     * 发送之前的回调函数
     */
    beforeSend;
    /**
     * 请求完成后的回调
     */
    afterDownload;
    /**
     * 下载并保存完成的回调
     */
    downloadDone;
    /**
     * 下载发生错误回调
     * @param error
     */
    downloadError;
    /**
     * 获取下载文件名函数
     */
    getFileName;
    constructor(downloadService) {
        this.downloadService = downloadService;
    }
    clickEventHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.downloadService.download({
            url: this.url,
            method: this.method,
            data: this.data,
            beforeSend: this.beforeSend,
            afterDownload: this.afterDownload,
            downloadDone: this.downloadDone,
            getFileName: this.getFileName
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DownFileDirective, deps: [{ token: i1.NzxDownloadService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: DownFileDirective, selector: "[down-file]", inputs: { url: ["down-file", "url"], disabled: "disabled", method: "method", data: "data", beforeSend: "beforeSend", afterDownload: "afterDownload", downloadDone: "downloadDone", downloadError: "downloadError", getFileName: "getFileName" }, host: { listeners: { "click": "clickEventHandler($event)" } }, exportAs: ["downFile"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DownFileDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[down-file]',
                    exportAs: 'downFile'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzxDownloadService }]; }, propDecorators: { url: [{
                type: Input,
                args: ['down-file']
            }], disabled: [{
                type: Input
            }], method: [{
                type: Input
            }], data: [{
                type: Input
            }], beforeSend: [{
                type: Input
            }], afterDownload: [{
                type: Input
            }], downloadDone: [{
                type: Input
            }], downloadError: [{
                type: Input
            }], getFileName: [{
                type: Input
            }], clickEventHandler: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bi1maWxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9kaXJlY3RpdmUvZG93bi1maWxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU8vRCxNQUFNLE9BQU8saUJBQWlCO0lBMENSO0lBekNwQjs7T0FFRztJQUNpQixHQUFHLENBQVU7SUFDakM7O09BRUc7SUFDTSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCOztPQUVHO0lBQ00sTUFBTSxHQUEyQixLQUFLLENBQUM7SUFDaEQ7O09BRUc7SUFDTSxJQUFJLENBQXdCO0lBQ3JDOztPQUVHO0lBQ00sVUFBVSxDQUE4QjtJQUVqRDs7T0FFRztJQUNNLGFBQWEsQ0FBbUM7SUFFekQ7O09BRUc7SUFDTSxZQUFZLENBQWtDO0lBQ3ZEOzs7T0FHRztJQUNNLGFBQWEsQ0FBbUM7SUFFekQ7O09BRUc7SUFDTSxXQUFXLENBQWlDO0lBRXJELFlBQW9CLGVBQW1DO1FBQW5DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtJQUFHLENBQUM7SUFHM0QsaUJBQWlCLENBQUMsS0FBaUI7UUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7WUFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO3dHQTdEVSxpQkFBaUI7NEZBQWpCLGlCQUFpQjs7NEZBQWpCLGlCQUFpQjtrQkFKN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCO3lHQUtxQixHQUFHO3NCQUF0QixLQUFLO3VCQUFDLFdBQVc7Z0JBSVQsUUFBUTtzQkFBaEIsS0FBSztnQkFJRyxNQUFNO3NCQUFkLEtBQUs7Z0JBSUcsSUFBSTtzQkFBWixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFLRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFLTixpQkFBaUI7c0JBRGhCLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvd25sb2FkT3B0aW9uLCBOenhEb3dubG9hZFNlcnZpY2UsIEZldGNoT3B0aW9ucyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3NlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZG93bi1maWxlXScsXHJcbiAgZXhwb3J0QXM6ICdkb3duRmlsZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERvd25GaWxlRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiDkuIvovb3mlofku7bnmoR1cmxcclxuICAgKi9cclxuICBASW5wdXQoJ2Rvd24tZmlsZScpIHVybCE6IHN0cmluZztcclxuICAvKipcclxuICAgKiDmmK/lkKbnpoHnlKjngrnlh7vkuIvovb1cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIOivt+axguaWueW8j1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1ldGhvZDogRmV0Y2hPcHRpb25zWydtZXRob2QnXSA9ICdnZXQnO1xyXG4gIC8qKlxyXG4gICAqIOivt+axguWPguaVsFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGE/OiBGZXRjaE9wdGlvbnNbJ2RhdGEnXTtcclxuICAvKipcclxuICAgKiDlj5HpgIHkuYvliY3nmoTlm57osIPlh73mlbBcclxuICAgKi9cclxuICBASW5wdXQoKSBiZWZvcmVTZW5kPzogRmV0Y2hPcHRpb25zWydiZWZvcmVTZW5kJ107XHJcblxyXG4gIC8qKlxyXG4gICAqIOivt+axguWujOaIkOWQjueahOWbnuiwg1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFmdGVyRG93bmxvYWQ/OiBEb3dubG9hZE9wdGlvblsnYWZ0ZXJEb3dubG9hZCddO1xyXG5cclxuICAvKipcclxuICAgKiDkuIvovb3lubbkv53lrZjlrozmiJDnmoTlm57osINcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3dubG9hZERvbmU/OiBEb3dubG9hZE9wdGlvblsnZG93bmxvYWREb25lJ107XHJcbiAgLyoqXHJcbiAgICog5LiL6L295Y+R55Sf6ZSZ6K+v5Zue6LCDXHJcbiAgICogQHBhcmFtIGVycm9yXHJcbiAgICovXHJcbiAgQElucHV0KCkgZG93bmxvYWRFcnJvcj86IERvd25sb2FkT3B0aW9uWydkb3dubG9hZEVycm9yJ107XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluS4i+i9veaWh+S7tuWQjeWHveaVsFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdldEZpbGVOYW1lPzogRG93bmxvYWRPcHRpb25bJ2dldEZpbGVOYW1lJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZG93bmxvYWRTZXJ2aWNlOiBOenhEb3dubG9hZFNlcnZpY2UpIHt9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBjbGlja0V2ZW50SGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZG93bmxvYWRTZXJ2aWNlLmRvd25sb2FkKHtcclxuICAgICAgdXJsOiB0aGlzLnVybCxcclxuICAgICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBiZWZvcmVTZW5kOiB0aGlzLmJlZm9yZVNlbmQsXHJcbiAgICAgIGFmdGVyRG93bmxvYWQ6IHRoaXMuYWZ0ZXJEb3dubG9hZCxcclxuICAgICAgZG93bmxvYWREb25lOiB0aGlzLmRvd25sb2FkRG9uZSxcclxuICAgICAgZ2V0RmlsZU5hbWU6IHRoaXMuZ2V0RmlsZU5hbWVcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=