import FireSvg from '../icons/fire-solid.svg?react'

export default function Logo ({ className }: {
  // eslint-disable-next-line react/require-default-props
  className?: string
}): JSX.Element {
  return (
    <h1 className={className !== null ? `logo ${className}` : 'logo'}>
      <FireSvg />
      <b>Bonfires</b>
    </h1>
  )
}
