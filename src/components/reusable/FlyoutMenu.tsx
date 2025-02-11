import { MoreHoriz, Close } from "@mui/icons-material";
import { useRef, Children } from "react";
import { useBoolean } from "usehooks-ts";
import { useOnClickOutside } from "usehooks-ts";

export function FlyoutMenu({
  x,
  y,
  children,
}: {
  x: "left" | "right";
  y: "bottom" | "top";
  children: React.ReactNode;
}) {
  const { value: opened, setTrue: open, setFalse: close } = useBoolean(false);
  const menu = useRef<HTMLDivElement>(null);
  useOnClickOutside(menu, () => {
    if (opened) close();
  });

  /* don't render if no children detected */
  if (Children.toArray(children).length > 0)
    return (
      <div className="flyout" onClick={open}>
        <button
          className="button plain flyout-button"
          aria-haspopup="menu"
          aria-expanded={opened ? "true" : "false"}
        >
          {opened ? <Close /> : <MoreHoriz />}
        </button>
        {opened && (
          <div
            ref={menu}
            role="menu"
            className="menu flex-col align-start gap-0-25"
            style={{
              ...(x === "right" && { left: 0 }),
              ...(x === "left" && { right: 0 }),
              ...(y === "bottom" && { top: "2rem" }),
              ...(y === "top" && { bottom: "2rem" }),
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
}
