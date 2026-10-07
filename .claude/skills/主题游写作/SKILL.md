---
name: 主题游写作
description: 在 MYVIPSERVICE 网站新建或修改主题游页面（journeys content collection，如"波尔多勃艮第葡萄酒之旅""阿尔卑斯滑雪疗养"这类围绕一个主题打包的多日行程）时使用的写作与开发规范——与 experiences/destinations/journal 的引用关系、素材来源、页面结构、写作风格、三语同步、验收流程。当用户要写新的主题游页面、修改现有 journeys 页面、或提到"主题游""XX之旅页面""打包行程""themed journey"时触发。
---

# 主题游写作规范

MYVIPSERVICE 的主题游页面是 `src/content/journeys/{zh,en,fr}/<slug>.md`，渲染模板固定为
`src/pages/[locale]/journeys/[slug]/index.astro`。一个主题一次做完（核实关联内容→内容→三语→验证部署），不要多个主题同时铺开。

主题游是"围绕一个主题打包的多日行程"（如波尔多勃艮第品酒之旅、阿尔卑斯疗养滑雪之旅），不是单次体验（那是 `experiences` 集合的职责），也不是单一住宿或目的地页面——它是把已有的 destinations/experiences/journal 内容串成一条有叙事的路线。

**总原则（站内所有文章的第一要求，不限于主题游）：图文必须穿插，不能是一堆文字后面单独挂一条纯文字列表。** `itinerary` 每天的行程、`highlights` 里能配图的条目，只要能找到匹配的真实图片就要配（`itinerary` 的 `{day,title,body,image?}` 和 `highlights` 的 `{text,image?}` 都支持逐条配图，分别由 `DayItinerary.astro`/`MediaHighlightList.astro` 渲染，不是只在开头放一条 `Gallery` 图片带过）。不是每天/每条都必须有图——找不到合适照片、或那天是纯转场（如跨产区的长途转车）时留空即可，但只要有素材就应该配，不能因为"顶部已经有 Gallery 了"就把 `itinerary`/`highlights` 整体当成纯文字区块来写。

## 一、与其他内容集合的引用关系（写之前必须先核实）

- **`includedExperienceKeys` 绝不能编造**：schema 注释明确写着"a journey never invents its own activities"——这个字段的每个值都必须是 `src/content/experiences/<locale>/*.md` 里真实存在、已发布（`status: 'published'`）的 `translationKey`。写新主题游前先 `ls src/content/experiences/en/` 看有没有匹配的体验；没有的话，要么先去补一个 experience 条目，要么这个字段留空数组，不要硬编一个不存在的 key（页面上会静默不显示，但内容文件本身就是错的）。
- `destinationKeys` 同理，必须对应 `src/content/destinations/<locale>/*.md` 里真实存在的 `translationKey`。
- `relatedJournalKeys` 指向 `src/content/journal/`——如果这个主题已经有对应的 Journal 深度文章（比如"波尔多勃艮第之旅"对应 `bordeaux-burgundy-private-wine-journey.md`），一定要关联上，且**素材和文风要参考该 Journal 文章**，不要另起炉灶重新编一套事实——Journal 文章通常信息量更大（具体酒庄产区、具体菜品、具体流程），主题游页面是从中提炼出的行程框架，两者事实必须一致。
- 写完后自查：`includedExperienceKeys`/`destinationKeys`/`relatedJournalKeys` 里的每个 key，都要能在对应集合的对应语言目录里找到同名 `translationKey` 的文件。
- **`relatedJournalKeys`/`includedExperienceKeys` 关联的卡片，如果和这个主题游自己的 `coverImage` 用了同一张图，会被模板静默过滤掉，不显示这张卡片**（`index.astro` 里 `excludeShownImages` 的设计行为，代码注释写的是"supplementary content, a duplicate-image one is dropped rather than shown looking identical"）——这不是 bug，验收时如果发现"关联 Journal 文章"区块整个没渲染，先检查是不是这个原因（关联文章的 `coverImage` 是否和主题游自己的 `coverImage`/`gallery` 重复），不用当成故障去排查。反过来说，如果想让某篇关联 Journal 文章确实显示出来，它的 `coverImage` 就不能和这个主题游自己用的图重复。

