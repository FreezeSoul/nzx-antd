import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd/service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bi1maWxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9kaXJlY3RpdmUvZG93bi1maWxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU8vRCxNQUFNLE9BQU8saUJBQWlCO0lBMENSO0lBekNwQjs7T0FFRztJQUNpQixHQUFHLENBQVU7SUFDakM7O09BRUc7SUFDTSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCOztPQUVHO0lBQ00sTUFBTSxHQUEyQixLQUFLLENBQUM7SUFDaEQ7O09BRUc7SUFDTSxJQUFJLENBQXdCO0lBQ3JDOztPQUVHO0lBQ00sVUFBVSxDQUE4QjtJQUVqRDs7T0FFRztJQUNNLGFBQWEsQ0FBbUM7SUFFekQ7O09BRUc7SUFDTSxZQUFZLENBQWtDO0lBQ3ZEOzs7T0FHRztJQUNNLGFBQWEsQ0FBbUM7SUFFekQ7O09BRUc7SUFDTSxXQUFXLENBQWlDO0lBRXJELFlBQW9CLGVBQW1DO1FBQW5DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtJQUFHLENBQUM7SUFHM0QsaUJBQWlCLENBQUMsS0FBaUI7UUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7WUFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO3dHQTdEVSxpQkFBaUI7NEZBQWpCLGlCQUFpQjs7NEZBQWpCLGlCQUFpQjtrQkFKN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCO3lHQUtxQixHQUFHO3NCQUF0QixLQUFLO3VCQUFDLFdBQVc7Z0JBSVQsUUFBUTtzQkFBaEIsS0FBSztnQkFJRyxNQUFNO3NCQUFkLEtBQUs7Z0JBSUcsSUFBSTtzQkFBWixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFLRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFLTixpQkFBaUI7c0JBRGhCLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvd25sb2FkT3B0aW9uLCBOenhEb3dubG9hZFNlcnZpY2UsIEZldGNoT3B0aW9ucyB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tkb3duLWZpbGVdJyxcclxuICBleHBvcnRBczogJ2Rvd25GaWxlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRG93bkZpbGVEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIOS4i+i9veaWh+S7tueahHVybFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZG93bi1maWxlJykgdXJsITogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuemgeeUqOeCueWHu+S4i+i9vVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5pa55byPXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWV0aG9kOiBGZXRjaE9wdGlvbnNbJ21ldGhvZCddID0gJ2dldCc7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5Y+C5pWwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0YT86IEZldGNoT3B0aW9uc1snZGF0YSddO1xyXG4gIC8qKlxyXG4gICAqIOWPkemAgeS5i+WJjeeahOWbnuiwg+WHveaVsFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJlZm9yZVNlbmQ/OiBGZXRjaE9wdGlvbnNbJ2JlZm9yZVNlbmQnXTtcclxuXHJcbiAgLyoqXHJcbiAgICog6K+35rGC5a6M5oiQ5ZCO55qE5Zue6LCDXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWZ0ZXJEb3dubG9hZD86IERvd25sb2FkT3B0aW9uWydhZnRlckRvd25sb2FkJ107XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4i+i9veW5tuS/neWtmOWujOaIkOeahOWbnuiwg1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRvd25sb2FkRG9uZT86IERvd25sb2FkT3B0aW9uWydkb3dubG9hZERvbmUnXTtcclxuICAvKipcclxuICAgKiDkuIvovb3lj5HnlJ/plJnor6/lm57osINcclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKi9cclxuICBASW5wdXQoKSBkb3dubG9hZEVycm9yPzogRG93bmxvYWRPcHRpb25bJ2Rvd25sb2FkRXJyb3InXTtcclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5LiL6L295paH5Lu25ZCN5Ye95pWwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2V0RmlsZU5hbWU/OiBEb3dubG9hZE9wdGlvblsnZ2V0RmlsZU5hbWUnXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb3dubG9hZFNlcnZpY2U6IE56eERvd25sb2FkU2VydmljZSkge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gIGNsaWNrRXZlbnRIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2UuZG93bmxvYWQoe1xyXG4gICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgIGJlZm9yZVNlbmQ6IHRoaXMuYmVmb3JlU2VuZCxcclxuICAgICAgYWZ0ZXJEb3dubG9hZDogdGhpcy5hZnRlckRvd25sb2FkLFxyXG4gICAgICBkb3dubG9hZERvbmU6IHRoaXMuZG93bmxvYWREb25lLFxyXG4gICAgICBnZXRGaWxlTmFtZTogdGhpcy5nZXRGaWxlTmFtZVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==