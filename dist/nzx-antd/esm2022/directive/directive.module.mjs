import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamedTemplate } from './named-template';
import { ClickOnceDirective } from './click.once.directive';
import { FaIconDirective } from './fa-icon.directive';
import { ClickOutsideDirective } from './click-outside.directive';
import { LetDirective } from './let.directive';
import { DownFileDirective } from './down-file.directive';
import { AuthDirective } from './auth.directive';
import { AuthNotDirective } from './auth.not.directive';
import { NzxServiceModule } from '@freezesoul/nzx-antd/service';
import { NgxFor } from './ngx-for.directive';
import * as i0 from "@angular/core";
const DIRECTIVE = [
    NamedTemplate,
    ClickOnceDirective,
    FaIconDirective,
    ClickOutsideDirective,
    LetDirective,
    DownFileDirective,
    AuthDirective,
    AuthNotDirective,
    NgxFor
];
export class NzxDirectiveModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, declarations: [NamedTemplate,
            ClickOnceDirective,
            FaIconDirective,
            ClickOutsideDirective,
            LetDirective,
            DownFileDirective,
            AuthDirective,
            AuthNotDirective,
            NgxFor], imports: [CommonModule, NzxServiceModule], exports: [NamedTemplate,
            ClickOnceDirective,
            FaIconDirective,
            ClickOutsideDirective,
            LetDirective,
            DownFileDirective,
            AuthDirective,
            AuthNotDirective,
            NgxFor] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, imports: [CommonModule, NzxServiceModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DIRECTIVE],
                    imports: [CommonModule, NzxServiceModule],
                    exports: [DIRECTIVE]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9kaXJlY3RpdmUvZGlyZWN0aXZlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUU3QyxNQUFNLFNBQVMsR0FBRztJQUNoQixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLE1BQU07Q0FDUCxDQUFDO0FBTUYsTUFBTSxPQUFPLGtCQUFrQjt3R0FBbEIsa0JBQWtCO3lHQUFsQixrQkFBa0IsaUJBZjdCLGFBQWE7WUFDYixrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLHFCQUFxQjtZQUNyQixZQUFZO1lBQ1osaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsTUFBTSxhQUlJLFlBQVksRUFBRSxnQkFBZ0IsYUFaeEMsYUFBYTtZQUNiLGtCQUFrQjtZQUNsQixlQUFlO1lBQ2YscUJBQXFCO1lBQ3JCLFlBQVk7WUFDWixpQkFBaUI7WUFDakIsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixNQUFNO3lHQU9LLGtCQUFrQixZQUhuQixZQUFZLEVBQUUsZ0JBQWdCOzs0RkFHN0Isa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDekIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO29CQUN6QyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmFtZWRUZW1wbGF0ZSB9IGZyb20gJy4vbmFtZWQtdGVtcGxhdGUnO1xyXG5pbXBvcnQgeyBDbGlja09uY2VEaXJlY3RpdmUgfSBmcm9tICcuL2NsaWNrLm9uY2UuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRmFJY29uRGlyZWN0aXZlIH0gZnJvbSAnLi9mYS1pY29uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENsaWNrT3V0c2lkZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMZXREaXJlY3RpdmUgfSBmcm9tICcuL2xldC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEb3duRmlsZURpcmVjdGl2ZSB9IGZyb20gJy4vZG93bi1maWxlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEF1dGhEaXJlY3RpdmUgfSBmcm9tICcuL2F1dGguZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQXV0aE5vdERpcmVjdGl2ZSB9IGZyb20gJy4vYXV0aC5ub3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTnp4U2VydmljZU1vZHVsZSB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3NlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hGb3IgfSBmcm9tICcuL25neC1mb3IuZGlyZWN0aXZlJztcclxuXHJcbmNvbnN0IERJUkVDVElWRSA9IFtcclxuICBOYW1lZFRlbXBsYXRlLFxyXG4gIENsaWNrT25jZURpcmVjdGl2ZSxcclxuICBGYUljb25EaXJlY3RpdmUsXHJcbiAgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlLFxyXG4gIExldERpcmVjdGl2ZSxcclxuICBEb3duRmlsZURpcmVjdGl2ZSxcclxuICBBdXRoRGlyZWN0aXZlLFxyXG4gIEF1dGhOb3REaXJlY3RpdmUsXHJcbiAgTmd4Rm9yXHJcbl07XHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOenhTZXJ2aWNlTW9kdWxlXSxcclxuICBleHBvcnRzOiBbRElSRUNUSVZFXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4RGlyZWN0aXZlTW9kdWxlIHt9XHJcbiJdfQ==