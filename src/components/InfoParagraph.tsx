import ErrorSvg from '../assets/icons/triangle-exclamation-solid.svg?react'

export default function InfoParagraph ({ type, children }: {
  type: 'error' | 'neutral' | 'warning' | 'success'
  children: Array<string | JSX.Element> | JSX.Element | string
}): JSX.Element {
  return (
    <p className={`info ${type}`}>
      {['error', 'warning'].includes(type) && <ErrorSvg className="inline-svg" />}
      {children}
    </p>
  )
}
