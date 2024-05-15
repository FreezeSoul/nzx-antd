import { Pipe } from '@angular/core';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLWZvcm1hdC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3RhYmxlL3RyYW5zZm9ybS9jb2wtZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUtyRCxNQUFNLE9BQU8sYUFBYTtJQUN4QixTQUFTLENBQUMsR0FBTSxFQUFFLEdBQWlCLEVBQUUsTUFBc0I7UUFDekQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFDRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0QsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO3dHQVhVLGFBQWE7c0dBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFIekIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsV0FBVztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IENlbGxBcmdUeXBlLCBOenhDb2x1bW4gfSBmcm9tICcuLi90YWJsZS50eXBlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjb2xGb3JtYXQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xGb3JtYXRQaXBlPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBOelNhZmVBbnk+PiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShyb3c6IFQsIGNvbDogTnp4Q29sdW1uPFQ+LCBwYXJhbXM6IENlbGxBcmdUeXBlPFQ+KTogT2JzZXJ2YWJsZTxUPiB8IFByb21pc2U8VD4ge1xyXG4gICAgY29uc3QgbmFtZURhdGEgPSBjb2wubmFtZSA/IE56eFV0aWxzLmdldChyb3csIGNvbC5uYW1lIGFzIHN0cmluZykgOiBudWxsO1xyXG4gICAgaWYgKCFjb2wuZm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmFtZURhdGEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdWx0ID0gY29sLmZvcm1hdChuYW1lRGF0YSwgcm93LCBwYXJhbXMpO1xyXG4gICAgaWYgKE56eFV0aWxzLmlzUHJvbWlzZShyZXN1bHQpIHx8IE56eFV0aWxzLmlzT2JzZXJ2YWJsZShyZXN1bHQpKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==