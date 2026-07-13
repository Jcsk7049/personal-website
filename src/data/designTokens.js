// 全站共用的設計常數：顏色、漸層、精熟度設定。
// 改顏色只改這裡，SkillGrid / SkillDetail / ProjectShowcase / Admin 都會跟著變。

export const PROJECT_ACCENTS = {
  'analog-ic-studio':  'from-cyan-400 to-blue-600',
  'vap':               'from-sky-400 to-blue-600',
  'aws-hackathon':     'from-amber-400 to-orange-500',
  'audio-amplifier':   'from-lime-400 to-green-600',
  'qmk-stm32-keyboard':'from-violet-400 to-purple-600',
  'whack-a-mole':      'from-teal-400 to-cyan-500',
  'auto-sanitizer':    'from-emerald-400 to-green-600',
  'team-robot':        'from-orange-400 to-amber-600',
  'swerve':            'from-rose-400 to-red-500',
}

// 純色版本（給文字用，漸層文字不可讀且是 AI 感的地雷，只留給背景用）
export const PROJECT_ACCENT_SOLID = {
  'analog-ic-studio':  'text-blue-600',
  'vap':               'text-blue-600',
  'aws-hackathon':     'text-orange-500',
  'audio-amplifier':   'text-green-600',
  'qmk-stm32-keyboard':'text-purple-600',
  'whack-a-mole':      'text-cyan-500',
  'auto-sanitizer':    'text-green-600',
  'team-robot':        'text-amber-600',
  'swerve':            'text-red-500',
}

export function accent(id) {
  return PROJECT_ACCENTS[id] || 'from-gray-300 to-gray-400'
}

export function accentSolid(id) {
  return PROJECT_ACCENT_SOLID[id] || 'text-gray-400'
}

export const CATEGORY_STYLES = {
  '高職選手作品': 'bg-amber-50 text-amber-700 border-amber-200',
  '大學課程作品': 'bg-sky-50 text-sky-700 border-sky-200',
  '大學專題作品': 'bg-violet-50 text-violet-700 border-violet-200',
  '大學校外作品': 'bg-teal-50 text-teal-700 border-teal-200',
}

export const SKILL_CAT_ACCENTS = {
  data_analysis: 'from-indigo-400 to-blue-500',
  programming:   'from-emerald-400 to-teal-500',
  eda:           'from-rose-400 to-pink-500',
  manufacturing: 'from-orange-400 to-amber-500',
}

export const SKILL_CAT_ACCENT_SOLID = {
  data_analysis: 'text-blue-500',
  programming:   'text-teal-500',
  eda:           'text-pink-500',
  manufacturing: 'text-amber-500',
}

export const LEVEL_CONFIG = {
  '基礎': { dots: 1, badge: 'bg-[#F5F5F7] text-[#86868B]', bar: 'bg-black/20'  },
  '熟悉': { dots: 2, badge: 'bg-[#EEF5FF] text-[#0066CC]', bar: 'bg-[#0071E3]' },
  '進階': { dots: 3, badge: 'bg-[#F2EEFF] text-[#5E3DE8]', bar: 'bg-[#7C3AED]' },
}

export const SKILL_LEVELS = ['進階', '熟悉', '基礎']
