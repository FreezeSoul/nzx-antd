import { Directive, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export class ClickOutsideDirective {
    _el;
    _ngZone;
    platformId;
    clickOutsideEnabled = true;
    attachOutsideOnClick = false;
    delayClickOutsideInit = false;
    emitOnBlur = false;
    exclude;
    excludeBeforeClick;
    clickOutsideEvents;
    clickOutside = new EventEmitter();
    _nodesExcluded = [];
    _events = ['click'];
    constructor(_el, _ngZone, platformId) {
        this._el = _el;
        this._ngZone = _ngZone;
        this.platformId = platformId;
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
        this._onWindowBlur = this._onWindowBlur.bind(this);
    }
    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this._init();
    }
    ngOnDestroy() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this._removeClickOutsideListener();
        this._removeAttachOutsideOnClickListener();
        this._removeWindowBlurListener();
    }
    ngOnChanges(changes) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (changes['attachOutsideOnClick'] || changes['exclude'] || changes['emitOnBlur']) {
            this._init();
        }
    }
    _init() {
        if (this.clickOutsideEvents != null) {
            this._events = this.clickOutsideEvents.split(',').map(e => e.trim());
        }
        this._excludeCheck();
        if (this.attachOutsideOnClick) {
            this._initAttachOutsideOnClickListener();
        }
        else {
            this._initOnClickBody();
        }
        if (this.emitOnBlur) {
            this._initWindowBlurListener();
        }
    }
    _initOnClickBody() {
        if (this.delayClickOutsideInit) {
            setTimeout(this._initClickOutsideListener.bind(this));
        }
        else {
            this._initClickOutsideListener();
        }
    }
    _excludeCheck() {
        if (this.exclude) {
            try {
                const nodes = Array.from(document.querySelectorAll(this.exclude));
                if (nodes) {
                    this._nodesExcluded = nodes;
                }
            }
            catch (err) {
                console.error('[ng-click-outside] Check your exclude selector syntax.', err);
            }
        }
    }
    _onClickBody(ev) {
        if (!this.clickOutsideEnabled) {
            return;
        }
        if (this.excludeBeforeClick) {
            this._excludeCheck();
        }
        if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
            this._emit(ev);
            if (this.attachOutsideOnClick) {
                this._removeClickOutsideListener();
            }
        }
    }
    /**
     * Resolves problem with outside click on iframe
     * @see https://github.com/arkon/ng-click-outside/issues/32
     */
    _onWindowBlur(ev) {
        setTimeout(() => {
            if (!document.hidden) {
                this._emit(ev);
            }
        });
    }
    _emit(ev) {
        if (!this.clickOutsideEnabled) {
            return;
        }
        this._ngZone.run(() => this.clickOutside.emit(ev));
    }
    _shouldExclude(target) {
        for (const excludedNode of this._nodesExcluded) {
            if (excludedNode.contains(target)) {
                return true;
            }
        }
        return false;
    }
    _initClickOutsideListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => document.addEventListener(e, this._onClickBody));
        });
    }
    _removeClickOutsideListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => document.removeEventListener(e, this._onClickBody));
        });
    }
    _initAttachOutsideOnClickListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
        });
    }
    _removeAttachOutsideOnClickListener() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
        });
    }
    _initWindowBlurListener() {
        this._ngZone.runOutsideAngular(() => {
            window.addEventListener('blur', this._onWindowBlur);
        });
    }
    _removeWindowBlurListener() {
        this._ngZone.runOutsideAngular(() => {
            window.removeEventListener('blur', this._onWindowBlur);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ClickOutsideDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ClickOutsideDirective, selector: "[click.outside]", inputs: { clickOutsideEnabled: "clickOutsideEnabled", attachOutsideOnClick: "attachOutsideOnClick", delayClickOutsideInit: "delayClickOutsideInit", emitOnBlur: "emitOnBlur", exclude: "exclude", excludeBeforeClick: "excludeBeforeClick", clickOutsideEvents: "clickOutsideEvents" }, outputs: { clickOutside: "click.outside" }, exportAs: ["clickOutside"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ClickOutsideDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[click.outside]',
                    exportAs: 'clickOutside'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { clickOutsideEnabled: [{
                type: Input
            }], attachOutsideOnClick: [{
                type: Input
            }], delayClickOutsideInit: [{
                type: Input
            }], emitOnBlur: [{
                type: Input
            }], exclude: [{
                type: Input
            }], excludeBeforeClick: [{
                type: Input
            }], clickOutsideEvents: [{
                type: Input
            }], clickOutside: [{
                type: Output,
                args: ['click.outside']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsTUFBTSxFQUNOLFdBQVcsRUFHWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFNcEQsTUFBTSxPQUFPLHFCQUFxQjtJQWlCWjtJQUF5QjtJQUE4QztJQWhCbEYsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBRTNCLG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUM3QixxQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFDOUIsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUVuQixPQUFPLENBQVU7SUFDakIsa0JBQWtCLENBQVc7SUFFN0Isa0JBQWtCLENBQVU7SUFFWixZQUFZLEdBQXdCLElBQUksWUFBWSxFQUFTLENBQUM7SUFFL0UsY0FBYyxHQUF1QixFQUFFLENBQUM7SUFDeEMsT0FBTyxHQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTNDLFlBQW9CLEdBQWUsRUFBVSxPQUFlLEVBQStCLFVBQWtCO1FBQXpGLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDM0csSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENB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RUFpQnNDLFdBQVc7NEZBakJ0RSxxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBSmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzswQkFrQmdFLE1BQU07MkJBQUMsV0FBVzs0Q0FoQnhFLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFFRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFFRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBRW1CLFlBQVk7c0JBQXBDLE1BQU07dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUExBVEZPUk1fSUQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBOZ1pvbmVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY2xpY2sub3V0c2lkZV0nLFxyXG4gIGV4cG9ydEFzOiAnY2xpY2tPdXRzaWRlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgY2xpY2tPdXRzaWRlRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIGF0dGFjaE91dHNpZGVPbkNsaWNrID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGVsYXlDbGlja091dHNpZGVJbml0ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW1pdE9uQmx1ciA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBleGNsdWRlPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGV4Y2x1ZGVCZWZvcmVDbGljaz86IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIGNsaWNrT3V0c2lkZUV2ZW50cz86IHN0cmluZztcclxuXHJcbiAgQE91dHB1dCgnY2xpY2sub3V0c2lkZScpIGNsaWNrT3V0c2lkZTogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcblxyXG4gIHByaXZhdGUgX25vZGVzRXhjbHVkZWQ6IEFycmF5PEhUTUxFbGVtZW50PiA9IFtdO1xyXG4gIHByaXZhdGUgX2V2ZW50czogQXJyYXk8c3RyaW5nPiA9IFsnY2xpY2snXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xyXG4gICAgdGhpcy5faW5pdE9uQ2xpY2tCb2R5ID0gdGhpcy5faW5pdE9uQ2xpY2tCb2R5LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9vbkNsaWNrQm9keSA9IHRoaXMuX29uQ2xpY2tCb2R5LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLl9vbldpbmRvd0JsdXIgPSB0aGlzLl9vbldpbmRvd0JsdXIuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVtb3ZlQ2xpY2tPdXRzaWRlTGlzdGVuZXIoKTtcclxuICAgIHRoaXMuX3JlbW92ZUF0dGFjaE91dHNpZGVPbkNsaWNrTGlzdGVuZXIoKTtcclxuICAgIHRoaXMuX3JlbW92ZVdpbmRvd0JsdXJMaXN0ZW5lcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snYXR0YWNoT3V0c2lkZU9uQ2xpY2snXSB8fCBjaGFuZ2VzWydleGNsdWRlJ10gfHwgY2hhbmdlc1snZW1pdE9uQmx1ciddKSB7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jbGlja091dHNpZGVFdmVudHMgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9ldmVudHMgPSB0aGlzLmNsaWNrT3V0c2lkZUV2ZW50cyEuc3BsaXQoJywnKS5tYXAoZSA9PiBlLnRyaW0oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZXhjbHVkZUNoZWNrKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYXR0YWNoT3V0c2lkZU9uQ2xpY2spIHtcclxuICAgICAgdGhpcy5faW5pdEF0dGFjaE91dHNpZGVPbkNsaWNrTGlzdGVuZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2luaXRPbkNsaWNrQm9keSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmVtaXRPbkJsdXIpIHtcclxuICAgICAgdGhpcy5faW5pdFdpbmRvd0JsdXJMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaW5pdE9uQ2xpY2tCb2R5KCkge1xyXG4gICAgaWYgKHRoaXMuZGVsYXlDbGlja091dHNpZGVJbml0KSB7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5faW5pdENsaWNrT3V0c2lkZUxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faW5pdENsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9leGNsdWRlQ2hlY2soKSB7XHJcbiAgICBpZiAodGhpcy5leGNsdWRlKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5leGNsdWRlKSkgYXMgQXJyYXk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIGlmIChub2Rlcykge1xyXG4gICAgICAgICAgdGhpcy5fbm9kZXNFeGNsdWRlZCA9IG5vZGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignW25nLWNsaWNrLW91dHNpZGVdIENoZWNrIHlvdXIgZXhjbHVkZSBzZWxlY3RvciBzeW50YXguJywgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25DbGlja0JvZHkoZXY6IEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuY2xpY2tPdXRzaWRlRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXhjbHVkZUJlZm9yZUNsaWNrKSB7XHJcbiAgICAgIHRoaXMuX2V4Y2x1ZGVDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldi50YXJnZXQpICYmICF0aGlzLl9zaG91bGRFeGNsdWRlKGV2LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgdGhpcy5fZW1pdChldik7XHJcblxyXG4gICAgICBpZiAodGhpcy5hdHRhY2hPdXRzaWRlT25DbGljaykge1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc29sdmVzIHByb2JsZW0gd2l0aCBvdXRzaWRlIGNsaWNrIG9uIGlmcmFtZVxyXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Fya29uL25nLWNsaWNrLW91dHNpZGUvaXNzdWVzLzMyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25XaW5kb3dCbHVyKGV2OiBFdmVudCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKSB7XHJcbiAgICAgICAgdGhpcy5fZW1pdChldik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZW1pdChldjogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5jbGlja091dHNpZGVFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQoZXYpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3VsZEV4Y2x1ZGUodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgZm9yIChjb25zdCBleGNsdWRlZE5vZGUgb2YgdGhpcy5fbm9kZXNFeGNsdWRlZCkge1xyXG4gICAgICBpZiAoZXhjbHVkZWROb2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaW5pdENsaWNrT3V0c2lkZUxpc3RlbmVyKCkge1xyXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goZSA9PiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsIHRoaXMuX29uQ2xpY2tCb2R5KSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZUNsaWNrT3V0c2lkZUxpc3RlbmVyKCkge1xyXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goZSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHRoaXMuX29uQ2xpY2tCb2R5KSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luaXRBdHRhY2hPdXRzaWRlT25DbGlja0xpc3RlbmVyKCkge1xyXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goZSA9PiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZSwgdGhpcy5faW5pdE9uQ2xpY2tCb2R5KSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbW92ZUF0dGFjaE91dHNpZGVPbkNsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaChlID0+IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9pbml0T25DbGlja0JvZHkpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaW5pdFdpbmRvd0JsdXJMaXN0ZW5lcigpIHtcclxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fb25XaW5kb3dCbHVyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlV2luZG93Qmx1ckxpc3RlbmVyKCkge1xyXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9vbldpbmRvd0JsdXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==