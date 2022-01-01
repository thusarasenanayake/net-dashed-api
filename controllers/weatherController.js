const axios = require('axios');

const weather_index_all = (req, res) => {
  const latitude = req.body.lat;
  const longitude = req.body.lon;
  const city = req.body.city;

  if (latitude && longitude) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&exclude=minutely`
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
  } else if (city) {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
        return axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&exclude=minutely`
        );
      })
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

module.exports = { weather_index_all };
