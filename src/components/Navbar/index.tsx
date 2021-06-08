import React, { useEffect, useState } from "react"
import "./styles.scss"
import { Link } from "gatsby"

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
        <Link to="/">
          <h5>{props.title}</h5>
        </Link>
      </nav>
      <div className="navbar-replacement"></div>
    </>
  )
}

export default Navbar
