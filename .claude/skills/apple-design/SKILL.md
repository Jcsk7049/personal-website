---
name: apple-design
description: >
  Apple 官網設計風格實作指南（基於 DevTools 真實數據）。當使用者想建立符合 Apple (apple.com)
  設計語言的 UI、產品頁、登陸頁、電商，或說「Apple 風格」、「科技極簡」、「蘋果感」、
  「SF Pro 字體」，立刻使用此 skill。適用所有追求乾淨、精緻、大字排版設計的需求。
---

# Apple Design Skill
> 所有數值均從 apple.com DevTools 直接提取，非推測。

Apple 的設計語言是**「內容即介面」**：超大字體就是視覺，背景僅是畫布。
沒有多餘邊框、沒有陰影、沒有裝飾——只有文字、產品圖、和精確的空間。

---

## 技術棧（確認）

- **Font**: SF Pro Display / SF Pro Text（系統字體）
- **CSS**: 無框架，純原生 CSS（無 CSS vars）
- **Animation**: JS 驅動，無 CSS keyframes
- **Transition**: 全站統一 0.32s

---

## 色彩系統（DevTools 實測）

```css
:root {
  /* 背景 — #F5F5F7，不是白色！ */
  --bg:          #F5F5F7;   /* rgb(245,245,247) — Apple 標誌淺灰 */
  --bg-white:    #FFFFFF;   /* 部分卡片白底 */
  --bg-dark:     #1D1D1F;   /* 深色卡片/section */
  --bg-black:    #000000;   /* 全黑 hero（iPhone 展示等） */

  /* 文字 — 不透明度系統 */
  --text:        #1D1D1F;          /* rgb(29,29,31) — 主文字 */
  --text-2:      #6E6E73;          /* rgb(110,110,115) — 次要 */
  --text-80:     rgba(0,0,0,0.80); /* 連結顏色 */
  --text-88:     rgba(0,0,0,0.88); /* Footer 標題 */
  --text-72:     rgba(0,0,0,0.72); /* Footer 一般連結 */
  --text-56:     rgba(0,0,0,0.56); /* 更淡 */

  /* 在深色背景上 */
  --text-inv:    #F5F5F7;
  --text-inv-2:  rgba(255,255,255,0.70);

  /* 連結藍 */
  --blue:        #0066CC;   /* 傳統 Apple 連結藍（實測） */
  --blue-ios:    #007AFF;   /* iOS 系統藍 */

  /* 分類標籤色（實測） */
  --orange:      #B64400;   /* rgb(182,68,0) — 深橘標籤 */
  --orange-2:    #FF791B;   /* rgb(255,121,27) — 亮橘 */

  /* 互動元素 */
  --pill-glass:  rgba(210,210,215,0.64); /* 輪播按鈕毛玻璃 */
  --border:      rgba(0,0,0,0.1);

  /* 動畫 */
  --ease:        cubic-bezier(0.4, 0, 0.6, 1);
  --dur:         0.32s;
  --delay:       0.08s;
}
```

### 重要：背景是 #F5F5F7，不是白色

Apple 的頁面底色是一個非常輕微的冷灰，肉眼看起來接近白色，但比較時差異明顯。
深色 section 直接用 `#1D1D1F` 卡片放在 `#F5F5F7` 上，形成強烈對比。

---

## 字體系統（DevTools 實測）

```css
/* CSS 通用寫法 */
font-family: -apple-system, BlinkMacSystemFont,
             "SF Pro Display", "SF Pro Text",
             "Helvetica Neue", Arial, sans-serif;
```

### 排版數值（全部實測）

```css
/* Hero 主標題 — 80px / 600 / line-height 87px */
.hero-title {
  font-size: clamp(2.5rem, 6.5vw, 5rem);  /* 桌面 80px */
  font-weight: 600;
  line-height: 1.09;
  letter-spacing: -0.01em;
  color: var(--text);
}

/* 大導言段落 — 24px / 600 / 31px / 0.216px spacing（實測） */
.lead {
  font-size: 1.5rem;       /* 24px */
  font-weight: 600;
  line-height: 1.29;       /* 31px */
  letter-spacing: 0.009em; /* 0.216px */
  color: var(--text);
}

/* 內文 — 17px / 400 / 25px（實測） */
body {
  font-size: 1.0625rem;  /* 17px */
  font-weight: 400;
  line-height: 1.47;     /* 25px */
}

/* 連結 — 17px / 600（連結是粗體！實測） */
a {
  font-weight: 600;
  color: var(--blue);
  transition: color var(--dur) var(--ease);
}

/* 小標籤 / eyebrow — 12px / 400 或 600 */
.label {
  font-size: 0.75rem;  /* 12px */
  font-weight: 600;
  line-height: 1.33;
  color: var(--orange);  /* 橘色分類標籤，實測 */
}
```

---

