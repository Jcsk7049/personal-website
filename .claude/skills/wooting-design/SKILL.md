---
name: wooting-design
description: >
  Wooting 官網設計風格實作指南（基於 DevTools 四輪實測）。當使用者想建立符合 Wooting (wooting.io)
  設計語言的 UI、元件、網頁、登陸頁、產品頁面，或說「Wooting 風格」、「gaming-tech 極簡」、
  「深色遊戲品牌設計」，立刻使用此 skill。也適用於任何 dark mode 電競／鍵盤品牌美學需求。
---

# Wooting Design Skill
> 所有數值均從 wooting.io DevTools 四輪直接提取，非推測。

Wooting 設計語言：**白底為主 + 深色 Hero section**、Figtree 字體、
單一 `#FFB900` 強調色、`0.125s` Tailwind ease-out、**無陰影無 blur**。

---

## 技術棧（確認）

- **Framework**: Next.js + React
- **CSS**: Tailwind CSS v4
- **Animation**: tailwindcss-animate
- **UI**: Radix UI（accordion、collapsible）
- **Font**: **Figtree**（Google Fonts）

---

## 頁面結構

Wooting 是**白底為主**，只有特定 section 用深色：

```
白色 Navbar（sticky，無 border，無 blur）
深色 Hero（bg-surface-p = #09090B，min-h-dvh，產品展示）
白色 Features section
深色 Feature Cards（#18181B）
白色 Products section（max-w-[1200px]，pb-10 = 40px）
深色 Specs section
白色 Reviews section
深色 CTA section
白色 Footer
```

---

## 色彩系統（完整實測）

```css
:root {
  /* 白底系統（主要）*/
  --white:     #FFFFFF;
  --z50:       #FAFAFA;   /* zinc-50 */
  --z100:      #F4F4F5;
  --z200:      #E4E4E7;   /* 卡片 ring border 色 */
  --z300:      #D4D4D8;

  /* 文字（白底上）*/
  --text:      #09090B;   /* zinc-950：主標題、nav links */
  --text-2:    #3F3F46;   /* zinc-700：body 段落文字（不是 zinc-500！）*/
  --text-muted:#71717A;   /* zinc-500：更淡的說明 */
  --text-dim:  #A1A1AA;   /* zinc-400：placeholder */

  /* 深色 section 用 */
  --dark:      #09090B;   /* zinc-950 = bg-surface-p */
  --dark-surf: #18181B;   /* zinc-900：深色卡片 */
  --dark-bdr:  #27272A;   /* zinc-800：深色邊框 */
  --dark-txt:  #FAFAFA;   /* zinc-50 */
  --dark-txt2: #A1A1AA;   /* zinc-400 */

  /* 強調色 — rgb(255,185,0) 實測 */
  --accent:    #FFB900;
  --accent-h:  #E6A700;

  /* Pill badge 顏色（實測三種）*/
  --badge-dark:  #27272A;   /* 深色 badge：active 狀態、促銷標籤 */
  --badge-gray:  #E4E4E7;   /* 淺色 badge：預設 filter tab */
  --badge-green-bg:  #F0FDF4;   /* 綠色 badge：庫存/可用狀態 */
  --badge-green-txt: #032E15;   /* 綠色 badge 文字 */

  /* 過渡 */
  --ease: cubic-bezier(0, 0, 0.2, 1);
  --t:    0.125s;
}
```

### Wooting 設計 Token 名稱對照
| Token 類名 | 計算值 | 用途 |
|-----------|--------|------|
| `bg-surface-p` | `#09090B` | Hero / 深色 section 背景 |
| `bg-surface-white` | `#FFFFFF` | Nav、Footer 背景 |
| `bg-container-primary` | `#FFFFFF` | 白色卡片背景 |
| `rounded-default` | `12px` | 主要圓角（按鈕、卡片） |
| `rounded-pill` | `999px` | Badge / Tag |

---

## 字體排版（完整實測）

```css
body { font-family: 'Figtree', ui-sans-serif, system-ui, sans-serif; }
```

| 元素 | size | weight | line-height | color | 說明 |
|------|------|--------|-------------|-------|------|
| h1 頁面標題 | 32px | 700 | 38.4px | `#09090B` | letter-spacing -0.0096px |
| h2 卡片標題 | 20px | 700 | 24px | `#09090B` | 產品名稱 |
| p lead | 16px | 500 | 25.6px | `#3F3F46` | 強調說明 |
| p body | 16px | 400 | 25.6px | `#3F3F46` | 一般段落 |
| p small | 14px | 500 | 22.4px | `#09090B` | 小標籤 |
| nav link `<a>` | 16px | 400 | 24px | `#09090B` | 直接導覽連結 |
| nav trigger `<button>` | 14px | **600** | — | `#09090B` | 下拉選單觸發鈕，px-6（24px）|

