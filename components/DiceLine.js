'use client'

import React, { useEffect, useState } from 'react'

const DiceLine = ({ roll }) => {
  const [position, setPosition] = useState(0)

  // Map roll (1-6) to percentage on the slider (0 to 100)
  const getPosition = (roll) => {
    const map = {
      1: 0,
      2: 20,
      3: 40,
      4: 60,
      5: 80,
      6: 100,
    }
    return map[roll]
  }

  useEffect(() => {
    // Animate the dice movement when roll changes
    if (roll) {
      setPosition(getPosition(roll))
    }
  }, [roll])

  return (
    <div className='relative w-full h-10 mt-6'>
      {/* Background slider */}
      <div className='w-full h-3 bg-gray-700 rounded-full flex items-center'>
        {/* Losing area (Red) */}
        <div
          className='h-3 bg-red-500 rounded-l-full'
          style={{ width: '50%' }}
        />
        {/* Winning area (Green) */}
        <div
          className='h-3 bg-green-500 rounded-r-full'
          style={{ width: '50%' }}
        />
      </div>

      {/* Sliding dice */}
      <div
        className='absolute top-[-20px] transition-all duration-700 ease-out'
        style={{
          left: `calc(${position}% - 20px)`, // Adjust dice position
        }}
      >
        <div className='w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-lg font-bold text-green-500'>
          {roll}
        </div>
      </div>

      {/* Scale numbers */}
      <div className='flex justify-between text-white text-sm mt-2'>
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  )
}

export default DiceLine
