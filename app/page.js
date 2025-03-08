'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Balance from '../components/Balance'
import BetInput from '../components/BetInput'
import Dice from '../components/Dice'
import DiceLine from '@/components/DiceLine'
import Link from 'next/link'

export default function Home() {
  const [balance, setBalance] = useState(0)
  const [bet, setBet] = useState('')
  const [result, setResult] = useState(null)
  const [roll, setRoll] = useState(null)
  const [winAmount, setWinAmount] = useState(0)

  // ✅ Fetch balance from API when page loads
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/balance`)
      .then((response) => {
        setBalance(response.data.balance)
      })
      .catch((error) => {
        console.error('Error fetching balance:', error)
      })
  }, [])

  const handleRollDice = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/roll-dice`,
        {
          bet: parseFloat(bet),
        }
      )

      setResult(response.data)
      setBalance(response.data.newBalance)
      setRoll(response.data.roll)

      // ✅ Calculate win amount if user wins
      if (response.data.win) {
        setWinAmount(parseFloat(bet) * 2)
      } else {
        setWinAmount(0)
      }

      setBet('')
    } catch (error) {
      console.error('Error rolling dice:', error)
      alert('Invalid bet or server error')
    }
  }

  return (
    <>
      <div className='grid grid-cols-5'>
        <div className='col-span-2 bg-[#31363F] p-10'>
          <h1 className='font-bold pb-2'>Bet Amount</h1>
          <BetInput bet={bet} setBet={setBet} />
          {result && (
            <div className='mt-4 bg-[#222831] text-white p-4 rounded-lg'>
              {/* <p className='text-lg font-bold'>🎲 Dice Rolled: {result.roll}</p> */}
              {result.win ? (
                <p className='text-green-500 font-semibold text-sm pb-2 mt-2'>
                  ✅ You Won ${winAmount}!
                </p>
              ) : (
                <p className='text-red-500 font-semibold text-sm pb-2 mt-2'>
                  ❌ You Lost!
                </p>
              )}
              <p className='mt-2'>💸 New Balance: ${result.newBalance}</p>
            </div>
          )}
          <h1 className='font-bold pb-2'>Profit on Win</h1>
          <div className='grid grid-cols-5 border-8 p-2 border-[#222831] items-center'>
            <div className='col-span-4'>{winAmount}</div>
            <div className='col-span-1 justify-end text-right'>$</div>
          </div>
          <Dice handleRollDice={handleRollDice} />
        </div>
        <div className='col-span-3 bg-[#222831] p-10 h-screen'>
          <div className='flex flex-col text-white rounded-lg p-4 relative h-full'>
            {/* ✅ Top Right Balance */}
            <div className='absolute top-0 right-0 text-right'>
              <Balance balance={balance} />
            </div>

            {/* ✅ Perfectly Centered Dice Line */}
            <div className='flex-grow flex justify-center items-center'>
              <DiceLine roll={roll} />
            </div>

            {/* ✅ Bottom Left Game History & Dice Rolled */}
            <div className='absolute bottom-0 left-0 text-left w-full p-4'>
              <div className='flex gap-4'>
                <Link
                  href='/game-history'
                  className='bg-blue-500 text-white p-4 rounded-lg w-1/2 text-center'
                >
                  🎰 Game History
                </Link>
                <div className='bg-blue-500 text-white p-4 rounded-lg w-1/2 text-center'>
                  🎲 Dice Rolled: {roll}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
