# 内容状态与审核流程（Phase 2C）

> 规划面向未来 Sveltia CMS 的工作流。**本阶段不接入 CMS，也不修改现有的发布状态实现**——现有的两态模型（`status: 'published'|'draft'` + 逐语言 `draft: boolean`）继续照常运行，本文档只定义未来扩展到多态审核流程时的目标设计，以及现状与目标之间的映射关系。

## 现状（已实现，不改动）

- `status: 'published' | 'draft'`（整条内容级）：`draft` 状态在生产构建中完全排除（见 `src/lib/content.ts#isPublished()`），在 `astro dev` 下可预览。
- `draft: boolean`（逐语言）：内容已发布，但这一语言的文案是占位翻译，页面上会显示"译文草稿"角标，不影响构建。

这两个状态本阶段继续沿用，不合并、不重写。

## 目标模型（规划，供未来 CMS 阶段实现）

### 内容状态（替代/扩展现有 `status` 字段）

`draft` → `in-review` → `approved` → `published`，另有 `archived`（下线但保留历史记录，不在任何列表页出现，但页面本身可能仍可通过直接 URL 访问，用于处理"这条内容曾经存在过"的 SEO/链接一致性问题——具体是否保留可访问性由内容类型决定，Client Stories 一类涉及隐私的内容 `archived` 应该直接不可访问）。

与现有二态模型的映射：现有 `status: 'draft'` ≈ 目标模型的 `draft`/`in-review`/`approved` 三态合并（因为现在没有区分"没写完"和"写完等审核"和"审核通过等发布"）；现有 `status: 'published'` ≈ 目标模型的 `published`。**升级路径**：届时给 schema 加一个新的多值枚举字段（如 `reviewStatus`），保留旧的 `status` 字段做向后兼容的构建期开关（`published` 才可能出现在生产构建，`reviewStatus` 只影响 CMS 内部的编辑态展示），不是删除重建。

### 翻译状态（新增，规划中，当前无对应实现）

`not-started` → `machine-draft` → `human-draft` → `in-review` → `approved`，另有 `outdated`。

- `not-started`：这个语言完全没有内容（当前做法是"至少给一个占位草稿"，`not-started` 是未来允许"暂缺某语言"时才需要的状态）。
- `machine-draft`：AI/机器翻译生成，未经人工核对。
- `human-draft`：人工写就或人工修订过机器翻译，但未走审核。
- `in-review` / `approved`：进入人工审核流程。
- `outdated`：**原文（通常是英文主稿）修改后，其他语言自动被标记为 `outdated`**——这条规则的实现方式规划为：内容的英文版本有一个 `updatedAt` 时间戳，非英文版本各自记录"翻译时对应的源版本时间戳"，构建/CMS 读取时比较两者，源版本更新晚于翻译记录的版本即视为 `outdated`，无需人工手动维护这个状态位。本阶段不实现比较逻辑，只记录设计方向。

### 硬性规则

1. **AI 翻译不得自动标记为 `published`**——机器翻译产出天然是 `machine-draft`，必须经过人工提升到 `human-draft`/`approved` 才能进入生产构建可见范围。这条规则应该在未来的翻译流程工具（无论是脚本还是 CMS 插件）里强制，不能只是文档约定。
2. **只有 `approved` 状态的内容允许生产发布**——即目标模型里 `reviewStatus === 'approved'` 是 `status: 'published'` 的必要条件之一，两个状态字段共同把关，不是二选一。
3. **Client Stories 需要单独的隐私审批**，见下节，与内容审核状态相互独立、都要满足。
4. **图片需要单独的授权状态检查**，见 [media-library.md](./media-library.md#usagestatus-生命周期)，同样独立于内容审核状态。

## Client Stories 隐私审批（规划）

`privacyApprovalStatus`：`pending` / `approved` / `anonymised-only` / `internal-only` / `rejected`。

**只有 `approved` 或 `anonymised-only` 允许公开**——这是比普通内容审核更严格的门槛，两者都满足才能出现在生产构建：
`(reviewStatus === 'approved') AND (privacyApprovalStatus IN ('approved', 'anonymised-only'))`

建议未来实现时把这条判断也收敛到一个共享函数里（参照现有 `isPublished()` 的写法），不要在每个使用 Client Stories 的组件里各自判断一遍——这是 [content-relationships.md](./content-relationships.md) 里"关系解析走共享工具函数"同一条原则在状态判断上的延伸。

## 图片授权检查（规划，衔接现状）

现有 `image-attributions.ts` 已经有 `usageStatus` 字段（`temporary` 等），本阶段沿用；完整的生命周期设计见 [media-library.md](./media-library.md)。内容发布前的检查清单应包含"这条内容引用的所有图片 `usageStatus` 是否都不是 `expired`/`restricted`"，本阶段仍是人工检查（如 Phase 1/2A.1 报告里的做法），自动化校验脚本留待内容量增长后再建。

## 面向 Sveltia CMS 的适配设想（规划，不实现）

Sveltia CMS 的 workflow 编辑器支持类似 `draft` → `review` → `ready` 的内置状态机（Git 分支/PR 驱动）。未来接入时的大致对应关系：

- CMS 的 `draft` 分支状态 ↔ 本文档的 `draft`/`in-review`
- CMS 的 `pending_review` ↔ 本文档的 `in-review`
- CMS 合并到生产分支 ↔ 本文档的 `approved` + `status: published` 同时满足后触发的构建

具体接入方式（Git Gateway vs GitHub OAuth 等）已在 Phase 0 的 [cms-comparison.md](./cms-comparison.md) 决定使用 Sveltia CMS + GitHub OAuth，本文档不重复，只强调：**多态审核流程是内容 schema 设计的一部分，不依赖某个具体 CMS 产品**——即使最终不用 Sveltia，本文档定义的状态模型依然成立。
