import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
/**
 * 权限路由守卫服务, 具体数据格式,由NzxAntdService.hasAuth决定处理
 * @example
 * const routes: Routes = [
 * {
 *    path: 'xxx',
 *    canActivate: [ NzxAuthGuardService ],
 *    data: { guard: 'user1', noAuthUrl: '/no-permisseion' }
 * },
 * {
 *    path: 'xxx',
 *    canActivate: [ NzxAuthGuardService ],
 *    data: { guard: { auth: ['user1', 'user2'], noAuthUrl: '/no-permisseion'} }}
 * },
 * {
 *    path: 'yyy',
 *    canActivate: [ NzxAuthGuardService ],
 *    data: { guard: ((router, injector, antdService) => of(true)) as AuthGuardType, noAuthUrl: '/no-permisseion' }
 * }
 * ];
 */
export declare class NzxAuthGuardService {
    private antdService;
    private router;
    private injector;
    protected hasAuth: Required<NzxAntdService>['hasAuth'];
    constructor(antdService: NzxAntdService, router: Router, injector: Injector);
    private process;
    canLoad(route: Route): Observable<boolean>;
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot | null): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxAuthGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzxAuthGuardService>;
}
/**
 * 权限路由守卫 使用函数处理
 */
export type AuthGuardFnType = (router: Router, injector: Injector, antdService: NzxAntdService) => Observable<boolean>;
/**
 * 权限路由守卫配置
 */
export type AuthGuardType<T = NzSafeAny> = AuthGuardFnType | T;
