import React, { useEffect, useState } from 'react'
import { select, number, withKnobs } from "@storybook/addon-knobs";

import Arrow, { DIRECTION } from '.'

const HEADS = [
  'diamond',
  'dot',
  'inv',
  'none',
  'normal',
  'thin',
  'vee',
]

const head = () => select('head', HEADS, HEADS[0])

const ArrowStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
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
  `}} />
)

export default {
  title: 'Arrows',
  decorators: [withKnobs],
};

export const HelloWorld = () => {
  const fromTranslationX = number('from-translation-x', 1)
  const fromTranslationY = number('from-translation-y', -1.5)
  const fromDirection = select('from-direction', Object.values(DIRECTION), DIRECTION.TOP)
  const toTranslationX = number('to-translation-x', -0.5)
  const toTranslationY = number('to-translation-y', 1)
  const toDirection = select('to-direction', Object.values(DIRECTION), DIRECTION.LEFT)

  return (
    <div>
      <ArrowStyles />
      <style dangerouslySetInnerHTML={{ __html: `
        #from,
        #to {
          position: absolute;
          color: white;
        }
        #from {
          top: 50px;
          left: 100px;
          width: 200px;
          height: 150px;
          background-color: green;
        }
        #from {
          top: 50px;
          left: 100px;
          width: 200px;
          height: 150px;
          background-color: green;
        }
        #to {
          top: 100px;
          left: 400px;
          width: 50px;
          height: 100px;
          background-color: blue;
        }
      `}} />
      <div id="from">hello</div>
      <div id="to">world</div>
      <Arrow
        className='arrow'
        from={{
          direction: fromDirection,
          node: () => document.getElementById('from'),
          translation: [fromTranslationX, fromTranslationY],
        }}
        to={{
          direction: toDirection,
          node: () => document.getElementById('to'),
          translation: [toTranslationX, toTranslationY],
        }}
        head={head()}
      />
    </div>
  )
}

export const Heads = () => {
  return (
    <div>
      <ArrowStyles />
      <style dangerouslySetInnerHTML={{ __html: `
        #from, #to {
          position: absolute;
          width: 5px;
          height: 5px;
          font-size: 0px;
          background-color: red;
        }
        #to {
          width: 150px;
          height: 150px;
          background-color: white;
          border: 2px solid violet;
        }
        textarea {
          width: 400px;
          height: 400px;
        }
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
        th, td {
          border: 1px solid #ddd;
          font-size: 10px;
        }
        th {
          position: relative;
          width: 50px;
        }
        th .point-to {
          position: absolute;
          left: 50%;
          top: 20px;
        }
        .arrow td {
          position: relative;
          height: 100px;
          vertical-align: bottom;
        }
        .arrow td .point-from {
          position: absolute;
          left: 50%;
        }
      `}} />
      <table>
        <thead>
          <tr>
            {
              HEADS.map(head => (
                <th key={head}>
                  {head}
                  <span className={`point-to point-to-${head}`}></span>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <tr className="arrow">
            {
              HEADS.map(head => (
                <td key={head}>
                  <span className={`point-from point-from-${head}`}></span>
                </td>
              ))
            }
          </tr>
        </tbody>
      </table>
      {
        HEADS.map(head => (
          <Arrow
            key={head}
            className='arrow'
            from={{
              direction: DIRECTION.BOTTOM,
              node: () => document.querySelectorAll(`.point-from-${head}`)[0],
              translation: [0, -1],
            }}
            to={{
              direction: DIRECTION.TOP,
              node: () => document.querySelectorAll(`.point-to-${head}`)[0],
              translation: [0, 1],
            }}
            head={head}
          />
        ))
      }
    </div>
  )
}

export const Interval = () => {
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)

  useEffect(() => {
    const randCoordinate = () => parseInt(Math.random() * 400 + 100)
    const randCoordinates = () => ({
      left: randCoordinate(),
      top: randCoordinate(),
    })

    const translation = function(){
      const once = () => Math.random() * 2 - 1
      return [once(), once()]
    }

    const arrowProps = () => ({
      style: randCoordinates(),
      translation: translation(),
    })

    const timer = setInterval(() => {
      setFrom(arrowProps())
      setTo(arrowProps())
    }, 500)

    return () => clearInterval(timer)
  }, [])

  if (!from || !to) return null

  return (
    <div>
      <ArrowStyles />
      <style dangerouslySetInnerHTML={{ __html: `
        #from, #to {
          position: absolute;
          width: 5px;
          height: 5px;
          font-size: 0px;
          background-color: red;
        }
      `}} />
      <div id='from' style={from.style} />
      <div id='to' style={to.style} />
      <Arrow
        className='arrow'
        from={{
          direction: DIRECTION.BOTTOM,
          node: () => document.getElementById('from'),
          translation: from.translation,
        }}
        to={{
          direction: DIRECTION.TOP,
          node: () => document.getElementById('to'),
          translation: to.translation,
        }}
        head={head()}
      />
    </div>
  )
}
