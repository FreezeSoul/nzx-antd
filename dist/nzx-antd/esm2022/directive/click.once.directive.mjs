import { __decorate } from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
/**
 * 防止重复触发点击
 * @example
 * <button (click.once)="myMethod($event)" [delay]="1000" (originClick)="method($event)">按钮</button>
 */
export class ClickOnceDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2sub25jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZGlyZWN0aXZlL2NsaWNrLm9uY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRXZEOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLGdCQUFlLENBQUM7SUFFaEI7O09BRUc7SUFDTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ0ksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQzs7T0FFRztJQUNtQixVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUNsRTs7O09BR0c7SUFDTyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQTBDLENBQUM7SUFDM0UsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUcvQixnQkFBZ0IsQ0FBQyxLQUFpQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO3dHQW5DVSxrQkFBa0I7NEZBQWxCLGtCQUFrQjs7QUFPSjtJQUFmLFlBQVksRUFBRTtvREFBa0I7NEZBUC9CLGtCQUFrQjtrQkFIOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztpQkFDekI7MEVBT1UsS0FBSztzQkFBYixLQUFLO2dCQUNtQixRQUFRO3NCQUFoQyxLQUFLO2dCQUlnQixVQUFVO3NCQUEvQixNQUFNO3VCQUFDLFlBQVk7Z0JBS1YsV0FBVztzQkFBcEIsTUFBTTtnQkFJUCxnQkFBZ0I7c0JBRGYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcclxuXHJcbi8qKlxyXG4gKiDpmLLmraLph43lpI3op6blj5Hngrnlh7tcclxuICogQGV4YW1wbGVcclxuICogPGJ1dHRvbiAoY2xpY2sub25jZSk9XCJteU1ldGhvZCgkZXZlbnQpXCIgW2RlbGF5XT1cIjEwMDBcIiAob3JpZ2luQ2xpY2spPVwibWV0aG9kKCRldmVudClcIj7mjInpkq48L2J1dHRvbj5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2NsaWNrLm9uY2VdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpY2tPbmNlRGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeCueWHu+W7tui/n+aXtumXtCjljZXkvY06bXMpXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVsYXkgPSA1MDA7XHJcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICogbmVDbGlja+S6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoJ2NsaWNrLm9uY2UnKSBjbGlja0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIOWOn+Wni+eCueWHu+S6i+S7tlxyXG4gICAqIGRlbGF5IC0g5piv5ZCm5aSE5LqO5bu26L+f54q25oCBXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9yaWdpbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx7IHRhcmdldDogTW91c2VFdmVudDsgZGVsYXk6IGJvb2xlYW4gfT4oKTtcclxuICBwcml2YXRlIF9kZWxheURpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBjbGlja0V2ZW50SGFuZGxlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcmlnaW5DbGljay5lbWl0KHsgdGFyZ2V0OiBldmVudCwgZGVsYXk6IHRoaXMuX2RlbGF5RGlzYWJsZWQgfSk7XHJcbiAgICBpZiAodGhpcy5fZGVsYXlEaXNhYmxlZCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RlbGF5RGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5fZGVsYXlEaXNhYmxlZCA9IGZhbHNlKSwgdGhpcy5kZWxheSk7XHJcbiAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=