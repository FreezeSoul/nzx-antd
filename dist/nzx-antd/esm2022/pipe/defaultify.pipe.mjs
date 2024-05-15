import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdGlmeS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3BpcGUvZGVmYXVsdGlmeS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFRcEQsTUFBTSxPQUFPLGNBQWM7SUFDSDtJQUF0QixZQUFzQixXQUEyQjtRQUEzQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFBRyxDQUFDO0lBQ3JELFNBQVMsQ0FBZ0IsS0FBMkIsRUFBRSxZQUF5QjtRQUM3RSxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3BILENBQUM7d0dBSlUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUoxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsSUFBSTtpQkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkJztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnZGVmYXVsdGlmeScsXHJcbiAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdGlmeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlKSB7fVxyXG4gIHRyYW5zZm9ybTxUID0gTnpTYWZlQW55Pih2YWx1ZTogVCB8IHVuZGVmaW5lZCB8IG51bGwsIGRlZmF1bHRWYWx1ZT86IFQgfCBzdHJpbmcpOiBUIHwgc3RyaW5nIHtcclxuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gKChkZWZhdWx0VmFsdWUgPT0gbnVsbCA/IHRoaXMuYW50ZFNlcnZpY2UuZGVmYXVsdGlmeSB8fCAnLS0nIDogZGVmYXVsdFZhbHVlKSBhcyBUKSA6IHZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=