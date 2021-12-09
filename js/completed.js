
const _url = new URL(window.location.href)//url of current window
const score = _url.searchParams.get('score')// gets the score from the url

let result = score.split('_') //separate the numbers to get the score and the no of questions

let resultId = document.getElementById('result'); //  gets the result text
resultId.innerHTML = `${result[0]}/${result[1]}`// change the result text to show the user's final score
