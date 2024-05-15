import { Pipe } from '@angular/core';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
export class ColFormatPipe {
    transform(row, col, params) {
        const nameData = col.name ? NzxUtils.get(row, col.name) : null;
        if (!col.format) {
            return Promise.resolve(nameData);
        }
        const result = col.format(nameData, row, params);
        if (NzxUtils.isPromise(result) || NzxUtils.isObservable(result)) {
            return result;
        }
        return Promise.resolve(result);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColFormatPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColFormatPipe, name: "colFormat" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColFormatPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colFormat'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLWZvcm1hdC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3RhYmxlL3RyYW5zZm9ybS9jb2wtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUtqRCxNQUFNLE9BQU8sYUFBYTtJQUN4QixTQUFTLENBQUMsR0FBTSxFQUFFLEdBQWlCLEVBQUUsTUFBc0I7UUFDekQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFDRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0QsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO3dHQVhVLGFBQWE7c0dBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFIekIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsV0FBVztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IENlbGxBcmdUeXBlLCBOenhDb2x1bW4gfSBmcm9tICcuLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvdXRpbCc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvbEZvcm1hdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbEZvcm1hdFBpcGU8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIE56U2FmZUFueT4+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKHJvdzogVCwgY29sOiBOenhDb2x1bW48VD4sIHBhcmFtczogQ2VsbEFyZ1R5cGU8VD4pOiBPYnNlcnZhYmxlPFQ+IHwgUHJvbWlzZTxUPiB7XHJcbiAgICBjb25zdCBuYW1lRGF0YSA9IGNvbC5uYW1lID8gTnp4VXRpbHMuZ2V0KHJvdywgY29sLm5hbWUgYXMgc3RyaW5nKSA6IG51bGw7XHJcbiAgICBpZiAoIWNvbC5mb3JtYXQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuYW1lRGF0YSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQgPSBjb2wuZm9ybWF0KG5hbWVEYXRhLCByb3csIHBhcmFtcyk7XHJcbiAgICBpZiAoTnp4VXRpbHMuaXNQcm9taXNlKHJlc3VsdCkgfHwgTnp4VXRpbHMuaXNPYnNlcnZhYmxlKHJlc3VsdCkpIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuICB9XHJcbn1cclxuIl19