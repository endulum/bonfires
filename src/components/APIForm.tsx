import InfoParagraph from './InfoParagraph.tsx'
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
    <form onSubmit={(event) => { void handleSubmit(event) }} className="form">
      {formError !== null && (
      <InfoParagraph type="error">
        {formError}
      </InfoParagraph>
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
              <button type="submit" key="submit" disabled={loading} className={child.props.className}>
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
  children: JSX.Element[]
}): JSX.Element {
  return (
    <label
      className={`form-label${inputError !== null ? ' invalid' : ''}`}
      htmlFor={htmlFor}
    >
      {children.map((child) => {
        if (child.type === 'span' && child.props.className === undefined) {
          return (
            <span
              key={child.key}
              className="label-span"
            >
              {child.props.children}
            </span>
          )
        }
        if (child.type === 'input' && child.props.className === undefined) {
          return (
            <input
              className="label-text-input"
              key={child.key}
              type={child.props.type}
              id={child.props.id}
              defaultValue={child.props.defaultValue}
            />
          )
        }
        return child
      })}
      {inputError !== null && (
      <small className="label-error">
        {inputError}
      </small>
      )}
    </label>
  )
}
