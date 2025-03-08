import React from 'react'

export default function Balance({ balance }) {
  return (
    <div className='mb-4'>
      <p className='font-bold'>💰 Balance: ${balance}</p>
    </div>
  )
}
