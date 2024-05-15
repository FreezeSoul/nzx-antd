import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import { AuthContext, AuthDirective } from './auth.directive';
import * as i0 from "@angular/core";
/**
 * 权限指令, 无权限渲染模板,否则渲染else模板
 * @example
 * <button *auth.not="['code1', 'code2']; else hasAuth">没有有权限时显示</button>
 * <button *auth.not="'code1'; else hasAuth">没有有权限时显示</button>
 * <ng-template #hasAuth>有权限时显示</ng-template>
 */
export declare class AuthNotDirective<T = unknown> extends AuthDirective {
    protected _viewContainer: ViewContainerRef;
    templateRef: TemplateRef<AuthContext<T>>;
    antdService: NzxAntdService;
    /** @internal */
    static authNotUseIfTypeGuard: void;
    static ngTemplateGuard_authNot: 'binding';
    /**
     * 布尔表达式，将其作为显示模板的条件进行计算。
     *
     */
    set authNot(condition: T);
    /**
     * 当此条件表达式计算为 true 时要显示的模板。
     */
    set authNotThen(templateRef: TemplateRef<AuthContext<T>> | null);
    /**
     * 当此条件表达式计算为 false 时要显示的模板。
     */
    set authNotElse(templateRef: TemplateRef<AuthContext<T>> | null);
    /**
     * 是否允许渲染, 没有权限的时候渲染
     * @param hasAuth 是否有权限
     * @param value 权限码
     * @protected
     */
    protected canRender(hasAuth: boolean, value: T): boolean;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<AuthContext<T>>, antdService: NzxAntdService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthNotDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AuthNotDirective<any>, "[auth.not]", never, { "authNot": { "alias": "auth.not"; "required": false; }; "authNotThen": { "alias": "auth.notThen"; "required": false; }; "authNotElse": { "alias": "auth.notElse"; "required": false; }; }, {}, never, never, false, never>;
}
