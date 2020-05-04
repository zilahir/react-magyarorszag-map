import React, { useState } from 'react'

import { MapOfHungary } from 'react-magyarorszag-map'
import 'react-magyarorszag-map/dist/index.css'

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
  <MapOfHungary
      onClick={selected => handleClick(selected)}
      selected={active}
      activeFill="#ff0000"
    />
  )
}

export default App
