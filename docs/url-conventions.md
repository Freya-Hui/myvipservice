# URL 规范（Phase 2C）

> 配套 [content-architecture.md](./content-architecture.md)、[content-naming.md](./content-naming.md)。目标：URL 一旦发布就要长期稳定，未来接入 CMS 或新增内容类型时不需要大规模改路由。

## 总原则：所有 Collection 使用扁平路径，不按父级层级嵌套

| 内容类型                         | URL 模式                                                | 层级                              |
| -------------------------------- | ------------------------------------------------------- | --------------------------------- |
| Destinations                     | `/{locale}/destinations/{slug}/`                        | 扁平（**不**按 `parentKey` 嵌套） |
| Accommodations                   | `/{locale}/accommodations/{slug}/`                      | 扁平                              |
| Experiences                      | `/{locale}/experiences/{slug}/`                         | 扁平                              |
| Services                         | `/{locale}/services/{slug}/`（独立详情页，Phase 2D 起） | 扁平                              |
| Travel Styles（规划）            | `/{locale}/travel-styles/{slug}/`                       | 扁平                              |
| Tickets & Events（规划，若独立） | `/{locale}/tickets-events/{slug}/`                      | 扁平                              |
| Journal（规划）                  | `/{locale}/journal/{slug}/`                             | 扁平                              |
| Client Stories（规划）           | `/{locale}/client-stories/{slug}/`                      | 扁平                              |
| Journey Inspirations（规划）     | `/{locale}/journeys/{slug}/`                            | 扁平                              |

### 是否让 Destination 使用父级路径——结论：不用

你给的示例里 Destinations 用了 `/en/destinations/france/paris/` 这种按国家嵌套的路径。**本文档建议保持现有的扁平实现 `/en/destinations/paris/`，不改成嵌套路径**，原因：

1. **URL 稳定性 vs 内容层级是两回事。** `parentKey` 描述的是内容语义上的归属，这个归属未来可能调整（比如一个 Level 3 子目的地被重新归类到另一个 Level 2 地区）——如果 URL 里编码了父级路径，调整归属就意味着 URL 必须跟着变，直接违反"URL 必须稳定"这条硬性要求。扁平 URL 把"内容怎么组织"和"网址长什么样"彻底解耦。
2. **当前内容规模不需要靠路径防止 slug 冲突。** MYVIPSERVICE 是精品目的地列表（几十个量级，不是上千个 OTA 式城市库），`slug` 全局唯一完全够用，不需要用路径前缀分隔命名空间。
3. **现有实现已经是扁平的（Phase 2A 上线、Phase 2A.1 又做了大量测试）**，本阶段的工程限制明确要求"不要改动现有路由，除非发现结构性问题"——扁平路径本身不是结构性问题，反而是更稳的选择，所以维持现状。
4. 国家分组的用户体验需求（"列表页按国家分区展示"）已经通过 `destinationCountryGroups` 在列表页里实现，不需要靠 URL 结构来表达分组。

**因此本文档在这一点上不采用示例路径，采用当前实现的扁平形式**——这是唯一一处与你给出的示例不同的地方，特此说明原因；其余内容类型的示例路径（`/accommodations/{slug}/`、`/journal/{slug}/` 等）本身已经是扁平的，直接采纳。

### Services 现在使用独立详情页（Phase 2D 更新，推翻本文档早前的结论）

本文档在 Phase 2C 时曾建议"Services 本阶段不建独立详情页，用 `/services/#{slug}` 锚点即可"。Phase 2D 应用户明确要求（每一项服务都要有详情页，且列表页链接需要统一、协调）推翻了这一结论：新增 `src/pages/[locale]/services/[slug]/index.astro` 动态详情页，`getStaticPaths` 直接遍历 `services` Collection 生成 10×4 = 40 个页面。

Services 的 slug 在四语言下保持一致（同文件名，见 content-naming.md），所以详情页的语言切换不走 `getDetailSwitchUrl`（那是给 translationKey 跨语言、slug 可能不同的 Destinations/Accommodations/Experiences 用的），而是扩展了 `getStaticLocaleHref`（见 `src/i18n/routes.ts`）：识别 `services/{slug}` 路径直接保留、替换 locale 段即可，不需要额外的详情页专属语言切换逻辑。

Hotel & Villa Reservations、Tailor-Made Travel Planning 两个优先级最高的服务详情页额外嵌入了关联内容（前者嵌入真实 Accommodations 预览网格，后者嵌入 Travel Styles 精选卡片），其余 8 个服务维持"正文 + 图片 + 咨询 CTA"的通用模板，不强行为每个服务都找关联内容源——没有真实数据源的服务，硬塞一个空的关联区块比不放更糟。

## Slug 命名规则

- 全小写、连字符分隔（kebab-case），如 `french-riviera`、`demo-hotel-paris`。
- **URL 中不使用重音符号/非 ASCII 字符**，即使是法语内容——`Côte d'Azur` 的 slug 写成 `cote-dazur` 或直接沿用地名的通用英文写法（如 `french-riviera`），重音符号只出现在 `title` 展示文本里，不进 slug，避免不同浏览器/CMS 对 URL 编码处理不一致的问题。
- 不含空格、下划线、大写字母。
- **四语言 slug 允许独立本地化**——这已经是现有实现（Phase 2A 起每个语言文件的 `slug` 字段独立设置），本阶段确认延续为正式规范：例如英文 `slug: 'french-riviera'`、法语 `slug: 'cote-dazur'` 是允许的，只要通过 `translationKey`（详见下条）能正确关联。
- `translationKey` **必须语言无关**，四语言文件共享同一个 `translationKey` 值，且这个值本身不用于生成 URL、不展示给用户，只在内部关联逻辑（`getEntryByTranslationKey`、语言切换回退等）里使用。命名规则见 [content-naming.md](./content-naming.md)。

## Redirect 规则

Astro 原生支持在 `astro.config.mjs` 里配置静态 `redirects` 映射（构建期生成带 meta-refresh + canonical 的重定向页面），这是本项目 slug 变更后保留旧链接的机制，**本阶段不新增任何 redirect 条目**（没有已发布内容改过 slug），但流程约定如下：

1. 修改一个已发布内容的 `slug` 前，先确认这个内容此前是否已经上线过（`status: 'published'` 且已经过至少一次生产构建）——未上线过的内容随便改，不需要 redirect。
2. 如果已上线，在 `astro.config.mjs` 的 `redirects` 里补一条 `'/{locale}/{collection}/{旧slug}/': '/{locale}/{collection}/{新slug}/'`，四个语言分别处理（每个语言的旧 slug 可能不同）。
3. redirect 条目长期保留，不做"过一段时间自动清理"——静态重定向页面成本极低，没必要为了"整洁"冒断链风险。
4. 优先避免真的需要改 slug：`slug` 一旦发布就当作稳定契约对待，只有明显拼写错误或严重 SEO 问题才改。

## 与 CMS 接入的关系

未来接入 Sveltia CMS 后，编辑者在 CMS 里改的是 `slug` 这个 frontmatter 字段，本文档的规则（ASCII kebab-case、四语言独立、修改需走 redirect 流程）需要通过 CMS 的字段说明文本或校验规则重申，防止非技术编辑者随手打中文/空格进 `slug` 字段。这是留给 CMS 接入阶段的工作，本阶段只是把规则写清楚。
