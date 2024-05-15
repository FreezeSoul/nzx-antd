import { PipeTransform } from '@angular/core';
import { CellArgType, NzxColumnButton } from '../table.type';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 处理链接的href属性
 */
export declare class LinkHrefPipe implements PipeTransform {
    transform(btn: NzxColumnButton, row: NzSafeAny, params: CellArgType<any>): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkHrefPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<LinkHrefPipe, "linkHref", false>;
}
