import { Tooltip } from 'react-tooltip'
import GithubSvg from '../assets/icons/github.svg?react'

export default function RepoLink (): JSX.Element {
  return (
    <div className="repo-p">
      <a className="repo-link" href="https://github.com/endulum/bonfires" data-tooltip-id="github" aria-hidden>
        <GithubSvg className="github-svg" />
      </a>
      <Tooltip id="github" content="Visit the GitHub repository for this project" />
    </div>
  )
}
