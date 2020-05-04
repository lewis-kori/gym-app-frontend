<template>
  <div class="row">
    <div class="col-md-6">
      <b-card title="my stats">
        <b-card-body>
          <canvas id="categoryHistory" />
          <chartjs-bar
            v-for="(item, index) in types"
            :key="index"
            :backgroundcolor="item.bgColor"
            :bind="true"
            :bordercolor="item.borderColor"
            :data="item.data"
            :datalabel="item.dataLabel"
            :labels="labels"
            target="categoryHistory"
          >
          </chartjs-bar>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { Bar } from 'hchs-vue-charts'
export default {
  extends: Bar,
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
      ]
    }
  },
  created() {
    this.getCategoryHistory()
  },
  beforeDestroy() {
    this.labels = []
    this.types[0].data = []
  },
  methods: {
    async getCategoryHistory() {
      try {
        await this.$axios.get(`gym/attendance/category/`).then((response) => {
          if (response.status === 200) {
            response.data.forEach((category) => this.labels.push(category.name))
            response.data.forEach((category) =>
              this.types[0].data.push(category.attendance_count)
            )
          }
        })
      } catch (e) {
        this.error = e.response.data.details
      }
    }
  }
}
</script>
