import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 调用数学函数 如{{ 5.1 | math: 'ceil' }} => 6
 */
export declare class MathPipe implements PipeTransform {
    transform(value: string | number, fnName: keyof Math, fixed?: number): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<MathPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MathPipe, "math", false>;
}
