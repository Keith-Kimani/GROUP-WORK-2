// Function to reset the state for the next question
function resetState() {
    nextButton.classList.add('hide');
    submissionCheckbox.checked = false;
    clearInterval(timerInterval);

    // Remove all previous answer elements
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle answer submission
function selectAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    // If no answer is selected, show an alert
    if (!selectedAnswer) {
        alert("Please select an answer before submitting!");
        return;
    }

    // Check if the selected answer is correct
    const correct = selectedAnswer.dataset.correct === 'true';
    // Set the status class based on whether the answer is correct or not
    setStatusClass(selectedAnswer.parentElement, correct);
    
    // Loop through all answers and display correct or wrong status
    Array.from(answerButtonsElement.children).forEach(answerDiv => {
        const radio = answerDiv.querySelector('input[type="radio"]');
        setStatusClass(answerDiv, radio.dataset.correct === 'true');
    });

    // Increment the score if the answer is correct
    if (correct) {
        score++;
    }

    // Hide the submit button and show the checkbox
    submitButton.classList.add('hide');
    submissionCheckbox.checked = true; // Check the box when the answer is submitted

    // Show the next button if there are more questions
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        // If no more questions, show the final score
        nextButton.classList.add('hide');
        showScore();
    }
}

// Function to set the status class for answers (correct or wrong)
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Function to clear the status class from elements
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
