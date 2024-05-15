import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * 包含开始和结束两个控件，子组件使用`start`和`end`属性来插入到对应的容易内。
 */
export declare class NzxBetweenComponent {
    /**
     * 是否禁用
     */
    nzxDisabled: boolean;
    /**
     * 控件大小
     */
    nzxSize: NzSizeLDSType;
    /**
     * 开始字段禁用
     */
    nzxStartDisabled?: boolean;
    /**
     * 结束字段禁用
     */
    nzxEndDisabled?: boolean;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxBetweenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxBetweenComponent, "nzx-between", ["nzxBetween"], { "nzxDisabled": { "alias": "nzxDisabled"; "required": false; }; "nzxSize": { "alias": "nzxSize"; "required": false; }; "nzxStartDisabled": { "alias": "nzxStartDisabled"; "required": false; }; "nzxEndDisabled": { "alias": "nzxEndDisabled"; "required": false; }; }, {}, never, ["[start]", "[end]"], false, never>;
}
