

import React, { useEffect, useState } from 'react'
import Logo from './assets/logo.png'
import './Banner.css'
import data from './prizes.json'
function Banner({rightAnswered,timer}) {
  const [wonMoney,setWonMoney]=useState(9)

  
 
  return (
    <div className='flex justify-around text-white items-center mt-9'>
      <div></div>
      <div className="timer border-2 rounded-full flex justify-center items-center  ">
        <div className="loader border-8 border-orange-500 rounded-full flex justify-center items-center ">
          <p className='text-white text-8xl m-0'>{timer}</p>
        </div>
      </div>
      <div className="logo">
      <img src={Logo}/>
      </div>
        <div className="money-won">
          <ul className='flex flex-col '>
            {
              data.prizes.map((prize,i)=>{
                let active=false;
                if(i===9-rightAnswered){
                  active=true;
                }
                return <div className={`w-[150px] px-3 text-lg mb-1 mr-3 ${active?'active-amt':''}` } key={i}><li >{prize}</li></div>
              })
            }
          </ul>
        </div>
        <div></div>
    </div>
  )
}

export default Banner   