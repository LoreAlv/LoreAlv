const buttonAnimation = (key) => {
    var activeButton = document.querySelector("." + key);
    if (activeButton) {
        activeButton.classList.add("pressed");
        setTimeout(() => {
            activeButton.classList.remove("pressed");
        }, 100);
    }
};
const makeSound = (key) => {
    var file = "o";
    switch (key) {
        case "w":
            file = "tom-1";
            break;
        case "a":
            file = "tom-2";
            break;
        case "s":
            file = "tom-3";
            break;
        case "d":
            file = "tom-4";
            break;
        case "j":
            file = "snare";
            break;
        case "k":
            file = "crash";
            break;
        case "l":
            file = "kick-bass";
            break;
    }
    var audio = new Audio("sounds/" + file + ".mp3");
    audio.play();
};
const handleClick = (ev) => {
    // console.log("Button clicked!", ev.target.innerHTML);
    makeSound(ev.target.innerHTML);
    buttonAnimation(ev.target.innerHTML);
    // ev.target.style.color = "white";
};

document.addEventListener("keydown", (ev) => {
    makeSound(ev.key);
    buttonAnimation(ev.key);
});
//document.querySelector("button").addEventListener("click", handleClick);
document.querySelectorAll("button.drum").forEach((button) => {
    button.addEventListener("click", handleClick);
});
