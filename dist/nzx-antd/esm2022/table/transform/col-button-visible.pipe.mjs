import { Pipe } from '@angular/core';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sLWJ1dHRvbi12aXNpYmxlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdGFibGUvdHJhbnNmb3JtL2NvbC1idXR0b24tdmlzaWJsZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFNckQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixTQUFTLENBQ1AsS0FBa0M7UUFFbEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7SUFDL0IsQ0FBQzt3R0FSVSxvQkFBb0I7c0dBQXBCLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFIaEMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsa0JBQWtCO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ1R5cGUsIE56eENvbHVtbkJ1dHRvbiB9IGZyb20gJy4uL3RhYmxlLnR5cGUnO1xyXG5pbXBvcnQgeyBOenhVdGlscyB9IGZyb20gJ0BmcmVlemVzb3VsL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjb2xCdXR0b25WaXNpYmxlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sQnV0dG9uVmlzaWJsZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0oXHJcbiAgICB2YWx1ZT86IE56eENvbHVtbkJ1dHRvblsndmlzaWJsZSddXHJcbiAgKTogKHJvdzogTnpTYWZlQW55LCBwYXJhbXM6IENlbGxBcmdUeXBlPE56U2FmZUFueT4pID0+IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsIHwgdm9pZCB7XHJcbiAgICBpZiAoTnp4VXRpbHMuaXNGdW5jdGlvbih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgpID0+IHZhbHVlICE9PSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19