/* 
# Implement Game of Connect Four. 

We’d like you to design a simple program to play a two person game of connect 4.  Connect 4 is a two-player game (http://www.ludoteka.com/connect-4.html) in which the players take turns dropping discs — matched to each player — from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of 4 of your own discs.

Your implementation should have a main interface that takes one parameter, an array of integers representing the alternating plays for players one and two and that returns 1 if player one wins, 2 if player 2 wins, and 0 if no one wins (either a draw or an incomplete game).

For example, if the input was [1,2,1,3,1,4,1] then player 1 has a vertical connect four in the first column, so the method should return 1 and input [2,1,3,1,4,1,6,1] should return 2.

An example interface in Ruby might look something like:

```ruby
winner = ConnectFour.new.play_game([1,2,1,3,1,4,1])
puts "#{(winner == 1) ? '' : 'in'}correct winner: #{winner}"
```

Please use the language of your choice to implement. 

We ask that you not search for solutions. Searching for information around standard library functions and other language level information however is fine and encouraged. Feel free to let the candidate use the technical references for their language of choice. Here are some for reference.
* Java - https://docs.oracle.com/javase/8/docs/api/
* Ruby - http://ruby-doc.org/
* Python - https://docs.python.org/3/library/index.html
* Javascript - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

Please keep a particular eye on:
* Correctness. We will have test cases that are not given as examples.
* Selection of the appropriate data structures.
* Efficient implementation of the key algorithms.
* Class structure and code organization.
 */

//const _ = require('lodash');


class ConnectFour {
  constructor() {
    this.grid = [[], [], [], [], [], [], []];
  }
}

let game1 = new ConnectFour();
game1.play(1); // player 1
game1.play(3); // player 2
// once a win happens, prevent further play...


function playGame(turns = []) {
  const winScenarioCount = 4;
  const rows = 6;
  // 7 columns
  const grid = [[], [], [], [], [], [], []];
  let playerTurn = 1;
  let winnerPlayer = 1;
  
  
  // loop through and drop in "plays" into columns
  for (let turn of turns) {
    grid[turn-1].push(playerTurn);
    playerTurn = playerTurn === 1 ? 2 : 1;
  }
  
  console.log(grid);
  
  // check for vertical
  for (let column of grid) {
    let countOfPrevious = 0;
    let previousPlay;
    
    for (let columnPlay of column) {
      if (
        typeof previousPlay === 'undefined' || 
        previousPlay === columnPlay
      ) {
        countOfPrevious++;
      } else {
        previousPlay = columnPlay;
        countOfPrevious = 0;
      }
      
      // check for win
      if (countOfPrevious === winScenarioCount) {
        return columnPlay;
      }
    }
  }
  
  // check for horizontal wins
  for (let currentRow = 0; currentRow < rows; currentRow++) {
    let countOfPrevious = 0;
    let previousPlay;
    
    for (let column of grid) {
      if (column[currentRow]) {
        if (
          typeof previousPlay === 'undefined' || 
          previousPlay === column[currentRow]
        ) {
          countOfPrevious++;
        } else {
          countOfPrevious = 0;
        }
        previousPlay = column[currentRow];
      } else {
        previousPlay = undefined;
        countOfPrevious = 0; 
      }
      
      // check for win
      if (countOfPrevious === winScenarioCount) {
        return column[currentRow];
      }
    }
  }
  
  // diagonal...
  

  
  // @todo - prevent overflow from a column
}

console.assert(playGame([1,2,1,3,1,4,1]) === 1);
console.assert(playGame([2,1,3,1,4,1,6,1]) === 2);

console.assert(playGame([2,2,3,3,4,4,5]) === 1);
console.assert(playGame([2,2,3,3,4,4,4,5,1,5]) === 1);
console.assert(playGame([2,2,3,3,4,4,4,5,7,5]) === 2);
//console.assert(playGame([2,1,3,1,4,1,6,1]) === 2);









