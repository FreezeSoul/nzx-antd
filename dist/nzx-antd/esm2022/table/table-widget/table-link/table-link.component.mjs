import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../transform/link-href.pipe";
export class TableLinkComponent {
    props;
    nzData = [];
    nzPageData = [];
    row = {};
    indexAttr;
    colIndex;
    column;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableLinkComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TableLinkComponent, selector: "nzx-table-link", inputs: { props: "props", nzData: "nzData", nzPageData: "nzPageData", row: "row", indexAttr: "indexAttr", colIndex: "colIndex", column: "column" }, ngImport: i0, template: `
    <a
      [attr.href]="props | linkHref: row : params"
      [attr.target]="props.target"
      [ngClass]="props.ngClass"
      [ngStyle]="props.ngStyle"
      (click)="props.click && !props.disabled && props.click(row, params, $event)"
    >
      {{ props.text }}
    </a>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: i2.LinkHrefPipe, name: "linkHref" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableLinkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nzx-table-link',
                    template: `
    <a
      [attr.href]="props | linkHref: row : params"
      [attr.target]="props.target"
      [ngClass]="props.ngClass"
      [ngStyle]="props.ngStyle"
      (click)="props.click && !props.disabled && props.click(row, params, $event)"
    >
      {{ props.text }}
    </a>
  `
                }]
        }], propDecorators: { props: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzPageData: [{
                type: Input
            }], row: [{
                type: Input
            }], indexAttr: [{
                type: Input
            }], colIndex: [{
                type: Input
            }], column: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtbGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWIvdGFibGUvdGFibGUtd2lkZ2V0L3RhYmxlLWxpbmsvdGFibGUtbGluay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFpQmpELE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsS0FBSyxDQUFtQjtJQUN4QixNQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ2pCLFVBQVUsR0FBUSxFQUFFLENBQUM7SUFDckIsR0FBRyxHQUFNLEVBQU8sQ0FBQztJQUNqQixTQUFTLENBQWE7SUFDdEIsUUFBUSxDQUFhO0lBQ3JCLE1BQU0sQ0FBZ0I7SUFFL0IsSUFBSSxNQUFNO1FBQ1IsT0FBTztZQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7d0dBbEJVLGtCQUFrQjs0RkFBbEIsa0JBQWtCLDBNQVpuQjs7Ozs7Ozs7OztHQVVUOzs0RkFFVSxrQkFBa0I7a0JBZDlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7aUJBQ0Y7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmRleEF0dHIsIE56eENvbHVtbiwgTnp4Q29sdW1uQnV0dG9uIH0gZnJvbSAnLi4vLi4vdGFibGUudHlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ256eC10YWJsZS1saW5rJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGFcclxuICAgICAgW2F0dHIuaHJlZl09XCJwcm9wcyB8IGxpbmtIcmVmOiByb3cgOiBwYXJhbXNcIlxyXG4gICAgICBbYXR0ci50YXJnZXRdPVwicHJvcHMudGFyZ2V0XCJcclxuICAgICAgW25nQ2xhc3NdPVwicHJvcHMubmdDbGFzc1wiXHJcbiAgICAgIFtuZ1N0eWxlXT1cInByb3BzLm5nU3R5bGVcIlxyXG4gICAgICAoY2xpY2spPVwicHJvcHMuY2xpY2sgJiYgIXByb3BzLmRpc2FibGVkICYmIHByb3BzLmNsaWNrKHJvdywgcGFyYW1zLCAkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAge3sgcHJvcHMudGV4dCB9fVxyXG4gICAgPC9hPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlTGlua0NvbXBvbmVudDxUPiB7XHJcbiAgQElucHV0KCkgcHJvcHMhOiBOenhDb2x1bW5CdXR0b247XHJcbiAgQElucHV0KCkgbnpEYXRhOiBUW10gPSBbXTtcclxuICBASW5wdXQoKSBuelBhZ2VEYXRhOiBUW10gPSBbXTtcclxuICBASW5wdXQoKSByb3c6IFQgPSB7fSBhcyBUO1xyXG4gIEBJbnB1dCgpIGluZGV4QXR0ciE6IEluZGV4QXR0cjtcclxuICBASW5wdXQoKSBjb2xJbmRleCE6IEluZGV4QXR0cjtcclxuICBASW5wdXQoKSBjb2x1bW4hOiBOenhDb2x1bW48VD47XHJcblxyXG4gIGdldCBwYXJhbXMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBuekRhdGE6IHRoaXMubnpEYXRhLFxyXG4gICAgICBuelBhZ2VEYXRhOiB0aGlzLm56UGFnZURhdGEsXHJcbiAgICAgIGNvbEluZGV4OiB0aGlzLmNvbEluZGV4LFxyXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICBpbmRleEF0dHI6IHRoaXMuaW5kZXhBdHRyXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=