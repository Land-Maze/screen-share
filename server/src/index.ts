import express from "express"
import http from "http"
import {Server} from "socket.io"
import { roomHandler } from "./handlers/room"

const port = 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
})


io.on('connect', (socket) => {
    console.log("new user connected")
    roomHandler(socket)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})