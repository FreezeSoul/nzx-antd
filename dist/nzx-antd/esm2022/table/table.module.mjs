import { Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzxTableComponent } from './table.component';
import { NzxTableHeaderComponent } from './header/table-header/table-header.component';
import { NzxColumnSettingComponent } from './header/column-setting/column-setting.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzxPipeModule } from '@xmagic/nzx-antd/pipe';
import { NzxServiceModule } from '@xmagic/nzx-antd/service';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ColFormatPipe } from './transform/col-format.pipe';
import { NzxDirectiveModule } from '@xmagic/nzx-antd/directive';
import { ColSpanPipe } from './transform/col-span.pipe';
import { ColButtonVisiblePipe } from './transform/col-button-visible.pipe';
import { HasAuthPipe } from './transform/has-auth.pipe';
import { ColButtonsPipe } from './transform/col-buttons.pipe';
import { TABLE_WIDGET } from './table-widget.service';
import { TableWidgetModule } from './table-widget/table-widget.module';
import { TableWidgetDirective } from './table-widget.directive';
import * as i0 from "@angular/core";
import * as i1 from "./table-widget.service";
const COMPONENT = [NzxTableComponent, NzxTableHeaderComponent, NzxColumnSettingComponent];
export class NzxTableModule {
    service;
    constructor(service, widgets = []) {
        this.service = service;
        if (!widgets) {
            return;
        }
        widgets.forEach(c => service.register(c));
    }
    static forChild(config = []) {
        return {
            ngModule: NzxTableModule,
            providers: [{ provide: TABLE_WIDGET, useValue: config, multi: true }]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, deps: [{ token: i1.TableWidgetService }, { token: TABLE_WIDGET, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, declarations: [NzxTableComponent, NzxTableHeaderComponent, NzxColumnSettingComponent, ColFormatPipe,
            ColSpanPipe,
            ColButtonVisiblePipe,
            HasAuthPipe,
            TableWidgetDirective,
            ColButtonsPipe], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NzTableModule,
            NzResizableModule,
            NzIconModule,
            NzPopoverModule,
            NzCheckboxModule,
            DragDropModule,
            NzDividerModule,
            NzDropDownModule,
            NzToolTipModule,
            NzxPipeModule,
            NzxServiceModule,
            NzOutletModule,
            NzButtonModule,
            NzxDirectiveModule,
            TableWidgetModule], exports: [NzxTableComponent, NzxTableHeaderComponent, NzxColumnSettingComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NzTableModule,
            NzResizableModule,
            NzIconModule,
            NzPopoverModule,
            NzCheckboxModule,
            DragDropModule,
            NzDividerModule,
            NzDropDownModule,
            NzToolTipModule,
            NzxPipeModule,
            NzxServiceModule,
            NzOutletModule,
            NzButtonModule,
            NzxDirectiveModule,
            TableWidgetModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        COMPONENT,
                        ColFormatPipe,
                        ColSpanPipe,
                        ColButtonVisiblePipe,
                        HasAuthPipe,
                        TableWidgetDirective,
                        ColButtonsPipe
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NzTableModule,
                        NzResizableModule,
                        NzIconModule,
                        NzPopoverModule,
                        NzCheckboxModule,
                        DragDropModule,
                        NzDividerModule,
                        NzDropDownModule,
                        NzToolTipModule,
                        NzxPipeModule,
                        NzxServiceModule,
                        NzOutletModule,
                        NzButtonModule,
                        NzxDirectiveModule,
                        TableWidgetModule
                    ],
                    exports: [COMPONENT]
                }]
        }], ctorParameters: function () { return [{ type: i1.TableWidgetService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TABLE_WIDGET]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3RhYmxlL3RhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDN0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBc0IsWUFBWSxFQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFFdkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQUVoRSxNQUFNLFNBQVMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFpQzFGLE1BQU0sT0FBTyxjQUFjO0lBRWhCO0lBRFQsWUFDUyxPQUEyQixFQUNBLFVBQTJCLEVBQUU7UUFEeEQsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFHbEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBd0IsRUFBRTtRQUN4QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ3RFLENBQUM7SUFDSixDQUFDO3dHQWhCVSxjQUFjLG9EQUdILFlBQVk7eUdBSHZCLGNBQWMsaUJBakNSLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixFQUlwRixhQUFhO1lBQ2IsV0FBVztZQUNYLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsb0JBQW9CO1lBQ3BCLGNBQWMsYUFHZCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixhQUFhO1lBQ2IsaUJBQWlCO1lBQ2pCLFlBQVk7WUFDWixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxjQUFjO1lBQ2Qsa0JBQWtCO1lBQ2xCLGlCQUFpQixhQTdCRixpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUI7eUdBaUMzRSxjQUFjLFlBckJ2QixZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixhQUFhO1lBQ2IsaUJBQWlCO1lBQ2pCLFlBQVk7WUFDWixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxjQUFjO1lBQ2Qsa0JBQWtCO1lBQ2xCLGlCQUFpQjs7NEZBSVIsY0FBYztrQkFoQzFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixXQUFXO3dCQUNYLG9CQUFvQjt3QkFDcEIsV0FBVzt3QkFDWCxvQkFBb0I7d0JBQ3BCLGNBQWM7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQixpQkFBaUI7cUJBQ2xCO29CQUNELE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDckI7OzBCQUlJLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE56VGFibGVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RhYmxlJztcclxuaW1wb3J0IHsgTnp4VGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE56eFRhYmxlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvdGFibGUtaGVhZGVyL3RhYmxlLWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOenhDb2x1bW5TZXR0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvY29sdW1uLXNldHRpbmcvY29sdW1uLXNldHRpbmcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTnpSZXNpemFibGVNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Jlc2l6YWJsZSc7XHJcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XHJcbmltcG9ydCB7IE56UG9wb3Zlck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvcG9wb3Zlcic7XHJcbmltcG9ydCB7IE56Q2hlY2tib3hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NoZWNrYm94JztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IE56RGl2aWRlck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZGl2aWRlcic7XHJcbmltcG9ydCB7IE56RHJvcERvd25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Ryb3Bkb3duJztcclxuaW1wb3J0IHsgTnpUb29sVGlwTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcclxuaW1wb3J0IHsgTnp4UGlwZU1vZHVsZSB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvcGlwZSc7XHJcbmltcG9ydCB7IE56eFNlcnZpY2VNb2R1bGUgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3NlcnZpY2UnO1xyXG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xyXG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnV0dG9uJztcclxuaW1wb3J0IHsgQ29sRm9ybWF0UGlwZSB9IGZyb20gJy4vdHJhbnNmb3JtL2NvbC1mb3JtYXQucGlwZSc7XHJcbmltcG9ydCB7IE56eERpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29sU3BhblBpcGUgfSBmcm9tICcuL3RyYW5zZm9ybS9jb2wtc3Bhbi5waXBlJztcclxuaW1wb3J0IHsgQ29sQnV0dG9uVmlzaWJsZVBpcGUgfSBmcm9tICcuL3RyYW5zZm9ybS9jb2wtYnV0dG9uLXZpc2libGUucGlwZSc7XHJcbmltcG9ydCB7IEhhc0F1dGhQaXBlIH0gZnJvbSAnLi90cmFuc2Zvcm0vaGFzLWF1dGgucGlwZSc7XHJcbmltcG9ydCB7IENvbEJ1dHRvbnNQaXBlIH0gZnJvbSAnLi90cmFuc2Zvcm0vY29sLWJ1dHRvbnMucGlwZSc7XHJcbmltcG9ydCB7IFRhYmxlV2lkZ2V0U2VydmljZSwgVEFCTEVfV0lER0VULCBUYWJsZVdpZGdldCB9IGZyb20gJy4vdGFibGUtd2lkZ2V0LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVXaWRnZXRNb2R1bGUgfSBmcm9tICcuL3RhYmxlLXdpZGdldC90YWJsZS13aWRnZXQubW9kdWxlJztcclxuaW1wb3J0IHsgVGFibGVXaWRnZXREaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXdpZGdldC5kaXJlY3RpdmUnO1xyXG5cclxuY29uc3QgQ09NUE9ORU5UID0gW056eFRhYmxlQ29tcG9uZW50LCBOenhUYWJsZUhlYWRlckNvbXBvbmVudCwgTnp4Q29sdW1uU2V0dGluZ0NvbXBvbmVudF07XHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDT01QT05FTlQsXHJcbiAgICBDb2xGb3JtYXRQaXBlLFxyXG4gICAgQ29sU3BhblBpcGUsXHJcbiAgICBDb2xCdXR0b25WaXNpYmxlUGlwZSxcclxuICAgIEhhc0F1dGhQaXBlLFxyXG4gICAgVGFibGVXaWRnZXREaXJlY3RpdmUsXHJcbiAgICBDb2xCdXR0b25zUGlwZVxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTnpUYWJsZU1vZHVsZSxcclxuICAgIE56UmVzaXphYmxlTW9kdWxlLFxyXG4gICAgTnpJY29uTW9kdWxlLFxyXG4gICAgTnpQb3BvdmVyTW9kdWxlLFxyXG4gICAgTnpDaGVja2JveE1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlLFxyXG4gICAgTnpEaXZpZGVyTW9kdWxlLFxyXG4gICAgTnpEcm9wRG93bk1vZHVsZSxcclxuICAgIE56VG9vbFRpcE1vZHVsZSxcclxuICAgIE56eFBpcGVNb2R1bGUsXHJcbiAgICBOenhTZXJ2aWNlTW9kdWxlLFxyXG4gICAgTnpPdXRsZXRNb2R1bGUsXHJcbiAgICBOekJ1dHRvbk1vZHVsZSxcclxuICAgIE56eERpcmVjdGl2ZU1vZHVsZSxcclxuICAgIFRhYmxlV2lkZ2V0TW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbQ09NUE9ORU5UXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4VGFibGVNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IFRhYmxlV2lkZ2V0U2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVEFCTEVfV0lER0VUKSB3aWRnZXRzOiBUYWJsZVdpZGdldFtdW10gPSBbXVxyXG4gICkge1xyXG4gICAgaWYgKCF3aWRnZXRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHdpZGdldHMuZm9yRWFjaChjID0+IHNlcnZpY2UucmVnaXN0ZXIoYykpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZvckNoaWxkKGNvbmZpZzogVGFibGVXaWRnZXRbXSA9IFtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOenhUYWJsZU1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE56eFRhYmxlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFRBQkxFX1dJREdFVCwgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==