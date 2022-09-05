import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItem extends Component {
  state = {
    courseItemData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseItem()
  }

  getCourseItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseItemData: fetchedData,
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
    const {courseItemData} = this.state
    const {name, description, imageUrl} = courseItemData
    return (
      <div className="course-success-div">
        <img src={imageUrl} alt={name} className="logo-course" />
        <div className="description-div">
          <h1 className="course-name">{name}</h1>
          <p className="course-description">{description}</p>
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
        onClick={() => this.getCourseItem()}
      >
        Retry
      </button>
    </div>
  )

  renderCourseItem = () => {
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
        <div className="course-div">{this.renderCourseItem()}</div>
      </>
    )
  }
}

export default CourseItem
