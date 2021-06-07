import { useState, useEffect } from "react"

let defaultHeight
let defaultWidth

if (typeof window !== `undefined`) {
  defaultHeight = window.innerHeight
  defaultWidth = window.innerWidth
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: defaultWidth,
    height: defaultHeight,
  })

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: defaultWidth,
        height: defaultHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}
