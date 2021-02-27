document.getElementById('change-color-btn').addEventListener('click', changeBackgroundColor);

function changeBackgroundColor(){
    document.querySelector("body").style.backgroundColor = returnRandomHexColor();
}

function returnRandomHexColor(){
    const hexR = returnRandomNumber().toString(16);
    const hexG = returnRandomNumber().toString(16);
    const hexB = returnRandomNumber().toString(16);
    return `#${hexR}${hexG}${hexB}`;
}

function returnRandomNumber(min= 0, max = 255){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}