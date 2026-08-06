# MYVIPSERVICE 网站实施计划

> 状态：待确认 — 确认后进入 Phase 0

## A. 推荐技术栈

| 层           | 选择                                                  | 为什么（ponytail 视角）                                                                                                                                   |
| ------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 框架         | **Astro** (SSG)                                       | 默认零 JS、构建期出静态 HTML，速度/SEO 原生就好；内置 i18n 路由，不用自己写语言切换逻辑；Content Collections 自带类型校验的"文件即 CMS"，不需要额外数据库 |
| 样式         | **原生 CSS**（CSS 变量做 design tokens + 原生嵌套）   | 页面模板只有 9 套，4 语言复用同一套模板 → 不需要 Tailwind/Sass 这类构建期依赖，减少一层工具链                                                             |
| 内容管理     | **Decap CMS**（原 Netlify CMS，开源、基于 Git，免费） | 客户改文字/图片/案例不用碰代码；内容仍是 Markdown 文件，进 Git 有版本历史，不需要自建后台+数据库                                                          |
| 表单处理     | **Netlify Forms**（原生 honeypot + 垃圾邮件过滤）     | 零后端代码收表单；不需要单独写 API/存储/发邮件的服务                                                                                                      |
| 托管         | **Netlify**                                           | 静态托管+CDN+免费 HTTPS 一体化；Netlify Identity + Git Gateway 让 Decap CMS 开箱即用，不用自己搭 OAuth                                                    |
| 图片优化     | **Astro 内置 `astro:assets`**                         | 原生自动生成响应式图片/WebP，不需要额外图床服务                                                                                                           |
| 统计分析     | **Plausible（无 Cookie）或暂不接入**                  | 无痕统计天然满足 GDPR，避免上"同意横幅"这层复杂度；真正需要精细归因时再升级                                                                               |
| 表单人机验证 | **原生 honeypot 字段**（Netlify Forms 自带）          | 先用免费的原生防护；如果垃圾信息量大再加 Cloudflare Turnstile（ponytail: 先用最简方案，量大了再升级）                                                     |

**明确不用**：React/Vue/Next.js（本站没有复杂交互状态，SSG 足够）、Tailwind（页面少，原生 CSS 够用）、自建 Node/Express 后端（Netlify Forms 已覆盖需求）、独立 CMS 服务器如 Strapi/WordPress（多一套服务器要维护，且不需要）。

---

## B. 目录结构

```
myvipservice/
├── src/
│   ├── content/                    # 内容集合 = 文件型 CMS 数据源
│   │   ├── config.ts               # 每个集合的 schema（zod 校验）
│   │   ├── services/{en,zh,fr,ru}/*.md
│   │   ├── hotels/{en,zh,fr,ru}/*.md         # 酒店与别墅
│   │   ├── experiences/{en,zh,fr,ru}/*.md    # 私人体验
│   │   ├── case-studies/{en,zh,fr,ru}/*.md   # 案例
│   │   └── legal/{en,zh,fr,ru}/{privacy-policy,legal-notice}.md
│   ├── components/
│   │   ├── Header.astro / Footer.astro / Nav.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── ContactForm.astro
│   │   ├── SEO.astro                # meta/hreflang/OG 统一管理
│   │   └── CookieNotice.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── [lang]/
│   │       ├── index.astro          # 首页
│   │       ├── about.astro          # 关于我们
│   │       ├── services.astro       # 服务
│   │       ├── bespoke-travel.astro # 定制旅行
│   │       ├── hotels-villas.astro  # 酒店与别墅
│   │       ├── experiences.astro    # 私人体验
│   │       ├── contact.astro        # 联系我们
│   │       ├── privacy-policy.astro # 隐私政策
│   │       └── legal-notice.astro   # 法律声明
│   ├── i18n/
│   │   └── {en,zh,fr,ru}.json       # 界面文案：导航/按钮/表单标签/页脚
│   └── styles/
│       ├── tokens.css               # 颜色/字体/间距变量
│       └── global.css
├── public/
│   ├── admin/                       # Decap CMS 后台入口 (/admin)
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/
│   ├── robots.txt
│   └── favicon.svg
├── astro.config.mjs
├── netlify.toml                     # 安全响应头、重定向规则
└── package.json
```

