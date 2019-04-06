export const GAME_STATUS = {
  player1: 'X',
  player2: 'O',
  tie: '-'
};

export function gameStatus(board) {
  if (isGameOver(board, GAME_STATUS.player1)) {
    return GAME_STATUS.player1;
  }

  if (isGameOver(board, GAME_STATUS.player2)) {
    return GAME_STATUS.player2;
  }

  if (board.every(r => r.every(c => c !== ''))) {
    return GAME_STATUS.tie;
  }
}

export function isGameOver(board, symbol) {
  const columns = board.reduce(
    (acc, r) => r.map((c, cIdx) => [...(acc[cIdx] || []), c]),
    []
  );

  if (
    board.some(r => r.every(c => c === symbol)) ||
    columns.some(r => r.every(c => c === symbol)) ||
    board.every((_, i) => board[i][i] === symbol) ||
    board.every((_, i) => board[i][board.length - 1] === symbol)
  ) {
    return true;
  }

  return false;
}
