import { useEffect } from 'react'

export default function usePageTitle (subtitle: string | null): void {
  useEffect(() => {
    document.title = `Bonfires${subtitle !== null ? ` ${subtitle}` : ''}`
  })
}
