<h1> Project - 0. Reversi Game</h1>


<p>One of our first projects at a course at General Assembly was to create a browser game using Javascript and jQuery. We were free to choose any game we wanted that was within our capabilites to create, and i came up with reversi. Reversi is a board game that was created at the end of 19th century and its objective is to have more pieces of your color on the board than your enemy. To achieve that you have to flank enemy pieces on two sides to "flip" them to your color. the game ends either when there is no space on the board, or when the player whose turn it it is has no place to put his piece.</p>

<h3>Installation</h3>

<p>Project can be accessed through cloning it with https://github.com/Foxford13/Project-0.git or by visiting my git repository at https://github.com/Foxford13/Project-0 . </p>

<p>It also requires npm i to install dependencies, and gulp to compile the source code and to open it in browser.</p>

<p>It includes technologies:</p>
<ul><li>HTML5</li>
<li>Javascript ES6</li>
<li>SCSS</li>
<li>jQuery</li>
<li>Git & github</li>
<li>Gulp</li>
<li>NPM</li></ul>


<h2> Beggining of the project</h2>

<p> One of the main chalanges was to figure out how to find the coordinates of each piece placed on the board in relation to the piece which is just about to be placed. Bear in mind that the piece cannot be placed if there arent any pieces next to it of the opposing color, and a piece behind them is not of your color. To do so i implemented a rule to find the coordinates of various pieces, that in relation to the square I want to put my piece on the script would located the pieces by adding or substracting  1 (horizontal), 8 (vertical), 9 (diagonal) and 7 (diagonal) to the index number of that square.
<p>With that in mind I created a loop that would add or substract these numbers to the index number  until a piece of color in play was found in each of those directions. If the conditions were met, the pieces in between would flip.</p>

<p>Pieces on a board before the flip. Player 1 turn (black)</p>

![Imgur](http://i.imgur.com/EBXLp7Q.png)

<p>Pieces one the board after the flip</p>

![Imgur](http://i.imgur.com/zeSLsM5.png)





<p> The biggest problem were the edges of the board, as the numerical solution didnt take into account its barries. I fixed that by simply filtering the numbers through a while loop and if statement, that if a coordinated divided by width equals 0 or 7, it wouldnt be pushed through to finalize the function. The only exception to the rule was number 8, as the pieces still can be flipped vertically by the edges).</p>

<h2>Future</h2>

There is still couple of features i would like to add. One would be announcing the winner when there is no more moves available, and another would be that the that you can flip litht up when you hover a a square where you would like to place your piece.</p>

<p>Also, the flip animation leaves a lot to be desired</p>
























