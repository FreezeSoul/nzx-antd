import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalTypes, NzModalService } from 'ng-zorro-antd/modal';
import * as i0 from "@angular/core";
/**
 * 对话框拖动服务
 */
export declare class NzxModalDragService {
    modal: NzModalService;
    dragDrop: DragDrop;
    static readonly DRAG_CLS_PREFIX = "NZ-MODAL-WRAP-CLS-";
    constructor(modal: NzModalService, dragDrop: DragDrop);
    /**
     * 创建拖拽手柄
     * @param wrapCls 类名
     * @param nzMask 是否有遮罩
     * @param nzModalType 对话框类型
     */
    createDragHandler<T = NzSafeAny>(wrapCls: string, nzMask?: boolean, nzModalType?: ModalTypes): DragRef<T>;
    /**
     * 获取随机类名
     */
    getRandomCls(): string;
    /**
     * 解决wrap的样式, 设置鼠标可以穿透
     * @param wrapElement
     * @protected
     */
    protected fixedWrapElementStyle(wrapElement: HTMLElement): void;
    /**
     * 当前对话框点击时,设置当前对话框z-index为最大
     * @param rootElement 当前对话框
     * @param wrapElement 待修改z-index 容器
     * @protected
     */
    protected setMaxZIndex(rootElement: HTMLElement, wrapElement: HTMLElement): void;
    /**
     * 获取所有对话框最大值,并确定是否需要修改
     * @param wrapElement 待修改z-index 容器
     */
    protected getModalMaxZIndex(wrapElement: HTMLElement): number | null;
    protected getZIndex(element: HTMLElement): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxModalDragService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzxModalDragService>;
}