> **重要**：body 段落文字是 `#3F3F46`（zinc-700），不是更淡的 zinc-500

---

## 圓角系統（實測）

```css
--r-sm:   6px;    /* 小按鈕、badge */
--r-md:   8px;    /* 標準元素 */
--r-lg:   12px;   /* rounded-default：主按鈕、卡片 */
--r-pill: 999px;  /* rounded-pill：tag badge */
```

---

## 按鈕系統（完整實測）

### 主要 CTA（accent 色）
```css
/* 實測：bg #FFB900 / font-weight 400 / border-radius 12px / padding 16px 10px */
.btn-primary {
  background: var(--accent);   /* #FFB900 */
  color: var(--text);          /* #09090B */
  font-weight: 400;            /* 不是粗體！實測 */
  font-size: 1rem;             /* 16px */
  padding: 1rem 0.625rem;      /* 16px 10px 實測 */
  border-radius: 12px;         /* rounded-default 實測 */
  border: none;
  transition: background-color 0.125s cubic-bezier(0, 0, 0.2, 1);
}
.btn-primary:hover { background: var(--accent-h); }
```

### 次要按鈕
```css
/* 實測：zinc-200 bg / zinc-700 text / 6px radius / 6px 4px */
.btn-secondary {
  background: #E4E4E7;         /* zinc-200 */
  color: #3F3F46;              /* zinc-700 */
  font-weight: 400;
  font-size: 1rem;
  padding: 0.375rem 0.25rem;   /* 6px 4px 實測 */
  border-radius: 6px;          /* 實測 */
  border: none;
  transition: background-color 0.125s cubic-bezier(0, 0, 0.2, 1);
}
```

### Pill Badge（三種變體）
```css
/* 全部確認：border-radius 999px / padding 4px 10px / font-size 12px / font-weight 600 */
.badge-base {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px;
  padding: 4px 10px;           /* px-2.5 py-1 實測 */
  font-size: 0.75rem;          /* 12px 實測（不是 14px！）*/
  font-weight: 600;
  border: 1px solid currentColor;
}
/* 深色：active tab、促銷標籤 */
.badge-dark  { background: #27272A; color: #FAFAFA; border-color: #27272A; }
/* 淺色：預設 filter tab */
.badge-gray  { background: #E4E4E7; color: #09090B; border-color: #E4E4E7; }
/* 綠色：庫存可用狀態 */
.badge-green { background: #F0FDF4; color: #032E15; border-color: #F0FDF4; }
```

---

## 卡片系統（完整實測）

```css
/* 重點：用 box-shadow 代替 border（Tailwind ring 模式）*/
/* 類名：group/card flex flex-col overflow-hidden rounded-default bg-container-primary */
.card {
  background: #FFFFFF;         /* bg-container-primary 實測 */
  border-radius: 12px;         /* rounded-default 實測 */
  /* ring-1 ring-zinc-200 → box-shadow */
  box-shadow: 0 0 0 1px #E4E4E7;
  transition: all 0.125s cubic-bezier(0, 0, 0.2, 1);  /* cards 用 all！*/
}

/* 深色卡片（feature cards section）*/
.card-dark {
  background: #18181B;
  border-radius: 12px;
  box-shadow: 0 0 0 1px #27272A;
  transition: all 0.125s cubic-bezier(0, 0, 0.2, 1);
}
```

> **注意**：卡片用 `transition: all`，按鈕/連結用 `transition: colors`（多屬性列舉）

---

## Navbar（完整實測）

```css
/* sticky / 白色 / h-16（64px）/ 無 border / 無 blur / max-w-[1200px] px-8 */
.nav {
  position: sticky;
  top: 0; z-index: 50;
  height: 64px;                /* h-16 實測 */
  width: 100%;
  background: #FFFFFF;         /* bg-surface-white 實測 */
  backdrop-filter: none;       /* 實測：無毛玻璃 */
  border-bottom: none;         /* 實測：無邊框 */
  display: flex;
  align-items: center;
  transition: all 0.125s cubic-bezier(0, 0, 0.2, 1);
}
.nav-inner {
  max-width: 1200px;           /* 實測 */
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;             /* px-8 實測 */
  display: flex;
  align-items: center;
  gap: 32px;                   /* gap-8 實測 */
}
/* Nav 直接連結 <a> */
.nav-link {
  font-size: 16px; font-weight: 400;
  color: #09090B;
  transition: color 0.125s cubic-bezier(0, 0, 0.2, 1),
              background-color 0.125s cubic-bezier(0, 0, 0.2, 1);
}
/* Nav 下拉觸發 <button> */
.nav-trigger {
  font-size: 14px; font-weight: 600;
  color: #09090B;
  padding: 0 24px;             /* px-6 實測 */
}
```

