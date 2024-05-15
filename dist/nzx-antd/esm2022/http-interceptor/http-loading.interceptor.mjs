import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { LOADING_ENABLED } from '@xmagic/nzx-antd/service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1sb2FkaW5nLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1sb2FkaW5nLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRzNEOztHQUVHO0FBRUgsTUFBTSxPQUFPLHNCQUFzQjtJQUliO0lBSFosZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUMxQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLFlBQW9CLGNBQWtDO1FBQWxDLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsU0FBUyxDQUFDLEdBQTJCLEVBQUUsSUFBaUI7UUFDdEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzt3R0E5QlUsc0JBQXNCOzRHQUF0QixzQkFBc0I7OzRGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBmaW5hbGl6ZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSHR0cExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLWxvYWRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExPQURJTkdfRU5BQkxFRCB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvc2VydmljZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG4vKipcclxuICogaHR0cCDor7fmsYLlj5HpgIHml7bvvIzosIPnlKggbG9hZGluZyBzZXJ2aWNlIOaYvuekuuWKoOi9veS4reWbvuagh+aIluiAheWBmuS4gOS6m+WFtuWug+WkhOeQhuOAglxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cExvYWRpbmdJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgcHJpdmF0ZSBzaG93U3RhdHVzQ2hhbmdlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICBwcml2YXRlIHJlcXVlc3RDb3VudCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IEh0dHBMb2FkaW5nU2VydmljZSkge1xyXG4gICAgdGhpcy5sb2FkaW5nU2VydmljZS5pbml0KHRoaXMuc2hvd1N0YXR1c0NoYW5nZS5waXBlKGZpbHRlcigoKSA9PiB0aGlzLnJlcXVlc3RDb3VudCA9PT0gMCkpKTtcclxuICB9XHJcblxyXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PE56U2FmZUFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8TnpTYWZlQW55Pj4ge1xyXG4gICAgY29uc3Qgc2hvdyA9IHJlcS5jb250ZXh0LmdldChMT0FESU5HX0VOQUJMRUQpO1xyXG4gICAgaWYgKHNob3cpIHtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKS5waXBlKGZpbmFsaXplKCgpID0+IHNob3cgJiYgdGhpcy5oaWRlKCkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYvuekumxvYWRpbmdcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy5zaG93U3RhdHVzQ2hhbmdlLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLnJlcXVlc3RDb3VudCsrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6ZqQ6JePbG9hZGluZ1xyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RDb3VudC0tO1xyXG4gICAgdGhpcy5zaG93U3RhdHVzQ2hhbmdlLm5leHQoZmFsc2UpO1xyXG4gIH1cclxufVxyXG4iXX0=