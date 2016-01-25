$(document).ready(function(){




var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

$('td').click(function() {
  // No move allowed if there is already a winner.
  if (winner(board) != 0) return;

  // The move is a number from 0 to 9, equal to (column + (3 * row))
  var move = $(this).prevAll().length + 3 * $(this).parent().prevAll().length;
  if (board[move] != 0) return;
  board[move] = 1;
  $(this).html('X');
  if (winner(board) != 0) return;

  // Compute a computer response after a tiny delay.
  setTimeout(function() {
    var response = score(board, -1, 7).move;
    if (response == null) return;
    board[response] = -1;
    setTimeout(function() { $('#game td').eq(response).html('O'); }, 500);
  }, 0);
});

// Returns the best move for the player and who we think will win as an
// object:  { move: (the move), win: (expected winner) }.
function score(board, player, depth) {
  var w = winner(board);
  if (w != 0 || depth == 0) {
    return {move: null, win: w};  // Just report the winner without a move.
  }
  var wins = {'-1': [], '0': [], '1': []};
  for (var j = 0; j < 9; j++) {
    if (board[j] == 0) {
      // What if we move at spot #j - what will the other player want to do?
      var copy = board.slice(0);
      copy[j] = player;
      var t = score(copy, -player, depth - 1);
      wins[t.win].push({move: j, win: t.win});
    }
  }

  // Pick a move with the best results for this player.
  // A win is better than a tie is better than a loss.
  var preference = [player, 0, -player];
  for (var j = 0; j < preference.length; j++) {
    if (wins[preference[j]].length) return pickrandom(wins[preference[j]]);
  }
  return {move: null, win: 0};  // Null move if nothing is legal.
}

var lines = [                        // Tic Tac Toe Three In a Row rules:
  {start: [0, 3, 6], increment: 1},  // three rows (each space is 1 apart)
  {start: [0, 1, 2], increment: 3},  // three columns (increment 3)
  {start: [0],       increment: 4},  // diagonal nw-se (increment 4)
  {start: [2],       increment: 2}   // diagonal ne-sw (increment 2)
  ];

// Returns the player that has a three-in-a-row found on the board,
// 1 for X, -1 for O, and zero for a draw.
function winner(board) {
  for (var j = 0; j < lines.length; j++) {
    for (var k = 0; k < lines[j].start.length; k++) {
      var index = lines[j].start[k];
      var player = board[index];
      
      for (var m = 0; player != 0 && m < 2; m++) {
        index += lines[j].increment;
        if (player != board[index]) player = 0;
      }
      if (player != 0) return player;

    }
  }
  return 0;

}

function pickrandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}




});