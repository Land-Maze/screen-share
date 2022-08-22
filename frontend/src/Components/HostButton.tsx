import { useContext } from "react";
import { RoomContext } from "../Context/RoomContext";
import { HostValueContext } from "../Context/HostValueContext";


const HostButton = () => {

    const { ws, shareScreen } = useContext(RoomContext);
    const { hostValueInstance } = useContext(HostValueContext);
    const createRoom = () => {
        ws.on('password-empty', ()=>{console.log('Password is empty')})
        ws.emit('create-room', { roomPassword : hostValueInstance.getValues()});
        ws.on('room-created', ()=>{shareScreen()})
    }

    return(
        <button onClick={createRoom} id='host_button' className='nav-btn' style={{marginRight: "1rem"}}>Host</button>
    )
}

export {
    HostButton
}