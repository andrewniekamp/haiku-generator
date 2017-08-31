var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
    var syllableFlags = [0,1,2];
    var lines = data.toString().split("\n"), lineSplit;
    return lines;
}

function getRandomWord(lines, syllablesNeeded) {
    var syllablesFound = 0;
    var wordHolder = {
        word: '',
        syllables: 0,
    };
    //Get random number out of total number of lines in dictionary
    var randomLineNumber = Math.floor((lines.length * Math.random()));
    //Get a random line with that number
    var randomLine = lines[randomLineNumber];
    //Store the word
    wordHolder.word = randomLine.split(' ').slice(0, 1).toString();
    //Split entire array, remove first two elements, which are the word and the empty second space
    var phonemeArr = randomLine.split(' ').slice(2);
    phonemeArr.forEach(function(section) {
        if (section[section.length -1] == 0 || section[section.length -1] == 1 || section[section.length -1] == 2) {
            syllablesFound++;
        }
    });
    if (syllablesNeeded == syllablesFound) {
        wordHolder.syllables = syllablesFound;
        return wordHolder;
    } else {
        console.log("not a fit");
        return getRandomWord(lines, syllablesNeeded);
    }
}

function createHaiku(structure) {
    var lines = formatData(cmudictFile);
    var wordHolder = getRandomWord(lines, structure[0]);
    
    console.log(wordHolder.word, wordHolder.syllables, structure[0]);
}

module.exports = {
    createHaiku: createHaiku,
}