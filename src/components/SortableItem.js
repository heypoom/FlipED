import React from "react"
import {SortableContainer} from "react-anything-sortable"

const SortableItem = (props) => {
  return (
    <SortableContainer>
      <div>
        {props.children}
      </div>
    </SortableContainer>
  )
}

export default SortableItem
