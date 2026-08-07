## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## 建站总原则（面向 AI 的长期开发规范）

以下规则来自客户制定的"MYVIPSERVICE 建站总原则"，适用于任何 AI（Claude/Cursor/Codex 等）对本站的后续修改，目的是防止越改越乱、风格漂移。完整背景见 `/Users/wuminjuan/.claude/plans/zippy-sleeping-dragonfly.md`（网站逻辑重整路线图）。

**业务优先级**：理解 > 信任 > 兴趣 > 行动 > 美感。高级感不能牺牲用户理解——前三屏必须能让用户在 10 秒内明白"你是谁 / 能做什么 / 服务谁 / 为什么找你 / 下一步怎么做"。

**产品架构从用户任务出发，不从公司内部结构出发**：分类要用"我要完整旅行 / 我要酒店 / 我要车 / 我要餐厅活动 / 我要滑雪 / 我要企业活动"这种用户语言，不用"Transportation / Hospitality / Concierge"这种供应商语言。

**设计系统硬约束（不经用户确认不得违反）**：

- 不新增颜色，只用 `src/styles/tokens.css` 里已有的 design tokens。
- 不新增按钮样式、不新增全局字体。
- 优先复用已有组件（ContentCard / SectionHeading / Gallery / RelatedContent / ContentGrid / KeyFacts / Breadcrumbs / EmptyState / ContentStatusBadge 等），只在确实没有可复用组件时才新建，且新组件要以后能被其他页面复用，不是一次性专用件。
- Mobile-first：移动端不是桌面端缩小，要单独考虑首屏文字量、CTA 固定、菜单简化。
- CTA 文案全站只保留三类语义（完整行程规划 / 明确服务报价 / 联系顾问咨询），四语言各自固定译法，不要每个页面发明新的按钮文案。
- 动画只用于让页面更自然（fade / reveal / 轻微 parallax，400–800ms），不用于炫技，不做 scroll hijacking。

**内容与语言**：

- 中/法/俄文不是英文的机械翻译——中文版侧重微信、中国家庭、儿童双床、司机购物等实操信息；法文版侧重服务标准、国际客群、当地专业度。
- 除首页/服务/About/Contact/目的地核心页要求四语言同步外，Journal 一类的搜索型内容**允许语言之间不同步**——一篇内容只服务需要它的市场，不必翻译四遍。
- 不虚构客户数量、星级、奖项、合作伙伴关系——没有确认授权的第三方品牌 logo/口径不能上线（`docs/image-asset-register.md` 里的排除项持续有效）。
- 价格：不必公开完整报价，但每个服务/体验至少给一个"起价"量级线索（如"from €X"），避免完全没有价格锚点导致无效咨询。

**图片**：避免游客照片式的陈词滥调构图（如埃菲尔铁塔仰拍），优先建筑细节/房间/餐桌/车门/雪山/私人空间这类"我正在经历它"的画面，人物尽量少出现。已有的"不使用未授权第三方 logo/不暗示未确认合作"规则继续适用。

**中国大陆可访问性**：不把核心功能绑定 Google Maps / Google Fonts / reCAPTCHA / Google 登录 / YouTube——这些在中国大陆网络环境下可能受限。微信/WhatsApp 需要有真实可用的入口（图标 + 说明），不能停留在"Coming soon"。

**每次改动后的验收清单**（改完必须过一遍，不能只测一种语言/一种视口）：

1. `npm run format:check && npm run lint && npm run check && npm run build`
2. 桌面 + 移动视口
3. 四语言至少各抽查一个改动页面
4. 导航、内部链接、表单可用
5. 无控制台报错、无缺图
6. 无暴露的开发/占位文案（如"used to test the template"、"ICP filing: pending"这类文本，发现即修）
