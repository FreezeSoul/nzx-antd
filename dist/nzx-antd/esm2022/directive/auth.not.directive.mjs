import { Directive, Input } from '@angular/core';
import { AuthDirective } from './auth.directive';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
/**
 * 权限指令, 无权限渲染模板,否则渲染else模板
 * @example
 * <button *auth.not="['code1', 'code2']; else hasAuth">没有有权限时显示</button>
 * <button *auth.not="'code1'; else hasAuth">没有有权限时显示</button>
 * <ng-template #hasAuth>有权限时显示</ng-template>
 */
export class AuthNotDirective extends AuthDirective {
    _viewContainer;
    templateRef;
    antdService;
    /** @internal */
    static authNotUseIfTypeGuard;
    static ngTemplateGuard_authNot;
    /**
     * 布尔表达式，将其作为显示模板的条件进行计算。
     *
     */
    set authNot(condition) {
        super.auth = condition;
    }
    /**
     * 当此条件表达式计算为 true 时要显示的模板。
     */
    set authNotThen(templateRef) {
        super.authThen = templateRef;
    }
    /**
     * 当此条件表达式计算为 false 时要显示的模板。
     */
    set authNotElse(templateRef) {
        super.authElse = templateRef;
    }
    /**
     * 是否允许渲染, 没有权限的时候渲染
     * @param hasAuth 是否有权限
     * @param value 权限码
     * @protected
     */
    canRender(hasAuth, value) {
        return !hasAuth;
    }
    constructor(_viewContainer, templateRef, antdService) {
        super(_viewContainer, templateRef, antdService);
        this._viewContainer = _viewContainer;
        this.templateRef = templateRef;
        this.antdService = antdService;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthNotDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: AuthNotDirective, selector: "[auth.not]", inputs: { authNot: ["auth.not", "authNot"], authNotThen: ["auth.notThen", "authNotThen"], authNotElse: ["auth.notElse", "authNotElse"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthNotDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[auth.not]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NzxAntdService }]; }, propDecorators: { authNot: [{
                type: Input,
                args: ['auth.not']
            }], authNotThen: [{
                type: Input,
                args: ['auth.notThen']
            }], authNotElse: [{
                type: Input,
                args: ['auth.notElse']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ub3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2RpcmVjdGl2ZS9hdXRoLm5vdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBZSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBRTlEOzs7Ozs7R0FNRztBQUlILE1BQU0sT0FBTyxnQkFBOEIsU0FBUSxhQUFhO0lBeUN6QztJQUNIO0lBQ0E7SUExQ2xCLGdCQUFnQjtJQUNoQixNQUFNLENBQUMscUJBQXFCLENBQU87SUFDbkMsTUFBTSxDQUFDLHVCQUF1QixDQUFZO0lBRTFDOzs7T0FHRztJQUNILElBQ0ksT0FBTyxDQUFDLFNBQVk7UUFDdEIsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDSSxXQUFXLENBQUMsV0FBK0M7UUFDN0QsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDSSxXQUFXLENBQUMsV0FBK0M7UUFDN0QsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ2dCLFNBQVMsQ0FBQyxPQUFnQixFQUFFLEtBQVE7UUFDckQsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNsQixDQUFDO0lBRUQsWUFDcUIsY0FBZ0MsRUFDbkMsV0FBd0MsRUFDeEMsV0FBMkI7UUFFM0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFKN0IsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQUN4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFHN0MsQ0FBQzt3R0E5Q1UsZ0JBQWdCOzRGQUFoQixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBSDVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzhKQVdLLE9BQU87c0JBRFYsS0FBSzt1QkFBQyxVQUFVO2dCQVNiLFdBQVc7c0JBRGQsS0FBSzt1QkFBQyxjQUFjO2dCQVNqQixXQUFXO3NCQURkLEtBQUs7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQnO1xyXG5pbXBvcnQgeyBBdXRoQ29udGV4dCwgQXV0aERpcmVjdGl2ZSB9IGZyb20gJy4vYXV0aC5kaXJlY3RpdmUnO1xyXG5cclxuLyoqXHJcbiAqIOadg+mZkOaMh+S7pCwg5peg5p2D6ZmQ5riy5p+T5qih5p2/LOWQpuWImea4suafk2Vsc2XmqKHmnb9cclxuICogQGV4YW1wbGVcclxuICogPGJ1dHRvbiAqYXV0aC5ub3Q9XCJbJ2NvZGUxJywgJ2NvZGUyJ107IGVsc2UgaGFzQXV0aFwiPuayoeacieacieadg+mZkOaXtuaYvuekujwvYnV0dG9uPlxyXG4gKiA8YnV0dG9uICphdXRoLm5vdD1cIidjb2RlMSc7IGVsc2UgaGFzQXV0aFwiPuayoeacieacieadg+mZkOaXtuaYvuekujwvYnV0dG9uPlxyXG4gKiA8bmctdGVtcGxhdGUgI2hhc0F1dGg+5pyJ5p2D6ZmQ5pe25pi+56S6PC9uZy10ZW1wbGF0ZT5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2F1dGgubm90XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhOb3REaXJlY3RpdmU8VCA9IHVua25vd24+IGV4dGVuZHMgQXV0aERpcmVjdGl2ZSB7XHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHN0YXRpYyBhdXRoTm90VXNlSWZUeXBlR3VhcmQ6IHZvaWQ7XHJcbiAgc3RhdGljIG5nVGVtcGxhdGVHdWFyZF9hdXRoTm90OiAnYmluZGluZyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOW4g+WwlOihqOi+vuW8j++8jOWwhuWFtuS9nOS4uuaYvuekuuaooeadv+eahOadoeS7tui/m+ihjOiuoeeul+OAglxyXG4gICAqXHJcbiAgICovXHJcbiAgQElucHV0KCdhdXRoLm5vdCcpXHJcbiAgc2V0IGF1dGhOb3QoY29uZGl0aW9uOiBUKSB7XHJcbiAgICBzdXBlci5hdXRoID0gY29uZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5b2T5q2k5p2h5Lu26KGo6L6+5byP6K6h566X5Li6IHRydWUg5pe26KaB5pi+56S655qE5qih5p2/44CCXHJcbiAgICovXHJcbiAgQElucHV0KCdhdXRoLm5vdFRoZW4nKVxyXG4gIHNldCBhdXRoTm90VGhlbih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8QXV0aENvbnRleHQ8VD4+IHwgbnVsbCkge1xyXG4gICAgc3VwZXIuYXV0aFRoZW4gPSB0ZW1wbGF0ZVJlZjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOW9k+atpOadoeS7tuihqOi+vuW8j+iuoeeul+S4uiBmYWxzZSDml7bopoHmmL7npLrnmoTmqKHmnb/jgIJcclxuICAgKi9cclxuICBASW5wdXQoJ2F1dGgubm90RWxzZScpXHJcbiAgc2V0IGF1dGhOb3RFbHNlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsKSB7XHJcbiAgICBzdXBlci5hdXRoRWxzZSA9IHRlbXBsYXRlUmVmO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5YWB6K645riy5p+TLCDmsqHmnInmnYPpmZDnmoTml7blgJnmuLLmn5NcclxuICAgKiBAcGFyYW0gaGFzQXV0aCDmmK/lkKbmnInmnYPpmZBcclxuICAgKiBAcGFyYW0gdmFsdWUg5p2D6ZmQ56CBXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBvdmVycmlkZSBjYW5SZW5kZXIoaGFzQXV0aDogYm9vbGVhbiwgdmFsdWU6IFQpIHtcclxuICAgIHJldHVybiAhaGFzQXV0aDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHVibGljIG92ZXJyaWRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4sXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihfdmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYsIGFudGRTZXJ2aWNlKTtcclxuICB9XHJcbn1cclxuIl19