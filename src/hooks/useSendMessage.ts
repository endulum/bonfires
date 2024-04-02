import { useState } from 'react'
import { getStoredToken } from '../helpers/tokenUtils.ts'
import fetchData from '../helpers/fetchData.ts'
import { type FormErrors } from '../types.ts'

export default function useSendMessage (channelId: string, content: string): {
  loading: boolean
  errorSendingMessage: string | null
  sendMessage: () => Promise<void>
} {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorSendingMessage, setErrorSendingMessage] = useState<string | null>(null)

  async function sendMessage (): Promise<void> {
    const token = getStoredToken()
    setLoading(true)
    const { fetchedData, errorMsg } = await fetchData(
      `https://localhost:3000/channel/${channelId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: token !== null ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(content)
      }
    )
    setLoading(false)
    if (errorMsg !== null) {
      if (
        fetchedData !== null &&
        typeof fetchedData === 'object' &&
        'errors' in fetchedData
      ) {
        setErrorSendingMessage((fetchedData.errors as FormErrors)[0].msg)
      } else setErrorSendingMessage(errorMsg)
    }
  }

  return { loading, errorSendingMessage, sendMessage }
}