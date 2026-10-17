export type ContactField = 'name' | 'email' | 'phone' | 'projectType' | 'budget' | 'message'

export type ContactInput = Record<ContactField, string>

export type ContactErrors = Partial<Record<ContactField, string>>

export const PROJECT_TYPES = [
  'AI / Machine Learning',
  'Automation',
  'Web Application',
  'Mobile Application',
  'Custom Software',
  'Other',
] as const

export const BUDGETS = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
] as const

export const EMPTY_CONTACT: ContactInput = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\d\s-]{7,20}$/

export function validateField(field: ContactField, value: string): string | undefined {
  const v = value.trim()

  switch (field) {
    case 'name':
      if (!v) return 'Please enter your name.'
      if (v.length < 2) return 'Name must be at least 2 characters.'
      return
    case 'email':
      if (!v) return 'Please enter your email.'
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.'
      return
    case 'phone':
      if (v && !PHONE_RE.test(v)) return 'Please enter a valid phone number.'
      return
    case 'projectType':
      if (!v) return 'Please select a project type.'
      return
    case 'budget':
      if (!v) return 'Please select a budget range.'
      return
    case 'message':
      if (!v) return 'Please tell us about your project.'
      if (v.length < 10) return 'Message must be at least 10 characters.'
      return
  }
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of Object.keys(input) as ContactField[]) {
    const error = validateField(field, input[field])
    if (error) errors[field] = error
  }
  return errors
}
