import React, { memo, useLayoutEffect, useRef } from 'react'
import arrowCreate, { DIRECTION } from 'arrows-svg'

import { nodeSafe } from './helpers/node'
import useObserver from './hooks/useObserver'

const Arrow = (props) => {
  const arrowRef = useRef()
  const mounted = useObserver(props)

  useLayoutEffect(() => {
    if (!mounted) return
    
    let arrow
    try {
      arrow = arrowCreate({
        ...props,
        from: {
          ...props.from,
          node: nodeSafe(props.from),
        },
        to: {
          ...props.to,
          node: nodeSafe(props.to),
        }
      })
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

export default memo(Arrow)
export { DIRECTION }
