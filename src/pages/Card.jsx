import { useEffect, useState } from 'react'

const LINKS = {
  zh: [
    {
      href: 'https://www.linkedin.com/in/%E5%98%89%E5%85%83-%E6%B1%9F-662764344',
      label: 'LinkedIn',
      sub: '江嘉元',
    },
    {
      href: '/',
      label: '個人網站',
      sub: '完整作品集',
    },
    {
      href: 'https://github.com/Jcsk7049',
      label: 'GitHub',
      sub: 'Jcsk7049',
    },
    {
      href: 'mailto:johnjia9491@gmail.com',
      label: 'Email',
      sub: 'johnjia9491@gmail.com',
    },
  ],
  en: [
    {
      href: 'https://www.linkedin.com/in/%E5%98%89%E5%85%83-%E6%B1%9F-662764344',
      label: 'LinkedIn',
      sub: 'Jia Yuan Chiang',
    },
    {
      href: '/',
      label: 'Portfolio',
      sub: 'Full project showcase',
    },
    {
      href: 'https://github.com/Jcsk7049',
      label: 'GitHub',
      sub: 'Jcsk7049',
    },
    {
      href: 'mailto:johnjia9491@gmail.com',
      label: 'Email',
      sub: 'johnjia9491@gmail.com',
    },
  ],
}

const HIGHLIGHTS = [
  {
    zh: { label: 'ICU VAP 預測', desc: 'LSTM × Stay-Level CV，IEEE GCCE 2026 投稿中' },
    en: { label: 'ICU VAP Early Prediction', desc: 'LSTM × Stay-Level CV — IEEE GCCE 2026 Under Review' },
  },
  {
    // FRC: English only regardless of lang
    en: { label: 'FRC Team 7645', desc: '2023 Taiwan Regional Finalist — Systems Integration & Firmware' },
  },
  {
    zh: { label: 'AWS × BitoPro 黑客松', desc: '六服務 AML 管線，31 項行為特徵 + SHAP' },
    en: { label: 'AWS × BitoPro Hackathon', desc: '6-service AML pipeline, 31 behavioral features + SHAP' },
  },
]

const ICONS = {
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  web: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
}

const LINK_ICONS = ['linkedin', 'web', 'github', 'email']

const CHEVRON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const CONTENT = {
  zh: {
    subtitle: '電機 × 機電整合 × AI',
    bio: '高職比賽在做機電整合，現在元智電機大三。機構、電路、韌體、資料都碰過——跨領域的好處是跟不同背景的人合作時比較容易對焦。',
    footer: 'Computex 2025 · 台北',
  },
  en: {
    subtitle: 'EE × Mechatronics × AI',
    bio: 'Competed in mechatronics during high school. Now a 3rd-year EE student at Yuan Ze University. I\'ve touched mechanical, circuit, firmware, and data — the upside of crossing domains is being able to stay aligned when working with people from different backgrounds.',
    footer: 'Computex 2025 · Taipei',
  },
}

export default function Card() {
  const [lang, setLang] = useState('zh')
  const c = CONTENT[lang]
  const links = LINKS[lang]

  useEffect(() => {
    document.title = lang === 'zh' ? '江嘉元 — 名片' : 'Jia Yuan Chiang'
    return () => { document.title = '江嘉元' }
  }, [lang])

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F5F5F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 24px 64px',
    }}>

      {/* 語言切換 */}
      <div style={{
        display: 'flex',
        background: 'rgba(116,116,128,0.12)',
        borderRadius: 980,
        padding: 2,
        marginBottom: 36,
        gap: 2,
      }}>
        {['zh', 'en'].map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: 980,
              padding: '5px 16px',
              fontSize: 13,
              fontWeight: 600,
              color: lang === l ? '#1D1D1F' : '#6E6E73',
              cursor: 'pointer',
              transition: 'background 0.24s cubic-bezier(0.4,0,0.6,1), color 0.24s cubic-bezier(0.4,0,0.6,1)',
              boxShadow: lang === l ? 'rgba(0,0,0,0.08) 0 1px 4px' : 'none',
            }}
          >
            {l === 'zh' ? '中文' : 'EN'}
          </button>
        ))}
      </div>

      {/* Avatar + 姓名 */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <img
          src="/455AD532-F2CF-492B-B26C-CEB9053049D5.jpg"
          alt="江嘉元"
          style={{
            width: 88, height: 88,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 16px',
          }}
        />
        <h1 style={{
          fontSize: 28, fontWeight: 600,
          color: '#1D1D1F', letterSpacing: '-0.02em',
          lineHeight: 1.15, margin: '0 0 4px',
        }}>
          {lang === 'zh' ? '江嘉元' : 'Jia Yuan Chiang'}
        </h1>
        <p style={{ fontSize: 15, fontWeight: 400, color: '#6E6E73', margin: 0, lineHeight: 1.4 }}>
          {c.subtitle}
        </p>
      </div>

      {/* Bio */}
      <p style={{
        fontSize: 15, lineHeight: 1.6, color: '#1D1D1F',
        maxWidth: 320, textAlign: 'center', margin: '0 0 32px',
      }}>
        {c.bio}
      </p>

      {/* 亮點 */}
      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {HIGHLIGHTS.map((h, i) => {
          const item = h[lang] || h.en
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 14,
              padding: '14px 16px',
              boxShadow: 'rgba(0,0,0,0.06) 0 1px 4px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1D1D1F', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: '#6E6E73', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          )
        })}
      </div>

      {/* 連結 */}
      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('/') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: '#fff', borderRadius: 14, padding: '14px 18px',
              textDecoration: 'none', color: '#1D1D1F',
              boxShadow: 'rgba(0,0,0,0.06) 0 1px 4px',
              transition: 'background 0.24s cubic-bezier(0.4,0,0.6,1)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F5F5F7'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <span style={{ color: '#6E6E73', flexShrink: 0 }}>{ICONS[LINK_ICONS[i]]}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>{l.label}</div>
              <div style={{ fontSize: 13, color: '#6E6E73', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.sub}</div>
            </div>
            {CHEVRON}
          </a>
        ))}
      </div>

      {/* 底部 */}
      <p style={{ marginTop: 40, fontSize: 12, color: '#C7C7CC', textAlign: 'center' }}>
        {c.footer}
      </p>

    </div>
  )
}
