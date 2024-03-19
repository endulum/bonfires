import { Link } from 'react-router-dom'

export default function Index ({ userData }: {
  userData: { username: string, id: string }
}): JSX.Element {
  return (
    <p>
      This is the index.
    </p>
  )
}
