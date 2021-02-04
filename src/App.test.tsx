import App from "./App"
import React from "react"
import { render } from "./test-utils"
import { fireEvent, screen } from "@testing-library/react"

test("renders Mr Robot app", () => {
  render(<App />)
  const titleElement = screen.getByText(/mr robot/i)
  expect(titleElement).toBeInTheDocument()
})

test("Command Robot to PLACE", () => {
  render(<App />)
  const inputElement = screen.getByPlaceholderText(/what should mr robot do?/i)
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement, {target: {value: "PLACE 3,2,NORTH"}});
  const runCommandButton = screen.getByText(/run/i)
  runCommandButton.click();
  const commandText = screen.getByText(/PLACE 3, 2, NORTH/)
  expect(commandText).toBeInTheDocument()
})

test("Command Robot before PLACE", () => {
  render(<App />)
  const inputElement = screen.getByPlaceholderText(/what should mr robot do?/i)
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement, {target: {value: "MOVE"}});
  const runCommandButton = screen.getByText(/run/i)
  runCommandButton.click();
  const errText = screen.getByText(/Not placed/)
  expect(errText).toBeInTheDocument()
})


test("MOVE Robot after PLACE", () => {
  render(<App />)
  const inputElement = screen.getByPlaceholderText(/what should mr robot do?/i)
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement, {target: {value: "PLACE 3,2,WEST"}});
  const runCommandButton = screen.getByText(/run/i)
  runCommandButton.click();
  fireEvent.change(inputElement, {target: {value: "MOVE"}});
  runCommandButton.click();
  fireEvent.change(inputElement, {target: {value: "LEFT"}});
  runCommandButton.click();
  fireEvent.change(inputElement, {target: {value: "MOVE"}});
  runCommandButton.click();
  fireEvent.change(inputElement, {target: {value: "REPORT"}});
  runCommandButton.click();
  const commandText = screen.getByText(/CURRENT: 2, 1, SOUTH/)
  expect(commandText).toBeInTheDocument()
})


test("Command Robot to PLACE", () => {
  render(<App />)
  const inputElement = screen.getByPlaceholderText(/what should mr robot do?/i)
  expect(inputElement).toBeInTheDocument()
  fireEvent.change(inputElement, {target: {value: "PLACE 0,0,SOUTH"}});
  const runCommandButton = screen.getByText(/run/i)
  runCommandButton.click();
  fireEvent.change(inputElement, {target: {value: "MOVE"}});
  runCommandButton.click();
  const commandText = screen.getByText(/out of bounds/i)
  expect(commandText).toBeInTheDocument()
})
