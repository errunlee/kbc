

import React from 'react'
import './Youhavewon.css'
import data from './prizes.json'
const Youhavewon = ({rightAnswered}) => {
    const prizeamount=rightAnswered<1?0:data.prizes[9-rightAnswered+1]
  return (
    <div className='text-white flex justify-center  flex-col items-center my-4'>
        <h1 className='text-3xl'>Congratulations you have won <span className="amount">Rs. {prizeamount}</span></h1>
        <button className="rounded p-2 my-9" onClick={() => window.location.reload(false)}>
          
        <img  title='Play Again' className='replays' width="100" height="100" src="https://img.icons8.com/dusk/64/replay.png" alt="replay"/>

        </button>
    </div>
  )
}

export default Youhavewon