import io from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socketio = io(socketUrl);

export { socketio };
