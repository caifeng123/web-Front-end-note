import React from 'react'
import {atom} from 'recoil'

const allState = {
  'name': atom({
    key: 'name',
    default: [0,0]
  })
}

export const getItemState = (id) => {
  if(!allState[id]){
    allState[id] = atom({
      key: id,
      default: [0,0]
    })
  }
  return allState[id]
}

export const getAllItemId = () => Object.keys(allState)