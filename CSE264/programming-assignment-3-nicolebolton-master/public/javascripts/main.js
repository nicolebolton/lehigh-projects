/*
 * This files holds all the code to for your card game
 */

//Run once broswer has loaded everything
window.onload = function () {

    //values to keep track of during game
    let deckId;
    let playerScore = 0;
    let dealerScore = 0;
    let playerHand = []; //card objects in player hand
    let dealerHand = []; //card objects in dealer hand
    let positionPCards = 40; // position for when cards move
    let positionDCards = 40; // position for when cards move
    let cards = 5; // total number of cards in play, set to 5 because 4 to start
    let hiddenCard; // hidden dealer card

    //at start of game, load modal
    $('.ui.modal.startgame')
      .modal('show')
    ;

    //click start game button begin play
    document.getElementById("start-game")
      .addEventListener("click", startGame, false);

    //click new game, reset and start a new game
    document.getElementById("new-game")
      .addEventListener("click", function(e) {
          resetGame();
          startGame();
      });

    //click hit button, administer new card
    document.getElementById("hit")
      .addEventListener("click", function(e) {
          hitCard();
      }, false);

    //click stay, begin dealer round
    document.getElementById("stay")
      .addEventListener("click", function(e) {
          flipCard(hiddenCard); //reveal the hidden card
          updateDealerScore(dealerScore); //update score

          // if dealer score is greater than player score dealer wins
          if (dealerScore > playerScore) {
              determineWinner();
              setTimeout(endGame, 1000);
          }

          //if dealer score is less than 17, deal new card
          else if (dealerScore < 17) {
              dealCard();
              updateDealerScore();
          }

          //if dealer score greater than 17, deal no cards
          else {
              determineWinner();
              setTimeout(endGame, 1000);
          }
      }, false);

    //click play-again, reset game and start new game
    document.getElementById("play-again")
      .addEventListener("click", function(e) {
          resetGame();
          startGame();
      }, false);


    /* to start game create a new card deck, save the deck_id and
        then deal player hand and dealer hand
     */
    function startGame() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(async jsonResponse => {
            console.log(jsonResponse);
            deckId = jsonResponse.deck_id;
            console.log(deckId);
            await dealDealerHand();
            await dealPlayerHand();
        });
    }

    /* to deal dealer hand at start of game */
    function dealDealerHand() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.cards;
        }).then(cards => {
            //add two cards to dealerHand
            dealerHand.push(cards[0]);
            dealerHand.push(cards[1]);

            //set hidden card, add cards to document and move cards to dealer side
            hiddenCard = cards[0];
            setTimeout(addCard(cards[0]), 3000);
            moveCard(cards[0], null, [30, -30], 3, 1);

            addCard(cards[1]);
            setTimeout(flipCard(cards[1]), 4000);
            moveCard(cards[1], null, [35, -30], 4, 2);

            dealerScore = calculateScore(dealerHand);

            return;
        }).then(() => {
            //check player hand for black jack
            playerScore = calculateScore(playerHand);
            setTimeout(checkBlackjack, 5000);
        })
    }

    /* to deal player hand at start of game */
    function dealPlayerHand() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.cards;
        }).then(cards => {
            //add cards to playerHand and document, move them to position
            playerHand.push(cards[0]);
            addCard(cards[0]);
            setTimeout(flipCard(cards[0]), 1000);
            moveCard(cards[0], 'player', [30, 25], 1, 3);
            return cards;
        }).then(cards => {
            playerHand.push(cards[1]);
            addCard(cards[1]);
            setTimeout(flipCard(cards[1]), 2000);
            moveCard(cards[1], 'player', [35, 25], 2, 4);
            return;
        }).then(() => {
            //check player hand for blackjack
            playerScore = calculateScore(playerHand);
            setTimeout(checkBlackjack, 3000);
            return;
        })

    }

    /* to add a card to webpage */
    function addCard(card) {
        //create a new card div
        let newCard = document.createElement('div');
        newCard.id = card.code;
        newCard.className = 'card';

        //create nested card-face div with card image inside
        let cardFace = document.createElement('div');
        let img = document.createElement('img');
        img.src = card.image;
        cardFace.appendChild(img);
        //cardFace.id = card.code;
        cardFace.className = 'card-face';

        //create nested card-back div with image of card back inside
        let cardBack = document.createElement('div');
        let backImg = document.createElement('img');
        backImg.src = "//cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695";
        cardBack.appendChild(backImg);
        cardBack.className = 'card-back';

        //append cardFace and cardBack divs to card div
        newCard.append(cardFace);
        newCard.append(cardBack);

        //append the entire card to the pile
        document.getElementById("pile").append(newCard);
    }

    /* to flip a given card */
    function flipCard(card) {
        //hide the card face initially so that it reveals itself when flipped, flip card with transition
        document.getElementById(card.code).childNodes[0].style.visibility = 'hidden';
        $('#' + card.code + ' img').transition({
            animation: 'horizontal flip',
            duration: 2000
        });
    }

    /* to move a given card
    *  specify the user, end place array, duration, and i= # cards in play
    */
    function moveCard(card, user, place, time, i) {
        //disable buttons so they cant be pushed while cards are moving
        document.getElementById("hit").disabled = true;
        document.getElementById("stay").disabled = true;

        //get card to be moved
        let moveCard = document.getElementById(card.code);

        //create a new style to move the card to the specific place
        let styles = `@keyframes moveContent${i} {
              from { transform : translateY(0em) }
              to   { transform : translate(${place[0]}vw, ${place[1]}vh) }
            }`;

        //add transition style to document
        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        moveCard.style.animationDelay = `${time}s`;
        moveCard.style.animationDuration = '2s';
        moveCard.style.animationName = `moveContent${i}`;
        moveCard.style.animationFillMode = 'forwards';

        //event listener for when the animation ends, when it ends update player or dealer score
        moveCard.addEventListener("animationend", function(e) {
            document.getElementById("hit").disabled = false;
            document.getElementById("stay").disabled = false;
            if (user === 'player') {
                playerScore = calculateScore(playerHand);
                updatePlayerScore();
            }
            else if (user === 'dealer'){
                dealerScore = calculateScore(dealerHand);
                updateDealerScore();
            }
        }, false);

    }

    /* to hit a card */
    function hitCard() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.cards;
        }).then(card => {
            //add card to playerHand and the document
            playerHand.push(card[0]);
            addCard(card[0]);
            return card[0];
        }).then((card) => {
            //move and flip card
            moveCard(card, 'player', [positionPCards, 25], 1, cards);
            flipCard(card);
            positionPCards += 5; //update position so next card doesn't overlap
            cards ++; //update number of cards in play
            return;
        }).then( () => {
            playerScore = calculateScore(playerHand);
            setTimeout(checkBust, 3000);
            setTimeout(checkBlackjack, 3000);
            return;
        })
    }

    /* to deal a dealer card after user chooses stay*/
    function dealCard() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.cards;
        }).then(card => {
            //add card to dealerHand and the document
            dealerHand.push(card[0]);
            addCard(card[0]);
            return card[0];
        }).then(card => {
            //move and flip card
            moveCard(card, 'dealer', [positionDCards, -30], 1, cards);
            flipCard(card);
            positionDCards += 5; //update position so next card doesn't overlap
            cards++; //update number of cards in play
            dealerScore = calculateScore(dealerHand);
            setTimeout(updateDealerScore, 3000);
        }).then(() => {
            //determine if the dealer should take another card, have busted, or determine the winner
            if (dealerScore < 17) {
                setTimeout(dealCard, 2000);
                return;
            }
            else if (dealerScore > 21) {
                document.getElementById("result").innerHTML = "Dealer Busted!";
                document.getElementById("result-description").innerHTML = "You win! Congrats! Want to play again?";
                setTimeout(endGame, 3000);
            }
            else {
                determineWinner();
                setTimeout(endGame, 3000);
            }
        });
    }
    /* calculate score of a given hand*/
    function calculateScore(hand) {
        //will have to keep track of the number of aces and total sum
        let aces = 0;
        let sum = 0;
        //determine the value of each card and add it to the sum
        hand.forEach(card => {
            let points = card2Points(card.value);
            if (points === "ACE") {
                aces++;
                sum += 11;
            }
            else {
                sum += points;
            }
        });
        //determines if score is over 21 and have aces, change those ace values to be 1 and recalculate score
        while (aces > 0 && sum > 21) {
            aces -= 1;
            sum -= 10;
        }
        return sum;
    }

    /* take a card and turn it into points */
    function card2Points(card) {
        //if a number card, return the number value
        if (!isNaN(Number(card))) {
            return Number(card);
        }
        //if ace return ACE, this will be handled in the calculate score
        else if (card === "ACE") {
            return "ACE";
        }
        //if a face card, return 10
        else {
            return 10;
        }
    }

    /* check if player has busted, if so update result module and end game*/
    function checkBust() {
        if (playerScore > 21) {
            document.getElementById("result").innerHTML = "Busted!";
            document.getElementById("result-description").innerHTML = "Sorry, looks like you busted! Want to play again?";
            endGame();
        }
    }

    /* check if player has gotten black jack, if they have update result module and end game*/
    async function checkBlackjack() {
        if (playerScore == 21 && dealerScore != 21) {
            await flipCard(hiddenCard);
            document.getElementById("result").innerHTML = "Blackjack!";
            document.getElementById("result-description").innerHTML = "You got Blackjack! Congrats! Want to play again?";
            setTimeout(endGame, 1000);
        }
        else if (playerScore == 21 && dealerScore == 21) {
            await flipCard(hiddenCard);
            document.getElementById("result").innerHTML = "It's a Tie!";
            document.getElementById("result-description").innerHTML = "You both got Blackjack! Want to play again?";
            setTimeout(endGame, 1000);
        }
    }

    /* if no bust or blackjack, determine the winner by whoever has more points */
    function determineWinner() {
        if (dealerScore > 21 || playerScore > 21) return;
        else if (dealerScore == playerScore) {
            document.getElementById("result").innerHTML = "It's a Tie!";
            document.getElementById("result-description").innerHTML = "No one wins this time! Want to play again?";
        }
        else if (dealerScore > playerScore) {
            document.getElementById("result").innerHTML = "You Lose!";
            document.getElementById("result-description").innerHTML = "Sorry, the dealer won this round. Want to play again?";
        }
        else {
            document.getElementById("result").innerHTML = "You Win!";
            document.getElementById("result-description").innerHTML = "You win! Congrats! Want to play again?";
        }
    }

    /* update the HTML of player score */
    function updatePlayerScore() {
        document.getElementById("player-score").innerHTML = playerScore;
    }

    /* update the HTML of dealer score */
    function updateDealerScore() {
        document.getElementById("dealer-score").innerHTML = dealerScore;
    }

    /* to end game, disable buttons and show the game-over module */
    function endGame() {
        document.getElementById("hit").disabled = true;
        document.getElementById("stay").disabled = true;

        $('.ui.modal.gameover')
          .modal('show')
        ;
    }

    /* reset all inital values in game and clear the table */
    function resetGame() {
        playerScore = 0;
        dealerScore = 0;
        playerHand = [];
        dealerHand = [];
        positionPCards = 40;
        positionDCards = 40;
        cards = 5;
        document.getElementById("player-score").innerHTML = playerScore;
        document.getElementById("dealer-score").innerHTML = '';
        document.getElementById("pile").innerHTML = '';
        document.getElementById("hit").disabled = false;
        document.getElementById("stay").disabled = false;
    }
};
