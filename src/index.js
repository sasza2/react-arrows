import React, { useLayoutEffect, useRef } from 'react'
import arrowCreate, { DIRECTION } from 'arrows-svg'

const Arrow = (props) => {
  const arrowRef = useRef()

  useLayoutEffect(() => {
    const arrow = arrowCreate(props)
    if (arrowRef.current) arrowRef.current.appendChild(arrow.node)

    return () => {
      clearInterval(arrow.timer)
      if (arrowRef.current) arrowRef.current.removeChild(arrow.node)
    }
  }, [props])

  return (
    <span ref={arrowRef} />
  )
}

export default Arrow
export { DIRECTION }
