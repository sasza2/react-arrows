import React, { useLayoutEffect, useRef, useState } from 'react'
import arrowCreate, { DIRECTION } from 'arrows-svg'

const useObserver = (props) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const observe = () => {
      const from = props.node.from()
      const to = props.node.to()
      if(from && to){
        setMounted(true)
        return true
      }
    }

    if (observe()) return

    const timer = setInterval(observe, 150)
    return () => clearInterval(timer)
  }, [props])

  return mounted
}

const Arrow = (props) => {
  const arrowRef = useRef()
  const mounted = useObserver(props)

  useLayoutEffect(() => {
    if (!mounted) return
    
    let arrow
    try {
      arrow = arrowCreate(props)
    } catch(e){
      console.warn(e);
      return;
    }
    if (arrowRef.current) arrowRef.current.appendChild(arrow.node)

    return () => {
      clearInterval(arrow.timer)
      if (arrowRef.current) arrowRef.current.removeChild(arrow.node)
    }
  }, [mounted, props])

  return (
    <span ref={arrowRef} />
  )
}

export default Arrow
export { DIRECTION }
