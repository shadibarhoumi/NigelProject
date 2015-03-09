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

	var music = new Howl({
		urls: ['sounds/sugahDaddy.mp3'],
		autoplay: true,
		loop: true
	});

	// load cheer sound
	var cheer = new Howl({
	  urls: ['sounds/cheer.mp3']
	});

	var player1Score = 0;
	var player2Score = 0;
	var winningScore = 2;
	var gameRunning = true;

	var lastP1Basket = 0;
	var lastP2Basket = 0;
	var minShotInterval = 1000;

	lastWin = 0;

	$(document).keyup(function(e) {
		if (gameRunning) { // if nobody has won yet
			if (e.which === 37) { // if left arrow key is pressed
				if (Date.now() - lastP1Basket > minShotInterval) {
					lastP1Basket = Date.now();
					player1Score++;
					$('.p1Score').html(player1Score);
					swish.play();
					$('.p1Score').transition({scale: 1.8}, {duration: '50ms'})
						.transition({scale: 1.0}, {duration: '50ms'});
					
					if (player1Score >= winningScore) {
						lastWin = Date.now();
						cheer.play();
						gameOverMessage("Player 1 wins!");
						gameRunning = false;
					} else {
						taunt(soundInfo, sounds);	
					}
				}
			} else if (e.which === 39) {
				if (Date.now() - lastP2Basket > minShotInterval) {
					lastP2Basket = Date.now();
					player2Score++;
					$('.p2Score').html(player2Score);
					swish.play();
					$('.p2Score').transition({scale: 1.8}, {duration: '50ms'}).transition({scale: 1.0}, {duration: '50ms'});
					
					if (player2Score >= winningScore) {
						lastWin = Date.now();
						cheer.play();
						gameOverMessage("Player 2 wins!");
						gameRunning = false;
					} else {
						taunt(soundInfo, sounds);
					}
				}
			}
		} else {
			if (e.which === 32) {
				console.log(Date.now(), lastWin);
				if (Date.now() - lastWin > 2100) {
					lastWin = Date.now();
					gameRunning = true;
					player1Score = 0;
					player2Score = 0;
					$('.winner').transition({scale: 0}, {duration: '200ms'});
					$('body').removeClass('dimmed');
					$('.p1Score').html(player1Score);
					$('.p2Score').html(player2Score);
					$('.playAgain').addClass('hidden');
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
	$('body').addClass('dimmed');
	$('.winner').html(message)
		.transition({scale: 1.5}, {delay: '200ms'})
		.transition({rotate: '+=' + randomDegree + 'deg'})
		.transition({rotate: '-=' + randomDegree + 'deg'});
	setTimeout(function() {
		$('.playAgain').removeClass('hidden');
	}, 2000);

}