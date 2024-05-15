import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzxAntdService } from '@xmagic/nzx-antd';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class HasAuthPipe implements PipeTransform {
    antdService: NzxAntdService;
    protected hasAuth: Required<NzxAntdService>['hasAuth'];
    constructor(antdService: NzxAntdService);
    transform(value: NzSafeAny): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HasAuthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HasAuthPipe, "hasAuth", false>;
}
