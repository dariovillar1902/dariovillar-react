import React, { useEffect, useState } from 'react'

const CounterComponent = ({ countTo }) => {
    let [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setCount((oldCount) => oldCount + 1), (500 - countTo) / 2);

        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <span className="number">{(count <= countTo) ? count : countTo}</span>
    )
}

export default CounterComponent;