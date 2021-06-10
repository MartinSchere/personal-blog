import React, { useEffect } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import Searchbar from "."

export default connectSearchBox(
  ({ refine, currentRefinement, onFocus, initialValue }) => {
    useEffect(() => {
      refine(initialValue)
    }, [])
    return (
      <form onSubmit={e => e.preventDefault()}>
        <Searchbar
          onChange={val => refine(val)}
          value={currentRefinement}
          onFocus={onFocus}
        />
      </form>
    )
  }
)
