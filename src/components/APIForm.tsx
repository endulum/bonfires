import useAPIFormData from '../hooks/useAPIFormData.ts'
import isNotFalse from '../helpers/isNotFalse.ts'

export default function APIForm ({ endpoint, onSuccess, children }: {
  endpoint: { url: string, method: string }
  onSuccess: (formData: Record<string, string>, data: any) => void
  children: Array<JSX.Element | false>
}): JSX.Element {
  const {
    handleSubmit, loading, formError, inputErrors
  } = useAPIFormData(endpoint, onSuccess)

  return (
    <form onSubmit={(event) => { void handleSubmit(event) }}>
      {formError !== null && (
      <p className="form-error-message">
        {formError}
      </p>
      )}
      {children
        .filter(isNotFalse)
        .map((child) => {
          if (child.type === 'label') {
            return (
              <APIFormLabel
                htmlFor={child.props.htmlFor}
                inputError={inputErrors[child.props.htmlFor] ?? null}
                key={child.props.htmlFor}
              >
                {child.props.children}
              </APIFormLabel>
            )
          }
          if (child.type === 'button' && child.props.type === 'submit') {
            return (
              <button type="submit" key="submit" disabled={loading}>
                {loading ? 'Processing...' : child.props.children}
              </button>
            )
          }
          return child
        })}
    </form>
  )
}

function APIFormLabel ({ htmlFor, inputError, children }: {
  htmlFor: string
  inputError: string | null
  children: JSX.Element
}): JSX.Element {
  return (
    <label
      className={`form-input-label${inputError !== null ? ' input-error' : ''}`}
      htmlFor={htmlFor}
    >
      {children}
      {inputError !== null && (
      <small className="form-input-error">
        {inputError}
      </small>
      )}
    </label>
  )
}
