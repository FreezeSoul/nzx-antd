/**
 * 全局loading
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NzxLoadingService {
    loadingId = '__MESSAGE_LOADING__';
    /**
     * 显示loading
     * @param type loading类型
     * @param message 消息
     */
    show(type = 'message', message = '加载中...') {
        this.showx(this.loadingId, type, () => {
            if (type === 'spin') {
                return `
        <div class="ant-modal-wrap" style="position: fixed; z-index: 999998; background-color: rgba(255, 255, 255, 0.35)"></div>
        <div
          class="ant-spin ant-spin-spinning ant-spin-show-text"
          style="top: 45%; transform: translate(-50%); z-index: 999999; position: fixed; left: 50%"
        >
          <span class="ant-spin-dot ant-spin-dot-spin">
            <i class="ant-spin-dot-item"></i>
            <i class="ant-spin-dot-item"></i>
            <i class="ant-spin-dot-item"></i>
            <i class="ant-spin-dot-item"></i>
          </span>
          <div class="ant-spin-text">${message}</div>
        </div>`;
            }
            return `
      <div class="ant-modal-wrap" style="z-index: 999998;background-color: rgba(255, 255, 255,.35);"></div>
      <div class="ant-message-notice ant-message" style="top: 45%; z-index: 999999;">
        <div class="ant-message-notice-content" style="min-width: 150px;">
          <div class="ant-message-loading">
            <i class="anticon anticon-loading">
              <svg viewBox="0 0 1024 1024" focusable="false" fill="currentColor" width="1em" height="1em"
                   class="anticon-spin">
                <path
                  d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
              </svg>
            </i>
            <span>${message}</span>
          </div>
        </div>
      </div>`;
        });
    }
    showx(id, type, html) {
        const loading = document.getElementById(id);
        if (loading) {
            if (loading.getAttribute('type') !== type) {
                loading.setAttribute('type', type);
                loading.innerHTML = html();
            }
            loading.style.display = 'block';
            return;
        }
        const div = document.createElement('div');
        div.setAttribute('type', type);
        div.setAttribute('id', id);
        div.innerHTML = html();
        document.body.append(div);
    }
    /**
     * 显示或隐藏loading
     * @param show 是否显示
     */
    loading(show = true) {
        show ? this.show() : this.hide();
    }
    /**
     * 隐藏loading
     */
    hide() {
        const loading = document.getElementById(this.loadingId);
        if (loading) {
            loading.style.display = 'none';
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLoadingService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NzxLoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
export const loadingService = new NzxLoadingService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NlcnZpY2UvbG9hZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixTQUFTLEdBQUcscUJBQXFCLENBQUM7SUFFM0M7Ozs7T0FJRztJQUNILElBQUksQ0FBQyxPQUEyQixTQUFTLEVBQUUsVUFBa0IsUUFBUTtRQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNwQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ25CLE9BQU87Ozs7Ozs7Ozs7Ozt1Q0FZd0IsT0FBTztlQUMvQixDQUFDO2FBQ1Q7WUFFRCxPQUFPOzs7Ozs7Ozs7Ozs7b0JBWU8sT0FBTzs7O2FBR2QsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyxFQUFVLEVBQUUsSUFBd0IsRUFBRSxJQUFrQjtRQUNwRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDekMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUM7YUFDNUI7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDaEMsT0FBTztTQUNSO1FBQ0QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPLENBQUMsT0FBZ0IsSUFBSTtRQUMxQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUNoQztJQUNILENBQUM7d0dBL0VVLGlCQUFpQjs0R0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzRGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7O0FBbUZELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5YWo5bGAbG9hZGluZ1xyXG4gKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTnp4TG9hZGluZ1NlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IGxvYWRpbmdJZCA9ICdfX01FU1NBR0VfTE9BRElOR19fJztcclxuXHJcbiAgLyoqXHJcbiAgICog5pi+56S6bG9hZGluZ1xyXG4gICAqIEBwYXJhbSB0eXBlIGxvYWRpbmfnsbvlnotcclxuICAgKiBAcGFyYW0gbWVzc2FnZSDmtojmga9cclxuICAgKi9cclxuICBzaG93KHR5cGU6ICdtZXNzYWdlJyB8ICdzcGluJyA9ICdtZXNzYWdlJywgbWVzc2FnZTogc3RyaW5nID0gJ+WKoOi9veS4rS4uLicpIHtcclxuICAgIHRoaXMuc2hvd3godGhpcy5sb2FkaW5nSWQsIHR5cGUsICgpID0+IHtcclxuICAgICAgaWYgKHR5cGUgPT09ICdzcGluJykge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC13cmFwXCIgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IHotaW5kZXg6IDk5OTk5ODsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjM1KVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwiYW50LXNwaW4gYW50LXNwaW4tc3Bpbm5pbmcgYW50LXNwaW4tc2hvdy10ZXh0XCJcclxuICAgICAgICAgIHN0eWxlPVwidG9wOiA0NSU7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUpOyB6LWluZGV4OiA5OTk5OTk7IHBvc2l0aW9uOiBmaXhlZDsgbGVmdDogNTAlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1zcGluLWRvdCBhbnQtc3Bpbi1kb3Qtc3BpblwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImFudC1zcGluLWRvdC1pdGVtXCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImFudC1zcGluLWRvdC1pdGVtXCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImFudC1zcGluLWRvdC1pdGVtXCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImFudC1zcGluLWRvdC1pdGVtXCI+PC9pPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1zcGluLXRleHRcIj4ke21lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgPGRpdiBjbGFzcz1cImFudC1tb2RhbC13cmFwXCIgc3R5bGU9XCJ6LWluZGV4OiA5OTk5OTg7YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LC4zNSk7XCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtbWVzc2FnZS1ub3RpY2UgYW50LW1lc3NhZ2VcIiBzdHlsZT1cInRvcDogNDUlOyB6LWluZGV4OiA5OTk5OTk7XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tZXNzYWdlLW5vdGljZS1jb250ZW50XCIgc3R5bGU9XCJtaW4td2lkdGg6IDE1MHB4O1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tZXNzYWdlLWxvYWRpbmdcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJhbnRpY29uIGFudGljb24tbG9hZGluZ1wiPlxyXG4gICAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB3aWR0aD1cIjFlbVwiIGhlaWdodD1cIjFlbVwiXHJcbiAgICAgICAgICAgICAgICAgICBjbGFzcz1cImFudGljb24tc3BpblwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgZD1cIk05ODggNTQ4Yy0xOS45IDAtMzYtMTYuMS0zNi0zNiAwLTU5LjQtMTEuNi0xMTctMzQuNi0xNzEuM2E0NDAuNDUgNDQwLjQ1IDAgMDAtOTQuMy0xMzkuOSA0MzcuNzEgNDM3LjcxIDAgMDAtMTM5LjktOTQuM0M2MjkgODMuNiA1NzEuNCA3MiA1MTIgNzJjLTE5LjkgMC0zNi0xNi4xLTM2LTM2czE2LjEtMzYgMzYtMzZjNjkuMSAwIDEzNi4yIDEzLjUgMTk5LjMgNDAuM0M3NzIuMyA2NiA4MjcgMTAzIDg3NCAxNTBjNDcgNDcgODMuOSAxMDEuOCAxMDkuNyAxNjIuNyAyNi43IDYzLjEgNDAuMiAxMzAuMiA0MC4yIDE5OS4zLjEgMTkuOS0xNiAzNi0zNS45IDM2elwiPjwvcGF0aD5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9pPlxyXG4gICAgICAgICAgICA8c3Bhbj4ke21lc3NhZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd3goaWQ6IHN0cmluZywgdHlwZTogJ21lc3NhZ2UnIHwgJ3NwaW4nLCBodG1sOiAoKSA9PiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBpZiAobG9hZGluZykge1xyXG4gICAgICBpZiAobG9hZGluZy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPT0gdHlwZSkge1xyXG4gICAgICAgIGxvYWRpbmcuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XHJcbiAgICAgICAgbG9hZGluZy5pbm5lckhUTUwgPSBodG1sKCk7XHJcbiAgICAgIH1cclxuICAgICAgbG9hZGluZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XHJcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChkaXYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pi+56S65oiW6ZqQ6JePbG9hZGluZ1xyXG4gICAqIEBwYXJhbSBzaG93IOaYr+WQpuaYvuekulxyXG4gICAqL1xyXG4gIGxvYWRpbmcoc2hvdzogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgIHNob3cgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6ZqQ6JePbG9hZGluZ1xyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICBjb25zdCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5sb2FkaW5nSWQpO1xyXG4gICAgaWYgKGxvYWRpbmcpIHtcclxuICAgICAgbG9hZGluZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRpbmdTZXJ2aWNlID0gbmV3IE56eExvYWRpbmdTZXJ2aWNlKCk7XHJcbiJdfQ==