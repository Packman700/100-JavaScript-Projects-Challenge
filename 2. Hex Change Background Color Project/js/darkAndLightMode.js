// Exports //
import {button, text} from "./globals.js";
import {isBackgroundDark} from "./isBackgroudDark.js";

const BUTTON_DARK_NOT_HOVER = '#161515';
export const BUTTON_DARK_HOVER = '#131010';
const BUTTON_DARK_PUSH = '#0c0a0a';

const BUTTON_LIGHT_NOT_HOVER = '#eeeeee';
export const BUTTON_LIGHT_HOVER = '#bfbfbf';
const BUTTON_LIGHT_PUSH = '#9f9f9f';

// Style listeners //
button.addEventListener('mousedown',
    () => changeGuiColors(BUTTON_DARK_PUSH, BUTTON_LIGHT_PUSH));

button.addEventListener('mouseup',
    () => changeGuiColors(BUTTON_DARK_HOVER, BUTTON_LIGHT_HOVER));

button.addEventListener('mouseover',
    () => changeGuiColors(BUTTON_DARK_HOVER, BUTTON_LIGHT_HOVER));

button.addEventListener('mouseout',
    () => changeGuiColors(BUTTON_DARK_NOT_HOVER, BUTTON_LIGHT_NOT_HOVER));


// Functions //
export function changeGuiColors(darkColor, lightColor){
    const DEFAULT_BACKGROUND_COLOR = 'rgb(255, 255, 255)';
    let backgroundRgbColor = document.body.style.backgroundColor;

    if (backgroundRgbColor === '')
        backgroundRgbColor = DEFAULT_BACKGROUND_COLOR;

    if (isBackgroundDark(backgroundRgbColor, 'rgb')) {
        button.style.backgroundColor = darkColor;
        button.style.color = 'white';
        text.style.color = 'black';
    }
    else {
        button.style.backgroundColor = lightColor;
        button.style.color = 'black';
        text.style.color = 'white';
    }
}
