# "人群"（Who We Design For）写作与开发规范

MYVIPSERVICE 首页有一个"BUILT AROUND WHO'S TRAVELLING"板块（首页 eyebrow: "WHO WE DESIGN FOR"），用图文小卡片按人群分类——家庭、浪漫、庆典、商务——而不是按目的地或主题分类。这是站内唯一一处"按人群"而非"按内容类型"组织的入口，对应 CLAUDE.md"产品架构从用户任务出发"的原则里"我要……"这类用户语言分类的一种体现。这份 skill 覆盖这个板块本身的数据、文案、图片、跳转规则，不是酒店/服务/目的地页面本身的写作规范（那些各有自己的 skill）。

## 一、数据在哪、怎么渲染

- 数据源：`src/data/site-content.ts` 的 `travelTypes`（`Record<Locale, TravelType[]>`）。`TravelType` 字段：`id`、`title`（完整名称，导航/列表场景用）、`shortLabel`（"For ___"这种更短的卡片叠字用，图文卡片实际显示的是这个，没填就回退到 `title`）、`description`（卡片副标题，图上确实会渲染，不是隐藏字段）、`featured`（是否在首页图文格渲染）、`imageId`（`image-attributions.ts` 里注册的图片 id，只有 `featured: true` 的条目需要填）、`order`、`href`（跳转目标）、`price`（预留字段，**目前全站从未赋值**，见"四"）。
- 渲染位置一：`src/pages/[locale]/index.astro`（约 140 行起）——过滤 `featured && imageId && href` 的条目，按 `order` 排序，渲染成图文格。**卡片上同时显示 `shortLabel`（大字）和 `description`（副标题小字）**，不是只显示 label——改 `description` 真的会影响首页显示，不是摆设。
- 渲染位置二：`src/pages/[locale]/services/[slug]/index.astro`（`tailor-made-travel-planning` 页面的 `featuredTravelStyles` 区块）——复用同一份 `featured` 条目，渲染方式和首页类似。**改 `travelTypes` 里任何一条 featured 数据，这两处都会联动**，改完两处都要检查。

## 二、当前状态：4 个已上线，12 个搁置

- 英文版 `travelTypes.en` 一共 16 条，其中 `order 1-4`（`family-journeys` / `romantic-escapes` / `celebrations` / `business-vip`）是 `featured: true`，配了图和链接，会在首页渲染；`order 5-16` 全是 `featured: false`，**没有 `imageId`，大部分没有 `href`，从未在任何页面渲染过**，纯粹是写好占位、留着以后用的数据，源码注释里直接写着"kept for future use"。
- 中文版 `travelTypes.zh` 和法文版 `travelTypes.fr` **只写了这 4 条 featured 数据**，没有把那 12 条也搬过去——因为反正没地方展示，同步了也没意义。
- **这 12 条是不是"漏做"，要不要补，是产品范围决策，不是这份 skill 该自作主张的事**——2026-09-23 已经和用户确认过"先补完 4 个已上线的，剩下 12 个之后再说"。以后如果要正式扩到更多人群分类，需要先决定：这些新分类要不要有自己的 `imageId`+`href`，`href` 指向现有服务页还是新建专属落地页（见"五"），再动手写数据，不要因为看到"16 条里有 12 条没图没链接"就顺手把它们全部补全上线。

## 三、卡片文案：不要照抄目标页面的 `summary`

- `description` 字段的职责是回答"这适合什么样的人/场景"，不是把跳转目标（服务页）的 `summary` 抄一遍——2026-09-23 审查时发现 `romantic-escapes`、`business-vip` 两条的 `description` 和对应服务页 `summary` 几乎逐字重复，`celebrations` 更明显的问题是：目标页标题是"Weddings & Private Celebrations"，`description` 里却完全没提"weddings"，容易让专门找婚礼策划的访客看不出这张卡片是对的入口。
- 写之前先读一遍目标服务页的 `summary`，确认卡片文案是**独立组织的一句话**、覆盖目标页真正的核心关键词（尤其是页面标题里出现的词），不是简单复制粘贴。
- 三语一起改，不要只改英文——中文不是机械翻译，法文侧重服务标准表述，参照 [[服务页面写作]] 里"中文侧重实操信息、法文侧重服务标准"的分工原则。

## 四、价格——2026-09-23 的教训，全站通用

**这条不只是这个板块的规则，是这次事故之后对全站"起价"类文案的通用纠正：**

