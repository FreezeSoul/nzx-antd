import { ElementRef, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 按钮指令，增强ng-zorro-antd按钮颜色, 和nz-button组件配合使用, 只增加`nzxColor`属性
 *
 * 颜色值取自 https://ant.design/docs/spec/colors-cn
 */
export declare class NzxButtonDirective implements OnInit, OnChanges {
    protected renderer: Renderer2;
    protected elementRef: ElementRef<HTMLElement>;
    /**
     * 按钮颜色名称
     */
    nzxColor?: NzxColorType;
    constructor(renderer: Renderer2, elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    /**
     * 添加按钮class 名称
     * @param className class 名称
     * @protected
     */
    protected addButtonClass(className?: NzxColorType): void;
    ngOnChanges(changes: {
        [K in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzxButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzxButtonDirective, "[nz-button]", ["nzxButton"], { "nzxColor": { "alias": "nzxColor"; "required": false; }; }, {}, never, never, false, never>;
}
export type NzxColorType = 'success' | 'warning' | 'info' | 'error' | 'gray' | 'teal' | 'cyan' | string;
