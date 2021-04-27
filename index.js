var boxes = document.getElementById('boxes');
var clock;
var clockContainer = document.getElementById('timer-container');
var columnHeaders = document.getElementById('column-headers');
var rowHeaders = document.getElementById('row-headers');
var instructions = document.getElementById('instructions');
var quizBtn = document.getElementById('quiz-button');
var resetBtn = document.getElementById('reset-button');
var review = document.getElementById('review');
var scoreElement = document.getElementById('score');
var submitBtn = document.getElementById('submit-button');
var score = 0;
var time = 0;
var timer = document.getElementById('timer');


function createBoxes(min, max) {
    createRowHeaders(min, max);
    for (let i = min; i <= max; i++) {
        var box = document.createElement('INPUT');
        box.setAttribute('type', 'number');
        var boxId = i + 'x' + i;
        box.setAttribute('id', boxId);
        var boxValue = i * i;
        box.setAttribute('value', boxValue);
        box.setAttribute('data-value', boxValue);
        box.className = `box row-${i}`;
        box.addEventListener('focus', handleFocus);
        box.addEventListener('blur', handleBlur);
        boxes.append(box);
    }
}


function createColumnHeaders(min, max) {
	for (let i = min; i <= max; i++) {
		var columnHeader = document.createElement('div');
		columnHeader.id = 'col-header-' + i;
		columnHeader.classList.add('header');
		columnHeader.innerText = i;
		columnHeaders.append(columnHeader);
	}
}


function createRowHeaders(min, max) {
	for (let i = min; i <= max; i++) {
		var rowHeader = document.createElement('div');
		rowHeader.id = 'row-header-' + i;
		rowHeader.classList.add('header');
		rowHeader.innerHTML = '<span>' + i + '<sup>2</sup></span>=';
		rowHeaders.append(rowHeader);
	}
}


function handleBlur(e) {
	var row = e.target.id.split('x')[0];
	var col = e.target.id.split('x')[1];

	var rowHeader = document.getElementById('row-header-' + row);
	rowHeader.classList.remove('highlight');

	var colHeader = document.getElementById('col-header-' + col);
	colHeader.classList.remove('highlight');
}

function handleFocus(e) {
	var row = e.target.id.split('x')[0];
	var col = e.target.id.split('x')[1];

	var rowHeader = document.getElementById('row-header-' + row);
	rowHeader.classList.add('highlight');

	var colHeader = document.getElementById('col-header-' + col);
	colHeader.classList.add('highlight');
}


function startQuiz() {
	var emptyBoxes = document.querySelectorAll('input');

	for (var h = 0; h < emptyBoxes.length; h++) {
		emptyBoxes[h].value = "";
	}

	review.classList.add('hidden');
	instructions.classList.remove('hidden');
	quizBtn.classList.add('hidden');
	submitBtn.classList.remove('hidden');

	document.querySelector('.box').focus();

	startClock();
}


function submit() {
	stopClock();
	clockContainer.style.display = 'block';
	
	var answerElements = document.querySelectorAll('.box');
	
	for (var k = 0; k < answerElements.length; k++) {
		var correctAnswer = answerElements[k].getAttribute('data-value');

		if (answerElements[k].value == correctAnswer) {
			score++;
			answerElements[k].classList.add('green');
		}
		else {
			answerElements[k].classList.add('red');
		}
	}

	submitBtn.classList.add('hidden');
	resetBtn.classList.remove('hidden');
	instructions.classList.add('hidden');
	scoreElement.innerHTML = score + ' out of ' + answerElements.length;

}

function reset() {
	window.location.reload();
}


function startClock() {
	clock = setInterval(function() {
		time++;
		// console.log(time);
		var minutes = parseInt(time / 60);

		if (minutes === 0) {
			minutes = '';
		}

		else if (minutes === 1) {
			minutes = minutes + ' minute ';
		}

		else {
			minutes = minutes + ' minutes ';
		}

		var seconds = time % 60;

		if (seconds === 1) {
			seconds = seconds + ' second';
		}

		else {
			seconds = seconds + ' seconds';
		}

		timer.innerText = minutes + seconds;
	}, 1000);
}


function stopClock() {
	clearInterval(clock);
}

createBoxes(1,12);
