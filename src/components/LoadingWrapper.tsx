import AlertSvg from '../assets/icons/triangle-exclamation-solid.svg?react'
import FireSvg from '../assets/icons/fire-solid.svg?react'

export default function LoadingWrapper ({ loading, loadingMessage, error }: {
  loading: boolean
  loadingMessage?: string
  error: string | null
}): JSX.Element | undefined {
  return (
    <div className="expand loading-expand">
      {loading && (
      <>
        <div className="loading-spinner">
          <FireSvg className="loading-logo-svg" />
        </div>
        <p>
          {loadingMessage ?? 'Loading...'}
        </p>
      </>
      )}
      {error !== null && (
      <>
        <AlertSvg className="loading-error-svg" />
        <p>
          {error}
        </p>
      </>
      )}
    </div>
  )
}