## 按鈕系統（DevTools 實測）

Apple 的按鈕非常克制，主要三種：

### 1. Pill Ghost Button（主要 CTA）
```css
/* 實測：border-radius 980px，padding 8px 15px */
.btn {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--text);
  font-size: 0.875rem;      /* 14px */
  font-weight: 400;
  line-height: 1.33;
  padding: 0.5rem 0.9375rem; /* 8px 15px */
  border-radius: 980px;      /* 完全圓角 pill */
  white-space: nowrap;
  transition: background var(--dur) var(--ease),
              color var(--dur) var(--ease);
  cursor: pointer;
}
.btn:hover {
  background: var(--text);
  color: var(--bg);
}

/* 深色背景版 */
.btn-inv {
  color: var(--text-inv);
  border-color: rgba(255,255,255,0.4);
}
.btn-inv:hover {
  background: rgba(255,255,255,0.1);
}
```

### 2. Text Link（一般 CTA）
```css
/* 實測：無背景，藍色文字，600 weight */
.link {
  color: var(--blue);        /* #0066CC */
  font-weight: 600;
  text-decoration: none;
  transition: color var(--dur) var(--ease);
}
.link:hover { color: #004FA3; }

/* chevron 版（Apple 常用 ›） */
.link-arrow::after {
  content: " ›";
  font-size: 1.1em;
}
```

### 3. Frosted Glass Pill（輪播）
```css
/* 實測：rgba(210,210,215,0.64)，56px radius */
.btn-glass {
  background: rgba(210, 210, 215, 0.64);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #fff;
  border-radius: 56px;
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
}
```

---

## 動畫系統（DevTools 實測）

### 核心 Token
```css
/* Apple 全站統一：0.32s, cubic-bezier(0.4,0,0.6,1) */
transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);

/* Scroll reveal（h2 實測）*/
transition: opacity 0.32s 0.08s, transform 0.32s 0.08s;
```

### Scroll Reveal 實作
```css
/* 初始狀態 */
[data-a] {
  opacity: 0;
  transform: translateY(1.5rem);  /* Apple 用較大位移 */
  transition:
    opacity   0.32s 0.08s cubic-bezier(0.4, 0, 0.6, 1),
    transform 0.32s 0.08s cubic-bezier(0.4, 0, 0.6, 1);
}
[data-a].in { opacity: 1; transform: none; }

/* stagger delay */
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

---

## 版面系統

Apple 頁面的典型結構：

```
全寬 section（背景 #F5F5F7）
  └─ 居中容器（max-width: 980px 或 1440px，視內容）
       └─ 大字標題 + 小副標 + CTA + 全寬產品圖

全黑 section（#000 或 #1D1D1F）
  └─ 白字版
```

```css
.page-container { max-width: 980px; margin: 0 auto; padding: 0 1.5rem; }
.page-wide     { max-width: 1440px; margin: 0 auto; padding: 0 2rem; }

.section {
  padding: 7rem 0;         /* 上下大留白 */
  text-align: center;      /* Apple 大量置中 */
}
.section-dark { background: #1D1D1F; color: var(--text-inv); }
.section-black { background: #000; color: var(--text-inv); }
```

---

## Navbar（實測）

```css
.nav {
  position: sticky; top: 0; z-index: 200;
  height: 48px;
  background: rgba(245, 245, 247, 0.85);  /* 半透明 #F5F5F7 */
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
/* nav 連結：rgba(0,0,0,0.8)，12px/400（實測） */
.nav-link {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(0,0,0,0.8);
  transition: color 0.32s cubic-bezier(0.4,0,0.6,1);
}
.nav-link:hover { color: var(--text); }
```

---

## 完整對照表

| 項目 | 值 | 來源 |
|------|----|----|
| 頁面背景 | `#F5F5F7` | body bg 實測 |
| 主文字 | `#1D1D1F` | body color 實測 |
| 次要文字 | `#6E6E73` | h2 color 實測 |
| 連結藍 | `#0066CC` | link color 實測 |
| 標籤橘 | `#B64400` | h3 color 實測 |
| h1 大小 | 80px / 600 | h1 computed 實測 |
| body 大小 | 17px / 400 / 25px | body 實測 |
| p (導言) | 24px / 600 / 31px | p 實測 |
| 連結粗細 | 600 (粗體) | link 實測 |
| 按鈕圓角 | **980px** pill | btn computed 實測 |
| 按鈕 padding | 8px 15px | btn 實測 |
| 動畫時長 | **0.32s** | transition 實測 |
| 動畫 easing | `cubic-bezier(0.4,0,0.6,1)` | transition 實測 |
| Scroll delay | 0.08s | h2 transition delay 實測 |
| 輪播按鈕 | `rgba(210,210,215,0.64)` | btn bg 實測 |

---

## 完整示範頁面

見 `apple-store.html`（根目錄）
