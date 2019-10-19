import isFunction from 'lodash/isFunction'

const nodeValue = (node) => (isFunction(node)
  ? node()
  : node
)

export const nodeSafe = (point = {}) => nodeValue(point.node)
