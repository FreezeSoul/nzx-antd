import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
export class DefaultifyPipe {
    antdService;
    constructor(antdService) {
        this.antdService = antdService;
    }
    transform(value, defaultValue) {
        return value == null ? (defaultValue == null ? this.antdService.defaultify || '--' : defaultValue) : value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DefaultifyPipe, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DefaultifyPipe, name: "defaultify" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DefaultifyPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'defaultify',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdGlmeS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3BpcGUvZGVmYXVsdGlmeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFRcEQsTUFBTSxPQUFPLGNBQWM7SUFDSDtJQUF0QixZQUFzQixXQUEyQjtRQUEzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFBRyxDQUFDO0lBQ3JELFNBQVMsQ0FBZ0IsS0FBMkIsRUFBRSxZQUF5QjtRQUM3RSxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3BILENBQUM7d0dBSlUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUoxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsSUFBSTtpQkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZCc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2RlZmF1bHRpZnknLFxyXG4gIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIERlZmF1bHRpZnlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZSkge31cclxuICB0cmFuc2Zvcm08VCA9IE56U2FmZUFueT4odmFsdWU6IFQgfCB1bmRlZmluZWQgfCBudWxsLCBkZWZhdWx0VmFsdWU/OiBUIHwgc3RyaW5nKTogVCB8IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICgoZGVmYXVsdFZhbHVlID09IG51bGwgPyB0aGlzLmFudGRTZXJ2aWNlLmRlZmF1bHRpZnkgfHwgJy0tJyA6IGRlZmF1bHRWYWx1ZSkgYXMgVCkgOiB2YWx1ZTtcclxuICB9XHJcbn1cclxuIl19