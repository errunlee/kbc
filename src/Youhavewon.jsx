

import React from 'react'
import './Youhavewon.css'
import data from './prizes.json'
const Youhavewon = ({rightAnswered}) => {
    const prizeamount=rightAnswered<1?0:data.prizes[9-rightAnswered+1]
  return (
    <div className='text-white flex justify-center  flex-col items-center my-4'>
        <h1 className='text-3xl'>Congratulations you have won <span className="amount">Rs. {prizeamount}</span></h1>
        <button className=" bg-blue-500 rounded p-2" onClick={() => window.location.reload(false)}>Play Again</button>
    </div>
  )
}

export default Youhavewon