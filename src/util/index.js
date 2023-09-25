/**
 * @description 判断当前状态下的格子是否已经出现了胜者
 *
 * @param {*} squares 格子状态
 *
 * @returns
 */
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const winnerResult = { winner: "", coordinate: [] };
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winnerResult.winner = squares[a];
        winnerResult.coordinate = [...winnerResult.coordinate, ...lines[i]];
      }
    }
  
    if (winnerResult.winner) {
      return winnerResult;
    }
  
    return null;
  }
  
  export { calculateWinner };
  