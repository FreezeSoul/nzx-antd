import { Pipe } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@xmagic/nzx-antd";
export class HasAuthPipe {
    antdService;
    hasAuth = () => of(true);
    constructor(antdService) {
        this.antdService = antdService;
        if (this.antdService.hasAuth) {
            this.hasAuth = this.antdService.hasAuth;
        }
    }
    transform(value) {
        return this.hasAuth(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HasAuthPipe, deps: [{ token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: HasAuthPipe, name: "hasAuth" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HasAuthPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'hasAuth'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzxAntdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLWF1dGgucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90cmFuc2Zvcm0vaGFzLWF1dGgucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFLdEMsTUFBTSxPQUFPLFdBQVc7SUFFSDtJQURULE9BQU8sR0FBd0MsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLFlBQW1CLFdBQTJCO1FBQTNCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUM1QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO3dHQVZVLFdBQVc7c0dBQVgsV0FBVzs7NEZBQVgsV0FBVztrQkFIdkIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQHhtYWdpYy9uengtYW50ZCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2hhc0F1dGgnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIYXNBdXRoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHByb3RlY3RlZCBoYXNBdXRoOiBSZXF1aXJlZDxOenhBbnRkU2VydmljZT5bJ2hhc0F1dGgnXSA9ICgpID0+IG9mKHRydWUpO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhbnRkU2VydmljZTogTnp4QW50ZFNlcnZpY2UpIHtcclxuICAgIGlmICh0aGlzLmFudGRTZXJ2aWNlLmhhc0F1dGgpIHtcclxuICAgICAgdGhpcy5oYXNBdXRoID0gdGhpcy5hbnRkU2VydmljZS5oYXNBdXRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHZhbHVlOiBOelNhZmVBbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLmhhc0F1dGgodmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=