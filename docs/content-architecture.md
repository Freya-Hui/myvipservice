# 内容架构（Phase 2C）

> 状态：规划文档，供 Phase 2D 及以后的内容录入、页面开发、CMS 接入参考。
> 本文档只设计结构，不代表本阶段已经把这些内容类型全部实现为 Astro 页面或 Content Collection——具体"现状 vs 规划"的区分见每节末尾的「本阶段实现状态」。

## 如何使用本文档

为 10 种内容类型逐一回答：

- 用途
- 是否为独立 Collection
- 是否需要独立详情页 / 列表页
- 核心字段 / 可选字段
- 与其他内容类型的关联
- 多语言策略
- SEO 字段
- 发布状态
- 未来 CMS（Sveltia）中如何编辑

配套文档：分类规范见 [taxonomy.md](./taxonomy.md)，关联关系图见 [content-relationships.md](./content-relationships.md)，URL 规则见 [url-conventions.md](./url-conventions.md)，状态与审核流程见 [content-workflow.md](./content-workflow.md)，图片管理见 [media-library.md](./media-library.md)，命名规则见 [content-naming.md](./content-naming.md)，录入优先级见 [content-roadmap.md](./content-roadmap.md)。

## 内容类型总览

| #   | 内容类型             | 独立 Collection                         | 详情页                    | 列表页               | 多语言方式                      | 本阶段状态                          |
| --- | -------------------- | --------------------------------------- | ------------------------- | -------------------- | ------------------------------- | ----------------------------------- |
| 1   | Destinations         | 是（已存在）                            | 是（已存在）              | 是（已存在）         | 每语言一个文件 + translationKey | 已实现，本阶段加 3 层结构字段       |
| 2   | Accommodations       | 是（已存在）                            | 是（已存在）              | 是（已存在）         | 每语言一个文件 + translationKey | 已实现，本阶段加 taxonomy 字段      |
| 3   | Experiences          | 是（已存在）                            | 是（已存在）              | 是（已存在）         | 每语言一个文件 + translationKey | 已实现，本阶段加分类/关联字段       |
| 4   | Services             | 是（已存在）                            | 是（Phase 2D 起，已实现） | 是（已存在，总览页） | 每语言一个文件（同文件名）      | 已实现，含 10 个服务的详情页        |
| 5   | Travel Styles        | 否，推荐维持数据文件                    | 否（本阶段）              | 否（本阶段）         | 数据文件内嵌四语言字段          | 已实现（Phase 2A.1），规划见下      |
| 6   | Tickets & Events     | 否，暂缓（见第 7 节结论）               | 否（本阶段）              | 否（本阶段）         | 待独立时同 Destinations 模式    | 仅 Services 总览页里的一个入口条目  |
| 7   | Journal              | 规划为独立 Collection（未创建）         | 是（规划）                | 是（规划）           | 每语言一个文件 + translationKey | 未实现，`caseStudies` 为过渡占位    |
| 8   | Client Stories       | 规划为独立 Collection（未创建）         | 是（规划）                | 是（规划）           | 每语言一个文件 + translationKey | 未实现                              |
| 9   | Journey Inspirations | 规划为独立 Collection（未创建）         | 是（规划）                | 是（规划）           | 每语言一个文件 + translationKey | 未实现                              |
| 10  | Media Assets         | 否，数据文件（`image-attributions.ts`） | 不适用                    | 不适用               | 字段内嵌四语言 alt/caption      | 已实现，规划扩展见 media-library.md |

---

## 1. Destinations

**用途**：目的地信息中枢，承载国家/地区/城市/子目的地的介绍，是 Accommodations、Experiences、Journal、Journey Inspirations 的挂载点。

**Collection**：是，已存在（`src/content/destinations`）。

**详情页 / 列表页**：均已存在，本阶段不改动页面。

### 三层结构

不强制每个目的地都要三层，允许国家/地区/城市混合层级共存于同一 Collection：

