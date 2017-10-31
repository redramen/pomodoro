var targetWorkDuration = 25;
var currentTime = new Date().getTime();
var targetTime = new Date(currentTime + (targetWorkDuration * 1000 * 60)).getTime();

function changeTimeRemaining(){
    currentTime = new Date().getTime();
    var timer = (targetTime - currentTime)
    var seconds = Math.floor((timer / 1000) % 60);
    var formattedSeconds = ("0" + seconds).slice(-2);
    var minutes = Math.floor(((timer / 1000) - seconds) / 60);
    if (minutes < 10){
        minutes = ("0" + minutes).slice(-2);
    }

    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = formattedSeconds;
}

function startTimer() {
    setInterval(changeTimeRemaining, 1000);
}