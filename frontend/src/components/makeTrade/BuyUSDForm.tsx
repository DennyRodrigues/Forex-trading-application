import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authentication/AuthContext'
import { useExchangeRates } from '../../contexts/socketcontext/WebSocketProvider'
import { ExchangeRate, ITradePayload } from '../../types/Trade'
import { SelectCurrency } from './SelectCurrency/SelectCurrency'
import { TradeCalculation } from './TradeCalculation'
import { Box, Button, Typography } from '@mui/material'
import styled from 'styled-components'

const exchangeOptions = ['BTC', 'EUR', 'JPY']

export const BuyUSDForm = (props: any) => {
  // Contexts
  const token = useContext(AuthContext)?.token
  const updateUser = useContext(AuthContext)?.updateUser

  // Props
  const entrySymbol = props.entrySymbol

  // Hooks
  const webSocketRate = useExchangeRates()

  // States
  const [isInvalid, setIsInvalid] = useState(false)
  const [isSwapped, setIsSwapped] = useState(false)
  const [selectedExchangeSymbol, setSelectedExchangeSymbol] = useState('BTC')
  const [selectedExchangeRate, setSelectedExchangeRate] = useState(0)
  const [entryAmount, setEntryAmount] = useState(0)
  const [exitAmount, setExitAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [rate, setRate] = useState(1 / selectedExchangeRate)

  const canSubmit = selectedExchangeRate !== 0

  const TradePayload: ITradePayload = {
    entrySymbol: isSwapped ? entrySymbol : selectedExchangeSymbol,
    exitSymbol: isSwapped ? selectedExchangeSymbol : entrySymbol,
    exchangeRate: rate,
    value: entryAmount,
  }
  // Consts

  const onClickSwapButton = () => {
    setIsSwapped((prev) => !prev)
  }

  useEffect(() => {
    if (isSwapped) {
      setRate(selectedExchangeRate)
    } else {
      setRate(1 / selectedExchangeRate)
    }
  }, [isSwapped, selectedExchangeRate, setSelectedExchangeRate, rate])

  // Effects  Update exchange rate
  useEffect(() => {
    if (webSocketRate) {
      setSelectedExchangeRate(
        webSocketRate?.find(
          (rate: ExchangeRate) => rate?.symbol === selectedExchangeSymbol
        )?.value as number
      )
    }
  }, [selectedExchangeSymbol, entryAmount, webSocketRate])

  // Effects  Update exit Amount
  useEffect(() => {
    setExitAmount(entryAmount * rate)
  }, [entryAmount, rate])
  // Functions
  // The form will submit using fetch
  function onSubmitHandler(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault()

    setIsInvalid(false)

    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/trades`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        date: new Date(),
        ...TradePayload,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          setIsInvalid(false)
          if (updateUser) {
            updateUser()
          }
        } else {
          setIsInvalid(true)
          setErrorMessage(res.message)
        }
      })
      .catch((e) => {
        console.log(e)
        setIsInvalid(true)
      })
  }
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // Keep the trade value between 0 and 5000
    const { value, min, max } = e.target

    const newValue = Math.max(Number(min), Math.min(Number(max), Number(value)))

    setEntryAmount(newValue)
  }

  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <StyledFlex>
        <StyledFlexCol>
          {isSwapped ? (
            <Typography
              sx={{ borderBottom: '1px solid rgba(122,122,122,0.5)' }}
            >
              USD
            </Typography>
          ) : (
            <SelectCurrency
              setSelectedExchange={setSelectedExchangeSymbol}
              selectedExchange={selectedExchangeSymbol}
              exchangeOptions={exchangeOptions}
            />
          )}
          <StyledInput
            type='number'
            name='value'
            onChange={changeHandler}
            value={entryAmount}
            max='500000'
            min='0'
          />
        </StyledFlexCol>
        <Button
          variant='contained'
          sx={{
            minHeight: '35px',
            minWidth: '35px',
            borderRadius: '100%',
            width: '35px',
            height: '35px',
          }}
          onClick={onClickSwapButton}
        >
          ⇆
        </Button>
        <StyledFlexCol>
          {!isSwapped ? (
            <Typography
              sx={{ borderBottom: '1px solid rgba(122,122,122,0.5)' }}
            >
              USD
            </Typography>
          ) : (
            <SelectCurrency
              setSelectedExchange={setSelectedExchangeSymbol}
              selectedExchange={selectedExchangeSymbol}
              exchangeOptions={exchangeOptions}
            />
          )}
          <TradeCalculation exitAmount={exitAmount} />
        </StyledFlexCol>
      </StyledFlex>
      <Box sx={{ textAlign: 'center' }}>
        {isInvalid ? (
          <p className='error'>
            {errorMessage ? errorMessage : 'Not able to make trade'}
          </p>
        ) : (
          <p className='error'></p>
        )}
        <Button disabled={!canSubmit} variant='contained' type='submit'>
          Trade
        </Button>
      </Box>
    </StyledForm>
  )
}

const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  ${({ swap }: { swap: Boolean }) =>
    swap &&
    `
    flex-direction: row-reverse;
  `})
`
const StyledForm = styled.form``

const StyledFlexCol = styled.div`
  width: 200px;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 10px 20px 10px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`

const StyledInput = styled.input`
  font-family: inherit;
  border-radius: 1px;
  padding: 3px 7px;
  border: none;
  width: 100%;
  outline: 1px solid rgba(0, 0, 0, 0.2);
`
