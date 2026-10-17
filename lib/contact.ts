export const PROJECT_TYPES = ['AI Solutions', 'ML Models', 'Automation', 'Software Application', 'Other'] as const

export const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 to ₹2,00,000',
  '₹2,00,000 to ₹5,00,000',
  '₹5,00,000+',
  'Not sure yet',
] as const

export type ContactInput = {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  message: string
}

export type ContactField = keyof ContactInput
export type ContactErrors = Partial<Record<ContactField, string>>

export const EMPTY_CONTACT: ContactInput = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/

export function validateField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your full name.'
      if (value.length > 100) return 'Name must be 100 characters or fewer.'
      return
    case 'email':
      if (!value) return 'Please enter your email address.'
      if (value.length > 254 || !EMAIL_PATTERN.test(value)) return 'Please enter a valid email address.'
      return
    case 'phone':
      if (value && !PHONE_PATTERN.test(value)) return 'Please enter a valid phone number.'
      return
    case 'projectType':
      if (value && !(PROJECT_TYPES as readonly string[]).includes(value)) return 'Please choose a project type.'
      return
    case 'budget':
      if (value && !(BUDGETS as readonly string[]).includes(value)) return 'Please choose a budget range.'
      return
    case 'message':
      if (!value) return 'Please tell us a little about your project.'
      if (value.length < 10) return 'Please add a few more details (at least 10 characters).'
      if (value.length > 2000) return 'Message must be 2000 characters or fewer.'
      return
  }
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of Object.keys(EMPTY_CONTACT) as ContactField[]) {
    const error = validateField(field, input[field] ?? '')
    if (error) errors[field] = error
  }
  return errors
}
