# "人群"（Travel Styles / Who We Design For）写作与开发规范

MYVIPSERVICE 有一套按人群而非按内容类型组织的入口——首页"BUILT AROUND WHO'S TRAVELLING"板块（eyebrow: "WHO WE DESIGN FOR"）、独立的 `/travel-styles/` 列表页与 `/travel-styles/{slug}/` 详情页系统。这是站内唯一一处"按人群"组织的维度，对应 CLAUDE.md"产品架构从用户任务出发"原则里"我要……"这类用户语言分类的具体实现。这份 skill 覆盖这个维度本身的数据结构、页面、文案、图片、跳转与标签联动规则，不是酒店/服务/目的地/行程页面本身的写作规范（那些各有自己的 skill）。

**2026-09-23 架构升级**：这个板块此前只是 `site-content.ts` 里一个数据数组驱动的首页卡片，2026-09-23 已升级为真正的 Collection + 独立页面系统（详见"一"）。旧版本的实现细节仍作为历史教训保留在本文件里，但**数据源、渲染方式已经整体替换**，参照本文件时以"一、二"描述的新架构为准。

## 一、现状：`travelStyles` Collection + 详情/列表页

- **数据源**：`src/content/travel-styles/{en,zh,fr}/*.md`，schema 定义在 `src/content.config.ts`（搜索 `travelStyles = defineCollection`）。字段：`title`/`slug`/`locale`/`translationKey`（与 destinations/experiences 同构，`getDetailStaticPaths`/`getEntryByTranslationKey`/`resolveRelated`/`getDetailSwitchUrl` 直接复用）、`shortLabel`（首页卡片短标签）、`description`（卡片副标题+详情页 Hero 副标题，独立撰写，见"三"）、`travelFitTag`（可选，对应 `accommodations.travelFit` 枚举值之一，用于住宿反查，见"四"）、`coverImage`/`gallery`、`storyFeatures`（复用 `about/StoryFeature.astro` 形状）、`highlights`（复用 `highlightItem` 形状，当"服务包含"板块）、`faq`（`{question, answer}[]`，直接对接 `src/components/Faq.astro`）、`href`（可选，指向对应的完整服务详情页）。
- **列表页**：`src/pages/[locale]/travel-styles/index.astro`，照抄 `src/pages/[locale]/journeys/index.astro` 的结构（`getLocaleEntries('travelStyles', locale)` + `ContentGrid`/`ContentCard` + `EmptyState`）。
- **详情页**：`src/pages/[locale]/travel-styles/[slug]/index.astro`，照抄 `destinations/[slug]/index.astro` 的组合方式：`PageHero` → `StoryFeature` 循环 → `MediaHighlightList`（highlights）→ 四个 `RelatedContent` 区块（目的地/主题游/住宿/体验，见"四"）→ 一个 journal 相关阅读区块 → `Faq` → "查看完整服务说明"链接（`data.href`）→ `InquiryCTA`。
- **首页联动**：`src/pages/[locale]/index.astro` 的 `travelMosaicItems` 现在从 `getLocaleEntries('travelStyles', locale)`（`featured: true`）取数据，卡片 `href` 指向 `/travel-styles/{slug}/`（**不再**直接指向服务页——这是这次升级里唯一的用户点击路径变化，专属页里仍有链接跳去服务页，路径没断）。首页区块底部有一个"View all"链接指向 `/travel-styles/`。
- **服务页联动**：`src/pages/[locale]/services/[slug]/index.astro` 里 `tailor-made-travel-planning` 页面的 `featuredTravelStyles` 区块（`TravelTypes.astro` 组件渲染）同样从 `travelStyles` collection 取数据，`href` 也改成指向 `/travel-styles/{slug}/`。
- **`TravelTypes.astro`** 组件（`src/components/home/TravelTypes.astro`）的 `items` prop 类型已经从旧的 `TravelType[]`（`site-content.ts` 里的类型）松绑成结构化的 `{title, description, href?}[]`，不再依赖那个旧数据文件的类型——这个组件本身没有图片，纯文字编号列表，改动数据源时不需要碰组件本身。

