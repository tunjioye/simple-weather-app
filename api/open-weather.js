import QS from 'qs';

export default ($http, openWeatherBaseUrl, openWeatherApiKey) => ({
  // will fetch weather data based on parameters passed
  getWeatherData: (params = {}) => {
    if (Object.keys(params).length < 1) throw new Error('parameters object must contain at least one field');

    // append openWeatherApiKey as appid according to open weather documentation
    params = {...params, appid: openWeatherApiKey};

    // disable query encoding => encoding changes special characters
    const query = QS.stringify(params, { encode: false });

    return $http.$get(`${openWeatherBaseUrl}/data/2.5/weather?${query}`);
  },
});
