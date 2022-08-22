import React, { createContext } from 'react'

const ConnectValueContext = createContext<any>(null)

interface ConnectValueContextProps {
    children: React.ReactNode
}

const ConnectValueProvider: React.FunctionComponent<ConnectValueContextProps> = ({ children }) => {
    
    class ConnectValue{
        constructor(){
            this.id = ""
            this.password = ""
        }
        id: string
        password: string
        
        changeIdPasswd = (id: string, password: string) => {
            this.id = id
            this.password = password
        }
        
        getValues = () => {
            return [this.id, this.password]
        }

    }
    
    const connectValueInstance = new ConnectValue()

    return(
        <ConnectValueContext.Provider value={{connectValueInstance}}>{children}</ConnectValueContext.Provider>
    )
}

export { ConnectValueContext, ConnectValueProvider }