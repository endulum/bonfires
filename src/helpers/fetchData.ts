export default async function fetchData<T> (url: string, payload: object): Promise<{
  data: T | null
  statusCode: number
  errorMsg: string | null
}> {
  let data = null
  let statusCode = 0
  let errorMsg = null
  try {
    const response = await fetch(url, payload)
    statusCode = response.status
    if (!response.ok) {
      if (response.status === 422) {
        const json: unknown = await response.json()
        data = (json as { errors: T }).errors
        throw new Error('There were some errors with your submission.')
      } else {
        const text = await response.text()
        if (['<', '{'].includes(text.charAt(0))) throw new Error(response.statusText)
        throw new Error(text)
      }
    } else {
      const text: string = await response.text()
      if (['{', '['].includes(text.charAt(0))) {
        const json: unknown = JSON.parse(text)
        data = json as T
      } else {
        data = text as T
      }
    }
  } catch (e) {
    errorMsg = handleError(e)
  }
  return { data, statusCode, errorMsg }
}

function handleError (e: unknown): string {
  if (e instanceof TypeError) {
    return 'A network error occurred. Try again later.'
  } if (e instanceof Error && e.message !== '') {
    return e.message
  }
  // eslint-disable-next-line no-console
  console.error(e)
  return 'Something went wrong. See the console for details.'
}
