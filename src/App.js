import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PackgaeList from './PackgaeList'
import './App.css'

const status = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    packageData: [],
    renderStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getTravelGuide()
  }

  getTravelGuide = async () => {
    this.setState({renderStatus: status.progress})
    const response = await fetch(' https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.packages.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        imageUrl: eachObj.image_url,
        description: eachObj.description,
      }))
      this.setState({packageData: updatedData, renderStatus: status.success})
    } else {
      this.setState({renderStatus: status.failure})
    }
  }

  renderProgress = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failureContainer">
      <h1>Oops! Something Went Wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {packageData} = this.state
    return (
      <ul className="guideUl">
        {packageData.map(eachObj => (
          <PackgaeList data={eachObj} key={eachObj.id} />
        ))}
      </ul>
    )
  }

  renderRenderStatus = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case status.success:
        return this.renderSuccess()
      case status.failure:
        return this.renderFailure()
      case status.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr />
        {this.renderRenderStatus()}
      </div>
    )
  }
}

export default App
