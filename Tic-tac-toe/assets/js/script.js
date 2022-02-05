// Make an array with every field in it
const ticFields = Array.from(document.querySelectorAll(".tic-option"));

// Empty arrays for storing players choices
let playerOneTics = [];
let playerTwoTics = [];



// object to keep track of who's turn it is, and who the winner is
const gameData = {
    playerOneTurn: true,
    playerTwoTurn: false,
    emptyFields: 9,
    winningFields: [
        ["field-1", "field-2", "field-3"],
        ["field-1", "field-4", "field-7"],
        ["field-2", "field-5", "field-8"],
        ["field-3", "field-6", "field-9"],
        ["field-4", "field-5", "field-6"],
        ["field-7", "field-8", "field-9"],
        ["field-1", "field-5", "field-9"],
        ["field-3", "field-5", "field-7"],
    ]
}

// function that adds either x or o and changes player turn
function addMarker(element){
    if (gameData.playerOneTurn === true){
        element.textContent = "X";
        gameData.playerOneTurn = false;
        gameData.playerTwoTurn = true;
        // add the fields id to an array to track which fields the player has checked
        playerOneTics.push(element.id);
        gameData.emptyFields -= 1;
        // a for each loop over the winningfields array that check if every child array, is in the player1Tics array too
        // if all 3 of the fields in an array are in the playertics array, the player wins
        gameData.winningFields.forEach(fieldArray =>{
            if (playerOneTics.includes(fieldArray[0]) && playerOneTics.includes(fieldArray[1]) && playerOneTics.includes(fieldArray[2])){
                winner("player 1");        
            } else if(gameData.emptyFields === 0){
                tie()
            }
        })
    } else if (gameData.playerTwoTurn === true){
        element.textContent = "O";
        gameData.playerTwoTurn = false;
        gameData.playerOneTurn = true;
        playerTwoTics.push(element.id);
        gameData.emptyFields -= 1;
        gameData.winningFields.forEach(fieldArray =>{
            if (playerTwoTics.includes(fieldArray[0]) && playerTwoTics.includes(fieldArray[1]) && playerTwoTics.includes(fieldArray[2])){
                winner("player 2");        
            } else if(gameData.emptyFields === 0){
                tie()
            }
        })
    } 
}

// for each loop that adds marker depending on which field the player clicks
ticFields.forEach(field => {
    field.addEventListener("click", ()=>{
        if (field.textContent === ""){
            addMarker(field);
        }
    });
});


// winner function that reloads the page after choosing a winner
function winner(player){
    alert(`And the winner is: ${player}!`);
    window.location.reload();
}

function tie(){
    alert("issa tie");
    gameData.emptyFields = 9;
    window.location.reload();
}