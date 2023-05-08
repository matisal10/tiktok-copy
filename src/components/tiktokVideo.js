import Reac, { useEffect, useRef } from 'react'

export default function TiktokVideo({ item, current }) {

    const ref = useRef(null)

    useEffect(() => {
        if (current && ref.current) {
            ref.current.play()
            // ref.current.muted = false
        }
        else {
            ref.current.pause()
            ref.current.currentTime = 0
        }
    }, [current]);

    function play(){
        ref.current.muted = false
    }

    return (
        <div className='tiktokVideo'>
            <video ref={ref} width="540" height="960" muted={true} autoPlay={true} onClick={play}>
                <source src={`http://localhost:4000/videos/${item.path}`} type='video/mp4' />
            </video>
        </div>
    )
}
