import {atom,selector,selectorFamily} from 'recoil'
export const InputAtom = atom({
    key:'inputatom',
    default:''
})
export const TimeAtom = atom({
    key:'timeatom',
    default:2
})

const timeout = second => new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(second+'00'),second*1000)
})

const getInfo = id => {
    const stus = {
        0:'haha',
        1:'xixi',
        2:'kk'
    }
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(stus[id]||'null!!!'),1000)
    })
}

export const getStuInfo = selectorFamily({
    key:'getStuInfo',
    get:id=>async ()=>{
        const name = await getInfo(id)
        return {name} 
    }
})

export const getInputLength = selector({
    key:'getInputLength',
    get:async ({get})=>{
        const inputtext = get(InputAtom)
        const time = await timeout(get(TimeAtom))
        // return inputtext.length+'+++'+time
        throw new Error('123')
    }
})