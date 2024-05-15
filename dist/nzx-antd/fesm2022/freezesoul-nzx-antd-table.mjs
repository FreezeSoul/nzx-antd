import * as i0 from '@angular/core';
import { Component, Input, Pipe, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, Output, ElementRef, InjectionToken, Injectable, Directive, TemplateRef, ContentChildren, ViewChild, HostListener, NgModule, Optional, Inject } from '@angular/core';
import * as i6 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { NzxUtils } from '@freezesoul/nzx-antd/util';
import { of, merge, debounceTime } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FetcherService, NzxServiceModule } from '@freezesoul/nzx-antd/service';
import * as i8 from '@freezesoul/nzx-antd/directive';
import { NamedTemplate, NzxDirectiveModule } from '@freezesoul/nzx-antd/directive';
import * as i1$2 from '@angular/common/http';
import * as i1$1 from '@freezesoul/nzx-antd';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4$3 from 'ng-zorro-antd/table';
import { NzTableModule } from 'ng-zorro-antd/table';
import * as i5$3 from 'ng-zorro-antd/resizable';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import * as i7 from 'ng-zorro-antd/divider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import * as i7$1 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i2 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i3 from 'ng-zorro-antd/core/transition-patch';
import * as i4 from 'ng-zorro-antd/core/wave';
import * as i5 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i3$1 from 'ng-zorro-antd/menu';
import * as i4$1 from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import * as i5$1 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import * as i2$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4$2 from 'ng-zorro-antd/popover';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import * as i5$2 from 'ng-zorro-antd/checkbox';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import * as i14 from '@freezesoul/nzx-antd/pipe';
import { NzxPipeModule } from '@freezesoul/nzx-antd/pipe';
import * as i3$2 from 'ng-zorro-antd/input';
import { NzInputModule } from 'ng-zorro-antd/input';
import * as i2$2 from 'ng-zorro-antd/tag';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzxSwitchComponent, NzxSwitchModule } from '@freezesoul/nzx-antd/switch';
import { NzInputNumberComponent, NzInputNumberModule } from 'ng-zorro-antd/input-number';

const FETCH_SETTING = {
    pageIndexField: 'pageIndex',
    pageSizeField: 'pageSize',
    listField: 'list',
    totalField: 'total',
    method: 'post',
    responseType: 'json'
};

class TableButtonComponent {
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

/**
 * 处理链接的href属性
 */
class LinkHrefPipe {
    transform(btn, row, params) {
        if (!btn.href) {
            return undefined;
        }
        if (typeof btn.href === 'string') {
            return btn.href;
        }
        if (NzxUtils.isFunction(btn.href)) {
            return btn.href(row, params);
        }
        if (row?.buttons && params.column.name) {
            return row.buttons[params.column.name]?.href;
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LinkHrefPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: LinkHrefPipe, name: "linkHref" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: LinkHrefPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'linkHref'
                }]
        }] });

class TableLinkComponent {
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: LinkHrefPipe, name: "linkHref" }] });
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

class NzxTableHeaderComponent {
    tableSize = 'small';
    /**
     * 是否显示操作按钮小图标
     */
    actionVisible;
    refreshVisible;
    resizeVisible;
    tableSizeChange = new EventEmitter();
    refreshClick = new EventEmitter();
    tableSizeOptions = [
        { sizeName: '大号', selected: false, value: 'default' },
        { sizeName: '中等', selected: false, value: 'middle' },
        { sizeName: '紧凑', selected: true, value: 'small' },
        { sizeName: '迷你', selected: true, value: 'mini' }
    ];
    constructor() { }
    ngOnInit() {
        this.tableSizeOptions.forEach(v => (v.selected = v.value === this.tableSize));
    }
    ngOnChanges(changes) {
        if (changes.tableSize && !changes.tableSize.isFirstChange()) {
            this.ngOnInit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxTableHeaderComponent, selector: "nzx-table-header", inputs: { tableSize: "tableSize", actionVisible: "actionVisible", refreshVisible: "refreshVisible", resizeVisible: "resizeVisible" }, outputs: { tableSizeChange: "tableSizeChange", refreshClick: "refreshClick" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"nzx-table__header\">\r\n  <div class=\"nzx-table__title\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <div class=\"nzx-table__toolbar\">\r\n    <ng-content select=\"[setting-before]\"></ng-content>\r\n    <ng-container *ngIf=\"actionVisible !== false\">\r\n      <i\r\n        *ngIf=\"refreshVisible\"\r\n        (click)=\"refreshClick.emit()\"\r\n        nz-icon\r\n        nzType=\"reload\"\r\n        nzTheme=\"outline\"\r\n        nz-tooltip\r\n        nzTooltipTitle=\"\u5237\u65B0\"\r\n        tabindex=\"-1\"\r\n      ></i>\r\n      <i\r\n        *ngIf=\"resizeVisible\"\r\n        nzTrigger=\"click\"\r\n        nz-dropdown\r\n        [nzDropdownMenu]=\"tableSizeMenu\"\r\n        nz-icon\r\n        nzType=\"column-height\"\r\n        nzTheme=\"outline\"\r\n        nz-tooltip\r\n        tabindex=\"-1\"\r\n        nzTooltipTitle=\"\u5BC6\u5EA6\"\r\n      ></i>\r\n\r\n      <ng-content select=\"[setting]\"></ng-content>\r\n    </ng-container>\r\n\r\n    <ng-content select=\"[toolbar]\"></ng-content>\r\n  </div>\r\n</div>\r\n\r\n<nz-dropdown-menu #tableSizeMenu>\r\n  <ul nz-menu>\r\n    <li\r\n      nz-menu-item\r\n      (click)=\"item.value !== tableSize && tableSizeChange.emit(item.value)\"\r\n      [nzSelected]=\"item.selected\"\r\n      *ngFor=\"let item of tableSizeOptions\"\r\n    >\r\n      <span>{{ item.sizeName }}</span>\r\n    </li>\r\n  </ul>\r\n</nz-dropdown-menu>\r\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: i3$1.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { kind: "component", type: i3$1.NzMenuItemComponent, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { kind: "directive", type: i4$1.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { kind: "component", type: i4$1.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { kind: "directive", type: i5$1.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-table-header', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"nzx-table__header\">\r\n  <div class=\"nzx-table__title\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <div class=\"nzx-table__toolbar\">\r\n    <ng-content select=\"[setting-before]\"></ng-content>\r\n    <ng-container *ngIf=\"actionVisible !== false\">\r\n      <i\r\n        *ngIf=\"refreshVisible\"\r\n        (click)=\"refreshClick.emit()\"\r\n        nz-icon\r\n        nzType=\"reload\"\r\n        nzTheme=\"outline\"\r\n        nz-tooltip\r\n        nzTooltipTitle=\"\u5237\u65B0\"\r\n        tabindex=\"-1\"\r\n      ></i>\r\n      <i\r\n        *ngIf=\"resizeVisible\"\r\n        nzTrigger=\"click\"\r\n        nz-dropdown\r\n        [nzDropdownMenu]=\"tableSizeMenu\"\r\n        nz-icon\r\n        nzType=\"column-height\"\r\n        nzTheme=\"outline\"\r\n        nz-tooltip\r\n        tabindex=\"-1\"\r\n        nzTooltipTitle=\"\u5BC6\u5EA6\"\r\n      ></i>\r\n\r\n      <ng-content select=\"[setting]\"></ng-content>\r\n    </ng-container>\r\n\r\n    <ng-content select=\"[toolbar]\"></ng-content>\r\n  </div>\r\n</div>\r\n\r\n<nz-dropdown-menu #tableSizeMenu>\r\n  <ul nz-menu>\r\n    <li\r\n      nz-menu-item\r\n      (click)=\"item.value !== tableSize && tableSizeChange.emit(item.value)\"\r\n      [nzSelected]=\"item.selected\"\r\n      *ngFor=\"let item of tableSizeOptions\"\r\n    >\r\n      <span>{{ item.sizeName }}</span>\r\n    </li>\r\n  </ul>\r\n</nz-dropdown-menu>\r\n", styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { tableSize: [{
                type: Input
            }], actionVisible: [{
                type: Input
            }], refreshVisible: [{
                type: Input
            }], resizeVisible: [{
                type: Input
            }], tableSizeChange: [{
                type: Output
            }], refreshClick: [{
                type: Output
            }] } });

/**
 * 列设置
 * 注意: 只在表头不分组的情况下有效
 */
class NzxColumnSettingComponent {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxColumnSettingComponent, selector: "nzx-column-setting", inputs: { dragPreviewClass: "dragPreviewClass", columnNameVisible: "columnNameVisible", nzxColumns: "nzxColumns" }, outputs: { columnCheckedChange: "columnCheckedChange", sortedColumn: "sortedColumn", columnNameCheckedChange: "columnNameCheckedChange", fixedClick: "fixedClick" }, ngImport: i0, template: "<i\r\n  nz-icon\r\n  nzType=\"setting\"\r\n  nzTheme=\"outline\"\r\n  tabindex=\"-1\"\r\n  nz-popover\r\n  nzPopoverTrigger=\"click\"\r\n  nzPopoverOverlayClassName=\"nzx-column-setting__cloumn-box\"\r\n  [nzPopoverTitle]=\"titleTemplate\"\r\n  [nzPopoverPlacement]=\"'bottomRight'\"\r\n  [nzPopoverContent]=\"contentTemplate\"\r\n  nz-tooltip\r\n  nzTooltipTitle=\"\u5217\u8BBE\u7F6E\"\r\n></i>\r\n\r\n<ng-template #titleTemplate>\r\n  <div class=\"nzx-column-setting__popover-title\">\r\n    <div class=\"nzx-column-setting__flex\" style=\"flex: 1\">\r\n      <label\r\n        *ngIf=\"columnNameVisible !== false\"\r\n        nz-checkbox\r\n        [(ngModel)]=\"_columnNameChecked\"\r\n        [nzIndeterminate]=\"_indeterminate\"\r\n        (ngModelChange)=\"columnNameChange($event)\"\r\n      >\r\n        \u5C55\u793A\u5217\r\n      </label>\r\n    </div>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #contentTemplate>\r\n  <ul\r\n    style=\"min-width: 315px\"\r\n    cdkDropList\r\n    (cdkDropListDropped)=\"dropColumn($event, _nzxColumns)\"\r\n    class=\"nzx-column-setting__column-list\"\r\n  >\r\n    <ng-container *ngFor=\"let item of _nzxColumns\">\r\n      <li\r\n        *ngIf=\"item.settingVisible !== false\"\r\n        class=\"nzx-column-setting__check-item\"\r\n        cdkDrag\r\n        cdkDragLockAxis=\"y\"\r\n        cdkDragBoundary=\".nzx-column-setting__column-list\"\r\n        (cdkDragStarted)=\"cdkDragStarted($event)\"\r\n        (cdkDragReleased)=\"cdkDragReleased($event)\"\r\n      >\r\n        <div class=\"drag-box\">\r\n          <i cdkDragHandle nz-icon nzType=\"drag\" class=\"nzx-column-setting__drag-icon\"></i>\r\n          <label\r\n            nz-checkbox\r\n            [nzDisabled]=\"item.settingDisabled === true\"\r\n            [(ngModel)]=\"item.visible\"\r\n            (ngModelChange)=\"columnVisible(item, $event)\"\r\n          >\r\n            {{ item.settingText || item.thText }}\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"nzx-column-setting__flex\">\r\n          <i\r\n            nz-icon\r\n            nzType=\"vertical-align-top\"\r\n            class=\"nzx-column-setting__fixed-left\"\r\n            [class.active]=\"item.fixed === 'left'\"\r\n            [class.disabled]=\"item.visible === false\"\r\n            (click)=\"fixedColumn(item, item.fixed == 'left' ? null : 'left')\"\r\n            nz-tooltip\r\n            nzTooltipTitle=\"\u56FA\u5B9A\u5230\u5DE6\u4FA7\"\r\n          ></i>\r\n          <nz-divider nzType=\"vertical\"></nz-divider>\r\n          <i\r\n            nz-icon\r\n            nzType=\"vertical-align-bottom\"\r\n            class=\"nzx-column-setting__fixed-right\"\r\n            [class.active]=\"item.fixed === 'right'\"\r\n            [class.disabled]=\"item.visible === false\"\r\n            (click)=\"fixedColumn(item, item.fixed == 'right' ? null : 'right')\"\r\n            nz-tooltip\r\n            nzTooltipTitle=\"\u56FA\u5B9A\u5230\u53F3\u4FA7\"\r\n          ></i>\r\n        </div>\r\n      </li>\r\n    </ng-container>\r\n  </ul>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i5.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: i4$2.NzPopoverDirective, selector: "[nz-popover]", inputs: ["nzPopoverArrowPointAtCenter", "nzPopoverTitle", "nzPopoverContent", "nz-popover", "nzPopoverTrigger", "nzPopoverPlacement", "nzPopoverOrigin", "nzPopoverVisible", "nzPopoverMouseEnterDelay", "nzPopoverMouseLeaveDelay", "nzPopoverOverlayClassName", "nzPopoverOverlayStyle", "nzPopoverBackdrop"], outputs: ["nzPopoverVisibleChange"], exportAs: ["nzPopover"] }, { kind: "component", type: i5$2.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: i6.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i6.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { kind: "component", type: i7.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "directive", type: i5$1.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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

const TABLE_WIDGET = new InjectionToken('TABLE_WIDGET');
class TableWidgetService {
    widgetMap = {};
    get widgets() {
        return this.widgetMap;
    }
    register(widgets) {
        if (!widgets?.length) {
            return;
        }
        for (const widget of widgets) {
            this.widgetMap[widget.name] = widget.component;
        }
    }
    has(type) {
        return Object.hasOwn(this.widgetMap, type);
    }
    get(type) {
        return this.widgetMap[type];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class TableWidgetDirective {
    widgetService;
    viewContainerRef;
    renderer;
    row = {};
    indexAttr;
    colIndex;
    column;
    nzData = [];
    nzPageData = [];
    widget;
    constructor(widgetService, viewContainerRef, renderer) {
        this.widgetService = widgetService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.viewContainerRef.clear();
        if (!this.widget) {
            return;
        }
        const componentType = this.widgetService.get(this.widget.type);
        if (!componentType) {
            console.warn(`组件类型“${this.widget.type}”未注册`);
            return;
        }
        const params = {
            row: this.row,
            nzData: this.nzData,
            nzPageData: this.nzPageData,
            column: this.column,
            indexAttr: this.indexAttr,
            colIndex: this.colIndex
        };
        const componentRef = this.viewContainerRef.createComponent(componentType);
        const callbackParams = {
            instance: componentRef.instance,
            componentRef,
            ...params
        };
        const result = NzxUtils.isFunction(this.widget.props)
            ? resolveType(this.widget.props(this.row, params))
            : resolveType(this.widget.props);
        result.subscribe((props) => {
            console.log(props);
            const values = Object.assign(params, { props }, props);
            Object.assign(componentRef.instance, values);
            for (const key in values) {
                // eslint-disable-next-line
                // @ts-ignore
                const tNode = componentRef._tNode;
                // 检查属性是否有属于inputs, _tNode是私有属性，不应该直接访问，所以做个检查，对实际运行不影响
                if (tNode && tNode.inputs && tNode.inputs[key]) {
                    componentRef.setInput(key, values[key]);
                }
                else {
                    componentRef.instance[key] = values[key];
                }
            }
            this.widget.onInit?.(callbackParams);
        });
        this.mergeElementProperty(componentRef, params);
        if (this.widget.onDestroy) {
            componentRef.onDestroy(() => this.widget.onDestroy({
                ...callbackParams
            }));
        }
    }
    mergeElementProperty(componentRef, params) {
        const element = componentRef.location.nativeElement;
        if (this.widget.style) {
            Object.assign(element.style, this.widget.style);
        }
        if (this.widget.className) {
            element.className = this.widget.className;
        }
        if (this.widget.click) {
            this.renderer.listen(element, 'click', (event) => this.widget.click(this.row, params, event));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetDirective, deps: [{ token: TableWidgetService }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TableWidgetDirective, selector: "[table-widget]", inputs: { row: "row", indexAttr: "indexAttr", colIndex: "colIndex", column: "column", nzData: "nzData", nzPageData: "nzPageData", widget: "widget" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[table-widget]'
                }]
        }], ctorParameters: function () { return [{ type: TableWidgetService }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }]; }, propDecorators: { row: [{
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
            }], widget: [{
                type: Input
            }] } });
function resolveType(type) {
    if (!type) {
        return of({});
    }
    if (NzxUtils.isObservable(type) || NzxUtils.isPromise(type)) {
        return type;
    }
    return of(type);
}

class ColFormatPipe {
    transform(row, col, params) {
        const nameData = col.name ? NzxUtils.get(row, col.name) : null;
        if (!col.format) {
            return Promise.resolve(nameData);
        }
        const result = col.format(nameData, row, params);
        if (NzxUtils.isPromise(result) || NzxUtils.isObservable(result)) {
            return result;
        }
        return Promise.resolve(result);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColFormatPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColFormatPipe, name: "colFormat" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColFormatPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colFormat'
                }]
        }] });

