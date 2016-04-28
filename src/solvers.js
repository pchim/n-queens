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

var findAllRookSolutions = function(currentN) {
  // console.log('n= ' + currentN);
  var newSolutions = [];

  // if (currentN < 1) {
  //   currentN = 1;
  // }
  // get the solutions for the n-1 case
  if (currentN > 1) {
    var previousSolns = findAllRookSolutions(currentN - 1);
  } else if (currentN === 1) { 
    return [[[1]]];
  } else {
    // alert('n must be a positive integer');
    return [0];
  }

  //make a row of length n with the last position filled
  var newRow = [];
  for (var i = 0; i < currentN; i++) {
    newRow.push(0);
  }
  newRow[newRow.length - 1] = 1;

  //iterate through each solution for n-1 rooks
  for (var i = 0; i < previousSolns.length; i++) {
    //iterate through each row of a single previous solution
    for (var j = 0; j < previousSolns[i].length; j++) {
      //add an empty position to the end of each row
      //console.log(previousSolns[i]);
      previousSolns[i][j].push(0);
    }
  }

  //row swap the new row with each row of the existing solutions
  for (var i = 0; i < previousSolns.length; i++) {
    //line swap with each row of an old solution 
    var oneSolution = previousSolns[i];
    for (var j = 0; j < currentN; j++) {
      //console.log(j, ' ', previousSolns[i].length);
      var newSolution = JSON.parse(JSON.stringify(oneSolution));
      newSolution.splice(j, 0, JSON.parse(JSON.stringify(newRow)));
      //console.log('previous solution = ', JSON.stringify(previousSolns));
      //console.log('new solution = ', JSON.stringify(newSolution));
      newSolutions.push(newSolution); 
    }
  }

  // newSolutions.forEach(function(element) {
  //   console.log(JSON.stringify(element) + '\n');
  // });

  return newSolutions;
};

