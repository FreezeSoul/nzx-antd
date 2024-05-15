import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "ng-zorro-antd/input";
export class TableInputComponent {
    props = {};
    row = {};
    indexAttr;
    colIndex;
    column;
    nzData = [];
    nzPageData = [];
    get params() {
        return {
            row: this.row,
            nzData: this.nzData,
            nzPageData: this.nzPageData,
            colIndex: this.colIndex,
            column: this.column,
            indexAttr: this.indexAttr
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableInputComponent, selector: "nzx-table-input", inputs: { props: "props", row: "row", indexAttr: "indexAttr", colIndex: "colIndex", column: "column", nzData: "nzData", nzPageData: "nzPageData" }, ngImport: i0, template: `
    <input
      nz-input
      [(ngModel)]="props.text"
      (ngModelChange)="props.modelChange && props.modelChange($event, params)"
      autocomplete="off"
      [type]="props.type || 'text'"
      [ngStyle]="props.ngStyle"
      [ngClass]="props.ngClass"
      [nzBorderless]="props.nzBorderless"
      [nzStatus]="props.nzStatus"
      [nzSize]="props.nzSize"
      [disabled]="props.nzDisabled || props.disabled"
      (click)="props.onClick && props.onClick($event, params)"
      (focus)="props.onFocus && props.onFocus($event, params)"
      (blur)="props.onBlur && props.onBlur($event, params)"
      maxlength=""
    />
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-table-input',
                    template: `
    <input
      nz-input
      [(ngModel)]="props.text"
      (ngModelChange)="props.modelChange && props.modelChange($event, params)"
      autocomplete="off"
      [type]="props.type || 'text'"
      [ngStyle]="props.ngStyle"
      [ngClass]="props.ngClass"
      [nzBorderless]="props.nzBorderless"
      [nzStatus]="props.nzStatus"
      [nzSize]="props.nzSize"
      [disabled]="props.nzDisabled || props.disabled"
      (click)="props.onClick && props.onClick($event, params)"
      (focus)="props.onFocus && props.onFocus($event, params)"
      (blur)="props.onBlur && props.onBlur($event, params)"
      maxlength=""
    />
  `
                }]
        }], propDecorators: { props: [{
                type: Input
            }], row: [{
                type: Input
            }], indexAttr: [{
                type: Input
            }], colIndex: [{
                type: Input
            }], column: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzPageData: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGliL3RhYmxlL3RhYmxlLXdpZGdldC90YWJsZS1pbnB1dC90YWJsZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBeUJqRCxNQUFNLE9BQU8sbUJBQW1CO0lBQ3JCLEtBQUssR0FBd0IsRUFBRSxDQUFDO0lBQ2hDLEdBQUcsR0FBTSxFQUFPLENBQUM7SUFDakIsU0FBUyxDQUFhO0lBQ3RCLFFBQVEsQ0FBYTtJQUNyQixNQUFNLENBQWdCO0lBQ3RCLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDakIsVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUU5QixJQUFJLE1BQU07UUFDUixPQUFPO1lBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQzt3R0FsQlUsbUJBQW1COzRGQUFuQixtQkFBbUIsMk1BcEJwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUOzs0RkFFVSxtQkFBbUI7a0JBdEIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUO2lCQUNGOzhCQUVVLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5kZXhBdHRyLCBOenhDb2x1bW4gfSBmcm9tICcuLi8uLi90YWJsZS50eXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnp4LXRhYmxlLWlucHV0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGlucHV0XHJcbiAgICAgIG56LWlucHV0XHJcbiAgICAgIFsobmdNb2RlbCldPVwicHJvcHMudGV4dFwiXHJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInByb3BzLm1vZGVsQ2hhbmdlICYmIHByb3BzLm1vZGVsQ2hhbmdlKCRldmVudCwgcGFyYW1zKVwiXHJcbiAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXHJcbiAgICAgIFt0eXBlXT1cInByb3BzLnR5cGUgfHwgJ3RleHQnXCJcclxuICAgICAgW25nU3R5bGVdPVwicHJvcHMubmdTdHlsZVwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cInByb3BzLm5nQ2xhc3NcIlxyXG4gICAgICBbbnpCb3JkZXJsZXNzXT1cInByb3BzLm56Qm9yZGVybGVzc1wiXHJcbiAgICAgIFtuelN0YXR1c109XCJwcm9wcy5uelN0YXR1c1wiXHJcbiAgICAgIFtuelNpemVdPVwicHJvcHMubnpTaXplXCJcclxuICAgICAgW2Rpc2FibGVkXT1cInByb3BzLm56RGlzYWJsZWQgfHwgcHJvcHMuZGlzYWJsZWRcIlxyXG4gICAgICAoY2xpY2spPVwicHJvcHMub25DbGljayAmJiBwcm9wcy5vbkNsaWNrKCRldmVudCwgcGFyYW1zKVwiXHJcbiAgICAgIChmb2N1cyk9XCJwcm9wcy5vbkZvY3VzICYmIHByb3BzLm9uRm9jdXMoJGV2ZW50LCBwYXJhbXMpXCJcclxuICAgICAgKGJsdXIpPVwicHJvcHMub25CbHVyICYmIHByb3BzLm9uQmx1cigkZXZlbnQsIHBhcmFtcylcIlxyXG4gICAgICBtYXhsZW5ndGg9XCJcIlxyXG4gICAgLz5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUlucHV0Q29tcG9uZW50PFQ+IHtcclxuICBASW5wdXQoKSBwcm9wczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG4gIEBJbnB1dCgpIHJvdzogVCA9IHt9IGFzIFQ7XHJcbiAgQElucHV0KCkgaW5kZXhBdHRyITogSW5kZXhBdHRyO1xyXG4gIEBJbnB1dCgpIGNvbEluZGV4ITogSW5kZXhBdHRyO1xyXG4gIEBJbnB1dCgpIGNvbHVtbiE6IE56eENvbHVtbjxUPjtcclxuICBASW5wdXQoKSBuekRhdGE6IFRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIG56UGFnZURhdGE6IFRbXSA9IFtdO1xyXG5cclxuICBnZXQgcGFyYW1zKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgbnpEYXRhOiB0aGlzLm56RGF0YSxcclxuICAgICAgbnpQYWdlRGF0YTogdGhpcy5uelBhZ2VEYXRhLFxyXG4gICAgICBjb2xJbmRleDogdGhpcy5jb2xJbmRleCxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgaW5kZXhBdHRyOiB0aGlzLmluZGV4QXR0clxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19