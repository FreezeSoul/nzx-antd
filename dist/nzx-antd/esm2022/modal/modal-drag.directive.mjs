import { Directive, Host } from '@angular/core';
import { NzxModalDragService } from './modal-drag.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
import * as i2 from "./modal-drag.service";
/**
 * 可拖动的对话框
 * @example
 * ``` html
 * <nz-modal nzxModalDrag ></nz-modal>
 ```
 */
export class NzxModalDragDirective {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragDirective, deps: [{ token: i1.NzModalComponent, host: true }, { token: i2.NzxModalDragService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NzxModalDragDirective, selector: "nz-modal[nzxModalDrag]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxModalDragDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-modal[nzxModalDrag]'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzModalComponent, decorators: [{
                    type: Host
                }] }, { type: i2.NzxModalDragService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZHJhZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbW9kYWwvbW9kYWwtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFM0Q7Ozs7OztHQU1HO0FBSUgsTUFBTSxPQUFPLHFCQUFxQjtJQUNGO0lBQWdDO0lBQTlELFlBQThCLEtBQXVCLEVBQVMsZ0JBQXFDO1FBQXJFLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNqRyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzdCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUcsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvRixPQUFPO2FBQ1I7WUFFRCxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9GLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDOUIsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2hCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7d0dBakJVLHFCQUFxQjs0RkFBckIscUJBQXFCOzs0RkFBckIscUJBQXFCO2tCQUhqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DOzswQkFFYyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56TW9kYWxDb21wb25lbnQgfSBmcm9tICduZy16b3Jyby1hbnRkL21vZGFsJztcclxuaW1wb3J0IHsgTnp4TW9kYWxEcmFnU2VydmljZSB9IGZyb20gJy4vbW9kYWwtZHJhZy5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiDlj6/mi5bliqjnmoTlr7nor53moYZcclxuICogQGV4YW1wbGVcclxuICogYGBgIGh0bWxcclxuICogPG56LW1vZGFsIG56eE1vZGFsRHJhZyA+PC9uei1tb2RhbD5cclxuIGBgYFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICduei1tb2RhbFtuenhNb2RhbERyYWddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4TW9kYWxEcmFnRGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3RvcihASG9zdCgpIHByb3RlY3RlZCBtb2RhbDogTnpNb2RhbENvbXBvbmVudCwgcHVibGljIG1vZGFsRHJhZ1NlcnZpY2U6IE56eE1vZGFsRHJhZ1NlcnZpY2UpIHtcclxuICAgIGNvbnN0IHdyYXBDbHMgPSB0aGlzLm1vZGFsRHJhZ1NlcnZpY2UuZ2V0UmFuZG9tQ2xzKCk7XHJcbiAgICBtb2RhbC5hZnRlck9wZW4uc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWxFbGVtZW50ID0gbW9kYWwuZ2V0RWxlbWVudCgpITtcclxuICAgICAgaWYgKCFtb2RlbEVsZW1lbnQgfHwgbW9kZWxFbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKE56eE1vZGFsRHJhZ1NlcnZpY2UuRFJBR19DTFNfUFJFRklYKSAhPT0gLTEpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1vZGVsRWxlbWVudC5jbGFzc0xpc3QuYWRkKHdyYXBDbHMpO1xyXG4gICAgICBjb25zdCBkcmFnID0gdGhpcy5tb2RhbERyYWdTZXJ2aWNlLmNyZWF0ZURyYWdIYW5kbGVyKHdyYXBDbHMsIG1vZGFsLm56TWFzaywgbW9kYWwubnpNb2RhbFR5cGUpO1xyXG4gICAgICBtb2RhbC5hZnRlckNsb3NlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRyYWcgJiYgIWRyYWcuZHJvcHBlZCkge1xyXG4gICAgICAgICAgZHJhZy5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=