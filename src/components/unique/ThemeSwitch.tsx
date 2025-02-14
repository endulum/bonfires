import { useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import { getStoredTheme, storeTheme } from "../../functions/themeUtils";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<string>(getStoredTheme());

  return (
    <>
      <button
        type="button"
        className="button neutral plain circle"
        data-tooltip-id="themeswitch"
        data-tooltip-content={
          theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
        data-tooltip-place="bottom-end"
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          storeTheme(newTheme);
          setTheme(newTheme);
        }}
      >
        {theme === "light" && <DarkMode />}
        {theme === "dark" && <LightMode />}
      </button>
      <Tooltip id="themeswitch" />
    </>
  );
}
