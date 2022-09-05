import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const api = 'https://apis.ccbp.in/te/courses'

    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        courseList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="home-container">
        <div className="home-responsive">
          <h1 className="heading">Courses</h1>
          <ul className="ul-logos">
            {courseList.map(eachValue => (
              <Link
                to={`/courses/${eachValue.id}`}
                key={eachValue.id}
                className="link"
              >
                <li key={eachValue.id} className="logo-item">
                  <img
                    src={eachValue.logoUrl}
                    alt={eachValue.name}
                    className="logo-img"
                  />
                  <p className="course-title">{eachValue.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="fail-image"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="btn-retry"
        type="button"
        onClick={() => this.getCourses()}
      >
        Retry
      </button>
    </div>
  )

  renderHomeItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderHomeItem()}
      </>
    )
  }
}

export default HomeRoute
