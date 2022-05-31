import React, { useEffect, useRef, useState } from 'react'


function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}
// console.log(msToTime(300000))






export const Timer = () => {
    //  const [timerId, setTimerId] = useState(null)
    const timerId = useRef(null)
    const [watch, setWatch] = useState(1000)

    const start = () => {
        if (!timerId.current) {
            let id = setInterval(() => {
                setWatch((prev) => prev + 1000)
            }, 100);
            timerId.current = id
            // setTimerId(id)
        }
    }

    const pause = () => {
        clearInterval(timerId.current)
        timerId.current = null
        //setTimerId(null)
    }

    const reset = () => {
        clearInterval(timerId.current)
        setWatch(0)
        timerId.current = null
        // setTimerId(null)
    }

    useEffect(() => {
        return reset
    }, [])

    return (
        <div>
            <h2>Stopwatch</h2>
            <h1>{msToTime(watch)}</h1>
            <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}
