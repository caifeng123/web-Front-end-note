import React from 'react'
import { useRecoilState } from 'recoil'
import {getItemState} from '../store'

const Index = ({id}) => {
  const [position,setPostion] = useRecoilState(getItemState(id))
  const [x,y] = position
  const dargEnd = (e) => {
    const {clientX,clientY} = e
    setPostion([clientX,clientY])
  }
  return (
    <div style={{width:60,height:60,background:'#ccc',position:'absolute',left: x,top: y}} 
      draggable='true'
      onDragEnd={(e)=>dargEnd(e)}
    >
      111
    </div>
  )
}

export default Index
