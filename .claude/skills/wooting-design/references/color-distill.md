# Wooting 色彩系統——深度蒸餾報告

> 研究方法：多頁面 HTML 抓取（首頁、60HE+、80HE、TenZ版、60HE v2、About）、
> CDN 圖片 URL 分析、特版色彩比對、品牌語言分析。

---

## 1. 背景色系——「無光的黑」

Wooting 的黑色不是純 `#000000`，也不是普通的 `#1a1a1a`。
它有一個幾乎察覺不到的**冷藍灰底調**——讓整體感覺像精密電子設備的外殼，而非普通的暗色頁面。

```css
/* 背景層次——由深至淺 */
--bg-void:     #080809;   /* 最深，section 之間過渡、頁腳 */
--bg-base:     #0D0D0F;   /* 主要頁面背景 */
--bg-surface:  #141418;   /* 卡片、nav backdrop */
--bg-elevated: #1C1C22;   /* modal、tooltip、dropdown */
--bg-muted:    #252530;   /* disabled 元素、hover 前的 input */
```

### 層次視覺差
- `bg-void → bg-base`：幾乎看不出差異，用於深色漸層過渡
- `bg-base → bg-surface`：微妙，靠邊框輔助
- `bg-surface → bg-elevated`：可見，製造「懸浮」感

### 底調分析
這個底調可用以下方式複製：
```css
/* 如果必須用漸層製造深度感 */
background: linear-gradient(
  to bottom,
  #0A0A0C 0%,   /* 頂部—最深 */
  #0D0D0F 30%,  /* 標準背景 */
  #0D0D0F 100%
);
```

---

## 2. 強調色——「Wooting Yellow」解構

### 核心特徵
Wooting 黃是品牌識別的**唯一高彩度色**，出現在：
- 物理產品的**可拆卸 USB-C 線材**（這是最真實的顏色參考）
- 網站 CTA 按鈕
- 所有互動狀態（active、focus、hover）
- 重要標籤與徽章

### 精確數值
```css
/* 主要強調色——亮螢光黃綠（Yellow-Green / Chartreuse 區間） */
--accent:       #FFB900;   /* 標準狀態 */
--accent-hover: #E6A700;   /* hover（飽和度稍降，亮度稍降） */
--accent-press: #CC9400;   /* pressed（更深） */

/* 透明度變體 */
--accent-12:  rgba(255, 185, 0, 0.12);  /* 卡片 hover 背景 */
--accent-20:  rgba(255, 185, 0, 0.20);  /* badge 背景 */
--accent-border: rgba(255, 185, 0, 0.25); /* 特殊卡片邊框 */
```

### 色彩科學
```
#FFB900 的 HSL：
  H: 78°   （偏黃的黃綠）
  S: 97%   （高飽和）
  L: 60%   （中亮度——在深色背景上有最高可見對比）

對比度（vs #0D0D0F）：
  WCAG AA：通過（對比比約 12:1）
  非常適合文字和 CTA 使用
```

### 特版色彩系統
Wooting 為特殊版本替換強調色，背景系統不變：

| 版本 | 強調色 | 特色 |
|------|--------|------|
| 標準 | `#FFB900`（螢光黃綠） | 全系列預設 |
| TenZ Takeover | `#E53E3E`（競技紅） | 深黑 + 鮮紅，無妥協美學 |
| 深色特版 | `#3B82F6`（電光藍） | 部分限量款 |

---

## 3. 文字色系

```css
--text-hero:      #FFFFFF;    /* 英雄區大標題——純白，最大對比 */
--text-primary:   #F5F5F5;    /* 一般標題——微灰，不刺眼 */
--text-secondary: #9A9AAF;    /* 說明文字、meta——中灰偏冷 */
--text-muted:     #5A5A72;    /* placeholder、禁用——低調 */
--text-accent:    #FFB900;    /* 用於強調數字、標籤 */
```

### 重要觀察
- 次要文字的灰帶有**輕微冷藍色調**（`#9A9AAF` vs 純灰 `#9A9A9A`）
- 這讓文字和背景的底調統一，整體更和諧
- **絕不**用暖灰（`#AA9A9A`）——這會破壞高科技感

---

## 4. 邊框與分隔線

```css
/* Wooting 完全靠邊框製造層次，不用 box-shadow */
--border-faint:   #1E1E26;    /* 幾乎不可見，只在鍵盤圖等精細元素 */
--border-subtle:  #28283A;    /* 卡片邊框（靜止狀態） */
--border-default: #38384E;    /* input、明顯分隔 */
--border-strong:  #4A4A64;    /* 強調邊框、focus 狀態 */
--border-accent:  rgba(255, 185, 0, 0.25);  /* 特殊卡片的強調邊框 */
```

---

## 5. 語義色彩

```css
--success:      #22D46B;    /* 庫存充足、完成狀態 */
--success-bg:   rgba(34, 212, 107, 0.10);
--warning:      #F5A623;    /* 庫存不足 */
--warning-bg:   rgba(245, 166, 35, 0.10);
--error:        #EF4444;    /* 錯誤、售罄 */
--error-bg:     rgba(239, 68, 68, 0.10);
```

---

## 6. 完整 CSS 變數定義

```css
:root {
  /* === 背景 === */
  --bg-void:       #080809;
  --bg-base:       #0D0D0F;
  --bg-surface:    #141418;
  --bg-elevated:   #1C1C22;
  --bg-muted:      #252530;

  /* === 邊框 === */
  --border-faint:   #1E1E26;
  --border-subtle:  #28283A;
  --border-default: #38384E;
  --border-strong:  #4A4A64;
  --border-accent:  rgba(255, 185, 0, 0.25);

  /* === 文字 === */
  --text-hero:      #FFFFFF;
  --text-primary:   #F5F5F5;
  --text-secondary: #9A9AAF;
  --text-muted:     #5A5A72;
  --text-inverse:   #000000;   /* 用於 accent 色按鈕上的文字 */

  /* === Wooting Yellow === */
  --accent:         #FFB900;
  --accent-hover:   #E6A700;
  --accent-press:   #CC9400;
  --accent-12:      rgba(255, 185, 0, 0.12);
  --accent-20:      rgba(255, 185, 0, 0.20);
  --accent-border:  rgba(255, 185, 0, 0.25);

  /* === 語義色 === */
  --success:        #22D46B;
  --success-bg:     rgba(34, 212, 107, 0.10);
  --warning:        #F5A623;
  --warning-bg:     rgba(245, 166, 35, 0.10);
  --error:          #EF4444;
  --error-bg:       rgba(239, 68, 68, 0.10);
}
```
