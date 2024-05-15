import { IndexAttr, NzxColumn } from '../../table.type';
import * as i0 from "@angular/core";
export declare class TableButtonComponent<T> {
    props: Record<string, any>;
    row: T;
    indexAttr: IndexAttr;
    colIndex: IndexAttr;
    column: NzxColumn<T>;
    nzData: T[];
    nzPageData: T[];
    static ɵfac: i0.ɵɵFactoryDeclaration<TableButtonComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableButtonComponent<any>, "nzx-table-button", never, { "props": { "alias": "props"; "required": false; }; "row": { "alias": "row"; "required": false; }; "indexAttr": { "alias": "indexAttr"; "required": false; }; "colIndex": { "alias": "colIndex"; "required": false; }; "column": { "alias": "column"; "required": false; }; "nzData": { "alias": "nzData"; "required": false; }; "nzPageData": { "alias": "nzPageData"; "required": false; }; }, {}, never, never, false, never>;
}
