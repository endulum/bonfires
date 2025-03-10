import { Loop, Warning } from "@mui/icons-material";

export function LoadingSpacer({
  loading,
  error,
  customLoadingText,
}: {
  loading: boolean;
  error: string | null;
  customLoadingText?: string;
}): JSX.Element | undefined {
  return (
    <div className="spacer">
      {error ? (
        <>
          <Warning />
          <p>{error}</p>
        </>
      ) : loading ? (
        <>
          <Loop className="spin" />
          <p>{customLoadingText ?? "Loading..."}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
