import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 防止重复触发点击
 * @example
 * <button (click.once)="myMethod($event)" [delay]="1000" (originClick)="method($event)">按钮</button>
 */
export declare class ClickOnceDirective {
    constructor();
    /**
     * 点击延迟时间(单位:ms)
     */
    delay: number;
    disabled: boolean;
    /**
     * neClick事件
     */
    clickEvent: EventEmitter<MouseEvent>;
    /**
     * 原始点击事件
     * delay - 是否处于延迟状态
     */
    originClick: EventEmitter<{
        target: MouseEvent;
        delay: boolean;
    }>;
    private _delayDisabled;
    clickEventHandle(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickOnceDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickOnceDirective, "[click.once]", never, { "delay": { "alias": "delay"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "clickEvent": "click.once"; "originClick": "originClick"; }, never, never, false, never>;
}
