import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
/**
 * 非安全加载URL,比如加载iframe url
 */
export class TrustUrlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustUrlPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustUrlPipe, name: "trustUrl" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustUrlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustUrl',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
/**
 * 非安全加载HTML
 */
export class TrustHtmlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(html, enabled = true) {
        return enabled ? this.sanitizer.bypassSecurityTrustHtml(html) : html;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustHtmlPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustHtmlPipe, name: "trustHtml" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustHtmlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustHtml',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
/**
 * 非安全调用Script
 */
export class TrustScriptPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(script, enabled = true) {
        return enabled ? this.sanitizer.bypassSecurityTrustScript(script) : script;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustScriptPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustScriptPipe, name: "trustScript" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustScriptPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustScript',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
/**
 * 非安全调用Style
 */
export class TrustStylePipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(style, enabled = true) {
        return enabled ? this.sanitizer.bypassSecurityTrustStyle(style) : style;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustStylePipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TrustStylePipe, name: "trustStyle" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TrustStylePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trustStyle',
                    pure: true
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3QtcmVzb3VyY2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9waXBlL3RydXN0LXJlc291cmNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQUdwRDs7R0FFRztBQUtILE1BQU0sT0FBTyxZQUFZO0lBQ0g7SUFBcEIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLEdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7d0dBSlUsWUFBWTtzR0FBWixZQUFZOzs0RkFBWixZQUFZO2tCQUp4QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsSUFBSTtpQkFDWDs7QUFRRDs7R0FFRztBQUtILE1BQU0sT0FBTyxhQUFhO0lBQ0o7SUFBcEIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLElBQVksRUFBRSxPQUFPLEdBQUcsSUFBSTtRQUNwQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3ZFLENBQUM7d0dBSlUsYUFBYTtzR0FBYixhQUFhOzs0RkFBYixhQUFhO2tCQUp6QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsSUFBSTtpQkFDWDs7QUFRRDs7R0FFRztBQUtILE1BQU0sT0FBTyxlQUFlO0lBQ047SUFBcEIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUFPLEdBQUcsSUFBSTtRQUN0QyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzdFLENBQUM7d0dBSlUsZUFBZTtzR0FBZixlQUFlOzs0RkFBZixlQUFlO2tCQUozQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsSUFBSTtpQkFDWDs7QUFRRDs7R0FFRztBQUtILE1BQU0sT0FBTyxjQUFjO0lBQ0w7SUFBcEIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLEtBQWEsRUFBRSxPQUFPLEdBQUcsSUFBSTtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7d0dBSlUsY0FBYztzR0FBZCxjQUFjOzs0RkFBZCxjQUFjO2tCQUoxQixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsSUFBSTtpQkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCwgU2FmZVJlc291cmNlVXJsLCBTYWZlU2NyaXB0LCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbi8qKlxyXG4gKiDpnZ7lronlhajliqDovb1VUkws5q+U5aaC5Yqg6L29aWZyYW1lIHVybFxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICd0cnVzdFVybCcsXHJcbiAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJ1c3RVcmxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuICB0cmFuc2Zvcm0odXJsOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmwge1xyXG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOmdnuWuieWFqOWKoOi9vUhUTUxcclxuICovXHJcbkBQaXBlKHtcclxuICBuYW1lOiAndHJ1c3RIdG1sJyxcclxuICBwdXJlOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcnVzdEh0bWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuICB0cmFuc2Zvcm0oaHRtbDogc3RyaW5nLCBlbmFibGVkID0gdHJ1ZSk6IFNhZmVIdG1sIHtcclxuICAgIHJldHVybiBlbmFibGVkID8gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCkgOiBodG1sO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOmdnuWuieWFqOiwg+eUqFNjcmlwdFxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICd0cnVzdFNjcmlwdCcsXHJcbiAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJ1c3RTY3JpcHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuICB0cmFuc2Zvcm0oc2NyaXB0OiBzdHJpbmcsIGVuYWJsZWQgPSB0cnVlKTogU2FmZVNjcmlwdCB7XHJcbiAgICByZXR1cm4gZW5hYmxlZCA/IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTY3JpcHQoc2NyaXB0KSA6IHNjcmlwdDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDpnZ7lronlhajosIPnlKhTdHlsZVxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICd0cnVzdFN0eWxlJyxcclxuICBwdXJlOiB0cnVlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcnVzdFN0eWxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcbiAgdHJhbnNmb3JtKHN0eWxlOiBzdHJpbmcsIGVuYWJsZWQgPSB0cnVlKTogU2FmZVN0eWxlIHtcclxuICAgIHJldHVybiBlbmFibGVkID8gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHN0eWxlKSA6IHN0eWxlO1xyXG4gIH1cclxufVxyXG4iXX0=