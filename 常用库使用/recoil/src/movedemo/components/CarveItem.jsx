import React from 'react'
import { DiffComponent } from "../config/components";

const CarveItem = ({atoms,dragEnd}) => {
  return (
    <div>
      {atoms.map((atom) => DiffComponent(atom,dragEnd))}
    </div>
  )
}

export default CarveItem
