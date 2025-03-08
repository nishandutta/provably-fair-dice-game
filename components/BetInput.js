import React from 'react'

export default function BetInput({ bet, setBet }) {
  return (
    <div className='mb-4'>
      <input
        type='number'
        value={bet}
        onChange={(e) => setBet(e.target.value)}
        className='p-2 rounded bg-gray-700 text-white'
        placeholder='Enter Bet Amount'
      />
    </div>
  )
}
