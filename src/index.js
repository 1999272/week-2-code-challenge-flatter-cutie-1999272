// Base URL for the API
const baseURL = "http://localhost:3000";

// DOM Elements
const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const votesForm = document.getElementById("votes-form");


let currentCharacter = null;

// Fetch all characters from the API and display their names in the character bar
function fetchCharacters() {
  fetch(`${baseURL}/characters`)
    .then((response) => response.json())
    .then((characters) => {
      
      characterBar.innerHTML = "";
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        
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

// Handle the votes form submission
votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Get the vote amount from the form input (assuming a single input field)
    const voteInput = event.target.querySelector("input");
    const additionalVotes = parseInt(voteInput.value) || 0;

    if (currentCharacter) {
        // Add the votes (cumulative, no persistence required)
        currentCharacter.votes += additionalVotes;
    
        // Update the displayed vote count
        const votesEl = document.getElementById("vote-count");
        if (votesEl) {
          votesEl.textContent = `Votes: ${currentCharacter.votes}`;
        }
      }

       
  event.target.reset();
});


fetchCharacters();