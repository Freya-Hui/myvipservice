# 体验（Experiences）写作与开发规范

MYVIPSERVICE 的体验页面是 `src/content/experiences/{en,zh,fr}/<slug>.md`，渲染模板固定为 `src/pages/[locale]/experiences/[slug]/index.astro`。这是站内最短小的一类内容——一个可预订的具体活动/时段（半天游船、专属导览、一顿午餐），不是目的地/酒店那种长篇介绍页，但**短不代表可以随便**，尤其是封面图，这份 skill 2026-09-23 建立的直接原因就是一张封面图选错了。

## 一、这次的教训：封面图必须真的对得上这个体验，不是"随便一张 service-* 图"

- **真实 bug**：`private-london-family-museum-morning.md`（"伦敦亲子博物馆私享早晨"）的 `coverImage` 是 `service-family`——查了这张图的真实内容，是一张**海边沙滩上一家三口牵手走路**的照片，跟"伦敦""博物馆""室内导览"毫无关系。而且这张图不是随便放的：体验详情页模板（`experiences/[slug]/index.astro`）里 `<Gallery images={data.gallery.length > 0 ? data.gallery : [data.coverImage]} />` **紧跟在 Hero 之后就整版展示**，是访客打开页面第一眼看到的大图，不是缩略图角落里的小图。
- **`service-*` 图片"可以复用"这条规则，从来不是"随便拿一张 service 图糊弄过去"的许可**——这条规则本来的意思是"service 图片不参与跨内容的去重排除逻辑，可以在多个页面复用"，前提仍然是**这张图的画面内容真的贴合这个页面在说什么**。`service-boutique-appointment`（成排挂着的衣服）配"米兰私人购物"、`service-chef-plating`（主厨在给菜品收尾）配"普罗旺斯酒庄午宴"，这两个是对的用法——图片虽然不是米兰或普罗旺斯实景，但画面内容（购物、主厨摆盘）跟体验本身的核心动作是一致的。海边牵手照配博物馆导览，画面内容和体验完全对不上，这是误用，不是"泛化但可接受"。
- **选封面图前先问一句：这张图如果不看文件名，画面内容本身能不能让人猜到这是在讲什么体验？** 猜不到、或者猜出来的是完全不同的场景（海滩 vs 博物馆），就不能用，哪怕它是"service-*"这种理论上到处能用的图。
- 核查方法：`grep -A10 "id: '<image-id>'" src/data/image-attributions.ts` 读一遍 `altByLocale.en` 的画面描述，跟这个体验的 `title`/`description` 对一遍，对不上就换。

## 二、素材与图片优先级

- **优先级**：这个体验已经绑定的 `destinationKey` 对应目的地的真实图片 > 已经在关联住宿/行程里注册过的、画面内容对得上的图 > 站内已有的、画面内容对得上的 `service-*`/`experience-*` 通用图 > 全新去 Unsplash/Pixabay 找。不要因为"省事"跳过核实画面内容这一步，尤其是复用 `service-*` 这类"理论上到处能用"的图时更要核实。
- `gallery` 字段和 `coverImage` 会被 `[data.coverImage, ...data.gallery]` 一起整版展示在页面顶部（不是详情页往下翻才看到的小相册），gallery 里的每一张图都要经得起同样的"画面对得上体验"检验，不能凑数。
- 图片风格延续全站原则：避免游客照片式陈词滥调构图，优先"正在经历这件事"的画面（导览员讲解的瞬间、船头的视角、餐桌上的手），人物尽量少出现、不要正对镜头摆拍。

## 三、内容结构（schema 已固定，字段不要越权发明）

`content.config.ts` 里 experiences 的字段对应：

- `description`——一句话讲清楚这个体验具体是什么、大概怎么进行，会被 `ContentSection` 渲染成页面正文的概览段落。
- `category`（单选主分类）+ `secondaryCategories`（可选多选）——十个固定枚举值（Art & Culture / Food & Wine / Family / Wellness / Nature / Fashion / Celebration / Private Access / Seasonal / Sports），不要为了描述更精确而发明新分类。
- `highlights`——纯文本要点列表（也支持 `{text, image}` 形式配图，但大多数体验保持纯文本即可，不必每条都配图，体验页面本身已经有 Gallery 承担配图任务）。
- `duration` / `suitableFor` / `familySuitable` / `ageNotes` / `languages`——这些字段会渲染成 `KeyFacts` 一栏关键信息，尽量填，缺了哪个就少一行，不强行编造。
- `customisationNotes`——告诉客户"我们需要你提供什么信息才能把这次体验安排好"，是这类短页面里少数能体现"服务感"的自由文本段落，值得认真写，不要写成一句空话。
- **不编造**：固定价格、保证能订到、官方合作身份、"稀缺活动保证能拿到票"这类承诺——跟 Tickets & Events 的合规原则一致，也是全站"不虚构合作关系"的具体延伸。

