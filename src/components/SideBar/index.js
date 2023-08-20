import './index.css'

const SideBar = props => {
  const {data, setActiveId, activeTab} = props
  const {label, value} = data
  const changeValue = () => {
    setActiveId(data)
  }

  const highlight = activeTab ? 'highlight buttons' : 'buttons'

  return (
    <div className="side-container">
      <button
        type="button"
        className={highlight}
        value={value}
        onClick={changeValue}
      >
        {label}
      </button>
    </div>
  )
}

export default SideBar
