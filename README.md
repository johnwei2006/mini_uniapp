# uni-app Starter

基于 **uni-app（Vue3 语法）+ TypeScript** 的跨端小程序起步模板，可编译到 **微信小程序 / H5 / App**。

## 技术栈

| 类别       | 选型                                   |
| ---------- | -------------------------------------- |
| 框架       | uni-app（Vue3 组合式 API）              |
| 语言       | TypeScript 5（严格模式）                |
| 构建       | Vite 5 + @dcloudio/vite-plugin-uni      |
| 状态管理   | Pinia 2                                |
| 网络       | uni.request 封装（见 `src/api/request.ts`）|

## 快速开始

```bash
# 安装依赖
npm install

# 微信小程序：开发（需微信开发者工具导入 dist/dev/mp-weixin）
npm run dev:mp-weixin

# 微信小程序：生产构建
npm run build:mp-weixin

# H5：开发
npm run dev:h5

# 类型检查
npm run type-check
```

> 运行 `dev:mp-weixin` 后，用**微信开发者工具**导入生成的 `dist/dev/mp-weixin` 目录；
> `manifest.json` 中 `mp-weixin.appid` 默认为 `touristappid`（游客模式），正式发布请替换为你自己的小程序 AppID。

## 目录结构

```
src/
├── api/          # 网络请求（uni.request 封装 + 业务接口）
├── components/   # 通用组件（uni-app 内置组件）
├── pages/        # 页面（index / login / mine）
├── store/        # Pinia 状态管理（模块化）
│   ├── index.ts
│   └── modules/user.ts
├── types/        # 全局 TS 类型
├── utils/        # 工具（storage 等）
├── static/       # 静态资源
├── App.vue       # 应用入口（应用生命周期）
├── main.ts       # 入口（createSSRApp + Pinia）
├── pages.json    # 页面路由 / tabBar / 窗口配置（核心）
├── manifest.json # 应用配置（各端 appid 等）
└── uni.scss      # 全局样式变量
```

## 关键约定

- 使用 uni-app **内置组件**（`view` / `text` / `button` / `input` / `image` / `navigator`），**不要**使用 HTML 标签（`div` / `span`）。
- 样式尺寸使用 **rpx**（750rpx = 屏幕宽度），实现多端自适应。
- 路由在 **pages.json** 声明（非 vue-router）；页面跳转用 `uni.navigateTo` / `switchTab` / `reLaunch`。
- 路径别名 `@` 指向 `src`，Vite 与 tsconfig 已同步配置。
- 更多代码模板与最佳实践见本技能 `references/` 目录。

## 版本说明

`@dcloudio/*` 包没有发布稳定的 `3.0.0`，仅以快照号（如 `3.0.0-5020620260917001`）发布，因此 `package.json` 中已**锁定具体快照版本**以保证可安装。
如需升级到最新 uni-app 版本，可运行官方升级命令统一对齐各 `@dcloudio` 子包：

```bash
npx @dcloudio/uvm@latest
```
