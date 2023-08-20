import './index.css'

const FailureView = props => {
  const {refresh} = props

  const refreshPage = () => {
    refresh()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1692072665/Error_njcont.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" className="retry-btn" onClick={refreshPage}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
