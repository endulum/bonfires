import { Warning, Loop } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { Alert } from "./Alert";

export function Form<T>({
  destination,
  onSubmit,
  onSuccess,
  buttonText,
  children,
}: {
  destination: { endpoint: string; method: "GET" | "PUT" | "POST" | "DELETE" };
  onSubmit?: () => // run when form is submitted
  void;
  onSuccess: (
    // run when form submission is successful
    submissionData: Record<string, string>,
    submissionResult: T
  ) => void;
  buttonText: string;
  children: Array<JSX.Element | false>;
}) {
  const { loading, error, inputErrors, handleSubmit } = useForm<T>(
    destination,
    onSuccess
  );

  return (
    <form className="form flex-col align-start gap-1" onSubmit={handleSubmit}>
      {error ? (
        <Alert type="warning">
          <p>{error}</p>
        </Alert>
      ) : (
        ""
      )}
      {children.map((child) => {
        if (child && child.type === "label") {
          return (
            <label
              {...child.props}
              key={child.props.htmlFor}
              className="form-label flex-col gap-0-5 align-start"
            >
              {child.props.children.filter(
                (child: JSX.Element) => child.type === "span"
              )}
              {inputErrors && child.props.htmlFor in inputErrors ? (
                <small className=" form-error flex-row gap-0-5">
                  <Warning style={{ color: "var(--warning)" }} />
                  {inputErrors[child.props.htmlFor]}
                </small>
              ) : (
                ""
              )}
              {child.props.children.filter(
                (child: JSX.Element) => child.type !== "span"
              )}
            </label>
          );
        }

        return child;
      })}

      <button
        className="button primary"
        type="submit"
        disabled={loading}
        onClick={() => {
          if (onSubmit) onSubmit();
        }}
      >
        {loading ? (
          <>
            <Loop className="spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{buttonText}</span>
        )}
      </button>
    </form>
  );
}
