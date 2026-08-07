# 内容命名规范（Phase 2C）

> 配套 [url-conventions.md](./url-conventions.md)、[taxonomy.md](./taxonomy.md)。**文件名、`translationKey`、slug、taxonomy key 一律不使用空格、中文或其他特殊符号**——这是本文档最上位的规则，下面每一节都是它的具体展开。

## 文件命名规范

- 路径模式：`src/content/{collection}/{locale}/{slug}.md`，如 `src/content/destinations/fr/provence.md`。
- 文件名与该文件 frontmatter 里的 `slug` 字段保持一致（现有实现的隐性约定，本阶段确认为正式规范）——避免"文件名叫 A，`slug` 字段却是 B"这种容易迷惑的不一致。
- 文件名本身只用于文件系统组织，**从不被代码逻辑依赖**（Astro Content Layer 的 `generateId` 用的是 frontmatter 的 `slug` 字段，不是文件名，见 `src/content.config.ts#localeSlugId`）——所以理论上文件名可以和 slug 不同，但为了人工可读性，规范要求两者一致。
- 例外：`services` collection 四语言文件**同名**（无独立本地化 slug，见 [content-architecture.md](./content-architecture.md#4-services) 的说明），如 `src/content/services/fr/tickets-events.md`，文件名不跟随法语 slug 本地化。

## `translationKey` 命名规范

格式：`{collection单数}-{国家/大区}-{具体标识}`，全小写 kebab-case，全部使用英文，四语言文件共享同一个值。

示例（与你给出的示例一致）：

```
destination-france-paris
accommodation-france-paris-example-hotel
experience-france-paris-private-museum
service-tickets-events
```

**当前实现的现状说明**：现有内容的 `translationKey` 实际写法更短（如 `paris`、`demo-hotel-paris`、`demo-alpine-wellness-retreat`），没有加 `destination-`/`accommodation-` 前缀，也没有始终包含国家名。这是 Phase 2A 定下的既有约定，**本阶段不做批量重命名**（改 `translationKey` 会牵动所有引用它的关系字段，属于大范围内容迁移，超出"规划阶段"范围）。规范上的选择：

- **未来新内容**建议采用本文档给出的带前缀完整格式（更不容易跨 Collection 撞车，比如 `experience` 和 `journal` 都可能有一个关于"Paris private museum"的条目，加前缀能区分）。
- **不强制迁移现有内容**——现有 `translationKey` 在各自 Collection 内部已经唯一，没有实际冲突问题，迁移的收益低于风险。
- 如果未来真的出现跨 Collection 命名冲突（目前没有），再评估是否值得批量迁移，并按 [url-conventions.md](./url-conventions.md#redirect-规则) 的 redirect 流程处理。

## Slug 命名规范

见 [url-conventions.md](./url-conventions.md#slug-命名规则) 的完整规则，此处只重复要点：全小写 kebab-case、ASCII 字符、四语言可独立本地化、不含重音符号。

## 图片命名规范

延续 Phase 1 起的既有约定（`docs/image-asset-register.md` 已经在用）：

- 文件名：`{类型}-{国家/地区}-{具体标识}.jpg`，如 `destination-french-alps.jpg`、`service-hotels-villas.jpg`。
- `image-attributions.ts` 里的 `id` 字段与文件名（去掉扩展名）保持一致。
- 全小写、连字符分隔，不含空格。

## Taxonomy key 命名规范

见 [taxonomy.md](./taxonomy.md#核心规则) 第 1 条。要点：稳定 key 用英文短语或 kebab-case（本项目当前两种风格并存——Zod 枚举用英文短语如 `'Art & Culture'`，数据文件用 kebab-case 如 `'family-journeys'`——新增值时跟随所在字段已有的风格，不要在同一个字段里混用两种风格）。

## 内容标题（`title`）规范

- 使用目的地/物业/体验的**通用可识别名称**，不堆砌营销形容词（不写"Luxurious Amazing Paris Getaway"，写"Paris"）——形容词属于 `description`/`overview`，不属于 `title`。
- 与官方名称保持一致的大小写和拼写（如 `French Riviera` 而非 `french riviera` 或 `French Rivera`）。
- 四语言标题各自使用该语言的通用译名，不做字面直译（如中文用"法国里维埃拉"而非逐字翻译"法国的里维埃拉海岸"）。

## SEO 标题（`seoTitle`）规范

- 与 `title` 不强制相同，但要保持可辨识的关联（不能文不对题）。
- 建议格式：`{内容标题} | MYVIPSERVICE`，在页面 `<title>` 标签里给出品牌上下文，与现有 `Seo.astro` 组件的既有拼接逻辑一致（未强制要求内容作者自己拼品牌名，缺省时组件负责补全——`seoTitle` 字段本身允许留空，此时用 `title` 兜底）。
- 长度建议控制在 60 字符以内（英文），中/日/韩文字符按显示宽度通常等价于拉丁字符的 1.7-2 倍，中文标题建议控制在 30 字以内，避免搜索结果页被截断。
- `seoDescription` 同理，建议 120-155 字符（英文）/ 70-80 字（中文），不强制校验，作为编辑指引。

## 文件名/字段值的通用禁止项

- 不含空格（用连字符）
- 不含中文或其他非拉丁字符（`translationKey`/`slug`/taxonomy key/图片文件名/Markdown 文件名全部适用；`title`/`description` 等展示型字段不受此限，本来就应该是对应语言的文字）
- 不含特殊符号（`/`、`#`、`?`、`&`、`%` 等 URL 保留字符，以及引号、括号）
- 不以数字开头（部分构建工具/URL 处理对数字开头的路径段有边缘情况问题，统一规避）
