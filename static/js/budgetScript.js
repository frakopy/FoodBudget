'use strict'


const btnEdit = document.getElementById('bnt-edit')
const inputBudget = document.getElementById('budget')
const btnBack = document.getElementById('btn-back')
const alert = document.getElementById('alert')
const btnSet = document.querySelector('.btn-set') //Getting Element using CSS Selector

const pushAlert = (codeResponse) => {
    alert.classList.remove('alert-success')
    alert.classList.remove('alert-danger')
    const alertChildren = alert.children

    if(codeResponse === 300){
        alert.classList.add('alert-success')
        alertChildren[0].textContent = 'COOL!'
        alertChildren[1].textContent = 'The new budget was successfully assigned'
        inputBudget.disabled = true
    }else if(codeResponse === 600){
        alert.classList.add('alert-danger')
        alertChildren[0].textContent = 'UPS!'
        alertChildren[1].textContent = 'Something was wrong...'
        inputBudget.disabled = false
        inputBudget.focus()
    }else if(codeResponse === 100){
        alert.classList.add('alert-danger')
        alertChildren[0].textContent = 'Sorry'
        alertChildren[1].textContent = 'You can only send digits for set a new budget'
        inputBudget.disabled = false
        inputBudget.focus()
    }
    //Independently wich one is the code we need to show the alert and afeter 5 seconds we hide it using setTimeout function
    
    alert.style.display = 'block' //For show our alert

    setTimeout(() => { //After 5 seconds we call a resetForm that simply send submit event for clear data input
        alert.style.display = 'none'
    }, 5000)
}

btnEdit.addEventListener('click', () => {
    inputBudget.disabled = false
    inputBudget.focus()
})

btnBack.addEventListener('click', () => {
    const actualLocation =  window.location.href
    const indexInitialBudget = actualLocation.indexOf('initialBudget')
    const newLocation = actualLocation.slice(0, indexInitialBudget)
    window.location =  newLocation
})

btnSet.addEventListener('click', () => {
    console.log(`The value of the input is ${inputBudget.value}`)
    const setBudget = async (fetchSettings) => {
        const fetchResponse = await fetch('/setBudget', fetchSettings)
        const serverResponse = await fetchResponse.json()
        return serverResponse
    }

    const dataToSend = {
        newBudget: inputBudget.value
    }
    const fetchSettings = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    setBudget(fetchSettings).then(response => {
        const codeResponse = response.code_response
        const newBudget = response.budgetSeted
        pushAlert(codeResponse) //Just calling the function for notify the result of the request to the server
        inputBudget.value = newBudget
    })
})