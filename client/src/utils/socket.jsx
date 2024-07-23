import {io} from 'socket.io-client';

const socket = io('https://chessmaster-online.onrender.com');

export default socket;