import React from 'react'
import {useSetRecoilState,useRecoilValue} from 'recoil'
import {userItemLists,ItemLists} from '../stores/ItemList'
import {widgets} from '../stores/widgets'
import Item from './item'

const ItemList = () => {
    const lists = useRecoilValue(ItemLists())
    const setState =  useSetRecoilState(userItemLists)
    const setwidgets = useSetRecoilState(widgets)
    const getRandom = () => ({
        name:(Math.random()*100)|0 +'',
        age:(Math.random()*100)|0,
        x:`${(Math.random()*100)|0}%`,
        y:`${(Math.random()*100)|0}%`
    })
    const click = (item) => {
        setwidgets(widgets=>[...widgets,item])
    }
    return (
        <div style={{flex:1,background:'#ccc',textAlign:'center'}}>
            <button onClick={()=>setState(itemlists=>[...itemlists,getRandom()])}>add</button>
            {lists.map(x=>(<Item item={x} click={click}></Item>))}
        </div>
    )
}

export default ItemList
