import io from "socket.io-client";

const aiChatSocketUrl = `${import.meta.env.VITE_DSAR_BASE_URL}/${import.meta.env.VITE_DSAR_SOCKET_AI_CHAT_CHANNEL}`;

const caseSocketUrl = `${import.meta.env.VITE_DSAR_BASE_URL}/${import.meta.env.VITE_DSAR_SOCKET_CASE_CHANNEL}`;

const aiChatSocketio = io(aiChatSocketUrl);

const caseSocketio = io(caseSocketUrl);

export { aiChatSocketio, caseSocketio };
