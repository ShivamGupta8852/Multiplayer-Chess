import { IoRocketSharp } from "react-icons/io5";
import socket from "../utils/socket.jsx";

const WaitingOpponent = ({setWaiting,userID}) => {
  function handleCancel() {
    setWaiting(false);
    socket.emit("cancelSearch", userID);
  }
  return (
    <div className="w-full flex flex-col justify-center items-center my-28">
      <IoRocketSharp className="text-5xl text-orange-400" />
      <p className="text-2xl w-44 mt-6">
        starting soon<span className="ellipsis"></span>
      </p>
      <button onClick={handleCancel} className="mt-6">
        Cancel
      </button>
    </div>
  );
};

export default WaitingOpponent;
