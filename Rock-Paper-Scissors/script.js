
const result = document.querySelector('.js-result');
const you = document.querySelector('.js-you');
const computer = document.querySelector('.js-computer');
const yourScore = document.querySelector('.js-score');
const computerScoreElement = document.querySelector('.js-computer-score');
const resetBtn = document.querySelector('.js-reset');
let playerScore = 0 ;
let computerScore = 0;
document.querySelector('.js-rock')
  .addEventListener('click', () => {
  playGame('rock')
  });
  document.querySelector('.js-paper')
  .addEventListener('click', () => {
   playGame('paper')
  });
  document.querySelector('.js-scissors')
  .addEventListener('click', () => {
  playGame('scissors')
  });
  resetBtn.addEventListener('click', () =>{
   resetGame();
   you.innerHTML = 'You:';
   computer.innerHTML = 'computer:';
   result.innerHTML = 'Result:'
   yourScore.innerHTML = 'Your score: 0';
   computerScoreElement.innerHTML = 'Computer score: 0';
  });
  const choices = ['rock', 'paper', 'scissors'];
  function computerMove(){
  const randomNumber = Math.floor(Math.random() * 3);
   return choices[randomNumber];
  
  }
  function updateScore(){
     yourScore.innerHTML = `Your score: ${playerScore}`;
    computerScoreElement.innerHTML  = `computer score: ${computerScore}`;
  }
  function playGame(playerChoice){
  you.innerHTML = `You: ${playerChoice}`
  const computerChoice =  computerMove();
  computer.innerHTML = `Computer: ${computerChoice}`;
  if((playerChoice ==='rock' && computerChoice === 'scissors')||
    (playerChoice === 'paper' && computerChoice === 'rock')||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  )  {
    result.innerHTML = 'You win!';
    playerScore++;
  } else if (computerChoice === playerChoice) {
    result.innerHTML = 'Tie!';
  } else {
    result.innerHTML = 'You lose!';
    computerScore++;
  }
  updateScore();
  
  }
  function resetGame(){
  playerScore = 0
  computerScore = 0
  you.innerHTML = '';
  computer.innerHTML = '';
  result.innerHTML = '';
  updateScore();
  }
 
 
