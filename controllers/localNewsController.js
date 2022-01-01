const { getNews } = require('../utils/localNewsScraper');

const news_index_all = async (req, res) => {
  const news = await getNews();
  res.json(news);
};

const news_index_one = async (req, res) => {
  const news = await getNews();
  const category = req.params['category'];
  if (Object.keys(news).includes(category)) {
    res.json(news[category]);
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
