import type { RecommendedField, ResumeAnalysis, ResumeDetails } from './types'
import { fieldCourseMap } from './courses'

const dsKeyword = [
  'tensorflow',
  'keras',
  'pytorch',
  'machine learning',
  'deep learning',
  'flask',
  'streamlit'
]

const webKeyword = [
  'react',
  'django',
  'node js',
  'react js',
  'php',
  'laravel',
  'magento',
  'wordpress',
  'javascript',
  'angular js',
  'c#',
  'asp.net',
  'flask'
]

const androidKeyword = [
  'android',
  'android development',
  'flutter',
  'kotlin',
  'xml',
  'kivy'
]

const iosKeyword = [
  'ios',
  'ios development',
  'swift',
  'cocoa',
  'cocoa touch',
  'xcode'
]

const uiuxKeyword = [
  'ux',
  'adobe xd',
  'figma',
  'zeplin',
  'balsamiq',
  'ui',
  'prototyping',
  'wireframes',
  'storyframes',
  'adobe photoshop',
  'photoshop',
  'editing',
  'adobe illustrator',
  'illustrator',
  'adobe after effects',
  'after effects',
  'adobe premier pro',
  'premier pro',
  'adobe indesign',
  'indesign',
  'wireframe',
  'solid',
  'grasp',
  'user research',
  'user experience'
]

const nAny = [
  'english',
  'communication',
  'writing',
  'microsoft office',
  'leadership',
  'customer management',
  'social media'
]

const recommendedSkillsByField: Record<RecommendedField, string[]> = {
  'Data Science': [
    'Data Visualization',
    'Predictive Analysis',
    'Statistical Modeling',
    'Data Mining',
    'Clustering & Classification',
    'Data Analytics',
    'Quantitative Analysis',
    'Web Scraping',
    'ML Algorithms',
    'Keras',
    'Pytorch',
    'Probability',
    'Scikit-learn',
    'Tensorflow',
    'Flask',
    'Streamlit'
  ],
  'Web Development': [
    'React',
    'Django',
    'Node JS',
    'React JS',
    'php',
    'laravel',
    'Magento',
    'wordpress',
    'Javascript',
    'Angular JS',
    'c#',
    'Flask',
    'SDK'
  ],
  'Android Development': [
    'Android',
    'Android development',
    'Flutter',
    'Kotlin',
    'XML',
    'Java',
    'Kivy',
    'GIT',
    'SDK',
    'SQLite'
  ],
  'IOS Development': [
    'IOS',
    'IOS Development',
    'Swift',
    'Cocoa',
    'Cocoa Touch',
    'Xcode',
    'Objective-C',
    'SQLite',
    'Plist',
    'StoreKit',
    'UI-Kit',
    'AV Foundation',
    'Auto-Layout'
  ],
  'UI-UX Development': [
    'UI',
    'User Experience',
    'Adobe XD',
    'Figma',
    'Zeplin',
    'Balsamiq',
    'Prototyping',
    'Wireframes',
    'Storyframes',
    'Adobe Photoshop',
    'Editing',
    'Illustrator',
    'After Effects',
    'Premier Pro',
    'Indesign',
    'Wireframe',
    'Solid',
    'Grasp',
    'User Research'
  ],
  NA: ['No Recommendations']
}

const sectionWeights: Array<[string[], number, string]> = [
  [['objective', 'summary'], 6, 'Objective or Summary'],
  [['education', 'school', 'college'], 12, 'Education'],
  [['experience', 'work experience'], 16, 'Experience'],
  [['internship', 'internships'], 6, 'Internships'],
  [['skills', 'skill'], 7, 'Skills'],
  [['hobbies', 'hobby'], 4, 'Hobbies'],
  [['interests', 'interest'], 5, 'Interests'],
  [['achievements', 'achievement'], 13, 'Achievements'],
  [['certifications', 'certification'], 12, 'Certifications'],
  [['projects', 'project'], 19, 'Projects']
]

const defaultSkillCatalog = new Set([
  ...dsKeyword,
  ...webKeyword,
  ...androidKeyword,
  ...iosKeyword,
  ...uiuxKeyword,
  ...nAny
])

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

const extractEmail = (text: string): string | null => {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match ? match[0] : null
}

const extractPhone = (text: string): string | null => {
  const match = text.match(/(\+?\d[\d\s().-]{7,}\d)/)
  if (!match) return null
  const digits = match[1].replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) return null
  return match[1].trim()
}

const extractName = (rawText: string): string | null => {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  for (const line of lines.slice(0, 5)) {
    const words = line.split(/\s+/).filter(Boolean)
    if (words.length >= 2 && words.length <= 4 && words.every((word) => /[a-zA-Z]/.test(word))) {
      return line
    }
  }
  return null
}

const extractSkills = (text: string, catalog = defaultSkillCatalog): string[] => {
  const found = new Set<string>()
  const lower = text.toLowerCase()

  catalog.forEach((skill) => {
    if (lower.includes(skill.toLowerCase())) {
      found.add(skill)
    }
  })

  return Array.from(found)
}

const classifyField = (text: string): RecommendedField => {
  const lower = text.toLowerCase()
  const hasAny = (list: string[]) => list.some((item) => lower.includes(item))

  if (hasAny(dsKeyword)) return 'Data Science'
  if (hasAny(webKeyword)) return 'Web Development'
  if (hasAny(androidKeyword)) return 'Android Development'
  if (hasAny(iosKeyword)) return 'IOS Development'
  if (hasAny(uiuxKeyword)) return 'UI-UX Development'
  if (hasAny(nAny)) return 'NA'
  return 'NA'
}

const getCandidateLevel = (text: string, pageCount: number | null) => {
  const lower = text.toLowerCase()
  if (pageCount !== null && pageCount < 1) return 'NA'
  if (lower.includes('internship')) return 'Intermediate'
  if (lower.includes('experience')) return 'Experienced'
  return 'Fresher'
}

const scoreResume = (text: string) => {
  const lower = text.toLowerCase()
  let score = 0
  const missing: string[] = []

  for (const [keywords, weight, label] of sectionWeights) {
    const found = keywords.some((keyword) => lower.includes(keyword))
    if (found) {
      score += weight
    } else {
      missing.push(label)
    }
  }

  return { score, missing }
}

export const analyzeResumeText = (rawText: string, pageCount: number | null = null): ResumeAnalysis => {
  const text = normalizeText(rawText)
  const details: ResumeDetails = {
    name: extractName(rawText),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    pageCount
  }

  const field = classifyField(text)
  const candidateLevel = getCandidateLevel(text, pageCount)
  const { score, missing } = scoreResume(text)

  return {
    details,
    field,
    candidateLevel,
    resumeScore: score,
    scoreMax: 100,
    missingSections: missing,
    recommendedSkills: recommendedSkillsByField[field],
    recommendedCourses: fieldCourseMap[field]
  }
}
