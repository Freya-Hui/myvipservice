# Taxonomy 规范（Phase 2C）

> 配套 [content-architecture.md](./content-architecture.md)。本文档定义"分类"这一类字段（taxonomy）与普通内容字段的区别，以及如何避免同义重复分类。

## 什么是 taxonomy，什么不是

Taxonomy = 从**固定枚举**中选择、用于筛选/分组/未来导航的字段（如 Property Type、Experience Category）。

不是 taxonomy 的例子：`city`、`country`、`highlights`、`suitableFor` 这类自由文本或自由列表——它们描述具体内容，不需要跨条目统一取值，做成枚举反而会限制真实信息的表达（比如 `city` 不该是一个封闭枚举，否则每加一个城市都要改 schema）。

判断标准：**如果这个字段的取值需要在编辑界面里做成"下拉选择"而不是"自由输入"，它才是 taxonomy。**

## 核心规则

1. **taxonomy 使用稳定 key，不用显示名当 key。** 数据库/schema 里存的永远是英文、无空格、kebab-case 或 PascalCase 的稳定标识（如 `family-friendly`），显示给用户看的四语言文本通过 `ui.ts` 或专门的 taxonomy 标签表映射，绝不把"家庭友好"这种中文字符串直接写进 frontmatter 的枚举值里。**例外**：本项目当前 Zod 枚举为了可读性直接用了英文短语作为值（如 `'Art & Culture'`），这是 Phase 1/2A 已定的约定，本阶段沿用，不追溯重构——但新增枚举时统一遵循"英文短语作为稳定 key，四语言显示名交给 `ui.ts` 的 `category.*`/`region.*`/`destinations.country.*` 一类前缀键"这一模式，不再引入第二种 key 风格（如 slug 风格）。
2. **显示名称支持四语言**，通过 `ui.ts` 现有的 `t('category.Art & Culture')` 模式扩展，不新建平行的翻译系统。
3. **不允许编辑者随意创建近义重复分类。** 所有 taxonomy 字段在 Astro 阶段是 Zod `enum`——技术上已经强制"只能选已定义的值，不能手输新值"。未来接入 Sveltia CMS 后，对应字段要配置为 CMS 的 `select`/`list` 控件而不是自由文本框，延续同样的强制力。
4. **谁可以新增 taxonomy 值**：只有对 `src/content.config.ts` 有提交权限的人（即当前能改代码的角色）。内容编辑者（未来 CMS 用户）**不能**新增分类值，只能从已有列表中选——新增分类是"改结构"，需要过一遍第 5 条的命名规范检查，不是日常内容录入操作。
5. **命名规范**：见下方"命名与去重清单"。
6. **归档规则**：taxonomy 值一旦被内容引用过，不能直接删除（会导致已发布内容的这个字段失效或历史记录丢失枚举含义）。需要下线一个分类值时：
   - 先把所有引用该值的内容迁移到替代分类（记录在该次改动的 commit message 里）；
   - 确认零引用后，再从枚举里移除；
   - 不要保留"僵尸枚举值"（没人用但也没删除）——每次改 schema 顺手检查一遍是否有可以清理的。
7. **合并规则**：发现两个 taxonomy 值实际语义重复（如未来不小心同时有了 `Fashion` 和 `Fashion & Shopping`）：选保留语义更完整、覆盖面更准确的那个作为唯一值，迁移所有引用后移除另一个，在 `taxonomy.md` 本文档的变更记录里注明原因，避免同一个错误重复发生。

## 命名与去重清单

新增 taxonomy 值前，先检查是否已有语义覆盖的值，尤其警惕以下几类重复：

