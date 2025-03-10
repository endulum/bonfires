import { Alert } from "../../reusable/Alert";

export function GitHubAlert() {
  return (
    <Alert type="info" className="mb-1">
      <p>
        Have a GitHub account? You can{" "}
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${
            import.meta.env.VITE_GH_CLIENT_ID
          }&redirect_uri=${
            window.location.origin
          }/github&scope=read%3Auser&allow_signup=true`}
        >
          authenticate
        </a>{" "}
        with it here.
      </p>
    </Alert>
  );
}
