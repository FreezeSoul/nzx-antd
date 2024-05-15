import { Pipe } from '@angular/core';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
/**
 * 处理链接的href属性
 */
export class LinkHrefPipe {
    transform(btn, row, params) {
        if (!btn.href) {
            return undefined;
        }
        if (typeof btn.href === 'string') {
            return btn.href;
        }
        if (NzxUtils.isFunction(btn.href)) {
            return btn.href(row, params);
        }
        if (row?.buttons && params.column.name) {
            return row.buttons[params.column.name]?.href;
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LinkHrefPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: LinkHrefPipe, name: "linkHref" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LinkHrefPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'linkHref'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1ocmVmLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdGFibGUvdHJhbnNmb3JtL2xpbmstaHJlZi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFakQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUN2QixTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFjLEVBQUUsTUFBd0I7UUFDdEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDYixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakI7UUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUFFRCxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDdEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO3dHQWpCVSxZQUFZO3NHQUFaLFlBQVk7OzRGQUFaLFlBQVk7a0JBSHhCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZWxsQXJnVHlwZSwgTnp4Q29sdW1uQnV0dG9uIH0gZnJvbSAnLi4vdGFibGUudHlwZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiDlpITnkIbpk77mjqXnmoRocmVm5bGe5oCnXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2xpbmtIcmVmJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlua0hyZWZQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgdHJhbnNmb3JtKGJ0bjogTnp4Q29sdW1uQnV0dG9uLCByb3c6IE56U2FmZUFueSwgcGFyYW1zOiBDZWxsQXJnVHlwZTxhbnk+KTogdW5rbm93biB7XHJcbiAgICBpZiAoIWJ0bi5ocmVmKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGJ0bi5ocmVmID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gYnRuLmhyZWY7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE56eFV0aWxzLmlzRnVuY3Rpb24oYnRuLmhyZWYpKSB7XHJcbiAgICAgIHJldHVybiBidG4uaHJlZihyb3csIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvdz8uYnV0dG9ucyAmJiBwYXJhbXMuY29sdW1uLm5hbWUpIHtcclxuICAgICAgcmV0dXJuIHJvdy5idXR0b25zW3BhcmFtcy5jb2x1bW4ubmFtZV0/LmhyZWY7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19