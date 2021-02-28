export function returnRandomHexColor(){
    const hexR = formatToTwoDigits(returnRandomNumber().toString(16));
    const hexG = formatToTwoDigits(returnRandomNumber().toString(16));
    const hexB = formatToTwoDigits(returnRandomNumber().toString(16));
    return `#${hexR}${hexG}${hexB}`;
}

function returnRandomNumber(min= 0, max = 255){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function formatToTwoDigits(inputNumber) {
    /*
        intUnitTime is Hour, Minute or Second number
        This function convert numbers to 2 digits strings
        Input: 1   Output: "01"
        Input: 21  Output: "21"
    */
    const stringTime = inputNumber.toString();
    if (stringTime.length === 2)
        return stringTime;
    else
        return `0${stringTime}`;
}
