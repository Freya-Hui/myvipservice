# 内容 Roadmap（Phase 2C）

> 配套 [content-architecture.md](./content-architecture.md)。本文档只给录入优先级和最低量级建议，**不是本阶段要完成的任务**——Phase 2C 不新增大量 demo 内容，这里列的是未来内容录入阶段（Phase 2D 及以后）的路线图。

## 现有内容基线（截至 Phase 2A.1）

- Destinations：6 条（France 4：Paris/French Riviera/Provence/French Alps；Switzerland 1：Geneva；Asia 1：Japan，非精选）
- Accommodations：3 条
- Experiences：4 条
- Services：10 类，均已有独立详情页（Phase 2D 起，总览性质，非逐条录入型内容，视为已完成）
- Journal / Client Stories / Journey Inspirations：0 条（Collection 尚未创建，仅 3 条 `caseStudies` 占位卡片）

## Launch Content（建议最低上线量）

不要求一次性达到，按下方"录入优先级"分批进行：

| 内容类型             | 建议最低量 | 现有            | 缺口                                                                      |
| -------------------- | ---------- | --------------- | ------------------------------------------------------------------------- |
| France 目的地        | 8–12       | 4               | 4–8                                                                       |
| 其他欧洲国家目的地   | 6–10       | 1（Geneva）     | 5–9                                                                       |
| 住宿                 | 10–20      | 3               | 7–17                                                                      |
| 私人体验             | 10–15      | 4               | 6–11                                                                      |
| 票务与活动内容       | 5–10       | 0               | 5–10（前提：先完成第 7 节 Tickets & Events 独立 Collection 的判断，见下） |
| Journal              | 6–10       | 0（占位不计入） | 6–10                                                                      |
| Journey Inspirations | 3–5        | 0               | 3–5                                                                       |
| 匿名客户案例         | 2–4        | 0               | 2–4                                                                       |

## 录入优先级（分批，不要求一次全部完成）

### 第一批：补齐 France 核心目的地

France 是核心市场，且已有 3 个可关联的住宿/体验都挂在法国目的地下——优先把 France 从 4 个补到 8-12 个，参考本次给出的建议列表：Versailles、Champagne、Normandy、Loire Valley、Burgundy、Lyon、Courchevel、Megève、Chamonix、Bordeaux（French Riviera/Monaco 可作为 Level 3 子目的地细化，如 Nice/Cannes/Saint-Tropez，视是否已有可关联的独立内容决定要不要拆）。

**理由**：Destinations 是其他所有内容类型的挂载点（见 [content-relationships.md](./content-relationships.md)），法国目的地基数不够会限制后续住宿/体验/Journal 内容的可关联对象。

### 第二批：补齐 Switzerland、Italy 目的地 + 对应住宿

按第二、第三优先级（Switzerland: Lausanne/Montreux/Gstaad/St. Moritz/Zermatt/Lucerne/Zurich；Italy: Milan/Lake Como/Venice/Florence/Tuscany/Rome/Amalfi Coast/Sicily）补目的地，同时给已有和新增目的地各配 1-2 个住宿——**目的地和住宿最好同批推进**，避免出现"有目的地介绍但点进去空空如也"的空壳页面（现有 `EmptyState` 组件已经处理了这种情况的展示，但内容体验上仍然建议避免）。

### 第三批：私人体验补齐 + Travel Styles 关联回填

体验数量补到 10-15 条后，回头给第一、二批的体验和目的地补上 `travelStyleKeys`（Phase 2C 新增字段）关联，让 Travel Styles 首页模块未来可以升级为"点进去看这个风格下有哪些体验/住宿"的真实列表页（见 [content-architecture.md](./content-architecture.md#5-travel-styles)）。

### 第四批：United Kingdom + 其他欧洲补充

London、Cotswolds、Edinburgh，以及 Spain/Portugal/Greece/Austria/Nordic Countries 里挑 2-3 个有实际业务基础的地方——这一批优先级低于前三批，因为当前品牌定位是"France 为核心、欧洲为补充"，UK/其他欧洲国家不需要在早期就做到和 France 同等密度。

### 第五批：Tickets & Events

**前提**：先确认是否已经有真实、可核实的票务合作渠道（不是先建内容结构再找业务）。一旦有真实票务信息，按 [content-architecture.md](./content-architecture.md#6-tickets--events) 第 7 节的独立 Collection 字段设计录入，仍然遵守"不承诺保证获取"的合规底线。

### 第六批：Journal

优先写与已有目的地/住宿/体验强相关的文章（"如何规划普罗旺斯 5 日行程"这种能直接关联到已发布 Destinations/Experiences 的内容），不要写与站内任何内容都无关联的孤立文章——Journal 的价值很大一部分来自和其他内容类型的相互引流。

### 第七批：Journey Inspirations + Client Stories

放在最后，因为两者都需要前面批次的 Destinations/Accommodations/Experiences 作为素材基础（Journey Inspirations 直接引用 `accommodationKeys`/`experienceKeys`），Client Stories 还额外需要真实客户的隐私授权流程（走 [content-workflow.md](./content-workflow.md#client-stories-隐私审批-规划) 的审批），不是内容团队能单方面加速的环节。

## Post-Launch（launch 完成后持续进行，无严格顺序）

- 扩展更多欧洲地区（Level 3 子目的地为主，如已上线地区下细分具体城镇）
- 增加真实住宿（替换/补充早期可能存在的占位性描述）
- 增加季节性票务内容（配合 `eventDate`/`dateRange` 字段，每季度更新一批）
- 增加客户案例（持续积累，不设终点）
- 增加四语言正式内容（当前 zh/fr/ru 大量是"草稿"标记，Post-Launch 阶段逐步转正）
- 增加专题 Journal（结合季节、节日、目的地专题策划，非一次性任务）

## 明确不在本 Roadmap 范围内

CMS 接入、表单后端、邮件发送、正式部署、DNS/域名——这些是工程/运营任务，不是内容录入任务，已经在 Phase 2C 的工程限制里明确排除，不在这里重复安排优先级。
