<template>
  <form class="weather-form" @submit.prevent="submitWeatherForm">
    <div class="form-group">
      <input v-model="city" name="city" placeholder="Enter city" class="form-input" required />
    </div>

    <div class="form-group">
      <input v-model="country" name="country" placeholder="Enter country (optional)" class="form-input" />
    </div>

    <div class="form-group form-group__align-right">
      <button
        v-if="showResetFormButton"
        type="reset"
        class="weather-button"
        @click="resetWeatherForm"
        v-text="'Reset Form'"
      />

      <button
        type="submit"
        class="weather-button"
        v-text="loading ? 'loading ...' : 'Get Weather Result'"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: 'WeatherForm',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    showResetFormButton: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      city: '',
      country: '',
    };
  },

  methods: {
    resetWeatherForm () {
      this.city = '';
      this.country = '';
      this.$emit('reset-weather-form');
    },

    submitWeatherForm () {
      const query = [this.city, this.country];
      const params = { q: query.join(',') };
      this.$emit('fetch-weather-data', params);
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
