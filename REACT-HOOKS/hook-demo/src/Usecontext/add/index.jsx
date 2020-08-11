import React,{useContext} from 'react'

import {Moneycontext} from '../index'

const Add = () => {
  const {money,setMoney} = useContext(Moneycontext)
  return (
    <div>
      add-----{money}-----
      <button onClick={()=>setMoney(money=>money+1)}>+++</button>
      add-----{money}-----
    </div>
  )
}

export default Add
