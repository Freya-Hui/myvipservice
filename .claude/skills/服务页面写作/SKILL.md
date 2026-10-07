---
name: 服务页面写作
description: 在 MYVIPSERVICE 网站修改服务页面（services content collection，导航"服务"下的 12 个详情页，如"酒店与别墅预订""定制行程规划""家庭与儿童服务"）时使用的写作与开发规范——页面结构顺序（内容→图文说明→服务包含→关联跳转）、CTA 与标题同行布局、storyFeatures 图文穿插、highlights 应该写什么、与已建成内容的跳转关系、列表页卡片布局、三语同步、验收流程。当用户要改服务详情页、服务列表页，或提到"服务页面""services 页面""服务详情"时触发。
---

# 服务页面写作规范

MYVIPSERVICE 的服务页面分两层：列表页 `src/pages/[locale]/services/index.astro`（导航"服务"进去的第一屏，展示全部 12 个服务卡片）和详情页 `src/content/services/{zh,en,fr}/<slug>.md`（渲染模板固定为 `src/pages/[locale]/services/[slug]/index.astro`）。12 个服务详情页**一次改一个**（核实关联内容→写 storyFeatures→写 highlights→加跳转区块→三语→验证部署），不要多个服务同时铺开。改完一个，等用户确认这一版方向对了，再动下一个——不要预判用户会全部认可就连续批量做完。

服务页面的职责是"说清楚这项服务是什么、我们怎么做、能不能直接跳去看已经做好的真实内容"——它不是重新讲一遍 journeys/accommodations 页面已经讲过的故事，而是把那些故事当作证据链接过去。

## 页面结构顺序（用户明确定下的顺序，优先级高于下面所有细则）

一定是先把这项服务本身讲清楚，之后才是分流到别的页面——内容和跳转链接是先后的两件事，不要混在一起。完整顺序自上而下：

1. **Hero**：标题 + CTA（同一行，见"一"）+ 副标题 + 大图。
2. **`storyFeatures`**：2～3 组图文交替的详细说明区块，回答"这项服务具体是什么、我们怎么做、和别的选项比差异在哪"（见"二"）。
3. **`highlights`（"服务包含"/What This Includes）**：这次服务实际包含的具体内容组成部分，纯文字为主（见"三"）。
4. **关联跳转区块**（`RelatedContent` 卡片）：链到真实存在的 journeys/accommodations 等内容（见"四"）。
5. 其余模板固定区块（`investmentTier` 说明、人群板块等）不用改。

## 一、CTA 与标题同一行

- 页面顶部的"获取报价"/预订入口按钮要和 H1 标题同一行、贴右对齐，不要单独另起一行——用 `PageHero.astro` 已有的具名插槽 `cta`：

  ```astro
  <PageHero
    eyebrow={eyebrow}
    title={data.title}
    subtitle={data.summary}
    imageId={data.image}
    locale={locale}
  >
    <a slot="cta" class="button button--primary" href={ctaHref}>{ctaLabel} →</a>
  </PageHero>
  ```

  不要再用 `QuickInquiryButton` 组件单独渲染一整行——那个组件自带 `.container`，塞进 `cta` 插槽会导致嵌套 container，改用一个普通 `<a class="button button--primary">`（参考 accommodations 详情页已有的写法）。原来 `QuickInquiryButton` 需要按 slug 分支的三种 label/href（默认走 contact 表单、`vip-airport-reception`/`tickets-events` 走各自的 `/book/` 页面），改成在 frontmatter 逻辑区提前算出 `ctaLabel`/`ctaHref` 两个变量，再传给这个 `<a>`。

- **真实踩过的坑：`PageHero` 的 `.page-hero__row` 曾经在标题够长时仍然把 CTA 挤到下一行**，即使视觉上看着还有空间。原因是 flex-wrap 的换行判断用的是每个 flex item 的"假设尺寸"（heading 的 `max-width` 会让它即使实际文字更短也照样占满这么多宽度），不是最终渲染宽度，所以 `52rem` 的 heading + CTA 加起来經常刚好比容器宽几像素，触发换行。修复方法：给 `.page-hero__heading` 加 `max-width: min(var(--prose-max-width), calc(100% - 20rem))`，在有 CTA 的行里主动让出至少 20rem 给 CTA。
- **第二个坑（第一次修复引入的新问题）：这条 `calc(100% - 20rem)` 规则不能不分宽度就全局生效**——在很窄的视口（手机）上，`100% - 20rem` 会变成负数或接近 0，把标题挤压到几乎 0 宽度，导致标题每个字母单独换行、页面直接看不了。**必须包一层 `@media (min-width: 640px)`**：窄屏下 `.page-hero__row` 用 `flex-direction: column` 正常堆叠（标题满宽、CTA 在下面另起一行，和其他页面窄屏表现一致），只有到了 640px 以上才切换成一行布局并应用那条 `calc()` 规则。**这类同一屏幕内看着没问题、换个视口就崩的 CSS 改动，必须过一遍桌面 + 移动视口再收工，不能只看一种视口就当作改对了。**
- 这个组件（`PageHero.astro`）是 accommodations 详情页也在共用的，改的时候顺手在两处页面（services 和 accommodations 详情页）都验证一遍，不要只测服务页自己。

