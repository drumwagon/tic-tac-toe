
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];  

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var endGame = function () {
  $('#board').fadeOut(1500);
  $('#restart').fadeIn(1800);
  $('h3').text("That was a great game!");
}

$('#restart').on('click', function (e) {
      $(document).load();
    });

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2] //top row
    || spaces[3] === spaces[4] && spaces[4] === spaces[5] //middle row
    || spaces[6] === spaces[7] && spaces[7] === spaces[8] //bottom row
    || spaces[0] === spaces[3] && spaces[3] === spaces[6] //1st column
    || spaces[1] === spaces[4] && spaces[4] === spaces[7] //2nd column
    || spaces[2] === spaces[5] && spaces[5] === spaces[8] //3rd column
    || spaces[0] === spaces[4] && spaces[4] === spaces[8] //top-left diag
    || spaces[2] === spaces[4] && spaces[4] === spaces[6] //top-right diag
    
    // TODO: Check for rest of game winning cases
  )
  {
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
    }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Mark the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  if (spaces[spaceNum]){
    alert("That space has been taken! Please try again");
  } else { 
    spaces[spaceNum] = currentPlayer;
  // Add class to elem so css can take care of the visuals
  $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

  checkForWinner();
  setNextTurn();
  }
});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(winner + " won the game!");
  return endGame();
});

$(document).on('click', '#restart', function(){
  location.reload();
})

// Start the game
setNextTurn();

