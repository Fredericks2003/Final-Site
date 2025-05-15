<script lang="ts">
  import { onMount } from 'svelte';
  import holidays from '../data/holidays.json';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  
  // Quiz state
  let quiz = {
    started: false,
    ended: false,
    currentQuestion: 0,
    score: 0,
    totalQuestions: 0,
    questions: [],
    selectedAnswer: null,
    answerSubmitted: false,
    timeLeft: 15,
    timer: null
  };
  
  // Generate questions from holidays data
  function generateQuestions() {
    const questions = [];
    
    // Question 1: Holiday by description
    for (let i = 0; i < holidays.length; i++) {
      const holiday = holidays[i];
      const options = [holiday.name];
      
      // Add 3 random incorrect options
      while (options.length < 4) {
        const randomHoliday = holidays[Math.floor(Math.random() * holidays.length)];
        if (!options.includes(randomHoliday.name)) {
          options.push(randomHoliday.name);
        }
      }
      
      // Shuffle options
      shuffleArray(options);
      
      questions.push({
        type: 'description',
        question: `Which holiday is described as: "${holiday.description}"`,
        options: options,
        correctAnswer: holiday.name
      });
    }
    
    // Question 2: Holiday by date
    for (let i = 0; i < holidays.length; i++) {
      const holiday = holidays[i];
      // Format date from MM-DD to Month Day
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const dateParts = holiday.date.split('-');
      const formattedDate = `${months[parseInt(dateParts[0]) - 1]} ${parseInt(dateParts[1])}`;
      
      const options = [holiday.name];
      
      // Add 3 random incorrect options
      while (options.length < 4) {
        const randomHoliday = holidays[Math.floor(Math.random() * holidays.length)];
        if (!options.includes(randomHoliday.name)) {
          options.push(randomHoliday.name);
        }
      }
      
      // Shuffle options
      shuffleArray(options);
      
      questions.push({
        type: 'date',
        question: `Which holiday is celebrated on ${formattedDate}?`,
        options: options,
        correctAnswer: holiday.name
      });
    }
    
    // Question 3: Fun Fact questions
    for (let i = 0; i < holidays.length; i++) {
      const holiday = holidays[i];
      if (holiday.funFact) {
        const options = [holiday.name];
        
        // Add 3 random incorrect options
        while (options.length < 4) {
          const randomHoliday = holidays[Math.floor(Math.random() * holidays.length)];
          if (!options.includes(randomHoliday.name)) {
            options.push(randomHoliday.name);
          }
        }
        
        // Shuffle options
        shuffleArray(options);
        
        questions.push({
          type: 'funFact',
          question: `Which holiday has this fun fact: "${holiday.funFact}"`,
          options: options,
          correctAnswer: holiday.name
        });
      }
    }
    
    // Shuffle all questions and take the first 10
    shuffleArray(questions);
    return questions.slice(0, 10);
  }
  
  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Start the quiz
  function startQuiz() {
    quiz.questions = generateQuestions();
    quiz.totalQuestions = quiz.questions.length;
    quiz.started = true;
    quiz.ended = false;
    quiz.currentQuestion = 0;
    quiz.score = 0;
    quiz.selectedAnswer = null;
    quiz.answerSubmitted = false;
    
    // Start the timer
    startTimer();
  }
  
  // Start timer for current question
  function startTimer() {
    quiz.timeLeft = 15;
    clearInterval(quiz.timer);
    
    quiz.timer = setInterval(() => {
      quiz.timeLeft--;
      
      if (quiz.timeLeft <= 0) {
        clearInterval(quiz.timer);
        submitAnswer();
      }
    }, 1000);
  }
  
  // Select an answer
  function selectAnswer(answer) {
    if (!quiz.answerSubmitted) {
      quiz.selectedAnswer = answer;
    }
  }
  
  // Submit answer
  function submitAnswer() {
    clearInterval(quiz.timer);
    quiz.answerSubmitted = true;
    
    // Check if answer is correct
    const currentQuestion = quiz.questions[quiz.currentQuestion];
    if (quiz.selectedAnswer === currentQuestion.correctAnswer) {
      quiz.score++;
    }
  }
  
  // Go to next question
  function nextQuestion() {
    if (quiz.currentQuestion < quiz.totalQuestions - 1) {
      quiz.currentQuestion++;
      quiz.selectedAnswer = null;
      quiz.answerSubmitted = false;
      startTimer();
    } else {
      endQuiz();
    }
  }
  
  // End the quiz
  function endQuiz() {
    quiz.ended = true;
    clearInterval(quiz.timer);
  }
  
  // Get badge based on score
  function getBadge() {
    const percentage = (quiz.score / quiz.totalQuestions) * 100;
    
    if (percentage >= 90) {
      return {
        title: "Holiday Expert",
        description: "You're a true holiday connoisseur!",
        color: "gold"
      };
    } else if (percentage >= 70) {
      return {
        title: "Holiday Enthusiast",
        description: "You know your holidays well!",
        color: "silver"
      };
    } else if (percentage >= 50) {
      return {
        title: "Holiday Novice",
        description: "You're on your way to becoming a holiday expert!",
        color: "bronze"
      };
    } else {
      return {
        title: "Holiday Beginner",
        description: "Keep exploring to learn more about obscure holidays!",
        color: "blue"
      };
    }
  }
  
  // Clean up timer when component is destroyed
  onMount(() => {
    return () => {
      clearInterval(quiz.timer);
    };
  });
