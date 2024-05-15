import { PipeTransform } from '@angular/core';
import { IndexAttr, NzxColumn, SpanFunc } from '../table.type';
import * as i0 from "@angular/core";
export declare class ColSpanPipe implements PipeTransform {
    transform<T>(row: T, spanFunc: SpanFunc<T>, nzData: T[], nzPageData: T[], column: NzxColumn<T>, indexAttr: IndexAttr, colIndex: IndexAttr): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColSpanPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ColSpanPipe, "colSpan", false>;
}
