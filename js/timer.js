let countdown = null;
let diff = null;
let start = null;

export const startTimer = (duration, display) => {
    start = Date.now();

    displayTimer(duration, display);

    countdown = setInterval(() => {
        diff = duration - ((Date.now() - start) / 1000);

        displayTimer(diff, display);

        if (diff <= 0) {
            display.textContent = "TIME'S UP";
            clearInterval(countdown);
        }
    }, 13); // run this function every 13 milliseconds, closest to 60 frames per second
};

export const displayTimer = (time, display) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time * 1000) % 1000 / 10);

    display.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
};

export const stopTimer = () => {
    clearInterval(countdown);
};

export const resetTimer = (duration, display) => {
    clearInterval(countdown);
    displayTimer(duration, display);
};

export const getDiff = () => {
    return diff;
};

export const setStart = (newStart) => {
    start = newStart;
};

