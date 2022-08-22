import '../Styles/Settings.scss'
import { setSettings, getSettings } from '../Utils/settings'
import { sha256 } from 'crypto-hash'
import { useState } from 'react'

const SettingsView = () => {

    let settings = getSettings()

    const [passwd, setPasswd] = useState('')
    const [logWidth, setLogWidth] = useState(settings['Log Width'])
    const [logHeight, setLogHeight] = useState(settings['Log Height'])
    const [logFontSize, setLogFontSize] = useState(settings['Log Font Size'])

    let passwd_hidden = passwd.split('').map(()=>'*').join('')

    const clickSavePasswdHandler = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        setPasswd(ev.target.value)
        passwd_hidden = passwd.split('').map(()=>'*').join('')
        ev.preventDefault()
    }

    const changeLogWidthHandler = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        setLogWidth(ev.target.value)
        ev.preventDefault()
    }

    const changeLogHeightHandler = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        setLogHeight(ev.target.value)
        ev.preventDefault()
    }

    const changeLogFontSizeHandler = (ev: React.ChangeEvent<HTMLInputElement>)=>{
        setLogFontSize(ev.target.value)
        ev.preventDefault()
    }

    const clickSaveButtonHandler = (ev: React.MouseEvent<HTMLElement>)=>{
        sha256(passwd).then(hash => {
            setSettings({
                "Save Password": hash,
                'Log Width': logWidth,
                'Log Height': logHeight,
                'Log Font Size': logFontSize
            })
        })
        ev.preventDefault()
    }

    return(
        <div id='settings-view'>
            <div>
                <div className='settings-container' id="save-passwd">
                    <span>Default password: </span>
                    <input type="text" id="passwd_input" placeholder="Password" value={passwd_hidden} onChange={clickSavePasswdHandler}/>
                </div>

                <div className='settings-container' id="log-width">
                    <span>Log width (in vw): </span>
                    <input onChange={changeLogWidthHandler} type="number" id="log_width_input" value={logWidth} />
                </div>

                <div className='settings-container' id='log-height'>
                    <span>Log height (in vh): </span>
                    <input onChange={changeLogHeightHandler} type="number" id="log_height_input" value={logHeight} />
                </div>

                <div className='settings-container' id='log-font-size'>
                    <span>Log Font Size (in px): </span>
                    <input onChange={changeLogFontSizeHandler} type="number" id="log_height_input" value={logFontSize} />
                </div>

                <div className='settings-container' id='save-button'>
                    <button onClick={clickSaveButtonHandler}>Save</button>
                </div>
            </div>
        </div>
    )
}

export { SettingsView }