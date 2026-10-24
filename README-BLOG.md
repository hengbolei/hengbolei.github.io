# AI 学习手记

基于 Quartz 5 的 AI 学习博客。

- 文章：content/
- 写作模板：content/templates/（不会发布）
- 网站设置：quartz.config.yaml
- 样式：quartz/styles/custom.scss

## 开始写作

需要 Node.js 22 或更高版本。首次运行 npm ci，然后 npm run dev。
复制模板到相应栏目，将 draft 改为 false 后发布。

## 部署

已提供 GitHub Pages 工作流 publish-blog.yml。将项目上传到自己的仓库，在 Settings → Pages 选择 GitHub Actions。修改 baseUrl 为实际部署域名，项目站点需包括仓库子路径。
Cloudflare Pages 同样可用：构建命令 npm run build，输出目录 dist。

初始内容均为栏目说明和明确标注的功能示例。

