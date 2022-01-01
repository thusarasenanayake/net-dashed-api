const axios = require('axios');

const getWord = async () => {
  const response = await axios.get(
    `https://random-word-api.herokuapp.com/word`
  );
  const word = await response.data[0];
  return word;
};

const getMeaning = async () => {
  let response;
  try {
    response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${await getWord()}`
    );
  } catch (err) {
    if (err.response.status === 404) {
      response = await getMeaning();
    }
  }
  return response;
};

const words_index_single = async (req, res) => {
  try {
    let response = await getMeaning();
    res.json(await response.data[0]);
  } catch (err) {
    res.status(404).json({ status: 'error', data: 'no words found' });
  }
};

module.exports = { words_index_single };
