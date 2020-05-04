import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { getJson } from './utils/fetchJson'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps'

export const MapOfHungary = (props) => {
  const { config, getBackValue } = props
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

  useEffect(() => {
    if (getBackValue) {
      getBackValue(active)
    }
  }, [active])

  return (
    <div
      className={`${
        config && config.containerClassName
          ? config.containerClassName
          : styles.rootContainer
      }`}
    >
      <ComposableMap
        projectionConfig={{ scale: 7000, rotate: [-30, 0] }}
        projection='geoAlbers'
      >
        <ZoomableGroup center={[19.5058, 47.7612]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  fill={active.includes(index) ? '#000' : '#fff'}
                  key={geo.rsmKey}
                  geography={geo}
                  strokeWidth={0.5}
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