---

## C. 页面架构

所有页面在四种语言下共享同一模板，仅内容不同，URL 形如 `/en/about`、`/fr/about`。

1. **首页** — 品牌大图/视频 Hero、四大服务分类入口（酒店/定制旅行/接送贵宾/餐厅与体验）、精选案例、CTA 按钮统一指向联系表单
2. **关于我们** — 品牌故事、服务理念、覆盖城市/网络
3. **服务** — 服务总览（私人礼宾、酒店预订、机场接送、餐厅预订、私人活动），每项链接到细节区块
4. **定制旅行** — 定制流程说明 + 需求表单（复用联系表单组件，预填"定制旅行"场景）
5. **酒店与别墅** — 精选酒店/别墅列表（来自 `hotels` 内容集合），可按目的地筛选（纯前端小组件，无需后端）
6. **私人体验** — 私人活动/体验列表（`experiences` 集合）
7. **联系我们** — 表单（见下方字段）+ 联系方式/工作时间
8. **隐私政策** — 数据收集范围、法律依据、留存期限、第三方处理者（Netlify）、用户权利与联系方式
9. **法律声明** — 公司注册信息（依据已有 KBIS 文件：SIREN/SIRET、注册地址）、发布负责人、托管方信息（Netlify Inc.）

共享组件：Header（含语言切换）、Footer（含隐私/法律声明链接、社交媒体）、CookieNotice（仅必要性提示，见 D/F 部分说明为何不需要完整同意横幅）。

---

## D. 多语言方案

- **路由**：Astro 原生 i18n 路由，路径前缀 `/en/ /zh/ /fr/ /ru/`，同一域名、同一代码库，满足"不为每种语言建独立网站"的要求
- **默认语言与跳转**：无前缀访问根路径 `/` 时，按浏览器 `Accept-Language` 做**一次性**服务端重定向到匹配语言（无匹配则回退英文），之后语言偏好存 `localStorage`（不是 cookie，通常归类为"严格必要"操作，不触发 GDPR 同意要求）
- **界面文案** vs **内容文案** 分离管理：
  - 界面文案（导航、按钮、表单标签等）：`src/i18n/{lang}.json`，开发/校对一次性维护
  - 正文内容（服务介绍、酒店描述、案例）：每语言独立 Markdown 文件，**不做机器直译**，因为高端品牌文案需要各语言原生语感（法语/俄语的表达习惯和中英文不同）
- **SEO**：每页面自动生成 `hreflang` 互链标签 + 每语言独立 sitemap，Astro `@astrojs/sitemap` 集成原生支持
- **可维护性**：新增一种语言 = 复制一份 `i18n/xx.json` + 在 content 各集合下新增 `xx/` 文件夹，不需要改代码结构

---

## E. 内容管理方案

- **Decap CMS**，后台地址 `/admin`，登录用 Netlify Identity（免注册数据库，Netlify 原生托管账号）
- 编辑权限开放给客户团队：可编辑服务介绍、酒店/别墅列表、私人体验、案例、图片，**不能改页面结构/样式**（结构留在代码里，内容留在 CMS 里，两者分离，避免客户误改坏版式）
- 每个内容集合在 `src/content/config.ts` 定义 schema（如酒店必须有标题/描述/图片/目的地/星级），CMS 表单自动按 schema 生成，防止漏填
- 图片直接上传到 `public/images/`，Astro 构建时自动做响应式压缩，不需要额外图床/CDN 服务
- 编辑流程：默认直接发布到 `main` 分支（改动即时上线，适合小团队快速迭代）；如未来团队变大需要审核，可切换成"PR 编辑工作流"（Decap 原生支持，改一行配置）

---

## F. 部署方案

