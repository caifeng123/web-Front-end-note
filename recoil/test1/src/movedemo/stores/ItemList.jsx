import {atom, atomFamily, selector, selectorFamily, useRecoilValue} from 'recoil'

const getDatas = name => {
    let datas = [{
        name:'cc',
        age:11,
        x:`${(Math.random()*100)|0}%`,
        y:`${(Math.random()*100)|0}%`
    },{
        name:'mm',
        age:22,
        x:`${(Math.random()*100)|0}%`,
        y:`${(Math.random()*100)|0}%`
    },{
        name:'ll',
        age:33,
        x:`${(Math.random()*100)|0}%`,
        y:`${(Math.random()*100)|0}%`
    }]
    let res = name==undefined?datas:datas.filter(x=>name==x.name)
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(res)
        },0)
    })
}
export const userItemLists = atom({
    key: 'userItemLists',
    default: []
})

export const ItemLists = atomFamily({
    key: 'ItemLists',
    default: selectorFamily({
        key:'ItemLists/default',
        get:name=>async({get})=>{
            const data1 = get(userItemLists)
            const data = await getDatas(name)
            return [...data,...data1]
        }
    })
})

