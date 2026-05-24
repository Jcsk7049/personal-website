# Apple 官網設計——完整 DevTools 蒸餾報告

> 三輪 DevTools 實測：apple.com、apple.com/iphone、apple.com/shop

---

## 色彩系統（完整確認）

```css
:root {
  /* 頁面背景 — 不是白色！ */
  --bg:           #F5F5F7;   /* rgb(245,245,247) 實測 */
  --bg-white:     #FFFFFF;
  --bg-dark:      #1D1D1F;   /* rgb(29,29,31) 深色 section */
  --bg-black:     #000000;
  --bg-nav-cur:   rgba(232,232,237,0.4); /* nav 下拉遮幕，實測 */

  /* 文字——不透明度系統 */
  --text:         #1D1D1F;           /* rgb(29,29,31) 主文字 */
  --text-2:       #6E6E73;           /* rgb(110,110,115) 次要 */
  --text-88:      rgba(0,0,0,0.88);  /* Footer 標題 */
  --text-80:      rgba(0,0,0,0.80);  /* 一般連結 */
  --text-72:      rgba(0,0,0,0.72);  /* Footer 連結 */
  --text-inv:     #F5F5F7;           /* 深色背景上的文字 */
  --text-inv2:    rgba(255,255,255,0.70);

  /* 連結 */
  --blue:         #0066CC;   /* rgb(0,102,204) 實測 */
  --blue-ios:     #007AFF;   /* rgb(0,122,255) 實測 */

  /* 分類標籤 */
  --orange:       #B64400;   /* rgb(182,68,0) — h3 實測 */
  --orange-2:     #FF791B;   /* rgb(255,121,27) */

  /* 互動 */
  --glass-pill:   rgba(210,210,215,0.64); /* carousel btn 實測 */
  --glass-curtain:rgba(232,232,237,0.40); /* nav 下拉遮幕 實測 */
  --border:       rgba(0,0,0,0.10);

  /* shadow — 8% 不透明度，Apple 唯一使用的陰影 */
  --shadow:       rgba(0,0,0,0.08) 2px 4px 12px 0px;
}
```

---

## 圓角系統（完整實測）

```css
/* Apple 的六個圓角值，都有實際用途 */
--r-xs:   6px;    /* 小 badge、chip */
--r-sm:   18px;   /* 產品卡片（主要卡片圓角！） */
--r-pill: 56px;   /* carousel 按鈕 */
--r-cta:  980px;  /* CTA ghost 按鈕（pill 形狀） */
--r-full: 100%;   /* 圓形（avatar、icon） */
--r-50:   50%;    /* 同上 */
```

> **重要**：Apple 產品卡片是 `18px`，不是常見的 `12px` 或 `20px`

---

## 字體系統

### 字型堆疊
```css
/* 內文 */
font-family: -apple-system, BlinkMacSystemFont,
             "SF Pro Text", "Helvetica Neue", sans-serif;

/* 展示（h1、大標） */
font-family: -apple-system, BlinkMacSystemFont,
             "SF Pro Display", "Helvetica Neue", sans-serif;
```

### 排版刻度（全部 DevTools 實測）

| 元素 | size | weight | line-height | letter-spacing | color | 說明 |
|------|------|--------|-------------|----------------|-------|------|
| h1 | **80px** | **600** | 87px | normal | `#1D1D1F` | 頁面大標 |
| h2 | 17px | 400 | 21px | normal | `#6E6E73` | 側欄導航標題 |
| h3 | 12px | **600** | 16px | normal | `#B64400` 橘 | 分類標籤「全新」|
| p (featured) | **24px** | **600** | 31px | **0.216px** | `#1D1D1F` | 大促銷文字 |
| body | 17px | 400 | 25px | normal | `#1D1D1F` | 基準 |
| link | 17px | **600** | 21px | normal | `#1D1D1F` 80% | 連結是粗體 |
| price | **14px** | 400 | — | — | 隨背景 | 極低調 |
| label-sm | 12px | 400 | 16px | — | `#6E6E73` | 小標籤 |

```css
/* 完整 CSS */
.t-h1 {
  font-size: clamp(2.5rem, 6.5vw, 5rem);  /* 桌面 80px */
  font-weight: 600; line-height: 1.09; letter-spacing: -0.02em;
}
.t-featured {   /* p 實測，不是普通段落 */
  font-size: 1.5rem; font-weight: 600;
  line-height: 1.29; letter-spacing: 0.009em; /* 0.216px */
}
.t-body {
  font-size: 1.0625rem;  /* 17px */
  font-weight: 400; line-height: 1.47;
}
.t-label {   /* h3 實測，橘色分類 */
  font-size: 0.75rem; font-weight: 600;
  line-height: 1.33; color: var(--orange);
}
.t-price {
  font-size: 0.875rem; font-weight: 400;
  /* 顏色跟隨背景，不單獨強調 */
}
a { font-weight: 600; }  /* 連結一律粗體 */
```

---

## 動畫系統——兩套時長

Apple 有**兩個不同的動畫時長**，分不同情境：

### 1. UI 互動動畫：`0.24s`
用於：Nav dropdown、hover 狀態、toggle、彈出元素
```css
/* globalnav 實測 */
transition:
  opacity   0.24s cubic-bezier(0.4, 0, 0.6, 1),
  transform 0.24s cubic-bezier(0.4, 0, 0.6, 1),
  visibility 0.24s steps(1);
```

### 2. 內容進場動畫：`0.32s`（+0.08s delay）
用於：scroll reveal、頁面內容出現
```css
/* h2 scroll reveal 實測 */
transition:
  opacity   0.32s 0.08s cubic-bezier(0.4, 0, 0.6, 1),
  transform 0.32s 0.08s cubic-bezier(0.4, 0, 0.6, 1);
```

