import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzxBetweenDatetimeComponent } from './between-datetime.component';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzxBetweenModule } from '@freezesoul/nzx-antd/between';
import * as i0 from "@angular/core";
export class NzxBetweenDatetimeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, declarations: [NzxBetweenDatetimeComponent], imports: [CommonModule, FormsModule, NzxBetweenModule, NzDatePickerModule], exports: [NzxBetweenDatetimeComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, imports: [CommonModule, FormsModule, NzxBetweenModule, NzDatePickerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxBetweenDatetimeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxBetweenDatetimeComponent],
                    imports: [CommonModule, FormsModule, NzxBetweenModule, NzDatePickerModule],
                    exports: [NzxBetweenDatetimeComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0d2Vlbi1kYXRldGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvYmV0d2Vlbi1kYXRldGltZS9iZXR3ZWVuLWRhdGV0aW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBT2hFLE1BQU0sT0FBTyx3QkFBd0I7d0dBQXhCLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLGlCQUpwQiwyQkFBMkIsYUFDaEMsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsYUFDL0QsMkJBQTJCO3lHQUUxQix3QkFBd0IsWUFIekIsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0I7OzRGQUc5RCx3QkFBd0I7a0JBTHBDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUM7b0JBQzFFLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE56eEJldHdlZW5EYXRldGltZUNvbXBvbmVudCB9IGZyb20gJy4vYmV0d2Vlbi1kYXRldGltZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTnpEYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9kYXRlLXBpY2tlcic7XHJcbmltcG9ydCB7IE56eEJldHdlZW5Nb2R1bGUgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC9iZXR3ZWVuJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTnp4QmV0d2VlbkRhdGV0aW1lQ29tcG9uZW50XSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTnp4QmV0d2Vlbk1vZHVsZSwgTnpEYXRlUGlja2VyTW9kdWxlXSxcclxuICBleHBvcnRzOiBbTnp4QmV0d2VlbkRhdGV0aW1lQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4QmV0d2VlbkRhdGV0aW1lTW9kdWxlIHt9XHJcbiJdfQ==