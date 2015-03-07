$(document).ready(function() {
	var soundInfo = [
		{
			filename:'sounds/AreYouNotEntertained.mp3',
			text: "Are you not entertained?!"
		},
		{
			filename:'sounds/BallsOfSteel.mp3',
			text: "Balls of steel!"
		},
		{
			filename:'sounds/DamnImGood.mp3',
			text: "Damn, I'm good."
		},
		{
			filename:'sounds/HolyCow.mp3',
			text: "Holy cow!"
		},
		{
			filename:'sounds/LetsGetTropical.mp3',
			text: "Let's get tropical!"
		},
		{
			filename:'sounds/WhoWantsSome.mp3',
			text: "Who wants some?!"
		},
		{
			filename:'sounds/YouTalkinToMe.mp3',
			text: "You talkin' to me?!"
		},
		{
			filename:'sounds/YouGuysSuck.mp3',
			text: "You guys suck!"
		}
	];

	// var backgroundMusic = new Howl({
	//   urls: ['sounds/swish.mp3']
	// });

	// loads sounds into an array
	var sounds = [];
	for (var i = 0; i < soundInfo.length; i++) {
		sounds.push(new Howl({
	  		urls: [soundInfo[i].filename]
		}));
	}

	// load swish sound
	var swish = new Howl({
	  urls: ['sounds/swish.mp3']
	});

	var player1Score = 0;
	var player2Score = 0;
	var winningScore = 10;
	var gameRunning = true;

	$(document).keyup(function(e) {
		if (gameRunning) { // if nobody has won yet
			if (e.which === 37) { // if left arrow key is pressed
				player1Score++;
				$('.p1Score').html(player1Score);
				swish.play();
				$('.p1Score').transition({scale: 1.8}, {duration: '50ms'})
					.transition({scale: 1.0}, {duration: '50ms'});
				taunt(soundInfo, sounds);
				if (player1Score >= winningScore) {
					gameOverMessage("Player 1 wins!");
					gameRunning = false;
				}
			} else if (e.which === 39) {
				player2Score++;
				$('.p2Score').html(player2Score);
				swish.play();
				$('.p2Score').transition({scale: 1.8}, {duration: '50ms'}).transition({scale: 1.0}, {duration: '50ms'});
				taunt(soundInfo, sounds);
				if (player2Score >= winningScore) {
					gameOverMessage("Player 2 wins!");
					gameRunning = false;
				}
			}
		}
		e.preventDefault();
	});
});

var taunt = function(soundInfo, sounds) {
	if (Math.random() < 0.3) {
		var i = Math.floor(Math.random() * soundInfo.length);
		sounds[i].play();
		var randomDegree = Math.floor(Math.random() * 360);
		$('.taunt').html(soundInfo[i].text)
			.transition({scale: 1.5}, {delay: '200ms'})
			.transition({rotate: randomDegree + 'deg'})
			.transition({rotate: '-' + randomDegree + 'deg'})
			.transition({scale: 0}, {duration: '200ms'}, {delay: '500ms'});
	}
};

var gameOverMessage = function(message) {
	var randomDegree = Math.floor(Math.random() * 360);
	$('.winner').html(message)
		.transition({scale: 1.5}, {delay: '200ms'})
		.transition({rotate: '+=' + randomDegree + 'deg'})
		.transition({rotate: '-=' + randomDegree + 'deg'});
}