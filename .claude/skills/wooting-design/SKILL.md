---
name: wooting-design
description: >
  Wooting 官網設計風格實作指南（基於 DevTools 三輪實測）。當使用者想建立符合 Wooting (wooting.io)
  設計語言的 UI、元件、網頁、登陸頁、產品頁面，或說「Wooting 風格」、「gaming-tech 極簡」、
  「深色遊戲品牌設計」，立刻使用此 skill。也適用於任何 dark mode 電競／鍵盤品牌美學需求。
---

# Wooting Design Skill
> 所有數值均從 wooting.io DevTools 三輪直接提取，非推測。

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
深色 Hero（#09090B，產品展示）
白色 Features section
深色 Feature Cards（#18181B）
白色 Products section
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
  --dark:      #09090B;   /* zinc-950 */
  --dark-surf: #18181B;   /* zinc-900：深色卡片 */
  --dark-bdr:  #27272A;   /* zinc-800：深色邊框 */
  --dark-txt:  #FAFAFA;   /* zinc-50 */
  --dark-txt2: #A1A1AA;   /* zinc-400 */

  /* 強調色 — rgb(255,185,0) 實測 */
  --accent:    #FFB900;
  --accent-h:  #E6A700;

  /* Pill badge 顏色（實測） */
  --badge-dark:#27272A;   /* 深色 badge */
  --badge-gray:#E4E4E7;   /* 淺色 badge */

  /* 過渡 */
  --ease: cubic-bezier(0, 0, 0.2, 1);
  --t:    0.125s;
}
```

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
| nav link | 16px | 400 | 24px | `#09090B` | 導覽連結 |

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
/* 實測：bg #FFB900 / font-weight 400 / 12px / 16px 10px */
.btn-primary {
  background: var(--accent);   /* #FFB900 */
  color: var(--text);          /* #09090B */
  font-weight: 400;            /* 不是粗體！實測 */
  font-size: 1rem;             /* 16px */
  padding: 1rem 0.625rem;     /* 16px 10px 實測 */
  border-radius: 12px;         /* rounded-default 實測 */
  border: none;
  transition: 0.125s cubic-bezier(0, 0, 0.2, 1);
}
.btn-primary:hover { background: var(--accent-h); }
```

### 次要按鈕
```css
/* 實測：zinc-200 bg / zinc-700 text / 6px / 6px 4px */
.btn-secondary {
  background: #E4E4E7;         /* zinc-200 */
  color: #3F3F46;              /* zinc-700 */
  font-weight: 400;
  font-size: 1rem;
  padding: 0.375rem 0.25rem;  /* 6px 4px 實測 */
  border-radius: 6px;          /* 實測 */
  border: none;
  transition: 0.125s cubic-bezier(0, 0, 0.2, 1);
}
```

### Pill Badge
```css
/* 實測：999px / 4px 10px */
.badge-dark { background: #27272A; color: #FAFAFA; }
.badge-gray { background: #E4E4E7; color: #09090B; border: 1px solid #E4E4E7; }
.badge-base {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px;        /* rounded-pill 實測 */
  padding: 4px 10px;           /* px-2.5 py-1 實測 */
  font-size: 0.875rem; font-weight: 600;
}
```

---

## 卡片系統（完整實測）

```css
/* 重點：用 box-shadow 代替 border（Tailwind ring 模式） */
.card {
  background: #FFFFFF;
  border-radius: 12px;         /* rounded-default 實測 */
  /* ring-1 ring-zinc-200 實測 → box-shadow */
  box-shadow:
    rgba(0,0,0,0) 0px 0px 0px 0px,
    rgba(0,0,0,0) 0px 0px 0px 0px,
    rgba(0,0,0,0) 0px 0px 0px 0px,
    rgb(228,228,231) 0px 0px 0px 1px,  /* ← 這才是真正的「邊框」*/
    rgba(0,0,0,0) 0px 0px 0px 0px;
  /* 或簡寫：box-shadow: 0 0 0 1px #E4E4E7; */
}

/* 深色卡片（feature cards section）*/
.card-dark {
  background: #18181B;
  border-radius: 12px;
  box-shadow: 0 0 0 1px #27272A;
}
```

> **沒有 box-shadow 陰影！** Wooting 完全不用裝飾性陰影，只用 ring。

---

## Navbar（完整實測）

```css
/* sticky / 白色 / 64px / 無 border / 無 blur / padding 16px */
.nav {
  position: sticky;            /* 實測 */
  top: 0; z-index: 50;
  height: 64px;                /* h-16 實測 */
  width: 100%;
  background: #FFFFFF;         /* bg-surface-white 實測 */
  backdrop-filter: none;       /* 實測：無毛玻璃 */
  border-bottom: none;         /* 實測：無邊框 */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;               /* 實測 */
  transition: all 0.125s cubic-bezier(0, 0, 0.2, 1);
}
```

---

## 動畫系統（實測確認）

```css
/* Tailwind 標準 — 0.125s ease-out，全站統一 */
transition:
  color            0.125s cubic-bezier(0, 0, 0.2, 1),
  background-color 0.125s cubic-bezier(0, 0, 0.2, 1),
  border-color     0.125s cubic-bezier(0, 0, 0.2, 1),
  box-shadow       0.125s cubic-bezier(0, 0, 0.2, 1);

/* Scroll reveal（tailwindcss-animate enter keyframe）*/
[data-a] {
  opacity: 0;
  transform: translateY(1rem);   /* 16px = Tailwind 4u */
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

## 容器系統（實測）

```css
/* max-width: 1200px 實測 */
.container {
  width: 100%;
  max-width: 1200px;          /* 實測 */
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

---

## 禁忌清單（實測確認）

| 禁忌 | 原因 |
|------|------|
| `box-shadow` 陰影 | 完全沒用，只有 ring |
| `backdrop-filter` blur | 完全沒用 |
| 按鈕 `font-weight: 700` | 實測是 400 |
| 按鈕 `border-radius: 4px` | 實測是 12px |
| `border: 1px solid` 卡片邊框 | 用 box-shadow ring 代替 |
| 次要文字 zinc-500 | 實際是 zinc-700 `#3F3F46` |
| 頁面 max-width 其他值 | 確認是 1200px |
