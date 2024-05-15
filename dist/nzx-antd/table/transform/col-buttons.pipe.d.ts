import { PipeTransform } from '@angular/core';
import { CellArgType } from '../table.type';
import * as i0 from "@angular/core";
export declare class ColButtonsPipe<T> implements PipeTransform {
    transform(buttons: T[] | ((row: T, params: CellArgType<T> & {
        parentRow?: T;
    }) => T[]), row: T, params: CellArgType<T>, parentRow?: T): import("rxjs").Observable<T[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColButtonsPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ColButtonsPipe<any>, "colButtons", false>;
}
