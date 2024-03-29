// Make an array with every field in it
const ticFields = Array.from(document.querySelectorAll(".tic-option"));

// Screen that shows the winner
const endScreen = document.querySelector("#modal");
const winnerText = document.querySelector("#winner-text");
const winnerName = document.querySelector("#winner");
const restartButton = document.querySelector("#restart-button");

// object to keep track of who's turn it is, and who the winner is
const gameData = {
    playerOneTurn: true,
    playerOneTics: [],
    playerTwoTics: [],
    playerTwoTurn: false,
    emptyFields: 9,
    // an array with an array for every combination of tiles that's a win
    winningFields: [
        ["field-1", "field-2", "field-3"],
        ["field-1", "field-4", "field-7"],
        ["field-2", "field-5", "field-8"],
        ["field-3", "field-6", "field-9"],
        ["field-4", "field-5", "field-6"],
        ["field-7", "field-8", "field-9"],
        ["field-1", "field-5", "field-9"],
        ["field-3", "field-5", "field-7"],
    ],
    winningPlayer: "",
}

// function that adds either x or o and changes player turn
function addMarker(element){
    if (gameData.playerOneTurn === true){
        element.textContent = "X";
        element.style.color = "blue";
        gameData.playerOneTurn = false;
        gameData.playerTwoTurn = true;
        // add the fields id to an array to track which fields the player has checked
        gameData.playerOneTics.push(element.id);
        // a for each loop over the winningfields array that check if every child array, is in the player1Tics array too
        // if all 3 of the fields in an array are in the playertics array, the player wins
        gameData.winningFields.forEach(fieldArray =>{
            if (gameData.playerOneTics.includes(fieldArray[0]) && gameData.playerOneTics.includes(fieldArray[1]) && gameData.playerOneTics.includes(fieldArray[2])){
                winner("X");
                winnerText.style.color = "blue";
                restartButton.style.color = "blue";
                restartButton.style.borderColor = "blue";     
            }
        })
    } else if (gameData.playerTwoTurn === true){
        element.textContent = "O";
        element.style.color = "red";
        gameData.playerTwoTurn = false;
        gameData.playerOneTurn = true;
        gameData.playerTwoTics.push(element.id);
        gameData.winningFields.forEach(fieldArray => {
            if (gameData.playerTwoTics.includes(fieldArray[0]) && gameData.playerTwoTics.includes(fieldArray[1]) && gameData.playerTwoTics.includes(fieldArray[2])){
                winner("O");
                winnerText.style.color = "red";
                restartButton.style.color = "red";
                restartButton.style.borderColor = "red";   
            }
        })
    }
}

// for each loop that adds marker depending on which field the player clicks
ticFields.forEach(field => {
    field.addEventListener("click", ()=>{
        if (field.textContent === ""){
            gameData.emptyFields -= 1;
            addMarker(field);
            if (gameData.emptyFields === 0 && gameData.winningPlayer === ""){
                tie();
             }
        }
    });
});

// winner function that reloads the page after choosing a winner
function winner(player){
    gameData.winningPlayer = player;
    endScreen.style.display = "flex";
    winnerName.textContent = `${player}`;
}

function tie(){
    endScreen.style.display = "flex";
    winnerText.textContent = `It's a tie`;
}

restartButton.addEventListener("click", ()=> {
    window.location.reload();
})