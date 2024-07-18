import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {createServer} from 'http';
import { Server } from 'socket.io';
import handleSocketEvents from './socketHandler.js';
import connectDB from './database/connectdb.js';

const app = express();
app.use(cors({
    origin : "http://localhost:5173"
}))
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173"],
    }
})

// handle Database(MongoDB) connection
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

// handle socket
handleSocketEvents(io);


const PORT = process.env.PORT || 8002;
server.listen(PORT, () => {
    console.log(`server is listening on port : ${PORT}`);
})