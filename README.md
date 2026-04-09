# 睡眠追踪器 PWA

## 🚀 10 分钟部署到 Vercel

### 第一步：上传到 GitHub

1. 打开 [github.com](https://github.com) → 登录 → 右上角 **New repository**
2. 仓库名随意（如 `sleep-tracker`），选 **Public**，点 Create
3. 页面会提示上传文件，把这个文件夹里的所有文件拖进去：
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
4. 点 **Commit changes**

### 第二步：部署到 Vercel

1. 打开 [vercel.com](https://vercel.com) → 用 GitHub 账号登录
2. 点 **Add New Project** → 选刚才的仓库
3. 什么都不用改，直接点 **Deploy**
4. 等 1 分钟 → 得到你的网址，如 `https://sleep-tracker-xxx.vercel.app`

> 以后每次往 GitHub 推代码，Vercel 会自动重新部署

---

## 📱 添加到 iPhone 主屏幕

1. iPhone Safari 打开你的 Vercel 网址
2. 底部分享按钮 → **添加到主屏幕**
3. 完成！从主屏幕打开就是全屏 App 体验

---

## 🔔 开启每日提醒

1. 用 Safari 打开 App（必须从主屏幕打开才支持通知）
2. 右上角 ⚙️ → 开启「每日提醒」→ 设置时间
3. 系统会弹出通知权限请求，点「允许」

> **注意**：iOS 16.4+ 才支持 PWA 推送通知

---

## ⚡ 捷径自动化（每天一键同步数据）

捷径从 Apple Health 读取睡眠数据 + Screen Time 读取屏幕时间，
合并成 JSON 文件，每天早上自动运行，然后你导入 App 即可。

详细步骤见 App 内「⚡ 从 iPhone 捷径导入数据」→「捷径搭建步骤」

---

## 📁 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 完整 App（React + Recharts via CDN） |
| `manifest.json` | PWA 配置（名称、图标、颜色） |
| `sw.js` | Service Worker（离线缓存 + 通知调度） |
| `icon-192.png` | App 图标 192×192 |
| `icon-512.png` | App 图标 512×512 |
