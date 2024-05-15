import { Directive, Input } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
/**
 * 权限指令, 有权限渲染模板,否则渲染else模板
 * @example
 * <button *auth="['code1', 'code2']; else notAuth">有权限时显示</button>
 * <button *auth="'code1'; else notAuth">有权限时显示</button>
 * <ng-template #notAuth>没有权限时显示</ng-template>
 */
export class AuthDirective {
    _viewContainer;
    templateRef;
    antdService;
    /** @internal */
    static authUseIfTypeGuard;
    static ngTemplateGuard_auth;
    changeSubscription;
    authSubscription;
    _context = new AuthContext();
    _thenTemplateRef = null;
    _elseTemplateRef = null;
    _thenViewRef = null;
    _elseViewRef = null;
    /**
     *
     * 为 `auth` 将要渲染的模板确保正确的上下文类型。
     * 该方法用于向 Ivy 模板类型检查编译器发出信号，即 `auth` 结构化指令会使用特定的上下文类型渲染其模板。
     *
     */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    hasAuth = () => of(true);
    constructor(_viewContainer, templateRef, antdService) {
        this._viewContainer = _viewContainer;
        this.templateRef = templateRef;
        this.antdService = antdService;
        this._thenTemplateRef = templateRef;
        if (this.antdService.authChange) {
            this.changeSubscription = this.antdService.authChange().subscribe(() => this._updateView());
        }
        if (this.antdService.hasAuth) {
            this.hasAuth = this.antdService.hasAuth;
        }
    }
    /**
     * 布尔表达式，将其作为显示模板的条件进行计算。
     *
     */
    set auth(condition) {
        this._context.$implicit = this._context.auth = condition;
        this._updateView();
    }
    /**
     * 当此条件表达式计算为 true 时要显示的模板。
     */
    set authThen(templateRef) {
        assertTemplate('authThen', templateRef);
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null; // clear previous view if any.
        this._updateView();
    }
    /**
     * 当此条件表达式计算为 false 时要显示的模板。
     */
    set authElse(templateRef) {
        assertTemplate('authElse', templateRef);
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null; // clear previous view if any.
        this._updateView();
    }
    _updateView() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
            this.authSubscription = undefined;
        }
        this.authSubscription = this.hasAuth(this._context.$implicit).subscribe(auth => {
            if (this.canRender(auth, this._context.$implicit)) {
                if (!this._thenViewRef) {
                    this._viewContainer.clear();
                    this._elseViewRef = null;
                    if (this._thenTemplateRef) {
                        this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                    }
                }
            }
            else {
                if (!this._elseViewRef) {
                    this._viewContainer.clear();
                    this._thenViewRef = null;
                    if (this._elseTemplateRef) {
                        this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                    }
                }
            }
        });
    }
    /**
     * 是否允许渲染
     * @param hasAuth 是否有权限
     * @param value 权限码
     * @protected
     */
    canRender(hasAuth, value) {
        return hasAuth;
    }
    ngOnDestroy() {
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: AuthDirective, selector: "[auth]", inputs: { auth: "auth", authThen: "authThen", authElse: "authElse" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[auth]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NzxAntdService }]; }, propDecorators: { auth: [{
                type: Input
            }], authThen: [{
                type: Input
            }], authElse: [{
                type: Input
            }] } });
/**
 * @publicApi
 */