- **Level 1 — Country**：France、Switzerland、Italy、United Kingdom……本身可以有一条 Destination 记录（`destinationType: 'country'`），也可以只作为 Level 2 记录的隐含归属（通过 `countryCode` 表达），不强制建 Country 记录。
- **Level 2 — Region / City**：Paris、Provence、French Riviera、Burgundy、Normandy、French Alps……最常见的一层，本阶段现有内容都在这一层（`destinationType: 'region'` 或 `'city'`，两者本阶段不强制区分，作为展示提示）。
- **Level 3 — Sub-destination（可选）**：French Riviera 下的 Nice / Cannes / Saint-Tropez / Antibes；French Alps 下的 Courchevel / Megève / Chamonix。只有当某个 Region 需要更细的可预订颗粒度时才建 Level 3 记录。

层级关系通过 `parentKey`（指向父级的 `translationKey`）表达，不通过 slug 或路径推断——slug 只决定 URL，不决定层级；`translationKey` 才是跨语言、跨层级关系的唯一稳定标识。

### 字段设计

已在 `src/content.config.ts` 实现（✅）与规划中但本阶段未实现（⏳）：

| 字段                          | 状态                             | 说明                                                                                                                                               |
| ----------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                       | ✅                               |                                                                                                                                                    |
| `slug`                        | ✅                               | 每语言可独立本地化，见 url-conventions.md                                                                                                          |
| `locale`                      | ✅                               |                                                                                                                                                    |
| `translationKey`              | ✅                               | 跨语言 + 跨层级关系的唯一标识                                                                                                                      |
| `parentKey`                   | ✅（Phase 2C 新增，可选）        | 指向父级 Destination 的 `translationKey`；顶层目的地留空                                                                                           |
| `destinationType`             | ✅（Phase 2C 新增，默认 `city`） | `country` \| `region` \| `city` \| `sub-destination`                                                                                               |
| `countryCode`                 | ✅（Phase 2C 新增，可选）        | ISO 3166-1 alpha-2，如 `FR`，用于按国家分组/未来筛选                                                                                               |
| `region`（大区/大洲）         | ✅                               | 现有的洲级枚举（`Europe`/`Asia`/...），与 `countryCode` 是不同颗粒度，两者并存                                                                     |
| `priority`                    | ✅（Phase 2C 新增，默认 0）      | 排序权重，供未来"同一国家内目的地排序"使用；本阶段列表页仍用 `destinationCountryGroups`（见 site-content.ts）人工排序，`priority` 暂未接入任何页面 |
| `featured`                    | ✅                               | 首页/列表页"精选"开关                                                                                                                              |
| `overview`                    | 复用现有 `description`           | 本阶段不新增同义字段，`description` 即承担 overview 角色                                                                                           |
| `highlights`                  | ✅                               |                                                                                                                                                    |
| `bestTime`                    | ✅                               |                                                                                                                                                    |
| `suggestedStay`               | ✅                               |                                                                                                                                                    |
| `travelNotes`                 | ✅                               |                                                                                                                                                    |
| `coverImage` / `gallery`      | ✅                               | 引用 Media Assets id                                                                                                                               |
| `relatedAccommodationKeys`    | ✅                               |                                                                                                                                                    |
| `relatedExperienceKeys`       | ✅                               |                                                                                                                                                    |
| `relatedJournalKeys`          | ✅（Phase 2C 新增，默认 `[]`）   | 指向未来 Journal Collection 的 `translationKey`；Journal 不存在前始终为空数组                                                                      |
| `seoTitle` / `seoDescription` | ✅                               |                                                                                                                                                    |
| `status` / `draft`            | ✅                               | 发布状态见 content-workflow.md                                                                                                                     |

**隐藏未来扩展目的地**：`status: 'draft'` 即可让某目的地在生产构建中完全不出现，同时在 `astro dev` 下可预览——这是现有机制，未来新增 Level 3 子目的地前可以先用这个状态占位。

