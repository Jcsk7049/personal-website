import { describe, it, expect } from 'vitest'
import { uiText } from '../uiText'

describe('uiText.heroLine', () => {
  it('中文主張存在且為定案文案', () => {
    expect(uiText.zh.heroLine).toBe('develop.ing')
  })
  it('英文主張存在且為定案文案', () => {
    expect(uiText.en.heroLine).toBe('develop.ing')
  })
})