## 二、`storyFeatures`：详细说明 + 图文穿插，服务页面的主力说明区块

- **"服务解释不够详细，要有图文穿插"是用户对这次改版最核心的诉求之一**——不要满足于两三句纯文字段落带过服务是什么，要用 `StoryFeature.astro` 组件（`content.config.ts` 里 `storyFeatures: [{title, body, imageId}]` 字段，模板里已经接好 `data.storyFeatures.map(...)` 渲染，左右交替图文布局）写 2～3 组详细说明，每组配一张真实、贴切的图。
- **有子话题页面体系（比如 `private-transportation` 的 `transportationTopics` 特例：Private Chauffeur / Private Jet / Private Terminal Experience 三个子页面）时，服务详情页仍然要写 storyFeatures，不能因为子页面已经存在就跳过**——这一条中途返工过两次：第一版给两个子话题各写了一组 storyFeature，内容和卡片摘要几乎逐字重复，被要求删掉；删掉之后页面又被指出"完全不对"，因为整页只剩小卡片，没有其他页面都有的大幅图文说明区块，视觉分量和其余 11 个服务页明显不一致。**正确做法是两者都要，但内容和图片不能重复**：
  - storyFeatures 挖子话题页面自己**没有在卡片摘要里露出的更深内容**——子话题页面的正文往往比卡片上那一行 `summary`丰富得多（比如 `chauffeur.md` 正文里的车型选择、语言能力；`private-terminal.md` 正文里"为什么私人航站楼比快速通关更好"的完整论证、设计师背景、航站楼内部设施），这些内容卡片摘要里没有，用来写 storyFeatures 正合适，不会和卡片重复。
  - storyFeatures 配图要挑子话题页面**没有用在卡片缩略图上**的其他真实图（子话题页面自己的 `gallery` 字段常常不止一张，卡片缩略图只用其中第一张）——比如 `private-terminal.md` 的卡片缩略图用的是 `experience-extime-tarmac`，storyFeatures 就改用同一 `gallery` 里的 `experience-extime-lounge`（绛红丝绒沙发+雕花玻璃墙），画面不同，不会一眼看出是同一批素材。
  - **子话题卡片区块（`RelatedContent`）在页面里的位置也要挪到 storyFeatures 和 highlights 之后**——这是本次发现的一个真实模板 bug：`[locale]/services/[slug]/index.astro` 里 `transportationTopics` 的渲染代码原来写在 `Content` 之后、`storyFeatures`/`highlights` 之前，导致这一个用了子话题体系的页面，结构顺序和"先写内容、后分流跳转"的总原则相反（跳转卡片先出现，图文说明后出现）。已经把这段 `RelatedContent` 调用整个挪到 `highlights` 区块之后（和 `sampleJourneys`/`accommodations` 两个特例的位置对齐），现在这一个页面的区块顺序也符合总原则了。
