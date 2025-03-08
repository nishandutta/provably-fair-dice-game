'use client'
import React, { useState } from 'react'
import Balance from '../components/Balance'
import BetInput from '../components/BetInput'
import Dice from '../components/Dice'
import axios from 'axios'

export default function Home() {
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState('')
  const [result, setResult] = useState(null)

  const handleRollDice = async () => {
    if (bet <= 0 || bet > balance) {
      alert('Invalid Bet Amount')
      return
    }

    try {
      const response = await axios.post('http://localhost:4000/roll-dice', {
        bet: parseFloat(bet),
      })

      const { roll, newBalance, win } = response.data
      setResult({ roll, win })
      setBalance(newBalance)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>🎲 Provably Fair Dice Game</h1>
      <Balance balance={balance} />
      <BetInput bet={bet} setBet={setBet} />
      <Dice handleRollDice={handleRollDice} />
      {result && (
        <div className='mt-4'>
          <p>
            You rolled: <strong>{result.roll}</strong>
          </p>
          <p>{result.win ? '✅ You Win!' : '❌ You Lose!'}</p>
        </div>
      )}
    </div>
  )
}
