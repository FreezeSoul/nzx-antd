import { PipeTransform } from '@angular/core';
import { CellArgType, NzxColumnButton } from '../table.type';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class ColButtonVisiblePipe implements PipeTransform {
    transform(value?: NzxColumnButton['visible']): (row: NzSafeAny, params: CellArgType<NzSafeAny>) => boolean | undefined | null | void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColButtonVisiblePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ColButtonVisiblePipe, "colButtonVisible", false>;
}
