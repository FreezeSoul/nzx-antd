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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zZXJ2aWNlL2Rvd25sb2FkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDUDtJQUF0QixZQUFzQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFakQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLE9BQXVCO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFxQixFQUFFLEdBQUcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFHLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDNUUsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtvQkFDeEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3RDO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFD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eyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRmV0Y2hlclNlcnZpY2UsIEZldGNoT3B0aW9ucyB9IGZyb20gJy4vZmV0Y2hlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgSHR0cEVycm9yQmVhbiB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTnp4RG93bmxvYWRTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZmV0Y2hlcjogRmV0Y2hlclNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4i+i9veaWh+S7tlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIOS4i+i9veaWh+S7tumFjee9ruS/oeaBr1xyXG4gICAqL1xyXG4gIGRvd25sb2FkKG9wdGlvbnM6IERvd25sb2FkT3B0aW9uKSB7XHJcbiAgICB0aGlzLmZldGNoZXIuZmV0Y2g8SHR0cFJlc3BvbnNlPEJsb2I+Pih7IC4uLm9wdGlvbnMsIHJlc3BvbnNlVHlwZTogJ2Jsb2InLCBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6IHJlc3AgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZuID0gb3B0aW9ucy5nZXRGaWxlTmFtZSB8fCB0aGlzLmdldEZpbGVuYW1lLmJpbmQodGhpcyk7XHJcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBmbihyZXNwLCBvcHRpb25zLnVybCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYWZ0ZXJEb3dubG9hZCAmJiBvcHRpb25zLmFmdGVyRG93bmxvYWQocmVzcCwgZmlsZW5hbWUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zYXZlQXMocmVzcC5ib2R5ISwgZmlsZW5hbWUpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmRvd25sb2FkRG9uZSkge1xyXG4gICAgICAgICAgb3B0aW9ucy5kb3dubG9hZERvbmUocmVzcCwgZmlsZW5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGVycm9yID0+IG9wdGlvbnMuZG93bmxvYWRFcnJvciAmJiBvcHRpb25zLmRvd25sb2FkRXJyb3IoZXJyb3IpLFxyXG4gICAgICBjb21wbGV0ZTogKCkgPT4gb3B0aW9ucy5kb3dubG9hZENvbXBsZXRlICYmIG9wdGlvbnMuZG93bmxvYWRDb21wbGV0ZSgpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaWh+S7tuWPpuWtmOS4ulxyXG4gICAqIEBwYXJhbSBib2R5IOS6jOi/m+WItuWGheWuuVxyXG4gICAqIEBwYXJhbSBmaWxlbmFtZSDmlofku7blkI1cclxuICAgKi9cclxuICBzYXZlQXMoYm9keTogQmxvYiwgZmlsZW5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKHR5cGVvZiAod2luZG93Lm5hdmlnYXRvciBhcyBOelNhZmVBbnkpLm1zU2F2ZUJsb2IgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICh3aW5kb3cubmF2aWdhdG9yIGFzIE56U2FmZUFueSkubXNTYXZlQmxvYihib2R5LCBmaWxlbmFtZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBibG9iVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYm9keSBhcyBCbG9iKTtcclxuICAgIGNvbnN0IHRlbXBMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgdGVtcExpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRlbXBMaW5rLmhyZWYgPSBibG9iVVJMO1xyXG4gICAgdGVtcExpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVuYW1lKTtcclxuICAgIGlmICh0eXBlb2YgdGVtcExpbmsuZG93bmxvYWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRlbXBMaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZW1wTGluayk7XHJcbiAgICB0ZW1wTGluay5jbGljaygpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZW1wTGluayk7XHJcbiAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChibG9iVVJMKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluaWh+S7tuWQjeensFxyXG4gICAqIEBwYXJhbSByZXNwXHJcbiAgICogQHBhcmFtIHVybFxyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBnZXRGaWxlbmFtZShyZXNwOiBIdHRwUmVzcG9uc2U8QmxvYj4sIHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwLmhlYWRlcnM7XHJcbiAgICBjb25zdCBkaXNwb3NpdGlvbiA9IGhlYWRlcnMuZ2V0KCdjb250ZW50LWRpc3Bvc2l0aW9uJyk7XHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IGhlYWRlcnMuZ2V0KCdmaWxlbmFtZScpO1xyXG4gICAgaWYgKGZpbGVuYW1lKSB7XHJcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZmlsZW5hbWUudHJpbSgpKTtcclxuICAgIH0gZWxzZSBpZiAoZGlzcG9zaXRpb24pIHtcclxuICAgICAgcmV0dXJuIGRpc3Bvc2l0aW9uXHJcbiAgICAgICAgLnNwbGl0KCc7JylcclxuICAgICAgICAuZmlsdGVyKHYgPT4gdi5pbmRleE9mKCdmaWxlbmFtZT0nKSA+PSAwKVswXVxyXG4gICAgICAgIC5zcGxpdCgnPScpWzFdXHJcbiAgICAgICAgLnJlcGxhY2UoLyheXCIpfChcIiQpL2csICcnKVxyXG4gICAgICAgIC50cmltKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzdGFydCA9IHVybC5sYXN0SW5kZXhPZignLycpICsgMTtcclxuICAgICAgY29uc3QgZW5kSW5kZXggPSB1cmwubGFzdEluZGV4T2YoJz8nKTtcclxuICAgICAgY29uc3QgZW5kID0gZW5kSW5kZXggPT09IC0xID8gdXJsLmxlbmd0aCA6IGVuZEluZGV4O1xyXG4gICAgICByZXR1cm4gdXJsLnN1YnN0cmluZyhzdGFydCwgZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDkuIvovb3mlofku7bphY3nva7kv6Hmga9cclxuICovXHJcbmV4cG9ydCB0eXBlIERvd25sb2FkT3B0aW9uID0gT21pdDxGZXRjaE9wdGlvbnMsICdvYnNlcnZlJz4gJiB7XHJcbiAgLyoqXHJcbiAgICog6K+35rGC5a6M5oiQ5ZCO55qE5Zue6LCDXHJcbiAgICogQHBhcmFtIHJlc3BcclxuICAgKiBAcGFyYW0gZmlsZW5hbWVcclxuICAgKi9cclxuICBhZnRlckRvd25sb2FkPzogKHJlc3A6IEh0dHBSZXNwb25zZTxCbG9iPiwgZmlsZW5hbWU6IHN0cmluZykgPT4gYm9vbGVhbiB8IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIOS4i+i9veW5tuS/neWtmOWujOaIkOeahOWbnuiwg1xyXG4gICAqIEBwYXJhbSByZXNwXHJcbiAgICogQHBhcmFtIGZpbGVuYW1lXHJcbiAgICovXHJcbiAgZG93bmxvYWREb25lPzogKHJlc3A6IEh0dHBSZXNwb25zZTxCbG9iPiwgZmlsZW5hbWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiDkuIvovb3lj5HnlJ/plJnor6/lm57osINcclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKi9cclxuICBkb3dubG9hZEVycm9yPzogKGVycm9yOiBIdHRwRXJyb3JCZWFuKSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIOS4i+i9vee7k+adn+Wbnuiwgywg5LiN566h5oiQ5Yqf6L+Y5piv5aSx6LSlXHJcbiAgICovXHJcbiAgZG93bmxvYWRDb21wbGV0ZT86ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluaWh+S7tuWQjVxyXG4gICAqIEBwYXJhbSByZXNwIOWTjeW6lOWvueixoVxyXG4gICAqIEBwYXJhbSB1cmwg6K+35rGC55qEdXJsXHJcbiAgICovXHJcbiAgZ2V0RmlsZU5hbWU/OiAocmVzcDogSHR0cFJlc3BvbnNlPEJsb2I+LCB1cmw6IHN0cmluZykgPT4gc3RyaW5nO1xyXG59O1xyXG4iXX0=