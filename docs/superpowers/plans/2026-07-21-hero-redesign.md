# Hero 重新設計 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把首頁 Hero 改成「名字最大」的編輯式版面——巨大的名字當主角、一句墨黑主張當副標、名字進場以遮罩揭開——在不破壞 Apple 設計語言下製造第一眼衝擊。

**Architecture:** 純前端、單頁元件重構。新文案放 `uiText.js`（i18n，不碰 D1）；`Hero.jsx` 重寫 JSX 為 D 版面並掛進場動畫 class，保留既有捲動視差；`index.css` 新增名字揭開 keyframes 與副標/按鈕級聯，並清掉被取代的舊 hero 動畫 class。

**Tech Stack:** React 18 + Vite + Tailwind（JSX，非 TS）；vitest + @testing-library/react；CSS keyframes（clip-path / transform / opacity）。

## Global Constraints

- 只動三檔：`src/data/uiText.js`、`src/components/Hero.jsx`、`src/index.css`。不動 D1、不需 migration、不動其他區塊。
- 不換色系：只用 `#1D1D1F`（墨黑）/ `#F5F5F7` / `#0071E3`（accent）。不加深色主題。
- 字級守 impeccable 上限：名字 clamp max ≤ `6rem`（96px）；字距 ≥ `-0.04em`（本案用 `-0.03em`）；名字 `font-semibold`（600，不用 bold）。
- 中英同步：`heroLine` 必須 zh + en 都加。zh = `硬體到軟體，中間那段我來。`；en = `Hardware to software — the part in between is mine.`。
- 動畫一律附 `@media (prefers-reduced-motion: reduce)` 對應（硬要求）。
- 無 slop：不加 hero-metric 模板、不加漸層文字、不加裝飾格線、不加 framer-motion/新依賴。
- 每個動畫只動 transform / opacity / clip-path（不動 layout 屬性）。
- 驗證雙軌：可單元測的用 vitest（fail-then-pass）；動畫視覺由 `npx vite build` 綠 + 瀏覽器 computed-style 量測 + 本人 Cloudflare **preview 分支**親眼確認（沿用 2026-07-14 規矩，preview 核准才合 main）。

---

## File Structure

| 檔案 | 職責 | 本計畫改動 |
|------|------|-----------|
| `src/data/uiText.js` | 全站 UI 字串（zh/en） | 新增 `heroLine` |
| `src/components/Hero.jsx` | 首頁 Hero 元件 | 重寫 JSX 為 D 版面；掛進場 class；保留視差；移除 title/bio 呈現 |
| `src/index.css` | 全站動畫/樣式 | 新增 hero 進場 keyframes + reduced-motion；移除舊 `.hero-fade-*`/`.hero-subtitle`/`.hero-bio` |
| `src/components/__tests__/Hero.test.jsx` | Hero 測試（新建） | 驗證名字 + heroLine 渲染 |

---

## Task 1: 新增 Hero 主張文案到 uiText（zh + en）

**Files:**
- Modify: `src/data/uiText.js`（`zh` 物件與 `en` 物件各加一個 key）
- Test: `src/data/__tests__/uiText.heroLine.test.js`（新建）

**Interfaces:**
- Produces: `uiText.zh.heroLine: string`、`uiText.en.heroLine: string`（Task 2 消費 `t.heroLine`）

- [ ] **Step 1: 寫失敗測試**

新建 `src/data/__tests__/uiText.heroLine.test.js`：

```js
import { describe, it, expect } from 'vitest'
import { uiText } from '../uiText'

describe('uiText.heroLine', () => {
  it('中文主張存在且為定案文案', () => {
    expect(uiText.zh.heroLine).toBe('硬體到軟體，中間那段我來。')
  })
  it('英文主張存在且為定案文案', () => {
    expect(uiText.en.heroLine).toBe('Hardware to software — the part in between is mine.')
  })
})
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npx vitest run src/data/__tests__/uiText.heroLine.test.js`
Expected: FAIL（`uiText.zh.heroLine` 為 `undefined`，不等於預期字串）

