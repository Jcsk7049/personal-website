import { QRCodeSVG } from 'qrcode.react'
import { useState, useEffect } from 'react'

const CARD_URL = 'https://personal-website-1kf.pages.dev/card'

export default function QRPage() {
  const [lang, setLang] = useState('zh')

  useEffect(() => {
    document.title = 'QR Code — 江嘉元'
    return () => { document.title = '江嘉元' }
  }, [])

  const text = {
    zh: {
      scan: '掃描查看我的作品集',
      name: '江嘉元',
      sub: '電機 × 機電整合 × AI',
    },
    en: {
      scan: 'Scan to view my portfolio',
      name: 'Jia Yuan Chiang',
      sub: 'EE × Mechatronics × AI',
    },
  }[lang]

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#1D1D1F',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      gap: 0,
    }}>

      {/* 語言切換 */}
      <div style={{
        position: 'absolute',
        top: 24,
        right: 24,
        display: 'flex',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 980,
        padding: 2,
        gap: 2,
      }}>
        {['zh', 'en'].map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: 'none',
              borderRadius: 980,
              padding: '4px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: lang === l ? '#F5F5F7' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              transition: 'all 0.24s cubic-bezier(0.4,0,0.6,1)',
            }}
          >
            {l === 'zh' ? '中文' : 'EN'}
          </button>
        ))}
      </div>

      {/* 上方：頭像 + 名字 */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <img
          src="/455AD532-F2CF-492B-B26C-CEB9053049D5.jpg"
          alt="江嘉元"
          style={{
            width: 72, height: 72,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 14px',
            border: '2px solid rgba(255,255,255,0.1)',
          }}
        />
        <h1 style={{
          fontSize: 22, fontWeight: 600,
          color: '#F5F5F7', letterSpacing: '-0.01em',
          margin: '0 0 4px',
        }}>
          {text.name}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          {text.sub}
        </p>
      </div>

      {/* QR Code */}
      <div style={{
        background: '#fff',
        borderRadius: 24,
        padding: 20,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.5)',
        marginBottom: 24,
      }}>
        <QRCodeSVG
          value={CARD_URL}
          size={200}
          level="M"
          marginSize={0}
        />
      </div>

      {/* 說明文字 */}
      <p style={{
        fontSize: 15, fontWeight: 600,
        color: '#F5F5F7',
        margin: '0 0 8px',
        textAlign: 'center',
      }}>
        {text.scan}
      </p>
      <p style={{
        fontSize: 12,
        color: 'rgba(255,255,255,0.25)',
        margin: 0,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.01em',
      }}>
        personal-website-1kf.pages.dev/card
      </p>

    </div>
  )
}
