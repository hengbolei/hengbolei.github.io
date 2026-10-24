import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes/dispatcher"
import ReadingSidebar from "./quartz/components/ReadingSidebar"
const config = await loadQuartzConfig()
export const layout = await loadQuartzLayout()
for (const entry of [layout.defaults, ...Object.values(layout.byPageType)]) {
  if (entry.left?.length) entry.left = [...entry.left, ReadingSidebar]
}
config.plugins.emitters = config.plugins.emitters.filter(e => e.name !== "PageTypeDispatcher")
config.plugins.emitters.push(PageTypeDispatcher(layout))
export default config
