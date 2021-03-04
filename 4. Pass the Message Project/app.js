// Box mean this is HTML element
(() =>{
    const formBox = document.querySelector('#message-form');
    const blankMessageErrorBox = document.querySelector("#error-blank-message")
    const lastMessageBox = document.querySelector("#last-message")

    // Send text
    formBox.submit.addEventListener('click', ()=> {
        const userMessage = capitalizeFirstLetter(formBox['user-message'].value.trim())
        const lastMessageHeader = document.querySelector("#last-message-header")

        if(userMessage === ''){
            blankMessageErrorBox.classList.remove('hide')
        }
        else{
            blankMessageErrorBox.classList.add('hide')
            lastMessageHeader.classList.remove('hide')
            lastMessageBox.textContent = userMessage
            formBox['user-message'].value = ''
        }
    })

    // Close button
    const classCloseElements = document.querySelectorAll('.close')
    classCloseElements.forEach((htmlElement) => {
        const _this = htmlElement;
        htmlElement.addEventListener('click', ()=> {
            _this.parentElement.classList.add('hide');
        })
    })

})()

function capitalizeFirstLetter(string) {
    // This dont care about new sentence
    return string.charAt(0).toUpperCase() + string.slice(1);
}