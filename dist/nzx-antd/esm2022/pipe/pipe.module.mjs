import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathPipe } from './math.pipe';
import { DefaultifyPipe } from './defaultify.pipe';
import { TrustHtmlPipe, TrustScriptPipe, TrustStylePipe, TrustUrlPipe } from './trust-resource.pipe';
import { TimeUnitPipe } from './time-unit.pipe';
import { ToAsyncPipe } from './to-async.pipe';
import { FilterPipe } from './filter.pipe';
import { DicPipe } from './dic.pipe';
import { PathValuePipe } from './path-value.pipe';
import * as i0 from "@angular/core";
const PIPE = [
    MathPipe,
    DefaultifyPipe,
    TrustUrlPipe,
    TrustHtmlPipe,
    TrustScriptPipe,
    TrustStylePipe,
    TimeUnitPipe,
    ToAsyncPipe,
    FilterPipe,
    DicPipe,
    PathValuePipe
];
export class NzxPipeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, declarations: [MathPipe,
            DefaultifyPipe,
            TrustUrlPipe,
            TrustHtmlPipe,
            TrustScriptPipe,
            TrustStylePipe,
            TimeUnitPipe,
            ToAsyncPipe,
            FilterPipe,
            DicPipe,
            PathValuePipe], imports: [CommonModule], exports: [MathPipe,
            DefaultifyPipe,
            TrustUrlPipe,
            TrustHtmlPipe,
            TrustScriptPipe,
            TrustStylePipe,
            TimeUnitPipe,
            ToAsyncPipe,
            FilterPipe,
            DicPipe,
            PathValuePipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxPipeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PIPE],
                    imports: [CommonModule],
                    exports: [PIPE]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvcGlwZS9waXBlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUVsRCxNQUFNLElBQUksR0FBRztJQUNYLFFBQVE7SUFDUixjQUFjO0lBQ2QsWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztJQUNkLFlBQVk7SUFDWixXQUFXO0lBQ1gsVUFBVTtJQUNWLE9BQU87SUFDUCxhQUFhO0NBQ2QsQ0FBQztBQU1GLE1BQU0sT0FBTyxhQUFhO3dHQUFiLGFBQWE7eUdBQWIsYUFBYSxpQkFqQnhCLFFBQVE7WUFDUixjQUFjO1lBQ2QsWUFBWTtZQUNaLGFBQWE7WUFDYixlQUFlO1lBQ2YsY0FBYztZQUNkLFlBQVk7WUFDWixXQUFXO1lBQ1gsVUFBVTtZQUNWLE9BQU87WUFDUCxhQUFhLGFBSUgsWUFBWSxhQWR0QixRQUFRO1lBQ1IsY0FBYztZQUNkLFlBQVk7WUFDWixhQUFhO1lBQ2IsZUFBZTtZQUNmLGNBQWM7WUFDZCxZQUFZO1lBQ1osV0FBVztZQUNYLFVBQVU7WUFDVixPQUFPO1lBQ1AsYUFBYTt5R0FPRixhQUFhLFlBSGQsWUFBWTs7NEZBR1gsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQ3BCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUNoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdGhQaXBlIH0gZnJvbSAnLi9tYXRoLnBpcGUnO1xyXG5pbXBvcnQgeyBEZWZhdWx0aWZ5UGlwZSB9IGZyb20gJy4vZGVmYXVsdGlmeS5waXBlJztcclxuaW1wb3J0IHsgVHJ1c3RIdG1sUGlwZSwgVHJ1c3RTY3JpcHRQaXBlLCBUcnVzdFN0eWxlUGlwZSwgVHJ1c3RVcmxQaXBlIH0gZnJvbSAnLi90cnVzdC1yZXNvdXJjZS5waXBlJztcclxuaW1wb3J0IHsgVGltZVVuaXRQaXBlIH0gZnJvbSAnLi90aW1lLXVuaXQucGlwZSc7XHJcbmltcG9ydCB7IFRvQXN5bmNQaXBlIH0gZnJvbSAnLi90by1hc3luYy5waXBlJztcclxuaW1wb3J0IHsgRmlsdGVyUGlwZSB9IGZyb20gJy4vZmlsdGVyLnBpcGUnO1xyXG5pbXBvcnQgeyBEaWNQaXBlIH0gZnJvbSAnLi9kaWMucGlwZSc7XHJcbmltcG9ydCB7IFBhdGhWYWx1ZVBpcGUgfSBmcm9tICcuL3BhdGgtdmFsdWUucGlwZSc7XHJcblxyXG5jb25zdCBQSVBFID0gW1xyXG4gIE1hdGhQaXBlLFxyXG4gIERlZmF1bHRpZnlQaXBlLFxyXG4gIFRydXN0VXJsUGlwZSxcclxuICBUcnVzdEh0bWxQaXBlLFxyXG4gIFRydXN0U2NyaXB0UGlwZSxcclxuICBUcnVzdFN0eWxlUGlwZSxcclxuICBUaW1lVW5pdFBpcGUsXHJcbiAgVG9Bc3luY1BpcGUsXHJcbiAgRmlsdGVyUGlwZSxcclxuICBEaWNQaXBlLFxyXG4gIFBhdGhWYWx1ZVBpcGVcclxuXTtcclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtQSVBFXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBleHBvcnRzOiBbUElQRV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE56eFBpcGVNb2R1bGUge31cclxuIl19