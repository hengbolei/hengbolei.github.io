import type { QuartzComponent, QuartzComponentProps } from "./types"
import { resolveRelative, type FullSlug } from "../util/path"
const ReadingSidebar: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
 const href = (s: string) => resolveRelative(fileData.slug!, s as FullSlug)
 const notes = allFiles.filter(f => /^(papers|topics|practice)\//.test(f.slug ?? "") && !f.slug?.endsWith("/index") && !f.frontmatter?.draft).sort((a,b)=>(b.dates?.modified?.getTime()??0)-(a.dates?.modified?.getTime()??0)).slice(0,4)
 return <nav class="reading-sidebar" aria-label="文章与栏目">
 <section><h3>阅读与探索</h3><ul>
 <li><a class="internal" href={href("papers/index")}>论文精读</a><p>问题、方法与实验证据</p></li>
 <li><a class="internal" href={href("topics/index")}>知识专题</a><p>概念、推导与理解</p></li>
 <li><a class="internal" href={href("practice/index")}>实践复盘</a><p>实验、排查与心得</p></li>
 </ul></section>
 <section><h3>最近笔记</h3><ul>{notes.map(f=><li key={f.slug}><a class="internal" href={href(f.slug!)}>{f.frontmatter?.title}</a>{f.dates?.modified && <time dateTime={f.dates.modified.toISOString()}>{f.dates.modified.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}</time>}</li>)}</ul>
 <a class="sidebar-more internal" href={href("topics/index")}>浏览全部笔记 →</a></section>
 <div class="sidebar-small-links"><a class="internal" href={href("about")}>关于</a><span>·</span><a class="internal" href={href("guides/writing")}>写作指南</a></div>
 </nav>
}
export default ReadingSidebar
