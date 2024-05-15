import { Observable, Subscription } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class HttpLoadingService {
    private httpLoadingStatus;
    constructor();
    /**
     * HttpLoadingService needs a subject to tell the next loading status.
     * @param statusChangeObservable The subject who tells the loading status.
     */
    init(statusChangeObservable: Observable<boolean>): void;
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
    subscribe(next?: (value: boolean) => void, error?: (error: NzSafeAny) => void, complete?: () => void): Subscription;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpLoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpLoadingService>;
}
