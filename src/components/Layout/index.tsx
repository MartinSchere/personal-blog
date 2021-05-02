import * as React from "react"
import { Link } from "gatsby"

import "./styles.scss"
import Sharebutton from "../Sharebutton"

type LayoutProps = {
  location: {
    pathname: string
  }
  title: string
  children: React.ReactNode
}

const Layout = ({ location, title, children }: LayoutProps) => {
  // @ts-ignore: Variable not found
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header: React.ReactElement

  if (isRootPath) {
    header = (
      <h5 className="main-heading">
        <Link to="/">{title}</Link>
      </h5>
    )
  } else {
    header = (
      <h5 className="main-heading">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </h5>
    )
  }

  return (
    <div className="container" data-is-root-path={isRootPath}>
      <header className="global-header">
        <Sharebutton linkTo="twitter" />
        {header}
        <Sharebutton linkTo="share" />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
