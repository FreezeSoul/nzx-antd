import { Pipe } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@freezesoul/nzx-antd";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLWF1dGgucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90cmFuc2Zvcm0vaGFzLWF1dGgucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFLdEMsTUFBTSxPQUFPLFdBQVc7SUFFSDtJQURULE9BQU8sR0FBd0MsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLFlBQW1CLFdBQTJCO1FBQTNCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUM1QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO3dHQVZVLFdBQVc7c0dBQVgsV0FBVzs7NEZBQVgsV0FBVztrQkFIdkIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eEFudGRTZXJ2aWNlIH0gZnJvbSAnQGZyZWV6ZXNvdWwvbnp4LWFudGQnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdoYXNBdXRoJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGFzQXV0aFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBwcm90ZWN0ZWQgaGFzQXV0aDogUmVxdWlyZWQ8Tnp4QW50ZFNlcnZpY2U+WydoYXNBdXRoJ10gPSAoKSA9PiBvZih0cnVlKTtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYW50ZFNlcnZpY2U6IE56eEFudGRTZXJ2aWNlKSB7XHJcbiAgICBpZiAodGhpcy5hbnRkU2VydmljZS5oYXNBdXRoKSB7XHJcbiAgICAgIHRoaXMuaGFzQXV0aCA9IHRoaXMuYW50ZFNlcnZpY2UuaGFzQXV0aDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSh2YWx1ZTogTnpTYWZlQW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5oYXNBdXRoKHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19