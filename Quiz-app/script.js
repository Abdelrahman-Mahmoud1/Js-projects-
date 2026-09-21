
const quizData = [
  {
   qusetion: 'what Dom stand for',
   answers: ['java' , 'object Model' , 'document object model' , 'python'],
   correct: 'document object model'
  }, {
   qusetion:'what the capital of egypt',
   answers:['paris', 'cairo' ,'alex' , 'minia'],
   correct: 'cairo'
  },  {
   qusetion:'what the capital of france',
   answers:['paris', 'cairo' ,'alex' , 'minia'],
   correct: 'paris'
  },  {
   qusetion:'what the capital of spain',
   answers:['paris', 'cairo' ,'madrid' , 'minia'],
   correct: 'madrid'
  },  {
   qusetion:'what the capital of usa',
   answers:['paris', 'cairo' ,'madrid' , 'washintain'],
   correct: 'washintain'
  }
];
let currentQuestion = 0;
let playerScore = 0;
const question = document.querySelector('.js-question');
const answer1 = document.querySelector('.js-answer-1');
const answer2 = document.querySelector('.js-answer-2');
const answer3 = document.querySelector('.js-answer-3');
const answer4 = document.querySelector('.js-answer-4');
const nextBtn = document.querySelector('.js-next');
const score = document.querySelector('.js-score');
 
function renderQuestion(){
  
    if(currentQuestion >= quizData.length){
    question.innerHTML = `Quiz finished!`
    score.innerHTML = `you got: ${playerScore} / ${quizData.length}`
    nextBtn.disabled = true;
    return;
  }
  const current = quizData[currentQuestion];
  question.innerHTML = current.qusetion;
  answer1.innerHTML = current.answers[0];
  answer2.innerHTML = current.answers[1];
  answer3.innerHTML = current.answers[2];
  answer4.innerHTML = current.answers[3];
}
let questionAnswer = false;
function checkAnswer(selectedAnswer){

if(currentQuestion >= quizData.length){
  return;
}
if(questionAnswer === true){
  return;
}else {
 questionAnswer = true;
 
}
const current = quizData[currentQuestion];

if(selectedAnswer === current.correct){
   playerScore++; 
}
score.innerHTML = `Score: ${playerScore}`;
answer1.disabled = true;
answer2.disabled = true;
answer3.disabled = true;
answer4.disabled = true;
}

answer1.addEventListener('click', () => checkAnswer(answer1.innerText));
answer2.addEventListener('click', () => checkAnswer(answer2.innerText));
answer3.addEventListener('click', () => checkAnswer(answer3.innerText));
answer4.addEventListener('click', () => checkAnswer(answer4.innerText));
nextBtn.addEventListener('click' , () =>{
  currentQuestion++;
  questionAnswer = false;
  answer1.disabled = false;
  answer2.disabled = false;
  answer3.disabled = false;
  answer4.disabled = false;
  renderQuestion();
  
})
renderQuestion();