class ColSpanPipe {
    transform(row, spanFunc, nzData, nzPageData, column, indexAttr, colIndex) {
        let rowspan = 1;
        let colspan = 1;
        if (spanFunc) {
            const result = spanFunc(row, {
                row,
                nzData,
                nzPageData,
                column,
                indexAttr,
                colIndex
            });
            if (Array.isArray(result)) {
                rowspan = result[0];
                colspan = result[1];
            }
            else if (result != null) {
                rowspan = result.rowspan;
                colspan = result.colspan;
            }
        }
        return { rowspan, colspan };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColSpanPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColSpanPipe, name: "colSpan" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColSpanPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colSpan',
                    pure: true
                }]
        }] });

class ColButtonVisiblePipe {
    transform(value) {
        if (NzxUtils.isFunction(value)) {
            return value;
        }
        return () => value !== false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonVisiblePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColButtonVisiblePipe, name: "colButtonVisible" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonVisiblePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colButtonVisible'
                }]
        }] });

class HasAuthPipe {
    antdService;
    hasAuth = () => of(true);
    constructor(antdService) {
        this.antdService = antdService;
        if (this.antdService.hasAuth) {
            this.hasAuth = this.antdService.hasAuth;
        }
    }
    transform(value) {
        return this.hasAuth(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HasAuthPipe, deps: [{ token: i1$1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: HasAuthPipe, name: "hasAuth" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HasAuthPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'hasAuth'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.NzxAntdService }]; } });

class ColButtonsPipe {
    transform(buttons, row, params, parentRow) {
        if (!buttons) {
            return of([]);
        }
        if (NzxUtils.isFunction(buttons)) {
            return resolveButton(buttons(row, { ...params, parentRow }));
        }
        return resolveButton(buttons);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ColButtonsPipe, name: "colButtons" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ColButtonsPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'colButtons'
                }]
        }] });
function resolveButton(buttons) {
    if (!buttons) {
        return of([]);
    }
    if (NzxUtils.isArray(buttons)) {
        return of(buttons);
    }
    if (NzxUtils.isObservable(buttons) || NzxUtils.isPromise(buttons)) {
        return buttons;
    }
    return of([]);
}

/**
 * 基于nz-table二次封装的表格组件
 * ## 特性
 * - 配置加载数据: `api: string | Promise<T[]> | Observable<T[]>`
 * - 支持列的配置: `nzxColumns: NzxColumn<T>[]`
 * - 列支持排序配置
 * - 默认支持显示拖动列, 调整列顺序
 * - 支持配置显示序号、复选框
 * - 自定义渲染内容， template使用名称即可引用成功
 * - 支持请求/响应信息配置, `fetchSetting?: FetchSetting`
 * - 支持异步格式化列数据
 */
