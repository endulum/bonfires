import AlertSvg from '../icons/triangle-exclamation-solid.svg?react'
import FireSvg from '../icons/fire-solid.svg?react'

export default function LoadingWrapper ({ loading, loadingMessage, error }: {
  loading: boolean
  loadingMessage?: string
  error: string | null
}): JSX.Element | undefined {
  if (loading) {
    return (
      <div className="expand">
        <div className="spinner">
          <FireSvg />
        </div>
        <p>
          {loadingMessage ?? 'Loading...'}
        </p>
      </div>
    )
  }

  if (error !== null) {
    return (
      <div className="expand">
        <AlertSvg />
        <p>
          {error}
        </p>
      </div>
    )
  }
}
