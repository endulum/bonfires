import { QuestionMark } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

export function ErrorRoute() {
  useDocumentTitle(`Not Found :: ${import.meta.env.VITE_APP_NAME}`);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="spacer">
      <QuestionMark />
      <p>Nothing was found at {pathname}</p>
      <button
        type="button"
        className="button plain secondary"
        onClick={() => {
          navigate(-1);
        }}
      >
        <span>Go back</span>
      </button>
    </div>
  );
}
