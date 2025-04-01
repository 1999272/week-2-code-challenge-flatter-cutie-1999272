// Base URL for the API
const baseURL = "http://localhost:3000";

// DOM Elements
const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const votesForm = document.getElementById("votes-form");

// Global variable to store the currently selected character
let currentCharacter = null;

// Fetch all characters from the API and display their names in the character bar
function fetchCharacters() {
  fetch(`${baseURL}/characters`)
    .then((response) => response.json())
    .then((characters) => {
      // Clear any previous content
      characterBar.innerHTML = "";
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        // When a character name is clicked, display its details
        span.addEventListener("click", () => showCharacterDetails(character));
        characterBar.appendChild(span);
      });
    })
    .catch((error) => console.error("Error fetching characters:", error));
}

// Display the details of the selected character in the detailed-info div
function showCharacterDetails(character) {
    currentCharacter = character;
    detailedInfo.innerHTML = "";

    // Create elements for character details
  const nameEl = document.createElement("h2");
  nameEl.textContent = character.name;

  const imgEl = document.createElement("img");
  imgEl.src = character.image;
  imgEl.alt = character.name;

  const votesEl = document.createElement("p");
  votesEl.id = "vote-count"; 
  votesEl.textContent = `Votes: ${character.votes}`;

  // Append the details to the detailed-info div
  detailedInfo.appendChild(nameEl);
  detailedInfo.appendChild(imgEl);
  detailedInfo.appendChild(votesEl);
}