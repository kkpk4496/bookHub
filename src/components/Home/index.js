import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import ReactSlick from '../ReactSlick'
import Header from '../Header'
import FailureView from '../FailureView'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {bookData: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    this.setState({apiStatus: apiStatusValue.loading})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        image: each.cover_pic,
        title: each.title,
      }))
      this.setState({bookData: updatedData, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoadingView = () => (
    <>
      <LoadingView />
    </>
  )

  renderSuccess = () => {
    const {bookData} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="title">Find Your Next Favorite Books?</h1>
          <p className="para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button className="card-btn-mobile" type="button">
            Find Books
          </button>
          <div className="video-container">
            <div className="card-container">
              <h1 className="card-head">Top Rated Books</h1>
              <Link to="/shelf">
                <button className="card-btn" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <ul className="lists">
              <ReactSlick Books={bookData} />
            </ul>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  renderFailure = () => (
    <>
      <Header />
      <div className="home-container">
        <h1 className="title">Find Your Next Favorite Books?</h1>
        <p className="para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <button className="card-btn-mobile" type="button">
          Find Books
        </button>
        <div className="video-container">
          <div className="card-container">
            <h1 className="card-head">Top Rated Books</h1>
            <Link to="/shelf">
              <button className="card-btn" type="button">
                Find Books
              </button>
            </Link>
          </div>
          <FailureView refresh={this.fetchVideos} />
        </div>
        <Footer />
      </div>
    </>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.loading:
        return this.renderLoadingView()
      case apiStatusValue.success:
        return this.renderSuccess()
      case apiStatusValue.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderSwitch()}</>
  }
}

export default Home
