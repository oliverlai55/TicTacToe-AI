var TicTacToeMinMax = function(){
	this.minPlayer = 1;
	this.maxPlayer = 2;
};

//1 for X, 2 for O. CPU is player 2.  Assigning player 2 is max, in order for CPU to try to win

TicTacToeMinMax.prototype.setMinMaxPlayers = function(maxPlayer, minPlayer){
	this.minPlayer = minPlayer;
	this.maxPlayer = maxPlayer;
};

//Cloning a board so that each moves is made based on a new unique board
TicTacToeMinMax.prototype.cloneBoard = function(board){
	return board.slice(0);
};

//Checking all winning combination
TicTacToeMinMax.prototype.checkWinner = function(player, board){
	if(
		(board[0] == player && board [1] == player && board[2] == player) ||
		(board[3] == player && board [4] == player && board[5] == player) ||
		(board[6] == player && board [7] == player && board[8] == player) ||
		(board[0] == player && board [3] == player && board[6] == player) ||
		(board[1] == player && board [4] == player && board[7] == player) ||
		(board[2] == player && board [5] == player && board[8] == player) ||
		(board[0] == player && board [4] == player && board[8] == player) ||
		(board[2] == player && board [4] == player && board[6] == player)
		){
		return true;
	}else{
		return false;
	}
};

//Checking all Ties
TicTacToeMinMax.prototype.checkTie = function(board){
	for(i = 0;i< board.length; i++){
		if (board[i] == 0){
			return false;
		}
	}
	return true;
}