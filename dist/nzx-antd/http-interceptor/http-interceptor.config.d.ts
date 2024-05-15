import { HttpLoadingInterceptor } from './http-loading.interceptor';
import { HttpUrlInterceptor } from './http-url.interceptor';
import { HttpHeaderInterceptor } from './http-header.interceptor';
import { HttpParamsInterceptor } from './http-params.interceptor';
import { HttpCustomServerErrorInterceptor } from './http-custom-server-error.interceptor';
import { HttpResponseParseInterceptor } from './http-response-parse.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';
/**
 * 注意，中间件是有序的，谨慎调整下列中间件的顺序
 */
export declare const httpInterceptors: ({
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpLoadingInterceptor;
    multi: boolean;
} | {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpUrlInterceptor;
    multi: boolean;
} | {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpHeaderInterceptor;
    multi: boolean;
} | {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpParamsInterceptor;
    multi: boolean;
} | {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpCustomServerErrorInterceptor;
    multi: boolean;
} | {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpResponseParseInterceptor;
    multi: boolean;
} | {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof HttpErrorInterceptor;
    multi: boolean;
})[];
