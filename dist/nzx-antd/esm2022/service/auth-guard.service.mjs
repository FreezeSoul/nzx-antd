import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { NzxUtils } from '@xmagic/nzx-antd/util';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NlcnZpY2UvYXV0aC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFckQsT0FBTyxFQUFjLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBSWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFHVjtJQUFxQztJQUF3QjtJQUZ2RSxPQUFPLEdBQXdDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4RSxZQUFvQixXQUEyQixFQUFVLE1BQWMsRUFBVSxRQUFrQjtRQUEvRSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNqRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRU8sT0FBTyxDQUFDLElBQVU7UUFDeEIsTUFBTSxLQUFLLEdBQWtCLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFeEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7SUFDZixPQUFPLENBQUMsS0FBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQkFBcUI7SUFDckIsZ0JBQWdCLENBQUMsVUFBa0MsRUFBRSxLQUEwQjtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxRQUFRO0lBQ1IsV0FBVyxDQUFDLEtBQTZCLEVBQUUsTUFBa0M7UUFDM0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO3dHQXZDVSxtQkFBbUI7NEdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzs0RkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgRGF0YSwgUm91dGUsIFJvdXRlciwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0YXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTnp4VXRpbHMgfSBmcm9tICdAeG1hZ2ljL256eC1hbnRkL3V0aWwnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBOenhBbnRkU2VydmljZSB9IGZyb20gJ0B4bWFnaWMvbnp4LWFudGQnO1xyXG5cclxuLyoqXHJcbiAqIOadg+mZkOi3r+eUseWuiOWNq+acjeWKoSwg5YW35L2T5pWw5o2u5qC85byPLOeUsU56eEFudGRTZXJ2aWNlLmhhc0F1dGjlhrPlrprlpITnkIZcclxuICogQGV4YW1wbGVcclxuICogY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAqIHtcclxuICogICAgcGF0aDogJ3h4eCcsXHJcbiAqICAgIGNhbkFjdGl2YXRlOiBbIE56eEF1dGhHdWFyZFNlcnZpY2UgXSxcclxuICogICAgZGF0YTogeyBndWFyZDogJ3VzZXIxJywgbm9BdXRoVXJsOiAnL25vLXBlcm1pc3NlaW9uJyB9XHJcbiAqIH0sXHJcbiAqIHtcclxuICogICAgcGF0aDogJ3h4eCcsXHJcbiAqICAgIGNhbkFjdGl2YXRlOiBbIE56eEF1dGhHdWFyZFNlcnZpY2UgXSxcclxuICogICAgZGF0YTogeyBndWFyZDogeyBhdXRoOiBbJ3VzZXIxJywgJ3VzZXIyJ10sIG5vQXV0aFVybDogJy9uby1wZXJtaXNzZWlvbid9IH19XHJcbiAqIH0sXHJcbiAqIHtcclxuICogICAgcGF0aDogJ3l5eScsXHJcbiAqICAgIGNhbkFjdGl2YXRlOiBbIE56eEF1dGhHdWFyZFNlcnZpY2UgXSxcclxuICogICAgZGF0YTogeyBndWFyZDogKChyb3V0ZXIsIGluamVjdG9yLCBhbnRkU2VydmljZSkgPT4gb2YodHJ1ZSkpIGFzIEF1dGhHdWFyZFR5cGUsIG5vQXV0aFVybDogJy9uby1wZXJtaXNzZWlvbicgfVxyXG4gKiB9XHJcbiAqIF07XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOenhBdXRoR3VhcmRTZXJ2aWNlICB7XHJcbiAgcHJvdGVjdGVkIGhhc0F1dGg6IFJlcXVpcmVkPE56eEFudGRTZXJ2aWNlPlsnaGFzQXV0aCddID0gKCkgPT4gb2YodHJ1ZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xyXG4gICAgaWYgKHRoaXMuYW50ZFNlcnZpY2UuaGFzQXV0aCkge1xyXG4gICAgICB0aGlzLmhhc0F1dGggPSB0aGlzLmFudGRTZXJ2aWNlLmhhc0F1dGg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByb2Nlc3MoZGF0YTogRGF0YSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgZ3VhcmQ6IEF1dGhHdWFyZFR5cGUgPSBkYXRhLmd1YXJkO1xyXG5cclxuICAgIGlmIChOenhVdGlscy5pc0Z1bmN0aW9uKGd1YXJkKSkge1xyXG4gICAgICByZXR1cm4gZ3VhcmQodGhpcy5yb3V0ZXIsIHRoaXMuaW5qZWN0b3IsIHRoaXMuYW50ZFNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmhhc0F1dGgoZ3VhcmQuYXV0aCkucGlwZShcclxuICAgICAgdGFwKGF1dGggPT4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGd1YXJkLm5vQXV0aFVybCB8fCB0aGlzLmFudGRTZXJ2aWNlLm5vQXV0aFVybDtcclxuICAgICAgICBpZiAoIWF1dGggJiYgdXJsKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGxhenkgbG9hZGluZ1xyXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKHJvdXRlLmRhdGEhKTtcclxuICB9XHJcblxyXG4gIC8vIGFsbCBjaGlsZHJlbiByb3V0ZVxyXG4gIGNhbkFjdGl2YXRlQ2hpbGQoY2hpbGRSb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLmNhbkFjdGl2YXRlKGNoaWxkUm91dGUsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8vIHJvdXRlXHJcbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIF9zdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCB8IG51bGwpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLnByb2Nlc3Mocm91dGUuZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog5p2D6ZmQ6Lev55Sx5a6I5Y2rIOS9v+eUqOWHveaVsOWkhOeQhlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQXV0aEd1YXJkRm5UeXBlID0gKHJvdXRlcjogUm91dGVyLCBpbmplY3RvcjogSW5qZWN0b3IsIGFudGRTZXJ2aWNlOiBOenhBbnRkU2VydmljZSkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuLyoqXHJcbiAqIOadg+mZkOi3r+eUseWuiOWNq+mFjee9rlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQXV0aEd1YXJkVHlwZTxUID0gTnpTYWZlQW55PiA9IEF1dGhHdWFyZEZuVHlwZSB8IFQ7XHJcbiJdfQ==