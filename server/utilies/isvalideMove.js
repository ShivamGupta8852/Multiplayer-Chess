import isKingInCheck from "../PiecesMoveHandles/isKingInCheck.js";
import { rows,columns } from "./constants.js";

const isvalideMove = (game,piece,from,to) => {
    let fromRow = rows.indexOf(from[1]);
    let fromCol = columns.indexOf(from[0]);
    let toRow = rows.indexOf(to[1]);
    let toCol = columns.indexOf(to[0]);
    let board = game.state.board;
    let turn  = game.state.turn;

    // // temporary change the board
    let originalPiece = board[toRow][toCol]; 
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = "";

    // isKingInCheck(board,turn);

    if(isKingInCheck(board,turn)){
        //restore the original board if king is in check and return false to show invalid move
        board[toRow][toCol] = originalPiece;
        board[fromRow][fromCol] = piece;

        game.state.board[fromRow][fromCol] = piece;
        game.state.board[toRow][toCol] = originalPiece;
        return false;
    }

    game.state.board[toRow][toCol] = piece;
    game.state.board[fromRow][fromCol] = "";

    return true;


}

export default isvalideMove;