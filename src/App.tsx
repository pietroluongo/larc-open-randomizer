import { useState } from 'react'
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

interface CubeProps {
  line: number;
  col: number;
  type?: "loadingZone" | "dropZone" | "none";
  value?: string;
}

// Sorteia 12 cubos:
// 4 são de cores [Verde, Azul, Vermelho, Amarelo]
// 4 são de letras (a..i)
// 4 são de QR Code (1..9)


const sortLetters = (): string[] => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const shuffled = letters.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
}

const sortQrCodes = (): number[] => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const shuffled = numbers.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
}

interface LettersWithPosition {
  letter: string;
  coords: CompleteCoordinates;
}

interface QRWithPosition {
  code: number;
  coords: CompleteCoordinates;
}

type CubeColor = "green" | "blue" | "red" | "yellow"

interface ColorWithPosition {
  color: CubeColor;
  coords: CompleteCoordinates;
}

interface CompleteCoordinates {
  x: number;
  y: number;
  subX: number;
  subY: number;
}

const sortLetterPositions = (usedPositions: CompleteCoordinates[]): LettersWithPosition[] => {
  const letters = sortLetters()

  return letters.map(letter => {
    const generateCoordinate = (): CompleteCoordinates => {
      const positionX = Math.floor(Math.random() * (4 - 3 + 1) + 3)
      const positionY = Math.floor(Math.random() * (4 - 2 + 1) + 2)
      const subX = Math.floor(Math.random() * (1 - 0 + 1) + 0)
      const subY = Math.floor(Math.random() * (1 - 0 + 1) + 0)
      return { x: positionX, y: positionY, subX, subY }
    }

    while (true) {
      const coordinate = generateCoordinate()
      if (!usedPositions.find(pos => pos.x === coordinate.x && pos.y === coordinate.y && pos.subX === coordinate.subX && pos.subY === coordinate.subY)) {
        usedPositions.push(coordinate)
        return { letter, coords: coordinate }
      }
    }
  })
}

const sortQrPosition = (usedPositions: CompleteCoordinates[]): QRWithPosition[] => {
  const qrs = sortQrCodes()

  return qrs.map(qr => {
    const generateCoordinate = (): CompleteCoordinates => {
      const positionX = Math.floor(Math.random() * (4 - 3 + 1) + 3)
      const positionY = Math.floor(Math.random() * (4 - 2 + 1) + 2)
      const subX = Math.floor(Math.random() * (1 - 0 + 1) + 0)
      const subY = Math.floor(Math.random() * (1 - 0 + 1) + 0)
      return { x: positionX, y: positionY, subX, subY }
    }

    while (true) {
      const coordinate = generateCoordinate()
      if (!usedPositions.find(pos => pos.x === coordinate.x && pos.y === coordinate.y && pos.subX === coordinate.subX && pos.subY === coordinate.subY)) {
        usedPositions.push(coordinate)
        return { code: qr, coords: coordinate }
      }
    }
  })
}


const sortColoredCubes = (usedPositions: CompleteCoordinates[]): ColorWithPosition[] => {
  const colors: CubeColor[] = ["green", "blue", "red", "yellow"]

  return colors.map(color => {
    const generateCoordinate = (): CompleteCoordinates => {
      const positionX = Math.floor(Math.random() * (4 - 3 + 1) + 3)
      const positionY = Math.floor(Math.random() * (4 - 2 + 1) + 2)
      const subX = Math.floor(Math.random() * (1 - 0 + 1) + 0)
      const subY = Math.floor(Math.random() * (1 - 0 + 1) + 0)
      return { x: positionX, y: positionY, subX, subY }
    }

    while (true) {
      const coordinate = generateCoordinate()
      if (!usedPositions.find(pos => pos.x === coordinate.x && pos.y === coordinate.y && pos.subX === coordinate.subX && pos.subY === coordinate.subY)) {
        usedPositions.push(coordinate)
        return { color, coords: coordinate }
      }
    }
  })
}

const sortBlocksPositions = () => {
  let usedCoords: CompleteCoordinates[] = []

  const letters = sortLetterPositions(usedCoords)
  const qrs = sortQrPosition(usedCoords)
  const colors = sortColoredCubes(usedCoords)
  return [...letters, ...qrs, ...colors]

}

const App = () => {
  return (
    <div className="App">
      <div className="m-10">
        <h1>LARC - OPEN</h1>
      </div>
      <CubeGridContainer>
        {CubeGridData().map((cubeGrid) => (
          cubeGrid.map(cubeItem => {
            if (shouldHighlight(cubeItem)) {
              return <CubeGrid line={cubeItem.line} col={cubeItem.col} type="loadingZone" />
            }
            return <CubeGrid line={cubeItem.line} col={cubeItem.col} />
          })
        ))}
      </CubeGridContainer>
      <div className="m-10">
        <button onClick={() => console.log(sortBlocksPositions())}>Randomize</button>
      </div>

    </div>
  )
}

export default App
