import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * 非安全加载URL,比如加载iframe url
 */
export declare class TrustUrlPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(url: string): SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrustUrlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TrustUrlPipe, "trustUrl", false>;
}
/**
 * 非安全加载HTML
 */
export declare class TrustHtmlPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(html: string, enabled?: boolean): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrustHtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TrustHtmlPipe, "trustHtml", false>;
}
/**
 * 非安全调用Script
 */
export declare class TrustScriptPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(script: string, enabled?: boolean): SafeScript;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrustScriptPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TrustScriptPipe, "trustScript", false>;
}
/**
 * 非安全调用Style
 */
export declare class TrustStylePipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(style: string, enabled?: boolean): SafeStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrustStylePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TrustStylePipe, "trustStyle", false>;
}
