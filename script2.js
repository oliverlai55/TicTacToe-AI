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
};

//Checking to see if the square has been taken or not
TicTacToeMinMax.prototype.makeMove = function(move, player, board){
	var newBoard = this.cloneBoard(board);
	if(newBoard[move] == 0){
		newBoard[move] = player;
		return newboard;
	}else{
		return null;
	}
};

//checking to see if its the best move
TicTacToeMinMax.prototype.findMove = function(board){
	var bestMoveValue = -100;
	var move = 0;
	for (var i = 0; i < board.length; i++){
		var newBoard = this.makeMove(i, this.maxPlayer, board);
		if(newBoard){
			var predictedMoveValue = this.minValue(newBoard);
			if(predictedMoveValue > bestMoveValue){
				bestMoveValue = predictedMoveValue;
				move = i;
			}
		}
	}
	return move;
};

//this simulates as the optimal opponent, whose goal is to minimize the CPU's move score at X each depth
//the best move is then returned to the previous level, until we reach the top
TicTacToeMinMax.prototype.minValue = function(board){

	//The first 3 conditions check are the stop conditions for the loop
	if(this.checkWinner(this.maxPlayer, board)){
		return 1;
	}else if(this.checkWinner(this.minPlayer, board)){
		return -1;
	}else if(this.checkTie(board)){
		return 0;
	}else{
		var bestMoveValue = 100;
		var move = 0;
		for(var i = 0; i < board.length; i++){
			var newBoard = this.makeMove(i, this.minPlayer, board);
			if(newBoard){
				var predictedMoveValue = this.maxValue(newBoard);
				if(predictedMoveValue < bestMoveValue){
					bestMoveValue = predictedMoveValue;
					move = i;
				}
			}
		}
		return bestMoveValue;
};

//This is the same as minValue method, but this is for the CPU that tries to maximize CPU's move score. 
//The point is to pick the move that gets the best score x depth.
TicTacToeMinMax