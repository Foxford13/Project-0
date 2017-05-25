var rev = rev || {};
rev.startingPieces = function startingPieces () {
  this.$squares.eq(27).addClass('yellow-piece');
  this.$squares.eq(28).addClass('black-piece');
  this.$squares.eq(35).addClass('black-piece');
  this.$squares.eq(36).addClass('yellow-piece');
};

rev.scoreCounter = function scoreCounter() {
  this.$scoreOne.text( 'Player One' +' ' + $('.black-piece').length);
  this.$scoreTwo.text('Player Two' +' ' + $('.yellow-piece').length);
};

rev.startingPosition = function startingPosition() {
  for ( let i = 0; i < rev.boardSize; i++) {
    this.$game.append($('<div>').addClass('square').append($('<div>').addClass('inner')));

  }
  this.$squares = $('.square');
  this.startingPieces();
  this.scoreCounter();
  this.$isPlaying.text('Player 1 - black').addClass('current-one');


};



rev.reset = function reset() {
  rev.$squares.removeClass('black-piece').removeClass('yellow-piece');
  rev.startingPieces();
  rev.scoreCounter();
};

rev.flipPieces =  function flipPieces(e, piecesInPlay, enemyPieces, piecesCoordinates) {
  const $targetSquare = $(e.target);
  const indexOfTarget = $targetSquare.index();
  const piecesToTurn = [];
  let i = piecesCoordinates;

  if (piecesCoordinates === 8 || piecesCoordinates === -8) {
    while (rev.$squares.eq(indexOfTarget + i).hasClass(enemyPieces)) {
      piecesToTurn.push(indexOfTarget + i);
      i += piecesCoordinates;
    }
  }

  while (rev.$squares.eq(indexOfTarget + i).hasClass(enemyPieces) && (indexOfTarget + i)%8 !== 7 && (indexOfTarget + i)%8 !== 0) {
    piecesToTurn.push(indexOfTarget + i);
    i += piecesCoordinates;
  }


  const pieceFlankingEnemyPieces = piecesToTurn[piecesToTurn.length - 1] + piecesCoordinates;

  if (rev.$squares.eq(pieceFlankingEnemyPieces).hasClass(piecesInPlay) && pieceFlankingEnemyPieces >= 0 && pieceFlankingEnemyPieces <= 63) {
    for (let i = 0; i < piecesToTurn.length; i++) {
      $targetSquare.addClass(piecesInPlay);
      $('body').find(rev.$squares).eq(piecesToTurn[i]).removeClass(enemyPieces).addClass(piecesInPlay);
      this.playerOnePlaying = piecesInPlay === 'black-piece' ? false : true;
      this.playerOnePlaying ? this.$isPlaying.text('Player 1 - black').addClass('current-one').removeClass('current-two') : this.$isPlaying.text('Player 2 - yellow').addClass('current-two').removeClass('current-one');
      this.$moveA.play();
    }
  }
};

rev.flip = function flip(e) {
  const piecesInPlay = rev.playerOnePlaying ? 'black-piece' : 'yellow-piece';
  const enemyPieces = rev.playerOnePlaying ? 'yellow-piece' : 'black-piece';

  if ($(e.target).hasClass(piecesInPlay)  || $(e.target).hasClass(enemyPieces)) return false;
  [1,9,8,7,-1,-9,-8,-7].forEach((number) => {
    this.flipPieces(e, piecesInPlay, enemyPieces, number);
  });
  this.scoreCounter();
};

rev.setup  = function setup() {
  rev.$isPlaying = $('.current');
  rev.playerOnePlaying = true;
  rev.boardSize = 8*8;
  rev.$scoreOne = $('.score-one');
  rev.$scoreTwo = $('.score-two');
  rev.$game = $('.game');
  rev.$resetBtn =   $('.reset-rev');
  rev.$squares = null;
  rev.$moveA = $('#move-sound')[0];
  rev.$resetBtn.on('click', rev.reset);
  rev.startingPosition();

  rev.$squares.on('click', rev.flip.bind(rev));
};
$(rev.setup.bind(rev));
