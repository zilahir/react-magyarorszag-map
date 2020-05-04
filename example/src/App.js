import React from 'react'

import { MapOfHungary } from 'react-magyarorszag-map'
import 'react-magyarorszag-map/dist/index.css'

const App = () => {
  return (
  <MapOfHungary
      getBackValue={selected => console.debug('selected', selected)}
      activeFill="#ff0000"
    />
  )
}

export default App
