import * as i0 from '@angular/core';
import { Injectable, Directive, Host, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import * as i2 from '@angular/cdk/drag-drop';

/**
 * 对话框拖动服务
 */
class NzxModalDragService {
    modal;
    dragDrop;
    static DRAG_CLS_PREFIX = 'NZ-MODAL-WRAP-CLS-';
    constructor(modal, dragDrop) {
        this.modal = modal;
        this.dragDrop = dragDrop;
    }
    /**
     * 创建拖拽手柄
     * @param wrapCls 类名
     * @param nzMask 是否有遮罩
     * @param nzModalType 对话框类型
     */
    createDragHandler(wrapCls, nzMask, nzModalType) {
        const wrapElement = document.querySelector(`.${wrapCls}`);
        const rootElement = wrapElement.querySelector(`.ant-modal-content`);
        const handle = nzModalType === 'confirm'
            ? rootElement.querySelector('.ant-modal-body')
            : rootElement.querySelector('.ant-modal-header');
        this.fixedWrapElementStyle(wrapElement);
        if (!(nzMask == null || nzMask)) {
            this.setMaxZIndex(rootElement, wrapElement);
        }
        return this.dragDrop.createDrag(handle).withHandles([handle]).withRootElement(rootElement);
    }
    /**
     * 获取随机类名
     */
    getRandomCls() {
        return NzxModalDragService.DRAG_CLS_PREFIX + Date.now() + Math.random().toString().replace('0.', '');
    }
    /**
     * 解决wrap的样式, 设置鼠标可以穿透
     * @param wrapElement
     * @protected
     */
    fixedWrapElementStyle(wrapElement) {
        wrapElement.style.pointerEvents = 'none';
    }
    /**
     * 当前对话框点击时,设置当前对话框z-index为最大
     * @param rootElement 当前对话框
     * @param wrapElement 待修改z-index 容器
     * @protected
     */
    setMaxZIndex(rootElement, wrapElement) {
        rootElement.addEventListener('mousedown', () => {
            const maxZIndex = this.getModalMaxZIndex(wrapElement);
            if (maxZIndex) {
                wrapElement.style.zIndex = maxZIndex + 1 + '';
            }
        }, false);
    }
    /**
     * 获取所有对话框最大值,并确定是否需要修改
     * @param wrapElement 待修改z-index 容器
     */
    getModalMaxZIndex(wrapElement) {
        const wrapZIndex = this.getZIndex(wrapElement);
        const maxZIndex = this.modal.openModals.reduce((prev, modal) => {
            // @ts-ignore
            const element = (modal.containerInstance.host || modal.containerInstance.elementRef).nativeElement;
            if (wrapElement === element) {
                return prev;
            }
            const zIndex = this.getZIndex(element);
            return zIndex > prev ? zIndex : prev;
        }, 0);
        return maxZIndex >= wrapZIndex ? maxZIndex : null;
    }
    getZIndex(element) {
        return +getComputedStyle(element, null).zIndex;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragService, deps: [{ token: i1.NzModalService }, { token: i2.DragDrop }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzModalService }, { type: i2.DragDrop }]; } });

class NzxModalService {
    modal;
    modalDragService;
    constructor(modal, modalDragService) {
        this.modal = modal;
        this.modalDragService = modalDragService;
    }
    /**
     * 创建对话框, 增加可拖拽功能
     * @param config NzxModalOptions
     */
    create(config) {
        return this.createModalWidthDrag(config, c => this.modal.create(c));
    }
    get openModals() {
        return this.modal.openModals;
    }
    get afterAllClosed() {
        return this.modal._afterAllClosed;
    }
    closeAll() {
        this.modal.closeAll();
    }
    confirm(options, confirmType) {
        return this.createModalWidthDrag(options, c => this.modal.confirm(c, confirmType));
    }
    info(options) {
        return this.createModalWidthDrag(options, c => this.modal.info(c));
    }
    success(options) {
        return this.createModalWidthDrag(options, c => this.modal.success(c));
    }
    error(options) {
        return this.createModalWidthDrag(options, c => this.modal.error(c));
    }
    warning(options) {
        return this.createModalWidthDrag(options, c => this.modal.warning(c));
    }
    createModalWidthDrag(config, create) {
        const wrapCls = this.modalDragService.getRandomCls();
        const newConfig = this.createModalConfig(config, wrapCls);
        const modalRef = create(newConfig);
        modalRef.afterOpen.subscribe(() => {
            if (config.draggable !== false) {
                const drag = this.modalDragService.createDragHandler(wrapCls, config.nzMask, newConfig.nzModalType);
                modalRef.afterClose.subscribe(() => {
                    if (drag && !drag.dropped) {
                        drag.dispose();
                    }
                });
            }
        });
        return modalRef;
    }
    createModalConfig(config, wrapCls) {
        const defaultConfig = {
            nzMaskClosable: false,
            nzTitle: '提示'
        };
        const maskStyle = config.nzMask === false ? { nzMaskStyle: { display: 'none' } } : {};
        const newConfig = Object.assign(defaultConfig, config, maskStyle);
        newConfig.nzWrapClassName = (newConfig.nzWrapClassName || '') + ' ' + wrapCls;
        return newConfig;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalService, deps: [{ token: i1.NzModalService }, { token: NzxModalDragService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzModalService }, { type: NzxModalDragService }]; } });

/**
 * 可拖动的对话框
 * @example
 * ``` html
 * <nz-modal nzxModalDrag ></nz-modal>
 ```
 */
class NzxModalDragDirective {
    modal;
    modalDragService;
    constructor(modal, modalDragService) {
        this.modal = modal;
        this.modalDragService = modalDragService;
        const wrapCls = this.modalDragService.getRandomCls();
        modal.afterOpen.subscribe(() => {
            const modelElement = modal.getElement();
            if (!modelElement || modelElement.className.indexOf(NzxModalDragService.DRAG_CLS_PREFIX) !== -1) {
                return;
            }
            modelElement.classList.add(wrapCls);
            const drag = this.modalDragService.createDragHandler(wrapCls, modal.nzMask, modal.nzModalType);
            modal.afterClose.subscribe(() => {
                if (drag && !drag.dropped) {
                    drag.dispose();
                }
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragDirective, deps: [{ token: i1.NzModalComponent, host: true }, { token: NzxModalDragService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NzxModalDragDirective, selector: "nz-modal[nzxModalDrag]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-modal[nzxModalDrag]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzModalComponent, decorators: [{
                    type: Host
                }] }, { type: NzxModalDragService }]; } });

class NzxModalModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, declarations: [NzxModalDragDirective], imports: [NzModalModule], exports: [NzxModalDragDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, providers: [NzxModalService, NzxModalDragService], imports: [NzModalModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzxModalDragDirective],
                    imports: [NzModalModule],
                    exports: [NzxModalDragDirective],
                    providers: [NzxModalService, NzxModalDragService]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxModalDragDirective, NzxModalDragService, NzxModalModule, NzxModalService };
//# sourceMappingURL=xmagic-nzx-antd-modal.mjs.map
