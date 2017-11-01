var targetWorkDuration = 1;
var timerCount = targetWorkDuration * 60;
var timerRunning = false;

function changeTimeRemaining(){
    if (timerRunning){
        var seconds = timerCount % 60;
        var minutes = (timerCount - seconds) / 60;
        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);
        timerCount--;

        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (minutes == 0 && seconds == 0){
            timerRunning = false;
        }

    }else{
        clearInterval(timerInterval);
    }
}

function changeTimerButtonText(){
    timerButton = document.getElementById("timer-button");
    if (timerRunning){
        timerButton.innerHTML = "STOP";
    }else{
        timerButton.innerHTML = "START";
    }
}

function startTimer() {
    timerRunning = true;    
    changeTimerButtonText();    
    timerInterval = setInterval(changeTimeRemaining, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    changeTimerButtonText();
    timerCount = targetWorkDuration * 60;
}

function timerButtonOnClick() {
    if (timerRunning){
        stopTimer();
    }else{
        startTimer();
    }
}