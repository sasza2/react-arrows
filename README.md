# react-arrows
React library for creating SVG arrow between two HTML elements. Positions of elements are observed, so when they change arrow will re-render. Library is react implementation of [arrows-svg](https://www.npmjs.com/package/arrows-svg)

!["Arrow"](docs/arrow-1.png?raw=true "Arrow example")

https://codesandbox.io/s/stoic-perlman-6php9

# Installation

```sh
npm install react-arrows
```

Too see more check [arrows-svg](https://www.npmjs.com/package/arrows-svg)<br />

## CSS styles
Styles should be added to make arrow visible. Feel free to change them.

```css
.arrow {
  pointer-events: none;
}

.arrow__path {
  stroke: #000;
  fill: transparent;
  stroke-dasharray: 4 2;
}

.arrow__head line {
  stroke: #000;
  stroke-width: 1px;
}
```

# How to use it

```js
import Arrow, { DIRECTION } from 'react-arrows'

<Arrow
  className='arrow'
  from={{
    direction: DIRECTION.TOP,
    node: () => document.getElementById('from'),
    translation: [-0.5, -1],
  }}
  to={{
    direction: DIRECTION.RIGHT,
    node: () => document.getElementById('to'),
    translation: [0.9, 1],
  }}
  onChange={...}
/>
```

# Building
```sh
npm run build
```

# Storybook
```sh
npm run storybook
```
