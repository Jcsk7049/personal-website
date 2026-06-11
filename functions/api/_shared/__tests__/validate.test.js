import { describe, it, expect } from 'vitest'
import { isPlainObject, isValidSlug } from '../validate.js'

describe('isPlainObject', () => {
  it('accepts plain objects', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1 })).toBe(true)
  })
  it('rejects arrays, null and primitives', () => {
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject('x')).toBe(false)
    expect(isPlainObject(1)).toBe(false)
  })
})

describe('isValidSlug', () => {
  it('accepts lowercase alphanumeric slugs with hyphens', () => {
    expect(isValidSlug('vap')).toBe(true)
    expect(isValidSlug('qmk-stm32-keyboard')).toBe(true)
    expect(isValidSlug('a1')).toBe(true)
  })
  it('rejects invalid slugs', () => {
    expect(isValidSlug('')).toBe(false)
    expect(isValidSlug('Has-Caps')).toBe(false)
    expect(isValidSlug('-leading')).toBe(false)
    expect(isValidSlug('has space')).toBe(false)
    expect(isValidSlug(123)).toBe(false)
  })
})
