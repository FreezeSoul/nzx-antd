import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { LOADING_ENABLED } from '@freezesoul/nzx-antd/service';
import * as i0 from "@angular/core";
import * as i1 from "./http-loading.service";
/**
 * http 请求发送时，调用 loading service 显示加载中图标或者做一些其它处理。
 */
export class HttpLoadingInterceptor {
    loadingService;
    showStatusChange = new Subject();
    requestCount = 0;
    constructor(loadingService) {
        this.loadingService = loadingService;
        this.loadingService.init(this.showStatusChange.pipe(filter(() => this.requestCount === 0)));
    }
    intercept(req, next) {
        const show = req.context.get(LOADING_ENABLED);
        if (show) {
            this.show();
        }
        return next.handle(req).pipe(finalize(() => show && this.hide()));
    }
    /**
     * 显示loading
     */
    show() {
        this.showStatusChange.next(true);
        this.requestCount++;
    }
    /**
     * 隐藏loading
     */
    hide() {
        this.requestCount--;
        this.showStatusChange.next(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingInterceptor, deps: [{ token: i1.HttpLoadingService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpLoadingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1sb2FkaW5nLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1sb2FkaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBRy9EOztHQUVHO0FBRUgsTUFBTSxPQUFPLHNCQUFzQjtJQUliO0lBSFosZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUMxQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLFlBQW9CLGNBQWtDO1FBQWxDLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsU0FBUyxDQUFDLEdBQTJCLEVBQUUsSUFBaUI7UUFDdEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzt3R0E5QlUsc0JBQXNCOzRHQUF0QixzQkFBc0I7OzRGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWxvYWRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExPQURJTkdfRU5BQkxFRCB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3NlcnZpY2UnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIGh0dHAg6K+35rGC5Y+R6YCB5pe277yM6LCD55SoIGxvYWRpbmcgc2VydmljZSDmmL7npLrliqDovb3kuK3lm77moIfmiJbogIXlgZrkuIDkupvlhbblroPlpITnkIbjgIJcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh0dHBMb2FkaW5nSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIHByaXZhdGUgc2hvd1N0YXR1c0NoYW5nZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgcHJpdmF0ZSByZXF1ZXN0Q291bnQgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBIdHRwTG9hZGluZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMubG9hZGluZ1NlcnZpY2UuaW5pdCh0aGlzLnNob3dTdGF0dXNDaGFuZ2UucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5yZXF1ZXN0Q291bnQgPT09IDApKSk7XHJcbiAgfVxyXG5cclxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxOelNhZmVBbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PE56U2FmZUFueT4+IHtcclxuICAgIGNvbnN0IHNob3cgPSByZXEuY29udGV4dC5nZXQoTE9BRElOR19FTkFCTEVEKTtcclxuICAgIGlmIChzaG93KSB7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShmaW5hbGl6ZSgoKSA9PiBzaG93ICYmIHRoaXMuaGlkZSgpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmL7npLpsb2FkaW5nXHJcbiAgICovXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMuc2hvd1N0YXR1c0NoYW5nZS5uZXh0KHRydWUpO1xyXG4gICAgdGhpcy5yZXF1ZXN0Q291bnQrKztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmakOiXj2xvYWRpbmdcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0Q291bnQtLTtcclxuICAgIHRoaXMuc2hvd1N0YXR1c0NoYW5nZS5uZXh0KGZhbHNlKTtcclxuICB9XHJcbn1cclxuIl19