import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NzxModalDragService } from './modal-drag.service';
import * as i0 from "@angular/core";
/**
 * 可拖动的对话框
 * @example
 * ``` html
 * <nz-modal nzxModalDrag ></nz-modal>
 ```
 */
export declare class NzxModalDragDirective {
    protected modal: NzModalComponent;
    modalDragService: NzxModalDragService;
    constructor(modal: NzModalComponent, modalDragService: NzxModalDragService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxModalDragDirective, [{ host: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzxModalDragDirective, "nz-modal[nzxModalDrag]", never, {}, {}, never, never, false, never>;
}