## 四、标签回填（travelStyleKeys）

- `travelStyleKeys` 字段对应 `travel-audience-segments` skill 里的人群体系——只有内容上真的贴合某个已上线人群（`family-journeys`/`romantic-escapes`/`celebrations`/`business-vip`）才打标签，允许留空，不强行凑数（详见 `travel-audience-segments` skill"四.2"）。
- 打了标签之后，这个体验会出现在对应人群详情页的"精选体验"板块——打标签前顺手看一眼这个体验的 `coverImage` 会不会跟人群页面已经用过的其他图片撞车（人群详情页的去重逻辑已经会自动处理，但源头图片选得准，效果总是更好）。

## 五、写作风格

- 三语不是逐字翻译：中文侧重实操信息（微信联系、司机等候安排、适合家庭出行的细节），法文侧重服务标准与专业度的表述——跟其他内容类型 skill 的分工原则一致。
- 撇号/引号规则：正文含英文人名地名撇号的字符串整条换双引号，不用 `\'` 转义；写完跑 `grep -n "\\\\'" src/content/experiences/*/*.md` 自查。
- 价格：不写死"from €X"这类未经客户确认的具体数字（2026-09-23 全站统一撤回过一次，详见 `travel-audience-segments` skill"五"），用"价格需咨询"一类表述。

## 六、验收

- [ ] `coverImage`（以及 `gallery` 里的每一张）画面内容是否真的对得上这个体验在讲什么——不是"理论上能用"就行，要读一遍 `image-attributions.ts` 里的画面描述核实。
- [ ] `category` 是否用了固定十个枚举值之一，没有自己发明新分类。
- [ ] `duration`/`suitableFor`/`familySuitable`/`ageNotes`/`languages` 能填的是否都填了。
- [ ] `customisationNotes` 是否写出了真实、具体的"我们需要客户提供什么信息"，不是一句空话。
- [ ] `travelStyleKeys` 打没打，打的话是否真的贴合，不是凑数。
- [ ] 有没有编造价格、保证能订到、合作身份这类承诺。
- [ ] 三语是否同步，撇号转义是否自查过。
- [ ] `npm run format:check && npm run lint && npm run check && npm run build` 全绿，浏览器里打开页面确认 Gallery 顶部大图正常、无控制台报错。

## 七、自我更新

这份 skill 是 2026-09-23 客户指出"伦敦亲子博物馆私享早晨"这篇体验的封面图有问题后新建的——核实后发现是一张完全不相关的海滩照片，且体验详情页模板会把这张图放在页面顶部整版展示，问题比想象中更显眼。以后这块内容再发现类似的图文不符，照 [[服务页面写作]]"自我更新"的方式，把"反馈原话 → 问题所在 → 怎么改"写回对应章节。

## 图文穿插硬规则（2026-10-07 客户明确要求，所有内容类型通用，写完必须自查）

- **顶部只保留封面首图**：`gallery` 字段留空，或只放封面这一张；不要把多张图堆在页面顶部的相册里。
- **其余图片必须穿插在正文里**：每个小节/每个季节/每个地区/每个条目的文字后面，紧跟一张和这段文字画面对得上的图（Markdown 正文用 `![alt](/images/xxx.jpg)`；有结构化字段的类型用 `{text, image}` 之类的字段，见本 skill 对应章节）。不要把几张图集中放在一处，也不要放在对应文字之前。
- **同一页面里一张图只出现一次**：封面用过的图，正文不再重复使用。
- 不是每段都必须有图——没有真正对得上的照片，或只是过渡句，就不配图，不要为了凑数放不相关的图；但"能找到对应图片的都要有图"是默认做法。
- alt 文字要写清画面里真实有什么，不夸大；三种语言的版本图片位置保持一致。
- 自查：`grep -c "^!\[" 文件` 看正文图数；打开页面确认顶部只有封面、图都紧跟着各自的文字、没有缺图。
- 起因：红酒文章（`maison-kairui-burgundy-wine-retreat`）第一次改版时，图集中堆在几处、顶部相册有 6 张，被客户退回；见 [[feedback-all-content-image-text-interleave]]。
