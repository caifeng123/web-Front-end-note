import React from 'react'

const Item = ({item,click}) => {
    return (
        <div style={{height:30}} onClick={()=>{click(item)}}>
            {item.name}---{item.age}
        </div>
    )
}

export default Item
 
