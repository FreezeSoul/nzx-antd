import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, HostListener, PLATFORM_ID, Inject, ViewContainerRef, TemplateRef, NgModule } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { of } from 'rxjs';
import * as i1 from '@xmagic/nzx-antd';
import * as i1$1 from '@xmagic/nzx-antd/service';
import { NzxServiceModule } from '@xmagic/nzx-antd/service';

/**
 * 防止重复触发点击
 * @example
 * <button (click.once)="myMethod($event)" [delay]="1000" (originClick)="method($event)">按钮</button>
 */
class ClickOnceDirective {
    constructor() { }
    /**
     * 点击延迟时间(单位:ms)
     */
    delay = 500;
    disabled = false;
    /**
     * neClick事件
     */
    clickEvent = new EventEmitter();
    /**
     * 原始点击事件
     * delay - 是否处于延迟状态
     */
    originClick = new EventEmitter();
    _delayDisabled = false;
    clickEventHandle(event) {
        if (this.disabled) {
            return;
        }
        this.originClick.emit({ target: event, delay: this._delayDisabled });
        if (this._delayDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this._delayDisabled = true;
        setTimeout(() => (this._delayDisabled = false), this.delay);
        this.clickEvent.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ClickOnceDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ClickOnceDirective, selector: "[click.once]", inputs: { delay: "delay", disabled: "disabled" }, outputs: { clickEvent: "click.once", originClick: "originClick" }, host: { listeners: { "click": "clickEventHandle($event)" } }, ngImport: i0 });
}
__decorate([
    InputBoolean()
], ClickOnceDirective.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ClickOnceDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[click.once]'
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { delay: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clickEvent: [{
                type: Output,
                args: ['click.once']
            }], originClick: [{
                type: Output
            }], clickEventHandle: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/**
 * 获取模板名称
 * @example
 * ``` html
 * <ng-template named="test"></ng-template>
 * <ng-template #test named></ng-template>
 *
 * ```
 * ``` javascript
 * @Component(...)
 * export class TestComponent {
 *   @ViewChildren(NamedTemplate) list!: QueryList<NamedTemplate>;
 *
 *   trace() {
 *     this.list.forEach(it => {
 *       console.log(it.named);
 *       console.log(it.template);
 *     });
 *   }
 * }
 * ```
 */
class NamedTemplate {
    template;
    /**
     * 模板名称
     */
    named;
    constructor(template) {
        this.template = template;
    }
    ngOnInit() {
        this.resolveName();
    }
    resolveName() {
        if (!this.named && this.template) {
            const tplRef = this.template;
            // localNames为数组, 如果没有name则为null
            this.named = tplRef._declarationTContainer.localNames?.[0];
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NamedTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NamedTemplate, selector: "ng-template[named]", inputs: { named: "named" }, exportAs: ["namedTemplate"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NamedTemplate, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[named]',
                    exportAs: 'namedTemplate'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { named: [{
                type: Input
            }] } });

/**
 * font-awesome 使用指令
 * @
 * <i
 */
class FaIconDirective {
    render;
    element;
    icon;
    type = 'fa';
    spin;
    pulse;
    flip;
    pull;
    border;
    inverse;
    symbol;
    rotate;
    fixedWidth;
    stackItemSize;
    size;
    constructor(render, element) {
        this.render = render;
        this.element = element;
    }
    ngOnInit() {
        this.renderIcon(this.icon);
        this.renderSize(this.size);
    }
    renderIcon(newIcon, oldIcon) {
        if (oldIcon) {
            this.getIconClass(oldIcon).forEach(cls => this.render.removeClass(this.element.nativeElement, cls));
        }
        if (newIcon) {
            this.getIconClass(newIcon).forEach(cls => this.render.addClass(this.element.nativeElement, cls));
        }
    }
    getIconClass(icon) {
        return icon ? icon.split(/\s/) : [];
    }
    renderSize(newSize, oldSize) {
        const newSizeCls = newSize ? `fa-${newSize}` : null;
        const oldSizeCls = oldSize ? `fa-${oldSize}` : null;
        this.renderIcon(newSizeCls, oldSizeCls);
    }
    ngOnChanges(changes) {
        if (changes.icon && !changes.icon.isFirstChange()) {
            this.renderIcon(changes.icon.currentValue, changes.icon.previousValue);
        }
        if (changes.size && !changes.size.isFirstChange()) {
            this.renderSize(changes.size.currentValue, changes.size.previousValue);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FaIconDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: FaIconDirective, selector: "[fa-icon]", inputs: { icon: ["fa-icon", "icon"], type: "type", spin: "spin", pulse: "pulse", flip: "flip", pull: "pull", border: "border", inverse: "inverse", symbol: "symbol", rotate: "rotate", fixedWidth: "fixedWidth", stackItemSize: "stackItemSize", size: "size" }, host: { properties: { "class.fa": "type === 'fa'", "class.far": "type === 'far'", "class.fa-spin": "spin === true", "class.fa-pulse": "pulse === true", "class.fa-fw": "fixedWidth === true", "class.fa-border": "border === true", "class.fa-inverse": "inverse === true", "class.fa-flip-horizontal": "flip === 'horizontal'", "class.fa-flip-vertical": "flip === 'vertical'", "class.fa-flip-both": "flip === 'both'", "class.fa-pull-left": "pull === 'left'", "class.fa-pull-right": "pull === 'right'", "class.fa-rotate-90": "rotate === 90", "class.fa-rotate-180": "rotate === 180", "class.fa-rotate-270": "rotate === 270", "class.fa-stack-1x": "stackItemSize === '1x'", "class.fa-stack-2x": "stackItemSize === '2x'" } }, exportAs: ["faIcon"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: FaIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[fa-icon]',
                    exportAs: 'faIcon',
                    host: {
                        '[class.fa]': `type === 'fa'`,
                        '[class.far]': `type === 'far'`,
                        '[class.fa-spin]': 'spin === true',
                        '[class.fa-pulse]': 'pulse === true',
                        '[class.fa-fw]': 'fixedWidth === true',
                        '[class.fa-border]': 'border === true',
                        '[class.fa-inverse]': 'inverse === true',
                        '[class.fa-flip-horizontal]': `flip === 'horizontal'`,
                        '[class.fa-flip-vertical]': `flip === 'vertical'`,
                        '[class.fa-flip-both]': `flip === 'both'`,
                        '[class.fa-pull-left]': `pull === 'left'`,
                        '[class.fa-pull-right]': `pull === 'right'`,
                        '[class.fa-rotate-90]': `rotate === 90`,
                        '[class.fa-rotate-180]': `rotate === 180`,
                        '[class.fa-rotate-270]': `rotate === 270`,
                        '[class.fa-stack-1x]': `stackItemSize === '1x'`,
                        '[class.fa-stack-2x]': `stackItemSize === '2x'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { icon: [{
                type: Input,
                args: ['fa-icon']
            }], type: [{
                type: Input
            }], spin: [{
                type: Input
            }], pulse: [{
                type: Input
            }], flip: [{
                type: Input
            }], pull: [{
                type: Input
            }], border: [{
                type: Input
            }], inverse: [{
                type: Input
            }], symbol: [{
                type: Input
            }], rotate: [{
                type: Input
            }], fixedWidth: [{
                type: Input
            }], stackItemSize: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

class ClickOutsideDirective {
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

/**
 * 允许在模板内复用计算值（包含异步），避免重复重新计算。
 * @example
 *
 * <div *let="value1 as v">
 *   <p>{{ v }}</p>
 * </div>
 * <div *let="time$ | async as time">
 *   <p>{{ time }}</p>
 * </div>
 */
class LetDirective {
    let;
    constructor(vc, ref) {
        vc.createEmbeddedView(ref, new LetContext(this));
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LetDirective, deps: [{ token: ViewContainerRef }, { token: TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: LetDirective, selector: "[let]", inputs: { let: "let" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LetDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[let]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Inject,
                    args: [ViewContainerRef]
                }] }, { type: i0.TemplateRef, decorators: [{
                    type: Inject,
                    args: [TemplateRef]
                }] }]; }, propDecorators: { let: [{
                type: Input
            }] } });
class LetContext {
    directive;
    constructor(directive) {
        this.directive = directive;
    }
    get $implicit() {
        return this.directive.let;
    }
    get let() {
        return this.directive.let;
    }
}

/**
 * 权限指令, 有权限渲染模板,否则渲染else模板
 * @example
 * <button *auth="['code1', 'code2']; else notAuth">有权限时显示</button>
 * <button *auth="'code1'; else notAuth">有权限时显示</button>
 * <ng-template #notAuth>没有权限时显示</ng-template>
 */
class AuthDirective {
    _viewContainer;
    templateRef;
    antdService;
    /** @internal */
    static authUseIfTypeGuard;
    static ngTemplateGuard_auth;
    changeSubscription;
    authSubscription;
    _context = new AuthContext();
    _thenTemplateRef = null;
    _elseTemplateRef = null;
    _thenViewRef = null;
    _elseViewRef = null;
    /**
     *
     * 为 `auth` 将要渲染的模板确保正确的上下文类型。
     * 该方法用于向 Ivy 模板类型检查编译器发出信号，即 `auth` 结构化指令会使用特定的上下文类型渲染其模板。
     *
     */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    hasAuth = () => of(true);
    constructor(_viewContainer, templateRef, antdService) {
        this._viewContainer = _viewContainer;
        this.templateRef = templateRef;
        this.antdService = antdService;
        this._thenTemplateRef = templateRef;
        if (this.antdService.authChange) {
            this.changeSubscription = this.antdService.authChange().subscribe(() => this._updateView());
        }
        if (this.antdService.hasAuth) {
            this.hasAuth = this.antdService.hasAuth;
        }
    }
    /**
     * 布尔表达式，将其作为显示模板的条件进行计算。
     *
     */
    set auth(condition) {
        this._context.$implicit = this._context.auth = condition;
        this._updateView();
    }
    /**
     * 当此条件表达式计算为 true 时要显示的模板。
     */
    set authThen(templateRef) {
        assertTemplate('authThen', templateRef);
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null; // clear previous view if any.
        this._updateView();
    }
    /**
     * 当此条件表达式计算为 false 时要显示的模板。
     */
    set authElse(templateRef) {
        assertTemplate('authElse', templateRef);
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null; // clear previous view if any.
        this._updateView();
    }
    _updateView() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
            this.authSubscription = undefined;
        }
        this.authSubscription = this.hasAuth(this._context.$implicit).subscribe(auth => {
            if (this.canRender(auth, this._context.$implicit)) {
                if (!this._thenViewRef) {
                    this._viewContainer.clear();
                    this._elseViewRef = null;
                    if (this._thenTemplateRef) {
                        this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                    }
                }
            }
            else {
                if (!this._elseViewRef) {
                    this._viewContainer.clear();
                    this._thenViewRef = null;
                    if (this._elseTemplateRef) {
                        this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                    }
                }
            }
        });
    }
    /**
     * 是否允许渲染
     * @param hasAuth 是否有权限
     * @param value 权限码
     * @protected
     */
    canRender(hasAuth, value) {
        return hasAuth;
    }
    ngOnDestroy() {
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: AuthDirective, selector: "[auth]", inputs: { auth: "auth", authThen: "authThen", authElse: "authElse" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[auth]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NzxAntdService }]; }, propDecorators: { auth: [{
                type: Input
            }], authThen: [{
                type: Input
            }], authElse: [{
                type: Input
            }] } });
/**
 * @publicApi
 */
class AuthContext {
    $implicit = null;
    auth = null;
}
function assertTemplate(property, templateRef) {
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received '${templateRef}'.`);
    }
}

/**
 * 权限指令, 无权限渲染模板,否则渲染else模板
 * @example
 * <button *auth.not="['code1', 'code2']; else hasAuth">没有有权限时显示</button>
 * <button *auth.not="'code1'; else hasAuth">没有有权限时显示</button>
 * <ng-template #hasAuth>有权限时显示</ng-template>
 */
class AuthNotDirective extends AuthDirective {
    _viewContainer;
    templateRef;
    antdService;
    /** @internal */
    static authNotUseIfTypeGuard;
    static ngTemplateGuard_authNot;
    /**
     * 布尔表达式，将其作为显示模板的条件进行计算。
     *
     */
    set authNot(condition) {
        super.auth = condition;
    }
    /**
     * 当此条件表达式计算为 true 时要显示的模板。
     */
    set authNotThen(templateRef) {
        super.authThen = templateRef;
    }
    /**
     * 当此条件表达式计算为 false 时要显示的模板。
     */
    set authNotElse(templateRef) {
        super.authElse = templateRef;
    }
    /**
     * 是否允许渲染, 没有权限的时候渲染
     * @param hasAuth 是否有权限
     * @param value 权限码
     * @protected
     */
    canRender(hasAuth, value) {
        return !hasAuth;
    }
    constructor(_viewContainer, templateRef, antdService) {
        super(_viewContainer, templateRef, antdService);
        this._viewContainer = _viewContainer;
        this.templateRef = templateRef;
        this.antdService = antdService;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthNotDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: AuthNotDirective, selector: "[auth.not]", inputs: { authNot: ["auth.not", "authNot"], authNotThen: ["auth.notThen", "authNotThen"], authNotElse: ["auth.notElse", "authNotElse"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AuthNotDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[auth.not]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.NzxAntdService }]; }, propDecorators: { authNot: [{
                type: Input,
                args: ['auth.not']
            }], authNotThen: [{
                type: Input,
                args: ['auth.notThen']
            }], authNotElse: [{
                type: Input,
                args: ['auth.notElse']
            }] } });

class DownFileDirective {
    downloadService;
    /**
     * 下载文件的url
     */
    url;
    /**
     * 是否禁用点击下载
     */
    disabled = false;
    /**
     * 请求方式
     */
    method = 'get';
    /**
     * 请求参数
     */
    data;
    /**
     * 发送之前的回调函数
     */
    beforeSend;
    /**
     * 请求完成后的回调
     */
    afterDownload;
    /**
     * 下载并保存完成的回调
     */
    downloadDone;
    /**
     * 下载发生错误回调
     * @param error
     */
    downloadError;
    /**
     * 获取下载文件名函数
     */
    getFileName;
    constructor(downloadService) {
        this.downloadService = downloadService;
    }
    clickEventHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.downloadService.download({
            url: this.url,
            method: this.method,
            data: this.data,
            beforeSend: this.beforeSend,
            afterDownload: this.afterDownload,
            downloadDone: this.downloadDone,
            getFileName: this.getFileName
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DownFileDirective, deps: [{ token: i1$1.NzxDownloadService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: DownFileDirective, selector: "[down-file]", inputs: { url: ["down-file", "url"], disabled: "disabled", method: "method", data: "data", beforeSend: "beforeSend", afterDownload: "afterDownload", downloadDone: "downloadDone", downloadError: "downloadError", getFileName: "getFileName" }, host: { listeners: { "click": "clickEventHandler($event)" } }, exportAs: ["downFile"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DownFileDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[down-file]',
                    exportAs: 'downFile'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.NzxDownloadService }]; }, propDecorators: { url: [{
                type: Input,
                args: ['down-file']
            }], disabled: [{
                type: Input
            }], method: [{
                type: Input
            }], data: [{
                type: Input
            }], beforeSend: [{
                type: Input
            }], afterDownload: [{
                type: Input
            }], downloadDone: [{
                type: Input
            }], downloadError: [{
                type: Input
            }], getFileName: [{
                type: Input
            }], clickEventHandler: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/**
 * 和ngFor指令用法类似,同时支持多种数据结构,比如: Map,key/value,Iterable,
 * 使用 `*ngx-for` 和 `*ngxFor`是等效的。如果是迭代对象（数组等）上下文参数中的key和index是一样的, key是`string`类型
 * @example
 * ```ts
 * @Component({
 *   selector: 'test',
 *   template: `
 * <ul>
 *   <li *ngx-for="let value of myObject; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 *
 *   <li *ngx-for="let value of myList; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 *
 *   <li *ngxFor="let value of myObject; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 *
 *   <li *ngxFor="let value of myList; index as index; key as key">
 *     {{ index }}. {{ key }}: {{ value }}
 *   </li>
 * </ul>
 *   `,
 * })
 * export class TestComponent {
 *   myObject = {
 *     name1: '张三',
 *     name2: '李四',
 *     name3: '王五'
 *   };
 *
 *   myList = ['张三', '李四', '王五']
 * }
 * ```
 */
class NgxFor {
    _viewContainer;
    _template;
    _differs;
    _kvDiffers;
    _ngxForOf = null;
    _ngxForDirty = true;
    _differ = null;
    _trackByFn;
    static ngxTemplateContextGuard(dir, ctx) {
        return true;
    }
    get ngxForTrackBy() {
        return this._trackByFn;
    }
    set ngxForTrackBy(fn) {
        this._trackByFn = fn;
    }
    set ngxForOf(ngxFor) {
        this._ngxForOf = ngxFor;
        this._ngxForDirty = true;
    }
    set ngxFor_2(ngxFor) {
        this._ngxForOf = ngxFor;
        this._ngxForDirty = true;
    }
    set ngxForTrackBy_2(fn) {
        this._trackByFn = fn;
    }
    constructor(_viewContainer, _template, _differs, _kvDiffers) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._kvDiffers = _kvDiffers;
    }
    set ngxForTemplate(value) {
        if (value) {
            this._template = value;
        }
    }
    set ngxForTemplate_2(value) {
        if (value) {
            this._template = value;
        }
    }
    ngDoCheck() {
        if (this._ngxForDirty) {
            this._ngxForDirty = false;
            const value = this._ngxForOf;
            if (!value) {
                this._differ = null;
            }
            else if (!this._differ) {
                const factory = this._differs.find([]);
                if (factory.supports(value)) {
                    this._differ = new IterDiffer(factory.create(this._trackByFn), this._viewContainer, this._template);
                }
                else {
                    const kvFactory = this._kvDiffers.find({});
                    if (kvFactory.supports(value)) {
                        this._differ = new KvDiffer(kvFactory.create(), this._viewContainer, this._template);
                    }
                }
            }
        }
        if (this._differ) {
            const changes = this._differ.diff(this._ngxForOf);
            if (changes) {
                changes.applyChanges(this._ngxForOf);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxFor, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i0.IterableDiffers }, { token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NgxFor, selector: "[ngx-for][ngx-forOf],[ngxFor][ngxForOf]", inputs: { ngxForTrackBy: "ngxForTrackBy", ngxForOf: "ngxForOf", ngxFor_2: ["ngx-forOf", "ngxFor_2"], ngxForTrackBy_2: ["ngx-forTrackBy", "ngxForTrackBy_2"], ngxForTemplate: "ngxForTemplate", ngxForTemplate_2: ["ngx-forTemplate", "ngxForTemplate_2"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgxFor, decorators: [{
            type: Directive,
            args: [{ selector: '[ngx-for][ngx-forOf],[ngxFor][ngxForOf]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }]; }, propDecorators: { ngxForTrackBy: [{
                type: Input
            }], ngxForOf: [{
                type: Input
            }], ngxFor_2: [{
                type: Input,
                args: ['ngx-forOf']
            }], ngxForTrackBy_2: [{
                type: Input,
                args: ['ngx-forTrackBy']
            }], ngxForTemplate: [{
                type: Input
            }], ngxForTemplate_2: [{
                type: Input,
                args: ['ngx-forTemplate']
            }] } });
function applyViewChange(view, value) {
    view.context.$implicit = value;
}
function resolveContext(viewContainer, _ngxFor, callback = () => 0) {
    for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
        const viewRef = viewContainer.get(i);
        const context = viewRef.context;
        context.index = i;
        context.count = ilen;
        context.ngxFor = _ngxFor;
        callback(context);
    }
}
class NgxForContext {
    $implicit;
    ngxFor;
    index;
    key;
    count;
    constructor($implicit, ngxFor, index, key, count) {
        this.$implicit = $implicit;
        this.ngxFor = ngxFor;
        this.index = index;
        this.key = key;
        this.count = count;
    }
    get first() {
        return this.index === 0;
    }
    get last() {
        return this.index === this.count - 1;
    }
    get even() {
        return this.index % 2 === 0;
    }
    get odd() {
        return !this.even;
    }
}
class IterDiffer {
    differ;
    _viewContainer;
    _template;
    constructor(differ, _viewContainer, _template) {
        this.differ = differ;
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    diff(value) {
        const changes = this.differ.diff(value);
        if (!changes) {
            return null;
        }
        return {
            applyChanges: _ngxFor => {
                const viewContainer = this._viewContainer;
                changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
                    if (item.previousIndex == null) {
                        viewContainer.createEmbeddedView(this._template, new NgxForContext(item.item, _ngxFor, -1, '', -1), currentIndex === null ? undefined : currentIndex);
                    }
                    else if (currentIndex == null) {
                        viewContainer.remove(adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex);
                    }
                    else if (adjustedPreviousIndex !== null) {
                        const view = viewContainer.get(adjustedPreviousIndex);
                        viewContainer.move(view, currentIndex);
                        applyViewChange(view, item.item);
                    }
                });
                resolveContext(viewContainer, _ngxFor, context => (context.key = context.index + ''));
                changes.forEachIdentityChange(record => {
                    const viewRef = viewContainer.get(record.currentIndex);
                    applyViewChange(viewRef, record.item);
                });
            }
        };
    }
}
class KvDiffer {
    differ;
    _viewContainer;
    _template;
    keyIndex = {};
    constructor(differ, _viewContainer, _template) {
        this.differ = differ;
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    diff(value) {
        const changes = this.differ.diff(value);
        if (!changes) {
            return null;
        }
        return {
            applyChanges: _ngxFor => {
                const viewContainer = this._viewContainer;
                const removes = [];
                changes.forEachRemovedItem(item => {
                    const index = this.keyIndex[item.key];
                    removes.push(index);
                    delete this.keyIndex[item.key];
                });
                removes.sort();
                for (let i = removes.length - 1; i >= 0; i--) {
                    viewContainer.remove(removes[i]);
                }
                changes.forEachChangedItem(item => {
                    const index = this.keyIndex[item.key];
                    const view = viewContainer.get(index);
                    applyViewChange(view, item.currentValue);
                });
                const keys = value instanceof Map ? Array.from(value.keys()) : Object.keys(value);
                changes.forEachAddedItem(item => {
                    viewContainer.createEmbeddedView(this._template, new NgxForContext(item.currentValue, _ngxFor, -1, item.key, -1), keys.indexOf(item.key));
                });
                resolveContext(viewContainer, _ngxFor, context => (this.keyIndex[context.key] = context.index));
            }
        };
    }
}

const DIRECTIVE = [
    NamedTemplate,
    ClickOnceDirective,
    FaIconDirective,
    ClickOutsideDirective,
    LetDirective,
    DownFileDirective,
    AuthDirective,
    AuthNotDirective,
    NgxFor
];
class NzxDirectiveModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, declarations: [NamedTemplate,
            ClickOnceDirective,
            FaIconDirective,
            ClickOutsideDirective,
            LetDirective,
            DownFileDirective,
            AuthDirective,
            AuthNotDirective,
            NgxFor], imports: [CommonModule, NzxServiceModule], exports: [NamedTemplate,
            ClickOnceDirective,
            FaIconDirective,
            ClickOutsideDirective,
            LetDirective,
            DownFileDirective,
            AuthDirective,
            AuthNotDirective,
            NgxFor] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, imports: [CommonModule, NzxServiceModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxDirectiveModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DIRECTIVE],
                    imports: [CommonModule, NzxServiceModule],
                    exports: [DIRECTIVE]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AuthContext, AuthDirective, AuthNotDirective, ClickOnceDirective, ClickOutsideDirective, DownFileDirective, FaIconDirective, LetContext, LetDirective, NamedTemplate, NgxFor, NgxForContext, NzxDirectiveModule };
//# sourceMappingURL=xmagic-nzx-antd-directive.mjs.map
