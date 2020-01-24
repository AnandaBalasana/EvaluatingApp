import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import App from './App'

describe('Main app ', () => {
    test('renders Evaluation App text', () => {
        const { getByText } = render(<App />)
        const headerElement = getByText(/Evaluation App/i)
        expect(headerElement).toBeInTheDocument()
    })

    test('snapshot', () => {
        const AppPage = render(<App />)
        expect(AppPage).toMatchSnapshot()
    })

    test('App navigating', () => {
        const { getByText } = render(<App />)

        fireEvent.click(getByText('User data'))
        const textElement = getByText(/General info/i)
        expect(textElement).toBeInTheDocument()
    })

    test('landing on a bad page shows 404 page', () => {
        const history = createBrowserHistory()
        history.push('/some/bad/route')
        const { getByText } = render(
            <Router history={history}>
                <App />
            </Router>
        )
        const textElement = getByText(/404 - Site Not Found/i)
        expect(textElement).toBeInTheDocument()
    })
})
