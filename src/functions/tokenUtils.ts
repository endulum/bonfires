export function setStoredToken(token: string): void {
  localStorage.setItem("token", JSON.stringify(token));
}

export function clearStoredToken(): void {
  localStorage.removeItem("token");
}

export function getStoredToken(): string | null {
  const tokenString: string | null = localStorage.getItem("token");
  if (tokenString === null) return null;

  let token: unknown;
  try {
    token = JSON.parse(tokenString);
  } catch {
    clearStoredToken();
    return null;
  } // if the token can't be parsed, clear it

  if (typeof token !== "string") {
    clearStoredToken();
    return null;
  } // if the token isn't a string, clear it

  return token;
}
