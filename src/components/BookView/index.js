import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class BookView extends Component {
  state = {bookDetails: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getBook()
  }

  getBook = async () => {
    this.setState({apiStatus: apiStatusValue.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedBook = await response.json()
      const book = fetchedBook.book_details
      const bookData = {
        id: book.id,
        aboutAuthor: book.about_author,
        aboutBook: book.about_book,
        authorName: book.author_name,
        image: book.cover_pic,
        rating: book.rating,
        status: book.read_status,
        title: book.title,
      }
      this.setState({bookDetails: bookData, apiStatus: apiStatusValue.success})
      console.log(bookData)
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSuccess = () => {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      image,
      rating,
      status,
      title,
    } = bookDetails
    return (
      <div>
        <Header />
        <div className="bookContainer">
          <div className="book-white-container">
            <div className="books">
              <img src={image} alt={title} className="bookImage" />
              <div>
                <h1 className="bookTitle">{title}</h1>
                <p className="bookPara">{authorName}</p>
                <p className="bookPara">
                  Avg Rating
                  <BsFillStarFill className="star" />
                  <p>{rating}</p>
                </p>
                <p className="bookPara">
                  Status: <span className="status">{status}</span>
                </p>
              </div>
            </div>
            <hr />
            <h1 className="bookTitle2">About Author</h1>
            <p className="bookPara2">{aboutAuthor}</p>
            <h1 className="bookTitle2">About Book</h1>
            <p className="bookPara2">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <>
      <div className="products-loader-container loader" testid="loader">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  renderFailure = () => (
    <div className="failure-container">
      <FailureView refresh={this.getBook} />
    </div>
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

export default BookView
