
const form = document.querySelector('form')
const locationInput = document.querySelector('input')
const message = document.querySelector('.forecast-message')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = 'Loading......'
    const url = '/weather?address=' + locationInput.value;
    fetch(url).then(
        (response) => {
            response.json().then((data) => {
                if (!data.error) {
                    message.textContent = data.location
                    message.textContent = data.weatherReport
                }
                else {
                    message.textContent = data.error
                }
            })
        },
        (error) => {
            message.textContent('Network error')
        }
    )
})