- [ ] **Step 3: 加入文案**

在 `src/data/uiText.js` 的 `zh` 物件內，找到 `resumeBtnOnePage: '一頁履歷 ↓',` 這一行，在它上方加：

```js
    heroLine: '硬體到軟體，中間那段我來。',
```

在 `en` 物件內，找到 `resumeBtnOnePage: 'One-Page Resume ↓',` 這一行，在它上方加：

```js
    heroLine: 'Hardware to software — the part in between is mine.',
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npx vitest run src/data/__tests__/uiText.heroLine.test.js`
Expected: PASS（2 passed）

- [ ] **Step 5: Commit**

```bash
git add src/data/uiText.js src/data/__tests__/uiText.heroLine.test.js
git commit -m "Add hero tagline copy (zh/en) to uiText"
```

---

## Task 2: 重寫 Hero.jsx 為「名字最大」版面並接線 heroLine

**Files:**
- Modify: `src/components/Hero.jsx`（整檔重寫，見下方完整程式碼）
- Test: `src/components/__tests__/Hero.test.jsx`（新建）

**Interfaces:**
- Consumes: `uiText[lang].heroLine`（Task 1）；`profile.name`、`profile.contact.location`、`profile.contact.email`、`profile.links.github`、`profile.links.linkedin`（既有 cvData 結構）
- Produces: DOM——`<h1>` 內含 `profile.name`（掛 `.hero-name-unveil`）、一段 `.hero-line` 內含 `t.heroLine`、`.hero-cta` 按鈕列。Task 3 的 CSS 靠這些 class 掛動畫。

- [ ] **Step 1: 寫失敗測試**

新建 `src/components/__tests__/Hero.test.jsx`：

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../context/LanguageContext'
import { uiText } from '../../data/uiText'
import Hero from '../Hero'

const profile = {
  name: '江嘉元',
  contact: { location: '台灣', email: 'me@example.com' },
  links: { github: 'ghuser', linkedin: 'liuser' },
}

function renderHero() {
  return render(
    <LanguageProvider>
      <Hero profile={profile} />
    </LanguageProvider>
  )
}

