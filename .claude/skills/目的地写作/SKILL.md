---
name: 目的地写作
description: 在 MYVIPSERVICE 网站新建或修改目的地页面（destinations content collection，如"巴黎""摩纳哥""卢瓦河谷"这类城市/地区介绍页）时使用的写作与开发规范——与 accommodations/experiences/journeys/journal 的引用关系、素材核实、页面结构、图文穿插改造、写作风格、三语同步、验收流程。当用户要写新的目的地页面、修改现有 destinations 页面、或提到"目的地""destination 页面""城市指南""XX 旅行指南"时触发。
---

# 目的地写作规范

MYVIPSERVICE 的目的地页面是 `src/content/destinations/{zh,en,fr}/<slug>.md`，渲染模板固定为
`src/pages/[locale]/destinations/[slug]/index.astro`，列表页是 `src/pages/[locale]/destinations/index.astro`。目前已有 15 个目的地（巴黎、日内瓦、伦敦、米兰、摩纳哥、雅典、维也纳、日本、马贝拉、法国里维埃拉、法国阿尔卑斯、普罗旺斯、勃艮第、波尔多、卢瓦河谷），一个目的地一次改完（核实关联内容→正文与 storyFeatures→highlights→跳转区块→三语→验证部署），不要多个目的地同时铺开。

目的地页面的职责是"讲清楚这个地方本身——怎么去、分区怎么选、什么时候去、值得做什么"，然后把已经做好的 accommodations/experiences/journeys/journal 内容当作证据链接过去，不是重新讲一遍那些页面已经讲过的故事。这一点和 [[服务页面写作]] 的"内容优先、链接是证据"原则完全一致。

## 〇、当前技术现状（改版前必读，这是与其他三个已改版集合最大的差异）

目的地页面**目前还停留在改版前的旧模式**，和已经改完的 services/experiences/journeys 不是同一套标准，改版时要把下面几条差距一次性对齐，不是每次挑一条改：

