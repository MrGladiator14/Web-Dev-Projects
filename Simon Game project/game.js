var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$("body").keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function playSound(str) {
    var audio = new Audio("./sounds/" + str + ".mp3");
    audio.play();
}

function animatePress(str) {
    $("#" + str).addClass("pressed");
    window.setTimeout(function () {
        $("#" + str).removeClass("pressed");
    }, 90);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);

        startOver();
    }
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}
);

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({
        opacity: 0.4,
    }, 100);
    $("#" + randomChosenColour).animate({
        opacity: 1.4,
    }, 100);
    playSound(randomChosenColour);
}
