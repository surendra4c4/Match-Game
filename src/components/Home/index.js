import {Component} from 'react'
import TabItem from '../TabItem'
import ImageDetails from '../ImageDetails'

import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: props.tabList[0].tabId,
      score: 0,
      stateImageUrl: props.imageList[0].imageUrl,
      timer: 60,
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.counter, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  counter = () => {
    const {timer} = this.state

    if (timer === 0) {
      clearInterval(this.intervalId)
    } else {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState({score: 0, timer: 60})
  }

  imageIsClicked = imgUrl => {
    const {stateImageUrl} = this.state
    const {imageList} = this.props
    const randomImg =
      imageList[Math.ceil(Math.random() * (imageList.length - 1))]

    if (stateImageUrl === imgUrl) {
      this.setState(prevState => ({score: prevState.score + 1}))
      this.setState({stateImageUrl: randomImg.imageUrl})
    } else {
      clearInterval(this.intervalId)
      this.setState({timer: 0})
    }
  }

  onClickTab = tabId => {
    this.setState({activeId: tabId})
  }

  getInitialList = () => {
    const {imageList} = this.props
    const {activeId} = this.state

    const filterList = imageList.filter(
      eachTab => eachTab.category === activeId,
    )

    return filterList
  }

  render() {
    const {tabList} = this.props
    const {activeId, score, stateImageUrl, timer} = this.state
    const filterList = this.getInitialList()

    return (
      <div className="bg-container">
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />
          <ul className="score-container">
            <li className="list">
              <p className="score-paragraph">
                Score: <span className="span-class">{score}</span>
              </p>
            </li>
            <li className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-image"
              />
              <p className="span-class">{timer} sec</p>
            </li>
          </ul>
        </nav>
        {timer > 0 ? (
          <div className="bottom-container">
            <img src={stateImageUrl} alt="match" className="image" />
            <ul className="tab-item-list-container">
              {tabList.map(eachItem => (
                <TabItem
                  tabDetails={eachItem}
                  key={eachItem.tabId}
                  onClickTab={this.onClickTab}
                  isActive={eachItem.tabId === activeId}
                />
              ))}
            </ul>
            <ul className="img-list-container">
              {filterList.map(eachItem => (
                <ImageDetails
                  images={eachItem}
                  key={eachItem.id}
                  imageIsClicked={this.imageIsClicked}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="score-card-bg-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy"
            />
            <p className="your-score">Your Score</p>
            <p className="score">{score}</p>
            <button
              type="button"
              className="play-again-btn"
              onClick={this.onReset}
            >
              <div className="play-again-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-img"
                />
                <p className="play-again-text">PLAY AGAIN</p>
              </div>
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Home
