interface Settings{
    "Save Password": string;
    "Log Width": string;
    "Log Height": string;
    "Log Font Size": string;
}

const getSettings = () : Settings => {
    let f = localStorage.getItem('settings')
    return JSON.parse(f!)
}

const setSettings = (settings: Settings) => {
    localStorage.setItem('settings', JSON.stringify(settings))
}

const checkSettings = () => {
    let f = localStorage.getItem('settings')
    if(f == null){
        setSettings({
            "Save Password": "null",
            "Log Width": "50",
            "Log Height": "80",
            "Log Font Size": "14"
        })
    }
}

export { getSettings, setSettings, checkSettings }