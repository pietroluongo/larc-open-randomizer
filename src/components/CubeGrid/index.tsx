interface Props {
    line: number;
    col: number;
    type?: "loadingZone" | "dropZone" | "none";
}

const ColoredBlock = () => <div className="bg-blue-500 w-full h-full" />

const CubeGrid: React.FC<Props> = ({ line, col, type = "none" }) => {
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

    if (type === "loadingZone") {
        return (
            <div className={`border border-blue w-[5rem] h-[5rem] flex grid grid-cols-2`}>
                {/* <div className="bg-blue-500 w-full h-full flex items-center justify-center"></div>
                <div className="bg-green-500 w-full h-full" />
                <div className="bg-pink-500 w-full h-full flex items-center justify-center"></div>
                <div className="bg-teal-500 w-full h-full" /> */}
            </div>
        )
    }

    return (
        <div className={`border border-blue-500 p-3 w-[5rem] h-[5rem] flex items-center justify-center ${typeClassName()}`}>
            ({line + 1},{col + 1})
        </div>
    )
}

export default CubeGrid;