### Nav Dropdown Stagger 細節
```css
/* 第一個項目 */
transition: opacity 0.24s cubic-bezier(0.4,0,0.6,1) 0.20s,
            transform 0.24s cubic-bezier(0.4,0,0.6,1) 0.20s;
/* 每個後續項目 +0.02s delay */
/* 0.20s → 0.22s → 0.24s → 0.26s → 0.28s */

/* dropdown 進場 transform */
/* 從：translateY(-8px) scale(0.8) */
/* 至：translateY(0)    scale(1) */
```

### Scroll Reveal 實作
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

---

## 按鈕系統（完整實測）

### 1. Ghost Pill（主要 CTA）
```css
.btn {
  background: transparent;
  color: rgb(29,29,31);            /* 或 rgb(0,102,204) 藍 */
  border: 1px solid currentColor;
  border-radius: 980px;            /* 實測 */
  padding: 8px 15px;               /* 實測 */
  font-size: 14px;                 /* 實測 */
  font-weight: 400;                /* 實測（不是粗體）*/
  transition: background 0.24s cubic-bezier(0.4,0,0.6,1),
              color      0.24s cubic-bezier(0.4,0,0.6,1);
}
```

### 2. Frosted Carousel Button
```css
.btn-carousel {
  background: rgba(210,210,215,0.64); /* 實測 */
  backdrop-filter: blur(20px);
  border-radius: 56px;                /* 實測 */
  color: #fff;
  /* 無 border */
}
```

### 3. Text Link（藍色）
```css
a.cta-link {
  color: #0066CC;    /* 實測 */
  font-weight: 600;  /* 連結一律粗體 */
  font-size: 14px;
  transition: color 0.32s cubic-bezier(0.4,0,0.6,1);
}
/* 帶箭頭版 */
a.cta-link::after { content: " ›"; }
```

---

## Navbar 系統

```css
/* 初始：position absolute，透明 */
.nav {
  position: absolute;   /* 頁面頂部，不是 fixed */
  height: 48px;         /* 實測 */
  background: rgba(0,0,0,0);  /* 完全透明 */
  backdrop-filter: none;
}

/* scroll 後：position fixed，毛玻璃 */
.nav.scrolled {
  position: fixed;
  background: rgba(245,245,247,0.85);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  transition: background 0.32s cubic-bezier(0.4,0,0.6,1);
}

/* dropdown 遮幕 — 冷灰底調，不是黑色 */
.nav-curtain {
  background: rgba(232,232,237,0.4);  /* 實測 */
  backdrop-filter: blur(20px);         /* 實測 */
}

/* Nav 連結：12px / 400 / rgba(0,0,0,0.8) */
.nav-link {
  font-size: 12px; font-weight: 400;
  color: rgba(0,0,0,0.8);
  padding: 0 8px;
  transition: color 0.24s cubic-bezier(0.4,0,0.6,1);
}
```

---

## Section 間距

```css
/* hero 區：80px top / 64px bottom 實測 */
.hero { padding: 80px 0 64px; }

/* 標準 section */
.section { padding: 7rem 0; }

/* 內容最大寬度（hero 文字欄）*/
.hero-col { max-width: 640px; }  /* 實測 */

/* 頁面容器 */
.container { max-width: 980px; margin: 0 auto; padding: 0 1.5rem; }
.container-wide { max-width: 1440px; }
```

---

## 陰影（極度克制）

```css
/* Apple 只有一種陰影，且非常淡 */
box-shadow: rgba(0,0,0,0.08) 2px 4px 12px 0px;
/* 8% 不透明度，4px Y offset，12px blur */
/* 使用場合：產品卡片 hover 時才出現 */
```

---

## 完整設計 Token

```css
:root {
  /* 背景 */
  --bg:         #F5F5F7;
  --bg-dark:    #1D1D1F;
  --bg-black:   #000000;

  /* 文字 */
  --text:       #1D1D1F;
  --text-2:     #6E6E73;
  --text-80:    rgba(0,0,0,0.80);
  --text-72:    rgba(0,0,0,0.72);
  --text-inv:   #F5F5F7;

  /* 連結 */
  --blue:       #0066CC;
  --blue-ios:   #007AFF;
  --orange:     #B64400;

  /* 圓角 */
  --r-xs:    6px;
  --r-card:  18px;    /* 主要卡片 */
  --r-pill:  56px;    /* carousel */
  --r-cta:   980px;   /* CTA 按鈕 */

  /* 陰影 */
  --shadow:  rgba(0,0,0,0.08) 2px 4px 12px 0px;

  /* 毛玻璃 */
  --glass-nav:     rgba(245,245,247,0.85);
  --glass-pill:    rgba(210,210,215,0.64);
  --glass-curtain: rgba(232,232,237,0.40);
  --glass-blur:    saturate(180%) blur(20px);

  /* 動畫 */
  --ease:      cubic-bezier(0.4, 0, 0.6, 1);
  --dur-ui:    0.24s;   /* hover、dropdown */
  --dur-rev:   0.32s;   /* scroll reveal */
  --dur-delay: 0.08s;   /* reveal delay */
  --stagger:   0.02s;   /* dropdown stagger */

  /* 字體 */
  --font: -apple-system, BlinkMacSystemFont,
          "SF Pro Display", "SF Pro Text",
          "Helvetica Neue", sans-serif;

  /* 間距 */
  --hero-pt:  80px;
  --hero-pb:  64px;
  --sec-py:   7rem;
  --max-w:    980px;
  --max-w-lg: 1440px;
}
```
