var targetWorkDuration = 25;
var targetBreakDuration = 5;
var timerCount = targetWorkDuration * 60;
var breakCount = targetBreakDuration * 60;
var timerRunning = false;
var pomodoroCounter = 0;
var isPomodoroActive = false;
var status = "";

function updateStatusText() {
    statusText = document.getElementById("current-status-text");
    
    if (pomodoroCounter <= 4){
        if (isPomodoroActive == true){
            status = "currently working! focus!";
        }else{
            if (timerRunning){
                console.log("timer running");
                status = "currently on break! take it easy, stretch, get some water. you deserve it.";
            }else{
                console.log("timer not running");
                status = "pomodoro cancelled";
            }
        }
    }else{
        status = "you're all done! feeling accomplished?"
    }

    statusText.innerHTML = status;
}

function updatePomodoroCounterText() {
    pomodoroCounterText = document.getElementById("pomodoro-counter");
    if (pomodoroCounter == 0){
        pomodoroCounterText.innerHTML = "";
    }else{
        pomodoroCounterText.innerHTML = "currently on pomodoro # " + pomodoroCounter;
    }
}

function runBreakTimer(){
    var seconds = breakCount % 60;
    var minutes = (breakCount - seconds) / 60;
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    breakCount--;

    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (minutes == 0 && seconds == 0){
        clearInterval(breakInterval)
        startTimer();
    }
}

function startBreak() {
    clearInterval(timerInterval);
    breakCount = targetBreakDuration * 60;
    breakInterval = setInterval(runBreakTimer, 1000);
    isPomodoroActive = false;
    updateStatusText();
}

function changeTimeRemaining(){
    if (timerRunning){
        var seconds = timerCount % 60;
        var minutes = (timerCount - seconds) / 60;
        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);
        timerCount--;

        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        console.log("work")
        if (minutes == 0 && seconds == 0){
            console.log("break")
            if(pomodoroCounter < 4){
                startBreak();
            }else{
                stopTimer();
            }
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
    timerCount = targetWorkDuration * 60;
    timerRunning = true;
    pomodoroCounter++;
    isPomodoroActive = true;
    updateStatusText();
    changeTimerButtonText();    
    timerInterval = setInterval(changeTimeRemaining, 1000);
    updatePomodoroCounterText();
}

function stopTimer() {
    pomodoroCounter++;
    clearInterval(timerInterval);
    clearInterval(breakInterval);
    timerRunning = false;
    isPomodoroActive = false;
    updateStatusText();
    changeTimerButtonText();
    pomodoroCounter = 0;
    timerCount = targetWorkDuration * 60;
    updatePomodoroCounterText();
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