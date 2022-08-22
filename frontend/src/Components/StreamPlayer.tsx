import { useEffect, useRef } from "react"

const StreamPlayer: React.FC <{ stream: MediaProvider }> = ({stream}) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if(videoRef.current) videoRef.current.srcObject = stream
    },[stream])

    return(
        <video ref={videoRef}autoPlay/>
    )
}


export {
    StreamPlayer
}