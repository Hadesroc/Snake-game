console.log("Hey good job reading this press + or h to add to your length");

//game board data
var characters = {
	0: " ",
	1: "#",
	3: "+",
};

function story() {
var story= window.open("story.html", "Snakey", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
    story.document.write("<p>This snakes name is snakey. He is a very cool snake. Once he ate a chameleon and he learned to change color. He also gained the ability to eat apples. But his friend also learned to eat apples, so now snakey must travel around this little square eating more apples than his friend. You are welcome. You may now go play your game.</p>");
}
// variables
var sound = false;
var speed = 120;
var eat = new Audio('laugh1.mp3');
var fail = new Audio('fail.mp3');
var error = new Audio('error.mp3');
var goat = new Audio('Goat.mp3');
var air = new Audio('Air.mp3');

//var img = document.getElementById('apple.bmp');
//canvas size
var length = 55;
var height = 30;

function safePlay(soundclip) {
	if (sound) {
		soundclip.play()
	}
}

//make snake
var snake = {
	size: 1,
	positions: [
		{x: 1, y: 5},
	],
	direction:"right",
	dead: false,
	onSquare: function (x, y) {
		//Loop and ask if any of my positions are here 
		for (var i = 0; i < snake.positions.length; i += 1) {
			if (snake.positions[i].x == x && snake.positions[i].y == y) {
				return true;
			}
		}
		return false;
	}
};


//make apple
var apple = {
  x: 3,
  y: 5,
  randomize: function () {
    apple.x = (Math.floor(Math.random() * (length-2)) +1) % length;
    apple.y = (Math.floor(Math.random() * (height-2)) +1) % height;
  },
  onSquare: function (x, y) {
    return x == apple.x && y == apple.y;
  }
};

score = localStorage.getItem('score');
	
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


//make a game board
//55 long
//30 tall
var game = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];



//get game board
var output = document.getElementById("gameboard");
var scorelabel = document.getElementById("scorelabel");
var high = document.getElementById("scores");



//set up reset
function reset() {
  if (!snake.dead) {
    return;
  }

  snake.dead = false;
  snake.positions = [
	{x: 1, y: 5}
  ];
  snake.direction= "right";
  snake.size = 1;
  apple.x = 3;
  apple.y = 5;
};

//set up keyboard

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keycode ||evt.which;
  var charStr = String.fromCharCode(charCode);
  if(charCode === 100) {
    snake.direction = "left";
  } else if (charCode === 104) { 
    snake.direction = "up";
  } else if (charCode === 103) {
    snake.direction = "upleft";
  } else if (charCode === 105) {
    snake.direction = "upright";
  } else if (charCode === 97) {
    snake.direction = "dleft";
  } else if (charCode === 99) {
    snake.direction = "dright";
  } else if (charCode === 102) {
    snake.direction = "right";
  } else if (charCode === 101) {
    snake.direction = "down";
  } else if (charCode === 82) {
    reset();
  } else if (charCode === 71) {
    safePlay(goat);
  } else if (charCode === 32) {
    safePlay(error);
  } else if (charCode === 84) {
    safePlay(air);
  } else if (charCode === 78) {
	sound = !sound;
  } else if (charCode === 107) {
    ++snake.size;
  } else if (charCode === 72) {
    ++snake.size;   
  } 

//keyboard controls
  if (charCode === 37) {
    snake.direction = "left";
  } else if (charCode === 38) {
    snake.direction = "up";
  } else if (charCode === 39) {
    snake.direction = "right";
  } else if (charCode === 40) {
    snake.direction = "down";
  }
  
  //wasd controls
    if (charCode === 65) {
    snake2.direction = "left";
  } else if (charCode === 87) {
    snake2.direction = "up";
  } else if (charCode === 68) {
    snake2.direction = "right";
  } else if (charCode === 83) {
    snake2.direction = "down";
  }
  

  
  localStorage.setItem("score",score);
  
  //reset highscore
  if (charCode === 74) {
	score = localStorage.getItem('score');
	localStorage.setItem('score', score);
  }




};

function makeBoard() {
  for (var i = 0; i <game.length; i+=1) {
    for ( var j = 0; j <game[i].length; j +=1) {
      if (snake.onSquare(j, i)) {
        ctx.fillStyle="#006400";
        ctx.fillRect((j-1)*10,(i-1)*10,10,10);
      } else if (apple.onSquare(j, i)) {
	    ctx.fillStyle="#FF0000";
		//ctx.drawImage(img,(j-1)*10,(i-1)*10);
        ctx.fillRect((j-1)*10,(i-1)*10,10,10);
      }
    }
  }
}


function updateBoard() 
{
  if (snake.dead) {
    return;
  } 
  // Get the snake's head and add it to the front
  var oldhead = snake.positions[0];
  var head = {x:oldhead.x, y:oldhead.y};
  if (snake.direction == "right") {
    head.x  += 1;
  } else if (snake.direction == "left") {
    head.x  -= 1;
  } else if (snake.direction == "up") {
    head.y  -= 1;
  } else if (snake.direction == "down") {
    head.y  += 1;
  } else if (snake.direction == "upleft") {
    head.y  -= 1;
    head.x  -= 1;
  } else if (snake.direction == "upright") {
    head.y  -= 1;
    head.x  += 1;
  } else if (snake.direction == "dleft") {
    head.y  += 1;
    head.x  -= 1;
  } else if (snake.direction == "dright") {
    head.y  += 1;
    head.x  += 1;
  }
  //check if snake touching apple
  if (head.x == apple.x && head.y == apple.y) {
      ++snake.size;
      safePlay(eat);
      apple.randomize();

  } 
  //kills itself
  if (snake.onSquare(head.x, head.y)) {
    safePlay(fail);
    snake.dead=true;
	if (((snake.size-1)*100) > score) {
	score = ((snake.size-1)*100);	
	} else {
		score = score;
	}
  }
  snake.positions.unshift(head);
  // Remove the snake's tail
  snake.positions = snake.positions.slice(0, snake.size);
  
  if(game[head.y][head.x] != 0) {
    safePlay(fail);
    snake.dead = true;
	if (((snake.size-1)*100) > score) {
	score = ((snake.size-1)*100);		
	} else {
		score = score;
	}

	localStorage.setItem('score', score);

  }
  
}  

//set up keyboard input

var timer = setInterval(function() {
  updateBoard();
  ctx.clearRect(0,0,530,280);
  output.textContent = makeBoard();
  scorelabel.ctx = "Score: " + ((snake.size-1)*100);
  scorelabel.textContent = "Score: " + ((snake.size-1)*100);
  high.textContent = "High score:" + score;
}, speed);