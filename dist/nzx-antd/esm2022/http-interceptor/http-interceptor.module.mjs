import { NgModule } from '@angular/core';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { httpInterceptors } from './http-interceptor.config';
import { AsyncHttpXhrBackend } from './xhr';
import * as i0 from "@angular/core";
export class NzxHttpInterceptorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, imports: [HttpClientModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, providers: [httpInterceptors, AsyncHttpXhrBackend, { provide: HttpBackend, useExisting: AsyncHttpXhrBackend }], imports: [HttpClientModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxHttpInterceptorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [HttpClientModule],
                    providers: [httpInterceptors, AsyncHttpXhrBackend, { provide: HttpBackend, useExisting: AsyncHttpXhrBackend }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnRlcmNlcHRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvaHR0cC1pbnRlcmNlcHRvci9odHRwLWludGVyY2VwdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxPQUFPLENBQUM7O0FBTTVDLE1BQU0sT0FBTyx3QkFBd0I7d0dBQXhCLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLFlBSHpCLGdCQUFnQjt5R0FHZix3QkFBd0IsYUFGeEIsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLENBQUMsWUFEcEcsZ0JBQWdCOzs0RkFHZix3QkFBd0I7a0JBSnBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztpQkFDL0ciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQmFja2VuZCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgaHR0cEludGVyY2VwdG9ycyB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvci5jb25maWcnO1xyXG5pbXBvcnQgeyBBc3luY0h0dHBYaHJCYWNrZW5kIH0gZnJvbSAnLi94aHInO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbaHR0cEludGVyY2VwdG9ycywgQXN5bmNIdHRwWGhyQmFja2VuZCwgeyBwcm92aWRlOiBIdHRwQmFja2VuZCwgdXNlRXhpc3Rpbmc6IEFzeW5jSHR0cFhockJhY2tlbmQgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eEh0dHBJbnRlcmNlcHRvck1vZHVsZSB7fVxyXG4iXX0=