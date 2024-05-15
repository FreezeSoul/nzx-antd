import { Pipe } from '@angular/core';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC12YWx1ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3BpcGUvcGF0aC12YWx1ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFHckQ7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFNBQVMsQ0FBSSxLQUFnQixFQUFFLElBQVksRUFBRSxZQUF3QjtRQUNuRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO3dHQUhVLGFBQWE7c0dBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFKekIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcblxyXG4vKipcclxuICog5qC55o2u6Lev5b6E6I635Y+W5pWw5o2uXHJcbiAqIEBleGFtcGxlXHJcbiAqIHt7IHthOiB7YjogMX19IHwgcGF0aFZhbHVlOiAnYS5iJ319IC8vIDFcclxuICovXHJcbkBQaXBlKHtcclxuICBuYW1lOiAncGF0aFZhbHVlJyxcclxuICBwdXJlOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXRoVmFsdWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtPFQ+KHZhbHVlOiBOelNhZmVBbnksIHBhdGg6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogTnpTYWZlQW55KTogVCB7XHJcbiAgICByZXR1cm4gTnp4VXRpbHMuZ2V0KHZhbHVlLCBwYXRoLCBkZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=