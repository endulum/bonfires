import { type FormEvent, useState } from 'react'
import fetchData from '../helpers/fetchData.ts'
import { getStoredToken } from '../helpers/tokenUtils.ts'
import { type FormErrors } from '../types.ts'

export default function useAPIFormData (
  endpoint: { url: string, method: string },
  onSuccess: (formData: Record<string, string>, data: any) => void
): {
    handleSubmit: (event: FormEvent) => Promise<void>
    loading: boolean
    formError: string | null
    inputErrors: Record<string, string>
  } {
  const [loading, setLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({})

  async function handleSubmit (event: FormEvent): Promise<void> {
    event.preventDefault()
    const token = getStoredToken()

    const formData: Record<string, string> = {}
    Object.values(event.target).forEach((element) => {
      if (element instanceof HTMLInputElement) {
        formData[element.id] = element.value
      }
    })

    setLoading(true)
    setFormError(null)
    setInputErrors({})
    const { fetchedData, statusCode, errorMsg } = await fetchData<FormErrors | unknown>(
      endpoint.url,
      {
        method: endpoint.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData)
      }
    )
    setLoading(false)
    if (errorMsg !== null) setFormError(errorMsg)
    if (statusCode === 422) {
      const inpErrs: Record<string, string> = {};
      (fetchedData as FormErrors).forEach((error) => {
        inpErrs[error.path] = error.msg
      })
      setInputErrors(inpErrs)
    }

    if (statusCode === 200) onSuccess(formData, fetchedData)
  }

  return { handleSubmit, loading, formError, inputErrors }
}
