import { useDocumentTitle } from "usehooks-ts";

export function AboutRoute() {
  useDocumentTitle(`About Bonfires :: ${import.meta.env.VITE_APP_NAME}`);
  return <p>about</p>;
}
