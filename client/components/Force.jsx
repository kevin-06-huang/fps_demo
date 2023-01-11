import React, { useRef } from "react"
import Webcam from "react-webcam";

const Force = React.forwardRef((props,ref) => {
    return (
        <Webcam ref={ref} />
    )
});

export default Force;
