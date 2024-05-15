import { Pipe } from '@angular/core';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
export class ColButtonVisiblePipe {
    transform(value) {
        if (NzxUtils.isFunction(value)) {
            return value;
        }
        return () => value !== false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonVisiblePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColButtonVisiblePipe, name: "colButtonVisible" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonVisiblePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colButtonVisible'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLWJ1dHRvbi12aXNpYmxlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdGFibGUvdHJhbnNmb3JtL2NvbC1idXR0b24tdmlzaWJsZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFNakQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixTQUFTLENBQ1AsS0FBa0M7UUFFbEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7SUFDL0IsQ0FBQzt3R0FSVSxvQkFBb0I7c0dBQXBCLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFIaEMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsa0JBQWtCO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ1R5cGUsIE56eENvbHVtbkJ1dHRvbiB9IGZyb20gJy4uL3RhYmxlLnR5cGUnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQvdXRpbCc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NvbEJ1dHRvblZpc2libGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xCdXR0b25WaXNpYmxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShcclxuICAgIHZhbHVlPzogTnp4Q29sdW1uQnV0dG9uWyd2aXNpYmxlJ11cclxuICApOiAocm93OiBOelNhZmVBbnksIHBhcmFtczogQ2VsbEFyZ1R5cGU8TnpTYWZlQW55PikgPT4gYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwgfCB2b2lkIHtcclxuICAgIGlmIChOenhVdGlscy5pc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCkgPT4gdmFsdWUgIT09IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=