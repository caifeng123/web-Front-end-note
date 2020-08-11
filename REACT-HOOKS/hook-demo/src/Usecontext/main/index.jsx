import React,{useContext} from 'react'

import Add from '../add'
import Sub from '../sub'

import {Moneycontext} from '../index'

const Main = () => {
  const {money} = useContext(Moneycontext)
  return (
    <div>
      main-----{money}-----
      <Add/>
      <Sub/>
      main-----{money}-----
    </div>
  )
}

export default Main
