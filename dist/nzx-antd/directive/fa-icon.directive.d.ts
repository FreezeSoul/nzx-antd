import { ElementRef, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * font-awesome 使用指令
 * @
 * <i
 */
export declare class FaIconDirective implements OnInit, OnChanges {
    render: Renderer2;
    element: ElementRef;
    icon: string;
    type: 'far' | 'fa';
    spin?: boolean;
    pulse?: boolean;
    flip?: 'horizontal' | 'vertical' | 'both';
    pull?: 'left' | 'right';
    border?: boolean;
    inverse?: boolean;
    symbol?: string | boolean;
    rotate?: 90 | 180 | 270;
    fixedWidth?: boolean;
    stackItemSize?: '1x' | '2x';
    size?: IconSizeType;
    constructor(render: Renderer2, element: ElementRef);
    ngOnInit(): void;
    renderIcon(newIcon: string | null, oldIcon?: string | null): void;
    getIconClass(icon: string): string[];
    renderSize(newSize?: IconSizeType, oldSize?: IconSizeType): void;
    ngOnChanges(changes: {
        [K in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FaIconDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FaIconDirective, "[fa-icon]", ["faIcon"], { "icon": { "alias": "fa-icon"; "required": false; }; "type": { "alias": "type"; "required": false; }; "spin": { "alias": "spin"; "required": false; }; "pulse": { "alias": "pulse"; "required": false; }; "flip": { "alias": "flip"; "required": false; }; "pull": { "alias": "pull"; "required": false; }; "border": { "alias": "border"; "required": false; }; "inverse": { "alias": "inverse"; "required": false; }; "symbol": { "alias": "symbol"; "required": false; }; "rotate": { "alias": "rotate"; "required": false; }; "fixedWidth": { "alias": "fixedWidth"; "required": false; }; "stackItemSize": { "alias": "stackItemSize"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, false, never>;
}
export type IconSizeType = 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
