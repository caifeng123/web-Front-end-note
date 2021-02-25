import React,{Suspense} from 'react'
import {RecoilRoot,atom,useRecoilState,useRecoilValue} from 'recoil'

import {InputAtom,getInputLength,getStuInfo} from './MyAtom'

const TextInput = () => {
    const [input,setInput] = useRecoilState(InputAtom)
    return (
        <>
            <div>
                {input}
            </div>
            <input value={input} onChange= {e=>setInput(e.target.value)}/>
        </>
    )
}

const CountLength = () => {
    // const len = useRecoilValue(getInputLength)
    const [input,setInput] = useRecoilState(InputAtom)
    const ans = useRecoilValue(getStuInfo(input))
    
    return (<div>{JSON.stringify(ans)}</div>)
}


const App = () => {
    return (
        <RecoilRoot>
            <TextInput/>
            <Suspense fallback={<div>loading...</div>}>
                <CountLength/>
            </Suspense>
        </RecoilRoot>
    )
}

export default App
