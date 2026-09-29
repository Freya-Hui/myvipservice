---
name: 产品表单
description: 站内"先填表单、下面再解释"这类页面的布局规范——两栏（表单+吸顶的"Your Selection"选择汇总侧栏）、分步骤向导、补充介绍内容放在表单下方而不是上方。适用于酒店/接机/票务/包车这类预订页，以及联系表单页。当用户要新增或改造预订/咨询表单，或提到"两栏布局""跟租车一样""产品表单"时触发。
---

# 产品表单页面规范

站内目前这类页面：4 个服务预订页（`hotel-villa-reservations/book`、`vip-airport-reception/book`、`tickets-events/book`、`private-transportation/[topic]/book`）+ 联系表单页 `/contact/`。最早的模板是 `src/components/CarBookingWidget.astro`，其余组件（`HotelEnquiryWidget.astro`/`VipReceptionBookingWidget.astro`/`TicketBookingWidget.astro`）和联系表单页自己的 inline 实现都是照这个模式复制、按各自字段调整的。新做一个同类页面，直接抄其中最接近的一个，不要另起一套。

## 一、页面结构顺序

1. PageHero（标题 + 副标题；一般不需要 CTA slot——表单本身就是这页唯一的行动点）。
2. 表单本身（两栏，见"二""三"）——**紧跟在 Hero 下面，不要让访客先滚过一堆说明文字才看到表单**。
3. 补充介绍内容放在表单**下方**：这项服务具体是什么、流程说明、FAQ 之类。参考 `hotel-villa-reservations/book.astro` 的顺序：storyFeatures → highlights/FAQ → 相关服务推荐。
4. 相关服务推荐（`RelatedContent`，可选——酒店/接机/票务/包车之间互相推荐）。
5. 底部 `InquiryCTA` 兜底。

**如果是把已有页面的说明内容从表单上方挪到下方，检查文案里有没有"如上/如下"这类指代表单位置的话**——联系表单页这次改造就踩过一次：原文案写"the form below"，挪到表单变成上方之后这句话就是错的，三语（en/zh/fr）都要跟着检查改掉，不要漏改。

## 二、两栏布局（`__layout` / `__main` / `__side`）

CSS 骨架，`CarBookingWidget.astro` 里已验证过的模式，直接照抄（`xxx` 换成组件/页面自己的前缀）：

```css
.xxx__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 56rem) {
  .xxx__layout {
    grid-template-columns: 1fr 20rem;
    align-items: start;
  }

  .xxx__side {
    position: sticky;
    top: var(--space-5);
  }
}

.xxx__side {
  padding: var(--space-4);
  background: var(--color-bg-inset);
  border-radius: var(--radius);
}
```

- 56rem 断点以下自动退化成单列堆叠：主表单在前，侧栏（汇总卡片 + 按钮）跟在表单字段后面——不用额外写响应式分支逻辑，网格自己会处理。
- **组件/表单容器本身不要再叠加一层 `max-width`**——它已经被套在页面的 `.container`（72rem 居中）里了。早前 `CarBookingWidget.astro` 自己又加了 `max-width: 64rem` 却没配 `margin-inline: auto`，导致它在已经居中的父级容器里偏向左边，是这轮对话里排查出的真实 bug，删掉那层多余的宽度限制就好了。

## 三、吸顶"Your Selection"汇总

侧栏内部顺序：步骤指示器 → 汇总卡片（内容为空时整体隐藏）→ 操作按钮 → 状态提示文字。

```astro
<div class="xxx__side">
  <p class="xxx__stepIndicator" id="xxx-step-indicator">...</p>

  <div class="xxx__summary" id="xxx-summary">
    <p class="xxx__summaryTitle">{t('carBooking.summaryTitle')}</p>
    <dl class="xxx__summaryList" id="xxx-summary-list"></dl>
  </div>

  <div class="xxx__actions">
    <button type="button" id="xxx-back-button" hidden>{t('carBooking.backButton')}</button>
    <button type="button" id="xxx-next-button">{t('hotelEnquiry.nextButton')}</button>
    <button type="submit" id="xxx-submit-button" hidden>...</button>
  </div>
  <p class="xxx__status" id="xxx-status" role="status" aria-live="polite"></p>
</div>
```

JS 用一个 `updateSummary()` 函数在相关字段的 `input`/`change` 事件里重建 `dl` 内容，拼字符串塞进 `innerHTML`：

