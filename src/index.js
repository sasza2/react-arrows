import React, { useEffect, useRef } from 'react'
import arrowCreate, { DIRECTION } from 'arrows-svg'

const Arrow = (props) => {
  const arrow = useRef()

  useEffect(() => () => {
    if (arrow.current) clearInterval(arrow.current.timer)
  }, [])

  const init = (node) => {
    arrow.current = arrowCreate(props)
    node.appendChild(arrow.current.node)
  }

  return (
    <span ref={init} />
  )
}

export default Arrow
export { DIRECTION }
