import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 按钮指令，增强ng-zorro-antd按钮颜色, 和nz-button组件配合使用, 只增加`nzxColor`属性
 *
 * 颜色值取自 https://ant.design/docs/spec/colors-cn
 */
export class NzxButtonDirective {
    renderer;
    elementRef;
    /**
     * 按钮颜色名称
     */
    nzxColor;
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.addButtonClass(this.nzxColor);
    }
    /**
     * 添加按钮class 名称
     * @param className class 名称
     * @protected
     */
    addButtonClass(className) {
        const element = this.elementRef.nativeElement;
        const classList = element.classList;
        classList.forEach(cls => {
            if (cls.indexOf('nzx-button') === 0) {
                classList.remove(cls);
            }
        });
        if (className) {
            this.renderer.addClass(element, `nzx-button-${className}`);
        }
    }
    ngOnChanges(changes) {
        if (changes.nzxColor && !changes.nzxColor.isFirstChange()) {
            this.addButtonClass(this.nzxColor);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: NzxButtonDirective, selector: "[nz-button]", inputs: { nzxColor: "nzxColor" }, exportAs: ["nzxButton"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-button]',
                    exportAs: 'nzxButton'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzxColor: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBNkQsTUFBTSxlQUFlLENBQUM7O0FBRXhIOzs7O0dBSUc7QUFLSCxNQUFNLE9BQU8sa0JBQWtCO0lBS1A7SUFBK0I7SUFKckQ7O09BRUc7SUFDTSxRQUFRLENBQWdCO0lBQ2pDLFlBQXNCLFFBQW1CLEVBQVksVUFBbUM7UUFBbEUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFZLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQUcsQ0FBQztJQUU1RixRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxjQUFjLENBQUMsU0FBd0I7UUFDL0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDOUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25DLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGNBQWMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBNkQ7UUFDdkUsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7d0dBbENVLGtCQUFrQjs0RkFBbEIsa0JBQWtCOzs0RkFBbEIsa0JBQWtCO2tCQUo5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsV0FBVztpQkFDdEI7eUhBS1UsUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIOaMiemSruaMh+S7pO+8jOWinuW8um5nLXpvcnJvLWFudGTmjInpkq7popzoibIsIOWSjG56LWJ1dHRvbue7hOS7tumFjeWQiOS9v+eUqCwg5Y+q5aKe5YqgYG56eENvbG9yYOWxnuaAp1xyXG4gKlxyXG4gKiDpopzoibLlgLzlj5boh6ogaHR0cHM6Ly9hbnQuZGVzaWduL2RvY3Mvc3BlYy9jb2xvcnMtY25cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW256LWJ1dHRvbl0nLFxyXG4gIGV4cG9ydEFzOiAnbnp4QnV0dG9uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4QnV0dG9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIOaMiemSruminOiJsuWQjeensFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG56eENvbG9yPzogTnp4Q29sb3JUeXBlO1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLCBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRCdXR0b25DbGFzcyh0aGlzLm56eENvbG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOa3u+WKoOaMiemSrmNsYXNzIOWQjeensFxyXG4gICAqIEBwYXJhbSBjbGFzc05hbWUgY2xhc3Mg5ZCN56ewXHJcbiAgICogQHByb3RlY3RlZFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhZGRCdXR0b25DbGFzcyhjbGFzc05hbWU/OiBOenhDb2xvclR5cGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xyXG4gICAgY2xhc3NMaXN0LmZvckVhY2goY2xzID0+IHtcclxuICAgICAgaWYgKGNscy5pbmRleE9mKCduengtYnV0dG9uJykgPT09IDApIHtcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNscyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCBgbnp4LWJ1dHRvbi0ke2NsYXNzTmFtZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW0sgaW4ga2V5b2YgdGhpc10/OiBTaW1wbGVDaGFuZ2UgfSAmIFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLm56eENvbG9yICYmICFjaGFuZ2VzLm56eENvbG9yLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLmFkZEJ1dHRvbkNsYXNzKHRoaXMubnp4Q29sb3IpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTnp4Q29sb3JUeXBlID0gJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICdncmF5JyB8ICd0ZWFsJyB8ICdjeWFuJyB8IHN0cmluZztcclxuIl19