## 二、当前状态：4 个已上线，12 个搁置

- 只有 4 个人群真正建了 Collection 条目：`family-journeys`（家庭）/ `romantic-escapes`（浪漫）/ `celebrations`（庆典）/ `business-vip`（商务）——每个都有完整三语（`src/content/travel-styles/{en,zh,fr}/{对应 slug}.md`），有真实的 `storyFeatures`/`highlights`/`faq`。
- `src/data/site-content.ts#travelTypes` **不再是任何页面的数据源**，现在只保留另外 12 个候选人群的英文占位描述（`multi-generational`/`private-small-groups`/`art-culture`/`food-wine`/`ski-alpine`/`coastal-yacht`/`fashion-shopping`/`wellness-retreats`/`long-stay-europe`/`children-focused`/`summer-camp-support`/`multi-city-europe`），当纯 backlog 参考，zh/fr 数组是空的。
- **要不要把这 12 个也建成真正的 Collection 条目，是产品范围决策**——2026-09-23 已经和客户确认过"先补完 4 个已上线的，剩下 12 个之后再说"。真要扩展某一个，做法是：在 `src/content/travel-styles/{en,zh,fr}/` 下按现有 4 个的字段结构新建三语 md 文件（`translationKey` 用 `site-content.ts` 里对应的 `id`，保持稳定），选一个 `travelFitTag`（如果 `accommodations.travelFit` 8 个枚举值里有对得上的）便于住宿反查有效果，不需要改 schema、不需要改页面模板——两个页面模板已经是通用的、遍历 collection 的写法，新增条目自动生效。

## 三、卡片/详情页文案：不要照抄目标服务页的 `summary`

- `description` 字段的职责是回答"这适合什么样的人/场景"，不是把跳转目标（服务页）的 `summary` 抄一遍——2026-09-23 审查时发现 `romantic-escapes`、`business-vip` 两条的 `description` 和对应服务页 `summary` 几乎逐字重复，`celebrations` 更明显的问题是：目标页标题是"Weddings & Private Celebrations"，`description` 里却完全没提"weddings"，容易让专门找婚礼策划的访客看不出这张卡片是对的入口。
- 写之前先读一遍目标服务页的 `summary`，确认卡片/详情页文案是**独立组织的一句话**、覆盖目标页真正的核心关键词（尤其是页面标题里出现的词），不是简单复制粘贴。
- `storyFeatures`/`highlights`/`faq` 同样不是照抄服务页对应字段——可以取材于同样的真实事实（同一家酒店、同一批合作方），但要用"这类人群会关心什么"的角度重新组织，服务页说的是"我们能做什么"，人群页说的是"这适合你吗、你会得到什么"。
- 三语一起改，不要只改英文——中文不是机械翻译，法文侧重服务标准表述，参照 [[服务页面写作]] 里"中文侧重实操信息、法文侧重服务标准"的分工原则。

## 四、标签联动：给已有字段回填，不新建标签系统

已上线人群的详情页会自动查询并展示"精选目的地/主题游/住宿/体验/相关阅读"——这些板块的数据来自其他 collection 里的标签字段，**大部分字段本来就存在，只是之前没人回填/消费**：

