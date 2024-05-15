/**
 * http 请求出错后，在中间件中封闭为统一的格式。
 */
export class HttpError {
    httpError;
    code;
    message;
    body;
    /**
     *
     * @param httpError 是否是HTTP原始异常
     * @param code 错误码, 如果是HTTP原始异常,则为status code
     * @param message 错误消息
     * @param body 返回数据
     */
    constructor(httpError, code, message, body) {
        this.httpError = httpError;
        this.code = code;
        this.message = message;
        this.body = body;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9odHRwLWludGVyY2VwdG9yL2h0dHAubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQVFEO0lBQTJCO0lBQXFCO0lBQXdCO0lBUDNGOzs7Ozs7T0FNRztJQUNILFlBQW1CLFNBQWtCLEVBQVMsSUFBWSxFQUFTLE9BQWUsRUFBUyxJQUFPO1FBQS9FLGNBQVMsR0FBVCxTQUFTLENBQVM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQUc7SUFBRyxDQUFDO0NBQ3ZHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJ1xyXG5cclxuLyoqXHJcbiAqIOacjeWKoeerr+WTjeW6lOWunuS9kywg5Y+v5Lul6YCa6L+H6K6+572uIGh0dHDor7fmsYLlj4LmlbBcclxuICoge29ic2VydmU6ICdyZXNwb25zZSd9IOaLv+WIsOWujOaVtOaVsOaNrlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZU1vZGVsPFQgPSBOelNhZmVBbnk+IHtcclxuICAvKipcclxuICAgKiDmnI3liqHnq6/ov5Tlm57nvJbnoIFcclxuICAgKi9cclxuICBjb2RlPzogbnVtYmVyO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgZGF0YT86IFQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBodHRwIOivt+axguWHuumUmeWQju+8jOWcqOS4remXtOS7tuS4reWwgemXreS4uue7n+S4gOeahOagvOW8j+OAglxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEh0dHBFcnJvcjxUID0gTnpTYWZlQW55PiB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaHR0cEVycm9yIOaYr+WQpuaYr0hUVFDljp/lp4vlvILluLhcclxuICAgKiBAcGFyYW0gY29kZSDplJnor6/noIEsIOWmguaenOaYr0hUVFDljp/lp4vlvILluLgs5YiZ5Li6c3RhdHVzIGNvZGVcclxuICAgKiBAcGFyYW0gbWVzc2FnZSDplJnor6/mtojmga9cclxuICAgKiBAcGFyYW0gYm9keSDov5Tlm57mlbDmja5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cEVycm9yOiBib29sZWFuLCBwdWJsaWMgY29kZTogbnVtYmVyLCBwdWJsaWMgbWVzc2FnZTogc3RyaW5nLCBwdWJsaWMgYm9keTogVCkge31cclxufVxyXG4iXX0=