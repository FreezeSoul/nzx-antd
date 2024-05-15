import { TableWidgetService, TableWidget } from '../table-widget.service';
import * as i0 from "@angular/core";
import * as i1 from "./table-input/table-input.component";
import * as i2 from "./table-button/table-button.component";
import * as i3 from "./table-link/table-link.component";
import * as i4 from "./table-tag/table-tag.component";
import * as i5 from "../transform/link-href.pipe";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "ng-zorro-antd/input";
import * as i9 from "ng-zorro-antd/button";
import * as i10 from "ng-zorro-antd/icon";
import * as i11 from "ng-zorro-antd/tag";
import * as i12 from "ng-zorro-antd/input-number";
import * as i13 from "@freezesoul/nzx-antd/switch";
export declare function defaultTableWidget(): TableWidget[];
export declare class TableWidgetModule {
    service: TableWidgetService;
    constructor(service: TableWidgetService, widgets?: TableWidget[][]);
    static ɵfac: i0.ɵɵFactoryDeclaration<TableWidgetModule, [null, { optional: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TableWidgetModule, [typeof i1.TableInputComponent, typeof i2.TableButtonComponent, typeof i3.TableLinkComponent, typeof i4.TableTagComponent, typeof i5.LinkHrefPipe], [typeof i6.CommonModule, typeof i7.FormsModule, typeof i8.NzInputModule, typeof i9.NzButtonModule, typeof i10.NzIconModule, typeof i11.NzTagModule, typeof i12.NzInputNumberModule, typeof i13.NzxSwitchModule], [typeof i1.TableInputComponent, typeof i2.TableButtonComponent, typeof i3.TableLinkComponent, typeof i4.TableTagComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TableWidgetModule>;
}