## 二、素材收集

- 如果这个主题已有同名/相关的 Journal 文章（三语或至少英文版），**优先从那篇文章提炼事实和写作角度**，不要脱离已有内容凭空写。Journal 文章通常已经包含了具体产区、具体流程、具体机构名称（如"Hospices de Beaune""Côte de Nuits""Saint-Émilion"），直接复用这些具体细节，不要泛化成"著名酒庄""知名产区"这类空话。
- 如果没有现成 Journal 文章打底，按照 [[旅游酒店写作]] skill 同样的原则：去官网/权威资料源核实真实地名、机构名、可行的行程逻辑（比如从 A 城到 B 城的实际车程/交通方式是否合理），不虚构可验证的具体数据。
- 每个主题游至少要覆盖 `destinationKeys` 对应的每个目的地——如果主题横跨两个产区/城市，行程里两边都要有实质内容，不能重一边轻一边。

## 三、页面结构（模板已固定）

`content.config.ts` 里 journeys schema 的字段对应关系，按页面从上到下顺序：

1. **`theme`**——自由文本，不是枚举，但在页面上被反复复用（PageHero 的 eyebrow、highlights 区块的 eyebrow、行程区块的 eyebrow、三个关联内容区块的 eyebrow 全部用这一个字段），**必须短、好记、适合反复出现**（如"波尔多与勃艮第"），不要写成一整句描述。
2. **`coverImage` + `gallery`**——**注意这里和酒店页面规则相反**：酒店页面里 `coverImage` 单独渲染一次，`highlights`/`roomTypes` 不能再重复用同一张图；但主题游页面的 `Gallery` 组件只读 `data.gallery`（`coverImage` 不会被单独渲染，只用于 OG/结构化数据等页面外的元信息），所以**`coverImage` 必须作为 `gallery` 数组的第一项一起放进去**，不放的话这张图在页面正文里根本不会出现。写完先看一眼 `gallery[0]` 是不是等于 `coverImage`。
3. **`description`**——房源概览式的开篇简介，对应"行程概览"标题下的正文。
4. **`itinerary`**（`{day, title, body, image?}[]`）——**逐日行程，是这个内容类型最核心的部分，不要留空**。现状排查发现：`alps-geneva-journey`/`paris-loire-valley-journey`/`cote-dazur-provence-journey` 这三个主题游的中文版都写了完整 itinerary，但对应的英文/法文版**全部缺失这个字段**，导致这三个页面的英法文版本上直接少了"行程安排"整个区块（模板里 `data.itinerary.length > 0` 才渲染，留空数组等于该区块从页面消失）。**新写或翻译任何一个主题游，itinerary 三语必须同时补齐，不能只做中文**；如果发现现有主题游某个语言缺 itinerary，顺手一起补上而不是绕过去。每天可选配一张 `image`（由 `DayItinerary.astro` 渲染在当天文字下方），按上面"总原则"的标准判断该不该配。
5. **`highlights`**——和酒店页面的 `highlights` 同一种结构：数组每项可以是纯字符串，也可以是 `{text, image}` 对象（`highlightItem` 这个 zod union 类型两边共用），由 `MediaHighlightList.astro` 统一渲染，能配图的条目就配图，不必每条都配。
6. **`customisationNotes`**——收尾说明"这是起点不是固定套餐"，具体到"如果只想专注一个产区/只有 5 天怎么调整""带不太参与主线活动的同行者怎么办"这类真实可执行的弹性说明，不是套话。
7. **`duration`**——如"5–7 天"，可选字段但建议都填，页面会展示在 KeyFacts 里。

## 四、写作风格

