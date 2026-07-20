import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../context/LanguageContext'
import { uiText } from '../../data/uiText'
import Hero from '../Hero'

const profile = {
  name: '江嘉元',
  contact: { location: '台灣', email: 'me@example.com' },
  links: { github: 'ghuser', linkedin: 'liuser' },
}

function renderHero() {
  return render(
    <LanguageProvider>
      <Hero profile={profile} />
    </LanguageProvider>
  )
}

describe('Hero（名字最大版）', () => {
  it('名字渲染在 h1 且掛 unveil class', () => {
    renderHero()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('江嘉元')
    expect(h1.querySelector('.hero-name-unveil')).not.toBeNull()
  })

  it('主張文案有渲染（不論預設語言）', () => {
    const { container } = renderHero()
    const text = container.textContent
    expect(
      text.includes(uiText.zh.heroLine) || text.includes(uiText.en.heroLine)
    ).toBe(true)
  })

  it('主張元素掛 .hero-line class', () => {
    const { container } = renderHero()
    expect(container.querySelector('.hero-line')).not.toBeNull()
  })
})
