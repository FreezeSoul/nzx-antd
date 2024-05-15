import { Pipe } from '@angular/core';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
/**
 * 根据路径获取数据
 * @example
 * {{ {a: {b: 1}} | pathValue: 'a.b'}} // 1
 */
export class PathValuePipe {
    transform(value, path, defaultValue) {
        return NzxUtils.get(value, path, defaultValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PathValuePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PathValuePipe, name: "pathValue" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PathValuePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'pathValue',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC12YWx1ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3BpcGUvcGF0aC12YWx1ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFHakQ7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFNBQVMsQ0FBSSxLQUFnQixFQUFFLElBQVksRUFBRSxZQUF3QjtRQUNuRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO3dHQUhVLGFBQWE7c0dBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFKekIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiDmoLnmja7ot6/lvoTojrflj5bmlbDmja5cclxuICogQGV4YW1wbGVcclxuICoge3sge2E6IHtiOiAxfX0gfCBwYXRoVmFsdWU6ICdhLmInfX0gLy8gMVxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdwYXRoVmFsdWUnLFxyXG4gIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhdGhWYWx1ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm08VD4odmFsdWU6IE56U2FmZUFueSwgcGF0aDogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBOelNhZmVBbnkpOiBUIHtcclxuICAgIHJldHVybiBOenhVdGlscy5nZXQodmFsdWUsIHBhdGgsIGRlZmF1bHRWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==