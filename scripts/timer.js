var targetWorkDuration = 25;
var targetBreakDuration = 5;
var timerCount = targetWorkDuration * 60;
var breakCount = targetBreakDuration * 60;
var timerRunning = false;
var pomodoroCounter = 0;
var isPomodoroActive = false;
var status = "";
var breakOrWork = "";
var notificationSound = new Audio("./audio/pop-sound.mp3")

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
    console.log("breakTimer");
    
    var seconds = breakCount % 60;
    var minutes = (breakCount - seconds) / 60;
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    breakCount--;

    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (minutes == 0 && seconds == 0){
        clearInterval(breakInterval)
        breakOrWork = "work";
        showSwitchMenu();
    }
}

function startBreak() {
    console.log("in startBreak");
    breakCount = targetBreakDuration * 60;
    breakInterval = setInterval(runBreakTimer, 1000);
    isPomodoroActive = false;
    updateStatusText();
}

function switchButtonOnClick() {
    switchMenu = document.getElementById("switch-menu");
    switchMenu.style.visibility = "hidden";
    hideOverlay();

    if (breakOrWork == "break"){
        startBreak();
    }else if (breakOrWork == "work"){
        startTimer();
    }else{
        stopTimer();
    }
}

function showSwitchMenu() {
    notificationSound.play();
    switchMenu = document.getElementById("switch-menu");
    switchText = document.getElementById("switch-text");

    console.log(breakOrWork);

    if (breakOrWork == "break"){
        switchText.innerHTML = "pomodoro completed! time for a break!"
    }else if (breakOrWork == "work"){
        switchText.innerHTML = "break completed! time to get back to work!"
    }else{
        switchText.innerHTML = "all pomodoros complete! if you have more work to do, take a 15-30 minute break before starting again."
    }

    switchMenu.style.visibility = "visible";
    showOverlay();   
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
            clearInterval(timerInterval);
            breakOrWork = "break";

            if(pomodoroCounter < 4){
                showSwitchMenu();
            }else{
                breakOrWork = "complete";
                showSwitchMenu();
                // stopTimer();
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
    try{
        clearInterval(breakInterval);
    }catch(err){
        console.log("no breakInterval yet");
    }
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

function showOverlay() {
    overlay = document.getElementById("dark-overlay");
    overlay.style.visibility = "visible";
}

function hideOverlay() {
    overlay = document.getElementById("dark-overlay");
    overlay.style.visibility = "hidden";
}

function openHelpMenu() {
    showOverlay();    
    settingsMenu = document.getElementById("help");    
    settingsMenu.style.visibility = "visible";
}

function closeHelpMenu() {
    hideOverlay();
    settingsMenu = document.getElementById("help");
    settingsMenu.style.visibility = "hidden";
}

function openSettingsMenu() {
    showOverlay();    
    settingsMenu = document.getElementById("settings");    
    settingsMenu.style.visibility = "visible";
}

function closeSettingsMenu() {
    hideOverlay();    
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