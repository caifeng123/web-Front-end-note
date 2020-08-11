import React,{useContext} from 'react'

import {Moneycontext} from '../index'

const Sub = () => {
  const {money,setMoney} = useContext(Moneycontext)
  return (
    <div>
      sub-----{money}-----
      <button onClick={()=>setMoney(money=>money-1)}>---</button>
      sub-----{money}-----
    </div>
  )
}

export default Sub