- **Netlify** 一体化托管：Git 推送自动构建部署，免费 HTTPS，全球 CDN
- **安全**：`netlify.toml` 统一配置安全响应头（CSP、X-Frame-Options、Referrer-Policy、Permissions-Policy），表单双重校验（HTML5 原生 `required`/`type=email`/`pattern` 前端校验 + Netlify Forms 后端校验）
- **表单防垃圾信息**：Netlify Forms 内置 honeypot 隐藏字段 + 垃圾信息过滤，免费方案够用；垃圾信息量大再加 Cloudflare Turnstile
- **GDPR / Cookie 提示**：
  - 默认不使用需同意的第三方 Cookie（分析用 Plausible 或暂缓接入）→ 只需一条"本站不使用非必要 Cookie"的简单提示，**不需要**复杂的同意管理平台（CMP）
  - 隐私政策页说明：收集字段（姓名/邮箱/电话或微信/目的地/日期/人数/预算/需求）、处理目的（回复咨询）、留存期限、数据处理方（Netlify 作为次级处理者）、用户访问/删除权利联系方式
  - 法律声明页使用已有 KBIS 文件中的公司注册信息（后续我读取该文件填充具体内容）
- **预发布**：Netlify 每个 PR/分支自动生成预览链接，正式上线前可先给客户预览
- **域名**：绑定 myvipservice 相关域名（如已购买，直接在 Netlify 加自定义域名 + 自动续期 HTTPS 证书）
- **后期维护成本**：纯静态站点，无服务器需要打补丁/升级；依赖只有 Astro + Decap CMS 两个，定期 `npm update` 即可

---

## G. 分阶段开发计划

| 阶段                                     | 内容                                                                                                  | 产出                                             |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Phase 0** 项目初始化                   | 建 Astro 项目、i18n 路由骨架、design tokens（颜色/字体/间距）、Netlify 项目连接                       | 空壳网站可访问，四语言路由能切换                 |
| **Phase 1** 页面骨架 + 组件              | Header/Footer/语言切换/SEO 组件，9 个页面的布局（先英文占位内容）                                     | 全站可点通，响应式布局（手机/平板/电脑）验证通过 |
| **Phase 2** 内容填充                     | 接入 Content Collections，英文正式文案 + 图片，酒店/体验/案例列表渲染                                 | 英文版内容完整可审阅                             |
| **Phase 3** 多语言                       | 中/法/俄三语翻译内容录入，hreflang/sitemap 生成，语言检测跳转                                         | 四语言版本全部上线可审阅                         |
| **Phase 4** 表单与 CMS                   | 联系表单 + 定制旅行表单接 Netlify Forms，垃圾信息过滤测试，Decap CMS 后台配置与客户账号开通、操作培训 | 表单可提交并收到通知邮件；客户能自主改内容       |
| **Phase 5** SEO / 性能 / 安全 / 合规收尾 | Lighthouse 性能与可访问性检查、安全响应头、隐私政策/法律声明定稿、Cookie 提示上线                     | 各项指标达标，合规文案定稿                       |
| **Phase 6** 上线与交接                   | 绑定正式域名、发布上线、给客户一份"如何用 CMS 改内容"的简明操作说明                                   | 网站正式上线                                     |

---

## 待您确认的几个点

1. **默认/主语言**：首页无语言前缀时优先跳转英文，还是中文？（品牌目标客群决定）
2. **域名**：是否已购买 myvipservice 相关域名？需要我处理 DNS/绑定吗？
3. **法律声明内容**：是否直接使用目录里 `Extrait KBIS_MYVIPSERVICE 2025 DEC.pdf` 中的注册信息？我需要读取该文件提取公司名称/地址/注册号。
4. **托管账号**：Netlify 账号是否已有，还是需要新建（用 freyahui219@gmail.com）？
5. **内容来源**：`MyVipService_VIC_Cooperation_Proposal` 系列 PDF 里的品牌介绍/合作方案，是否可以作为"关于我们"和"服务"页面文案的素材来源？

以上确认后，从 Phase 0 开始动工。
