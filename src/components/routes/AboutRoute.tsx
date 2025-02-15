import { useDocumentTitle } from "usehooks-ts";
import { GitHub } from "@mui/icons-material";

export function AboutRoute() {
  useDocumentTitle(`About Bonfires :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jcspb">
        <h2>About Bonfires</h2>
        <a
          href="https://github.com/endulum/bonfires"
          type="button"
          className="button neutral solid"
        >
          <GitHub />
          <span>Repo</span>
        </a>
      </div>
    </>
  );
}
