import { useLayoutEffect } from 'react'
import arrowCreate from 'arrows-svg'

import { nodeSafe } from '../helpers/node'
import useObserver from './useObserver'

const useArrow = (arrowRef, { className, head, from, to }) => {
  const mounted = useObserver({ className, head, from, to })

  useLayoutEffect(() => {
    if (!mounted) return
    
    let arrow
    try {
      arrow = arrowCreate({
        className,
        head,
        from: {
          ...from,
          node: nodeSafe(from),
        },
        to: {
          ...to,
          node: nodeSafe(to),
        }
      })
    } catch(e){
      console.warn(e);
      return;
    }

    arrowRef.current.appendChild(arrow.node)

    return () => {
      arrow.clear()
      arrowRef.current.removeChild(arrow.node)
    }
  }, [mounted, className, head, from, to])
}

export default useArrow
