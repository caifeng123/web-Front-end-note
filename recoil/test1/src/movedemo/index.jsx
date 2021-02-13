import React,{Suspense} from 'react'
import {RecoilRoot} from 'recoil'
import ItemList from './components/ItemList'
import MoveCarve from './components/MoveCarve'
import Property from './components/Property'

const MoveDemo = () => {
    return (
        <RecoilRoot>
            <Suspense fallback={<div>loading....</div>}>
                <div style={{display:'flex',flexDirection:'row',height:'100vh'}}>
                    <ItemList/>
                    <MoveCarve/>
                    <Property/>
                </div>
            </Suspense>
        </RecoilRoot>
    )
}

export default MoveDemo
