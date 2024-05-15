import { EmbeddedViewRef, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 权限指令, 有权限渲染模板,否则渲染else模板
 * @example
 * <button *auth="['code1', 'code2']; else notAuth">有权限时显示</button>
 * <button *auth="'code1'; else notAuth">有权限时显示</button>
 * <ng-template #notAuth>没有权限时显示</ng-template>
 */
export declare class AuthDirective<T = unknown> implements OnDestroy {
    protected _viewContainer: ViewContainerRef;
    templateRef: TemplateRef<AuthContext<T>>;
    antdService: NzxAntdService;
    /** @internal */
    static authUseIfTypeGuard: void;
    static ngTemplateGuard_auth: 'binding';
    private readonly changeSubscription?;
    private authSubscription?;
    protected _context: AuthContext<T>;
    protected _thenTemplateRef: TemplateRef<AuthContext<T>> | null;
    protected _elseTemplateRef: TemplateRef<AuthContext<T>> | null;
    protected _thenViewRef: EmbeddedViewRef<AuthContext<T>> | null;
    protected _elseViewRef: EmbeddedViewRef<AuthContext<T>> | null;
    /**
     *
     * 为 `auth` 将要渲染的模板确保正确的上下文类型。
     * 该方法用于向 Ivy 模板类型检查编译器发出信号，即 `auth` 结构化指令会使用特定的上下文类型渲染其模板。
     *
     */
    static ngTemplateContextGuard<T>(dir: AuthDirective<T>, ctx: NzSafeAny): ctx is AuthContext<Exclude<T, false | 0 | '' | null | undefined>>;
    protected hasAuth: Required<NzxAntdService>['hasAuth'];
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<AuthContext<T>>, antdService: NzxAntdService);
    /**
     * 布尔表达式，将其作为显示模板的条件进行计算。
     *
     */
    set auth(condition: T);
    /**
     * 当此条件表达式计算为 true 时要显示的模板。
     */
    set authThen(templateRef: TemplateRef<AuthContext<T>> | null);
    /**
     * 当此条件表达式计算为 false 时要显示的模板。
     */
    set authElse(templateRef: TemplateRef<AuthContext<T>> | null);
    protected _updateView(): void;
    /**
     * 是否允许渲染
     * @param hasAuth 是否有权限
     * @param value 权限码
     * @protected
     */
    protected canRender(hasAuth: boolean, value: T): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AuthDirective<any>, "[auth]", never, { "auth": { "alias": "auth"; "required": false; }; "authThen": { "alias": "authThen"; "required": false; }; "authElse": { "alias": "authElse"; "required": false; }; }, {}, never, never, false, never>;
}
/**
 * @publicApi
 */
export declare class AuthContext<T = unknown> {
    $implicit: T;
    auth: T;
}
