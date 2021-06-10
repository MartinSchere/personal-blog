import React, { useState, useEffect, ChangeEvent } from "react"
import "./styles.scss"

import { FaSearch } from "react-icons/fa"

type SearchbarProps = {
  className?: string
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onSubmit?: () => void
  showButton?: boolean
  currentRefinement?: any
}

const Searchbar = ({
  className,
  onChange = () => {},
  onFocus = () => {},
  onSubmit = () => {},
  showButton = false,
  value,
}: SearchbarProps) => {
  const [focused, setFocused] = useState(false)

  const _handleKeyPress = (e: KeyboardEvent) => {
    if (e.which === 13 && focused && showButton) {
      onSubmit()
    }
  }

  const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  useEffect(() => {
    if (focused && showButton) {
      document.addEventListener("keypress", _handleKeyPress)
    }
    return () => document.removeEventListener("keypress", _handleKeyPress)
  }, [focused, setFocused])

  return (
    <div className={className || "" + "searchbar"}>
      {showButton ? (
        <button className="search-button" onClick={onSubmit}>
          <FaSearch size={10} color={"4C5350"} />
        </button>
      ) : (
        <FaSearch size={10} color={"4C5350"} />
      )}
      <input
        type="text"
        name="query"
        id=""
        placeholder="search..."
        onChange={_handleChange}
        onFocus={() => {
          onFocus()
          setFocused(true)
        }}
        value={value}
      />
      {showButton && value && (
        <span className="helper">
          Press <code>enter</code> to search
        </span>
      )}
    </div>
  )
}

export default Searchbar
