import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFound">
    <img
      src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1692202071/NotFound_ms7lm3.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="retry-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
