import { getLogs } from '../Utils/logs'
import { getSettings } from '../Utils/settings'
import '../Styles/LogViewer.scss'
import { useState } from 'react';

const LogViewer = () => {

    let log_storage = getLogs()
    let id_s = log_storage.logs.map(log => log.id).filter((item, i, ar) => ar.indexOf(item) === i);

    let settings = getSettings()

    const [activeItem, setActiveItem] = useState("")

    const logPickerClickHandler = (ev: React.MouseEvent<HTMLElement>) => {
        
        let id = ev.currentTarget.textContent
        setActiveItem(id!)
        ev.currentTarget.getAttribute('data-key')
        try{
            document.getElementsByClassName("log-item active")[0].classList.remove("active")
        } catch(e){}
        ev.currentTarget.classList.add('active')
        
        ev.preventDefault()
    }

    return(
        <div id="log-view" style={{fontSize: settings["Log Font Size"]+'px'}}>
            <div className='log-text'>
                {log_storage.logs.map((log, i) => {
                    if(log.id === activeItem) {
                        return <div className='log-item'><code><span className='date-span'>[{new Date(+log.time).toLocaleDateString("en-US", {day:'2-digit',month:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit"})}]</span> -- <span className={`${log.level}-level`}>{log.level.toUpperCase()}</span> {"<-->"} {log.message}</code></div>
                    } else {
                        return null
                    }
                    })}
            </div>

            <div className='vl'/>

            <div className='log-picker'>
                {id_s.map(id => {return <div onClick={logPickerClickHandler} className='log-item'>{id}</div>})}
            </div>
        </div>
    )
}

export { LogViewer }