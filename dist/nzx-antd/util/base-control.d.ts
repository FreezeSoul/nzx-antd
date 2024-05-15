export declare abstract class BaseControl<T> {
    protected nzxDisabled?: boolean;
    onChange: (value: T) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: T) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState?(isDisabled: boolean): void;
}
