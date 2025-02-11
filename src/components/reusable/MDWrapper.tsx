import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MDWrapper({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      allowedElements={[
        "a",
        "strong",
        "em",
        "del",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "img",
        "h1",
        "h2",
        "h3",
      ]}
      unwrapDisallowed
      skipHtml
      className="md-content"
    >
      {content.split("\n").join("  \n  \n")}
    </Markdown>
  );
}
