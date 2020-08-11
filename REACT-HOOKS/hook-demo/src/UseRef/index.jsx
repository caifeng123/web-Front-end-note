import React,{useRef,useState} from 'react'

const UseRef = () => {
  const myref = useRef()
  const numref = useRef(0)

  const [num,setNum] = useState(0)
  
  const change = () =>{
    // console.log(myref)

    //操作dom节点
    myref.current.innerText=22
  }
  return (
    <>
      <div ref={myref}>111</div>
      <button onClick={()=>change()}>change</button>
      <br/>
      -------------------------
      <br/>
      <div>刷新次数{numref.current++}</div>
      <button onClick={()=>numref.current++}>+</button>
      <div>{num}</div>
      <button onClick={()=>setNum(num=>num+1)}>+</button>
    </>
  )
}

export default UseRef
