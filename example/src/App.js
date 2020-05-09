import React, { useState, Suspense, lazy } from 'react'
import { importMDX } from 'mdx.macro'

import { MapOfHungary } from 'react-magyarorszag-map'
import 'react-magyarorszag-map/dist/index.css'
import styles from './styles/main.module.scss'
import Loader from './components/common/Loader'

import huMapData from 'react-magyarorszag-map/src/utils/hu.json'

const Documentation = lazy(() => importMDX('../docs/doc.mdx'))

const App = () => {
  const [active, setActive] = useState([])
  function handleClick(index) {
    if (!active.includes(index)) {
      setActive([...active, index])
    } else {
      const filtered = active.filter((i) => i !== index)
      setActive(filtered)
    }
  }
  return (
    <div className={styles.mainContainer}>
      <div>
        <MapOfHungary
          onClick={selected => handleClick(selected)}
          selected={active}
          activeFill="#ff0000"
        />
        <div className={styles.console}>
          <p>
            {JSON.stringify(active)}
          </p>
        </div>
        <div className={styles.console}>
          <ul>
            {
              active.map(curr => (
                <li>
                  {
                    JSON.stringify(huMapData.objects.rawData.geometries[curr].properties)
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={styles.docContainer}>
        <Suspense fallback={<Loader />}>
          <Documentation />
        </Suspense>
      </div>
    </div>
  )
}

export default App
