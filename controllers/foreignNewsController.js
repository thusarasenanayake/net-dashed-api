const axios = require('axios');

const news_index_all = (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.NEWS_API_KEY}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', data: 'internal server error' });
      console.error(err);
    });
};

const news_index_one = (req, res) => {
  const category = req.params['category'];
  if (category === 'technology') {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.NEWS_API_KEY}&category=technology`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ status: 'error', data: 'internal server error' });

        console.error(err);
      });
  } else {
    res.status(404).json({
      status: 'fail',
      data: 'resource not found',
    });
  }
};

module.exports = {
  news_index_all,
  news_index_one,
};
