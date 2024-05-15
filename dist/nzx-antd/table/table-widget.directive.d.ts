import { OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { IndexAttr, NzxColumn, NzxWidget } from './table.type';
import { TableWidgetService } from './table-widget.service';
import * as i0 from "@angular/core";
export declare class TableWidgetDirective<T> implements OnInit {
    private widgetService;
    private viewContainerRef;
    private renderer;
    row: T;
    indexAttr: IndexAttr;
    colIndex: IndexAttr;
    column: NzxColumn<T>;
    nzData: T[];
    nzPageData: T[];
    widget: NzxWidget<T>;
    constructor(widgetService: TableWidgetService, viewContainerRef: ViewContainerRef, renderer: Renderer2);
    ngOnInit(): void;
    private mergeElementProperty;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableWidgetDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TableWidgetDirective<any>, "[table-widget]", never, { "row": { "alias": "row"; "required": false; }; "indexAttr": { "alias": "indexAttr"; "required": false; }; "colIndex": { "alias": "colIndex"; "required": false; }; "column": { "alias": "column"; "required": false; }; "nzData": { "alias": "nzData"; "required": false; }; "nzPageData": { "alias": "nzPageData"; "required": false; }; "widget": { "alias": "widget"; "required": false; }; }, {}, never, never, false, never>;
}
