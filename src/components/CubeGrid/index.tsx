import { CompleteCoordinates } from "../../App";

interface SubBlock {
    coords: CompleteCoordinates;
    color?: string;
    value?: string;
}

interface Props {
    line: number;
    col: number;
    type?: "loadingZone" | "dropZone" | "none";
    content?: SubBlock[] | any;
}

interface HighlightProps {
    line: number;
    col: number;
}
const shouldHighlight = ({ line, col }: HighlightProps) => {
    return (col == 1 || col == 2) && (line == 2 || line == 3) || ((col == 4 || col == 5) && (line == 2 || line == 3))
}

const CubeGrid: React.FC<Props> = ({ line, col, type = "none", content }) => {
    const defaultContent: SubBlock[] = [
        { coords: { x: line, y: col, subX: 0, subY: 0 }, value: "" },
        { coords: { x: line, y: col, subX: 0, subY: 1 }, value: "" },
        { coords: { x: line, y: col, subX: 1, subY: 0 }, value: "" },
        { coords: { x: line, y: col, subX: 1, subY: 1 }, value: "" },
    ]

    const typeClassName = () => {
        switch (type) {
            case "loadingZone":
                return "border-2 border-blue-500 bg-red-500";
            case "dropZone":
                return "border-2 border-green-500";
            case "none":
                return "";
        }
    }

    const bottomClassName = () => {
        if (line === 6) {

            if ((col == 0 || col == 6)) return "bg-green-500";
            if ((col == 1 || col == 5)) return "bg-blue-500";
            if ((col == 2 || col == 4)) return "bg-yellow-500";
            if (col == 3) return "bg-red-500";
        }
    }

    if (!content) {
        if (shouldHighlight({ line, col })) {
            return (<div className={`border border-blue-500 w-[5rem] h-[5rem] flex items-center justify-center grid grid-cols-2`}>
                <div className={`border border-blue-500 w-full h-full`}></div>
                <div className={`border border-blue-500 w-full h-full`}></div>
                <div className={`border border-blue-500 w-full h-full`}></div>
                <div className={`border border-blue-500 w-full h-full`}></div>

            </div >)
        }

        return (
            <div className={`border border-blue-500 p-3 w-[5rem] h-[5rem] flex items-center justify-center ${typeClassName()} ${bottomClassName()}`}>
                ({line + 1},{col + 1})
            </div>
        )
    }

    const CubeGridData = () => {
        return Array.from({ length: 2 }, (_, i) => {
            return Array.from({ length: 2 }, (_, j) => {
                return { line: i, col: j }
            })
        })
    }

    const updatedContent = defaultContent.map((subBlock) => {
        const found = content.find((item: SubBlock) => item.coords.subX === subBlock.coords.subX && item.coords.subY === subBlock.coords.subY)
        if (found) {
            return found
        }
        return subBlock
    })


    return (
        <div className={`border border-blue w-[5rem] h-[5rem] flex grid grid-cols-2`}>
            {
                CubeGridData().map((line, i) => {
                    return line.map((col, j) => {
                        return updatedContent.map(content => {
                            if (content.coords.subX == i && content.coords.subY == j) {
                                if (content.color) {
                                    return <div key={`${i}-${j}`} className={`border border-blue-500 w-full h-full flex items-center justify-center bg-${content.color}-500`} >{content.color[0]}</div>
                                }
                                if (content.value) {
                                    if (!isNaN(+Number(content.value))) {
                                        return <div key={`${i}-${j}`} className={`border border-blue-500 w-full h-full flex items-center justify-center bg-white text-black`}>{content.value}</div>
                                    }
                                    return <div key={`${i}-${j}`} className={`border border-blue-500 w-full h-full flex items-center justify-center bg-violet-800`}>{content.value.toUpperCase()}</div>
                                }
                                return (
                                    <div className="border border h-full w-full border-blue-500 flex items-center justify-center text-[#242424]">
                                        <div key={`${i}-${j}`}>{content.value}o</div>
                                    </div>
                                )
                            }
                        })
                    })
                })
            }
        </div >
    )

}

export default CubeGrid;