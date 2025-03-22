const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST', 
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100 
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json();
        
        if (data.error) {
            console.error("API Error:", data.error.message);
            outPutElement.textContent = `Error: ${data.error.message}`;
            return; 
        }

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }

    } catch (error){
        console.error(error)
    }
    
}

submitButton.addEventListener('click', getMessage)

function clearInput () {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput)