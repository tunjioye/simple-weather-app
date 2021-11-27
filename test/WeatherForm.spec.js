import { mount } from '@vue/test-utils'
import WeatherForm from '@/components/WeatherForm.vue'

const defaultProps = {
  loading: false,
  showResetFormButton: false,
}

const defaultData = {
  city: '',
  country: '',
}

describe('WeatherForm', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(WeatherForm)
    expect(wrapper.vm).toBeTruthy()
  })

  test('weather form should contain city input, country input and submit button', () => {
    const wrapper = mount(WeatherForm, {
      propsData: defaultProps,
      data() { return defaultData },
    })

    const cityInput = wrapper.find('[data-test-id="weather-form__city-input"]')
    const countryInput = wrapper.find('[data-test-id="weather-form__city-input"]')
    const submitButton = wrapper.find('[data-test-id="weather-form__submit-button"]')

    expect(cityInput.exists()).toBe(true)
    expect(countryInput.exists()).toBe(true)
    expect(submitButton.exists()).toBe(true)
  })

  test('city input must be required', () => {
    const wrapper = mount(WeatherForm, {
      propsData: defaultProps,
      data() { return defaultData },
    })

    const cityInput = wrapper.find('[data-test-id="weather-form__city-input"]')
    expect(cityInput.attributes('required')).toBe('required')
  })

  test('show reset button when showResetFormButton props is true', () => {
    const wrapper = mount(WeatherForm, {
      propsData: {
        ...defaultProps,
        showResetFormButton: true
      },
      data() { return defaultData },
    })

    const resetButton = wrapper.find('[data-test-id="weather-form__reset-button"]')
    expect(resetButton.exists()).toBe(true)
  })
})
