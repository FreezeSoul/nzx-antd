import * as i0 from "@angular/core";
export declare class NzxContentComponent {
    /**
     * 显示验证占位符(是否显示form-item底部的空白)
     */
    formItemBottomVisible: boolean;
    /**
     * margin
     */
    margin?: string;
    /**
     * margin top
     */
    marginTop: string;
    get hideFormItemBottom(): boolean;
    get contentMargin(): string | undefined;
    get contentMarginTop(): string;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxContentComponent, "nzx-content", never, { "formItemBottomVisible": { "alias": "formItemBottomVisible"; "required": false; }; "margin": { "alias": "margin"; "required": false; }; "marginTop": { "alias": "marginTop"; "required": false; }; }, {}, never, ["*"], false, never>;
}
