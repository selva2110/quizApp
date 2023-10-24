const questions =[
    {
        question: "what is 2*2?",
        answers:[
            {text:"2", correct:false},
            {text:"4", correct:true},
            {text:"5", correct:false},
            {text:"6", correct:false}
        ]
    },
    {
        question: "How many fingers does humans have?",
        answers:[
            {text:"10", correct:false},
            {text:"20", correct:true},
            {text:"30", correct:false},
            {text:"40", correct:false}
        ]
    },{
        question: "what come after friday?",
        answers:[
            {text:"sunday", correct:false},
            {text:"weekend", correct:true},
            {text:"vacation", correct:false},
            {text:"sleep", correct:false}
        ]
    },{
        question: "who are you?",
        answers:[
            {text:"genious", correct:false},
            {text:"fool", correct:true},
            {text:"looser", correct:false},
            {text:"President", correct:false}
        ]
    },{
        question: "India or Bharat?",
        answers:[
            {text:"India", correct:false},
            {text:"Bharat", correct:false},
            {text:"Who cares!", correct:false},
            {text:"Not Aware", correct:true}
        ]
    }
    
];

const questionElement =document.getElementById("question");
const answerElements = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next");

let questionIndex = 0;
let score =0;

function startQuiz(){
    questionIndex = 0;
    score =0
    nextButton.innerHTML = 'Next';
    showQuestion();
}


function showQuestion(){
    restState();
    let currentQuestion = questions[questionIndex];
    let QuestionNumber = questionIndex + 1;
    questionElement.innerHTML= QuestionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerElements.appendChild(button);
        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function restState(){
    nextButton.style.display = "none";
        while(answerElements.firstChild){
        answerElements.removeChild(answerElements.firstChild);
    }

}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.append(" CORRECT!")
        selectedButton.classList.add('correct');
        score++;
    }else{
        selectedButton.append( " INCORRECT!")
        selectedButton.classList.add('incorrect');
    }

    Array.from(answerElements.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    restState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(questionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz();
    }
})

startQuiz();