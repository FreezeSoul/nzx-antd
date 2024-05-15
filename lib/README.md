# NzxAntd

注：切换至16.x版本，原版地址：https://m310851010.github.io/nzx-antd


`NzxAntd`是一个`angular`组件库，基于`ng-zorro-antd`进行二次扩展，并加入开发常用功能。全部代码开源并遵循 `MIT` 协议，任何企业、组织及个人均可免费使用。

## ✨ 特性

- 扩展`HttpInterceptor`拦截器，简化通用业务处理
- 封装常用组件 使之支持`FormControl`和`NgModal`
- 封装表格组件, 简单易用, 功能强大
- 常用工具类， 服务， 指令，管道
- 集中化配置，统一配置入口

## 文档和示例

有关文档与示例，请访问 [https://m310851010.github.io/nzx-antd](https://m310851010.github.io/nzx-antd)

## 🖥 使用环境

- [Angular](https://angular.io) >= v16.0.0
- [ng-zorro-antd](https://ng.ant.design) >= v16.0.0

## 📦 安装

```shell
npm i @freezesoul/nzx-antd --save
```

## 🔨 使用

## 🍏 引入样式

> 有两种方式引入样式, 在 `angular.json` 中 或者 `style.less`中, 任选其一

- 在 `angular.json` 中引入

```json
{
  "styles": ["node_modules/@freezesoul/nzx-antd/nzx-antd.less"]
}
```

- 在 `style.less` 中引入 `less` 样式文件

```css
@import 'node_modules/@freezesoul/nzx-antd/nzx-antd.less';
```

## 🍎 引入模块

1. 配置`NzxAntdService`

```ts
// nzx-antd-config.service.ts

import { Injectable } from '@angular/core';
import { NzxAntdService } from '@freezesoul/nzx-antd';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NzxAntdConfigService extends NzxAntdService {
  override basePath = environment.basePath;
  override response = { data: 'data' };
  constructor() {
    super();
  }
}
```

2. 修改`AppModule`

```diff
// app.module.ts

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NzxModalModule } from '@freezesoul/nzx-antd/modal';
import { NzxHttpInterceptorModule } from '@freezesoul/nzx-antd/http-interceptor';
+import { NzxAntdService } from '@freezesoul/nzx-antd';
+import { NzxAntdConfigService } from './nzx-antd-config.service';

@NgModule({
  imports: [
    NzxModalModule,
    NzxHttpInterceptorModule
  ],
  providers: [
+   { provide: NzxAntdService, useExisting: NzxAntdConfigService }
  ],
  bootstrap: [AppComponent]
})
export class AppComponent {}
```

3. 修改`AppComponent`

```ts
//app.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpLoadingService, LogoutService } from '@freezesoul/nzx-antd/http-interceptor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzxModalWrapService } from '@freezesoul/nzx-antd/modal';
import { loadingService } from '@freezesoul/nzx-antd/service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    protected loading: HttpLoadingService,
    protected notifyService: LogoutService,
    protected modalService: NzxModalWrapService,
    protected message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loading.subscribe(status => loadingService.loading(status));

    this.notifyService.onLogout(error => {
      this.modalService.closeAll();
      if (error.timeout) {
        this.message.info(error.message || '登录超时，请重新登录');
      }
      window.top!.location.href = error?.url || '#/login';
    });
  }
}
```

## 🏴 授权协议

[MIT](https://raw.githubusercontent.com/m310851010/nzx-antd/main/LICENSE)

## 👍 支持

为该项目点个免费的星 ⭐
