'use client'
import React from 'react'

export default function Dice({ handleRollDice }) {
  return (
    <div className='flex justify-center my-4'>
      <button
        className='bg-green-500 text-white font-bold py-2 px-4 rounded w-full'
        onClick={handleRollDice}
      >
        Roll Dice
      </button>
    </div>
  )
}
