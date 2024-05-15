import { IndexAttr, NzxColumn, NzxColumnButton } from '../../table.type';
import * as i0 from "@angular/core";
export declare class TableLinkComponent<T> {
    props: NzxColumnButton;
    nzData: T[];
    nzPageData: T[];
    row: T;
    indexAttr: IndexAttr;
    colIndex: IndexAttr;
    column: NzxColumn<T>;
    get params(): {
        row: T;
        nzData: T[];
        nzPageData: T[];
        colIndex: IndexAttr;
        column: NzxColumn<T>;
        indexAttr: IndexAttr;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<TableLinkComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableLinkComponent<any>, "nzx-table-link", never, { "props": { "alias": "props"; "required": false; }; "nzData": { "alias": "nzData"; "required": false; }; "nzPageData": { "alias": "nzPageData"; "required": false; }; "row": { "alias": "row"; "required": false; }; "indexAttr": { "alias": "indexAttr"; "required": false; }; "colIndex": { "alias": "colIndex"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, {}, never, never, false, never>;
}
