import { Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableInputComponent } from './table-input/table-input.component';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TableButtonComponent } from './table-button/table-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableLinkComponent } from './table-link/table-link.component';
import { LinkHrefPipe } from '../transform/link-href.pipe';
import { TableTagComponent } from './table-tag/table-tag.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzxSwitchComponent, NzxSwitchModule } from '@freezesoul/nzx-antd/switch';
import { NzInputNumberComponent, NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { TABLE_WIDGET } from '../table-widget.service';
import * as i0 from "@angular/core";
import * as i1 from "../table-widget.service";
export function defaultTableWidget() {
    return [
        { name: 'switch', component: NzxSwitchComponent },
        { name: 'input', component: TableInputComponent },
        { name: 'number', component: NzInputNumberComponent },
        { name: 'tag', component: TableTagComponent },
        { name: 'button', component: TableButtonComponent },
        { name: 'link', component: TableLinkComponent }
    ];
}
export class TableWidgetModule {
    service;
    constructor(service, widgets = []) {
        this.service = service;
        if (!widgets) {
            return;
        }
        widgets.forEach(c => service.register(c));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, deps: [{ token: i1.TableWidgetService }, { token: TABLE_WIDGET, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, declarations: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent, LinkHrefPipe], imports: [CommonModule,
            FormsModule,
            NzInputModule,
            NzButtonModule,
            NzIconModule,
            NzTagModule,
            NzInputNumberModule,
            NzxSwitchModule], exports: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, providers: [{ provide: TABLE_WIDGET, useFactory: defaultTableWidget, multi: true }], imports: [CommonModule,
            FormsModule,
            NzInputModule,
            NzButtonModule,
            NzIconModule,
            NzTagModule,
            NzInputNumberModule,
            NzxSwitchModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent, LinkHrefPipe],
                    imports: [
                        CommonModule,
                        FormsModule,
                        NzInputModule,
                        NzButtonModule,
                        NzIconModule,
                        NzTagModule,
                        NzInputNumberModule,
                        NzxSwitchModule
                    ],
                    providers: [{ provide: TABLE_WIDGET, useFactory: defaultTableWidget, multi: true }],
                    exports: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent]
                }]
        }], ctorParameters: function () { return [{ type: i1.TableWidgetService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TABLE_WIDGET]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtd2lkZ2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS13aWRnZXQvdGFibGUtd2lkZ2V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RixPQUFPLEVBQXNCLFlBQVksRUFBZSxNQUFNLHlCQUF5QixDQUFDOzs7QUFFeEYsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxPQUFPO1FBQ0wsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRTtRQUNqRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFO1FBQ2pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsc0JBQXNCLEVBQUU7UUFDckQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRTtRQUM3QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFO1FBQ25ELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUU7S0FDaEQsQ0FBQztBQUNKLENBQUM7QUFpQkQsTUFBTSxPQUFPLGlCQUFpQjtJQUVuQjtJQURULFlBQ1MsT0FBMkIsRUFDQSxVQUEyQixFQUFFO1FBRHhELFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBR2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPO1NBQ1I7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7d0dBVFUsaUJBQWlCLG9EQUdOLFlBQVk7eUdBSHZCLGlCQUFpQixpQkFkYixtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLGFBRTNHLFlBQVk7WUFDWixXQUFXO1lBQ1gsYUFBYTtZQUNiLGNBQWM7WUFDZCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixlQUFlLGFBR1AsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCO3lHQUUvRSxpQkFBaUIsYUFIakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQVRqRixZQUFZO1lBQ1osV0FBVztZQUNYLGFBQWE7WUFDYixjQUFjO1lBQ2QsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsZUFBZTs7NEZBS04saUJBQWlCO2tCQWY3QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQztvQkFDOUcsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsZUFBZTtxQkFDaEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ25GLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDO2lCQUM1Rjs7MEJBSUksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBOZ01vZHVsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGFibGVJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaW5wdXQvdGFibGUtaW5wdXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcclxuaW1wb3J0IHsgVGFibGVCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWJ1dHRvbi90YWJsZS1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2J1dHRvbic7XHJcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XHJcbmltcG9ydCB7IFRhYmxlTGlua0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtbGluay90YWJsZS1saW5rLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExpbmtIcmVmUGlwZSB9IGZyb20gJy4uL3RyYW5zZm9ybS9saW5rLWhyZWYucGlwZSc7XHJcbmltcG9ydCB7IFRhYmxlVGFnQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS10YWcvdGFibGUtdGFnLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE56VGFnTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90YWcnO1xyXG5pbXBvcnQgeyBOenhTd2l0Y2hDb21wb25lbnQsIE56eFN3aXRjaE1vZHVsZSB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3N3aXRjaCc7XHJcbmltcG9ydCB7IE56SW5wdXROdW1iZXJDb21wb25lbnQsIE56SW5wdXROdW1iZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0LW51bWJlcic7XHJcbmltcG9ydCB7IFRhYmxlV2lkZ2V0U2VydmljZSwgVEFCTEVfV0lER0VULCBUYWJsZVdpZGdldCB9IGZyb20gJy4uL3RhYmxlLXdpZGdldC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0VGFibGVXaWRnZXQoKTogVGFibGVXaWRnZXRbXSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHsgbmFtZTogJ3N3aXRjaCcsIGNvbXBvbmVudDogTnp4U3dpdGNoQ29tcG9uZW50IH0sXHJcbiAgICB7IG5hbWU6ICdpbnB1dCcsIGNvbXBvbmVudDogVGFibGVJbnB1dENvbXBvbmVudCB9LFxyXG4gICAgeyBuYW1lOiAnbnVtYmVyJywgY29tcG9uZW50OiBOeklucHV0TnVtYmVyQ29tcG9uZW50IH0sXHJcbiAgICB7IG5hbWU6ICd0YWcnLCBjb21wb25lbnQ6IFRhYmxlVGFnQ29tcG9uZW50IH0sXHJcbiAgICB7IG5hbWU6ICdidXR0b24nLCBjb21wb25lbnQ6IFRhYmxlQnV0dG9uQ29tcG9uZW50IH0sXHJcbiAgICB7IG5hbWU6ICdsaW5rJywgY29tcG9uZW50OiBUYWJsZUxpbmtDb21wb25lbnQgfVxyXG4gIF07XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbVGFibGVJbnB1dENvbXBvbmVudCwgVGFibGVCdXR0b25Db21wb25lbnQsIFRhYmxlTGlua0NvbXBvbmVudCwgVGFibGVUYWdDb21wb25lbnQsIExpbmtIcmVmUGlwZV0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOeklucHV0TW9kdWxlLFxyXG4gICAgTnpCdXR0b25Nb2R1bGUsXHJcbiAgICBOekljb25Nb2R1bGUsXHJcbiAgICBOelRhZ01vZHVsZSxcclxuICAgIE56SW5wdXROdW1iZXJNb2R1bGUsXHJcbiAgICBOenhTd2l0Y2hNb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogVEFCTEVfV0lER0VULCB1c2VGYWN0b3J5OiBkZWZhdWx0VGFibGVXaWRnZXQsIG11bHRpOiB0cnVlIH1dLFxyXG4gIGV4cG9ydHM6IFtUYWJsZUlucHV0Q29tcG9uZW50LCBUYWJsZUJ1dHRvbkNvbXBvbmVudCwgVGFibGVMaW5rQ29tcG9uZW50LCBUYWJsZVRhZ0NvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlV2lkZ2V0TW9kdWxlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBUYWJsZVdpZGdldFNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRBQkxFX1dJREdFVCkgd2lkZ2V0czogVGFibGVXaWRnZXRbXVtdID0gW11cclxuICApIHtcclxuICAgIGlmICghd2lkZ2V0cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB3aWRnZXRzLmZvckVhY2goYyA9PiBzZXJ2aWNlLnJlZ2lzdGVyKGMpKTtcclxuICB9XHJcbn1cclxuIl19