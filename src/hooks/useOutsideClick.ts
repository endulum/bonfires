import { useEffect, type MutableRefObject } from 'react'

export default function useOutsideClick (
  ref: MutableRefObject<HTMLDivElement | null>,
  onClick: () => void
): void {
  useEffect(() => {
    function handleClickOutside (event: MouseEvent): void {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        onClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
