import React from 'react'
import { useRecoilValue } from 'recoil'
import {widgets} from '../stores/widgets'
import Widget from './Widget'

const MoveCarve = () => {
    const showWidgets = useRecoilValue(widgets)
    return (
        <div style={{flex:2,position:'relative'}}>
            {
            showWidgets.map(item=>(
                <Widget item={item}/>
            ))}
        </div>
    )
}

export default MoveCarve
