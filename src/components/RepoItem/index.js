import React from 'react'
import './index.css'

const RepoItem = props => {
  const {repoDetails} = props
  const {
    id,
    repoName,
    ownerAvatar,
    description,
    lastPushed,
    issues,
    stars,
    ownerName,
  } = repoDetails
  return (
    <li className="repo-item">
      <img src={ownerAvatar} alt="repo-owner" className="owner-avatar" />
      <div className="repo-details">
        <h1 className="repo-name">{repoName}</h1>
        <p className="repo-description">{description}</p>
        <div className="sub-details-container">
          <p>{issues} Stars</p>
          <p>{stars} Issues</p>
          <p>
            Last pushed <span>{lastPushed}</span> by <span>{ownerName}</span>{' '}
          </p>
        </div>
      </div>
    </li>
  )
}

export default RepoItem