---

## 動畫系統（實測確認）

### Tailwind v4 transition-colors（完整屬性列表）
```css
/* 連結、按鈕的 hover transition（W-2 實測完整版）*/
transition:
  color                  0.125s cubic-bezier(0, 0, 0.2, 1),
  background-color       0.125s cubic-bezier(0, 0, 0.2, 1),
  border-color           0.125s cubic-bezier(0, 0, 0.2, 1),
  outline-color          0.125s cubic-bezier(0, 0, 0.2, 1),
  text-decoration-color  0.125s cubic-bezier(0, 0, 0.2, 1),
  fill                   0.125s cubic-bezier(0, 0, 0.2, 1),
  stroke                 0.125s cubic-bezier(0, 0, 0.2, 1),
  --tw-gradient-from     0.125s cubic-bezier(0, 0, 0.2, 1),
  --tw-gradient-via      0.125s cubic-bezier(0, 0, 0.2, 1),
  --tw-gradient-to       0.125s cubic-bezier(0, 0, 0.2, 1);
```

### Scroll reveal（tailwindcss-animate enter keyframe）
```css
[data-a] {
  opacity: 0;
  transform: translateY(1rem);   /* 16px */
  transition:
    opacity   0.3s cubic-bezier(0, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0, 0, 0.2, 1);
}
[data-a].in { opacity: 1; transform: none; }
[data-a][data-d="1"] { transition-delay: 0.075s; }
[data-a][data-d="2"] { transition-delay: 0.150s; }
[data-a][data-d="3"] { transition-delay: 0.225s; }
```

---

## 容器 & 版面系統（實測）

```css
/* 主容器：max-w-[1200px] + px-8（32px）*/
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;             /* px-8 實測（不是 1.5rem！）*/
}

/* Feature card grid：3 欄 gap-4 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* lg:grid-cols-3 實測 */
  gap: 16px;                   /* gap-4 實測 */
}

/* 雙欄 grid */
.two-col-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;            /* gap-x-10 實測 */
}

/* Section 下方留白 */
.section { padding-bottom: 40px; }  /* pb-10 實測 */
```

---

## 響應式斷點（實測）

```css
/* Tailwind 標準斷點 */
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (max-width: 1023px) → lg: 開始 */
xl: 1200px  /* @media (min-width: 1200px) */

/* Wooting 自訂斷點 */
800px       /* 特定模組切換點 */
991px       /* 特定佈局切換點 */
2000px      /* 超寬螢幕 */
```

---

## 表單元素（實測）

```css
/* Email input：邊框在 wrapper 上，input 本身透明 */
.input {
  width: 100%;
  background: transparent;     /* 實測 */
  border: none;                 /* 實測：input 本體無邊框 */
  border-radius: 0px;
  padding: 12px;
  font-size: 14px;
  color: #3F3F46;              /* zinc-700 實測 */
  outline: none;
}
/* wrapper 上才有 ring */
.input-wrapper {
  border-radius: 12px;
  box-shadow: 0 0 0 1px #E4E4E7;
}
```

---

## 禁忌清單（實測確認）

| 禁忌 | 正確值 |
|------|--------|
| `box-shadow` 裝飾陰影 | 完全不用，只有 ring（`0 0 0 1px`）|
| `backdrop-filter` blur | 完全不用 |
| 按鈕 `font-weight: 700` | 主按鈕是 **400**，下拉觸發是 600 |
| 按鈕 `border-radius: 4px` | 實測是 **12px** |
| `border: 1px solid` 卡片邊框 | 用 `box-shadow: 0 0 0 1px #E4E4E7` |
| 次要文字 zinc-500 `#71717A` | 實際是 zinc-700 **`#3F3F46`** |
| badge `font-size: 14px` | 實際是 **12px** |
| 容器 `padding: 0 1.5rem` | 實際是 **`padding: 0 32px`**（px-8）|
| 頁面 max-width 其他值 | 確認是 **1200px** |
| Nav 毛玻璃 / blur | 完全沒有，純白背景 |
