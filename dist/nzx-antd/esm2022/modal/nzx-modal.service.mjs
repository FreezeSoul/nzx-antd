import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "./modal-drag.service";
export class NzxModalService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalService, deps: [{ token: i1.NzModalService }, { token: i2.NzxModalDragService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NzModalService }, { type: i2.NzxModalDragService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnp4LW1vZGFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbW9kYWwvbnp4LW1vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sZUFBZTtJQUVqQjtJQUNBO0lBRlQsWUFDUyxLQUFxQixFQUNyQixnQkFBcUM7UUFEckMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtJQUMzQyxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsTUFBTSxDQUFtQixNQUE2QjtRQUNwRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU8sQ0FBSSxPQUEyQixFQUFFLFdBQXlCO1FBQy9ELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxJQUFJLENBQUksT0FBMkI7UUFDakMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsT0FBTyxDQUFJLE9BQTJCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELEtBQUssQ0FBSSxPQUEyQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxPQUFPLENBQUksT0FBMkI7UUFDcEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRVMsb0JBQW9CLENBQzVCLE1BQTZCLEVBQzdCLE1BQThEO1FBRTlELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDaEMsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO29CQUNqQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVTLGlCQUFpQixDQUFtQixNQUE2QixFQUFFLE9BQWU7UUFDMUYsTUFBTSxhQUFhLEdBQW9CO1lBQ3JDLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdEYsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDOUUsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzt3R0E1RVUsZUFBZTs0R0FBZixlQUFlOzs0RkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb25maXJtVHlwZSwgTW9kYWxPcHRpb25zLCBOek1vZGFsUmVmLCBOek1vZGFsU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbW9kYWwnO1xyXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xyXG5pbXBvcnQgeyBOenhNb2RhbERyYWdTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1kcmFnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTnp4TW9kYWxTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBtb2RhbDogTnpNb2RhbFNlcnZpY2UsXHJcbiAgICBwdWJsaWMgbW9kYWxEcmFnU2VydmljZTogTnp4TW9kYWxEcmFnU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICog5Yib5bu65a+56K+d5qGGLCDlop7liqDlj6/mi5bmi73lip/og71cclxuICAgKiBAcGFyYW0gY29uZmlnIE56eE1vZGFsT3B0aW9uc1xyXG4gICAqL1xyXG4gIGNyZWF0ZTxULCBSID0gTnpTYWZlQW55Pihjb25maWc6IE56eE1vZGFsT3B0aW9uczxULCBSPik6IE56TW9kYWxSZWY8VCwgUj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9kYWxXaWR0aERyYWcoY29uZmlnLCBjID0+IHRoaXMubW9kYWwuY3JlYXRlKGMpKTtcclxuICB9XHJcblxyXG4gIGdldCBvcGVuTW9kYWxzKCk6IE56TW9kYWxSZWZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RhbC5vcGVuTW9kYWxzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFmdGVyQWxsQ2xvc2VkKCk6IFN1YmplY3Q8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kYWwuX2FmdGVyQWxsQ2xvc2VkO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VBbGwoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsLmNsb3NlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBjb25maXJtPFQ+KG9wdGlvbnM6IE56eE1vZGFsT3B0aW9uczxUPiwgY29uZmlybVR5cGU/OiBDb25maXJtVHlwZSk6IE56TW9kYWxSZWY8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9kYWxXaWR0aERyYWcob3B0aW9ucywgYyA9PiB0aGlzLm1vZGFsLmNvbmZpcm0oYywgY29uZmlybVR5cGUpKTtcclxuICB9XHJcblxyXG4gIGluZm88VD4ob3B0aW9uczogTnp4TW9kYWxPcHRpb25zPFQ+KTogTnpNb2RhbFJlZjxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVNb2RhbFdpZHRoRHJhZyhvcHRpb25zLCBjID0+IHRoaXMubW9kYWwuaW5mbyhjKSk7XHJcbiAgfVxyXG5cclxuICBzdWNjZXNzPFQ+KG9wdGlvbnM6IE56eE1vZGFsT3B0aW9uczxUPik6IE56TW9kYWxSZWY8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9kYWxXaWR0aERyYWcob3B0aW9ucywgYyA9PiB0aGlzLm1vZGFsLnN1Y2Nlc3MoYykpO1xyXG4gIH1cclxuXHJcbiAgZXJyb3I8VD4ob3B0aW9uczogTnp4TW9kYWxPcHRpb25zPFQ+KTogTnpNb2RhbFJlZjxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVNb2RhbFdpZHRoRHJhZyhvcHRpb25zLCBjID0+IHRoaXMubW9kYWwuZXJyb3IoYykpO1xyXG4gIH1cclxuXHJcbiAgd2FybmluZzxUPihvcHRpb25zOiBOenhNb2RhbE9wdGlvbnM8VD4pOiBOek1vZGFsUmVmPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vZGFsV2lkdGhEcmFnKG9wdGlvbnMsIGMgPT4gdGhpcy5tb2RhbC53YXJuaW5nKGMpKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVNb2RhbFdpZHRoRHJhZzxULCBSID0gTnpTYWZlQW55PihcclxuICAgIGNvbmZpZzogTnp4TW9kYWxPcHRpb25zPFQsIFI+LFxyXG4gICAgY3JlYXRlOiAobmV3Q29uZmlnOiBOenhNb2RhbE9wdGlvbnM8VCwgUj4pID0+IE56TW9kYWxSZWY8VCwgUj5cclxuICApIHtcclxuICAgIGNvbnN0IHdyYXBDbHMgPSB0aGlzLm1vZGFsRHJhZ1NlcnZpY2UuZ2V0UmFuZG9tQ2xzKCk7XHJcbiAgICBjb25zdCBuZXdDb25maWcgPSB0aGlzLmNyZWF0ZU1vZGFsQ29uZmlnKGNvbmZpZywgd3JhcENscyk7XHJcbiAgICBjb25zdCBtb2RhbFJlZiA9IGNyZWF0ZShuZXdDb25maWcpO1xyXG5cclxuICAgIG1vZGFsUmVmLmFmdGVyT3Blbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAoY29uZmlnLmRyYWdnYWJsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBkcmFnID0gdGhpcy5tb2RhbERyYWdTZXJ2aWNlLmNyZWF0ZURyYWdIYW5kbGVyKHdyYXBDbHMsIGNvbmZpZy5uek1hc2ssIG5ld0NvbmZpZy5uek1vZGFsVHlwZSk7XHJcbiAgICAgICAgbW9kYWxSZWYuYWZ0ZXJDbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGRyYWcgJiYgIWRyYWcuZHJvcHBlZCkge1xyXG4gICAgICAgICAgICBkcmFnLmRpc3Bvc2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbW9kYWxSZWY7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlTW9kYWxDb25maWc8VCwgUiA9IE56U2FmZUFueT4oY29uZmlnOiBOenhNb2RhbE9wdGlvbnM8VCwgUj4sIHdyYXBDbHM6IHN0cmluZyk6IE56eE1vZGFsT3B0aW9uczxULCBSPiB7XHJcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnOiBOenhNb2RhbE9wdGlvbnMgPSB7XHJcbiAgICAgIG56TWFza0Nsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbnpUaXRsZTogJ+aPkOekuidcclxuICAgIH07XHJcbiAgICBjb25zdCBtYXNrU3R5bGUgPSBjb25maWcubnpNYXNrID09PSBmYWxzZSA/IHsgbnpNYXNrU3R5bGU6IHsgZGlzcGxheTogJ25vbmUnIH0gfSA6IHt9O1xyXG4gICAgY29uc3QgbmV3Q29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0Q29uZmlnLCBjb25maWcsIG1hc2tTdHlsZSk7XHJcbiAgICBuZXdDb25maWcubnpXcmFwQ2xhc3NOYW1lID0gKG5ld0NvbmZpZy5ueldyYXBDbGFzc05hbWUgfHwgJycpICsgJyAnICsgd3JhcENscztcclxuICAgIHJldHVybiBuZXdDb25maWc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE56eE1vZGFsT3B0aW9uczxUID0gTnpTYWZlQW55LCBEID0gTnpTYWZlQW55LCBSID0gTnpTYWZlQW55PiBleHRlbmRzIE1vZGFsT3B0aW9uczxULCBELCBSPiB7XHJcbiAgLyoqXHJcbiAgICog5piv5ZCm5YWB6K645ouW5ou9XHJcbiAgICovXHJcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiDlhYHorrjmlLnlj5jnqpflj6PlpKflsI9cclxuICAgKi9cclxuICByZXNpemFibGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOWFgeiuuOacgOWkp+WAvFxyXG4gICAqL1xyXG4gIG1heGltdW0/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIOWFgeiuuOacgOWwj+WAvFxyXG4gICAqL1xyXG4gIG1pbmltdW0/OiBib29sZWFuO1xyXG59XHJcbiJdfQ==