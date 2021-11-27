<template>
  <div class="home-page">

    <section class="weather-form-and-response">
      <WeatherForm
        v-if="showWeatherForm"
        :loading="loadingWeatherData"
        :show-reset-form-button="Boolean(weatherResponse)"
        @reset-weather-form="weatherResponse = null"
        @fetch-weather-data="fetchWeatherData"
      />

      <button
        v-if="!showWeatherForm"
        type="button"
        class="weather-button is-centered"
        @click="showWeatherForm = true; weatherResponse = null;"
        v-text="loadingWeatherData ? 'loading random weather data ...' : 'Get weather for a city'"
      />

      <div v-if="isSuccessfulResponse" class="weather-response">
        <h4 v-text="weatherResultTitle" />
        <pre v-text="formattedWeatherResponse" />
      </div>

      <div v-if="isErrorResponse" class="weather-response is-error">
        <p v-text="weatherResponse.message" />
      </div>
    </section>

  </div>
</template>

<script>
import WeatherForm from '@/components/WeatherForm';

export default {
  components: {
    WeatherForm,
  },

  data () {
    return {
      showWeatherForm: false,
      weatherResponse: null,
      loadingWeatherData: false,
    };
  },

  computed: {
    isWeatherResultForRandomCoordinates () {
      return this.showWeatherForm === false;
    },

    weatherResultTitle () {
      if (this.isWeatherResultForRandomCoordinates) {
        return 'Weather result of random coordinates';
      }
      return `Weather Result of ${this.weatherResponse?.name} city`;
    },

    formattedWeatherResponse () {
      if (this.weatherResponse) return JSON.stringify(this.weatherResponse, null, 2);
      return null;
    },

    isSuccessfulResponse () {
      return this.weatherResponse && this.weatherResponse.cod === 200;
    },

    isErrorResponse () {
      return this.weatherResponse && this.weatherResponse.cod >= 400;
    },
  },

  created () {
    this.fetchRandomWeatherdata();
  },

  methods: {
    async fetchWeatherData (params) {
      try {
        this.loadingWeatherData = true;
        const response = await this.$openWeatherApi.getWeatherData(params);
        this.weatherResponse = response;
      } catch (error) {
        this.weatherResponse = error.response.data;
      } finally {
        this.loadingWeatherData = false;
      }
    },

    generateRandomCoordinate () {
      const MAX_NUMBER = 90;
      return (Math.random() * MAX_NUMBER).toFixed(2);
    },

    fetchRandomWeatherdata () {
      const randomLatitude = this.generateRandomCoordinate();
      const randomLongitude = this.generateRandomCoordinate();
      const params = { lat: randomLatitude, lon: randomLongitude };
      this.fetchWeatherData(params);
    },
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

.home-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .weather-form-and-response {
    width: 100%;
    max-width: 480px;
    padding: 20px;
    margin: auto;

    @media (min-width: 600px) {
      max-width: 560px;
    }
  }

  .weather-form {
    width: 100%;
  }

  .form-group {
    display: flex;
    gap: 1rem;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &__align-right {
      justify-content: flex-end;
    }
  }

  .form-input {
    width: 100%;
    padding: 1rem;
    font-size: large;
    border: 1px solid lightgrey;
    border-radius: 5px;
    outline: none;

    &:focus-within {
      border-color: black;
    }

    &::placeholder {
      color: grey;
    }
  }

  .weather-button {
    display: block;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid lightgrey;
    border-radius: 5px;
    background-color: #EAEAEA;

    &:hover {
      background-color: #EFEFEF;
      cursor: pointer;
    }

    &.is-centered {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .weather-response {
    width: 100%;
    background-color: #EAEAEA;
    border: 1px solid dimgrey;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 1rem auto;
    overflow-x: auto;

    &.is-error {
      background-color: #FAEAEA;
      border-color: darkred;
      color: crimson;
    }
  }
}
</style>
