import React, { useEffect, useState } from "react";
import {FaMicrophone,FaMicrophoneSlash , FaStepBackward, FaUndo,FaRedo,FaStepForward} from "react-icons/fa";
import socket from "../utils/socket";
import { columns, rows } from "../utils/constants.jsx";
import { modified_movelist } from "../utils/helperFunctions.jsx";

const Controls = ({roomID,chessboard,playerTurn,playingAs,moveList}) => {
  const [isListening, setIsListening] = useState(false);
  const newMoveList = modified_movelist(moveList,2);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(command);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleVoiceCommand = (command) => {
    const moveMatch = command.match(/(?:make a move from |move |move from |make a move )?(\w\d) to (\w\d)/i);
    if (moveMatch) {
      const from = moveMatch[1];
      const to = moveMatch[2];
      let fromRow = rows.indexOf(from[1]);
      let fromCol = columns.indexOf(from[0]);
      const piece = chessboard[fromRow][fromCol];

      // emit validateMove event to server
      if(playerTurn == playingAs && piece.startsWith(playerTurn) && piece){
        socket.emit("validateMove", {
          roomID,
          piece,
          from,
          to
        });
        setIsListening(false);
      } else{
        console.log("invalid move");
        setIsListening(false);
      }
    } else {
      console.log("Command not recognized:", command);
      setIsListening(false);
    }
  };

  function  handleVoiceButton() {
    if(playerTurn == playingAs){
      setIsListening(!isListening);
    }
  }

  return (
    <div className="mt-4 md:mt-3 flex flex-col">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-2 gap-y-4 md:px-40 lg:gap-x-3">
        <button onClick={() => socket.emit('beginning',{roomID})} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaStepBackward /></button>
        <button onClick={() => socket.emit('undo',{roomID})} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaUndo /></button>
        <button onClick={() => socket.emit('redo', {roomID})} className="text-2xl  bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaRedo /></button>
        <button onClick={() => socket.emit('ending',{roomID})} className="text-2xl  bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaStepForward /></button>
        <button onClick={() => playerTurn == playingAs && setIsListening(!isListening)} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm">{isListening ? <FaMicrophone />: <FaMicrophoneSlash />}</button>
      </div>
      <div className=" mt-4 md:mt-4 flex flex-col mx-5 mb-6 px-2 h-[calc(100vh-4rem)] bg-gray-800">
        {newMoveList.map((pair,pairIndex) => {
          return (<div key={pairIndex} className="flex">
            <div className="w-[30%]">{pairIndex+1}.</div>
            {pair.map((move,moveIndex) => {
              return (<div key={moveIndex} className="w-[30%]">
                {move.to}
              </div>)
            })}
          </div>)
        })}

      </div>
    </div>
  );
};

export default Controls;
