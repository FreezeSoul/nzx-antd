import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * 调用数学函数 如{{ 5.1 | math: 'ceil' }} => 6
 */
export class MathPipe {
    transform(value, fnName, fixed) {
        if (value == null) {
            return null;
        }
        const n = typeof value === 'string' ? Number(value) : value;
        // @ts-ignore
        const result = Math[fnName](n);
        return fixed == null ? result : n.toFixed(fixed);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MathPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: MathPipe, name: "math" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MathPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'math',
                    pure: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3BpcGUvbWF0aC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUVwRDs7R0FFRztBQUtILE1BQU0sT0FBTyxRQUFRO0lBQ25CLFNBQVMsQ0FBQyxLQUFzQixFQUFFLE1BQWtCLEVBQUUsS0FBYztRQUNsRSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sQ0FBQyxHQUFXLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDcEUsYUFBYTtRQUNiLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO3dHQVRVLFFBQVE7c0dBQVIsUUFBUTs7NEZBQVIsUUFBUTtrQkFKcEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsSUFBSTtpQkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiDosIPnlKjmlbDlrablh73mlbAg5aaCe3sgNS4xIHwgbWF0aDogJ2NlaWwnIH19ID0+IDZcclxuICovXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbWF0aCcsXHJcbiAgcHVyZTogdHJ1ZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0aFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyB8IG51bWJlciwgZm5OYW1lOiBrZXlvZiBNYXRoLCBmaXhlZD86IG51bWJlcik6IHN0cmluZyB8IG51bGwge1xyXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuOiBudW1iZXIgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gTnVtYmVyKHZhbHVlKSA6IHZhbHVlO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgcmVzdWx0ID0gTWF0aFtmbk5hbWVdKG4pO1xyXG4gICAgcmV0dXJuIGZpeGVkID09IG51bGwgPyByZXN1bHQgOiBuLnRvRml4ZWQoZml4ZWQpO1xyXG4gIH1cclxufVxyXG4iXX0=