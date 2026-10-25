import type { QuartzComponent, QuartzComponentProps } from "./types"
import { resolveRelative, type FullSlug } from "../util/path"
// 侧栏开放的栏目；每个栏目下的子文件夹（带 index.md）即为一个主题
const sections = [
 { slug: "topics", title: "知识专题" },
 { slug: "papers", title: "论文精读" },
]
const fmt = (d: Date) => d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })
const ReadingSidebar: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
 const slug = fileData.slug ?? ""
 const href = (s: string) => resolveRelative(slug as FullSlug, s as FullSlug)
 const isNote = (s: string) => !s.endsWith("index")
 const published = allFiles.filter(f => !f.frontmatter?.draft)
 const themesOf = (sec: string) => published
  .filter(f => new RegExp(`^${sec}/[^/]+/index$`).test(f.slug ?? ""))
  .map(f => {
   const dir = f.slug!.replace(/index$/, "")
   return { slug: f.slug!, dir, title: f.frontmatter?.title ?? dir, order: Number(f.frontmatter?.order ?? 99), count: published.filter(n => n.slug?.startsWith(dir) && isNote(n.slug)).length }
  })
  .sort((a,b)=>a.order-b.order || a.title.localeCompare(b.title, "zh-CN"))
 const notes = published.filter(f => /^(papers|topics)\//.test(f.slug ?? "") && isNote(f.slug!)).sort((a,b)=>(b.dates?.modified?.getTime()??0)-(a.dates?.modified?.getTime()??0)).slice(0,4)
 return <nav class="reading-sidebar" aria-label="文章与栏目">
 <ul class="sidebar-nav">
 <li class={slug==="index"?"nav-home active":"nav-home"}><a class="internal" href={href("index")} aria-current={slug==="index"?"page":undefined}>主页</a></li>
 {sections.map(s=>{
  const active = slug.startsWith(`${s.slug}/`)
  return <li key={s.slug} class={active?"nav-section active":"nav-section"}>
  <details open={active}>
  <summary><a class="internal" href={href(`${s.slug}/index`)} aria-current={slug===`${s.slug}/index`?"page":undefined}>{s.title}</a><span class="nav-chevron" aria-hidden="true"></span></summary>
  <ul class="nav-themes">{themesOf(s.slug).map(t=><li key={t.slug} class={slug.startsWith(t.dir)?"active":undefined}><a class="internal" href={href(t.slug)}>{t.title}</a><span class="nav-count">{t.count}</span></li>)}</ul>
  </details></li>
 })}
 </ul>
 <section><h3>最近笔记</h3><ul class="sidebar-notes">{notes.map(f=><li key={f.slug} class={f.slug===slug?"active":undefined}><a class="internal" href={href(f.slug!)}>{f.frontmatter?.title}</a>{f.dates?.modified && <time dateTime={f.dates.modified.toISOString()}>{fmt(f.dates.modified)}</time>}</li>)}</ul></section>
 <div class="sidebar-small-links"><a class="internal" href={href("about")}>关于</a><span>·</span><a class="internal" href={href("guides/writing")}>写作指南</a><span>·</span><a class="internal" href={href("index.xml")}>RSS</a></div>
 </nav>
}
export default ReadingSidebar