**首页与列表页不同排序**：两者已经解耦——列表页排序来自 `destinationCountryGroups`（页面级数据，不在 schema 里），首页排序目前复用同一优先级列表。`priority` 字段为未来"内容作者在 CMS 里直接调整排序，不用改代码"留了口子，但本阶段不接入任何页面逻辑。

---

## 2. Accommodations

**用途**：酒店/别墅/山间木屋等住宿的详情，供 Destinations 和 Experiences 关联展示。

**Collection**：是，已存在。**详情页/列表页**：已存在，本阶段不改动。

### Taxonomy 维度（避免重复分类，见 taxonomy.md）

- **Property Type**（单选，`type` 字段）：Hotel / Villa / Chalet / Apartment / Château / Estate / Resort。单选是因为一个物业只有一种物理形态。
- **Positioning**（多选，`positioning` 字段）：Palace / Luxury / Boutique / Family-Friendly / Design-Led / Private Residence。多选是因为定位常常叠加（如 Design-Led + Boutique）。
- **Travel Fit**（多选，`travelFit` 字段）：Family / Romantic / Business / Wellness / Ski / Beach / Long Stay / Celebration。多选，一个物业可以同时适合多种出行目的。

三者不合并成一个 taxonomy：Property Type 描述"是什么"，Positioning 描述"什么档次/风格"，Travel Fit 描述"适合谁"——语义不同，合并会导致编辑时选项爆炸且难以复用于筛选。

### 字段设计

| 字段                                                                        | 单/多选                       | 状态                                        |
| --------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------- |
| `title` / `slug` / `locale` / `translationKey`                              | —                             | ✅                                          |
| `type`（Property Type）                                                     | 单选                          | ✅（Phase 2C 扩展枚举）                     |
| `destinationKey`                                                            | —                             | ✅                                          |
| `city` / `country`                                                          | —                             | ✅（普通内容字段，非 taxonomy）             |
| `positioning`                                                               | 多选 taxonomy                 | ✅（Phase 2C 新增）                         |
| `travelFit`                                                                 | 多选 taxonomy                 | ✅（Phase 2C 新增）                         |
| `featured`                                                                  | 开关                          | ✅                                          |
| `overview`                                                                  | 复用 `description`            | ✅                                          |
| `servicePerspective`                                                        | —                             | ✅                                          |
| `highlights`                                                                | 列表                          | ✅                                          |
| `suitableFor`                                                               | 列表（自由文本，非 taxonomy） | ✅                                          |
| `familyNotes` / `diningWellness` / `locationNotes`                          | —                             | ✅（`locationNotes` 为 Phase 2C 新增）      |
| `coverImage` / `gallery`                                                    | —                             | ✅                                          |
| `relatedExperienceKeys` / `relatedAccommodationKeys` / `relatedJournalKeys` | —                             | ✅（`relatedJournalKeys` 为 Phase 2C 新增） |
| `seoTitle` / `seoDescription`                                               | —                             | ✅                                          |
| `status` / `draft`                                                          | —                             | ✅                                          |

**明确不加入**（按你的要求）：实时价格、库存、评分、未确认房型数据、未确认地址、未确认儿童政策。这些字段现在和未来都不应该出现在 schema 里，除非未来真的接入了可核实的预订系统。

---

## 3. Experiences

**用途**：私人体验（品鉴、导览、专属通道等），可关联一个或多个目的地、住宿、Travel Style。

**Collection**：是，已存在。**详情页/列表页**：已存在。

### 分类

主分类（单选，`category`）：Art & Culture / Food & Wine / Family / Wellness / Nature / Fashion & Shopping / Celebration / Private Access / Seasonal / Sports（Phase 2C 在原 8 类基础上新增 Seasonal、Sports）。

次分类（多选，`secondaryCategories`，Phase 2C 新增）：同一枚举，允许体验同时归入次要分类而不稀释主分类语义。

### 关联

