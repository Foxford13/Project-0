console.log('woof');
$(() => {
  console.log('asasa');

  const $boxes = $('.box');
  const $isPlaying = $('.current');
  let playerOnePlaying = true;
  var myArray = new Array();

  $isPlaying.text('Player 1');

  $('.box').each(function(i) {
    $(this).text(i);

  });

  $boxes.each(arrayOfSquares);

  function arrayOfSquares(index, box) {
    if ($(box).hasClass('black')) {
      myArray.push('black');
    }else if ($(box).hasClass('yellow')) {
      myArray.push('yellow');
    } else {
      myArray.push(undefined);
    }
  }

  function alternateMatches(e){
    myArray = new Array();
    if(playerOnePlaying){
      $(e.target).addClass('black');
      playerOnePlaying = false;
      $isPlaying.text('Player 2');
      console.log(playerOnePlaying);
    } else if(!playerOnePlaying){
      $(e.target).addClass('yellow');
      playerOnePlaying = true;
      console.log(playerOnePlaying);
      $isPlaying.text('Player 1');
    }
    $boxes.each(arrayOfSquares);
    console.log(myArray);
  }
  $boxes.one('click', alternateMatches);


});
