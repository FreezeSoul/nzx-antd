import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

class NzxAntdService {
    /**
     * 默认请求数据类型, 默认 json
     */
    contentType;
    /**
     * 请求的根路径,例如/context
     */
    basePath;
    /**
     * 响应的数据配置
     */
    response;
    /**
     * 自定义处理原始请求, 返回null,void则使用默认处理器
     */
    handleRequest;
    /**
     * 当发生http异常时(http code 非200), 映射成HttpErrorBean
     */
    handleHttpError;
    /**
     * 是否有权限
     */
    hasAuth;
    /**
     * 权限变更, 通常切换用户时需要
     */
    authChange;
    /**
     * 无权限时跳转路径
     */
    noAuthUrl;
    /**
     * 表格分页配置
     */
    table;
    /**
     * defaultify管道的默认值, 默认 --
     */
    defaultify;
    /**
     * 字典配置
     */
    dic;
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAntdService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAntdService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxAntdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
/**
 * 默认配置
 */
const DEFAULT_RESPONSE_SETTING = {
    code: 'code',
    message: 'message',
    data: 'result',
    // tslint:disable-next-line:triple-equals
    success: (_, response) => response.body.code == 200,
    // tslint:disable-next-line:triple-equals
    timeout: error => error.code == 401,
    forceLogout: () => false,
    handleError: error => throwError(error)
};
/**
 * 默认状态错误信息
 */
const DEFAULT_STATUS_MESSAGE_MAP = {
    0: '请求网络错误，请检查网络是否正常',
    404: '请求的地址不存在，请检查地址是否正确',
    403: '您没有操作权限',
    other: '请求发生错误，请联系管理员'
};

/*
 * Public API Surface of nzx-antd
 */
// export default void 0;
// export * from './nzx-antd.module';
//
// export * from './lib/between/public_api';
// export * from './lib/between-input/public_api';
// export * from './lib/checkbox/public_api';
// export * from './lib/switch/public_api';
// export * from './lib/table/public_api';
// export * from './lib/upload/public_api';
// export * from './lib/between-datetime/public_api';
// export * from './lib/between-time/public_api';
// export * from './lib/directive/public_api';
// export * from './lib/modal/public_api';
// export * from './lib/repeat/public_api';
// export * from './lib/layout-page/public_api';
//
// export * from './lib/pipe/public_api';
// export * from './lib/service/public_api';
// export * from './lib/util/public_api';
// export * from './lib/http-interceptor/public_api';

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_RESPONSE_SETTING, DEFAULT_STATUS_MESSAGE_MAP, NzxAntdService };
//# sourceMappingURL=freezesoul-nzx-antd.mjs.map