1. **没有 `storyFeatures` 字段，正文完全是纯文字。** `content.config.ts` 里 `destinations` 的 schema（约第 129–177 行）没有 `storyFeatures`，页面正文就是 frontmatter 之后的 markdown body，用 `## H2` 分段（参考 `paris.md`：到达与市内交通 / 城市实际的生活分区 / 实用提醒三段），**中间一张图都没有**——这直接违反站内"所有内容图文穿插"的总原则（见 memory `feedback_all_content_image_text_interleave.md`）。改版要给 `destinations` schema 加 `storyFeatures: z.array(z.object({ title: z.string(), body: z.string(), imageId: z.string() })).default([])`，字段结构和 services 的 `storyFeatures` 完全一样（`content.config.ts` 第 46–55 行 `serviceHighlightItem`/`storyFeatures` 定义可以直接抄字段形状）。挑正文里最有画面感、最值得配图的 2～3 段改写成 `storyFeatures`（比如"从机场进城"配一张机场/专车照片，"某个街区的气质"配一张街景细节），不是每个 H2 段落都要拆，其余次要的实用信息可以留在 markdown body 里当简短过渡。
2. **`highlights` 是纯字符串数组，不支持配图。** 目前 `destinations` schema 里 `highlights: z.array(z.string()).default([])`（约第 165 行）。要仿照 experiences 这次改版的做法（这次会话刚做过，见对应 commit），换成 `highlights: z.array(highlightItem).default([])`，模板同步换成 `<MediaHighlightList items={highlights} locale={locale} />`（不能再用现在这个直接 `<ul><li>{item}</li></ul>` 的写法）。**技术坑：`highlightItem` 这个共享 union 目前定义在 `destinations` collection 之后（约第 182 行，`accommodations` 定义之前）**，要先把这个 `const highlightItem = z.union([...])` 声明挪到 `destinations`（第 129 行）之前，否则 `destinations` schema 里引用会报 TDZ（"used before declaration"）错误——这是改这个 schema 时第一件会踩到的坑，不是等 `npm run check` 报错才发现。
3. **CTA 没有跟标题同一行。** 现在还在用 `<QuickInquiryButton locale={locale} subject={data.title} label={t('common.ctaQuote')} />` 整行单独渲染在 `PageHero` 下面（模板第 112 行），是 services/experiences 改版前的旧写法。要照 [[服务页面写作]] 的"一"直接搬：算出 `ctaHref`（目的地页面统一走 `/${locale}/contact/?about=${encodeURIComponent(data.title)}`，不需要像服务页那样按 slug 分支），传进 `<PageHero>` 的 `cta` 具名插槽，删掉 `QuickInquiryButton` 那一行。`PageHero` 的 flex-wrap 两阶段 CSS 坑已经在共享组件里修好了，不用重新踩，但换了标题内容后还是要过一遍桌面+移动视口确认没有意外换行。
4. **顶部 `Gallery` 目前无条件渲染。** 模板第 121–123 行：只要 `data.gallery.length > 0`（或退回 `coverImage`）就渲染一条 `Gallery`，不管下面还有没有别的图。等 `storyFeatures` 加上之后，要照抄 services 模板的判断逻辑（`services/[slug]/index.astro` 第 150–163 行）：`data.storyFeatures.length === 0 && data.gallery.length > 0 && !highlights.some((item) => item.image)` 才展示顶部 Gallery，避免同一批图片在页面里出现两次。
5. **五个区块的 `eyebrow` 全部复用同一个 `t('destinations.hero.eyebrow')`**（"Destinations"/"目的地"/"Destinations"）——`highlights` 的 `SectionHeading`、"精选住宿"、"精选体验"、"来自 Journal"、"相关目的地"、"为什么通过 MYVIPSERVICE" 六处全部同一个角标，是 services/experiences 改版前踩过的同一种问题（用户当时反馈"看不出这些角标分别在标注什么"）。要按内容类型换成具体的：`highlights` 区块用 `data.title`（这个目的地自己的名字）；"精选住宿"区块用 `t('accommodations.hero.title')`；"精选体验"区块用 `t('experiences.hero.title')`；"来自 Journal"区块用 `t('journal.hero.title')`；"相关目的地"区块保留 `t('destinations.hero.eyebrow')` 是合理的（它链的确实是别的目的地）；"为什么通过 MYVIPSERVICE"这个收尾区块不链任何具体集合，eyebrow 可以直接删掉或留 `data.title`。
6. **`relatedJourneyKeys` 是个死字段，模板从来没读过它。** 15 个目的地文件里有 7 个的 frontmatter 写了 `relatedJourneyKeys: [...]`（如 `paris.md` 的 `relatedJourneyKeys: ['paris-loire-valley-journey']`），但 `content.config.ts` 里 `destinations` 的 schema **根本没有声明这个字段**——zod 的 `z.object()` 默认会静默丢弃 schema 里没声明的 key，不会报错，所以这些内容一直存在但从没生效过。同时 `src/lib/content.ts` 里 `getEntriesByDestination<C extends 'accommodations' | 'experiences'>`（第 99 行）的泛型联合类型也没有包含 `'journeys'`，就算加了字段，模板目前也没有查询/渲染 journeys 的代码。改版时三件事要一起做：① `destinations` schema 加 `relatedJourneyKeys: z.array(z.string()).default([])`；② `getEntriesByDestination` 的泛型联合加上 `'journeys'`（journeys 的 `destinationKeys` 数组字段已经存在，逆向查询逻辑可以复用同一个函数）；③ 模板加一个新的 `RelatedContent` 区块（eyebrow 用 `t('journeys.hero.title')`），链到真实存在的主题游。这是一个此前没人发现的真实功能缺口，不是"锦上添花"，改版时要当作必做项，不是可选项。
7. **列表页（`/destinations/`）已经是对的，不用改。** `src/pages/[locale]/destinations/index.astro` 已经在用 `ContentCard`/`ContentGrid`（整卡可点击）+ 按国家分组（`destinationCountryGroups`），是 services 列表页改版之后才对齐的标准写法，目的地列表页本来就是这么写的，验收时确认一下就行，不需要额外动工。

## 一、内容框架：像一份"衣食住行"攻略，不是历史文化科普

**这是几轮返工之后定下来的最终方向，推翻了本文件更早版本里"城市概况必须独立成段给 3～4 个史实""storyFeatures 要尽可能多、每段都要想办法配图"的做法。** 巴黎改到第四轮时，用户明确反馈"车也没必要都说啊，就是为什么这里一定要配图呢……我要的是讲清楚衣食住行就可以了，类似做攻略一样"——之前朝"历史深度"和"配图密度"两个方向使劲加码，本身就偏离了"讲清楚这个地方"这个更根本的目标：一份好攻略靠的是内容有用、具体，不是字数多、图多。

**核心内容按中文"衣食住行"的框架组织，这是给自己（写作时）和给读者（看的时候）都清楚的一套顺序，不是四个必须写满的独立小标题**：

