import { useState, useEffect } from 'react'
import { api } from '../../api/client'
import { Btn, F, inp, ta } from './ui'

const DEFAULT_RESUME = {
  name: '江嘉元',
  contact: { location: '台北市, 台灣', phone: '+886 928 530 700', email: 'johnjia9491@gmail.com', github: 'Jcsk7049' },
  bio: '就讀元智大學電機工程學系，目前在林書彥教授實驗室進行 ICU 生理訊號 AI 研究。從 FRC 競賽機器人選手出發，橫跨嵌入式韌體、電路設計到深度學習，喜歡把想法從零打造成真實的東西。',
  education: [
    { school: '元智大學', degree: '電機工程學系學士', period: '2024.09 – 2027.09' },
    { school: '明志科技大學', degree: '電機工程學系學士（轉學）', period: '2023.09 – 2024.06' },
    { school: '南港高工', degree: '電子科', period: '2020.09 – 2023.06' },
  ],
  experience: [
    { title: '實驗室專題生', org: '元智大學 林書彥教授實驗室', period: '2025.05 – 現在', desc: '進行 ICU VAP 生理訊號 AI 研究，以 LSTM 時序模型達成 6–72h 超前預警（AUROC 0.98–0.99）；設計 Stay-level CV 修正 Data Leakage，論文預計投稿 IEEE GCCE 2026。' },
    { title: 'Student Mentor & Technical Support', org: 'FRC TEAM 7645', period: '2023 – 現在', desc: '指導機器人開發、除錯；引入 LLM 輔助工具把原本反覆試錯的韌體除錯流程縮短約一週，並把根因除錯思路教給後進。競賽期間擔任教練，協助現場策略決策。' },
    { title: '競賽選手', org: '南港高工 NK-MTC 7645', period: '2020.06 – 2023.09', desc: '負責機器人配線、程式設計與小型機械零件加工，3 年內出賽 3 場 FRC 國際區域賽，並代表參加全國技能競賽。' },
  ],
  projects: [
    { cat: '大學專題', title: '加護病房 VAP 早期預測系統', period: '2025–', desc: 'Stay-level CV 修正 Data Leakage（AUROC 0.99→0.58）；IG 歸因篩選 MAP/RR/Vt/SpO₂，LSTM 於亞東 ICU（n=109）達 6–72h 預警，AUROC 0.98–0.99 / AUPRC 0.81–0.93。', tags: ['PyTorch','LSTM','Integrated Gradients','SMOTE','Medical AI'], github: '' },
    { cat: '校外競賽', title: 'AWS × BitoPro 黑客松：BitOGuard', period: '2026', desc: 'XGBoost / LightGBM × S3→Glue→Athena→SageMaker→Lambda→Bedrock 六服務端對端 AML 管線；31 項行為特徵 + SHAP 合規報告，Streamlit 儀表板已部署。', tags: ['XGBoost','AWS SageMaker','SHAP','Streamlit'], github: 'https://github.com/Jcsk7049/bitoguard-aml' },
    { cat: '校外作品', title: 'QMK × STM32 數字鍵盤', period: '2026', desc: 'STM32F103 + stm32duino bootloader × EasyEDA Pro PCB × QMK + ChibiOS HAL；5×4 矩陣掃描、WS2812B RGB Matrix、VIA/VIAL 即時改鍵，Gerber + 韌體開源。', tags: ['QMK Firmware','STM32','ChibiOS','EasyEDA Pro'], github: 'https://github.com/Jcsk7049/qmk-stm32-keyboard' },
    { cat: '大學課程', title: 'PCB 元件瑕疵偵測（Azure Custom Vision）', period: '2026', desc: '用 Azure Custom Vision 訓練物件偵測模型框出 PCB 破洞 / 翹腳瑕疵，1064+609 張標註影像，Precision 67.4% / Recall 97.5% / mAP 87.4%。', tags: ['Azure Custom Vision','Object Detection','Pascal VOC','Python'], github: '' },
    { cat: '高職作品', title: 'Swerve Drive 全向輪底盤（三代）', period: '2020–2023', desc: 'FRC 競賽全向輪底盤，向量合成運動學 + LabVIEW PID 閉迴路控制，CNC 精密加工，獲 2022 FRC 台灣區控制創新獎。', tags: ['LabVIEW','PID Control','CNC 加工','Robotics'], github: '' },
  ],
  skills: [
    { group: '數據分析', items: [{name:'深度學習',level:'a'},{name:'機器學習',level:'a'},{name:'特徵工程',level:'a'},{name:'訊號過濾',level:'b'},{name:'數據結構化',level:'b'}] },
    { group: '程式開發', items: [{name:'C / C++',level:'a'},{name:'Python',level:'a'},{name:'LabVIEW',level:'b'},{name:'Arduino',level:'b'},{name:'MATLAB',level:'c'}] },
    { group: '電路設計', items: [{name:'Altium Designer',level:'a'},{name:'EasyEDA Pro',level:'b'},{name:'KiCAD',level:'b'},{name:'OrCAD',level:'c'}] },
    { group: '機構加工', items: [{name:'CNC 銑床',level:'a'},{name:'3D 列印',level:'a'},{name:'Autodesk Inventor',level:'a'},{name:'Mastercam',level:'b'},{name:'AutoCAD',level:'b'},{name:'金屬焊接',level:'b'},{name:'雷射切割',level:'b'},{name:'Fusion 360',level:'c'}] },
  ],
  awards: [
    { title: 'AWS × BitoPro 黑客松完賽', year: '2026' },
    { title: 'FRC 台灣鴻海區域賽：亞軍聯盟 & 控制創新獎', year: '2022' },
    { title: '工科賽：數位電子職類代表', year: '2022' },
    { title: '全國技能競賽：集體創作職類代表', year: '2022' },
    { title: 'FRC 中科 5G 區域賽：最佳工業設計獎', year: '2020' },
  ],
}

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') }