- 一个主要目的地：`destinationKey`（已存在，单数）
- 多个适用目的地：`destinationKeys`（Phase 2C 新增，复数，用于跨地区体验，如"环法葡萄酒品鉴之旅"）
- 多个住宿：`relatedAccommodationKeys`（已存在）
- 多个 Travel Styles：`travelStyleKeys`（Phase 2C 新增，指向 `travelTypes` 数据文件里的 `id`）
- 多篇 Journal：`relatedJournalKeys`（Phase 2C 新增，Journal 不存在前始终为空）

### 字段设计

| 字段                                                                        | 状态                                     |
| --------------------------------------------------------------------------- | ---------------------------------------- |
| `title` / `slug` / `locale` / `translationKey`                              | ✅                                       |
| `category`                                                                  | ✅（Phase 2C 扩展枚举）                  |
| `secondaryCategories`                                                       | ✅（Phase 2C 新增）                      |
| `destinationKey` / `destinationKeys`                                        | ✅（后者 Phase 2C 新增）                 |
| `travelStyleKeys`                                                           | ✅（Phase 2C 新增）                      |
| `featured`                                                                  | ✅                                       |
| `overview`                                                                  | 复用 `description`                       |
| `highlights`                                                                | ✅                                       |
| `duration`                                                                  | ✅                                       |
| `suitableFor`                                                               | ✅                                       |
| `familySuitable` / `ageNotes`                                               | ✅（`ageNotes` Phase 2C 新增）           |
| `languages`                                                                 | ✅                                       |
| `customisationNotes` / `availabilityNotes`                                  | ✅（`availabilityNotes` Phase 2C 新增）  |
| `coverImage` / `gallery`                                                    | ✅                                       |
| `relatedAccommodationKeys` / `relatedExperienceKeys` / `relatedJournalKeys` | ✅（`relatedJournalKeys` Phase 2C 新增） |
| `seoTitle` / `seoDescription`                                               | ✅                                       |
| `status` / `draft`                                                          | ✅                                       |

**明确不编造**：固定价格、保证可订、官方合作身份、售罄活动可保证获得——与 Tickets & Events 的合规原则一致。

---

## 4. Services

**用途**：公司提供的服务大类总览（当前 10 类，Phase 2D 新增「时尚与购物」），是营销/导航层面的入口，不是逐个可预订的产品。