class NzxTableComponent {
    cdr;
    render;
    http;
    elementRef;
    antdService;
    /**
     * 当前选中的行
     */
    _selectRow;
    /**
     * 当前页数据
     */
    _currentPageData = [];
    _headerColumns = [];
    _bodyColumns = [];
    _allColumns = [];
    _nzTotal = 0;
    _nzShowPagination = true;
    sortInfo;
    defaultPageSizeOptions = [10, 15, 20, 30, 40, 50, 100];
    /**
     * 请求处理
     */
    api;
    /**
     * 请求参数
     */
    params;
    /**
     * 是否显示刷新按钮
     */
    nzxRefreshVisible = true;
    /**
     * 是否显示调整表格大小按钮
     */
    nzxResizeVisible = true;
    /**
     * 显示配置列, 只在非合并表头时可用
     */
    nzxSettingVisible = true;
    /**
     * 是否显示斑马线
     */
    nzxStripe = false;
    /**
     * 请求之前处理函数
     */
    beforeFetch;
    /**
     * 请求之后处理函数
     */
    afterFetch;
    /**
     * 请求配置
     */
    fetchSetting;
    /**
     * 排序函数
     */
    sortFn;
    /**
     * 配置列
     */
    nzxColumns = [];
    /**
     * 默认渲染表头
     */
    nzxDefaultRenderHeader = true;
    /**
     * 标题
     */
    title;
    /**
     * 是否显示表头
     */
    nzxShowHeader;
    /**
     * 工具栏-在工具栏之前
     */
    toolbarBefore;
    /**
     * 工具栏
     */
    toolbar;
    /**
     * 是否能调整列大小
     */
    nzxResizable = true;
    /**
     * 表格布局
     */
    nzTableLayout = 'auto';
    /**
     * 用于显示数据总量和当前数据范围，用法参照 Pagination 组件
     */
    nzShowTotal;
    /**
     * 用于自定义页码的结构，用法参照 Pagination 组件
     */
    nzItemRender;
    /**
     * 表格标题
     */
    nzTitle;
    /**
     * 表格尾部
     */
    nzFooter;
    /**
     * 无数据时显示内容
     */
    nzNoResult;
    /**
     * 	页数选择器可选值
     */
    nzPageSizeOptions;
    /**
     * 虚拟滚动时每一列的高度，与 cdk itemSize 相同
     */
    nzVirtualItemSize = 0;
    /**
     * 	缓冲区最大像素高度，与 cdk maxBufferPx 相同
     */
    nzVirtualMaxBufferPx = 200;
    /**
     * 缓冲区最小像素高度，低于该值时将加载新结构，与 cdk minBufferPx 相同
     */
    nzVirtualMinBufferPx = 100;
    /**
     * 延迟显示加载效果的时间（防止闪烁）
     */
    nzLoadingDelay = 0;
    /**
     * 	当前页码，可双向绑定
     */
    nzPageIndex = 1;
    /**
     * 每页展示多少数据，可双向绑定
     */
    nzPageSize;
    /**
     * 当前总数据，在服务器渲染时需要传入
     */
    set nzTotal(value) {
        this._nzTotal = value;
        setTimeout(() => this.fixedFit());
    }
    get nzTotal() {
        return this._nzTotal;
    }
    /**
     * 表头分组时指定每列宽度，与 th 的 [nzWidth] 不可混用
     */
    nzWidthConfig = [];
    /**
     * 表格数据
     */
    nzData = [];
    /**
     * 指定分页显示的位置
     */
    nzPaginationPosition = 'bottom';
    /**
     * 横向支持滚动
     */
    set scrollX(value) {
        this.nzScroll = { ...this.nzScroll, x: value };
    }
    /**
     * 纵向支持滚动
     */
    set scrollY(value) {
        this.nzScroll = { ...this.nzScroll, y: value };
    }
    nzScroll = { x: this.scrollX, y: this.scrollY };
    /**
     * 表格是否自动撑满
     */
    nzxFit;
    /**
     * 指定分页显示的尺寸
     */
    nzPaginationType = 'default';
    /**
     * 是否在前端对数据进行分页，如果在服务器分页数据或者需要在前端显示全部数据时传入 false
     */
    nzFrontPagination = false;
    /**
     * 模板模式，无需将数据传递给 nzData
     */
    nzTemplateMode = false;
    /**
     * 	是否显示分页器
     */
    set nzShowPagination(value) {
        this._nzShowPagination = value;
        setTimeout(() => this.fixedFit());
    }
    get nzShowPagination() {
        return this._nzShowPagination;
    }
    /**
     * 页面是否加载中
     */
    nzLoading = false;
    /**
     * 是否自动显示loading
     */
    nzxAutoLoading = false;
    /**
     * 是否显示外边框
     */
    nzOuterBordered = false;
    /**
     * 加载指示符
     */
    nzLoadingIndicator;
    /**
     * 是否展示外边框和列边框
     */
    nzBordered = false;
    /**
     * 表格大小, 正常或迷你类型
     */
    nzSize = 'small';
    /**
     * 是否可以改变 nzPageSize
     */
    nzShowSizeChanger = true;
    /**
     * 只有一页时是否隐藏分页器
     */
    nzHideOnSinglePage = false;
    /**
     * 是否可以快速跳转至某页
     */
    nzShowQuickJumper = true;
    /**
     * 当添加该属性时，显示为简单分页
     */
    nzSimple = false;
    /**
     * 是否显示操作按钮小图标
     */
    actionVisible;
    /**
     * 是否显示顶部标题
     */
    toolbarVisible;
    /**
     * 点击行是否选中
     */
    nzxClickSelectedRow;
    /**
     * 当数据为null显示的默认文本
     */
    defaultText;
    /**
     * 由外部传入模板列表
     */
    tplMap;
    /**
     * 虚拟滚动数据 TrackByFunction 函数
     */
    nzVirtualForTrackBy;
    /**
     * 合并单元格
     */
    nzxSpanFunc;
    /**
     * 自定义tr
     */
    nzxTr;
    /**
     * 如果是树结构, 设置缩进大小
     */
    nzIndentSize = 20;
    /**
     * 树表的checkable状态下节点选择完全受控（父子节点选中状态不再关联）, 默认false
     */
    nzCheckStrictly;
    /**
     * 页数改变时的回调函数
     */
    nzPageSizeChange = new EventEmitter();
    /**
     * 当前页码改变时的回调函数
     */
    nzPageIndexChange = new EventEmitter();
    /**
     * 	当服务端分页、筛选、排序时，用于获得参数
     */
    nzQueryParams = new EventEmitter();
    /**
     * 当前页面展示数据改变的回调函数
     */
    nzCurrentPageDataChange = new EventEmitter();
    /**
     * 数据行点击事件
     */
    rowClick = new EventEmitter();
    /**
     * 数据行双击事件
     */
    rowDblclick = new EventEmitter();
    /**
     * 数据行右键菜单事件
     */
    rowContextmenu = new EventEmitter();
    /**
     * 单元格点击事件
     */
    cellClick = new EventEmitter();
    /**
     * 单元格双击事件
     */
    cellDblclick = new EventEmitter();
    /**
     * 单元格右键菜单事件
     */
    cellContextmenu = new EventEmitter();
    /**
     * 表头单元格事件
     */
    headerClick = new EventEmitter();
    /**
     * 表头单元格双击事件
     */
    headerDblclick = new EventEmitter();
    /**
     * 表头单元格右键菜单事件
     */
    headerContextmenu = new EventEmitter();
    /**
     * 刷新按钮点击事件
     */
    refreshClick = new EventEmitter();
    /**
     * 排序列触发
     */
    sortedColumn = new EventEmitter();
    children;
    nzTable;
    nzTableElementRef;
    constructor(cdr, render, http, elementRef, antdService) {
        this.cdr = cdr;
        this.render = render;
        this.http = http;
        this.elementRef = elementRef;
        this.antdService = antdService;
    }
    ngOnInit() {
        merge(this.nzPageIndexChange, this.nzPageSizeChange)
            .pipe(debounceTime(50))
            .subscribe(() => this.fetch(false));
        this.nzPageSize = this.nzPageSize || this.antdService.table?.nzPageSize || 10;
        this.resolveColumns();
        this.fetch();
    }
    onResize({ width }, col) {
        col.nzWidth = width + 'px';
    }
    /**
     * 切换表格大小, 增加mini 类型
     * @param size 表格大小
     * @param table nz表格组件
     */
    tableSizeChange(size, table) {
        this.nzSize = size;
        // @ts-ignore
        const tableMainElement = table.elementRef.nativeElement.querySelector('.ant-table');
        if (!tableMainElement) {
            return;
        }
        if (size === 'mini') {
            this.render.addClass(tableMainElement, 'ant-table-mini');
        }
        else {
            this.render.removeClass(tableMainElement, 'ant-table-mini');
        }
    }
    /**
     * 点击刷新按钮
     */
    onRefreshClick() {
        if (this.refreshClick.observed) {
            this.refreshClick.emit(this);
        }
        else {
            this.fetch(false);
        }
    }
    /**
     * 刷新
     * @param reset
     */
    refresh(reset = true) {
        return this.fetch(reset);
    }
    /**
     * 固定列
     * @param column
     */
    fixedClick(column) {
        const hasFixed = this._allColumns.filter(value => value.fixed).length;
        this.scrollX = hasFixed ? '100vw' : null;
    }
    /**
     * 排序
     * @param value
     * @param col
     */
    sortOrderChange(value, col) {
        if (col.nzSortOrderChange) {
            col.nzSortOrderChange(value, col);
        }
        const key = col.nzColumnKey || col.name;
        this.sortInfo = {
            column: col,
            order: value,
            field: key
        };
        this.fetch(false);
    }
    /**
     * 发起请求
     * @param reset 是否重置
     */
    fetch(reset = true) {
        if (!this.api) {
            return null;
        }
        if (this.nzxAutoLoading) {
            this.nzLoading = true;
            this.cdr.markForCheck();
        }
        return new Promise((resolve, reject) => {
            const fetchSetting = Object.assign({}, FETCH_SETTING, this.antdService.table, this.fetchSetting);
            const setResult = res => {
                this.setFetchResult(res, fetchSetting, reset).then(v => resolve(v), reject);
            };
            if (NzxUtils.isString(this.api)) {
                FetcherService.resolveParams(this.params)
                    .pipe(switchMap(_params => {
                    const commonParams = this.mergeParams(reset, fetchSetting);
                    const data = Object.assign({}, _params, commonParams);
                    const beforeFetch = this.beforeFetch || this.antdService.table?.beforeFetch;
                    if (!beforeFetch) {
                        return this.doFetch(this.api, fetchSetting.method, commonParams, data);
                    }
                    return FetcherService.resolveParams(beforeFetch(data)).pipe(_data => this.doFetch(this.api, fetchSetting.method, commonParams, _data));
                }))
                    .subscribe({
                    next: res => this.setFetchResult(res, fetchSetting, reset).then(v => resolve(v), reject),
                    error: err => reject(err)
                });
                return;
            }
            if (NzxUtils.isObservable(this.api)) {
                this.api.subscribe({ next: setResult, error: err => reject(err) });
                return;
            }
            if (NzxUtils.isPromise(this.api)) {
                this.api.then(setResult, reject);
                return;
            }
            setResult([]);
        }).finally(() => {
            if (this.nzxAutoLoading) {
                this.nzLoading = false;
            }
            this.cdr.markForCheck();
        });
    }
    /**
     * 行点击事件
     * @param info
     */
    onRowClick(info) {
        this.rowClick.emit(info);
        if (this.nzxClickSelectedRow !== false) {
            this._selectRow = this._selectRow === info.row ? undefined : info.row;
        }
    }
    /**
     * 执行请求
     * @param url
     * @param method
     * @param params
     * @param data
     * @protected
     */
    doFetch(url, method, params, data) {
        const option = {};
        method ||= 'post';
        if (/^post|put$/i.test(method)) {
            option.params = params;
            option.body = data;
        }
        else {
            option.params = Object.assign({}, data, params);
        }
        return this.http.request(method, url, option);
    }
    /**
     * 处理请求结果
     * @param res
     * @param fetchSetting
     * @param reset
     * @private
     */
    setFetchResult(res, fetchSetting, reset) {
        let result = {};
        const afterFetch = this.afterFetch || this.antdService.table?.afterFetch;
        if (afterFetch && NzxUtils.isFunction(afterFetch)) {
            const data = afterFetch(res, this.nzPageIndex, reset);
            if (NzxUtils.isPromise(data)) {
                return data.then(v => this.setPageInfo(res, v, fetchSetting, reset));
            }
            result = data || {};
        }
        else {
            if (Array.isArray(res)) {
                result.list = res;
                result.total = res.length;
            }
        }
        return Promise.resolve(this.setPageInfo(res, result, fetchSetting, reset));
    }
    /**
     * 设置分页信息
     * @param res 响应对象
     * @param pageInfo 原pageInfo
     * @param fetchSetting 配置
     * @param reset 是否重置
     * @private
     */
    setPageInfo(res, pageInfo, fetchSetting, reset) {
        const total = pageInfo.total != null ? pageInfo.total : NzxUtils.get(res, fetchSetting.totalField);
        const pageIndex = reset
            ? 1
            : pageInfo.pageIndex != null
                ? pageInfo.pageIndex
                : NzxUtils.get(res, fetchSetting.pageIndexField);
        this.nzData = pageInfo.list || NzxUtils.get(res, fetchSetting.listField);
        this.nzTotal = total || 0;
        if (pageIndex != null) {
            this.nzPageIndex = pageIndex;
        }
        this.cdr.markForCheck();
        return pageInfo;
    }
    /**
     * 合并请求参数
     * @param reset
     * @param fetchSetting
     * @private
     */
    mergeParams(reset = true, fetchSetting) {
        const nzPageIndex = reset ? 1 : this.nzPageIndex;
        const params = {};
        NzxUtils.set(params, fetchSetting.pageIndexField, nzPageIndex);
        NzxUtils.set(params, fetchSetting.pageSizeField, this.nzPageSize);
        if (this.sortInfo) {
            const sortInfo = NzxUtils.isFunction(this.sortFn) ? this.sortFn(this.sortInfo) : this.sortInfo;
            delete sortInfo.column;
            Object.assign(params, sortInfo);
        }
        return params;
    }
    /**
     * 是否是异步数据
     * @param obj
     * @protected
     */
    isAsync(obj) {
        return NzxUtils.isObservable(obj) || NzxUtils.isPromise(obj);
    }
    /**
     * 处理表头合并单元格和 body的列
     * @protected
     */
    resolveColumns() {
        const { headerRows, bodyRows, allColumns } = this.getRowColumns(this.nzxColumns);
        this._headerColumns = headerRows;
        this._allColumns = allColumns;
        // 没有合并表头, 使用同一对象
        this._bodyColumns = headerRows.length ? bodyRows : headerRows[0];
    }
    /**
     * 处理参数为模板的参数, 从字符串中找到真正的模板对象
     * @protected
     */
    resolveTemplateColumn() {
        const nameTemplateMap = {};
        for (const tpl of this.children) {
            nameTemplateMap[tpl.named] = tpl.template;
        }
        if (this.tplMap) {
            this.tplMap.forEach((value, key) => (nameTemplateMap[key] = value));
        }
        this._allColumns.forEach(col => Object.keys(col)
            .filter(v => /Template$/.test(v))
            .forEach(tplName => this.stringToTemplate(col, tplName, nameTemplateMap)));
        setTimeout(() => this.cdr.markForCheck());
    }
    /**
     * 字符串查找对应的模版
     * @param col
     * @param key
     * @param nameTemplateMap
     * @protected
     */
    stringToTemplate(col, key, nameTemplateMap) {
        const newKey = '_' + key;
        if (typeof col[key] === 'string') {
            const tpl = nameTemplateMap[col[key]];
            if (tpl) {
                col[newKey] = tpl;
            }
        }
        else if (col[key] instanceof TemplateRef) {
            col[newKey] = col[key];
        }
    }
    /**
     * 表头触发CheckBox change
     * @param evt
     * @param col
     */
    thCheckedChange(evt, col) {
        if (col.enableCheckAll !== false) {
            col.checked = evt;
            col.nzIndeterminate = false;
            NzxUtils.forEachTree(this._currentPageData, v => {
                if (!v.disabled) {
                    // @ts-ignore
                    v.checked = evt;
                    // @ts-ignore
                    v.nzIndeterminate = false;
                }
            });
        }
        if (col.thCheckedChange) {
            col.thCheckedChange(evt, col);
        }
        this.cdr.markForCheck();
    }
    /**
     * td触发CheckBox change
     * @param evt
     * @param col
     * @param row
     * @param pathTrace 父节点路径
     * @param indexAttr
     */
    tdCheckedChange(evt, col, row, pathTrace, indexAttr) {
        if (col.enableCheckAll !== false) {
            // 非受控的checkbox
            if (this.nzCheckStrictly !== true) {
                // @ts-ignore
                row.nzIndeterminate = false;
                NzxUtils.forEachTree(row.children, node => {
                    if (!node.disabled) {
                        node.checked = evt;
                    }
                });
                let [parents, parent] = pathTrace;
                while (parent) {
                    if (parent.children) {
                        this._refreshCheckedStatus(parent, parent.children);
                    }
                    if (!parents) {
                        break;
                    }
                    parent = parents[1];
                    parents = parents[0];
                }
            }
            this.refreshCheckedStatus(col);
        }
        if (col.tdCheckedChange) {
            col.tdCheckedChange(evt, col, row, indexAttr);
        }
        this.cdr.markForCheck();
    }
    onCurrentPageDataChange(list) {
        this._currentPageData = list;
        const col = this._bodyColumns.filter(v => v.nzShowCheckbox)[0];
        if (col) {
            this.refreshCheckedStatus(col);
        }
        this.nzCurrentPageDataChange.emit(list);
        this.cdr.markForCheck();
    }
    refreshCheckedStatus(col) {
        this._refreshCheckedStatus(col, this._currentPageData);
    }
    _refreshCheckedStatus(parent, listData) {
        const list = listData.filter(v => !v.disabled);
        if (list.length) {
            parent.checked = list.every(v => v.checked);
            parent.nzIndeterminate = !parent.checked && list.some(v => v.checked);
        }
        else {
            parent.checked = false;
            parent.nzIndeterminate = false;
        }
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.resolveTemplateColumn());
        this.resolveTemplateColumn();
    }
    ngAfterViewInit() {
        if (this.nzSize === 'mini') {
            this.tableSizeChange(this.nzSize, this.nzTable);
        }
        setTimeout(() => this.fixedFit());
    }
    onWindowResize() {
        this.fixedFit();
    }
    ngOnChanges(changes) {
        if ((changes.nzxColumns && !changes.nzxColumns.isFirstChange()) ||
            (changes.tplMap && !changes.tplMap.isFirstChange())) {
            this.resolveColumns();
            this.resolveTemplateColumn();
        }
        if (changes.api && !changes.api.isFirstChange()) {
            this.fetch(true);
        }
    }
    /**
     * 拖拽排序
     * @param event
     */
    onSortedColumn(event) {
        moveItemInArray(this._headerColumns[0], event.previousIndex, event.currentIndex);
        this.sortedColumn.emit(event);
    }
    /**
     * 折叠子节点
     * @param row
     * @param $event
     */
    defaultCollapse(row, $event) {
        const { children } = row || {};
        if (!$event && children && children.length) {
            children.forEach((c) => {
                if (c && c.children && c.children.length) {
                    // @ts-ignore
                    c.expand = false;
                    this.defaultCollapse(c, false);
                }
            });
        }
    }
    /**
     * 获取合并表头
     * @param originColumns 原始列配置
     * @protected
     */
    getRowColumns(originColumns) {
        let maxLevel = 0;
        const allColumns = [];
        NzxUtils.forEachTree(originColumns, (node, parent, level) => {
            this.normalProps(node);
            allColumns.push(node);
            node.colspan = node.children && node.children.length ? 0 : 1;
            node.level = level;
            if (level > maxLevel) {
                maxLevel = level;
            }
            node.parent = parent;
            if (parent && !node.children) {
                let p = parent;
                while (p) {
                    p.colspan++;
                    p = p.parent;
                }
            }
        });
        const headerRows = Array.from({ length: maxLevel + 1 })
            .fill(0)
            .map(() => []);
        const bodyRows = [];
        allColumns.forEach(col => {
            if (!col.children) {
                col.rowspan = maxLevel - col.level + 1;
                bodyRows.push(col);
            }
            else {
                col.rowspan = 1;
            }
            headerRows[col.level].push(col);
        });
        return { headerRows, bodyRows, allColumns };
    }
    /**
     * 规范化属性
     * @param col 列
     * @protected
     */
    normalProps(col) {
        if (col.visible == null) {
            col.visible = true;
        }
        if (col.thText == null && col.isIndex) {
            col.thText = '序号';
        }
    }
    /**
     * 计算撑满父容器
     * @private
     */
    fixedFit() {
        if (!this.nzxFit) {
            return;
        }
        const element = this.nzTableElementRef.nativeElement;
        const table = element.querySelector('.ant-table');
        const container = element.querySelector('.ant-table-container');
        if (!table || !container) {
            return;
        }
        container.style.position = 'absolute';
        const headers = table.querySelectorAll('.ant-table-thead');
        let height = 0;
        headers.forEach(v => (height += v.getBoundingClientRect().height));
        const scrollY = table.getBoundingClientRect().height - height;
        container.style.position = '';
        this.scrollY = `${scrollY}px`;
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i1$2.HttpClient }, { token: i0.ElementRef }, { token: i1$1.NzxAntdService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NzxTableComponent, selector: "nzx-table", inputs: { api: "api", params: "params", nzxRefreshVisible: "nzxRefreshVisible", nzxResizeVisible: "nzxResizeVisible", nzxSettingVisible: "nzxSettingVisible", nzxStripe: "nzxStripe", beforeFetch: "beforeFetch", afterFetch: "afterFetch", fetchSetting: "fetchSetting", sortFn: "sortFn", nzxColumns: "nzxColumns", nzxDefaultRenderHeader: "nzxDefaultRenderHeader", title: "title", nzxShowHeader: "nzxShowHeader", toolbarBefore: "toolbarBefore", toolbar: "toolbar", nzxResizable: "nzxResizable", nzTableLayout: "nzTableLayout", nzShowTotal: "nzShowTotal", nzItemRender: "nzItemRender", nzTitle: "nzTitle", nzFooter: "nzFooter", nzNoResult: "nzNoResult", nzPageSizeOptions: "nzPageSizeOptions", nzVirtualItemSize: "nzVirtualItemSize", nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx", nzVirtualMinBufferPx: "nzVirtualMinBufferPx", nzLoadingDelay: "nzLoadingDelay", nzPageIndex: "nzPageIndex", nzPageSize: "nzPageSize", nzTotal: "nzTotal", nzWidthConfig: "nzWidthConfig", nzData: "nzData", nzPaginationPosition: "nzPaginationPosition", scrollX: "scrollX", scrollY: "scrollY", nzxFit: "nzxFit", nzPaginationType: "nzPaginationType", nzFrontPagination: "nzFrontPagination", nzTemplateMode: "nzTemplateMode", nzShowPagination: "nzShowPagination", nzLoading: "nzLoading", nzxAutoLoading: "nzxAutoLoading", nzOuterBordered: "nzOuterBordered", nzLoadingIndicator: "nzLoadingIndicator", nzBordered: "nzBordered", nzSize: "nzSize", nzShowSizeChanger: "nzShowSizeChanger", nzHideOnSinglePage: "nzHideOnSinglePage", nzShowQuickJumper: "nzShowQuickJumper", nzSimple: "nzSimple", actionVisible: "actionVisible", toolbarVisible: "toolbarVisible", nzxClickSelectedRow: "nzxClickSelectedRow", defaultText: "defaultText", tplMap: "tplMap", nzVirtualForTrackBy: "nzVirtualForTrackBy", nzxSpanFunc: "nzxSpanFunc", nzxTr: "nzxTr", nzIndentSize: "nzIndentSize", nzCheckStrictly: "nzCheckStrictly" }, outputs: { nzPageSizeChange: "nzPageSizeChange", nzPageIndexChange: "nzPageIndexChange", nzQueryParams: "nzQueryParams", nzCurrentPageDataChange: "nzCurrentPageDataChange", rowClick: "rowClick", rowDblclick: "rowDblclick", rowContextmenu: "rowContextmenu", cellClick: "cellClick", cellDblclick: "cellDblclick", cellContextmenu: "cellContextmenu", headerClick: "headerClick", headerDblclick: "headerDblclick", headerContextmenu: "headerContextmenu", refreshClick: "refreshClick", sortedColumn: "sortedColumn" }, host: { listeners: { "window:resize": "onWindowResize($event)" }, properties: { "class.nzx-table": "true", "class.nzx-table-fit": "nzxFit" } }, queries: [{ propertyName: "children", predicate: NamedTemplate }], viewQueries: [{ propertyName: "nzTable", first: true, predicate: ["basicTable"], descendants: true, static: true }, { propertyName: "nzTableElementRef", first: true, predicate: ["basicTable"], descendants: true, read: (ElementRef), static: true }], usesOnChanges: true, ngImport: i0, template: "<nzx-table-header\r\n  *ngIf=\"toolbarVisible !== false\"\r\n  [actionVisible]=\"actionVisible\"\r\n  [tableSize]=\"nzSize\"\r\n  [refreshVisible]=\"nzxRefreshVisible\"\r\n  [resizeVisible]=\"nzxResizeVisible\"\r\n  (tableSizeChange)=\"tableSizeChange($event, basicTable)\"\r\n  (refreshClick)=\"onRefreshClick()\"\r\n>\r\n  <ng-container *nzStringTemplateOutlet=\"title; context: { $implicit: { context: this } }\">\r\n    {{ title }}\r\n  </ng-container>\r\n  <ng-content select=\"[title]\"></ng-content>\r\n\r\n  <ng-container setting-before>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbarBefore; context: { $implicit: { context: this } }\">\r\n      {{ toolbarBefore }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbarBefore]\"></ng-content>\r\n  </ng-container>\r\n\r\n  <nzx-column-setting\r\n    setting\r\n    *ngIf=\"nzxSettingVisible\"\r\n    [nzxColumns]=\"_bodyColumns\"\r\n    (sortedColumn)=\"onSortedColumn($event)\"\r\n    (fixedClick)=\"fixedClick($event)\"\r\n  ></nzx-column-setting>\r\n\r\n  <ng-container toolbar>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbar; context: { $implicit: { context: this } }\">\r\n      {{ toolbar }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbar]\"></ng-content>\r\n  </ng-container>\r\n</nzx-table-header>\r\n\r\n<nz-table\r\n  #basicTable\r\n  class=\"nzx-inner-table\"\r\n  [nzData]=\"nzData\"\r\n  [nzTableLayout]=\"nzTableLayout\"\r\n  [nzFrontPagination]=\"nzFrontPagination\"\r\n  [nzTotal]=\"nzTotal\"\r\n  [(nzPageIndex)]=\"nzPageIndex\"\r\n  [(nzPageSize)]=\"nzPageSize\"\r\n  [nzShowPagination]=\"nzShowPagination\"\r\n  [nzPaginationPosition]=\"nzPaginationPosition\"\r\n  [nzPaginationType]=\"nzPaginationType\"\r\n  [nzBordered]=\"nzBordered\"\r\n  [nzOuterBordered]=\"nzOuterBordered\"\r\n  [nzWidthConfig]=\"nzWidthConfig\"\r\n  [nzSize]=\"$any(nzSize)\"\r\n  [nzLoading]=\"nzLoading\"\r\n  [nzLoadingIndicator]=\"nzLoadingIndicator\"\r\n  [nzLoadingDelay]=\"nzLoadingDelay\"\r\n  [nzScroll]=\"nzScroll\"\r\n  [nzTitle]=\"nzTitle\"\r\n  [nzFooter]=\"nzFooter\"\r\n  [nzNoResult]=\"nzNoResult\"\r\n  [nzPageSizeOptions]=\"nzPageSizeOptions || defaultPageSizeOptions\"\r\n  [nzShowQuickJumper]=\"nzShowQuickJumper\"\r\n  [nzShowSizeChanger]=\"nzShowSizeChanger\"\r\n  [nzShowTotal]=\"nzShowTotal == null ? totalTemplate : nzShowTotal\"\r\n  [nzItemRender]=\"nzItemRender\"\r\n  [nzHideOnSinglePage]=\"nzHideOnSinglePage\"\r\n  [nzSimple]=\"nzSimple\"\r\n  [nzTemplateMode]=\"nzTemplateMode\"\r\n  [nzVirtualItemSize]=\"nzVirtualItemSize\"\r\n  [nzVirtualMaxBufferPx]=\"nzVirtualMaxBufferPx\"\r\n  [nzVirtualMinBufferPx]=\"nzVirtualMinBufferPx\"\r\n  [nzVirtualForTrackBy]=\"nzVirtualForTrackBy\"\r\n  (nzPageIndexChange)=\"nzPageIndexChange.emit($event)\"\r\n  (nzPageSizeChange)=\"nzPageSizeChange.emit($event)\"\r\n  (nzCurrentPageDataChange)=\"onCurrentPageDataChange($event)\"\r\n  (nzQueryParams)=\"nzQueryParams.emit($event)\"\r\n>\r\n  <thead *ngIf=\"nzxShowHeader !== false\">\r\n    <ng-container *ngIf=\"nzxDefaultRenderHeader !== false\">\r\n      <tr *ngFor=\"let row of _headerColumns\">\r\n        <ng-container *ngFor=\"let col of row\">\r\n          <th\r\n            *ngIf=\"(!col.nzShowCheckbox || col.nzShowCheckAll === false) && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowSort]=\"col.nzShowSort\"\r\n            [nzCustomFilter]=\"col.nzCustomFilter\"\r\n            [nzSortFn]=\"col.nzSortFn == null ? true : col.nzSortFn\"\r\n            [nzSortDirections]=\"col.nzSortDirections\"\r\n            [(nzSortOrder)]=\"col.nzSortOrder\"\r\n            (nzSortOrderChange)=\"sortOrderChange($event, col)\"\r\n            [nzColumnKey]=\"col.nzColumnKey || col.name\"\r\n            [nzShowFilter]=\"col.nzShowFilter\"\r\n            [nzSortPriority]=\"col.nzSortPriority === true\"\r\n            [nzFilterFn]=\"col.nzShowFilter && col.nzFilterFn == null ? true : col.nzFilterFn\"\r\n            (nzFilterChange)=\"col.nzFilterChange?.($event, nzData)\"\r\n            [nzFilters]=\"col.nzFilters\"\r\n            [nzFilterMultiple]=\"col.nzFilterMultiple !== false\"\r\n            [nzWidth]=\"col.nzWidth == null && col.isIndex ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n\r\n          <th\r\n            *ngIf=\"col.nzShowCheckbox && col.nzShowCheckAll !== false && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox\"\r\n            [nzIndeterminate]=\"col.nzIndeterminate\"\r\n            [(nzChecked)]=\"col.checked\"\r\n            (nzCheckedChange)=\"thCheckedChange($event, col)\"\r\n            [nzShowRowSelection]=\"col.nzShowRowSelection\"\r\n            [nzSelections]=\"col.nzSelections\"\r\n            [nzWidth]=\"col.nzWidth == null && col.nzShowCheckbox ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n  </thead>\r\n\r\n  <tbody *ngIf=\"nzVirtualForTrackBy || nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-template nz-virtual-scroll let-row let-index=\"index\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: index === 0,\r\n            last: nzData.length === index + 1,\r\n            even: index % 2 === 0,\r\n            odd: index % 2 !== 0,\r\n            level: 0,\r\n            parent: null\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-template>\r\n  </tbody>\r\n\r\n  <tbody *ngIf=\"!nzVirtualForTrackBy && !nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-container\r\n      *ngFor=\"let row of basicTable.data; index as index; first as first; last as last; even as even; odd as odd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: first,\r\n            last: last,\r\n            even: even,\r\n            odd: odd,\r\n            level: 0,\r\n            parent: null,\r\n            pathTrace: []\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </tbody>\r\n\r\n  <ng-template\r\n    #trTemplate\r\n    let-row\r\n    let-index=\"index\"\r\n    let-first=\"first\"\r\n    let-last=\"last\"\r\n    let-even=\"even\"\r\n    let-odd=\"odd\"\r\n    let-level=\"level\"\r\n    let-parent=\"parent\"\r\n    let-pathTrace=\"pathTrace\"\r\n  >\r\n    <tr\r\n      *ngIf=\"!parent || parent.expand\"\r\n      (click)=\"\r\n        onRowClick({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (dblclick)=\"\r\n        rowDblclick.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (contextmenu)=\"\r\n        rowContextmenu.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      [ngClass]=\"row.className\"\r\n      [ngStyle]=\"row.style\"\r\n      [class.ant-table-row-selected]=\"row.checked || _selectRow === row\"\r\n    >\r\n      <ng-container\r\n        *ngFor=\"let col of _bodyColumns; index as _index; first as _first; last as _last; even as _even; odd as _odd\"\r\n      >\r\n        <ng-container\r\n          *let=\"\r\n            row\r\n              | colSpan\r\n                : nzxSpanFunc\r\n                : nzData\r\n                : basicTable.data\r\n                : col\r\n                : { index: index, first: first, last: last, even: even, odd: odd }\r\n                : {\r\n                    index: _index,\r\n                    first: _first,\r\n                    last: _last,\r\n                    even: _even,\r\n                    odd: _odd\r\n                  } as span\r\n          \"\r\n        >\r\n          <td\r\n            *ngIf=\"col.visible !== false && span.rowspan && span.colspan\"\r\n            (click)=\"\r\n              cellClick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (dblclick)=\"\r\n              cellDblclick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (contextmenu)=\"\r\n              cellContextmenu.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox || row.showCheckbox\"\r\n            [nzDisabled]=\"row.disabled\"\r\n            [nzIndeterminate]=\"row.nzIndeterminate\"\r\n            [(nzChecked)]=\"row.checked\"\r\n            (nzCheckedChange)=\"tdCheckedChange($event, col, row, pathTrace, { index, first, last, even, odd })\"\r\n            [nzShowExpand]=\"col.showExpand && row.children && row.children.length > 0\"\r\n            [(nzExpand)]=\"row.expand\"\r\n            (nzExpandChange)=\"\r\n              defaultCollapse(row, $event);\r\n              col.nzExpandChange && col.nzExpandChange($event, col, row, { index, first, last, even, odd })\r\n            \"\r\n            [nzIndentSize]=\"col.showExpand ? level * nzIndentSize : null\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.tdAlign || col.nzAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [attr.colspan]=\"span.colspan\"\r\n            [attr.rowspan]=\"span.rowspan\"\r\n            [ngClass]=\"col.tdNgClass\"\r\n            [ngStyle]=\"col.tdNgStyle\"\r\n          >\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                tdDataRender;\r\n                context: {\r\n                  $implicit: {\r\n                    col: col,\r\n                    column: col,\r\n                    row: row,\r\n                    context: this,\r\n                    nzData: nzData,\r\n                    nzPageData: basicTable.data,\r\n                    indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                    colIndex: { index: _index, first: _first, last: _last, even: _even, odd: _odd },\r\n                    parent: parent\r\n                  },\r\n                  row: row\r\n                }\r\n              \"\r\n            ></ng-container>\r\n          </td>\r\n        </ng-container>\r\n      </ng-container>\r\n    </tr>\r\n\r\n    <ng-container\r\n      *ngFor=\"let child of row.children; index as cIndex; first as cFirst; last as cLast; even as cEven; odd as cOdd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: child,\r\n            level: level + 1,\r\n            parentIndex: index,\r\n            row: child,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: cIndex,\r\n            first: cFirst,\r\n            last: cLast,\r\n            even: cEven,\r\n            odd: cOdd,\r\n            parent: row,\r\n            pathTrace: [pathTrace, row]\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</nz-table>\r\n\r\n<ng-template #thRenderTemplate let-data>\r\n  <ng-container *ngIf=\"data.col._thTemplate; else textThTemplate\">\r\n    <ng-container\r\n      *ngTemplateOutlet=\"data.col._thTemplate; context: { $implicit: data, data: data, col: data.col }\"\r\n    ></ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #textThTemplate>\r\n    {{ data.col.thText == null && data.col.isIndex ? '\u5E8F\u53F7' : data.col.thText }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #tdDataRender let-data let-row=\"row\">\r\n  <ng-container *ngIf=\"!data.col.isIndex; else tdTemplateTemplate\">\r\n    <ng-container *ngIf=\"data.col._tdTemplate; else buttonControlTemplate\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          data.col._tdTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            data: data,\r\n            col: data.col,\r\n            indexAttr: data.indexAttr,\r\n            parent: data.parent\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #tdTemplateTemplate>\r\n    {{ nzPageSize * (nzPageIndex - 1) + data.indexAttr.index + 1 }}\r\n  </ng-template>\r\n\r\n  <!-- \u6309\u94AE\u5217-->\r\n  <ng-template #buttonControlTemplate>\r\n    <ng-container *ngIf=\"data.col.buttons; else widgetControlTemplate\">\r\n      <ng-container\r\n        *ngFor=\"\r\n          let btn of data.col.buttons | colButtons: row : data : data.parent | async;\r\n          index as index;\r\n          count as count;\r\n          last as last\r\n        \"\r\n      >\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <nzx-table-button\r\n            *ngIf=\"btn.link === false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-button>\r\n          <nzx-table-link\r\n            *ngIf=\"btn.link !== false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-link>\r\n          <nz-divider *ngIf=\"btn.showDivider !== false && count > 1 && !last\" nzType=\"vertical\"></nz-divider>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <!--\u81EA\u5B9A\u4E49\u90E8\u4EF6-->\r\n  <ng-template #widgetControlTemplate>\r\n    <ng-container *ngIf=\"data.col.widgets; else textValueTemplate\">\r\n      <ng-container *ngFor=\"let btn of data.col.widgets | colButtons: row : data : data.parent | async\">\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <ng-template\r\n            table-widget\r\n            [widget]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></ng-template>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #textValueTemplate>\r\n    {{\r\n      row\r\n        | colFormat: data.col : data\r\n        | async\r\n        | defaultify: (data.col.nzShowCheckbox ? '' : data.col.defaultify || defaultText)\r\n    }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #totalTemplate let-range=\"range\" let-total>\r\n  \u7B2C {{ range[0] / nzPageSize | math: 'ceil' }}/{{ total / nzPageSize | math: 'ceil' }} \u9875 \u5171 {{ total }} \u6761\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i4$3.NzTableComponent, selector: "nz-table", inputs: ["nzTableLayout", "nzShowTotal", "nzItemRender", "nzTitle", "nzFooter", "nzNoResult", "nzPageSizeOptions", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualForTrackBy", "nzLoadingDelay", "nzPageIndex", "nzPageSize", "nzTotal", "nzWidthConfig", "nzData", "nzCustomColumn", "nzPaginationPosition", "nzScroll", "nzPaginationType", "nzFrontPagination", "nzTemplateMode", "nzShowPagination", "nzLoading", "nzOuterBordered", "nzLoadingIndicator", "nzBordered", "nzSize", "nzShowSizeChanger", "nzHideOnSinglePage", "nzShowQuickJumper", "nzSimple"], outputs: ["nzPageSizeChange", "nzPageIndexChange", "nzQueryParams", "nzCurrentPageDataChange", "nzCustomColumnChange"], exportAs: ["nzTable"] }, { kind: "component", type: i4$3.NzThAddOnComponent, selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", inputs: ["nzColumnKey", "nzFilterMultiple", "nzSortOrder", "nzSortPriority", "nzSortDirections", "nzFilters", "nzSortFn", "nzFilterFn", "nzShowSort", "nzShowFilter", "nzCustomFilter"], outputs: ["nzCheckedChange", "nzSortOrderChange", "nzFilterChange"] }, { kind: "directive", type: i4$3.NzTableCellDirective, selector: "th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])" }, { kind: "directive", type: i4$3.NzThMeasureDirective, selector: "th", inputs: ["nzWidth", "colspan", "colSpan", "rowspan", "rowSpan"] }, { kind: "component", type: i4$3.NzTdAddOnComponent, selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]", inputs: ["nzChecked", "nzDisabled", "nzIndeterminate", "nzIndentSize", "nzShowExpand", "nzShowCheckbox", "nzExpand"], outputs: ["nzCheckedChange", "nzExpandChange"] }, { kind: "component", type: i4$3.NzTheadComponent, selector: "thead:not(.ant-table-thead)", outputs: ["nzSortOrderChange"] }, { kind: "component", type: i4$3.NzTbodyComponent, selector: "tbody" }, { kind: "directive", type: i4$3.NzTrDirective, selector: "tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])" }, { kind: "directive", type: i4$3.NzTableVirtualScrollDirective, selector: "[nz-virtual-scroll]", exportAs: ["nzVirtualScroll"] }, { kind: "directive", type: i4$3.NzCellFixedDirective, selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]", inputs: ["nzRight", "nzLeft", "colspan", "colSpan"] }, { kind: "directive", type: i4$3.NzCellBreakWordDirective, selector: "th[nzBreakWord],td[nzBreakWord]", inputs: ["nzBreakWord"] }, { kind: "directive", type: i4$3.NzCellAlignDirective, selector: "th[nzAlign],td[nzAlign]", inputs: ["nzAlign"] }, { kind: "directive", type: i4$3.NzCellEllipsisDirective, selector: "th[nzEllipsis],td[nzEllipsis]", inputs: ["nzEllipsis"] }, { kind: "component", type: i4$3.NzThSelectionComponent, selector: "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]", inputs: ["nzSelections", "nzChecked", "nzDisabled", "nzIndeterminate", "nzShowCheckbox", "nzShowRowSelection"], outputs: ["nzCheckedChange"] }, { kind: "directive", type: i5$3.NzResizableDirective, selector: "[nz-resizable]", inputs: ["nzBounds", "nzMaxHeight", "nzMaxWidth", "nzMinHeight", "nzMinWidth", "nzGridColumnCount", "nzMaxColumn", "nzMinColumn", "nzLockAspectRatio", "nzPreview", "nzDisabled"], outputs: ["nzResize", "nzResizeEnd", "nzResizeStart"], exportAs: ["nzResizable"] }, { kind: "component", type: i5$3.NzResizeHandlesComponent, selector: "nz-resize-handles", inputs: ["nzDirections"], exportAs: ["nzResizeHandles"] }, { kind: "component", type: i7.NzDividerComponent, selector: "nz-divider", inputs: ["nzText", "nzType", "nzOrientation", "nzDashed", "nzPlain"], exportAs: ["nzDivider"] }, { kind: "directive", type: i7$1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: i8.LetDirective, selector: "[let]", inputs: ["let"] }, { kind: "component", type: TableButtonComponent, selector: "nzx-table-button", inputs: ["props", "row", "indexAttr", "colIndex", "column", "nzData", "nzPageData"] }, { kind: "component", type: TableLinkComponent, selector: "nzx-table-link", inputs: ["props", "nzData", "nzPageData", "row", "indexAttr", "colIndex", "column"] }, { kind: "component", type: NzxTableHeaderComponent, selector: "nzx-table-header", inputs: ["tableSize", "actionVisible", "refreshVisible", "resizeVisible"], outputs: ["tableSizeChange", "refreshClick"] }, { kind: "component", type: NzxColumnSettingComponent, selector: "nzx-column-setting", inputs: ["dragPreviewClass", "columnNameVisible", "nzxColumns"], outputs: ["columnCheckedChange", "sortedColumn", "columnNameCheckedChange", "fixedClick"] }, { kind: "directive", type: TableWidgetDirective, selector: "[table-widget]", inputs: ["row", "indexAttr", "colIndex", "column", "nzData", "nzPageData", "widget"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }, { kind: "pipe", type: i14.MathPipe, name: "math" }, { kind: "pipe", type: i14.DefaultifyPipe, name: "defaultify" }, { kind: "pipe", type: ColFormatPipe, name: "colFormat" }, { kind: "pipe", type: ColSpanPipe, name: "colSpan" }, { kind: "pipe", type: ColButtonVisiblePipe, name: "colButtonVisible" }, { kind: "pipe", type: HasAuthPipe, name: "hasAuth" }, { kind: "pipe", type: ColButtonsPipe, name: "colButtons" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nzx-table', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class.nzx-table]': 'true', '[class.nzx-table-fit]': 'nzxFit' }, template: "<nzx-table-header\r\n  *ngIf=\"toolbarVisible !== false\"\r\n  [actionVisible]=\"actionVisible\"\r\n  [tableSize]=\"nzSize\"\r\n  [refreshVisible]=\"nzxRefreshVisible\"\r\n  [resizeVisible]=\"nzxResizeVisible\"\r\n  (tableSizeChange)=\"tableSizeChange($event, basicTable)\"\r\n  (refreshClick)=\"onRefreshClick()\"\r\n>\r\n  <ng-container *nzStringTemplateOutlet=\"title; context: { $implicit: { context: this } }\">\r\n    {{ title }}\r\n  </ng-container>\r\n  <ng-content select=\"[title]\"></ng-content>\r\n\r\n  <ng-container setting-before>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbarBefore; context: { $implicit: { context: this } }\">\r\n      {{ toolbarBefore }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbarBefore]\"></ng-content>\r\n  </ng-container>\r\n\r\n  <nzx-column-setting\r\n    setting\r\n    *ngIf=\"nzxSettingVisible\"\r\n    [nzxColumns]=\"_bodyColumns\"\r\n    (sortedColumn)=\"onSortedColumn($event)\"\r\n    (fixedClick)=\"fixedClick($event)\"\r\n  ></nzx-column-setting>\r\n\r\n  <ng-container toolbar>\r\n    <ng-container *nzStringTemplateOutlet=\"toolbar; context: { $implicit: { context: this } }\">\r\n      {{ toolbar }}\r\n    </ng-container>\r\n    <ng-content select=\"[toolbar]\"></ng-content>\r\n  </ng-container>\r\n</nzx-table-header>\r\n\r\n<nz-table\r\n  #basicTable\r\n  class=\"nzx-inner-table\"\r\n  [nzData]=\"nzData\"\r\n  [nzTableLayout]=\"nzTableLayout\"\r\n  [nzFrontPagination]=\"nzFrontPagination\"\r\n  [nzTotal]=\"nzTotal\"\r\n  [(nzPageIndex)]=\"nzPageIndex\"\r\n  [(nzPageSize)]=\"nzPageSize\"\r\n  [nzShowPagination]=\"nzShowPagination\"\r\n  [nzPaginationPosition]=\"nzPaginationPosition\"\r\n  [nzPaginationType]=\"nzPaginationType\"\r\n  [nzBordered]=\"nzBordered\"\r\n  [nzOuterBordered]=\"nzOuterBordered\"\r\n  [nzWidthConfig]=\"nzWidthConfig\"\r\n  [nzSize]=\"$any(nzSize)\"\r\n  [nzLoading]=\"nzLoading\"\r\n  [nzLoadingIndicator]=\"nzLoadingIndicator\"\r\n  [nzLoadingDelay]=\"nzLoadingDelay\"\r\n  [nzScroll]=\"nzScroll\"\r\n  [nzTitle]=\"nzTitle\"\r\n  [nzFooter]=\"nzFooter\"\r\n  [nzNoResult]=\"nzNoResult\"\r\n  [nzPageSizeOptions]=\"nzPageSizeOptions || defaultPageSizeOptions\"\r\n  [nzShowQuickJumper]=\"nzShowQuickJumper\"\r\n  [nzShowSizeChanger]=\"nzShowSizeChanger\"\r\n  [nzShowTotal]=\"nzShowTotal == null ? totalTemplate : nzShowTotal\"\r\n  [nzItemRender]=\"nzItemRender\"\r\n  [nzHideOnSinglePage]=\"nzHideOnSinglePage\"\r\n  [nzSimple]=\"nzSimple\"\r\n  [nzTemplateMode]=\"nzTemplateMode\"\r\n  [nzVirtualItemSize]=\"nzVirtualItemSize\"\r\n  [nzVirtualMaxBufferPx]=\"nzVirtualMaxBufferPx\"\r\n  [nzVirtualMinBufferPx]=\"nzVirtualMinBufferPx\"\r\n  [nzVirtualForTrackBy]=\"nzVirtualForTrackBy\"\r\n  (nzPageIndexChange)=\"nzPageIndexChange.emit($event)\"\r\n  (nzPageSizeChange)=\"nzPageSizeChange.emit($event)\"\r\n  (nzCurrentPageDataChange)=\"onCurrentPageDataChange($event)\"\r\n  (nzQueryParams)=\"nzQueryParams.emit($event)\"\r\n>\r\n  <thead *ngIf=\"nzxShowHeader !== false\">\r\n    <ng-container *ngIf=\"nzxDefaultRenderHeader !== false\">\r\n      <tr *ngFor=\"let row of _headerColumns\">\r\n        <ng-container *ngFor=\"let col of row\">\r\n          <th\r\n            *ngIf=\"(!col.nzShowCheckbox || col.nzShowCheckAll === false) && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowSort]=\"col.nzShowSort\"\r\n            [nzCustomFilter]=\"col.nzCustomFilter\"\r\n            [nzSortFn]=\"col.nzSortFn == null ? true : col.nzSortFn\"\r\n            [nzSortDirections]=\"col.nzSortDirections\"\r\n            [(nzSortOrder)]=\"col.nzSortOrder\"\r\n            (nzSortOrderChange)=\"sortOrderChange($event, col)\"\r\n            [nzColumnKey]=\"col.nzColumnKey || col.name\"\r\n            [nzShowFilter]=\"col.nzShowFilter\"\r\n            [nzSortPriority]=\"col.nzSortPriority === true\"\r\n            [nzFilterFn]=\"col.nzShowFilter && col.nzFilterFn == null ? true : col.nzFilterFn\"\r\n            (nzFilterChange)=\"col.nzFilterChange?.($event, nzData)\"\r\n            [nzFilters]=\"col.nzFilters\"\r\n            [nzFilterMultiple]=\"col.nzFilterMultiple !== false\"\r\n            [nzWidth]=\"col.nzWidth == null && col.isIndex ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n\r\n          <th\r\n            *ngIf=\"col.nzShowCheckbox && col.nzShowCheckAll !== false && col.visible !== false\"\r\n            nz-resizable\r\n            [nzDisabled]=\"nzxResizable === false\"\r\n            nzBounds=\"window\"\r\n            (nzResize)=\"onResize($event, col)\"\r\n            (click)=\"headerClick.emit({ column: col, event: $event })\"\r\n            (dblclick)=\"headerDblclick.emit({ column: col, event: $event })\"\r\n            (contextmenu)=\"headerContextmenu.emit({ column: col, event: $event })\"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox\"\r\n            [nzIndeterminate]=\"col.nzIndeterminate\"\r\n            [(nzChecked)]=\"col.checked\"\r\n            (nzCheckedChange)=\"thCheckedChange($event, col)\"\r\n            [nzShowRowSelection]=\"col.nzShowRowSelection\"\r\n            [nzSelections]=\"col.nzSelections\"\r\n            [nzWidth]=\"col.nzWidth == null && col.nzShowCheckbox ? '60px' : col.nzWidth\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.thAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [colspan]=\"col.colspan\"\r\n            [rowspan]=\"col.rowspan\"\r\n            [ngClass]=\"col.thNgClass\"\r\n            [ngStyle]=\"col.thNgStyle\"\r\n          >\r\n            <nz-resize-handles [nzDirections]=\"['right']\"></nz-resize-handles>\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                thRenderTemplate;\r\n                context: { $implicit: { col: col, row: row, context: this }, row: row }\r\n              \"\r\n            ></ng-container>\r\n          </th>\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n  </thead>\r\n\r\n  <tbody *ngIf=\"nzVirtualForTrackBy || nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-template nz-virtual-scroll let-row let-index=\"index\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: index === 0,\r\n            last: nzData.length === index + 1,\r\n            even: index % 2 === 0,\r\n            odd: index % 2 !== 0,\r\n            level: 0,\r\n            parent: null\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-template>\r\n  </tbody>\r\n\r\n  <tbody *ngIf=\"!nzVirtualForTrackBy && !nzVirtualItemSize\" [class.nzx-table-striped-tbody]=\"nzxStripe\">\r\n    <ng-container\r\n      *ngFor=\"let row of basicTable.data; index as index; first as first; last as last; even as even; odd as odd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: index,\r\n            first: first,\r\n            last: last,\r\n            even: even,\r\n            odd: odd,\r\n            level: 0,\r\n            parent: null,\r\n            pathTrace: []\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </tbody>\r\n\r\n  <ng-template\r\n    #trTemplate\r\n    let-row\r\n    let-index=\"index\"\r\n    let-first=\"first\"\r\n    let-last=\"last\"\r\n    let-even=\"even\"\r\n    let-odd=\"odd\"\r\n    let-level=\"level\"\r\n    let-parent=\"parent\"\r\n    let-pathTrace=\"pathTrace\"\r\n  >\r\n    <tr\r\n      *ngIf=\"!parent || parent.expand\"\r\n      (click)=\"\r\n        onRowClick({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (dblclick)=\"\r\n        rowDblclick.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      (contextmenu)=\"\r\n        rowContextmenu.emit({\r\n          row: row,\r\n          indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n          event: $event\r\n        })\r\n      \"\r\n      [ngClass]=\"row.className\"\r\n      [ngStyle]=\"row.style\"\r\n      [class.ant-table-row-selected]=\"row.checked || _selectRow === row\"\r\n    >\r\n      <ng-container\r\n        *ngFor=\"let col of _bodyColumns; index as _index; first as _first; last as _last; even as _even; odd as _odd\"\r\n      >\r\n        <ng-container\r\n          *let=\"\r\n            row\r\n              | colSpan\r\n                : nzxSpanFunc\r\n                : nzData\r\n                : basicTable.data\r\n                : col\r\n                : { index: index, first: first, last: last, even: even, odd: odd }\r\n                : {\r\n                    index: _index,\r\n                    first: _first,\r\n                    last: _last,\r\n                    even: _even,\r\n                    odd: _odd\r\n                  } as span\r\n          \"\r\n        >\r\n          <td\r\n            *ngIf=\"col.visible !== false && span.rowspan && span.colspan\"\r\n            (click)=\"\r\n              cellClick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (dblclick)=\"\r\n              cellDblclick.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            (contextmenu)=\"\r\n              cellContextmenu.emit({\r\n                row: row,\r\n                column: col,\r\n                indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                colIndex: {\r\n                  index: _index,\r\n                  first: _first,\r\n                  last: _last,\r\n                  even: _even,\r\n                  odd: _odd\r\n                },\r\n                event: $event\r\n              })\r\n            \"\r\n            [nzShowCheckbox]=\"col.nzShowCheckbox || row.showCheckbox\"\r\n            [nzDisabled]=\"row.disabled\"\r\n            [nzIndeterminate]=\"row.nzIndeterminate\"\r\n            [(nzChecked)]=\"row.checked\"\r\n            (nzCheckedChange)=\"tdCheckedChange($event, col, row, pathTrace, { index, first, last, even, odd })\"\r\n            [nzShowExpand]=\"col.showExpand && row.children && row.children.length > 0\"\r\n            [(nzExpand)]=\"row.expand\"\r\n            (nzExpandChange)=\"\r\n              defaultCollapse(row, $event);\r\n              col.nzExpandChange && col.nzExpandChange($event, col, row, { index, first, last, even, odd })\r\n            \"\r\n            [nzIndentSize]=\"col.showExpand ? level * nzIndentSize : null\"\r\n            [nzLeft]=\"col.fixed === 'left'\"\r\n            [nzRight]=\"col.fixed === 'right'\"\r\n            [nzAlign]=\"col.tdAlign || col.nzAlign\"\r\n            [nzBreakWord]=\"col.nzBreakWord\"\r\n            [nzEllipsis]=\"col.nzEllipsis\"\r\n            [attr.colspan]=\"span.colspan\"\r\n            [attr.rowspan]=\"span.rowspan\"\r\n            [ngClass]=\"col.tdNgClass\"\r\n            [ngStyle]=\"col.tdNgStyle\"\r\n          >\r\n            <ng-container\r\n              *ngTemplateOutlet=\"\r\n                tdDataRender;\r\n                context: {\r\n                  $implicit: {\r\n                    col: col,\r\n                    column: col,\r\n                    row: row,\r\n                    context: this,\r\n                    nzData: nzData,\r\n                    nzPageData: basicTable.data,\r\n                    indexAttr: { index: index, first: first, last: last, even: even, odd: odd },\r\n                    colIndex: { index: _index, first: _first, last: _last, even: _even, odd: _odd },\r\n                    parent: parent\r\n                  },\r\n                  row: row\r\n                }\r\n              \"\r\n            ></ng-container>\r\n          </td>\r\n        </ng-container>\r\n      </ng-container>\r\n    </tr>\r\n\r\n    <ng-container\r\n      *ngFor=\"let child of row.children; index as cIndex; first as cFirst; last as cLast; even as cEven; odd as cOdd\"\r\n    >\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          nzxTr || trTemplate;\r\n          context: {\r\n            $implicit: child,\r\n            level: level + 1,\r\n            parentIndex: index,\r\n            row: child,\r\n            nzData: nzData,\r\n            nzPageData: basicTable.data,\r\n            columns: _bodyColumns,\r\n            index: cIndex,\r\n            first: cFirst,\r\n            last: cLast,\r\n            even: cEven,\r\n            odd: cOdd,\r\n            parent: row,\r\n            pathTrace: [pathTrace, row]\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n</nz-table>\r\n\r\n<ng-template #thRenderTemplate let-data>\r\n  <ng-container *ngIf=\"data.col._thTemplate; else textThTemplate\">\r\n    <ng-container\r\n      *ngTemplateOutlet=\"data.col._thTemplate; context: { $implicit: data, data: data, col: data.col }\"\r\n    ></ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #textThTemplate>\r\n    {{ data.col.thText == null && data.col.isIndex ? '\u5E8F\u53F7' : data.col.thText }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #tdDataRender let-data let-row=\"row\">\r\n  <ng-container *ngIf=\"!data.col.isIndex; else tdTemplateTemplate\">\r\n    <ng-container *ngIf=\"data.col._tdTemplate; else buttonControlTemplate\">\r\n      <ng-container\r\n        *ngTemplateOutlet=\"\r\n          data.col._tdTemplate;\r\n          context: {\r\n            $implicit: row,\r\n            row: row,\r\n            data: data,\r\n            col: data.col,\r\n            indexAttr: data.indexAttr,\r\n            parent: data.parent\r\n          }\r\n        \"\r\n      ></ng-container>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #tdTemplateTemplate>\r\n    {{ nzPageSize * (nzPageIndex - 1) + data.indexAttr.index + 1 }}\r\n  </ng-template>\r\n\r\n  <!-- \u6309\u94AE\u5217-->\r\n  <ng-template #buttonControlTemplate>\r\n    <ng-container *ngIf=\"data.col.buttons; else widgetControlTemplate\">\r\n      <ng-container\r\n        *ngFor=\"\r\n          let btn of data.col.buttons | colButtons: row : data : data.parent | async;\r\n          index as index;\r\n          count as count;\r\n          last as last\r\n        \"\r\n      >\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <nzx-table-button\r\n            *ngIf=\"btn.link === false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-button>\r\n          <nzx-table-link\r\n            *ngIf=\"btn.link !== false\"\r\n            [props]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></nzx-table-link>\r\n          <nz-divider *ngIf=\"btn.showDivider !== false && count > 1 && !last\" nzType=\"vertical\"></nz-divider>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <!--\u81EA\u5B9A\u4E49\u90E8\u4EF6-->\r\n  <ng-template #widgetControlTemplate>\r\n    <ng-container *ngIf=\"data.col.widgets; else textValueTemplate\">\r\n      <ng-container *ngFor=\"let btn of data.col.widgets | colButtons: row : data : data.parent | async\">\r\n        <ng-container\r\n          *ngIf=\"btn && (btn.visible | colButtonVisible)(row, data) !== false && (btn.permission | hasAuth | async)\"\r\n        >\r\n          <ng-template\r\n            table-widget\r\n            [widget]=\"btn\"\r\n            [row]=\"row\"\r\n            [indexAttr]=\"data.indexAttr\"\r\n            [colIndex]=\"data.colIndex\"\r\n            [nzData]=\"data.nzData\"\r\n            [nzPageData]=\"data.nzPageData\"\r\n            [column]=\"data.col\"\r\n          ></ng-template>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-template>\r\n\r\n  <ng-template #textValueTemplate>\r\n    {{\r\n      row\r\n        | colFormat: data.col : data\r\n        | async\r\n        | defaultify: (data.col.nzShowCheckbox ? '' : data.col.defaultify || defaultText)\r\n    }}\r\n  </ng-template>\r\n</ng-template>\r\n\r\n<ng-template #totalTemplate let-range=\"range\" let-total>\r\n  \u7B2C {{ range[0] / nzPageSize | math: 'ceil' }}/{{ total / nzPageSize | math: 'ceil' }} \u9875 \u5171 {{ total }} \u6761\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1$2.HttpClient }, { type: i0.ElementRef }, { type: i1$1.NzxAntdService }]; }, propDecorators: { api: [{
                type: Input
            }], params: [{
                type: Input
            }], nzxRefreshVisible: [{
                type: Input
            }], nzxResizeVisible: [{
                type: Input
            }], nzxSettingVisible: [{
                type: Input
            }], nzxStripe: [{
                type: Input
            }], beforeFetch: [{
                type: Input
            }], afterFetch: [{
                type: Input
            }], fetchSetting: [{
                type: Input
            }], sortFn: [{
                type: Input
            }], nzxColumns: [{
                type: Input
            }], nzxDefaultRenderHeader: [{
                type: Input
            }], title: [{
                type: Input
            }], nzxShowHeader: [{
                type: Input
            }], toolbarBefore: [{
                type: Input
            }], toolbar: [{
                type: Input
            }], nzxResizable: [{
                type: Input
            }], nzTableLayout: [{
                type: Input
            }], nzShowTotal: [{
                type: Input
            }], nzItemRender: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzNoResult: [{
                type: Input
            }], nzPageSizeOptions: [{
                type: Input
            }], nzVirtualItemSize: [{
                type: Input
            }], nzVirtualMaxBufferPx: [{
                type: Input
            }], nzVirtualMinBufferPx: [{
                type: Input
            }], nzLoadingDelay: [{
                type: Input
            }], nzPageIndex: [{
                type: Input
            }], nzPageSize: [{
                type: Input
            }], nzTotal: [{
                type: Input
            }], nzWidthConfig: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzPaginationPosition: [{
                type: Input
            }], scrollX: [{
                type: Input
            }], scrollY: [{
                type: Input
            }], nzxFit: [{
                type: Input
            }], nzPaginationType: [{
                type: Input
            }], nzFrontPagination: [{
                type: Input
            }], nzTemplateMode: [{
                type: Input
            }], nzShowPagination: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzxAutoLoading: [{
                type: Input
            }], nzOuterBordered: [{
                type: Input
            }], nzLoadingIndicator: [{
                type: Input
            }], nzBordered: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzShowSizeChanger: [{
                type: Input
            }], nzHideOnSinglePage: [{
                type: Input
            }], nzShowQuickJumper: [{
                type: Input
            }], nzSimple: [{
                type: Input
            }], actionVisible: [{
                type: Input
            }], toolbarVisible: [{
                type: Input
            }], nzxClickSelectedRow: [{
                type: Input
            }], defaultText: [{
                type: Input
            }], tplMap: [{
                type: Input
            }], nzVirtualForTrackBy: [{
                type: Input
            }], nzxSpanFunc: [{
                type: Input
            }], nzxTr: [{
                type: Input
            }], nzIndentSize: [{
                type: Input
            }], nzCheckStrictly: [{
                type: Input
            }], nzPageSizeChange: [{
                type: Output
            }], nzPageIndexChange: [{
                type: Output
            }], nzQueryParams: [{
                type: Output
            }], nzCurrentPageDataChange: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], rowDblclick: [{
                type: Output
            }], rowContextmenu: [{
                type: Output
            }], cellClick: [{
                type: Output
            }], cellDblclick: [{
                type: Output
            }], cellContextmenu: [{
                type: Output
            }], headerClick: [{
                type: Output
            }], headerDblclick: [{
                type: Output
            }], headerContextmenu: [{
                type: Output
            }], refreshClick: [{
                type: Output
            }], sortedColumn: [{
                type: Output
            }], children: [{
                type: ContentChildren,
                args: [NamedTemplate]
            }], nzTable: [{
                type: ViewChild,
                args: ['basicTable', { static: true }]
            }], nzTableElementRef: [{
                type: ViewChild,
                args: ['basicTable', { static: true, read: (ElementRef) }]
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

class TableInputComponent {
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i3$2.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }] });
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

