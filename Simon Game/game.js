//Declaration of the variables
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;

//Events 

//Add event listener when keyboard key has been pressed
$(document).keypress(function() {
    if (!started) {
       $("#level-title").text("Level" + " " + level);
        nextSequence();
        started = true;
    } 
});


//Add event listener to the button that has been clicked 
$(".btn").click(function() {
    //console.log(e);
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


//Functions 
function checkAnswer(currentLevel) {
    
    //Check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("sucess");
        //console.log(userClickedPattern);
        //console.log(gamePattern);      
        
        //Check user has finish their sequence with another if statement
        if (userClickedPattern.length ===  gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
            console.log("Don't know");
        }
    }

    else {
        //When user get the answer wrong
        playSound("wrong");

        $("body").addClass("game-over");  
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");   
        console.log("Wrong");

        //If the wrong patter has been followed then restard the game 
        startOver();
    }
}

//Generate random sequence and push values to array
//Call playSound for each random number
function nextSequence() {
    
    userClickedPattern = [];

    //Everytime a newSequence is generated, increase the level of the game
    level++;

    //Display the level of the game targeting the h1 by the id
    $("#level-title").text("Level" + " " + level);

    //Generating random number to select a colour from the buttonColours array and pushing the value inside the gamePattern array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Adding fading animation to the randomChosenColour
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    //console.log($('#' + randomChosenColour));
    //console.log(gamePattern);
}

//Play sound when button is clicked
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animate when button is clicked
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");  
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}

//Function to restart the game
function startOver () {
    gamePattern = [];
    started = false;
    level = 0;
}