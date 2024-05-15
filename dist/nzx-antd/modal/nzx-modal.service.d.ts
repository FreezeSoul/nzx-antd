import { Subject } from 'rxjs';
import { ConfirmType, ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxModalDragService } from './modal-drag.service';
import * as i0 from "@angular/core";
export declare class NzxModalService {
    modal: NzModalService;
    modalDragService: NzxModalDragService;
    constructor(modal: NzModalService, modalDragService: NzxModalDragService);
    /**
     * 创建对话框, 增加可拖拽功能
     * @param config NzxModalOptions
     */
    create<T, R = NzSafeAny>(config: NzxModalOptions<T, R>): NzModalRef<T, R>;
    get openModals(): NzModalRef[];
    get afterAllClosed(): Subject<void>;
    closeAll(): void;
    confirm<T>(options: NzxModalOptions<T>, confirmType?: ConfirmType): NzModalRef<T>;
    info<T>(options: NzxModalOptions<T>): NzModalRef<T>;
    success<T>(options: NzxModalOptions<T>): NzModalRef<T>;
    error<T>(options: NzxModalOptions<T>): NzModalRef<T>;
    warning<T>(options: NzxModalOptions<T>): NzModalRef<T>;
    protected createModalWidthDrag<T, R = NzSafeAny>(config: NzxModalOptions<T, R>, create: (newConfig: NzxModalOptions<T, R>) => NzModalRef<T, R>): NzModalRef<T, R>;
    protected createModalConfig<T, R = NzSafeAny>(config: NzxModalOptions<T, R>, wrapCls: string): NzxModalOptions<T, R>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzxModalService>;
}
export interface NzxModalOptions<T = NzSafeAny, D = NzSafeAny, R = NzSafeAny> extends ModalOptions<T, D, R> {
    /**
     * 是否允许拖拽
     */
    draggable?: boolean;
    /**
     * 允许改变窗口大小
     */
    resizable?: boolean;
    /**
     * 允许最大值
     */
    maximum?: boolean;
    /**
     * 允许最小值
     */
    minimum?: boolean;
}
