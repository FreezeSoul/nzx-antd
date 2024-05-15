import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TimeUnitPipe implements PipeTransform {
    transform(value: number | undefined | null, unit: 's' | 'ms'): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeUnitPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TimeUnitPipe, "timeUnit", false>;
}
