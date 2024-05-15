import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class HttpLoadingService {
    httpLoadingStatus = new Subject();
    constructor() { }
    /**
     * HttpLoadingService needs a subject to tell the next loading status.
     * @param statusChangeObservable The subject who tells the loading status.
     */
    init(statusChangeObservable) {
        statusChangeObservable.subscribe(this.httpLoadingStatus);
    }
    /**
     * You have to subscribe the httpLoadingStatus$ in application to set custom loading behaviors through the method.
     *
     * @example
     * `app.component.ts`
     * ```ts
     * constructor(private loading: HttpLoadingService){}
     * ngOnInit() {
     *   this.loading.subscribe(status => {
     *     if(status){
     *       this.modal.show('loading...');
     *     }else{
     *       this.modal.hide();
     *     }
     *   })
     * }
     * ```
     * @param next
     * @param error
     * @param complete
     */
    subscribe(next, error, complete) {
        return this.httpLoadingStatus.subscribe({ next, error, complete });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpLoadingService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1sb2FkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLWxvYWRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDOztBQUl6RCxNQUFNLE9BQU8sa0JBQWtCO0lBQ3JCLGlCQUFpQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFFbkQsZ0JBQWUsQ0FBQztJQUVoQjs7O09BR0c7SUFDSCxJQUFJLENBQUMsc0JBQTJDO1FBQzlDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsU0FBUyxDQUFDLElBQStCLEVBQUUsS0FBa0MsRUFBRSxRQUFxQjtRQUNsRyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQzt3R0FwQ1Usa0JBQWtCOzRHQUFsQixrQkFBa0IsY0FETCxNQUFNOzs0RkFDbkIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgSHR0cExvYWRpbmdTZXJ2aWNlIHtcclxuICBwcml2YXRlIGh0dHBMb2FkaW5nU3RhdHVzID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBIdHRwTG9hZGluZ1NlcnZpY2UgbmVlZHMgYSBzdWJqZWN0IHRvIHRlbGwgdGhlIG5leHQgbG9hZGluZyBzdGF0dXMuXHJcbiAgICogQHBhcmFtIHN0YXR1c0NoYW5nZU9ic2VydmFibGUgVGhlIHN1YmplY3Qgd2hvIHRlbGxzIHRoZSBsb2FkaW5nIHN0YXR1cy5cclxuICAgKi9cclxuICBpbml0KHN0YXR1c0NoYW5nZU9ic2VydmFibGU6IE9ic2VydmFibGU8Ym9vbGVhbj4pIHtcclxuICAgIHN0YXR1c0NoYW5nZU9ic2VydmFibGUuc3Vic2NyaWJlKHRoaXMuaHR0cExvYWRpbmdTdGF0dXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWW91IGhhdmUgdG8gc3Vic2NyaWJlIHRoZSBodHRwTG9hZGluZ1N0YXR1cyQgaW4gYXBwbGljYXRpb24gdG8gc2V0IGN1c3RvbSBsb2FkaW5nIGJlaGF2aW9ycyB0aHJvdWdoIHRoZSBtZXRob2QuXHJcbiAgICpcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGBhcHAuY29tcG9uZW50LnRzYFxyXG4gICAqIGBgYHRzXHJcbiAgICogY29uc3RydWN0b3IocHJpdmF0ZSBsb2FkaW5nOiBIdHRwTG9hZGluZ1NlcnZpY2Upe31cclxuICAgKiBuZ09uSW5pdCgpIHtcclxuICAgKiAgIHRoaXMubG9hZGluZy5zdWJzY3JpYmUoc3RhdHVzID0+IHtcclxuICAgKiAgICAgaWYoc3RhdHVzKXtcclxuICAgKiAgICAgICB0aGlzLm1vZGFsLnNob3coJ2xvYWRpbmcuLi4nKTtcclxuICAgKiAgICAgfWVsc2V7XHJcbiAgICogICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XHJcbiAgICogICAgIH1cclxuICAgKiAgIH0pXHJcbiAgICogfVxyXG4gICAqIGBgYFxyXG4gICAqIEBwYXJhbSBuZXh0XHJcbiAgICogQHBhcmFtIGVycm9yXHJcbiAgICogQHBhcmFtIGNvbXBsZXRlXHJcbiAgICovXHJcbiAgc3Vic2NyaWJlKG5leHQ/OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQsIGVycm9yPzogKGVycm9yOiBOelNhZmVBbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwTG9hZGluZ1N0YXR1cy5zdWJzY3JpYmUoeyBuZXh0LCBlcnJvciwgY29tcGxldGUgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==