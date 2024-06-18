const searchBar = document.getElementById('input');
let cities = [];
const prevBtn = document.getElementById('prevButton');
const nextBtn = document.getElementById('nextButton');
let page = 1;
const cardsPerPage = 12;

function renderCards(data, page) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const pagination = data.slice(start, end);

    pagination.forEach(city => {
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

        // Add click event to open popup
        card.addEventListener('click', () => {
            openPopup(city);
        });

        container.appendChild(card);
    });

    updatePaginationButtons(data.length);
}

function updatePaginationButtons(totalItems) {
    const totalPages = Math.ceil(totalItems / cardsPerPage);
    const pagesElement = document.getElementById('pages');
    pagesElement.textContent = `Page ${page} of ${totalPages}`;

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

function loadingCards() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            cities = data.cities;
            renderCards(cities, page);
        })
        .catch(error => console.error('Error loading the cards', error));
}

loadingCards();

searchBar.addEventListener('keyup', (e) => {
    const searchTarget = e.target.value.toLowerCase();
    const filteredResult = cities.filter(city => {
        return city.city.toLowerCase().includes(searchTarget) || city.country.toLowerCase().includes(searchTarget);
    });
    page = 1;
    renderCards(filteredResult, page);
});

prevBtn.addEventListener('click', () => {
    if (page > 1) {
        page--;
        renderCards(cities, page);
    }
});

nextBtn.addEventListener('click', () => {
    if (page * cardsPerPage < cities.length) {
        page++;
        renderCards(cities, page);
    }
});

function openPopup(city) {
    const popupView = document.createElement('div');
    popupView.classList.add('popup-view', 'active');

    const popupCard = document.createElement('div');
    popupCard.classList.add('popup-card');

    const closePopupBtn = document.createElement('span');
    closePopupBtn.classList.add('close-btn');
    closePopupBtn.innerHTML = '&times;';
    closePopupBtn.onclick = () => {
        document.body.removeChild(popupView);
    };

    const info = document.createElement('div');
    info.classList.add('city-info');

    const cityName = document.createElement('h2');
    cityName.textContent = city.city;

    const description = document.createElement('p');
    description.textContent = `Description: ${city.description}`;

    const population = document.createElement('p');
    population.textContent = `Population: ${city.population}`;

    info.appendChild(cityName);
    info.appendChild(description);
    info.appendChild(population);

    popupCard.appendChild(closePopupBtn);
    popupCard.appendChild(info);
    popupView.appendChild(popupCard);

    document.body.appendChild(popupView);
}


