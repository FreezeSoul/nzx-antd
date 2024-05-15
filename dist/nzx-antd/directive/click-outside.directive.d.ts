import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ClickOutsideDirective implements OnInit, OnChanges, OnDestroy {
    private _el;
    private _ngZone;
    private platformId;
    clickOutsideEnabled: boolean;
    attachOutsideOnClick: boolean;
    delayClickOutsideInit: boolean;
    emitOnBlur: boolean;
    exclude?: string;
    excludeBeforeClick?: boolean;
    clickOutsideEvents?: string;
    clickOutside: EventEmitter<Event>;
    private _nodesExcluded;
    private _events;
    constructor(_el: ElementRef, _ngZone: NgZone, platformId: Object);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _init;
    private _initOnClickBody;
    private _excludeCheck;
    private _onClickBody;
    /**
     * Resolves problem with outside click on iframe
     * @see https://github.com/arkon/ng-click-outside/issues/32
     */
    private _onWindowBlur;
    private _emit;
    private _shouldExclude;
    private _initClickOutsideListener;
    private _removeClickOutsideListener;
    private _initAttachOutsideOnClickListener;
    private _removeAttachOutsideOnClickListener;
    private _initWindowBlurListener;
    private _removeWindowBlurListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickOutsideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickOutsideDirective, "[click.outside]", ["clickOutside"], { "clickOutsideEnabled": { "alias": "clickOutsideEnabled"; "required": false; }; "attachOutsideOnClick": { "alias": "attachOutsideOnClick"; "required": false; }; "delayClickOutsideInit": { "alias": "delayClickOutsideInit"; "required": false; }; "emitOnBlur": { "alias": "emitOnBlur"; "required": false; }; "exclude": { "alias": "exclude"; "required": false; }; "excludeBeforeClick": { "alias": "excludeBeforeClick"; "required": false; }; "clickOutsideEvents": { "alias": "clickOutsideEvents"; "required": false; }; }, { "clickOutside": "click.outside"; }, never, never, false, never>;
}
