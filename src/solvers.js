/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme

  var board = new Board({n: n});
  board.togglePiece(0, 0);

  //takes a board as an input argument and returns a new board with the next viable position of a piece
  var findNextViablePos = function(board, startRowIndex, startColIndex) {   
    var numPiece = 1;

    var findOpenPosition = function(startRowIndex, startColIndex) {
      //if next open position is the spot to the right of the current position
      if (startColIndex + 1 < n) {
        return [startRowIndex, startColIndex + 1];
      //if the next spot is on a new line but within the 
      } else if (startRowIndex + 1 < n) {
        return [startRowIndex + 1, 0];
      //otherwise, the end of the board has been reached
      } else {
        return null;
      }
    };

    var nextOpenPosition = findOpenPosition(startRowIndex, startColIndex);
    //place a piece at the new open position on the board
    if (nextOpenPosition) {
      board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
    }

    //check if the placed piece has any conflicts
    while (board.hasAnyRooksConflicts() && nextOpenPosition) {
      board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      nextOpenPosition = findOpenPosition(nextOpenPosition[0], nextOpenPosition[1]);
      if (nextOpenPosition) {
        board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      }
    }

      //if there is a conflict
        //toggle newly added piece off and find the next position
      //if there are no conflicts
        //find next position with modified board
    if (!board.hasAnyRooksConflicts()) {
      numPiece++;
      if (numPiece < n) {
        if (nextOpenPosition) {
          findNextViablePos(board, nextOpenPosition[0], nextOpenPosition[1]);
        }
      } else {
        var solnMatrix = [];
        console.log(board);
        for (var i = 0; i < board.rows().length; i++) {
          solnMatrix.push(board.rows()[i]);
        }
        console.log(solnMatrix);        
        solution.push(solnMatrix);
      }
    }

    // call function on board1 to add another piece
    // iterate thru each position on the board (starting at position after piece just placed)
      // if no conflict
        // if nth rook placed
          // return final board
        // otherwise
          // make recursive call with new partial solution board

      // if there is a conflict
        //move on to next position
      
  };
        
  findNextViablePos(board, 0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
