import React, { useState } from 'react'
import styles from './styles.module.css'
import mapOfHunData from './utils/hu.json'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const MapOfHungary = (props) => {
  const { config } = props
  const [active, setActive] = useState([])
  function selectCounty(index) {
    console.debug(
      'index',
      geoUrl.objects.egybefuzve.geometries[index].properties
    )
    if (!active.includes(index)) {
      setActive([...active, index])
    } else {
      const filtered = active.filter((i) => i !== index)
      setActive(filtered)
    }
  }

  const geoUrl =
    'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

  return (
    <div>
      <ComposableMap projectionConfig={{ scale: 7000 }}>
        <ZoomableGroup center={[19.5058, 47.7612]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  fill={active.includes(index) ? '#000' : '#fff'}
                  key={geo.rsmKey}
                  geography={geo}
                  strokeWidth={2}
                  stroke={active.includes(index) ? '#fff' : '#000'}
                  onClick={() => selectCounty(index)}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
