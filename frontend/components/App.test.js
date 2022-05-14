import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import AppClass from './AppClass'

// Write your tests here
test('sanity', () => {
  render(<AppClass />)
})

test('Right button works', () => {
  render(<AppClass />)

  const rightInput = screen.getByText(/right/i)
  fireEvent.click(rightInput)

  setTimeout(() => {
    const coordinates = screen.getByText("Coordinates (3, 2)")
    expect(coordinates).toBeInTheDocument()
  }, 0)
})

test('Reset button works', () => {
  render(<AppClass />)

  const resetInput = screen.getByText(/reset/i)
  fireEvent.click(resetInput)

  setTimeout(() => {
    const coordinates = screen.getByText(/Coordinates (2, 2)/i)
    expect(coordinates).toBeInTheDocument()

    const count = screen.getByText("You moved 0 times")
    expect(count).toBeInTheDocument()
  }, 0)
})

test('Email submit works', () => {
  render(<AppClass />)

  const emailInput = screen.getByPlaceholderText("type email")
  fireEvent.change(emailInput, "asdf@asdf.com")
  
  setTimeout(() => {
    const submitInput = screen.getByTestId("submit")
    fireEvent.click(submitInput)

    const message = screen.getByTestId("message")
    expect(message).toBeInTheDocument()
  }, 0)
})

test('Email does not submit when not given an email', () => {
  render(<AppClass />)

  const submitInput = screen.getByTestId("submit")
  fireEvent.click(submitInput)

  setTimeout(() => {
    const message = screen.getByText(/Ouch: email is required/i)
    expect(message).toBeInTheDocument()
  }, 0)
})