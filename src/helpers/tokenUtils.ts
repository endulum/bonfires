export function getStoredToken (): string | null {
  const tokenString: string | null = localStorage.getItem('token')
  if (tokenString === null) return null
  try { return JSON.parse(tokenString) as string } catch { return null }
}

export function setStoredToken (token: string): void {
  localStorage.setItem('token', JSON.stringify(token))
}

export function clearStoredToken (): void {
  localStorage.removeItem('token')
}
