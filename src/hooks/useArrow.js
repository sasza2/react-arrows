import { useLayoutEffect } from 'react'
import arrowCreate from 'arrows-svg'

import { nodeSafe } from '../helpers/node'
import useObserver from './useObserver'

const useArrow = (arrowRef, { className, head, from, to, onChange }) => {
  const mounted = useObserver({ from, to })

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
        },
        onChange,
      })
    } catch(e){
      console.warn(e);
      return;
    }

    arrowRef.current.appendChild(arrow.node)

    return arrow.clear
  }, [mounted, className, head, from, to, onChange])
}

export default useArrow
