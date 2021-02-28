// Exports //
import {returnRandomHexColor} from "./returnHexColor.js";
import {changeGuiColors, BUTTON_DARK_HOVER, BUTTON_LIGHT_HOVER} from "./darkAndLightMode.js";
import {button} from "./globals.js";

// Action on click //
button.addEventListener('click', changeOnClick);

function changeOnClick(){
    const hexColor = returnRandomHexColor();
    // changeTextColor(hexColor);
    document.querySelector("body").style.backgroundColor = hexColor;
    document.querySelector("#change-color__text span").textContent = hexColor.toUpperCase();

    changeGuiColors(BUTTON_DARK_HOVER, BUTTON_LIGHT_HOVER);
}
