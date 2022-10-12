import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CubeGrid from './components/CubeGrid'
import CubeGridContainer from './components/CubeGridContainer'

const CubeGridData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    return Array.from({ length: 7 }, (_, j) => {
      return { line: i, col: j }
    })
  })
}

interface HighlightProps {
  line: number;
  col: number;
}
const shouldHighlight = ({ line, col }: HighlightProps) => {
  return (col + 1 == 2 || col + 1 == 3) && (line + 1 == 3 || line + 1 == 4) || ((col + 1 == 5 || col + 1 == 6) && (line + 1 == 3 || line + 1 == 4))
}

const App = () => {
  return (
    <div className="App">
      <h1>LARC - OPEN</h1>
      <CubeGridContainer>
        {CubeGridData().map((cubeGrid) => (
          cubeGrid.map(cubeItem => {
            if (shouldHighlight(cubeItem)) {
              return <CubeGrid line={cubeItem.line + 1} col={cubeItem.col + 1} type="loadingZone" />
            }
            return <CubeGrid line={cubeItem.line + 1} col={cubeItem.col + 1} />
          })
        ))}
      </CubeGridContainer>
    </div>
  )
}

export default App
