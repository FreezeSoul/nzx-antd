import { Pipe } from '@angular/core';
import { of } from 'rxjs';
import { NzxUtils } from '@xmagic/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLWJ1dHRvbnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90cmFuc2Zvcm0vY29sLWJ1dHRvbnMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFLakQsTUFBTSxPQUFPLGNBQWM7SUFDekIsU0FBUyxDQUNQLE9BQTRFLEVBQzVFLEdBQU0sRUFDTixNQUFzQixFQUN0QixTQUFhO1FBRWIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2Y7UUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7d0dBZlUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUgxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO2lCQUNuQjs7QUFtQkQsU0FBUyxhQUFhLENBQUksT0FBWTtJQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZjtJQUVELElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwQjtJQUVELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ1R5cGUgfSBmcm9tICcuLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3V0aWwnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjb2xCdXR0b25zJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sQnV0dG9uc1BpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0oXHJcbiAgICBidXR0b25zOiBUW10gfCAoKHJvdzogVCwgcGFyYW1zOiBDZWxsQXJnVHlwZTxUPiAmIHsgcGFyZW50Um93PzogVCB9KSA9PiBUW10pLFxyXG4gICAgcm93OiBULFxyXG4gICAgcGFyYW1zOiBDZWxsQXJnVHlwZTxUPixcclxuICAgIHBhcmVudFJvdz86IFRcclxuICApIHtcclxuICAgIGlmICghYnV0dG9ucykge1xyXG4gICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOenhVdGlscy5pc0Z1bmN0aW9uKGJ1dHRvbnMpKSB7XHJcbiAgICAgIHJldHVybiByZXNvbHZlQnV0dG9uKGJ1dHRvbnMocm93LCB7IC4uLnBhcmFtcywgcGFyZW50Um93IH0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNvbHZlQnV0dG9uKGJ1dHRvbnMpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZUJ1dHRvbjxUPihidXR0b25zOiBUW10pIHtcclxuICBpZiAoIWJ1dHRvbnMpIHtcclxuICAgIHJldHVybiBvZihbXSk7XHJcbiAgfVxyXG5cclxuICBpZiAoTnp4VXRpbHMuaXNBcnJheShidXR0b25zKSkge1xyXG4gICAgcmV0dXJuIG9mKGJ1dHRvbnMpO1xyXG4gIH1cclxuXHJcbiAgaWYgKE56eFV0aWxzLmlzT2JzZXJ2YWJsZShidXR0b25zKSB8fCBOenhVdGlscy5pc1Byb21pc2UoYnV0dG9ucykpIHtcclxuICAgIHJldHVybiBidXR0b25zO1xyXG4gIH1cclxuICByZXR1cm4gb2YoW10pO1xyXG59XHJcbiJdfQ==