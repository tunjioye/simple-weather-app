import QS from 'qs';

// returns json response if successful
const handleFetchResponse = (response) => {
  if (response.ok) return response.json();
};

export default (openWeatherBaseUrl, openWeatherApiKey) => ({
  // will fetch weather data based on parameters passed
  getWeatherData: (params = {}) => {
    if (Object.keys(params).length < 1) throw new Error('parameters object must contain at least one field');

    // append openWeatherApiKey as appid according to open weather documentation
    params = {...params, appid: openWeatherApiKey};

    return fetch(`${openWeatherBaseUrl}/data/2.5/weather?${QS.stringify(params)}`).then(handleFetchResponse);
  },
});
