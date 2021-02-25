import { atom, atomFamily } from "recoil";

export const userId = atomFamily({
    key: 'userId',
    default: async userId => await getUserInfo(userId)
})

const getUserInfo = userId => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(userId)
    },100)
})