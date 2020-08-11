import React,{useState} from 'react'

const Usestate = () => {
  const [num,setNum] = useState(0)
  const add = () =>{
    setNum(num+1)
  }
  const sub = () =>{
    setNum(num=>num-1)
  }
  return (
    <div>
      {num}
      <button onClick={()=>add()}>+</button>
      <button onClick={()=>sub()}>-</button>
    </div>
  )
}

export default Usestate
