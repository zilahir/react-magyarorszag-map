import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import mapOfHunData from './utils/hu.json'
import { getJson } from './utils/fetchJson'

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
  const geoUrl =
    'https://raw.githubusercontent.com/zilahir/react-magyarorszag-map/master/src/utils/hu.json'
  const [active, setActive] = useState([])
  const [rawData, setRawData] = useState(null)
  useEffect(() => {
    const fetchedRaw = getJson(geoUrl)
    fetchedRaw.then((res) => {
      console.debug('res', res)
      setRawData(res)
    })
  }, [])
  function selectCounty(index) {
    console.debug('index', rawData.objects.rawData.geometries[index].properties)
    if (!active.includes(index)) {
      setActive([...active, index])
    } else {
      const filtered = active.filter((i) => i !== index)
      setActive(filtered)
    }
  }

  return (
    <div
      className={`${
        config && config.containerClassName
          ? config.containerClassName
          : styles.rootContainer
      }`}
    >
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
