console.log('Client side javascript file is loaded!');

const getWeatherData = (address) => {
	fetch(`/weather?address=${address}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				messageOne.textContent = data.error;
			}
			else {
				console.log(data.location);
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
				console.log(data.forecast);
			}
		})
	})
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#weather-message');
const messageTwo = document.querySelector('#error-message');
messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const response = getWeatherData(search.value);
	
})