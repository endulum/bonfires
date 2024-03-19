import { useState, useEffect } from 'react'

export default function useFetch<T> (
  fetchOnMount: boolean,
  url: string,
  payload?: object
): {
    data: T | null
    loading: boolean
    error: string | null
    fetchData: () => Promise<void>
  } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  function handleError (e: unknown): void {
    if (e instanceof TypeError) {
      setError('A network error occurred. Try again later.')
    } else if (e instanceof Error) {
      setError(e.message)
    } else {
      // eslint-disable-next-line no-console
      console.error(e)
      setError('Something went wrong. See the console for details.')
    }
  }

  async function fetchData (): Promise<void> {
    setData(null)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, payload)
      if (!response.ok) {
        if (response.status === 422) {
          // form submission errors
          const json: unknown = await response.json()
          setData((json as { errors: T }).errors)
          throw new Error('There were some errors with your submission.')
        }
        const text = await response.text()
        if (['<', '{'].includes(text.charAt(0))) throw new Error(response.statusText)
        throw new Error(text)
      } else {
        const text: string = await response.text()
        if (text.charAt(0) === '{' || text.charAt(0) === '[') {
          const json: unknown = JSON.parse(text)
          setData(json as T)
        } else {
          setData(text as T)
        }
      }
    } catch (e: unknown) {
      handleError(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (fetchOnMount) fetchData().catch((e: unknown) => { handleError(e) })
  }, [])

  return {
    data, loading, error, fetchData
  }
}
