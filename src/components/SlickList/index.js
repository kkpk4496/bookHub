import './index.css'
import {Link} from 'react-router-dom'

const SlickList = props => {
  const {data} = props
  const {id, image, title, authorName} = data
  return (
    <Link to={`/books/${id}`} key={id} className="link">
      <li className="list-container" key={id}>
        <img src={image} alt="thumbnail" className="thumbnail" />
        <h1 className="book-name">{title}</h1>
        <p className="author">{authorName}</p>
      </li>
    </Link>
  )
}

export default SlickList
