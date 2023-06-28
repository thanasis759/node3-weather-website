const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = '/weather?address=' + search.value
    messageOne.textContent ='Weather loading, please hold...'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'One more day in ' + data.location
                messageTwo.textContent = 'The temperature is ' + data.temperature + ' and it feels like ' + data.feelslike + '. The humidity levels are at ' + data.humidity
            }
        })
    })
})