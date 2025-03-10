type Theme = "light" | "dark";

export function getStoredTheme(): Theme {
  const theme: Theme | null = localStorage.getItem("theme") as Theme | null;
  if (!theme) return "dark";
  return JSON.parse(theme);
}

export function setStoredTheme() {
  document.body.setAttribute("data-theme", getStoredTheme());
}

export function storeTheme(theme: Theme): void {
  localStorage.setItem("theme", JSON.stringify(theme));
  document.body.setAttribute("data-theme", theme);
}