- **每组 storyFeature 应该讲一个具体的差异化卖点，不是空泛的服务介绍**——比如"定制旅行规划"页面写的两组：① 和跟团游对比，说清楚"同样省心但没有固定行程、节奏自己定"；② 说清楚"管家 24 小时待命、车/司机/向导/餐位全程专属不与人共享"。这类对比和具体细节，比"我们提供优质服务"这种空话有说服力得多——写之前先想清楚这项服务和"不用这项服务/找便宜替代"比，差在哪，那就是该写的内容。
- **正文最上面的 markdown `Content`（不是 storyFeatures，是 frontmatter 之后的普通正文）应该很短，甚至只是一两句概括**，不要把详细说明也堆在这里——详细说明和图片都交给 `storyFeatures`，`Content` 只用来说一句"起点是什么"这种简短过渡（比如"每一份行程都从您想做的事情出发……"），避免它变成又一段和 storyFeatures 重复的纯文字。
- **图片质量要求（这一条被用户退回重做过两次）**：
  - **不要用第一个看起来沾边的图就定下来**——"定制旅行规划"第二组 storyFeature 的配图前后换了四次才定下来：`service-car-interior`（通用商务车后排座椅特写，标注"标准配置"）、`service-concierge`（通用酒店前台照片，标注"不代表任何具体物业"）、`service-dining`（真实西餐桌面，但用户反馈"不要吃饭的"——即使图片本身质量不错，和这一组想表达的"管家/专属接待"完全不搭）都被否决。**问题的共性是图片太泛化、或者和文案想表达的具体概念对不上**，不是随便换一张"看起来高级"的图就行，要先想清楚这组 storyFeature 具体在说什么概念，再去找精确匹配这个概念的图。
  - **优先去找已经在本站其他页面使用、但更贴切具体的真实图**，而不是执着于新开一次搜索——比如第一组用的 `service-private-transportation`（黑色专车停在酒店门口，配文明确写"chauffeured"）就是取自 `private-transportation.md` 的主图，本地已经登记过，直接复用。**跨页面复用同一张图是允许的**（不同于酒店页面"同一页面内不能重复用同一张图"的规则，那条规则只管单页内部），只要图片内容和这一条 storyFeature 想说的事情匹配得足够具体。
  - **Unsplash 免费库对"专业接待/行李服务"这类场景覆盖很差，搜出来的高质量结果几乎全是 iStock 付费图或 Unsplash+ 付费图**（`/plus?referrer=` 链接、或页面上标着"Get Unsplash+"的都不能直接用）——多次尝试"luggage porter hotel""airport meet and greet"之类的关键词，能免费下载的要么是商业航班货运地勤的雾霾工地感照片，要么是 3D 效果图，要么带圣诞节令装饰。**这种情况下 Pixabay（Pixabay License，同样可商用、免署名）是可用的备选来源**——第二组 storyFeature 最终用的 `service-reception-desk-call`（酒店前台接线员接听电话、柜台边放着行李箱）就来自 Pixabay，登记方式和 Unsplash 图完全一样（写进 `image-attributions.ts` + `docs/image-asset-register.md`，`sourceName` 写 `'Pixabay'`，`license` 写 `'Pixabay License'`）。
  - **`StoryFeature.astro` 组件原来没有渲染图片署名的逻辑**（`Gallery.astro`/`MediaHighlightList.astro` 都有 `needsCredit`/`gallery__credit` 这一套，`StoryFeature.astro` 之前没有）——用到需要署名的非 Unsplash 图片时才发现这个缺口，已经照着 `Gallery.astro` 的写法给 `StoryFeature.astro` 补上了（`image.license !== 'Unsplash License'` 时渲染一行 `Photo: 作者 / 来源, 许可证`）。以后要是又发现哪个渲染图片的组件缺这个逻辑，照此模式补齐，不要漏署名上线。
  - 走 Unsplash/Pixabay 搜索时避免：3D 图标/插画（不是真实照片）、正对镜头摆拍微笑的人物特写（不完全禁止，但优先级低于建筑细节/餐桌/车门这类"正在经历它"的画面）、明确带出未授权品牌标识的场景（如别的酒店门头招牌清晰可见）、带节令装饰（圣诞树、彩灯等，显得过时且和主题无关）的场景。
  - 换图之后记得同步检查这张图是否和 storyFeature 的**标题**还合得上——图片换了几轮之后，标题也从"A Concierge Around the Clock"改成了更宽泛、能兼容任何一张"专属服务"类配图的"Every Detail, Arranged for You"，避免每换一次图就要重新纠结标题措辞。

## 三、`highlights`（"服务包含"）：写这次服务真正包含的组成部分，不是"能做哪些主题"

- **这是这次改版另一处返工过的地方**：最初把 `highlights` 写成"我们能围绕哪些主题做定制"（葡萄酒/艺术/滑雪/海岸/时尚/教育），用户反馈"服务包含这个部分需要包含什么——礼遇、车、酒店、票务等等，就是一个全面的行程定制会涉及到的内容"。**`highlights` 应该回答"预订这项服务实际会得到什么"，是服务的组成要素清单，不是"能覆盖哪些兴趣主题"**——主题覆盖面这种信息属于正文的简短说明或关联卡片区块，不属于"服务包含"。
- 拿"定制旅行规划"举例，改版后的 4 条 `highlights` 分别对应四类真实、可验证的服务组成部分，每条都链到对应的、真实存在的其他服务详情页（不是自我循环链接，是链到另一个能提供该组件的服务页）：
  - 酒店/别墅预订 → `/services/hotel-villa-reservations/`
  - 专属座驾与司机 → `/services/private-transportation/`
  - 优先票务与预订 → `/services/tickets-events/`
  - 24 小时管家 → `/services/personal-concierge/`
