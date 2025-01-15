import SlotCounter from 'react-slot-counter';
import {useEffect, useState} from "react";

export default function Countup({value, startValue}) {
    const [start, setStart] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 500)
    }, []);

    return (
        <div className={"font-medium text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl"}>
            <SlotCounter
                startValue={startValue}
                autoAnimationStart={start}
                value={value}
            />
        </div>
    );
}