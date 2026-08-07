# 内容关系模型（Phase 2C）

> 配套 [content-architecture.md](./content-architecture.md)。所有关系字段存的都是目标内容的 `translationKey`（Services 例外，见下），不存 `slug`、不存内部数据库 id、不存路径——原因见 [url-conventions.md](./url-conventions.md#为什么用-translationkey-而不是-slug-做关系字段)。

## 关系总表

| 来源内容类型                 | 关系字段                   | 目标内容类型                             | 基数            | 状态                                |
| ---------------------------- | -------------------------- | ---------------------------------------- | --------------- | ----------------------------------- |
| Destinations                 | `parentKey`                | Destinations（自关联，父级）             | 1 对 1（可选）  | ✅ 已实现（Phase 2C）               |
| Destinations                 | `relatedAccommodationKeys` | Accommodations                           | 1 对多          | ✅ 已实现                           |
| Destinations                 | `relatedExperienceKeys`    | Experiences                              | 1 对多          | ✅ 已实现                           |
| Destinations                 | `relatedJournalKeys`       | Journal（规划）                          | 1 对多          | ✅ 字段已加，Journal 未建           |
| Accommodations               | `destinationKey`           | Destinations                             | 多对 1          | ✅ 已实现                           |
| Accommodations               | `relatedExperienceKeys`    | Experiences                              | 1 对多          | ✅ 已实现                           |
| Accommodations               | `relatedAccommodationKeys` | Accommodations（自关联，"你可能也喜欢"） | 1 对多          | ✅ 已实现                           |
| Accommodations               | `relatedJournalKeys`       | Journal（规划）                          | 1 对多          | ✅ 字段已加，Journal 未建           |
| Experiences                  | `destinationKey`           | Destinations（主目的地）                 | 多对 1（可选）  | ✅ 已实现                           |
| Experiences                  | `destinationKeys`          | Destinations（适用目的地，复数）         | 多对多          | ✅ 已实现（Phase 2C）               |
| Experiences                  | `relatedAccommodationKeys` | Accommodations                           | 1 对多          | ✅ 已实现                           |
| Experiences                  | `relatedExperienceKeys`    | Experiences（自关联）                    | 1 对多          | ✅ 已实现                           |
| Experiences                  | `travelStyleKeys`          | Travel Styles（数据文件）                | 多对多          | ✅ 已实现（Phase 2C）               |
| Experiences                  | `relatedJournalKeys`       | Journal（规划）                          | 1 对多          | ✅ 字段已加，Journal 未建           |
| Services                     | `relatedExperienceKeys`    | Experiences                              | 1 对多          | ✅ 字段已加（Phase 2C），页面未消费 |
| Services                     | `relatedJournalKeys`       | Journal（规划）                          | 1 对多          | ✅ 字段已加，Journal 未建           |
| Journal（规划）              | `relatedDestinationKeys`   | Destinations                             | 多对多          | ⏳ 规划                             |
| Journal（规划）              | `relatedAccommodationKeys` | Accommodations                           | 多对多          | ⏳ 规划                             |
| Journal（规划）              | `relatedExperienceKeys`    | Experiences                              | 多对多          | ⏳ 规划                             |
| Journal（规划）              | `relatedTravelStyleKeys`   | Travel Styles                            | 多对多          | ⏳ 规划                             |
| Journal（规划）              | `relatedTicketEventKeys`   | Tickets & Events（规划）                 | 多对多          | ⏳ 规划                             |
| Client Stories（规划）       | `destinationKeys`          | Destinations                             | 多对多          | ⏳ 规划                             |
| Client Stories（规划）       | `travelStyleKeys`          | Travel Styles                            | 多对多          | ⏳ 规划                             |
| Client Stories（规划）       | `relatedServiceKeys`       | Services                                 | 多对多          | ⏳ 规划                             |
| Journey Inspirations（规划） | `destinationKeys`          | Destinations                             | 多对多          | ⏳ 规划                             |
| Journey Inspirations（规划） | `travelStyleKeys`          | Travel Styles                            | 多对多          | ⏳ 规划                             |
| Journey Inspirations（规划） | `accommodationKeys`        | Accommodations                           | 多对多          | ⏳ 规划                             |
| Journey Inspirations（规划） | `experienceKeys`           | Experiences                              | 多对多          | ⏳ 规划                             |
| 所有内容类型                 | `coverImage` / `gallery`   | Media Assets（数据文件 id）              | 多对 1 / 多对多 | ✅ 已实现                           |

## 结构图（文字版）

```
                              ┌─────────────┐
                              │ Destinations │──parentKey──┐（自关联，三层结构）
                              └──────┬───────┘             │
                    ┌────────────────┼────────────────┐    │
                    │                │                 │    │
          relatedAccommodationKeys  relatedExperienceKeys  relatedJournalKeys
                    │                │                 │
                    ▼                ▼                 ▼
            ┌───────────────┐ ┌─────────────┐   ┌─────────────┐
            │ Accommodations │ │ Experiences │   │   Journal    │←─┐ (规划)
            └───────┬───────┘ └──────┬──────┘   └──────┬──────┘  │
                    │                │                  │         │
          relatedExperienceKeys  travelStyleKeys  relatedTicketEventKeys
                    │                │                  │         │
                    ▼                ▼                  ▼         │
            ┌───────────────┐ ┌─────────────┐   ┌─────────────┐  │
            │  Experiences   │ │Travel Styles │   │Tickets&Events│──┘ (规划)
            └───────────────┘ │ (数据文件)   │   │   (规划)     │
                               └─────────────┘   └─────────────┘

     ┌──────────┐        ┌────────────────┐
     │ Services  │        │ Client Stories  │ (规划，独立于 Journal，
     │          │        │                 │  多一层 privacyApprovalStatus)
     └────┬─────┘        └────────┬────────┘
          │                       │
   relatedExperienceKeys   relatedServiceKeys / destinationKeys / travelStyleKeys
```

Media Assets 不在图中单独画节点——它是所有内容类型共用的"叶子"引用（`coverImage`/`gallery` 存 asset id），不参与内容与内容之间的关系，详见 [media-library.md](./media-library.md)。

## 设计原则

1. **关系字段永远存 `translationKey`，不存 `slug`。** slug 可能因为本地化 URL 而在不同语言下不同（如英文 `french-riviera` vs 法语 `cote-d-azur`），`translationKey` 在所有语言下恒定，是唯一安全的关系锚点。
2. **关系是"松散引用"，不是数据库外键。** Astro Content Layer 不做引用完整性校验——`relatedAccommodationKeys` 里写了一个不存在的 key，不会构建报错，只会在页面渲染时查不到数据（现有 `resolveRelated()` 等工具函数已经按"找不到就跳过"处理，未来新内容类型的关联解析函数应延续同样的容错策略，而不是让缺失引用导致构建失败）。
3. **双向关系不强制双向维护。** 例如 Destination 的 `relatedExperienceKeys` 列出了这个地方有哪些体验，但 Experience 一侧的 `destinationKey` 是独立维护的，两边可能出现"一边写了、另一边没写"的不一致——这是当前架构的已知取舍（简单、无需同步校验），不是本阶段要解决的问题；如果未来内容量变大导致这类不一致成为真实问题，再考虑加一个构建期一致性检查脚本。
4. **自关联字段（如 `parentKey`、`relatedAccommodationKeys` 自指）要防止环路**，但本阶段不写运行时校验代码——环路在实践中不太可能出现（内容作者手工维护，量级小），先记录规则、暂不做自动化检测，等内容规模扩大或改由非技术编辑者维护时再补。
