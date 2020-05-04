import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import { getJson } from './utils/fetchJson'

import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

export const MapOfHungary = (props) => {
  const { containerClassName, onClick, selected, stroke, scale } = props
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
    <div className={`${containerClassName || styles.rootContainer}`}>
      <ComposableMap
        projectionConfig={{
          scale,
          rotate: [-30, 0],
          center: [-10.5, 47.7612]
        }}
        projection='geoAlbers'
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo, index) => (
              <Geography
                fill={selected.includes(index) ? '#000' : '#fff'}
                key={geo.rsmKey}
                geography={geo}
                strokeWidth={stroke}
                stroke={selected.includes(index) ? '#fff' : '#000'}
                onClick={() => selectCounty(index)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

MapOfHungary.defaultProps = {
  containerClassName: null,
  onClick: null,
  selected: [],
  scale: 6000,
  stroke: 0.5
}

MapOfHungary.propTypes = {
  containerClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.any),
  scale: PropTypes.number.isRequired,
  stroke: PropTypes.number
}
