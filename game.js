
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//to track if game has started or not
var started = false;

// variable level to be initialised with 0 and to keep counter
var level = 0;

//to detect if any key has been pressed on Keyboard
$(document).keydown(function(){
    if(!started){

        //to change the levels of Simon game as it starts with "Press A key to start"
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    playSound(userChosenColour);
    animatePress(userChosenColour);
});

//to startOver game again
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

//to check if input is correct
function checkAnswer(currentLevel){
    // console.log(currentLevel);
    // console.log(gamePattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            // to call nextSequence function after delay of 1 sec
            setTimeout(nextSequence, 1000);
            // console.log("Success");
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        // console.log("Wrong");

        //to restart game;
        startOver();
    }
}

function nextSequence(){

    //to increase level of game everytime nextSequence() is called
    level++;

    //Inside nextSequence to change level title of "h1"
    $("#level-title").text("level "+level);

    //to empty the array UserClickedPattern
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColours[randomNumber]);
    
    // console.log(randomChosenColour);
}

function playSound(name){
        var audio = new Audio("./sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
        }, 100);
}
