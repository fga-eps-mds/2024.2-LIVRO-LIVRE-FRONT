import React from "react";
import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../src/App"

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})