- 这样写的好处：每条 highlight 天然带有真实、不重复的跳转目标（同时满足"至少有几条真实跳转链接"的要求），且和上面 storyFeatures 里的"主题覆盖面"内容完全不重叠（一个讲"能做什么类型的行程"，一个讲"预订后实际拿到哪些具体服务"）。
- **`highlights` 保持纯文字为主，不配图**——`storyFeatures` 已经承担了图文穿插的职责，`highlights` 只需要清楚列出服务组成，配图反而让这两个区块显得重复、页面板块又变杂。`content.config.ts` 里 `serviceHighlightItem` 仍支持 `image` 字段（组件层面兼容），但服务页面新内容默认不用它。
- 每个 `highlights` 条目该不该配 `href`，判断标准：这条内容有没有对应一个真实存在、且**没有被别的跳转区块覆盖**的站内页面——如果有，加链接；如果没有真实匹配（比如某个组成部分站内还没有独立页面），就留纯文字，不要编一个不存在的链接。

## 四、独立的关联跳转区块（sampleJourneys / RelatedContent）

- 一组同类关联内容（比如几条主题游、几家酒店）统一走 `highlights` 之后的独立区块，用 `RelatedContent` 组件渲染成一个有独立标题的卡片区，不是拆散揉进 `highlights` 的文字里。
- **做法参考 `tailor-made-travel-planning` 的 `sampleJourneys` 区块**（`[locale]/services/[slug]/index.astro` 里 `slug === 'tailor-made-travel-planning'` 分支）：按 `translationKey` 从对应 collection 里筛出真实存在的几条关联内容，整体传给 `RelatedContent` 组件渲染成一组带标题、带"查看全部"链接的卡片。新服务页要做类似的"跳转区块"，优先复用这个模式（加一段类似的数据获取 + `RelatedContent` 调用），不要退回到在 `highlights` 文字里插 `href` 的旧做法。
- 页面模板里已有的其他关联区块（`accommodations`/`transportationTopics` 特例数据、`featuredTravelStyles` 人群板块）也是同样的"整块区域级别跳转"性质，都放在内容之后。
- **区块标题（eyebrow）不要都写成同一个 "Services"**——第一版每个区块（highlights 的 `SectionHeading`、`sampleJourneys`/`accommodations` 的 `RelatedContent`）的 `eyebrow` 全部传的是 `t('nav.services')`，导致页面上连续出现好几个一模一样的 "SERVICES" 小标签，用户看不出它们分别在标注什么，直接问"这个角标是什么意思"。**改成每个区块用能说明"这是什么"的、更具体的 eyebrow**：`highlights` 区块用 `data.title`（这个服务自己的名字）；链到 journeys 的区块用 `t('journeys.hero.title')`（"Journeys"）；链到 accommodations 的区块用 `t('accommodations.hero.title')`（"Accommodations"）。只有 Hero 本身的 eyebrow 保留 `t('nav.services')`——那是面包屑/页面归类，不属于这个重复问题。
- **卡片区块要挑一小撮代表性的，不要把整个 collection 全部倒出来**——`hotel-villa-reservations` 页面原来的 `accommodations` 特例是不加筛选地拉取全部已发布住宿（`getLocaleEntries('accommodations', locale)`，当时是 28 家），渲染成一个巨长的卡片列表，用户反馈"这个部分展示的也太多了吧"。**改法和 `sampleJourneys` 一样**：定义一个 `FEATURED_ACCOMMODATION_KEYS` 数组，按 `translationKey` 筛出 5～6 个真正有代表性的（挑选原则：和这个服务页自己的 storyFeatures/highlights 呼应——比如 `hotel-villa-reservations` 挑的是 storyFeatures 两张配图对应的物业 `ritz-paris`/`grand-villa-geneva-mies`，加上 highlights 里点名提到的 `four-seasons-george-v`/`hotel-de-crillon`/`cheval-blanc`，再配一个villa `chateau-de-neydens`，palace 和 villa 两种风格都覆盖到），不是随手挑几个。**筛完之后确认页面上还留着"查看全部"链接**（`services.detail.viewAllAccommodations` 那一行，模板里已经有）——这样想看完整目录的人还是点得到，只是首屏不再是一整面墙的卡片。
- **顶部小图库（`gallery` 字段，`data.storyFeatures.length === 0 && data.gallery.length > 0` 触发的 `Gallery` 组件）现在几乎不会再出现**——只要页面用了 `storyFeatures`（新写的页面都应该用），`data.storyFeatures.length === 0` 这个条件就不成立，顶部小图库自动不渲染，不用再手动管这个判断；这条件本来是给完全没有 `storyFeatures`、`highlights` 也没配图的旧页面当兜底用的（`hotel-villa-reservations` 已经改版用上了 `storyFeatures`，不再依赖这个兜底）。

