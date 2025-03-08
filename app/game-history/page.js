'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function GameHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:4000/game-history')
      .then((response) => {
        setHistory(response.data)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Game History</h2>
      <table className='table-auto w-full border-collapse border border-gray-800'>
        <thead>
          <tr>
            <th className='border border-gray-800 p-2'>Roll</th>
            <th className='border border-gray-800 p-2'>Bet</th>
            <th className='border border-gray-800 p-2'>Result</th>
            <th className='border border-gray-800 p-2'>Balance</th>
            <th className='border border-gray-800 p-2'>Hash</th>
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
              <td className='border border-gray-800 p-2'>{game.hash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
