import React from 'react'
import Loader from 'react-loader-spinner'
import RepoItem from '../RepoItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const GithubReposApp = () => {
  const [reposList, setReposList] = React.useState([])
  const [showLoader, setShowLoader] = React.useState(true)

  const getUpdatedParsedData = data =>
    data.map(each => ({
      id: each.id,
      ownerAvatar: each.owner.avatar_url,
      description: each.description,
      lastPushed: new Date(each.updated_at).toLocaleString(),
      ownerName: each.owner.login,
      repoName: each.name,
      issues: each.open_issues_count,
      stars: each.forks_count, // no Stars data in API
    }))

  const getRepos = async () => {
    const url =
      'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc'
    const accessToken = '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'
    const options = {
      method: 'GET',
      // headers: {
      //   Authorization: `token ${accessToken}`,
      // },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      const reposListData = getUpdatedParsedData(data.items)
      setReposList(reposListData)
      setShowLoader(false)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getRepos()
  }, [])

  return (
    <div className="main-container">
      <h1 className="app-heading">Most Starred Repos</h1>
      {showLoader === true ? (
        <div className="loader-container">
          <Loader type="ThreeDots" color="brown" height="50" width="50" />
        </div>
      ) : (
        <ul className="repos-list">
          {reposList.map(item => (
            <RepoItem key={item.id} repoDetails={item} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default GithubReposApp
