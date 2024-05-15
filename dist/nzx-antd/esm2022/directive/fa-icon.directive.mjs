import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * font-awesome 使用指令
 * @
 * <i
 */
export class FaIconDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEtaWNvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL2ZhLWljb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUE2RCxNQUFNLGVBQWUsQ0FBQzs7QUFFeEg7Ozs7R0FJRztBQXdCSCxNQUFNLE9BQU8sZUFBZTtJQWVQO0lBQTBCO0lBZDNCLElBQUksQ0FBVTtJQUN2QixJQUFJLEdBQWlCLElBQUksQ0FBQztJQUMxQixJQUFJLENBQVc7SUFDZixLQUFLLENBQVc7SUFDaEIsSUFBSSxDQUFzQztJQUMxQyxJQUFJLENBQW9CO0lBQ3hCLE1BQU0sQ0FBVztJQUNqQixPQUFPLENBQVc7SUFDbEIsTUFBTSxDQUFvQjtJQUMxQixNQUFNLENBQWtCO0lBQ3hCLFVBQVUsQ0FBVztJQUNyQixhQUFhLENBQWU7SUFDNUIsSUFBSSxDQUFnQjtJQUU3QixZQUFtQixNQUFpQixFQUFTLE9BQW1CO1FBQTdDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUcsQ0FBQztJQUVwRSxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFzQixFQUFFLE9BQXVCO1FBQ3hELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JHO1FBQ0QsSUFBSSxPQUFP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ZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogZm9udC1hd2Vzb21lIOS9v+eUqOaMh+S7pFxyXG4gKiBAXHJcbiAqIDxpXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tmYS1pY29uXScsXHJcbiAgZXhwb3J0QXM6ICdmYUljb24nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuZmFdJzogYHR5cGUgPT09ICdmYSdgLFxyXG4gICAgJ1tjbGFzcy5mYXJdJzogYHR5cGUgPT09ICdmYXInYCxcclxuICAgICdbY2xhc3MuZmEtc3Bpbl0nOiAnc3BpbiA9PT0gdHJ1ZScsXHJcbiAgICAnW2NsYXNzLmZhLXB1bHNlXSc6ICdwdWxzZSA9PT0gdHJ1ZScsXHJcbiAgICAnW2NsYXNzLmZhLWZ3XSc6ICdmaXhlZFdpZHRoID09PSB0cnVlJyxcclxuICAgICdbY2xhc3MuZmEtYm9yZGVyXSc6ICdib3JkZXIgPT09IHRydWUnLFxyXG4gICAgJ1tjbGFzcy5mYS1pbnZlcnNlXSc6ICdpbnZlcnNlID09PSB0cnVlJyxcclxuICAgICdbY2xhc3MuZmEtZmxpcC1ob3Jpem9udGFsXSc6IGBmbGlwID09PSAnaG9yaXpvbnRhbCdgLFxyXG4gICAgJ1tjbGFzcy5mYS1mbGlwLXZlcnRpY2FsXSc6IGBmbGlwID09PSAndmVydGljYWwnYCxcclxuICAgICdbY2xhc3MuZmEtZmxpcC1ib3RoXSc6IGBmbGlwID09PSAnYm90aCdgLFxyXG4gICAgJ1tjbGFzcy5mYS1wdWxsLWxlZnRdJzogYHB1bGwgPT09ICdsZWZ0J2AsXHJcbiAgICAnW2NsYXNzLmZhLXB1bGwtcmlnaHRdJzogYHB1bGwgPT09ICdyaWdodCdgLFxyXG4gICAgJ1tjbGFzcy5mYS1yb3RhdGUtOTBdJzogYHJvdGF0ZSA9PT0gOTBgLFxyXG4gICAgJ1tjbGFzcy5mYS1yb3RhdGUtMTgwXSc6IGByb3RhdGUgPT09IDE4MGAsXHJcbiAgICAnW2NsYXNzLmZhLXJvdGF0ZS0yNzBdJzogYHJvdGF0ZSA9PT0gMjcwYCxcclxuICAgICdbY2xhc3MuZmEtc3RhY2stMXhdJzogYHN0YWNrSXRlbVNpemUgPT09ICcxeCdgLFxyXG4gICAgJ1tjbGFzcy5mYS1zdGFjay0yeF0nOiBgc3RhY2tJdGVtU2l6ZSA9PT0gJzJ4J2BcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGYUljb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCdmYS1pY29uJykgaWNvbiE6IHN0cmluZztcclxuICBASW5wdXQoKSB0eXBlOiAnZmFyJyB8ICdmYScgPSAnZmEnO1xyXG4gIEBJbnB1dCgpIHNwaW4/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHB1bHNlPzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBmbGlwPzogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB8ICdib3RoJztcclxuICBASW5wdXQoKSBwdWxsPzogJ2xlZnQnIHwgJ3JpZ2h0JztcclxuICBASW5wdXQoKSBib3JkZXI/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGludmVyc2U/OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHN5bWJvbD86IHN0cmluZyB8IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcm90YXRlPzogOTAgfCAxODAgfCAyNzA7XHJcbiAgQElucHV0KCkgZml4ZWRXaWR0aD86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc3RhY2tJdGVtU2l6ZT86ICcxeCcgfCAnMngnO1xyXG4gIEBJbnB1dCgpIHNpemU/OiBJY29uU2l6ZVR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZW5kZXI6IFJlbmRlcmVyMiwgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJJY29uKHRoaXMuaWNvbik7XHJcbiAgICB0aGlzLnJlbmRlclNpemUodGhpcy5zaXplKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckljb24obmV3SWNvbjogc3RyaW5nIHwgbnVsbCwgb2xkSWNvbj86IHN0cmluZyB8IG51bGwpIHtcclxuICAgIGlmIChvbGRJY29uKSB7XHJcbiAgICAgIHRoaXMuZ2V0SWNvbkNsYXNzKG9sZEljb24pLmZvckVhY2goY2xzID0+IHRoaXMucmVuZGVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBjbHMpKTtcclxuICAgIH1cclxuICAgIGlmIChuZXdJY29uKSB7XHJcbiAgICAgIHRoaXMuZ2V0SWNvbkNsYXNzKG5ld0ljb24pLmZvckVhY2goY2xzID0+IHRoaXMucmVuZGVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBjbHMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEljb25DbGFzcyhpY29uOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gaWNvbiA/IGljb24uc3BsaXQoL1xccy8pIDogW107XHJcbiAgfVxyXG5cclxuICByZW5kZXJTaXplKG5ld1NpemU/OiBJY29uU2l6ZVR5cGUsIG9sZFNpemU/OiBJY29uU2l6ZVR5cGUpIHtcclxuICAgIGNvbnN0IG5ld1NpemVDbHMgPSBuZXdTaXplID8gYGZhLSR7bmV3U2l6ZX1gIDogbnVsbDtcclxuICAgIGNvbnN0IG9sZFNpemVDbHMgPSBvbGRTaXplID8gYGZhLSR7b2xkU2l6ZX1gIDogbnVsbDtcclxuICAgIHRoaXMucmVuZGVySWNvbihuZXdTaXplQ2xzLCBvbGRTaXplQ2xzKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW0sgaW4ga2V5b2YgdGhpc10/OiBTaW1wbGVDaGFuZ2UgfSAmIFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLmljb24gJiYgIWNoYW5nZXMuaWNvbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5yZW5kZXJJY29uKGNoYW5nZXMuaWNvbi5jdXJyZW50VmFsdWUsIGNoYW5nZXMuaWNvbi5wcmV2aW91c1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5zaXplICYmICFjaGFuZ2VzLnNpemUuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyU2l6ZShjaGFuZ2VzLnNpemUuY3VycmVudFZhbHVlLCBjaGFuZ2VzLnNpemUucHJldmlvdXNWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJY29uU2l6ZVR5cGUgPSAneHMnIHwgJ2xnJyB8ICdzbScgfCAnMXgnIHwgJzJ4JyB8ICczeCcgfCAnNHgnIHwgJzV4JyB8ICc2eCcgfCAnN3gnIHwgJzh4JyB8ICc5eCcgfCAnMTB4JztcclxuIl19