| 内容类型         | 字段                                                                                                                  | 状态                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `accommodations` | `travelFit`（Phase 2C 就有，枚举：`Family`/`Romantic`/`Business`/`Wellness`/`Ski`/`Beach`/`Long Stay`/`Celebration`） | **已经在几乎每份住宿内容里填好**，2026-09-23 之前从未被任何页面消费——现在通过 `getEntriesByTravelStyle` 按 `travelStyleKeys.travelFitTag` 反查 |
| `experiences`    | `travelStyleKeys`（Phase 2C 就有）                                                                                    | 之前全站为空，2026-09-23 回填了 5 条（不是全部 10 条都塞——没有明显匹配的留空）                                                                 |
| `journeys`       | `travelStyleKeys`（2026-09-23 新增字段，形状照抄 experiences）                                                        | 回填了 2 条（4 条里另外 2 条没有明显匹配）                                                                                                     |
| `destinations`   | `travelStyleKeys`（2026-09-23 新增字段）                                                                              | 回填了 7 个（13 个里另外 6 个没有明显匹配）                                                                                                    |
| `journal`        | `relatedTravelStyleKeys`（2026-09-23 新增字段，`content-architecture.md` §7 早就规划过这个口子）                      | 回填了 3 篇（只挑内容上明显相关的，不强行凑数）                                                                                                |

- 查询函数：`src/lib/content.ts#getEntriesByTravelStyle(collection, locale, styleId, travelFitTag?)`——对 `experiences`/`journeys`/`destinations` 按 `travelStyleKeys.includes(styleId)` 过滤，对 `accommodations` 按 `travelFit.includes(travelFitTag)` 过滤（两套字段命名不同，函数内部按 collection 分支，同 `getEntriesByDestination` 的写法）。journal 的 `relatedTravelStyleKeys` **没有**走这个共享函数——它是 journal 自己的正向字段、只有详情页一处消费者，详情页里直接写了一个内存 `filter`，没必要为此扩展共享函数。
- **`travelFit` 是个很宽的标签**（很多住宿同时打了好几个值），详情页对每个板块做了 `RELATED_LIMIT = 6` 的截断，不要去掉这个截断，否则"精选住宿"区块会变成一整页酒店列表。
- 给新内容（新酒店、新体验、新目的地、新文章）打标签时，**允许留空**——不是每条内容都要匹配某个人群，牵强打标签比不打更糟（详情页板块为空时 `RelatedContent` 会自动不渲染，不是 bug）。

## 五、价格——2026-09-23 的教训，全站通用

**这条不只是这个板块的规则，是这次事故之后对全站"起价"类文案的通用纠正：**

- 曾经一次性给 11 个服务/体验页面（含这个维度链接到的 `romantic-travel`、`private-experiences`、`business-vip-assistance`、`family-children-services`）加了"From €X"这类具体数字的价格锚点——**这些数字全部是 AI 自己估的、不是客户确认过的真实价格**，客户反馈后才发现问题：比如婚纱跟拍这类服务实际价格因人而异，写死一个数字反而是误导信息，最后全部撤回。
- **以后任何服务/体验/人群页面，除非客户明确提供了真实确认的价格数字，否则不要自己估算/研究出一个数字写成"from €X"这种确定性表述**。CLAUDE.md"每个服务/体验至少给一个起价量级线索"这条要求，在不确定真实价格的情况下，用"价格需咨询"/"quoted per request"/"sur devis"这类文字表述来满足，不要为了凑一个数字而编造。这次新建的 4 个 `travelStyles` 条目的 `faq`/`highlights` 里都没有写任何具体价格数字，是刻意的。
- 唯一的例外是**转述第三方合作伙伴自己公开的价格**（比如某个合作诊所、酒店官方标价），且经过网上核实、并用"约""起"这类留有余地的措辞、不包装成本站自己的固定报价——即便如此，也优先向客户确认这类数字要不要保留在页面上。

## 六、图片：卡片图和目标页面首图必须一致

