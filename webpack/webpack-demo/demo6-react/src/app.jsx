import React,{useState} from 'react'

import './index.css'
const app = () =>{
  const [num,setNum] = useState(0)
  return (
    <div>
      <h1>haha</h1>
      <p>就这？{num}</p>
      <button onClick={()=>setNum(x=>x+1)}>aa</button>
    </div>
  )
}

export default app