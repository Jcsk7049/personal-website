// 全站共用的設計常數：顏色、漸層、精熟度設定。
// 改顏色只改這裡，SkillGrid / SkillDetail / ProjectShowcase / Admin 都會跟著變。

export const PROJECT_ACCENTS = {
  'virtual-office':    'from-[#D9DEE2] to-[#687179]',
  'job-radar':         'from-[#D9DEE2] to-[#687179]',
  'analog-ic-studio':  'from-[#D9DEE2] to-[#687179]',
  'vap':               'from-[#D9DEE2] to-[#687179]',
  'aws-hackathon':     'from-[#D9DEE2] to-[#687179]',
  'teammatch':         'from-[#D9DEE2] to-[#687179]',
  'audio-amplifier':   'from-[#D9DEE2] to-[#687179]',
  'qmk-stm32-keyboard':'from-[#D9DEE2] to-[#687179]',
  'whack-a-mole':      'from-[#D9DEE2] to-[#687179]',
  'auto-sanitizer':    'from-[#D9DEE2] to-[#687179]',
  'team-robot':        'from-[#D9DEE2] to-[#687179]',
  'swerve':            'from-[#D9DEE2] to-[#687179]',
}

// 純色版本（給文字用，漸層文字不可讀且是 AI 感的地雷，只留給背景用）
export const PROJECT_ACCENT_SOLID = {
  'virtual-office':    'text-[#687179]',
  'job-radar':         'text-[#687179]',
  'analog-ic-studio':  'text-[#687179]',
  'vap':               'text-[#687179]',
  'aws-hackathon':     'text-[#687179]',
  'teammatch':         'text-[#687179]',
  'audio-amplifier':   'text-[#687179]',
  'qmk-stm32-keyboard':'text-[#687179]',
  'whack-a-mole':      'text-[#687179]',
  'auto-sanitizer':    'text-[#687179]',
  'team-robot':        'text-[#687179]',
  'swerve':            'text-[#687179]',
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
  data_analysis: 'from-[#D9DEE2] to-[#687179]',
  programming:   'from-[#D9DEE2] to-[#687179]',
  eda:           'from-[#D9DEE2] to-[#687179]',
  manufacturing: 'from-[#D9DEE2] to-[#687179]',
  vibecoding:    'from-[#D9DEE2] to-[#687179]',
}

export const SKILL_CAT_ACCENT_SOLID = {
  data_analysis: 'text-[#687179]',
  programming:   'text-[#687179]',
  eda:           'text-[#687179]',
  manufacturing: 'text-[#687179]',
  vibecoding:    'text-[#687179]',
}

export const LEVEL_CONFIG = {
  '基礎': { dots: 1, badge: 'bg-[#F5F5F7] text-[#6E6E73]', bar: 'bg-black/20'  },
  '熟悉': { dots: 2, badge: 'bg-[#E8EAEC] text-[#66717A]', bar: 'bg-[#687179]' },
  '進階': { dots: 3, badge: 'bg-[#D9DEE2] text-[#4E5962]', bar: 'bg-[#515B64]' },
}

export const SKILL_LEVELS = ['進階', '熟悉', '基礎']
