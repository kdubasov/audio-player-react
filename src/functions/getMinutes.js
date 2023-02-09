export const getMinutes = sec => {
    let minutes = Math.floor(sec / 60).toFixed();
    let seconds = (sec % 60).toFixed();

    if (seconds < 10){
        seconds = "0" + seconds;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }

    return `${minutes}:${seconds}`
}
