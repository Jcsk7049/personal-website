---
name: apple-design
description: >
  Apple 官網設計風格實作指南（基於 DevTools 真實數據）。當使用者想建立符合 Apple (apple.com)
  設計語言的 UI、產品頁、登陸頁、電商，或說「Apple 風格」、「科技極簡」、「蘋果感」、
  「SF Pro 字體」，立刻使用此 skill。適用所有追求乾淨、精緻、大字排版設計的需求。
---

# Apple Design Skill
> 所有數值均從 apple.com DevTools 三輪直接提取，非推測。

Apple 的設計語言是**「內容即介面」**：超大字體就是視覺，背景僅是畫布。
沒有多餘邊框、沒有陰影、沒有裝飾——只有文字、產品圖、和精確的空間。

---

## 技術棧（確認）

- **Font**: SF Pro Display / SF Pro Text（系統字體，用 `-apple-system` 堆疊）
- **CSS**: 無框架，純原生 CSS，BEM 語義類名（`globalnav-*`、`ac-gf-*`）
- **Animation**: JS 驅動，極少 CSS keyframes
- **Transition**: `color 0.32s cubic-bezier(0.4, 0, 0.6, 1)`（**只有 color**，不是 all）

---

## 色彩系統（完整實測）

```css
:root {
  /* 頁面背景 — #F5F5F7，不是白色！ */
  --bg:          #F5F5F7;   /* rgb(245,245,247) — Apple 標誌淺灰 */
  --bg-white:    #FFFFFF;   /* 部分卡片白底 */
  --bg-dark:     #1D1D1F;   /* rgb(29,29,31) 深色 section */
  --bg-black:    #000000;   /* 全黑 hero */

  /* 文字 — 不透明度系統（實測） */
  --text:        #1D1D1F;           /* rgb(29,29,31) 主文字 */
  --text-2:      #6E6E73;           /* rgb(110,110,115) 次要 */
  --text-drop:   #333336;           /* rgb(51,51,54) dropdown 連結 ← 新增 */
  --text-80:     rgba(0,0,0,0.80);  /* nav bar 連結 */
  --text-88:     rgba(0,0,0,0.88);  /* Footer 標題 */
  --text-72:     rgba(0,0,0,0.72);  /* Footer 連結 */
  --text-56:     rgba(0,0,0,0.56);  /* 更淡說明 */

  /* 深色背景上 */
  --text-inv:    #F5F5F7;
  --text-inv-2:  rgba(255,255,255,0.70);

  /* 連結藍 */
  --blue:        #0066CC;   /* rgb(0,102,204) 傳統 Apple 連結藍 */
  --blue-ios:    #007AFF;   /* rgb(0,122,255) iOS 系統藍 */

  /* 分類標籤色 */
  --orange:      #B64400;   /* rgb(182,68,0) 深橘標籤 */
  --orange-2:    #FF791B;   /* rgb(255,121,27) 亮橘 */

  /* 互動元素 */
  --glass-pill:    rgba(210,210,215,0.64);  /* carousel 按鈕 */
  --glass-nav:     rgba(245,245,247,0.85);  /* nav scroll 狀態 */
  --glass-curtain: rgba(232,232,237,0.40);  /* nav dropdown 遮幕 */
  --border:        rgba(0,0,0,0.10);

  /* 陰影（唯一一種，極淡）*/
  --shadow: rgba(0,0,0,0.08) 2px 4px 12px 0px;

  /* 動畫 */
  --ease:      cubic-bezier(0.4, 0, 0.6, 1);
  --dur-ui:    0.24s;   /* Nav dropdown、hover 互動 */
  --dur-rev:   0.32s;   /* Scroll reveal、連結 hover */
  --delay:     0.08s;   /* Reveal delay */
}
```

### 重要：背景是 #F5F5F7，不是白色
Apple 頁面底色是非常輕微的冷灰，肉眼接近白色但有差異。
深色 section 直接用 `#1D1D1F` 形成強烈對比。

---

## 字體系統（實測）

```css
font-family: -apple-system, BlinkMacSystemFont,
             "SF Pro Display", "SF Pro Text",
             "Helvetica Neue", Arial, sans-serif;
```

### 排版刻度（全部實測）

| 元素 | size | weight | line-height | letter-spacing | color |
|------|------|--------|-------------|----------------|-------|
| Hero h1 | 80px | 600 | 87px (1.09) | -0.02em | `#1D1D1F` |
| Dropdown 大類標題 | **24px** | **600** | — | **0.216px** | `#333336` |
| p lead（大導言）| **24px** | **600** | 31px (1.29) | **0.216px** | `#1D1D1F` |
| body | **17px** | 400 | 25px (1.47) | normal | `#1D1D1F` |
| Nav bar 連結 | **12px** | **400** | — | normal | `rgba(0,0,0,0.8)` |
| Dropdown 次要連結 | **12px** | **600** | — | normal | `#333336` |
| label / eyebrow | 12px | 600 | 16px | normal | `#B64400` |
| price | 14px | 400 | — | — | 隨背景 |

