import io from "socket.io-client";

const aiChatSocketUrl = import.meta.env.VITE_AI_CHAT_SOCKET_URL;

const caseSocketUrl = import.meta.env.VITE_CASE_SOCKET_URL;

const aiChatSocketio = io(aiChatSocketUrl);

const caseSocketio = io(caseSocketUrl);

export { aiChatSocketio, caseSocketio };
