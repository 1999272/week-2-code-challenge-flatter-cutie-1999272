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