import { MoreHoriz, Close } from "@mui/icons-material";
import { useRef, Children, useEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { useOnClickOutside } from "usehooks-ts";

export function FlyoutMenu({
  x,
  y,
  onToggle,
  children,
}: {
  x: "left" | "right";
  y: "bottom" | "top";
  onToggle?: (opened: boolean) => void;
  children: React.ReactNode;
}) {
  const { value: opened, setTrue: open, setFalse: close } = useBoolean(false);
  const menu = useRef<HTMLDivElement>(null);
  useOnClickOutside(menu, (e) => {
    const target = e.target as HTMLElement;
    if (opened && !target.closest(".ReactModalPortal")) close();
  });

  useEffect(() => {
    if (onToggle) onToggle(opened);
  }, [opened]);

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
              ...(y === "bottom" && { top: "2.5rem" }),
              ...(y === "top" && { bottom: "2rem" }),
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
}
