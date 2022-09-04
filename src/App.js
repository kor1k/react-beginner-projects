import './index.scss';
import {useEffect, useState} from "react";

function App() {
    const [count, setCount] = useState(+localStorage.getItem('countVal') || 0);

    useEffect(() => {
        localStorage.setItem('countVal', `${count}`);
    }, [count])

    const decrement = () => {
        console.log('decrement');
        if (count > 0) setCount(count - 1);
    }

    const increment = () => {
        console.log('increment');
        setCount(count + 1);
    }

    const reset = () => {
        console.log('reset');
        setCount(0);
    }

    return (
        <div className="App">
            <div>
                <h2>Counter:</h2>
                <h1>{count}</h1>
                <button onClick={decrement} className="minus">- Minus</button>
                <button onClick={reset} className="reset">Reset counter</button>
                <button onClick={increment} className="plus">+ Plus</button>
            </div>
        </div>
    );
}

export default App;
