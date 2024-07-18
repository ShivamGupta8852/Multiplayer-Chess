import { v4 as uuidv4 } from 'uuid';
import Game from './models/Game.js';
import { initialGameState } from './utilies/constants.js';
import getPossibleMoves from './utilies/getPossibleMoves.js';
import isvalideMove from './utilies/isvalideMove.js';
import findKingPosition from './PiecesMoveHandles/findKingPosition.js';

export default async function handleSocketEvents(io){
    const games = new Map();

    const loadGamesFromDatabase = async () => {
        const dbGames = await Game.find();
        dbGames.forEach(game => {
          games.set(game.roomID, game);
        });
    };

    await loadGamesFromDatabase();


    io.on('connection', (socket) =>{
        console.log(`user connected ${socket.id}`);

        // join a room and wait
        const joinRoomAndWait = async (roomID,socket,isAvailableForRandom) => {
            const newGame = new Game({
                roomID,
                players: [{ userID: socket.userID, role: 'white' }],
                state: {
                  board: initialGameState(),
                  turn: 'white',
                  timers: { white: 600000, black: 600000 },
                  lastMoveTime: Date.now(),
                },
                isAvailableForRandom,
                createdAt: new Date(),
            })
            games.set(roomID,newGame);
            await newGame.save();
            socket.join(roomID);
            socket.emit('waiting');
        }

        // join the room and both players start the game
        const joinRoomAndPlay = async (roomID,socket,game) => {
            game.players.push({ userID: socket.userID, role: 'black' });
            games.set(roomID, game);
            await Game.updateOne({ roomID }, {players : game.players});
            socket.join(roomID);
            io.to(roomID).emit('startGame', roomID);
        }

        //create or find room when clicked on Play online(client side)
        socket.on('findOrCreateRoom', (userID) => {
            socket.userID = userID;
            let roomID = null;      // to return roomId of room joined to socket
            for(let [id,game] of games.entries()){
                if(game.players.length === 1 && game.isAvailableForRandom){
                    roomID = id;
                    joinRoomAndPlay(roomID,socket,game);
                    break;
                }
            }

            // if not single player room found, then create new room with initial states
            if(!roomID){
                roomID = uuidv4();
                joinRoomAndWait(roomID,socket,true);
            }
            console.log("Play online clicked");
        })

        // create and join the specified room when Clicked on Invite friend
        socket.on('joinSpecificRoom', async ({ roomID, userID }) => {
            socket.userID = userID;
            let game = games.get(roomID) || await Game.findOne({roomID});

            if(game && game.players.length === 2){
                socket.emit('roomfull');
            }
            if(game && game.players.length === 1 && game.roomID == roomID){
                joinRoomAndPlay(roomID,socket,game);
            }
            if(!game){
                joinRoomAndWait(roomID,socket,false);  //isAVailableForRandom == false to Mark room as unavailable for random matchmaking
            }
        })

        // handle the browser refresh
        socket.on('joinGame', async ({ roomID, userID }) => {
            socket.userID = userID;
            let game = games.get(roomID) || await Game.findOne({ roomID });
            // console.log("Gameboard : "+game.state.board);
            if (game) {
                const player = game.players.find(player => player.userID === userID);
                if (!player) {
                    const existingRole = game.players[0].role;
                    const newRole = existingRole === 'black' ? 'white' : 'black';
                    game.players.push({ userID, role: newRole });
                    games.set(roomID, game);
                    await Game.updateOne({ roomID }, { players: game.players });
                }
                socket.join(roomID);
                io.to(roomID).emit("UpdateGame", game);
            }
        });

        // return all possible moves of a piece 
        socket.on('getPossibleMoves', async (roomID, piece, position) =>{
            const game = games.get(roomID)  || await Game.findOne({roomID});
            let possibleMoves = getPossibleMoves(piece,game.state.board,position,game.state.turn);
            io.to(roomID).emit("possibleMoves",possibleMoves);
        })

        // validate the move of a piece
        socket.on("validateMove", async ({roomID, piece,from,to}) => {
            const game = games.get(roomID) || await Game.findOne({roomID});
            if(game){
                console.log("is Valide move ? :  "+isvalideMove(game,piece,from,to));
                if(isvalideMove(game,piece,from,to)){
                    game.state.turn =  game.state.turn == "white" ? "black" : "white"; // switch the turn if valide move
                    io.to(roomID).emit('moved',game);
                    console.log(game.state.board);
                    games.set(roomID, game);
                    await Game.updateOne({ roomID }, { $set: { 'state.board': game.state.board } });
                }
                else{
                    const kingPosition = findKingPosition(game.state.board, game.state.turn);     // is inValid Move(i.e, king of current player is in check);
                    socket.emit("check",game,kingPosition);
                }

            }
        })

        socket.on('undo' , async ({roomID}) => {
            const game = games.get(roomID) || await Game.findOne({roomID});
        })

        // delete the roomID created with this socket on click of cancel button
        socket.on("cancelSearch", async (userID ) => {
            for (const [id, game] of games){
                const player = game.players.find(player => player.userID === userID)
                if(player){
                    games.delete(id);
                    await Game.deleteOne({roomID : id});
                    break;
                }
            }
        })

        // disconnect the socket
        socket.on('disconnect', async () => {
            console.log('user disconnected:', socket.id);
            console.log(games);
            for (const [id, game] of games) {
              const playerIndex = game.players.findIndex(player => player.userID === socket.userID);
              console.log("PlayerIndex : " + playerIndex);
              if (playerIndex !== -1) {
                game.players.splice(playerIndex, 1);
                console.log("Players in Game : "+game.players);
                if (game.players.length === 0) {
                  games.delete(id);
                  await Game.deleteOne({ roomID: id });
                } else {
                  games.set(id, game);
                  await Game.updateOne({ roomID: id }, { players: game.players });
                }
                break;
              }
            }
        })
    })

}