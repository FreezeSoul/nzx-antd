import * as i0 from "@angular/core";
export declare class NzxLoadingService {
    readonly loadingId = "__MESSAGE_LOADING__";
    /**
     * 显示loading
     * @param type loading类型
     * @param message 消息
     */
    show(type?: 'message' | 'spin', message?: string): void;
    private showx;
    /**
     * 显示或隐藏loading
     * @param show 是否显示
     */
    loading(show?: boolean): void;
    /**
     * 隐藏loading
     */
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxLoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzxLoadingService>;
}
export declare const loadingService: NzxLoadingService;
