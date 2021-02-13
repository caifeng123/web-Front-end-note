import React from 'react'

const Widgets = ({item}) => {
    const { x,y,name,age} = item
    return (
        <div style={{position:'absolute',left: x,top: y,width: 60,height: 60,fontSize:14}}>
            {name}---{age}
        </div>
    )
}

export default Widgets
