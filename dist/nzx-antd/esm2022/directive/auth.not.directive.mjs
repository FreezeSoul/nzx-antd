import { Directive, Input } from '@angular/core';
import { AuthDirective } from './auth.directive';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ub3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2RpcmVjdGl2ZS9hdXRoLm5vdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBZSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBRTlEOzs7Ozs7R0FNRztBQUlILE1BQU0sT0FBTyxnQkFBOEIsU0FBUSxhQUFhO0lBeUN6QztJQUNIO0lBQ0E7SUExQ2xCLGdCQUFnQjtJQUNoQixNQUFNLENBQUMscUJBQXFCLENBQU87SUFDbkMsTUFBTSxDQUFDLHVCQUF1QixDQUFZO0lBRTFDOzs7T0FHRztJQUNILElBQ0ksT0FBTyxDQUFDLFNBQVk7UUFDdEIsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDSSxXQUFXLENBQUMsV0FBK0M7UUFDN0QsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDSSxXQUFXLENBQUMsV0FBK0M7UUFDN0QsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ2dCLFNBQVMsQ0FBQyxPQUFnQixFQUFFLEtBQVE7UUFDckQsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNsQixDQUFDO0lBRUQsWUFDcUIsY0FBZ0MsRUFDbkMsV0FBd0MsRUFDeEMsV0FBMkI7UUFFM0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFKN0IsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQUN4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFHN0MsQ0FBQzt3R0E5Q1UsZ0JBQWdCOzRGQUFoQixnQkFBZ0I7OzRGQUFoQixnQkFBZ0I7a0JBSDVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzhKQVdLLE9BQU87c0JBRFYsS0FBSzt1QkFBQyxVQUFVO2dCQVNiLFdBQVc7c0JBRGQsS0FBSzt1QkFBQyxjQUFjO2dCQVNqQixXQUFXO3NCQURkLEtBQUs7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZCc7XHJcbmltcG9ydCB7IEF1dGhDb250ZXh0LCBBdXRoRGlyZWN0aXZlIH0gZnJvbSAnLi9hdXRoLmRpcmVjdGl2ZSc7XHJcblxyXG4vKipcclxuICog5p2D6ZmQ5oyH5LukLCDml6DmnYPpmZDmuLLmn5PmqKHmnb8s5ZCm5YiZ5riy5p+TZWxzZeaooeadv1xyXG4gKiBAZXhhbXBsZVxyXG4gKiA8YnV0dG9uICphdXRoLm5vdD1cIlsnY29kZTEnLCAnY29kZTInXTsgZWxzZSBoYXNBdXRoXCI+5rKh5pyJ5pyJ5p2D6ZmQ5pe25pi+56S6PC9idXR0b24+XHJcbiAqIDxidXR0b24gKmF1dGgubm90PVwiJ2NvZGUxJzsgZWxzZSBoYXNBdXRoXCI+5rKh5pyJ5pyJ5p2D6ZmQ5pe25pi+56S6PC9idXR0b24+XHJcbiAqIDxuZy10ZW1wbGF0ZSAjaGFzQXV0aD7mnInmnYPpmZDml7bmmL7npLo8L25nLXRlbXBsYXRlPlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXV0aC5ub3RdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aE5vdERpcmVjdGl2ZTxUID0gdW5rbm93bj4gZXh0ZW5kcyBBdXRoRGlyZWN0aXZlIHtcclxuICAvKiogQGludGVybmFsICovXHJcbiAgc3RhdGljIGF1dGhOb3RVc2VJZlR5cGVHdWFyZDogdm9pZDtcclxuICBzdGF0aWMgbmdUZW1wbGF0ZUd1YXJkX2F1dGhOb3Q6ICdiaW5kaW5nJztcclxuXHJcbiAgLyoqXHJcbiAgICog5biD5bCU6KGo6L6+5byP77yM5bCG5YW25L2c5Li65pi+56S65qih5p2/55qE5p2h5Lu26L+b6KGM6K6h566X44CCXHJcbiAgICpcclxuICAgKi9cclxuICBASW5wdXQoJ2F1dGgubm90JylcclxuICBzZXQgYXV0aE5vdChjb25kaXRpb246IFQpIHtcclxuICAgIHN1cGVyLmF1dGggPSBjb25kaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlvZPmraTmnaHku7booajovr7lvI/orqHnrpfkuLogdHJ1ZSDml7bopoHmmL7npLrnmoTmqKHmnb/jgIJcclxuICAgKi9cclxuICBASW5wdXQoJ2F1dGgubm90VGhlbicpXHJcbiAgc2V0IGF1dGhOb3RUaGVuKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsKSB7XHJcbiAgICBzdXBlci5hdXRoVGhlbiA9IHRlbXBsYXRlUmVmO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5b2T5q2k5p2h5Lu26KGo6L6+5byP6K6h566X5Li6IGZhbHNlIOaXtuimgeaYvuekuueahOaooeadv+OAglxyXG4gICAqL1xyXG4gIEBJbnB1dCgnYXV0aC5ub3RFbHNlJylcclxuICBzZXQgYXV0aE5vdEVsc2UodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEF1dGhDb250ZXh0PFQ+PiB8IG51bGwpIHtcclxuICAgIHN1cGVyLmF1dGhFbHNlID0gdGVtcGxhdGVSZWY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKblhYHorrjmuLLmn5MsIOayoeacieadg+mZkOeahOaXtuWAmea4suafk1xyXG4gICAqIEBwYXJhbSBoYXNBdXRoIOaYr+WQpuacieadg+mZkFxyXG4gICAqIEBwYXJhbSB2YWx1ZSDmnYPpmZDnoIFcclxuICAgKiBAcHJvdGVjdGVkXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNhblJlbmRlcihoYXNBdXRoOiBib29sZWFuLCB2YWx1ZTogVCkge1xyXG4gICAgcmV0dXJuICFoYXNBdXRoO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEF1dGhDb250ZXh0PFQ+PixcclxuICAgIHB1YmxpYyBvdmVycmlkZSBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKF92aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZVJlZiwgYW50ZFNlcnZpY2UpO1xyXG4gIH1cclxufVxyXG4iXX0=