import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
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

export default function GuestbookContact({ profile }) {
  const { lang } = useLanguage()
  const zh = lang === 'zh'

  return (
    <>
      {/* Contact */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeader label={zh ? '聯絡我' : 'Contact'} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {/* Email */}
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white
                         border border-black/[0.08] hover:border-[#0071E3]/40
                         hover:shadow-[0_4px_20px_rgba(0,113,227,0.12)]
                         transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#0071E3]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1D1D1F]">Email</p>
                <p className="text-xs text-[#6e6e73] mt-0.5 group-hover:text-[#0071E3] transition-colors">{profile.contact.email}</p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={`https://github.com/${profile.links.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white
                         border border-black/[0.08] hover:border-[#1D1D1F]/30
                         hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                         transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1D1D1F]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1D1D1F]">GitHub</p>
                <p className="text-xs text-[#6e6e73] mt-0.5 group-hover:text-[#1D1D1F] transition-colors">@{profile.links.github}</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://linkedin.com/in/${profile.links.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white
                         border border-black/[0.08] hover:border-[#0077B5]/40
                         hover:shadow-[0_4px_20px_rgba(0,119,181,0.12)]
                         transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#e8f4fb] flex items-center justify-center text-[#0077B5]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.38V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1D1D1F]">LinkedIn</p>
                <p className="text-xs text-[#6e6e73] mt-0.5 group-hover:text-[#0077B5] transition-colors">
                  {zh ? '查看個人檔案 ↗' : 'View Profile ↗'}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Guestbook */}
      <section id="guestbook" className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <SectionHeader label={zh ? '留言板' : 'Guestbook'} />
          <p className="text-sm text-[#6e6e73] mt-3 mb-8">
            {zh
              ? '有什麼想說的都可以留在這裡，需要 GitHub 帳號。'
              : 'Leave a note, question, or hello — requires a GitHub account.'}
          </p>
          <UtterancesComments />
        </div>
      </section>
    </>
  )
}
