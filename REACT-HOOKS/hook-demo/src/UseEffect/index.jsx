import React,{useEffect,useState} from 'react'

const UseEffect = () => {
  const [height,setHeight] = useState(0)
  const [num,setNum] = useState(0)

  //初始化
  // useEffect(()=>{
  //   alert('componentDidmounted')
  // },[])

  //update
  useEffect(()=>{
    setHeight(num*10)
  },[num])
  return (
    <div>
      <button onClick={()=>setNum(num=>num+1)}>+</button>
      <button onClick={()=>setNum(num=>num-1)}>-</button>
      <div style={{background:'red',width:'100px',height}}></div>
    </div>
  )
}

export default UseEffect
