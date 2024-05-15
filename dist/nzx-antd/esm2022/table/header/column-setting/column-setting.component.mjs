import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "ng-zorro-antd/icon";
import * as i4 from "ng-zorro-antd/popover";
import * as i5 from "ng-zorro-antd/checkbox";
import * as i6 from "@angular/cdk/drag-drop";
import * as i7 from "ng-zorro-antd/divider";
import * as i8 from "ng-zorro-antd/tooltip";
import * as i9 from "ng-zorro-antd/core/transition-patch";
/**
 * 列设置
 * 注意: 只在表头不分组的情况下有效
 */
export class NzxColumnSettingComponent {
    renderer;
    _nzxColumns = [];
    _columnNameChecked;
    _indeterminate;
    /**
     * 拖拽预览样式
     */
    dragPreviewClass = 'nzx-column-setting__drag-preview';
    /**
     * 显示列名
     */
    columnNameVisible = true;
    set nzxColumns(value) {
        if (value) {
            this._nzxColumns = value;
            this.refreshNameCheckedStatus();
        }
    }
    get nzxColumns() {
        return this._nzxColumns;
    }
    /**
     * 当个列选中事件
     */
    columnCheckedChange = new EventEmitter();
    /**
     * 排序列触发
     */
    sortedColumn = new EventEmitter();
    /**
     * 列名选择Change
     */
    columnNameCheckedChange = new EventEmitter();
    /**
     * 固定列
     */
    fixedClick = new EventEmitter();
    constructor(renderer) {
        this.renderer = renderer;
    }
    ngOnInit() { }
    columnVisible(item, checked) {
        this.refreshNameCheckedStatus();
        this.columnCheckedChange.emit(item);
    }
    /**
     * 固定列
     * @param column
     * @param fixed
     */
    fixedColumn(column, fixed) {
        if (column.fixed === fixed) {
            return;
        }
        column.fixed = fixed;
        this.fixedClick.emit(column);
    }
    /**
     * 拖动列排序
     * @param event
     * @param list 排序数组
     */
    dropColumn(event, list) {
        moveItemInArray(list, event.previousIndex, event.currentIndex);
        this.sortedColumn.emit(event);
    }
    /**
     * 开始拖动
     * @param event
     */
    cdkDragStarted(event) {
        const preview = new ElementRef(document.querySelector('.cdk-drag.cdk-drag-preview'));
        this.renderer.addClass(preview.nativeElement, this.dragPreviewClass);
    }
    /**
     * 结束拖动
     * @param event
     */
    cdkDragReleased(event) {
        const preview = new ElementRef(document.querySelector('.cdk-drag.cdk-drag-preview'));
        this.renderer.removeClass(preview.nativeElement, this.dragPreviewClass);
    }
    /**
     * 展示列复选框 checked
     * @param checked
     */
    columnNameChange(checked) {
        if (this._nzxColumns && this._nzxColumns.length) {
            this._columnNameChecked = checked;
            this._indeterminate = false;
            this._nzxColumns.filter(v => v.settingVisible != false && v.settingDisabled !== true).forEach(v => (v.visible = checked));
            this.columnNameCheckedChange.emit(checked);
        }
    }
    /**
     * 更新展示列状态
     */
    refreshNameCheckedStatus() {
        if (this._nzxColumns && this._nzxColumns.length) {
            const list = this._nzxColumns.filter(v => v.settingVisible != false && v.settingDisabled !== true);
            this._columnNameChecked = list.every(item => item.visible);
            this._indeterminate = !this._columnNameChecked && list.some(item => item.visible);
        }
        else {
            this._columnNameChecked = false;
            this._indeterminate = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxColumnSettingComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxColumnSettingComponent, selector: "nzx-column-setting", inputs: { dragPreviewClass: "dragPreviewClass", columnNameVisible: "columnNameVisible", nzxColumns: "nzxColumns" }, outputs: { columnCheckedChange: "columnCheckedChange", sortedColumn: "sortedColumn", columnNameCheckedChange: "columnNameCheckedChange", fixedClick: "fixedClick" }, ngImport: i0, template: "<i\r\n  nz-icon\r\n  nzType=\"setting\"\r\n  nzTheme=\"outline\"\r\n  tabindex=\"-1\"\r\n  nz-popover\r\n  nzPopoverTrigger=\"click\"\r\n  nzPopoverOverlayClassName=\"nzx-column-setting__cloumn-box\"\r\n  [nzPopoverTitle]=\"titleTemplate\"\r\n  [nzPopoverPlacement]=\"'bottomRight'\"\r\n  [nzPopoverContent]=\"contentTemplate\"\r\n  nz-tooltip\r\n  nzTooltipTitle=\"\u5217\u8BBE\u7F6E\"\r\n></i>\r\n\r\n<ng-template #titleTemplate>\r\n  <div class=\"nzx-column-setting__popover-title\">\r\n    <div class=\"nzx-column-setting__flex\" style=\"flex: 1\">\r\n      <label\r\n        *ngIf=\"columnNameVisible !== false\"\r\n        nz-checkbox\r\n        [(ngModel)]=\"_columnNameChecked\"\r\n        [nzIndeterminate]=\"_indeterminate\"\r\n        (ngModelChange)=\"columnNameChange($event)\"\r\n      >\r\n        \u5C55\u793A\u5217\r\n      </label>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #contentTemplate>\r\n  <ul\r\n    style=\"min-width: 315px\"\r\n    cdkDropList\r\n    (cdkDropListDropped)=\"dropColumn($event, _nzxColumns)\"\r\n    class=\"nzx-column-setting__column-list\"\r\n  >\r\n    <ng-container *ngFor=\"let item of _nzxColumns\">\r\n      <li\r\n        *ngIf=\"item.settingVisible !== false\"\r\n        class=\"nzx-column-setting__check-item\"\r\n        cdkDrag\r\n        cdkDragLockAxis=\"y\"\r\n        cdkDragBoundary=\".nzx-column-setting__column-list\"\r\n        (cdkDragStarted)=\"cdkDragStarted($event)\"\r\n        (cdkDragReleased)=\"cdkDragReleased($event)\"\r\n      >\r\n        <div class=\"drag-box\">\r\n          <i cdkDragHandle nz-icon nzType=\"drag\" class=\"nzx-column-setting__drag-icon\"></i>\r\n          <label\r\n            nz-checkbox\r\n            [nzDisabled]=\"item.settingDisabled === true\"\r\n            [(ngModel)]=\"item.visible\"\r\n            (ngModelChange)=\"columnVisible(item, $event)\"\r\n          >\r\n            {{ item.settingText || item.thText }}\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"nzx-column-setting__flex\">\r\n          <i\r\n            nz-icon\r\n            nzType=\"vertical-align-top\"\r\n            class=\"nzx-column-setting__fixed-left\"\r\n            [class.active]=\"item.fixed === 'left'\"\r\n            [class.disabled]=\"item.visible === false\"\r\n            (click)=\"fixedColumn(item, item.fixed == 'left' ? null : 'left')\"\r\n            nz-tooltip\r\n            nzTooltipTitle=\"\u56FA\u5B9A\u5230\u5DE6\u4FA7\"\r\n          ></i>\r\n          <nz-divider nzType=\"vertical\"></nz-divider>\r\n          <i\r\n            nz-icon\r\n            nzType=\"vertical-align-bottom\"\r\n            class=\"nzx-column-setting__fixed-right\"\r\n            [class.active]=\"item.fixed === 'right'\"\r\n            [class.disabled]=\"item.visible === false\"\r\n            (click)=\"fixedColumn(item, item.fixed == 'right' ? null : 'right')\"\r\n            nz-tooltip\r\n            nzTooltipTitle=\"\u56FA\u5B9A\u5230\u53F3\u4FA7\"\r\n          ></i>\r\n        </div>\r\n      </li>\r\n    </ng-container>\r\n  </ul>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: i4.NzPopoverDirective, selector: "[nz-popover]", inputs: ["nzPopoverArrowPointAtCenter", "nzPopoverTitle", "nzPopoverContent", "nz-popover", "nzPopoverTrigger", "nzPopoverPlacement", "nzPopoverOrigin", "nzPopoverVisible", "nzPopoverMouseEnterDelay", "nzPopoverMouseLeaveDelay", "nzPopoverOverlayClassName", "nzPopoverOverlayStyle", "nzPopoverBackdrop"], outputs: ["nzPopoverVisibleChange"], exportAs: ["nzPopover"] }, { kind: "component", type: i5.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: i6.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i6.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { kind: "component", type: i7.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "directive", type: i8.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i9.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxColumnSettingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-column-setting', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<i\r\n  nz-icon\r\n  nzType=\"setting\"\r\n  nzTheme=\"outline\"\r\n  tabindex=\"-1\"\r\n  nz-popover\r\n  nzPopoverTrigger=\"click\"\r\n  nzPopoverOverlayClassName=\"nzx-column-setting__cloumn-box\"\r\n  [nzPopoverTitle]=\"titleTemplate\"\r\n  [nzPopoverPlacement]=\"'bottomRight'\"\r\n  [nzPopoverContent]=\"contentTemplate\"\r\n  nz-tooltip\r\n  nzTooltipTitle=\"\u5217\u8BBE\u7F6E\"\r\n></i>\r\n\r\n<ng-template #titleTemplate>\r\n  <div class=\"nzx-column-setting__popover-title\">\r\n    <div class=\"nzx-column-setting__flex\" style=\"flex: 1\">\r\n      <label\r\n        *ngIf=\"columnNameVisible !== false\"\r\n        nz-checkbox\r\n        [(ngModel)]=\"_columnNameChecked\"\r\n        [nzIndeterminate]=\"_indeterminate\"\r\n        (ngModelChange)=\"columnNameChange($event)\"\r\n      >\r\n        \u5C55\u793A\u5217\r\n      </label>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #contentTemplate>\r\n  <ul\r\n    style=\"min-width: 315px\"\r\n    cdkDropList\r\n    (cdkDropListDropped)=\"dropColumn($event, _nzxColumns)\"\r\n    class=\"nzx-column-setting__column-list\"\r\n  >\r\n    <ng-container *ngFor=\"let item of _nzxColumns\">\r\n      <li\r\n        *ngIf=\"item.settingVisible !== false\"\r\n        class=\"nzx-column-setting__check-item\"\r\n        cdkDrag\r\n        cdkDragLockAxis=\"y\"\r\n        cdkDragBoundary=\".nzx-column-setting__column-list\"\r\n        (cdkDragStarted)=\"cdkDragStarted($event)\"\r\n        (cdkDragReleased)=\"cdkDragReleased($event)\"\r\n      >\r\n        <div class=\"drag-box\">\r\n          <i cdkDragHandle nz-icon nzType=\"drag\" class=\"nzx-column-setting__drag-icon\"></i>\r\n          <label\r\n            nz-checkbox\r\n            [nzDisabled]=\"item.settingDisabled === true\"\r\n            [(ngModel)]=\"item.visible\"\r\n            (ngModelChange)=\"columnVisible(item, $event)\"\r\n          >\r\n            {{ item.settingText || item.thText }}\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"nzx-column-setting__flex\">\r\n          <i\r\n            nz-icon\r\n            nzType=\"vertical-align-top\"\r\n            class=\"nzx-column-setting__fixed-left\"\r\n            [class.active]=\"item.fixed === 'left'\"\r\n            [class.disabled]=\"item.visible === false\"\r\n            (click)=\"fixedColumn(item, item.fixed == 'left' ? null : 'left')\"\r\n            nz-tooltip\r\n            nzTooltipTitle=\"\u56FA\u5B9A\u5230\u5DE6\u4FA7\"\r\n          ></i>\r\n          <nz-divider nzType=\"vertical\"></nz-divider>\r\n          <i\r\n            nz-icon\r\n            nzType=\"vertical-align-bottom\"\r\n            class=\"nzx-column-setting__fixed-right\"\r\n            [class.active]=\"item.fixed === 'right'\"\r\n            [class.disabled]=\"item.visible === false\"\r\n            (click)=\"fixedColumn(item, item.fixed == 'right' ? null : 'right')\"\r\n            nz-tooltip\r\n            nzTooltipTitle=\"\u56FA\u5B9A\u5230\u53F3\u4FA7\"\r\n          ></i>\r\n        </div>\r\n      </li>\r\n    </ng-container>\r\n  </ul>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { dragPreviewClass: [{
                type: Input
            }], columnNameVisible: [{
                type: Input
            }], nzxColumns: [{
                type: Input
            }], columnCheckedChange: [{
                type: Output
            }], sortedColumn: [{
                type: Output
            }], columnNameCheckedChange: [{
                type: Output
            }], fixedClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNldHRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGliL3RhYmxlL2hlYWRlci9jb2x1bW4tc2V0dGluZy9jb2x1bW4tc2V0dGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvdGFibGUvaGVhZGVyL2NvbHVtbi1zZXR0aW5nL2NvbHVtbi1zZXR0aW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUE2QyxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFJcEc7OztHQUdHO0FBUUgsTUFBTSxPQUFPLHlCQUF5QjtJQTBDZDtJQXpDdEIsV0FBVyxHQUFtQixFQUFFLENBQUM7SUFDakMsa0JBQWtCLENBQWtCO0lBQ3BDLGNBQWMsQ0FBa0I7SUFFaEM7O09BRUc7SUFDTSxnQkFBZ0IsR0FBRyxrQ0FBa0MsQ0FBQztJQUMvRDs7T0FFRztJQUNNLGlCQUFpQixHQUFtQixJQUFJLENBQUM7SUFFbEQsSUFBYSxVQUFVLENBQUMsS0FBcUI7UUFDM0MsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFDRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUJBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFDakU7O09BRUc7SUFDTyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQXdDLENBQUM7SUFDbEY7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LENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNILENBQUM7d0dBckhVLHlCQUF5Qjs0RkFBekIseUJBQXlCLG1WQzFCdEMscWhHQXVGQTs7NEZEN0RhLHlCQUF5QjtrQkFQckMsU0FBUzsrQkFDRSxvQkFBb0IsdUJBRVQsS0FBSyxpQkFDWCxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO2dHQVV0QyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBYUksbUJBQW1CO3NCQUE1QixNQUFNO2dCQUlHLFlBQVk7c0JBQXJCLE1BQU07Z0JBSUcsdUJBQXVCO3NCQUFoQyxNQUFNO2dCQUtHLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgQ2RrRHJhZ1JlbGVhc2UsIENka0RyYWdTdGFydCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XHJcbmltcG9ydCB7IE56eENvbHVtbiB9IGZyb20gJy4uLy4uL3RhYmxlLnR5cGUnO1xyXG5cclxuLyoqXHJcbiAqIOWIl+iuvue9rlxyXG4gKiDms6jmhI86IOWPquWcqOihqOWktOS4jeWIhue7hOeahOaDheWGteS4i+acieaViFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduengtY29sdW1uLXNldHRpbmcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb2x1bW4tc2V0dGluZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4Q29sdW1uU2V0dGluZ0NvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCAvKiwgT25DaGFuZ2VzKi8ge1xyXG4gIF9uenhDb2x1bW5zOiBOenhDb2x1bW48VD5bXSA9IFtdO1xyXG4gIF9jb2x1bW5OYW1lQ2hlY2tlZCE6IGJvb2xlYW4gfCBudWxsO1xyXG4gIF9pbmRldGVybWluYXRlITogYm9vbGVhbiB8IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIOaLluaLvemihOiniOagt+W8j1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRyYWdQcmV2aWV3Q2xhc3MgPSAnbnp4LWNvbHVtbi1zZXR0aW5nX19kcmFnLXByZXZpZXcnO1xyXG4gIC8qKlxyXG4gICAqIOaYvuekuuWIl+WQjVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbHVtbk5hbWVWaXNpYmxlOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIHNldCBuenhDb2x1bW5zKHZhbHVlOiBOenhDb2x1bW48VD5bXSkge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX256eENvbHVtbnMgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5yZWZyZXNoTmFtZUNoZWNrZWRTdGF0dXMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IG56eENvbHVtbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbnp4Q29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOW9k+S4quWIl+mAieS4reS6i+S7tlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjb2x1bW5DaGVja2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOenhDb2x1bW48VD4+KCk7XHJcbiAgLyoqXHJcbiAgICog5o6S5bqP5YiX6Kem5Y+RXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNvcnRlZENvbHVtbiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2RrRHJhZ0Ryb3A8Tnp4Q29sdW1uPFQ+LCBOelNhZmVBbnk+PigpO1xyXG4gIC8qKlxyXG4gICAqIOWIl+WQjemAieaLqUNoYW5nZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjb2x1bW5OYW1lQ2hlY2tlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5Zu65a6a5YiXXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGZpeGVkQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE56eENvbHVtbjxUPj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge31cclxuXHJcbiAgY29sdW1uVmlzaWJsZShpdGVtOiBOenhDb2x1bW48VD4sIGNoZWNrZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMucmVmcmVzaE5hbWVDaGVja2VkU3RhdHVzKCk7XHJcbiAgICB0aGlzLmNvbHVtbkNoZWNrZWRDaGFuZ2UuZW1pdChpdGVtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWbuuWumuWIl1xyXG4gICAqIEBwYXJhbSBjb2x1bW5cclxuICAgKiBAcGFyYW0gZml4ZWRcclxuICAgKi9cclxuICBmaXhlZENvbHVtbihjb2x1bW46IE56eENvbHVtbjxUPiwgZml4ZWQ/OiAnbGVmdCcgfCAncmlnaHQnKSB7XHJcbiAgICBpZiAoY29sdW1uLmZpeGVkID09PSBmaXhlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb2x1bW4uZml4ZWQgPSBmaXhlZDtcclxuICAgIHRoaXMuZml4ZWRDbGljay5lbWl0KGNvbHVtbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmi5bliqjliJfmjpLluo9cclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKiBAcGFyYW0gbGlzdCDmjpLluo/mlbDnu4RcclxuICAgKi9cclxuICBkcm9wQ29sdW1uKGV2ZW50OiBDZGtEcmFnRHJvcDxOenhDb2x1bW48VD4sIE56U2FmZUFueT4sIGxpc3Q6IE56eENvbHVtbjxUPltdKSB7XHJcbiAgICBtb3ZlSXRlbUluQXJyYXkobGlzdCwgZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4KTtcclxuICAgIHRoaXMuc29ydGVkQ29sdW1uLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5byA5aeL5ouW5YqoXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgY2RrRHJhZ1N0YXJ0ZWQoZXZlbnQ6IENka0RyYWdTdGFydCkge1xyXG4gICAgY29uc3QgcHJldmlldyA9IG5ldyBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLWRyYWcuY2RrLWRyYWctcHJldmlldycpISk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXZpZXcubmF0aXZlRWxlbWVudCwgdGhpcy5kcmFnUHJldmlld0NsYXNzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOe7k+adn+aLluWKqFxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIGNka0RyYWdSZWxlYXNlZChldmVudDogQ2RrRHJhZ1JlbGVhc2UpIHtcclxuICAgIGNvbnN0IHByZXZpZXcgPSBuZXcgRWxlbWVudFJlZjxIVE1MRWxlbWVudD4oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNkay1kcmFnLmNkay1kcmFnLXByZXZpZXcnKSEpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwcmV2aWV3Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuZHJhZ1ByZXZpZXdDbGFzcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsZXnpLrliJflpI3pgInmoYYgY2hlY2tlZFxyXG4gICAqIEBwYXJhbSBjaGVja2VkXHJcbiAgICovXHJcbiAgY29sdW1uTmFtZUNoYW5nZShjaGVja2VkOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5fbnp4Q29sdW1ucyAmJiB0aGlzLl9uenhDb2x1bW5zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9jb2x1bW5OYW1lQ2hlY2tlZCA9IGNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fbnp4Q29sdW1ucy5maWx0ZXIodiA9PiB2LnNldHRpbmdWaXNpYmxlICE9IGZhbHNlICYmIHYuc2V0dGluZ0Rpc2FibGVkICE9PSB0cnVlKS5mb3JFYWNoKHYgPT4gKHYudmlzaWJsZSA9IGNoZWNrZWQpKTtcclxuICAgICAgdGhpcy5jb2x1bW5OYW1lQ2hlY2tlZENoYW5nZS5lbWl0KGNoZWNrZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pu05paw5bGV56S65YiX54q25oCBXHJcbiAgICovXHJcbiAgcmVmcmVzaE5hbWVDaGVja2VkU3RhdHVzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX256eENvbHVtbnMgJiYgdGhpcy5fbnp4Q29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX256eENvbHVtbnMuZmlsdGVyKHYgPT4gdi5zZXR0aW5nVmlzaWJsZSAhPSBmYWxzZSAmJiB2LnNldHRpbmdEaXNhYmxlZCAhPT0gdHJ1ZSk7XHJcbiAgICAgIHRoaXMuX2NvbHVtbk5hbWVDaGVja2VkID0gbGlzdC5ldmVyeShpdGVtID0+IGl0ZW0udmlzaWJsZSk7XHJcbiAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSAhdGhpcy5fY29sdW1uTmFtZUNoZWNrZWQgJiYgbGlzdC5zb21lKGl0ZW0gPT4gaXRlbS52aXNpYmxlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NvbHVtbk5hbWVDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2luZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlcclxuICBuei1pY29uXHJcbiAgbnpUeXBlPVwic2V0dGluZ1wiXHJcbiAgbnpUaGVtZT1cIm91dGxpbmVcIlxyXG4gIHRhYmluZGV4PVwiLTFcIlxyXG4gIG56LXBvcG92ZXJcclxuICBuelBvcG92ZXJUcmlnZ2VyPVwiY2xpY2tcIlxyXG4gIG56UG9wb3Zlck92ZXJsYXlDbGFzc05hbWU9XCJuengtY29sdW1uLXNldHRpbmdfX2Nsb3Vtbi1ib3hcIlxyXG4gIFtuelBvcG92ZXJUaXRsZV09XCJ0aXRsZVRlbXBsYXRlXCJcclxuICBbbnpQb3BvdmVyUGxhY2VtZW50XT1cIidib3R0b21SaWdodCdcIlxyXG4gIFtuelBvcG92ZXJDb250ZW50XT1cImNvbnRlbnRUZW1wbGF0ZVwiXHJcbiAgbnotdG9vbHRpcFxyXG4gIG56VG9vbHRpcFRpdGxlPVwi5YiX6K6+572uXCJcclxuPjwvaT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdGl0bGVUZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibnp4LWNvbHVtbi1zZXR0aW5nX19wb3BvdmVyLXRpdGxlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibnp4LWNvbHVtbi1zZXR0aW5nX19mbGV4XCIgc3R5bGU9XCJmbGV4OiAxXCI+XHJcbiAgICAgIDxsYWJlbFxyXG4gICAgICAgICpuZ0lmPVwiY29sdW1uTmFtZVZpc2libGUgIT09IGZhbHNlXCJcclxuICAgICAgICBuei1jaGVja2JveFxyXG4gICAgICAgIFsobmdNb2RlbCldPVwiX2NvbHVtbk5hbWVDaGVja2VkXCJcclxuICAgICAgICBbbnpJbmRldGVybWluYXRlXT1cIl9pbmRldGVybWluYXRlXCJcclxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJjb2x1bW5OYW1lQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICA+XHJcbiAgICAgICAg5bGV56S65YiXXHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPlxyXG4gIDx1bFxyXG4gICAgc3R5bGU9XCJtaW4td2lkdGg6IDMxNXB4XCJcclxuICAgIGNka0Ryb3BMaXN0XHJcbiAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cImRyb3BDb2x1bW4oJGV2ZW50LCBfbnp4Q29sdW1ucylcIlxyXG4gICAgY2xhc3M9XCJuengtY29sdW1uLXNldHRpbmdfX2NvbHVtbi1saXN0XCJcclxuICA+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9uenhDb2x1bW5zXCI+XHJcbiAgICAgIDxsaVxyXG4gICAgICAgICpuZ0lmPVwiaXRlbS5zZXR0aW5nVmlzaWJsZSAhPT0gZmFsc2VcIlxyXG4gICAgICAgIGNsYXNzPVwibnp4LWNvbHVtbi1zZXR0aW5nX19jaGVjay1pdGVtXCJcclxuICAgICAgICBjZGtEcmFnXHJcbiAgICAgICAgY2RrRHJhZ0xvY2tBeGlzPVwieVwiXHJcbiAgICAgICAgY2RrRHJhZ0JvdW5kYXJ5PVwiLm56eC1jb2x1bW4tc2V0dGluZ19fY29sdW1uLWxpc3RcIlxyXG4gICAgICAgIChjZGtEcmFnU3RhcnRlZCk9XCJjZGtEcmFnU3RhcnRlZCgkZXZlbnQpXCJcclxuICAgICAgICAoY2RrRHJhZ1JlbGVhc2VkKT1cImNka0RyYWdSZWxlYXNlZCgkZXZlbnQpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkcmFnLWJveFwiPlxyXG4gICAgICAgICAgPGkgY2RrRHJhZ0hhbmRsZSBuei1pY29uIG56VHlwZT1cImRyYWdcIiBjbGFzcz1cIm56eC1jb2x1bW4tc2V0dGluZ19fZHJhZy1pY29uXCI+PC9pPlxyXG4gICAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAgIG56LWNoZWNrYm94XHJcbiAgICAgICAgICAgIFtuekRpc2FibGVkXT1cIml0ZW0uc2V0dGluZ0Rpc2FibGVkID09PSB0cnVlXCJcclxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJpdGVtLnZpc2libGVcIlxyXG4gICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJjb2x1bW5WaXNpYmxlKGl0ZW0sICRldmVudClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7eyBpdGVtLnNldHRpbmdUZXh0IHx8IGl0ZW0udGhUZXh0IH19XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibnp4LWNvbHVtbi1zZXR0aW5nX19mbGV4XCI+XHJcbiAgICAgICAgICA8aVxyXG4gICAgICAgICAgICBuei1pY29uXHJcbiAgICAgICAgICAgIG56VHlwZT1cInZlcnRpY2FsLWFsaWduLXRvcFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibnp4LWNvbHVtbi1zZXR0aW5nX19maXhlZC1sZWZ0XCJcclxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpdGVtLmZpeGVkID09PSAnbGVmdCdcIlxyXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXRlbS52aXNpYmxlID09PSBmYWxzZVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJmaXhlZENvbHVtbihpdGVtLCBpdGVtLmZpeGVkID09ICdsZWZ0JyA/IG51bGwgOiAnbGVmdCcpXCJcclxuICAgICAgICAgICAgbnotdG9vbHRpcFxyXG4gICAgICAgICAgICBuelRvb2x0aXBUaXRsZT1cIuWbuuWumuWIsOW3puS+p1wiXHJcbiAgICAgICAgICA+PC9pPlxyXG4gICAgICAgICAgPG56LWRpdmlkZXIgbnpUeXBlPVwidmVydGljYWxcIj48L256LWRpdmlkZXI+XHJcbiAgICAgICAgICA8aVxyXG4gICAgICAgICAgICBuei1pY29uXHJcbiAgICAgICAgICAgIG56VHlwZT1cInZlcnRpY2FsLWFsaWduLWJvdHRvbVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibnp4LWNvbHVtbi1zZXR0aW5nX19maXhlZC1yaWdodFwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXRlbS5maXhlZCA9PT0gJ3JpZ2h0J1wiXHJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpdGVtLnZpc2libGUgPT09IGZhbHNlXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cImZpeGVkQ29sdW1uKGl0ZW0sIGl0ZW0uZml4ZWQgPT0gJ3JpZ2h0JyA/IG51bGwgOiAncmlnaHQnKVwiXHJcbiAgICAgICAgICAgIG56LXRvb2x0aXBcclxuICAgICAgICAgICAgbnpUb29sdGlwVGl0bGU9XCLlm7rlrprliLDlj7PkvqdcIlxyXG4gICAgICAgICAgPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9saT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvdWw+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==