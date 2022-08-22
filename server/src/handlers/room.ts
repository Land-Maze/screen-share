import { Socket } from "socket.io"
import { v4 } from 'uuid'

interface IRoomPasswd{
    roomId: string,
    roomPassword: string,
}

interface IRoomParams {
    roomId: string,
    roomPassword?: string,
    peerId: string
}

const rooms: Record<string, string[]> = {}
const roomsPasswd: IRoomPasswd[] = []

const roomHandler = (socket: Socket) => {

    const createRoom = ({ roomPassword }: { roomPassword: string}) => {
        if(roomPassword === undefined || roomPassword === '') {
            socket.emit('password-empty')
            console.log("Some user tried to create a room without password")
            return
        }
        const roomId = v4()
        rooms[roomId] = []
        roomsPasswd.push({ roomId, roomPassword })
        socket.emit('room-created', { roomId, roomPassword })
        socket.join(roomId)
        console.log("created room " + roomId + " with password " + roomPassword)
    }
    const joinRoom = ({ roomId, roomPassword, peerId }: IRoomParams) => {
        if (!rooms[roomId]) {
            socket.emit('room-not-found')
            console.log(`User ${peerId} tried to join room ${roomId} but it doesn't exist`)
            return
        }
        if(roomsPasswd.find(({ roomId: rId }) => rId === roomId)!.roomPassword !== roomPassword) {
            socket.emit('room-password-wrong')
            console.log(`User ${peerId} tried to join room ${roomId} with wrong password`)
            return
        }
        console.log(`User joining room {\n\troomId: ${roomId}\n\troomPassword: ${roomPassword}\n\tpeerId: ${peerId}\n}`)
        // console.log(rooms)
        rooms[roomId].push(peerId)
        // console.log(rooms)
        socket.join(roomId)
        socket.to(roomId).emit('user-joined', { peerId })
        socket.to(roomId).emit('get-users', { roomId, participants: rooms[roomId] })

        socket.on("disconnect", () => {
            console.log(`User left room {\n\troomId: ${roomId}\n\tpeerId: ${peerId}\n}`)
            leaveRoom({ roomId, peerId })
        })
    }

    const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
        rooms[roomId] = rooms[roomId].filter(id => id !== peerId)
        socket.to(roomId).emit('user-disconnected', { peerId })
    }

    socket.on('create-room', createRoom)
    socket.on('join-room', joinRoom)
}

export {
    roomHandler
}