</script>

<div class="quiz-page">
  {#if !quiz.started}
    <div class="intro" in:fade={{ duration: 300 }}>
      <h1>Holiday Trivia Quiz</h1>
      <p class="subtitle">Test your knowledge of obscure holidays!</p>
      
      <div class="quiz-info">
        <div class="info-item">
          <div class="info-icon">🎮</div>
          <div class="info-text">
            <h3>How to Play</h3>
            <p>Answer 10 questions about obscure holidays. Each question has a 15-second time limit.</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">🏆</div>
          <div class="info-text">
            <h3>Scoring</h3>
            <p>1 point for each correct answer. Earn badges based on your final score!</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">🎯</div>
          <div class="info-text">
            <h3>Question Types</h3>
            <p>Identify holidays by descriptions, dates, and fun facts.</p>
          </div>
        </div>
      </div>
      
      <button class="start-button" on:click={startQuiz}>
        Start Quiz
      </button>
    </div>
  {:else if quiz.ended}
    <div class="results" in:fade={{ duration: 300 }}>
      <h1>Quiz Results</h1>
      
      <div class="score-display">
        <div class="score-circle">
          <span class="score">{quiz.score}</span>
          <span class="total">/{quiz.totalQuestions}</span>
        </div>
        <p class="percentage">{Math.round((quiz.score / quiz.totalQuestions) * 100)}%</p>
      </div>
      
      <div class="badge" style="background-color: {getBadge().color}">
        <h2>{getBadge().title}</h2>
        <p>{getBadge().description}</p>
      </div>
      
      <button class="restart-button" on:click={startQuiz}>
        Play Again
      </button>
    </div>
  {:else}
    <div class="quiz-container" in:fade={{ duration: 300 }}>
      <div class="quiz-header">
        <div class="progress-container">
          <div class="progress-bar" style="width: {((quiz.currentQuestion + 1) / quiz.totalQuestions) * 100}%"></div>
        </div>
        <div class="quiz-info-bar">
          <span class="question-counter">Question {quiz.currentQuestion + 1}/{quiz.totalQuestions}</span>
          <span class="timer" class:warning={quiz.timeLeft <= 5}>
            Time Left: {quiz.timeLeft}s
          </span>
          <span class="score-counter">Score: {quiz.score}</span>
        </div>
      </div>
      
      <div class="question-container">
        <h2 class="question" in:fly={{ y: -20, duration: 300 }}>
          {quiz.questions[quiz.currentQuestion].question}
        </h2>
        
        <div class="options">
          {#each quiz.questions[quiz.currentQuestion].options as option, i (option)}
            <button 
              class="option" 
              class:selected={quiz.selectedAnswer === option}
              class:correct={quiz.answerSubmitted && option === quiz.questions[quiz.currentQuestion].correctAnswer}
              class:incorrect={quiz.answerSubmitted && quiz.selectedAnswer === option && option !== quiz.questions[quiz.currentQuestion].correctAnswer}
              disabled={quiz.answerSubmitted}
              on:click={() => selectAnswer(option)}
              animate:flip={{ duration: 300 }}
            >
              <span class="option-letter">{String.fromCharCode(65 + i)}</span>
              <span class="option-text">{option}</span>
            </button>
          {/each}
        </div>
      </div>
      
      <div class="quiz-actions">
        {#if !quiz.answerSubmitted}
          <button 
            class="submit-button" 
            on:click={submitAnswer}
            disabled={quiz.selectedAnswer === null}
          >
            Submit Answer
          </button>
        {:else}
          <button class="next-button" on:click={nextQuestion}>
            {quiz.currentQuestion < quiz.totalQuestions - 1 ? 'Next Question' : 'See Results'}
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .quiz-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  h1 {
    color: darkslateblue;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
  }
  
  /* Intro styles */
  .quiz-info {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    .quiz-info {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .info-item {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .info-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .info-text h3 {
    color: darkslateblue;
    margin: 0 0 0.5rem 0;
  }
  
  .info-text p {
    margin: 0;
    color: #444;
  }
  
  .start-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 auto;
    display: block;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .start-button:hover {
    background-color: #483d8b;
    transform: scale(1.05);
  }
  
  /* Quiz container styles */
  .quiz-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .quiz-header {
    background-color: #f9f9f9;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .progress-container {
    height: 6px;
    background-color: #eee;
    border-radius: 3px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background-color: darkslateblue;
    transition: width 0.3s ease;
  }
  
  .quiz-info-bar {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #666;
  }
  
  .timer.warning {
    color: #ff3e00;
    font-weight: bold;
  }
  
  .question-container {
    padding: 2rem;
  }
  
  .question {
    font-size: 1.3rem;
    color: #333;
    margin-top: 0;
    margin-bottom: 2rem;
  }
  
  .options {
    display: grid;
    gap: 1rem;
  }
  
  .option {
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border: 2px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }
  
  .option:hover:not(:disabled) {
    border-color: darkslateblue;
  }
  
  .option.selected {
    border-color: darkslateblue;
    background-color: #f0f0ff;
  }
  
  .option.correct {
    border-color: #4caf50;
    background-color: #e8f5e9;
  }
  
  .option.incorrect {
    border-color: #f44336;
    background-color: #ffebee;
  }
  
  .option-letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #eee;
    color: #666;
    font-weight: bold;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  
  .option.selected .option-letter {
    background-color: darkslateblue;
    color: white;
  }
  
  .option.correct .option-letter {
    background-color: #4caf50;
    color: white;
  }
  
  .option.incorrect .option-letter {
    background-color: #f44336;
    color: white;
  }
  
  .option-text {
    flex: 1;
  }
  
  .quiz-actions {
    padding: 1.5rem;
    text-align: center;
    border-top: 1px solid #eee;
  }
  
  .submit-button, .next-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .submit-button:hover, .next-button:hover {
    background-color: #483d8b;
  }
  
  .submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  /* Results styles */
  .results {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
  }
  
  .score-display {
    margin: 2rem 0;
  }
  
  .score-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #f0f0ff;
    border: 8px solid darkslateblue;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .score {
    font-size: 3rem;
    font-weight: bold;
    color: darkslateblue;
    line-height: 1;
  }
  
  .total {
    font-size: 1.5rem;
    color: #666;
  }
  
  .percentage {
    font-size: 1.2rem;
    font-weight: bold;
    color: #444;
  }
  
  .badge {
    background-color: gold;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    color: white;
  }
  
  .badge h2 {
    margin: 0 0 0.5rem 0;
    color: white;
  }
  
  .badge p {
    margin: 0;
    font-size: 1.1rem;
  }
  
  .restart-button {
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .restart-button:hover {
    background-color: #483d8b;
    transform: scale(1.05);
  }
</style>