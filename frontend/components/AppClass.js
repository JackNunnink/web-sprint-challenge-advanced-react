import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = {
      position: [2,2],
      count: 0,
      email: '',
      message: ''
    }
  }

  counter = () => {
    const count = this.state.count
    this.setState({ count: count + 1 })
  }

  moveRight = () => {
    const [x, y] = this.state.position
    if (x >= 3) {
      this.setState({ position: [ 3, y ], message: "You can't go right" })
    } else {
      this.setState({ position: [ x + 1, y ], message: "" })
      this.counter()
    }
  }

  moveLeft = () => {
    const [x, y] = this.state.position
    if (x <= 1) {
      this.setState({ position: [ 1, y ], message: "You can't go left" })
    } else {
      this.setState({ position: [ x - 1, y ], message: "" })
      this.counter()
    }
  }

  moveUp = () => {
    const [x, y] = this.state.position
    if (y <= 1) {
      this.setState({ position: [ x, 1 ], message: "You can't go up" })
    } else {
      this.setState({ position: [ x, y - 1 ], message: "" })
      this.counter()
    }
  }

  moveDown = () => {
    const [x, y] = this.state.position
    if (y >= 3) {
      this.setState({ position: [ x, 3 ], message: "You can't go down" })
    } else {
      this.setState({ position: [ x, y + 1 ], message: "" })
      this.counter()
    }
  }

  reset = () => {
    this.setState({ position: [2,2], count: 0, email: '', message: '' })
  }

  emailInput = evt => {
    this.setState({ email: evt.target.value })
  }

  handleSubmit = () => {
    const [x, y] = this.state.position
    const newForm = {
      x: x,
      y: y,
      steps: this.state.count,
      email: this.state.email
    }

    axios.post(URL, newForm)
      .then(res => {
        this.setState({
          ...this.state,
          message: res.data.message
        })
      })
      .catch(err => {
        this.setState({
          ...this.state,
          message: err.response.data.message
        })
      })
      .finally(() => {
        this.setState({
          email: ""
        })
      })
  }

  render() {
    const { className } = this.props
    const [ x, y ] = this.state.position
    const count = this.state.count
    const message = this.state.message
    
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {count} time{count !== 1 && 's' || ''}</h3>
        </div>
        <div id="grid">
          <div className={`square ${x === 1 && y === 1 && 'active' || ''}`}>{`${x === 1 && y === 1 && 'B' || ''}`}</div>
          <div className={`square ${x === 2 && y === 1 && 'active' || ''}`}>{`${x === 2 && y === 1 && 'B' || ''}`}</div>
          <div className={`square ${x === 3 && y === 1 && 'active' || ''}`}>{`${x === 3 && y === 1 && 'B' || ''}`}</div>
          <div className={`square ${x === 1 && y === 2 && 'active' || ''}`}>{`${x === 1 && y === 2 && 'B' || ''}`}</div>
          <div className={`square ${x === 2 && y === 2 && 'active' || ''}`}>{`${x === 2 && y === 2 && 'B' || ''}`}</div>
          <div className={`square ${x === 3 && y === 2 && 'active' || ''}`}>{`${x === 3 && y === 2 && 'B' || ''}`}</div>
          <div className={`square ${x === 1 && y === 3 && 'active' || ''}`}>{`${x === 1 && y === 3 && 'B' || ''}`}</div>
          <div className={`square ${x === 2 && y === 3 && 'active' || ''}`}>{`${x === 2 && y === 3 && 'B' || ''}`}</div>
          <div className={`square ${x === 3 && y === 3 && 'active' || ''}`}>{`${x === 3 && y === 3 && 'B' || ''}`}</div>
        </div>
        <div className="info">
          <h3 id="message" data-testid="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.moveLeft} id="left">LEFT</button>
          <button onClick={this.moveUp} id="up">UP</button>
          <button onClick={this.moveRight} id="right">RIGHT</button>
          <button onClick={this.moveDown} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.handleSubmit()
        }}>
          <input onChange={this.emailInput} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" data-testid="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