- **2026-09-23 发现的真实 bug**：`celebrations` 卡片当时用的是 `service-floral-event`（长桌白花婚宴布置），但它链接到的 `private-experiences.md` 服务页自己的 `image:` 字段却是完全不同的 `service-private-experiences`（暖色调、家常感的秋日烛光餐桌），两张图片主题不搭。现在 `travelStyles` 条目自己的 `coverImage` 就是 `service-floral-event`，`private-experiences.md` 的 `image:` 字段也已经同步改成一致的值——两处图片现在是一致的，`service-private-experiences` 改挪去当 `celebrations` 详情页第一组 `storyFeature` 的配图，没有被弃用。
- 新建或修改任何一个 `travelStyles` 条目时，`coverImage` 优先复用它链接到的服务页自己的 `image:` 字段（如果服务页那张图确实贴切），保持两处视觉一致；如果要换一张更贴切的图，连服务页自己的 `image:` 也一起改，不要只改其中一处。
- `storyFeatures`/`gallery` 需要的配图，优先从站内已注册、主题相关的图里选（这次 4 个条目全部复用了已注册图片，零新增下载）——参考 [[旅游酒店写作]] 的图片来源优先级：本站已有 > Unsplash/Pixabay 新搜索。

## 七、跳转与页面架构决策记录

- 详情页结构（Hero → StoryFeature → highlights → 精选目的地/主题游/住宿/体验/相关阅读 → FAQ → 完整服务链接 → InquiryCTA）已经是实现好的固定模板，新增人群条目不需要重新设计页面结构，写好 frontmatter 数据即可。
- **没有在顶部导航加"Travel Styles"入口**——`Header.astro` 已有 7 个一级导航项，源码注释提过"每加一项都要占宽度"，这次选择用首页卡片 + `/travel-styles/` 列表页 + Footer Quick Links 一条轻量入口来做可达性，没有动一级导航。如果以后要加导航入口，是一个独立的、需要跟客户确认的视觉/信息架构决策，不是这份 skill 范围内的事。
- **没有做**：案例/客户故事模块（全站目前零真实客户案例，通用参考 skill 自己也写了"没有就先不放，不要编"）；行程/目的地/体验详情页上加"适合：亲子·浪漫"反向徽章（交叉引流锦上添花，非核心）；联系表单按人群预填字段（`enquiryType` 和"人群"是两个不同维度，要做需要重新设计表单分支）。这些如果客户后续提出，按 CLAUDE.md"做板块前先想四个问题"的要求先想清楚，再进 plan mode 讨论，不要直接动手。

## 八、验收

- [ ] `description`/`storyFeatures`/`highlights`/`faq` 是不是独立写的，不是抄目标服务页对应字段；有没有覆盖目标页标题里的核心词。
- [ ] `coverImage` 和目标服务页 `image:` 字段是否一致；不一致时按"六"的方法核查、修正。
- [ ] 有没有写死"from €X"这类未经客户确认的具体价格数字——没有真实数据就用"价格需咨询"类文字，不要编数字。
- [ ] 三语（en/zh/fr）是否同步——新建人群条目三语都要有完整文件，不是只写英文。
- [ ] 涉及标签回填的内容（experiences/journeys/destinations/journal），新增内容时要不要打 `travelStyleKeys`/`relatedTravelStyleKeys` 标签——允许留空，不要牵强凑数。
- [ ] `npm run format:check && npm run lint && npm run check && npm run build` 全绿，浏览器里三语言都看一遍首页板块、`/travel-styles/` 列表页、至少一个详情页（确认精选区块不是空的）。
- [ ] 涉及生产部署的，跟客户确认一次再上线——这是新增页面类型的改动，不是小修小补。

## 九、自我更新

这份 skill 最初是 2026-09-23 客户对"补完 4 个已上线人群卡片"这轮反馈后新建的（记录价格/图片一致性/文案独立性三条教训），同一天又经历了一次架构升级（数据文件卡片 → 真正的 Collection + 落地页系统），本次更新把"一、二、六、七"整体重写为新架构，"三、四、五、八"在旧内容基础上补充了新架构下的具体操作方式。以后这个维度再有返工、扩展到更多人群、或者产品架构进一步调整，照 [[服务页面写作]]"自我更新"的方式，把"反馈原话 → 问题所在 → 怎么改"写回对应章节，保持和实际踩过的坑同步，不要停留在写这份 skill 那一刻的认知。
