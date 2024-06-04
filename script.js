const cardCities = document.querySelector('[data-city-template]');
const cardContainer = document.querySelector('[data-city-container]');

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(city => {
            const card = cardCities.content.cloneNode(true).children[0];
            const cityData = card.querySelector("[city-data]");
            const photoData = card.querySelector("[photo-data]");
            const countryData = card.querySelector("[country-data]");
            cityData.textContent = city.city;
            photoData.imgContent = city.img;
            countryData.textContent = city.country;
            cardContainer.append(card);
        })
    })