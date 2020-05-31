<template>
  <div class="mt-5 container">
    <div class="row">
      <div class="col-md-12">
        <b-card>
          <b-card-body>
            <b-card-title class="text-center">New class</b-card-title>
            <b-form method="post" @submit.prevent="createSession">
              <b-alert v-if="message" show variant="success">{{
                message
              }}</b-alert>
              <b-alert v-if="error" show variant="warning">{{ error }}</b-alert>
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
              >
                <b-form-select
                  id="categories"
                  v-model="session.category"
                  required
                  :options="categories"
                >
                </b-form-select>
              </b-form-group>
              <b-form-group
                id="desc"
                label="Class Description:"
                label-for="description"
              >
                <b-form-textarea
                  id="description:"
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
                  v-model="session.day_of_week"
                  :options="days"
                  required
                ></b-form-select
              ></b-form-group>
              <div class="row">
                <div class="col-md-6">
                  <b-form-group
                    id="starttime"
                    label="Start time:"
                    label-for="starttime"
                    ><datetime
                      v-model="session.start_time"
                      type="datetime"
                      use12-hour
                      auto
                    ></datetime>
                  </b-form-group>
                </div>
                <div class="col-md-6">
                  <b-form-group
                    id="endtime"
                    label="End time:"
                    label-for="endttime"
                    ><datetime
                      v-model="session.end_time"
                      type="datetime"
                      use12-hour
                      auto
                    ></datetime>
                  </b-form-group>
                </div>
                <vue-google-autocomplete
                  id="map"
                  ref="address"
                  class="form-control m-3"
                  placeholder="Start typing"
                  @placechanged="getAddressData"
                >
                </vue-google-autocomplete>
              </div>
              <b-button class="col-md-12" type="submit" variant="primary"
                >Submit</b-button
              >
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: {
    datetime: Datetime,
    VueGoogleAutocomplete
  },
  async asyncData({ $axios }) {
    try {
      return await $axios.get(`gym/classes/categories/`).then((response) => {
        if (response.status === 200) {
          const categories = []
          response.data.forEach((category) => {
            const catDict = {
              text: category.name,
              value: category.id
            }
            categories.push(catDict)
          })
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
        day_of_week: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        category: ''
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
      message: null,
      error: null
    }
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus()
  },
  methods: {
    async createSession() {
      try {
        await this.$axios
          .post(`gym/classes/create/`, this.session)
          .then((response) => {
            if (response.status === 201) {
              this.message = 'class has successfully been created'
            }
          })
      } catch (e) {
        this.error = 'Oops there is an error'
      }
    },
    getAddressData(addressData, placeResultData, id) {
      this.session.location =
        addressData.route +
        ', ' +
        addressData.administrative_area_level_1 +
        ', ' +
        addressData.country
    }
  }
}
</script>
