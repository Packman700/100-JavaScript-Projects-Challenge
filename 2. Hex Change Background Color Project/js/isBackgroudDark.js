// Exports //
const DARK_COLOR = 121; // If all values is under this value color is dark

export function isBackgroundDark(backgroundColor, format='hex'){
    let R, G, B;
    console.log(backgroundColor + ' ' + format)
    if (format.toLocaleLowerCase() === 'hex'){
        // Example format #1F5A01
        R = parseInt(backgroundColor.slice(1,3),16); // Take 1F return 31
        G = parseInt(backgroundColor.slice(3,5),16); // Take 5A return 90
        B = parseInt(backgroundColor.slice(5,7),16); // Take 01 return 1
    } else if (format.toLocaleLowerCase() === 'rgb'){
        // Example format rgb(94, 53, 236)
        backgroundColor = backgroundColor.slice(4,-1); // put to variable only "94, 53, 236"
        R = parseInt(backgroundColor.split(',')[0]); // Take 94
        G = parseInt(backgroundColor.split(',')[1]); // Take 53
        B = parseInt(backgroundColor.split(',')[2]); // Take 236
    }

    // // TESTS
    // console.log(`%c${R}%c${G}%c${B}`, "color:red", "color:green", "color:blue" );
    // console.log(`${Math.max(R,G,B)}` );

    return R > DARK_COLOR || G > DARK_COLOR || B > DARK_COLOR;
}
