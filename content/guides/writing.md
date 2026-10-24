---
title: 写作与发布指南
date: 2026-10-24
tags:
  - 使用指南
---

## 新增文章

在 `content/papers/`、`content/topics/` 或 `content/practice/` 创建 Markdown 文件。复制 `content/templates/` 中的模板即可开始。模板目录不会发布。

文章开头保留 YAML 信息：

```yaml
---
title: 文章标题
description: 一句话介绍内容
date: 2026-10-24
updated: 2026-10-24
tags:
  - RAG
draft: false
---
```

## 草稿与图片

未写完的文章设为 `draft: true`，将从公开页面、搜索索引与 RSS 中排除。不要把私密信息写入公开 Git 仓库，即使它是草稿。

图片放入 `content/assets/`，在 Markdown 中使用相对路径引用。公式使用美元符号，独立公式使用双美元符号。

## 本地预览

在项目目录运行 `npm ci`，然后运行 `npm run dev`。按终端显示的网址打开预览。发布前使用 `npm run build` 检查构建。

## 自动发布到 GitHub Pages

项目提供 `.github/workflows/publish-blog.yml`。上传到自己的 GitHub 仓库后，在 Settings → Pages 中选择 GitHub Actions；工作流支持 main 和 v5 分支。

发布前把 `quartz.config.yaml` 的 `baseUrl` 改成实际域名（不带协议）。项目站点需带仓库子路径，以保证 RSS 与站点地图地址正确。

## 长期维护

更新文章时同时修改 `updated`；迁移已有文章时尽量保持文件路径稳定。搜索索引、目录、标签和 RSS 会在构建时自动生成。