| 容易重复的方向 | 已有的正确值                                                                               | 不要再新增                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 家庭相关       | `Family`（Experience Category）/ `Family`（Travel Fit）/ `Family Journeys`（Travel Style） | `Families`、`Family Travel`、`Family-Oriented` 等同义变体                                                                                                                            |
| 餐饮相关       | `Food & Wine`                                                                              | `Culinary`、`Gastronomy`、`Food`（单独）——一律并入 `Food & Wine`                                                                                                                     |
| 档次形容词     | `Luxury`（Positioning）、`Palace`（Positioning）                                           | `Premium`、`Exclusive`、`High-End` 这类无实质区分度的同义词，除非能明确定义它与 `Luxury`/`Palace` 的边界差异，否则不新增                                                             |
| 城市短途出行   | 用 `destinationType: 'city'` + 具体 Destination 表达，不做单独 Travel Style                | `City Break`、`Urban Escape`、`City Journey`——这类概念在本项目里应该靠"选择一个城市目的地"来表达，而不是再建一个横向 taxonomy 分类，否则会和 Destinations 本身的城市列表产生双重维护 |

新增任何 taxonomy 值时，先搜索本文档 + `src/content.config.ts` 里所有 `z.enum(...)`，确认没有语义重叠，再决定新增。

## 当前 taxonomy 一览

### Property Type（Accommodations，单选，字段 `type`）

`hotel` / `villa` / `chalet` / `apartment` / `château` / `estate` / `resort`

### Positioning（Accommodations，多选，字段 `positioning`）

`Palace` / `Luxury` / `Boutique` / `Family-Friendly` / `Design-Led` / `Private Residence`

### Travel Fit（Accommodations，多选，字段 `travelFit`）

`Family` / `Romantic` / `Business` / `Wellness` / `Ski` / `Beach` / `Long Stay` / `Celebration`

### Experience Category（Experiences，单选主分类 + 多选次分类，字段 `category` / `secondaryCategories`）

`Art & Culture` / `Food & Wine` / `Family` / `Wellness` / `Nature` / `Fashion` / `Celebration` / `Private Access` / `Seasonal` / `Sports`

> 显示文案用 "Fashion & Shopping" 更贴合业务描述，但当前 Zod 枚举稳定值沿用 Phase 2A 已定的 `'Fashion'`——四语言显示名可以在 `ui.ts` 里写成完整的 "Fashion & Shopping"，不需要为了改文案而改枚举值（改枚举值="改 key"，属于结构变更，见第 4 条）。

### Destination Region（Destinations，单选，字段 `region`，洲级颗粒度）

`Europe` / `Asia` / `Middle East` / `Indian Ocean` / `Americas` / `Africa`

### Destination Type（Destinations，单选，字段 `destinationType`，层级颗粒度，Phase 2C 新增）

`country` / `region` / `city` / `sub-destination`

### Services Group（Services，单选，字段 `group`，Phase 2C 新增，可选）

`Travel Planning` / `Access & Experiences` / `Personal Support`

### Travel Styles（数据文件，非 Zod 枚举，`src/data/site-content.ts#travelTypes`，字段 `id`）

`family-journeys` / `romantic-escapes` / `art-culture` / `food-wine` / `celebrations` / `business-vip` / `fashion-shopping` / `wellness-retreats` / `ski-alpine` / `coastal-yacht` / `multi-generational` / `long-stay-europe` / `private-small-groups` / `children-focused` / `summer-camp-support` / `multi-city-europe`

这组 `id` 已经遵循 kebab-case 稳定 key 规范，可以直接作为未来 `travelStyleKeys` 关联字段（Experiences 等）引用的值，不需要改名。

### Journal Category（规划中，未实现）

`Destination Guides` / `Hotel Inspiration` / `Private Experiences` / `Family Travel` / `Food & Dining` / `Seasonal Travel` / `Art & Culture` / `Fashion & Shopping` / `Travel Advice` / `MYVIPSERVICE Stories`

### Media Asset Category（数据文件，规划扩展，见 media-library.md）

`Destination` / `Accommodation` / `Experience` / `Lifestyle` / `Family` / `Food` / `Transportation` / `Events` / `Editorial` / `Team` / `Brand`

## 变更记录

- 2026-08-06（Phase 2C）：初始版本。
