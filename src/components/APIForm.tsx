import { useState, type FormEvent, useEffect } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import useFetch from '../useFetch.ts'
import { type FormErrors } from '../types.ts'

export default function APIForm ({ endpoint, onSuccess, children }: {
  children: JSX.Element[]
  onSuccess: (...args: any) => void
  endpoint: { url: string, method: string }
}): JSX.Element {
  const token = useReadLocalStorage<string>('token')
  const [form, setForm] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const {
    data, loading, error, fetchData
  } = useFetch<string | FormErrors>(
    false,
    endpoint.url,
    {
      method: endpoint.method ?? 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token !== null ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(form)
    }
  )

  function handleSubmit (e: FormEvent): void {
    e.preventDefault()
    const formData: Record<string, string> = {}
    Object.values(e.target).forEach((element) => {
      if (element instanceof HTMLInputElement) {
        formData[element.id] = element.value
      }
    })
    setForm(formData)
    setIsSubmitting(true)
  }

  useEffect(() => {
    // if we get input errors
    if (error === 'There were some errors with your submission.') {
      const errors: Record<string, string> = {};
      (data as FormErrors).forEach((err) => { errors[err.path] = err.msg })
      setFormErrors(errors)
    }
  }, [error])

  useEffect(() => {
    // if we are submitting the form
    if (isSubmitting) {
      setIsSubmitting(false)
      setFormErrors({})
      void fetchData()
    }
  }, [isSubmitting])

  useEffect(() => {
    // if our submission was successful
    if (error === null && data !== null) {
      onSuccess(data, form)
    }
  }, [data])

  return (
    <form onSubmit={handleSubmit}>
      {error !== null && <p>{error}</p>}
      {children.map((child) => {
        if (child.type === 'label') {
          return (
            <Input
              key={child.props.htmlFor}
              fieldName={child.props.htmlFor}
              formErrors={formErrors}
            >
              {child.props.children}
            </Input>
          )
        } if (child.type === 'button') {
          return (
            <button type="submit" key="submit" disabled={loading}>
              {loading ? 'Processing...' : (child.props.children)}
            </button>
          )
        } return child
      })}
    </form>
  )
}

function Input ({ formErrors, fieldName, children }: {
  children: JSX.Element[]
  fieldName: string
  formErrors: Record<string, string>
}): JSX.Element {
  return (
    <label
      htmlFor={fieldName}
      className={fieldName in formErrors ? 'error' : ''}
    >
      {children}
      {fieldName in formErrors && (
        <small>
          {formErrors[fieldName]}
        </small>
      )}
    </label>
  )
}
