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

  var numPiece = 1;
  //takes a board as an input argument and returns a new board with the next viable position of a piece
  var findNextViablePos = function(board, startRowIndex, startColIndex) {   
    
    //find the next position on the board traversing left->right, up->down
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
      //remove the piece from the board since it has a conflict and find the next open position
      board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      nextOpenPosition = findOpenPosition(nextOpenPosition[0], nextOpenPosition[1]);
      if (nextOpenPosition) {
        board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      }
    }

    //once a piece has been placed without a conflict, keep it on the board and find the next viable position
    if (!board.hasAnyRooksConflicts()) {
      numPiece++;
      if (numPiece < n) {
        if (nextOpenPosition) {
          findNextViablePos(board, nextOpenPosition[0], nextOpenPosition[1]);
        }
      } else {
        var solnMatrix = [];
        for (var i = 0; i < board.rows().length; i++) {
          solnMatrix.push(board.rows()[i]);
        }
        solution.push(solnMatrix);
      }
    } 
  };
        
  findNextViablePos(board, 0, 0);

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = []; //fixme

  var board = new Board({n: n});
  var numPiece = 0;
  //board.togglePiece(0, 0);
  //takes a board as an input argument and returns a new board with the next viable position of a piece
  var findNextViablePos = function(board, startRowIndex, startColIndex) {      
    //find the next position on the board traversing left->right, up->down
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


    //place a piece at the new open position on the board
      // if (nextOpenPosition) {
      //   board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      // }

      // if (!board.hasAnyRooksConflicts()) {
      //   console.log('no conflicts');
      //   numPiece++;
      //   if (numPiece < n) {
      //     if (nextOpenPosition) {
      //       findNextViablePos(board, nextOpenPosition[0], nextOpenPosition[1]);
      //     }
      //   } else {
      //     var solnMatrix = [];
      //     for (var i = 0; i < board.rows().length; i++) {
      //       solnMatrix.push(board.rows()[i]);
      //     }
      //     solution.push(solnMatrix);
      //   }
      // }
    var nextOpenPosition = findOpenPosition(startRowIndex, startColIndex);

    // if (!nextOpenPosition) { 
    //   if (!board.hasAnyRooksConflicts()) {
    //     numPiece++;
    //     if (numPiece < n) {
    //       if (nextOpenPosition) {
    //         findNextViablePos(board, nextOpenPosition[0], nextOpenPosition[1]);
    //       }
    //     } else {
    //       var solnMatrix = [];
    //       for (var i = 0; i < board.rows().length; i++) {
    //         solnMatrix.push(board.rows()[i]);
    //       }
    //       console.log(solnMatrix);
    //       solution.push(solnMatrix);
    //     }
    //   }
    // }

    //check if the placed piece has any conflicts
    while (nextOpenPosition) {
      //remove the piece from the board since it has a conflict and find the next open position
      //board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      //nextOpenPosition = findOpenPosition(nextOpenPosition[0], nextOpenPosition[1]);
      if (nextOpenPosition) {
        // turn on position
        board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
        numPiece++;
        //once a piece has been placed without a conflict, keep it on the board and find the next viable position
        if (!board.hasAnyRooksConflicts()) {
          if (numPiece < n) {
            if (nextOpenPosition) {
              findNextViablePos(board, nextOpenPosition[0], nextOpenPosition[1]);
            }
          } else {
            var solnMatrix = [];
            for (var i = 0; i < board.rows().length; i++) {
              var solnRow = [];
              for (var j = 0; j < board.rows().length; j++) {
                solnRow.push(board.rows()[i][j]);
              }
              solnMatrix.push(solnRow);
            }
            console.log(JSON.stringify(solnMatrix));
            solution.push(solnMatrix);
          }
        } 
      }
      // turn off position, find next open position
      board.togglePiece(nextOpenPosition[0], nextOpenPosition[1]);
      numPiece--;
      nextOpenPosition = findOpenPosition(nextOpenPosition[0], nextOpenPosition[1]);
    }
  };
          
  findNextViablePos(board, 0, -1);


    ///--------------

  var solutionCount = solution.length; //fixme

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
