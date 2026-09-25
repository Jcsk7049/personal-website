// 全站共用的設計常數：顏色、漸層、精熟度設定。
// 改顏色只改這裡，SkillGrid / SkillDetail / ProjectShowcase / Admin 都會跟著變。

export const PROJECT_ACCENTS = {
  'virtual-office':    'from-[#D9DEE2] to-[#737C84]',
  'job-radar':         'from-[#D9DEE2] to-[#737C84]',
  'analog-ic-studio':  'from-[#D9DEE2] to-[#737C84]',
  'vap':               'from-[#D9DEE2] to-[#737C84]',
  'aws-hackathon':     'from-[#D9DEE2] to-[#737C84]',
  'teammatch':         'from-[#D9DEE2] to-[#737C84]',
  'audio-amplifier':   'from-[#D9DEE2] to-[#737C84]',
  'qmk-stm32-keyboard':'from-[#D9DEE2] to-[#737C84]',
  'whack-a-mole':      'from-[#D9DEE2] to-[#737C84]',
  'auto-sanitizer':    'from-[#D9DEE2] to-[#737C84]',
  'team-robot':        'from-[#D9DEE2] to-[#737C84]',
  'swerve':            'from-[#D9DEE2] to-[#737C84]',
}

// 純色版本（給文字用，漸層文字不可讀且是 AI 感的地雷，只留給背景用）
export const PROJECT_ACCENT_SOLID = {
  'virtual-office':    'text-[#737C84]',
  'job-radar':         'text-[#737C84]',
  'analog-ic-studio':  'text-[#737C84]',
  'vap':               'text-[#737C84]',
  'aws-hackathon':     'text-[#737C84]',
  'teammatch':         'text-[#737C84]',
  'audio-amplifier':   'text-[#737C84]',
  'qmk-stm32-keyboard':'text-[#737C84]',
  'whack-a-mole':      'text-[#737C84]',
  'auto-sanitizer':    'text-[#737C84]',
  'team-robot':        'text-[#737C84]',
  'swerve':            'text-[#737C84]',
}

export function accent(id) {
  return PROJECT_ACCENTS[id] || 'from-gray-300 to-gray-400'
}

export function accentSolid(id) {
  return PROJECT_ACCENT_SOLID[id] || 'text-gray-400'
}

export const CATEGORY_STYLES = {
  '高職選手作品': 'bg-[#F1F2F3] text-[#59636C] border-[#D9DEE2]',
  '大學課程作品': 'bg-[#F1F2F3] text-[#59636C] border-[#D9DEE2]',
  '大學專題作品': 'bg-[#F1F2F3] text-[#59636C] border-[#D9DEE2]',
  '大學校外作品': 'bg-[#F1F2F3] text-[#59636C] border-[#D9DEE2]',
}

export const SKILL_CAT_ACCENTS = {
  data_analysis: 'from-[#D9DEE2] to-[#737C84]',
  programming:   'from-[#D9DEE2] to-[#737C84]',
  eda:           'from-[#D9DEE2] to-[#737C84]',
  manufacturing: 'from-[#D9DEE2] to-[#737C84]',
}

export const SKILL_CAT_ACCENT_SOLID = {
  data_analysis: 'text-[#737C84]',
  programming:   'text-[#737C84]',
  eda:           'text-[#737C84]',
  manufacturing: 'text-[#737C84]',
}

export const LEVEL_CONFIG = {
  '基礎': { dots: 1, badge: 'bg-[#F5F5F7] text-[#86868B]', bar: 'bg-black/20'  },
  '熟悉': { dots: 2, badge: 'bg-[#E8EAEC] text-[#66717A]', bar: 'bg-[#737C84]' },
  '進階': { dots: 3, badge: 'bg-[#D9DEE2] text-[#4E5962]', bar: 'bg-[#515B64]' },
}

export const SKILL_LEVELS = ['進階', '熟悉', '基礎']
