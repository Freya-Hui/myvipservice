# 图片素材登记

Phase 1 使用的所有图片均为**临时素材**，来自 Unsplash（Unsplash License：可商用、可编辑、无需署名，但仍在此登记来源以备核查）。下载脚本用的是 Unsplash 的动态裁剪参数，原图归其各自摄影师所有 —— **MYVIPSERVICE 对这些图片不享有版权，仅作网站视觉占位使用**。

结构化数据见 [`src/data/image-attributions.ts`](../src/data/image-attributions.ts)，本文件是给人看的登记表，两边需保持同步。

| id                          | 本地文件                                  | 用途                                       | 摄影师            | 来源                                                                                                                         | 许可证           | 状态      |
| --------------------------- | ----------------------------------------- | ------------------------------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------- |
| hero-paris                  | `/images/hero-paris.jpg`                  | 首页 Hero / About Hero                     | Svetlana Gumerova | [Unsplash](https://unsplash.com/photos/eiffel-tower-paris-across-body-of-water-during-daytime-m-sVLnrjFxY)                   | Unsplash License | temporary |
| destination-paris           | 复用 `hero-paris.jpg`                     | Featured Destinations — Paris              | Svetlana Gumerova | 同上                                                                                                                         | Unsplash License | temporary |
| destination-french-riviera  | `/images/destination-french-riviera.jpg`  | Featured Destinations                      | Kamilla Isalieva  | [Unsplash](https://unsplash.com/photos/coastal-town-nestled-by-the-blue-sea-and-mountains-aoFr17pnyrs)                       | Unsplash License | temporary |
| destination-french-alps     | `/images/destination-french-alps.jpg`     | Featured Destinations                      | Nicola Fittipaldi | [Unsplash](https://unsplash.com/photos/a-snow-covered-mountain-with-a-ski-lodge-in-the-foreground-0zwzo_v2ZHQ)               | Unsplash License | temporary |
| destination-provence        | `/images/destination-provence.jpg`        | Featured Destinations                      | Simon Spring      | [Unsplash](https://unsplash.com/photos/a-village-on-top-of-a-hill-surrounded-by-trees-vLJDVNSywA0)                           | Unsplash License | temporary |
| service-hotels-villas       | `/images/service-hotels-villas.jpg`       | Hotels & Villas 板块                       | Quang Nguyen Vinh | [Unsplash](https://unsplash.com/photos/a-hotel-lobby-with-a-chandelier-hanging-from-the-ceiling-WR1bkBstInw)                 | Unsplash License | temporary |
| service-private-experiences | `/images/service-private-experiences.jpg` | Private Experiences 板块                   | Zac Cain          | [Unsplash](https://unsplash.com/photos/a-table-is-set-with-candles-and-plates-of-food-HCFqhYC_Hvw)                           | Unsplash License | temporary |
| journal-preview-paris-cafe  | `/images/journal-preview-paris-cafe.jpg`  | Journal Preview 板块                       | Alex Harmuth      | [Unsplash](https://unsplash.com/photos/people-sitting-on-chair-near-building-during-daytime-bOICdD-Gulk)                     | Unsplash License | temporary |
| destination-geneva          | `/images/destination-geneva.jpg`          | Destinations — Geneva (Phase 2A)           | Tom Podmore       | [Unsplash](https://unsplash.com/photos/a-view-of-a-city-from-above-4BcxkctzeUM)                                              | Unsplash License | temporary |
| destination-japan           | `/images/destination-japan.jpg`           | Destinations — Japan (Phase 2A)            | Shinichi Kotoku   | [Unsplash](https://unsplash.com/photos/a-pagoda-with-a-tree-in-front-of-it-with-kiyomizu-dera-in-the-background-ZNBg8Pinuak) | Unsplash License | temporary |
| accommodation-villa-geneva  | `/images/accommodation-villa-geneva.jpg`  | Demo Villa — Geneva (Phase 2A)             | Aziz Kouri        | [Unsplash](https://unsplash.com/photos/spacious-green-lawn-and-swimming-pool-with-lounge-chairs-3Jb1wgUwG4M)                 | Unsplash License | temporary |
| experience-art-gallery      | `/images/experience-art-gallery.jpg`      | Demo Experience — Art & Culture (Phase 2A) | Declan Sun        | [Unsplash](https://unsplash.com/photos/a-large-painting-hanging-on-the-wall-of-a-museum-uJCubgWo-0E)                         | Unsplash License | temporary |

`destination-french-alps` and `destination-provence` (downloaded in Phase 1) are kept — Phase 1's Provence/French Alps destination entries were replaced by Geneva/Japan in Phase 2A, but `destination-french-alps.jpg` is reused as the cover image for the demo "Alpine Wellness Retreat" experience, so it's still referenced. `destination-provence.jpg` is currently unused; left in place in case a Provence destination returns in a later phase.

## 排除项（未使用）

- **不使用** PDF 素材中的任何团队照片（品酒照、戛纳红毯合影等）—— 未确认肖像权授权前，禁止提交到公开仓库
- **不使用** 任何第三方品牌 Logo（Cartier、Four Seasons 等）
- **不使用** 任何酒店官网图片（未确认媒体使用授权）
- **不使用** Pinterest 或来源不明的图片

## 后续替换计划

在真正上线前，这 7 张 Unsplash 临时图应替换为：

1. 品牌自有实拍图（如 PDF 素材中已确认可用的照片），或
2. 正式购买/授权的图库图片，或
3. 与酒店/合作方书面确认后可使用的官方媒体图

替换时同步更新 `src/data/image-attributions.ts` 里对应条目的 `usageStatus`（改为 `licensed`）和本表格。
