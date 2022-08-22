interface LogLine{
    time: string;
    message: string;
    level: "info" | "error" | "warning" | "start" | "stop";
    id: string;
}

interface LogStorage{
    len: number;
    logs: LogLine[];
}


const getLogs = (): LogStorage => {
    let f = localStorage.getItem('log_storage')
    return JSON.parse(f!)
}

const addLogLine = (log: LogLine) => {
    let logs_storage: LogStorage = getLogs()
    logs_storage.logs.push(log)
    logs_storage.len += 1;
    localStorage.setItem('log_storage', JSON.stringify(logs_storage))
}

const checkLogs = () => {
    let f = localStorage.getItem('log_storage')
    if(f == null){
        localStorage.setItem('log_storage', JSON.stringify({"len": 0, "logs": []}))
    }
}

export { getLogs, addLogLine, checkLogs }