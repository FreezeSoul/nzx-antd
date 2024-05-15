import { Directive, Input } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL2F1dGguZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBNEMsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7OztBQUl4Qzs7Ozs7O0dBTUc7QUFJSCxNQUFNLE9BQU8sYUFBYTtJQTZCWjtJQUNIO0lBQ0E7SUE5QlQsZ0JBQWdCO0lBQ2hCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBTztJQUNoQyxNQUFNLENBQUMsb0JBQW9CLENBQVk7SUFDdEIsa0JBQWtCLENBQWdCO0lBQzNDLGdCQUFnQixDQUFnQjtJQUU5QixRQUFRLEdBQW1CLElBQUksV0FBVyxFQUFLLENBQUM7SUFDaEQsZ0JBQWdCLEdBQXVDLElBQUksQ0FBQztJQUM1RCxnQkFBZ0IsR0FBdUMsSUFBSSxDQUFDO0lBQzVELFlBQVksR0FBMkMsSUFBSSxDQUFDO0lBQzVELFlBQVksR0FBMkMsSUFBSSxDQUFDO0lBRXRFOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLHNCQUFzQixDQUMzQixHQUFxQixFQUNyQixHQUFjO1FBRWQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVMsT0FBTyxHQUF3QyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEUsWUFDWSxjQUFnQyxFQUNuQyxXQUF3QyxFQUN4QyxXQUEyQjtRQUZ4QixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUVsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFB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QWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzt3R0F2SFUsYUFBYTs0RkFBYixhQUFhOzs0RkFBYixhQUFhO2tCQUh6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxRQUFRO2lCQUNuQjs4SkFrREssSUFBSTtzQkFEUCxLQUFLO2dCQVVGLFFBQVE7c0JBRFgsS0FBSztnQkFZRixRQUFRO3NCQURYLEtBQUs7O0FBc0RSOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFdBQVc7SUFDZixTQUFTLEdBQU0sSUFBSyxDQUFDO0lBQ3JCLElBQUksR0FBTSxJQUFLLENBQUM7Q0FDeEI7QUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFnQixFQUFFLFdBQTBDO0lBQ2xGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxRQUFRLHlDQUF5QyxXQUFXLElBQUksQ0FBQyxDQUFDO0tBQ3RGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZCc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcydcclxuXHJcbi8qKlxyXG4gKiDmnYPpmZDmjIfku6QsIOacieadg+mZkOa4suafk+aooeadvyzlkKbliJnmuLLmn5NlbHNl5qih5p2/XHJcbiAqIEBleGFtcGxlXHJcbiAqIDxidXR0b24gKmF1dGg9XCJbJ2NvZGUxJywgJ2NvZGUyJ107IGVsc2Ugbm90QXV0aFwiPuacieadg+mZkOaXtuaYvuekujwvYnV0dG9uPlxyXG4gKiA8YnV0dG9uICphdXRoPVwiJ2NvZGUxJzsgZWxzZSBub3RBdXRoXCI+5pyJ5p2D6ZmQ5pe25pi+56S6PC9idXR0b24+XHJcbiAqIDxuZy10ZW1wbGF0ZSAjbm90QXV0aD7msqHmnInmnYPpmZDml7bmmL7npLo8L25nLXRlbXBsYXRlPlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXV0aF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoRGlyZWN0aXZlPFQgPSB1bmtub3duPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHN0YXRpYyBhdXRoVXNlSWZUeXBlR3VhcmQ6IHZvaWQ7XHJcbiAgc3RhdGljIG5nVGVtcGxhdGVHdWFyZF9hdXRoOiAnYmluZGluZyc7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBhdXRoU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IEF1dGhDb250ZXh0PFQ+ID0gbmV3IEF1dGhDb250ZXh0PFQ+KCk7XHJcbiAgcHJvdGVjdGVkIF90aGVuVGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEF1dGhDb250ZXh0PFQ+PiB8IG51bGwgPSBudWxsO1xyXG4gIHByb3RlY3RlZCBfZWxzZVRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX3RoZW5WaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8QXV0aENvbnRleHQ8VD4+IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9lbHNlVmlld1JlZjogRW1iZWRkZWRWaWV3UmVmPEF1dGhDb250ZXh0PFQ+PiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIOS4uiBgYXV0aGAg5bCG6KaB5riy5p+T55qE5qih5p2/56Gu5L+d5q2j56Gu55qE5LiK5LiL5paH57G75Z6L44CCXHJcbiAgICog6K+l5pa55rOV55So5LqO5ZCRIEl2eSDmqKHmnb/nsbvlnovmo4Dmn6XnvJbor5Hlmajlj5Hlh7rkv6Hlj7fvvIzljbMgYGF1dGhgIOe7k+aehOWMluaMh+S7pOS8muS9v+eUqOeJueWumueahOS4iuS4i+aWh+exu+Wei+a4suafk+WFtuaooeadv+OAglxyXG4gICAqXHJcbiAgICovXHJcbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VD4oXHJcbiAgICBkaXI6IEF1dGhEaXJlY3RpdmU8VD4sXHJcbiAgICBjdHg6IE56U2FmZUFueVxyXG4gICk6IGN0eCBpcyBBdXRoQ29udGV4dDxFeGNsdWRlPFQsIGZhbHNlIHwgMCB8ICcnIHwgbnVsbCB8IHVuZGVmaW5lZD4+IHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhc0F1dGg6IFJlcXVpcmVkPE56eEFudGRTZXJ2aWNlPlsnaGFzQXV0aCddID0gKCkgPT4gb2YodHJ1ZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4sXHJcbiAgICBwdWJsaWMgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLl90aGVuVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcclxuXHJcbiAgICBpZiAodGhpcy5hbnRkU2VydmljZS5hdXRoQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5hbnRkU2VydmljZS5hdXRoQ2hhbmdlKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3VwZGF0ZVZpZXcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYW50ZFNlcnZpY2UuaGFzQXV0aCkge1xyXG4gICAgICB0aGlzLmhhc0F1dGggPSB0aGlzLmFudGRTZXJ2aWNlLmhhc0F1dGg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDluIPlsJTooajovr7lvI/vvIzlsIblhbbkvZzkuLrmmL7npLrmqKHmnb/nmoTmnaHku7bov5vooYzorqHnrpfjgIJcclxuICAgKlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGF1dGgoY29uZGl0aW9uOiBUKSB7XHJcbiAgICB0aGlzLl9jb250ZXh0LiRpbXBsaWNpdCA9IHRoaXMuX2NvbnRleHQuYXV0aCA9IGNvbmRpdGlvbjtcclxuICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOW9k+atpOadoeS7tuihqOi+vuW8j+iuoeeul+S4uiB0cnVlIOaXtuimgeaYvuekuueahOaooeadv+OAglxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGF1dGhUaGVuKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxBdXRoQ29udGV4dDxUPj4gfCBudWxsKSB7XHJcbiAgICBhc3NlcnRUZW1wbGF0ZSgnYXV0aFRoZW4nLCB0ZW1wbGF0ZVJlZik7XHJcbiAgICB0aGlzLl90aGVuVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcclxuICAgIHRoaXMuX3RoZW5WaWV3UmVmID0gbnVsbDsgLy8gY2xlYXIgcHJldmlvdXMgdmlldyBpZiBhbnkuXHJcbiAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlvZPmraTmnaHku7booajovr7lvI/orqHnrpfkuLogZmFsc2Ug5pe26KaB5pi+56S655qE5qih5p2/44CCXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgYXV0aEVsc2UodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEF1dGhDb250ZXh0PFQ+PiB8IG51bGwpIHtcclxuICAgIGFzc2VydFRlbXBsYXRlKCdhdXRoRWxzZScsIHRlbXBsYXRlUmVmKTtcclxuICAgIHRoaXMuX2Vsc2VUZW1wbGF0ZVJlZiA9IHRlbXBsYXRlUmVmO1xyXG4gICAgdGhpcy5fZWxzZVZpZXdSZWYgPSBudWxsOyAvLyBjbGVhciBwcmV2aW91cyB2aWV3IGlmIGFueS5cclxuICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdXBkYXRlVmlldygpIHtcclxuICAgIGlmICh0aGlzLmF1dGhTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5hdXRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuYXV0aFN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0aFN1YnNjcmlwdGlvbiA9IHRoaXMuaGFzQXV0aCh0aGlzLl9jb250ZXh0LiRpbXBsaWNpdCkuc3Vic2NyaWJlKGF1dGggPT4ge1xyXG4gICAgICBpZiAodGhpcy5jYW5SZW5kZXIoYXV0aCwgdGhpcy5fY29udGV4dC4kaW1wbGljaXQpKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90aGVuVmlld1JlZikge1xyXG4gICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICAgICAgdGhpcy5fZWxzZVZpZXdSZWYgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHRoaXMuX3RoZW5UZW1wbGF0ZVJlZikge1xyXG4gICAgICAgICAgICB0aGlzLl90aGVuVmlld1JlZiA9IHRoaXMuX3ZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RoZW5UZW1wbGF0ZVJlZiwgdGhpcy5fY29udGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdGhpcy5fZWxzZVZpZXdSZWYpIHtcclxuICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuX3RoZW5WaWV3UmVmID0gbnVsbDtcclxuICAgICAgICAgIGlmICh0aGlzLl9lbHNlVGVtcGxhdGVSZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWxzZVZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl9lbHNlVGVtcGxhdGVSZWYsIHRoaXMuX2NvbnRleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmmK/lkKblhYHorrjmuLLmn5NcclxuICAgKiBAcGFyYW0gaGFzQXV0aCDmmK/lkKbmnInmnYPpmZBcclxuICAgKiBAcGFyYW0gdmFsdWUg5p2D6ZmQ56CBXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBjYW5SZW5kZXIoaGFzQXV0aDogYm9vbGVhbiwgdmFsdWU6IFQpIHtcclxuICAgIHJldHVybiBoYXNBdXRoO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5jaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmF1dGhTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5hdXRoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhDb250ZXh0PFQgPSB1bmtub3duPiB7XHJcbiAgcHVibGljICRpbXBsaWNpdDogVCA9IG51bGwhO1xyXG4gIHB1YmxpYyBhdXRoOiBUID0gbnVsbCE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2VydFRlbXBsYXRlKHByb3BlcnR5OiBzdHJpbmcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCk6IHZvaWQge1xyXG4gIGNvbnN0IGlzVGVtcGxhdGVSZWZPck51bGwgPSAhISghdGVtcGxhdGVSZWYgfHwgdGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KTtcclxuICBpZiAoIWlzVGVtcGxhdGVSZWZPck51bGwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgJHtwcm9wZXJ0eX0gbXVzdCBiZSBhIFRlbXBsYXRlUmVmLCBidXQgcmVjZWl2ZWQgJyR7dGVtcGxhdGVSZWZ9Jy5gKTtcclxuICB9XHJcbn1cclxuIl19