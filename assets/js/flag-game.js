document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if (event.key == "Enter") {
            checkAnswer();
        }
    })
    runGame();
})

const flagGameState = {
  countryName: [],
  countryCode: []
};

async function runGame() {
  await loadCSV();
  displayCountry();
}

function displayCountry() {
  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").disabled = true;
  let countryData = pickCountry();
  let imageFilePath = "assets/images/" + countryData[1].toLowerCase() + ".png"
  console.log(imageFilePath);
  document.getElementById("flag-image").src = imageFilePath;
  document.getElementById("answer").innerText = countryData[0];
  document.getElementById("answer-box").disabled = false;
  console.log(countryData[0]);
}

function checkAnswer() {
  let playerAnswer = document.getElementById("answer-box").value;
  let correctAnswer = document.getElementById("answer").innerText;
  console.log(playerAnswer, correctAnswer);
  if (playerAnswer === correctAnswer) {
    alert("Correct");
    incrementCorrectQuestionsAnswered();
  }
  else {
    alert("Incorrect.  The correct answer is " + correctAnswer);
  }
  incrementQuestionsAnswered();
  displayCountry();
}

function incrementQuestionsAnswered() {
  let numberOfQs = parseInt(document.getElementById("questionsAnswered").innerText);
  numberOfQs = numberOfQs + 1;
  document.getElementById("questionsAnswered").innerText = numberOfQs;
}

// 

function incrementCorrectQuestionsAnswered() {
  let numberOfCorrectQs = parseInt(document.getElementById("questionsCorrect").innerText);
  numberOfCorrectQs = numberOfCorrectQs + 1;
  document.getElementById("questionsCorrect").innerText = numberOfCorrectQs;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickCountry() {
  let countryNumber = randomBetween(0, flagGameState.countryName.length - 1);
  return [flagGameState.countryName[countryNumber], flagGameState.countryCode[countryNumber] ];
}

async function loadCSV() {
    try {
        const response = await fetch('assets/data/country-data.csv'); // Path to CSV on your server
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const lines = text.trim().split('\n');

        for (let line of lines) {
          const [field1, field2] = line.split(',');
          flagGameState.countryName.push(field1.trim());
          flagGameState.countryCode.push(field2.trim());
        }

      } catch (error) {
        console.error('Error loading CSV:', error);
      }
    }


