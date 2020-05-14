document.addEventListener('DOMContentLoaded', function() {
  let alphaArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J'];
    let cardFlipped = new Set();
    let flipCount = 0;
    let guesses = 0;
    let playerList = document.querySelector('#playerList');
    let start = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let name = document.querySelector('#name');
    const game_container = document.getElementById('game_container');
    let count = document.querySelector('#count');
    
    // load localStored scores 
    function loadOldScores() {
		let oldScoreboard = Object.entries(localStorage);
		for (let player of oldScoreboard) {
			let oldScore = document.createElement('li');
			oldScore.innerText = `${player[0]}: ${player[1]}`;
			playerList.append(oldScore);
		}
	}
	loadOldScores();

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    function newgame() {
          game_container.textContent='';
      copyCards = [...alphaArray];
			copyCards.length = count.value / 2;
			gameCards = [];
			for (let card of copyCards) {
				gameCards.push(card);
				gameCards.push(card);
			}
        let shuffled = shuffle(gameCards);
        createBoardDiv(shuffled);
    }
    
    function createBoardDiv(array_shuffled) {
        for(let i = 0; i < count.value; i++) {
        let val = array_shuffled[i];
        let tileDiv = document.createElement('div');
        tileDiv.classList.add(val);
        tileDiv.classList.add('tile');
        tileDiv.id = "card" + i;
        tileDiv.value = val;
        tileDiv.style.float = "left";
        tileDiv.addEventListener("click",checkCard1);
        game_container.classList.add('add');
        game_container.append(tileDiv);
       }
    } // end of createBoardDiv

  // check for cards matching
function checkCard1(event) {
    let card = event.target;
     if(cardFlipped.size === 0){
        card.style.backgroundColor = 'purple';
        card.classList.toggle('flip');
        card.innerHTML = card.value;
       cardFlipped.add(card.value);
       guesses++;
       currentCard1 = card;
       } 
    else if(cardFlipped.size === 1) {
        card.style.backgroundColor = 'purple';
        card.classList.toggle('flip');
        card.innerHTML = card.value; 
            currentCard2 = card;
             if(cardFlipped.has(card.value))  {
                 flipCount +=2;
                 bgChange(currentCard1,currentCard2,'#4CAF50');
                  currentCard1.removeEventListener('click', checkCard1);
                 currentCard2.removeEventListener('click', checkCard1); 
                cardFlipped.clear();
                clear_value();
                }
                  else {
                    setTimeout(() => {
                        currentCard1.innerHTML = '';
                        currentCard2.innerHTML = '';
                    bgChange(currentCard1,currentCard2,'cadetblue');
                    cardFlipped.clear();
                    clear_value();
                 },700);
             }
    }
   // check if all flipped - game  over 
    if (flipCount === parseInt(count.value)) {
        setTimeout(() => {
        alert('YOU WON!');
    }, 500);
  const numberCards = 16;
    localStorage.setItem(name.value, `guesses: ${guesses} on ${count.value} cards`);
	let newScore = document.createElement('li');
    newScore.innerText = `${name.value}: ${guesses} guesses on ${count.value} cards`;
		playerList.append(newScore);

       }
}
    
      start.addEventListener('click', function(e) {
        flipCount = 0;
        guesses = 0;
        if (!name.value || !count.value) {
            alert('Please enter all values');
        } else {
                newgame();
        }
    
    });
        
     function bgChange(element1,element2,color){
       element1.style.backgroundColor = `${color}`;
       element2.style.backgroundColor =`${color}`;
    }
    
    function clear_value(){
      currentCard1 = null;
      currentCard2 = null;
    }
     
     // RESET button to clear localStorage and the Scoreboard
	resetBtn.addEventListener('click', function(e) {
		localStorage.clear();
      //  name.value = '';
      count.value = '';
        flipCount = 0;
        guesses = 0;
    playerList.innerText = '';
    game_container.classList.remove('add');
    game_container.textContent = '';
    
       newgame();
	}); 
   
    });