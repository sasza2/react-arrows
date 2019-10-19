import React, { memo, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import arrowCreate, { DIRECTION } from 'arrows-svg'

import { nodeSafe } from './helpers/node'
import useObserver from './hooks/useObserver'

const DIRECTION_VALUES = Object.values(DIRECTION)

const Arrow = ({ className, from, to }) => {
  const arrowRef = useRef()
  const mounted = useObserver({ from, to })

  useLayoutEffect(() => {
    if (!mounted) return
    
    let arrow
    try {
      arrow = arrowCreate({
        className,
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

    if (arrowRef.current) arrowRef.current.appendChild(arrow.node)

    return () => {
      clearInterval(arrow.timer)
      if (arrowRef.current) arrowRef.current.removeChild(arrow.node)
    }
  }, [className, from, mounted, to])

  return (
    <span ref={arrowRef} />
  )
}

Arrow.propTypes = {
  className: PropTypes.string,
  from: PropTypes.shape({
    direction: PropTypes.oneOf(DIRECTION_VALUES).isRequired,
    node: PropTypes.any.isRequired,
    translation: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  to: PropTypes.shape({
    direction: PropTypes.oneOf(DIRECTION_VALUES).isRequired,
    node: PropTypes.any.isRequired,
    translation: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
}

Arrow.defaultProps = {
  className: 'arrow',
}

export default memo(Arrow)
export { DIRECTION }
