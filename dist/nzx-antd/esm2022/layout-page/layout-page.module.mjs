import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzxContentComponent } from './content.component';
import { NzxPageComponent } from './page.component';
import { NzxHeaderComponent } from './header.component';
import { ObserversModule } from '@angular/cdk/observers';
import * as i0 from "@angular/core";
const COMPONENTS = [NzxContentComponent, NzxPageComponent, NzxHeaderComponent];
export class NzxLayoutPageModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, declarations: [NzxContentComponent, NzxPageComponent, NzxHeaderComponent], imports: [CommonModule, ObserversModule], exports: [NzxContentComponent, NzxPageComponent, NzxHeaderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, imports: [CommonModule, ObserversModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLayoutPageModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [COMPONENTS],
                    imports: [CommonModule, ObserversModule],
                    exports: [COMPONENTS]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LXBhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2xheW91dC1wYWdlL2xheW91dC1wYWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRXpELE1BQU0sVUFBVSxHQUFHLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQU8vRSxNQUFNLE9BQU8sbUJBQW1CO3dHQUFuQixtQkFBbUI7eUdBQW5CLG1CQUFtQixpQkFQWixtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsYUFJakUsWUFBWSxFQUFFLGVBQWUsYUFKckIsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCO3lHQU9oRSxtQkFBbUIsWUFIcEIsWUFBWSxFQUFFLGVBQWU7OzRGQUc1QixtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUMxQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTnp4Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOenhQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE56eEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9ic2VydmVyc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xyXG5cclxuY29uc3QgQ09NUE9ORU5UUyA9IFtOenhDb250ZW50Q29tcG9uZW50LCBOenhQYWdlQ29tcG9uZW50LCBOenhIZWFkZXJDb21wb25lbnRdO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtDT01QT05FTlRTXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPYnNlcnZlcnNNb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtDT01QT05FTlRTXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4TGF5b3V0UGFnZU1vZHVsZSB7fVxyXG4iXX0=