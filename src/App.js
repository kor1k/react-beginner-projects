import React, {useState} from 'react';
import './index.scss';

const Modal = ({open, setOpen, modalContent}) => (
    <div className={`overlay animated${open ? ' show' : ''}`}>
        <div className="modal">
            <svg onClick={() => setOpen(false)} height="200" viewBox="0 0 200 200" width="200">
                <title/>
                <path
                    d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
            </svg>
            <div>{modalContent}</div>
            <img alt='image' src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"/>
        </div>
    </div>
)

function App() {
    const [open, setOpen] = useState(false);

    return (
        <div className="App">
            <button className="open-modal-btn" onClick={() => setOpen(true)}>✨ Открыть окно</button>
            {/* условный рендеринг (без анимации) */}
            {open && <Modal open={open} setOpen={setOpen} modalContent='i am content inside modal :)'/>}

            {/* модуль грузится в DOM сразу же и благодаря этому будет применена анимация  */}
            {/*<Modal open={open} setOpen={setOpen} modalContent='i am content inside modal :)'/>*/}
        </div>
    );
}

export default App;
