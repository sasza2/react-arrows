import { useLayoutEffect, useState } from 'react'

import { nodeSafe } from '../helpers/node'

const useObserver = (props) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const observe = () => {
      const from = nodeSafe(props.from)
      const to = nodeSafe(props.to)
      if(from && to){
        setMounted(true)
        return true
      } else {
        setMounted(false)
      }
    }

    if (observe()) return

    const timer = setInterval(observe, 150)
    return () => clearInterval(timer)
  }, [mounted, props])

  return mounted
}

export default useObserver
