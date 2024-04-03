import { io } from 'socket.io-client'

const url = import.meta.env.VITE_DOMAIN as string

const socket = io(url)
export default socket
