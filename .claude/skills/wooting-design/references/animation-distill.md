# Wooting 動畫與排版系統——真實數據蒸餾報告

> 資料來源：DevTools Console 直接從 wooting.io 提取的 computed styles、keyframes、transitions
> 提取時間：2026-05-24

---

## 一、字體系統（重大更正）

**字體：Figtree，不是 Inter**

```css
font-family: 'Figtree', ui-sans-serif, system-ui, sans-serif;
```

Figtree 是 Google Fonts 上的幾何無襯線字體，比 Inter 更圓潤、更友善。
特色：字重過渡柔和、小寫字母比例偏大、在深色背景上清晰度高。

### 真實排版數值（從 computed styles 提取）

| 元素 | font-size | font-weight | line-height | letter-spacing |
|------|-----------|-------------|-------------|----------------|
| body | 16px | 400 | 24px (1.5) | normal |
| h1   | 24px+ (mobile) | **700** | 1.2 | normal |
| h2   | 24px+ (mobile) | **600** | 1.4 | **-0.0096px** |
| p    | **14px** | **500** | 22.4px (1.6) | normal |
| nav  | 16px | 400 | 24px | normal |

> 注意：DevTools 抓到的是行動版尺寸，桌面版使用 clamp 放大。
> h1/h2 的 24px 是手機起始值，桌面版應為 3-5rem 以上。

### 桌面版推算（基於行動值和視覺觀察）

```css
/* 英雄主標題 */
.hero-title {
  font-family: 'Figtree', ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

/* 頁面標題 */
.section-title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

/* 內文（重要：p 是 14px / 500 weight，不是 16px / 400） */
p {
  font-size: 0.875rem;  /* 14px */
  font-weight: 500;     /* medium，不是 regular！ */
  line-height: 1.6;
}
```

---

## 二、Transition 系統（從 computed 直接提取）

### 主要 Transition（最常見）

```css
/* Tailwind 標準 transition — 0.125s ease-out */
/* 用於：按鈕、連結、顏色、邊框、hover 狀態 */
transition:
  color            0.125s cubic-bezier(0, 0, 0.2, 1),
  background-color 0.125s cubic-bezier(0, 0, 0.2, 1),
  border-color     0.125s cubic-bezier(0, 0, 0.2, 1),
  outline-color    0.125s cubic-bezier(0, 0, 0.2, 1),
  fill             0.125s cubic-bezier(0, 0, 0.2, 1),
  stroke           0.125s cubic-bezier(0, 0, 0.2, 1);
```

### 次要 Transition（較慢）

```css
/* 用於：modal、overlay、大元件進出 */
transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* 用於：transform 動作 */
transition: transform 0.4s, opacity 0.4s;
```

### Easing 解析

| 值 | 意義 | 用途 |
|----|------|------|
| `cubic-bezier(0, 0, 0.2, 1)` | Tailwind `ease-out` — 快入慢停 | 所有 hover、顏色轉換 |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Material `ease-in-out` — 柔和雙向 | modal、大元件 |
| `linear` | 線性 | spin 動畫 |

### 關鍵洞察：0.125s 不是 0.15s 或 0.2s

Wooting 的標準 hover 回饋速度是 **125ms（0.125s）**，這是 Tailwind CSS 的預設值。
比常見的 150ms/200ms 更快，讓互動感覺更即時、更精準——符合品牌的「快速響應」主題。

---

## 三、動畫系統（從 keyframes 提取）

### 確認使用的函式庫
- **Tailwind CSS** + **tailwindcss-animate**（`enter`/`exit` keyframes 為證）
- **Radix UI**（`accordion-down/up`、`collapsible-down/up`）
- **Sonner**（`sonner-fade-in/out`）
- **yarl**（lightbox `yarl__delayed_fadein`）

### 核心：Scroll Reveal 使用 tailwindcss-animate

```css
/* 從 stylesheet 提取的 enter keyframe */
@keyframes enter {
  from {
    opacity: var(--tw-enter-opacity, 1);
    transform:
      translate3d(
        var(--tw-enter-translate-x, 0),
        var(--tw-enter-translate-y, 0),
        0
      )
      scale3d(
        var(--tw-enter-scale, 1),
        var(--tw-enter-scale, 1),
        var(--tw-enter-scale, 1)
      )
      rotate(var(--tw-enter-rotate, 0));
    filter: blur(var(--tw-enter-blur, 0));
  }
}
```

用法（Tailwind class 組合）：

```html
<!-- 淡入 + 從下滑入 -->
<div class="animate-in fade-in slide-in-from-bottom-4 duration-300">

<!-- 淡入 + 縮放 -->
<div class="animate-in fade-in zoom-in-95 duration-200">

<!-- 只淡入 -->
<div class="animate-in fade-in duration-500">
```

等效 CSS（非 Tailwind 環境）：

