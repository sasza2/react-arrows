import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

import useArrow from './hooks/useArrow'

const Arrow = ({
  className, head, from, to,
}) => {
  const arrowRef = useRef()
  useArrow(arrowRef, { className, head, from, to })

  return (
    <span ref={arrowRef} />
  )
}

Arrow.propTypes = {
  className: PropTypes.string,
  head: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      func: PropTypes.string,
      duration: PropTypes.number,
    }),
  ]),
  from: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    node: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]).isRequired,
    translation: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  to: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    node: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]).isRequired,
    translation: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
}

export default memo(Arrow)
export { DIRECTION, HEAD } from 'arrows-svg'
