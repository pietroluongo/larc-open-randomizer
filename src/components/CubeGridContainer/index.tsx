import React from "react";

interface Props {
    children: React.ReactNode;
}

const CubeGridContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex grid grid-cols-7 gap-1">
            {children}
        </div>
    )
}

export default CubeGridContainer;