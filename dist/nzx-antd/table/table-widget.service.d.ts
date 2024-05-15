import { InjectionToken, Type } from '@angular/core';
import * as i0 from "@angular/core";
export declare const TABLE_WIDGET: InjectionToken<TableWidget[]>;
export interface TableWidget {
    name: string;
    component: Type<any>;
}
export type TableWidgetMap = Record<string, Type<any>>;
export declare class TableWidgetService {
    private widgetMap;
    get widgets(): TableWidgetMap;
    register(widgets?: TableWidget[]): void;
    has(type: string): boolean;
    get(type: string): Type<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableWidgetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TableWidgetService>;
}
