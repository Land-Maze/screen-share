import { createContext, useEffect, useState } from 'react'
import { addLogLine } from '../Utils/logs'
import socketIOClient from 'socket.io-client'
import Peer from 'peerjs'
import { v4 as uuidv4 } from 'uuid'

const WS = "http://localhost:8080"

const RoomContext = createContext<any>(null)
const ws = socketIOClient(WS)

interface RoomContextProps {
    children: React.ReactNode
}

// function RoomProvider({ children }: RoomContextProps) {
//     return (
//         <RoomContext.Provider value={{ ws }}>
//             {children}
//         </RoomContext.Provider>
//     )
// }
const RoomProvider: React.FunctionComponent<RoomContextProps> = ({ children }) => {

    const [me, setMe] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>()

    const enterRoom = ({ roomId }: {roomId: string}) => {
        console.log(roomId)
    }
    
    const getUsers = ({participants}: {participants: string[]}) => {
        console.log(`New user connected\n\nList of users[${participants.length}]: [${participants.map(user => `\n\t${user}`)}\n]`)
    }

    const roomNotFound = () => {
        console.log("Room not found")
    }

    const userDisconnected = ({peerId}: {peerId: string}) => {
        console.log('User disconnected: ', peerId)
    }

    const userJoined = ({peerId}: {peerId: string}) => {
        console.log('User joined: ', peerId)
    }

    const shareScreen = () => {
        navigator.mediaDevices.getDisplayMedia().then(stream => {
            setStream(stream)
        })
    }

    useEffect(() => {
        const meId = uuidv4()
        const peer = new Peer(meId)
        setMe(peer)

        // try{
        //     const mediaStream = navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        //         setStream(stream)
        //     })
        // } catch (e) {
        //     console.error(e)
        // }

        ws.on('room-created', enterRoom)
        ws.on('get-users', getUsers)
        ws.on('user-joined', userJoined)
        ws.on('room-not-found', roomNotFound)
        ws.on('user-disconnected', userDisconnected)
    }, [])

    useEffect(() => {
        if(!me || !stream) {return}
        ws.on('user-joined', ({peerId}) => {
            const call = me.call(peerId, stream)
        })

        me.on('call', (call) => {
            call.answer(stream)
            call.on('stream', (remoteStream) => {
                setStream(remoteStream)
            })
        })
    },[me, stream])

    // const createMyStream = () => {
    //     try{
    //         if(!me || myStream) {console.log("createMyStream");return}
    //         navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
    //             setMyStream(stream)
    //              ws.on('user-joined', ({peerId}) => {
    //                 me.call(peerId, myStream!)
    //             })
    //         })
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    // const createOtherStream = () => {
    //     if(!me) {console.log("createOtherStream");return}
    //     me.on('call', (call) => {
    //         call.answer(otherStream)
    //     })
    // }

    return(
        <RoomContext.Provider value={{ws, me, stream, shareScreen, setStream}}>{children}</RoomContext.Provider>
    )
}

export { RoomProvider, RoomContext }