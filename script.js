// slider starts
let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;
let autoSlide = setInterval(moveSlide.bind(null, 1), 3000);

function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.slider').addEventListener('mouseleave', () => autoSlide = setInterval(moveSlide.bind(null, 1), 3000));

// slider ends


// Fetching data from JSON files
const gamesDataUrl = 'data/games.json';
const playersDataUrl = 'data/players.json';
const topScoresDataUrl = 'data/top_scores.json';

// Variables to store fetched data
let gamesData = [];
let playersData = [];

// Function to fetch and display game information
function loadGames() {
    fetch(gamesDataUrl)
        .then(response => response.json())
        .then(data => {
            gamesData = data.games;
            displayGames(gamesData);
        });
}

// Function to fetch and display player profiles
function loadPlayers() {
    fetch(playersDataUrl)
        .then(response => response.json())
        .then(data => {
            playersData = data.players;
            displayPlayers(playersData);
        });
}

// Display games
function displayGames(games) {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = '';
    games.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.innerHTML = `
            <h3>${game.team1} vs ${game.team2}</h3>
            <p>Date: ${game.date}</p>
            <p>Score: ${game.score}</p>
        `;
        gameList.appendChild(gameItem);
    });
}

// Display players
function displayPlayers(players) {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';
    players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.innerHTML = `
            <h3>${player.name}</h3>
            <p>Position: ${player.position}</p>
            <p>Team: ${player.team}</p>
            <img src="${player.image}" alt="${player.name}">
        `;
        playerList.appendChild(playerItem);
    });
}

// Sorting games by date or team
document.getElementById('sort-games').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    if (sortBy === 'date') {
        gamesData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'team') {
        gamesData.sort((a, b) => a.team1.localeCompare(b.team1));
    }
    displayGames(gamesData);
});

// Sorting players by name or team
document.getElementById('sort-players').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    if (sortBy === 'name') {
        playersData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'team') {
        playersData.sort((a, b) => a.team.localeCompare(b.team));
    }
    displayPlayers(playersData);
});

// Search games
document.getElementById('search-games').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredGames = gamesData.filter(game =>
        game.team1.toLowerCase().includes(searchText) ||
        game.team2.toLowerCase().includes(searchText)
    );
    displayGames(filteredGames);
});

// Search players
document.getElementById('search-players').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredPlayers = playersData.filter(player =>
        player.name.toLowerCase().includes(searchText) ||
        player.team.toLowerCase().includes(searchText)
    );
    displayPlayers(filteredPlayers);
});

// Initialize the website by loading all necessary data
function initializeWebsite() {
    loadGames();
    loadPlayers();
    loadTopScores();
}

initializeWebsite();



