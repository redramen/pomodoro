var targetWorkDuration = 25;
var targetBreakDuration = 5;
var timerCount = targetWorkDuration * 60;
var breakCount = targetBreakDuration * 60;
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
            stopTimer();
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

function openHelpMenu() {
    settingsMenu = document.getElementById("help");    
    settingsMenu.style.visibility = "visible";
}

function closeHelpMenu() {
    settingsMenu = document.getElementById("help");
    settingsMenu.style.visibility = "hidden";
}

function openSettingsMenu() {
    settingsMenu = document.getElementById("settings");    
    settingsMenu.style.visibility = "visible";
}

function closeSettingsMenu() {
    settingsMenu = document.getElementById("settings");
    settingsMenu.style.visibility = "hidden";
}

function applySettings() {
    targetWorkDuration = document.getElementById("work-minutes-input").value;
    targetBreakDuration = document.getElementById("break-minutes-input").value;
    timerCount = targetWorkDuration * 60;
    breakCount = targetBreakDuration * 60;
    
    closeSettingsMenu();
}