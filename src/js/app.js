$(() => {
  const $isPlaying = $('.current');
  let playerOnePlaying = true;
  const boardSize = 8*8;
  const $scoreOne = $('.score-one');
  const $scoreTwo = $('.score-two');
  const $game = $('.game');
  const $resetBtn =   $('.reset-rev');
  let $squares = null;

  function startingPieces () {
    $squares.eq(27).addClass('yellow');
    $squares.eq(28).addClass('black');
    $squares.eq(35).addClass('black');
    $squares.eq(36).addClass('yellow');
  }

  function scoreCounter() {
    $scoreOne.text( 'Player One' +' ' + $('.black').length);
    $scoreTwo.text('Player Two' +' ' + $('.yellow').length);
  }

  function startingPosition() {
    for ( let i = 0; i < boardSize; i++) {
      $game.append($('<div>').addClass('square'));
    }
    $squares = $('.square');
    startingPieces();
    scoreCounter();
    $isPlaying.text('Player 1 - Black').addClass('current-one');
  }
  startingPosition();

  function reset() {
    $squares.removeClass('black').removeClass('yellow');
    startingPieces();
    scoreCounter();
  }
  $resetBtn.on('click', reset);

  function fillsquares(e, piecesInPlay, enemyPieces, piecesCoordinates) {
    const $square = $(e.target);
    const index = $square.index();
    const piecesToTurn = [];
    let i = piecesCoordinates;

    if (piecesCoordinates === 8 || piecesCoordinates === -8) {
      while ($squares.eq(index + i).hasClass(enemyPieces)) {
        piecesToTurn.push(index + i);
        i += piecesCoordinates;
      }
    }

    while ($squares.eq(index + i).hasClass(enemyPieces) && (index + i)%8 !== 7 && (index + i)%8 !== 0) {
      piecesToTurn.push(index + i);
      i += piecesCoordinates;
    }

    const pieceFlankingEnemyPieces = piecesToTurn[piecesToTurn.length - 1] + piecesCoordinates;

    if ($squares.eq(pieceFlankingEnemyPieces).hasClass(piecesInPlay) && pieceFlankingEnemyPieces >= 0 && pieceFlankingEnemyPieces <= 63) {
      for (let i = 0; i < piecesToTurn.length; i++) {
        $square.addClass(piecesInPlay);
        $('body').find($squares).eq(piecesToTurn[i]).removeClass(enemyPieces).addClass(piecesInPlay);
        playerOnePlaying = piecesInPlay === 'black' ? false : true;
        playerOnePlaying ? $isPlaying.text('Player 1 - Black').addClass('current-one').removeClass('current-two') : $isPlaying.text('Player 2 - yellow').addClass('current-two').removeClass('current-one');
      }
    }
  }

  function turn(e) {

    const piecesInPlay = playerOnePlaying ? 'black' : 'yellow';
    const enemyPieces = playerOnePlaying ? 'yellow' : 'black';
    if ($(e.target).hasClass(piecesInPlay)  || $(e.target).hasClass(enemyPieces)) return false;
    [1,9,8,7,-1,-9,-8,-7].forEach((number) => {
      fillsquares(e, piecesInPlay, enemyPieces, number);
    });
    scoreCounter();
  }
  $squares.on('click', turn);
});
