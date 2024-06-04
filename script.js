function loadingCards() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const cities = data.cities;
            const container = document.getElementById('container');
            cities.forEach(city => {
                const card = document.createElement('div');
                card.classList.add("card");

                const cityName = document.createElement('h2');
                cityName.textContent = city.city;

                const img = document.createElement('img');
                img.src = city.img;
                img.alt = city.city;

                const countryName = document.createElement('h3');
                countryName.textContent = city.country;

                card.appendChild(cityName);
                card.appendChild(img);
                card.appendChild(countryName);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading the cards'));
}

loadingCards();
