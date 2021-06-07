import React, { useEffect, useState } from "react"
import "./styles.scss"

type NavbarProps = {
  className: string
  title: string
}

const Navbar = (props: NavbarProps) => {
  const [active, setActive] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    }, 100)
  }, [])
  return (
    <>
      <nav className={active ? "navbar active" : "navbar"}>
        <h5>{props.title}</h5>
      </nav>
      <div className="navbar-replacement"></div>
    </>
  )
}

export default Navbar
