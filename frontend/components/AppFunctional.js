import React, { useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result';

export default function AppFunctional(props) {
  const [ state, setState ] = useState({
    position: [2,2]
  })
  const [countState, setCount] = useState({
    count: 0
  })
  const [emailState, setEmail] = useState({
    email: ''
  })
  const [messageState, setMessage] = useState({
    message: ''
  })

  const counter = () => {
    const count = countState.count
    setCount({ count: count + 1 })
  }

  const moveRight = () => {
    const [ x, y ] = state.position
    if (x >= 3) {
      setState({ position: [ 3, y ] })
      setMessage({ message: "You can't go right" })
    } else {
      setState({ position: [ x + 1, y ] })
      setMessage({ message: "" })
      counter()
    }
  }

  const moveLeft = () => {
    const [ x, y ] = state.position
    if (x <= 1) {
      setState({ position: [ 1, y ] })
      setMessage({ message: "You can't go left" })
    } else {
      setState({ position: [ x - 1, y ] })
      setMessage({ message: "" })
      counter()
    }
  }

  const moveUp = () => {
    const [ x, y ] = state.position
    if (y <= 1) {
      setState({ position: [ x, 1 ] })
      setMessage({ message: "You can't go up" })
    } else {
      setState({ position: [ x, y - 1 ] })
      setMessage({ message: "" })
      counter()
    }
  }

  const moveDown = () => {
    const [ x, y ] = state.position
    if (y >= 3) {
      setState({ position: [ x, 3 ] })
      setMessage({ message: "You can't go down" })
    } else {
      setState({ position: [ x, y + 1 ] })
      setMessage({ message: "" })
      counter()
    }
  }

  const reset = () => {
    setState({ position: [2,2] })
    setCount({ count: 0 })
    setEmail({ email: '' })
    setMessage({ message: '' })
  }

  const emailInput = evt => {
    setEmail({ email: evt.target.value })
  }

  const handleSubmit = () => {
    const [ x, y ] = state.position
    const newForm = {
      x: x,
      y: y,
      steps: countState.count,
      email: emailState.email
    }

    axios.post(URL, newForm)
      .then(res => {
        setMessage({
          ...messageState,
          message: res.data.message
        })
      })
      .catch(err => {
        setMessage({
          ...messageState,
          message: err.response.data.message
        })
      })
      .finally(() => {
        setEmail({ email: '' })
      })
  }

  const [ x, y ] = state.position
  const count = countState.count
  const message = messageState.message
  
  return (
    <div id="wrapper" className={props.className}>
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
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={moveLeft} id="left">LEFT</button>
        <button onClick={moveUp} id="up">UP</button>
        <button onClick={moveRight} id="right">RIGHT</button>
        <button onClick={moveDown} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <input onChange={emailInput} value={emailState.email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
