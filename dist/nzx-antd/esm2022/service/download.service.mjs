import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./fetcher.service";
export class NzxDownloadService {
    fetcher;
    constructor(fetcher) {
        this.fetcher = fetcher;
    }
    /**
     * 下载文件
     * @param options 下载文件配置信息
     */
    download(options) {
        this.fetcher.fetch({ ...options, responseType: 'blob', observe: 'response' }).subscribe({
            next: resp => {
                const fn = options.getFileName || this.getFilename.bind(this);
                const filename = fn(resp, options.url);
                if (options.afterDownload && options.afterDownload(resp, filename) === false) {
                    return;
                }
                this.saveAs(resp.body, filename);
                if (options.downloadDone) {
                    options.downloadDone(resp, filename);
                }
            },
            error: error => options.downloadError && options.downloadError(error),
            complete: () => options.downloadComplete && options.downloadComplete()
        });
    }
    /**
     * 文件另存为
     * @param body 二进制内容
     * @param filename 文件名
     */
    saveAs(body, filename) {
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(body, filename);
            return;
        }
        const blobURL = window.URL.createObjectURL(body);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
    /**
     * 获取文件名称
     * @param resp
     * @param url
     * @protected
     */
    getFilename(resp, url) {
        const headers = resp.headers;
        const disposition = headers.get('content-disposition');
        const filename = headers.get('filename');
        if (filename) {
            return decodeURIComponent(filename.trim());
        }
        else if (disposition) {
            return disposition
                .split(';')
                .filter(v => v.indexOf('filename=') >= 0)[0]
                .split('=')[1]
                .replace(/(^")|("$)/g, '')
                .trim();
        }
        else {
            const start = url.lastIndexOf('/') + 1;
            const endIndex = url.lastIndexOf('?');
            const end = endIndex === -1 ? url.length : endIndex;
            return url.substring(start, end);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDownloadService, deps: [{ token: i1.FetcherService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDownloadService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDownloadService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FetcherService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zZXJ2aWNlL2Rvd25sb2FkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDUDtJQUF0QixZQUFzQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFakQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLE9BQXVCO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFxQixFQUFFLEdBQUcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFHLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDNUUsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtvQkFDeEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3RDO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFD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eyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRmV0Y2hlclNlcnZpY2UsIEZldGNoT3B0aW9ucyB9IGZyb20gJy4vZmV0Y2hlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgSHR0cEVycm9yQmVhbiB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE56eERvd25sb2FkU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGZldGNoZXI6IEZldGNoZXJTZXJ2aWNlKSB7fVxyXG5cclxuICAvKipcclxuICAgKiDkuIvovb3mlofku7ZcclxuICAgKiBAcGFyYW0gb3B0aW9ucyDkuIvovb3mlofku7bphY3nva7kv6Hmga9cclxuICAgKi9cclxuICBkb3dubG9hZChvcHRpb25zOiBEb3dubG9hZE9wdGlvbikge1xyXG4gICAgdGhpcy5mZXRjaGVyLmZldGNoPEh0dHBSZXNwb25zZTxCbG9iPj4oeyAuLi5vcHRpb25zLCByZXNwb25zZVR5cGU6ICdibG9iJywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiByZXNwID0+IHtcclxuICAgICAgICBjb25zdCBmbiA9IG9wdGlvbnMuZ2V0RmlsZU5hbWUgfHwgdGhpcy5nZXRGaWxlbmFtZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZm4ocmVzcCwgb3B0aW9ucy51cmwpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmFmdGVyRG93bmxvYWQgJiYgb3B0aW9ucy5hZnRlckRvd25sb2FkKHJlc3AsIGZpbGVuYW1lKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZUFzKHJlc3AuYm9keSEsIGZpbGVuYW1lKTtcclxuICAgICAgICBpZiAob3B0aW9ucy5kb3dubG9hZERvbmUpIHtcclxuICAgICAgICAgIG9wdGlvbnMuZG93bmxvYWREb25lKHJlc3AsIGZpbGVuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiBlcnJvciA9PiBvcHRpb25zLmRvd25sb2FkRXJyb3IgJiYgb3B0aW9ucy5kb3dubG9hZEVycm9yKGVycm9yKSxcclxuICAgICAgY29tcGxldGU6ICgpID0+IG9wdGlvbnMuZG93bmxvYWRDb21wbGV0ZSAmJiBvcHRpb25zLmRvd25sb2FkQ29tcGxldGUoKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmlofku7blj6blrZjkuLpcclxuICAgKiBAcGFyYW0gYm9keSDkuozov5vliLblhoXlrrlcclxuICAgKiBAcGFyYW0gZmlsZW5hbWUg5paH5Lu25ZCNXHJcbiAgICovXHJcbiAgc2F2ZUFzKGJvZHk6IEJsb2IsIGZpbGVuYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgKHdpbmRvdy5uYXZpZ2F0b3IgYXMgTnpTYWZlQW55KS5tc1NhdmVCbG9iICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAod2luZG93Lm5hdmlnYXRvciBhcyBOelNhZmVBbnkpLm1zU2F2ZUJsb2IoYm9keSwgZmlsZW5hbWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvYlVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJvZHkgYXMgQmxvYik7XHJcbiAgICBjb25zdCB0ZW1wTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIHRlbXBMaW5rLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB0ZW1wTGluay5ocmVmID0gYmxvYlVSTDtcclxuICAgIHRlbXBMaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XHJcbiAgICBpZiAodHlwZW9mIHRlbXBMaW5rLmRvd25sb2FkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0ZW1wTGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVtcExpbmspO1xyXG4gICAgdGVtcExpbmsuY2xpY2soKTtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGVtcExpbmspO1xyXG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVSTCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmlofku7blkI3np7BcclxuICAgKiBAcGFyYW0gcmVzcFxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgZ2V0RmlsZW5hbWUocmVzcDogSHR0cFJlc3BvbnNlPEJsb2I+LCB1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gcmVzcC5oZWFkZXJzO1xyXG4gICAgY29uc3QgZGlzcG9zaXRpb24gPSBoZWFkZXJzLmdldCgnY29udGVudC1kaXNwb3NpdGlvbicpO1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBoZWFkZXJzLmdldCgnZmlsZW5hbWUnKTtcclxuICAgIGlmIChmaWxlbmFtZSkge1xyXG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGZpbGVuYW1lLnRyaW0oKSk7XHJcbiAgICB9IGVsc2UgaWYgKGRpc3Bvc2l0aW9uKSB7XHJcbiAgICAgIHJldHVybiBkaXNwb3NpdGlvblxyXG4gICAgICAgIC5zcGxpdCgnOycpXHJcbiAgICAgICAgLmZpbHRlcih2ID0+IHYuaW5kZXhPZignZmlsZW5hbWU9JykgPj0gMClbMF1cclxuICAgICAgICAuc3BsaXQoJz0nKVsxXVxyXG4gICAgICAgIC5yZXBsYWNlKC8oXlwiKXwoXCIkKS9nLCAnJylcclxuICAgICAgICAudHJpbSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSB1cmwubGFzdEluZGV4T2YoJy8nKSArIDE7XHJcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdXJsLmxhc3RJbmRleE9mKCc/Jyk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IGVuZEluZGV4ID09PSAtMSA/IHVybC5sZW5ndGggOiBlbmRJbmRleDtcclxuICAgICAgcmV0dXJuIHVybC5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog5LiL6L295paH5Lu26YWN572u5L+h5oGvXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBEb3dubG9hZE9wdGlvbiA9IE9taXQ8RmV0Y2hPcHRpb25zLCAnb2JzZXJ2ZSc+ICYge1xyXG4gIC8qKlxyXG4gICAqIOivt+axguWujOaIkOWQjueahOWbnuiwg1xyXG4gICAqIEBwYXJhbSByZXNwXHJcbiAgICogQHBhcmFtIGZpbGVuYW1lXHJcbiAgICovXHJcbiAgYWZ0ZXJEb3dubG9hZD86IChyZXNwOiBIdHRwUmVzcG9uc2U8QmxvYj4sIGZpbGVuYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4gfCB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiDkuIvovb3lubbkv53lrZjlrozmiJDnmoTlm57osINcclxuICAgKiBAcGFyYW0gcmVzcFxyXG4gICAqIEBwYXJhbSBmaWxlbmFtZVxyXG4gICAqL1xyXG4gIGRvd25sb2FkRG9uZT86IChyZXNwOiBIdHRwUmVzcG9uc2U8QmxvYj4sIGZpbGVuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICog5LiL6L295Y+R55Sf6ZSZ6K+v5Zue6LCDXHJcbiAgICogQHBhcmFtIGVycm9yXHJcbiAgICovXHJcbiAgZG93bmxvYWRFcnJvcj86IChlcnJvcjogSHR0cEVycm9yQmVhbikgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiDkuIvovb3nu5PmnZ/lm57osIMsIOS4jeeuoeaIkOWKn+i/mOaYr+Wksei0pVxyXG4gICAqL1xyXG4gIGRvd25sb2FkQ29tcGxldGU/OiAoKSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiDojrflj5bmlofku7blkI1cclxuICAgKiBAcGFyYW0gcmVzcCDlk43lupTlr7nosaFcclxuICAgKiBAcGFyYW0gdXJsIOivt+axgueahHVybFxyXG4gICAqL1xyXG4gIGdldEZpbGVOYW1lPzogKHJlc3A6IEh0dHBSZXNwb25zZTxCbG9iPiwgdXJsOiBzdHJpbmcpID0+IHN0cmluZztcclxufTtcclxuIl19