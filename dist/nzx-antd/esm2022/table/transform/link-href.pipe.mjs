import { Pipe } from '@angular/core';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1ocmVmLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdGFibGUvdHJhbnNmb3JtL2xpbmstaHJlZi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFckQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUN2QixTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFjLEVBQUUsTUFBd0I7UUFDdEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDYixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakI7UUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUFFRCxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDdEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO3dHQWpCVSxZQUFZO3NHQUFaLFlBQVk7OzRGQUFaLFlBQVk7a0JBSHhCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZWxsQXJnVHlwZSwgTnp4Q29sdW1uQnV0dG9uIH0gZnJvbSAnLi4vdGFibGUudHlwZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eFV0aWxzIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQvdXRpbCc7XHJcblxyXG4vKipcclxuICog5aSE55CG6ZO+5o6l55qEaHJlZuWxnuaAp1xyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdsaW5rSHJlZidcclxufSlcclxuZXhwb3J0IGNsYXNzIExpbmtIcmVmUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShidG46IE56eENvbHVtbkJ1dHRvbiwgcm93OiBOelNhZmVBbnksIHBhcmFtczogQ2VsbEFyZ1R5cGU8YW55Pik6IHVua25vd24ge1xyXG4gICAgaWYgKCFidG4uaHJlZikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBidG4uaHJlZiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGJ0bi5ocmVmO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOenhVdGlscy5pc0Z1bmN0aW9uKGJ0bi5ocmVmKSkge1xyXG4gICAgICByZXR1cm4gYnRuLmhyZWYocm93LCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb3c/LmJ1dHRvbnMgJiYgcGFyYW1zLmNvbHVtbi5uYW1lKSB7XHJcbiAgICAgIHJldHVybiByb3cuYnV0dG9uc1twYXJhbXMuY29sdW1uLm5hbWVdPy5ocmVmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==