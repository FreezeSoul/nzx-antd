import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/tag";
export class TableTagComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableTagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableTagComponent, selector: "nzx-table-tag", inputs: { props: "props", row: "row", indexAttr: "indexAttr", colIndex: "colIndex", column: "column", nzData: "nzData", nzPageData: "nzPageData" }, ngImport: i0, template: `
    <nz-tag
      #instance
      [nzColor]="props.nzColor"
      [nzChecked]="props.nzChecked"
      [nzMode]="props.nzMode"
      (nzOnClose)="props.nzOnClose?.($event, row, params)"
      (nzCheckedChange)="props.nzCheckedChange?.($event, row, params)"
      (click)="props.click && props.click(row, params, $event)"
      [ngClass]="props.ngClass"
      [ngStyle]="props.ngStyle"
    >
      {{ props.text }}
    </nz-tag>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2.NzTagComponent, selector: "nz-tag", inputs: ["nzMode", "nzColor", "nzChecked"], outputs: ["nzOnClose", "nzCheckedChange"], exportAs: ["nzTag"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableTagComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-table-tag',
                    template: `
    <nz-tag
      #instance
      [nzColor]="props.nzColor"
      [nzChecked]="props.nzChecked"
      [nzMode]="props.nzMode"
      (nzOnClose)="props.nzOnClose?.($event, row, params)"
      (nzCheckedChange)="props.nzCheckedChange?.($event, row, params)"
      (click)="props.click && props.click(row, params, $event)"
      [ngClass]="props.ngClass"
      [ngStyle]="props.ngStyle"
    >
      {{ props.text }}
    </nz-tag>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYi90YWJsZS90YWJsZS13aWRnZXQvdGFibGUtdGFnL3RhYmxlLXRhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFxQmpELE1BQU0sT0FBTyxpQkFBaUI7SUFDbkIsS0FBSyxHQUF3QixFQUFFLENBQUM7SUFDaEMsR0FBRyxHQUFNLEVBQU8sQ0FBQztJQUNqQixTQUFTLENBQWE7SUFDdEIsUUFBUSxDQUFhO0lBQ3JCLE1BQU0sQ0FBZ0I7SUFDdEIsTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUNqQixVQUFVLEdBQVEsRUFBRSxDQUFDO0lBRTlCLElBQUksTUFBTTtRQUNSLE9BQU87WUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO3dHQWxCVSxpQkFBaUI7NEZBQWpCLGlCQUFpQix5TUFoQmxCOzs7Ozs7Ozs7Ozs7OztHQWNUOzs0RkFFVSxpQkFBaUI7a0JBbEI3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7aUJBQ0Y7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmRleEF0dHIsIE56eENvbHVtbiB9IGZyb20gJy4uLy4uL3RhYmxlLnR5cGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtdGFibGUtdGFnJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG56LXRhZ1xyXG4gICAgICAjaW5zdGFuY2VcclxuICAgICAgW256Q29sb3JdPVwicHJvcHMubnpDb2xvclwiXHJcbiAgICAgIFtuekNoZWNrZWRdPVwicHJvcHMubnpDaGVja2VkXCJcclxuICAgICAgW256TW9kZV09XCJwcm9wcy5uek1vZGVcIlxyXG4gICAgICAobnpPbkNsb3NlKT1cInByb3BzLm56T25DbG9zZT8uKCRldmVudCwgcm93LCBwYXJhbXMpXCJcclxuICAgICAgKG56Q2hlY2tlZENoYW5nZSk9XCJwcm9wcy5uekNoZWNrZWRDaGFuZ2U/LigkZXZlbnQsIHJvdywgcGFyYW1zKVwiXHJcbiAgICAgIChjbGljayk9XCJwcm9wcy5jbGljayAmJiBwcm9wcy5jbGljayhyb3csIHBhcmFtcywgJGV2ZW50KVwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cInByb3BzLm5nQ2xhc3NcIlxyXG4gICAgICBbbmdTdHlsZV09XCJwcm9wcy5uZ1N0eWxlXCJcclxuICAgID5cclxuICAgICAge3sgcHJvcHMudGV4dCB9fVxyXG4gICAgPC9uei10YWc+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVUYWdDb21wb25lbnQ8VD4ge1xyXG4gIEBJbnB1dCgpIHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgQElucHV0KCkgcm93OiBUID0ge30gYXMgVDtcclxuICBASW5wdXQoKSBpbmRleEF0dHIhOiBJbmRleEF0dHI7XHJcbiAgQElucHV0KCkgY29sSW5kZXghOiBJbmRleEF0dHI7XHJcbiAgQElucHV0KCkgY29sdW1uITogTnp4Q29sdW1uPFQ+O1xyXG4gIEBJbnB1dCgpIG56RGF0YTogVFtdID0gW107XHJcbiAgQElucHV0KCkgbnpQYWdlRGF0YTogVFtdID0gW107XHJcblxyXG4gIGdldCBwYXJhbXMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBuekRhdGE6IHRoaXMubnpEYXRhLFxyXG4gICAgICBuelBhZ2VEYXRhOiB0aGlzLm56UGFnZURhdGEsXHJcbiAgICAgIGNvbEluZGV4OiB0aGlzLmNvbEluZGV4LFxyXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICBpbmRleEF0dHI6IHRoaXMuaW5kZXhBdHRyXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=