```css
.fade-in-up {
  --tw-enter-opacity: 0;
  --tw-enter-translate-y: 1rem;   /* slide-in-from-bottom-4 = 16px */
  animation: enter 0.3s cubic-bezier(0, 0, 0.2, 1) both;
}
```

### 產品亮點：switchy-glow-pulse（Switch 發光特效）

```css
/* 用於鍵盤 switch 演示的發光動畫 */
@keyframes switchy-glow-pulse {
  0%, 100% {
    filter:
      drop-shadow(rgb(255, 255, 140) 0px 0px 6px)
      drop-shadow(rgb(255, 220, 140) 0px 0px 12px);
  }
  50% {
    filter:
      drop-shadow(rgb(255, 255, 140) 0px 0px 18px)
      drop-shadow(rgb(255, 220, 140) 0px 0px 36px);
  }
}

/* 黃色系 drop-shadow（這就是 Wooting Yellow 的發光色）：
   #FFFF8C = rgb(255, 255, 140) — 淺亮黃
   #FFDC8C = rgb(255, 220, 140) — 暖琥珀黃                */
```

### Ripple 點擊效果

```css
@keyframes ripple {
  0%   { opacity: 0.5; width: 0;     height: 0; }
  100% { opacity: 0;   width: 500px; height: 500px; }
}
/* 用於按鈕點擊後的漣漪擴散 */
```

### Accordion（Radix UI）

```css
@keyframes accordion-down {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}
/* transition: 0.2s cubic-bezier(0, 0, 0.2, 1) */
```

---

## 四、Layout 系統（從 computed 提取）

```css
/* section 使用 flexbox（不是 block！） */
section { display: flex; }

/* 鍵盤 grid（從 grid 元素提取） */
.keyboard-grid {
  display: grid;
  gap: 8px;
  padding: 16px 10px;
}

/* 按鈕（flex + gap） */
button, a[href] {
  display: flex;
  gap: 4px;
}
```

---

## 五、完整 Token 對照表（修正版）

```css
:root {
  /* === 字體 === */
  --font-family: 'Figtree', ui-sans-serif, system-ui, sans-serif;
  --font-body-size:   0.875rem;   /* 14px */
  --font-body-weight: 500;        /* Medium！非 Regular */
  --font-body-lh:     1.6;
  --font-h1-weight:   700;
  --font-h2-weight:   600;
  --font-h2-ls:       -0.01em;

  /* === Easing === */
  --ease-out:    cubic-bezier(0, 0, 0.2, 1);      /* 所有 hover */
  --ease-inout:  cubic-bezier(0.4, 0, 0.2, 1);    /* modal、大動作 */

  /* === Duration === */
  --dur-fast:    0.125s;   /* hover、顏色 — Tailwind 標準 */
  --dur-base:    0.2s;     /* 中等動作 */
  --dur-slow:    0.3s;     /* 進場、modal */
  --dur-slower:  0.4s;     /* transform、opacity */
  --dur-hero:    0.5s;     /* 英雄區元素 */
}
```

---

## 六、Scroll Reveal 實作（符合 Wooting 真實技術棧）

```html
<!-- HTML -->
<div data-animate class="opacity-0 translate-y-4">
  內容
</div>
```

```js
// JavaScript — Intersection Observer + class 切換
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // 加上 tailwindcss-animate 的類別
      e.target.classList.remove('opacity-0', 'translate-y-4');
      e.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4');
      io.unobserve(e.target);  // once: true
    }
  });
}, { threshold: 0.1, rootMargin: '-60px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
```

```css
/* 純 CSS 版（無 Tailwind） */
[data-animate] {
  opacity: 0;
  transform: translateY(1rem);   /* 16px = Tailwind 的 4 unit */
  transition:
    opacity   0.3s cubic-bezier(0, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0, 0, 0.2, 1);
}
[data-animate].in {
  opacity: 1;
  transform: none;
}

/* Stagger via delay */
[data-animate][data-d="1"] { transition-delay: 0.075s; }
[data-animate][data-d="2"] { transition-delay: 0.15s; }
[data-animate][data-d="3"] { transition-delay: 0.225s; }
[data-animate][data-d="4"] { transition-delay: 0.3s; }
```

---

## 七、之前猜測 vs 真實數據

| 項目 | 之前推測 | 真實值 |
|------|---------|--------|
| 字體 | Inter | **Figtree** |
| hover 時長 | 150ms | **125ms** |
| 主要 easing | `cubic-bezier(0.16, 1, 0.3, 1)` expo-out | **`cubic-bezier(0, 0, 0.2, 1)`** Tailwind ease-out |
| scroll reveal 動畫庫 | Framer Motion | **tailwindcss-animate** |
| p font-size | 1rem/16px | **0.875rem/14px** |
| p font-weight | 400 | **500（Medium）** |
| scroll reveal 位移 | 28px | **16px（Tailwind 4 unit）** |
| scroll reveal 時長 | 650ms | **300ms** |
