import React, { useEffect, useState } from "react";
import {FaMicrophone,FaMicrophoneSlash , FaStepBackward, FaUndo,FaRedo,FaStepForward} from "react-icons/fa";
import socket from "../utils/socket";
import { columns, rows } from "../utils/constants.jsx";

const Controls = ({roomID,chessboard,playerTurn,playingAs}) => {
  const [isListening, setIsListening] = useState(false);

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
    const moveMatch = command.match(/(?:make a move from|move|move from|make a move)? (\w\d) (?:to|to)? (\w\d)/i);
    if (moveMatch) {
      console.log("match", moveMatch);
      const from = moveMatch[1];
      const to = moveMatch[2];
      let fromRow = rows.indexOf(from[1]);
      let fromCol = columns.indexOf(from[0]);
      const piece = chessboard[fromRow][fromCol];
      // Emit move to server or handle locally
      if(playerTurn == playingAs){
        socket.emit("validateMove", {
          roomID,
          piece,
          from,
          to
        });
        setIsListening(false);
      } else{
        console.log("it is not your turn");
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
    <div className="w-full mt-4 md:mt-3">
      <div className="flex justify-between md:px-40">
        <button onClick={() => playerTurn == playingAs && setIsListening(!isListening)} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm">{isListening ? <FaMicrophone />: <FaMicrophoneSlash />}</button>
        <button onClick={() => socket.emit('beginning',{roomID})} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaStepBackward /></button>
        <button onClick={() => socket.emit('undo',{roomID})} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaUndo /></button>
        <button onClick={() => socket.emit('redo', {roomID})} className="text-2xl  bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaRedo /></button>
        <button onClick={() => socket.emit('ending',{roomID})} className="text-2xl  bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaStepForward /></button>
      </div>
    </div>
  );
};

export default Controls;
