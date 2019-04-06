test('should register a game', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  expect(await getPlayer1Title()).toBe(player1);
  expect(await getPlayer2Title()).toBe(player2);
});

test('should show "X" after first player click', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);
  expect(await getACellAt(0)).toBe('');

  await clickACellAt(0);
  expect(await getACellAt(0)).toBe('X');
});

test('should show "O" after second player click', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  await clickACellAt(0);
  await clickACellAt(1);

  expect(await getACellAt(1)).toBe('O');
});

test('"X" should win the game', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  await clickACellAt(0);
  await clickACellAt(3);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(1);
  await clickACellAt(4);
  await clickACellAt(2);
  debugger;
  expect(await getWinnerMessage()).toBe(`${player1} won!!`);
});

test('"O" should win the game', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  await clickACellAt(0);
  await clickACellAt(3);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(1);
  await clickACellAt(4);
  await clickACellAt(6);
  await clickACellAt(5);

  expect(await getWinnerMessage()).toBe(`${player2} won!!`);
});

test('Clicking occupied cell should not change state', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  await clickACellAt(0);
  await clickACellAt(0);

  expect(await getACellAt(0)).toBe('X');
});

test('Should show current player', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  expect(await getCurrentPlayerName()).toBe(player1);
});

function getCurrentPlayerName() {
  return page.$eval('[data-testid="current-player"]', el => el.innerText);
}

function getWinnerMessage() {
  return page.$eval('[data-testid="winner-message"]', el => el.innerText);
}

async function hasWinner() {
  return !!(await page.$('[data-testid="winner-message"]'));
}

function clickACellAt(index) {
  return page.$$eval('td', (tds, _index) => tds[_index].click(), index);
}

function getACellAt(index) {
  return page.$$eval('td', (tds, _index) => tds[_index].innerText, index);
}

function getPlayer2Title() {
  return page.$eval('[data-testid="player2-title"]', el => el.innerText);
}

function getPlayer1Title() {
  return page.$eval('[data-testid="player1-title"]', el => el.innerText);
}

async function newGame(player1, player2) {
  await page.type('[data-testid="player1"]', player1);
  await page.type('[data-testid="player2"]', player2);
  await page.click('[data-testid="new-game"]');
}

function navigate() {
  return page.goto('http://localhost:3000');
}
