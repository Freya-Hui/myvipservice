# CMS 方案比较与推荐

背景：不再默认使用 "Decap CMS + Netlify Identity + Git Gateway"，因为 **Git Gateway 已被 Netlify 标记为 deprecated**（依赖 Netlify Identity，官方已停止新功能投入，长期有下线风险）。下面重新比较三个方向。

> 关键前提：不管选哪个方案，网站内容底层都是**同一批 Markdown 文件存在同一个 Git 仓库**（Phase 0 已经按这个结构建立）。CMS 只是"给这些文件加一层好用的编辑界面"，选哪个、以后换哪个，都**不影响内容结构**，也不影响 Phase 0-2 的开发进度。

## 比较

| 标准                   | A. GitHub 网页直接编辑 Markdown                                  | B. Decap CMS + GitHub OAuth（不用 Git Gateway）                                                                                                              | C. Sveltia CMS + GitHub OAuth（推荐）                                                                                       |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 非技术人员易用性       | 差 — 要懂 frontmatter/YAML 格式，容易手滑改坏字段                | 好 — 表单化编辑，按 schema 生成字段，配图片上传控件                                                                                                          | 好 — 同 Decap 的表单化体验，UI 更现代                                                                                       |
| 四语言内容管理是否清楚 | 一般 — 文件夹结构靠自觉，容易漏改某语言                          | 一般 — 支持但 i18n 编辑体验较早期，多语言字段要额外配置                                                                                                      | **好** — 专门优化了多语言编辑（同一条目多语言并排编辑/切换），与我们"每语言独立文件"的结构天然契合                          |
| 是否需要额外服务器     | 不需要                                                           | 不需要后端服务器，但**需要一个 GitHub OAuth App**做身份验证（用 Netlify 内置的 OAuth 代理即可，不用自己写服务，是和 Git Gateway 完全不同的、仍受支持的机制） | 同 B，不需要自建服务器，用同样的 Netlify OAuth 代理                                                                         |
| 安全性                 | 权限=GitHub 仓库权限，足够安全，但误操作风险高（直接改生产分支） | OAuth 令牌仅换取 GitHub API 权限，无 Identity/Git Gateway 那层已弃用组件，安全模型更简单清晰                                                                 | 同 B                                                                                                                        |
| 成本                   | 免费                                                             | 免费（Netlify OAuth 代理免费，GitHub OAuth App 免费）                                                                                                        | 免费                                                                                                                        |
| 长期维护风险           | 最低（没有额外依赖）                                             | 中 — Decap CMS 项目近年更新变慢，社区维护，但项目未废弃                                                                                                      | **低** — Sveltia CMS 是主动维护的现代替代品，兼容 Decap 的 config.yml 格式（迁移成本几乎为零），专为解决 Decap 停滞问题而生 |
| 是否依赖已弃用服务     | 否                                                               | 否（前提是用 GitHub OAuth backend，**不用** git-gateway backend）                                                                                            | 否                                                                                                                          |

## 推荐：**C. Sveltia CMS + GitHub OAuth**

理由：

1. 和 Decap CMS 用同一套 `config.yml` 配置格式，几乎零迁移成本——万一它停止维护，可以直接切回 Decap 或迁到别的兼容工具，不锁定
2. 多语言编辑体验专门优化过，正好匹配我们"每语言独立 Markdown 文件"的内容结构
3. 认证走 GitHub OAuth backend，**不经过**已弃用的 Git Gateway/Identity，用 Netlify 自带的 OAuth 代理（`base_url: https://api.netlify.com`）即可，零后端代码
4. 免费、纯静态托管、无额外服务器

**接入步骤**（留到 CMS 阶段再做，不影响 Phase 0）：

1. 在 GitHub 上注册一个 OAuth App，拿到 client id/secret
2. 在 Netlify 站点设置里填入这两个值（Netlify 内置支持这个 OAuth 代理，不需要写代码）
3. `public/admin/config.yml` 里 backend 配置指向 GitHub 仓库 + Netlify OAuth 代理
4. 给客户账号开通 GitHub 仓库的 Collaborator 权限（只给内容目录的编辑权限即可，用 CODEOWNERS 或建议客户只用 CMS 界面，不直接操作 GitHub）

## 过渡方案

Phase 0-2 开发期间，内容先由开发者直接维护 Markdown 文件（即方案 A 的效果），不需要提前搭 CMS。等 Phase 4（表单与 CMS 接入阶段）再正式装 Sveltia CMS，装的时候只是"加一层编辑界面"，不需要改动已经写好的内容文件。