```css
/* Hero 主標題 */
.t-h1 {
  font-size: clamp(2.5rem, 6.5vw, 5rem);  /* 桌面 80px */
  font-weight: 600;
  line-height: 1.09;
  letter-spacing: -0.02em;
}

/* 大導言段落 / Dropdown 大類 */
.t-lead {
  font-size: 1.5rem;        /* 24px */
  font-weight: 600;
  line-height: 1.29;
  letter-spacing: 0.009em;  /* 0.216px — 實測 */
}

/* 內文 */
.t-body {
  font-size: 1.0625rem;     /* 17px */
  font-weight: 400;
  line-height: 1.47;
}

/* Nav bar 連結 */
.t-nav {
  font-size: 0.75rem;       /* 12px */
  font-weight: 400;
  color: rgba(0,0,0,0.8);
  padding: 0 8px;
}
```

---

## Navbar（完整三層實測）

### Nav Bar 本體
```css
.globalnav {
  position: sticky;
  top: 0; z-index: 9999;
  height: 48px;
  background: rgba(245,245,247,0.85);   /* 毛玻璃 */
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

/* Nav bar 連結（商店、Mac、iPhone...）*/
.globalnav-link {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0,0,0,0.8);
  padding: 0 8px;
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}

/* Apple logo 連結 */
.globalnav-logo {
  font-size: 17px;
  font-weight: 600;
  color: rgba(0,0,0,0.8);
  padding: 0 8px;
}
```

### Dropdown 飛出選單
```css
/* Dropdown 遮幕 */
.globalnav-curtain {
  background: rgba(232,232,237,0.40);
  backdrop-filter: blur(20px);
}

/* 飛出選單大類標題連結 */
.globalnav-flyout-link-primary {
  font-size: 24px;
  font-weight: 600;
  color: rgb(51,51,54);          /* #333336 — 不是 #1D1D1F！*/
  padding: 9px 11px 7px;         /* 實測精確值 */
  letter-spacing: 0.216px;
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}

/* 飛出選單次要連結 */
.globalnav-flyout-link-secondary {
  font-size: 12px;
  font-weight: 600;
  color: rgb(51,51,54);
  padding: 7px 11px;             /* 實測精確值 */
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
```

---

## 按鈕系統（完整實測）

### 1. Ghost Pill（主要 CTA）
```css
.btn {
  background: transparent;
  color: #1D1D1F;
  border: 1px solid currentColor;
  border-radius: 980px;          /* 實測 */
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 400;
  transition: background 0.24s cubic-bezier(0.4,0,0.6,1),
              color      0.24s cubic-bezier(0.4,0,0.6,1);
}
.btn:hover { background: #1D1D1F; color: #F5F5F7; }

/* 深色背景版 */
.btn-inv { color: #F5F5F7; border-color: rgba(255,255,255,0.4); }
.btn-inv:hover { background: rgba(255,255,255,0.1); }
```

### 2. Text Link（CTA 連結）
```css
.link {
  color: #0066CC;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.32s cubic-bezier(0.4,0,0.6,1);
}
.link:hover { color: #004FA3; }
.link-arrow::after { content: " ›"; font-size: 1.1em; }
```

### 3. Frosted Glass Pill（輪播控制）
```css
.btn-glass {
  background: rgba(210,210,215,0.64);
  backdrop-filter: blur(20px);
  border-radius: 56px;
  width: 40px; height: 40px;
  color: #fff;
}
```

---

## 動畫系統（兩套時長，實測確認）

```css
/* UI 互動（hover、dropdown open/close）*/
--dur-ui: 0.24s;
transition: color 0.24s cubic-bezier(0.4, 0, 0.6, 1);

/* 內容進場（scroll reveal、連結一般 hover）*/
--dur-rev: 0.32s;
transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

/* ⚠️ Apple 的連結 transition 只有 color！不是 all，不是 background！*/
```

### Scroll Reveal
```css
[data-a] {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity   0.32s 0.08s cubic-bezier(0.4, 0, 0.6, 1),
    transform 0.32s 0.08s cubic-bezier(0.4, 0, 0.6, 1);
}
[data-a].in { opacity: 1; transform: none; }
[data-a][data-d="1"] { transition-delay: 0.16s; }
[data-a][data-d="2"] { transition-delay: 0.24s; }
[data-a][data-d="3"] { transition-delay: 0.32s; }
```

```js
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-a]').forEach(el => io.observe(el));
```

