'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function GameHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/game-history`)
      .then((response) => {
        setHistory(response.data)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className='p-6'>
      <div>
        <h2 className='text-xl font-bold mb-4 float-left'>Game History</h2>
        <Link href='/' className='text-xl font-bold mb-4 float-right'>
          Play Game
        </Link>
      </div>
      <table className='table-auto w-full border-collapse border border-gray-800'>
        <thead>
          <tr>
            <th className='border border-gray-800 p-2'>Roll</th>
            <th className='border border-gray-800 p-2'>Bet</th>
            <th className='border border-gray-800 p-2'>Result</th>
            <th className='border border-gray-800 p-2'>Balance</th>
          </tr>
        </thead>
        <tbody>
          {history.map((game, index) => (
            <tr key={index}>
              <td className='border border-gray-800 p-2'>{game.roll}</td>
              <td className='border border-gray-800 p-2'>${game.bet}</td>
              <td className='border border-gray-800 p-2'>
                {game.win ? '✅ Win' : '❌ Loss'}
              </td>
              <td className='border border-gray-800 p-2'>${game.newBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
