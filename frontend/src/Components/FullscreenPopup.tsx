import { Dispatch, SetStateAction, useState } from 'react';
import '../Styles/FullscreenPopup.scss'

interface FullscreenPopupProps{
    id: string;
    state: Dispatch<SetStateAction<boolean>>;
    width?: string;
    height?: string;
    fontSize?: string;
    children: React.ReactElement<any>;
}

const FullscreenPopup = (props: FullscreenPopupProps) => {
    
    let [show, setShow] = useState(true)

    const closePopup = () => {
        const popup = document.getElementById(props.id)
        popup!.classList.add("close-animation")
        setTimeout(() => {
            popup!.classList.remove("show")
            popup!.classList.remove("close-animation")
            popup!.classList.add("hide")
            props.state(false)
        }, 500)
    }

    const openPopup = () => {
        const popup = document.getElementById(props.id)
        popup?.classList.add("show")
        popup?.classList.remove("hide")
    }

    if(show) openPopup(); else closePopup()
    

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if(e.target === document.getElementById(props.id)?.children[0]) {
            setShow(false)
        }
    }

    return(
        <div id={props.id} className="full-pop show">
            <div onClick={handleClick} className='opacity-layer'></div>
            <div className='pop-container' style={{width: props.width, height: props.height, fontSize: props.fontSize}}>
                {props.children}
            </div>
        </div>
    )
}

export { FullscreenPopup }