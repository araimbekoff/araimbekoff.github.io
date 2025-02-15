// const alphabetMapping = require('./letters-mapping.json');
// const words = require('./words.json');
const processWords = (alphabetMapping, words) => {
    const result = [];
    const regex = /[\u0621-\u064A][\u064B-\u065F]*/g;
    for (const word of words) {
        const transcription = [];
        const letters = word.match(regex) || [];
        for (const letter of letters) {
            const transcript = alphabetMapping[letter];
            transcription.push(transcript || '?');
        }
        result.push({
            arabic: word,
            kk: transcription.join('-'),
        });
    }
    try {
        return result;
    } catch (e) {
        console.log(e, result);
    }
};
fetch('static/letters-mapping.json')
    .then(response => response.json())
    .then(alphabetMapping => {
        fetch('static/words.json')
            .then(response => response.json())
            .then(words => {
                window.$transcriptionsMapping = processWords(alphabetMapping, words);
            });
    });

