import {io} from 'socket.io-client';

const socket = io('http://localhost:8001');
// const socket = io('https://chessmaster-online.onrender.com');

export default socket;