import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
import * as i2 from "@angular/router";
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
export class NzxAuthGuardService {
    antdService;
    router;
    injector;
    hasAuth = () => of(true);
    constructor(antdService, router, injector) {
        this.antdService = antdService;
        this.router = router;
        this.injector = injector;
        if (this.antdService.hasAuth) {
            this.hasAuth = this.antdService.hasAuth;
        }
    }
    process(data) {
        const guard = data.guard;
        if (NzxUtils.isFunction(guard)) {
            return guard(this.router, this.injector, this.antdService);
        }
        return this.hasAuth(guard.auth).pipe(tap(auth => {
            const url = guard.noAuthUrl || this.antdService.noAuthUrl;
            if (!auth && url) {
                this.router.navigateByUrl(url);
            }
        }));
    }
    // lazy loading
    canLoad(route) {
        return this.process(route.data);
    }
    // all children route
    canActivateChild(childRoute, state) {
        return this.canActivate(childRoute, state);
    }
    // route
    canActivate(route, _state) {
        return this.process(route.data);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAuthGuardService, deps: [{ token: i1.NzxAntdService }, { token: i2.Router }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAuthGuardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAuthGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }, { type: i2.Router }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NlcnZpY2UvYXV0aC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFckQsT0FBTyxFQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBSXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFHVjtJQUFxQztJQUF3QjtJQUZ2RSxPQUFPLEdBQXdDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4RSxZQUFvQixXQUEyQixFQUFVLE1BQWMsRUFBVSxRQUFrQjtRQUEvRSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNqRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRU8sT0FBTyxDQUFDLElBQVU7UUFDeEIsTUFBTSxLQUFLLEdBQWtCLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFeEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7SUFDZixPQUFPLENBQUMsS0FBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQkFBcUI7SUFDckIsZ0JBQWdCLENBQUMsVUFBa0MsRUFBRSxLQUEwQjtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxRQUFRO0lBQ1IsV0FBVyxDQUFDLEtBQTZCLEVBQUUsTUFBa0M7UUFDM0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO3dHQXZDVSxtQkFBbUI7NEdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzs0RkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgRGF0YSwgUm91dGUsIFJvdXRlciwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0YXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZC91dGlsJztcclxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcclxuaW1wb3J0IHsgTnp4QW50ZFNlcnZpY2UgfSBmcm9tICdAZnJlZXplc291bC9uengtYW50ZCc7XHJcblxyXG4vKipcclxuICog5p2D6ZmQ6Lev55Sx5a6I5Y2r5pyN5YqhLCDlhbfkvZPmlbDmja7moLzlvI8s55SxTnp4QW50ZFNlcnZpY2UuaGFzQXV0aOWGs+WumuWkhOeQhlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICoge1xyXG4gKiAgICBwYXRoOiAneHh4JyxcclxuICogICAgY2FuQWN0aXZhdGU6IFsgTnp4QXV0aEd1YXJkU2VydmljZSBdLFxyXG4gKiAgICBkYXRhOiB7IGd1YXJkOiAndXNlcjEnLCBub0F1dGhVcmw6ICcvbm8tcGVybWlzc2Vpb24nIH1cclxuICogfSxcclxuICoge1xyXG4gKiAgICBwYXRoOiAneHh4JyxcclxuICogICAgY2FuQWN0aXZhdGU6IFsgTnp4QXV0aEd1YXJkU2VydmljZSBdLFxyXG4gKiAgICBkYXRhOiB7IGd1YXJkOiB7IGF1dGg6IFsndXNlcjEnLCAndXNlcjInXSwgbm9BdXRoVXJsOiAnL25vLXBlcm1pc3NlaW9uJ30gfX1cclxuICogfSxcclxuICoge1xyXG4gKiAgICBwYXRoOiAneXl5JyxcclxuICogICAgY2FuQWN0aXZhdGU6IFsgTnp4QXV0aEd1YXJkU2VydmljZSBdLFxyXG4gKiAgICBkYXRhOiB7IGd1YXJkOiAoKHJvdXRlciwgaW5qZWN0b3IsIGFudGRTZXJ2aWNlKSA9PiBvZih0cnVlKSkgYXMgQXV0aEd1YXJkVHlwZSwgbm9BdXRoVXJsOiAnL25vLXBlcm1pc3NlaW9uJyB9XHJcbiAqIH1cclxuICogXTtcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE56eEF1dGhHdWFyZFNlcnZpY2UgIHtcclxuICBwcm90ZWN0ZWQgaGFzQXV0aDogUmVxdWlyZWQ8Tnp4QW50ZFNlcnZpY2U+WydoYXNBdXRoJ10gPSAoKSA9PiBvZih0cnVlKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XHJcbiAgICBpZiAodGhpcy5hbnRkU2VydmljZS5oYXNBdXRoKSB7XHJcbiAgICAgIHRoaXMuaGFzQXV0aCA9IHRoaXMuYW50ZFNlcnZpY2UuaGFzQXV0aDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJvY2VzcyhkYXRhOiBEYXRhKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCBndWFyZDogQXV0aEd1YXJkVHlwZSA9IGRhdGEuZ3VhcmQ7XHJcblxyXG4gICAgaWYgKE56eFV0aWxzLmlzRnVuY3Rpb24oZ3VhcmQpKSB7XHJcbiAgICAgIHJldHVybiBndWFyZCh0aGlzLnJvdXRlciwgdGhpcy5pbmplY3RvciwgdGhpcy5hbnRkU2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaGFzQXV0aChndWFyZC5hdXRoKS5waXBlKFxyXG4gICAgICB0YXAoYXV0aCA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gZ3VhcmQubm9BdXRoVXJsIHx8IHRoaXMuYW50ZFNlcnZpY2Uubm9BdXRoVXJsO1xyXG4gICAgICAgIGlmICghYXV0aCAmJiB1cmwpIHtcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gbGF6eSBsb2FkaW5nXHJcbiAgY2FuTG9hZChyb3V0ZTogUm91dGUpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLnByb2Nlc3Mocm91dGUuZGF0YSEpO1xyXG4gIH1cclxuXHJcbiAgLy8gYWxsIGNoaWxkcmVuIHJvdXRlXHJcbiAgY2FuQWN0aXZhdGVDaGlsZChjaGlsZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUoY2hpbGRSb3V0ZSwgc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gcm91dGVcclxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgX3N0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90IHwgbnVsbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzcyhyb3V0ZS5kYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmnYPpmZDot6/nlLHlrojljasg5L2/55So5Ye95pWw5aSE55CGXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBBdXRoR3VhcmRGblR5cGUgPSAocm91dGVyOiBSb3V0ZXIsIGluamVjdG9yOiBJbmplY3RvciwgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlKSA9PiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4vKipcclxuICog5p2D6ZmQ6Lev55Sx5a6I5Y2r6YWN572uXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBBdXRoR3VhcmRUeXBlPFQgPSBOelNhZmVBbnk+ID0gQXV0aEd1YXJkRm5UeXBlIHwgVDtcclxuIl19