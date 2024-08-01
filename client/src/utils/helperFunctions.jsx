export const modified_movelist = (moveList, chunksize) => {
    const result = [];
    for (let i = 0; i < moveList.length; i += chunksize) {
      result.push(moveList.slice(i, i + chunksize));
    }
    return result;
};

export const getBoardForRole = (board,role) => {
    if (role === "black") {
        return board.slice().reverse().map(row => row.slice().reverse());
    }
    return board;
}