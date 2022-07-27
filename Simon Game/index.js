

var blockColors = ["green", "red",  "blue", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});
function nextSequence(){
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    // console.log(randomNumber)
    var randomChosenColour = blockColors[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

function playSound(id){
    var audio = new Audio("sounds/"+id+".mp3");
    audio.play();
}

function animatePressed(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(handleClick);

function handleClick() {
    userClickPattern.push(this.id)
    // console.log(userClickPattern)
    playSound(this.id);
    animatePressed(this.id);
    checkAnswer(userClickPattern.length -1 );
}

function checkAnswer(currentLevel) {
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("success");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function ()  {
                nextSequence();
                userClickPattern = [];
            }, 1000);
        }
    }else{
        // console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            playSound("wrong");
            started = false;
            userClickPattern = [];
            gamePattern = [];
            level = 0;
        },200)
    }
}