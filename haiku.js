var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){
    //This function makes a data object with keys of syllable numbers holding an array of words with that amt of syllables
    var syllableFlags = [0,1,2];
    var dataObj = {};
    var lines = data.toString().split("\n"), lineSplit;
    lines.forEach(function(line) {
        var phenomeArr = [];
        var syllablesFound = 0;
        word = line.split(' ').slice(0, 1).toString();
        phonemeArr = line.split(' ').slice(2);
        phonemeArr.forEach(function(section) {
            if (section[section.length -1] == 0 || section[section.length -1] == 1 || section[section.length -1] == 2) {
                syllablesFound++;
            }
        });
        if (!dataObj[syllablesFound]) {
            dataObj[syllablesFound] = [];
        }
        dataObj[syllablesFound].push(word);
    });
    return dataObj;
}

function getRandomWord(linesArr) {
    //Get random number out of total number of lines sent in (which already have the correct syllables)
    var randomLineNumber = Math.floor((linesArr.length * Math.random()));
    //Get a random line with that number
    return linesArr[randomLineNumber];
}

function createHaiku(structure) {
    var linesObj = formatData(cmudictFile);
    var haikuString = '';
    for (var i = 0; i < structure.length; i ++) {
        for (var j = 0; j< structure[i].length; j++) {
            haikuString += getRandomWord(linesObj[structure[i][j]]) + ' ';
        }
        haikuString += '\n';
    }
    return haikuString;
}

module.exports = {
    createHaiku: createHaiku,
}