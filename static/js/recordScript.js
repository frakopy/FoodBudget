'use strict'

const button = document.getElementById('button')

button.addEventListener('click', () => {
    const actualLocation =  window.location.href
    const indexGetData = actualLocation.indexOf('getData')
    const newLocation = actualLocation.slice(0, indexGetData)
    window.location =  newLocation
})