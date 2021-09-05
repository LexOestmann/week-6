// credit should be given to Web Dev Simplified and his awesome step by step video for
// walking me through this code youTube link ==> https://www.youtube.com/watch?v=NxRwIZWjLtE 

const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

// created a class named Deck below which is the default export which we can use in any card game
export default class Deck {
    constructor(cards = freshDeck()) {
      this.cards = cards
    }
  
    get numberOfCards() {
      return this.cards.length
    }

    pop() {
        return this.cards.shift() 
    } // returns to us the top element

    push(card) {
        this.cards.push(card)
    } // returns a card to bottom of deck

// shuffle function
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
          const newIndex = Math.floor(Math.random() * (i + 1))
          const oldValue = this.cards[newIndex]
          this.cards[newIndex] = this.cards[i]
          this.cards[i] = oldValue
        }
      }
    }

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}


function freshDeck(){
    return SUITS.flatMap(suit => {
        return VALUES.map(value =>{
            return new Card(suit, value)
        })
        
    })
}