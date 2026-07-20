# Codex 第二審核 Brief — Hero 重新設計

你（Codex）是這個 Hero 重設計的**獨立第二審核者**。寫這份計畫的是另一個 agent（Claude），它已經自我審查過機械層面。**你的價值不在複查它查過的東西，而在它身在框內看不到的角度。**

## 最高指令

> **最有價值的發現，是這份 brief 清單上沒有的那一條。**
> 這份清單是 Claude 自己「懷疑但看不清」的盲點——它必然不完整。不要被它框住。
> 你可以推翻整個前提、質疑「這件事現在該不該做」、指出一個沒人提過的失效模式。
> 橡皮圖章式的「看起來沒問題」對本人零價值；**帶著要挑毛病的預設立場進來。**

## 要讀什麼

計畫與 spec 在 feature 分支 `claude/personal-website-optimization-fbca13`（尚未合 main）：
- Spec：`docs/superpowers/specs/2026-07-21-hero-redesign-design.md`
- Plan：`docs/superpowers/plans/2026-07-21-hero-redesign.md`
- 現行元件：`src/components/Hero.jsx`、`src/index.css`、`src/data/uiText.js`

（你在 main，若不想切分支：`git show claude/personal-website-optimization-fbca13:<path>` 讀檔。）

## 核心決策摘要（給你脈絡，不必當定論）

- 版面「D」：本人的名字放到最大（zh 上限 96px）當主角；一句新文案「硬體到軟體，中間那段我來。」（en: "Hardware to software — the part in between is mine."）當墨黑副標；右側照片；名字進場以 clip-path 由上往下揭開。
- 動機：本人覺得現在的 Hero「太平、沒視覺衝擊」，選了「靠排版做衝擊」。
- 限制：不換色系、不加深色、不加依賴、守 Apple/impeccable 規範、動畫附 reduced-motion。
- 站點定位：本人求職中，目標**嵌入式韌體 / FAE 實習**（PROGRESS.md 記載「開始投實習」為最高優先）。

## Claude 自承的盲點（種子，非邊界）

請攻擊這些，並超越這些：

**A. 文案判斷（Claude 自己想的，偏見最大）**
- 「中間那段我來」的語氣——對一個還沒有戰績的應屆生，native 讀起來是自信還是自負/狂？
- 「中間那段」會不會反而**自貶**成「兩端都不夠深、樣樣通樣樣鬆」？
- 對嵌入式/硬體的招募官，把一句 slogan 當 hero 主角，是加分還是「行銷感」扣分？
- FAE/軟硬整合 是不是最該賭的那一句——vs 直接打「嵌入式韌體」（他求職主線）？

**B. 前提本身（Claude 在「要衝擊」的框內）**
- 編輯式大字 hero 對「嵌入式 hiring manager」是幫助還是傷害？會不會讀成「設計仔」而**削弱「認真工程師」的訊號**？
- 「視覺衝擊」是不是這個受眾/這一頁的正確最佳化目標——還是資訊密度/可掃描性更重要？
- **機會成本**：本人第一優先是投實習。現在打磨 hero 是對的力氣分配，還是在履歷 PDF 還跟 .tex 脫鉤、實習還沒投出去時的 bikeshedding？

**C. 效能 / LCP（你剛做過 loading 優化 c28fdfe，這是你的鏡頭）**
- 那個巨大名字幾乎肯定是 **LCP 元素**。進場動畫讓它 `opacity:0→1` + clip-path，等於**最大的文字一開始是隱形的**——會不會拖垮 LCP、回吐你剛做的 Lighthouse 優化？
- clip-path/transform 進場會不會造成 CLS？
- 跟 c28fdfe 的載入優化有無衝突或抵銷？

**D. 無障礙（Claude 只做了 reduced-motion）**
- clip 動畫期間螢幕報讀器怎麼念名字？有無 flash-of-invisible-text？
- `animation-fill-mode: both` 若 paint/JS 卡頓，元素會不會卡在隱形態？
- 墨黑 #1D1D1F 副標壓在 `wash-hero` 漸層上，對比還 ≥4.5:1 嗎（實測，別假設）？

**E. i18n / 版面壓力測試（Claude 只 spec、沒實測）**
- 英文名 "Chiang Jia Yuan"（15 字）在 clamp(2.5,6vw,4rem)——換行行為？中文 3 字很衝擊、英文 15 字會不會只是「長」而不「大」？兩語言的 hero 氣勢是否落差過大？
- 英文副標帶 em-dash，在 375px 會不會溢出？跨字型的破折號渲染？
- **羅馬拼音不一致（已發現）**：cvData=「Chiang Jia Yuan」、履歷=「Chia-Yuan / Chiang Jia-Yuan」、LinkedIn slug=「Jiang」（Pinyin 姓）。全頁最大的字必須跟履歷/LinkedIn 對齊——現在三套並存。

**F. 砍掉的內容（Claude 把 bio/title 移出 hero）**
- SEO / 資訊線索：hero 現在少了可索引的定位文字，有影響嗎？
- eyebrow 用 `profile.contact.location` 是這個位置的最佳解，還是該放定位句？

**G. 測試設計（Claude 自己寫的）**
- 測試斷言「精確 copy 字串」＝把測試綁死行銷文案，每次改字就紅——這設計對嗎？
- 測試只證「有渲染＋class 在」，動畫正確性/視覺回歸零覆蓋——是足夠，還是假安心？

**H. 全頁一致性**
- 96px 的 hero 名字 vs SectionHeader ~3.25rem——整頁還像一個系統，還是 hero 變得像外掛上去的？

## 不必再查（Claude 已做，別浪費）

- spec 逐條覆蓋的機械勾稽、class 命名前後一致、三檔範圍、git rebase 到 main 的正確性。

## 產出格式

排序後的發現，每條含：
1. **角度**（一句）
2. **具體失效情境**（什麼輸入/情境 → 什麼壞結果，不要「可能不好」這種空話）
3. **建議探法或修法**
4. **標記**：`[清單外]` 如果這是本 brief 沒列到的角度——**這些最有價值**，請優先。

最後給一個裁決：
- **可照計畫執行** / **執行前先改計畫**（列出必改項）/ **該重新考慮前提**（說明為什麼）。
