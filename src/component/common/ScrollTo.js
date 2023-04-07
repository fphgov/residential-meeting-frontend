import React, { useEffect } from "react"

export default function ScrollTo(props) {
  useEffect(() => {
    window.scrollTo({
      top: props.element,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    props.children ? props.children : null
  )
}
