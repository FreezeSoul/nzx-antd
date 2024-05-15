import { NgModule } from '@angular/core';
import { NzxModalService } from './nzx-modal.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzxModalDragDirective } from './modal-drag.directive';
import { NzxModalDragService } from './modal-drag.service';
import * as i0 from "@angular/core";
export class NzxModalModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, declarations: [NzxModalDragDirective], imports: [NzModalModule], exports: [NzxModalDragDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, providers: [NzxModalService, NzxModalDragService], imports: [NzModalModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxModalDragDirective],
                    imports: [NzModalModule],
                    exports: [NzxModalDragDirective],
                    providers: [NzxModalService, NzxModalDragService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBUTNELE1BQU0sT0FBTyxjQUFjO3dHQUFkLGNBQWM7eUdBQWQsY0FBYyxpQkFMVixxQkFBcUIsYUFDMUIsYUFBYSxhQUNiLHFCQUFxQjt5R0FHcEIsY0FBYyxhQUZkLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLFlBRnZDLGFBQWE7OzRGQUlaLGNBQWM7a0JBTjFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2hDLFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQztpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOenhNb2RhbFNlcnZpY2UgfSBmcm9tICcuL256eC1tb2RhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTnpNb2RhbE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xyXG5pbXBvcnQgeyBOenhNb2RhbERyYWdEaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLWRyYWcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTnp4TW9kYWxEcmFnU2VydmljZSB9IGZyb20gJy4vbW9kYWwtZHJhZy5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTnp4TW9kYWxEcmFnRGlyZWN0aXZlXSxcclxuICBpbXBvcnRzOiBbTnpNb2RhbE1vZHVsZV0sXHJcbiAgZXhwb3J0czogW056eE1vZGFsRHJhZ0RpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbTnp4TW9kYWxTZXJ2aWNlLCBOenhNb2RhbERyYWdTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4TW9kYWxNb2R1bGUge31cclxuIl19