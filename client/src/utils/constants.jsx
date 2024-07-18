import blackRook from '../assets/Images/black-rook.png';
import blackKnight from '../assets/Images/black-knight.png';
import blackBishop from '../assets/Images/black-bishop.png';
import blackQueen from '../assets/Images/black-queen.png';
import blackKing from '../assets/Images/black-king.png';
import blackPawn from '../assets/Images/black-pawn.png';
import whiteRook from '../assets/Images/white-rook.png';
import whiteKnight from '../assets/Images/white-knight.png';
import whiteBishop from '../assets/Images/white-bishop.png';
import whiteQueen from '../assets/Images/white-queen.png';
import whiteKing from '../assets/Images/white-king.png';
import whitePawn from '../assets/Images/white-pawn.png';

export const pieceImages = {
  "black-rook": blackRook,
  "black-knight": blackKnight,
  "black-bishop": blackBishop,
  "black-queen": blackQueen,
  "black-king": blackKing,
  "black-pawn": blackPawn,
  "white-rook": whiteRook,
  "white-knight": whiteKnight,
  "white-bishop": whiteBishop,
  "white-queen": whiteQueen,
  "white-king": whiteKing,
  "white-pawn": whitePawn,
};

export const initialGameState = () => ([
  ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
  ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
  ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
]);

export const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