- 延续 [[旅游酒店写作]] skill 里已经验证过的写作纪律：**YAML 撇号/引号规则完全一样**——正文含英文撇号（如 château 相关的人名地名、"day's visits"这类所有格）用双引号包裹整条字符串，不用 `\'` 转义；中文正文用直引号强调词时改用单引号包裹。**`itinerary` 的 `body` 字段尤其容易踩这个坑**——日程描述里经常出现"the day's visits""estate's director"这类所有格，写完那一天的 `body` 就顺手看一眼有没有用错引号，不要攒到全部写完再统一查（波尔多勃艮第主题游第一次写 EN 版时，highlights 和 itinerary 里各踩了一次这个坑，都是所有格撇号触发的）。写完整个文件后再跑一遍 `grep -n "\\\\'" src/content/journeys/*/*.md` 兜底自查。
- 中文版不是机械翻译，保持自己的语言组织；法文侧重专业度与当地知识（如具体产区分级逻辑），中文侧重实操信息（带小孩/不喝酒的同行者怎么安排、行程天数怎么压缩）。
- 不能出现暴露内部工作状态的话，价格话术统一"价格需咨询"。
- `itinerary` 每天的 `body` 要有具体动作和地点，不是"探索这座城市"这种空泛描述——参考波尔多勃艮第主题游中文版的写法："转往左岸梅多克产区继续探访，感受与右岸不同的风格；如有收藏需求，可同步协调心仪酒款的寻找与采购"，具体到产区名+具体安排。

## 五、三语同步

- 三语的 `itinerary` 天数和内容顺序要一致（不能中文 7 天、英文只写 5 天），细节措辞可以有各自侧重，但行程框架必须对齐。
- 参考已有 Journal 文章的三语版本保持事实、地名、机构名一致（如 "Hospices de Beaune" 在三语里都应该是这个专有名词，不要意译）。

## 六、验收

在跑验证命令前自查：

- [ ] `includedExperienceKeys`/`destinationKeys`/`relatedJournalKeys` 里的每个 key 都能在对应集合对应语言目录下找到真实文件。
- [ ] `gallery[0]` 是否等于 `coverImage`（这里和酒店页面规则相反，别混淆）。
- [ ] `itinerary` 三语是否都写了，天数和框架是否一致。
- [ ] 如果有对应 Journal 文章，事实细节（地名、产区、机构名）是否与之一致。
- [ ] `itinerary`/`highlights` 是否图文穿插了，还是写成了一堆纯文字——有素材可配的条目是否都配了图（参考"总原则"）。

自查完再跑：

- `npm run format:check && npm run lint && npm run check && npm run build` 全绿。
- 浏览器里三语言都看一遍，确认"行程安排"区块（itinerary）确实渲染出来了、关联的体验/目的地/Journal 卡片都指向真实存在的内容而不是空白。
- 部署到线上生产环境前跟用户确认一次，除非当前对话已有范围明确的授权。

## 七、自我更新

**每完成一个主题游任务后，如果过程中发现了新的坑、新的模式或者上面的规则有误，主动更新这个 SKILL.md**（不用等用户要求）——比如又踩到一次字段渲染逻辑的误解、又发现一处三语不同步的真实bug、或者摸索出了更好的素材复用方式，都要把"为什么"和"怎么应对"写回对应章节，保持这份skill和实际踩过的坑同步，而不是停留在写skill那一刻的认知。

## 图文穿插硬规则（2026-10-07 客户明确要求，所有内容类型通用，写完必须自查）

- **顶部只保留封面首图**：`gallery` 字段留空，或只放封面这一张；不要把多张图堆在页面顶部的相册里。
- **其余图片必须穿插在正文里**：每个小节/每个季节/每个地区/每个条目的文字后面，紧跟一张和这段文字画面对得上的图（Markdown 正文用 `![alt](/images/xxx.jpg)`；有结构化字段的类型用 `{text, image}` 之类的字段，见本 skill 对应章节）。不要把几张图集中放在一处，也不要放在对应文字之前。
- **同一页面里一张图只出现一次**：封面用过的图，正文不再重复使用。
- 不是每段都必须有图——没有真正对得上的照片，或只是过渡句，就不配图，不要为了凑数放不相关的图；但"能找到对应图片的都要有图"是默认做法。
- alt 文字要写清画面里真实有什么，不夸大；三种语言的版本图片位置保持一致。
- 自查：`grep -c "^!\[" 文件` 看正文图数；打开页面确认顶部只有封面、图都紧跟着各自的文字、没有缺图。
- 起因：红酒文章（`maison-kairui-burgundy-wine-retreat`）第一次改版时，图集中堆在几处、顶部相册有 6 张，被客户退回；见 [[feedback-all-content-image-text-interleave]]。
