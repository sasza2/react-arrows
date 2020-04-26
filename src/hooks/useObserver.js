import { useLayoutEffect, useState } from 'react'

import { nodeSafe } from '../helpers/node'

const useObserver = ({ from, to }) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const observe = () => {
      if(nodeSafe(from) && nodeSafe(to)){
        setMounted(true)
        return true
      }
    }

    if (observe()) return

    const timer = setInterval(observe, 150)
    return () => clearInterval(timer)
  }, [mounted, from, to])

  return mounted
}

export default useObserver
