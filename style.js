// Challenge 1: Your Age in Days

function birthYear (){
    let yearOfBirth = prompt("What is your year of birth?");
    let totalDays = (2020 - yearOfBirth) * 365;
    let h1 = document.createElement("h1");
    let textAnswer = document.createTextNode("You're about " + totalDays + " days old");
    h1.setAttribute("id", "birthYear");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
}


function reset(){
    document.getElementById("birthYear").remove();
}



// Challenge 2: Cat Generator
let url = "./tumblr_krvvxawUd81qa9hjso1_1280.jpg";

function generateCat(){
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");
    image.src = url;
    div.appendChild(image);
}



function reset_img(){
    // document.getElementById("flex-cat-gen").remove();
    document.querySelector("img").remove();
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log("comuputer choice:", botChoice)
    results = decideWinner(humanChoice, botChoice);
    console.log(results)
    message = finalMessage(results);
    
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ["rock", "paper", "scissors"][number]
}

function decideWinner(yourChoice, computerChoice){ 
    let rpsDatabase = {
        "rock": {"scissors": 1, "rock": 0.5, "paper": 0},
        "paper": {"rock": 1, "paper": 0.5, "scissors": 0},
        "scissors": {"paper": 1, "scissors": 0.5, "rock": 0}
    };

    let yourScore = rpsDatabase[yourChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0){
        return {"message": "You lost!", "color": "red"};
    }else if(yourScore === 0.5){
        return {"message": "Your tied", "color": "yellow"};
    }else{
        return {"message": "You won", "color": "green"};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
         "rock": document.getElementById("rock").src,
         "paper": document.getElementById("paper").src,
         "scissors": document.getElementById("scissors").src
    }

    // remove all images
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    let humanDiv = document.createElement("div");
    let botDiv = document.createElement("div");
    let messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] +"' heigth=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage ['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] +"' heigth=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
}


// Challenge 4: Change the color of the button
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];

for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

// console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
   if (buttonThingy.value === "red"){
       buttonsRed();
   } else if (buttonThingy.value === "green"){
       buttonsGreen();
   } else if (buttonThingy.value === "reset"){
       buttonsReset();
   } else if (buttonThingy.value === "random"){
       buttonsRandom();
   }
}


function buttonsRed(){
    for (let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}


function buttonsGreen(){
    for (let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}


function buttonsReset(){
    for (let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    var choices = ["btn-primary", "btn-success", "btn-danger", "btn-warning"];

    for (let i=0; i < all_buttons.length; i++){
        let randomNum = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNum]);
    }
}

// Challenge 5: Blvckjack

let blackjackGame = {
    "you": {"scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0, "name": "You"},
    "dealer": {"scoreSpan": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0, "name": "Dealer"},
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
    "cardsMap": {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "K":10, "J":10, "Q":10, "A":[1, 11]},
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "isStand": false,
    "isOver": false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];



const hitSound = new Audio("./sounds/swish.m4a");
const winSound = new Audio("./sounds/cash.mp3");
const lossSound = new Audio("./sounds/aww.mp3");

document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener("click", dealerLogic);

document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal);


function blackjackHit(){
    if (blackjackGame["isStand"] === false){
        let card = randomCard();
        console.log(card)
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU["score"]);
    }
}


 function randomCard(){
    let random = Math.floor(Math.random() * 13);
    console.log(random)
    return blackjackGame["cards"][random];
}


function showCard(card,activePlayer){
    if (activePlayer["score"] <= 21){
        let cardImage = document.createElement("img");
        cardImage.src = `./images/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame["turnOver"] === true){
        blackjackGame["isStand"] = false;
        let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
        
        for (i = 0; i<yourImages.length; i++){
            yourImages[i].remove()
        }

        for (i = 0; i<dealerImages.length; i++){
            dealerImages[i].remove()
        }

        YOU["score"] = 0;
        DEALER["score"] = 0;

        document.querySelector("#your-blackjack-result").textContent = 0;
        document.querySelector("#dealer-blackjack-result").textContent = 0;

        document.querySelector("#your-blackjack-result").style.color = "white";
        document.querySelector("#dealer-blackjack-result").style.color = "white";

        document.querySelector("#blackjack-result").textContent = "Let's Play"
        document.querySelector("#blackjack-result").style.color = "black";

        blackjackGame["turnOver"] = true;
        }
}

function updateScore (card, activePlayer){
    // if dding 11 keeps me below 21, and 11. Otherwise, add 1
    if (card === "A"){
        if(activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21){
            activePlayer["score"] += blackjackGame["cardsMap"][card][1];
         }else{
             activePlayer["score"] += blackjackGame["cardsMap"][card];
         }
    } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
}


function showScore(activePlayer){
    if (activePlayer["score"] > 21){
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST"
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
    } else {
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame["isStand"] = true;

    while (DEALER["score"] < 16 && blackjackGame["isStand"] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }


        blackjackGame["turnOver"] = true;
        let winner = computeWinner();
        showResult(winner);
}




// compute winner and return who just won
// update the win, draws and losses
function computeWinner(){
    let winner;

    if (YOU["score"] <= 21){
        // condition: higher score than the dealer
        if (YOU["score"] > DEALER["score"] || (DEALER["score"] > 21)){
            blackjackGame["wins"]++;
            winner = YOU;
        } else if(YOU["score"] < DEALER["score"]){
            blackjackGame["losses"]++;
            winner = DEALER;
        } else if(DEALER["score"] === YOU["score"]){
            blackjackGame["draws"]++;
        } 
    // condition: when user bust but dealer doesn't
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21){
        blackjackGame["losses"]++;
        winner = DEALER;

    // condition: when you both bust
    } else if (YOU["score"] > 21 && DEALER["score"]> 21){
        blackjackGame["draws"]++;
    }

    return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame["turnOver"]){
        if(winner === YOU){
            document.querySelector("#wins").textContent = blackjackGame["wins"];
            
            message = "You won!";
            messageColor = "green";
            winSound.play();
        } else if (winner === DEALER){

            document.querySelector("#losses").textContent = blackjackGame["losses"];
            message = "You lost";
            messageColor = "red";
            lossSound.play();
        } else{
            document.querySelector("#draws").textContent = blackjackGame["draws"];
            message = "You drew";
            messageColor = "black";
        }

        document.querySelector("#blackjack-result").textContent = message;
        document.querySelector("#blackjack-result").style.color = messageColor;

    }
}