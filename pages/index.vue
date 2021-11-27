<template>
  <div class="home-page">

    <section class="weather-form-and-response">
      <form class="weather-form" @submit.prevent="submitWeatherForm">
        <div class="form-group">
          <input v-model="city" name="city" placeholder="Enter city" class="form-input" required />
        </div>

        <div class="form-group">
          <input v-model="country" name="country" placeholder="Enter country (optional)" class="form-input" />
        </div>

        <div class="form-group">
          <button type="submit" class="weather-submit-button">
            Get Weather Result
          </button>
        </div>
      </form>

      <div v-if="isSuccessfulResponse" class="weather-response">
        <h4>Weather Result</h4>
        <pre v-text="formattedWeatherResponse" />
      </div>

      <div v-if="isErrorResponse" class="weather-response is-error">
        <p v-text="weatherResponse.message" />
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      city: '',
      country: '',
      weatherResponse: null,
    };
  },

  computed: {
    formattedWeatherResponse () {
      if (this.weatherResponse) return JSON.stringify(this.weatherResponse, null, 2);
      return null;
    },
    isSuccessfulResponse () {
      return this.weatherResponse && this.weatherResponse.cod === 200;
    },
    isErrorResponse () {
      return this.weatherResponse && this.weatherResponse.cod >= 400;
    }
  },

  methods: {
    async submitWeatherForm () {
      const query = [this.city, this.country];
      const params = { q: query.join(',') };

      try {
        const response = await this.$openWeatherApi.getWeatherData(params);
        this.weatherResponse = response;
      } catch (error) {
        this.weatherResponse = error.response.data;
      }
    }
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

  .weather-submit-button {
    display: block;
    margin-left: auto;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid lightgrey;
    border-radius: 5px;
    background-color: #EAEAEA;

    &:hover {
      background-color: #EFEFEF;
      cursor: pointer;
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
