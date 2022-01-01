const axios = require('axios');
const quotes_index_one = (req, res) => {
  axios
    .get(`http://api.quotable.io/random`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', data: 'internal server error' });
      console.error(err);
    });
};

module.exports = { quotes_index_one };
