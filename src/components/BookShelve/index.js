import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import SideBar from '../SideBar'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelve extends Component {
  state = {
    books: {},
    bookValue: bookshelvesList[0].value,
    bookLabel: bookshelvesList[0].label,
    activeId: bookshelvesList[0].id,
    searchInput: '',
    search: '',
    total: 0,
    apiStatus: apiStatusValue.initial,
  }

  componentDidMount() {
    this.shelfApiCall()
  }

  setActiveID = data => {
    const {id, value, label} = data
    this.setState(
      {
        activeId: id,
        bookLabel: label,
        bookValue: value,
      },
      this.shelfApiCall,
    )
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.setState(
      prevState => ({search: prevState.searchInput}),
      this.shelfApiCall,
    )
  }

  shelfApiCall = async value => {
    const {bookValue, search} = this.state
    this.setState({apiStatus: apiStatusValue.loading, bookValue: value})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookValue}&search=${search}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.books.map(each => ({
        authorName: each.author_name,
        image: each.cover_pic,
        id: each.id,
        rating: each.rating,
        status: each.read_status,
        title: each.title,
      }))
      console.log(data)
      this.setState({
        books: fetchedData,
        total: data.total,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

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

  renderLoadingView = () => (
    <>
      <LoadingView />
    </>
  )

  renderSuccess = () => {
    const {books, total} = this.state

    if (total === 0) {
      return this.renderNoResults()
    }

    return (
      <ul className="daa">
        {books.map(each => (
          <Link to={`/books/${each.id}`} key={each.id} className="link">
            <li className="books1" key={each.id}>
              <img src={each.image} alt={each.title} className="bookImage1" />
              <div className="bookCard">
                <h1 className="bookTitle1">{each.title}</h1>
                <p className="bookPara1">{each.authorName}</p>
                <p className="bookPara1">
                  Avg Rating
                  <BsFillStarFill className="star" />
                  <p>{each.rating}</p>
                </p>
                <p className="bookPara1">
                  Status: <span className="status">{each.status}</span>
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderNoResults = () => {
    const {searchInput} = this.state
    return (
      <div className="notFound">
        <img
          src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1692518470/SearchBooks_noxmsw.png"
          alt="no books"
        />
        <p>Your search for {searchInput} did not find any matches.</p>
      </div>
    )
  }

  renderFailure = () => <FailureView refresh={this.shelfApiCall} />

  render() {
    const {activeId, bookLabel, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="books-container">
          <ul className="sidebar">
            <h1 className="heading">Bookshelves</h1>
            {bookshelvesList.map(each => (
              <SideBar
                key={each.id}
                data={each}
                setActiveId={this.setActiveID}
                activeTab={activeId === each.id}
              />
            ))}
          </ul>
          <div className="content">
            <div className="heading-container">
              <h1 className="heading">{bookLabel} Books</h1>
              <div className="search-container">
                <input
                  type="search"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                  className="search-input"
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearch}
                  testid="searchButton"
                >
                  <BsSearch className="search" />
                </button>
              </div>
            </div>
            {this.renderSwitch()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default BookShelve
