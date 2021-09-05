import Deck from "./deck.js"
// imports the code from deck.js this allows you to use the "card deck" 
// for any other card game you would want to create

const CARD_VALUE_MAP ={
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}// converts the card value over to a number so knows "card value"

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck, inRound, stop

// enables us to click to change card for different scenarios below
document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }
    if (inRound) {
        cleanBeforeRound() 
    } else {
        flipCards()
    }
})
// function below starts the game off
startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()
    
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2) 
    // divides card deck in half
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))   
    // gives the first 26 cards from the deck 
    computerDeck =  new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    // This will give us the last 26 cards of the deck
    inRound = false
    stop = false

    cleanBeforeRound()
}

// function below cleans up the card deck to before round
function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = " "
    playerCardSlot.innerHTML = " "
    text.innerText = " "

    updateDeckCount()
}

// function to flip cards by clicking while in the round
function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    // gives player first card
    const computerCard = computerDeck.pop()
    // gives computer first card

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)){
        text.innerText = "Winner"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    // compares player card to computer card value and if player wins it will read "winner"
    // playerDeck.push(playerCard) pushes own card back to bottom of deck
    // playerDeck.push(computerCard) takes the computerCard because it won and adds to bottom of deck
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Loser"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    // compares player card to computer card value and if computer card wins it will read "loser"
    // computerDeck.push(playerCard) pushes player card to bottom of computer deck
    // computerDeck.push(computerCard) pushes own card back to bottom of deck
    } else { 
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
        // if tie takes card back to bottom of own deck
    }

    if (isGameOver(playerDeck)) {
        text.innerText = "You are a Loser!!"
        stop = true
        // player loses, game stops
    } else if (isGameOver(computerDeck)) {
        text.innerText = "Winner winner chicken dinner!!"
        stop = true
        // player wins, game stops
    }
}
function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
} 
// updates the deck count 

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}// comparing card numeric value of card one vs. card two to see "who winner is"

function isGameOver(deck) {
    return deck.numberOfCards === 0
}

