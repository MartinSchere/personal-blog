import React from "react"
import "./styles.scss"

type FooterProps = {}

const Footer = (props: FooterProps) => {
  return (
    <footer>
      <h3>Subscribe to my newsletter</h3>
      <form name="newsletter" method="POST" data-netlify="true">
        <input
          type="email"
          placeholder="Your email address..."
          name="email"
          id="email"
        />
        <button type="submit">Subscribe</button>
        <p className="lead">
          You’ll recieve weekly emails with relevant articles, reading
          recommendations and more.
        </p>
      </form>
    </footer>
  )
}

export default Footer