describe('Hero（名字最大版）', () => {
  it('名字渲染在 h1 且掛 unveil class', () => {
    renderHero()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('江嘉元')
    expect(h1.querySelector('.hero-name-unveil')).not.toBeNull()
  })

  it('主張文案有渲染（不論預設語言）', () => {
    const { container } = renderHero()
    const text = container.textContent
    expect(
      text.includes(uiText.zh.heroLine) || text.includes(uiText.en.heroLine)
    ).toBe(true)
  })

  it('主張元素掛 .hero-line class', () => {
    const { container } = renderHero()
    expect(container.querySelector('.hero-line')).not.toBeNull()
  })
})
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npx vitest run src/components/__tests__/Hero.test.jsx`
Expected: FAIL（現行 Hero 沒有 `.hero-name-unveil` / `.hero-line`，且不渲染 heroLine）

- [ ] **Step 3: 整檔重寫 Hero.jsx**

用以下內容**完整取代** `src/components/Hero.jsx`：

```jsx
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Hero({ profile }) {
  const [showScroll, setShowScroll] = useState(true)
  const { lang }                    = useLanguage()
  const t                           = uiText[lang]
  const textWrapRef                 = useRef(null)
  const photoWrapRef                = useRef(null)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 捲動視差：文字與照片以不同速率位移＋淡出（transform/opacity only, rAF 節流）。
  // 掛在外層 wrapper，進場動畫掛在內層元素，兩者不同節點不衝突。
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const apply = () => {
      raf = 0
      const y = window.scrollY
      const h = window.innerHeight || 1
      if (y > h * 1.2) return
      const p = Math.min(y / h, 1)
      if (textWrapRef.current) {
        textWrapRef.current.style.transform = `translateY(${y * 0.18}px)`
        textWrapRef.current.style.opacity   = String(Math.max(1 - p * 1.15, 0))
      }
      if (photoWrapRef.current) {
        photoWrapRef.current.style.transform = `translateY(${y * 0.09}px) scale(${1 - p * 0.05})`
        photoWrapRef.current.style.opacity   = String(Math.max(1 - p * 0.9, 0))
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const resumeHref     = lang === 'en' ? '/resume-en.pdf'      : '/resume-zh.pdf'
  const resumeFullHref = lang === 'en' ? '/resume-en-full.pdf' : '/resume-zh-full.pdf'

  // 名字字級：中文三字可放到 96px；英文較長，min/max 略收允許換行。
  const nameSize = lang === 'en'
    ? 'text-[clamp(2.5rem,6vw,4rem)]'
    : 'text-[clamp(3.5rem,9vw,6rem)]'

  return (
    <section id="hero" className="wash-hero relative min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 md:px-10 w-full relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-20">

          {/* Left: Text（外層吃視差，內層元素吃進場） */}
          <div ref={textWrapRef} className="flex-1 min-w-0" style={{ willChange: 'transform, opacity' }}>
            <p className="hero-eyebrow text-xs font-medium tracking-[0.2em] uppercase text-[#86868B] mb-5">
              {profile.contact.location}
            </p>

            <h1 className={`${nameSize} font-semibold tracking-[-0.03em] leading-[1.0] text-[#1D1D1F] mb-6 text-balance`}>
              <span className="hero-name-unveil inline-block">{profile.name}</span>
            </h1>

            <p className="hero-line text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-[-0.02em] leading-[1.25] text-[#1D1D1F] max-w-[24ch] mb-8 text-balance">
              {t.heroLine}
            </p>

            <div className="hero-cta flex flex-wrap gap-3">
              <button
                onClick={() => { window.location.href = `mailto:${profile.contact.email}` }}
                className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                           hover:bg-[#0077ED] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {profile.contact.email}
              </button>
              <a href={`https://github.com/${profile.links.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                GitHub
              </a>
              <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                LinkedIn
              </a>
              <a href={resumeHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full text-sm font-medium
                            border-2 border-[#0071E3] text-[#0071E3]
                            hover:bg-[#0071E3] hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {t.resumeBtnOnePage}
              </a>
              <a href={resumeFullHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full text-sm font-medium
                            border border-black/[0.12] text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {t.resumeBtnFull}
              </a>
            </div>
          </div>

          {/* Right: Photo（外層吃視差） */}
          <div ref={photoWrapRef} className="shrink-0" style={{ willChange: 'transform, opacity' }}>
            <div className="hero-photo-in flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-[2rem] overflow-hidden
                                bg-[#f5f5f7]
                                shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name}
                         className="w-full h-full object-cover"
                         fetchpriority="high" decoding="async" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2
                                    bg-gradient-to-br from-[#F5F5F7] to-[#E8ECF4]">
                      <span className="text-7xl lg:text-8xl font-bold tracking-tighter text-[#C7C7CC] select-none">
                        {profile.name[0]}
                      </span>
                      <span className="text-xs text-[#C7C7CC] tracking-[0.15em] uppercase select-none">Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                       pointer-events-none transition-opacity duration-500
                       ${showScroll ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#86868B] scroll-bounce">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent scroll-bounce"
             style={{ animationDelay: '0.15s' }} />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npx vitest run src/components/__tests__/Hero.test.jsx`
Expected: PASS（3 passed）

- [ ] **Step 5: 跑全測試確認沒弄壞別的**

Run: `npx vitest run`
Expected: PASS（原 9 個 + 本次新增，全綠）

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/__tests__/Hero.test.jsx
git commit -m "Rewrite Hero to name-largest editorial layout, wire heroLine"
```

---

## Task 3: 名字揭開動畫 + 副標/按鈕級聯（index.css），清掉舊 hero 動畫

**Files:**
- Modify: `src/index.css`（新增 hero 進場區塊；移除舊 `.hero-fade-*` / `.hero-subtitle` / `.hero-bio` 與其 keyframes；更新 reduced-motion 區塊）

**Interfaces:**
- Consumes: Task 2 產生的 class——`.hero-eyebrow`、`.hero-name-unveil`、`.hero-line`、`.hero-cta`、`.hero-photo-in`
- Produces: 無（純樣式）

- [ ] **Step 1: 移除被取代的舊 hero 動畫**

在 `src/index.css` 刪掉這三整段（連同其 `@keyframes`）：

1. `/* ── Hero entrance — 0.45s Apple easing ── */` 底下的 `.hero-fade-left`、`.hero-fade-right` 與 `@keyframes heroFadeLeft`、`@keyframes heroFadeRight`。
2. `/* ── Hero subtitle ── */` 底下的 `.hero-subtitle` 與 `@keyframes subtitleFade`。
3. `/* ── Hero bio ── */` 底下的 `.hero-bio`。

（這些 class 已無元件引用——Task 2 的新 Hero 不再使用它們。）

- [ ] **Step 2: 新增新的 hero 進場區塊**

在原本 `/* ── Hero entrance ── */` 的位置（`.animate-blink` 那段之前）加入：

```css
/* ── Hero entrance（名字最大版）──
   名字以 clip-path 由上往下揭開；eyebrow/副標/按鈕/照片級聯淡入。
   全部只動 transform/opacity/clip-path。 */
.hero-eyebrow { animation: heroFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }

.hero-name-unveil {
  display: inline-block;
  animation: heroUnveil 0.62s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}
@keyframes heroUnveil {
  from { clip-path: inset(0 0 100% 0);    transform: translateY(0.14em); opacity: 0; }
  to   { clip-path: inset(0 0 -0.15em 0); transform: translateY(0);      opacity: 1; }
}

.hero-line     { animation: heroFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both; }
.hero-cta      { animation: heroFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.56s both; }
.hero-photo-in { animation: heroFadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 3: 更新 reduced-motion 區塊**

在 `@media (prefers-reduced-motion: reduce)` 內，把原本針對 `.hero-fade-left, .hero-fade-right` / `.hero-subtitle` / `.hero-bio` 的規則**整段替換**成：

```css
  .hero-eyebrow, .hero-name-unveil, .hero-line, .hero-cta, .hero-photo-in {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }
```

（其餘 reduced-motion 規則——`.reveal`、`.card-stagger`、`.animate-blink`、`.scroll-bounce`、`.page-enter` 等——原樣保留。）

- [ ] **Step 4: 確認沒有殘留的舊 hero class 引用**

Run: `grep -rn "hero-fade\|hero-subtitle\|hero-bio" src/`
Expected: 無輸出（全清乾淨）

- [ ] **Step 5: Build 確認 CSS 合法、無破損**

Run: `npx vite build`
Expected: `✓ built in ...`，無錯誤

- [ ] **Step 6: Commit**

```bash
git add src/index.css
git commit -m "Add hero name-unveil + cascade entrance; drop superseded hero animations"
```

---

## Task 4: 整合驗證（build + 測試 + 瀏覽器量測），推 preview 分支

**Files:** 無新增改動（本任務只驗證與推送）

- [ ] **Step 1: 全量 build + 測試**

Run: `npx vite build && npx vitest run`
Expected: build 綠；vitest 全綠（含 Task 1、2 新增測試）

- [ ] **Step 2: 啟動 dev server 並用 computed-style 量測驗證動畫已掛載**

用 preview_start 起 dev server，然後在瀏覽器 pane 執行 JS 量測（本 session 截圖工具逾時，改量 DOM/computed-style）：

```js
(() => {
  const out = {}
  const name = document.querySelector('#hero .hero-name-unveil')
  const line = document.querySelector('#hero .hero-line')
  out.nameHasAnim = name ? getComputedStyle(name).animationName : 'MISSING'
  out.nameFontPx  = name ? getComputedStyle(name.closest('h1')).fontSize : 'MISSING'
  out.lineText    = line ? line.textContent.trim() : 'MISSING'
  out.lineColor   = line ? getComputedStyle(line).color : 'MISSING'  // 應為 rgb(29,29,31) 墨黑
  out.hOverflow   = document.documentElement.scrollWidth <= window.innerWidth ? '✅ 無溢出' : '❌ 溢出'
  return JSON.stringify(out, null, 1)
})()
```

Expected：`nameHasAnim` = `heroUnveil`；`nameFontPx` 落在 56–96px（桌機寬）；`lineText` = 主張文案；`lineColor` = `rgb(29, 29, 31)`（墨黑，非藍）；`hOverflow` = 無溢出。

- [ ] **Step 3: 手機視窗量測（375px 無溢出、名字仍清楚）**

resize_window 到 mobile（375×812），重跑 Step 2 的 JS。
Expected：`hOverflow` 無溢出；`nameFontPx` ≥ 56px（clamp min 3.5rem）。

- [ ] **Step 4: reduced-motion 驗證**

resize_window 帶 `colorScheme` 不變，改用 emulate；或在 JS 檢查 media query 對應：確認 `.hero-name-unveil` 在 reduced-motion 下 `animation-name` 為 `none`。若瀏覽器 pane 無法切 reduced-motion，改用 CSS 靜態檢查：`grep -A6 'prefers-reduced-motion' src/index.css` 確認含 `.hero-name-unveil ... animation: none`。

- [ ] **Step 5: 推 feature 分支給本人在 Cloudflare preview 親眼確認**

```bash
git push origin claude/personal-website-optimization-fbca13
```

不合 main。等本人在 preview 看真實進場動畫、名字尺寸、墨黑副標、手機表現後，核准才由本人指示合 main。

- [ ] **Step 6: 更新 PROGRESS.md 日誌**

在 PROGRESS.md「工作日誌」最上方記一筆：Hero 重設計（名字最大 + 名字揭開動畫 + 墨黑主張），改 uiText/Hero.jsx/index.css，待本人 preview 核准合 main。commit + push（分支）。

---

## Self-Review

**1. Spec coverage**（對照 `2026-07-21-hero-redesign-design.md`）：
- §3 內容（名字 / heroLine zh+en / 墨黑副標）→ Task 1 + Task 2 ✓
- §4 版面（eyebrow→名字→副標→按鈕；右照片；五按鈕全留；title/bio 退出）→ Task 2 ✓
- §5 字級（名字 clamp、副標 clamp、-0.03em）→ Task 2 nameSize + h1 class ✓
- §6 動態（名字揭開、級聯、視差保留、reduced-motion）→ Task 2 視差 + Task 3 keyframes/reduced-motion ✓
- §7 響應式（flex-col 手機照片在下、375 無溢出）→ Task 2 `flex-col lg:flex-row` + Task 4 Step 3 ✓
- §8 i18n（heroLine 進 uiText，不碰 D1）→ Task 1 ✓
- §9 三檔 → Task 1/2/3 ✓
- §11 驗證（build/vitest/量測/preview）→ Task 4 ✓
- §12 YAGNI（不加依賴、不動照片處理、不動其他區塊）→ 計畫未觸及 ✓

**2. Placeholder scan:** 無 TBD/TODO；每個 code step 都有完整程式碼；測試有實際斷言。eyebrow 確切字句沿用既有 `profile.contact.location`（spec §3 已註明可留待 polish），非 placeholder。

**3. Type consistency:** class 名稱前後一致——`.hero-name-unveil` / `.hero-line` / `.hero-cta` / `.hero-eyebrow` / `.hero-photo-in` 在 Task 2（產生）與 Task 3（掛動畫）、Task 4（量測）三處拼寫一致；`heroLine` key 在 Task 1（定義）與 Task 2（`t.heroLine` 消費）一致；keyframes `heroUnveil` / `heroFadeUp` 定義即引用。

無缺口。
