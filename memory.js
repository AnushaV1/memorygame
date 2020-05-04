
 let alphaArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
 var array_shuffled = [];
 var currentValue = [];
 var flipCount = 0;
 var currentCardId = [];
  array_shuffled = shuffleArray(alphaArray);
 
  function shuffleArray(array) {
         for (let i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
     }
     return array;
 }
 
 let game_container = document.getElementById('game_container');
 
 document.getElementById('game_container').innerHTML = "";
 for(let i = 0; i < array_shuffled.length; i++) {
  let tileDiv = document.createElement('div');
 tileDiv.setAttribute('class','tile');
 tileDiv.id = "card" + i;
 tileDiv.value = array_shuffled[i];
 let div_container = document.createElement('div');
 div_container.style.float = "left";
 
 
 tileDiv.addEventListener("click",function() {
 checkCard(this);
 },false);
 div_container.appendChild(tileDiv);
 game_container.appendChild(div_container);
 }
 
 function checkCard(card){ // compare card values 
 var current_game;
    if(card.innerHTML === "" && currentValue.length < 2) {   
     card.innerHTML = card.value;
     card.style.backgroundColor = 'white';
     //card.classList.toggle('flip');
 
         if(currentValue.length === 0){
           currentValue.push(card.value);
           currentCardId.push(card.id);
         }
         else if(currentValue.length == 1){
           currentValue.push(card.value);
           currentCardId.push(card.id);
       
                if(currentValue[0] == currentValue[1]){
                 console.log("matched");
                 flipCount +=2;
                 bgChange(currentCardId[0],currentCardId[1],'#4CAF50');
                 clear_value(); 
 
 
                 if (flipCount === array_shuffled.length) {
                   var game_over = function() {
                     document.getElementById('game_container').innerHTML = "";
                     const p = document.createElement('p');
                     p.setAttribute('class', 'completed');
                     p.innerText = "You Won"; 
                     document.getElementById('game_container').append(p);
                      };
                      setTimeout(game_over, 1000);
                     }
                 }
                 else {
                   current_game = function () {
                     document.getElementById(currentCardId[0]).innerHTML = "";
                     bgChange(currentCardId[0],currentCardId[1],'cadetblue');
                     document.getElementById(currentCardId[1]).innerHTML = "";
                    clear_value();
                   };
                 setTimeout(current_game, 700);
                 }
 
     }
    }
  } // end of function 
 
  function bgChange(id1,id2,color){
     this.id1 = id1;
     this.id2 = id2;
     this.color = color;
 let element1 = document.getElementById(`${this.id1}`);
 element1.style.backgroundColor =`${this.color}`;
 let element2 = document.getElementById(`${this.id2}`);
 element2.style.backgroundColor =`${this.color}`;
 }
 
 function clear_value(){
   currentValue.length = 0;
   currentCardId.length = 0;
 }