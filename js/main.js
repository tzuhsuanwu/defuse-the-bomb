import { startTimer, stopTimer, resetTimer, getDiff, setStart, displayTimer } from './timer.js';

const minutes = 60;
const correctCode = "631";

const timeLimit = 60 * minutes; // 1 minute

window.onload = () => {
    const display = document.querySelector('#timer');
    const codeInput = document.getElementById("codeInput");
    const correctMessage = document.getElementById("correctMessage");
    const incorrectMessage = document.getElementById("incorrectMessage");
    let timerStarted = false;

    // display the starting countdown value as soon as the page is loaded
    displayTimer(timeLimit, display);

    const handleStartStopResumeKey = () => {
        if (!timerStarted || timerStarted === "paused") {
            if (!timerStarted) {
                startTimer(timeLimit, display);
                timerStarted = true;
            } else {
                setStart(Date.now() - (getDiff() * 1000));
                startTimer(getDiff(), display);
                timerStarted = true;
            }
        } else if (timerStarted) {
            stopTimer();
            timerStarted = "paused";
        }
    };

    const handleResetKey = () => {
        resetTimer(timeLimit, display);
        timerStarted = false;
    };

    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 32: // Spacebar key code
                event.preventDefault();
                handleStartStopResumeKey();
                break;
            case 82: // 'R' key code
                event.preventDefault();
                handleResetKey();
                break;
        }
    });

    codeInput.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Prevent the default action to avoid form submission
            event.preventDefault();

            let enteredCode = codeInput.value;

            if (enteredCode === correctCode) {
                stopTimer();
                correctMessage.style.display = "block";
                incorrectMessage.style.display = "none";
            } else {
                incorrectMessage.style.display = "block";
                correctMessage.style.display = "none";

                setTimeout(function() {
                    codeInput.value = '';
                    incorrectMessage.style.display = "none";
                }, 3000);
            }
        }
    });
};