function generateResumeHTML(d) {
  const eduHTML = d.education.map(e => `
    <div class="entry">
      <div class="row"><span class="entry-title">${esc(e.school)}</span><span class="entry-period">${esc(e.period)}</span></div>
      <div class="entry-org">${esc(e.degree)}</div>
    </div>`).join('')

  const expHTML = d.experience.map(e => `
    <div class="entry">
      <div class="row"><span class="entry-title">${esc(e.title)}</span><span class="entry-period">${esc(e.period)}</span></div>
      <div class="entry-org">${esc(e.org)}</div>
      <div class="entry-desc">${esc(e.desc)}</div>
    </div>`).join('')

  const projHTML = d.projects.map(p => `
    <div class="proj">
      <div class="row">
        <div><span class="proj-cat">${esc(p.cat)}</span><span class="proj-title">${esc(p.title)}</span></div>
        <span class="entry-period">${esc(p.period)}</span>
      </div>
      <div class="proj-desc">${esc(p.desc)}</div>
      <div class="proj-tags">
        ${p.tags.map(t=>`<span class="ptag">${esc(t)}</span>`).join('')}
        ${p.github ? `<a class="proj-link" href="${esc(p.github)}">GitHub ↗</a>` : ''}
      </div>
    </div>`).join('')

  const skillHTML = d.skills.map(sg => `
    <div class="skill-group">
      <div class="sg-title">${esc(sg.group)}</div>
      <div class="sg-tags">
        ${sg.items.map(s=>`<span class="stag stag-${s.level}">${esc(s.name)}</span>`).join('')}
      </div>
    </div>`).join('')

  const awardHTML = d.awards.map(a => `
    <div class="award-row">
      <span class="award-title">${esc(a.title)}</span>
      <span class="award-year">${esc(a.year)}</span>
    </div>`).join('')

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8" />
<title>${esc(d.name)} — 履歷</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
@page { size: A4 portrait; margin: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { width: 210mm; margin: 0 auto; padding: 14mm 16mm; font-family: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'Hiragino Sans GB', sans-serif; font-size: 8.5pt; line-height: 1.5; color: #1a1a1a; background: #fff; }
h1 { font-size: 20pt; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
a  { color: #0057b8; text-decoration: none; }
.hd { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 8px; border-bottom: 2px solid #1a1a1a; margin-bottom: 14px; }
.hd-left h1 { margin-bottom: 4px; }
.hd-right { text-align: right; font-size: 7.5pt; color: #555; line-height: 1.8; }
.columns { display: grid; grid-template-columns: 1fr 120px; gap: 0 20px; }
.col-main { min-width: 0; } .col-side { min-width: 0; }
.sec { margin-bottom: 13px; }
.sec-title { font-size: 6.5pt; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #999; border-bottom: 1px solid #e8e8e8; padding-bottom: 2px; margin-bottom: 7px; }
.entry { margin-bottom: 8px; } .entry:last-child { margin-bottom: 0; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 6px; }
.entry-title { font-size: 9pt; font-weight: 700; }
.entry-period { font-size: 7pt; color: #888; white-space: nowrap; flex-shrink: 0; }
.entry-org { font-size: 7.5pt; color: #0057b8; font-weight: 600; margin-top: 0.5px; }
.entry-desc { font-size: 7.5pt; color: #444; margin-top: 2px; line-height: 1.45; }
.proj { margin-bottom: 7px; } .proj:last-child { margin-bottom: 0; }
.proj-title { font-size: 8.5pt; font-weight: 700; }
.proj-cat { display: inline-block; font-size: 6pt; padding: 0 4px; border-radius: 2px; border: 1px solid #ddd; background: #f5f5f5; color: #777; margin-right: 3px; vertical-align: middle; line-height: 1.6; }
.proj-desc { font-size: 7.5pt; color: #444; margin-top: 2px; line-height: 1.4; }
.proj-tags { margin-top: 2px; display: flex; flex-wrap: wrap; gap: 2px; }
.ptag { font-size: 6.5pt; background: #f3f3f3; border: 1px solid #e0e0e0; padding: 0 4px; border-radius: 2px; color: #555; }
.proj-link { font-size: 6.5pt; color: #0057b8; margin-left: 2px; }
.skill-group { margin-bottom: 6px; }
.sg-title { font-size: 7.5pt; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
.sg-tags { display: flex; flex-wrap: wrap; gap: 2px; }
.stag { font-size: 6.5pt; padding: 0 4px; border-radius: 2px; border: 1px solid; line-height: 1.6; }
.stag-a { background: #eef2ff; border-color: #c7d2fe; color: #4338ca; }
.stag-b { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
.stag-c { background: #f3f3f3; border-color: #e0e0e0; color: #555; }
.award-row { display: flex; justify-content: space-between; align-items: baseline; gap: 6px; padding: 2.5px 0; border-bottom: 1px solid #f2f2f2; }
.award-row:last-child { border-bottom: none; }
.award-title { font-size: 7.5pt; color: #1a1a1a; }
.award-year  { font-size: 7pt; color: #888; white-space: nowrap; flex-shrink: 0; }
.legend { display: flex; gap: 8px; margin-top: 4px; }
.leg-item { display: flex; align-items: center; gap: 3px; font-size: 6.5pt; color: #888; }
.dl-btn { position: fixed; top: 20px; right: 20px; z-index: 999; display: flex; align-items: center; gap: 6px; padding: 9px 18px; background: #0057b8; color: #fff; font-family: inherit; font-size: 9pt; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 12px rgba(0,87,184,0.35); transition: background 0.15s; letter-spacing: 0.01em; }
.dl-btn:hover { background: #0047a0; }
.dl-btn svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }
@media print { body { padding: 14mm 16mm; width: 100%; } .no-print { display: none !important; } }
@media screen { html { background: #e8e8e8; } body { margin: 20px auto; box-shadow: 0 4px 24px rgba(0,0,0,0.18); } }
</style>
</head>
<body>
<div class="hd">
  <div class="hd-left">
    <h1>${esc(d.name)}</h1>
    <div style="margin-top:4px;font-size:7.5pt;color:#555;display:flex;gap:14px;flex-wrap:wrap;">
      <span>${esc(d.contact.location)}</span>
      <span>${esc(d.contact.phone)}</span>
      <a href="mailto:${esc(d.contact.email)}">${esc(d.contact.email)}</a>
      <a href="https://github.com/${esc(d.contact.github)}">github.com/${esc(d.contact.github)}</a>
    </div>
  </div>
</div>
<div class="columns">
<div class="col-main">
  <div class="sec"><div class="sec-title">個人簡介</div><p class="entry-desc">${esc(d.bio)}</p></div>
  <div class="sec"><div class="sec-title">學歷</div>${eduHTML}</div>
  <div class="sec"><div class="sec-title">經歷</div>${expHTML}</div>
  <div class="sec"><div class="sec-title">精選專案</div>${projHTML}</div>
</div>
<div class="col-side">
  <div class="sec">
    <div class="sec-title">技術</div>
    ${skillHTML}
    <div class="legend">
      <div class="leg-item"><span class="stag stag-a" style="font-size:5.5pt;">進階</span></div>
      <div class="leg-item"><span class="stag stag-b" style="font-size:5.5pt;">熟悉</span></div>
      <div class="leg-item"><span class="stag stag-c" style="font-size:5.5pt;">基礎</span></div>
    </div>
  </div>
  <div class="sec"><div class="sec-title">獲獎</div>${awardHTML}</div>
</div>
</div>
<button class="dl-btn no-print" onclick="window.print()">
  <svg viewBox="0 0 24 24"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z"/></svg>
  下載 PDF
</button>
</body>
</html>`
}

// ── Accordion block for resume sections ─────────────────────────────────────

function RSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-black/[0.02] transition-colors">
        <span className="text-sm font-semibold text-[#1D1D1F]">{title}</span>
        <span className="text-[#86868B]">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-black/[0.06] space-y-3">{children}</div>}
    </div>
  )
}

function ListEditor({ items, setItems, emptyItem, renderRow }) {
  const add    = () => setItems(s => [...s, { ...emptyItem }])
  const remove = i => setItems(s => s.filter((_, j) => j !== i))
  const update = (i, f, v) => setItems(s => s.map((x, j) => j === i ? { ...x, [f]: v } : x))
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="relative bg-black/[0.02] rounded-xl p-3 space-y-2">
          <button type="button" onClick={() => remove(i)} className="absolute top-2 right-2 text-[#86868B] hover:text-red-500 text-lg leading-none">×</button>
          {renderRow(item, i, (f, v) => update(i, f, v))}
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 新增</button>
    </div>
  )
}

export default function ResumeTab({ toast }) {
  const [data, setData]     = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getSection('resume_data', 'zh')
      .then(v => setData(v && v.name ? v : DEFAULT_RESUME))
      .catch(() => setData(DEFAULT_RESUME))
  }, [])

  const set    = (f, v) => setData(d => ({ ...d, [f]: v }))
  const setCon = (f, v) => setData(d => ({ ...d, contact: { ...d.contact, [f]: v } }))

  const save = async () => {
    setSaving(true)
    try {
      const html = generateResumeHTML(data)
      await Promise.all([
        api.setSection('resume_data', data, null),
        api.setResume('zh', html),
      ])
      toast('已儲存，履歷已更新', true)
    } catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  if (!data) return <p className="text-sm text-[#86868B]">載入中…</p>

  const previewHTML = generateResumeHTML(data)

  return (
    <div className="flex gap-5" style={{minHeight:'calc(100vh - 80px)'}}>
      {/* ── Left: editor ── */}
      <div className="w-[560px] shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#1D1D1F]">履歷編輯</p>
          <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存並發布'}</Btn>
        </div>

      {/* Header */}
      <RSection title="基本資訊" defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <F label="姓名"><input className={inp} value={data.name} onChange={e => set('name', e.target.value)} /></F>
          <F label="Email"><input className={inp} value={data.contact.email} onChange={e => setCon('email', e.target.value)} /></F>
          <F label="電話"><input className={inp} value={data.contact.phone} onChange={e => setCon('phone', e.target.value)} /></F>
          <F label="地點"><input className={inp} value={data.contact.location} onChange={e => setCon('location', e.target.value)} /></F>
          <F label="GitHub username"><input className={inp} value={data.contact.github} onChange={e => setCon('github', e.target.value)} /></F>
        </div>
        <F label="個人簡介">
          <textarea className={ta} rows={4} value={data.bio} onChange={e => set('bio', e.target.value)} />
        </F>
      </RSection>

      {/* Education */}
      <RSection title="學歷">
        <ListEditor
          items={data.education}
          setItems={v => set('education', v)}
          emptyItem={{ school: '', degree: '', period: '' }}
          renderRow={(item, _, upd) => (
            <div className="grid grid-cols-[1fr_1fr_140px] gap-2">
              <F label="學校"><input className={inp} value={item.school} onChange={e => upd('school', e.target.value)} /></F>
              <F label="科系 / 學位"><input className={inp} value={item.degree} onChange={e => upd('degree', e.target.value)} /></F>
              <F label="時間"><input className={inp} value={item.period} onChange={e => upd('period', e.target.value)} /></F>
            </div>
          )}
        />
      </RSection>

      {/* Experience */}
      <RSection title="經歷">
        <ListEditor
          items={data.experience}
          setItems={v => set('experience', v)}
          emptyItem={{ title: '', org: '', period: '', desc: '' }}
          renderRow={(item, _, upd) => (
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_1fr_140px] gap-2">
                <F label="職稱"><input className={inp} value={item.title} onChange={e => upd('title', e.target.value)} /></F>
                <F label="機構"><input className={inp} value={item.org} onChange={e => upd('org', e.target.value)} /></F>
                <F label="時間"><input className={inp} value={item.period} onChange={e => upd('period', e.target.value)} /></F>
              </div>
              <F label="描述">
                <textarea className={ta} rows={4} value={item.desc} onChange={e => upd('desc', e.target.value)} />
              </F>
            </div>
          )}
        />
      </RSection>

      {/* Projects */}
      <RSection title="精選專案">
        <ListEditor
          items={data.projects}
          setItems={v => set('projects', v)}
          emptyItem={{ cat: '', title: '', period: '', desc: '', tags: [], github: '' }}
          renderRow={(item, _, upd) => (
            <div className="space-y-2">
              <div className="grid grid-cols-[100px_1fr_120px] gap-2">
                <F label="分類標籤"><input className={inp} value={item.cat} onChange={e => upd('cat', e.target.value)} placeholder="大學專題" /></F>
                <F label="專案名稱"><input className={inp} value={item.title} onChange={e => upd('title', e.target.value)} /></F>
                <F label="時間"><input className={inp} value={item.period} onChange={e => upd('period', e.target.value)} /></F>
              </div>
              <F label="描述">
                <textarea className={ta} rows={3} value={item.desc} onChange={e => upd('desc', e.target.value)} />
              </F>
              <div className="grid grid-cols-2 gap-2">
                <F label="Tags（逗號分隔）">
                  <input className={inp} value={item.tags.join(', ')} onChange={e => upd('tags', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
                </F>
                <F label="GitHub URL（選填）">
                  <input className={inp} value={item.github} onChange={e => upd('github', e.target.value)} placeholder="https://github.com/..." />
                </F>
              </div>
            </div>
          )}
        />
      </RSection>

      {/* Skills */}
      <RSection title="技術">
        <p className="text-xs text-[#86868B]">等級：<b>a</b> = 進階　<b>b</b> = 熟悉　<b>c</b> = 基礎</p>
        <ListEditor
          items={data.skills}
          setItems={v => set('skills', v)}
          emptyItem={{ group: '', items: [] }}
          renderRow={(sg, _, updSg) => (
            <div className="space-y-2">
              <F label="群組名稱"><input className={inp} value={sg.group} onChange={e => updSg('group', e.target.value)} /></F>
              <F label="技能（每行一個，格式：名稱,等級）">
                <textarea className={ta} rows={4}
                  value={sg.items.map(s=>`${s.name},${s.level}`).join('\n')}
                  onChange={e => updSg('items', e.target.value.split('\n').filter(l=>l.trim()).map(l => {
                    const [name,...rest]=l.split(','); return {name:name.trim(), level:(rest.join(',').trim()||'c')}
                  }))}
                  placeholder={"深度學習,a\n機器學習,a\n訊號過濾,b"}
                />
              </F>
            </div>
          )}
        />
      </RSection>

      {/* Awards */}
      <RSection title="獲獎">
        <ListEditor
          items={data.awards}
          setItems={v => set('awards', v)}
          emptyItem={{ title: '', year: '' }}
          renderRow={(item, _, upd) => (
            <div className="grid grid-cols-[1fr_80px] gap-2">
              <F label="獎項名稱"><input className={inp} value={item.title} onChange={e => upd('title', e.target.value)} /></F>
              <F label="年份"><input className={inp} value={item.year} onChange={e => upd('year', e.target.value)} /></F>
            </div>
          )}
        />
      </RSection>
      </div>

      {/* ── Right: live preview ── */}
      <div className="flex-1 min-w-0 sticky top-14 self-start" style={{height:'calc(100vh - 80px)'}}>
        <div className="h-full rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden bg-white flex flex-col">
          <div className="px-4 py-2 border-b border-black/[0.06] flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-[#86868B]">即時預覽</span>
            <span className="text-xs text-[#86868B]">（編輯後自動更新）</span>
          </div>
          <iframe srcDoc={previewHTML} className="flex-1 w-full border-0" title="resume preview" />
        </div>
      </div>
    </div>
  )
}
