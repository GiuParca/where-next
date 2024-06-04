const searchBar = document.getElementById('input');
let cities = []; 

function renderCards(data) {
    const container = document.getElementById('container');
    container.innerHTML = ''; 

    data.forEach(city => {
        const card = document.createElement('div');
        card.classList.add("card");

        const cityName = document.createElement('h2');
        cityName.textContent = city.city;
        card.classList.add("city");

        const img = document.createElement('img');
        img.src = city.img;
        img.alt = city.city;

        const countryName = document.createElement('h3');
        countryName.textContent = city.country;
        card.classList.add("country");

        card.appendChild(cityName);
        card.appendChild(img);
        card.appendChild(countryName);
        container.appendChild(card);
    });
}

function loadingCards() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            cities = data.cities; 
            renderCards(cities); 
        })
        .catch(error => console.error('Error loading the cards', error));
}

loadingCards();

searchBar.addEventListener('keyup', (e) => {
    const searchTarget = e.target.value.toLowerCase();
    const filteredResult = cities.filter(city => {
        return city.city.toLowerCase().includes(searchTarget) || city.country.toLowerCase().includes(searchTarget);
    });
    renderCards(filteredResult);
});
