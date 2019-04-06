import { gameStatus } from './gameService';

['X', 'O'].forEach(symbol => {
  const emptyRow = ['', '', ''];

  test(`${symbol} should win when row match`, () => {
    const board = [emptyRow, [symbol, symbol, symbol], emptyRow];
    expect(gameStatus(board)).toBe(symbol);
  });

  test(`${symbol} should win when col match`, () => {
    const board = [[symbol, '', ''], [symbol, '', ''], [symbol, '', '']];
    expect(gameStatus(board)).toBe(symbol);
  });

  test(`${symbol} should win when diagnal match`, () => {
    const board = [[symbol, '', ''], ['', symbol, ''], ['', '', symbol]];
    expect(gameStatus(board)).toBe(symbol);
  });
});

test(`Should be a tie`, () => {
  const board = [['X', 'Y', 'X'], ['Y', 'X', 'Y'], ['Y', 'X', 'Y']];
  expect(gameStatus(board)).toBe('-');
});
