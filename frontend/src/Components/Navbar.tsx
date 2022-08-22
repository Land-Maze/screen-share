import '../Styles/Navbar.scss';
import { Input } from './Input';
import log_ico from "../Assets/log-logo.svg";
import settings_ico from "../Assets/settings-logo.svg";
import { ConnectButton } from './ConnectButton';
import { FullscreenPopup } from '../Components/FullscreenPopup'
import { useState } from 'react';
import { getSettings } from '../Utils/settings'
// import { addLogLine } from '../Utils/logs';
import { LogViewer } from './LogViewer'
// import { sha256 } from 'crypto-hash'
import { SettingsView } from './Settings'
import { HostButton } from './HostButton';

const Nav = () => {

    const [logButton, setLogButton] = useState(false)
    const [settingsButton, setSettingsButton] = useState(false)

    let settings = getSettings()

    const clickLogButtonHandler = (ev: React.MouseEvent<HTMLElement>)=>{
        setLogButton(true)
        ev.preventDefault()
    }

    // let wait = 0
    // while(true){
    //     if(wait >= 50)  break

    //     let bb = 0
    //     while(true){
    //         if(bb > 10) break
    //         addLogLine({"id": `${wait}`, "level": "warning", "message": "test", "time": Date.now().toString()})
    //         addLogLine({"id": `${wait}`, "level": "error", "message": "test", "time": Date.now().toString()})
    //         addLogLine({"id": `${wait}`, "level": "info", "message": "test", "time": Date.now().toString()})
    //         addLogLine({"id": `${wait}`, "level": "start", "message": "test", "time": Date.now().toString()})
    //         addLogLine({"id": `${wait}`, "level": "stop", "message": "test", "time": Date.now().toString()})
    //         bb++
    //     }
    //     wait++
    // }

    const clickSettingsButtonHandler = (ev: React.MouseEvent<HTMLElement>)=>{
        setSettingsButton(true)
        ev.preventDefault()
    }

    return(
        <nav>
            <div className="nav-wrapper">
            {logButton && <FullscreenPopup id="logs-pop" state={setLogButton} width={settings['Log Width'] + "vw"} height={settings['Log Height'] + "vh"} fontSize={settings['Log Font Size']}><LogViewer /></FullscreenPopup>}
            {settingsButton && <FullscreenPopup id="settings-pop" state={setSettingsButton} height="270px" width='400px'><SettingsView/></FullscreenPopup>}
                <Input id="id_input" placeholder="ID:PASSWORD" color="#655973" font_color='#f5f5f5' render_side='right' type="password">
                    <ConnectButton />
                </Input>

                <section id="btn-section">

                    <div><button onClick={clickLogButtonHandler} id="log_btn" className='radial-btn'><img src={log_ico} alt="logging ico" style={{width: "80%"}}/>
                    </button></div>

                    <div><button onClick={clickSettingsButtonHandler} id="settings_btn" className='radial-btn'><img src={settings_ico} alt="settings ico" />
                    </button></div>

                </section>

                <Input id="host_input" placeholder='Host password' color="#655973" font_color='#f5f5f5' render_side='left' type='password'>
                    <HostButton />
                </Input>
            </div>
        </nav>
    )
}

export { Nav };