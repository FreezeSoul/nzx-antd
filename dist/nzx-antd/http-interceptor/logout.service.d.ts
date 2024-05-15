import { HttpError, ResponseModel } from './http.model';
import { Subscription } from 'rxjs';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
/**
 * 退出通知
 */
export declare class LogoutService {
    protected antdService: NzxAntdService;
    protected readonly timeoutFn: (error: HttpError) => boolean;
    private loginNotify$;
    constructor(antdService: NzxAntdService);
    notifyLogin(error: HttpError<ResponseModel>): void;
    /**
     * 静默通知退出
     * @param message 提示消息
     * @param code 错误码 -1 不显示提示信息
     */
    notifyLogout(message?: string, code?: number): void;
    /**
     * 执行退出登录Observable
     * @param logoutType
     */
    logout(logoutType: LogoutType): void;
    onLogout(fn: (logoutType: LogoutType) => void): Subscription;
    static ɵfac: i0.ɵɵFactoryDeclaration<LogoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LogoutService>;
}
export interface LogoutType {
    /**
     * url
     */
    url?: string;
    /**
     * 是否超时
     */
    timeout?: boolean;
    /**
     * 错误信息
     */
    message?: string;
}
