import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetcherService } from './fetcher.service';
import { HttpClientModule } from '@angular/common/http';
import { NzxDownloadService } from './download.service';
import * as i0 from "@angular/core";
export class NzxServiceModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, imports: [CommonModule, HttpClientModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, providers: [FetcherService, NzxDownloadService], imports: [CommonModule, HttpClientModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxServiceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [CommonModule, HttpClientModule],
                    providers: [FetcherService, NzxDownloadService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvc2VydmljZS9zZXJ2aWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBT3hELE1BQU0sT0FBTyxnQkFBZ0I7d0dBQWhCLGdCQUFnQjt5R0FBaEIsZ0JBQWdCLFlBSGpCLFlBQVksRUFBRSxnQkFBZ0I7eUdBRzdCLGdCQUFnQixhQUZoQixDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxZQURyQyxZQUFZLEVBQUUsZ0JBQWdCOzs0RkFHN0IsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3pDLFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQztpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGZXRjaGVyU2VydmljZSB9IGZyb20gJy4vZmV0Y2hlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgTnp4RG93bmxvYWRTZXJ2aWNlIH0gZnJvbSAnLi9kb3dubG9hZC5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtGZXRjaGVyU2VydmljZSwgTnp4RG93bmxvYWRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4U2VydmljZU1vZHVsZSB7fVxyXG4iXX0=