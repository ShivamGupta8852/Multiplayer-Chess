import React from 'react';
import { columns, pieceImages } from '../utils/constants';


const Square = ({position, piece, isSelected, opponentSelectedPieces, possibleMoves, handleSquareClick, rowIndex, colIndex,isCurrentKingInCheck ,playingAs}) => {
  
    return (
    <div
       id = {position} 
       onClick={() => handleSquareClick(piece, position)} 
       className={`relative w-11 h-11 md:w-[5.5rem] md:h-[5.5rem] lg:w-12 lg:h-12  flex items-center justify-center 
        ${isCurrentKingInCheck ? 'bg-red-600 animate-pulse' : ''} 
        ${isSelected ? 'bg-yellow-400' : ''}  
        ${opponentSelectedPieces && opponentSelectedPieces.includes(position) ? 'bg-green-600' : ''}  
        ${possibleMoves.includes(position) ? 'bg-green-300 border-[1px] border-green-500' :  colIndex % 2 === rowIndex % 2 ? 'bg-green-800' : 'bg-emerald-50'}` }
    >
      {colIndex == 0 && <span className={`text-sm absolute top-[2px] left-[2px] ${colIndex % 2 === rowIndex % 2 ? 'text-white' : 'text-black'}`}>{playingAs === "black" ? rowIndex + 1 : 8-rowIndex}</span>}
      {rowIndex == 7 && <span className={`absolute bottom-[0px] right-[1.5px] text-sm ${colIndex % 2 === rowIndex % 2 ? 'text-white' : 'text-black'}`}>{`${position[0]}`}</span>}
      {piece && <img src={pieceImages[piece]} alt={piece} className="w-10 h-10 md:w-[4.9rem] md:h-[4.9rem] lg:w-[2.7rem] lg:h-[2.7rem] inset-0 object-contain mix-blend-darken " />}
        
    </div>
  )
}

export default Square