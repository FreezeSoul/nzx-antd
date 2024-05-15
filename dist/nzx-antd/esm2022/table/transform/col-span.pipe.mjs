import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class ColSpanPipe {
    transform(row, spanFunc, nzData, nzPageData, column, indexAttr, colIndex) {
        let rowspan = 1;
        let colspan = 1;
        if (spanFunc) {
            const result = spanFunc(row, {
                row,
                nzData,
                nzPageData,
                column,
                indexAttr,
                colIndex
            });
            if (Array.isArray(result)) {
                rowspan = result[0];
                colspan = result[1];
            }
            else if (result != null) {
                rowspan = result.rowspan;
                colspan = result.colspan;
            }
        }
        return { rowspan, colspan };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColSpanPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColSpanPipe, name: "colSpan" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColSpanPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colSpan',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLXNwYW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90cmFuc2Zvcm0vY29sLXNwYW4ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFPcEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsU0FBUyxDQUNQLEdBQU0sRUFDTixRQUFxQixFQUNyQixNQUFXLEVBQ1gsVUFBZSxFQUNmLE1BQW9CLEVBQ3BCLFNBQW9CLEVBQ3BCLFFBQW1CO1FBRW5CLElBQUksT0FBTyxHQUF5QixDQUFDLENBQUM7UUFDdEMsSUFBSSxPQUFPLEdBQXlCLENBQUMsQ0FBQztRQUV0QyxJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQzNCLEdBQUc7Z0JBQ0gsTUFBTTtnQkFDTixVQUFVO2dCQUNWLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxRQUFRO2FBQ1QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QixPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JCO2lCQUFNLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDekIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ3pCLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQzFCO1NBQ0Y7UUFFRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7d0dBaENVLFdBQVc7c0dBQVgsV0FBVzs7NEZBQVgsV0FBVztrQkFKdkIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsSUFBSTtpQkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5kZXhBdHRyLCBOenhDb2x1bW4sIFNwYW5GdW5jIH0gZnJvbSAnLi4vdGFibGUudHlwZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvbFNwYW4nLFxyXG4gIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbFNwYW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtPFQ+KFxyXG4gICAgcm93OiBULFxyXG4gICAgc3BhbkZ1bmM6IFNwYW5GdW5jPFQ+LFxyXG4gICAgbnpEYXRhOiBUW10sXHJcbiAgICBuelBhZ2VEYXRhOiBUW10sXHJcbiAgICBjb2x1bW46IE56eENvbHVtbjxUPixcclxuICAgIGluZGV4QXR0cjogSW5kZXhBdHRyLFxyXG4gICAgY29sSW5kZXg6IEluZGV4QXR0clxyXG4gICk6IHVua25vd24ge1xyXG4gICAgbGV0IHJvd3NwYW46IG51bWJlciB8IG51bGwgfCB2b2lkID0gMTtcclxuICAgIGxldCBjb2xzcGFuOiBudW1iZXIgfCBudWxsIHwgdm9pZCA9IDE7XHJcblxyXG4gICAgaWYgKHNwYW5GdW5jKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHNwYW5GdW5jKHJvdywge1xyXG4gICAgICAgIHJvdyxcclxuICAgICAgICBuekRhdGEsXHJcbiAgICAgICAgbnpQYWdlRGF0YSxcclxuICAgICAgICBjb2x1bW4sXHJcbiAgICAgICAgaW5kZXhBdHRyLFxyXG4gICAgICAgIGNvbEluZGV4XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XHJcbiAgICAgICAgcm93c3BhbiA9IHJlc3VsdFswXTtcclxuICAgICAgICBjb2xzcGFuID0gcmVzdWx0WzFdO1xyXG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgcm93c3BhbiA9IHJlc3VsdC5yb3dzcGFuO1xyXG4gICAgICAgIGNvbHNwYW4gPSByZXN1bHQuY29sc3BhbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHJvd3NwYW4sIGNvbHNwYW4gfTtcclxuICB9XHJcbn1cclxuIl19