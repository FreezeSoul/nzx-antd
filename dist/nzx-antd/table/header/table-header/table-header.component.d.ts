import { EventEmitter, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { NzTableSize } from 'ng-zorro-antd/table';
import { NzxTableSize } from '../../table.type';
import * as i0 from "@angular/core";
export declare class NzxTableHeaderComponent implements OnInit, OnChanges {
    tableSize: NzxTableSize;
    /**
     * 是否显示操作按钮小图标
     */
    actionVisible?: boolean;
    refreshVisible?: boolean;
    resizeVisible?: boolean;
    tableSizeChange: EventEmitter<NzTableSize>;
    refreshClick: EventEmitter<void>;
    readonly tableSizeOptions: {
        sizeName: string;
        selected: boolean;
        value: string;
    }[];
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: {
        [K in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxTableHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxTableHeaderComponent, "nzx-table-header", never, { "tableSize": { "alias": "tableSize"; "required": false; }; "actionVisible": { "alias": "actionVisible"; "required": false; }; "refreshVisible": { "alias": "refreshVisible"; "required": false; }; "resizeVisible": { "alias": "resizeVisible"; "required": false; }; }, { "tableSizeChange": "tableSizeChange"; "refreshClick": "refreshClick"; }, never, ["*", "[setting-before]", "[setting]", "[toolbar]"], false, never>;
}
