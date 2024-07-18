import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initialGameState, rows, columns } from "../utils/constants";
import socket from "../utils/socket";
import Square from "./Square.jsx";
import Controls from "./Controls.jsx";

const Chessboard = () => {
  const { roomID } = useParams();
  const userID = localStorage.getItem("userID");
  const [chessboard, setChessboard] = useState(initialGameState);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [playingAs, setPlayingAs] = useState("");
  const [isKingInCheck, setIsKingInCheck] = useState(null);
  let checkTimeout;

  const joinGame = () => {
    socket.emit("joinGame", { roomID, userID });
  };

  useEffect(() => {
    socket.emit("joinGame", { roomID, userID });

    socket.on("UpdateGame", (game) => {
      const { board, turn } = game.state;
      const { players } = game;
      const player = players.find((player) => player.userID === userID);
      const role = player ? player.role : null;
      console.log("role of socket in client " + role);
      console.log("created at :  " + Date.now());
      setChessboard(board);
      setPlayerTurn(turn);
      setPlayingAs(role);
    });

    socket.on("possibleMoves", (possibleMoves) => {
      console.log(possibleMoves);
      setPossibleMoves(possibleMoves);
    });

    socket.on("moved", (game) => {
      const { board, turn } = game.state;
      setChessboard(board);
      setPlayerTurn(turn);
      setPossibleMoves([]);
      setSelectedPiece(null);
    });

    socket.on("check", (game, kingPosition) => {
      const { board, turn } = game.state;
      setChessboard(board);
      setPlayerTurn(turn);
      setIsKingInCheck(kingPosition);
      setPossibleMoves([]);
      setSelectedPiece(null);

      checkTimeout = setTimeout(() => {
        setIsKingInCheck(null);
      }, 3000);
    });

    socket.on('connect', () => {
      joinGame();
    })

    return () => {
      socket.off("UpdateGame");
      socket.off("possibleMoves");
      socket.off("moved");
      socket.off("check");
    };
  }, []);

  // useEffect(()=>{
  //   socket.emit("joinGame", {roomID,userID});

  //   socket.on("UpdateGame", (game) => {
  //     const {board,turn} = game.state;
  //     const {players} = game;
  //     // get the role of player with userID
  //     const player = players.find(player => player.userID === userID);
  //     const role = player ? player.role : null;
  //     console.log("role of socket in client "+role);
  //     console.log("created at :  "+Date.now());
  //     setChessboard(board);
  //     setPlayerTurn(turn);
  //     setPlayingAs(role);
  //   })

  //   socket.on("possibleMoves", (possibleMoves) => {
  //     console.log(possibleMoves);
  //     setPossibleMoves(possibleMoves);
  //   })

  //   socket.on("moved", (game) => {
  //     const {board,turn} = game.state;
  //     setChessboard(board);
  //     setPlayerTurn(turn);
  //     setPossibleMoves([]);
  //     setSelectedPiece(null);
  //   })

  // socket.on("check", (game,kingPosition) => {
  //   const {board,turn} = game.state;
  //   setChessboard(board);
  //   setPlayerTurn(turn);
  //   setIsKingInCheck(kingPosition);
  //   setPossibleMoves([]);
  //   setSelectedPiece(null);

  //   checkTimeout = setTimeout(() => {
  //     setIsKingInCheck(null);
  //   }, 3000);
  // })

  //   return () => {
  //     socket.off('UpdateGame');
  //     socket.off('possibleMoves');
  //     socket.off("moved");
  //     socket.off("check");
  //   };

  // },[])

  function handleSquareClick(piece, position) {
    if (piece && piece.startsWith(playerTurn) && playingAs == playerTurn) {
      if (checkTimeout) clearTimeout(checkTimeout);
      setIsKingInCheck(null);
      setSelectedPiece({ piece, position });
      socket.emit("getPossibleMoves", roomID, piece, position);
    } else if (selectedPiece && possibleMoves.includes(position)) {
      socket.emit("validateMove", {
        roomID,
        piece: selectedPiece.piece,
        from: selectedPiece.position,
        to: position,
      });
    }
  }

  return (
    <div className="max-w-full h-[calc(100vh-4rem)]  px-5 py-2 flex gap-4 flex-col md:flex-row bg-slate-900 text-white">
      <div className="w-full md:w-auto md:mx-16 flex flex-col lg:justify-center items-center gap-2">
        <div>Black Timer</div>
        <div className="flex flex-col">
          {chessboard.map((row, rowIndex) => {
            return (
              <div key={rows[rowIndex]} className="flex">
                {row.map((piece, colIndex) => {
                  const position = `${columns[colIndex]}${rows[rowIndex]}`;
                  const isSelected =
                    selectedPiece && selectedPiece.position === position;
                  const isCurrentKingInCheck = isKingInCheck === position;
                  return (
                    <Square
                      key={columns[colIndex]}
                      position={position}
                      piece={piece}
                      isSelected={isSelected}
                      possibleMoves={possibleMoves}
                      handleSquareClick={handleSquareClick}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      isCurrentKingInCheck={isCurrentKingInCheck}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div>White Timer</div>
      </div>
      <Controls
        roomID = {roomID}
      />
    </div>
  );
};

export default Chessboard;
