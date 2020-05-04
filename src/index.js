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
  const { config, onClick, selected } = props
  const geoUrl =
    'https://raw.githubusercontent.com/zilahir/react-magyarorszag-map/master/src/utils/hu.json'
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
    if (onClick) {
      onClick(index)
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
      <ComposableMap
        projectionConfig={{ scale: 7000, rotate: [-30, 0] }}
        projection='geoAlbers'
      >
        <ZoomableGroup center={[19.5058, 47.7612]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  fill={selected.includes(index) ? '#000' : '#fff'}
                  key={geo.rsmKey}
                  geography={geo}
                  strokeWidth={0.5}
                  stroke={selected.includes(index) ? '#fff' : '#000'}
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
