import createOpenWeatherApi from '@/api/open-weather.js';

// this code will inject the open weather api object into openWeatherApi context
// allowing developers to write this.$openWeatherApi.getWeatherData(params)
export default (ctx, inject) => {
  const { openWeatherBaseUrl, openWeatherApiKey } = ctx.$config;
  const openWeatherApi = createOpenWeatherApi(openWeatherBaseUrl, openWeatherApiKey);
  inject('openWeatherApi', openWeatherApi);
};