### Nav Dropdown Stagger
```css
/* 第一個項目 delay 0.20s，每個後續 +0.02s */
/* translateY(-8px) scale(0.8) → translateY(0) scale(1) */
.flyout-item:nth-child(1) { transition-delay: 0.20s; }
.flyout-item:nth-child(2) { transition-delay: 0.22s; }
.flyout-item:nth-child(3) { transition-delay: 0.24s; }
/* ... */
```

---

## 版面系統（實測）

```css
/* 主容器 */
.container     { max-width: 980px;  margin: 0 auto; padding: 0 1.5rem; }
.container-lg  { max-width: 1440px; margin: 0 auto; padding: 0 2rem; }

/* Section 間距 */
.section { padding: 7rem 0; text-align: center; }

/* Hero */
.hero { padding: 80px 0 64px; }
.hero-col { max-width: 640px; }

/* 深色 section */
.section-dark  { background: #1D1D1F; color: #F5F5F7; }
.section-black { background: #000000; color: #F5F5F7; }
```

---

## 響應式斷點（Apple 完整體系，實測）

Apple 的斷點以自家設備為錨點，完全不遵循 Tailwind 慣例：

```css
/* ── 手機 ── */
@media (max-width: 480px) { }    /* iPhone SE 等小螢幕 */
@media (max-width: 640px) { }    /* iPhone 標準 */
@media (max-width: 734px) { }    /* iPhone Plus / Pro Max */

/* ── 平板 ── */
@media (max-width: 833px) { }    /* iPad mini */
@media (min-width: 834px) { }    /* iPad（主要平板切換點）*/
@media (max-width: 1068px) { }   /* iPad Pro 11" / MacBook Air */

/* ── 桌機 ── */
@media (min-width: 1069px) and (min-height: 776px) { }  /* 桌機 hero */
@media (max-width: 1023px) { }   /* 通用 tablet/mobile */
@media (max-width: 1044px) { }   /* 部分佈局切換 */
@media (min-width: 1441px) { }   /* 大螢幕 / iMac */

/* ── 功能查詢 ── */
@media (hover: hover) { }        /* 非觸控裝置 hover */
@media (prefers-contrast: more) { }
@media (inverted-colors) { }
@media print { }

/* ── 高解析度 ── */
@media (-webkit-min-device-pixel-ratio: 1.5),
       (min-resolution: 1.5dppx) { }   /* Retina 圖片替換 */
```

> **Apple 的關鍵斷點**：480 / 640 / 734 / 834 / 1068 / 1441（對應真實 Apple 設備尺寸）
> **Wooting 的關鍵斷點**：640 / 768 / 1024 / 1200（Tailwind 標準）

---

## 表單元素（實測）

```css
/* Search input（globalnav）*/
.globalnav-searchfield-input {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 1px 34px 0px;   /* 34px 側邊留給 icon */
  font-size: 24px;          /* 實測：搜尋框字很大 */
  color: rgb(51,51,54);     /* #333336 */
  outline: none;
}
```

---

## 陰影（極度克制）

```css
/* Apple 只有一種陰影，且僅在 hover 時出現 */
box-shadow: rgba(0,0,0,0.08) 2px 4px 12px 0px;
/* 8% 不透明度，Y offset 4px，blur 12px */
/* 使用場合：產品卡片 hover 才出現，平常無陰影 */
```

---

## 圓角系統（實測）

```css
--r-xs:   6px;     /* 小 badge、chip */
--r-card: 18px;    /* 產品卡片（主要！不是 12px）*/
--r-pill: 56px;    /* carousel 按鈕 */
--r-cta:  980px;   /* CTA ghost 按鈕 */
--r-full: 50%;     /* 圓形 icon */
```

---

## 禁忌清單（實測確認）

| 禁忌 | 正確值 |
|------|--------|
| 頁面背景用白色 | 實際是 **`#F5F5F7`** |
| Nav 用 `position: fixed` + 透明 | 實際是 sticky + 毛玻璃 |
| 連結 `font-weight: 400` | 連結一律 **600**（nav bar 除外）|
| `transition: all` | Apple 連結只用 **`transition: color`** |
| 動畫時長只用一個值 | UI 互動 **0.24s**，內容 reveal **0.32s** |
| 卡片圓角 12px | Apple 卡片是 **18px** |
| CTA 按鈕 `border-radius: 12px` | Apple CTA 是 **980px** pill |
| Dropdown 文字用 `#1D1D1F` | Dropdown 連結是 **`#333336`** |
| 套用 Tailwind 斷點 | Apple 用設備尺寸：734 / 834 / 1068 / 1441 |
| 使用任何 CSS 框架 | Apple 純原生 CSS + BEM 類名 |
