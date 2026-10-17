'use client'

import { useRef, useState, useTransition } from 'react'
import { ArrowRight, Check, ChevronDown, Loader2 } from 'lucide-react'
import {
  BUDGETS,
  EMPTY_CONTACT,
  PROJECT_TYPES,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from '@/lib/contact'
import { cn } from '@/lib/utils'
import { IconCircle } from './primitives'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbgdqqjk'
const SUBMIT_ERROR = 'Something went wrong.'

const FIELD_ORDER: ContactField[] = ['name', 'email', 'phone', 'projectType', 'budget', 'message']

const controlClass = (invalid: boolean) =>
  cn(
    'peer w-full rounded-[8px] border bg-white px-3 text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-transparent focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,75,0.16),0_0_18px_rgba(201,162,75,0.18)] focus:placeholder:text-ink-2 md:text-[12px]',
    invalid ? 'border-[#d92d20]' : 'border-[#E5E7EB]',
  )

const FLOATED_LABEL = 'top-0 text-[10px] text-ink'
const RESTING_LABEL =
  'top-5 text-[12px] text-ink-2 peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown):not(:focus)]:text-ink'

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
  alwaysFloated = false,
}: {
  id: ContactField
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
  alwaysFloated?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="group relative">
        {children}
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-2.5 -translate-y-1/2 whitespace-nowrap bg-white px-1 font-medium leading-none transition-all duration-200 ease-out group-focus-within:text-gold-deep motion-reduce:transition-none',
            alwaysFloated ? FLOATED_LABEL : RESTING_LABEL,
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-ink-2">
              {' *'}
            </span>
          ) : (
            <span className="font-normal text-ink-2"> (optional)</span>
          )}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-[10px] leading-[1.4] text-[#d92d20]">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY_CONTACT)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
  }

  const blur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }))
  }

  const focusFirstError = (found: ContactErrors) => {
    const first = FIELD_ORDER.find((field) => found[field])
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError(null)
    const found = validateContact(values)
    setErrors(found)
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])))
    if (Object.keys(found).length > 0) {
      focusFirstError(found)
      return
    }

    const formData = new FormData(event.currentTarget)
    const gotcha = String(formData.get('_gotcha') ?? '')
    const { name, email, phone, projectType, budget, message } = Object.fromEntries(
      FIELD_ORDER.map((field) => [field, values[field].trim()]),
    ) as ContactInput

    startTransition(async () => {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, phone, projectType, budget, message, _gotcha: gotcha }),
        })
        if (res.ok) {
          setSubmitted(true)
        } else {
          setServerError(SUBMIT_ERROR)
        }
      } catch {
        setServerError(SUBMIT_ERROR)
      }
    })
  }

  const describe = (field: ContactField) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  if (submitted) {
    return (
      <div className="card-soft flex min-h-[420px] flex-col items-center justify-center p-8 text-center" role="status">
        <IconCircle className="size-12 bg-navy text-white">
          <Check className="size-5" strokeWidth={1.75} />
        </IconCircle>
        <h2
          ref={(node) => node?.focus()}
          tabIndex={-1}
          className="mt-5 text-[18px] font-medium leading-[1.3] text-ink outline-none text-balance"
        >
          Thanks! We&apos;ll reply within 24 hours.
        </h2>
        <p className="mt-2 max-w-[280px] text-[11px] leading-[1.6] text-ink-2">
          {'A member of our team will reach out at '}
          <span className="text-ink">{values.email.trim()}</span>.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="card-soft p-6 md:p-7" aria-label="Contact form">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name} className="sm:col-span-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            placeholder=" "
            className={cn(controlClass(!!errors.name), 'h-10')}
            {...describe('name')}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => blur('email')}
            placeholder=" "
            className={cn(controlClass(!!errors.email), 'h-10')}
            {...describe('email')}
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => blur('phone')}
            placeholder=" "
            className={cn(controlClass(!!errors.phone), 'h-10')}
            {...describe('phone')}
          />
        </Field>

        <Field id="projectType" label="Project type" error={errors.projectType} alwaysFloated>
          <div className="relative">
            <select
              id="projectType"
              name="projectType"
              value={values.projectType}
              onChange={(e) => update('projectType', e.target.value)}
              onBlur={() => blur('projectType')}
              className={cn(controlClass(!!errors.projectType), 'h-10 appearance-none pr-9', !values.projectType && 'text-ink-2')}
              {...describe('projectType')}
            >
              <option value="">Select a project type</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type} className="text-ink">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-ink-2"
              strokeWidth={1.5}
            />
          </div>
        </Field>

        <Field id="budget" label="Budget" error={errors.budget} alwaysFloated>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              value={values.budget}
              onChange={(e) => update('budget', e.target.value)}
              onBlur={() => blur('budget')}
              className={cn(controlClass(!!errors.budget), 'h-10 appearance-none pr-9', !values.budget && 'text-ink-2')}
              {...describe('budget')}
            >
              <option value="">Select a budget range</option>
              {BUDGETS.map((budget) => (
                <option key={budget} value={budget} className="text-ink">
                  {budget}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-ink-2"
              strokeWidth={1.5}
            />
          </div>
        </Field>

        <Field id="message" label="Message" required error={errors.message} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            onBlur={() => blur('message')}
            placeholder="Tell us about your project, goals and timeline."
            className={cn(controlClass(!!errors.message), 'min-h-[120px] resize-y py-2.5 leading-[1.5]')}
            {...describe('message')}
          />
        </Field>
      </div>

      {serverError && (
        <p role="alert" className="mt-4 text-[11px] leading-[1.5] text-[#d92d20]">
          {`${serverError} Please email `}
          <a href="mailto:info@epocxinnovations.in" className="underline underline-offset-2">
            info@epocxinnovations.in
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[13px] font-medium text-white transition-[background-color,box-shadow] duration-200 hover-gold-glow disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="size-3.5 animate-spin" strokeWidth={1.75} aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="btn-arrow size-3.5" strokeWidth={1.5} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
