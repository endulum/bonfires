import FireSvg from '../assets/icons/fire-solid.svg?react'

export default function Logo (): JSX.Element {
  return (
    <div className="logo">
      <FireSvg className="logo-svg" />
      <h1 className="logo-header"><b>Bonfires</b></h1>
    </div>
  )
}
