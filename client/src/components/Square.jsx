import React from 'react';
import { pieceImages } from '../utils/constants';


const Square = ({position, piece, isSelected, possibleMoves, handleSquareClick, rowIndex, colIndex,isCurrentKingInCheck }) => {
    // const handleClick = React.useCallback(() => {
    //     handleSquareClick(piece, position);
    //   }, [handleSquareClick, piece, position]);


    return (
    <div
       id = {position} 
       onClick={() => handleSquareClick(piece, position)} 
       className={`relative w-11 h-11 md:w-[3.2rem] md:h-[3.2rem]  flex items-center justify-center  ${isCurrentKingInCheck ? 'bg-red-600 animate-pulse' : ''} ${isSelected ? 'bg-yellow-400' : ''} ${possibleMoves.includes(position) ? 'bg-green-300 border-[1px] border-green-500' :  colIndex % 2 === rowIndex % 2 ? 'bg-green-800' : 'bg-emerald-50'}` }
    >
        {colIndex == 0 && <span className={`text-sm absolute top-[2px] left-[2px] ${colIndex % 2 === rowIndex % 2 ? 'text-white' : 'text-black'}`}>{`${8-rowIndex}`}</span>}
        {rowIndex == 7 && <span className={`absolute bottom-[0px] right-[1.5px] text-sm ${colIndex % 2 === rowIndex % 2 ? 'text-white' : 'text-black'}`}>{`${position[0]}`}</span>}
        {piece && <img src={pieceImages[piece]} alt={piece} className="w-10 h-10 md:w-11 md:h-11 inset-0 object-contain mix-blend-darken " />}
        
    </div>
  )
}

export default Square