import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import * as i0 from "@angular/core";
export declare class DefaultifyPipe implements PipeTransform {
    protected antdService: NzxAntdService;
    constructor(antdService: NzxAntdService);
    transform<T = NzSafeAny>(value: T | undefined | null, defaultValue?: T | string): T | string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultifyPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DefaultifyPipe, "defaultify", false>;
}
