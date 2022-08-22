import '../Styles/ConnectButton.scss';
import { RoomContext } from '../Context/RoomContext';
import { ConnectValueContext } from '../Context/ConnectValueContext';
import React, { useContext } from 'react';

const ConnectButton = () => {
    const { ws, me, setStream } = useContext(RoomContext);
    const { connectValueInstance } = useContext(ConnectValueContext);
    const joinRoom = (ev: React.MouseEvent) => {
        let id = connectValueInstance.getValues()[0]
        let password = connectValueInstance.getValues()[1]
        if(me) {
            ws.emit('join-room', { roomId: id, peerId: me._id ,roomPassword: password });
            setStream(new MediaStream)
        }
    }
    return(
        <button onClick={joinRoom} id="connect_button" className="nav-btn" style={{marginLeft: "1rem"}}>Connect</button>
    )
}

export {ConnectButton}