class TableTagComponent {
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
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i2$2.NzTagComponent, selector: "nz-tag", inputs: ["nzMode", "nzColor", "nzChecked"], outputs: ["nzOnClose", "nzCheckedChange"], exportAs: ["nzTag"] }] });
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

function defaultTableWidget() {
    return [
        { name: 'switch', component: NzxSwitchComponent },
        { name: 'input', component: TableInputComponent },
        { name: 'number', component: NzInputNumberComponent },
        { name: 'tag', component: TableTagComponent },
        { name: 'button', component: TableButtonComponent },
        { name: 'link', component: TableLinkComponent }
    ];
}
class TableWidgetModule {
    service;
    constructor(service, widgets = []) {
        this.service = service;
        if (!widgets) {
            return;
        }
        widgets.forEach(c => service.register(c));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, deps: [{ token: TableWidgetService }, { token: TABLE_WIDGET, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, declarations: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent, LinkHrefPipe], imports: [CommonModule,
            FormsModule,
            NzInputModule,
            NzButtonModule,
            NzIconModule,
            NzTagModule,
            NzInputNumberModule,
            NzxSwitchModule], exports: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, providers: [{ provide: TABLE_WIDGET, useFactory: defaultTableWidget, multi: true }], imports: [CommonModule,
            FormsModule,
            NzInputModule,
            NzButtonModule,
            NzIconModule,
            NzTagModule,
            NzInputNumberModule,
            NzxSwitchModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TableWidgetModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent, LinkHrefPipe],
                    imports: [
                        CommonModule,
                        FormsModule,
                        NzInputModule,
                        NzButtonModule,
                        NzIconModule,
                        NzTagModule,
                        NzInputNumberModule,
                        NzxSwitchModule
                    ],
                    providers: [{ provide: TABLE_WIDGET, useFactory: defaultTableWidget, multi: true }],
                    exports: [TableInputComponent, TableButtonComponent, TableLinkComponent, TableTagComponent]
                }]
        }], ctorParameters: function () { return [{ type: TableWidgetService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TABLE_WIDGET]
                }] }]; } });

