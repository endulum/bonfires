import { useDocumentTitle } from "usehooks-ts";

export function ChannelsRoute() {
  useDocumentTitle(`Your Camps :: ${import.meta.env.VITE_APP_NAME}`);
  return <p>channels</p>;
}
