import React,{createContext,useState} from 'react'

import Main from './main'

export const Moneycontext = createContext()

const Usecontext = () => {
  const [money,setMoney] = useState(0)
  
  return (
    <>
      usecontent-----{money}-----
      <Moneycontext.Provider value={{setMoney,money}}>
        <Main/>
      </Moneycontext.Provider>
      usecontent-----{money}-----
    </>
  )
}

export default Usecontext
