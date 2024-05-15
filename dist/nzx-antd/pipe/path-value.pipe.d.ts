import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 根据路径获取数据
 * @example
 * {{ {a: {b: 1}} | pathValue: 'a.b'}} // 1
 */
export declare class PathValuePipe implements PipeTransform {
    transform<T>(value: NzSafeAny, path: string, defaultValue?: NzSafeAny): T;
    static ɵfac: i0.ɵɵFactoryDeclaration<PathValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PathValuePipe, "pathValue", false>;
}
