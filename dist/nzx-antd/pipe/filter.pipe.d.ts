import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class FilterPipe implements PipeTransform {
    transform<T = NzSafeAny>(array: T[], matcher: string, searchText?: string): T[];
    transform<T = NzSafeAny>(array: T[], matcher: FilterMatcherFn<T>): T[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterPipe, "filter", false>;
}
export type FilterMatcherFn<T> = (item: T) => boolean;
