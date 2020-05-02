<template>
  <div class="mt-5 container">
    <div class="row">
      <div class="col-md-12">
        <b-card>
          <b-card-body>
            <b-card-title class="text-center">Create a new class</b-card-title>
            <b-form method="post" @submit.prevent="newClass">
              <b-form-group
                id="name-1"
                label="Class Name:"
                description="A catchy name for the session"
                label-for="name"
              >
                <b-form-input
                  id="name"
                  v-model="session.name"
                  required
                  placeholder="please enter class name"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="cat"
                label-for="categories"
                label="Class category:"
                >{{ categories }}
                <h1 v-for="cat in categories" :key="cat.id">
                  {{ cat.name }}
                </h1>
                <b-form-select id="categories" required :options="categories">
                  <h2>helo</h2></b-form-select
                >
              </b-form-group>
              <b-form-group
                id="desc"
                label="Class Description:"
                label-for="description"
              >
                <b-form-textarea
                  id="descriptio:"
                  v-model="session.description"
                  required
                  rows="3"
                  max-rows="6"
                  placeholder="please write what the class is about"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group id="day-1" label="Day of Week:" label-for="day"
                ><b-form-select
                  id="day"
                  v-model="session.day"
                  :options="days"
                  required
                ></b-form-select
              ></b-form-group>
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      await $axios.get(`gym/classes/categories/`).then((response) => {
        if (response.status === 200) {
          const categories = [{ text: null, value: null }]
          response.data.forEach((category) => {
            const catDict = {
              text: category.name,
              value: category.name,
              id: category.id
            }
            categories.push(catDict)
          })
          console.log(categories)
          return { categories }
        }
      })
    } catch (e) {
      return { e }
    }
  },
  data() {
    return {
      session: {
        name: '',
        day: '',
        description: '',
        startTime: '',
        endTime: ''
      },
      days: [
        { text: 'Sunday', value: 'Sunday' },
        { text: 'Monday', value: 'Monday' },
        { text: 'Tuesday', value: 'Tuesday' },
        { text: 'Wednesday', value: 'Wednesday' },
        { text: 'Thursday', value: 'Thursday' },
        { text: 'Friday', value: 'Friday' },
        { text: 'Saturday', value: 'Saturday' }
      ],
      categories: []
    }
  }
}
</script>
