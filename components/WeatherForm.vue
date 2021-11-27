<template>
  <form class="weather-form" @submit.prevent="submitWeatherForm">
    <div class="form-group">
      <input
        v-model="city"
        name="city"
        placeholder="Enter city"
        class="form-input"
        required
        data-test-id="weather-form__city-input"
      />
    </div>

    <div class="form-group">
      <input
        v-model="country"
        name="country"
        placeholder="Enter country (optional)"
        class="form-input"
        data-test-id="weather-form__country-input"
      />
    </div>

    <div class="form-group form-group__align-right">
      <button
        v-if="showResetFormButton"
        type="reset"
        class="weather-button"
        data-test-id="weather-form__reset-button"
        @click="resetWeatherForm"
        v-text="'Reset Form'"
      />

      <button
        type="submit"
        class="weather-button"
        data-test-id="weather-form__submit-button"
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
</style>
