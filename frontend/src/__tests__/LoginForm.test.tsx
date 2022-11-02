import { act, render, screen } from '@testing-library/react'
import { LoginForm } from '../components/User/LoginForm'
import user from '@testing-library/user-event'
import React from 'react'

let realUseContext: any
let useContextMock: any
// Setup mock
beforeEach(() => {
  realUseContext = React.useContext
  useContextMock = React.useContext = jest.fn()
})
// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext
})

describe('test Login Form', () => {
  it('Should display invalid response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 400 }),
      })
    ) as jest.Mock

    const onSubmitHandler = jest.fn().mockImplementation(() => {})

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<LoginForm onSubmit={onSubmitHandler} />)
    })

    const button = screen.getByRole('SubmitButton', { exact: false })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      user.click(button)
    })

    expect(screen.getByTestId('error', { exact: false })).toHaveTextContent(
      'Invalid Request'
    )
  })
  it('Should call function that changes router', async () => {
    const onLogin = jest.fn()
    useContextMock.mockReturnValue({ onLogin })

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'success' }),
      })
    ) as jest.Mock

    const onSubmitHandler = jest.fn().mockImplementation(() => {})
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<LoginForm onSubmit={onSubmitHandler} />)
    })

    const button = screen.getByRole('SubmitButton', { exact: false })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      user.click(button)
    })
    expect(onLogin).toHaveBeenCalled()
  })
})