const COMPONENT = [NzxTableComponent, NzxTableHeaderComponent, NzxColumnSettingComponent];
class NzxTableModule {
    service;
    constructor(service, widgets = []) {
        this.service = service;
        if (!widgets) {
            return;
        }
        widgets.forEach(c => service.register(c));
    }
    static forChild(config = []) {
        return {
            ngModule: NzxTableModule,
            providers: [{ provide: TABLE_WIDGET, useValue: config, multi: true }]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, deps: [{ token: TableWidgetService }, { token: TABLE_WIDGET, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, declarations: [NzxTableComponent, NzxTableHeaderComponent, NzxColumnSettingComponent, ColFormatPipe,
            ColSpanPipe,
            ColButtonVisiblePipe,
            HasAuthPipe,
            TableWidgetDirective,
            ColButtonsPipe], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NzTableModule,
            NzResizableModule,
            NzIconModule,
            NzPopoverModule,
            NzCheckboxModule,
            DragDropModule,
            NzDividerModule,
            NzDropDownModule,
            NzToolTipModule,
            NzxPipeModule,
            NzxServiceModule,
            NzOutletModule,
            NzButtonModule,
            NzxDirectiveModule,
            TableWidgetModule], exports: [NzxTableComponent, NzxTableHeaderComponent, NzxColumnSettingComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NzTableModule,
            NzResizableModule,
            NzIconModule,
            NzPopoverModule,
            NzCheckboxModule,
            DragDropModule,
            NzDividerModule,
            NzDropDownModule,
            NzToolTipModule,
            NzxPipeModule,
            NzxServiceModule,
            NzOutletModule,
            NzButtonModule,
            NzxDirectiveModule,
            TableWidgetModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        COMPONENT,
                        ColFormatPipe,
                        ColSpanPipe,
                        ColButtonVisiblePipe,
                        HasAuthPipe,
                        TableWidgetDirective,
                        ColButtonsPipe
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NzTableModule,
                        NzResizableModule,
                        NzIconModule,
                        NzPopoverModule,
                        NzCheckboxModule,
                        DragDropModule,
                        NzDividerModule,
                        NzDropDownModule,
                        NzToolTipModule,
                        NzxPipeModule,
                        NzxServiceModule,
                        NzOutletModule,
                        NzButtonModule,
                        NzxDirectiveModule,
                        TableWidgetModule
                    ],
                    exports: [COMPONENT]
                }]
        }], ctorParameters: function () { return [{ type: TableWidgetService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TABLE_WIDGET]
                }] }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { NzxColumnSettingComponent, NzxTableComponent, NzxTableHeaderComponent, NzxTableModule, TABLE_WIDGET, TableWidgetService };
//# sourceMappingURL=freezesoul-nzx-antd-table.mjs.map
