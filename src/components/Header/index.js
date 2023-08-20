import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {home: false, bookshelf: false, hamburgerActive: false}

  onClickHome = () => {
    this.setState({home: true, bookshelf: false})
  }

  onClickBookshelf = () => {
    this.setState({bookshelf: true, home: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  hamburgerMenu = () => {
    this.setState(prevState => ({hamburgerActive: !prevState.hamburgerActive}))
  }

  render() {
    const {bookshelf, home, hamburgerActive} = this.state

    const homeHighlight = home ? 'highlight' : ''
    const bookshelfHighlight = bookshelf ? 'highlight' : ''

    return (
      <>
        <nav className="nav-header">
          <div className="nav-content">
            <Link to="/" className="nav-link">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1691079962/BookHubLogo_xfuzpn.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <Link to="/" className="nav-link" onClick={this.onClickHome}>
                <li className={`tabs ${homeHighlight}`}>Home</li>
              </Link>
              <Link
                to="/shelf"
                className="nav-link"
                onClick={this.onClickBookshelf}
              >
                <li className={`tabs ${bookshelfHighlight}`}>Bookshelves</li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>

            <button
              type="button"
              className="menu-btn"
              onClick={this.hamburgerMenu}
            >
              <img
                src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1692076438/menu_tp69c0.png"
                alt="menu"
              />
            </button>
          </div>
        </nav>
        {hamburgerActive ? (
          <>
            <ul className="mobile-list">
              <Link to="/" className="nav-link" onClick={this.onClickHome}>
                <li className={`tabs ${homeHighlight}`}>Home</li>
              </Link>
              <Link
                to="/shelf"
                className="nav-link"
                onClick={this.onClickBookshelf}
              >
                <li className={`tabs ${bookshelfHighlight}`}>Bookshelves</li>
              </Link>

              <button
                type="button"
                className="logout-mobile-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <button
                type="button"
                onClick={this.hamburgerMenu}
                className="close"
              >
                <img
                  src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1692079370/Solid_i5mwbu.png"
                  alt="close"
                />
              </button>
            </ul>
          </>
        ) : (
          ''
        )}
      </>
    )
  }
}
export default withRouter(Header)
