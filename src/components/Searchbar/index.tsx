import React from "react"
import "./styles.scss"

import { FaSearch } from "react-icons/fa"

type SearchbarProps = {
  className?: string
}

const Searchbar = (props: SearchbarProps) => {
  return (
    <div className={props.className || "" + "searchbar"}>
      <FaSearch size={10} color={"4C5350"} />
      <input type="text" name="search" id="" placeholder="search..." />
    </div>
  )
}

export default Searchbar
