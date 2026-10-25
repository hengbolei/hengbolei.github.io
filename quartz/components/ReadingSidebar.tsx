import type { QuartzComponent, QuartzComponentProps } from "./types"
import { resolveRelative, type FullSlug } from "../util/path"
const sections = [
 { slug: "papers", title: "论文精读", desc: "问题、方法与实验证据" },
 { slug: "topics", title: "知识专题", desc: "概念、推导与理解" },
 { slug: "practice", title: "实践复盘", desc: "实验、排查与心得" },
]
const fmt = (d: Date) => d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })
const ReadingSidebar: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
 const href = (s: string) => resolveRelative(fileData.slug!, s as FullSlug)
 const current = fileData.slug?.split("/")[0]
 const notes = allFiles.filter(f => /^(papers|topics|practice)\//.test(f.slug ?? "") && !f.slug?.endsWith("/index") && !f.frontmatter?.draft).sort((a,b)=>(b.dates?.modified?.getTime()??0)-(a.dates?.modified?.getTime()??0)).slice(0,4)
 return <nav class="reading-sidebar" aria-label="文章与栏目">
 <section><h3>阅读与探索</h3><ul class="sidebar-sections">
 {sections.map((s,i)=><li key={s.slug} class={current===s.slug?"active":undefined}><a class="internal" href={href(`${s.slug}/index`)} aria-current={current===s.slug?"page":undefined}><span class="sidebar-num">{String(i+1).padStart(2,"0")}</span>{s.title}</a><p>{s.desc}</p></li>)}
 </ul></section>
 <section><h3>最近笔记</h3><ul class="sidebar-notes">{notes.map(f=><li key={f.slug} class={f.slug===fileData.slug?"active":undefined}><a class="internal" href={href(f.slug!)}>{f.frontmatter?.title}</a>{f.dates?.modified && <time dateTime={f.dates.modified.toISOString()}>{fmt(f.dates.modified)}</time>}</li>)}</ul>
 <a class="sidebar-more internal" href={href("topics/index")}>浏览全部笔记 →</a></section>
 <div class="sidebar-small-links"><a class="internal" href={href("about")}>关于</a><span>·</span><a class="internal" href={href("guides/writing")}>写作指南</a><span>·</span><a class="internal" href={href("index.xml")}>RSS</a></div>
 </nav>
}
export default ReadingSidebar