```js
function updateSummary() {
  const rows = [];
  if (fieldA.value) rows.push([fieldALabelText, fieldA.value]);
  // ...每个想展示的字段都判断非空再 push
  summaryList.innerHTML = rows
    .map(([k, v]) => `<div class="xxx__summaryRow"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join('');
}
```

**汇总里只放"这次要预订/咨询的选择项"（目的地、日期、人数、预算、服务类型……），不放姓名/邮箱/电话这类联系方式**——四个预订组件和联系表单页都遵守这条约定：联系方式客户自己刚打完字看得到，重复显示一遍没有意义，汇总应该回答"我选的是什么"，不是"我是谁"。

这几行 `dt`/`dd` 是 JS 动态插入的，不会带 Astro 的 scoping 属性，样式必须用 `:global()` 才能生效：

```css
:global(.xxx__summaryRow) {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: var(--text-small);
}
:global(.xxx__summaryRow dt) {
  color: var(--color-text-muted);
}
:global(.xxx__summaryRow dd) {
  margin: 0;
  text-align: right;
}
```

## 四、分步骤向导

`hidden` 属性切换的面板 + 一个 `showStep(index)` 函数：

```js
function showStep(index) {
  steps.forEach((panel, i) => (panel.hidden = i !== index));
  stepIndicator.textContent = stepLabels[index];
  backButton.hidden = index === 0;
  nextButton.hidden = index === steps.length - 1;
  submitButton.hidden = index !== steps.length - 1;
  root.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

**校验一定要在 Next/Submit 里手动做，不能指望浏览器的整表单校验**——`hidden` 属性不会让浏览器跳过对隐藏字段的 constraint validation，表单如果没写 `novalidate`，切到别的 step 时其他 step 里还没填的必填字段会挡住提交；反过来，即使表单写了 `novalidate`（联系表单就是），也要在点击 Next/Submit 时手动检查，因为 `novalidate` 只是关掉了浏览器自动做的那次检查，不影响手动调用：

```js
const invalid = steps[current].querySelector(':invalid');
if (invalid) {
  invalid.reportValidity();
  return;
}
```

**只检查 `steps[current]`（当前这一步），不要检查整个表单**——其余步骤的字段大多数还没填、也还没到该填的时候。

## 五、翻译 key 复用

不要为每个新表单发明一套新 key，先看这几个已经在多处复用的通用 key 够不够：

- `carBooking.backButton` / `hotelEnquiry.nextButton` —— 通用的"返回 / 下一步"按钮文案，四个预订组件和联系表单页都在用。
- `carBooking.summaryTitle` —— 汇总卡片标题（"Your Selection"）。
- `carBooking.notesLabel` / `carBooking.notesPlaceholder` —— 备注字段。

只有字段本身是这个表单专属的（比如"目的地""预算区间"这类具体业务字段）才新建 key；按钮、标题这类结构性文案先查有没有现成的可以直接 `t(...)` 复用。

## 六、验收

- [ ] 桌面宽屏两栏、≥56rem 断点正常切换；移动端退化单列时汇总卡片 + 按钮跟在表单字段后面，不会被挤没或者难以找到。
- [ ] 汇总卡片内容随填写实时更新，且只展示"选择项"，不重复展示联系方式。
- [ ] 每一步的必填字段校验生效（用浏览器原生校验气泡提示，不是自己另外发明一套错误文案）。
- [ ] 提交成功后表单和汇总卡片都要重置回初始状态——不能提交完页面上还留着上一次填的内容。
- [ ] 补充介绍内容确实在表单下方，不在上方；页面上如果有文案提到表单相对位置（"如上/如下"），三语都要跟着检查改掉。
- [ ] 三语言（en/zh/fr）+ 桌面/移动视口都要过一遍。
- [ ] `npm run format:check && npm run lint && npm run check && npm run build` 全绿。

## 七、自我更新

这份 skill 是把本轮对话里从 `CarBookingWidget.astro` 开始、陆续套用到 `HotelEnquiryWidget`/`VipReceptionBookingWidget`/`TicketBookingWidget`/联系表单页 `/contact/` 的同一套模式沉淀下来的第一版，还比较简单。以后新增或改造这类"先填表单、下面再解释"的页面，先看这份 skill 的骨架能不能直接套用；如果又踩到新坑，或者摸出了更好的写法，照 [[服务页面写作]] 的自我更新方式，把"为什么改""改成什么样"写回对应章节，保持和实际踩过的坑同步。
