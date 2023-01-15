'use strict'

const btnBack = document.getElementById('btn-back')

btnBack.addEventListener('click', () => {
    const actualLocation =  window.location.href
    const indexGetData = actualLocation.indexOf('getData')
    const newLocation = actualLocation.slice(0, indexGetData)
    window.location =  newLocation
})