- **行**——怎么到达、市内怎么移动。已有内容（如巴黎、日内瓦的"到达交通"storyFeature）可以保留，但不用每次都强撑一张图——找不到真正贴切、不重复的图，直接写成正文段落即可，**不要为了"这里要有张图"去找一张勉强沾边的照片**（巴黎/日内瓦最早都用同一张专车图，日内瓦后来又换成一张座椅特写，这类"为配图而配图"的做法本身就是要避免的）。
- **住**——分区怎么选、住哪个片区合适。这部分天然适合配图（街景/建筑细节），保留原有的"街区气质"storyFeature 写法。
- **食**——当地饮食场景、值得知道的用餐信息，可以放进 `highlights` 或简短正文，不必单独强撑一个大段落。
- **衣及其他实用信息**——季节/气候要不要特别准备、签证规则、货币支付习惯、基本安全提醒。这些多数是纯文字信息，**不需要配图**，写清楚、给到可执行的颗粒度（具体月份、具体规则、具体片区）就够，不用因为"总原则说要图文穿插"就强行找图配上去——总原则针对的是"整篇文章通篇纯文字、一张图都没有"，不是要求每一段都必须有图。

**背景/历史可以保留，但只作为简短的定位说明，不是独立的深度考据板块**——一两句真实、可核实的关键信息（比如巴黎"这个格局是奥斯曼男爵 1853 年主持改造定下的"）放在开篇总览句里就够，不需要再单独拆成"卢浮宫史""印象派史""高定史"这类多组 storyFeature，除非这个目的地的历史本身就是它最大的卖点（这种情况少见，遇到了再判断，不要默认每个目的地都要走这个套路）。

