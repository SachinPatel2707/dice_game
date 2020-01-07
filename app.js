<<<<<<< HEAD
var scores, roundScore, activePlayer, gamePlaying, dice, prev_dice;
=======
>>>>>>> bdcd9a6cb670d2310f5499ed7dbe3df09a53c890

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    // generate random number
    dice = Math.floor(Math.random()*6 + 1);

    // display respective dice image
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    // check for 2 simultaneous sixes
    if ((dice === prev_dice) && (dice === 6)) {

      // set global score of activePlayer and roundScore to 0
      scores[activePlayer] = 0;
      roundScore = 0;

      // update the UI
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

      // switch players
      nextPlayer();

      return;
    }

    // update roundScore until we get a 1
    if (dice !== 1) {
      // add to roundScore
      roundScore += dice;
      prev_dice = dice;

      // update it in UI
      document.getElementById('current-' + activePlayer).textContent = roundScore;

    } else {
      // switch activePlayer
      nextPlayer();

      // set roundScore as 0
      roundScore = 0;
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // update global score
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if the player won
    if (scores[activePlayer] >= 20) {
      document.querySelector('.dice').style.display = 'none';
      document.getElementById('current-' + activePlayer).textContent = '0';
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // change the active player
      nextPlayer();
    }
  }
});

// initialise a new game upon hitting new game button
document.querySelector('.btn-new').addEventListener('click', init);

// this function switches the current activePlayer
function nextPlayer() {
  // switch activePlayer
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  // set current scores to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // hide the dice
  document.querySelector('.dice').style.display = 'none';

  // toggle active class in css
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

// this function initialises a new game
function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  prev_dice = 0;

  // document.querySelector('#current-' + activePlayer).textContent = dice;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}
