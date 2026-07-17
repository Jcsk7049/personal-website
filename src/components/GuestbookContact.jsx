import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import SectionHeader from './SectionHeader'

function UtterancesComments() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', 'jcsk7049/personal-website')
    script.setAttribute('issue-term', 'og:title')
    script.setAttribute('label', '💬 guestbook')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    ref.current.appendChild(script)
    return () => {
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [])

  return <div ref={ref} className="mt-2" />
}

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export default function GuestbookContact({ profile }) {
  const { lang } = useLanguage()
  const zh = lang === 'zh'
  const t = uiText[lang]

  return (
    <section id="guestbook" className="wash-guestbook py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Guestbook ── */}
          <div>
            <SectionHeader label={zh ? '留言板' : 'Guestbook'} sub={t.sectionSubs.guestbook} />
            <p className="text-sm text-[#3F3F46] mt-3 mb-2">
              {zh
                ? '有什麼想說的都可以留在這裡，需要 GitHub 帳號。'
                : 'Leave a note or question — GitHub login required.'}
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-[#AEAEB2]">
                {zh ? '或者直接聯繫：' : 'Or reach out directly:'}
              </span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                           bg-[#f0f7ff] text-[#0071E3] border border-[#0071E3]/20
                           hover:bg-[#0071E3] hover:text-white transition-colors duration-[240ms]"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                </svg>
                Gmail
              </a>
              <a
                href={`https://linkedin.com/in/${profile.links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                           bg-[#e8f4fb] text-[#0077B5] border border-[#0077B5]/20
                           hover:bg-[#0077B5] hover:text-white transition-colors duration-[240ms]"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.38V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href={`https://github.com/${profile.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                           bg-[#f5f5f7] text-[#1D1D1F] border border-black/[0.08]
                           hover:bg-[#1D1D1F] hover:text-white transition-colors duration-[240ms]"
              >
                <GithubIcon />
                GitHub
              </a>
            </div>
            <UtterancesComments />
          </div>

          {/* ── Right: Contact (single primary CTA) ── */}
          <div>
            <SectionHeader label={zh ? '聯絡我' : 'Contact'} sub={t.sectionSubs.contact} />
            <a
              href={`mailto:${profile.contact.email}`}
              className="mt-10 flex flex-col items-start gap-5 p-8 rounded-[18px] bg-[#0071E3]
                         hover:bg-[#0077ED] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,113,227,0.28)]
                         active:scale-[0.985] active:shadow-none
                         transition-all duration-[240ms] group"
            >
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
              </div>
              <div>
                <p className="text-xl font-semibold text-white tracking-tight">
                  {zh ? '寄信給我' : 'Email me'}
                </p>
                <p className="text-sm text-white/80 mt-1">{profile.contact.email}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white
                               opacity-80 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
                               transition-all duration-[240ms]">
                {zh ? '開始寫信' : 'Compose an email'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
