let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

const playSound = (colour) => {
    let audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
};

const nextSequence = () => {
    $("h1").text("Level " + level);
    level++;
    let randomNumber = Math.floor(Math.random() * 4) + 1;

    let randomChosenColour = buttonColours[randomNumber - 1];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
};

const animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

const startOver = () => {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
};

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    // // Check if the user's choice matches the game pattern
    // if (gamePattern.length === 1) {
    //     nextSequence();
    // } else {
    //     // Logic to check the user's input against the game pattern can be added here
    //     console.log("User's choice: " + userChosenColour);
    //     console.log("Game pattern: " + gamePattern);
    // }
});

$(document).keypress(function () {
    if (gamePattern.length === 0) {
        nextSequence();
    }
});
