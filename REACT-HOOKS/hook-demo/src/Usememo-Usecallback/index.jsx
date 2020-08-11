import React,{useState,useMemo,useCallback} from 'react'

const Usememo = () => {
  const [string,setString] = useState('')
  // const sum = () =>{
  //   console.log('-')
  //   let sum = 0
  //   for(let i = 0;i<100;i++){
  //     sum+=i
  //   }
  //   return sum
  // }
  const sum = useMemo(() =>{
    console.log('-')
    let sum = 0
    for(let i = 0;i<100;i++){
      sum+=i
    }
    return sum
  },[])

  const back = useCallback(()=>()=>{
   console.log(1) 
  })
  return (
    <div>
      {/* <Child/> */}
      {string}
      {/* <button onClick={()=>setString(string=>string+sum()) }>biu</button> */}
      <button onClick={()=>setString(string=>string+sum) }>biu</button>
    </div>
  )
}

export default Usememo