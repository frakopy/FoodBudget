'use strict'

const form =  document.getElementById('form')
const alert = document.getElementById('alert')

const resetForm = () => {
    form.submit()
}

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
            const serverResponse = await fetchResponse .json()
            return serverResponse
        } catch (error) {
            return error
        }
    } 
    
    sendPost(fetchSettings).then(result => {
        const flaskResponse = result.code_response //Getin the response code from the backend
        alert.classList.remove('alert-danger')
        alert.classList.remove('alert-success') 

        if(flaskResponse === 400){
            alert.classList.add('alert-success')
            const alertChildren = alert.children
            alertChildren[0].textContent = 'COOL!'
            alertChildren[1].textContent = 'The data was saved successfully.'
            alert.style.display = 'block'
            
            setTimeout(() => { //After 5 seconds we call a resetForm that simply send submit event for clear data input
                alert.style.display = 'none'
            }, 5000)
        }else{
            alert.classList.add('alert-danger')
            const alertChildren = alert.children
            alertChildren[0].textContent = 'UPS!'
            alertChildren[1].textContent = 'Something went wrong...'
            alert.style.display = 'block'
            
            setTimeout(() => { //After 5 seconds we call a resetForm that simply send submit event for clear data input
                alert.style.display = 'none'
            }, 5000)
        }
    })

    form.reset() //For clear input data with out reloading the page
})

