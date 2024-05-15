export declare function getStartDate(date: Date): number;
export declare function getEndDate(date: Date): number;
export declare function getStartWeekDate(date: Date): number;
export declare function getEndWeekDate(date: Date): number;
export declare function getStartMonthDate(date: Date): number;
export declare function getEndMonthDate(date: Date): number;
export declare function getStartYearDate(date: Date): number;
export declare function getEndYearDate(date: Date): number;
export declare function getTimeValue(date: Date, value?: Date | null): {
    hour: number;
    minute: number;
    second: number;
} | null;
/**
 * 获取Datetime 真实值
 * @param date,
 * @param disabledDateType
 */
export declare function getRealDateTime(date: Date, disabledDateType?: DisabledDateType): Date | null | undefined;
export type DisabledDateType = Date | null | ((current: Date) => Date | null);
export type DatetimeValueType = Record<string, Date | null>;
