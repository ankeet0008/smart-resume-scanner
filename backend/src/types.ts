export type Course = [string, string]

export type RecommendedField =
  | 'Data Science'
  | 'Web Development'
  | 'Android Development'
  | 'IOS Development'
  | 'UI-UX Development'
  | 'NA'

export interface ResumeDetails {
  name: string | null
  email: string | null
  phone: string | null
  skills: string[]
  pageCount: number | null
}

export interface ResumeAnalysis {
  details: ResumeDetails
  field: RecommendedField
  candidateLevel: 'Fresher' | 'Intermediate' | 'Experienced' | 'NA'
  resumeScore: number
  scoreMax: number
  missingSections: string[]
  recommendedSkills: string[]
  recommendedCourses: Course[]
}
