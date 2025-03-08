'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Balance from '../components/Balance'
import BetInput from '../components/BetInput'
import Dice from '../components/Dice'

export default function Home() {
  const [balance, setBalance] = useState(0)
  const [bet, setBet] = useState('')
  const [result, setResult] = useState(null)

  // ✅ Fetch balance from API when page loads
  useEffect(() => {
    axios
      .get('http://localhost:4000/balance')
      .then((response) => {
        setBalance(response.data.balance)
      })
      .catch((error) => {
        console.error('Error fetching balance:', error)
      })
  }, [])

  const handleRollDice = async () => {
    try {
      const response = await axios.post('http://localhost:4000/roll-dice', {
        bet: parseFloat(bet),
      })

      setResult(response.data)
      setBalance(response.data.newBalance) // ✅ Auto-update balance
      setBet('')
    } catch (error) {
      console.error('Error rolling dice:', error)
      alert('Invalid bet or server error')
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Provably Fair Dice Game</h1>
      <Balance balance={balance} />
      <BetInput bet={bet} setBet={setBet} />
      <Dice handleRollDice={handleRollDice} />
      {result && (
        <div className='mt-4'>
          <p>Roll: {result.roll}</p>
          <p>{result.win ? '✅ You Won!' : '❌ You Lost!'}</p>
          <p>New Balance: ${result.newBalance}</p>
        </div>
      )}
    </div>
  )
}
