import React from "react";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import socket from "../utils/socket";

const Controls = ({roomID}) => {
  function handleUndo() {
    socket.emit('undo',{roomID});
  }

  function handleRedo() {
    socket.emit('redo', {roomID});
  }

  return (
    <div className="w-full mt-4 md:mt-3">
      <div className="flex justify-between md:px-40">
        <button onClick={handleUndo} className="text-2xl bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaUndo /></button>
        <button onClick={handleRedo} className="text-2xl  bg-green-700 text-rose-100 px-6 py-2 rounded-sm"><FaRedo /></button>
      </div>
    </div>
  );
};

export default Controls;
