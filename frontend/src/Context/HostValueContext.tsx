import React, { createContext } from 'react'

const HostValueContext = createContext<any>(null)

interface HostValueContextProps {
    children: React.ReactNode
}

const HostValueProvider: React.FunctionComponent<HostValueContextProps> = ({ children }) => {

    class HostValue{
        constructor(){
            this.password = ""
        }
        password: string

        changePasswd = (password: string) => {
            this.password = password
        }

        getValues = () => {
            return this.password
        }

    }

    const hostValueInstance = new HostValue()

    return(
        <HostValueContext.Provider value={{hostValueInstance}}>{children}</HostValueContext.Provider>
    )
}

export { HostValueContext, HostValueProvider }