document.addEventListener('DOMContentLoaded', function() {
  let alphaArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
  let cardFlipped = new Set();
  let flipCount = 0;
  let guesses = 0;
  let playerList = document.querySelector('#playerList');
  let start = document.querySelector('#start');
  let resetBtn = document.querySelector('#reset');
  let name = document.querySelector('#name');
  const game_container = document.getElementById('game_container');
  
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
     let shuffled = shuffle(alphaArray);
      createBoardDiv(shuffled);
  }
  
  function createBoardDiv(array_shuffled) {
  
  for(let i = 0; i < array_shuffled.length; i++) {
      let val = array_shuffled[i];
   let tileDiv = document.createElement('div');
   tileDiv.classList.add(val);
  tileDiv.classList.add('tile');
  tileDiv.id = "card" + i;
  tileDiv.value = val;
  tileDiv.style.float = "left";
  tileDiv.addEventListener("click",checkCard1);
  game_container.append(tileDiv);
  }
  } // end of createBoardDiv


function checkCard1(event) {
  let card = event.target;
   if(cardFlipped.size === 0){
    // console.log(card);
      card.style.backgroundColor = 'purple';
      card.classList.toggle('flip');
      card.innerHTML = card.value;
     cardFlipped.add(card.value);
     guesses++;
     console.log("first time: ", cardFlipped);
      currentCard1 = card;
     } 
  else if(cardFlipped.size === 1) {
    // console.log(card);
     
      card.style.backgroundColor = 'purple';
      card.classList.toggle('flip');
      card.innerHTML = card.value; 
      console.log("second time: ",cardFlipped);
      currentCard2 = card;
           if(cardFlipped.has(card.value))  {
            //   console.log("matched");
               flipCount +=2;
               bgChange(currentCard1,currentCard2,'#4CAF50');
                currentCard1.removeEventListener('click', checkCard1);
               currentCard2.removeEventListener('click', checkCard1); 
              cardFlipped.clear();
              clear_value();
            
                }
                else {
                  setTimeout(() => {
              //   console.log("card not matched");
                      currentCard1.innerHTML = '';
                      currentCard2.innerHTML = '';
                  bgChange(currentCard1,currentCard2,'cadetblue');
                  cardFlipped.clear();
                  clear_value();
               },700);
                
            
              }
  }

  if (flipCount === alphaArray.length) {
     // game_over();
   //   setTimeout(game_over, 1000);
   setTimeout(() => {
      alert('YOU WON!');
  }, 500);
const numberCards = 16;
  localStorage.setItem(name.value, `Your guesses: ${guesses} on ${numberCards} cards`);
let newScore = document.createElement('li');
  newScore.innerText = `${name.value}: ${guesses} guesses on ${numberCards} cards`;
  playerList.append(newScore);

     }

}
  
    start.addEventListener('click', function(e) {
           if (!name.value) {
          alert('Please enter your name');
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
  
  
 /*  function game_over() {
      document.getElementById('game_container').innerHTML = "";
      const p = document.createElement('p');
      p.setAttribute('class', 'completed');
      p.innerText = "You Won"; 
      document.getElementById('game_container').append(p);
      
  } */

   // RESET button to clear localStorage and the Scoreboard
resetBtn.addEventListener('click', function(e) {
  localStorage.clear();
    //  name.value = '';
      flipCount = 0;
      guesses = 0;
  playerList.innerText = '';
  game_container.textContent = '';
     newgame();
}); 
 
  });