export class AuthContext {
    $implicit = null;
    auth = null;
}
function assertTemplate(property, templateRef) {
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received '${templateRef}'.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL2F1dGguZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBNEMsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7OztBQUl4Qzs7Ozs7O0dBTUc7QUFJSCxNQUFNLE9BQU8sYUFBYTtJQTZCWjtJQUNIO0lBQ0E7SUE5QlQsZ0JBQWdCO0lBQ2hCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBTztJQUNoQyxNQUFNLENBQUMsb0JBQW9CLENBQVk7SUFDdEIsa0JBQWtCLENBQWdCO0lBQzNDLGdCQUFnQixDQUFnQjtJQUU5QixRQUFRLEdBQW1CLElBQUksV0FBVyxFQUFLLENBQUM7SUFDaEQsZ0JBQWdCLEdBQXVDLElBQUksQ0FBQztJQUM1RCxnQkFBZ0IsR0FBdUMsSUFBSSxDQUFDO0lBQzVELFlBQVksR0FBMkMsSUFBSSxDQUFDO0lBQzVELFlBQVksR0FBMkMsSUFBSSxDQUFDO0lBRXRFOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLHNCQUFzQixDQUMzQixHQUFxQixFQUNyQixHQUFjO1FBRWQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVMsT0FBTyxHQUF3QyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEUsWUFDWSxjQUFnQyxFQUNuQyxXQUF3QyxFQUN4QyxXQUEyQjtRQUZ4QixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUVsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFB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QWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzt3R0F2SFUsYUFBYTs0RkFBYixhQUFhOzs0RkFBYixhQUFhO2tCQUh6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxRQUFRO2lCQUNuQjs4SkFrREssSUFBSTtzQkFEUCxLQUFLO2dCQVVGLFFBQVE7c0JBRFgsS0FBSztnQkFZRixRQUFRO3NCQURYLEtBQUs7O0FBc0RSOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFdBQVc7SUFDZixTQUFTLEdBQU0sSUFBSyxDQUFDO0lBQ3JCLElBQUksR0FBTSxJQUFLLENBQUM7Q0FDeEI7QUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFnQixFQUFFLFdBQTBDO0lBQ2xGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxRQUFRLHlDQUF5QyxXQUFXLElBQUksQ0FBQyxDQUFDO0tBQ3RGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnXHJcblxyXG4vKipcclxuICog5p2D6ZmQ5oyH5LukLCDmnInmnYPpmZDmuLLmn5PmqKHmnb8s5ZCm5YiZ5riy5p+TZWxzZeaooeadv1xyXG4gKiBAZXhhbXBsZVxyXG4gKiA8YnV0dG9uICphdXRoPVwiWydjb2RlMScsICdjb2RlMiddOyBlbHNlIG5vdEF1dGhcIj7mnInmnYPpmZDml7bmmL7npLo8L2J1dHRvbj5cclxuICogPGJ1dHRvbiAqYXV0aD1cIidjb2RlMSc7IGVsc2Ugbm90QXV0aFwiPuacieadg+mZkOaXtuaYvuekujwvYnV0dG9uPlxyXG4gKiA8bmctdGVtcGxhdGUgI25vdEF1dGg+5rKh5pyJ5p2D6ZmQ5pe25pi+56S6PC9uZy10ZW1wbGF0ZT5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2F1dGhdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aERpcmVjdGl2ZTxUID0gdW5rbm93bj4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBzdGF0aWMgYXV0aFVzZUlmVHlwZUd1YXJkOiB2b2lkO1xyXG4gIHN0YXRpYyBuZ1RlbXBsYXRlR3VhcmRfYXV0aDogJ2JpbmRpbmcnO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgYXV0aFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBBdXRoQ29udGV4dDxUPiA9IG5ldyBBdXRoQ29udGV4dDxUPigpO1xyXG4gIHByb3RlY3RlZCBfdGhlblRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX2Vsc2VUZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8QXV0aENvbnRleHQ8VD4+IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF90aGVuVmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPEF1dGhDb250ZXh0PFQ+PiB8IG51bGwgPSBudWxsO1xyXG4gIHByb3RlY3RlZCBfZWxzZVZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiDkuLogYGF1dGhgIOWwhuimgea4suafk+eahOaooeadv+ehruS/neato+ehrueahOS4iuS4i+aWh+exu+Wei+OAglxyXG4gICAqIOivpeaWueazleeUqOS6juWQkSBJdnkg5qih5p2/57G75Z6L5qOA5p+l57yW6K+R5Zmo5Y+R5Ye65L+h5Y+377yM5Y2zIGBhdXRoYCDnu5PmnoTljJbmjIfku6TkvJrkvb/nlKjnibnlrprnmoTkuIrkuIvmlofnsbvlnovmuLLmn5PlhbbmqKHmnb/jgIJcclxuICAgKlxyXG4gICAqL1xyXG4gIHN0YXRpYyBuZ1RlbXBsYXRlQ29udGV4dEd1YXJkPFQ+KFxyXG4gICAgZGlyOiBBdXRoRGlyZWN0aXZlPFQ+LFxyXG4gICAgY3R4OiBOelNhZmVBbnlcclxuICApOiBjdHggaXMgQXV0aENvbnRleHQ8RXhjbHVkZTxULCBmYWxzZSB8IDAgfCAnJyB8IG51bGwgfCB1bmRlZmluZWQ+PiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBoYXNBdXRoOiBSZXF1aXJlZDxOenhBbnRkU2VydmljZT5bJ2hhc0F1dGgnXSA9ICgpID0+IG9mKHRydWUpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8QXV0aENvbnRleHQ8VD4+LFxyXG4gICAgcHVibGljIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5fdGhlblRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XHJcblxyXG4gICAgaWYgKHRoaXMuYW50ZFNlcnZpY2UuYXV0aENoYW5nZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuYW50ZFNlcnZpY2UuYXV0aENoYW5nZSgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl91cGRhdGVWaWV3KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmFudGRTZXJ2aWNlLmhhc0F1dGgpIHtcclxuICAgICAgdGhpcy5oYXNBdXRoID0gdGhpcy5hbnRkU2VydmljZS5oYXNBdXRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5biD5bCU6KGo6L6+5byP77yM5bCG5YW25L2c5Li65pi+56S65qih5p2/55qE5p2h5Lu26L+b6KGM6K6h566X44CCXHJcbiAgICpcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBhdXRoKGNvbmRpdGlvbjogVCkge1xyXG4gICAgdGhpcy5fY29udGV4dC4kaW1wbGljaXQgPSB0aGlzLl9jb250ZXh0LmF1dGggPSBjb25kaXRpb247XHJcbiAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlvZPmraTmnaHku7booajovr7lvI/orqHnrpfkuLogdHJ1ZSDml7bopoHmmL7npLrnmoTmqKHmnb/jgIJcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBhdXRoVGhlbih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8QXV0aENvbnRleHQ8VD4+IHwgbnVsbCkge1xyXG4gICAgYXNzZXJ0VGVtcGxhdGUoJ2F1dGhUaGVuJywgdGVtcGxhdGVSZWYpO1xyXG4gICAgdGhpcy5fdGhlblRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XHJcbiAgICB0aGlzLl90aGVuVmlld1JlZiA9IG51bGw7IC8vIGNsZWFyIHByZXZpb3VzIHZpZXcgaWYgYW55LlxyXG4gICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5b2T5q2k5p2h5Lu26KGo6L6+5byP6K6h566X5Li6IGZhbHNlIOaXtuimgeaYvuekuueahOaooeadv+OAglxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGF1dGhFbHNlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsKSB7XHJcbiAgICBhc3NlcnRUZW1wbGF0ZSgnYXV0aEVsc2UnLCB0ZW1wbGF0ZVJlZik7XHJcbiAgICB0aGlzLl9lbHNlVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcclxuICAgIHRoaXMuX2Vsc2VWaWV3UmVmID0gbnVsbDsgLy8gY2xlYXIgcHJldmlvdXMgdmlldyBpZiBhbnkuXHJcbiAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3VwZGF0ZVZpZXcoKSB7XHJcbiAgICBpZiAodGhpcy5hdXRoU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuYXV0aFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmF1dGhTdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dGhTdWJzY3JpcHRpb24gPSB0aGlzLmhhc0F1dGgodGhpcy5fY29udGV4dC4kaW1wbGljaXQpLnN1YnNjcmliZShhdXRoID0+IHtcclxuICAgICAgaWYgKHRoaXMuY2FuUmVuZGVyKGF1dGgsIHRoaXMuX2NvbnRleHQuJGltcGxpY2l0KSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdGhlblZpZXdSZWYpIHtcclxuICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuX2Vsc2VWaWV3UmVmID0gbnVsbDtcclxuICAgICAgICAgIGlmICh0aGlzLl90aGVuVGVtcGxhdGVSZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGhlblZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90aGVuVGVtcGxhdGVSZWYsIHRoaXMuX2NvbnRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2Vsc2VWaWV3UmVmKSB7XHJcbiAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICAgICAgICB0aGlzLl90aGVuVmlld1JlZiA9IG51bGw7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZWxzZVRlbXBsYXRlUmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vsc2VWaWV3UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fZWxzZVRlbXBsYXRlUmVmLCB0aGlzLl9jb250ZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5YWB6K645riy5p+TXHJcbiAgICogQHBhcmFtIGhhc0F1dGgg5piv5ZCm5pyJ5p2D6ZmQXHJcbiAgICogQHBhcmFtIHZhbHVlIOadg+mZkOeggVxyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY2FuUmVuZGVyKGhhc0F1dGg6IGJvb2xlYW4sIHZhbHVlOiBUKSB7XHJcbiAgICByZXR1cm4gaGFzQXV0aDtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5hdXRoU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuYXV0aFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdXRoQ29udGV4dDxUID0gdW5rbm93bj4ge1xyXG4gIHB1YmxpYyAkaW1wbGljaXQ6IFQgPSBudWxsITtcclxuICBwdWJsaWMgYXV0aDogVCA9IG51bGwhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NlcnRUZW1wbGF0ZShwcm9wZXJ0eTogc3RyaW5nLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwpOiB2b2lkIHtcclxuICBjb25zdCBpc1RlbXBsYXRlUmVmT3JOdWxsID0gISEoIXRlbXBsYXRlUmVmIHx8IHRlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyk7XHJcbiAgaWYgKCFpc1RlbXBsYXRlUmVmT3JOdWxsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cHJvcGVydHl9IG11c3QgYmUgYSBUZW1wbGF0ZVJlZiwgYnV0IHJlY2VpdmVkICcke3RlbXBsYXRlUmVmfScuYCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==