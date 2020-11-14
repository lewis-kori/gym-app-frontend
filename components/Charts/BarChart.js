import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
