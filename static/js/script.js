'use strict'

const form =  document.getElementById('form')
const alert = document.getElementById('alert')
const restore = document.getElementById('restore')
const budget = document.getElementById('budget')

const resizeImg = (scale) => {
    restore.style.transform = scale
    restore.style.transition = "transform 0.25s ease"
}


const pushAlert = (codeResponse) => {
    alert.classList.remove('alert-danger')
    alert.classList.remove('alert-success')
    const alertChildren = alert.children
    
    if(codeResponse === 400){
        alert.classList.add('alert-success')
        alertChildren[0].textContent = 'COOL!'
        alertChildren[1].textContent = 'The data was saved successfully.'
    }else if(codeResponse === 100){
        alert.classList.add('alert-success')
        alertChildren[0].textContent = 'Great!'
        alertChildren[1].textContent = 'The data was restored'   
    }else if(codeResponse === 300){
        alert.classList.add('alert-danger')
        alertChildren[0].textContent = 'Sorry!'
        alertChildren[1].textContent = "You don't have enough money"
    }else if(codeResponse === 600){
        alert.classList.add('alert-danger')
        alertChildren[0].textContent = "UPS!"
        alertChildren[1].textContent = "Something went wrong"
    }
    //Independently wich one is the code we need to show the alert and afeter 5 seconds we hide it using setTimeout function
    alert.style.display = 'block'
    setTimeout(() => { //After 5 seconds we call a resetForm that simply send submit event for clear data input
        alert.style.display = 'none'
    }, 5000)
}

//-------------------Instert data on DB-------------------
form.addEventListener('submit', (event) => {

    event.preventDefault()

    const dataToSend = {
        description: event.target.Description.value,
        spending: event.target.Spending.value
    }
    const fetchSettings = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    const sendPost = async (fetchSettings) => {
        try {
            const fetchResponse  = await fetch('/writeData', fetchSettings)
            const serverResponse = await fetchResponse.json()
            return serverResponse
        } catch (error) {
            return error
        }
    } 
    
    sendPost(fetchSettings).then(result => {
        const codeResponse = result.code_response //Getting the response code from the backend
        const newBudget = result.new_budget
        budget.textContent = '$' + newBudget
        pushAlert(codeResponse)
    })

    form.reset() //For clear input data with out reloading the page
})

//-------------------Delete all data on DB-------------------
restore.addEventListener('click', () => {

    setTimeout(() => {
        resizeImg("scale(1.5)") //Calling the function for resize the image to new size (biger)
    }, 0)

    setTimeout(() => {
        resizeImg("scale(1)") //Calling the function for resize the image to original size
    }, 300)

    const sendPost = async () => {
        try {
            const fetchResponse  = await fetch('/deleteData')
            const serverResponse = await fetchResponse.json()
            return serverResponse
        } catch (error) {
            return error
        }
    } 
    
    sendPost().then(result => {
        const codeResponse = result.code_response //Getting the response code from the backend
        const newBudget = result.new_budget
        budget.textContent = '$' + newBudget
        pushAlert(codeResponse)
    })
})