**Collection**：是，已存在（`src/content/services`）。**是否需要详情页**：**Phase 2D 起需要，已实现**——本文档 Phase 2C 时的"本阶段不需要"结论已被推翻：应用户明确要求（每一项服务都要有详情页，列表页链接需要统一协调），新增 `src/pages/[locale]/services/[slug]/index.astro`，10 个服务 × 4 语言 = 40 个详情页，全部由 `getStaticPaths` 遍历 Collection 生成，不需要手工维护路径列表。详情见 [url-conventions.md](./url-conventions.md#services-现在使用独立详情页phase-2d-更新推翻本文档早前的结论)。**排序/精选**：`order` 已支持排序；`featured` 仍未加（10 类目前平等展示，无需精选态）。

分组：`group`（Phase 2C 新增，可选枚举 `Travel Planning` / `Access & Experiences` / `Personal Support`）——对应第 6 节给出的三组划分。目前仍是字段已加但页面未消费（列表页 9→10 卡片后仍不显拥挤），继续留给未来"服务类别变多、需要分组展示"时使用。

**与 Experiences / Tickets 的区分**：Services 是"我们能做什么"的营销分类（宏观、9 个固定入口）；Experiences 是"具体能预订/参加的单个体验"（微观、可以有几十上百条）；Tickets & Events 未来若独立，将是"具体某场演出/某个可购票项目"（更微观、可能有日期）。三者是营销层→体验层→票务层的递进关系，不是同一层的三种叫法。

### 字段设计

| 字段                                           | 状态                                                                                                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                                        | ✅                                                                                                                                                  |
| `slug`                                         | 仍未加显式字段——详情页路由直接用文件名（`entry.id` 去掉 locale 前缀）当 slug，无需在 frontmatter 里重复一份，见 url-conventions.md                  |
| `locale`                                       | 隐含于文件夹路径，未显式建字段（与 Destinations 不同，见下方说明）                                                                                  |
| `group`                                        | ✅（Phase 2C 新增）                                                                                                                                 |
| `shortDescription`                             | 复用现有 `summary`                                                                                                                                  |
| `fullDescription`                              | 复用现有正文 Markdown body                                                                                                                          |
| `featured`                                     | 未加（本阶段不需要）                                                                                                                                |
| `displayOrder`                                 | 复用现有 `order`                                                                                                                                    |
| `iconKey`                                      | 未加——本阶段用数字索引卡（`01`/`02`……）代替图标，未来如需图标再加                                                                                   |
| `coverImage`                                   | 复用现有 `image`                                                                                                                                    |
| `relatedExperienceKeys` / `relatedJournalKeys` | ✅（Phase 2C 新增）                                                                                                                                 |
| `seoTitle` / `seoDescription`                  | ✅（Phase 2C 新增）                                                                                                                                 |
| `status` / `draft`                             | 只有 `draft`（逐语言翻译占位），无整条目级 `status`——10 类服务都是必须存在的固定入口，不存在"整条隐藏"的需求，所以没有比照 Destinations 加 `status` |

**为什么 Services 没有 `translationKey`**：Destinations/Accommodations/Experiences 的四语言文件可能有不同的 `slug`（本地化 URL），需要 `translationKey` 做语言无关的关联。Services 的四语言文件当前**故意保持同一文件名**（如 `tickets-events.md` 在 en/zh/fr/ru 四个文件夹下同名），文件名本身就是跨语言标识，`translationKey` 是多余的一层。这是有意的简化，不是遗漏。

---

## 5. Travel Styles

见第 8 节的完整讨论——**结论：本阶段维持数据文件（`src/data/site-content.ts#travelTypes`），不建 Collection**。字段设计、独立 Collection 的最小 schema 也在该节给出，供未来升级时参考。

---

## 6. Tickets & Events

见第 7 节的完整讨论——**结论：暂不建独立 Collection，也暂不归并进 Experiences；先维持 Services 总览页里的一个入口条目（Phase 2A.1 已完成），等真实票务内容出现时再按第 7 节给出的字段建独立 Collection**。

---

## 7. Journal

**用途**：编辑向内容（目的地指南、酒店灵感、体验故事、季节性专题等），用于 SEO 长尾流量和品牌叙事，不涉及具体客户隐私。

**Collection**：规划为独立 Collection（`journal`），**本阶段未创建**——现有的 `caseStudies` collection（`src/content/case-studies`）是 Phase 1 时期的占位实现，字段极简（`title`/`summary`/`coverImage`/`order`），目前用于首页 "Journal Preview" 模块的三张占位卡片。它在概念上更接近这里定义的 Journal，而不是下一节的 Client Stories——命名 `caseStudies`是历史遗留，容易和 Client Stories 混淆，**建议未来实现 Journal 时把它重命名为 `journal` 并迁移到本节字段**（迁移说明见下）。

**详情页/列表页**：规划需要两者，本阶段不建。

### 分类（不过多）

Destination Guides / Hotel Inspiration / Private Experiences / Family Travel / Food & Dining / Seasonal Travel / Art & Culture / Fashion & Shopping / Travel Advice / MYVIPSERVICE Stories——10 类，单选，足够覆盖当前业务范围又不至于让编辑难以选择。**不做自由标签**（自由标签容易产生 taxonomy.md 里警告的近义重复问题），如果未来确实需要更细粒度的发现方式，优先考虑给 Journal 加 `relatedDestinationKeys`/`relatedTravelStyleKeys` 驱动的"相关文章"区块，而不是开放标签系统。

### 字段设计（规划）

`title` / `translationKey` / `locale` / `slug` / `category`（上述 10 类单选）/ `excerpt` / `author` / `publishedAt` / `updatedAt` / `coverImage` / `body`（Markdown 正文）/ `relatedDestinationKeys` / `relatedAccommodationKeys` / `relatedExperienceKeys` / `relatedTravelStyleKeys` / `relatedTicketEventKeys` / `seoTitle` / `seoDescription` / `status` / `draft`。

**多语言策略**：与 Destinations 一致——每语言一个文件，`translationKey` 做跨语言关联，允许某语言暂缺（不强制四语言同时首发）。

**从 `caseStudies` 迁移的影响**（仅记录，本阶段不执行）：现有 3 条占位内容（`title`/`summary`/`coverImage`/`order`）字段是新 schema 的子集，直接兼容；需要补齐 `translationKey`/`locale`/`slug`/`category`/`status` 等字段后才能满足新 schema。因为现有内容本来就是占位文字（"Example Journal Entry"），建议届时直接重新起草，而不是"升级"占位数据。

---

## 8. Client Stories

**用途**：匿名化或已获授权的客户案例，用于建立信任，但必须优先保护客户隐私。**不应该**和 Journal 共用一个 Collection——两者审核流程完全不同（Journal 走内容审核，Client Stories 还要走隐私审批，见 content-workflow.md）。

**Collection**：规划为独立 Collection（`clientStories`），**本阶段未创建**。**详情页/列表页**：规划需要两者，本阶段不建。

### 字段设计（规划）

`title` / `translationKey` / `locale` / `slug` / `anonymised`（boolean）/ `destinationKeys` / `travelStyleKeys` / `travellerType` / `duration` / `groupSizeRange` / `clientNeed` / `solution` / `highlights` / `testimonial` / `imageUsageApproved`（boolean）/ `testimonialUsageApproved`（boolean）/ `privacyApprovalStatus` / `coverImage` / `gallery` / `relatedServiceKeys` / `seoTitle` / `seoDescription` / `status` / `draft`。

`privacyApprovalStatus`：`pending` / `approved` / `anonymised-only` / `internal-only` / `rejected`。**只有 `approved` 或 `anonymised-only` 允许出现在生产构建中**——这条规则建议在未来实现时比照 `src/lib/content.ts#isPublished()` 的写法，在同一处函数里加一层判断（`status === 'published' && ['approved','anonymised-only'].includes(privacyApprovalStatus)`），不要在每个页面里各自判断一遍。

---

## 9. Journey Inspirations

**用途**：旅行灵感范例（"像这样的 7 天普罗旺斯之旅"），明确是**灵感展示，不是固定可购买的套餐**——页面必须显著标注 "itinerary for inspiration / fully customisable / price on request / subject to availability"。

**Collection**：规划为独立 Collection（`journeys`），**本阶段未创建**。**详情页/列表页**：规划需要两者，本阶段不建。

### 字段设计（规划）

`title` / `translationKey` / `locale` / `slug` / `destinationKeys` / `duration` / `travelStyleKeys` / `suggestedRoute` / `dayByDay` / `accommodationKeys` / `experienceKeys` / `highlights` / `suitableFor` / `season` / `coverImage` / `gallery` / `seoTitle` / `seoDescription` / `status` / `draft`。

**明确不做**：不加 `price`/`sku`/`bookNow` 之类暗示"可直接购买"的字段——这类字段一旦存在，未来很容易被误用为电商结构，与"灵感展示"的定位冲突。如果未来真的要做"可询价套餐"，应该是一个新的、明确标注价格性质的内容类型，不是给 Journey Inspirations 加字段。

---

## 10. Media Assets

详见 [media-library.md](./media-library.md)。本阶段结论：继续使用数据文件模式（`src/data/image-attributions.ts` + `docs/image-asset-register.md`），不建 Content Collection——媒体资源的核心诉求是"稳定 id + 授权状态"，数据文件已经满足，建 Collection 反而会增加一层与图片本身脱节的元数据维护成本。规划的完整字段与未来 CMS 接管方式见该文档。
