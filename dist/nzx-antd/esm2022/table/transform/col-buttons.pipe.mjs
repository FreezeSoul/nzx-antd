import { Pipe } from '@angular/core';
import { of } from 'rxjs';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
export class ColButtonsPipe {
    transform(buttons, row, params, parentRow) {
        if (!buttons) {
            return of([]);
        }
        if (NzxUtils.isFunction(buttons)) {
            return resolveButton(buttons(row, { ...params, parentRow }));
        }
        return resolveButton(buttons);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColButtonsPipe, name: "colButtons" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colButtons'
                }]
        }] });
function resolveButton(buttons) {
    if (!buttons) {
        return of([]);
    }
    if (NzxUtils.isArray(buttons)) {
        return of(buttons);
    }
    if (NzxUtils.isObservable(buttons) || NzxUtils.isPromise(buttons)) {
        return buttons;
    }
    return of([]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLWJ1dHRvbnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90cmFuc2Zvcm0vY29sLWJ1dHRvbnMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFLckQsTUFBTSxPQUFPLGNBQWM7SUFDekIsU0FBUyxDQUNQLE9BQTRFLEVBQzVFLEdBQU0sRUFDTixNQUFzQixFQUN0QixTQUFhO1FBRWIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2Y7UUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7d0dBZlUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQjs7QUFtQkQsU0FBUyxhQUFhLENBQUksT0FBWTtJQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZjtJQUVELElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwQjtJQUVELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ1R5cGUgfSBmcm9tICcuLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC91dGlsJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnY29sQnV0dG9ucydcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbEJ1dHRvbnNQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKFxyXG4gICAgYnV0dG9uczogVFtdIHwgKChyb3c6IFQsIHBhcmFtczogQ2VsbEFyZ1R5cGU8VD4gJiB7IHBhcmVudFJvdz86IFQgfSkgPT4gVFtdKSxcclxuICAgIHJvdzogVCxcclxuICAgIHBhcmFtczogQ2VsbEFyZ1R5cGU8VD4sXHJcbiAgICBwYXJlbnRSb3c/OiBUXHJcbiAgKSB7XHJcbiAgICBpZiAoIWJ1dHRvbnMpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnp4VXRpbHMuaXNGdW5jdGlvbihidXR0b25zKSkge1xyXG4gICAgICByZXR1cm4gcmVzb2x2ZUJ1dHRvbihidXR0b25zKHJvdywgeyAuLi5wYXJhbXMsIHBhcmVudFJvdyB9KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb2x2ZUJ1dHRvbihidXR0b25zKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVCdXR0b248VD4oYnV0dG9uczogVFtdKSB7XHJcbiAgaWYgKCFidXR0b25zKSB7XHJcbiAgICByZXR1cm4gb2YoW10pO1xyXG4gIH1cclxuXHJcbiAgaWYgKE56eFV0aWxzLmlzQXJyYXkoYnV0dG9ucykpIHtcclxuICAgIHJldHVybiBvZihidXR0b25zKTtcclxuICB9XHJcblxyXG4gIGlmIChOenhVdGlscy5pc09ic2VydmFibGUoYnV0dG9ucykgfHwgTnp4VXRpbHMuaXNQcm9taXNlKGJ1dHRvbnMpKSB7XHJcbiAgICByZXR1cm4gYnV0dG9ucztcclxuICB9XHJcbiAgcmV0dXJuIG9mKFtdKTtcclxufVxyXG4iXX0=