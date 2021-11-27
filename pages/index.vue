<template>
  <div class="home-page">

    <section class="weather-form-and-response">
      <form class="weather-form" @submit.prevent="submitWeatherForm">
        <div class="form-group">
          <input v-model="city" name="city" placeholder="Enter city" class="form-input" />
        </div>
      </form>

      <div v-if="formattedWeatherResponse" class="weather-reponse">
        <h4>Weather of {{ weatherResponse.name }} city</h4>
        <pre v-text="formattedWeatherResponse" />
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      city: '',
      weatherResponse: null,
    };
  },

  computed: {
    formattedWeatherResponse () {
      if (this.weatherResponse) return JSON.stringify(this.weatherResponse, null, 2);
      return null;
    }
  },

  methods: {
    async submitWeatherForm () {
      const params = { q: this.city };

      try {
        const response = await this.$openWeatherApi.getWeatherData(params);
        this.weatherResponse = response;
      } catch (error) {
        window.alert(`An Error Occured => ${error.message}`);
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

  .weather-reponse {
    width: 100%;
    background-color: #EAEAEA;
    border: 1px solid dimgrey;
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem auto;
    overflow-x: auto;
  }
}
</style>
