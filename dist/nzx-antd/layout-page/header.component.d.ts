import * as i0 from "@angular/core";
export declare class NzxHeaderComponent {
    hasContent: boolean;
    /**
     * 显示验证占位符(是否显示form-item底部的空白)
     */
    hasBottom: boolean;
    /**
     * 是否显示按钮区域
     */
    buttonsVisible: boolean;
    get hideFormItemBottom(): boolean;
    constructor();
    contentChanged(element: HTMLElement): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzxHeaderComponent, "nzx-header", never, { "hasBottom": { "alias": "hasBottom"; "required": false; }; "buttonsVisible": { "alias": "buttonsVisible"; "required": false; }; }, {}, never, ["*", "[buttons]"], false, never>;
}