window.countNRooksSolutions = function(n) {
  
  var solution = [];

  solution = findAllRookSolutions(n);
  var solutionCount = solution.length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solution = [];
//   var board = new Board({n: n});
//   var numPiece = 0;
//   var availableRows = _.range(n); // [0, 1, 2, ...n]
//   var availableCols = _.range(n); // [0, 1, 2, ...n]
  
//   //takes a board as an input argument and returns a new board with the next viable position of a piece
//   var findNextViablePos = function(board, startRowIndex, startColIndex) {      
//     //find the next position on the board traversing left->right, up->down
//     var findOpenPosition = function(startRowIndex, startColIndex) {
//       var positionAvailable = false;

//       while (!positionAvailable) {
//         if (startColIndex < n) {
//           startColIndex++; 
//         } else if (startRowIndex < n) {
//           startRowIndex++;
//           startColIndex = 0;
//         } else {
//           return null;
//         }
        
//         if (_.indexOf(availableRows, startRowIndex) !== -1 && _.indexOf(availableCols, startColIndex) !== -1) {
//           positionAvailable = true;
//           return {row: startRowIndex, col: startColIndex};
//         }
//       }
//     };

//     var nextOpenPosition = findOpenPosition(startRowIndex, startColIndex);
//     //check if the placed piece has any conflicts
//     while (nextOpenPosition) {
//       // turn on position
//       board.togglePiece(nextOpenPosition.row, nextOpenPosition.col);
//       numPiece++;
//       //remove that piece's rows and cols from available positions
//       availableRows.splice(_.indexOf(availableRows, nextOpenPosition.row), 1);
//       availableCols.splice(_.indexOf(availableCols, nextOpenPosition.col), 1);

//       //once a piece has been placed without a conflict, keep it on the board and find the next viable position
//       // if (!board.hasAnyRooksConflicts()) {
//         if (numPiece < n) {
//           findNextViablePos(board, nextOpenPosition.row);
//         } else {
//           var solnMatrix = Array.prototype.slice.call(board.rows());
//           //console.log(JSON.stringify(solnMatrix));
//           solution.push(solnMatrix);
//         }
//       // } 
    
//       // turn off position, find next open position
//       board.togglePiece(nextOpenPosition.row, nextOpenPosition.col);
//       availableRows.push(nextOpenPosition.row);
//       availableCols.push(nextOpenPosition.col);
//       numPiece--;
//       nextOpenPosition = findOpenPosition(nextOpenPosition.row, nextOpenPosition.col);
//     }
//   };
          
//   findNextViablePos(board, 0, -1);


//     ///--------------

//   var solutionCount = solution.length; //fixme

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

// // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  //iterates over the solutions from findAllRooks to further isolate the subset of viable queens
  var solutions = findAllRookSolutions(n);
  var i = 0;
  // initialize an empty board as default 'solution' for cases when no solution is found (i.e. 2, 3)
  var solution = new Board({n: n});
  //calculates the number of pieces placed on an empty board
  var numPieces = function() {
    return _.reduce(solution.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0); 
  }; 

  //iterate over the rook solutions to find one that also satisfies a board of queens (no diagonal conflicts)
    var oneSolution = new Board(solutions[i]);

    if (!oneSolution.hasAnyMajorDiagonalConflicts() && !oneSolution.hasAnyMinorDiagonalConflicts()) {
      solution = oneSolution;
    }

    i++;
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var numPiece = 0;
  var availableRows = _.range(n); // [0, 1, 2, ...n]
  var availableCols = _.range(n); // [0, 1, 2, ...n]
  var availableMajDiags = _.range(-(n - 1), n);
  var availableMinDiags = _.range(2 * n - 1);
  
  //takes a board as an input argument and returns a new board with the next viable position of a piece
  var findNextViablePos = function(board, startRowIndex, startColIndex) {      
    //find the next position on the board traversing left->right, up->down
    var findOpenPosition = function(startRowIndex, startColIndex) {
      var positionAvailable = false;

      while (!positionAvailable) {
        if (startColIndex < n) {
          startColIndex++; 
        } else if (startRowIndex < n) {
          startRowIndex++;
          startColIndex = 0;
        } else {
          return null;
        }
        
        if (_.indexOf(availableRows, startRowIndex) !== -1 && _.indexOf(availableCols, startColIndex) !== -1) {
          if (_.indexOf(availableMajDiags, startColIndex - startRowIndex) !== -1 && _.indexOf(availableMinDiags, startColIndex + startRowIndex) !== -1) {
            positionAvailable = true;
            return {row: startRowIndex, col: startColIndex};
          }
        }
      }
    };

    var nextOpenPosition = findOpenPosition(startRowIndex, startColIndex);
    //check if the placed piece has any conflicts
    while (nextOpenPosition) {
      // turn on position
      board.togglePiece(nextOpenPosition.row, nextOpenPosition.col);
      numPiece++;
      //make that piece's rows, cols and diagonals unavailable
      availableRows.splice(_.indexOf(availableRows, nextOpenPosition.row), 1);
      availableCols.splice(_.indexOf(availableCols, nextOpenPosition.col), 1);
      availableMajDiags.splice(_.indexOf(availableMajDiags, nextOpenPosition.col - nextOpenPosition.row), 1);
      availableMinDiags.splice(_.indexOf(availableMinDiags, nextOpenPosition.col + nextOpenPosition.row), 1);

      //once a piece has been placed without a conflict, keep it on the board and find the next viable position
      // if (!board.hasAnyRooksConflicts()) {
        if (numPiece < n) {
          findNextViablePos(board, nextOpenPosition.row);
        } else {
          var solnMatrix = Array.prototype.slice.call(board.rows());
          //console.log(JSON.stringify(solnMatrix));
          solution.push(solnMatrix);
        }
      // } 
    
      // turn off position, make that positions rows, cols, and diags available again, and find next open position
      board.togglePiece(nextOpenPosition.row, nextOpenPosition.col);
      availableRows.push(nextOpenPosition.row);
      availableCols.push(nextOpenPosition.col);
      availableMajDiags.push(nextOpenPosition.col - nextOpenPosition.row);
      availableMinDiags.push(nextOpenPosition.col + nextOpenPosition.row);
      numPiece--;
      nextOpenPosition = findOpenPosition(nextOpenPosition.row, nextOpenPosition.col);
    }
  };
          
  findNextViablePos(board, 0, -1);


    ///--------------

  //zero factorial equals one solution because reasons..
  if (n === 0) {
    solution = [[0]];
  }
  
  var solutionCount = solution.length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  
  return solutionCount;
};
  // ------------------------------------------------
  // var solutions = findAllRookSolutions(n);
  // var i = 0;
  // var solution = [];

  // for (var i = 0; i < solutions.length; i++) {
  //   var oneSolution = new Board(solutions[i]);

  //   if (!oneSolution.hasAnyMajorDiagonalConflicts() && !oneSolution.hasAnyMinorDiagonalConflicts()) {
  //     solution.push(oneSolution);
  //   }
  // }

  // var solutionCount = solution.length;

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
//};
