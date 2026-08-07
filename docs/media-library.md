# Media Assets 图片资源库（Phase 2C）

> 配套 [content-architecture.md](./content-architecture.md#10-media-assets)。**结论：继续使用数据文件模式，不建 Content Collection**——见下方"为什么不建 Collection"。

## 现状（已实现，`src/data/image-attributions.ts`）

```ts
export interface ImageAttribution {
  id: string;
  src: string; // 本地路径，/public 下，从不热链接原图
  sourceUrl: string;
  sourceName: string;
  author: string;
  license: string;
  usageStatus: 'temporary' | 'licensed' | 'pending-approval';
  altByLocale: Record<Locale, string>; // 四语言，Phase 2C 起
  notes?: string;
}
```

配套人读登记表 `docs/image-asset-register.md`，两者要求手工保持同步（Phase 1 起的约定）。`getImage(id)` 查不到会抛错（构建期发现问题），`getImageSafe(id, fallback)` 查不到则回退到默认图（避免一条内容的坏图片 id 拖垮整个构建）。

## 规划的完整字段（未实现，供未来扩展参考）

| 字段                | 现状                     | 规划                                                                                                                                                                                                         |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                | ✅                       | —                                                                                                                                                                                                            |
| `filePath`          | ✅（现名 `src`）         | 建议保留现名，不做无意义改名                                                                                                                                                                                 |
| `assetType`         | 未加                     | 图片/未来可能的视频，本阶段全部是图片，暂不需要这个字段                                                                                                                                                      |
| `category`          | 未加                     | Destination / Accommodation / Experience / Lifestyle / Family / Food / Transportation / Events / Editorial / Team / Brand——用于未来媒体库的筛选浏览，内容量小的现阶段用文件名+注释就能人工管理，暂不新增字段 |
| `title`             | 未加                     | 现有 `notes` 字段已经承担类似的人读说明作用                                                                                                                                                                  |
| `altByLocale`       | ✅（已修复，见下方说明） | 由 Phase 2C 补齐                                                                                                                                                                                             |
| `captionByLocale`   | 未加                     | 当前没有任何页面在图片下方展示说明文字，暂无需求                                                                                                                                                             |
| `photographer`      | ✅（现名 `author`）      | 保留现名                                                                                                                                                                                                     |
| `sourceUrl`         | ✅                       | —                                                                                                                                                                                                            |
| `license`           | ✅                       | —                                                                                                                                                                                                            |
| `usageStatus`       | ✅                       | 见下方生命周期，规划增加 `restricted`/`expired` 两个值                                                                                                                                                       |
| `usageRestrictions` | 未加                     | 现在都是 Unsplash License（几乎无限制），等真正出现有限制的授权图片再加                                                                                                                                      |
| `expiryDate`        | 未加                     | 见下方"版权到期提醒"                                                                                                                                                                                         |
| `linkedContentKeys` | 未加                     | 见下方"图片替换"                                                                                                                                                                                             |
| `notes`             | ✅                       | —                                                                                                                                                                                                            |

### 已修复：`alt` 已改为四语言（`altByLocale`）

现有所有图片的 `alt` 文本原本都是英文，中/法/俄文页面的屏幕阅读器用户看到的图片替代文字也是英文——这是 Phase 1 遗留的简化，Phase 2C 发现后随即修复：`ImageAttribution.alt: string` 改为 `altByLocale: Record<Locale, string>`，13 张图片全部补齐四语言翻译，`Gallery`/`ContentCard`/`Hero`/`AccommodationFeature`/`ExperienceFeature`/`JournalPreview` 等全部渲染点及其上游页面同步改为传入 `locale` 并读取 `image.altByLocale[locale]`。已在浏览器里验证 zh/fr/ru 三语言页面均正确渲染各自语言的 alt 文本。

## `usageStatus` 生命周期

`temporary`（当前 Unsplash 占位图的状态）→ `pending`（已联系摄影师/图库，等待授权确认，规划新增值，语义等同现有 `pending-approval`，此处统一措辞）→ `approved`（内容/法务确认可用，但可能还没签最终授权协议）→ `licensed`（已获正式授权，可长期使用）。另有两个独立分支：`restricted`（授权但有使用限制，如仅限官网首页、不可用于广告投放——规划新增）、`expired`（授权到期，规划新增，需要立即换图或续约）。

**版权到期提醒**：`expiryDate`（规划字段）配合未来一个简单的构建期检查脚本（不是本阶段实现）——比较 `expiryDate` 与当前日期，临近或已过期的条目在 `astro build` 时输出警告（不阻断构建，只提醒）。本阶段仍是人工检查 `docs/image-asset-register.md` 里的"后续替换计划"章节。

**图片替换不改内容文件**：这是当前实现已经满足的特性——所有内容文件（destinations/accommodations/... 的 Markdown）只存 `coverImage: 'destination-paris'` 这样的 asset id，从不直接存文件路径。真正换图时只改 `image-attributions.ts` 里那一条记录的 `src`，所有引用这个 id 的内容自动生效，不需要逐个内容文件搜索替换。`linkedContentKeys`（规划字段，记录"这个 id 被哪些内容引用"）是这个特性的反向索引，用于"我要删除/替换这张图，会影响哪些页面"的排查，本阶段内容量小、人工搜索代码库即可，暂不需要额外维护这个字段。

**不把第三方图片误标记为品牌自有**：现有 `notes` 字段已经在用（如 `service-hotels-villas` 的 notes 明确写"不代表任何具名酒店"），本阶段延续这个做法，不新增专门字段——`license`/`sourceName` 字段本身就已经明确标注了图片不是品牌自有素材。

## 不重复下载/不放多个目录

现状已经符合这条要求——同一张图被多处引用时，`image-attributions.ts` 里会新建一条**共享同一 `src` 路径**的记录（如 `destination-paris` 复用 `hero-paris.jpg`），而不是把同一个文件复制到不同目录。本阶段延续。

## Astro 当前阶段的轻量实现 vs 未来 CMS 接管

**当前**：图片文件放在 `public/images/`，元数据是一个 TypeScript 数据文件，人工登记、人工同步 `docs/image-asset-register.md`。零依赖、零构建步骤，适合当前几十张图的规模。

**未来 CMS（Sveltia）接管时**：Sveltia CMS 原生支持一个"Media Library"面板（上传即拿到路径，支持文件夹分类），可以接管"图片文件从哪来"这一步；但**元数据（授权状态、摄影师、到期日）建议继续用一个受控的数据结构**，而不是完全交给 CMS 的通用媒体库——因为 CMS 的媒体库通常不原生支持"授权状态"这类业务专属字段。折中方案（届时再做，本阶段不实现）：CMS 媒体库负责文件本身，`image-attributions.ts` 演变为一个由 CMS 编辑的 Collection（用 CMS 的自定义 Collection 功能建一个 `mediaAssets` 类型，字段就是本文档"规划的完整字段"那张表），文件路径字段指向 CMS 媒体库上传后生成的路径——即从"手写 TS 文件"平滑过渡到"CMS 表单编辑同一份数据"，数据结构不需要推倒重来。

## 为什么不建 Content Collection

Content Collection（Markdown + frontmatter）适合"有正文内容"的条目；Media Assets 本质是一张纯元数据表（没有正文），用 TypeScript 数据文件 + Zod-like 手写类型已经能获得类型安全，不需要 Content Collection 的 Markdown 解析开销。如果未来 `notes` 演变成需要富文本的"图片使用说明文档"，才值得重新评估——本阶段没有这个需求。
