const alphabetMapping = require('./letters-mapping.json');
const words = require('./words.json');
const handle = () => {
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
    window.$transcriptionsMapping = result;
  } catch (e) {
    console.log(e, result);
  }
};
handle();
