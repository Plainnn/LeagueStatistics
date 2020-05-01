import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    /*eslint-disable */
    console.log(this.chartdata);
    console.log(this.options);
    this.renderChart(this.chartdata, this.options);
  }
};
