// === HULPFUNCTIES ===
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// === QUIZ LOGICA ===
let current = 0;
let score = 0;

// Shuffle vragen
shuffle(questions);

// Shuffle antwoordopties per vraag
questions.forEach(q => {
  const correctAnswer = q.options[q.answer];
  shuffle(q.options);
  q.answer = q.options.indexOf(correctAnswer);
});

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  document.getElementById("progress").innerText =
    `Vraag ${current + 1} van ${questions.length}`;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === questions[current].answer) score++;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText =
      `Klaar! Je score: ${score} / ${questions.length}`;
    document.getElementById("options").innerHTML = "";
    document.getElementById("progress").innerText = "";
  }
}

loadQuestion();
