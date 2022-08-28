
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'
require('jest-fetch-mock').enableMocks()

beforeEach(() => {
    // sets everything back to initial state before each test
    fetch.resetMocks();
})


test("receives GitHub name from GitHub REST API using jest fetch mock", async () => {
    fetch.mockResponseOnce(JSON.stringify({ name: 'coder' }))
    render(<App />)
    const gitHubName = await waitFor(() => screen.getByRole('heading', { level: 2 }))
    expect(gitHubName).toHaveTextContent('coder')
})

test("test button for text content and href that is obtained from GitHub REST API using jest fetch mock", async () => {
    fetch.mockResponseOnce(JSON.stringify({ html_url: 'http://github.com/learningToCode1234' }))
    render(<App />)
    const gitHubURL = await waitFor(() => screen.getByRole('link'))
    expect(gitHubURL).toHaveAttribute('href', 'http://github.com/learningToCode1234')
    const button = await waitFor(() => screen.getByRole('button'))
    expect(button).toHaveTextContent("Link to GitHub profile.")
})
