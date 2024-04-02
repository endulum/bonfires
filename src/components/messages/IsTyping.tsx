import { useState } from 'react'
import socket from '../../socketConfig.ts'

export default function IsTyping (): JSX.Element {
  const [isTyping, setIsTyping] = useState<Record<string, string>>({})

  socket.on('someone started typing', (userId: string, userName: string) => {
    setIsTyping({ ...isTyping, [userId]: userName })
  })

  socket.on('someone stopped typing', (userId: string) => {
    const { [userId]: userName, ...rest } = isTyping
    setIsTyping(rest)
  })

  const keys = (obj: Record<string, string>): string[] => Object.keys(obj)
  const boldName = (index: number): JSX.Element => <b>{isTyping[keys(isTyping)[index]]}</b>

  switch (keys(isTyping).length) {
    case 0: return (<p>It&apos;s quiet here...</p>)

    case 1: return (
      <p>
        <b>{boldName(0)}</b>
        {' '}
        is typing...
      </p>
    )

    case 2: return (
      <p>
        <b>{boldName(0)}</b>
        {' '}
        and
        {' '}
        <b>{boldName(1)}</b>
        {' '}
        are typing...
      </p>
    )

    case 3: return (
      <p>
        <b>{boldName(0)}</b>
        ,
        {' '}
        <b>{boldName(1)}</b>
        ,
        {' '}
        and
        {' '}
        <b>{boldName(3)}</b>
        {' '}
        are typing...
      </p>
    )

    default: return (<p>Several people are typing...</p>)
  }
}
