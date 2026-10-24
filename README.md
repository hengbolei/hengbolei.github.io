# AI 学习手记

AI 知识总结、论文精读与实践复盘。

- 网站：https://hengbolei.github.io
- 仓库：https://github.com/hengbolei/hengbolei.github.io

基于 Quartz 5，采用米黄底、深蓝文字与衬线标题。支持中文全文搜索、LaTeX 公式、代码高亮与复制、文章目录、反向链接和 RSS。

## 写文章

1. 从 content/templates/ 复制模板。
2. 将新文件放入 content/papers/、content/topics/ 或 content/practice/。
3. 修改标题、日期和标签。完成时把 draft 设为 false。
4. 提交并推送到 main，GitHub Actions 会自动构建与发布。

也可以直接在 GitHub 网页中新增或修改 Markdown 文件，提交后等待 Actions 完成。

模板目录不参与发布；draft: true 的文章不会出现在网站中，但公开仓库中的源文件仍然可以被其他人看到。不要把私密内容写入仓库。

## 本地预览

需要 Node.js 22 或更新版本，首次使用运行：

```sh
npm ci
npm run dev
```

按照终端显示的网址预览。构建命令为 npm run build，产物位于 dist/。

## 项目结构

- content/：文章与图片
- content/templates/：论文、知识总结与实验模板
- quartz.config.yaml：站点、字体与配色配置
- quartz/styles/custom.scss：外观样式
- quartz/components/ReadingSidebar.tsx：自动更新的侧栏
- .github/workflows/publish-blog.yml：自动发布到 GitHub Pages

初始内容包含栏目说明和明确标注的功能示例。

## 致谢

基于 [Quartz](https://github.com/jackyzha0/quartz)，遵循项目 MIT 许可证。视觉布局参考 [jzhao.xyz](https://jzhao.xyz/posts/networked-thought)。
