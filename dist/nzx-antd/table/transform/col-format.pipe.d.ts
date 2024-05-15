import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { CellArgType, NzxColumn } from '../table.type';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ColFormatPipe<T extends Record<string, NzSafeAny>> implements PipeTransform {
    transform(row: T, col: NzxColumn<T>, params: CellArgType<T>): Observable<T> | Promise<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColFormatPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ColFormatPipe<any>, "colFormat", false>;
}
