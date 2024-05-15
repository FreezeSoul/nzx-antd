import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/button";
import * as i3 from "ng-zorro-antd/core/transition-patch";
import * as i4 from "ng-zorro-antd/core/wave";
import * as i5 from "ng-zorro-antd/icon";
export class TableButtonComponent {
    props = {};
    row = {};
    indexAttr;
    colIndex;
    column;
    nzData = [];
    nzPageData = [];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableButtonComponent, selector: "nzx-table-button", inputs: { props: "props", row: "row", indexAttr: "indexAttr", colIndex: "colIndex", column: "column", nzData: "nzData", nzPageData: "nzPageData" }, ngImport: i0, template: `
    <button
      type="button"
      nz-button
      [type]="props.type || 'button'"
      [nzBlock]="props.nzBlock"
      [nzDanger]="props.nzDanger"
      [nzGhost]="props.nzGhost"
      [nzSize]="props.nzSize || 'small'"
      [nzLoading]="props.nzLoading"
      [nzSearch]="props.nzSearch"
      [nzShape]="props.nzShape"
      [nzType]="props.nzType"
      [disabled]="props.disabled"
      [ngClass]="props.ngClass"
      [ngStyle]="props.ngStyle"
      (click)="props.click && props.click(row, { row, nzData, nzPageData, colIndex, column, indexAttr }, $event)"
    >
      <i *ngIf="props.icon" nz-icon [nzType]="props.icon"></i>
      {{ props.text }}
    </button>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-table-button',
                    template: `
    <button
      type="button"
      nz-button
      [type]="props.type || 'button'"
      [nzBlock]="props.nzBlock"
      [nzDanger]="props.nzDanger"
      [nzGhost]="props.nzGhost"
      [nzSize]="props.nzSize || 'small'"
      [nzLoading]="props.nzLoading"
      [nzSearch]="props.nzSearch"
      [nzShape]="props.nzShape"
      [nzType]="props.nzType"
      [disabled]="props.disabled"
      [ngClass]="props.ngClass"
      [ngStyle]="props.ngStyle"
      (click)="props.click && props.click(row, { row, nzData, nzPageData, colIndex, column, indexAttr }, $event)"
    >
      <i *ngIf="props.icon" nz-icon [nzType]="props.icon"></i>
      {{ props.text }}
    </button>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS13aWRnZXQvdGFibGUtYnV0dG9uL3RhYmxlLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUE0QmpELE1BQU0sT0FBTyxvQkFBb0I7SUFDdEIsS0FBSyxHQUF3QixFQUFFLENBQUM7SUFDaEMsR0FBRyxHQUFNLEVBQU8sQ0FBQztJQUNqQixTQUFTLENBQWE7SUFDdEIsUUFBUSxDQUFhO0lBQ3JCLE1BQU0sQ0FBZ0I7SUFDdEIsTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUNqQixVQUFVLEdBQVEsRUFBRSxDQUFDO3dHQVBuQixvQkFBb0I7NEZBQXBCLG9CQUFvQiw0TUF2QnJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7OzRGQUVVLG9CQUFvQjtrQkF6QmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7aUJBQ0Y7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmRleEF0dHIsIE56eENvbHVtbiB9IGZyb20gJy4uLy4uL3RhYmxlLnR5cGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtdGFibGUtYnV0dG9uJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgbnotYnV0dG9uXHJcbiAgICAgIFt0eXBlXT1cInByb3BzLnR5cGUgfHwgJ2J1dHRvbidcIlxyXG4gICAgICBbbnpCbG9ja109XCJwcm9wcy5uekJsb2NrXCJcclxuICAgICAgW256RGFuZ2VyXT1cInByb3BzLm56RGFuZ2VyXCJcclxuICAgICAgW256R2hvc3RdPVwicHJvcHMubnpHaG9zdFwiXHJcbiAgICAgIFtuelNpemVdPVwicHJvcHMubnpTaXplIHx8ICdzbWFsbCdcIlxyXG4gICAgICBbbnpMb2FkaW5nXT1cInByb3BzLm56TG9hZGluZ1wiXHJcbiAgICAgIFtuelNlYXJjaF09XCJwcm9wcy5uelNlYXJjaFwiXHJcbiAgICAgIFtuelNoYXBlXT1cInByb3BzLm56U2hhcGVcIlxyXG4gICAgICBbbnpUeXBlXT1cInByb3BzLm56VHlwZVwiXHJcbiAgICAgIFtkaXNhYmxlZF09XCJwcm9wcy5kaXNhYmxlZFwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cInByb3BzLm5nQ2xhc3NcIlxyXG4gICAgICBbbmdTdHlsZV09XCJwcm9wcy5uZ1N0eWxlXCJcclxuICAgICAgKGNsaWNrKT1cInByb3BzLmNsaWNrICYmIHByb3BzLmNsaWNrKHJvdywgeyByb3csIG56RGF0YSwgbnpQYWdlRGF0YSwgY29sSW5kZXgsIGNvbHVtbiwgaW5kZXhBdHRyIH0sICRldmVudClcIlxyXG4gICAgPlxyXG4gICAgICA8aSAqbmdJZj1cInByb3BzLmljb25cIiBuei1pY29uIFtuelR5cGVdPVwicHJvcHMuaWNvblwiPjwvaT5cclxuICAgICAge3sgcHJvcHMudGV4dCB9fVxyXG4gICAgPC9idXR0b24+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVCdXR0b25Db21wb25lbnQ8VD4ge1xyXG4gIEBJbnB1dCgpIHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgQElucHV0KCkgcm93OiBUID0ge30gYXMgVDtcclxuICBASW5wdXQoKSBpbmRleEF0dHIhOiBJbmRleEF0dHI7XHJcbiAgQElucHV0KCkgY29sSW5kZXghOiBJbmRleEF0dHI7XHJcbiAgQElucHV0KCkgY29sdW1uITogTnp4Q29sdW1uPFQ+O1xyXG4gIEBJbnB1dCgpIG56RGF0YTogVFtdID0gW107XHJcbiAgQElucHV0KCkgbnpQYWdlRGF0YTogVFtdID0gW107XHJcbn1cclxuIl19