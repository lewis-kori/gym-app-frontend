<template>
  <client-only>
    <div class="row">
      <div class="col-md-6">
        <b-card title="my stats">
          <b-card-body>
            <bar-chart
              v-if="barChartData.labels.length > 0"
              :data="barChartData"
              :options="barChartOptions"
              :height="200"
            />
          </b-card-body>
        </b-card>
      </div>
    </div>
  </client-only>
</template>

<script>
import BarChart from '~/components/Charts/BarChart'
export default {
  components: { BarChart },
  data() {
    return {
      error: null,
      labels: [],
      types: [
        {
          bgColor: '#de98ab',
          borderColor: '0c0306',
          data: [],
          dataLabel: 'Workout type'
        }
      ],
      barChartData: {
        labels: [],
        datasets: []
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Work Out Type',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.getCategoryHistory()
  },
  beforeRouteLeave(to, from, next) {
    this.labels = []
    this.types[0].data = []
    next()
  },
  methods: {
    async getCategoryHistory() {
      try {
        await this.$axios.get(`gym/attendance/category/`).then((response) => {
          if (response.status === 200) {
            response.data.forEach((category) => {
              // if (!this.barChartData.labels.includes(category.name)) {
              this.barChartData.labels.push(category.name)
              this.barChartData.datasets.push({
                label: category.name,
                data: [category.attendance_count],
                backgroundColor: '#003f5c'
              })
              // }
            })
            // response.data.forEach((category) => {
            //   // if (!this.barChartData.data.includes(category.attendance_count)) {
            //     this.barChartData.datasets.push(category.attendance_count)
            //   // }
            // })
          }
        })
      } catch (e) {
        this.error = e.response.data.details
      }
    }
  }
}
</script>
