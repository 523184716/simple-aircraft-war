var transparency = 1;
var bg = document.getElementById("bg")
// window.onload=function() {
var ButtomStart = document.getElementById("startgame");
ButtomStart.onclick=function() {
    window.hand = setInterval(num_decline,100)
}
// }

function num_decline() {
    if (transparency > 0) {
        transparency -= 0.1;
        bg.style.opacity = transparency
    }
    else {
        clearInterval(hand);
        window.location = "./game.html"
    }
}

// alert(e.code)