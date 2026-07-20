import { describe, it, expect } from 'vitest'
import { uiText } from '../uiText'

describe('uiText.heroLine', () => {
  it('中文主張存在且為定案文案', () => {
    expect(uiText.zh.heroLine).toBe('硬體到軟體，中間那段我來。')
  })
  it('英文主張存在且為定案文案', () => {
    expect(uiText.en.heroLine).toBe('Hardware to software — the part in between is mine.')
  })
})
