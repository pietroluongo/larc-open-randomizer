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

interface GenericBlock {
  coords: CompleteCoordinates;
}

interface LettersWithPosition extends GenericBlock {
  letter: string;
}

interface QRWithPosition extends GenericBlock {
  code: number;
}

export type CubeColor = "green" | "blue" | "red" | "yellow"

interface ColorWithPosition extends GenericBlock {
  color: CubeColor;
}

export interface CompleteCoordinates {
  x: number;
  y: number;
  subX: number;
  subY: number;
}

const sortLetterPositions = (usedPositions: CompleteCoordinates[]): LettersWithPosition[] => {
  const letters = sortLetters()

  return letters.map(letter => {
    const generateCoordinate = (): CompleteCoordinates => {
      const positionX = Math.floor(Math.random() * (2 - 1 + 1) + 2)
      const positionY1 = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      const positionY2 = Math.floor(Math.random() * (5 - 4 + 1) + 4)
      const positionY = Math.random() > 0.5 ? positionY1 : positionY2
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
      const positionX = Math.floor(Math.random() * (2 - 1 + 1) + 2)
      const positionY1 = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      const positionY2 = Math.floor(Math.random() * (5 - 4 + 1) + 4)
      const positionY = Math.random() > 0.5 ? positionY1 : positionY2

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
      const positionX = Math.floor(Math.random() * (2 - 1 + 1) + 2)
      // generate random number between 1 and 2
      const positionY1 = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      const positionY2 = Math.floor(Math.random() * (5 - 4 + 1) + 4)
      const positionY = Math.random() > 0.5 ? positionY1 : positionY2
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

const stuff = () => {
  const a = CubeGridData()
  const sortedBlocks = sortBlocksPositions()

  return a.map((line, i) => {
    return line.map((col, j) => {
      const blocks: GenericBlock[] = sortedBlocks.filter(block => block.coords.x === i && block.coords.y === j)
      if (blocks.length > 0) {
        const isLetterBlock = (block: GenericBlock): block is LettersWithPosition => {
          return (block as LettersWithPosition).letter !== undefined
        }

        const isQrBlock = (block: GenericBlock): block is QRWithPosition => {
          return (block as QRWithPosition).code !== undefined
        }

        const isColorBlock = (block: GenericBlock): block is ColorWithPosition => {
          return (block as ColorWithPosition).color !== undefined
        }

        const mappedBlocks = blocks.map(block => {
          if (isLetterBlock(block)) {
            return { value: block.letter, coords: { ...block.coords, y: block.coords.y + 1 } }
          } else if (isQrBlock(block)) {
            return { value: block.code.toString(), coords: block.coords }
          } else if (isColorBlock(block)) {
            return { color: block.color, coords: block.coords }

          }
        })
        return { type: 'dropZone', content: [...mappedBlocks] }
      } else {
        return { ...col, type: "none" }
      }
    })
  })
}

const App = () => {
  const [blockData, setBlockData] = useState(stuff())
  return (
    <div className="App">
      <div className="m-10">
        <h1>LARC - OPEN</h1>
      </div>
      <CubeGridContainer>
        {blockData.map((line, i) => {
          return line.map((col, j) => {
            return <CubeGrid key={`${i}-${j}`} line={i} col={j} content={col.content} />
          })
        })}
      </CubeGridContainer>
      <div className="m-10">
        <button onClick={() => setBlockData(stuff())}>Randomize</button>
      </div>

    </div>
  )
}

export default App
