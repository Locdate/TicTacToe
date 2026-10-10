var board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var gameOver = false;
var scoreX = 0;
var scoreO = 0;
var scoreDraw = 0;

var winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  $('#board').empty();
  for (var i = 0; i < 9; i++) {
    $('#board').append('<div class="cell" data-index="' + i + '"></div>');
  }
}

function checkWinner() {
  for (var i = 0; i < winLines.length; i++) {
    var a = winLines[i][0];
    var b = winLines[i][1];
    var c = winLines[i][2];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return winLines[i];
    }
  }
  return null;
}

function isDraw() {
  for (var i = 0; i < board.length; i++) {
    if (board[i] === '') {
      return false;
    }
  }
  return true;
}

function updateScore() {
  $('#scoreX').text(scoreX);
  $('#scoreO').text(scoreO);
  $('#scoreDraw').text(scoreDraw);
}

function startNewGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  createBoard();
  $('#status').text('Ходит: X');
}

$(document).ready(function () {
  createBoard();

  $('#board').on('click', '.cell', function () {
    var index = $(this).data('index');

    if (gameOver) {
      return;
    }
    if (board[index] !== '') {
      return;
    }

    board[index] = currentPlayer;
    $(this).text(currentPlayer).addClass(currentPlayer).addClass('taken');

    var winLine = checkWinner();

    if (winLine) {
      gameOver = true;
      for (var i = 0; i < winLine.length; i++) {
        $('.cell').eq(winLine[i]).addClass('win');
      }
      $('#status').text('Победил: ' + currentPlayer + '!');
      if (currentPlayer === 'X') {
        scoreX++;
      } else {
        scoreO++;
      }
      updateScore();
      return;
    }

    if (isDraw()) {
      gameOver = true;
      $('#status').text('Ничья!');
      scoreDraw++;
      updateScore();
      return;
    }

    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    $('#status').text('Ходит: ' + currentPlayer);
  });

  $('#newGame').on('click', function () {
    startNewGame();
  });

  $('#resetScore').on('click', function () {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;
    updateScore();
    startNewGame();
  });
});
