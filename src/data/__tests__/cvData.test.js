import { describe, it, expect } from 'vitest'
import cvZh from '../cvData.json'
import cvEn from '../cvData.en.json'

describe('cvData zh/en sync', () => {
  it('has the same top-level sections', () => {
    expect(Object.keys(cvEn).sort()).toEqual(Object.keys(cvZh).sort())
  })

  it('has matching project ids in the same order', () => {
    expect(cvEn.projects.map(p => p.id)).toEqual(cvZh.projects.map(p => p.id))
  })

  it('every project has an id, title and cover', () => {
    for (const p of cvZh.projects) {
      expect(p.id).toBeTruthy()
      expect(p.title).toBeTruthy()
    }
  })
})