- 之前一次性给 11 个服务/体验页面（含这个板块链接到的 `romantic-travel`、`private-experiences`、`business-vip-assistance`、`family-children-services`）加了"From €X"这类具体数字的价格锚点——**这些数字全部是 AI 自己估的、不是客户确认过的真实价格**，客户反馈后才发现问题：比如婚纱跟拍这类服务实际价格因人而异，写死一个数字反而是误导信息，最后全部撤回。
- `TravelType` 接口里其实早就有一个 `price?: string` 字段，**从未被赋值过**，源码注释写着"Deliberately omitted from the zh locale by editorial decision — Chinese-market enquiries go through a quote conversation rather than a sticker price"——这条注释里的判断逻辑（"通过咨询对话给报价，不是写死价格"）应该推广成**全站默认策略**，不是只适用于中文版。
- **以后任何服务/体验/人群卡片页面，除非客户明确提供了真实确认的价格数字，否则不要自己估算/研究出一个数字写成"from €X"这种确定性表述**。CLAUDE.md"每个服务/体验至少给一个起价量级线索"这条要求，在不确定真实价格的情况下，用"价格需咨询"/"quoted per request"/"sur devis"这类文字表述来满足，不要为了凑一个数字而编造。
- 唯一的例外是**转述第三方合作伙伴自己公开的价格**（比如某个合作诊所、酒店官方标价），且经过网上核实、并用"约""起"这类留有余地的措辞、不包装成本站自己的固定报价——即便如此，也优先向客户确认这类数字要不要保留在页面上。

## 五、图片：卡片图和目标页面首图必须一致

- **2026-09-23 发现的真实 bug**：`celebrations` 卡片用的是 `service-floral-event`（长桌白花婚宴布置），但它链接到的 `private-experiences.md` 页面自己的 `image:` 字段却是完全不同的 `service-private-experiences`（暖色调、家常感的秋日烛光餐桌），两张图片主题不搭，用户点进卡片会有"图不对"的落差感。核查方法：`grep "^image:" src/content/services/en/<slug>.md` 对比 `travelTypes` 里同一条目的 `imageId`，两者应该相同。
- 修复方式：**让目标页面自己的 `image:` 字段改成卡片用的那张图**（不是反过来改卡片），因为卡片图往往是从视觉上专门挑过、更贴合"这是什么场合"的图；原来目标页用的图如果还可用，可以挪到该页 `storyFeatures` 里当第二张配图（参考这次的处理：`service-private-experiences` 挪去当"A Theme Built Around the Occasion"这组 storyFeature 的配图），不要直接弃用一张已登记、状态良好的图。
- 其余 3 条（family/romantic/business）目前卡片图和目标页首图是一致的，这是正确状态，新增或修改任何一条 featured 数据时都要保持这个一致性，改完立即用上面的 grep 方法自查一遍。

## 六、跳转关系：目前是"卡片 → 对应服务页"，不是专属落地页

- 当前 4 张卡片的 `href` 都直接指向一个已存在的 `services/<slug>/` 页面（`family-children-services` / `romantic-travel` / `private-experiences` / `business-vip-assistance`），**没有为"人群"这个维度单独建落地页**——点"For Families"看到的就是"家庭与儿童服务"这个服务详情页，不是一个整合了该人群相关 journeys/accommodations/experiences 的专属聚合页。
- **这是当前简化版本的既有设计，不是 bug**——除非客户明确要求做成"人群专属聚合页"（会涉及新页面类型、新路由、可能需要新组件），否则不要自作主张新建页面架构。如果客户提出"点进去应该看到更丰富的内容"这类诉求，先按 CLAUDE.md"做板块前先想四个问题"的要求（为什么做/是否重合/客户获得什么信息/我们扮演什么角色）想清楚，再进入 plan mode 讨论具体做法，不要直接动手建页面。

## 七、验收

- [ ] `description` 是不是独立写的，不是抄目标页 `summary`；有没有覆盖目标页标题里的核心词。
- [ ] `imageId`（卡片图）和目标页面 `image:` 字段是否一致；不一致时按"五"的方法核查是不是真的该改。
- [ ] 有没有写死"from €X"这类未经客户确认的具体价格数字——没有真实数据就用"价格需咨询"类文字，不要编数字。
- [ ] 三语（en/zh/fr）是否同步更新——注意目前只有 en 有全部 16 条，zh/fr 只需要同步 4 条 featured 的。
- [ ] 改完 `travelTypes` 后，首页和 `tailor-made-travel-planning` 服务页两处渲染是否都检查过（同一份数据，两处引用）。
- [ ] `npm run format:check && npm run lint && npm run check && npm run build` 全绿，浏览器里三语言都看一遍首页对应板块。
- [ ] 涉及生产部署的，跟客户确认一次再上线。

## 八、自我更新

这份 skill 是 2026-09-23 客户对"补完 4 个已上线人群卡片"这轮反馈后新建的，记录的每一条规则（价格不能编数字、卡片图要和目标页一致、文案不能抄目标页 summary）都是这一轮实际踩过的坑。以后这个板块再有返工或新增人群分类，照 [[服务页面写作]]"九、自我更新"的方式，把"反馈原话 → 问题所在 → 怎么改"写回对应章节，保持和实际踩过的坑同步。
