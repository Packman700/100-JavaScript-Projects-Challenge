(() =>{
    const BUTTONS = document.querySelectorAll("button")
    const COUNTER = document.querySelector("#counter")

    BUTTONS.forEach((button) =>{
        const _thisButton = button
        button.addEventListener('click',() =>{
            // Prepare all data
            let counterCurrentValue = returnIntCounterValue()

            const mathSign = _thisButton.dataset.value[0]  // input: '+10' output: '+'
            const value = parseInt(_thisButton.dataset.value.slice(1)) // input: '+10' output: 10
            if (isNaN(value)) return NaN // rise error
            
            // Update counter value
            if (mathSign === '+') COUNTER.textContent = counterCurrentValue + value
            else if (mathSign === '-') COUNTER.textContent = counterCurrentValue - value

            // Update counter style
            counterCurrentValue = returnIntCounterValue()
            if (counterCurrentValue > 0) COUNTER.style.color = 'green'
            else if (counterCurrentValue < 0) COUNTER.style.color = 'red'
            else COUNTER.style.color = 'inherit'
        })
    })
    
    function returnIntCounterValue(){
        const counterValue = parseInt(COUNTER.textContent)
        if (isNaN(counterValue)) return NaN // rise error
        return counterValue
    }
})()
