import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "@angular/cdk/drag-drop";
/**
 * 对话框拖动服务
 */
export class NzxModalDragService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZHJhZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL21vZGFsL21vZGFsLWRyYWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzNDOztHQUVHO0FBRUgsTUFBTSxPQUFPLG1CQUFtQjtJQUVYO0lBQThCO0lBRGpELE1BQU0sQ0FBVSxlQUFlLEdBQUcsb0JBQW9CLENBQUM7SUFDdkQsWUFBbUIsS0FBcUIsRUFBUyxRQUFrQjtRQUFoRCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBRyxDQUFDO0lBRXZFOzs7OztPQUtHO0lBQ0gsaUJBQWlCLENBQWdCLE9BQWUsRUFBRSxNQUFnQixFQUFFLFdBQXdCO1FBQzFGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQWlCLElBQUksT0FBTyxFQUFFLENBQUUsQ0FBQztRQUMzRSxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFpQixvQkFBb0IsQ0FBRSxDQUFDO1FBQ3JGLE1BQU0sTUFBTSxHQUNWLFdBQVcsS0FBSyxTQUFTO1lBQ3ZCLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFpQixpQkFBaUIsQ0FBRTtZQUMvRCxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBaUIsbUJBQW1CLENBQUUsQ0FBQztRQUN0RSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTtRQUNWLE9BQU8sbUJBQW1CLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLHFCQUFxQixDQUFDLFdBQXdCO1FBQ3RELFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxZQUFZLENBQUMsV0FBd0IsRUFBRSxXQUF3QjtRQUN2RSxXQUFXLENBQUMsZ0JBQWdCLENBQzFCLFdBQVcsRUFDWCxHQUFHLEVBQUU7WUFDSCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDL0M7UUFDSCxDQUFDLEVBQ0QsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ08saUJBQWlCLENBQUMsV0FBd0I7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDckUsYUFBYTtZQUNiLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ25HLElBQUksV0FBVyxLQUFLLE9BQU8sRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsT0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixPQUFPLFNBQVMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFFUyxTQUFTLENBQUMsT0FBb0I7UUFDdEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDakQsQ0FBQzt3R0EvRVUsbUJBQW1COzRHQUFuQixtQkFBbUI7OzRGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wLCBEcmFnUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE1vZGFsVHlwZXMsIE56TW9kYWxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tb2RhbCc7XHJcblxyXG4vKipcclxuICog5a+56K+d5qGG5ouW5Yqo5pyN5YqhXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOenhNb2RhbERyYWdTZXJ2aWNlIHtcclxuICBzdGF0aWMgcmVhZG9ubHkgRFJBR19DTFNfUFJFRklYID0gJ05aLU1PREFMLVdSQVAtQ0xTLSc7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG1vZGFsOiBOek1vZGFsU2VydmljZSwgcHVibGljIGRyYWdEcm9wOiBEcmFnRHJvcCkge31cclxuXHJcbiAgLyoqXHJcbiAgICog5Yib5bu65ouW5ou95omL5p+EXHJcbiAgICogQHBhcmFtIHdyYXBDbHMg57G75ZCNXHJcbiAgICogQHBhcmFtIG56TWFzayDmmK/lkKbmnInpga7nvalcclxuICAgKiBAcGFyYW0gbnpNb2RhbFR5cGUg5a+56K+d5qGG57G75Z6LXHJcbiAgICovXHJcbiAgY3JlYXRlRHJhZ0hhbmRsZXI8VCA9IE56U2FmZUFueT4od3JhcENsczogc3RyaW5nLCBuek1hc2s/OiBib29sZWFuLCBuek1vZGFsVHlwZT86IE1vZGFsVHlwZXMpOiBEcmFnUmVmPFQ+IHtcclxuICAgIGNvbnN0IHdyYXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oYC4ke3dyYXBDbHN9YCkhO1xyXG4gICAgY29uc3Qgcm9vdEVsZW1lbnQgPSB3cmFwRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PihgLmFudC1tb2RhbC1jb250ZW50YCkhO1xyXG4gICAgY29uc3QgaGFuZGxlID1cclxuICAgICAgbnpNb2RhbFR5cGUgPT09ICdjb25maXJtJ1xyXG4gICAgICAgID8gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJy5hbnQtbW9kYWwtYm9keScpIVxyXG4gICAgICAgIDogcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJy5hbnQtbW9kYWwtaGVhZGVyJykhO1xyXG4gICAgdGhpcy5maXhlZFdyYXBFbGVtZW50U3R5bGUod3JhcEVsZW1lbnQpO1xyXG4gICAgaWYgKCEobnpNYXNrID09IG51bGwgfHwgbnpNYXNrKSkge1xyXG4gICAgICB0aGlzLnNldE1heFpJbmRleChyb290RWxlbWVudCwgd3JhcEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZHJhZ0Ryb3AuY3JlYXRlRHJhZyhoYW5kbGUpLndpdGhIYW5kbGVzKFtoYW5kbGVdKS53aXRoUm9vdEVsZW1lbnQocm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W6ZqP5py657G75ZCNXHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tQ2xzKCkge1xyXG4gICAgcmV0dXJuIE56eE1vZGFsRHJhZ1NlcnZpY2UuRFJBR19DTFNfUFJFRklYICsgRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOino+WGs3dyYXDnmoTmoLflvI8sIOiuvue9rum8oOagh+WPr+S7peepv+mAj1xyXG4gICAqIEBwYXJhbSB3cmFwRWxlbWVudFxyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZml4ZWRXcmFwRWxlbWVudFN0eWxlKHdyYXBFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgd3JhcEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOW9k+WJjeWvueivneahhueCueWHu+aXtizorr7nva7lvZPliY3lr7nor53moYZ6LWluZGV45Li65pyA5aSnXHJcbiAgICogQHBhcmFtIHJvb3RFbGVtZW50IOW9k+WJjeWvueivneahhlxyXG4gICAqIEBwYXJhbSB3cmFwRWxlbWVudCDlvoXkv67mlLl6LWluZGV4IOWuueWZqFxyXG4gICAqIEBwcm90ZWN0ZWRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc2V0TWF4WkluZGV4KHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCwgd3JhcEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAnbW91c2Vkb3duJyxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1heFpJbmRleCA9IHRoaXMuZ2V0TW9kYWxNYXhaSW5kZXgod3JhcEVsZW1lbnQpO1xyXG4gICAgICAgIGlmIChtYXhaSW5kZXgpIHtcclxuICAgICAgICAgIHdyYXBFbGVtZW50LnN0eWxlLnpJbmRleCA9IG1heFpJbmRleCArIDEgKyAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhbHNlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5omA5pyJ5a+56K+d5qGG5pyA5aSn5YC8LOW5tuehruWumuaYr+WQpumcgOimgeS/ruaUuVxyXG4gICAqIEBwYXJhbSB3cmFwRWxlbWVudCDlvoXkv67mlLl6LWluZGV4IOWuueWZqFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXRNb2RhbE1heFpJbmRleCh3cmFwRWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIgfCBudWxsIHtcclxuICAgIGNvbnN0IHdyYXBaSW5kZXggPSB0aGlzLmdldFpJbmRleCh3cmFwRWxlbWVudCk7XHJcbiAgICBjb25zdCBtYXhaSW5kZXggPSB0aGlzLm1vZGFsLm9wZW5Nb2RhbHMucmVkdWNlPG51bWJlcj4oKHByZXYsIG1vZGFsKSA9PiB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgY29uc3QgZWxlbWVudCA9IChtb2RhbC5jb250YWluZXJJbnN0YW5jZS5ob3N0IHx8IG1vZGFsLmNvbnRhaW5lckluc3RhbmNlLmVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGlmICh3cmFwRWxlbWVudCA9PT0gZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiBwcmV2O1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHpJbmRleCA9IHRoaXMuZ2V0WkluZGV4KGVsZW1lbnQpO1xyXG4gICAgICByZXR1cm4gekluZGV4ID4gcHJldiA/IHpJbmRleCA6IHByZXY7XHJcbiAgICB9LCAwKTtcclxuICAgIHJldHVybiBtYXhaSW5kZXggPj0gd3JhcFpJbmRleCA/IG1heFpJbmRleCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0WkluZGV4KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiArZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS56SW5kZXg7XHJcbiAgfVxyXG59XHJcbiJdfQ==