import { useState, useRef } from 'react'
import socket from '../socketConfig.ts'

export default function useIsTyping (
  channelId: string,
  yourId: string,
  yourDisplayName: string | null
): {
    startTyping: () => void
    stopTyping: () => void
  } {
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const timerRef: { current: ReturnType<typeof setInterval> | null } = useRef(null)

  function startTyping (): void {
    if (!isTyping) {
      setIsTyping(true)
      socket.emit('you started typing', channelId, yourId, yourDisplayName)
    }
    if (timerRef.current !== null) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(stopTyping, 2000)
  }

  function stopTyping (): void {
    setIsTyping(false)
    socket.emit('you stopped typing', channelId, yourId)
  }

  return { startTyping, stopTyping }
}