## 五、列表页（`/services/`）卡片：整卡可点击，复用 `ContentCard`/`ContentGrid`

- **服务列表页原来用的是一套自己写的 `.service-card` markup，卡片本身不可点，只有底部一小行"查看详情 →"文字链接可点**——用户反馈"不要点每个服务的小按钮，直接点卡片就该能打开"。而 journeys/accommodations 的列表页早就用的是共享组件 `ContentCard.astro`（整个 `<li>` 内容——图片、标题、摘要、meta——全部包在同一个 `<a href>` 里，点哪里都能跳转，参考它的源码就知道这是site-wide 已经验证过的标准写法）+ `ContentGrid.astro`（响应式网格）。**服务列表页已经改成直接复用这两个组件**，不再维护自己的一套卡片 markup——以后任何新的列表类页面，先看 `ContentCard`/`ContentGrid` 够不够用，不要重新发明一遍。
- `ContentCard` 的 `imageId` prop 是必填 `string`，但 `services` collection 的 `image` 字段是可选的（`z.string().optional()`）——传的时候写 `imageId={service.data.image ?? 'hero-home'}` 兜底（虽然目前 12 个服务页实际上都已经填了 `image`，这条只是让 TypeScript 类型检查过关，不依赖"运行时刚好都有值"这个假设）。
- 旧代码里"当某个分类下只有 1 个服务时，CSS Grid 会把这唯一的卡片拉伸到整行宽度"这个 bug（`repeat(auto-fit, minmax(x, 1fr))` 在孤项分组里的经典问题）随着**改用 `ContentGrid` 的响应式网格、以及页面本身已经是不分类的扁平列表**一起解决了，不需要额外处理。

## 六、写作风格

- 延续 [[旅游酒店写作]]、[[主题游写作]] 两个 skill 已验证的写作纪律：**YAML 撇号/引号规则完全一样**——正文含英文撇号（人名地名、所有格）的字符串整条换双引号，不用 `\'` 转义；写完跑 `grep -n "\\\\'" src/content/services/*/*.md` 自查。`storyFeatures` 的 `body` 字段尤其容易踩这个坑（长段叙述性文字，撇号密度高）。
- 中文版不是机械翻译：中文侧重实操信息（微信联系方式、中国家庭需求、儿童双床等），法文侧重服务标准、国际客群、当地专业度——和酒店/主题游页面的三语分工原则一致。
- 不能出现暴露内部工作状态的话（如"我们会陆续整理成独立页面"）；价格话术统一"价格需咨询"。
- 先说清楚"这项服务具体是什么、我们怎么做"，再谈"能链到哪些已建成内容"作为证据，不要本末倒置——链接是佐证，不是正文本身。

## 七、三语同步

- 服务页面属于 CLAUDE.md 里"要求四语言同步"的页面（导航常驻入口），`storyFeatures`/`highlights` 的文字、跳转链接、配图逻辑三语必须一致——不能只给中文版改完，英法文版还是旧版本。
- 跳转链接的目标路径要按 locale 前缀分别写对（`/en/services/...`、`/fr/services/...`、`/zh/services/...`），不要三语都硬编同一个 locale 前缀。

## 八、验收

在跑验证命令前自查：

