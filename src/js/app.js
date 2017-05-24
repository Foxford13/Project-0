$(() => {
  const $isPlaying = $('.current');
  let playerOnePlaying = true;
  const boardSize = 64;
  $isPlaying.text('Player 1 - Black').addClass('current-one');
  const $scoreOne = $('.score-one');
  const $scoreTwo = $('.score-two');
  const $game = $('.game');
  const $resetBtn =   $('.reset-rev');
  let $boxes = null;

  function startingPieces () {
    $boxes.eq(27).addClass('yellow');
    $boxes.eq(28).addClass('black');
    $boxes.eq(35).addClass('black');
    $boxes.eq(36).addClass('yellow');
  }

  function scoreCounter() {
    $scoreOne.text( 'Player One' +' ' + $('.black').length);
    $scoreTwo.text('Player Two' +' ' + $('.yellow').length);
  }

  function startingPosition() {
    for ( let i = 0; i < boardSize; i++) {
      $game.append($('<div>').addClass('box'));
    }
    $boxes = $('.box');
    startingPieces();
    scoreCounter();
  }
  startingPosition();

  function reset() {
    $boxes.removeClass('black').removeClass('yellow');
    startingPieces();
    scoreCounter();
  }
  $resetBtn.on('click', reset);

  function fillBoxes(e, classToAdd, classToRemove, boxNumber) {
    const $square = $(e.target);
    const index = $square.index();
    const squaresToTurn = [];
    let i = boxNumber;

    let j = 8;
    let k = -8;
    if (boxNumber === 8) {
      while ($boxes.eq(index + j).hasClass(classToRemove)) {
        squaresToTurn.push(index + j);
        j += 8;
      }
    } else if (boxNumber === - 8) {
      while ($boxes.eq(index + k).hasClass(classToRemove)) {

        squaresToTurn.push(index + k);
        k -= 8;
      }
    }

    while ($boxes.eq(index + i).hasClass(classToRemove) && (index + i)%8 !== 7 && (index + i)%8 !== 0) {
      squaresToTurn.push(index + i);
      i += boxNumber;
    }

    const lastFilledDivInASequence = squaresToTurn[squaresToTurn.length - 1] + boxNumber;

    if ($boxes.eq(lastFilledDivInASequence).hasClass(classToAdd) && lastFilledDivInASequence >= 0 && lastFilledDivInASequence <= 63) {
      for (let i = 0; i < squaresToTurn.length; i++) {
        $square.addClass(classToAdd);
        $('body').find($boxes).eq(squaresToTurn[i]).removeClass(classToRemove).addClass(classToAdd);
        playerOnePlaying = classToAdd === 'black' ? false : true;
        playerOnePlaying ? $isPlaying.text('Player 1 - Black').addClass('current-one').removeClass('current-two') : $isPlaying.text('Player 2 - yellow').addClass('current-two').removeClass('current-one');
      }
    }
  }


  function turn(e) {

    const classToAdd = playerOnePlaying ? 'black' : 'yellow';
    const classToRemove = playerOnePlaying ? 'yellow' : 'black';
    if ($(e.target).hasClass(classToAdd)  || $(e.target).hasClass(classToRemove)) return false;
    [1,9,8,7,-1,-9,-8,-7].forEach((number) => {
      fillBoxes(e, classToAdd, classToRemove, number);
    });
    scoreCounter();
  }
  $boxes.on('click', turn);
});
