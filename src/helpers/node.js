const nodeValue = (node) => (typeof node === 'function'
  ? node()
  : node
)

export const nodeSafe = (point = {}) => nodeValue(point.node)
