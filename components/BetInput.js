import React from 'react'

export default function BetInput({ bet, setBet }) {
  return (
    <div className='mb-4 w-full'>
      <input
        type='number'
        value={bet}
        onChange={(e) => setBet(e.target.value)}
        className='p-2 rounded bg-[#31363F] text-white w-full font-bold border-8 border-[#222831] shadow-2xl'
        placeholder='Enter Bet Amount'
      />
    </div>
  )
}
