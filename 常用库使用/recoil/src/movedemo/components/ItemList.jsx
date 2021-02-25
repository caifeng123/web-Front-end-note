import React from 'react'
import {useSetRecoilState,useRecoilValue, useRecoilState} from 'recoil'
import {userItemLists,ItemLists} from '../stores/ItemList'
// import {widgets} from '../stores/widgets'
import Item from './item'

const ItemList = () => {
    const lists = useRecoilValue(ItemLists())
    const setState =  useSetRecoilState(userItemLists)
    // const addWidget = item = useSetRecoilState(widgets)(widgetsList=>[...widgetsList,item])
    const getRandom = () => ({
        name:(Math.random()*100)|0 +'',
        age:(Math.random()*100)|0,
        x:`${(Math.random()*100)|0}%`,
        y:`${(Math.random()*100)|0}%`
    })
    return (
        <div style={{flex:1,background:'#ccc',textAlign:'center'}}>
            <button onClick={()=>setState(itemlists=>[...itemlists,getRandom()])}>add</button>
            {/* {lists.map(x=>(<Item item={x} click={}/>))} */}
            {lists.map(x=>(<Item item={x} />))}
        </div>
    )
}

export default ItemList
