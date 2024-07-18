import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  roomID : {
    type : String,
    required : true,
    unique : true
  },
  players:[{
    userID: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['white', 'black'],
      required: true
    }
  }],
  state : {
    board : {
        type: [[String]],
        required : true,
        default : () => {[
          ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
          ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
          ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
         ]
        }
    },
    turn : {
        type: String,
        enum : ['white','black'],
        required : true,
        default : 'white'
    },
    timers : {
        white:{
            type: Number,
            required:true,
            default:600000
        },
        black:{
            type: Number,
            required:true,
            default:600000
        }
    },
    moveList : {
      type: Array,
      required : true,
      default : []
    },
    currentMoveIndex : {
      type : Number,
      required : true,
      default : -1
    },
    lastMoveTime : {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  isAvailableForRandom : {
    type: Boolean,
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
