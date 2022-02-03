import './index.css'

const TabItem = props => {
  const {tabDetails, onClickTab, isActive} = props
  const {tabId, displayText} = tabDetails
  const decorationClass = isActive ? 'decorated-txt' : 'text'

  const clickTab = () => {
    onClickTab(tabId)
  }

  return (
    <li className="tab-item-list-item">
      <button type="button" className="text-btn" onClick={clickTab}>
        <h1 className={decorationClass}>{displayText}</h1>
      </button>
    </li>
  )
}

export default TabItem