- [ ] CTA 是否和标题同一行、贴右对齐（桌面视口），窄屏是否正常堆叠不挤压（移动视口）。
- [ ] 如果这个服务有子话题页面体系（如 `transportationTopics`），storyFeatures 是否仍然写了，且内容/配图和子话题卡片不重复；子话题卡片区块在页面里是否排在 storyFeatures 和 highlights 之后。
- [ ] `storyFeatures` 是否有 2～3 组，每组图片是否具体贴切（不是泛化的"随便一张沾边的图"）、标题和图片是否对得上。
- [ ] `highlights` 是否写的是"服务实际包含什么"（车/酒店/票务/礼遇类具体组成），不是"能做哪些主题"；是否保持纯文字为主、不配图。
- [ ] 各区块的 eyebrow 是否用了能说明"这是什么"的具体文案，没有连续出现好几个一模一样的通用标签。
- [ ] 这个服务页面是否至少有几条真实跳转链接（highlights 的 href + 独立跳转区块），且不同区块之间没有重复链接同一批内容。
- [ ] 三语（zh/en/fr）的文字、链接、配图是否同步。
- [ ] 关联跳转的卡片区块是否是精选的一小撮（5～6个），不是把整个 collection 不加筛选全部展示出来；如果做了筛选，"查看全部"链接是否还在。
- [ ] 如果改动涉及列表页（`/services/` 首屏），卡片是否整卡可点击（复用 `ContentCard`），不是只有一小行文字链接可点。

自查完再跑：

- `npm run format:check && npm run lint && npm run check && npm run build` 全绿。
- 浏览器里三语言都看一遍，桌面 + 移动视口都要看（尤其是这次改了 `PageHero` 共享组件，任何涉及它的 CSS 改动都必须两种视口都验证），点一遍新增的跳转链接确认落地页正确、无死链。
- 部署到线上生产环境前跟用户确认一次，除非当前对话已有范围明确的授权；改完一版先给用户看，等对方认可这一页的方向，再继续下一个服务页，不要预判方向就连续批量推进。

## 九、自我更新

**每改完一个服务页面、或者用户对某个具体做法提出修正后，主动更新这个 SKILL.md**，不用等用户要求——把"为什么错了"和"改成什么样"都写回对应章节，保持这份 skill 和实际踩过的坑同步，而不是停留在写 skill 那一刻的认知。这份 skill 目前记录的每一条规则，几乎都是从用户对第一版"定制旅行规划"页面的具体反馈中提炼出来的（结构顺序、CTA 布局、storyFeatures 图文穿插、highlights 该写什么、eyebrow 重复、图片质量、列表页整卡可点击）——后续服务页改版过程中如果又出现新的返工，同样要把具体的"反馈原话 → 问题所在 → 怎么改"记录进对应章节，不是泛泛地说"注意质量"。

- **这份 SKILL.md 本身也要过 `npm run format:check`**——它是本项目 prettier 的检查范围内的普通 markdown 文件，不是豁免的。写文档里的示例代码块（比如上面"一"里的 ` ```astro ` 代码块）时，代码本身必须是**语法有效**的片段，不能用 `{...}` 这种省略号占位符代替真实的 prop 值——prettier 装了 `prettier-plugin-astro`，遇到标了语言的 fenced code block 会尝试用对应语言的真实解析器去格式化块内代码，无效语法会让 `prettier --check` 报 `SyntaxError`，而且报错位置永远指向文件开头的 frontmatter（"Unexpected token (2:1)"），完全不会提示真正出错的代码块在哪一行——踩到这个坑排查了很久，最后是把文件按行数二分查找才定位到。以后写 skill 文档里的示例代码，宁可写得啰嗦一点（把 prop 值都填成看似合理的真实值），也不要用占位符省略号。

## 图文穿插硬规则（2026-10-07 客户明确要求，所有内容类型通用，写完必须自查）

- **顶部只保留封面首图**：`gallery` 字段留空，或只放封面这一张；不要把多张图堆在页面顶部的相册里。
- **其余图片必须穿插在正文里**：每个小节/每个季节/每个地区/每个条目的文字后面，紧跟一张和这段文字画面对得上的图（Markdown 正文用 `![alt](/images/xxx.jpg)`；有结构化字段的类型用 `{text, image}` 之类的字段，见本 skill 对应章节）。不要把几张图集中放在一处，也不要放在对应文字之前。
- **同一页面里一张图只出现一次**：封面用过的图，正文不再重复使用。
- 不是每段都必须有图——没有真正对得上的照片，或只是过渡句，就不配图，不要为了凑数放不相关的图；但"能找到对应图片的都要有图"是默认做法。
- alt 文字要写清画面里真实有什么，不夸大；三种语言的版本图片位置保持一致。
- 自查：`grep -c "^!\[" 文件` 看正文图数；打开页面确认顶部只有封面、图都紧跟着各自的文字、没有缺图。
- 起因：红酒文章（`maison-kairui-burgundy-wine-retreat`）第一次改版时，图集中堆在几处、顶部相册有 6 张，被客户退回；见 [[feedback-all-content-image-text-interleave]]。