**外部调研仍然适用的几条方法论**（来自 [Essentials to Writing a Travel Guide](https://www.findrentals.com/travel-news/essentials-writing-travel-guide)、[The best city travel guides](https://arun.is/blog/city-travel-guides/)、[avoid travel content cliches](https://contently.com/2020/06/01/avoid-travel-content-cliches/) 等资料）：

- **每个目的地页面必须有这个地方独有的具体信息，不能是换个地名就能套用的模板句。** 如果读者分不清"这段话是写马德里还是写巴塞罗那"，就说明内容不够具体——"RER B 大约 35–50 分钟进城""8 月不少独立餐厅老板会关店休假""service compris 已含服务费"这类是好的范本。
- **避免空洞的营销辞藻**，如"世外桃源""无与伦比""沉浸式体验""state of the art"——换成具体地名、具体机构名、具体季节现象。
- **实用信息要给到可执行的颗粒度**：最佳到访时间给具体月份区间+原因，不说"全年皆宜"；街区介绍具体到"哪条街是精品店区、哪个区是老文青区"，不说"每个区都有特色"。
- **奢华旅行顾问的定位是"咨询驱动"而非"即时预订"**，页面收尾动作是留资/咨询，不是罗列可勾选的行程包——本站现有的"为什么通过 MYVIPSERVICE"收尾区块 + `InquiryCTA` 已经是这个方向，不用改。

## 二、与其他内容集合的引用关系

- `relatedAccommodationKeys`/`relatedExperienceKeys`/`relatedJournalKeys` 都是真实生效的字段，模板里用 `resolveRelated()` 取手动指定的列表，再用 `getEntriesByDestination()` 做反向查询兜底合并去重（模板第 44–63 行）——写新目的地页面时，这三个字段能填就填（提升明确关联的权重），但就算漏填，只要对应的 accommodations/experiences 文件的 `destinationKey` 指向这个目的地，也会被反向查询捞回来，不用担心遗漏导致完全没有关联卡片。
- `relatedJourneyKeys` 目前是死字段，见"〇-6"，改版时要先把这条基础设施修好，再往里填真实的 journeys `translationKey`。
- **关联卡片如果和本页面自己已经展示过的图片重复，会被模板静默过滤掉**（`excludeShownImages`，`shownImageIds = [data.coverImage, ...data.gallery]`）——这是站内一致的设计行为，不是 bug，验收时如果发现某个关联区块卡片数量比预期少，先检查是不是这个原因。

## 三、正文与 `storyFeatures` 写作

- 正文（markdown body）按"一"里"衣食住行"的框架组织：开篇一段城市定位/分区逻辑的总览句（可以带 1～2 句真实的历史成因），然后按需要覆盖"行"（到达/市内交通）、"衣及其他实用信息"（签证、货币、安全）这类 H2 小节。
- **`storyFeatures` 不是越多越好，配图也不是必选项**——这是本节最容易跑偏的地方，巴黎/日内瓦都因为"为了凑图/凑组数"被用户指出过。判断顺序应该是：**先看这段内容本身值不值得单独写、写清楚**，再看**有没有真实、具体、这个页面独有的图能配**——两个条件都满足才拆成 `storyFeature`；内容值得写但确实没有贴切的图，就留在普通正文段落里，不用因为"总原则要求图文穿插"就硬找一张勉强沾边的照片凑数（比如单纯为了"到达交通"这个环节存在一张图，去配一张随便什么车的座椅特写）——**站内"图文穿插"这条总原则针对的是"整页从头到尾一张图都没有"，不是要求每一段、每一个小主题都必须配图**。"住"（街区/分区介绍）这类天然适合配图的内容优先配，"衣食"和实用信息类内容多数时候留纯文字是正常的，不用勉强。
- **如果确实要配图，先扫一遍 `src/data/image-attributions.ts` 找这个目的地页面独有、没被其他页面大量复用的真实图**——`grep -rn "<图片id>" src/content/` 查一下候选图在全站被引用了几次，被大量复用、尤其是被其他页面当 `coverImage` 用的图（会触发 `excludeShownImages` 静默过滤掉那个页面的关联卡片，是真实的连带副作用，日内瓦踩过一次），不要直接拿来用；确实找不到合适的已有图，找不到就说明这段内容本来就不适合做成图文 `storyFeature`，留作纯文字段落，不必因此去新下载一张图。
- 图片来源和质量要求（用到配图时）延续 [[服务页面写作]] 的"二"：Unsplash 免费库不够时 Pixabay 是可用备选，避免 3D 效果图、游客照片式陈词滥调构图（地标仰拍）、未授权品牌标识、节令装饰。

## 四、`highlights`

- 回答"这个目的地最值得做的具体几件事"，要给出可验证的具体名字（博物馆名、街区名、具体体验类型、具体美食/餐厅类型），不要写"丰富的文化体验"这种空话——参考 `paris.md` 现有内容（卢浮宫/奥赛博物馆导览、高定工坊、米其林餐厅、蒙田大道私人购物）已经是这个标准。
- 配图遵循和"三"一样的原则——**有真实、贴切、不重复的图才配，没有就是纯文字**，不用刻意控制成"少数"，但也不用刻意追求"能配尽配"；"食"这类条目如果有具体好图（比如实际的用餐/菜品照片）值得配，其余多数保持纯文字是正常状态。

## 五、写作风格

- YAML 撇号/引号规则与 [[旅游酒店写作]]/[[主题游写作]] 完全一致：正文含英文撇号的字符串整条换双引号，不用 `\'` 转义，写完跑 `grep -n "\\\\'" src/content/destinations/*/*.md` 自查。
- 不虚构可验证的具体数据（航班时长、地铁线路、开业年份等），信息冲突时标出来问用户。
- 中文版侧重实操信息（微信联系方式相关的沟通提示、亲子/长辈同行的具体建议），法文版侧重当地专业知识（分区/产区分级逻辑、文化背景）。
- 不能出现暴露内部工作状态的话；价格话术统一"价格需咨询"，`highlights`/正文里如果提到量级参考，遵循 CLAUDE.md"至少给一个起价量级线索"的原则。

## 六、三语同步

- `storyFeatures`/`highlights` 的文字、配图逻辑、跳转链接三语必须一致。
- `region`/`destinationType`/`countryCode` 这类结构字段三语必须完全一致（影响分组和路由），不能中文版写了 `region: 'Europe'`、英文版漏填。

## 七、验收

在跑验证命令前自查：

- [ ] CTA 是否已经从 `QuickInquiryButton` 挪进 `PageHero` 的 `cta` 插槽、和标题同一行、桌面+移动视口都确认过。
- [ ] 内容是否按"行/住/食/衣及其他实用信息"这个框架讲清楚了，读起来像一份能直接用的攻略，不是历史文化科普文——历史背景是不是控制在开篇一两句，没有单独铺开好几组深度考据。
- [ ] **实操信息是否讲清楚了**（签证/货币，安全提醒具体到片区/线路），政策性内容是否先用 WebSearch 核实过当前状态；这部分正常情况下是纯文字，不用为了配图硬找一张图。
- [ ] `storyFeatures`/`highlights` 里配了图的条目，是不是真的"内容值得写+有贴切真实图"两个条件都满足才配的，没有为了凑图数量硬塞一张勉强沾边的照片；配的图是否 `grep -rn "<图片id>" src/content/` 查过全站引用次数，避免复用别的页面自己的 `coverImage`。
- [ ] `highlights` 是否已经是 `highlightItem` 结构、用 `MediaHighlightList` 渲染。
- [ ] 顶部 `Gallery` 是否已经加上 `storyFeatures.length === 0` 之类的判断，避免图片重复出现。
- [ ] 六个区块的 eyebrow 是否已经按内容类型区分开，不再是清一色的 `t('destinations.hero.eyebrow')`。
- [ ] `relatedJourneyKeys` 这条链路（schema 字段 + `getEntriesByDestination` 泛型 + 模板新区块 + i18n key）是否已经打通，且链的是真实存在的 journeys。
- [ ] 三语（zh/en/fr）的文字、链接、配图是否同步。
- [ ] 列表页（`/destinations/`）确认无需改动（已经是 ContentCard/ContentGrid + 分组）。

自查完再跑：

- `npm run format:check && npm run lint && npm run check && npm run build` 全绿。
- 浏览器里三语言都看一遍，桌面 + 移动视口都要看，点一遍新增的跳转链接（尤其是新加的 journeys 区块）确认落地页正确、无死链。
- 部署到线上生产环境前跟用户确认一次，除非当前对话已有范围明确的授权；改完一版先给用户看，等对方认可这一页的方向，再继续下一个目的地页面，不要预判方向就连续批量推进。

## 八、自我更新

**每改完一个目的地页面、或者用户对某个具体做法提出修正后，主动更新这个 SKILL.md**，不用等用户要求。

**巴黎页面（第一个改版页面）验证结果，"〇"里的七条方案全部按计划落地，没有推翻任何一条**：

- `highlightItem` 挪到 `destinations` 定义之前——按计划做，没有 TDZ 报错。
- `storyFeatures` 加字段后，`data.storyFeatures.map()` 在这个模板里同样会报 `ts(7006)` 隐式 any（和 experiences 模板踩过的坑一样），需要显式标注 `(feature: { title: string; body: string; imageId: string }, index: number)`，不是巧合，是这套 `getDetailStaticPaths` 泛型在这几个模板里都有的通病，以后新模板遇到同样报错直接照这个写法标注，不用重新排查。
- `getEntriesByDestination` 泛型加 `'journeys'` 时，因为 journeys 是 `destinationKeys`（复数数组）、accommodations/experiences 是 `destinationKey`（单数字符串），两种形状没法用同一行 `entry.data.destinationKey === x` 覆盖——按 collection 分支处理（`collection === 'journeys'` 时转型成 `CollectionEntry<'journeys'>['data']` 用 `.includes()`），分支内部各自 cast 类型即可通过 `tsc`，不需要更复杂的类型体操。
- 巴黎的 `relatedJourneyKeys: ['paris-loire-valley-journey']` 三语 frontmatter 其实早就手写在那了（之前只是被 schema 忽略），schema+lib+模板一打通就直接生效，浏览器里"主题游推荐"区块正确显示了这条主题游，不用额外补内容。
- storyFeatures 的两张图直接复用了站内已登记图片（`service-private-transportation`、`journal-preview-paris-cafe`），没有新下载任何图——巴黎原本的两段正文（"Getting In and Getting Around"/"Where the City Actually Happens"）事实描述已经很扎实，只是做了"从纯文字正文挪到图文 storyFeature"的结构搬家，一个字的事实内容都没改。
- 六个区块的 eyebrow 按方案分别改成 `data.title`/`accommodations.hero.title`/`experiences.hero.title`/`journeys.hero.title`/`journal.hero.title`/`destinations.hero.eyebrow`，浏览器里确认互不相同。
- 三语（en/zh/fr）、桌面视口、控制台报错都过了一遍，全部正常，无需改动列表页。

**一个和目的地页面无关、但顺手修的环境问题**：本地跑 `netlify dev`/`netlify deploy` 测试会在 `.netlify/functions-serve/` 留下几十 MB 的打包产物缓存，`eslint.config.js` 原来没有把 `.netlify/` 排除在外，导致 `npm run lint` 会去扫这堆生成代码，报出 6 万多条无关错误、且耗时暴涨——已经在 `eslint.config.js` 的 `ignores` 里加了 `.netlify/`，以后本地测试后端功能不会再复现这个问题。

**第二轮返工（图片复用问题）**：用户反馈原话"图文要相符合 要找图！尽可能不要用同样的图片以及图片还是储存在我们的图片文件夹里面"。问题所在：日内瓦页面 `gallery` 里用的 `destination-geneva-lake` 同时也是 `private-geneva-lake-morning` 这条体验自己的 `coverImage`，触发了 `excludeShownImages` 去重机制，导致这条体验的卡片在日内瓦页"精选体验"区块被静默隐藏——不是审美问题，是真实的内容可见性 bug。怎么改：换成新下载的、页面专属的图，并把 `destination-geneva-lake` 从 `gallery` 里整条删掉；同时把这条经验教训写回本节"二/三/四"——配图前先 `grep -rn "<图片id>" src/content/` 查一下这张图站内一共被用了几次，避免是另一个页面自己的 `coverImage`。

**第三轮返工（本节一/三/四/七的整体方向重写，目前最新、最重要的一次）**：用户反馈原话"车也没必要都说啊 就是为什么这里一定要配图呢？...我要的是 讲清楚衣食住行就可以了 类似做攻略一样的来做这个部分"。问题所在：巴黎改到第三轮时，已经把"总原则要求图文穿插"执行成了"每个话题都要想办法配图"（连"怎么进城"这种不需要图的段落也在纠结配图）、"历史背景值得了解"执行成了"拆成好几个独立的 storyFeature 专门讲卢浮宫史/印象派史/高定史"——两者都是对更早期反馈的过度矫正，偏离了用户真正要的"讲清楚衣食住行的实用攻略"，不是"历史文化科普文"。怎么改：把巴黎原本 4 组 storyFeatures 精简到 2 组（只留"怎么进城/城里怎么移动"和"城市的真实脉络在哪里"这两块真正需要配图、且图文都具体贴切的内容），删掉两组纯历史的 storyFeature（卢浮宫史、高定史），把其中的关键史实（卢浮宫 1793 年起对外开放、印象派 1874 年诞生于此、高定 1868 年成为行业）压缩成开篇段落末尾的一两句话带过，不单独占版面、不强配图。日内瓦按同样逻辑处理：删掉"为什么日内瓦承接世界难对话"这个纯历史 storyFeature（红十字会/国联/万国宫），把关键史实压缩进开篇段落；"老城与湖泊"这个 storyFeature 本身是住/定位性质的内容值得保留，但把其中过长的加尔文/宗教改革历史段落也压缩掉，只保留"老城地理位置+步行友好"这类实用信息。两地都过了完整验证链（apostrophe grep → prettier → format:check/lint/check/build → 三语浏览器抽查 + 控制台报错检查），全部通过。这轮修改也把本节"一/三/四/七"的措辞整体重写成"衣食住行攻略"框架，推翻了更早版本"storyFeatures 必须尽可能多、每段都要想办法配图"的要求——以后新写/复查目的地页面，直接按当前版本的"一/三/四"执行，不要再参照本节这段历史记录里描述的"更早的做法"。

## 图文穿插硬规则（2026-10-07 客户明确要求，所有内容类型通用，写完必须自查）

- **顶部只保留封面首图**：`gallery` 字段留空，或只放封面这一张；不要把多张图堆在页面顶部的相册里。
- **其余图片必须穿插在正文里**：每个小节/每个季节/每个地区/每个条目的文字后面，紧跟一张和这段文字画面对得上的图（Markdown 正文用 `![alt](/images/xxx.jpg)`；有结构化字段的类型用 `{text, image}` 之类的字段，见本 skill 对应章节）。不要把几张图集中放在一处，也不要放在对应文字之前。
- **同一页面里一张图只出现一次**：封面用过的图，正文不再重复使用。
- 不是每段都必须有图——没有真正对得上的照片，或只是过渡句，就不配图，不要为了凑数放不相关的图；但"能找到对应图片的都要有图"是默认做法。
- alt 文字要写清画面里真实有什么，不夸大；三种语言的版本图片位置保持一致。
- 自查：`grep -c "^!\[" 文件` 看正文图数；打开页面确认顶部只有封面、图都紧跟着各自的文字、没有缺图。
- 起因：红酒文章（`maison-kairui-burgundy-wine-retreat`）第一次改版时，图集中堆在几处、顶部相册有 6 张，被客户退回；见 [[feedback-all-content-image-text-interleave]]。
